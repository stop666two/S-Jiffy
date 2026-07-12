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

document.addEventListener('DOMContentLoaded', function () {
  var focusInput = document.querySelector('.js-focus-input');
  if (focusInput) focusInput.focus();
});

function savePreference(key, value) {
  try { localStorage.setItem('s-jiffy:' + key, JSON.stringify(value)); } catch (e) {}
}
function loadPreference(key, defaultValue) {
  try {
    var v = localStorage.getItem('s-jiffy:' + key);
    return v ? JSON.parse(v) : defaultValue;
  } catch (e) { return defaultValue; }
}

/* ---- History & Usage Tracking ---- */

var HISTORY_KEY = 's-jiffy:history';
var USAGE_KEY = 's-jiffy:usage';

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

function getFrequentlyUsed(limit) {
  if (limit === undefined) limit = 12;
  var usage = getUsage();
  var sorted = Object.keys(usage)
    .map(function (k) { return { name: k, count: usage[k].count, lastUsed: usage[k].lastUsed }; })
    .filter(function (t) { return t.count > 0; })
    .sort(function (a, b) { return b.count - a.count; });
  return sorted.slice(0, limit);
}

function getRecentUsed(limit) {
  if (limit === undefined) limit = 8;
  var usage = getUsage();
  var sorted = Object.keys(usage)
    .map(function (k) { return { name: k, count: usage[k].count, lastUsed: usage[k].lastUsed }; })
    .filter(function (t) { return t.count > 0; })
    .sort(function (a, b) { return b.lastUsed - a.lastUsed; });
  return sorted.slice(0, limit);
}

/* ---- Popular tools (based on common internet usage patterns) ---- */
var POPULAR_TOOLS = [
  'Base64 编解码', 'JSON Formatter', 'URL 编解码', 'Hash 计算器', 'MD5 生成器',
  'QR 码生成器', 'UUID 生成器', '时间戳转换', '进制转换', '密码生成器',
  '颜色转换', '温度转换', '正则测试器', '命名风格转换', '百分比计算',
  'JWT 解析器', 'HTML 实体转义', '图片转 Base64', '随机数生成', 'Lorem Ipsum',
  'ASCII 文字画', 'JSON 转 CSV', 'YAML 转 JSON', 'HTML 净化器', 'HSL 取色器',
  '随机密码', 'RSA 密钥生成', 'Epoch 转换', 'Cron 表达式', 'IP 子网计算'
];