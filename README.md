# portfolio — utsav gupta

Personal portfolio site: a "decrypted terminal" — dark code-navy + run-green,
JetBrains Mono, boot-sequence loader, text descramble effects, Codeforces
rating graph, GitHub stats, project bento grid, and a certificate library.

## structure

```
index.html          — the whole site (single page)
css/style.css       — design system
js/data.js          — baked-in data (projects, CF history, certs)
js/main.js          — loader, scramble, chart, cursor, tilt, easter eggs
assets/certs/       — certificate documents
assets/resume/      — résumé PDF
```

## local dev

```bash
python3 -m http.server 8123
# open http://localhost:8123
```

## deploy

Push to `main` — GitHub Pages serves the site from the repo root.
No build step. No trackers. No frameworks.

## easter egg

Type `hack` anywhere on the page. You didn't hear it from me.
