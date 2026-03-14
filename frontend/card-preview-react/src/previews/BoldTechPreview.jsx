import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

export function BoldTechPreview() {
  return (
    <div className="h-full bg-[#080810] p-3 flex flex-col justify-between overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-transparent" />
      <div className="absolute bottom-0 right-0 w-28 h-28 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
      <div className="flex justify-between items-center relative">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/30">SYS_001</span>
        <div className="flex gap-1 items-center">
          <div className="w-1 h-1 rounded-full bg-primary shadow-[0_0_6px_var(--primary)]" />
          <span className="text-xs tracking-wide text-primary/80 font-mono">LIVE</span>
        </div>
      </div>
      <div className="relative">
        <div className="font-bold text-2xl leading-tight tracking-tight text-white uppercase mb-2">
          BREAK <br /><span className="text-primary">THE</span> <br />NORM.
        </div>
        <div className="flex flex-col gap-0.5 mb-2">
          <div className="h-0.5 w-full rounded bg-white/10" />
          <div className="h-0.5 w-[68%] rounded bg-white/10" />
        </div>
        <div className="flex gap-1.5">
          <Button size="sm" className="bg-primary text-primary-foreground text-xs h-7 px-2 gap-1 font-mono uppercase">
            LAUNCH <ArrowRight className="w-3 h-3" />
          </Button>
          <Button variant="outline" size="sm" className="border-white/20 text-white/60 text-xs h-7 px-2 font-mono uppercase">DOCS</Button>
        </div>
      </div>
    </div>
  );
}
