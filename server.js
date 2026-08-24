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

  var redirects = {
    '/projects/lorem-ipsum': '/projects/lorem-ipsum-generator/',
    '/projects/lorem-ipsum/': '/projects/lorem-ipsum-generator/',
    '/projects/lorem-ipsum-word': '/projects/lorem-ipsum-generator/',
    '/projects/lorem-ipsum-word/': '/projects/lorem-ipsum-generator/',
    '/projects/html-entity-lookup': '/projects/html-entities/',
    '/projects/html-entity-lookup/': '/projects/html-entities/',
    '/projects/html-table-extractor': '/projects/html-table-generator/',
    '/projects/html-table-extractor/': '/projects/html-table-generator/',
    '/projects/hash-comparison': '/projects/hash-generator/',
    '/projects/hash-comparison/': '/projects/hash-generator/',
    '/projects/mime-types': '/projects/mime-lookup/',
    '/projects/mime-types/': '/projects/mime-lookup/',
    '/projects/mac-address-lookup': '/projects/mac-address-generator/',
    '/projects/mac-address-lookup/': '/projects/mac-address-generator/',
    '/projects/encoding-detector': '/projects/text-encoder/',
    '/projects/encoding-detector/': '/projects/text-encoder/',
    '/projects/date-add': '/projects/date-calculator/',
    '/projects/date-add/': '/projects/date-calculator/',
    '/projects/date-difference': '/projects/date-calculator/',
    '/projects/date-difference/': '/projects/date-calculator/',
    '/projects/time-diff': '/projects/date-calculator/',
    '/projects/time-diff/': '/projects/date-calculator/',
    '/projects/text-comparison': '/projects/text-diff/',
    '/projects/text-comparison/': '/projects/text-diff/',
    '/projects/diff-checker': '/projects/text-diff/',
    '/projects/diff-checker/': '/projects/text-diff/',
    '/projects/text-diff-char': '/projects/text-diff/',
    '/projects/text-diff-char/': '/projects/text-diff/',
    '/projects/text-statistics': '/projects/text-statistics-adv/',
    '/projects/text-statistics/': '/projects/text-statistics-adv/',
    '/projects/text-frequency': '/projects/text-statistics-adv/',
    '/projects/text-frequency/': '/projects/text-statistics-adv/',
    '/projects/json-prettify': '/projects/json-formatter/',
    '/projects/json-prettify/': '/projects/json-formatter/',
    '/projects/json-minify': '/projects/json-minify-advanced/',
    '/projects/json-minify/': '/projects/json-minify-advanced/',
    '/projects/dockerfile-lint': '/projects/dockerfile-generator/',
    '/projects/dockerfile-lint/': '/projects/dockerfile-generator/',
    '/projects/compose-snippets': '/projects/docker-compose-converter/',
    '/projects/compose-snippets/': '/projects/docker-compose-converter/',
    '/projects/sql-prettify': '/projects/sql-format/',
    '/projects/sql-prettify/': '/projects/sql-format/',
    '/projects/text-table': '/projects/ascii-table/',
    '/projects/text-table/': '/projects/ascii-table/',
    '/projects/whats-my-ip': '/projects/ip-lookup/',
    '/projects/whats-my-ip/': '/projects/ip-lookup/',
    '/projects/line-wrapper': '/projects/text-wrapper/',
    '/projects/line-wrapper/': '/projects/text-wrapper/',
    '/projects/timestamp': '/projects/epoch-converter/',
    '/projects/timestamp/': '/projects/epoch-converter/',
    '/projects/cron-expression': '/projects/crontab-generator/',
    '/projects/cron-expression/': '/projects/crontab-generator/',
    '/projects/crontab-validator': '/projects/crontab-generator/',
    '/projects/crontab-validator/': '/projects/crontab-generator/',
    '/projects/uuid-v1': '/projects/uuid-generator/',
    '/projects/uuid-v1/': '/projects/uuid-generator/',
    '/projects/uuid-v6': '/projects/uuid-generator/',
    '/projects/uuid-v6/': '/projects/uuid-generator/',
    '/projects/diff-percentage': '/projects/percentage-calculator/',
    '/projects/diff-percentage/': '/projects/percentage-calculator/',
    '/projects/text-slug': '/projects/slugify-string/',
    '/projects/text-slug/': '/projects/slugify-string/',
    '/projects/emoji-picker': '/projects/emoji-search/',
    '/projects/emoji-picker/': '/projects/emoji-search/',
    '/projects/random-emoji': '/projects/emoji-search/',
    '/projects/random-emoji/': '/projects/emoji-search/',
    '/projects/user-agent': '/projects/user-agent-parser/',
    '/projects/user-agent/': '/projects/user-agent-parser/',
    '/projects/dice-roller': '/projects/dice-dnd/',
    '/projects/dice-roller/': '/projects/dice-dnd/',
    '/projects/hex-to-rgb': '/projects/hex-converter/',
    '/projects/hex-to-rgb/': '/projects/hex-converter/',
    '/projects/rgb-to-hex': '/projects/hex-converter/',
    '/projects/rgb-to-hex/': '/projects/hex-converter/',
    '/projects/hex-to-hsl': '/projects/hex-converter/',
    '/projects/hex-to-hsl/': '/projects/hex-converter/',
    '/projects/hsl-to-hex': '/projects/hex-converter/',
    '/projects/hsl-to-hex/': '/projects/hex-converter/',
    '/projects/hmac-verify': '/projects/hmac-generator/',
    '/projects/hmac-verify/': '/projects/hmac-generator/',
    '/projects/base32-converter': '/projects/base64/',
    '/projects/base32-converter/': '/projects/base64/',
    '/projects/base36-encoder': '/projects/base64/',
    '/projects/base36-encoder/': '/projects/base64/',
    '/projects/base45': '/projects/base64/',
    '/projects/base45/': '/projects/base64/',
    '/projects/base58-converter': '/projects/base64/',
    '/projects/base58-converter/': '/projects/base64/',
    '/projects/base62-encoder': '/projects/base64/',
    '/projects/base62-encoder/': '/projects/base64/',
    '/projects/base85-converter': '/projects/base64/',
    '/projects/base85-converter/': '/projects/base64/',
    '/projects/base91': '/projects/base64/',
    '/projects/base91/': '/projects/base64/',
    '/projects/base92': '/projects/base64/',
    '/projects/base92/': '/projects/base64/',
    '/projects/ascii85': '/projects/base64/',
    '/projects/ascii85/': '/projects/base64/',
    '/projects/image-to-base64': '/projects/base64-to-image/',
    '/projects/image-to-base64/': '/projects/base64-to-image/',
    '/projects/base-converter': '/projects/number-base-converter/',
    '/projects/base-converter/': '/projects/number-base-converter/',
    '/projects/base-convert': '/projects/number-base-converter/',
    '/projects/base-convert/': '/projects/number-base-converter/',
    '/projects/binary-calculator': '/projects/number-base-converter/',
    '/projects/binary-calculator/': '/projects/number-base-converter/',
    '/projects/chegong-lingsign': '/projects/zhougong-lingsign/',
    '/projects/chegong-lingsign/': '/projects/zhougong-lingsign/',
    '/projects/tudigong-lingsign': '/projects/zhougong-lingsign/',
    '/projects/tudigong-lingsign/': '/projects/zhougong-lingsign/',
    '/projects/wanggong-lingsign': '/projects/zhougong-lingsign/',
    '/projects/wanggong-lingsign/': '/projects/zhougong-lingsign/',
    '/projects/lvzu-lingsign': '/projects/zhougong-lingsign/',
    '/projects/lvzu-lingsign/': '/projects/zhougong-lingsign/',
    '/projects/fozu-lingsign': '/projects/zhougong-lingsign/',
    '/projects/fozu-lingsign/': '/projects/zhougong-lingsign/',
    '/projects/guandi-lingsign': '/projects/zhougong-lingsign/',
    '/projects/guandi-lingsign/': '/projects/zhougong-lingsign/',
    '/projects/yudi-lingsign': '/projects/zhougong-lingsign/',
    '/projects/yudi-lingsign/': '/projects/zhougong-lingsign/',
    '/projects/yuelao-lingsign': '/projects/zhougong-lingsign/',
    '/projects/yuelao-lingsign/': '/projects/zhougong-lingsign/',
    '/projects/huangdaxian-lingsign': '/projects/zhougong-lingsign/',
    '/projects/huangdaxian-lingsign/': '/projects/zhougong-lingsign/',
    '/projects/guanyin-lingsign': '/projects/zhougong-lingsign/',
    '/projects/guanyin-lingsign/': '/projects/zhougong-lingsign/',
    '/projects/chronometer': '/projects/timer-stopwatch/',
    '/projects/chronometer/': '/projects/timer-stopwatch/',
    '/projects/countdown-timer': '/projects/timer-stopwatch/',
    '/projects/countdown-timer/': '/projects/timer-stopwatch/',
    '/projects/interval-timer': '/projects/timer-stopwatch/',
    '/projects/interval-timer/': '/projects/timer-stopwatch/',
    '/projects/markdown-cheatsheet': '/projects/git-cheatsheet/',
    '/projects/markdown-cheatsheet/': '/projects/git-cheatsheet/',
    '/projects/python-cheatsheet': '/projects/git-cheatsheet/',
    '/projects/python-cheatsheet/': '/projects/git-cheatsheet/',
    '/projects/typescript-cheatsheet': '/projects/git-cheatsheet/',
    '/projects/typescript-cheatsheet/': '/projects/git-cheatsheet/',
    '/projects/hashcat-cheatsheet': '/projects/git-cheatsheet/',
    '/projects/hashcat-cheatsheet/': '/projects/git-cheatsheet/',
    '/projects/qr-reader': '/projects/qr-code-generator/',
    '/projects/qr-reader/': '/projects/qr-code-generator/',
    '/projects/wifi-qr-code': '/projects/qr-code-generator/',
    '/projects/wifi-qr-code/': '/projects/qr-code-generator/',
    '/projects/csp-validator': '/projects/csp-builder/',
    '/projects/csp-validator/': '/projects/csp-builder/',
    '/projects/api-key-detector': '/projects/api-key-generator/',
    '/projects/api-key-detector/': '/projects/api-key-generator/',
    '/projects/systemd-timer-generator': '/projects/systemd-unit-generator/',
    '/projects/systemd-timer-generator/': '/projects/systemd-unit-generator/',
    '/projects/variable-name-gen': '/projects/env-converter/',
    '/projects/variable-name-gen/': '/projects/env-converter/',
    '/projects/area-converter': '/projects/length-converter/',
    '/projects/area-converter/': '/projects/length-converter/',
    '/projects/volume-converter': '/projects/length-converter/',
    '/projects/volume-converter/': '/projects/length-converter/',
    '/projects/speed-converter': '/projects/length-converter/',
    '/projects/speed-converter/': '/projects/length-converter/',
    '/projects/chinese-zodiac': '/projects/age-calculator/',
    '/projects/chinese-zodiac/': '/projects/age-calculator/',
    '/projects/day-of-year': '/projects/date-formatter/',
    '/projects/day-of-year/': '/projects/date-formatter/',
    '/projects/date-range-generator': '/projects/date-formatter/',
    '/projects/date-range-generator/': '/projects/date-formatter/',
    '/projects/png-to-jpg': '/projects/image-converter/',
    '/projects/png-to-jpg/': '/projects/image-converter/',
    '/projects/jpg-to-png': '/projects/image-converter/',
    '/projects/jpg-to-png/': '/projects/image-converter/',
    '/projects/webp-to-jpg': '/projects/image-converter/',
    '/projects/webp-to-jpg/': '/projects/image-converter/',
    '/projects/jpg-to-webp': '/projects/image-converter/',
    '/projects/jpg-to-webp/': '/projects/image-converter/',
    '/projects/webp-to-png': '/projects/image-converter/',
    '/projects/webp-to-png/': '/projects/image-converter/',
    '/projects/png-to-webp': '/projects/image-converter/',
    '/projects/png-to-webp/': '/projects/image-converter/',
    '/projects/heic-to-jpg': '/projects/image-converter/',
    '/projects/heic-to-jpg/': '/projects/image-converter/',
    '/projects/heic-to-png': '/projects/image-converter/',
    '/projects/heic-to-png/': '/projects/image-converter/',
    '/projects/avif-to-jpg': '/projects/image-converter/',
    '/projects/avif-to-jpg/': '/projects/image-converter/',
    '/projects/avif-to-png': '/projects/image-converter/',
    '/projects/avif-to-png/': '/projects/image-converter/',
    '/projects/svg-to-png': '/projects/image-converter/',
    '/projects/svg-to-png/': '/projects/image-converter/',
    '/projects/svg-to-jpg': '/projects/image-converter/',
    '/projects/svg-to-jpg/': '/projects/image-converter/',
    '/projects/json-to-csharp': '/projects/json-to-typescript/',
    '/projects/json-to-csharp/': '/projects/json-to-typescript/',
    '/projects/json-to-go': '/projects/json-to-typescript/',
    '/projects/json-to-go/': '/projects/json-to-typescript/',
    '/projects/json-to-rust': '/projects/json-to-typescript/',
    '/projects/json-to-rust/': '/projects/json-to-typescript/',
    '/projects/json-to-swift': '/projects/json-to-typescript/',
    '/projects/json-to-swift/': '/projects/json-to-typescript/',
    '/projects/json-to-kotlin': '/projects/json-to-typescript/',
    '/projects/json-to-kotlin/': '/projects/json-to-typescript/',
    '/projects/json-to-dart': '/projects/json-to-typescript/',
    '/projects/json-to-dart/': '/projects/json-to-typescript/',
    '/projects/json-to-java': '/projects/json-to-typescript/',
    '/projects/json-to-java/': '/projects/json-to-typescript/',
    '/projects/json-to-python': '/projects/json-to-typescript/',
    '/projects/json-to-python/': '/projects/json-to-typescript/',
    '/projects/json-schema-to-ts': '/projects/json-to-typescript/',
    '/projects/json-schema-to-ts/': '/projects/json-to-typescript/',
    '/projects/graphql-to-ts': '/projects/json-to-typescript/',
    '/projects/graphql-to-ts/': '/projects/json-to-typescript/',
    '/projects/js-to-ts': '/projects/json-to-typescript/',
    '/projects/js-to-ts/': '/projects/json-to-typescript/',
    '/projects/apex-sensitivity-converter': '/projects/sensitivity-converter/',
    '/projects/apex-sensitivity-converter/': '/projects/sensitivity-converter/',
    '/projects/bf2042-sensitivity-converter': '/projects/sensitivity-converter/',
    '/projects/bf2042-sensitivity-converter/': '/projects/sensitivity-converter/',
    '/projects/cod-sensitivity-converter': '/projects/sensitivity-converter/',
    '/projects/cod-sensitivity-converter/': '/projects/sensitivity-converter/',
    '/projects/cs2-sensitivity-converter': '/projects/sensitivity-converter/',
    '/projects/cs2-sensitivity-converter/': '/projects/sensitivity-converter/',
    '/projects/fortnite-sensitivity-converter': '/projects/sensitivity-converter/',
    '/projects/fortnite-sensitivity-converter/': '/projects/sensitivity-converter/',
    '/projects/halo-sensitivity-converter': '/projects/sensitivity-converter/',
    '/projects/halo-sensitivity-converter/': '/projects/sensitivity-converter/',
    '/projects/overwatch2-sensitivity-converter': '/projects/sensitivity-converter/',
    '/projects/overwatch2-sensitivity-converter/': '/projects/sensitivity-converter/',
    '/projects/pubg-sensitivity-converter': '/projects/sensitivity-converter/',
    '/projects/pubg-sensitivity-converter/': '/projects/sensitivity-converter/',
    '/projects/r6siege-sensitivity-converter': '/projects/sensitivity-converter/',
    '/projects/r6siege-sensitivity-converter/': '/projects/sensitivity-converter/',
    '/projects/tarkov-sensitivity-converter': '/projects/sensitivity-converter/',
    '/projects/tarkov-sensitivity-converter/': '/projects/sensitivity-converter/',
    '/projects/thefinals-sensitivity-converter': '/projects/sensitivity-converter/',
    '/projects/thefinals-sensitivity-converter/': '/projects/sensitivity-converter/',
    '/projects/valorant-sensitivity-converter': '/projects/sensitivity-converter/',
    '/projects/valorant-sensitivity-converter/': '/projects/sensitivity-converter/',
    '/projects/warframe-sensitivity-converter': '/projects/sensitivity-converter/',
    '/projects/warframe-sensitivity-converter/': '/projects/sensitivity-converter/',
    '/projects/apex-to-cs2-sensitivity': '/projects/sensitivity-converter/',
    '/projects/apex-to-cs2-sensitivity/': '/projects/sensitivity-converter/',
    '/projects/apex-to-valorant-sensitivity': '/projects/sensitivity-converter/',
    '/projects/apex-to-valorant-sensitivity/': '/projects/sensitivity-converter/',
    '/projects/cod-to-cs2-sensitivity': '/projects/sensitivity-converter/',
    '/projects/cod-to-cs2-sensitivity/': '/projects/sensitivity-converter/',
    '/projects/cs2-to-apex-sensitivity': '/projects/sensitivity-converter/',
    '/projects/cs2-to-apex-sensitivity/': '/projects/sensitivity-converter/',
    '/projects/cs2-to-cod-sensitivity': '/projects/sensitivity-converter/',
    '/projects/cs2-to-cod-sensitivity/': '/projects/sensitivity-converter/',
    '/projects/cs2-to-overwatch2-sensitivity': '/projects/sensitivity-converter/',
    '/projects/cs2-to-overwatch2-sensitivity/': '/projects/sensitivity-converter/',
    '/projects/cs2-to-pubg-sensitivity': '/projects/sensitivity-converter/',
    '/projects/cs2-to-pubg-sensitivity/': '/projects/sensitivity-converter/',
    '/projects/cs2-to-valorant-sensitivity': '/projects/sensitivity-converter/',
    '/projects/cs2-to-valorant-sensitivity/': '/projects/sensitivity-converter/',
    '/projects/fortnite-to-valorant-sensitivity': '/projects/sensitivity-converter/',
    '/projects/fortnite-to-valorant-sensitivity/': '/projects/sensitivity-converter/',
    '/projects/overwatch2-to-cs2-sensitivity': '/projects/sensitivity-converter/',
    '/projects/overwatch2-to-cs2-sensitivity/': '/projects/sensitivity-converter/',
    '/projects/overwatch2-to-valorant-sensitivity': '/projects/sensitivity-converter/',
    '/projects/overwatch2-to-valorant-sensitivity/': '/projects/sensitivity-converter/',
    '/projects/pubg-to-cs2-sensitivity': '/projects/sensitivity-converter/',
    '/projects/pubg-to-cs2-sensitivity/': '/projects/sensitivity-converter/',
    '/projects/valorant-to-apex-sensitivity': '/projects/sensitivity-converter/',
    '/projects/valorant-to-apex-sensitivity/': '/projects/sensitivity-converter/',
    '/projects/valorant-to-cs2-sensitivity': '/projects/sensitivity-converter/',
    '/projects/valorant-to-cs2-sensitivity/': '/projects/sensitivity-converter/',
    '/projects/valorant-to-fortnite-sensitivity': '/projects/sensitivity-converter/',
    '/projects/valorant-to-fortnite-sensitivity/': '/projects/sensitivity-converter/',
    '/projects/valorant-to-overwatch2-sensitivity': '/projects/sensitivity-converter/',
    '/projects/valorant-to-overwatch2-sensitivity/': '/projects/sensitivity-converter/',
    '/projects/encoding-converter': '/projects/text-encoder/',
    '/projects/encoding-converter/': '/projects/text-encoder/'
  }
  if (redirects[url]) {
    res.writeHead(301, { 'Location': redirects[url] });
    res.end();
    return;
  }

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
}).listen(port, '0.0.0.0', function () {
  // Save PID for cleanup
  fs.writeFileSync(pidFile, String(process.pid));
  console.log('S-Jiffy running at http://localhost:' + port);
});
