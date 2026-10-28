/* Simple visitor lock for saadbabezzine.com.
   This is a friendly gate, not real security: the page content is still in the HTML,
   so search engines can read it. Unlock lasts for the browser session. */
(function () {
  var KEY = 'sb-unlocked', LEN = 6, HASH = 'zz10x2';
  function fnv(s) { var h = 0x811c9dc5; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(36); }
  function isUnlocked() { try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function remember() { try { sessionStorage.setItem(KEY, '1'); } catch (e) {} }
  if (isUnlocked()) return;

  var root = document.documentElement;
  root.classList.add('sb-locked');

  var css = '' +
  'html.sb-locked,html.sb-locked body{overflow:hidden!important}' +
  'html.sb-locked body>*:not(#sb-lock){visibility:hidden}' +
  '#sb-lock{position:fixed;inset:0;z-index:2147483000;background:#fff;color:#000;display:flex;align-items:center;justify-content:center;padding:1.25rem;font:400 1.0625rem/1.6 "Public Sans",system-ui,sans-serif;transition:opacity .6s ease .5s}' +
  '#sb-lock.sb-out{opacity:0;pointer-events:none}' +
  '#sb-lock .sb-card{width:100%;max-width:26rem;text-align:center}' +
  '#sb-lock .sb-name{font-family:Spectral,Georgia,serif;font-weight:600;font-size:clamp(2rem,8vw,2.75rem);line-height:1.05;margin:0 0 .4rem;letter-spacing:-.01em}' +
  '#sb-lock .sb-sub{color:#555;margin:0 0 1.6rem;font-size:.97rem}' +
  '#sb-lock svg{width:100%;max-width:22rem;height:auto;display:block;margin:0 auto 1.6rem;overflow:visible}' +
  '#sb-lock .w{stroke:#8C8C8C;stroke-width:2;fill:none}' +
  '#sb-lock .d{stroke:#000;stroke-width:2;fill:#fff}' +
  '#sb-lock .live{stroke:#B3261E;stroke-width:2.5;fill:none;stroke-dasharray:240;stroke-dashoffset:240;transition:stroke-dashoffset .7s ease-in .25s}' +
  '#sb-lock .blade{stroke:#000;stroke-width:2.5;stroke-linecap:round;transform-box:view-box;transform-origin:120px 40px;transform:rotate(-32deg);transition:transform .35s cubic-bezier(.5,1.6,.5,1)}' +
  '#sb-lock .pin{fill:#000}' +
  '#sb-lock .bulb{fill:#fff;stroke:#000;stroke-width:2;transition:fill .3s ease .9s}' +
  '#sb-lock .glow{fill:#FFD54A;opacity:0;transition:opacity .4s ease .9s}' +
  '#sb-lock .spark{fill:#B3261E;animation:sbBlink 1.4s ease-in-out infinite}' +
  '#sb-lock.sb-ok .live{stroke-dashoffset:0}' +
  '#sb-lock.sb-ok .blade{transform:rotate(0)}' +
  '#sb-lock.sb-ok .bulb{fill:#FFE27A}' +
  '#sb-lock.sb-ok .glow{opacity:.9}' +
  '#sb-lock.sb-ok .spark{animation:none;opacity:0}' +
  '#sb-lock .sb-boxes{display:flex;justify-content:center;gap:.5rem;margin:0 0 1rem;cursor:text}' +
  '#sb-lock .sb-box{width:2.75rem;height:3.25rem;border:1.5px solid #8C8C8C;border-radius:6px;display:grid;place-items:center;font:600 1.4rem "Public Sans",system-ui,sans-serif;text-transform:uppercase;transition:border-color .2s,background .2s}' +
  '#sb-lock .sb-box.on{border-color:#000}' +
  '#sb-lock .sb-box.cur{border-color:#B3261E;box-shadow:0 0 0 3px rgba(179,38,30,.15)}' +
  '#sb-lock.sb-bad .sb-box{border-color:#B3261E;background:#FCEDEC}' +
  '#sb-lock.sb-bad .sb-boxes{animation:sbShake .4s}' +
  '#sb-lock.sb-ok .sb-box{border-color:#2E7D4F;background:#EEF7F1}' +
  '#sb-lock .sb-msg{min-height:1.5rem;font-size:.92rem;color:#555;margin:0}' +
  '#sb-lock.sb-bad .sb-msg{color:#B3261E}' +
  '#sb-lock.sb-ok .sb-msg{color:#2E7D4F}' +
  '#sb-lock input{position:absolute;opacity:0;width:1px;height:1px;pointer-events:none}' +
  '#sb-lock .sb-foot{margin-top:1.75rem;font-size:.85rem;color:#8C8C8C}' +
  '#sb-lock .sb-foot a{color:#555}' +
  '@keyframes sbShake{0%,100%{transform:none}20%{transform:translateX(-8px)}40%{transform:translateX(7px)}60%{transform:translateX(-5px)}80%{transform:translateX(3px)}}' +
  '@keyframes sbBlink{0%,100%{opacity:.25}50%{opacity:1}}' +
  '@media (max-width:380px){#sb-lock .sb-box{width:2.4rem;height:2.9rem;font-size:1.2rem}}' +
  '@media (prefers-reduced-motion:reduce){#sb-lock *{transition:none!important;animation:none!important}}';
  var st = document.createElement('style'); st.textContent = css;
  (document.head || root).appendChild(st);

  function build() {
    var wrap = document.createElement('div');
    wrap.id = 'sb-lock';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-labelledby', 'sb-lock-title');
    var boxes = ''; for (var i = 0; i < LEN; i++) boxes += '<span class="sb-box"></span>';
    wrap.innerHTML =
      '<div class="sb-card">' +
        '<p class="sb-name" id="sb-lock-title">Saad Babezzine</p>' +
        '<p class="sb-sub">Enter the passcode to switch the power on.</p>' +
        '<svg viewBox="0 0 300 80" aria-hidden="true">' +
          '<circle class="d" cx="22" cy="40" r="15"/><path class="w" d="M14 40 q4 -7 8 0 t8 0"/>' +
          '<path class="w" d="M37 40 H112 M146 40 H246"/>' +
          '<path class="live" d="M37 40 H112 M112 40 H146 M146 40 H246"/>' +
          '<circle class="pin" cx="112" cy="40" r="3"/><circle class="pin" cx="146" cy="40" r="3"/>' +
          '<line class="blade" x1="112" y1="40" x2="144" y2="40" style="transform-origin:112px 40px"/>' +
          '<circle class="spark" cx="146" cy="40" r="2"/>' +
          '<circle class="glow" cx="266" cy="36" r="26"/>' +
          '<circle class="bulb" cx="266" cy="36" r="13"/><rect x="260" y="48" width="12" height="8" fill="#555"/>' +
        '</svg>' +
        '<label for="sb-in" style="position:absolute;left:-9999px">Passcode</label>' +
        '<input id="sb-in" type="text" inputmode="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" maxlength="' + LEN + '">' +
        '<div class="sb-boxes">' + boxes + '</div>' +
        '<p class="sb-msg" aria-live="polite">6 letters</p>' +
        '<p class="sb-foot">Need the code? <a href="mailto:saadbabezzine@gmail.com">Email me</a></p>' +
      '</div>';
    document.body.appendChild(wrap);

    var input = wrap.querySelector('input'), cells = wrap.querySelectorAll('.sb-box'), msg = wrap.querySelector('.sb-msg');
    var busy = false;
    function render() {
      var v = input.value;
      for (var i = 0; i < LEN; i++) {
        cells[i].textContent = v[i] || '';
        cells[i].className = 'sb-box' + (v[i] ? ' on' : '') + (i === v.length && document.activeElement === input ? ' cur' : '');
      }
    }
    function focus() { try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); } render(); }
    wrap.addEventListener('click', function (e) { if (!e.target.closest('a')) focus(); });
    input.addEventListener('focus', render);
    input.addEventListener('blur', render);
    input.addEventListener('input', function () {
      if (busy) return;
      input.value = input.value.replace(/[^a-zA-Z]/g, '').slice(0, LEN);
      wrap.classList.remove('sb-bad');
      msg.textContent = '6 letters';
      render();
      if (input.value.length === LEN) check();
    });
    function check() {
      if (fnv(input.value.toLowerCase() + ':saadbabezzine') === HASH) {
        busy = true; input.blur();
        wrap.classList.add('sb-ok'); msg.textContent = 'Power on. Welcome.';
        remember();
        setTimeout(function () {
          wrap.classList.add('sb-out');
          root.classList.remove('sb-locked');
          setTimeout(function () { wrap.remove(); }, 1300);
        }, 900);
      } else {
        wrap.classList.remove('sb-bad'); void wrap.offsetWidth; wrap.classList.add('sb-bad');
        msg.textContent = 'Wrong passcode. Try again.';
        setTimeout(function () { input.value = ''; render(); }, 450);
      }
    }
    focus();
  }
  if (document.body) build(); else document.addEventListener('DOMContentLoaded', build);
})();
