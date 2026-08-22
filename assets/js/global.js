function htmlEscape(str) {
  if (str == null) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

/* ---- i18n 取词（i18n.js 未加载时回退中文，兼容未改造页面） ---- */
function t(key, fallback) {
  return (window.I18N && I18N.dict[key] != null) ? I18N.dict[key] : fallback;
}

/* ---- Modal / Dialog ---- */
var modalEl = null;
function getModal() {
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.className = 'modal-overlay';
    modalEl.innerHTML = '<div class="modal-box"><h3 id="modalTitle"></h3><div id="modalBody"></div><div class="modal-actions" id="modalActions"></div></div>';
    modalEl.addEventListener('click', function (e) {
      if (e.target === modalEl) modalEl.classList.remove('open');
    });
    document.body.appendChild(modalEl);
  }
  return modalEl;
}

function showPrompt(title, placeholder, defaultValue, callback) {
  var m = getModal();
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = '<input class="modal-input" id="modalInput" type="text" placeholder="' + htmlEscape(placeholder || '') + '" value="' + htmlEscape(defaultValue || '') + '">';
  document.getElementById('modalActions').innerHTML = '<button class="btn btn-secondary" id="modalCancel">' + t('common.cancel', '取消') + '</button><button class="btn btn-primary" id="modalOk">' + t('common.ok', '确定') + '</button>';
  m.classList.add('open');
  var input = document.getElementById('modalInput');
  input.focus();
  input.select();
  function cleanup() { m.classList.remove('open'); }
  document.getElementById('modalCancel').onclick = function () { cleanup(); callback(null); };
  document.getElementById('modalOk').onclick = function () { var v = input.value; cleanup(); callback(v); };
  input.onkeydown = function (e) { if (e.key === 'Enter') { var v = input.value; cleanup(); callback(v); } if (e.key === 'Escape') { cleanup(); callback(null); } };
}

function showAlert(message) {
  var m = getModal();
  document.getElementById('modalTitle').textContent = '';
  document.getElementById('modalBody').innerHTML = '<p style="font-size:var(--font-size-sm);color:var(--color-text-secondary);line-height:1.5">' + htmlEscape(message) + '</p>';
  document.getElementById('modalActions').innerHTML = '<button class="btn btn-primary" id="modalOk">' + t('common.ok', '确定') + '</button>';
  m.classList.add('open');
  document.getElementById('modalOk').onclick = function () { m.classList.remove('open'); };
  document.getElementById('modalOk').focus();
}

function showConfirm(message, callback) {
  var m = getModal();
  document.getElementById('modalTitle').textContent = '';
  document.getElementById('modalBody').innerHTML = '<p style="font-size:var(--font-size-sm);color:var(--color-text-secondary);line-height:1.5">' + htmlEscape(message) + '</p>';
  document.getElementById('modalActions').innerHTML = '<button class="btn btn-secondary" id="modalCancel">' + t('common.cancel', '取消') + '</button><button class="btn btn-primary" id="modalOk">' + t('common.ok', '确定') + '</button>';
  m.classList.add('open');
  function cleanup() { m.classList.remove('open'); }
  document.getElementById('modalCancel').onclick = function () { cleanup(); callback(false); };
  document.getElementById('modalOk').onclick = function () { cleanup(); callback(true); };
  document.getElementById('modalCancel').focus();
}

function isSecureContext() {
  return window.isSecureContext || location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
}

function copyToClipboard(text, buttonEl) {
  navigator.clipboard.writeText(text).then(() => {
    var originalText = buttonEl.textContent;
    buttonEl.textContent = t('common.copied', '已复制');
    buttonEl.disabled = true;
    setTimeout(() => {
      buttonEl.textContent = originalText;
      buttonEl.disabled = false;
    }, 2000);
  }).catch(() => {
    setStatus(t('common.copyFailed', '复制失败'), 'error');
  });
}

function setStatus(message, type) {
  if (type === undefined) type = 'info';
  var statusEl = document.querySelector('.tool-status');
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.style.color = type === 'error' ? 'var(--color-error)' : 'var(--color-text-secondary)';
  if (type !== 'error') {
    setTimeout(function () {
      if (statusEl.textContent === message) {
        statusEl.textContent = '';
      }
    }, 3000);
  }
}

function savePreference(key, value) {
  try { localStorage.setItem('s-jiffy:' + key, JSON.stringify(value)); } catch (e) {}
}
function loadPreference(key, defaultValue) {
  try {
    var v = localStorage.getItem('s-jiffy:' + key);
    return v ? JSON.parse(v) : defaultValue;
  } catch (e) { return defaultValue; }
}

/* ---- Usage history (localStorage, survives updates) ---- */

function getUsage() {
  return loadPreference('usage', {});
}

function saveUsage(usage) {
  savePreference('usage', usage);
}

function recordUse(toolName) {
  var usage = getUsage();
  var now = Date.now();
  if (!usage[toolName]) {
    usage[toolName] = { count: 1, lastUsed: now, firstUsed: now };
  } else {
    usage[toolName].count += 1;
    usage[toolName].lastUsed = now;
  }
  saveUsage(usage);
}

function getHistory(limit) {
  if (limit === undefined) limit = 50;
  var usage = getUsage();
  var sorted = Object.keys(usage)
    .map(function (k) { return { name: k, count: usage[k].count, lastUsed: usage[k].lastUsed }; })
    .sort(function (a, b) { return b.lastUsed - a.lastUsed; });
  return sorted.slice(0, limit);
}

function getHistoryCount() {
  var usage = getUsage();
  return Object.keys(usage).length;
}

/* ---- Auto-record tool visit on tool pages (slug-based, survives i18n) ---- */
document.addEventListener('DOMContentLoaded', function () {
  var h1 = document.querySelector('.tool-workspace h1');
  var path = window.location.pathname;
  if (path.indexOf('/projects/') !== -1) {
    var m = path.match(/\/([^/]+)\/index\.html$/);
    recordUse(m ? m[1] : (h1 ? h1.textContent.trim() : ''));
  }
  var focusInput = document.querySelector('.js-focus-input');
  if (focusInput) focusInput.focus();
});
