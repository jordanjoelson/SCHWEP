import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

export function NeonPreview() {
  return (
    <div className="h-full bg-[#040414] flex flex-col overflow-hidden relative">
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="py-2 px-3 border-b border-cyan-400/20 flex justify-between items-center relative shrink-0">
        <span className="font-mono text-xs tracking-wider uppercase text-cyan-400 drop-shadow-[0_0_8px_rgba(61,255,208,.6)]">NEON.SYS</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#3DFFD0]" />
          <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_6px_#FF4DFF]" />
        </div>
      </div>
      <div className="flex-1 p-3 flex flex-col justify-between relative">
        <div>
          <div className="font-bold text-xl leading-tight tracking-wide uppercase text-cyan-400 drop-shadow-[0_0_20px_rgba(61,255,208,.7)] mb-1.5">NEON<br />PULSE.</div>
          <div className="w-14 h-0.5 bg-cyan-400 rounded shadow-[0_0_8px_#3DFFD0] mb-2" />
          <div className="flex flex-col gap-0.5">
            {[88, 65, 78].map((w, i) => (
              <div key={i} className="h-1 rounded bg-cyan-400/20" style={{ width: `${w}%`, boxShadow: '0 0 4px rgba(61,255,208,.25)' }} />
            ))}
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button variant="outline" size="sm" className="flex-1 border-cyan-400/40 text-cyan-400 text-xs h-7 font-mono uppercase shadow-[0_0_8px_rgba(61,255,208,.12)]">INFO</Button>
          <Button size="sm" className="flex-1 bg-cyan-400/10 border border-cyan-400 text-cyan-400 text-xs h-7 font-mono uppercase gap-1 shadow-[0_0_12px_rgba(61,255,208,.2)">
            GO <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
