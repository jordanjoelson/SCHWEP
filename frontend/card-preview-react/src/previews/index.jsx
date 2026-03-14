import React from 'react';
import { BentoPreview } from './BentoPreview';
import { FormPreview } from './FormPreview';
import { FeedPreview } from './FeedPreview';
import { SplitPreview } from './SplitPreview';
import { SwissPreview } from './SwissPreview';
import { TerminalPreview } from './TerminalPreview';
import { EditorialPreview } from './EditorialPreview';
import { BoldTechPreview } from './BoldTechPreview';
import { NeonPreview } from './NeonPreview';

const PREVIEW_MAP = {
  bento: BentoPreview,
  dashboardflow: FormPreview,
  modular: FeedPreview,
  split: SplitPreview,
  swiss: SwissPreview,
  rawmono: TerminalPreview,
  editorial: EditorialPreview,
  boldtech: BoldTechPreview,
  neon: NeonPreview,
};

export function getPreviewComponent(type) {
  return PREVIEW_MAP[type] || null;
}

export function PreviewRenderer({ type }) {
  const Component = getPreviewComponent(type);
  if (!Component) return null;
  return (
    <div className="card-preview-root">
      <Component />
    </div>
  );
}
