import React from 'react';
import { Palette, Grid, Sparkles, Menu, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';

const tiles = [
  { icon: Palette, title: 'Color theory', sub: 'Palette systems' },
  { icon: Grid, title: 'Grid math', sub: 'Spacing logic' },
  { icon: Sparkles, title: 'Typography', sub: 'Type pairing' },
];

export function SplitPreview() {
  return (
    <div className="grid grid-cols-[56%_1fr] gap-2 h-full p-2 bg-muted/30">
      <Card className="bg-foreground text-background border-foreground p-3 flex flex-col justify-between overflow-hidden relative">
        <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-primary/10" />
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-widest text-white/70">Featured</span>
          <Menu className="w-3 h-3 text-white/50" />
        </div>
        <div>
          <div className="font-bold text-[15px] leading-tight text-white mb-1.5">
            Design <br />that <br /><span className="text-primary">works.</span>
          </div>
          <div className="text-[10px] text-white/60 leading-snug mb-2">Built for people who care about every detail.</div>
          <Button variant="outline" size="sm" className="border-white/20 text-white/80 hover:bg-white/10 h-7 text-[10px] gap-1">
            Read more <ArrowRight className="w-2.5 h-2.5" />
          </Button>
        </div>
      </Card>
      <div className="flex flex-col gap-1.5 justify-center">
        {tiles.map(({ icon: Icon, title, sub }, i) => (
          <Card key={i} className="p-2 flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center shrink-0">
              <Icon className="w-3 h-3 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-foreground truncate">{title}</div>
              <div className="text-[10px] text-muted-foreground">{sub}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
