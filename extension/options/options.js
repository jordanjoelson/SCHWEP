/**
 * Schwep — Options page script
 * Load/save settings via chrome.storage; keep UI logic here.
 */

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('options-root');
  if (!root) return;

  // Load saved options
  chrome.storage.sync.get(['schwepOptions'], (result) => {
    const opts = result.schwepOptions || {};
    // Render or hydrate options UI from opts
    root.textContent = Object.keys(opts).length ? JSON.stringify(opts, null, 2) : 'No options saved yet.';
  });
});
