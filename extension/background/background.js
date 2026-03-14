/**
 * Schwep — Background Service Worker (Manifest V3)
 * Handles lifecycle, message routing, and privileged logic.
 * Keep this thin; use core/ for shared utilities.
 */

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('[Schwep] Extension installed');
  } else if (details.reason === 'update') {
    console.log('[Schwep] Extension updated');
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Route messages from popup/options/content to appropriate handlers
  if (message.type === 'PING') {
    sendResponse({ ok: true, source: 'background' });
    return true; // keep channel open for async response if needed
  }
  return false;
});
