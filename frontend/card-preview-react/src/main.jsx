import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { PreviewRenderer, getPreviewComponent } from './previews';

function render(type, container) {
  if (!container || !type) return false;
  const Component = getPreviewComponent(type);
  if (!Component) return false;
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <div className="card-preview-root">
        <Component />
      </div>
    </React.StrictMode>
  );
  container._schwepReactRoot = root;
  return true;
}

function unmount(container) {
  if (container && container._schwepReactRoot) {
    container._schwepReactRoot.unmount();
    container._schwepReactRoot = null;
  }
}

export default { render, unmount, getPreviewComponent };
