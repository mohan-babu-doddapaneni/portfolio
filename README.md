# mohanbabudoddapaneni.com

The personal site of Mohan Babu Doddapaneni — a software engineer who builds software, explores ideas, and enjoys understanding how things work.

## Editing content

All visitor-facing text lives in `src/content/`, separate from layout code:

| File | What's in it |
| --- | --- |
| `src/content/site.js` | Hero, About, Things I've built, My journey, What I work with, Beyond the code, Connect |
| `src/content/notes.js` | Notes (Markdown) |

Search for `TODO(mohan)` to find details that still need your input. Nothing marked TODO is shown on the site.

### Publishing a note

Add an object to the **top** of the array in `src/content/notes.js`:

```js
{
  slug: "my-new-note",            // URL: /#/notes/my-new-note
  title: "My new note",
  date: "2026-12-01",             // optional
  context: "Where this came from",// optional
  summary: "One or two sentences for the list.",
  tags: ["Architecture"],
  body: `## A heading

Plain **Markdown**: paragraphs, - lists, 1. lists, > quotes, \`code\`, fenced code blocks and [links](https://example.com).`,
}
```

The renderer (`src/lib/markdown.js`) builds React elements directly — it never injects raw HTML, and only allows `http(s)`, `mailto`, `tel` and `#` links.

### Beyond the code

`BEYOND` in `src/content/site.js` is empty on purpose. While it's empty the section shows a clearly marked "under construction" state. Add `{ title, text }` items and they replace it automatically.

## Design

- **Motif — circuits to systems.** The hero is a PCB-style trace routed through the real journey (JNTU → Wipro → Capgemini → Clark → Adobe → Fenix), with a signal pulse; the same idea becomes the scroll-linked "My journey" timeline. Generated from `JOURNEY` data, so it updates itself.
- **Type:** Fraunces (display), Instrument Sans (body), JetBrains Mono (labels). Self-hosted.
- **Colour:** paper/ink with one vermilion signal colour; light and dark themes (follows the OS, remembered).
- **Motion:** masked line reveals, trace draw-on, scroll reveals, view-transition theme switch. All of it switches off under `prefers-reduced-motion`.
- **Easter egg:** type `blueprint` anywhere to see the 12-column grid (Esc to exit).

## Security

- Strict Content-Security-Policy in production: no inline scripts or styles (`style-src 'self'` via `.env.production`; `.env.development` relaxes it locally for the dev server).
- No third-party requests; fonts and images are self-hosted. No source maps published.
- Clickjacking protection via a same-origin frame-buster (GitHub Pages can't send `frame-ancestors`).

## Scripts

```bash
npm start        # dev server on :3000
npm test         # unit tests
npm run build    # production build in /build
npm run deploy   # build + publish to the gh-pages branch (GitHub Pages, custom domain via public/CNAME)
```
