import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AI_CRAWLERS, robotsTxt, llmsTxt, orgSchema } from '../lib/geo.js';
import { dayAnchor } from '../lib/dates.js';

const config = {
  brand: 'DateSum',
  tagline: 'Fast, accurate date calculators',
  siteUrl: 'https://datesum.com',
};
const today = dayAnchor(2026, 7, 17);

test('robots.txt allows the wildcard plus every AI crawler', () => {
  const txt = robotsTxt('https://datesum.com');
  assert.ok(txt.startsWith('User-agent: *\nAllow: /'));
  for (const ua of AI_CRAWLERS) {
    assert.ok(txt.includes(`User-agent: ${ua}\nAllow: /`), `missing ${ua}`);
  }
  assert.ok(txt.includes('Sitemap: https://datesum.com/sitemap.xml'));
  assert.ok(AI_CRAWLERS.includes('GPTBot') && AI_CRAWLERS.includes('ClaudeBot'));
});

test('llms.txt is self-contained: conventions, families, worked example', () => {
  const txt = llmsTxt(config, today);
  assert.ok(txt.startsWith('# DateSum'));
  assert.ok(txt.includes('today is day zero'));
  assert.ok(txt.includes('/days-from-today/N/'));
  assert.ok(txt.includes('/business-days-from-today/N/'));
  assert.ok(txt.includes('/weeks-from-today/N/'));
  assert.ok(txt.includes('/months-from-today/N/'));
  // Worked example must be arithmetically correct: 30 days after 2026-07-17.
  assert.ok(txt.includes('30 days from 2026-07-17 is 2026-08-16'));
  assert.ok(txt.includes('2026-07-17'));
});

test('llms.txt lists upcoming countdowns sorted nearest-first', () => {
  const txt = llmsTxt(config, today);
  const section = txt.slice(txt.indexOf('## Upcoming countdowns'));
  const dayCounts = [...section.matchAll(/\((\d+) days from/g)].map((m) => Number(m[1]));
  assert.ok(dayCounts.length >= 5);
  const sorted = [...dayCounts].sort((a, b) => a - b);
  assert.deepEqual(dayCounts, sorted, 'countdowns not sorted nearest-first');
});

test('orgSchema is valid JSON-LD', () => {
  const s = orgSchema(config);
  assert.equal(s['@type'], 'Organization');
  assert.equal(s.name, 'DateSum');
  assert.equal(s.url, 'https://datesum.com');
});
