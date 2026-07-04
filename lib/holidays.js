/**
 * Event catalogue for "days until" pages. Each event resolves its next
 * occurrence on/after a given anchor date. Movable feasts are computed;
 * lunar new year uses a verified lookup table and is skipped beyond it
 * rather than shown wrong.
 */
import {
  dayAnchor, addDays, diffDays, easterSunday,
  nthWeekdayOfMonth, lastWeekdayOfMonth,
} from './dates.js';

const fixed = (month, day) => (year) => dayAnchor(year, month, day);

const LUNAR_NEW_YEAR = {
  2026: [2, 17], 2027: [2, 6], 2028: [1, 26], 2029: [2, 13], 2030: [2, 3],
};

/** Ordered roughly by search volume. `date(year)` returns that year's occurrence or null. */
export const EVENTS = [
  { slug: 'christmas', name: 'Christmas', date: fixed(12, 25),
    blurb: 'Christmas Day falls on December 25 every year, celebrating the birth of Jesus and anchoring the biggest gift-giving season worldwide.' },
  { slug: 'new-year', name: "New Year's Day", date: fixed(1, 1),
    blurb: "New Year's Day on January 1 opens the calendar year and is a public holiday in almost every country." },
  { slug: 'halloween', name: 'Halloween', date: fixed(10, 31),
    blurb: 'Halloween is celebrated on October 31 with costumes, trick-or-treating, and haunted festivities.' },
  { slug: 'thanksgiving', name: 'Thanksgiving (US)', date: (y) => nthWeekdayOfMonth(y, 11, 4, 4),
    blurb: 'US Thanksgiving lands on the fourth Thursday of November, so its exact date shifts each year.' },
  { slug: 'valentines-day', name: "Valentine's Day", date: fixed(2, 14),
    blurb: "Valentine's Day on February 14 is the year's biggest celebration of romance, cards, and chocolate." },
  { slug: 'easter', name: 'Easter Sunday', date: easterSunday,
    blurb: 'Easter Sunday moves every year — it falls on the first Sunday after the first full moon on or after the spring equinox.' },
  { slug: 'black-friday', name: 'Black Friday', date: (y) => addDays(nthWeekdayOfMonth(y, 11, 4, 4), 1),
    blurb: 'Black Friday is the day after US Thanksgiving and marks the start of the holiday shopping season.' },
  { slug: 'cyber-monday', name: 'Cyber Monday', date: (y) => addDays(nthWeekdayOfMonth(y, 11, 4, 4), 4),
    blurb: 'Cyber Monday, the Monday after Thanksgiving, is the biggest online shopping day of the year.' },
  { slug: 'christmas-eve', name: 'Christmas Eve', date: fixed(12, 24),
    blurb: 'Christmas Eve on December 24 is when many families hold their main holiday gathering and gift exchange.' },
  { slug: 'new-years-eve', name: "New Year's Eve", date: fixed(12, 31),
    blurb: "New Year's Eve on December 31 closes out the year with countdowns and fireworks around the world." },
  { slug: 'independence-day', name: 'Independence Day (US)', date: fixed(7, 4),
    blurb: 'The Fourth of July commemorates the 1776 Declaration of Independence with fireworks and parades across the United States.' },
  { slug: 'st-patricks-day', name: "St. Patrick's Day", date: fixed(3, 17),
    blurb: "St. Patrick's Day on March 17 celebrates Irish heritage with parades and plenty of green." },
  { slug: 'mothers-day', name: "Mother's Day (US)", date: (y) => nthWeekdayOfMonth(y, 5, 0, 2),
    blurb: "In the US, Mother's Day is the second Sunday of May, so the date changes every year." },
  { slug: 'fathers-day', name: "Father's Day (US)", date: (y) => nthWeekdayOfMonth(y, 6, 0, 3),
    blurb: "US Father's Day falls on the third Sunday of June each year." },
  { slug: 'labor-day', name: 'Labor Day (US)', date: (y) => nthWeekdayOfMonth(y, 9, 1, 1),
    blurb: 'US Labor Day is the first Monday of September and unofficially closes the American summer.' },
  { slug: 'memorial-day', name: 'Memorial Day (US)', date: (y) => lastWeekdayOfMonth(y, 5, 1),
    blurb: 'Memorial Day, the last Monday of May, honors US service members and opens the summer season.' },
  { slug: 'mlk-day', name: 'Martin Luther King Jr. Day', date: (y) => nthWeekdayOfMonth(y, 1, 1, 3),
    blurb: 'MLK Day is observed on the third Monday of January in honor of Dr. Martin Luther King Jr.' },
  { slug: 'presidents-day', name: "Presidents' Day", date: (y) => nthWeekdayOfMonth(y, 2, 1, 3),
    blurb: "Presidents' Day falls on the third Monday of February, honoring George Washington and US presidents." },
  { slug: 'veterans-day', name: 'Veterans Day (US)', date: fixed(11, 11),
    blurb: 'Veterans Day on November 11 honors all US military veterans, echoing the 1918 armistice.' },
  { slug: 'juneteenth', name: 'Juneteenth', date: fixed(6, 19),
    blurb: 'Juneteenth on June 19 commemorates the end of slavery in the United States and became a federal holiday in 2021.' },
  { slug: 'good-friday', name: 'Good Friday', date: (y) => addDays(easterSunday(y), -2),
    blurb: 'Good Friday is the Friday before Easter Sunday, so its date moves with Easter each year.' },
  { slug: 'easter-monday', name: 'Easter Monday', date: (y) => addDays(easterSunday(y), 1),
    blurb: 'Easter Monday, the day after Easter Sunday, is a public holiday in much of Europe and the Commonwealth.' },
  { slug: 'mardi-gras', name: 'Mardi Gras', date: (y) => addDays(easterSunday(y), -47),
    blurb: 'Mardi Gras (Fat Tuesday) falls 47 days before Easter, closing the Carnival season with one last celebration.' },
  { slug: 'ash-wednesday', name: 'Ash Wednesday', date: (y) => addDays(easterSunday(y), -46),
    blurb: 'Ash Wednesday begins Lent, 46 days before Easter Sunday.' },
  { slug: 'palm-sunday', name: 'Palm Sunday', date: (y) => addDays(easterSunday(y), -7),
    blurb: 'Palm Sunday is celebrated one week before Easter and opens Holy Week.' },
  { slug: 'lunar-new-year', name: 'Lunar New Year', date: (y) => {
      const entry = LUNAR_NEW_YEAR[y];
      return entry ? dayAnchor(y, entry[0], entry[1]) : null;
    },
    blurb: 'Lunar New Year, celebrated across China and East Asia, follows the lunisolar calendar and falls between late January and mid-February.' },
  { slug: 'april-fools', name: "April Fools' Day", date: fixed(4, 1),
    blurb: "April Fools' Day on April 1 is the annual license for pranks and hoaxes." },
  { slug: 'cinco-de-mayo', name: 'Cinco de Mayo', date: fixed(5, 5),
    blurb: 'Cinco de Mayo on May 5 commemorates the 1862 Battle of Puebla and celebrates Mexican culture.' },
  { slug: 'earth-day', name: 'Earth Day', date: fixed(4, 22),
    blurb: 'Earth Day on April 22 mobilizes support for environmental protection in over 190 countries.' },
  { slug: 'groundhog-day', name: 'Groundhog Day', date: fixed(2, 2),
    blurb: 'On Groundhog Day, February 2, tradition says the groundhog’s shadow predicts six more weeks of winter.' },
  { slug: 'columbus-day', name: 'Columbus Day / Indigenous Peoples’ Day', date: (y) => nthWeekdayOfMonth(y, 10, 1, 2),
    blurb: 'Observed on the second Monday of October in the United States.' },
  { slug: 'tax-day', name: 'Tax Day (US)', date: fixed(4, 15),
    blurb: 'US federal income tax returns are generally due on April 15 (pushed to the next business day when it lands on a weekend or holiday).' },
];

/**
 * Next occurrence of the event on or after `from`.
 * Returns { date, days } or null when beyond available data.
 */
export function nextOccurrence(event, from) {
  for (const year of [from.getUTCFullYear(), from.getUTCFullYear() + 1]) {
    const candidate = event.date(year);
    if (candidate && diffDays(from, candidate) >= 0) {
      return { date: candidate, days: diffDays(from, candidate) };
    }
  }
  return null;
}
