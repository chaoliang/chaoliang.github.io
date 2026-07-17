import {
  addBusinessDays, diffDays, isoWeek,
  formatISO, formatLong, formatMedium, weekdayName, describeWeeks,
} from '../lib/dates.js';
import { page, answerHero, factsList, faqBlock, linksGrid, prose, adSlot } from '../lib/html.js';
import { relatedDays } from './days-from-today.js';

export const MAX_BUSINESS_N = 90;
const POPULAR_BIZ = [1, 2, 3, 5, 7, 10, 15, 20, 30, 45, 60, 90];

export function businessDayPage(config, today, buildDate, n) {
  const target = addBusinessDays(today, n);
  const calendarSpan = diffDays(today, target);
  const week = isoWeek(target);

  const faq = [
    [`How is ${n} business day${n === 1 ? '' : 's'} from today calculated?`,
     `Starting from today (${formatMedium(today)}), count forward skipping every Saturday and Sunday. The ${n}${ordinal(n)} business day is ${formatLong(target)} — a span of ${calendarSpan} calendar days.`],
    ['Do business days include public holidays?',
     `This count excludes weekends only. Public holidays differ by country, state, and even industry, so subtract any holidays observed where you are. In the US, most years have 10–11 federal holidays; see our <a href="/guides/how-to-count-business-days/">guide to counting business days</a>.`],
    [`How many calendar days is ${n} business days?`,
     `From today, ${n} business day${n === 1 ? '' : 's'} spans <span data-fact-inline="calspan">${calendarSpan}</span> calendar days, because weekends are skipped but still pass on the calendar.`],
    ['Why do banks and couriers quote business days?',
     'Banks, courts, and shipping carriers only process work Monday through Friday, so quoting business days makes their promise independent of when in the week you start.'],
  ];

  const content = [
    `<h1>What date is ${n} business day${n === 1 ? '' : 's'} from today?</h1>`,
    answerHero({
      eyebrow: `${n} business day${n === 1 ? '' : 's'} from today is`,
      big: `<span data-fact="long-date">${formatLong(target)}</span>`,
      sub: `Skipping weekends, starting from <span data-fact="today">${formatMedium(today)}</span>`,
      dataAttrs: `data-calc="offset" data-mode="business" data-days="${n}"`,
    }),
    adSlot(config),
    factsList([
      ['Date (ISO 8601)', `<span data-fact="iso">${formatISO(target)}</span>`],
      ['Day of the week', `<span data-fact="weekday">${weekdayName(target)}</span>`],
      ['Calendar days in this span', `<span data-fact="calspan">${calendarSpan}</span>`],
      ['Calendar span in weeks', `<span data-fact="calweeks">${describeWeeks(calendarSpan)}</span>`],
      ['ISO week', `<span data-fact="isoweek">Week ${week.week}, ${week.year}</span>`],
      ['Holidays excluded?', 'Weekends only — subtract local public holidays'],
    ]),
    prose(`<p><strong>${n} business day${n === 1 ? '' : 's'}</strong> means ${n} weekday${n === 1 ? '' : 's'} —
Monday through Friday — skipping every weekend in between. Counted from today
(${formatMedium(today)}), that lands on <strong>${formatLong(target)}</strong>.
Business-day deadlines are the standard for bank transfers, court filings, shipping estimates,
and HR processes precisely because they don't shrink when a weekend intervenes. Note that public
holidays are <em>not</em> subtracted here, since they vary by country: if a holiday falls inside
your span, push the date out by one weekday per holiday.</p>`),
    faqBlock(faq),
    linksGrid('Nearby and popular counts', [
      ...relatedDays(n, '/business-days-from-today/', MAX_BUSINESS_N).map((l) => ({
        ...l, label: l.label.replace('days', 'business days'),
      })),
      { href: `/days-from-today/${n}/`, label: `${n} calendar days` },
    ]),
  ].join('\n');

  return {
    path: `/business-days-from-today/${n}/`,
    html: page({
      config,
      path: `/business-days-from-today/${n}/`,
      title: `What Date Is ${n} Business Day${n === 1 ? '' : 's'} From Today? – ${config.brand}`,
      description: `${n} business days from today is ${formatLong(target)} (weekends skipped). See the calendar-day equivalent and how the count works.`,
      content,
      faq,
      buildDate,
    }),
  };
}

function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

export function businessDaysIndex(config, today, buildDate) {
  const quick = POPULAR_BIZ.map((n) => {
    const t = addBusinessDays(today, n);
    return `<a class="quick-card" href="/business-days-from-today/${n}/" data-calc="offset" data-mode="business" data-days="${n}">
      <span class="quick-n">+${n}</span>
      <span class="quick-label">business day${n === 1 ? '' : 's'}</span>
      <span class="quick-date" data-fact="medium-date">${formatMedium(t)}</span>
    </a>`;
  }).join('\n');

  const all = Array.from({ length: MAX_BUSINESS_N }, (_, i) => i + 1)
    .map((n) => `<a class="chip chip-sm" href="/business-days-from-today/${n}/">${n}</a>`).join('');

  const content = `
<h1>Business days from today</h1>
<p class="lede">Deadlines quoted in working days? Get the exact date, with every weekend skipped automatically.</p>
<section class="quick-grid" aria-label="Popular counts">${quick}</section>
${adSlot(config)}
${prose(`<p>“Within 5 business days” never means a calendar week — it means five weekdays, and where those
fall depends on the day you start. These pages count forward from today, Monday to Friday only, for any
span from 1 to ${MAX_BUSINESS_N} business days. Public holidays are not subtracted (they differ by country),
so shift the result by one weekday for each holiday inside your span. For plain calendar-day counting, use
<a href="/days-from-today/">days from today</a>.</p>`)}
<section class="all-days" aria-label="All business day counts"><h2>All counts, 1–${MAX_BUSINESS_N} business days</h2><div class="chip-grid chip-grid-dense">${all}</div></section>`;

  return {
    path: '/business-days-from-today/',
    html: page({
      config,
      path: '/business-days-from-today/',
      title: `Business Days From Today Calculator – Skip Weekends | ${config.brand}`,
      description: 'What date is 3, 5, 10, or 30 business days from today? Exact dates with weekends skipped, for any span from 1 to 90 working days.',
      content,
      buildDate,
    }),
  };
}
