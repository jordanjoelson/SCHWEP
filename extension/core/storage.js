/**
 * Schwep — Storage helpers (chrome.storage.sync / local)
 * Use from background or popup/options; content scripts should ask background.
 */

const KEYS = {
  OPTIONS: 'schwepOptions',
  // Add more keys as needed
};

/**
 * @param {string} key
 * @param {unknown} value
 */
export function setSync(key, value) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else resolve();
    });
  });
}

/**
 * @param {string} key
 * @returns {Promise<unknown>}
 */
export function getSync(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], (result) => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else resolve(result[key]);
    });
  });
}

export { KEYS };
