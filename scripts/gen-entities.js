'use strict';
// Regenerates the `ENT_DATA` table in projects/html-entities/index.html from
// scripts/entity-names.json (generated once from Python's html.entities.html5,
// which is the WHATWG HTML5 named character reference table).
//
// Why a generator: the table used to carry 98 truncated names (`&AEli;`,
// `&Aacut;`, ...) and 9 duplicates, so "copy entity" produced invalid references.
// A generated table cannot drift.
//
// Usage: node scripts/gen-entities.js [--check]

var fs = require('fs');
var path = require('path');

var ROOT = path.resolve(__dirname, '..');
var PAGE = path.join(ROOT, 'projects', 'html-entities', 'index.html');
var TABLE = path.join(ROOT, 'scripts', 'entity-names.json');

var data = JSON.parse(fs.readFileSync(TABLE, 'utf8'));
var rows = data.entries;

var literal = 'var ENT_DATA = ' + JSON.stringify(rows) + ';';
var html = fs.readFileSync(PAGE, 'utf8');
var re = /^[ \t]*var ENT_DATA = \[.*\];$/m;
if (!re.test(html)) {
  console.error('ENT_DATA line not found in ' + PAGE);
  process.exit(2);
}
var current = html.match(re)[0].trim();
var indent = html.match(re)[0].match(/^[ \t]*/)[0];
var desired = indent + literal;

if (current === literal) {
  console.log('ENT_DATA up to date (' + rows.length + ' entities)');
  process.exit(0);
}
if (process.argv.indexOf('--check') >= 0) {
  console.error('ENT_DATA is stale: run node scripts/gen-entities.js');
  process.exit(1);
}
html = html.replace(re, function () { return desired; });
fs.writeFileSync(PAGE, html);
console.log('ENT_DATA rebuilt: ' + rows.length + ' entities');
