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
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

http.createServer(function (req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Cache-Control', 'no-cache');

  var url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/') url = '/index.html';
  var filePath = path.join(__dirname, url);

  if (filePath.indexOf(__dirname) !== 0) {
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
