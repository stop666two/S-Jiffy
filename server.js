var http = require('http');
var fs = require('fs');
var path = require('path');
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

http.createServer(function (req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Cache-Control', 'no-cache');

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
      res.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] || 'application/octet-stream' });
      res.end(data);
    });
  });
}).listen(port, function () {
  // Save PID for cleanup
  fs.writeFileSync(pidFile, String(process.pid));
  console.log('S-Jiffy running at http://localhost:' + port);
});
