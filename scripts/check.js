'use strict';
// Zero-dependency quality gate. `node scripts/check.js` exits 0 when everything
// passes; any finding prints the file/line and exits 1.
//
// Checks (each one guards a defect class that was found during the full audit):
//   1  shadowing   — a local `t` binding in a scope that also calls t('key', …)
//                    (crashed 14 pages at click time with "t is not a function")
//   2  i18n        — the child-preserving text writer must still be wired, and no
//                    [data-i18n] page may assign textContent directly in apply()
//   3  element ids — getElementById(t(…)) (translated string used as an id) and
//                    getElementById('x') where x does not exist in the page
//   4  registry    — index.html tools array ↔ projects/ ↔ i18n dictionaries ↔
//                    redirect table, all four sets must agree
//   5  CSP         — every literal external host a page loads or fetches must be
//                    allowed by the generated Content-Security-Policy
//   6  entities    — html-entities ENT_DATA must match the canonical name table
//   plus generated-file freshness (deploy config, home i18n, SEO, entity table)

var fs = require('fs');
var path = require('path');

var ROOT = path.resolve(__dirname, '..');
var shadow = require('./lib/shadow-scan.js');
var registry = require('./lib/registry.js');
var deploy = require('./lib/deploy-config.js');

var failures = [];
var warnings = [];
var LANGS = ['en', 'es', 'ja', 'zh-CN', 'zh-TW', 'zh-HK'];

function fail(check, message) { failures.push('[' + check + '] ' + message); }
function warn(check, message) { warnings.push('[' + check + '] ' + message); }
function lineOf(src, idx) { return src.slice(0, idx).split('\n').length; }

function projectFiles() {
  return fs.readdirSync(path.join(ROOT, 'projects'))
    .filter(function (d) { return fs.existsSync(path.join(ROOT, 'projects', d, 'index.html')); })
    .sort();
}

var slugs = projectFiles();
var tools = registry.readRegistry(ROOT);

// ---------------------------------------------------------------- 1. shadowing
(function checkShadowing() {
  slugs.forEach(function (slug) {
    var file = path.join(ROOT, 'projects', slug, 'index.html');
    var html = fs.readFileSync(file, 'utf8');
    shadow.scanHtml(html).forEach(function (f) {
      fail('shadowing', 'projects/' + slug + '/index.html:' + f.line + ' local `' + f.kind + '` t shadows the global t() used at line ' + f.callLine);
    });
  });
})();

// --------------------------------------------------------------------- 2. i18n
(function checkI18nWiring() {
  var src = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'i18n.js'), 'utf8');
  if (src.indexOf('function setI18nText(') < 0) {
    fail('i18n', 'assets/js/i18n.js lost setI18nText(): [data-i18n] writes would delete child elements again');
  }
  if (!/if \(dict\[key\] != null\) setI18nText\(els\[i\], dict\[key\]\)/.test(src)) {
    fail('i18n', 'assets/js/i18n.js apply() no longer routes [data-i18n] through setI18nText()');
  }
  // 反向检查：apply() 里不允许出现裸的 textContent 赋值
  var applyStart = src.indexOf('function apply()');
  if (applyStart >= 0) {
    var body = src.slice(applyStart, src.indexOf('\n  }', applyStart));
    if (/\.textContent\s*=/.test(body)) {
      fail('i18n', 'assets/js/i18n.js apply() assigns textContent directly (clobbers child elements)');
    }
  }
  // 每个页面用到的 data-i18n key 都必须能解析到某个词典（common 或本页）
  var common = {};
  LANGS.forEach(function (lang) {
    var pageCache = {};
    function dictFor(slug) {
      if (!pageCache[slug]) {
        var p = path.join(ROOT, 'assets', 'i18n', lang, slug + '.json');
        pageCache[slug] = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
      }
      return pageCache[slug];
    }
    function has(slug, key) {
      if (key.split('.')[0] === 'common' || key.indexOf('.') < 0) {
        if (common[lang] == null) common[lang] = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets', 'i18n', lang, 'common.json'), 'utf8'));
        if (common[lang][key] != null) return true;
      }
      return dictFor(slug)[key] != null;
    }
    slugs.forEach(function (slug) {
      var html = fs.readFileSync(path.join(ROOT, 'projects', slug, 'index.html'), 'utf8');
      var re = /data-i18n(?:-html|-placeholder|-attr-title|-attr-aria-label)?="([^"]+)"/g, m;
      while ((m = re.exec(html))) {
        // JS 拼接出来的属性（data-i18n="' + u.key + '"）不是真实 key
        if (m[1].indexOf("'") >= 0 || m[1].indexOf('"') >= 0 || m[1].indexOf('+') >= 0 || m[1].indexOf('{') >= 0) continue;
        if (!has(slug, m[1])) warn('i18n', lang + ': projects/' + slug + ' key "' + m[1] + '" missing from dictionaries');
      }
    });
  });
})();

// ------------------------------------------------------------- 3. element ids
(function checkElementIds() {
  slugs.forEach(function (slug) {
    var html = fs.readFileSync(path.join(ROOT, 'projects', slug, 'index.html'), 'utf8');
    var bogus = /getElementById\(\s*t\(/g, m;
    while ((m = bogus.exec(html))) {
      fail('element-id', 'projects/' + slug + '/index.html:' + lineOf(html, m.index) + ' getElementById(t(…)) — translated string used as an element id');
    }
    var re = /getElementById\(\s*'([A-Za-z][\w-]*)'\s*\)/g;
    var declared = {};
    var idRe = /\bid="([^"]+)"/g, im;
    while ((im = idRe.exec(html))) declared[im[1]] = true;
    // 运行期创建的 id（el.id='x' / setAttribute('id','x')）同样算“存在”
    var dynRe = /(?:\bid\s*=\s*|setAttribute\(\s*)['"]([\w-]+)['"]/g, dm2;
    while ((dm2 = dynRe.exec(html))) declared[dm2[1]] = true;
    while ((m = re.exec(html))) {
      if (!declared[m[1]]) warn('element-id', 'projects/' + slug + '/index.html:' + lineOf(html, m.index) + " getElementById('" + m[1] + "') — no such id in the page");
    }
  });
})();

// ----------------------------------------------------------- 4. registry sets
(function checkRegistry() {
  var regSlugs = tools.map(function (t) { return t.slug; });
  var regSet = {};
  regSlugs.forEach(function (s) { regSet[s] = true; });
  var dirSet = {};
  slugs.forEach(function (s) { dirSet[s] = true; });

  if (regSlugs.length !== new Set(regSlugs).size) fail('registry', 'index.html tools array contains duplicate links');
  regSlugs.forEach(function (s) { if (!dirSet[s]) fail('registry', 'index.html lists projects/' + s + ' but the directory is missing'); });
  slugs.forEach(function (s) { if (!regSet[s]) fail('registry', 'projects/' + s + ' exists but is not listed in index.html tools array'); });

  // 词典：无孤儿、无缺失
  LANGS.forEach(function (lang) {
    var dir = path.join(ROOT, 'assets', 'i18n', lang);
    var files = fs.readdirSync(dir).filter(function (f) { return f.slice(-5) === '.json'; });
    var have = {};
    files.forEach(function (f) { have[f.slice(0, -5)] = true; });
    slugs.forEach(function (s) { if (!have[s]) fail('registry', lang + ': missing dictionary assets/i18n/' + lang + '/' + s + '.json'); });
    files.forEach(function (f) {
      var base = f.slice(0, -5);
      if (base === 'common' || base === 'home') return;
      if (!dirSet[base]) fail('registry', lang + ': orphan dictionary assets/i18n/' + lang + '/' + f + ' (no such tool)');
    });
  });

  // 重定向表：目标必须存在，源必须不存在
  deploy.REDIRECTS.forEach(function (pair) {
    var from = pair[0].replace('/projects/', '').replace(/\/$/, '');
    var to = pair[1].replace('/projects/', '').replace(/\/$/, '');
    if (!dirSet[to]) fail('registry', 'redirect target projects/' + to + ' does not exist (source ' + pair[0] + ')');
    if (dirSet[from]) fail('registry', 'redirect source projects/' + from + ' still exists as a directory (would shadow the real page)');
  });
  if (deploy.REDIRECTS.length !== new Set(deploy.REDIRECTS.map(function (p) { return p[0]; })).size) {
    fail('registry', 'redirect table contains duplicate sources');
  }

  // 同名数据三源：首页 home.json 的 tool 键必须与注册表一一对应（zh-CN 值必须一致）
  var homeSrc = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets', 'i18n', 'zh-CN', 'home.json'), 'utf8'));
  tools.forEach(function (t) {
    var nk = 'home.tool.projects/' + t.slug + '/.name';
    var dk = 'home.tool.projects/' + t.slug + '/.desc';
    if (homeSrc[nk] !== t.name) fail('registry', 'zh-CN home.json name drift for ' + t.slug + ' (run node scripts/gen-home-i18n.js)');
    if (homeSrc[dk] !== t.desc) fail('registry', 'zh-CN home.json desc drift for ' + t.slug + ' (run node scripts/gen-home-i18n.js)');
  });
})();

// ----------------------------------------------------------------------- 5. CSP
(function checkCsp() {
  var directives = {};
  deploy.CSP.split(';').forEach(function (part) {
    var bits = part.trim().split(/\s+/);
    if (!bits[0]) return;
    directives[bits[0]] = bits.slice(1);
  });
  function allows(list, host) {
    if (!list) return false;
    for (var i = 0; i < list.length; i++) {
      var src = list[i];
      if (src === "'self'") continue;
      // 'data:', 'blob:', 'https:' 之类是协议白名单
      if (/^[a-z-]+:$/.test(src)) {
        if (src === 'https:') return true;
        continue;
      }
      var hostPart = src.replace(/^[a-z-]+:\/\//, '');
      if (hostPart === host) return true;
      if (hostPart.slice(0, 2) === '*.') {
        var base = hostPart.slice(2);
        if (host === base) return true;
        if (host.length > base.length && host.slice(-(base.length + 1)) === '.' + base) return true;
      }
    }
    return false;
  }
  function hostOf(url) {
    var m = url.match(/^https?:\/\/([^\/]+)/);
    return m ? m[1].toLowerCase() : '';
  }

  var patterns = [
    [/<script[^>]+src=["'](https?:\/\/[^"']+)/g, 'script-src'],
    [/fetch\s*\(\s*["'](https?:\/\/[^"']+)/g, 'connect-src'],
    [/\.open\s*\(\s*["'][A-Z]+["']\s*,\s*["'](https?:\/\/[^"']+)/g, 'connect-src'],
    [/\.src\s*=\s*["'](https?:\/\/[^"']+)/g, 'frame-src']
  ];

  slugs.forEach(function (slug) {
    var html = fs.readFileSync(path.join(ROOT, 'projects', slug, 'index.html'), 'utf8');
    patterns.forEach(function (p) {
      var re = new RegExp(p[0].source, 'g'), m;
      while ((m = re.exec(html))) {
        var host = hostOf(m[1]);
        if (!host) continue;
        if (!allows(directives[p[1]], host)) {
          fail('csp', 'projects/' + slug + '/index.html:' + lineOf(html, m.index) + ' ' + host + ' is not allowed by ' + p[1]);
        }
      }
    });
    // 动态拼接的外部主机：静态检查无法确认，给出提示
    var dyn = /["']https:\/\/["']\s*\+\s*[^;]{0,80}/g, dm;
    while ((dm = dyn.exec(html))) {
      if (!/browserleaks/.test(dm[0])) warn('csp', 'projects/' + slug + '/index.html:' + lineOf(html, dm.index) + ' builds a URL dynamically; verify the host is covered by connect-src');
    }
  });
})();

// ------------------------------------------------------------------ 6. entity
(function checkEntities() {
  var table = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'entity-names.json'), 'utf8')).entries;
  var known = {};
  table.forEach(function (row) { known[row[0]] = row[1]; });
  var html = fs.readFileSync(path.join(ROOT, 'projects', 'html-entities', 'index.html'), 'utf8');
  var m = html.match(/var ENT_DATA = (\[.*?\]);\n/s);
  if (!m) { fail('entity', 'projects/html-entities/index.html: ENT_DATA table not found'); return; }
  var rows;
  try { rows = JSON.parse(m[1]); } catch (e) { fail('entity', 'ENT_DATA is not valid JSON: ' + e.message); return; }
  var seen = {};
  rows.forEach(function (row) {
    if (!(row[0] in known)) fail('entity', 'ENT_DATA has an invalid entity name "' + row[0] + '"');
    else if (known[row[0]] !== row[1]) fail('entity', 'ENT_DATA character mismatch for &' + row[0] + ';');
    if (seen[row[0]]) fail('entity', 'ENT_DATA has a duplicate name "' + row[0] + '"');
    seen[row[0]] = true;
  });
  Object.keys(known).forEach(function (name) {
    if (!seen[name]) fail('entity', 'ENT_DATA is missing canonical entity "' + name + '"');
  });
})();

// ------------------------------------------------------- generated file sync
(function checkGenerated() {
  var checks = [
    ['scripts/gen-deploy-config.js', 'deploy config'],
    ['scripts/gen-home-i18n.js', 'home i18n'],
    ['scripts/gen-meta.js', 'SEO metadata'],
    ['scripts/gen-entities.js', 'entity table']
  ];
  checks.forEach(function (item) {
    var out;
    try {
      out = require('child_process').execFileSync(process.execPath, [path.join(ROOT, 'scripts', path.basename(item[0])), '--check'], { encoding: 'utf8', timeout: 120000 });
    } catch (e) {
      var msg = ((e.stdout || '') + (e.stderr || '')).trim().split('\n').filter(Boolean).slice(-2).join(' | ');
      fail('generated', item[1] + ' is stale — ' + (msg || 'run node ' + item[0]));
    }
  });
})();

// --------------------------------------------------------------------- report
warnings.forEach(function (w) { console.log('WARN  ' + w); });
failures.forEach(function (f) { console.log('FAIL  ' + f); });
console.log('');
console.log(failures.length === 0
  ? 'checks passed: ' + slugs.length + ' pages, ' + tools.length + ' registry entries, ' + warnings.length + ' warning(s)'
  : failures.length + ' failure(s), ' + warnings.length + ' warning(s)');
process.exit(failures.length === 0 ? 0 : 1);
