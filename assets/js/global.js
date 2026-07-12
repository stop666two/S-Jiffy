function copyToClipboard(text, buttonEl) {
  navigator.clipboard.writeText(text).then(() => {
    var originalText = buttonEl.textContent;
    buttonEl.textContent = '已复制';
    buttonEl.disabled = true;
    setTimeout(() => {
      buttonEl.textContent = originalText;
      buttonEl.disabled = false;
    }, 2000);
  }).catch(() => {
    setStatus('复制失败', 'error');
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

/* ---- Auto-record tool visit on tool pages ---- */
document.addEventListener('DOMContentLoaded', function () {
  var h1 = document.querySelector('.tool-workspace h1');
  var path = window.location.pathname;
  if (h1 && path.indexOf('/projects/') !== -1) {
    recordUse(h1.textContent.trim());
  }
  var focusInput = document.querySelector('.js-focus-input');
  if (focusInput) focusInput.focus();
});
