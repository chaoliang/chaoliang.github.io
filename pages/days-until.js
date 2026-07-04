import {
  diffDays, businessDaysBetween, formatISO, formatLong, formatMedium,
  weekdayName, describeWeeks, describeMonths,
} from '../lib/dates.js';
import { EVENTS, nextOccurrence } from '../lib/holidays.js';
import { page, answerHero, factsList, faqBlock, linksGrid, prose, adSlot, esc } from '../lib/html.js';

export function eventPages(config, today, buildDate) {
  const resolved = EVENTS
    .map((event) => ({ event, next: nextOccurrence(event, today) }))
    .filter(({ next }) => next !== null);

  const pages = resolved.map(({ event, next }) => eventPage(config, today, buildDate, event, next, resolved));
  pages.push(eventsIndex(config, today, buildDate, resolved));
  return pages;
}

function eventPage(config, today, buildDate, event, next, resolved) {
  const { date: target, days } = next;
  const biz = businessDaysBetween(today, target);
  const months = describeMonths(days);

  const faq = [
    [`When is ${event.name}?`,
     `The next ${event.name} is on ${formatLong(target)} — ${days === 0 ? 'today' : `${days} day${days === 1 ? '' : 's'} from today`}.`],
    [`How many weeks until ${event.name}?`,
     `${describeWeeks(days)}${months ? ` (${months})` : ''} until ${event.name}.`],
    [`How many weekends until ${event.name}?`,
     `There are ${days - biz} weekend days and ${biz} business days between today and ${event.name}.`],
  ];

  const related = resolved
    .filter(({ event: e }) => e.slug !== event.slug)
    .sort((a, b) => a.next.days - b.next.days)
    .slice(0, 10)
    .map(({ event: e, next: n }) => ({ href: `/days-until/${e.slug}/`, label: `${e.name} (${n.days}d)` }));

  const content = [
    `<h1>How many days until ${esc(event.name)}?</h1>`,
    answerHero({
      eyebrow: `Days until ${esc(event.name)}`,
      big: `<span data-fact="count">${days}</span>`,
      sub: `${formatLong(target)} · counted from <span data-fact="today">${formatMedium(today)}</span>`,
      dataAttrs: `data-calc="until" data-target="${formatISO(target)}"`,
    }),
    adSlot(config),
    factsList([
      ['Date', formatLong(target)],
      ['Date (ISO 8601)', formatISO(target)],
      ['Day of the week', weekdayName(target)],
      ['Time remaining', `<span data-fact="weeks">${describeWeeks(days)}</span>`],
      ['In months', months],
      ['Business days remaining', `<span data-fact="bizcount">${biz}</span>`],
    ]),
    prose(`<p>${esc(event.blurb)} The countdown above is live: it counts the days from your local
today to ${formatLong(target)}, so the number you see is always current.</p>`),
    faqBlock(faq),
    linksGrid('Other countdowns', related),
  ].join('\n');

  return {
    path: `/days-until/${event.slug}/`,
    html: page({
      config,
      path: `/days-until/${event.slug}/`,
      title: `How Many Days Until ${event.name}? Live Countdown | ${config.brand}`,
      description: `${event.name} is on ${formatLong(target)} — ${days} days from today. Live countdown with weeks, months, and business days remaining.`,
      content,
      faq,
      buildDate,
    }),
  };
}

function eventsIndex(config, today, buildDate, resolved) {
  const sorted = [...resolved].sort((a, b) => a.next.days - b.next.days);
  const cards = sorted.map(({ event, next }) =>
    `<a class="quick-card" href="/days-until/${event.slug}/" data-calc="until" data-target="${formatISO(next.date)}">
      <span class="quick-n" data-fact="count">${next.days}</span>
      <span class="quick-label">days until</span>
      <span class="quick-date">${esc(event.name)}</span>
    </a>`).join('\n');

  const content = `
<h1>Days until…</h1>
<p class="lede">Live countdowns to the holidays and dates people actually search for — sorted by what's coming next.</p>
<section class="quick-grid" aria-label="Countdowns">${cards}</section>
${adSlot(config)}
${prose(`<p>Movable holidays are computed with the real rules — Easter from the ecclesiastical algorithm,
Thanksgiving as the fourth Thursday of November, Lunar New Year from the lunisolar calendar — so these
countdowns stay correct year after year. Each page shows the exact date, the day of the week, and the
remaining time in weeks, months, and business days.</p>`)}`;

  return {
    path: '/days-until/',
    html: page({
      config,
      path: '/days-until/',
      title: `Days Until Every Major Holiday – Live Countdowns | ${config.brand}`,
      description: 'How many days until Christmas, Thanksgiving, Easter, Halloween, and more? Live countdowns with exact dates and business days remaining.',
      content,
      buildDate,
    }),
  };
}
