/* saadbabezzine.com site script (file kept as lock.js so every page already loads it).
   1) Welcome screen: live Tron-style grid background, power-up circuit, rotating tagline,
      PROCEED button. Shown once per browser session.
   2) Project feedback: a small private feedback form added to every project page (Formspree). */
(function () {
  var KEY = 'sb-welcomed';
  try { if (sessionStorage.getItem(KEY) === '1') return; } catch (e) {}
  try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var css = '' +
  'html.sb-hold,html.sb-hold body{overflow:hidden!important}' +
  '#sb-hi{position:fixed;inset:0;z-index:2147483000;background:#03070B;color:#E8FBFF;font:400 1.0625rem/1.6 "Public Sans",system-ui,sans-serif;transition:opacity .7s ease}' +
  '#sb-hi.out{opacity:0;pointer-events:none}' +
  '#sb-hi canvas{position:absolute;inset:0;width:100%;height:100%;display:block}' +
  '#sb-hi .stage{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:1.25rem}' +
  '#sb-hi .card{position:relative;width:100%;max-width:27rem;text-align:center;padding:2.2rem 1.75rem 2rem;background:rgba(4,14,20,.62);-webkit-backdrop-filter:blur(7px);backdrop-filter:blur(7px);border:1px solid rgba(0,229,255,.35);border-radius:14px;box-shadow:0 0 0 1px rgba(0,229,255,.08) inset,0 0 40px rgba(0,229,255,.18),0 20px 60px rgba(0,0,0,.6);opacity:0;transform:translateY(10px) scale(.98);animation:hiCard .7s cubic-bezier(.2,.8,.2,1) .25s forwards}' +
  '#sb-hi .card::before,#sb-hi .card::after{content:"";position:absolute;width:22px;height:22px;border:2px solid #00E5FF;filter:drop-shadow(0 0 4px #00E5FF)}' +
  '#sb-hi .card::before{top:-1px;left:-1px;border-right:0;border-bottom:0;border-top-left-radius:14px}' +
  '#sb-hi .card::after{bottom:-1px;right:-1px;border-left:0;border-top:0;border-bottom-right-radius:14px}' +
  '#sb-hi .name{font-family:Spectral,Georgia,serif;font-weight:600;font-size:clamp(2.1rem,8vw,2.9rem);line-height:1.05;margin:0 0 .4rem;letter-spacing:-.01em;color:#fff;text-shadow:0 0 18px rgba(0,229,255,.45)}' +
  '#sb-hi .tag{position:relative;margin:0 auto 1.6rem;max-width:22rem;min-height:2.2rem;display:flex;flex-direction:column;align-items:center;justify-content:center}' +
  '#sb-hi .tag-text{color:#8FB8C2;font-size:1rem;letter-spacing:.02em;line-height:1.4;transition:opacity .55s ease,filter .55s ease,transform .55s ease}' +
  '#sb-hi .tag-text.out{opacity:0;filter:blur(4px);transform:translateY(-4px)}' +
  '#sb-hi .tag-text.in{opacity:0;filter:blur(4px);transform:translateY(4px);transition:none}' +
  '#sb-hi .tag-bar{display:block;width:3.5rem;height:2px;margin-top:.55rem;background:rgba(0,229,255,.18);border-radius:2px;overflow:hidden;position:relative}' +
  '#sb-hi .tag-bar::after{content:"";position:absolute;inset:0;width:0;background:#00E5FF;box-shadow:0 0 6px #00E5FF}' +
  '#sb-hi .tag-bar.run::after{animation:hiFill 3.6s linear forwards}' +
  '#sb-hi svg{width:100%;max-width:22rem;height:auto;display:block;margin:0 auto 1rem;overflow:visible}' +
  '#sb-hi .w{stroke:rgba(143,184,194,.45);stroke-width:2;fill:none}' +
  '#sb-hi .d{stroke:#00E5FF;stroke-width:2;fill:rgba(0,0,0,.4)}' +
  '#sb-hi .sine{stroke:#6FF6FF;stroke-width:1.8;fill:none}' +
  '#sb-hi .pin{fill:#00E5FF}' +
  '#sb-hi .blade{stroke:#fff;stroke-width:2.5;stroke-linecap:round;transform-box:view-box;transform-origin:112px 40px;transform:rotate(-32deg);animation:hiClose .3s cubic-bezier(.5,1.6,.5,1) 1.1s forwards}' +
  '#sb-hi .live{stroke:#00E5FF;stroke-width:3;fill:none;stroke-dasharray:240;stroke-dashoffset:240;filter:drop-shadow(0 0 5px #00E5FF);animation:hiDraw .6s ease-in 1.35s forwards}' +
  '#sb-hi .bulb{fill:rgba(0,0,0,.4);stroke:#00E5FF;stroke-width:2;animation:hiBulb .3s ease-out 1.9s forwards}' +
  '#sb-hi .glow{fill:#FFD54A;opacity:0;animation:hiGlow .4s ease-out 1.9s forwards}' +
  '#sb-hi .base{fill:#3c5560}' +
  '#sb-hi .msg{min-height:1.5rem;margin:0;font-size:.95rem;color:#6FF6FF;letter-spacing:.04em;opacity:0;animation:hiFade .4s ease-out 2s forwards}' +
  '#sb-hi .ok{margin-top:1.4rem;font:600 1rem "Public Sans",system-ui,sans-serif;letter-spacing:.14em;background:transparent;color:#00E5FF;border:1.5px solid #00E5FF;border-radius:999px;padding:.7rem 2.6rem;cursor:pointer;box-shadow:0 0 14px rgba(0,229,255,.35),inset 0 0 10px rgba(0,229,255,.15);opacity:0;transform:translateY(6px);animation:hiRise .45s ease-out 2.15s forwards;transition:background .2s,color .2s,box-shadow .2s}' +
  '#sb-hi .ok:hover,#sb-hi .ok:focus-visible{background:#00E5FF;color:#001014;box-shadow:0 0 26px rgba(0,229,255,.8);outline:none}' +
  '@keyframes hiCard{to{opacity:1;transform:none}}' +
  '@keyframes hiClose{to{transform:rotate(0)}}' +
  '@keyframes hiDraw{to{stroke-dashoffset:0}}' +
  '@keyframes hiBulb{to{fill:#FFE27A;stroke:#FFE27A}}' +
  '@keyframes hiGlow{to{opacity:.85}}' +
  '@keyframes hiFade{to{opacity:1}}' +
  '@keyframes hiRise{to{opacity:1;transform:none}}' +
  '@keyframes hiFill{to{width:100%}}' +
  '@media (max-width:420px){#sb-hi .tag{min-height:3.4rem}}' +
  '@media (prefers-reduced-motion:reduce){#sb-hi .card,#sb-hi svg *,#sb-hi .msg,#sb-hi .ok{animation-duration:.01s!important;animation-delay:0s!important}}';
  var st = document.createElement('style'); st.textContent = css;
  (document.head || document.documentElement).appendChild(st);
  document.documentElement.classList.add('sb-hold');

  function build() {
    var el = document.createElement('div');
    el.id = 'sb-hi';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Welcome');
    el.innerHTML =
      '<canvas aria-hidden="true"></canvas>' +
      '<div class="stage"><div class="card">' +
        '<p class="name">Saad Babezzine</p>' +
        '<div class="tag" aria-live="polite"><span class="tag-text">From circuits to the grid</span><span class="tag-bar" aria-hidden="true"></span></div>' +
        '<svg viewBox="0 0 300 80" aria-hidden="true">' +
          '<circle class="d" cx="22" cy="40" r="15"/><path class="sine" d="M14 40 q4 -7 8 0 t8 0"/>' +
          '<path class="w" d="M37 40 H112 M146 40 H246"/>' +
          '<path class="live" d="M37 40 H112 M112 40 H146 M146 40 H246"/>' +
          '<circle class="pin" cx="112" cy="40" r="3"/><circle class="pin" cx="146" cy="40" r="3"/>' +
          '<line class="blade" x1="112" y1="40" x2="144" y2="40"/>' +
          '<circle class="glow" cx="266" cy="36" r="26"/>' +
          '<circle class="bulb" cx="266" cy="36" r="13"/><rect class="base" x="260" y="48" width="12" height="8"/>' +
        '</svg>' +
        '<p class="msg">Welcome to the grid.</p>' +
        '<button type="button" class="ok">PROCEED</button>' +
      '</div></div>';
    document.body.appendChild(el);

    /* ----- live background ----- */
    var cv = el.querySelector('canvas'), cx = cv.getContext('2d');
    var W, H, DPR, traces = [], dust = [], t0 = performance.now(), last = t0, raf = 0, alive = true;
    var mx = 0, my = 0, tmx = 0, tmy = 0, CYAN = '0,229,255';
    function rnd(a, b) { return a + Math.random() * (b - a); }
    function makeTrace(side) {
      var pts = [], x, y = rnd(H * 0.08, H * 0.58), dir = side === 'L' ? 1 : -1;
      x = side === 'L' ? -20 : W + 20; pts.push([x, y]);
      var steps = 3 + Math.floor(Math.random() * 4);
      for (var i = 0; i < steps; i++) {
        x += dir * rnd(W * 0.04, W * 0.11); pts.push([x, y]);
        if (i < steps - 1) { y += Math.random() > 0.5 ? rnd(18, 70) : -rnd(18, 70); y = Math.max(H * 0.05, Math.min(H * 0.6, y)); x += dir * 14; pts.push([x, y]); }
      }
      var limit = W * 0.5 - Math.min(260, W * 0.3);
      pts = pts.map(function (p) { return side === 'L' ? [Math.min(p[0], limit), p[1]] : [Math.max(p[0], W - limit), p[1]]; });
      var segs = [], len = 0;
      for (var j = 1; j < pts.length; j++) { var l = Math.hypot(pts[j][0] - pts[j - 1][0], pts[j][1] - pts[j - 1][1]); segs.push(l); len += l; }
      return { pts: pts, segs: segs, len: len, pos: Math.random() * len, speed: rnd(120, 320), hue: Math.random() < 0.18 ? '255,170,40' : CYAN, wait: rnd(0, 2.5) };
    }
    function pointAt(tr, d) {
      for (var i = 0; i < tr.segs.length; i++) {
        if (d <= tr.segs[i]) { var a = tr.pts[i], b = tr.pts[i + 1], k = tr.segs[i] ? d / tr.segs[i] : 0; return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]; }
        d -= tr.segs[i];
      }
      return tr.pts[tr.pts.length - 1];
    }
    function init() {
      DPR = Math.min(window.devicePixelRatio || 1, 2); W = window.innerWidth; H = window.innerHeight;
      cv.width = W * DPR; cv.height = H * DPR; cx.setTransform(DPR, 0, 0, DPR, 0, 0);
      traces = []; var n = W < 700 ? 5 : 9;
      for (var i = 0; i < n; i++) { traces.push(makeTrace('L')); traces.push(makeTrace('R')); }
      dust = []; for (var k = 0; k < (W < 700 ? 45 : 90); k++) dust.push({ x: Math.random() * W, y: Math.random() * H, z: rnd(.3, 1), s: rnd(.4, 1.6) });
    }
    function glowLine(path, color, width, alpha) {
      cx.globalCompositeOperation = 'lighter';
      cx.strokeStyle = 'rgba(' + color + ',' + (alpha * 0.18) + ')'; cx.lineWidth = width * 5; path(); cx.stroke();
      cx.strokeStyle = 'rgba(' + color + ',' + (alpha * 0.35) + ')'; cx.lineWidth = width * 2.2; path(); cx.stroke();
      cx.strokeStyle = 'rgba(' + color + ',' + alpha + ')'; cx.lineWidth = width; path(); cx.stroke();
      cx.globalCompositeOperation = 'source-over';
    }
    function drawBackdrop() {
      var g = cx.createRadialGradient(W / 2, H * 0.42, 0, W / 2, H * 0.42, Math.max(W, H) * 0.8);
      g.addColorStop(0, '#071722'); g.addColorStop(0.55, '#040B11'); g.addColorStop(1, '#020508');
      cx.fillStyle = g; cx.fillRect(0, 0, W, H);
    }
    function drawFloor(t) {
      var hz = H * 0.64 + my * 6, vx = W / 2 + mx * 18;
      var hg = cx.createLinearGradient(0, hz - 60, 0, hz + 40);
      hg.addColorStop(0, 'rgba(0,229,255,0)'); hg.addColorStop(0.6, 'rgba(0,229,255,0.10)'); hg.addColorStop(1, 'rgba(0,229,255,0)');
      cx.fillStyle = hg; cx.fillRect(0, hz - 60, W, 100);
      glowLine(function () { cx.beginPath(); cx.moveTo(0, hz); cx.lineTo(W, hz); }, CYAN, 1.2, 0.8);
      for (var i = -26; i <= 26; i++) {
        var xb = vx + i * (W / 9);
        (function (xb) { glowLine(function () { cx.beginPath(); cx.moveTo(vx + (xb - vx) * 0.02, hz); cx.lineTo(xb, H + 40); }, CYAN, 1, 0.28); })(xb);
      }
      var off = reduce ? 0 : (t * 0.35) % 1;
      for (var r = 0; r < 18; r++) {
        var z = (r + 1 - off) / 18, y = hz + Math.pow(z, 2.6) * (H - hz + 40), a = Math.min(1, z * 1.4) * 0.5;
        (function (y) { glowLine(function () { cx.beginPath(); cx.moveTo(0, y); cx.lineTo(W, y); }, CYAN, 1, a); })(y);
      }
      var fg = cx.createLinearGradient(0, hz, 0, hz + (H - hz) * 0.55);
      fg.addColorStop(0, 'rgba(3,7,11,0.85)'); fg.addColorStop(1, 'rgba(3,7,11,0)');
      cx.fillStyle = fg; cx.fillRect(0, hz + 1, W, (H - hz) * 0.55);
    }
    function drawRings(t) {
      var cxp = W / 2 + mx * 10, cyp = H * 0.46 + my * 8, R = Math.min(W, H) * 0.36;
      cx.save(); cx.translate(cxp, cyp);
      [
        { r: R, w: 1, a: 0.22, seg: [[0, 1.2], [1.5, 2.6], [3.0, 4.8], [5.1, 6.0]], sp: 0.05 },
        { r: R * 0.86, w: 2.5, a: 0.35, seg: [[0.3, 0.9], [2.2, 3.4], [4.2, 4.6]], sp: -0.09 },
        { r: R * 1.12, w: 1, a: 0.16, seg: [[0, 6.283]], sp: 0, dash: [2, 10] },
        { r: R * 0.74, w: 1, a: 0.2, seg: [[1.0, 2.0], [3.6, 5.6]], sp: 0.14 },
        { r: R * 1.25, w: 3, a: 0.18, seg: [[5.2, 5.9], [2.1, 2.5]], sp: -0.03 }
      ].forEach(function (g) {
        var rot = reduce ? 0 : t * g.sp;
        g.seg.forEach(function (s) {
          if (g.dash) cx.setLineDash(g.dash);
          glowLine(function () { cx.beginPath(); cx.arc(0, 0, g.r, s[0] + rot, s[1] + rot); }, CYAN, g.w, g.a);
          cx.setLineDash([]);
        });
      });
      var rot = reduce ? 0 : t * 0.05;
      cx.strokeStyle = 'rgba(' + CYAN + ',0.35)'; cx.lineWidth = 1;
      for (var k = 0; k < 72; k++) {
        var ang = k / 72 * Math.PI * 2 + rot, l = k % 6 === 0 ? 10 : 4;
        cx.beginPath(); cx.moveTo(Math.cos(ang) * (R + 4), Math.sin(ang) * (R + 4)); cx.lineTo(Math.cos(ang) * (R + 4 + l), Math.sin(ang) * (R + 4 + l)); cx.stroke();
      }
      if (!reduce) {
        var sa = t * 0.6, sg = cx.createRadialGradient(0, 0, R * 0.7, 0, 0, R * 1.12);
        sg.addColorStop(0, 'rgba(0,229,255,0)'); sg.addColorStop(1, 'rgba(0,229,255,0.07)');
        cx.fillStyle = sg; cx.beginPath(); cx.moveTo(0, 0); cx.arc(0, 0, R * 1.12, sa, sa + 0.5); cx.closePath(); cx.fill();
      }
      cx.restore();
    }
    function drawTraces(dt) {
      traces.forEach(function (tr) {
        cx.save(); cx.translate(mx * 14 * (tr.pts[0][0] < W / 2 ? 1 : -1) * 0.4, my * 6);
        glowLine(function () { cx.beginPath(); cx.moveTo(tr.pts[0][0], tr.pts[0][1]); for (var i = 1; i < tr.pts.length; i++) cx.lineTo(tr.pts[i][0], tr.pts[i][1]); }, tr.hue, 1, 0.22);
        var e = tr.pts[tr.pts.length - 1];
        cx.globalCompositeOperation = 'lighter';
        cx.fillStyle = 'rgba(' + tr.hue + ',0.25)'; cx.beginPath(); cx.arc(e[0], e[1], 6, 0, 7); cx.fill();
        cx.fillStyle = 'rgba(' + tr.hue + ',0.9)'; cx.beginPath(); cx.arc(e[0], e[1], 2.2, 0, 7); cx.fill();
        if (!reduce) {
          if (tr.wait > 0) tr.wait -= dt;
          else {
            tr.pos += tr.speed * dt;
            if (tr.pos > tr.len + 120) { tr.pos = 0; tr.wait = rnd(0.4, 3); tr.speed = rnd(140, 360); }
            for (var s = 0; s < 14; s++) {
              var d = tr.pos - s * (110 / 14);
              if (d < 0 || d > tr.len) continue;
              var p = pointAt(tr, d), a = 1 - s / 14;
              cx.fillStyle = 'rgba(' + tr.hue + ',' + (a * 0.9) + ')';
              cx.beginPath(); cx.arc(p[0], p[1], s === 0 ? 2.8 : 1.8 * a + 0.4, 0, 7); cx.fill();
            }
            if (tr.pos <= tr.len) { var hp = pointAt(tr, tr.pos); cx.fillStyle = 'rgba(' + tr.hue + ',0.25)'; cx.beginPath(); cx.arc(hp[0], hp[1], 9, 0, 7); cx.fill(); }
          }
        }
        cx.globalCompositeOperation = 'source-over';
        cx.restore();
      });
    }
    function drawDust(dt) {
      cx.globalCompositeOperation = 'lighter';
      dust.forEach(function (p) {
        if (!reduce) { p.y -= p.z * 12 * dt; p.x += Math.sin((p.y + p.s * 100) / 60) * 0.15; if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; } }
        cx.fillStyle = 'rgba(' + CYAN + ',' + (0.15 + p.z * 0.45) + ')';
        cx.beginPath(); cx.arc(p.x + mx * 20 * p.z, p.y + my * 10 * p.z, p.s * p.z + 0.3, 0, 7); cx.fill();
      });
      cx.globalCompositeOperation = 'source-over';
    }
    function vignette() {
      var g = cx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.max(W, H) * 0.75);
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.6)');
      cx.fillStyle = g; cx.fillRect(0, 0, W, H);
    }
    function frame(now) {
      if (!alive) return;
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      var t = (now - t0) / 1000;
      mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
      drawBackdrop(); drawFloor(t); drawRings(t); drawTraces(dt); drawDust(dt); vignette();
      if (!reduce) raf = requestAnimationFrame(frame);
    }
    function onResize() { init(); if (reduce) frame(performance.now()); }
    function onMove(e) { tmx = (e.clientX / W - 0.5) * 2; tmy = (e.clientY / H - 0.5) * 2; }
    function onVis() { if (document.hidden) cancelAnimationFrame(raf); else if (!reduce && alive) { last = performance.now(); raf = requestAnimationFrame(frame); } }
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove);
    document.addEventListener('visibilitychange', onVis);
    init(); raf = requestAnimationFrame(frame);

    /* ----- rotating tagline ----- */
    var lines = ['From circuits to the grid', 'Where circuits meet the grid', 'Building tomorrow’s power grid', 'Engineering the grid, one circuit at a time', 'Power engineer in the making'];
    var tag = el.querySelector('.tag-text'), bar = el.querySelector('.tag-bar'), li = 0, timers = [];
    function runBar() { bar.classList.remove('run'); void bar.offsetWidth; bar.classList.add('run'); }
    function nextLine() {
      if (!alive) return;
      tag.classList.add('out');
      timers.push(setTimeout(function () {
        li = (li + 1) % lines.length; tag.textContent = lines[li];
        tag.classList.remove('out'); tag.classList.add('in'); void tag.offsetWidth; tag.classList.remove('in');
        runBar(); timers.push(setTimeout(nextLine, 3600));
      }, 550));
    }
    if (!reduce) timers.push(setTimeout(function () { runBar(); timers.push(setTimeout(nextLine, 3600)); }, 900));

    /* ----- proceed ----- */
    var done = false, btn = el.querySelector('.ok');
    function close() {
      if (done) return; done = true;
      el.classList.add('out');
      document.documentElement.classList.remove('sb-hold');
      document.removeEventListener('keydown', key);
      setTimeout(function () {
        alive = false; cancelAnimationFrame(raf); timers.forEach(clearTimeout);
        window.removeEventListener('resize', onResize); window.removeEventListener('pointermove', onMove);
        document.removeEventListener('visibilitychange', onVis);
        el.remove();
      }, 750);
    }
    function key(e) { if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') { e.preventDefault(); close(); } }
    btn.addEventListener('click', close);
    document.addEventListener('keydown', key);
    setTimeout(function () { try { btn.focus({ preventScroll: true }); } catch (e) { btn.focus(); } }, 2200);
  }
  if (document.body) build(); else document.addEventListener('DOMContentLoaded', build);
})();

/* ---------- Project feedback ---------- */
(function () {
  var ENDPOINT = 'https://formspree.io/f/mljbwbqn';
  if (!/\/projects\//.test(location.pathname)) return;

  var css = '' +
  '#sb-fb{margin:4rem 0 0;padding:2rem 0 0;border-top:1px solid #000}' +
  '#sb-fb h2{font-family:Spectral,Georgia,serif;font-weight:600;font-size:1.6rem;line-height:1.2;margin:0 0 .4rem;padding:0;border:0}' +
  '#sb-fb .lead{color:#555;margin:0 0 1.5rem;max-width:40rem}' +
  '#sb-fb .q{font-size:.9rem;font-weight:600;margin:0 0 .5rem}' +
  '#sb-fb .chips{display:flex;flex-wrap:wrap;gap:.5rem;margin:0 0 1.4rem}' +
  '#sb-fb .chip{font:500 .92rem "Public Sans",system-ui,sans-serif;background:#fff;color:#000;border:1px solid #8C8C8C;border-radius:999px;padding:.45rem .95rem;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:.45rem}' +
  '#sb-fb .chip .dot{width:.55rem;height:.55rem;border-radius:50%;background:#D9D9D9;transition:all .2s}' +
  '#sb-fb .chip:hover{border-color:#000}' +
  '#sb-fb .chip[aria-pressed="true"]{border-color:#B3261E;background:#FCEDEC}' +
  '#sb-fb .chip[aria-pressed="true"] .dot{background:#FF3B30;box-shadow:0 0 6px rgba(255,59,48,.9)}' +
  '#sb-fb .grid{display:grid;grid-template-columns:1fr 1fr;gap:.9rem}' +
  '#sb-fb label{display:block;font-size:.85rem;color:#555;margin:0 0 .3rem}' +
  '#sb-fb input,#sb-fb textarea{width:100%;box-sizing:border-box;font:400 1rem "Public Sans",system-ui,sans-serif;color:#000;background:#fff;border:1px solid #8C8C8C;border-radius:6px;padding:.65rem .75rem;transition:border-color .2s,box-shadow .2s}' +
  '#sb-fb textarea{min-height:7.5rem;resize:vertical}' +
  '#sb-fb input:focus,#sb-fb textarea:focus{outline:none;border-color:#B3261E;box-shadow:0 0 0 3px rgba(179,38,30,.15)}' +
  '#sb-fb .full{grid-column:1/-1}' +
  '#sb-fb .row{display:flex;align-items:center;gap:1rem;flex-wrap:wrap;margin-top:1rem}' +
  '#sb-fb .send{font:600 1rem "Public Sans",system-ui,sans-serif;background:#000;color:#fff;border:0;border-radius:999px;padding:.7rem 1.8rem;cursor:pointer;transition:background .2s}' +
  '#sb-fb .send:hover{background:#B3261E}' +
  '#sb-fb .send:disabled{background:#8C8C8C;cursor:wait}' +
  '#sb-fb .send:focus-visible,#sb-fb .chip:focus-visible{outline:2px solid #B3261E;outline-offset:3px}' +
  '#sb-fb .note{font-size:.85rem;color:#8C8C8C;margin:0}' +
  '#sb-fb .err{color:#B3261E;font-size:.9rem;margin:.75rem 0 0;min-height:1.2rem}' +
  '#sb-fb .hp{position:absolute;left:-9999px}' +
  '#sb-fb .thanks{display:none;text-align:center;padding:1.5rem 0 .5rem}' +
  '#sb-fb.done form{display:none}' +
  '#sb-fb.done .thanks{display:block}' +
  '#sb-fb .thanks svg{width:100%;max-width:18rem;height:auto;display:block;margin:0 auto 1rem;overflow:visible}' +
  '#sb-fb .thanks .w{stroke:#8C8C8C;stroke-width:2;fill:none}' +
  '#sb-fb .thanks .live{stroke:#B3261E;stroke-width:2.5;fill:none;stroke-dasharray:240;stroke-dashoffset:240}' +
  '#sb-fb .thanks .bulb{fill:#fff;stroke:#000;stroke-width:2}' +
  '#sb-fb .thanks .glow{fill:#FFD54A;opacity:0}' +
  '#sb-fb.done .thanks .live{animation:fbDraw .7s ease-in .15s forwards}' +
  '#sb-fb.done .thanks .bulb{animation:fbBulb .3s ease-out .8s forwards}' +
  '#sb-fb.done .thanks .glow{animation:fbGlow .4s ease-out .8s forwards}' +
  '#sb-fb .thanks h3{font-family:Spectral,Georgia,serif;font-weight:600;font-size:1.5rem;margin:0 0 .3rem}' +
  '#sb-fb .thanks p{color:#555;margin:0 auto;max-width:28rem}' +
  '@keyframes fbDraw{to{stroke-dashoffset:0}}' +
  '@keyframes fbBulb{to{fill:#FFE27A}}' +
  '@keyframes fbGlow{to{opacity:.9}}' +
  '@media (max-width:560px){#sb-fb .grid{grid-template-columns:1fr}}' +
  '@media (prefers-reduced-motion:reduce){#sb-fb *{animation-duration:.01s!important;animation-delay:0s!important;transition:none!important}}';
  var st = document.createElement('style'); st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function build() {
    var h1 = document.querySelector('h1');
    var project = (h1 ? h1.textContent : document.title.split('|')[0]).trim();
    var sec = document.createElement('section');
    sec.id = 'sb-fb';
    sec.setAttribute('aria-labelledby', 'sb-fb-h');
    sec.innerHTML =
      '<h2 id="sb-fb-h">Feedback on this project</h2>' +
      '<p class="lead">Spotted something I could do better, or have a question about it? I read every message.</p>' +
      '<form novalidate>' +
        '<p class="q" id="sb-fb-q">How did this project land for you?</p>' +
        '<div class="chips" role="group" aria-labelledby="sb-fb-q">' +
          '<button type="button" class="chip" data-v="Impressive" aria-pressed="false"><span class="dot"></span>Impressive</button>' +
          '<button type="button" class="chip" data-v="Solid" aria-pressed="false"><span class="dot"></span>Solid</button>' +
          '<button type="button" class="chip" data-v="Could be better" aria-pressed="false"><span class="dot"></span>Could be better</button>' +
        '</div>' +
        '<div class="grid">' +
          '<div><label for="sb-fb-name">Name (optional)</label><input id="sb-fb-name" name="name" autocomplete="name"></div>' +
          '<div><label for="sb-fb-email">Email (optional, if you want a reply)</label><input id="sb-fb-email" name="email" type="email" autocomplete="email"></div>' +
          '<div class="full"><label for="sb-fb-msg">Your feedback</label><textarea id="sb-fb-msg" name="message" required></textarea></div>' +
        '</div>' +
        '<input class="hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">' +
        '<div class="row"><button type="submit" class="send">Send feedback</button><p class="note">Private. Only I see it.</p></div>' +
        '<p class="err" aria-live="polite"></p>' +
      '</form>' +
      '<div class="thanks" role="status">' +
        '<svg viewBox="0 0 260 70" aria-hidden="true">' +
          '<path class="w" d="M10 35 H200"/><path class="live" d="M10 35 H200"/>' +
          '<circle class="glow" cx="226" cy="31" r="24"/><circle class="bulb" cx="226" cy="31" r="12"/><rect x="220" y="42" width="12" height="7" fill="#555"/>' +
        '</svg>' +
        '<h3>Thank you</h3>' +
        '<p>Your feedback on <strong>' + esc(project) + '</strong> reached me. It really helps.</p>' +
      '</div>';

    var anchor = document.querySelector('nav.next') || document.querySelector('footer');
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(sec, anchor);
    else document.body.appendChild(sec);

    var form = sec.querySelector('form'), err = sec.querySelector('.err'), btn = sec.querySelector('.send');
    var rating = '';
    sec.querySelectorAll('.chip').forEach(function (c) {
      c.addEventListener('click', function () {
        var on = c.getAttribute('aria-pressed') !== 'true';
        sec.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
        rating = on ? c.dataset.v : '';
        err.textContent = '';
      });
    });

    form.addEventListener('input', function () { if (err.textContent && !btn.disabled) err.textContent = ''; });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.message.value.trim();
      if (!msg && !rating) { err.textContent = 'Write a short message or pick a rating first.'; form.message.focus(); return; }
      var email = form.email.value.trim();
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = 'That email does not look right.'; form.email.focus(); return; }
      err.textContent = ''; btn.disabled = true; btn.textContent = 'Sending...';
      var data = new FormData();
      data.append('project', project);
      data.append('rating', rating || 'none');
      data.append('message', msg || '(no message, rating only)');
      data.append('name', form.name.value.trim());
      if (email) { data.append('email', email); data.append('_replyto', email); }
      data.append('page', location.href);
      data.append('_subject', 'Website feedback: ' + project);
      data.append('_gotcha', form._gotcha.value);
      fetch(ENDPOINT, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('bad');
          sec.classList.add('done');
          sec.querySelector('.thanks').scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(function () {
          btn.disabled = false; btn.textContent = 'Send feedback';
          err.innerHTML = 'It did not go through. You can email me instead at <a href="mailto:saadbabezzine@gmail.com?subject=' + encodeURIComponent('Feedback: ' + project) + '">saadbabezzine@gmail.com</a>.';
        });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
