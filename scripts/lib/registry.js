'use strict';
// Single source of truth for the tool catalogue: the `tools` array inside
// index.html. Everything else (home page i18n keys, sitemap, static meta tags,
// deploy redirects, gate checks) derives from this parser.

var fs = require('fs');
var path = require('path');

var ROOT = path.resolve(__dirname, '..', '..');

/**
 * Parse `index.html` 的 tools 数组。
 * 输出：{ name, desc, link, slug, cats } 数组，顺序与文件一致。
 * link 形如 'projects/base64/'，slug 为 'base64'。
 */
function readRegistry(root) {
  root = root || ROOT;
  var html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  var start = html.indexOf('var tools = [');
  if (start < 0) start = html.indexOf('const tools = [');
  if (start < 0) throw new Error('tools array not found in index.html');
  var open = html.indexOf('[', start);
  var depth = 0, end = -1;
  for (var i = open; i < html.length; i++) {
    var c = html[i];
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end < 0) throw new Error('unterminated tools array');
  var body = html.slice(open + 1, end);

  var out = [];
  var entryRe = /\{\s*name:\s*"((?:[^"\\]|\\.)*)"\s*,\s*desc:\s*"((?:[^"\\]|\\.)*)"\s*,\s*link:\s*'([^']+)'([^}]*)\}/g;
  var m;
  while ((m = entryRe.exec(body))) {
    var link = m[3];
    var slug = link.replace(/^projects\//, '').replace(/\/$/, '');
    var cats = [];
    var catsMatch = m[4].match(/cats:\s*\[([^\]]*)\]/);
    if (catsMatch) {
      var cRe = /"([^"]*)"/g, cm;
      while ((cm = cRe.exec(catsMatch[1]))) cats.push(cm[1]);
    }
    out.push({ name: m[1], desc: m[2], link: link, slug: slug, cats: cats });
  }
  return out;
}

module.exports = { readRegistry: readRegistry, ROOT: ROOT };
