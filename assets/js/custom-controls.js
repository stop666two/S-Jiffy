/* 自研控件库：颜色选择器（替代浏览器原生 input[type=color] 弹窗） */
(function () {
  'use strict';

  var PRESET_COLORS = [
    '#000000', '#444444', '#666666', '#888888', '#aaaaaa', '#cccccc', '#eeeeee', '#ffffff',
    '#8b0000', '#cc0000', '#e53935', '#ff7043', '#ff8a65', '#f4511e', '#bf360c', '#5d4037',
    '#e65100', '#fb8c00', '#ff9800', '#ffb300', '#ffca28', '#fdd835', '#f9a825', '#ff6f00',
    '#f57f17', '#aeea00', '#8bc34a', '#4caf50', '#2e7d32', '#1b5e20', '#00695c', '#00897b',
    '#26a69a', '#4dd0e1', '#00bcd4', '#0097a7', '#0277bd', '#1565c0', '#1e88e5', '#42a5f5',
    '#90caf9', '#64b5f6', '#283593', '#303f9f', '#3949ab', '#5c6bc0', '#7986cb', '#9fa8da',
    '#4527a0', '#651fff', '#7c4dff', '#9575cd', '#b39ddb', '#ab47bc', '#8e24aa', '#6a1b9a',
    '#ad1457', '#c2185b', '#d81b60', '#e91e63', '#f06292', '#f48fb1', '#ec407a', '#880e4f'
  ];

  var STYLE = '.cp-wrap{display:inline-block;position:relative;vertical-align:middle}.cp-swatch{display:inline-block;width:28px;height:28px;border:1px solid var(--color-border);border-radius:var(--radius-sm);cursor:pointer;padding:0;box-shadow:inset 0 0 0 2px rgba(255,255,255,.35);vertical-align:middle}.cp-swatch:focus{outline:2px solid var(--color-accent);outline-offset:2px}.cp-panel{position:fixed;z-index:9999;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);box-shadow:0 8px 24px rgba(0,0,0,.18);padding:10px;display:none}.cp-panel.open{display:block}.cp-grid{display:grid;grid-template-columns:repeat(8,24px);gap:4px;margin-bottom:8px}.cp-cell{width:24px;height:24px;border:1px solid rgba(0,0,0,.12);border-radius:4px;cursor:pointer;padding:0}.cp-cell:focus,.cp-cell:hover{outline:2px solid var(--color-accent);outline-offset:1px}.cp-cell.sel{outline:2px solid var(--color-accent);outline-offset:1px}.cp-hex-row{display:flex;align-items:center;gap:6px}.cp-hex-row label{font-size:var(--font-size-xs);color:var(--color-text-secondary)}.cp-hex{width:76px;height:26px;border:1px solid var(--color-border);border-radius:var(--radius-sm);padding:0 6px;font-family:var(--font-mono);font-size:var(--font-size-sm)}';

  function injectStyle() {
    var s = document.createElement('style');
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  function isValidHex(v) {
    return /^#?[0-9a-fA-F]{6}$/.test(v);
  }

  function buildPicker(field) {
    if (field.dataset.cpDone) return;
    field.dataset.cpDone = '1';
    field.style.position = 'absolute';
    field.style.opacity = '0';
    field.style.width = '1px';
    field.style.height = '1px';
    field.style.pointerEvents = 'none';

    var wrap = document.createElement('span');
    wrap.className = 'cp-wrap';

    var swatch = document.createElement('button');
    swatch.type = 'button';
    swatch.className = 'cp-swatch';
    swatch.setAttribute('aria-label', t('common.chooseColor', '选择颜色'));

    var panel = document.createElement('div');
    panel.className = 'cp-panel';

    var grid = document.createElement('div');
    grid.className = 'cp-grid';

    PRESET_COLORS.forEach(function (hex) {
      var cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'cp-cell';
      cell.style.background = hex;
      cell.setAttribute('aria-label', hex);
      cell.addEventListener('click', function () {
        applyColor(hex);
      });
      grid.appendChild(cell);
    });
    panel.appendChild(grid);

    var hexRow = document.createElement('div');
    hexRow.className = 'cp-hex-row';
    var label = document.createElement('label');
    label.textContent = t('common.custom', '自定义');
    var hexInput = document.createElement('input');
    hexInput.className = 'cp-hex';
    hexInput.maxLength = 7;
    hexInput.setAttribute('placeholder', '#1e6df2');
    hexRow.appendChild(label);
    hexRow.appendChild(hexInput);
    panel.appendChild(hexRow);

    function refresh() {
      var v = field.value || '#000000';
      swatch.style.background = v;
      hexInput.value = v;
      grid.querySelectorAll('.cp-cell').forEach(function (c) {
        c.classList.toggle('sel', c.style.background === v || normalize(c.getAttribute('aria-label')) === normalize(v));
      });
    }

    function normalize(v) {
      return v.charAt(0) === '#' ? v.toLowerCase() : '#' + v.toLowerCase();
    }

    function applyColor(hex) {
      var v = normalize(hex);
      field.value = v;
      swatch.style.background = v;
      hexInput.value = v;
      try { field.dispatchEvent(new Event('input', { bubbles: true })); } catch (e) { }
      try { field.dispatchEvent(new Event('change', { bubbles: true })); } catch (e) { }
      closePanel();
    }

    function openPanel() {
      refresh();
      panel.classList.add('open');
      var r = swatch.getBoundingClientRect();
      var pw = panel.offsetWidth;
      var ph = panel.offsetHeight;
      var left = Math.min(Math.max(0, r.left), window.innerWidth - pw - 8);
      var top = r.bottom + 6;
      if (top + ph > window.innerHeight) top = Math.max(0, r.top - ph - 6);
      panel.style.left = left + 'px';
      panel.style.top = top + 'px';
    }

    function closePanel() {
      panel.classList.remove('open');
    }

    swatch.addEventListener('click', function (e) {
      e.stopPropagation();
      if (panel.classList.contains('open')) { closePanel(); } else { openPanel(); }
    });

    hexInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var v = hexInput.value.trim();
        if (isValidHex(v)) { applyColor(v); } else {       setStatus(t('common.invalidColor', '颜色格式应为 #RRGGBB'), 'error'); }
      }
      if (e.key === 'Escape') { closePanel(); }
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target) && !panel.contains(e.target)) closePanel();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePanel();
    });
    window.addEventListener('resize', closePanel);
    window.addEventListener('scroll', closePanel, true);

    wrap.appendChild(swatch);
    panel.style.display = '';
    wrap.appendChild(panel);
    field.parentNode.insertBefore(wrap, field.nextSibling);
    refresh();
  }

  function initColorPickers(root) {
    var scope = root || document;
    var inputs = scope.querySelectorAll('input[type="color"]');
    for (var i = 0; i < inputs.length; i++) buildPicker(inputs[i]);
  }

  injectStyle();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initColorPickers(); });
  } else {
    initColorPickers();
  }
  window.initColorPickers = initColorPickers;
})();
