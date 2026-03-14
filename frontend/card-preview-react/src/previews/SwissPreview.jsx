import React from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent } from '../components/Card';

export function SwissPreview() {
  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      <div className="py-2 px-3 flex justify-between items-center border-b-2 border-foreground">
        <span className="font-bold text-[10px] tracking-wider">STUDIO</span>
        <div className="flex gap-3 items-center">
          {['Work', 'About', 'Contact'].map((t) => (
            <span key={t} className="text-xs uppercase tracking-wide text-muted-foreground">{t}</span>
          ))}
          <div className="w-5 h-5 border border-foreground flex items-center justify-center rounded-none">
            <Plus className="w-2.5 h-2.5" />
          </div>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-[70px_1fr] gap-0 overflow-hidden">
        <div className="border-r border-border py-3 px-3 flex flex-col gap-1.5">
          <div className="text-xs uppercase tracking-widest text-primary mb-0.5">Index</div>
          {['01 Grid', '02 Type', '03 Color', '04 Motion'].map((t, i) => (
            <div key={t} className={`text-xs py-0.5 border-b border-border/50 ${i === 0 ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{t}</div>
          ))}
        </div>
        <div className="p-3 flex flex-col justify-between">
          <div>
            <div className="font-bold text-lg leading-tight tracking-tight text-foreground mb-1">THE<br />GRID<br /><span className="text-primary">RULES.</span></div>
            <div className="w-7 h-0.5 bg-primary rounded mb-2" />
          </div>
          <div className="flex flex-col gap-0.5">
            {[95, 78, 85, 62].map((w, i) => (
              <div key={i} className="h-1 rounded bg-muted" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
