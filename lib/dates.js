/**
 * Date math for DateSum. Every date is anchored to 12:00 UTC so that
 * day arithmetic can never be shifted by DST or timezone offsets.
 * All functions are pure and return new Date objects.
 */

export const DAY_MS = 86_400_000;

export const WEEKDAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** A Date pinned to 12:00 UTC on the given calendar day. Month is 1-based. */
export function dayAnchor(year, month, day) {
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0, 0));
}

/** Today's anchor, based on the current UTC calendar date. */
export function todayUTC(now = new Date()) {
  return dayAnchor(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate());
}

export function addDays(date, n) {
  return dayAnchor(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate() + n,
  );
}

/** Whole days from `a` to `b` (positive when b is after a). */
export function diffDays(a, b) {
  return Math.round((b.getTime() - a.getTime()) / DAY_MS);
}

export function isWeekend(date) {
  const dow = date.getUTCDay();
  return dow === 0 || dow === 6;
}

/**
 * The date `n` business days (Mon-Fri) after `date`. Weekend start days
 * count from the following Monday, matching how deadlines are usually read.
 */
export function addBusinessDays(date, n) {
  let current = date;
  let remaining = n;
  while (remaining > 0) {
    current = addDays(current, 1);
    if (!isWeekend(current)) remaining -= 1;
  }
  return current;
}

/** Business days in the interval (a, b] — how many weekdays until b. */
export function businessDaysBetween(a, b) {
  let count = 0;
  let current = a;
  while (diffDays(current, b) > 0) {
    current = addDays(current, 1);
    if (!isWeekend(current)) count += 1;
  }
  return count;
}

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function daysInMonth(year, month) {
  return dayAnchor(year, month + 1, 0).getUTCDate();
}

/** ISO-8601 week number, e.g. { year: 2026, week: 27 }. */
export function isoWeek(date) {
  const target = addDays(date, 3 - ((date.getUTCDay() + 6) % 7));
  const firstThursday = addDays(
    dayAnchor(target.getUTCFullYear(), 1, 4),
    3 - ((dayAnchor(target.getUTCFullYear(), 1, 4).getUTCDay() + 6) % 7),
  );
  const week = 1 + Math.round(diffDays(firstThursday, target) / 7);
  return { year: target.getUTCFullYear(), week };
}

/** Easter Sunday (Gregorian, Anonymous algorithm). */
export function easterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return dayAnchor(year, month, day);
}

/** The nth (1-based) given weekday of a month, e.g. 4th Thursday of November. */
export function nthWeekdayOfMonth(year, month, weekday, n) {
  const first = dayAnchor(year, month, 1);
  const offset = (weekday - first.getUTCDay() + 7) % 7;
  return addDays(first, offset + (n - 1) * 7);
}

/** The last given weekday of a month, e.g. last Monday of May. */
export function lastWeekdayOfMonth(year, month, weekday) {
  const last = dayAnchor(year, month, daysInMonth(year, month));
  const offset = (last.getUTCDay() - weekday + 7) % 7;
  return addDays(last, -offset);
}

export function formatISO(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatLong(date) {
  return `${WEEKDAYS[date.getUTCDay()]}, ${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

export function formatMedium(date) {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

export function weekdayName(date) {
  return WEEKDAYS[date.getUTCDay()];
}

/** Split a day count into whole weeks and leftover days. */
export function weeksAndDays(n) {
  return { weeks: Math.floor(n / 7), days: n % 7 };
}

/** Human phrasing like "exactly 3 weeks" or "12 weeks and 6 days". */
export function describeWeeks(n) {
  const { weeks, days } = weeksAndDays(n);
  if (weeks === 0) return `${days} day${days === 1 ? '' : 's'}`;
  const weekPart = `${weeks} week${weeks === 1 ? '' : 's'}`;
  if (days === 0) return `exactly ${weekPart}`;
  return `${weekPart} and ${days} day${days === 1 ? '' : 's'}`;
}

/** Rough month phrasing like "about 3 months" for day counts >= 28. */
export function describeMonths(n) {
  if (n < 28) return null;
  const months = n / 30.437;
  const rounded = Math.round(months * 10) / 10;
  const label = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return `about ${label} month${rounded === 1 ? '' : 's'}`;
}
