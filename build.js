/**
 * Static site builder. Generates every page into dist/ plus sitemap.xml,
 * robots.txt, 404.html, and ads.txt. Any generation error fails the build
 * so CI never deploys a broken site.
 */
import { mkdir, writeFile, readFile, copyFile, rm } from 'node:fs/promises';
import path from 'node:path';

import { todayUTC, formatISO } from './lib/dates.js';
import { robotsTxt, llmsTxt } from './lib/geo.js';
import { dayPage, daysFromTodayIndex } from './pages/days-from-today.js';
import { businessDayPage, businessDaysIndex, MAX_BUSINESS_N } from './pages/business-days.js';
import { eventPages } from './pages/days-until.js';
import { weekPage, monthPage, weeksIndex, monthsIndex, MAX_WEEKS, MAX_MONTHS } from './pages/weeks-months.js';
import { homePage, daysBetweenPage, agePage } from './pages/home-tools.js';
import { guidePages } from './pages/guides.js';
import { legalPages } from './pages/legal.js';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const DIST = path.join(ROOT, 'dist');

const config = JSON.parse(await readFile(path.join(ROOT, 'site.config.json'), 'utf8'));
const today = todayUTC();
const buildDate = formatISO(today);

const pages = [
  homePage(config, today, buildDate),
  daysFromTodayIndex(config, today, buildDate),
  businessDaysIndex(config, today, buildDate),
  daysBetweenPage(config, today, buildDate),
  agePage(config, today, buildDate),
  ...Array.from({ length: 365 }, (_, i) => dayPage(config, today, buildDate, i + 1)),
  ...Array.from({ length: MAX_BUSINESS_N }, (_, i) => businessDayPage(config, today, buildDate, i + 1)),
  weeksIndex(config, today, buildDate),
  monthsIndex(config, today, buildDate),
  ...Array.from({ length: MAX_WEEKS }, (_, i) => weekPage(config, today, buildDate, i + 1)),
  ...Array.from({ length: MAX_MONTHS }, (_, i) => monthPage(config, today, buildDate, i + 1)),
  ...eventPages(config, today, buildDate),
  ...guidePages(config, today, buildDate),
  ...legalPages(config, buildDate),
];

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

for (const { path: pagePath, html } of pages) {
  const dir = path.join(DIST, pagePath);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
}

for (const asset of ['styles.css', 'app.js', 'google388ec71c2649c875.html', 'aa3f81c62e074d5f9b27c40d1e85f6a9.txt']) {
  await copyFile(path.join(ROOT, 'public', asset), path.join(DIST, asset));
}

const base = config.siteUrl.replace(/\/$/, '');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(({ path: p }) => `<url><loc>${base}${p}</loc><lastmod>${buildDate}</lastmod><changefreq>daily</changefreq></url>`).join('\n')}
</urlset>`;
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap);

// GEO plumbing: 17 AI crawlers explicitly welcome (ChatGPT/Copilot retrieval
// feeds off Bing; AI referrals convert ~9x organic per the July 2026 research),
// plus an llms.txt digest that answers the core questions standalone.
await writeFile(path.join(DIST, 'robots.txt'), robotsTxt(base));
await writeFile(path.join(DIST, 'llms.txt'), llmsTxt(config, today));

if (config.adsensePublisherId) {
  const pub = config.adsensePublisherId.replace(/^ca-/, '');
  await writeFile(path.join(DIST, 'ads.txt'),
    `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`);
}

const notFound = pages[0].html
  .replace(/<main id="main">[\s\S]*<\/main>/,
    `<main id="main"><section class="hero"><h1>Page not found</h1>
<p class="lede">That page doesn't exist. Try <a href="/days-from-today/">days from today</a>,
<a href="/business-days-from-today/">business days</a>, or <a href="/days-until/">countdowns</a>.</p>
</section></main>`)
  .replace(/<title>[^<]*<\/title>/, `<title>Page Not Found | ${config.brand}</title>`);
await writeFile(path.join(DIST, '404.html'), notFound);

console.log(`Built ${pages.length} pages + sitemap for ${base} (build date ${buildDate})`);
