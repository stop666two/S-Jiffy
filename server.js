var http = require('http');
var fs = require('fs');
var path = require('path');

var root = path.resolve(__dirname);
var port = 8080;

var mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.wasm': 'application/wasm'
};

function addSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '0');
  res.setHeader('Referrer-Policy', 'no-referrer');
}

http.createServer(function (req, res) {
  addSecurityHeaders(res);

  var url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/') url = '/index.html';
  var filePath = path.resolve(path.join(root, url));

  if (filePath.indexOf(root) !== 0) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, function (err, stats) {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    var ext = path.extname(filePath);
    fs.readFile(filePath, function (err2, data) {
      if (err2) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<!DOCTYPE html><meta charset="utf-8"><title>404 - S-Jiffy</title><body style="font-family:monospace;padding:2em;color:#111"><h1>404</h1><p>未找到该页面</p><a href="/" style="color:#111">返回首页</a></body>');
        return;
      }
      res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
      res.end(data);
    });
  });
}).listen(port, function () {
  console.log('S-Jiffy server running at http://localhost:' + port);
}).on('error', function (e) {
  if (e.code === 'EADDRINUSE') {
    console.error('端口 ' + port + ' 已被占用，请先关闭占用程序或运行 start-server.bat');
    process.exit(1);
  } else {
    throw e;
  }
});
