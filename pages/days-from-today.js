import {
  addDays, diffDays, businessDaysBetween, isWeekend, isoWeek,
  formatISO, formatLong, formatMedium, weekdayName, describeWeeks, describeMonths,
} from '../lib/dates.js';
import { page, answerHero, factsList, faqBlock, linksGrid, prose, adSlot, esc } from '../lib/html.js';

export const POPULAR_N = [7, 10, 14, 21, 28, 30, 45, 60, 90, 100, 120, 180, 270, 365];

const USE_CASES = [
  'return windows and refund deadlines',
  'visa validity and travel planning',
  'medication courses and follow-up appointments',
  'contract notice periods',
  'project deadlines and sprint planning',
  'subscription trial end dates',
  'loan and invoice due dates',
  'fitness challenges and habit streaks',
];

function introFor(n, today, target) {
  const useCase = USE_CASES[n % USE_CASES.length];
  return `<p>Counting <strong>${n} calendar day${n === 1 ? '' : 's'}</strong> forward from today
(${formatMedium(today)}) lands on <strong>${formatLong(target)}</strong>. Every day is counted,
including Saturdays, Sundays, and holidays. This kind of count comes up constantly with ${useCase} —
and it is easy to get wrong by a day if you count today itself. The convention used here (and by
courts, banks, and airlines) is that <em>day one is tomorrow</em>: today is day zero.</p>`;
}

export function relatedDays(n, prefix, max) {
  const neighbors = [n - 1, n + 1].filter((x) => x >= 1 && x <= max);
  const links = [
    ...neighbors.map((x) => ({ href: `${prefix}${x}/`, label: `${x} days` })),
    ...POPULAR_N.filter((x) => x !== n && x <= max).slice(0, 8)
      .map((x) => ({ href: `${prefix}${x}/`, label: `${x} days` })),
  ];
  return links;
}

export function dayPage(config, today, buildDate, n) {
  const target = addDays(today, n);
  const week = isoWeek(target);
  const bizDays = businessDaysBetween(today, target);
  const weekend = isWeekend(target);
  const months = describeMonths(n);

  const faq = [
    [`How is ${n} days from today calculated?`,
     `Start from today (${formatMedium(today)}) as day zero, then count ${n} calendar day${n === 1 ? '' : 's'} forward, including weekends and holidays. That lands on ${formatLong(target)}.`],
    [`Does "${n} days from today" include weekends?`,
     `Yes. Calendar-day counts include Saturdays and Sundays. If you need working days only, see <a href="/business-days-from-today/${Math.min(n, 90)}/">${Math.min(n, 90)} business days from today</a>.`],
    [`How many weeks is ${n} days?`,
     `${n} days is ${describeWeeks(n)}${months ? ` (${months})` : ''}.`],
    [`What if the deadline says ${n} business days instead?`,
     `Business days skip weekends, so ${n} business days reaches further into the calendar than ${n} calendar days. ${n} calendar days from today contains ${bizDays} business day${bizDays === 1 ? '' : 's'}.`],
  ];

  const content = [
    `<h1>What date is ${n} day${n === 1 ? '' : 's'} from today?</h1>`,
    answerHero({
      eyebrow: `${n} day${n === 1 ? '' : 's'} from today is`,
      big: `<span data-fact="long-date">${formatLong(target)}</span>`,
      sub: `Counting ${n} calendar day${n === 1 ? '' : 's'} from <span data-fact="today">${formatMedium(today)}</span>`,
      dataAttrs: `data-calc="offset" data-mode="calendar" data-days="${n}"`,
    }),
    adSlot(config),
    factsList([
      ['Date (ISO 8601)', `<span data-fact="iso">${formatISO(target)}</span>`],
      ['Day of the week', `<span data-fact="weekday">${weekdayName(target)}</span>`],
      ['Falls on a weekend?', `<span data-fact="weekend">${weekend ? 'Yes' : 'No'}</span>`],
      ['In weeks', describeWeeks(n)],
      ['In months', months],
      ['Business days in this span', `<span data-fact="bizcount">${bizDays}</span>`],
      ['ISO week', `<span data-fact="isoweek">Week ${week.week}, ${week.year}</span>`],
    ]),
    prose(introFor(n, today, target)),
    faqBlock(faq),
    linksGrid('Nearby and popular counts', [
      ...relatedDays(n, '/days-from-today/', 365),
      { href: `/business-days-from-today/${Math.min(n, 90)}/`, label: `${Math.min(n, 90)} business days` },
    ]),
  ].join('\n');

  return {
    path: `/days-from-today/${n}/`,
    html: page({
      config,
      path: `/days-from-today/${n}/`,
      title: `What Date Is ${n} Day${n === 1 ? '' : 's'} From Today? – ${config.brand}`,
      description: `${n} days from today is ${formatLong(target)}. See the exact date, day of the week, weeks breakdown, and the business-day equivalent.`,
      content,
      faq,
      buildDate,
    }),
  };
}

export function daysFromTodayIndex(config, today, buildDate) {
  const quick = POPULAR_N.map((n) => {
    const t = addDays(today, n);
    return `<a class="quick-card" href="/days-from-today/${n}/" data-calc="offset" data-mode="calendar" data-days="${n}">
      <span class="quick-n">+${n}</span>
      <span class="quick-label">days</span>
      <span class="quick-date" data-fact="medium-date">${formatMedium(t)}</span>
    </a>`;
  }).join('\n');

  const all = Array.from({ length: 365 }, (_, i) => i + 1)
    .map((n) => `<a class="chip chip-sm" href="/days-from-today/${n}/">${n}</a>`).join('');

  const content = `
<h1>Days from today</h1>
<p class="lede">Pick a number of calendar days and get the exact future date — weekends and holidays included, no off-by-one mistakes.</p>
<section class="quick-grid" aria-label="Popular counts">${quick}</section>
${adSlot(config)}
${prose(`<p>These pages answer questions like “what date is 30 days from now?” for any span from 1 to 365 days.
Day counting sounds trivial, but deadlines get missed over the details: whether today counts as day one,
whether the count includes weekends, and what happens when the result lands on a Saturday. Our convention
matches the one used by courts, banks, and airlines: today is day zero, every calendar day counts, and the
date shown is exact. If your deadline is written in <em>working</em> days, use the
<a href="/business-days-from-today/">business days calculator</a> instead.</p>`)}
<section class="all-days" aria-label="All day counts"><h2>All counts, 1–365 days</h2><div class="chip-grid chip-grid-dense">${all}</div></section>`;

  return {
    path: '/days-from-today/',
    html: page({
      config,
      path: '/days-from-today/',
      title: `Days From Today Calculator – Exact Future Dates | ${config.brand}`,
      description: 'What date is 7, 30, 60, 90, or 180 days from today? Exact future dates for any count from 1 to 365 days, with weekday and business-day breakdowns.',
      content,
      buildDate,
    }),
  };
}
