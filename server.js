'use strict';
// S-Jiffy 本地静态服务器。
//
// 设计要点（与生产对齐，避免"本地能跑、线上被拦"）：
//  1. 响应头与 netlify.toml 完全一致：CSP 与安全头来自 scripts/lib/deploy-config.js 单一数据源，
//     本地也发送同一份 CSP，CSP 相关的功能缺陷在本地就能复现。
//  2. 默认只监听回环地址（127.0.0.1），不把工作区暴露到局域网；需要局域网调试时显式设 HOST=0.0.0.0。
//  3. 启动时清理陈旧 .server.pid：先确认该 PID 确实是 node 跑 server.js 才终止，避免 PID 复用误杀无关进程。
//  4. gzip 结果走有上限的 LRU，长期运行不会无限增长。

var http = require('http');
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');
var crypto = require('crypto');
var child_process = require('child_process');
var deploy = require('./scripts/lib/deploy-config.js');

var pidFile = path.join(__dirname, '.server.pid');
var port = parseInt(process.env.PORT, 10) || 8080;
var host = process.env.HOST || '127.0.0.1';
var GZIP_CACHE_MAX = 64;

/**
 * 判断某个 PID 是否确实是本项目的 server.js 进程。
 * 输入：pid（number）。
 * 输出：boolean —— 仅在能取得命令行且其中包含 server.js 时返回 true；取不到命令行一律返回 false（宁可不杀）。
 */
function isOurServer(pid) {
  if (!pid || pid === process.pid) return false;
  var cmdline = '';
  try {
    cmdline = fs.readFileSync('/proc/' + pid + '/cmdline', 'utf8').replace(/\0/g, ' ');
  } catch (e) {
    if (process.platform === 'win32') {
      try {
        cmdline = child_process.execFileSync(
          'wmic',
          ['process', 'where', 'processid=' + pid, 'get', 'commandline', '/format:list'],
          { encoding: 'utf8', timeout: 5000, windowsHide: true }
        );
      } catch (e2) {
        return false;
      }
    } else {
      return false;
    }
  }
  return cmdline.indexOf('server.js') !== -1;
}

// 清理上一次遗留的 PID 文件（只在确认是本项目进程时才终止）。
try {
  var oldPid = parseInt(fs.readFileSync(pidFile, 'utf8').trim(), 10);
  if (oldPid && isOurServer(oldPid)) {
    try { process.kill(oldPid); } catch (e) {}
  }
  fs.unlinkSync(pidFile);
} catch (e) {}

var mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.m4a': 'audio/mp4',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.zip': 'application/zip',
  '.gz': 'application/gzip',
  '.pdf': 'application/pdf'
};

var COMPRESSIBLE = ['.html', '.css', '.js', '.mjs', '.json', '.svg', '.xml', '.txt', '.md', '.webmanifest'];

// 有上限的 LRU：Map 保持插入顺序，超限时删最早插入的键。
var gzipCache = new Map();

function cacheControlFor(posixPath) {
  for (var i = 0; i < deploy.CACHE_RULES.length; i++) {
    var rule = deploy.CACHE_RULES[i];
    if (rule.match === '/' || posixPath.indexOf(rule.match) !== -1) return rule.value;
  }
  return 'no-cache';
}

/** 公共响应头：安全头 + CSP，所有状态码（含 301/304/404）都必须带上（与生产同一份 CSP）。 */
function commonHeaders() {
  var h = { 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'no-referrer' };
  h['Content-Security-Policy'] = deploy.CSP;
  return h;
}

function serveFile(res, filePath, stats, data, clientETag, clientGzip) {
  var ext = path.extname(filePath);
  var posixPath = filePath.split(path.sep).join('/');
  var headers = commonHeaders();
  headers['Content-Type'] = mime[ext] || 'application/octet-stream';
  headers['Cache-Control'] = cacheControlFor(posixPath);
  var etag = '"' + crypto.createHash('md5').update(data).digest('hex') + '"';
  headers['ETag'] = etag;
  if (clientETag === etag) {
    res.writeHead(304, headers);
    res.end();
    return;
  }
  if (COMPRESSIBLE.indexOf(ext) !== -1 && clientGzip) {
    var key = filePath + ':' + etag;
    var gz = gzipCache.get(key);
    if (gz) {
      gzipCache.delete(key);
      gzipCache.set(key, gz);
    } else {
      gz = zlib.gzipSync(data);
      gzipCache.set(key, gz);
      if (gzipCache.size > GZIP_CACHE_MAX) {
        var oldest = gzipCache.keys().next();
        if (!oldest.done) gzipCache.delete(oldest.value);
      }
    }
    headers['Content-Encoding'] = 'gzip';
    headers['Vary'] = 'Accept-Encoding';
    data = gz;
  }
  res.writeHead(200, headers);
  res.end(data);
}

// 旧地址 -> 新地址；不带与带结尾斜杠都要 301。
var redirects = Object.create(null);
for (var i = 0; i < deploy.REDIRECTS.length; i++) {
  var pair = deploy.REDIRECTS[i];
  redirects[pair[0]] = pair[1];
  redirects[pair[0] + '/'] = pair[1];
}

http.createServer(function (req, res) {
  var rawUrl = req.url.split('?')[0];
  var url;
  try {
    url = decodeURIComponent(rawUrl);
  } catch (e) {
    res.writeHead(400, commonHeaders());
    res.end('400 Bad Request');
    return;
  }
  if (url === '/') url = '/index.html';

  if (redirects[url]) {
    var rh = commonHeaders();
    rh['Location'] = redirects[url];
    res.writeHead(301, rh);
    res.end();
    return;
  }

  var filePath = path.resolve(__dirname, '.' + url);

  if (filePath !== __dirname && filePath.indexOf(__dirname + path.sep) !== 0) {
    res.writeHead(403, commonHeaders());
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, function (err, stats) {
    if (!err && stats.isDirectory()) filePath = path.join(filePath, 'index.html');
    fs.readFile(filePath, function (err2, data) {
      if (err2) {
        res.writeHead(404, commonHeaders());
        res.end('<!DOCTYPE html><meta charset="utf-8"><title>404 - S-Jiffy</title><body style="font-family:monospace;padding:2em"><h1>404</h1><a href="/" style="color:#111">返回首页</a></body>');
        return;
      }
      serveFile(res, filePath, stats, data, req.headers['if-none-match'] || '', /gzip/.test(req.headers['accept-encoding'] || ''));
    });
  });
}).listen(port, host, function () {
  fs.writeFileSync(pidFile, String(process.pid));
  console.log('S-Jiffy running at http://' + host + ':' + port);
});
