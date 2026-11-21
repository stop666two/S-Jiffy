'use strict';
// Renames shadowing local `t` bindings inside project pages.
//
// `t` is the global i18n translator (assets/js/global.js). Any local binding of
// `t` in a scope that also calls `t('key','fallback')` breaks translation and,
// on several pages, the whole feature. This script renames the local binding to
// `txt` (values) or `ti` (loop counters in `for (...)` headers) plus every
// reference to it inside its own scope, leaving i18n calls untouched.
//
// Usage: node scripts/fix-shadow.js [--write] [slug...]

var fs = require('fs');
var path = require('path');
var scan = require('./lib/shadow-scan');

var ROOT = path.resolve(__dirname, '..');
var args = process.argv.slice(2);
var WRITE = args.indexOf('--write') >= 0;
var only = args.filter(function (a) { return a.indexOf('--') !== 0; });

function codeMask(src) {
  var stripped = scan.stripNonCode(src);
  var mask = new Uint8Array(src.length);
  for (var i = 0; i < src.length; i++) mask[i] = stripped[i] === src[i] ? 1 : 0;
  // blanked regions became spaces; a real space in source also maps to 1 vs ' '
  return mask;
}

function fixBlock(src) {
  var findings = scan.scanSource(src).filter(function (f) { return f.kind === 'declaration'; });
  if (!findings.length) return { text: src, changes: [] };
  var mask = codeMask(src);
  var chars = src.split('');
  var changes = [];

  // Determine target names first (for-header => ti).
  findings.forEach(function (f) {
    var lineStart = src.lastIndexOf('\n', f.index) + 1;
    var head = src.slice(lineStart, f.index);
    f.newName = /\bfor\s*\(\s*$/.test(head) ? 'ti' : 'txt';
  });

  // Collect every identifier `t` inside any renamed scope.
  var re = /\bt\b/g, m;
  var edits = [];
  while ((m = re.exec(src))) {
    var at = m.index;
    if (!mask[at]) continue;                       // inside string / comment / regex
    if (at > 0 && /[\w$]/.test(src[at - 1])) continue;
    var after = src.slice(at + 1).match(/^\s*/)[0];
    var nxt = src[at + 1 + after.length];
    if (nxt === '(') continue;                     // function call => global t()
    if (at > 0 && src[at - 1] === '.') continue;   // property access
    var owner = null, best = null;
    for (var i = 0; i < findings.length; i++) {
      var f = findings[i];
      if (at >= f.scopeStart && at <= f.scopeEnd) {
        var span = f.scopeEnd - f.scopeStart;
        if (!best || span < best) { best = span; owner = f; }
      }
    }
    if (!owner) continue;
    // object-literal key or label: `t:` or `{t,`  -> leave alone
    if (nxt === ':') continue;
    edits.push({ at: at, name: owner.newName });
  }

  edits.sort(function (a, b) { return b.at - a.at; });
  edits.forEach(function (e) {
    chars.splice(e.at, 1, e.name);
  });
  findings.forEach(function (f) {
    changes.push({ line: f.line, name: f.newName, callLine: f.callLine });
  });
  return { text: chars.join(''), changes: changes, editCount: edits.length };
}

function fixFile(file) {
  var html = fs.readFileSync(file, 'utf8');
  var blocks = scan.inlineScripts(html);
  var editsApplied = 0, changes = [];
  for (var i = blocks.length - 1; i >= 0; i--) {
    var b = blocks[i];
    var r = fixBlock(b.text);
    if (!r.changes.length) continue;
    editsApplied += r.changes.length;
    changes = changes.concat(r.changes);
    html = html.slice(0, b.start) + r.text + html.slice(b.end);
  }
  if (editsApplied && WRITE) fs.writeFileSync(file, html);
  return { changes: changes, edits: editsApplied };
}

var dirs = fs.readdirSync(path.join(ROOT, 'projects')).sort();
var touched = 0, sites = 0;
dirs.forEach(function (d) {
  if (only.length && only.indexOf(d) < 0) return;
  var file = path.join(ROOT, 'projects', d, 'index.html');
  if (!fs.existsSync(file)) return;
  var r = fixFile(file);
  if (!r.changes.length) return;
  touched++; sites += r.edits;
  console.log((WRITE ? 'fixed ' : 'would fix ') + d + ' sites=' + r.edits +
    ' -> ' + r.changes.map(function (c) { return 'L' + c.line + ':' + c.name; }).join(' '));
});
console.log((WRITE ? 'APPLIED' : 'DRY-RUN') + ' files=' + touched + ' sites=' + sites);
