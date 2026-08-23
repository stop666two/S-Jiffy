/**
 * S-Jiffy 六语言运行时本地化框架（i18n.js）
 *
 * 职责：
 *  1. 语言检测：localStorage 记忆 -> 浏览器语言（navigator.languages）-> 默认 zh-CN
 *  2. 词典加载：同步 XHR 加载 assets/i18n/<lang>/common.json 与 <页面slug>.json（同步保证页内脚本可立即使用 I18N.t）
 *  3. 文案替换：data-i18n（文本）/ data-i18n-placeholder（占位符）/ data-i18n-attr-title（title 属性）
 *  4. 语言切换器：自定义下拉面板（按钮 + 弹出菜单）——工具页替换 header 中旧返回按钮位置，主页追加到 header 右侧；页面静态 HTML 中已有的 <select id="langSwitch"> 会被自动替换
 *  5. 返回按钮迁移：工具页从 header 移除旧返回按钮，注入到 .tool-workspace 左上角（.back-btn-workspace）
 *  6. 元数据：<html lang>、document.title、meta[name=description] 按词典更新
 *
 * 使用方式：
 *  - 页面在 <script src=".../global.js"> 之后加载本文件
 *  - 页面元素加 data-i18n="<slug>.<key>" 等属性，词典缺 key 时保留 HTML 原文（优雅降级）
 *  - 页内 JS 调用 window.I18N.t('<slug>.<key>') 取当前语言文案（I18N 已就绪）
 *
 * 约定：
 *  - 语言代码：en / zh-CN / zh-TW / zh-HK / es / ja（zh-TW 与 zh-HK 为不同语言，译文独立）
 *  - 词典 key 命名空间：common.*（公共 UI）、<slug>.*（工具页）、home.*（主页）
 *  - 语法 ES5（var/function），全站零依赖零构建
 */
(function () {
  /**
   * 支持的语言清单。code 为 BCP 47 语言代码；label 为各语言自称（切换器主行显示）；
   * enName 为英文名（切换器副行显示，便于非母语用户识别）。
   */
  var LANGS = [
    { code: 'en',    label: 'English',                   enName: 'English' },
    { code: 'zh-CN', label: '简体中文',                   enName: 'Simplified Chinese' },
    { code: 'zh-TW', label: '繁體中文（台灣）',             enName: 'Traditional Chinese (Taiwan)' },
    { code: 'zh-HK', label: '繁體中文（香港）',             enName: 'Traditional Chinese (Hong Kong)' },
    { code: 'es',    label: 'Español',                   enName: 'Spanish' },
    { code: 'ja',    label: '日本語',                     enName: 'Japanese' }
  ];

  /** localStorage 记忆键名（与 global.js 的 s-jiffy: 前缀约定一致） */
  var STORAGE_KEY = 's-jiffy:lang';

  /**
   * 将任意浏览器语言字符串（BCP 47，如 "zh-TW"、"es-419"、"en-US"）归一化为本站支持的语言代码。
   * 输入：raw —— navigator.language 等原始字符串，可为 null/undefined/空。
   * 输出：匹配到的语言代码（en/zh-CN/zh-TW/zh-HK/es/ja），无法识别时返回 null。
   * 边界：小写化后精确匹配；zh 系按地区细分——含 "hant" 视为台湾繁体，含 "hk"/"mo" 视为香港繁体，其余归简体；
   *       es-419 等地区变体归 es；en-* 归 en；ja-* 归 ja；其他语言返回 null 交由调用方回退。
   */
  function normalizeLang(raw) {
    if (!raw) return null;
    var lang = String(raw).toLowerCase();
    var i;
    for (i = 0; i < LANGS.length; i++) {
      if (lang === LANGS[i].code.toLowerCase()) return LANGS[i].code;
    }
    if (lang.indexOf('zh') === 0) {
      if (lang.indexOf('hant') !== -1) return 'zh-TW';
      if (lang.indexOf('hk') !== -1 || lang.indexOf('mo') !== -1) return 'zh-HK';
      return 'zh-CN';
    }
    if (lang.indexOf('es') === 0) return 'es';
    if (lang.indexOf('ja') === 0) return 'ja';
    if (lang.indexOf('en') === 0) return 'en';
    return null;
  }

  /**
   * 检测当前语言。优先级：
   *  1. localStorage 中用户显式选择（s-jiffy:lang）
   *  2. 浏览器语言偏好列表 navigator.languages（依次尝试，首个可识别者胜出）
   *  3. 兜底 zh-CN（本项目以中文用户为主）
   * 输出：六语言代码之一。
   * 边界：localStorage 读取/写入异常时静默跳过（隐私模式等），不影响页面功能。
   */
  function detectLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      var n = normalizeLang(saved);
      if (n) return n;
    } catch (e) {}
    var nav = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language];
    for (var i = 0; i < nav.length; i++) {
      var m = normalizeLang(nav[i]);
      if (m) return m;
    }
    return 'zh-CN';
  }

  /**
   * 判断当前页面是否为工具页（路径含 /projects/）。
   * 工具页与主页深度不同（../../ 与 ./），资源相对路径据此计算。
   * 输出：boolean。
   */
  function isToolPage() {
    return window.location.pathname.indexOf('/projects/') !== -1;
  }

  var lang = detectLang();
  /** 当前语言词典合并结果：common.* 与 <slug>.* 平铺在同一对象中，key 即完整路径（如 "common.back"） */
  var dict = {};
  /** 当前页面 slug（工具目录名，如 "base64"）；主页无 slug 时为 null */
  var pageKey = null;
  var pathMatch = window.location.pathname.match(/\/projects\/([^/]+)\/?(?:index\.html)?$/);
  if (pathMatch) pageKey = pathMatch[1];

  /**
   * 同步加载并合并一份词典文件到 dict。
   * 输入：name —— 词典文件名（不含 .json 与语言前缀，如 "common"、"base64"）。
   * 输出：无。加载失败（文件缺失/JSON 解析错误/网络异常）时静默跳过，对应 key 缺失即回退页面原文。
   * 说明：使用同步 XHR 以保证本文件执行完毕后 I18N.t 立即可用（页内脚本无需等待回调）；
   *       项目须经 HTTP 服务访问（server.js / Netlify），file:// 协议下同步 XHR 会被浏览器拦截。
   */
  function loadDict(name) {
    try {
      var prefix = isToolPage() ? '../../' : '';
      var xhr = new XMLHttpRequest();
      xhr.open('GET', prefix + 'assets/i18n/' + lang + '/' + name + '.json', false);
      xhr.send(null);
      if (xhr.status === 200 || xhr.status === 0) {
        var data = JSON.parse(xhr.responseText);
        for (var k in data) {
          if (data.hasOwnProperty(k)) dict[k] = data[k];
        }
      }
    } catch (e) {}
  }

  loadDict('common');
  loadDict(pageKey || 'home');

  /**
   * 按词典更新页面元数据：document.title（key "meta.title"）与 meta[name=description]（key "meta.description"）。
   * meta 标签不存在时自动创建（工具页普遍没有 description，由本函数补全）。
   * 词典缺 key 时保持现状（不覆盖、不创建）。
   */
  function setMeta() {
    if (dict['meta.title']) document.title = dict['meta.title'];
    var desc = dict['meta.description'];
    if (desc) {
      var m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement('meta');
        m.name = 'description';
        document.head.appendChild(m);
      }
      m.content = desc;
    }
  }

  /**
   * 语言切换器（自定义下拉面板，替代原生 <select>，提供一致的跨浏览器外观）：
   *  结构：.lang-switcher > button.lang-trigger（地球图标 + 当前语言母语名 + 箭头）+ div.lang-menu（6 个语言项）
   *  语言项：母语名主行 + 英文名副行，当前语言高亮并显示对勾
   *  交互：点击项切换（写入 localStorage 并 reload，保证页内 JS 文案全部重渲染）；
   *        ESC 或点击外部关闭；↑/↓ 在选项中移动焦点，Enter/Space 选中
   *  位置：工具页替换 header 中旧返回按钮（.back-btn）；主页 header 无返回按钮时追加到末尾（右侧）
   *  兼容：页面静态 HTML 中已有的 <select id="langSwitch"> 会被整体替换为自定义组件（幂等）
   *  边界：header 不存在时直接返回；localStorage 异常时静默跳过
   */
  function renderSwitcher() {
    var header = document.querySelector('.global-header');
    if (!header) return;

    var existing = header.querySelector('#langSwitch');
    var select = (existing && existing.tagName === 'SELECT') ? existing : null;

    var wrap = document.createElement('div');
    wrap.id = 'langSwitch';
    wrap.className = 'lang-switcher';

    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'lang-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.appendChild(svgIcon('globe'));
    var nameSpan = document.createElement('span');
    nameSpan.className = 'lang-trigger-name';
    var curLabel = lang;
    for (var k = 0; k < LANGS.length; k++) {
      if (LANGS[k].code === lang) { curLabel = LANGS[k].label; break; }
    }
    nameSpan.textContent = curLabel;
    trigger.appendChild(nameSpan);
    trigger.appendChild(svgIcon('chevron'));
    wrap.appendChild(trigger);

    var menu = document.createElement('div');
    menu.className = 'lang-menu';
    menu.setAttribute('role', 'listbox');
    menu.hidden = true;
    var items = [];
    var j;
    for (j = 0; j < LANGS.length; j++) {
      (function (lg) {
        var item = document.createElement('button');
        item.type = 'button';
        item.className = 'lang-option' + (lg.code === lang ? ' sel' : '');
        item.setAttribute('role', 'option');
        item.setAttribute('aria-selected', lg.code === lang ? 'true' : 'false');
        var nm = document.createElement('span');
        nm.className = 'lang-name';
        nm.textContent = lg.label;
        item.appendChild(nm);
        var sub = document.createElement('span');
        sub.className = 'lang-sub';
        sub.textContent = lg.enName;
        item.appendChild(sub);
        item.appendChild(svgIcon('check', 'lang-check'));
        item.addEventListener('click', function () { setLang(lg.code); });
        item.addEventListener('keydown', function (e) {
          var idx = items.indexOf(e.target);
          if (idx === -1) return;
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            items[(idx + 1) % items.length].focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            items[(idx - 1 + items.length) % items.length].focus();
          } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            items[idx].click();
          }
        });
        items.push(item);
        menu.appendChild(item);
      })(LANGS[j]);
    }
    wrap.appendChild(menu);

    function openMenu() {
      menu.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    }
    trigger.addEventListener('click', function () {
      if (menu.hidden) { openMenu(); } else { closeMenu(); }
    });
    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    if (select) {
      select.parentNode.replaceChild(wrap, select);
    } else {
      var backBtn = header.querySelector('.back-btn');
      if (backBtn) {
        backBtn.parentNode.replaceChild(wrap, backBtn);
      } else {
        header.appendChild(wrap);
      }
    }
  }

  /**
   * 切换语言：写入 localStorage 记忆后重载页面（页内 JS 生成的文案需按新语言重新渲染）。
   * 边界：localStorage 写入失败（隐私模式等）时仍重载，本次生效但无法记忆。
   */
  function setLang(code) {
    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) {}
    window.location.reload();
  }

  /**
   * 生成内联 SVG 图标（currentColor 着色，随文字颜色变化）：
   *  - globe：地球（语言标识）
   *  - chevron：下拉箭头（展开指示）
   *  - check：对勾（当前语言标记）
   */
  function svgIcon(name, cls) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    if (cls) svg.setAttribute('class', cls);
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('width', '14');
    svg.setAttribute('height', '14');
    if (name === 'globe') {
      svg.setAttribute('viewBox', '0 0 24 24');
      var circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('cx', '12'); circle.setAttribute('cy', '12'); circle.setAttribute('r', '9');
      svg.appendChild(circle);
      var ellipse = document.createElementNS(ns, 'ellipse');
      ellipse.setAttribute('cx', '12'); ellipse.setAttribute('cy', '12'); ellipse.setAttribute('rx', '4'); ellipse.setAttribute('ry', '9');
      svg.appendChild(ellipse);
      var line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', '3'); line.setAttribute('y1', '12'); line.setAttribute('x2', '21'); line.setAttribute('y2', '12');
      svg.appendChild(line);
    } else if (name === 'chevron') {
      svg.setAttribute('viewBox', '0 0 10 6');
      svg.setAttribute('stroke-width', '1.5');
      var path = document.createElementNS(ns, 'path');
      path.setAttribute('d', 'M1 1l4 4 4-4');
      svg.appendChild(path);
    } else if (name === 'check') {
      svg.setAttribute('viewBox', '0 0 16 16');
      var path2 = document.createElementNS(ns, 'path');
      path2.setAttribute('d', 'M2.5 8.5l3.5 3.5 7.5-8');
      svg.appendChild(path2);
    }
    return svg;
  }

  /**
   * 返回按钮迁移（仅工具页执行）：
   *  1. 在 .tool-workspace 的第一个子节点之前插入新返回按钮（.back-btn .back-btn-workspace），链接回主页
   *  2. 移除 header 中旧返回按钮（此时已被切换器替换，若无残留则 no-op）
   * 文案取词典 common.back，缺词典时回退「← 返回」。
   * 边界：.tool-workspace 不存在时不执行；链接相对路径按工具页深度（../../）计算。
   */
  function migrateBackButton() {
    if (!pageKey) return;
    var header = document.querySelector('.global-header');
    var workspace = document.querySelector('.tool-workspace');
    if (!workspace) return;
    var oldBtn = header ? header.querySelector('.back-btn') : null;
    var a = document.createElement('a');
    a.href = (isToolPage() ? '../../' : '') + 'index.html';
    a.className = 'back-btn back-btn-workspace';
    a.textContent = dict['common.back'] || '← 返回';
    if (workspace.firstChild) workspace.insertBefore(a, workspace.firstChild);
    else workspace.appendChild(a);
    if (oldBtn) oldBtn.remove();
  }

  /**
   * 应用词典文案到页面元素：
   *  - [data-i18n="key"]：替换 textContent（key 为完整词典 key）
   *  - [data-i18n-html="key"]：替换 innerHTML（用于含链接/行内标签的段落，词典值须为受信 HTML——仅项目自写词典，无用户输入）
   *  - [data-i18n-placeholder="key"]：替换 placeholder 属性
   *  - [data-i18n-attr-title="key"]：替换 title 属性
   *  - [data-i18n-attr-aria-label="key"]：替换 aria-label 属性（可访问性）
   * 词典缺 key 时元素保持 HTML 原文（优雅降级，未翻译页面不受影响）。
   */
  function apply() {
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      if (dict[key] != null) els[i].textContent = dict[key];
    }
    var htmlEls = document.querySelectorAll('[data-i18n-html]');
    for (var h = 0; h < htmlEls.length; h++) {
      var hk = htmlEls[h].getAttribute('data-i18n-html');
      if (dict[hk] != null) htmlEls[h].innerHTML = dict[hk];
    }
    var phs = document.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < phs.length; j++) {
      var pk = phs[j].getAttribute('data-i18n-placeholder');
      if (dict[pk] != null) phs[j].setAttribute('placeholder', dict[pk]);
    }
    var ts = document.querySelectorAll('[data-i18n-attr-title]');
    for (var k = 0; k < ts.length; k++) {
      var tk = ts[k].getAttribute('data-i18n-attr-title');
      if (dict[tk] != null) ts[k].setAttribute('title', dict[tk]);
    }
    var als = document.querySelectorAll('[data-i18n-attr-aria-label]');
    for (var a = 0; a < als.length; a++) {
      var ak = als[a].getAttribute('data-i18n-attr-aria-label');
      if (dict[ak] != null) als[a].setAttribute('aria-label', dict[ak]);
    }
  }

  /**
   * 对外暴露的全局接口：
   *  - I18N.lang：当前语言代码（页内 JS 可据此做语言相关逻辑，如排序 locale）
   *  - I18N.dict：当前语言词典（只读使用）
   *  - I18N.t(key)：取当前语言文案，词典缺 key 时原样返回 key（调用方自行回退）
   */
  window.I18N = {
    lang: lang,
    dict: dict,
    t: function (key) {
      return (dict[key] != null) ? dict[key] : key;
    }
  };

  /* 页面初始化：更新 html lang -> 注入切换器 -> 迁移返回按钮 -> 更新元数据 -> 应用文案 */
  document.documentElement.lang = lang;
  renderSwitcher();
  migrateBackButton();
  setMeta();
  apply();
})();
