# Card Preview (React + Lucide + shadcn-style)

This folder builds the **library-based** card previews used in the swipe engine. The engine loads the built bundle and mounts React when a card type has a React preview.

## Stack

- **React 18** – card content is rendered with React
- **Lucide React** – icons (ArrowRight, LayoutGrid, BarChart3, Mail, User, Plus, Image, etc.)
- **Tailwind CSS** – styling with shadcn-style tokens (primary, muted, card, etc.)
- **shadcn-style components** – `Button`, `Card`, `Input`, `Badge` with the same class names and variants as [shadcn/ui](https://ui.shadcn.com)

## Preview types that use this bundle

- **bento** – Bento grid with Card, Button, Lucide icons
- **split** – Split layout with Card, Button, Lucide (Palette, Grid, Sparkles, Menu, ArrowRight)
- **swiss** – Swiss grid with Plus icon
- **editorial** – Editorial layout with Image icon
- **dashboardflow** – Form with Input, Button, Mail, User, ArrowRight
- **modular** – Activity feed with Badge, avatars
- **rawmono** – Terminal with ChevronRight, Check
- **boldtech** – Bold tech block with Button, ArrowRight
- **neon** – Neon style with ArrowRight, glow styling

## Commands

```bash
npm install
npm run build   # outputs to ../assets/js/card-preview.iife.js and card-preview.css
npm run dev     # local dev (optional)
```

The engine (`engine.html`) loads `assets/js/card-preview.css` and `assets/js/card-preview.iife.js`. When you change previews or components, run `npm run build` again.
