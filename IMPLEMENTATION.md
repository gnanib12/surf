# Surf & Turf Lodge — implementation

This implements the `project/Surf and Turf Lodge.dc.html` design (a Claude
Design export) as a real, framework-free website, and derives Squarespace-ready
per-page code snippets from it.

The original prototype ran on a proprietary React-based runtime (`support.js`
with `{{ }}` template interpolation and a `DCLogic` class). That runtime is
replaced here with plain HTML + a tiny vanilla JS file — no build step, no
dependencies — which also addresses the original "cold and laggy" complaint.

## What's here

```
site/                     ← standalone, runnable website (open in any browser)
  index.html              ·  Home
  menu.html               ·  Full menu + Thursday / Sunday / Kid's specials
  about.html              ·  Our Story (est. July 2006, seats 200+)
  hours.html              ·  Hours & Location
  assets/css/base.css     ·  global reset, fonts, desktop/mobile nav switch
  assets/js/app.js        ·  live open/closed badge, today's-hours highlight, mobile nav
  assets/img/             ·  logo

squarespace/              ← the same design as per-page Squarespace snippets
  _shared-code-injection.html   ·  paste once into Code Injection (Header)
  home.html / menu.html / about.html / hours.html  ·  one Code Block per page
  README.md               ·  step-by-step Squarespace instructions
```

## Preview the standalone site

It's all static — just open `site/index.html` in a browser, or serve the
folder:

```bash
cd site && python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy to Railway

The repo root includes a zero-dependency Node static server (`server.js`) and a
`package.json` with a `start` script, so Railway (Nixpacks) builds it with no
config:

1. Push this repo to GitHub (see the branch you're on).
2. On [railway.com](https://railway.com): **New Project → Deploy from GitHub
   repo**, pick this repo/branch.
3. Railway auto-detects Node, runs `npm install` (no deps) and `npm start`.
   The server binds to Railway's `$PORT` automatically.
4. Open the generated URL to preview. Click through Home → Menu → About →
   Hours and confirm the live "Open now / Closed" badge reads correctly.

Run it the same way locally:

```bash
npm start   # serves ./site on http://localhost:3000 (or $PORT)
```

Once it looks right on Railway, move to Squarespace using `squarespace/`.

## Design fidelity

The page markup keeps the prototype's exact inline styles, so the visual
result matches the export pixel-for-pixel. Only the dynamic bits were ported
out of the runtime into `app.js`:

- **Live "Open now / Closed" badge** — same schedule as the original
  (`Sun 11–15, Thu 16–20.5, Fri/Sat 15–21`, Mon–Wed closed) and same
  "Opens today/tomorrow/<day> at <time>" logic.
- **Today's row** in the hours table is bolded in barn-red.
- **Mobile nav** toggles via a hamburger (CSS media query at 860px replaces the
  prototype's JS width check).
- **Page switching** became real pages with real links; the homepage specials
  cards and the "Specials" nav item deep-link to `menu.html#sec-thursday`
  / `#sec-sunday` / `#sec-kids`.

## Content notes carried over from the chat

- Hours: **Sunday 11am–3pm**; Mon–Wed closed.
- **DoorDash and Instagram removed** — Order Online (CAKE) + Facebook only.
- About reflects the real story: opened **July 2006**, family-run, **seats 200+**.
- Photos reuse the existing Squarespace CDN URLs from the live site (the
  watermarked images the assistant screened out are not used).

## If hours ever change

Update them in **both** places: the visible hours rows in the HTML and the
`SCHEDULE` map in `site/assets/js/app.js` (and, for Squarespace, in
`squarespace/_shared-code-injection.html`).
