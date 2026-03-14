import React from 'react';
import { Terminal, ChevronRight, Folder, Check } from 'lucide-react';
import { Card } from '../components/Card';

export function TerminalPreview() {
  return (
    <div className="h-full flex flex-col bg-[#0D1117] rounded-b overflow-hidden font-mono">
      <div className="bg-[#1c1c1c] rounded-t px-2.5 py-1.5 flex items-center gap-1.5 border-b border-white/10">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
        <div className="flex-1" />
        <span className="text-[10px] text-white/30 tracking-wide">schwep — zsh</span>
      </div>
      <div className="flex-1 p-2.5 text-[9px] leading-relaxed text-white/80">
        <div className="flex items-center gap-0.5">
          <ChevronRight className="w-3 h-3 text-primary" />
          <span className="text-[#3DFFD0]">~/project</span>
          <span className="text-white/40">git:(main)</span>
        </div>
        <div><span className="text-white/50">$</span> schwep init</div>
        <div className="text-white/40 flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> loaded config</div>
        <div className="text-white/40 flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> ready in 42ms</div>
        <div><span className="text-white/50">$</span> schwep build <span className="text-primary/80">--prod</span></div>
        <div className="text-green-500 flex items-center gap-1"><Check className="w-3 h-3" /> design.blueprint written</div>
        <div className="flex items-center gap-0.5">
          <span className="text-white/50">$</span>
          <div className="w-1.5 h-2.5 bg-primary ml-0.5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
