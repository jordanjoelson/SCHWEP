import React from 'react';
import { Image } from 'lucide-react';
import { Card, CardContent } from '../components/Card';

export function EditorialPreview() {
  return (
    <div className="h-full flex flex-col bg-muted/30 overflow-hidden">
      <div className="bg-foreground text-background py-2 px-3 flex justify-between items-center border-b-2 border-primary">
        <span className="font-bold text-xs tracking-widest uppercase">The Journal</span>
        <span className="text-xs tracking-widest text-white/50 uppercase">Issue 12</span>
      </div>
      <div className="flex-1 p-2.5 grid grid-cols-2 grid-rows-[auto_1fr] gap-2 overflow-hidden">
        <div className="col-span-2 text-xs tracking-widest uppercase text-primary border-b border-primary/20 pb-1">Design — Long Read</div>
        <div className="flex flex-col justify-between">
          <div>
            <div className="font-serif text-[15px] font-bold leading-tight text-foreground">
              The <br /><em className="text-primary not-italic">future</em> <br />of form.
            </div>
            <div className="text-xs italic text-muted-foreground font-serif mt-1">by the editors</div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex-1 bg-muted rounded flex items-center justify-center text-muted-foreground">
            <Image className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-0.5">
            {[90, 75, 85].map((w, i) => (
              <div key={i} className="h-1 rounded bg-muted" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
