/**
 * Schwep — Popup script
 * Sets blimp image src and handles background ping.
 */
document.addEventListener('DOMContentLoaded', () => {
  const blimpImg = document.getElementById('blimp-img');
  if (blimpImg) {
    blimpImg.src = chrome.runtime.getURL('assets/blimp.png');
  }

  chrome.runtime.sendMessage({ type: 'PING' }, (response) => {
    if (chrome.runtime.lastError) return;
  });
});
