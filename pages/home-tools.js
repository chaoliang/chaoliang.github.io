import { addDays, formatMedium, formatISO } from '../lib/dates.js';
import { page, faqBlock, linksGrid, prose, adSlot, esc, webAppSchema } from '../lib/html.js';
import { orgSchema } from '../lib/geo.js';
import { POPULAR_N } from './days-from-today.js';
import { GUIDE_INDEX } from './guides.js';
import { EVENTS, nextOccurrence } from '../lib/holidays.js';

export function homePage(config, today, buildDate) {
  const quick = POPULAR_N.slice(0, 8).map((n) => {
    const t = addDays(today, n);
    return `<a class="quick-card" href="/days-from-today/${n}/" data-calc="offset" data-mode="calendar" data-days="${n}">
      <span class="quick-n">+${n}</span><span class="quick-label">days</span>
      <span class="quick-date" data-fact="medium-date">${formatMedium(t)}</span>
    </a>`;
  }).join('\n');

  const countdowns = EVENTS
    .map((e) => ({ e, next: nextOccurrence(e, today) }))
    .filter(({ next }) => next)
    .sort((a, b) => a.next.days - b.next.days)
    .slice(0, 6)
    .map(({ e, next }) =>
      `<a class="chip" href="/days-until/${e.slug}/" data-calc="until" data-target="${formatISO(next.date)}"><span data-fact="count">${next.days}</span>d · ${esc(e.name)}</a>`)
    .join('\n');

  const guides = GUIDE_INDEX().slice(0, 8).map((g) =>
    `<a class="guide-card" href="/guides/${g.slug}/">
      <h3>${esc(g.title)}</h3>
      <p>${esc(g.description)}</p>
    </a>`).join('\n');

  const content = `
<section class="hero">
  <h1>The rules behind<br>the dates.</h1>
  <p class="lede">How courts, banks, carriers, and contracts actually count days — explained properly,
  with calculators that follow the same conventions.</p>
</section>
${prose(`<p>Deadlines are missed on conventions, not arithmetic. Does the clock start today or tomorrow?
Do weekends count? What happens when the last day is a Saturday, or when a month is short? Different
institutions answer differently, and the difference is often the whole dispute. ${esc(config.brand)}
documents those conventions and computes them exactly.</p>`)}
<h2 class="section-title">Guides</h2>
<section class="guide-list guide-list-grid">${guides}</section>
<p class="see-all"><a href="/guides/">All guides →</a></p>
${adSlot(config)}
<h2 class="section-title">Calculators</h2>
<section class="calc-panel" aria-labelledby="calc-heading" data-widget="between">
  <h3 id="calc-heading">Days between two dates</h3>
  <form class="calc-form" data-role="form">
    <label>Start date <input type="date" lang="en" name="start" required value="${formatISO(today)}"></label>
    <label>End date <input type="date" lang="en" name="end" required value="${formatISO(addDays(today, 30))}"></label>
    <button type="submit">Calculate</button>
  </form>
  <output class="calc-output" data-role="output" aria-live="polite"></output>
</section>
<section class="quick-grid" aria-label="Popular counts">${quick}</section>
<p class="see-all"><a href="/days-from-today/">Days from today →</a> · <a href="/business-days-from-today/">Business days →</a> · <a href="/weeks-from-today/">Weeks →</a> · <a href="/months-from-today/">Months →</a> · <a href="/days-between/">Days between →</a> · <a href="/age-calculator/">Age →</a></p>
<h2 class="section-title">Coming up</h2>
<div class="chip-grid">${countdowns}</div>
<p class="see-all"><a href="/days-until/">All countdowns →</a></p>`;

  return {
    path: '/',
    html: page({
      config,
      path: '/',
      title: `${config.brand} – How Deadlines Are Counted, Explained & Calculated`,
      description: 'Guides to how courts, banks, carriers, and contracts count days — plus calculators that follow the same conventions. Business days, notice periods, deadlines.',
      content,
      buildDate,
      schema: [orgSchema(config), webAppSchema(config, '/', 'Date calculator suite',
        'Days between dates, days from today, business days, age, and live holiday countdowns — computed exactly in your browser.')],
    }),
  };
}

export function daysBetweenPage(config, today, buildDate) {
  const faq = [
    ['How are days between two dates counted?',
     'The count is the number of calendar days from the start date to the end date, end date included in the difference. From January 1 to January 31 is 30 days.'],
    ['Does the count include both the start and end date?',
     'The difference excludes the start date and includes the end date. To count both endpoints ("inclusive counting", common for hotel nights or rentals), add 1.'],
    ['Can I count business days between two dates?',
     'Yes — the result shows calendar days, full weeks, and the weekday-only (business day) count with weekends removed.'],
  ];

  const content = `
<h1>Days between two dates</h1>
<p class="lede">Pick any two dates and get calendar days, business days, and the weeks breakdown.</p>
<section class="calc-panel" data-widget="between">
  <form class="calc-form" data-role="form">
    <label>Start date <input type="date" lang="en" name="start" required value="${formatISO(today)}"></label>
    <label>End date <input type="date" lang="en" name="end" required value="${formatISO(addDays(today, 30))}"></label>
    <button type="submit">Calculate</button>
  </form>
  <output class="calc-output" data-role="output" aria-live="polite"></output>
</section>
${adSlot(config)}
${prose(`<p>This calculator handles leap years, month lengths, and daylight-saving transitions correctly —
all arithmetic is done on whole calendar days, not 24-hour blocks, so a difference is never off by one
because of a clock change. Dates can be in either order; the result is always the absolute difference.</p>`)}
${faqBlock(faq)}
${linksGrid('More tools', [
  { href: '/age-calculator/', label: 'Age calculator' },
  { href: '/days-from-today/', label: 'Days from today' },
  { href: '/business-days-from-today/', label: 'Business days from today' },
])}`;

  return {
    path: '/days-between/',
    html: page({
      config,
      path: '/days-between/',
      title: `Days Between Dates Calculator – Calendar & Business Days | ${config.brand}`,
      description: 'Calculate the exact number of days between two dates, including business days and full weeks. Handles leap years correctly.',
      content,
      faq,
      buildDate,
      schema: [webAppSchema(config, '/days-between/', 'Days between dates calculator',
        'Computes calendar days, business days, and full weeks between any two dates, leap-year exact.')],
    }),
  };
}

export function agePage(config, today, buildDate) {
  const faq = [
    ['How is my exact age calculated?',
     'Your age is the number of completed years since your birth date, plus the completed months and days since your last birthday. Someone born February 29 has their legal birthday on March 1 in non-leap years in most jurisdictions.'],
    ['How many days old am I?',
     'The calculator also shows your age as a total number of days — the count of calendar days from your birth date to today.'],
    ['When is my next birthday?',
     'The result includes a live countdown of days until your next birthday, computed from your local date.'],
  ];

  const content = `
<h1>Age calculator</h1>
<p class="lede">Exact age in years, months, and days — plus your age in total days and the countdown to your next birthday.</p>
<section class="calc-panel" data-widget="age">
  <form class="calc-form" data-role="form">
    <label>Date of birth <input type="date" lang="en" name="dob" required max="${formatISO(today)}"></label>
    <button type="submit">Calculate</button>
  </form>
  <output class="calc-output" data-role="output" aria-live="polite"></output>
</section>
${adSlot(config)}
${prose(`<p>Age calculation follows the everyday convention: you turn a year older on each birthday, and
months are counted against actual month lengths (born January 31 → one month old on the last day of
February, not March 2). Everything runs in your browser; no dates are sent anywhere.</p>`)}
${faqBlock(faq)}
${linksGrid('More tools', [
  { href: '/days-between/', label: 'Days between dates' },
  { href: '/days-from-today/', label: 'Days from today' },
  { href: '/days-until/', label: 'Holiday countdowns' },
])}`;

  return {
    path: '/age-calculator/',
    html: page({
      config,
      path: '/age-calculator/',
      title: `Age Calculator – Exact Age in Years, Months & Days | ${config.brand}`,
      description: 'Calculate your exact age in years, months, and days, your age in total days, and the days until your next birthday.',
      content,
      faq,
      buildDate,
      schema: [webAppSchema(config, '/age-calculator/', 'Age calculator',
        'Exact age in years, months, and days, total days lived, and a live countdown to the next birthday.')],
    }),
  };
}
