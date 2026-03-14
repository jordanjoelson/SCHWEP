/**
 * Schwep — Messaging helpers (shared contract between background, popup, content)
 * Use from background or popup; content scripts use chrome.runtime.sendMessage directly.
 */

export const MessageType = {
  PING: 'PING',
  GET_PAGE_INFO: 'GET_PAGE_INFO',
  // Add more as needed:
  // SAVE_PREFS: 'SAVE_PREFS',
  // FETCH_DATA: 'FETCH_DATA',
};

/**
 * Send a message to the background service worker.
 * @param {object} payload - { type, ...rest }
 * @returns {Promise<unknown>}
 */
export function sendToBackground(payload) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(payload, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve(response);
    });
  });
}
