/**
 * DateSum client script. Two jobs, both progressive enhancement:
 *  1. Refresh statically-built numbers against the visitor's LOCAL date
 *     (static HTML carries the build-day values; this corrects any lag).
 *  2. Power the interactive calculators (days-between, age).
 * Mirrors lib/dates.js conventions: all math on noon-UTC anchors.
 */

const DAY_MS = 86_400_000;
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const anchor = (y, m, d) => new Date(Date.UTC(y, m - 1, d, 12));
const localToday = () => {
  const now = new Date();
  return anchor(now.getFullYear(), now.getMonth() + 1, now.getDate());
};
const parseISO = (s) => {
  const [y, m, d] = s.split('-').map(Number);
  return anchor(y, m, d);
};
const addDays = (date, n) =>
  anchor(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate() + n);
const addMonths = (date, n) => {
  const idx = date.getUTCMonth() + n;
  const year = date.getUTCFullYear() + Math.floor(idx / 12);
  const month = ((idx % 12) + 12) % 12 + 1;
  const lastDay = anchor(year, month + 1, 0).getUTCDate();
  return anchor(year, month, Math.min(date.getUTCDate(), lastDay));
};
const diffDays = (a, b) => Math.round((b - a) / DAY_MS);
const isWeekend = (d) => d.getUTCDay() === 0 || d.getUTCDay() === 6;

function addBusinessDays(date, n) {
  let cur = date, left = n;
  while (left > 0) {
    cur = addDays(cur, 1);
    if (!isWeekend(cur)) left -= 1;
  }
  return cur;
}

function businessDaysBetween(a, b) {
  let count = 0, cur = a;
  while (diffDays(cur, b) > 0) {
    cur = addDays(cur, 1);
    if (!isWeekend(cur)) count += 1;
  }
  return count;
}

function isoWeek(date) {
  const target = addDays(date, 3 - ((date.getUTCDay() + 6) % 7));
  const jan4 = anchor(target.getUTCFullYear(), 1, 4);
  const firstThursday = addDays(jan4, 3 - ((jan4.getUTCDay() + 6) % 7));
  return { year: target.getUTCFullYear(), week: 1 + Math.round(diffDays(firstThursday, target) / 7) };
}

const fmtLong = (d) => `${WEEKDAYS[d.getUTCDay()]}, ${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
const fmtMedium = (d) => `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
const fmtISO = (d) => `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;

function describeWeeks(n) {
  const weeks = Math.floor(n / 7), days = n % 7;
  if (weeks === 0) return `${days} day${days === 1 ? '' : 's'}`;
  const wp = `${weeks} week${weeks === 1 ? '' : 's'}`;
  return days === 0 ? `exactly ${wp}` : `${wp} and ${days} day${days === 1 ? '' : 's'}`;
}

const setFact = (root, name, value) => {
  for (const el of root.querySelectorAll(`[data-fact="${name}"]`)) el.textContent = value;
};

function refreshOffset(root, today) {
  const n = Number(root.dataset.days);
  if (!Number.isInteger(n) || n < 1) return;
  const mode = root.dataset.mode;
  const business = mode === 'business';
  const target = business ? addBusinessDays(today, n)
    : mode === 'months' ? addMonths(today, n)
    : addDays(today, n);
  const week = isoWeek(target);

  setFact(root, 'long-date', fmtLong(target));
  setFact(root, 'medium-date', fmtMedium(target));
  setFact(root, 'today', fmtMedium(today));
  setFact(root, 'iso', fmtISO(target));
  setFact(root, 'weekday', WEEKDAYS[target.getUTCDay()]);
  setFact(root, 'isoweek', `Week ${week.week}, ${week.year}`);
  if (business || mode === 'months') {
    const span = diffDays(today, target);
    setFact(root, 'calspan', String(span));
    setFact(root, 'calweeks', describeWeeks(span));
  }
  if (!business) {
    setFact(root, 'weekend', isWeekend(target) ? 'Yes' : 'No');
    setFact(root, 'bizcount', String(businessDaysBetween(today, target)));
  }
}

function refreshUntil(root, today) {
  const target = parseISO(root.dataset.target);
  const days = diffDays(today, target);
  if (days < 0) return; // stale build past the event; next daily build fixes it
  setFact(root, 'count', String(days));
  setFact(root, 'today', fmtMedium(today));
  setFact(root, 'weeks', describeWeeks(days));
  setFact(root, 'bizcount', String(businessDaysBetween(today, target)));
}

function initBetween(panel) {
  const form = panel.querySelector('[data-role="form"]');
  const output = panel.querySelector('[data-role="output"]');
  const render = () => {
    const start = form.elements.start.valueAsDate && parseISO(form.elements.start.value);
    const end = form.elements.end.valueAsDate && parseISO(form.elements.end.value);
    if (!start || !end) {
      output.innerHTML = '<p class="error">Please pick both dates.</p>';
      return;
    }
    const [a, b] = start <= end ? [start, end] : [end, start];
    const days = diffDays(a, b);
    output.innerHTML = `
      <span class="result-big">${days} day${days === 1 ? '' : 's'}</span>
      <ul class="result-rows">
        <li>${fmtMedium(a)} → ${fmtMedium(b)}</li>
        <li>${describeWeeks(days)}</li>
        <li>${businessDaysBetween(a, b)} business days (weekends excluded)</li>
        <li>${days + 1} days counting both endpoints</li>
      </ul>`;
  };
  form.addEventListener('submit', (e) => { e.preventDefault(); render(); });
  render();
}

function initAge(panel) {
  const form = panel.querySelector('[data-role="form"]');
  const output = panel.querySelector('[data-role="output"]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dob = form.elements.dob.value && parseISO(form.elements.dob.value);
    const today = localToday();
    if (!dob || diffDays(dob, today) < 0) {
      output.innerHTML = '<p class="error">Please enter a birth date in the past.</p>';
      return;
    }
    const clampDay = (y, m, d) => {
      const lastDay = anchor(y, m + 1, 0).getUTCDate();
      return anchor(y, m, Math.min(d, lastDay));
    };
    const by = dob.getUTCFullYear(), bm = dob.getUTCMonth() + 1, bd = dob.getUTCDate();
    let years = today.getUTCFullYear() - by;
    if (years > 0 && diffDays(clampDay(by + years, bm, bd), today) < 0) years -= 1;
    // Whole months since the last birthday: probe m=1..11 clamped anniversaries.
    let cursor = clampDay(by + years, bm, bd);
    let months = 0;
    for (let m = 1; m <= 11; m += 1) {
      const idx = bm - 1 + m;
      const candidate = clampDay(by + years + Math.floor(idx / 12), (idx % 12) + 1, bd);
      if (diffDays(candidate, today) < 0) break;
      cursor = candidate;
      months = m;
    }
    const days = diffDays(cursor, today);
    const totalDays = diffDays(dob, today);
    const nextBirthday = clampDay(by + years + 1, bm, bd);
    const untilBirthday = diffDays(today, nextBirthday);
    output.innerHTML = `
      <span class="result-big">${years}y ${months}m ${days}d</span>
      <ul class="result-rows">
        <li>${totalDays.toLocaleString('en-US')} days old</li>
        <li>Born on a ${WEEKDAYS[dob.getUTCDay()]}</li>
        <li>${untilBirthday === 0 ? '🎂 Happy birthday!' : `${untilBirthday} days until your next birthday (${fmtMedium(nextBirthday)})`}</li>
      </ul>`;
  });
}

try {
  const today = localToday();
  for (const root of document.querySelectorAll('[data-calc="offset"]')) {
    try { refreshOffset(root, today); } catch { /* keep static values */ }
  }
  for (const root of document.querySelectorAll('[data-calc="until"]')) {
    try { refreshUntil(root, today); } catch { /* keep static values */ }
  }
  for (const panel of document.querySelectorAll('[data-widget="between"]')) initBetween(panel);
  for (const panel of document.querySelectorAll('[data-widget="age"]')) initAge(panel);
} catch { /* progressive enhancement: static content remains valid */ }
