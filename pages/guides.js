import { page, prose, linksGrid, adSlot, esc } from '../lib/html.js';

const ARTICLES = [
  {
    slug: 'how-to-count-business-days',
    title: 'How to Count Business Days (Without Missing a Deadline)',
    description: 'The rules banks, courts, and couriers use to count business days — including what happens with weekends, holidays, and cut-off times.',
    body: `
<p>“Within 5 business days” is one of the most common phrases in contracts, banking, and shipping — and one of
the most commonly miscounted. Here is the counting method used by institutions, with the edge cases spelled out.</p>
<h2>The core rule</h2>
<p>A business day is a weekday: Monday through Friday. To count <em>N business days from a date</em>, start at
that date as day zero, move forward one calendar day at a time, and only count days that are weekdays. The
N-th counted weekday is your answer. Two consequences follow:</p>
<ul>
<li><strong>Today never counts.</strong> If a bank says “funds available in 1 business day” on Monday, that means Tuesday — not Monday afternoon.</li>
<li><strong>Weekends stretch the calendar.</strong> 5 business days from a Monday is the next Monday (7 calendar days). 5 business days from a Wednesday is the next Wednesday — still 7 calendar days. But 5 business days from a <em>Friday</em> is also the next Friday. The business-day count is stable; the calendar span depends on where the weekends fall.</li>
</ul>
<h2>What about public holidays?</h2>
<p>Institutions skip the holidays <em>they</em> observe. A US bank skips the ~11 federal holidays; a UK court skips
bank holidays; a courier may follow the holiday schedule of every country a parcel passes through. Since there is
no universal list, general-purpose calculators (including ours) skip weekends only and tell you to subtract local
holidays yourself: <strong>for each holiday inside your span, push the end date one weekday later</strong>.</p>
<h2>Cut-off times: the hidden trap</h2>
<p>Most banks and carriers have a daily cut-off, often between 2pm and 5pm local time. Anything submitted after
cut-off is treated as if it arrived the <em>next</em> business day. If you wire money at 6pm Friday, the clock may
not start until Monday — so “1–2 business days” can mean Wednesday. When a deadline matters, treat the cut-off as
end of the previous day.</p>
<h2>Counting backwards</h2>
<p>Notice periods often run backwards: “notify us at least 10 business days before the renewal date.” The same
rule applies in reverse — count weekdays backwards, holidays excluded. When in doubt, land your action one full
business day earlier than the deadline requires.</p>
<h2>Quick reference</h2>
<ul>
<li>1 business day from Friday → Monday</li>
<li>3 business days from Thursday → Tuesday</li>
<li>5 business days from any weekday → same weekday next week</li>
<li>10 business days ≈ 2 calendar weeks</li>
<li>20 business days ≈ 4 calendar weeks (a “working month”)</li>
</ul>
<p>For an exact date, use the <a href="/business-days-from-today/">business days from today calculator</a> —
it does the weekday walk for any span up to 90 business days.</p>`,
  },
  {
    slug: 'the-90-180-day-schengen-rule',
    title: 'The 90/180-Day Schengen Rule, Explained With Examples',
    description: 'How the Schengen short-stay rule actually counts days, why the 180-day window is "rolling", and how to compute your remaining days.',
    body: `
<p>Visa-free visitors to the Schengen area may stay <strong>at most 90 days within any 180-day period</strong>.
The rule sounds simple but is the single most miscalculated travel restriction, because the 180-day window is
<em>rolling</em>, not fixed.</p>
<h2>How the window works</h2>
<p>On every single day of your stay, look <em>backwards</em> 180 days and count how many of those days you were
inside Schengen. That count must never exceed 90. There is no reset date: leaving for a week does not "restart"
anything; old days simply age out of the window 180 days after they occurred.</p>
<h2>Counting conventions</h2>
<ul>
<li><strong>Both entry day and exit day count as full days</strong>, regardless of the hour. Land at 23:50 and that calendar day is one of your 90.</li>
<li>Days in non-Schengen countries (e.g. Ireland, Cyprus, most of the Balkans, the UK) do not count.</li>
<li>Days spent under a national long-stay visa or residence permit are counted differently — this rule covers visa-free short stays.</li>
</ul>
<h2>Worked example</h2>
<p>Say you spent 60 days in Spain, March 1 – April 29, then left. You return on July 1. Looking back 180 days
from July 1, all 60 of those Spain days are inside the window, so you have 30 days left — enough to stay until
July 30. But by mid-September, the March days start aging out of the window, and your allowance begins to
recover day by day.</p>
<h2>Practical tips</h2>
<ul>
<li>Keep a simple log of every entry and exit date — passport stamps fade and get missed.</li>
<li>Overstays of even one day can lead to fines, entry bans, and flags in the EES system, which now records crossings electronically.</li>
<li>Before booking a return trip, count your days from the <em>planned exit date</em> backwards 180 days, not from today.</li>
<li>Use a <a href="/days-between/">days-between calculator</a> to total each stay precisely — remember both endpoints count.</li>
</ul>
<p>Rule of thumb: after a full 90-day stay you need 90 continuous days outside Schengen before another full
90-day stay is possible. Shorter, spaced trips give more flexibility than maxing out the allowance.</p>`,
  },
  {
    slug: 'how-easter-date-is-determined',
    title: 'Why Easter Moves: How the Date Is Actually Determined',
    description: "Easter can fall anywhere from March 22 to April 25. Here's the real rule, the ecclesiastical moon, and how to compute it.",
    body: `
<p>Easter is the anchor for a dozen other observances — Mardi Gras, Ash Wednesday, Palm Sunday, Good Friday,
Pentecost — yet it lands anywhere between <strong>March 22 and April 25</strong>. The rule behind it is one of
history's great calendar puzzles.</p>
<h2>The rule</h2>
<p>Easter falls on the <strong>first Sunday after the first full moon on or after March 21</strong> (the church's
fixed date for the spring equinox). Three moving parts interact: the solar year, the lunar month, and the
seven-day week — which is why the date jumps around so much.</p>
<h2>The "ecclesiastical" moon</h2>
<p>Crucially, the church does not use the astronomical full moon. It uses the <em>ecclesiastical full moon</em> —
a tabulated approximation fixed in 1582 with the Gregorian calendar reform. The tables (Metonic cycle plus
correction terms) keep the lunar calendar aligned within a day or two of the real moon over centuries. This is
why Easter occasionally differs from what a naive astronomical computation would give.</p>
<h2>Computing it</h2>
<p>The standard method is the "Anonymous Gregorian algorithm" (also called the Meeus/Jones/Butcher algorithm) —
about ten integer divisions and remainders that encode the tables. It produces, for example: April 5 in 2026,
March 28 in 2027, April 16 in 2028. Our <a href="/days-until/easter/">Easter countdown</a> uses exactly this
algorithm, so the dates are correct indefinitely, not looked up from a list.</p>
<h2>Why Orthodox Easter differs</h2>
<p>Most Orthodox churches apply the same rule to the <em>Julian</em> calendar, whose March 21 currently falls 13
days later than the Gregorian one, and use older lunar tables. The result is usually one to five weeks after
Western Easter — though occasionally (as in 2025) the two coincide.</p>
<h2>The dependent holidays</h2>
<ul>
<li>Mardi Gras: 47 days before Easter</li>
<li>Ash Wednesday: 46 days before</li>
<li>Palm Sunday: 7 days before</li>
<li>Good Friday: 2 days before</li>
<li>Ascension: 39 days after; Pentecost: 49 days after</li>
</ul>
<p>Shift Easter and the whole chain shifts with it — one reason spring schedules (school breaks, tourism seasons,
even financial quarters in some countries) vary so much year to year.</p>`,
  },
  {
    slug: 'probation-periods-and-90-day-rules',
    title: '90-Day Probation Periods: How to Count Them Correctly',
    description: 'Whether a probation period is 90 calendar days or 3 months matters more than you think. How employers and employees should count.',
    body: `
<p>The "90-day probation period" is standard in US employment, and similar constructs exist worldwide (up to
6 months in China and Germany, typically 3 months in the UK). Miscounting it has real consequences: benefits
eligibility, termination rights, and notice requirements often hinge on the exact end date.</p>
<h2>90 days is not 3 months</h2>
<p>Three calendar months from June 1 is September 1 — that's 92 days. From February 1 it's May 1 — just 89 or 90
days. If a contract says <strong>90 days</strong>, count exactly 90 calendar days; if it says <strong>3 months</strong>,
land on the same day-of-month three months later. The two diverge by up to three days, and disputes have turned
on exactly this difference.</p>
<h2>Which day is day one?</h2>
<p>The default legal convention is that <strong>the start date is day zero</strong> — the first day of employment
is not the first day counted; the period ends at the close of the 90th day after it. But some contracts state
"including the start date." Read the wording; when drafting, spell out the end date explicitly
("probation ends at the close of business on October 2, 2026") to remove all ambiguity.</p>
<h2>Calendar days or business days?</h2>
<p>Probation periods are almost always <em>calendar</em> days — weekends and holidays count. Business days show up
in the surrounding mechanics instead: "written notice within 5 business days", "benefits begin the first business
day after probation." Both types can appear in one clause, so match each number to its unit.</p>
<h2>For employers</h2>
<ul>
<li>Compute the exact end date at hire and put it in the offer letter.</li>
<li>If an extension is allowed, diary the decision at least two weeks before the end date — extending after the period lapses is often invalid.</li>
<li>Remember that in many jurisdictions statutory protections apply from day one regardless of probation.</li>
</ul>
<h2>For employees</h2>
<ul>
<li>Confirm your exact probation end date in writing during week one.</li>
<li>Benefits with waiting periods (health cover, 401(k) matching) may start on a different clock — "first of the month after 90 days" is common and can add up to 30 extra days.</li>
</ul>
<p>To get the exact date, put your start date into the <a href="/days-between/">days-between calculator</a>, or
check <a href="/days-from-today/90/">90 days from today</a> if you're starting now.</p>`,
  },
  {
    slug: 'leap-years-and-date-math-pitfalls',
    title: 'Leap Years, DST, and Other Ways Date Math Goes Wrong',
    description: 'The five classic bugs in day counting — leap years, DST, month lengths, inclusive counting, and timezones — and how to avoid each.',
    body: `
<p>Day counting looks like grade-school arithmetic, yet software ships with date bugs every year and humans miss
deadlines over them. These are the five classic failure modes.</p>
<h2>1. Leap years</h2>
<p>A year is a leap year if it's divisible by 4 — <em>except</em> century years, which must be divisible by 400.
So 2024 and 2000 are leap years; 1900 and 2100 are not. Any calculation that assumes "365 days = 1 year" drifts:
365 days from March 1, 2027 is February 29, 2028 — a date that doesn't exist in most years. Contracts that say
"one year" should anchor to the anniversary date, not to 365 days.</p>
<h2>2. Daylight saving time</h2>
<p>When clocks spring forward, one day is 23 hours long. Naive code that computes days as
<code>milliseconds ÷ 86,400,000</code> gets 29.96 days across a March span and rounds down to 29 — a silent
off-by-one. The fix (which every calculator on this site uses) is to anchor all dates to noon UTC before
subtracting, so no civil-time discontinuity can ever move a result across midnight.</p>
<h2>3. Month lengths</h2>
<p>"One month later" is ambiguous at month ends: what is January 31 plus one month? Conventions differ — some
systems say February 28 (clamp), others March 2 or 3 (overflow). Banking systems typically clamp; JavaScript's
<code>Date</code> overflows. If a payment is due "monthly on the 31st", find out which convention applies before
the short months arrive.</p>
<h2>4. Inclusive vs. exclusive counting</h2>
<p>From Monday to Friday is 4 days by subtraction — but 5 days if you count both endpoints, which is how hotel
"nights" differ from rental "days", and how prescriptions ("take for 10 days, starting today") differ from
deadlines ("within 10 days"). The subtraction convention (start day excluded, end day included) is the default
in law and finance; inclusive counting shows up in travel rules like the <a href="/guides/the-90-180-day-schengen-rule/">Schengen 90/180 rule</a>, where both entry and exit days count.</p>
<h2>5. Timezones</h2>
<p>"Today" is not the same date everywhere — when it's Friday evening in Los Angeles it's already Saturday in
Beijing. A deadline of "June 30" means June 30 <em>somewhere</em>; contracts increasingly specify the zone
("23:59 Pacific Time"). Our calculators compute against <em>your device's local date</em>, which is what you
almost always want for personal deadlines.</p>
<p>The common thread: date math is fine — it's the <em>conventions</em> that bite. State the convention, then
let a calculator do the walking: <a href="/days-from-today/">days from today</a>,
<a href="/business-days-from-today/">business days</a>, or <a href="/days-between/">days between dates</a>.</p>`,
  },
];

export function guidePages(config, today, buildDate) {
  const pages = ARTICLES.map((article) => ({
    path: `/guides/${article.slug}/`,
    html: page({
      config,
      path: `/guides/${article.slug}/`,
      title: `${article.title} | ${config.brand}`,
      description: article.description,
      content: [
        `<article class="guide"><h1>${esc(article.title)}</h1>`,
        prose(article.body),
        '</article>',
        adSlot(config),
        linksGrid('More guides', ARTICLES.filter((a) => a.slug !== article.slug)
          .map((a) => ({ href: `/guides/${a.slug}/`, label: a.title }))),
      ].join('\n'),
      buildDate,
    }),
  }));

  const index = {
    path: '/guides/',
    html: page({
      config,
      path: '/guides/',
      title: `Date & Deadline Guides | ${config.brand}`,
      description: 'Plain-English guides to counting days: business days, probation periods, the Schengen 90/180 rule, Easter dates, and the classic date-math pitfalls.',
      content: `
<h1>Guides</h1>
<p class="lede">The rules behind the numbers — how institutions actually count days, and where counting goes wrong.</p>
<section class="guide-list">
${ARTICLES.map((a) => `<a class="guide-card" href="/guides/${a.slug}/"><h2>${esc(a.title)}</h2><p>${esc(a.description)}</p></a>`).join('\n')}
</section>`,
      buildDate,
    }),
  };

  return [...pages, index];
}
