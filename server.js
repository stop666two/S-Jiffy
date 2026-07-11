var http = require('http');
var fs = require('fs');
var path = require('path');

var root = __dirname;
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
  var url = req.url.split('?')[0];
  if (url === '/') url = '/index.html';
  var filePath = path.join(root, url);

  fs.stat(filePath, function (err, stats) {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    var ext = path.extname(filePath);
    fs.readFile(filePath, function (err2, data) {
      if (err2) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
      res.end(data);
    });
  });
}).listen(port, function () {
  console.log('S-Jiffy server running at http://localhost:' + port);
});
