// ─────────────────────────────
// ENGINE — Swipe Deck Logic
// ─────────────────────────────

const ROUNDS = [
  {
    label: 'Round 01 · The Frame',
    title: 'The Frame',
    cards: [
      { name: 'Bento Grid', desc: 'A modular grid system with varied card sizes creating visual hierarchy.', preview: 'bento' },
      { name: 'Split Layout', desc: 'Asymmetric two-column layout with dominant and secondary sections.', preview: 'split' },
      { name: 'Swiss Grid', desc: 'Clean, structured grid with precise spacing and alignment.', preview: 'swiss' },
      { name: 'Editorial', desc: 'Magazine-style layout with large typography and white space.', preview: 'editorial' }
    ]
  },
  {
    label: 'Round 02 · The Shape',
    title: 'The Shape',
    cards: [
      { name: 'Sharp Corners', desc: 'Crisp, geometric edges with 0px border radius.', preview: 'sharp' },
      { name: 'Soft Corners', desc: 'Gentle curves with 8px border radius.', preview: 'soft' },
      { name: 'Round Corners', desc: 'Smooth, rounded edges with 12px border radius.', preview: 'round' },
      { name: 'Pill Shape', desc: 'Fully rounded corners with 24px+ border radius.', preview: 'pill' }
    ]
  },
  {
    label: 'Round 03 · The Tone',
    title: 'The Tone',
    cards: [
      { name: 'Bold Tech', desc: 'Strong, confident typography with high contrast.', preview: 'boldtech' },
      { name: 'Editorial Modern', desc: 'Elegant serif typography with refined spacing.', preview: 'edmod' },
      { name: 'Raw Mono', desc: 'Monospace typewriter aesthetic with raw energy.', preview: 'rawmono' },
      { name: 'Handwritten', desc: 'Playful, personal script with organic flow.', preview: 'hand' }
    ]
  },
  {
    label: 'Round 04 · The Finish',
    title: 'The Finish',
    cards: [
      { name: 'Grain Texture', desc: 'Subtle film grain overlay for vintage warmth.', preview: 'grain' },
      { name: 'Clean Minimal', desc: 'Pure, untextured surface with perfect clarity.', preview: 'clean' },
      { name: 'Gritty Edge', desc: 'Rough, textured finish with raw character.', preview: 'gritty' },
      { name: 'Neon Glow', desc: 'Vibrant neon effects with glowing highlights.', preview: 'neon' }
    ]
  }
];

let currentRound = 0;
let currentCardIndex = 0;
let results = { frame: '', shape: '', tone: '', finish: '' };
let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let card = null;
let radiusValue = 12;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  card = document.getElementById('card');
  setupCard();
  setupSwipeHandlers();
  setupButtons();
  setupShapeOverlay();
  updateRoundDisplay();
});

function setupCard() {
  const round = ROUNDS[currentRound];
  const cardData = round.cards[currentCardIndex];
  
  document.getElementById('card-name').textContent = cardData.name;
  document.getElementById('card-desc').textContent = cardData.desc;
  document.getElementById('card-vis').innerHTML = generatePreview(cardData.preview);
  
  // Reset card position
  card.style.transform = 'translate(0, 0) rotate(0deg)';
  card.style.opacity = '1';
  card.classList.remove('snapping', 'throwing', 'is-dragging');
  
  // Show shape overlay only in Round 2
  const shapeOverlay = document.getElementById('shape-overlay');
  if (currentRound === 1) {
    shapeOverlay.classList.add('vis');
  } else {
    shapeOverlay.classList.remove('vis');
  }
}

function generatePreview(type) {
  const previews = {
    bento: `
      <div class="pv-bento">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `,
    split: `
      <div class="pv-split">
        <div class="sl"></div>
        <div class="sr">
          <div></div>
          <div></div>
        </div>
      </div>
    `,
    swiss: `
      <div class="pv-swiss">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `,
    editorial: `
      <div class="pv-editorial">
        <div class="pe1"></div>
        <div class="pe2"></div>
        <div class="pe3"></div>
      </div>
    `,
    sharp: `<div class="pv-clean" style="border-radius: 0;"><div></div></div>`,
    soft: `<div class="pv-clean" style="border-radius: 8px;"><div></div></div>`,
    round: `<div class="pv-clean" style="border-radius: 12px;"><div></div></div>`,
    pill: `<div class="pv-clean" style="border-radius: 24px;"><div></div></div>`,
    boldtech: `<div class="pv-boldtech">BOLD</div>`,
    edmod: `<div class="pv-edmod">Elegant</div>`,
    rawmono: `<div class="pv-rawmono">MONO<br>SPACE</div>`,
    hand: `<div class="pv-hand">hand</div>`,
    grain: `<div class="pv-grain"></div>`,
    clean: `<div class="pv-clean"><div></div></div>`,
    gritty: `
      <div class="pv-gritty">
        <div style="width: 80%; background: rgba(255,255,255,.3);"></div>
        <div style="width: 60%; background: rgba(255,255,255,.2);"></div>
        <div style="width: 90%; background: rgba(255,255,255,.25);"></div>
      </div>
    `,
    neon: `<div class="pv-neon">NEON</div>`
  };
  return previews[type] || '<div class="pv-clean"><div></div></div>';
}

function setupSwipeHandlers() {
  // Mouse events
  card.addEventListener('mousedown', startDrag);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', endDrag);
  
  // Touch events
  card.addEventListener('touchstart', startDragTouch);
  document.addEventListener('touchmove', dragTouch);
  document.addEventListener('touchend', endDrag);
}

function startDrag(e) {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  card.classList.add('is-dragging');
  e.preventDefault();
}

function startDragTouch(e) {
  isDragging = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  card.classList.add('is-dragging');
  e.preventDefault();
}

function drag(e) {
  if (!isDragging) return;
  currentX = e.clientX - startX;
  currentY = e.clientY - startY;
  updateCardTransform();
}

function dragTouch(e) {
  if (!isDragging) return;
  currentX = e.touches[0].clientX - startX;
  currentY = e.touches[0].clientY - startY;
  updateCardTransform();
  e.preventDefault();
}

function updateCardTransform() {
  const rotate = currentX * 0.1;
  const likeOpacity = currentX > 0 ? Math.min(currentX / 100, 1) : 0;
  const nopeOpacity = currentX < 0 ? Math.min(Math.abs(currentX) / 100, 1) : 0;
  
  card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`;
  document.querySelector('.ind-like').style.opacity = likeOpacity;
  document.querySelector('.ind-nope').style.opacity = nopeOpacity;
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;
  card.classList.remove('is-dragging');
  
  const threshold = 100;
  if (Math.abs(currentX) > threshold) {
    if (currentX > 0) {
      handleLike();
    } else {
      handleNope();
    }
  } else {
    snapBack();
  }
}

function snapBack() {
  card.classList.add('snapping');
  card.style.transform = 'translate(0, 0) rotate(0deg)';
  card.style.opacity = '1';
  document.querySelector('.ind-like').style.opacity = '0';
  document.querySelector('.ind-nope').style.opacity = '0';
  currentX = 0;
  currentY = 0;
  
  setTimeout(() => {
    card.classList.remove('snapping');
  }, 420);
}

function handleLike() {
  flash();
  saveResult();
  nextCard();
}

function handleNope() {
  flash();
  nextCard();
}

function flash() {
  const flashEl = document.getElementById('flash');
  flashEl.classList.add('on');
  setTimeout(() => flashEl.classList.remove('on'), 100);
}

function saveResult() {
  const round = ROUNDS[currentRound];
  const cardData = round.cards[currentCardIndex];
  
  if (currentRound === 0) results.frame = cardData.name;
  else if (currentRound === 1) results.shape = `${cardData.name} (${radiusValue}px)`;
  else if (currentRound === 2) results.tone = cardData.name;
  else if (currentRound === 3) results.finish = cardData.name;
}

function nextCard() {
  currentCardIndex++;
  const round = ROUNDS[currentRound];
  
  if (currentCardIndex >= round.cards.length) {
    // Round complete
    currentRound++;
    currentCardIndex = 0;
    
    if (currentRound >= ROUNDS.length) {
      // All rounds complete
      showFinale();
      return;
    }
    
    updateBlimp();
    updateRoundDisplay();
  }
  
  setTimeout(() => {
    setupCard();
  }, 100);
}

function updateBlimp() {
  const blimp = document.getElementById('blimp');
  const progress = (currentRound / ROUNDS.length) * 100;
  blimp.style.left = `${progress}%`;
  
  // Light up completed stops
  const stops = document.querySelectorAll('.tstop');
  stops.forEach((stop, i) => {
    if (i < currentRound) {
      stop.classList.add('lit');
    } else {
      stop.classList.remove('lit');
    }
  });
}

function updateRoundDisplay() {
  const round = ROUNDS[currentRound];
  document.getElementById('round-label').textContent = round.label;
  document.getElementById('round-title').textContent = round.title;
  document.getElementById('round-num').textContent = currentRound + 1;
  updateBlimp();
}

function setupButtons() {
  document.getElementById('btn-like').addEventListener('click', handleLike);
  document.getElementById('btn-nope').addEventListener('click', handleNope);
  document.getElementById('btn-copy').addEventListener('click', copyDNA);
  document.getElementById('btn-again').addEventListener('click', reset);
}

function setupShapeOverlay() {
  const slider = document.getElementById('radius-slider');
  const pills = document.querySelectorAll('.sp-pill');
  
  slider.addEventListener('input', (e) => {
    radiusValue = parseInt(e.target.value);
    document.getElementById('radius-val').textContent = `${radiusValue}px`;
    updateRadiusPreview();
  });
  
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('on'));
      pill.classList.add('on');
      const r = parseInt(pill.dataset.r);
      radiusValue = r;
      slider.value = r;
      document.getElementById('radius-val').textContent = `${r}px`;
      updateRadiusPreview();
    });
  });
}

function updateRadiusPreview() {
  const preview = document.querySelector('.scard-vis .pv-clean');
  if (preview) {
    preview.style.borderRadius = `${radiusValue}px`;
  }
}

function showFinale() {
  document.getElementById('finale').classList.add('on');
  document.getElementById('result-frame').textContent = results.frame || '-';
  document.getElementById('result-shape').textContent = results.shape || '-';
  document.getElementById('result-tone').textContent = results.tone || '-';
  document.getElementById('result-finish').textContent = results.finish || '-';
}

function copyDNA() {
  const dna = JSON.stringify(results, null, 2);
  navigator.clipboard.writeText(dna).then(() => {
    const btn = document.getElementById('btn-copy');
    const original = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => {
      btn.textContent = original;
    }, 2000);
  });
}

function reset() {
  currentRound = 0;
  currentCardIndex = 0;
  results = { frame: '', shape: '', tone: '', finish: '' };
  radiusValue = 12;
  
  document.getElementById('finale').classList.remove('on');
  document.getElementById('radius-slider').value = 12;
  document.getElementById('radius-val').textContent = '12px';
  document.querySelectorAll('.sp-pill').forEach((p, i) => {
    p.classList.toggle('on', i === 2);
  });
  
  updateRoundDisplay();
  setupCard();
}
