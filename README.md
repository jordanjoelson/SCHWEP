# SCHWEP

Schwep is a taste-to-spec design engine. Instead of writing a prompt that tries to explain the look you want, you swipe through visual design options and Schwep translates the choices you like into a technical design blueprint you can hand to developers or paste into an AI tool.

The tagline says it best: stop explaining, start matching.

## What it does

You run through 4 rounds of a swipe deck. Each round extracts a different layer of your design taste:

- **Round 01 - The Frame**: layout structure and grid systems (15 cards, including Bento Grid, Swiss Grid, 12-Column Grid, Golden Ratio, F-Pattern, Z-Pattern, and more)
- **Round 02 - The Shape**: corner and border-radius style (6 cards, from 0px Sharp Corners up to 24px+ Pill Shape, plus a live radius slider defaulting to 12px)
- **Round 03 - The Tone**: typography and type personality (6 cards, including Bold Tech, Editorial Modern, Raw Mono, Neo-Brutalist)
- **Round 04 - The Finish**: surface effects and texture (6 cards, including Grain, Neon Glow, Glassmorphism, Holographic)

Swipe right to keep a style, left to reject it. You get a limited number of skips per round: 1 skip in Round 1 and 3 skips in each of Rounds 2 through 4. When all 4 rounds are done, your selections are packaged into a design blueprint (layout, colors, typography, effects) and saved to local storage so you can revisit past blueprints in the archive.

## Components

- **frontend/** - The static web app (landing page, signup/login, swipe engine, blueprint reveal, docs, archive). Plain HTML, CSS, and JavaScript. The card-preview-react folder holds a separate React + Vite + Tailwind preview renderer.
- **server.js** - An Express server that serves the frontend and proxies AI calls. It runs on port 3001 by default and exposes `POST /api/generate-variants`, which calls the Google Gemini API (gemini-1.5-flash) to generate exactly 3 new design card variants on demand. The API key stays server-side, read from `GEMINI_API_KEY`. Variant generation uses temperature 0.8 and a 512 token output cap, and the response is validated against 13 known preview types.
- **extension/** - A Manifest V3 Chrome extension (version 1.1.0) that brings the Schwep blueprint into AI chat tools. Content scripts run on chatgpt.com, chat.openai.com, claude.ai, and gemini.google.com.
- **Schwep Renderer/** - A Figma plugin (TypeScript) for rendering Schwep blueprints inside Figma.
- **scripts/** - A small Node utility (dna-to-svg.js) that turns a dna.json design definition into an SVG.

## Pricing

The landing page advertises three tiers:

- **Free** - $0/month: 3 blueprints per month, 1 skip per round, basic spec export
- **Individual** - $29/month: unlimited blueprints, 3 skips per round, advanced variant generation, version history, priority support
- **Team** - $99/month: everything in Individual plus unlimited team members, shared workspaces, centralized billing, and admin controls

## Getting started

```bash
npm install
cp env.example .env   # then add your GEMINI_API_KEY
npm start
```

The server prints `http://localhost:3001`. AI variant generation is optional: without a `GEMINI_API_KEY` the app still runs, it just skips the on-demand variant feature.

## TODO

- Make design results effectively infinite, generated on demand (LLM API or similar)
- Update the home page
- Explore the business model
- Set up auth
- Build out the docs page
- Improve the aesthetic vector modeling
- Generate a full design doc in an LLM-optimized format such as JSON, and define the exact output we want, with a focus on token efficiency
- Build a shared library of design docs across all users
- Make the design doc component capture everything: colors, typography hierarchy, styles, frame, and more
- Look into a browser extension that works directly inside LLM chat
- Investigate Nano Banana integration
- Keep it very easy to use and avoid too much separation from the dominant tools
- Make the output highly effective
- Add APIs to design libraries or inspiration sources
