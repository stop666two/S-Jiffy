/* S-Jiffy AudioKit - 音频工具共享核心库（ES5）
 * 提供：解码 / WAV 编码 / MP3 编码(lamejs) / 波形绘制 / 播放器 / 工具函数
 * 依赖：无（lamejs 由页面自行引入，检测 window.lamejs）
 */
window.AudioKit = (function () {
  'use strict';

  var MAX_SIZE = 50 * 1024 * 1024;
  var PEAK_N = 3000;

  function clamp(v, min, max) { return v < min ? min : (v > max ? max : v); }

  function formatBytes(bytes) {
    if (!bytes) return '0 B';
    var k = 1024;
    var sizes = ['B', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
  }

  function pad2(n) { return n < 10 ? '0' + n : String(n); }

  function formatDuration(seconds) {
    var s = Math.floor(seconds);
    var h = Math.floor(s / 3600);
    var m = Math.floor((s % 3600) / 60);
    var sec = s % 60;
    if (h > 0) return pad2(h) + ':' + pad2(m) + ':' + pad2(sec);
    return pad2(m) + ':' + pad2(sec);
  }

  function fmtMs(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    var ms = Math.floor((sec % 1) * 1000);
    return pad2(m) + ':' + pad2(s) + '.' + (ms < 100 ? (ms < 10 ? '00' + ms : '0' + ms) : String(ms));
  }

  function parseTimeInput(val) {
    var v = String(val == null ? '' : val).trim();
    var colon = v.match(/^(\d+):(\d{2})\.(\d{1,3})$/);
    if (colon) {
      return parseInt(colon[1], 10) * 60 + parseInt(colon[2], 10) + parseInt(colon[3] + '000'.slice(colon[3].length), 10) / 1000;
    }
    var plain = parseFloat(v);
    return isNaN(plain) ? null : plain;
  }

  function downloadBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 100);
  }

  function getOutputName(original, suffix, ext) {
    var base = String(original).replace(/\.[^/.]+$/, '');
    return base + '_' + suffix + '.' + (ext || 'wav');
  }

  function createAudioContext() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) throw new Error('AudioContext 不受支持');
    return new AC();
  }

  /* ---- 解码 ---- */
  function decodeAudioFile(file, onOk, onErr) {
    if (!file) { onErr(new Error('no file')); return; }
    if (file.size > MAX_SIZE) { onErr(new Error('file too large')); return; }
    var fr = new FileReader();
    fr.onload = function () {
      var ctx;
      try { ctx = createAudioContext(); } catch (e) { onErr(e); return; }
      ctx.decodeAudioData(fr.result, function (buf) {
        try { ctx.close(); } catch (e) {}
        onOk(buf);
      }, function (e) {
        try { ctx.close(); } catch (e2) {}
        onErr(e || new Error('decode failed'));
      });
    };
    fr.onerror = function () { onErr(fr.error || new Error('read failed')); };
    fr.readAsArrayBuffer(file);
  }

  /* ---- WAV 编码（16-bit PCM）---- */
  function writeString(view, offset, str) {
    for (var i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  }

  function audioBufferToWav(buffer) {
    var numChannels = buffer.numberOfChannels;
    var sampleRate = buffer.sampleRate;
    var length = buffer.length;
    var bytesPerSample = 2;
    var blockAlign = numChannels * bytesPerSample;
    var byteRate = sampleRate * blockAlign;
    var dataSize = length * blockAlign;
    var totalSize = 44 + dataSize;
    var ab = new ArrayBuffer(totalSize);
    var view = new DataView(ab);
    writeString(view, 0, 'RIFF');
    view.setUint32(4, totalSize - 8, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);
    var offset = 44;
    for (var i = 0; i < length; i++) {
      for (var ch = 0; ch < numChannels; ch++) {
        var sample = clamp(buffer.getChannelData(ch)[i], -1, 1);
        var int16 = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
        view.setInt16(offset, int16, true);
        offset += 2;
      }
    }
    return new Blob([ab], { type: 'audio/wav' });
  }

  /* ---- 重采样 ---- */
  function resampleBuffer(buf, targetRate, onOk, onErr) {
    if (buf.sampleRate === targetRate) { onOk(buf); return; }
    var off;
    try { off = new OfflineAudioContext(buf.numberOfChannels, Math.max(1, Math.round(buf.duration * targetRate)), targetRate); }
    catch (e) { onErr(e); return; }
    var src = off.createBufferSource();
    src.buffer = buf;
    src.connect(off.destination);
    src.start(0);
    off.startRendering().then(onOk, onErr);
  }

  /* ---- 峰值 ---- */
  function computePeaks(buffer, n) {
    if (!n) n = PEAK_N;
    var ch = buffer.getChannelData(0);
    var block = Math.floor(ch.length / n);
    var p = new Float32Array(n);
    for (var i = 0; i < n; i++) {
      var max = 0;
      var s = i * block;
      var e = Math.min(s + block, ch.length);
      for (var j = s; j < e; j++) {
        var a = Math.abs(ch[j]);
        if (a > max) max = a;
      }
      p[i] = Math.max(0.02, max);
    }
    return p;
  }

  /* ---- 波形绘制（浅色主题）---- */
  function drawWaveform(canvas, opts) {
    if (!canvas || !opts || !opts.peaks) return;
    var peaks = opts.peaks;
    var duration = opts.duration || 1;
    var vs = opts.viewStart || 0;
    var vd = opts.viewDuration || duration;
    var selS = opts.selectionStart;
    var selE = opts.selectionEnd;
    var splits = opts.splitPoints || [];
    var ph = opts.playheadSec;
    var accent = opts.accentColor || '#111111';
    var W = canvas.clientWidth || 600;
    var H = canvas.clientHeight || 170;
    var dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
    }
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var RULER_H = 30;
    var WAVE_H = H - RULER_H;
    ctx.fillStyle = '#faf9f7';
    ctx.fillRect(0, 0, W, H);
    var BAR_W = 2.5;
    var GAP = 1;
    var UNIT = BAR_W + GAP;
    var numBars = Math.floor(W / UNIT);
    var centerY = WAVE_H / 2;
    var hasSel = typeof selS === 'number' && typeof selE === 'number' && selE > selS;
    for (var i = 0; i < numBars; i++) {
      var tA = vs + (i / numBars) * vd;
      var tB = vs + ((i + 1) / numBars) * vd;
      var pA = Math.floor((tA / duration) * peaks.length);
      var pB = Math.ceil((tB / duration) * peaks.length);
      var peak = 0;
      for (var p = pA; p < pB && p < peaks.length; p++) if (peaks[p] > peak) peak = peaks[p];
      peak = Math.max(0.02, peak);
      var barH = Math.max(2, peak * (WAVE_H - 20) * 0.95);
      var x = i * UNIT;
      var midT = (tA + tB) / 2;
      var inSel = hasSel && midT >= selS && midT <= selE;
      ctx.globalAlpha = inSel ? 1 : 0.35;
      ctx.fillStyle = inSel ? accent : '#111111';
      ctx.fillRect(x, centerY - barH / 2, BAR_W, barH);
    }
    ctx.globalAlpha = 1;
    if (hasSel) {
      var sX = clamp(((selS - vs) / vd) * W, 0, W);
      var eX = clamp(((selE - vs) / vd) * W, 0, W);
      if (eX > sX) {
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.08;
        ctx.fillRect(sX, 0, eX - sX, WAVE_H);
        ctx.globalAlpha = 1;
        ctx.fillStyle = accent;
        ctx.fillRect(sX - 1.5, 0, 3, WAVE_H);
        ctx.fillRect(eX - 1.5, 0, 3, WAVE_H);
      }
    }
    for (var si = 0; si < splits.length; si++) {
      var spX = ((splits[si] - vs) / vd) * W;
      if (spX < -20 || spX > W + 20) continue;
      ctx.fillStyle = '#c2410c';
      ctx.fillRect(spX - 1.5, 0, 3, WAVE_H);
      ctx.beginPath();
      ctx.moveTo(spX - 7, 0);
      ctx.lineTo(spX + 7, 0);
      ctx.lineTo(spX, 12);
      ctx.fill();
    }
    if (typeof ph === 'number' && ph >= vs && ph <= vs + vd) {
      var px = ((ph - vs) / vd) * W;
      ctx.fillStyle = '#111111';
      ctx.fillRect(px - 1, 0, 2, WAVE_H);
      ctx.beginPath();
      ctx.moveTo(px - 5, 0);
      ctx.lineTo(px + 5, 0);
      ctx.lineTo(px, 8);
      ctx.fill();
    }
    ctx.fillStyle = '#f0efec';
    ctx.fillRect(0, WAVE_H, W, RULER_H);
    ctx.fillStyle = '#787774';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    var candidates = [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5, 10, 30, 60, 120, 300];
    var target = vd / 8;
    var interval = 300;
    for (var ci = 0; ci < candidates.length; ci++) { if (candidates[ci] >= target) { interval = candidates[ci]; break; } }
    var firstTick = Math.ceil(vs / interval) * interval;
    for (var t = firstTick; t <= vs + vd + 0.0001; t += interval) {
      var rx = ((t - vs) / vd) * W;
      if (rx < -10 || rx > W + 10) continue;
      ctx.fillStyle = '#d6d4d0';
      ctx.fillRect(rx, WAVE_H, 1, 6);
      if (rx > 24 && rx < W - 24) {
        ctx.fillStyle = '#787774';
        ctx.fillText(fmtMs(t), rx, WAVE_H + 18);
      }
    }
  }

  /* ---- 播放器 ---- */
  function createPlayer(opts) {
    var ctx = null;
    var src = null;
    var raf = null;
    var startCtxT = 0;
    var startOff = 0;
    var endT = 0;
    var playing = false;
    var paused = false;
    var lastT = 0;

    function fireState() { if (opts.onState) opts.onState(playing, paused); }
    function firePlayhead(t) { if (opts.onPlayhead) opts.onPlayhead(t); }

    function stop() {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      if (src) {
        src.onended = null;
        try { src.stop(); } catch (e) {}
        try { src.disconnect(); } catch (e) {}
        src = null;
      }
      playing = false;
      paused = false;
      fireState();
    }

    function tick() {
      if (!ctx || !playing || paused) return;
      var cur = startOff + (ctx.currentTime - startCtxT);
      if (cur >= endT) {
        cur = endT;
        playing = false;
        paused = false;
        firePlayhead(cur);
        fireState();
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        if (opts.onEnd) opts.onEnd();
        return;
      }
      lastT = cur;
      firePlayhead(cur);
      raf = requestAnimationFrame(tick);
    }

    function play(from, to) {
      var buf = opts.getBuffer();
      if (!buf) return;
      stop();
      try {
        if (!ctx) ctx = createAudioContext();
        if (ctx.state === 'suspended') ctx.resume();
        src = ctx.createBufferSource();
        src.buffer = buf;
        src.connect(ctx.destination);
        startCtxT = ctx.currentTime;
        startOff = from;
        endT = to;
        lastT = from;
        src.start(startCtxT, from, Math.max(0.001, to - from));
        playing = true;
        paused = false;
        src.onended = function () { playing = false; paused = false; fireState(); };
        firePlayhead(from);
        fireState();
        tick();
      } catch (e) { stop(); if (opts.onError) opts.onError(e); }
    }

    function pause() {
      if (!ctx || !playing || paused) return;
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      if (ctx.suspend) ctx.suspend();
      paused = true;
      fireState();
    }

    function resume() {
      if (!ctx || !playing || !paused) return;
      if (ctx.resume) ctx.resume();
      paused = false;
      fireState();
      tick();
    }

    function getPosition() { return lastT; }

    function destroy() {
      stop();
      if (ctx) { try { ctx.close(); } catch (e) {} ctx = null; }
    }

    return {
      play: play,
      pause: pause,
      resume: resume,
      stop: stop,
      destroy: destroy,
      getPosition: getPosition,
      isPlaying: function () { return playing && !paused; },
      isPaused: function () { return paused; },
      hasContext: function () { return !!ctx; }
    };
  }

  /* ---- 裁剪/分段渲染（OfflineAudioContext）---- */
  function trimBuffer(buffer, startSec, endSec, onOk, onErr) {
    var sampleRate = buffer.sampleRate;
    var channels = buffer.numberOfChannels;
    var startSample = Math.floor(startSec * sampleRate);
    var endSample = Math.min(Math.floor(endSec * sampleRate), buffer.length);
    var trimLength = Math.max(0, endSample - startSample);
    var off;
    try { off = new OfflineAudioContext(channels, trimLength, sampleRate); }
    catch (e) { onErr(e); return; }
    var src = off.createBufferSource();
    src.buffer = buffer;
    src.connect(off.destination);
    src.start(0, startSec, endSec - startSec);
    off.startRendering().then(onOk, onErr);
  }

  /* ---- MP3 编码（lamejs，分批避免假死）---- */
  function toInt16(arr) {
    var out = new Int16Array(arr.length);
    for (var i = 0; i < arr.length; i++) {
      out[i] = Math.max(-32768, Math.min(32767, Math.round(arr[i] * 32767)));
    }
    return out;
  }

  function encodeMp3(buffer, bitrate, onProgress, onDone, onErr) {
    if (!window.lamejs || !window.lamejs.Mp3Encoder) { onErr(new Error('MP3 编码库未加载')); return; }
    var channels = buffer.numberOfChannels > 1 ? 2 : 1;
    var encoder = new window.lamejs.Mp3Encoder(channels, buffer.sampleRate, bitrate);
    var BLOCK = 1152;
    var chunks = [];
    var left = toInt16(buffer.getChannelData(0));
    var right = channels === 2 ? toInt16(buffer.getChannelData(1)) : left;
    var i = 0;
    function step() {
      var started = Date.now();
      while (i < left.length && Date.now() - started < 60) {
        var lc = left.subarray(i, i + BLOCK);
        var enc = channels === 2 ? encoder.encodeBuffer(lc, right.subarray(i, i + BLOCK)) : encoder.encodeBuffer(lc);
        if (enc.length > 0) chunks.push(enc);
        i += BLOCK;
      }
      if (onProgress) onProgress(Math.min(1, i / Math.max(1, left.length)));
      if (i < left.length) {
        setTimeout(step, 0);
      } else {
        var tail = encoder.flush();
        if (tail.length > 0) chunks.push(tail);
        onDone(new Blob(chunks, { type: 'audio/mpeg' }));
      }
    }
    setTimeout(step, 0);
  }

  /* ---- 输出：按格式产出 Blob（wav 同步 / mp3 分批 / 其余走 MediaRecorder）---- */
  function exportBuffer(buffer, format, opts, onProgress, onDone, onErr) {
    if (format === 'wav') {
      onProgress(1);
      try { onDone(audioBufferToWav(buffer)); }
      catch (e) { onErr(e); }
      return;
    }
    if (format === 'mp3') {
      encodeMp3(buffer, (opts && opts.bitrate) || 192, onProgress, onDone, onErr);
      return;
    }
    var mime = 'audio/' + format;
    if (!window.MediaRecorder || !MediaRecorder.isTypeSupported(mime)) {
      onErr(new Error('unsupported mime'));
      return;
    }
    var wav = audioBufferToWav(buffer);
    var url = URL.createObjectURL(wav);
    var audio = new Audio();
    audio.src = url;
    var settled = false;
    function settleErr(err) {
      if (settled) return;
      settled = true;
      URL.revokeObjectURL(url);
      try { audio.src = ''; } catch (e) {}
      onErr(err);
    }
    function settleOk(blob) {
      if (settled) return;
      settled = true;
      URL.revokeObjectURL(url);
      try { audio.src = ''; } catch (e) {}
      onProgress(1);
      onDone(blob);
    }
    audio.addEventListener('canplaythrough', function () {
      var ctx;
      try { ctx = createAudioContext(); } catch (e) { settleErr(e); return; }
      var srcNode = ctx.createMediaElementSource(audio);
      var dest = ctx.createMediaStreamDestination();
      srcNode.connect(dest);
      var rec;
      try { rec = new MediaRecorder(dest.stream, { mimeType: mime }); }
      catch (e) { try { ctx.close(); } catch (e2) {} settleErr(e); return; }
      var chunks = [];
      rec.ondataavailable = function (e) { if (e.data && e.data.size > 0) chunks.push(e.data); };
      rec.onstop = function () {
        try { ctx.close(); } catch (e) {}
        settleOk(new Blob(chunks, { type: mime }));
      };
      rec.onerror = function (e) {
        try { ctx.close(); } catch (e2) {}
        settleErr(e && e.error ? e.error : new Error('recorder error'));
      };
      onProgress(0.1);
      rec.start();
      audio.play();
      audio.addEventListener('ended', function () { try { rec.stop(); } catch (e) {} });
    });
    audio.addEventListener('error', function () { settleErr(new Error('load error')); });
  }

  /* ---- 合并（参考行为：升采样到最大 SR/声道，可选淡入淡出）---- */
  function mergeBuffers(buffers, opts, onOk, onErr) {
    if (!buffers.length) { onErr(new Error('no buffers')); return; }
    if (buffers.length === 1) { onOk(buffers[0]); return; }
    var sampleRate = 48000;
    var numChannels = 2;
    for (var i = 0; i < buffers.length; i++) {
      if (buffers[i].sampleRate > sampleRate) sampleRate = buffers[i].sampleRate;
      if (buffers[i].numberOfChannels > numChannels) numChannels = buffers[i].numberOfChannels;
    }
    var fadeIn = opts && opts.fadeIn ? opts.fadeIn : 0;
    var fadeOut = opts && opts.fadeOut ? opts.fadeOut : 0;
    var total = 0;
    for (var j = 0; j < buffers.length; j++) total += Math.ceil(buffers[j].duration * sampleRate);
    var off;
    try { off = new OfflineAudioContext(numChannels, total, sampleRate); }
    catch (e) { onErr(e); return; }
    var offsetSamples = 0;
    var pending = buffers.length;
    function placed() {
      pending--;
      if (pending === 0) {
        off.startRendering().then(onOk, onErr);
      }
    }
    for (var k = 0; k < buffers.length; k++) {
      (function (buf, segStart, segDur, segEnd) {
        var fi = Math.min(fadeIn, segDur / 2);
        var fo = Math.min(fadeOut, segDur / 2);
        var src = off.createBufferSource();
        src.buffer = buf;
        if (fi > 0 || fo > 0) {
          var gain = off.createGain();
          if (fi > 0) {
            gain.gain.setValueAtTime(0, segStart);
            gain.gain.linearRampToValueAtTime(1, segStart + fi);
          } else {
            gain.gain.setValueAtTime(1, segStart);
          }
          if (fo > 0) {
            gain.gain.setValueAtTime(1, segEnd - fo);
            gain.gain.linearRampToValueAtTime(0, segEnd);
          }
          src.connect(gain);
          gain.connect(off.destination);
        } else {
          src.connect(off.destination);
        }
        src.start(segStart);
        placed();
      })(buffers[k], offsetSamples / sampleRate, buffers[k].duration, (offsetSamples + Math.ceil(buffers[k].duration * sampleRate)) / sampleRate);
      offsetSamples += Math.ceil(buffers[k].duration * sampleRate);
    }
  }

  /* ---- 噪声门（离线样本级处理，降级方案）----
   * threshold: 0-50 强度（映射 RMS 阈值）
   * attackMs / releaseMs: 门开关平滑时间
   */
  function applyNoiseGate(buffer, threshold, attackMs, releaseMs, onProgress, onDone) {
    var sr = buffer.sampleRate;
    var thrDb = -50 + threshold * 0.9;
    var thr = Math.pow(10, thrDb / 20);
    var win = Math.max(64, Math.floor(sr * 0.02));
    var atkCoef = Math.exp(-1 / Math.max(1, attackMs / 1000 * sr));
    var relCoef = Math.exp(-1 / Math.max(1, releaseMs / 1000 * sr));
    var out;
    try {
      out = new AudioBuffer({ numberOfChannels: buffer.numberOfChannels, length: buffer.length, sampleRate: sr });
    } catch (e) {
      var off = new OfflineAudioContext(buffer.numberOfChannels, buffer.length, sr);
      var s2 = off.createBufferSource();
      s2.buffer = buffer;
      s2.connect(off.destination);
      s2.start(0);
      off.startRendering().then(function (b) {
        processInto(b, b);
        onDone(b);
      }, function () {
        onDone(buffer);
      });
      return;
    }
    processInto(buffer, out);
    onDone(out);
    function processInto(buf, dst) {
      for (var ch = 0; ch < buf.numberOfChannels; ch++) {
        var inp = buf.getChannelData(ch);
        var outp = dst.getChannelData(ch);
        var env = 0;
        var n = inp.length;
        for (var i = 0; i < n; i += win) {
          var e2 = Math.min(i + win, n);
          var sum = 0;
          for (var j = i; j < e2; j++) sum += inp[j] * inp[j];
          var rms = Math.sqrt(sum / (e2 - i));
          var target = rms > thr ? 1 : 0;
          if (target > env) env += (target - env) * (1 - atkCoef);
          else env += (target - env) * (1 - relCoef);
          for (var k = i; k < e2; k++) outp[k] = inp[k] * env;
        }
        if (onProgress) onProgress((ch + 1) / buf.numberOfChannels);
      }
    }
  }

  /* ---- RNNoise AI 降噪（CDN ESM 动态加载；失败由调用方降级）---- */
  var rnnoisePromise = null;
  function getRNNoise() {
    if (rnnoisePromise) return rnnoisePromise;
    var base = 'https://cdn.jsdelivr.net/npm/@jitsi/rnnoise-wasm@0.2.1/dist/';
    rnnoisePromise = import(base + 'rnnoise.js').then(function (mod) {
      var create = mod && (mod.default || mod.createRNNWasmModule);
      if (!create) throw new Error('rnnoise export missing');
      return create({ locateFile: function () { return base + 'rnnoise.wasm'; } });
    });
    return rnnoisePromise;
  }

  function denoiseWithRNNoise(buffer, onProgress, onDone, onErr) {
    var TARGET_SR = 48000;
    var FRAME = 480;
    var SCALE = 32768;
    function process(work) {
      var denoised;
      try {
        denoised = new AudioBuffer({ numberOfChannels: work.numberOfChannels, length: work.length, sampleRate: TARGET_SR });
      } catch (e) {
        denoised = work;
      }
      return getRNNoise().then(function (rn) {
        var inPtr = rn._malloc(FRAME * 4);
        var outPtr = rn._malloc(FRAME * 4);
        var ch;
        function doChannel(ci) {
          if (ci >= work.numberOfChannels) {
            rn._free(inPtr);
            rn._free(outPtr);
            return Promise.resolve(denoised);
          }
          return new Promise(function (resolve) {
            var inp = work.getChannelData(ci);
            var outp = denoised.getChannelData(ci);
            var state = rn._rnnoise_create(0);
            var i = 0;
            function step() {
              var started = Date.now();
              while (i < inp.length && Date.now() - started < 60) {
                for (var j = 0; j < FRAME; j++) {
                  rn.HEAPF32[(inPtr >> 2) + j] = (i + j < inp.length ? inp[i + j] : 0) * SCALE;
                }
                rn._rnnoise_process_frame(state, outPtr, inPtr);
                for (var k = 0; k < FRAME && i + k < outp.length; k++) {
                  outp[i + k] = rn.HEAPF32[(outPtr >> 2) + k] / SCALE;
                }
                i += FRAME;
              }
              if (onProgress) onProgress((ci + (i / Math.max(1, inp.length))) / work.numberOfChannels);
              if (i < inp.length) {
                setTimeout(step, 0);
              } else {
                rn._rnnoise_destroy(state);
                resolve(doChannel(ci + 1));
              }
            }
            setTimeout(step, 0);
          });
        }
        return doChannel(0);
      });
    }
    var p;
    if (buffer.sampleRate !== TARGET_SR) {
      p = new Promise(function (res, rej) { resampleBuffer(buffer, TARGET_SR, res, rej); });
    } else {
      p = Promise.resolve(buffer);
    }
    p.then(function (work) {
      process(work).then(function (denoised) {
        if (buffer.sampleRate !== TARGET_SR) {
          resampleBuffer(denoised, buffer.sampleRate, function (b) { onProgress(1); onDone(audioBufferToWav(b)); }, onErr);
        } else {
          onProgress(1);
          onDone(audioBufferToWav(denoised));
        }
      }, onErr);
    }, onErr);
  }

  return {
    MAX_SIZE: MAX_SIZE,
    clamp: clamp,
    formatBytes: formatBytes,
    formatDuration: formatDuration,
    fmtMs: fmtMs,
    parseTimeInput: parseTimeInput,
    downloadBlob: downloadBlob,
    getOutputName: getOutputName,
    createAudioContext: createAudioContext,
    decodeAudioFile: decodeAudioFile,
    audioBufferToWav: audioBufferToWav,
    resampleBuffer: resampleBuffer,
    computePeaks: computePeaks,
    drawWaveform: drawWaveform,
    createPlayer: createPlayer,
    trimBuffer: trimBuffer,
    encodeMp3: encodeMp3,
    exportBuffer: exportBuffer,
    mergeBuffers: mergeBuffers,
    applyNoiseGate: applyNoiseGate,
    getRNNoise: getRNNoise,
    denoiseWithRNNoise: denoiseWithRNNoise
  };
})();
