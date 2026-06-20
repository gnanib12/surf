# Putting Surf & Turf Lodge on Squarespace

This folder contains the site split into **per-page code snippets** so each one
goes into its own native Squarespace page. You keep Squarespace's own header,
navigation, and footer — these snippets supply the page *content* only.

> **Plan requirement:** Custom Code Blocks / Code Injection with JavaScript
> require a **Squarespace Business plan or higher**. On Personal plans the live
> "Open now / Closed" badge and today's-hours highlight won't run (the rest
> still displays fine).

## Files

| File | Where it goes |
|------|---------------|
| `_shared-code-injection.html` | Paste **once** into Settings → Advanced → Code Injection → **Header** |
| `home.html`  | Code Block on your **Home** page |
| `menu.html`  | Code Block on your **Menu** page |
| `about.html` | Code Block on your **About** page |
| `hours.html` | Code Block on your **Hours & Location** page |

## Step by step

1. **Shared setup (once).**
   Open `_shared-code-injection.html`, copy everything, and paste it into
   **Settings → Advanced → Code Injection → Header**. Save. This loads the
   fonts, the scoped styling, and the script behind the live status badge.

2. **Create four pages** in Squarespace: Home, Menu, About, Hours & Location.
   Give them URL slugs `/` (or `/home`), `/menu`, `/about`, `/hours`.
   (If you use different slugs, update the links inside the snippets — see
   "Adjusting links" below.)

3. **Add the content.** On each page add a blank section, drop in a **Code
   Block**, and paste the matching file (`home.html`, `menu.html`, etc.).
   Set the Code Block to full width and remove its padding for an edge-to-edge
   look.

4. **Wire up the navigation** using Squarespace's own header menu. Point the
   nav items at the four pages, and — to mirror the design — add a **"Specials"**
   link that goes to `/menu#sec-thursday`, plus an **"Order Online"** button
   linking to `https://orders.cake.net/11140793`.

5. **Footer.** Use Squarespace's footer for the address, phone, hours and the
   Facebook link, matching the dark walnut look if you like.

## Adjusting links

The snippets link between pages with `/`, `/menu`, `/about`, and
`/hours` (and the specials anchors `/menu#sec-thursday`, `#sec-sunday`,
`#sec-kids`). If your Squarespace page slugs differ, find-and-replace those
`href` values in each snippet before pasting.

External links (already set, no change needed):

- **Order Online:** `https://orders.cake.net/11140793` (CAKE)
- **Call:** `tel:+17046290561`
- **Facebook:** `https://www.facebook.com/thesurfandturflodge/`

## Menu section chips

The Menu page has a sticky row of jump-to-section chips. If your Squarespace
header overlaps them when scrolling, raise the offset in the shared injection:

```css
.stl-embed .stl-chips { top: 70px; }   /* set to your header height */
```

You may also want to bump `scroll-margin-top` on the menu `<section>`s (it's
`140px` in the snippet) so anchored sections land just below your header.

## Notes baked into the design

- **Hours:** Thu 4:00–8:30pm · Fri/Sat 3:00–9:00pm · Sun 11:00am–3:00pm ·
  Mon–Wed closed. These live in two places: the visible hours rows and the
  `SCHEDULE` object in `_shared-code-injection.html`. **Update both** if hours
  change.
- **DoorDash and Instagram** were removed per the latest design direction —
  Order Online (CAKE) + Facebook are the only off-site links.
- All food photography points at the existing Squarespace image CDN URLs from
  your current site, so nothing new needs uploading.
