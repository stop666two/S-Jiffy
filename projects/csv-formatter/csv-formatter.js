(function () {
  'use strict';

  var DELIMS = [',', ';', '\t', '|'];
  var MAX_ROWS = 5000;
  var ROWS_PER_PAGE = 100;

  var rawText = '';
  var fileName = null;
  var fileSize = null;
  var inputDelim = 'auto';
  var outputDelim = ',';
  var trimSpaces = true;
  var fillMissing = true;
  var addBOM = false;
  var parsed = null;
  var validation = null;
  var formattedText = null;
  var activeTab = 'preview';
  var page = 0;

  var el = {
    raw: null, dropZone: null, uploadBtn: null, fileInput: null, fileName: null,
    inputDelimSel: null, outputDelimSel: null, trimChk: null, fillChk: null, bomChk: null,
    previewBtn: null, formatBtn: null, validateBtn: null, copyBtn: null, downloadBtn: null, resetBtn: null,
    stats: null, tabs: null, body: null, detected: null
  };

  function $(id){ return document.getElementById(id); }

  function escapeHtml(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function formatBytes(n){
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
    return (n / 1024 / 1024).toFixed(2) + ' MB';
  }

  function delimLabel(d){
    if (d === ',') return t('delimComma','逗号 (,)');
    if (d === ';') return t('delimSemicolon','分号 (;)');
    if (d === '\t') return t('delimTab','制表符');
    if (d === '|') return t('delimPipe','竖线 (|)');
    return t('delimAuto','自动检测');
  }

  /* ─── CSV parser (RFC 4180, char-based) ─── */
  function detectDelimiter(text){
    var sample = text.slice(0, 8192);
    var scores = {};
    var i, d;
    for (i = 0; i < DELIMS.length; i++) {
      d = DELIMS[i];
      var lines = sample.split('\n').slice(0, 10).filter(function (l) { return l.trim().length > 0; });
      if (lines.length < 2) { scores[d] = 0; continue; }
      var counts = lines.map(function (line) {
        var count = 0, inQuote = false, j;
        for (j = 0; j < line.length; j++) {
          if (line.charAt(j) === '"') inQuote = !inQuote;
          else if (!inQuote && line.charAt(j) === d) count++;
        }
        return count;
      });
      var first = counts[0];
      if (first === 0) { scores[d] = 0; continue; }
      var consistent = counts.filter(function (c) { return c === first; }).length;
      scores[d] = (consistent / counts.length) * (first + 1);
    }
    var best = ',', bestScore = -1;
    for (i = 0; i < DELIMS.length; i++) {
      if (scores[DELIMS[i]] > bestScore) { bestScore = scores[DELIMS[i]]; best = DELIMS[i]; }
    }
    return best;
  }

  function parseCSVText(text, options){
    options = options || {};
    var maxRows = options.maxRows || MAX_ROWS;
    var trim = !!options.trimSpaces;
    var delim = options.delimiter || detectDelimiter(text);
    var rows = [], pos = 0, len = text.length, truncated = false, lineCount = 0;

    while (pos < len) {
      if (rows.length >= maxRows) {
        while (pos < len) { if (text.charAt(pos) === '\n') lineCount++; pos++; }
        truncated = true;
        break;
      }
      var row = [];
      var fieldStart = true;

      while (pos <= len) {
        if (pos === len) {
          if (fieldStart && row.length > 0) row.push('');
          if (row.length > 0) rows.push(row);
          lineCount++;
          pos++;
          break;
        }
        var ch = text.charAt(pos);

        if (fieldStart && ch === '"') {
          pos++;
          var field = '';
          while (pos < len) {
            if (text.charAt(pos) === '"') {
              if (pos + 1 < len && text.charAt(pos + 1) === '"') { field += '"'; pos += 2; }
              else { pos++; break; }
            } else { field += text.charAt(pos); pos++; }
          }
          row.push(trim ? field.trim() : field);
          fieldStart = false;
          if (pos < len && text.charAt(pos) === delim) { pos++; fieldStart = true; }
          else if (pos < len && (text.charAt(pos) === '\r' || text.charAt(pos) === '\n')) {
            if (text.charAt(pos) === '\r' && pos + 1 < len && text.charAt(pos + 1) === '\n') pos++;
            pos++; lineCount++; rows.push(row); break;
          }
        } else if (ch === delim) {
          if (fieldStart) row.push('');
          pos++; fieldStart = true;
        } else if (ch === '\r' || ch === '\n') {
          if (fieldStart) row.push('');
          if (text.charAt(pos) === '\r' && pos + 1 < len && text.charAt(pos + 1) === '\n') pos++;
          pos++; lineCount++; rows.push(row); break;
        } else {
          var f = '';
          while (pos < len && text.charAt(pos) !== delim && text.charAt(pos) !== '\r' && text.charAt(pos) !== '\n') {
            f += text.charAt(pos); pos++;
          }
          row.push(trim ? f.trim() : f);
          fieldStart = false;
          if (pos < len && text.charAt(pos) === delim) { pos++; fieldStart = true; }
          else if (pos < len && (text.charAt(pos) === '\r' || text.charAt(pos) === '\n')) {
            if (text.charAt(pos) === '\r' && pos + 1 < len && text.charAt(pos + 1) === '\n') pos++;
            pos++; lineCount++; rows.push(row); break;
          }
        }
      }
    }
    var cleaned = rows.filter(function (r) { return !(r.length === 1 && r[0] === ''); });
    return { rows: cleaned, delimiter: delim, truncated: truncated, totalLineCount: lineCount };
  }

  function escapeCSVField(field, delimiter){
    if (field.indexOf('"') !== -1 || field.indexOf(delimiter) !== -1 || field.indexOf('\n') !== -1 || field.indexOf('\r') !== -1) {
      return '"' + field.replace(/"/g, '""') + '"';
    }
    return field;
  }

  function serializeRows(rows, delimiter, bom){
    var lines = rows.map(function (row) {
      return row.map(function (f) { return escapeCSVField(f, delimiter); }).join(delimiter);
    });
    var body = lines.join('\r\n');
    return bom ? '\uFEFF' + body : body;
  }

  function formatCSVData(rows, options){
    options = options || {};
    var outDelim = options.outputDelimiter || ',';
    var trim = !!options.trimSpaces;
    var fill = !!options.fillMissingCols;
    var bom = !!options.addBOM;
    var maxCols = 0, i;
    for (i = 0; i < rows.length; i++) if (rows[i].length > maxCols) maxCols = rows[i].length;
    var normalized = rows.map(function (row) {
      var r = trim ? row.map(function (f) { return f.trim(); }) : row.slice();
      if (fill) while (r.length < maxCols) r.push('');
      return r;
    });
    return serializeRows(normalized, outDelim, bom);
  }

  function validateCSVData(rows){
    var issues = [];
    var emptyRowIndices = [];
    if (rows.length === 0) {
      return { valid: false, rowCount: 0, colCount: 0, issues: [{ row: 0, col: undefined, message: t('fileEmpty','文件为空'), severity: 'error' }], emptyRowIndices: [] };
    }
    var headerRow = rows[0];
    var colCount = headerRow.length;
    var seen = {}, duplicates = [];
    for (var h = 0; h < headerRow.length; h++) {
      var key = headerRow[h].trim().toLowerCase();
      if (seen[key]) duplicates.push(headerRow[h]);
      else seen[key] = true;
    }
    if (duplicates.length > 0) {
      issues.push({ row: 1, col: undefined, message: t('dupHeaders','重复表头: ')+duplicates.join(', '), severity: 'warning' });
    }
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var rowNum = i + 1;
      var allEmpty = true;
      for (var e = 0; e < row.length; e++) { if (row[e].trim() !== '') { allEmpty = false; break; } }
      if (allEmpty) {
        emptyRowIndices.push(i);
        issues.push({ row: rowNum, col: undefined, message: t('rowEmpty','第 ')+rowNum+t('rowEmptyTail',' 行为空'), severity: 'warning' });
        continue;
      }
      if (row.length !== colCount) {
        issues.push({ row: rowNum, col: undefined, message: t('colMismatch','第 ')+rowNum+t('colMismatchMid',' 行有 ')+row.length+t('colMismatchTail',' 列，应为 ')+colCount, severity: 'error' });
      }
      for (var c = 0; c < row.length; c++) {
        if (row[c].trim() === '') {
          issues.push({ row: rowNum, col: c + 1, message: t('cellEmpty','第 ')+rowNum+t('cellEmptyMid',' 行第 ')+(c + 1)+t('cellEmptyTail',' 列为空'), severity: 'warning' });
        }
      }
    }
    var hasError = false;
    for (var x = 0; x < issues.length; x++) if (issues[x].severity === 'error') { hasError = true; break; }
    return { valid: !hasError, rowCount: rows.length, colCount: colCount, issues: issues, emptyRowIndices: emptyRowIndices };
  }

  /* ─── state helpers ─── */
  function getEffectiveDelimiter(){
    return inputDelim === 'auto' ? detectDelimiter(rawText) : inputDelim;
  }

  function runParseAndValidate(text, delim){
    var result = parseCSVText(text, { delimiter: delim, trimSpaces: trimSpaces, maxRows: MAX_ROWS });
    var v = validateCSVData(result.rows);
    return { result: result, v: v };
  }

  function getIssueRowSet(issues){
    var s = {};
    for (var i = 0; i < issues.length; i++) s[issues[i].row - 1] = true;
    return s;
  }

  /* ─── actions ─── */
  function handleParse(){
    if (!rawText.trim()) return;
    var delim = getEffectiveDelimiter();
    var r = runParseAndValidate(rawText, delim);
    parsed = r.result; validation = r.v; formattedText = null;
    page = 0; activeTab = 'preview';
    render();
  }

  function handleFormat(){
    if (!rawText.trim()) return;
    var delim = getEffectiveDelimiter();
    var result = parseCSVText(rawText, { delimiter: delim, trimSpaces: trimSpaces, maxRows: MAX_ROWS });
    formattedText = formatCSVData(result.rows, { outputDelimiter: outputDelim, trimSpaces: trimSpaces, fillMissingCols: fillMissing, addBOM: addBOM });
    var reparsed = parseCSVText(formattedText, { delimiter: outputDelim, trimSpaces: trimSpaces });
    var v = validateCSVData(reparsed.rows);
    parsed = reparsed; validation = v;
    page = 0; activeTab = 'raw';
    render();
    setStatus(t('formattedOk','格式化完成'));
  }

  function handleValidate(){
    if (!rawText.trim()) return;
    var delim = getEffectiveDelimiter();
    var r = runParseAndValidate(rawText, delim);
    parsed = r.result; validation = r.v; formattedText = null;
    page = 0; activeTab = 'issues';
    render();
  }

  function handleAutoFix(){
    if (!parsed || !validation) return;
    var rows = parsed.rows;
    if (rows.length === 0) return;
    var headerColCount = rows[0].length;
    var emptySet = {};
    for (var i = 0; i < validation.emptyRowIndices.length; i++) emptySet[validation.emptyRowIndices[i]] = true;
    var fixedRows = [];
    for (var j = 0; j < rows.length; j++) {
      if (j !== 0 && emptySet[j]) continue;
      var r = trimSpaces ? rows[j].map(function (f) { return f.trim(); }) : rows[j].slice();
      while (r.length < headerColCount) r.push('');
      fixedRows.push(r);
    }
    var fixed = formatCSVData(fixedRows, { outputDelimiter: outputDelim, trimSpaces: trimSpaces, fillMissingCols: true, addBOM: false });
    rawText = fixed;
    el.raw.value = fixed;
    formattedText = null;
    var reparsed = parseCSVText(fixed, { delimiter: outputDelim, trimSpaces: trimSpaces });
    var v = validateCSVData(reparsed.rows);
    parsed = reparsed; validation = v;
    page = 0; activeTab = 'issues';
    render();
    setStatus(t('autoFixed','已自动修复'));
  }

  function handleReset(){
    rawText = ''; fileName = null; fileSize = null;
    parsed = null; validation = null; formattedText = null;
    page = 0; activeTab = 'preview';
    el.raw.value = '';
    el.fileName.textContent = '';
    el.fileInput.value = '';
    render();
    setStatus('');
  }

  function handleCopy(){
    var text = formattedText !== null ? formattedText : rawText;
    if (!text) return;
    copyToClipboard(text, el.copyBtn);
  }

  function handleDownload(){
    var text = formattedText !== null ? formattedText : rawText;
    if (!text) return;
    var content = addBOM ? '\uFEFF' + text : text;
    var blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName ? fileName.replace(/\.[^.]+$/, '_formatted.csv') : 'formatted.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatus(t('downloaded','已下载'));
  }

  function loadFile(file){
    if (!file.name.match(/\.(csv|tsv|txt)$/i)) {
      setStatus(t('badFileType','仅支持 .csv / .tsv / .txt 文件'),'error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setStatus(t('fileTooLarge','文件过大（上限 10MB）'),'error');
      return;
    }
    fileName = file.name;
    fileSize = file.size;
    el.fileName.textContent = fileName + (fileSize !== null ? ' · ' + formatBytes(fileSize) : '');
    var reader = new FileReader();
    reader.onload = function (e) {
      var text = String(e.target.result);
      if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
      rawText = text;
      el.raw.value = text;
      parsed = null; validation = null; formattedText = null; page = 0; activeTab = 'preview';
      render();
      setStatus(t('fileLoaded','文件已加载'));
    };
    reader.onerror = function () { setStatus(t('readFailed','文件读取失败'),'error'); };
    reader.readAsText(file, 'UTF-8');
  }

  /* ─── render ─── */
  function renderStats(){
    if (!parsed) { el.stats.innerHTML = ''; return; }
    var html = '';
    html += '<span class="stat-item"><b>' + parsed.rows.length + '</b> ' + t('rowsLabel','行') + '</span>';
    html += '<span class="stat-sep">·</span>';
    html += '<span class="stat-item"><b>' + validation.colCount + '</b> ' + t('colsLabel','列') + '</span>';
    html += '<span class="stat-sep">·</span>';
    html += '<span class="stat-item">' + t('delimiterLabel','分隔符') + ': <b class="stat-delim">' + escapeHtml(delimLabel(parsed.delimiter)) + '</b></span>';
    if (parsed.truncated) {
      html += '<span class="stat-sep">·</span><span class="stat-warn">' + t('previewLimitedRows','已限制预览行数') + '</span>';
    }
    if (validation) {
      var errs = 0, warns = 0;
      for (var i = 0; i < validation.issues.length; i++) {
        if (validation.issues[i].severity === 'error') errs++;
        else warns++;
      }
      html += '<span class="stat-sep">·</span>';
      if (errs === 0 && warns === 0) html += '<span class="stat-ok">' + t('validCsv','有效 ✓') + '</span>';
      else if (errs > 0) html += '<span class="stat-err">' + errs + ' ' + t('errorLabel','错误') + (warns > 0 ? ', ' + warns + ' ' + t('warningLabel','警告') : '') + '</span>';
      else html += '<span class="stat-warn">' + warns + ' ' + t('warningLabel','警告') + '</span>';
    }
    el.stats.innerHTML = html;
  }

  function renderTabs(){
    var tabs = [
      { key: 'preview', label: t('previewLabel','预览') },
      { key: 'raw', label: t('rawLabel','原文') },
      { key: 'issues', label: t('issuesLabel','问题') + (validation ? ' (' + validation.issues.length + ')' : '') }
    ];
    var html = '';
    for (var i = 0; i < tabs.length; i++) {
      html += '<button class="tab-btn' + (activeTab === tabs[i].key ? ' on' : '') + '" data-tab="' + tabs[i].key + '">' + tabs[i].label + '</button>';
    }
    el.tabs.innerHTML = html;
    var btns = el.tabs.querySelectorAll('.tab-btn');
    for (var j = 0; j < btns.length; j++) {
      (function (btn) {
        btn.addEventListener('click', function () { activeTab = btn.getAttribute('data-tab'); render(); });
      })(btns[j]);
    }
  }

  function renderPreview(){
    if (!parsed) { el.body.innerHTML = ''; return; }
    var displayRows = parsed.rows;
    var headerRow = displayRows[0] || [];
    var totalPages = Math.max(1, Math.ceil(Math.max(0, displayRows.length - 1) / ROWS_PER_PAGE));
    if (page >= totalPages) page = totalPages - 1;
    var bodyRows = displayRows.slice(1 + page * ROWS_PER_PAGE, 1 + (page + 1) * ROWS_PER_PAGE);
    var issueSet = getIssueRowSet(validation ? validation.issues : []);

    var html = '<div class="table-wrap"><table class="csv-table"><thead><tr><th class="row-num">#</th>';
    for (var h = 0; h < headerRow.length; h++) {
      var hv = headerRow[h];
      html += '<th>' + (hv ? escapeHtml(hv) : '<span class="muted-italic">col ' + (h + 1) + '</span>') + '</th>';
    }
    html += '</tr></thead><tbody>';
    if (bodyRows.length === 0) {
      html += '<tr><td class="empty-row" colspan="' + (headerRow.length + 1) + '">' + t('noDataRows','无数据行') + '</td></tr>';
    }
    for (var r = 0; r < bodyRows.length; r++) {
      var rowIdxInRows = 1 + page * ROWS_PER_PAGE + r;
      var hasIssue = issueSet[rowIdxInRows];
      html += '<tr class="' + (hasIssue ? 'issue-row' : '') + '"><td class="row-num">' + (page * ROWS_PER_PAGE + r + 1) + '</td>';
      for (var c = 0; c < headerRow.length; c++) {
        var cell = bodyRows[r][c];
        var cellVal = (cell === undefined) ? '' : cell;
        var isEmpty = cellVal.trim() === '';
        html += '<td class="' + (isEmpty ? 'cell-empty' : '') + '">' + (isEmpty ? t('emptyCell','（空）') : escapeHtml(cellVal)) + '</td>';
      }
      html += '</tr>';
    }
    html += '</tbody></table></div>';
    if (totalPages > 1) {
      html += '<div class="pager">';
      html += '<button class="page-btn" id="prevPageBtn"' + (page === 0 ? ' disabled' : '') + '>' + t('prevPage','← 上一页') + '</button>';
      html += '<span class="page-info">' + t('pageLabel','第 ') + (page + 1) + ' / ' + totalPages + t('pageLabelTail',' 页') + '</span>';
      html += '<button class="page-btn" id="nextPageBtn"' + (page >= totalPages - 1 ? ' disabled' : '') + '>' + t('nextPage','下一页 →') + '</button>';
      html += '</div>';
    }
    el.body.innerHTML = html;
    var prevBtn = $('prevPageBtn'), nextBtn = $('nextPageBtn');
    if (prevBtn) prevBtn.addEventListener('click', function () { page = Math.max(0, page - 1); renderPreview(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { page = Math.min(totalPages - 1, page + 1); renderPreview(); });
  }

  function renderRaw(){
    var text = formattedText !== null ? formattedText : rawText;
    var label = formattedText !== null ? t('formattedOutput','格式化输出') : t('rawInput','原始输入');
    el.body.innerHTML = '<div class="raw-head"><span>' + label + '</span><button class="small-btn" id="rawCopyBtn">' + t('common.copy','复制') + '</button></div>';
    el.body.innerHTML += '<textarea class="raw-out" readonly spellcheck="false">' + escapeHtml(text) + '</textarea>';
    var rawCopyBtn = $('rawCopyBtn');
    if (rawCopyBtn) rawCopyBtn.addEventListener('click', function () { if (text) copyToClipboard(text, rawCopyBtn); });
  }

  function renderIssues(){
    if (!validation) {
      el.body.innerHTML = '<div class="empty-msg">' + t('clickValidateMsg','点击验证以检查CSV是否有问题。') + '</div>';
      return;
    }
    var errs = 0, warns = 0;
    for (var i = 0; i < validation.issues.length; i++) {
      if (validation.issues[i].severity === 'error') errs++;
      else warns++;
    }
    var canAutoFix = errs > 0 || validation.emptyRowIndices.length > 0;
    var cls = (errs === 0 && warns === 0) ? 'ok' : (errs > 0 ? 'err' : 'warn');
    var summaryTitle = (errs === 0 && warns === 0) ? t('noIssuesFound','未发现问题') : (errs > 0 ? t('structuralErrors','检测到结构性错误') : t('warningsOnly','仅警告'));
    var html = '<div class="issue-summary ' + cls + '"><div><p class="issue-title">' + summaryTitle + '</p>';
    html += '<p class="issue-sub">' + validation.rowCount + ' ' + t('rowsLabel','行') + ' · ' + validation.colCount + ' ' + t('colsLabel','列');
    if (validation.issues.length > 0) html += ' · ' + errs + ' ' + t('errorLabel','错误') + ', ' + warns + ' ' + t('warningLabel','警告');
    html += '</p></div>';
    if (canAutoFix) html += '<button class="small-btn auto-fix-btn" id="autoFixBtn">' + t('autoFix','自动修复') + '</button>';
    html += '</div>';
    if (validation.issues.length === 0) {
      html += '<p class="empty-msg">' + t('allRowsGood','所有行都正常！') + '</p>';
    } else {
      html += '<div class="issue-list">';
      for (var x = 0; x < validation.issues.length; x++) {
        var issue = validation.issues[x];
        html += '<div class="issue-item ' + issue.severity + '">';
        html += '<span class="issue-sev">' + (issue.severity === 'error' ? t('errorLabel','错误') : t('warningLabel','警告')) + '</span>';
        if (issue.col !== undefined) html += '<span class="issue-col">Col ' + issue.col + '</span>';
        html += '<span class="issue-msg">' + escapeHtml(issue.message) + '</span>';
        html += '<button class="go-btn" data-row="' + issue.row + '">' + t('goToRow','跳转到行') + '</button>';
        html += '</div>';
      }
      html += '</div>';
    }
    el.body.innerHTML = html;
    var autoFixBtn = $('autoFixBtn');
    if (autoFixBtn) autoFixBtn.addEventListener('click', handleAutoFix);
    var goBtns = el.body.querySelectorAll('.go-btn');
    for (var g = 0; g < goBtns.length; g++) {
      (function (btn) {
        btn.addEventListener('click', function () {
          var rowNum = parseInt(btn.getAttribute('data-row'), 10);
          page = Math.max(0, Math.floor((rowNum - 2) / ROWS_PER_PAGE));
          activeTab = 'preview';
          render();
        });
      })(goBtns[g]);
    }
  }

  function render(){
    var resultCard = $('resultCard');
    if (resultCard) resultCard.style.display = parsed ? 'block' : 'none';
    var detectedDelim = rawText ? detectDelimiter(rawText) : ',';
    if (rawText && inputDelim === 'auto') {
      el.detected.textContent = t('detectedLabel','已检测: ') + delimLabel(detectedDelim);
      el.detected.style.display = 'inline';
    } else {
      el.detected.textContent = '';
      el.detected.style.display = 'none';
    }
    var hasContent = rawText.trim().length > 0;
    el.previewBtn.disabled = !hasContent;
    el.formatBtn.disabled = !hasContent;
    el.validateBtn.disabled = !hasContent;
    el.copyBtn.style.display = hasContent ? '' : 'none';
    el.downloadBtn.style.display = hasContent ? '' : 'none';
    el.resetBtn.style.display = hasContent ? '' : 'none';

    renderStats();
    renderTabs();
    if (activeTab === 'preview') renderPreview();
    else if (activeTab === 'raw') renderRaw();
    else renderIssues();
  }

  /* ─── init ─── */
  function init(){
    el.raw = $('csvRaw');
    el.dropZone = $('dropZone');
    el.uploadBtn = $('uploadBtn');
    el.fileInput = $('fileInput');
    el.fileName = $('fileName');
    el.detected = $('detectedDelim');
    el.inputDelimSel = $('inputDelimSel');
    el.outputDelimSel = $('outputDelimSel');
    el.trimChk = $('trimChk');
    el.fillChk = $('fillChk');
    el.bomChk = $('bomChk');
    el.previewBtn = $('previewBtn');
    el.formatBtn = $('formatBtn');
    el.validateBtn = $('validateBtn');
    el.copyBtn = $('copyBtn');
    el.downloadBtn = $('downloadBtn');
    el.resetBtn = $('resetBtn');
    el.stats = $('statsBar');
    el.tabs = $('tabBar');
    el.body = $('resultBody');

    el.inputDelimSel.addEventListener('change', function () { inputDelim = el.inputDelimSel.value; parsed = null; validation = null; formattedText = null; page = 0; activeTab = 'preview'; render(); });
    el.outputDelimSel.addEventListener('change', function () { outputDelim = el.outputDelimSel.value; });
    el.trimChk.addEventListener('change', function () { trimSpaces = el.trimChk.checked; });
    el.fillChk.addEventListener('change', function () { fillMissing = el.fillChk.checked; });
    el.bomChk.addEventListener('change', function () { addBOM = el.bomChk.checked; });

    el.previewBtn.addEventListener('click', handleParse);
    el.formatBtn.addEventListener('click', handleFormat);
    el.validateBtn.addEventListener('click', handleValidate);
    el.copyBtn.addEventListener('click', handleCopy);
    el.downloadBtn.addEventListener('click', handleDownload);
    el.resetBtn.addEventListener('click', handleReset);

    el.uploadBtn.addEventListener('click', function () { el.fileInput.click(); });
    el.fileInput.addEventListener('change', function () {
      var f = el.fileInput.files[0];
      if (f) loadFile(f);
      el.fileInput.value = '';
    });
    el.dropZone.addEventListener('dragover', function (e) { e.preventDefault(); el.dropZone.classList.add('drag-on'); });
    el.dropZone.addEventListener('dragleave', function () { el.dropZone.classList.remove('drag-on'); });
    el.dropZone.addEventListener('drop', function (e) {
      e.preventDefault();
      el.dropZone.classList.remove('drag-on');
      var f = e.dataTransfer.files[0];
      if (f) loadFile(f);
    });
    el.raw.addEventListener('input', function () {
      rawText = el.raw.value;
      parsed = null; validation = null; formattedText = null;
      page = 0; activeTab = 'preview';
      render();
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
