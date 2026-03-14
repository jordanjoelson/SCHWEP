import React from 'react';
import { Mail, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function FormPreview() {
  return (
    <div className="h-full flex flex-col gap-3 p-2 bg-muted/20">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Step 2 of 4</span>
        <div className="flex gap-1">
          {[1, 1, 0, 0].map((filled, i) => (
            <div
              key={i}
              className={`w-4 h-1 rounded ${filled ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
      </div>
      <Card className="flex-1 flex flex-col p-3 gap-2">
        <CardHeader className="p-0">
          <CardTitle className="text-sm">Your details</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-col gap-2">
          <div>
            <label className="block text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
              <Input placeholder="you@example.com" className="pl-7 h-8 text-xs" readOnly />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Role</label>
            <div className="flex h-9 items-center rounded-md border border-input bg-muted/50 px-3 text-xs text-muted-foreground">
              <User className="w-3 h-3 mr-2" />
              Designer ▼
            </div>
          </div>
          <div className="flex gap-2 mt-1">
            <Button size="sm" className="flex-1 text-xs h-8">
              Continue <ArrowRight className="w-3 h-3" />
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs h-8">Back</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
