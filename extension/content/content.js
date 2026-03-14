/**
 * Schwep extension content script.
 * Shadow DOM isolation · Blimp FAB · Glass swipe engine.
 * Only activates on supported LLM sites (ChatGPT, Claude, Gemini).
 */
(function () {
  'use strict';

  /* ── LLM gate ──────────────────────────────────────────── */
  const LLM_HOSTS = ['chatgpt.com', 'chat.openai.com', 'claude.ai', 'gemini.google.com'];
  if (!LLM_HOSTS.some((h) => location.hostname.endsWith(h))) return;

  const HOST_ATTR = 'data-schwep-host';
  if (document.querySelector(`[${HOST_ATTR}]`)) return;

  /* ── Ensure Google Fonts are available ──────────────────── */
  if (!document.querySelector('link[data-schwep-fonts]')) {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap';
    fontLink.setAttribute('data-schwep-fonts', '');
    document.head.appendChild(fontLink);
  }

  /* ── Rounds data ───────────────────────────────────────── */
  const rounds = [
    {
      key: 'frame',
      title: 'The Frame',
      cards: [
        {
          name: 'Bento Grid',
          desc: 'Modular cards with hierarchy.',
          vis: '<div class="pv pv-bento"><div></div><div></div><div></div></div>',
        },
        {
          name: 'Split Layout',
          desc: 'Asymmetric two-column structure.',
          vis: '<div class="pv pv-split"><div class="sl"></div><div class="sr"><div></div><div></div></div></div>',
        },
        {
          name: 'Swiss Grid',
          desc: 'Crisp and precise visual rhythm.',
          vis: '<div class="pv pv-swiss"><div></div><div></div><div></div><div></div><div></div></div>',
        },
        {
          name: 'Hero Canvas',
          desc: 'Impact-first full-bleed composition.',
          vis: '<div class="pv pv-hero"><div class="ph-main"></div><div class="ph-row"><div></div><div></div><div></div></div></div>',
        },
      ],
    },
    {
      key: 'shape',
      title: 'The Shape',
      cards: [
        {
          name: 'Sharp Corners',
          desc: 'Geometric and hard-edged.',
          vis: '<div class="pv pv-shape sharp"><div></div><div></div></div>',
        },
        {
          name: 'Soft Corners',
          desc: 'Balanced and friendly curves.',
          vis: '<div class="pv pv-shape soft"><div></div><div></div></div>',
        },
        {
          name: 'Round Corners',
          desc: 'Confident rounded components.',
          vis: '<div class="pv pv-shape round"><div></div><div></div></div>',
        },
        {
          name: 'Cut Corners',
          desc: 'Industrial edge cuts.',
          vis: '<div class="pv pv-shape cut"><div></div><div></div></div>',
        },
      ],
    },
    {
      key: 'tone',
      title: 'The Tone',
      cards: [
        {
          name: 'Bold Tech',
          desc: 'Strong modern contrast.',
          vis: '<div class="pv pv-tone"><span class="pv-boldtech">Aa</span></div>',
        },
        {
          name: 'Raw Mono',
          desc: 'Monospace, utility-forward feel.',
          vis: '<div class="pv pv-tone"><span class="pv-rawmono">const style = {\n  weight: 500,\n  spacing: tight\n};</span></div>',
        },
        {
          name: 'Neo-Brutalist',
          desc: 'Thick borders, high contrast, loud.',
          vis: '<div class="pv pv-tone"><div class="pv-neobrut"></div></div>',
        },
        {
          name: 'Editorial Modern',
          desc: 'Refined hierarchy and spacing.',
          vis: '<div class="pv pv-tone"><span class="pv-editorial">Design</span></div>',
        },
      ],
    },
    {
      key: 'finish',
      title: 'The Finish',
      cards: [
        {
          name: 'Clean Minimal',
          desc: 'Pure surfaces and clean contrast.',
          vis: '<div class="pv pv-tone"><div class="pv-clean"><div></div></div></div>',
        },
        {
          name: 'Gritty Edge',
          desc: 'Textured and raw character.',
          vis: '<div class="pv pv-tone"><div class="pv-gritty"><div></div><div></div><div></div></div></div>',
        },
        {
          name: 'Neon Glow',
          desc: 'Electric highlights and energy.',
          vis: '<div class="pv pv-tone"><div class="pv-neon">GLOW</div></div>',
        },
        {
          name: 'Grain Texture',
          desc: 'Analog touch and depth.',
          vis: '<div class="pv pv-tone"><div class="pv-grain"></div></div>',
        },
      ],
    },
  ];

  const state = {
    open: false,
    roundIndex: 0,
    cardIndex: 0,
    picks: {},
    promptEl: null,
    payload: null,
  };

  /* ── Shadow DOM host ───────────────────────────────────── */
  const host = document.createElement('schwep-root');
  host.setAttribute(HOST_ATTR, '');

  const IMP = '!important';
  const HOST_STYLES = [
    'all:initial',
    'display:block',
    'position:fixed',
    'top:0',
    'left:0',
    'width:0',
    'height:0',
    'overflow:visible',
    'z-index:2147483647',
    'pointer-events:none',
    'opacity:1',
    'visibility:visible',
  ]
    .map((s) => s + IMP)
    .join(';');

  host.setAttribute('style', HOST_STYLES);
  const shadow = host.attachShadow({ mode: 'open' });

  let cssHref = '';
  let blimpSrc = '';
  try {
    cssHref = chrome.runtime.getURL('assets/content.css');
    blimpSrc = chrome.runtime.getURL('assets/blimp.png');
  } catch (_) {}

  if (cssHref) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssHref;
    shadow.appendChild(link);
  }

  /* ── Build UI ──────────────────────────────────────────── */
  const container = document.createElement('div');
  container.setAttribute('data-schwep-root', 'true');

  const blimpImg = blimpSrc
    ? `<img src="${blimpSrc}" alt="Schwep" draggable="false" />`
    : `<svg viewBox="0 0 48 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="21" cy="13" rx="18" ry="11" fill="#ff4d00"/>
        <path d="M37 5L45 2V24L37 21Z" fill="#cc3e00"/>
        <ellipse cx="17" cy="9" rx="10" ry="4.5" fill="white" opacity="0.2"/>
        <rect x="15" y="23" width="12" height="5" rx="2" fill="#0d0d0d"/>
       </svg>`;

  container.innerHTML = `
    <button class="schwep-fab" id="schwep-fab" aria-label="Open Schwep">
      ${blimpImg}
      <span class="schwep-fab-label">schwep</span>
    </button>
    <div class="schwep-panel" id="schwep-panel">
      <div class="sp-head">
        <div class="sp-brand">Schwep<span class="sp-brand-dot">.</span></div>
        <button class="sp-close" id="schwep-close" aria-label="Close">&#x2715;</button>
      </div>
      <div class="sp-progress" id="schwep-progress"></div>
      <div class="sp-body" id="schwep-body"></div>
      <div class="sp-foot">
        <div class="sp-status" id="schwep-status">Swipe to build your blueprint.</div>
      </div>
    </div>
  `;
  shadow.appendChild(container);

  const $ = (id) => shadow.querySelector('#' + id);
  const fab = $('schwep-fab');
  const panel = $('schwep-panel');
  const bodyEl = $('schwep-body');
  const progressEl = $('schwep-progress');
  const statusEl = $('schwep-status');
  const closeBtn = $('schwep-close');

  /* ── Mount / Remount ───────────────────────────────────── */
  function mount() {
    if (host.isConnected) return;
    const target = document.documentElement || document.body;
    if (target) {
      target.appendChild(host);
      host.setAttribute('style', HOST_STYLES);
    }
  }
  mount();

  /* ── Prompt detection ──────────────────────────────────── */
  function isVisible(el) {
    if (!el || !el.getBoundingClientRect) return false;
    const rect = el.getBoundingClientRect();
    if (rect.width < 80 || rect.height < 20) return false;
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  function findPromptElement() {
    const selectors = [
      '#prompt-textarea',
      'div[id="prompt-textarea"]',
      'div.ProseMirror[contenteditable="true"]',
      'textarea[placeholder*="message" i]',
      'textarea[placeholder*="ask" i]',
      'textarea[data-id*="prompt"]',
      'div[contenteditable="true"][role="textbox"]',
      'div[contenteditable="true"]',
      'textarea',
    ];
    const candidates = selectors
      .flatMap((s) => Array.from(document.querySelectorAll(s)))
      .filter(isVisible);

    if (candidates.length === 0) return null;

    let best = null;
    let bestScore = -Infinity;
    for (const el of candidates) {
      const rect = el.getBoundingClientRect();
      const bottomBias = rect.bottom / window.innerHeight;
      const widthBias = Math.min(rect.width / 700, 1);
      const score = bottomBias * 3 + widthBias;
      if (score > bestScore) {
        bestScore = score;
        best = el;
      }
    }
    return best;
  }

  /* ── Panel open / close ────────────────────────────────── */
  function setOpen(next) {
    state.open = next;
    panel.classList.toggle('schwep-open', next);
    if (next) render();
  }

  function resetFlow() {
    state.roundIndex = 0;
    state.cardIndex = 0;
    state.picks = {};
    state.payload = null;
    statusEl.textContent = 'Swipe to build your blueprint.';
    render();
  }

  /* ── Progress rendering ────────────────────────────────── */
  function renderProgress() {
    let html = '';
    for (let i = 0; i < rounds.length; i++) {
      if (i > 0) {
        const lineDone = i <= state.roundIndex ? 'done' : '';
        html += `<div class="sp-dot-line ${lineDone}"></div>`;
      }
      const cls =
        i < state.roundIndex ? 'done' : i === state.roundIndex ? 'active' : '';
      html += `<div class="sp-dot ${cls}"></div>`;
    }
    progressEl.innerHTML = html;
  }

  /* ── Payload ───────────────────────────────────────────── */
  function makePayload() {
    const tone = state.picks.tone || 'Neo-Brutalist';
    const finish = state.picks.finish || 'Clean Minimal';
    const radius = state.picks.shape === 'Sharp Corners' ? 0 : 12;
    return {
      schema: 'schwep.blueprint.v1',
      styleSystem: 'neo-brutal',
      source: { page: window.location.href, title: document.title },
      blueprint: {
        frame: state.picks.frame || 'Bento Grid',
        shape: state.picks.shape || 'Round Corners',
        tone,
        finish,
      },
      tokens: {
        radius,
        border: '3px solid #0d0d0d',
        shadow: '6px 6px 0 #0d0d0d',
        typeDisplay: tone === 'Editorial Modern' ? 'Instrument Serif' : 'Syne',
        typeBody: 'DM Sans',
      },
      intent:
        'Generate a UI from this Schwep blueprint. Return structured JSON for layout, components, and tokens only.',
      generatedAt: new Date().toISOString(),
    };
  }

  function esc(v) {
    return String(v).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  /* ── Prompt insertion ──────────────────────────────────── */
  function setPromptText(text) {
    const prompt = findPromptElement() || state.promptEl;
    if (!prompt) {
      statusEl.textContent = 'No prompt field found.';
      return false;
    }
    state.promptEl = prompt;
    prompt.focus();

    if (prompt.matches('textarea, input[type="text"], input:not([type])')) {
      const base = prompt.value ? prompt.value.trim() + '\n\n' : '';
      prompt.value = base + text;
      prompt.dispatchEvent(new Event('input', { bubbles: true }));
      prompt.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    }

    if (prompt.isContentEditable) {
      const base = prompt.textContent ? prompt.textContent.trim() + '\n\n' : '';
      prompt.textContent = base + text;
      prompt.dispatchEvent(
        new InputEvent('input', { bubbles: true, inputType: 'insertText' })
      );
      return true;
    }

    statusEl.textContent = 'Prompt type not supported.';
    return false;
  }

  function copyText(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => { statusEl.textContent = 'Copied to clipboard.'; })
      .catch(() => { statusEl.textContent = 'Copy failed — try manual copy.'; });
  }

  /* ── Render: Result ────────────────────────────────────── */
  function renderResult() {
    state.payload = makePayload();
    const prettyJson = JSON.stringify(state.payload, null, 2);
    const bp = state.payload.blueprint;

    renderProgress();

    bodyEl.innerHTML = `
      <div class="sp-result">
        <div class="sp-result-head">
          <div class="sp-result-brand">Schwep</div>
          <div class="sp-result-title">Design Blueprint</div>
        </div>
        <div class="sp-result-rows">
          <div class="sp-result-row"><span class="sp-result-k">Frame</span><span class="sp-result-v">${esc(bp.frame)}</span></div>
          <div class="sp-result-row"><span class="sp-result-k">Shape</span><span class="sp-result-v">${esc(bp.shape)}</span></div>
          <div class="sp-result-row"><span class="sp-result-k">Tone</span><span class="sp-result-v">${esc(bp.tone)}</span></div>
          <div class="sp-result-row"><span class="sp-result-k">Finish</span><span class="sp-result-v">${esc(bp.finish)}</span></div>
        </div>
      </div>
      <div class="sp-result-actions">
        <button class="sp-btn-primary" id="schwep-insert">Insert into Prompt</button>
        <button class="sp-btn-secondary" id="schwep-copy">Copy JSON</button>
        <button class="sp-btn-ghost" id="schwep-restart">Start Over</button>
      </div>
    `;

    statusEl.textContent = 'Blueprint ready.';

    shadow.querySelector('#schwep-insert').addEventListener('click', () => {
      const ok = setPromptText(prettyJson);
      if (ok) statusEl.textContent = 'Inserted into prompt.';
    });
    shadow.querySelector('#schwep-copy').addEventListener('click', () => copyText(prettyJson));
    shadow.querySelector('#schwep-restart').addEventListener('click', resetFlow);
  }

  /* ── Render: Round ─────────────────────────────────────── */
  function renderRound() {
    const round = rounds[state.roundIndex];
    const card = round.cards[state.cardIndex];

    renderProgress();

    bodyEl.innerHTML = `
      <div class="sp-card">
        <div class="sp-card-vis">${card.vis}</div>
        <div class="sp-card-body">
          <div class="sp-card-round">Round ${state.roundIndex + 1} · ${esc(round.title)}</div>
          <div class="sp-card-name">${esc(card.name)}</div>
          <div class="sp-card-desc">${esc(card.desc)}</div>
        </div>
      </div>
      <div class="sp-actions">
        <button class="sp-btn sp-skip" id="schwep-skip">Skip</button>
        <button class="sp-btn sp-like" id="schwep-like">Like ✓</button>
      </div>
    `;

    shadow.querySelector('#schwep-like').addEventListener('click', () => {
      state.picks[round.key] = card.name;
      state.roundIndex += 1;
      state.cardIndex = 0;
      if (state.roundIndex >= rounds.length) renderResult();
      else renderRound();
    });

    shadow.querySelector('#schwep-skip').addEventListener('click', () => {
      state.cardIndex = (state.cardIndex + 1) % round.cards.length;
      renderRound();
    });
  }

  function render() {
    if (state.roundIndex >= rounds.length) {
      renderResult();
      return;
    }
    renderRound();
  }

  /* ── Event listeners ───────────────────────────────────── */
  fab.addEventListener('click', () => setOpen(!state.open));
  closeBtn.addEventListener('click', () => setOpen(false));

  try {
    chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message.type === 'GET_PAGE_INFO') {
        sendResponse({ url: document.location.href, title: document.title });
        return true;
      }
      if (message.type === 'OPEN_SCHWEP_PANEL') {
        setOpen(true);
        sendResponse({ ok: true });
        return true;
      }
      return false;
    });
  } catch (_) {}

  /* ── Resilience ────────────────────────────────────────── */
  const observer = new MutationObserver(() => {
    if (!host.isConnected) mount();
  });
  observer.observe(document.documentElement, { childList: true });

  setInterval(() => {
    mount();
    host.setAttribute('style', HOST_STYLES);
  }, 600);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) mount();
  });

  let lastUrl = location.href;
  setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      mount();
    }
  }, 400);
})();
