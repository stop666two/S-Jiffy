var http = require('http');
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');
var crypto = require('crypto');
var pidFile = path.join(__dirname, '.server.pid');

// Kill previous instance
try {
  var oldPid = fs.readFileSync(pidFile, 'utf8').trim();
  if (oldPid) {
    try { process.kill(parseInt(oldPid, 10)); } catch (e) {}
  }
} catch (e) {}

var port = 8080;
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

var gzipCache = {};

function serveFile(res, filePath, stats, data, clientETag, clientGzip) {
  var ext = path.extname(filePath);
  var type = mime[ext] || 'application/octet-stream';
  var headers = {
    'Content-Type': type,
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer'
  };
  var etag = '"' + crypto.createHash('md5').update(data).digest('hex') + '"';
  headers['ETag'] = etag;
  if (clientETag === etag) {
    res.writeHead(304, headers);
    res.end();
    return;
  }
  var isAsset = filePath.indexOf(path.sep + 'assets' + path.sep) !== -1;
  var isI18n = filePath.indexOf(path.sep + 'assets' + path.sep + 'i18n' + path.sep) !== -1;
  var isCompressible = ['.html', '.css', '.js', '.mjs', '.json', '.svg', '.xml', '.txt', '.md', '.webmanifest'].indexOf(ext) !== -1;
  if (isAsset && !isI18n) {
    headers['Cache-Control'] = 'public, max-age=86400';
  } else {
    headers['Cache-Control'] = 'no-cache';
  }
  if (isCompressible && clientGzip) {
    var key = filePath + ':' + etag;
    var gz = gzipCache[key];
    if (!gz) {
      gz = zlib.gzipSync(data);
      gzipCache[key] = gz;
    }
    headers['Content-Encoding'] = 'gzip';
    headers['Vary'] = 'Accept-Encoding';
    data = gz;
  }
  res.writeHead(200, headers);
  res.end(data);
}

http.createServer(function (req, res) {

  var rawUrl = req.url.split('?')[0];
  var url;
  try {
    url = decodeURIComponent(rawUrl);
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('400 Bad Request');
    return;
  }
  if (url === '/') url = '/index.html';
  var filePath = path.resolve(__dirname, '.' + url);

  if (filePath !== __dirname && filePath.indexOf(__dirname + path.sep) !== 0) {
    res.writeHead(403); res.end('403');
    return;
  }

  fs.stat(filePath, function (err, stats) {
    if (!err && stats.isDirectory()) filePath = path.join(filePath, 'index.html');
    fs.readFile(filePath, function (err2, data) {
      if (err2) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<!DOCTYPE html><meta charset="utf-8"><title>404 - S-Jiffy</title><body style="font-family:monospace;padding:2em"><h1>404</h1><a href="/" style="color:#111">返回首页</a></body>');
        return;
      }
      serveFile(res, filePath, stats, data, req.headers['if-none-match'] || '', /gzip/.test(req.headers['accept-encoding'] || ''));
      return;
    });
  });
}).listen(port, function () {
  // Save PID for cleanup
  fs.writeFileSync(pidFile, String(process.pid));
  console.log('S-Jiffy running at http://localhost:' + port);
});
