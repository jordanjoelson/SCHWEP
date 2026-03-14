import React from 'react';
import { ArrowRight, BarChart3, LayoutGrid, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/Card';
import { Button } from '../components/Button';

export function BentoPreview() {
  return (
    <div className="grid grid-cols-2 grid-rows-[55%_45%] gap-2 h-full bg-muted/30 p-2">
      <Card className="col-span-1 row-span-2 bg-foreground text-background border-foreground flex flex-col justify-between p-3 overflow-hidden relative">
        <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-primary/20" />
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-widest text-white/70">Dashboard</span>
          <LayoutGrid className="w-3 h-3 text-white/50" />
        </div>
        <div>
          <div className="font-bold text-base leading-tight text-white mb-1">
            Your <br /><span className="text-primary">metrics</span> <br />live.
          </div>
          <div className="flex gap-0.5 items-end h-5 mb-2">
            {[30, 50, 38, 70, 55, 90, 72].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-primary rounded-t opacity-70"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <Button size="sm" className="bg-primary text-primary-foreground text-[10px] h-7 px-2 gap-1">
            Explore <ArrowRight className="w-2.5 h-2.5" />
          </Button>
        </div>
      </Card>
      <Card className="p-2 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase text-muted-foreground">Users</span>
          <BarChart3 className="w-3 h-3 text-primary" />
        </div>
        <div className="font-bold text-base text-foreground">12.4k</div>
        <div className="text-[10px] text-green-600 flex items-center gap-0.5">↑ 18% <span className="text-muted-foreground">this week</span></div>
      </Card>
      <Card className="p-2 flex items-center gap-2 bg-accent/50 border-primary/20">
        <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center text-white shrink-0">
          <Zap className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-xs font-semibold text-foreground">Quick action</div>
          <div className="text-xs text-muted-foreground">Get started →</div>
        </div>
      </Card>
    </div>
  );
}
