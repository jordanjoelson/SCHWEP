# Schwep Chrome Extension

Chrome extension for the Schwep design engine (Manifest V3).

## Folder structure

```
extension/
├── manifest.json       # Extension config (MV3)
├── background/         # Service worker — routing, storage, API
│   └── background.js
├── popup/              # Toolbar popup UI
│   ├── popup.html
│   ├── popup.js
│   └── popup.css
├── options/            # Options page
│   ├── options.html
│   ├── options.js
│   └── options.css
├── content/            # Scripts injected into web pages
│   └── content.js
├── core/               # Shared utilities (messaging, storage)
│   ├── messaging.js
│   └── storage.js
├── assets/             # Shared styles/resources
│   └── content.css
├── icons/              # 16, 32, 48, 128 PNG (see icons/README.md)
├── _locales/           # i18n (e.g. en/messages.json)
└── README.md
```

## Conventions

- **Background**: Central coordinator; handle storage, permissions, and API calls here.
- **Content scripts**: Stay thin — extract page data or inject UI; talk to background via `chrome.runtime.sendMessage`.
- **Popup/Options**: Presentation only; use `core/messaging.js` and `core/storage.js` for cross-cutting logic.
- **Permissions**: Add only what you need in `manifest.json` (`permissions` and `host_permissions`).

## Load in Chrome

1. Add icon files under `icons/` (see `icons/README.md`). Without them the extension still loads but shows a default icon.
2. Open `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and select this `extension` folder.

## Version

Bump `version` in `manifest.json` (and optionally in the repo root) when releasing.
