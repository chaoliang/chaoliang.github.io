import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  dayAnchor, todayUTC, addDays, diffDays, isWeekend, addBusinessDays,
  businessDaysBetween, isLeapYear, daysInMonth, isoWeek, easterSunday,
  nthWeekdayOfMonth, lastWeekdayOfMonth, formatISO, formatLong,
  weeksAndDays, describeWeeks, describeMonths,
} from '../lib/dates.js';

test('dayAnchor pins to 12:00 UTC', () => {
  const d = dayAnchor(2026, 7, 4);
  assert.equal(d.toISOString(), '2026-07-04T12:00:00.000Z');
});

test('todayUTC uses the UTC calendar date', () => {
  const lateNight = new Date('2026-07-04T23:59:59Z');
  assert.equal(formatISO(todayUTC(lateNight)), '2026-07-04');
  const earlyMorning = new Date('2026-07-05T00:00:01Z');
  assert.equal(formatISO(todayUTC(earlyMorning)), '2026-07-05');
});

test('addDays crosses month, year, and leap boundaries', () => {
  assert.equal(formatISO(addDays(dayAnchor(2026, 1, 31), 1)), '2026-02-01');
  assert.equal(formatISO(addDays(dayAnchor(2026, 12, 31), 1)), '2027-01-01');
  assert.equal(formatISO(addDays(dayAnchor(2028, 2, 28), 1)), '2028-02-29');
  assert.equal(formatISO(addDays(dayAnchor(2026, 2, 28), 1)), '2026-03-01');
  assert.equal(formatISO(addDays(dayAnchor(2026, 7, 4), 90)), '2026-10-02');
  assert.equal(formatISO(addDays(dayAnchor(2026, 7, 4), 365)), '2027-07-04');
});

test('addDays handles negative offsets', () => {
  assert.equal(formatISO(addDays(dayAnchor(2026, 3, 1), -1)), '2026-02-28');
});

test('diffDays is symmetric and exact across DST months', () => {
  const a = dayAnchor(2026, 3, 1);
  const b = dayAnchor(2026, 4, 1);
  assert.equal(diffDays(a, b), 31);
  assert.equal(diffDays(b, a), -31);
  assert.equal(diffDays(a, a), 0);
});

test('isWeekend', () => {
  assert.equal(isWeekend(dayAnchor(2026, 7, 4)), true); // Saturday
  assert.equal(isWeekend(dayAnchor(2026, 7, 5)), true); // Sunday
  assert.equal(isWeekend(dayAnchor(2026, 7, 6)), false); // Monday
});

test('addBusinessDays skips weekends', () => {
  // Friday + 1 business day = Monday
  assert.equal(formatISO(addBusinessDays(dayAnchor(2026, 7, 3), 1)), '2026-07-06');
  // Saturday + 1 business day = Monday
  assert.equal(formatISO(addBusinessDays(dayAnchor(2026, 7, 4), 1)), '2026-07-06');
  // Monday + 5 business days = next Monday
  assert.equal(formatISO(addBusinessDays(dayAnchor(2026, 7, 6), 5)), '2026-07-13');
  // 10 business days = 2 calendar weeks from a weekday
  assert.equal(formatISO(addBusinessDays(dayAnchor(2026, 7, 6), 10)), '2026-07-20');
});

test('businessDaysBetween counts weekdays in (a, b]', () => {
  const fri = dayAnchor(2026, 7, 3);
  const nextFri = dayAnchor(2026, 7, 10);
  assert.equal(businessDaysBetween(fri, nextFri), 5);
  assert.equal(businessDaysBetween(fri, fri), 0);
});

test('leap years', () => {
  assert.equal(isLeapYear(2024), true);
  assert.equal(isLeapYear(2026), false);
  assert.equal(isLeapYear(2100), false);
  assert.equal(isLeapYear(2000), true);
});

test('daysInMonth', () => {
  assert.equal(daysInMonth(2026, 2), 28);
  assert.equal(daysInMonth(2028, 2), 29);
  assert.equal(daysInMonth(2026, 12), 31);
});

test('isoWeek known values', () => {
  // 2026-01-01 is a Thursday -> ISO week 1
  assert.deepEqual(isoWeek(dayAnchor(2026, 1, 1)), { year: 2026, week: 1 });
  // 2027-01-01 is a Friday -> belongs to 2026 week 53
  assert.deepEqual(isoWeek(dayAnchor(2027, 1, 1)), { year: 2026, week: 53 });
  assert.deepEqual(isoWeek(dayAnchor(2026, 7, 4)), { year: 2026, week: 27 });
});

test('easterSunday known dates', () => {
  assert.equal(formatISO(easterSunday(2026)), '2026-04-05');
  assert.equal(formatISO(easterSunday(2027)), '2027-03-28');
  assert.equal(formatISO(easterSunday(2028)), '2028-04-16');
  assert.equal(formatISO(easterSunday(2024)), '2024-03-31');
});

test('nthWeekdayOfMonth: US Thanksgiving = 4th Thursday of November', () => {
  assert.equal(formatISO(nthWeekdayOfMonth(2026, 11, 4, 4)), '2026-11-26');
  assert.equal(formatISO(nthWeekdayOfMonth(2027, 11, 4, 4)), '2027-11-25');
});

test('lastWeekdayOfMonth: Memorial Day = last Monday of May', () => {
  assert.equal(formatISO(lastWeekdayOfMonth(2026, 5, 1)), '2026-05-25');
  assert.equal(formatISO(lastWeekdayOfMonth(2027, 5, 1)), '2027-05-31');
});

test('formatting', () => {
  const d = dayAnchor(2026, 10, 2);
  assert.equal(formatISO(d), '2026-10-02');
  assert.equal(formatLong(d), 'Friday, October 2, 2026');
});

test('weeksAndDays / describeWeeks / describeMonths', () => {
  assert.deepEqual(weeksAndDays(90), { weeks: 12, days: 6 });
  assert.equal(describeWeeks(21), 'exactly 3 weeks');
  assert.equal(describeWeeks(90), '12 weeks and 6 days');
  assert.equal(describeWeeks(1), '1 day');
  assert.equal(describeMonths(90), 'about 3 months');
  assert.equal(describeMonths(10), null);
});
