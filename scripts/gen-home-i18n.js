'use strict';
// Keeps `home.tool.*` keys in assets/i18n/<lang>/home.json in lockstep with the
// tool registry in index.html.
//
// Why: the home page renders names/descriptions for 549 tools. Those strings used
// to live in two places (the registry and home.json) and drifted — one tool name
// and eleven descriptions disagreed, so the page showed whichever copy was read
// last. The registry is now the single source:
//
//   zh-CN          -> values are copied verbatim from the registry (cannot drift)
//   other languages-> existing translations are preserved; missing ones fall back
//                     to the registry text and are reported so a translator can
//                     fix them
//
// Key set is always rewritten to exactly: existing non-tool keys + one name/desc
// pair per registry entry, in registry order. Stale keys disappear.
//
// Usage:
//   node scripts/gen-home-i18n.js            # rewrite
//   node scripts/gen-home-i18n.js --check    # exit 1 when anything is stale

var fs = require('fs');
var path = require('path');
var registry = require('./lib/registry.js');

var ROOT = registry.ROOT;
var CHECK = process.argv.indexOf('--check') >= 0;
var LANGS = ['en', 'es', 'ja', 'zh-CN', 'zh-TW', 'zh-HK'];
var SOURCE_LANG = 'zh-CN';

function nameKey(slug) { return 'home.tool.projects/' + slug + '/.name'; }
function descKey(slug) { return 'home.tool.projects/' + slug + '/.desc'; }

var tools = registry.readRegistry(ROOT);
var slugSet = Object.create(null);
tools.forEach(function (t) { slugSet[t.slug] = t; });

var problems = [];
var changed = [];

LANGS.forEach(function (lang) {
  var file = path.join(ROOT, 'assets', 'i18n', lang, 'home.json');
  var raw = fs.readFileSync(file, 'utf8');
  var src;
  try {
    src = JSON.parse(raw);
  } catch (e) {
    problems.push(lang + ': invalid JSON (' + e.message + ')');
    return;
  }

  var out = {};
  // 非工具键（meta.*、home.h1 等首页文案）原样保留，顺序不变。
  Object.keys(src).forEach(function (k) {
    if (k.indexOf('home.tool.') !== 0) out[k] = src[k];
  });
  // 已存在的工具键按原顺序输出（保持文件稳定，便于 review diff）。
  Object.keys(src).forEach(function (k) {
    if (k.indexOf('home.tool.') !== 0) return;
    var m = k.match(/^home\.tool\.projects\/([^/]+)\/\.(name|desc)$/);
    if (!m || !slugSet[m[1]]) return; // 孤儿键：丢弃
    out[k] = src[k];
  });
  // 补齐缺失的工具键（按注册表顺序追加）。
  var missing = [];
  tools.forEach(function (t) {
    [nameKey(t.slug), descKey(t.slug)].forEach(function (k) { void k; });
    if (out[nameKey(t.slug)] == null) { out[nameKey(t.slug)] = ''; missing.push(nameKey(t.slug)); }
    if (out[descKey(t.slug)] == null) { out[descKey(t.slug)] = ''; missing.push(descKey(t.slug)); }
  });
  if (missing.length) {
    problems.push(lang + ': ' + missing.length + ' missing key(s), fell back to ' + SOURCE_LANG + ' — ' + missing.slice(0, 3).join(', '));
  }
  // 中文以注册表为准；其他语言保留译文，空值回退到中文原文。
  tools.forEach(function (t) {
    var nk = nameKey(t.slug), dk = descKey(t.slug);
    out[nk] = (lang === SOURCE_LANG || !out[nk]) ? t.name : out[nk];
    out[dk] = (lang === SOURCE_LANG || !out[dk]) ? t.desc : out[dk];
  });

  var next = JSON.stringify(out, null, 2) + '\n';
  if (next !== raw) {
    changed.push(lang);
    if (!CHECK) fs.writeFileSync(file, next);
  }
});

if (problems.length) {
  problems.forEach(function (p) { console.error('  ' + p); });
}
if (CHECK) {
  if (changed.length) {
    console.error('stale home.json: ' + changed.join(', ') + ' — run node scripts/gen-home-i18n.js');
    process.exit(1);
  }
  console.log('home i18n up to date (' + tools.length + ' tools x ' + LANGS.length + ' languages)');
  process.exit(problems.length ? 2 : 0);
}
console.log(changed.length ? 'regenerated home.json: ' + changed.join(', ') : 'home.json already up to date');
