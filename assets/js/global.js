function copyToClipboard(text, buttonEl) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = buttonEl.textContent;
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
