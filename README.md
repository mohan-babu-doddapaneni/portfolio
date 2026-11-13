# mohanbabudoddapaneni.com

Personal portfolio of Mohan Babu Doddapaneni — full-stack engineer (Java, Spring Boot, Angular, React).

## Design

An editorial, print-inspired system rather than a template look:

- **Type:** Fraunces (display serif, variable `SOFT`/`WONK` axes), Instrument Sans (body), JetBrains Mono (margin notes). All self-hosted.
- **Colour:** warm paper / ink with a single vermilion signal colour; a "darkroom" dark theme that follows the OS and is remembered.
- **Motion:** masked line reveals, hand-drawn underlines, scroll-linked hero fade (CSS scroll timelines, progressive), accordion via `grid-template-rows`, magnetic buttons on fine pointers, a circular "ink spill" theme switch using the View Transitions API. Everything is disabled under `prefers-reduced-motion`.

## Security

- Strict Content-Security-Policy in production: no inline scripts **or** styles (`style-src 'self'`, set via `.env.production`). The dev server needs inline styles, so `.env.development` relaxes only that directive locally.
- No third-party requests: fonts, icons and images are bundled or self-hosted.
- Clickjacking protection via a same-origin frame-buster (GitHub Pages cannot send `frame-ancestors` headers).
- No source maps published; external links use `rel="noopener noreferrer"`.

## Scripts

```bash
npm start        # dev server on :3000
npm test         # unit tests
npm run build    # production build in /build
npm run deploy   # build + publish to the gh-pages branch (GitHub Pages, custom domain via public/CNAME)
```
