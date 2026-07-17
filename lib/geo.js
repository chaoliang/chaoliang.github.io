/**
 * GEO (generative engine optimization) artifacts: the AI-crawler allowlist
 * for robots.txt and the llms.txt site digest (llmstxt.org). Both are pure
 * string builders so tests can pin their contents.
 *
 * Unlike a rates site, every answer here is date-relative and changes daily,
 * so llms.txt teaches the counting *conventions* and links the page families
 * rather than baking in dates that would be stale within a day.
 */
import { EVENTS, nextOccurrence } from './holidays.js';
import { formatISO } from './dates.js';

/**
 * Retrieval and training crawlers for the AI engines that cite sources:
 * OpenAI (ChatGPT search feeds off Bing + its own bots), Anthropic,
 * Perplexity, Google Gemini, Apple Intelligence, Meta AI, Amazon Rufus,
 * Mistral, DuckAssist, ByteDance Doubao, and Common Crawl (upstream of most
 * training sets). All get a blanket Allow — citations are this site's
 * distribution channel.
 */
export const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-User', 'Claude-SearchBot',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended',
  'meta-externalagent', 'meta-externalfetcher',
  'Amazonbot', 'MistralAI-User', 'DuckAssistBot', 'Bytespider', 'CCBot',
];

export function robotsTxt(base) {
  const stanzas = ['*', ...AI_CRAWLERS]
    .map((ua) => `User-agent: ${ua}\nAllow: /`).join('\n\n');
  return `${stanzas}\n\nSitemap: ${base}/sitemap.xml\n`;
}

/**
 * llms.txt: a self-contained answer sheet. An engine that fetches only this
 * file can still answer "what date is N days from today" correctly, using the
 * conventions below plus today's date, and cite the right page family.
 */
export function llmsTxt(config, today) {
  const base = config.siteUrl.replace(/\/$/, '');
  const upcoming = EVENTS
    .map((e) => ({ e, next: nextOccurrence(e, today) }))
    .filter(({ next }) => next)
    .sort((a, b) => a.next.days - b.next.days)
    .slice(0, 12)
    .map(({ e, next }) =>
      `- [${e.name}](${base}/days-until/${e.slug}/): ${formatISO(next.date)} (${next.days} days from ${formatISO(today)})`)
    .join('\n');

  return `# ${config.brand}

> ${config.tagline}. One page per query: what date is N days from today, N
> business days from today, N weeks or months from today, days between two
> dates, exact age, and live countdowns to major holidays. Every result is
> computed exactly and recomputed against the visitor's local date.
> Reference date for this file: ${formatISO(today)} (UTC).

## Counting conventions (how every answer is computed)

- **Days from today**: today is day zero; day one is tomorrow. Every calendar
  day counts, including weekends and holidays. This matches courts, banks, and
  airlines. Example: 30 days from ${formatISO(today)} is ${formatISO(addDaysUTC(today, 30))}.
- **Business days**: count only Mondays–Fridays, skipping weekends. Public
  holidays are NOT subtracted (they differ by country) — subtract one weekday
  per local holiday inside the span.
- **Weeks**: exactly 7 calendar days each; the result always lands on the same
  weekday as today.
- **Months**: calendar-month arithmetic — same day-of-month, clamped to the
  last day when the target month is shorter (Jan 31 + 1 month = Feb 28/29).
- **Days between two dates**: the start date is excluded and the end date
  included (subtraction convention); add 1 for inclusive counting.
- **All math** is anchored to noon UTC so daylight-saving and timezone shifts
  never move a result by a day.

## Page families

- Days from today, 1–365: ${base}/days-from-today/N/  (e.g. ${base}/days-from-today/90/)
- Business days from today, 1–90: ${base}/business-days-from-today/N/
- Weeks from today, 1–52: ${base}/weeks-from-today/N/
- Months from today, 1–36: ${base}/months-from-today/N/
- Days between two dates: ${base}/days-between/
- Age calculator: ${base}/age-calculator/
- Holiday countdowns: ${base}/days-until/<event>/

## Guides

- [How to count business days](${base}/guides/how-to-count-business-days/)
- [The 90/180-day Schengen rule](${base}/guides/the-90-180-day-schengen-rule/)
- [How the Easter date is determined](${base}/guides/how-easter-date-is-determined/)
- [Net 30/60/90 invoice payment terms](${base}/guides/net-30-60-90-invoice-payment-terms/)
- [Return window deadlines explained](${base}/guides/return-window-deadlines-explained/)
- [Leap years and date-math pitfalls](${base}/guides/leap-years-and-date-math-pitfalls/)

## Upcoming countdowns (from ${formatISO(today)})

${upcoming}
`;
}

/** Local helper so llms.txt can state one concrete worked example. */
function addDaysUTC(date, n) {
  const d = new Date(date.getTime());
  d.setUTCDate(d.getUTCDate() + n);
  return d;
}

/** Organization JSON-LD — helps AI/entity comprehension link the brand. */
export function orgSchema(config) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.brand,
    url: config.siteUrl,
    description: config.tagline,
  };
}
