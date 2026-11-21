'use strict';
// Detects local bindings named `t` that shadow the global i18n helper `t()`.
//
// Rule: a page must never bind the identifier `t` (var/let/const/param/catch) in a
// scope where the global translator `t('key','fallback')` is also called.
//
// The scan is intentionally conservative on the *declaration* side (renaming an
// unused local `t` is harmless) but exact on the *call* side (only string-literal
// first argument counts as an i18n call), so it does not flag `.t(` property
// access or object keys.

var CALL_RE = /(?<![\w$.])t\s*\(\s*['"`]/;
var DECL_RE = /(?:\bvar|\blet|\bconst)\s+t\s*(?:=[^=]|;|,|\bin\b|$)/;

// Replace comments and string/template/regex contents with spaces so brace
// matching is reliable. Output keeps the exact same length as the input so all
// indices stay aligned with the original source.
function stripNonCode(src) {
  var out = new Array(src.length);
  var i = 0;
  var n = src.length;
  function blank(a, b) { for (var k = a; k < b; k++) { if (out[k] === undefined) out[k] = src[k] === '\n' ? '\n' : ' '; } }
  function prevSignificant(pos) {
    for (var k = pos - 1; k >= 0; k--) {
      if (!/\s/.test(src[k])) return src[k];
    }
    return '';
  }
  function regexStartsAt(pos) {
    var p = prevSignificant(pos);
    if (p === '') return true;
    return '(:,=![&|?{};+-*%~^<>'.indexOf(p) >= 0;
  }
  while (i < n) {
    var c = src[i];
    var c2 = src[i + 1];
    if (c === '/' && c2 !== '/' && c2 !== '*' && regexStartsAt(i)) {
      // regex literal: skip to the closing unescaped '/' outside a character class
      var rj = i + 1, inClass = false;
      while (rj < n) {
        if (src[rj] === '\\') { rj += 2; continue; }
        if (src[rj] === '\n') break;
        if (src[rj] === '[') inClass = true;
        else if (src[rj] === ']') inClass = false;
        else if (src[rj] === '/' && !inClass) break;
        rj++;
      }
      blank(i + 1, Math.min(rj, n));
      i = rj + 1; continue;
    }
    if (c === '/' && c2 === '/') {
      var e = src.indexOf('\n', i);
      if (e < 0) e = n;
      blank(i, e); i = e; continue;
    }
    if (c === '/' && c2 === '*') {
      var e2 = src.indexOf('*/', i + 2);
      e2 = e2 < 0 ? n : e2 + 2;
      blank(i, e2); i = e2; continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      var q = c, j = i + 1, depth = 0;
      while (j < n) {
        if (src[j] === '\\') { j += 2; continue; }
        if (q === '`' && src[j] === '$' && src[j + 1] === '{') { depth++; j += 2; continue; }
        if (q === '`' && depth > 0 && src[j] === '}') { depth--; j++; continue; }
        if (src[j] === q && depth === 0) break;
        j++;
      }
      blank(i, Math.min(j + 1, n));
      out[i] = q; out[Math.min(j, n - 1)] = q;
      i = j + 1; continue;
    }
    if (out[i] === undefined) out[i] = c;
    i++;
  }
  for (var k = 0; k < n; k++) if (out[k] === undefined) out[k] = src[k] === '\n' ? '\n' : ' ';
  return out.join('');
}

function matchBrace(code, openIdx) {
  var depth = 0;
  for (var i = openIdx; i < code.length; i++) {
    var c = code[i];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return i; }
  }
  return -1;
}

// Collect [start, end] of every function body (classic + arrow + method shorthand).
function functionRanges(code) {
  var ranges = [];
  var re = /\bfunction\b/g, m;
  while ((m = re.exec(code))) {
    var p = m.index + m[0].length;
    while (p < code.length && /\s/.test(code[p])) p++;
    if (!/[A-Za-z_$]/.test(code[p]) || code[p] === '(') {
      // anonymous or named: skip name
    }
    while (p < code.length && /[A-Za-z0-9_$]/.test(code[p])) p++;
    while (p < code.length && /\s/.test(code[p])) p++;
    if (code[p] !== '(') continue;
    var pd = 0, q = p;
    for (; q < code.length; q++) {
      if (code[q] === '(') pd++;
      else if (code[q] === ')') { pd--; if (pd === 0) break; }
    }
    q++;
    var parenEnd = q;   // 必须在跳过空白之前记录，否则参数列表会带出多余的 ')'/空白
    while (q < code.length && /\s/.test(code[q])) q++;
    if (code[q] !== '{') continue;
    var close = matchBrace(code, q);
    if (close > 0) ranges.push({ start: q, end: close, params: code.slice(p + 1, parenEnd - 1) });
  }
  var arre = /=>\s*\{/g, am;
  while ((am = arre.exec(code))) {
    var ob = am.index + am[0].length - 1;
    var cl = matchBrace(code, ob);
    if (cl > 0) ranges.push({ start: ob, end: cl, params: '', arrow: true, arrowAt: am.index });
  }
  return ranges;
}

function innermost(ranges, idx) {
  var best = null;
  for (var i = 0; i < ranges.length; i++) {
    var r = ranges[i];
    if (idx > r.start && idx < r.end) {
      if (!best || (r.end - r.start) < (best.end - best.start)) best = r;
    }
  }
  return best;
}

// Extract inline <script> blocks: [{start, end, text}]
function inlineScripts(html) {
  var out = [];
  var re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi, m;
  while ((m = re.exec(html))) {
    if (/\bsrc\s*=/.test(m[1])) continue;
    var bodyStart = m.index + m[0].indexOf('>') + 1;
    out.push({ start: bodyStart, end: bodyStart + m[2].length, text: m[2] });
  }
  return out;
}

// Returns array of findings {line, kind, scopeLine, index}
function scanSource(src, opts) {
  opts = opts || {};
  var code = stripNonCode(src);
  var fns = functionRanges(code);
  var findings = [];

  function lineOf(idx) {
    var l = 1;
    for (var i = 0; i < idx && i < src.length; i++) if (src[i] === '\n') l++;
    return l;
  }
  function scopeKey(idx) {
    var f = innermost(fns, idx);
    return f ? f.start : -1;
  }
  function callsInScope(scopeStart) {
    var re = new RegExp(CALL_RE.source, 'g'), mm;
    while ((mm = re.exec(code))) {
      if (scopeKey(mm.index) === scopeStart) return mm.index;
    }
    return -1;
  }

  // var/let/const declarations
  var dre = new RegExp(DECL_RE.source, 'g'), d;
  while ((d = dre.exec(code))) {
    var at = d.index;
    var sk = scopeKey(at);
    var hit = callsInScope(sk);
    if (hit >= 0) {
      var sf = sk < 0 ? { start: -1, end: code.length } : innermost(fns, sk + 1);
      findings.push({
        line: lineOf(at), kind: 'declaration', scopeLine: sk < 0 ? 0 : lineOf(sk), callLine: lineOf(hit),
        index: at, scopeStart: sf ? sf.start : -1, scopeEnd: sf ? sf.end : code.length
      });
    }
  }

  // function parameters named exactly `t`
  for (var fi = 0; fi < fns.length; fi++) {
    var f = fns[fi];
    var plist = f.params.replace(/^\(/, '').split(',');
    var hasT = false;
    for (var pi = 0; pi < plist.length; pi++) {
      if (/^\s*t\s*$/.test(plist[pi])) hasT = true;
    }
    if (!hasT && f.arrow) {
      var back = code.slice(Math.max(0, f.arrowAt - 24), f.arrowAt);
      if (/(?:^|[\s(,])t\s*$/.test(back)) hasT = true;
    }
    if (hasT) {
      var hit2 = callsInScope(f.start);
      if (hit2 >= 0) findings.push({ line: lineOf(f.arrowAt || f.start), kind: 'parameter', scopeLine: lineOf(f.start), callLine: lineOf(hit2) });
    }
  }

  // catch (t)
  var cre = /catch\s*\(\s*t\s*\)/g, cm;
  while ((cm = cre.exec(code))) {
    var sk2 = scopeKey(cm.index);
    var hit3 = callsInScope(sk2);
    if (hit3 >= 0) findings.push({ line: lineOf(cm.index), kind: 'catch', scopeLine: sk2 < 0 ? 0 : lineOf(sk2), callLine: lineOf(hit3) });
  }

  return findings;
}

// Scan a whole HTML page; returns findings with absolute line numbers.
function scanHtml(html) {
  var all = [];
  var blocks = inlineScripts(html);
  for (var i = 0; i < blocks.length; i++) {
    var f = scanSource(blocks[i].text);
    var baseLine = 1;
    for (var k = 0; k < blocks[i].start; k++) if (html[k] === '\n') baseLine++;
    for (var j = 0; j < f.length; j++) {
      all.push({
        line: f[j].line + baseLine - 1,
        kind: f[j].kind,
        scopeLine: f[j].scopeLine ? f[j].scopeLine + baseLine - 1 : 0,
        callLine: f[j].callLine + baseLine - 1
      });
    }
  }
  return all;
}

module.exports = { scanHtml: scanHtml, scanSource: scanSource, stripNonCode: stripNonCode, inlineScripts: inlineScripts };
