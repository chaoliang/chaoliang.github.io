# DateTally

Fast, accurate date calculators — a zero-dependency static site designed for
programmatic SEO and AdSense monetization.

**503 pages** generated from ~1,500 lines of code:

- `/days-from-today/1..365/` — "what date is N days from today"
- `/business-days-from-today/1..90/` — weekday-only deadline counting
- `/days-until/<event>/` — 32 live holiday countdowns (movable feasts computed, not hardcoded)
- `/days-between/`, `/age-calculator/` — interactive tools
- `/guides/` — 5 original long-form articles (E-E-A-T + AdSense approval)
- Privacy / terms / about / contact (AdSense requirements)

## How it works

- `build.js` renders every page to `dist/` with the build day's numbers baked in
  (SEO-indexable), plus `sitemap.xml`, `robots.txt`, `404.html`, and `ads.txt`.
- `public/app.js` re-computes every number against the **visitor's local date** on
  page load, so results are always correct even between rebuilds.
- `.github/workflows/deploy.yml` rebuilds and redeploys daily at 00:10 UTC so the
  static HTML never goes stale.
- All date math is anchored to noon UTC (`lib/dates.js`) — immune to DST and
  timezone off-by-one errors. 16 unit tests cover leap years, ISO weeks, Easter,
  and weekend-skipping.

## Commands

```bash
npm test        # unit tests (node:test, no dependencies)
npm run build   # generate dist/ (503 pages, ~4 MB)
npm run serve   # preview at http://localhost:4173
```

## Configuration

Everything site-specific lives in `site.config.json`:

```json
{
  "brand": "DateTally",
  "siteUrl": "https://your-domain.com",
  "contactEmail": "you@example.com",
  "adsensePublisherId": ""
}
```

Set `adsensePublisherId` (e.g. `ca-pub-1234567890`) after AdSense approval —
this single value turns on the ad `<script>`, in-content ad slots, and `ads.txt`.

## Launch checklist

See [docs/运营手册.md](docs/运营手册.md) for the full Chinese-language launch and
monetization runbook (domain → GitHub Pages → Search Console → AdSense).
