import React from 'react';
import { Badge } from '../components/Badge';

const items = [
  { initials: 'JD', name: 'Jamie Doe', meta: 'Updated settings', tag: 'New' },
  { initials: 'AK', name: 'Alex Kim', meta: 'Commented on layout', tag: null },
  { initials: 'SM', name: 'Sam Miller', meta: 'Uploaded 3 files', tag: 'Pro' },
];

export function FeedPreview() {
  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      <div className="py-2 border-b px-2 text-[10px] uppercase tracking-widest text-muted-foreground">Activity</div>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 py-2 px-2 border-b border-border/60">
          <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center text-[10px] font-bold shrink-0">
            {item.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-foreground truncate">{item.name}</div>
            <div className="text-[10px] text-muted-foreground">{item.meta}</div>
          </div>
          {item.tag && <Badge className="text-[9px] bg-primary/15 text-primary border-0">{item.tag}</Badge>}
        </div>
      ))}
    </div>
  );
}
