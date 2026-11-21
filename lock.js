/* saadbabezzine.com site script (file kept as lock.js so every page already loads it).
   1) Welcome intro: a short power-up animation with an OK button, shown once per browser session.
   2) Project feedback: a small private feedback form added to every project page (sent through Formspree). */
(function () {
  var KEY = 'sb-welcomed';
  try { if (sessionStorage.getItem(KEY) === '1') return; } catch (e) {}
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try { sessionStorage.setItem(KEY, '1'); } catch (e) {}

  var css = '' +
  '#sb-hi{position:fixed;inset:0;z-index:2147483000;background:#fff;color:#000;display:flex;align-items:center;justify-content:center;padding:1.25rem;font:400 1.0625rem/1.6 "Public Sans",system-ui,sans-serif;transition:opacity .55s ease}' +
  '#sb-hi.out{opacity:0;pointer-events:none}' +
  '#sb-hi .c{width:100%;max-width:26rem;text-align:center}' +
  '#sb-hi .n{font-family:Spectral,Georgia,serif;font-weight:600;font-size:clamp(2rem,8vw,2.75rem);line-height:1.05;margin:0 0 .35rem;letter-spacing:-.01em;opacity:0;transform:translateY(6px);animation:hiIn .45s ease-out .05s forwards}' +
  '#sb-hi .s{color:#555;margin:0 0 1.4rem;font-size:1rem;opacity:0;animation:hiIn .45s ease-out .2s forwards}' +
  '#sb-hi svg{width:100%;max-width:22rem;height:auto;display:block;margin:0 auto 1rem;overflow:visible}' +
  '#sb-hi .w{stroke:#8C8C8C;stroke-width:2;fill:none}' +
  '#sb-hi .d{stroke:#000;stroke-width:2;fill:#fff}' +
  '#sb-hi .pin{fill:#000}' +
  '#sb-hi .blade{stroke:#000;stroke-width:2.5;stroke-linecap:round;transform-box:view-box;transform-origin:112px 40px;transform:rotate(-32deg);animation:hiClose .3s cubic-bezier(.5,1.6,.5,1) .55s forwards}' +
  '#sb-hi .live{stroke:#B3261E;stroke-width:2.5;fill:none;stroke-dasharray:240;stroke-dashoffset:240;animation:hiDraw .6s ease-in .8s forwards}' +
  '#sb-hi .glow{fill:#FFD54A;opacity:0;animation:hiFade .35s ease-out 1.35s forwards}' +
  '#sb-hi .bulb{fill:#fff;stroke:#000;stroke-width:2;animation:hiBulb .3s ease-out 1.35s forwards}' +
  '#sb-hi .m{min-height:1.5rem;margin:0;font-size:.95rem;color:#2E7D4F;opacity:0;animation:hiIn .35s ease-out 1.45s forwards}' +
  '#sb-hi .ok{margin-top:1.4rem;font:600 1rem "Public Sans",system-ui,sans-serif;background:#000;color:#fff;border:0;border-radius:999px;padding:.7rem 2.4rem;cursor:pointer;opacity:0;transform:translateY(6px);animation:hiIn .4s ease-out 1.6s forwards;transition:background .2s}' +
  '#sb-hi .ok:hover{background:#B3261E}' +
  '#sb-hi .ok:focus-visible{outline:2px solid #B3261E;outline-offset:3px}' +
  '@keyframes hiIn{to{opacity:1;transform:none}}' +
  '@keyframes hiClose{to{transform:rotate(0)}}' +
  '@keyframes hiDraw{to{stroke-dashoffset:0}}' +
  '@keyframes hiFade{to{opacity:.9}}' +
  '@keyframes hiBulb{to{fill:#FFE27A}}';
  var st = document.createElement('style'); st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  function build() {
    var el = document.createElement('div');
    el.id = 'sb-hi';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Welcome');
    el.innerHTML =
      '<div class="c">' +
        '<p class="n">Saad Babezzine</p>' +
        '<p class="s">Electrical Engineering, UMass Boston</p>' +
        '<svg viewBox="0 0 300 80">' +
          '<circle class="d" cx="22" cy="40" r="15"/><path class="w" d="M14 40 q4 -7 8 0 t8 0"/>' +
          '<path class="w" d="M37 40 H112 M146 40 H246"/>' +
          '<path class="live" d="M37 40 H112 M112 40 H146 M146 40 H246"/>' +
          '<circle class="pin" cx="112" cy="40" r="3"/><circle class="pin" cx="146" cy="40" r="3"/>' +
          '<line class="blade" x1="112" y1="40" x2="144" y2="40"/>' +
          '<circle class="glow" cx="266" cy="36" r="26"/>' +
          '<circle class="bulb" cx="266" cy="36" r="13"/><rect x="260" y="48" width="12" height="8" fill="#555"/>' +
        '</svg>' +
        '<p class="m">Power on. Welcome.</p>' +
        '<button type="button" class="ok">OK</button>' +
      '</div>';
    document.body.appendChild(el);
    var done = false;
    function close() {
      if (done) return; done = true;
      el.classList.add('out');
      setTimeout(function () { el.remove(); }, 600);
      document.removeEventListener('keydown', key);
    }
    var btn = el.querySelector('.ok');
    btn.addEventListener('click', close);
    function key(e) { if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') { e.preventDefault(); close(); } }
    document.addEventListener('keydown', key);
    setTimeout(function () { try { btn.focus({ preventScroll: true }); } catch (e) { btn.focus(); } }, 1600);
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
