import {
  addDays, addMonths, diffDays, businessDaysBetween, isWeekend, isoWeek,
  formatISO, formatLong, formatMedium, weekdayName, describeWeeks, describeMonths,
} from '../lib/dates.js';
import { page, answerHero, factsList, faqBlock, linksGrid, prose, adSlot } from '../lib/html.js';

export const MAX_WEEKS = 52;
export const MAX_MONTHS = 36;
const POPULAR_WEEKS = [1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 26, 52];
const POPULAR_MONTHS = [1, 2, 3, 6, 9, 12, 18, 24, 36];

function related(n, max, popular, prefix, unit) {
  return [
    ...[n - 1, n + 1].filter((x) => x >= 1 && x <= max)
      .map((x) => ({ href: `${prefix}${x}/`, label: `${x} ${unit}${x === 1 ? '' : 's'}` })),
    ...popular.filter((x) => x !== n).slice(0, 8)
      .map((x) => ({ href: `${prefix}${x}/`, label: `${x} ${unit}${x === 1 ? '' : 's'}` })),
  ];
}

export function weekPage(config, today, buildDate, n) {
  const days = n * 7;
  const target = addDays(today, days);
  const week = isoWeek(target);
  const biz = businessDaysBetween(today, target);
  const months = describeMonths(days);
  const plural = n === 1 ? '' : 's';

  const faq = [
    [`How is ${n} week${plural} from today calculated?`,
     `One week is exactly 7 calendar days, so ${n} week${plural} is ${days} days. Counting from today (${formatMedium(today)}), that lands on ${formatLong(target)}.`],
    [`How many days is ${n} week${plural}?`,
     `${n} week${plural} equals exactly ${days} calendar days, which contains ${biz} business days when counted from today.`],
    [`Does ${n} weeks from today fall on the same weekday?`,
     `Yes — adding whole weeks never changes the day of the week. Today is a ${weekdayName(today)}, so ${n} week${plural} from today is also a ${weekdayName(target)}.`],
  ];

  const content = [
    `<h1>What date is ${n} week${plural} from today?</h1>`,
    answerHero({
      eyebrow: `${n} week${plural} from today is`,
      big: `<span data-fact="long-date">${formatLong(target)}</span>`,
      sub: `Exactly ${days} days from <span data-fact="today">${formatMedium(today)}</span>`,
      dataAttrs: `data-calc="offset" data-mode="calendar" data-days="${days}"`,
    }),
    adSlot(config),
    factsList([
      ['Date (ISO 8601)', `<span data-fact="iso">${formatISO(target)}</span>`],
      ['Day of the week', `<span data-fact="weekday">${weekdayName(target)}</span>`],
      ['In calendar days', String(days)],
      ['In months', months],
      ['Business days in this span', `<span data-fact="bizcount">${biz}</span>`],
      ['ISO week', `<span data-fact="isoweek">Week ${week.week}, ${week.year}</span>`],
    ]),
    prose(`<p>Adding <strong>${n} week${plural}</strong> to today means adding exactly ${days} calendar
days — weekends included — which lands on <strong>${formatLong(target)}</strong>. Because a week is a
fixed 7-day block, the result always falls on the same weekday as today. Week-based counting is the
norm for pregnancy milestones, school terms, training plans, and rental periods precisely because of
that stability; if your deadline is written in days or months instead, see
<a href="/days-from-today/${Math.min(days, 365)}/">${Math.min(days, 365)} days from today</a> or the
<a href="/months-from-today/">months calculator</a>.</p>`),
    faqBlock(faq),
    linksGrid('Nearby and popular counts', [
      ...related(n, MAX_WEEKS, POPULAR_WEEKS, '/weeks-from-today/', 'week'),
      { href: `/days-from-today/${Math.min(days, 365)}/`, label: `${Math.min(days, 365)} days` },
    ]),
  ].join('\n');

  return {
    path: `/weeks-from-today/${n}/`,
    html: page({
      config,
      path: `/weeks-from-today/${n}/`,
      title: `What Date Is ${n} Week${plural} From Today? – ${config.brand}`,
      description: `${n} weeks from today is ${formatLong(target)} — exactly ${days} days. See the weekday, business-day count, and month equivalent.`,
      content,
      faq,
      buildDate,
    }),
  };
}

export function monthPage(config, today, buildDate, n) {
  const target = addMonths(today, n);
  const span = diffDays(today, target);
  const week = isoWeek(target);
  const biz = businessDaysBetween(today, target);
  const clamped = target.getUTCDate() !== today.getUTCDate();
  const plural = n === 1 ? '' : 's';

  const faq = [
    [`How is ${n} month${plural} from today calculated?`,
     `Move the calendar forward ${n} month${plural} keeping the same day of the month${clamped ? ' — and when the target month is shorter, the date clamps to its last day' : ''}. From today (${formatMedium(today)}) that is ${formatLong(target)}, a span of ${span} calendar days.`],
    [`How many days is ${n} month${plural} from today?`,
     `${span} calendar days. Months vary between 28 and 31 days, so a month-based deadline is not a fixed number of days — this span works out to ${describeWeeks(span)}.`],
    [`Is ${n} month${plural} the same as ${n * 30} days?`,
     `No. "${n} month${plural}" from today spans ${span} days, while ${n * 30} days is a fixed count. Contracts that say "months" follow the calendar; contracts that say "days" count every day. The two can differ by ${Math.abs(span - n * 30)} day${Math.abs(span - n * 30) === 1 ? '' : 's'} right now.`],
  ];

  const content = [
    `<h1>What date is ${n} month${plural} from today?</h1>`,
    answerHero({
      eyebrow: `${n} month${plural} from today is`,
      big: `<span data-fact="long-date">${formatLong(target)}</span>`,
      sub: `Counting calendar months from <span data-fact="today">${formatMedium(today)}</span>`,
      dataAttrs: `data-calc="offset" data-mode="months" data-days="${n}"`,
    }),
    adSlot(config),
    factsList([
      ['Date (ISO 8601)', `<span data-fact="iso">${formatISO(target)}</span>`],
      ['Day of the week', `<span data-fact="weekday">${weekdayName(target)}</span>`],
      ['Calendar days in this span', `<span data-fact="calspan">${span}</span>`],
      ['In weeks', `<span data-fact="calweeks">${describeWeeks(span)}</span>`],
      ['Business days in this span', `<span data-fact="bizcount">${biz}</span>`],
      ['ISO week', `<span data-fact="isoweek">Week ${week.week}, ${week.year}</span>`],
    ]),
    prose(`<p><strong>${n} month${plural} from today</strong> follows the calendar convention used by
banks, leases, and subscriptions: keep the same day of the month and move forward ${n} month${plural},
landing on <strong>${formatLong(target)}</strong>. When the starting day doesn't exist in the target
month (the 31st of a 30-day month, or February), the date clamps to the month's last day. That makes
month arithmetic different from day counting — this particular span covers ${span} days, not ${n * 30}.
For exact day counts, use <a href="/days-from-today/">days from today</a>.</p>`),
    faqBlock(faq),
    linksGrid('Nearby and popular counts', [
      ...related(n, MAX_MONTHS, POPULAR_MONTHS, '/months-from-today/', 'month'),
      { href: `/weeks-from-today/${Math.min(n * 4, MAX_WEEKS)}/`, label: `${Math.min(n * 4, MAX_WEEKS)} weeks` },
    ]),
  ].join('\n');

  return {
    path: `/months-from-today/${n}/`,
    html: page({
      config,
      path: `/months-from-today/${n}/`,
      title: `What Date Is ${n} Month${plural} From Today? – ${config.brand}`,
      description: `${n} months from today is ${formatLong(target)} (${span} days). See the exact date, weekday, and how calendar-month counting works.`,
      content,
      faq,
      buildDate,
    }),
  };
}

function familyIndex(config, today, buildDate, opts) {
  const { unit, max, popular, prefix, compute, title, description, lede, proseHtml } = opts;
  const quick = popular.map((n) => {
    const t = compute(n);
    return `<a class="quick-card" href="${prefix}${n}/">
      <span class="quick-n">+${n}</span>
      <span class="quick-label">${unit}${n === 1 ? '' : 's'}</span>
      <span class="quick-date">${formatMedium(t)}</span>
    </a>`;
  }).join('\n');
  const all = Array.from({ length: max }, (_, i) => i + 1)
    .map((n) => `<a class="chip chip-sm" href="${prefix}${n}/">${n}</a>`).join('');

  const content = `
<h1>${unit.charAt(0).toUpperCase() + unit.slice(1)}s from today</h1>
<p class="lede">${lede}</p>
<section class="quick-grid" aria-label="Popular counts">${quick}</section>
${adSlot(config)}
${prose(proseHtml)}
<section class="all-days" aria-label="All counts"><h2>All counts, 1–${max} ${unit}s</h2><div class="chip-grid chip-grid-dense">${all}</div></section>`;

  return {
    path: prefix,
    html: page({ config, path: prefix, title, description, content, buildDate }),
  };
}

export function weeksIndex(config, today, buildDate) {
  return familyIndex(config, today, buildDate, {
    unit: 'week', max: MAX_WEEKS, popular: POPULAR_WEEKS, prefix: '/weeks-from-today/',
    compute: (n) => addDays(today, n * 7),
    title: `Weeks From Today Calculator – Exact Future Dates | ${config.brand}`,
    description: 'What date is 2, 6, 12, or 26 weeks from today? Exact future dates for any span from 1 to 52 weeks, always on the same weekday as today.',
    lede: 'Whole weeks always land on the same weekday — get the exact date for any count up to a year.',
    proseHtml: `<p>Week counting is the most predictable kind of date arithmetic: every week is exactly
7 days, so the target date always shares today's weekday. These pages cover 1 to ${MAX_WEEKS} weeks —
the spans used for pregnancy tracking, school terms, notice periods, and training plans. For day-level
precision use <a href="/days-from-today/">days from today</a>; for calendar-month deadlines see
<a href="/months-from-today/">months from today</a>.</p>`,
  });
}

export function monthsIndex(config, today, buildDate) {
  return familyIndex(config, today, buildDate, {
    unit: 'month', max: MAX_MONTHS, popular: POPULAR_MONTHS, prefix: '/months-from-today/',
    compute: (n) => addMonths(today, n),
    title: `Months From Today Calculator – Calendar Month Dates | ${config.brand}`,
    description: 'What date is 3, 6, 12, or 18 months from today? Exact dates using real calendar-month arithmetic, for any span from 1 to 36 months.',
    lede: 'Real calendar-month arithmetic — same day of the month, clamped when the target month is shorter.',
    proseHtml: `<p>"In three months" follows the calendar, not a day count: leases, loan terms, and
subscriptions move the same day-of-month forward and clamp at short months (January 31 + 1 month =
February 28). These pages compute that convention exactly for 1 to ${MAX_MONTHS} months, and show the
true day span of each — which is never a neat multiple of 30. Need fixed day counts instead? Use
<a href="/days-from-today/">days from today</a>.</p>`,
  });
}
