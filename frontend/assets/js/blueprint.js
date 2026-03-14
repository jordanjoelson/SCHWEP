// Blueprint detail page: render full layout example from saved results

function getSavedResults() {
  try {
    const raw = localStorage.getItem('schwep-results');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Could not read blueprint results', e);
    return null;
  }
}

function mapFrameToKey(frameName) {
  if (!frameName) return 'bento';
  const n = frameName.toLowerCase();
  if (n.includes('bento')) return 'bento';
  if (n.includes('split')) return 'split';
  if (n.includes('swiss')) return 'swiss';
  if (n.includes('editorial')) return 'editorial';
  return 'bento';
}

function getRadius(results) {
  if (!results || typeof results.radius !== 'number') return 12;
  return results.radius;
}

function createLayoutPreview(results) {
  const frameKey = mapFrameToKey(results.frame);
  const radius = getRadius(results);
  const styleVar = `--bp-radius: ${radius}px;`;

  const commonMeta = `
    <div style="height: 26px; border-bottom: 1px solid rgba(13,13,13,0.09); padding: 6px 10px; display:flex; align-items:center; gap:6px; background:rgba(13,13,13,0.02);">
      <div style="width:10px;height:10px;border-radius:999px;background:#ff5f57;"></div>
      <div style="width:10px;height:10px;border-radius:999px;background:#ffbd2e;"></div>
      <div style="width:10px;height:10px;border-radius:999px;background:#28ca41;"></div>
      <div style="width:1px;height:12px;background:rgba(13,13,13,0.12);margin:0 8px;"></div>
      <div style="flex:1;height:8px;background:rgba(13,13,13,0.12);border-radius:3px;max-width:120px;"></div>
    </div>
  `;

  if (frameKey === 'bento') {
    return `
      <div style="${styleVar}; width:100%; height:100%; display:flex; flex-direction:column;">
        ${commonMeta}
        <div class="layout-bento-page">
          <div class="layout-bento-page-hero">
            <div class="layout-bento-page-hero-title"></div>
            <div class="layout-bento-page-hero-sub"></div>
            <div class="layout-bento-page-hero-cta"></div>
          </div>
          <div class="layout-bento-page-card">
            <div class="layout-bento-page-card-title"></div>
            <div class="layout-bento-page-card-line"></div>
          </div>
          <div class="layout-bento-page-metric">
            <div class="layout-bento-page-metric-value"></div>
            <div class="layout-bento-page-metric-bar"></div>
          </div>
          <div class="layout-bento-page-list">
            <div class="layout-bento-page-list-row"></div>
            <div class="layout-bento-page-list-row"></div>
            <div class="layout-bento-page-list-row"></div>
          </div>
        </div>
      </div>
    `;
  }

  if (frameKey === 'split') {
    return `
      <div style="${styleVar}; width:100%; height:100%; display:flex; flex-direction:column;">
        ${commonMeta}
        <div class="layout-split-page">
          <div class="layout-split-page-main">
            <div class="layout-split-page-main-title"></div>
            <div class="layout-split-page-main-sub"></div>
            <div class="layout-split-page-main-cta"></div>
          </div>
          <div class="layout-split-page-side">
            <div class="layout-split-page-panel">
              <div style="width:72%;height:9px;background:rgba(13,13,13,0.18);border-radius:3px;margin-bottom:5px;"></div>
              <div style="width:100%;height:7px;background:rgba(13,13,13,0.12);border-radius:2px;margin-bottom:4px;"></div>
              <div style="width:86%;height:7px;background:rgba(13,13,13,0.12);border-radius:2px;"></div>
            </div>
            <div class="layout-split-page-panel">
              <div style="width:56%;height:9px;background:rgba(13,13,13,0.18);border-radius:3px;margin-bottom:5px;"></div>
              <div style="width:100%;height:7px;background:rgba(13,13,13,0.12);border-radius:2px;margin-bottom:4px;"></div>
              <div style="width:78%;height:7px;background:rgba(13,13,13,0.12);border-radius:2px;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (frameKey === 'swiss') {
    return `
      <div style="${styleVar}; width:100%; height:100%; display:flex; flex-direction:column;">
        ${commonMeta}
        <div class="layout-swiss-page">
          <div class="layout-swiss-row">
            <div class="layout-swiss-bar"></div>
            <div class="layout-swiss-bar" style="background:var(--orange);"></div>
          </div>
          <div class="layout-swiss-row">
            <div style="display:flex;flex-direction:column;gap:5px;">
              <div class="layout-swiss-bar" style="width:80%;"></div>
              <div class="layout-swiss-bar" style="width:60%;background:rgba(13,13,13,0.25);"></div>
            </div>
            <div class="layout-swiss-grid">
              <div class="layout-swiss-tile"></div>
              <div class="layout-swiss-tile"></div>
              <div class="layout-swiss-tile"></div>
              <div class="layout-swiss-tile"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (frameKey === 'editorial') {
    return `
      <div style="${styleVar}; width:100%; height:100%; display:flex; flex-direction:column;">
        ${commonMeta}
        <div class="layout-editorial-page">
          <div class="layout-editorial-cover">
            <div class="layout-editorial-cover-label"></div>
            <div class="layout-editorial-cover-headline"></div>
          </div>
          <div class="layout-editorial-body">
            <div class="layout-editorial-line" style="width:80%;"></div>
            <div class="layout-editorial-line"></div>
            <div class="layout-editorial-line"></div>
            <div class="layout-editorial-line" style="width:70%;"></div>
          </div>
        </div>
      </div>
    `;
  }

  // Fallback: reuse bento layout
  return createLayoutPreview({ frame: 'Bento Grid', radius });
}

function renderBlueprintPage() {
  const results = getSavedResults();
  const tagsEl = document.getElementById('bp-tags');
  const jsonEl = document.getElementById('bp-json-code');
  const canvasEl = document.getElementById('bp-preview-canvas');
  const frameLabelEl = document.getElementById('bp-preview-frame-label');
  const nameEl = document.getElementById('bp-preview-name');

  if (!results || !tagsEl || !jsonEl || !canvasEl) {
    // If no results, send user back to engine
    window.location.href = 'engine.html';
    return;
  }

  const safeResults = {
    frame: results.frame || '',
    shape: results.shape || '',
    tone: results.tone || '',
    finish: results.finish || '',
    radius: getRadius(results),
  };

  const tagData = [
    { key: 'Frame', value: safeResults.frame },
    { key: 'Shape', value: safeResults.shape },
    { key: 'Tone', value: safeResults.tone },
    { key: 'Finish', value: safeResults.finish },
    { key: 'Radius', value: `${safeResults.radius}px` },
  ].filter((t) => t.value);

  tagsEl.innerHTML = '';
  tagData.forEach((tag) => {
    const el = document.createElement('div');
    el.className = 'bp-tag';
    el.innerHTML = `<span class="bp-tag-k">${tag.key}</span><span class="bp-tag-v">${tag.value}</span>`;
    tagsEl.appendChild(el);
  });

  jsonEl.textContent = JSON.stringify(safeResults, null, 2);

  frameLabelEl.textContent = safeResults.frame ? `Frame: ${safeResults.frame}` : 'Frame: –';
  nameEl.textContent = safeResults.frame || 'Blueprint preview';

  canvasEl.innerHTML = createLayoutPreview(safeResults);
}

function setupCopyButton() {
  const btn = document.getElementById('bp-copy-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const results = getSavedResults();
    if (!results) return;
    const safeResults = {
      frame: results.frame || '',
      shape: results.shape || '',
      tone: results.tone || '',
      finish: results.finish || '',
      radius: getRadius(results),
    };
    const text = JSON.stringify(safeResults, null, 2);

    navigator.clipboard
      .writeText(text)
      .then(() => {
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = original;
        }, 1800);
      })
      .catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = original;
        }, 1800);
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderBlueprintPage();
  setupCopyButton();
});

