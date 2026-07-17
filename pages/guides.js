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
  {
    slug: 'net-30-60-90-invoice-payment-terms',
    title: "Net 30, Net 60, Net 90: How Invoice Payment Terms Really Work",
    description: "What net 30, net 60, and net 90 really mean: when the clock starts, the 2/10 discount math, late-fee conventions, and how to set terms that get you paid.",
    body: `
<p>"Net 30" is the most common payment term on invoices, and one of the most commonly misread. Freelancers tend to read it as "I'll get paid in about a month." Some clients read it as "we'll get to it eventually." The term does have a precise meaning — but the details, like when the clock starts and whether weekends count, depend on what your contract actually says. Here is how the standard terms work, and where the traps are.</p>

<h2>What "net" actually means</h2>
<p>Net 30 means the full ("net") invoice amount is due within <strong>30 days</strong>. Net 60 and net 90 work the same way with longer windows. By default, those are <strong>calendar days</strong> — weekends and holidays count — unless your contract explicitly says business days. That distinction matters more than it looks: 30 calendar days is about a month, while 30 business days stretches to roughly six weeks once weekends are skipped. If a contract just says "net 30" with no qualifier, the ordinary reading is calendar days. You can check what date lands 30 days out with the <a href="/days-from-today/30/">30 days from today calculator</a>, and if your agreement does count working days, see <a href="/guides/how-to-count-business-days/">how to count business days</a> for the conventions.</p>

<h2>When the clock starts</h2>
<p>This is where disputes actually happen. "Net 30 from what?" has at least three common answers:</p>
<ul>
<li><strong>Invoice date</strong> — the date printed on the invoice. This is the most common default.</li>
<li><strong>Receipt date</strong> — the date the client received the invoice. Some contracts specify this, which rewards clients for slow inboxes.</li>
<li><strong>End of month (EOM)</strong> — "net 30 EOM" means 30 days after the end of the month the invoice was issued in. An invoice dated March 3 under net 30 EOM isn't due until April 30.</li>
</ul>
<p>There is no universal rule; the contract controls. If your agreement is silent, most businesses treat the invoice date as day zero. The practical fix is simple: don't make anyone do the math. Print the actual due date on the invoice — "Due: August 16, 2026" — right next to the terms.</p>

<h2>Early-payment discounts: the 2/10 net 30 math</h2>
<p>You'll sometimes see terms like <strong>2/10 net 30</strong>. That means: take a 2% discount if you pay within 10 days; otherwise the full amount is due in 30. On a $1,000 invoice, paying by day 10 costs $980; paying on day 30 costs $1,000. From the client's side, skipping the discount means paying $20 to hold onto $980 for an extra 20 days. Annualized the usual way, that works out to an effective rate of roughly <strong>37%</strong> — far more expensive than most short-term borrowing, which is why finance departments often take the discount. From your side as the seller, offering 2/10 net 30 trades a small haircut for much faster cash. Whether that trade is worth it depends on how badly you need the money now.</p>

<h2>Why net 60 and net 90 squeeze you</h2>
<p>Longer terms turn you into an interest-free lender. Your costs — software, subcontractors, your own rent — come due immediately, while payment arrives two or three months later. And the real gap is usually longer than the stated term: if you work through a month before invoicing, net 60 means you're paid roughly <strong>90 days</strong> after you started the work. Large companies push net 60 and net 90 precisely because holding cash longer benefits them. You don't have to accept the first number offered: counter with net 30, ask for a deposit or milestone payments, or price the delay into your rate. It also pays to know your real numbers — use the <a href="/days-between/">days between calculator</a> to measure how long each client actually takes from invoice date to payment date. A "net 30" client who reliably pays on day 55 is a net 55 client.</p>

<h2>Late fees and chasing overdue invoices</h2>
<p>A common convention is a late fee of <strong>1% to 1.5% per month</strong> on overdue balances, but two caveats apply. First, a late fee is generally only enforceable if the client agreed to it in advance — in the contract, not just stamped on the invoice after the fact. Second, the maximum rate you can charge varies by jurisdiction, and some regions (the UK and EU, for example) have statutory interest rules for late commercial payments. Check the rules where you operate rather than assuming. For chasing: send a friendly reminder a few days before the due date, follow up the day after it passes, and escalate in writing at set intervals. A clause letting you pause work on accounts more than 15 or 30 days overdue gives those emails real weight.</p>

<p>Whatever terms you settle on, anchor them to concrete dates instead of leaving clients to count. If your contract runs on calendar days, the <a href="/days-from-today/30/">days from today calculator</a> gives you the exact due date to print on the invoice; if it counts working days, the <a href="/business-days-from-today/30/">business days from today calculator</a> skips weekends for you.</p>`,
  },
  {
    slug: 'return-window-deadlines-explained',
    title: "Return Windows: How 14, 30, and 90-Day Policies Actually Count",
    description: "When does a 14, 30, or 90-day return window actually end? How retailers start the clock, why calendar days rule, and how to count your deadline safely.",
    body: `
<p>A "30-day return policy" sounds precise until you try to use it. Thirty days from what — the day you ordered, the day it shipped, or the day it landed on your porch? Does the delivery day count as day one? Retailers answer these questions differently, and the difference can be three or four days of real time. If you're deciding whether to keep something, it pays to know exactly which day the window closes.</p>

<h2>When the clock starts</h2>
<p>For online orders, the window usually starts on the <strong>delivery date</strong>, not the order date. That is the standard in EU consumer law and the stated policy of most large online retailers, and it makes sense: you can't evaluate something you haven't received. For in-store purchases, the clock starts on the <strong>purchase date</strong> printed on the receipt.</p>
<p>But "usually" is doing real work in that sentence. Some retailers count from the ship date or the order date, and the policy page is the only place you'll find out. If a policy just says "within 30 days" without saying of what, assume the earliest plausible start date and treat the resulting deadline as real. Guessing generously is how returns get refused.</p>

<h2>Calendar days, not business days</h2>
<p>Return windows almost always run in <strong>calendar days</strong>. Weekends and holidays count, so 14 calendar days is exactly two weeks of real time — not the nearly three weeks that 14 business days would span. This trips people up because plenty of other deadlines — shipping estimates, payroll, some legal and government deadlines — run in business days, where weekends are skipped. If you need that kind of counting, see our guide on <a href="/guides/how-to-count-business-days/">how to count business days</a>.</p>
<p>Some jurisdictions extend a deadline that lands on a weekend or public holiday to the next working day, but retailer policies rarely spell this out. The safe assumption: the last day is the last day, whatever day of the week it falls on.</p>

<h2>What 14, 30, and 90 days typically mean</h2>
<p>The common window lengths aren't arbitrary:</p>
<ul>
<li><strong>14 days</strong> is the statutory minimum for most online purchases in the EU and UK. Distance-selling rules give consumers 14 days from delivery to withdraw from the purchase, no reason required. Retailers can offer more; they can't offer less. Exceptions exist — personalized items, perishables, unsealed hygiene products — so treat it as a strong default, not an absolute.</li>
<li><strong>30 days</strong> is the typical window in US retail. Note the word "typical": there is no general US federal law requiring stores to accept returns at all. Thirty days is convention, set policy by policy.</li>
<li><strong>90 days</strong> is commonly offered by some big-box chains on general merchandise. Even at those stores, categories like electronics, phones, and major appliances often carry shorter windows — 14 or 30 days — inside the same policy.</li>
</ul>
<p>The pattern to remember: the window belongs to the retailer (or, in the EU, to the law), and category exceptions are everywhere. Read the line that covers what you actually bought.</p>

<h2>Receipts, condition, and holiday extensions</h2>
<p>Hitting the date is necessary but not sufficient. Most policies also require proof of purchase — a receipt, order confirmation, or, at many chains, a lookup from the card you paid with — and impose condition requirements: tags attached, original packaging, software unopened. Opened electronics sometimes come back minus a restocking fee. None of this is universal; all of it is common.</p>
<p>One helpful wrinkle: many retailers extend return windows for holiday purchases. Items bought in November and December often get a deadline pushed into mid- or late January, so a gift bought in late November isn't stuck with a Christmas-week deadline. The exact cutoff dates change from year to year, so verify rather than assume.</p>

<h2>How to actually count your deadline</h2>
<p>Two habits prevent nearly all missed returns:</p>
<ul>
<li><strong>Count from the day after delivery.</strong> Treat the delivery day as day zero. This matches how EU withdrawal periods are counted and is the conservative reading of most US policies. If the package arrived March 3 with a 30-day window, day 30 is April 2.</li>
<li><strong>Set a reminder three days before the deadline.</strong> Not on the deadline — three days out. That leaves time to repackage the item, print a label, and get it to a drop-off point. Policies vary on whether a return must be initiated, postmarked, or received by the deadline, and three days of slack covers the strictest reading.</li>
</ul>

<p>The counting itself doesn't need to be mental math. If your package arrived today, <a href="/days-from-today/14/">14 days from today</a>, <a href="/days-from-today/30/">30 days from today</a>, and <a href="/days-from-today/90/">90 days from today</a> give you the exact calendar date your window closes — put the date three days earlier in your phone and forget about it.</p>`,
  },
  {
    slug: 'pregnancy-weeks-to-months',
    title: "Pregnancy Weeks to Months: How the 40-Week Calendar Works",
    description: "Why pregnancy is counted as 40 weeks from the last period, how weeks map to months and trimesters, and how a due date is calculated with Naegele's rule.",
    body: `
<p>Pregnancy is measured in weeks, but everyone around you asks in months, and the two systems refuse to line up neatly. A pregnancy is <strong>40 weeks</strong>, yet everyone calls it nine months — and 40 weeks divided by four is ten. The confusion is not your arithmetic. It comes from where the count starts, what a "month" means, and the difference between a four-week month and a calendar month. Here is how the 40-week calendar actually works. One note before we start: this is general information about how dates are counted, not medical advice — questions about your own pregnancy belong with your doctor or midwife.</p>

<h2>The clock starts before conception</h2>
<p>Pregnancy weeks are counted from the <strong>first day of the last menstrual period (LMP)</strong> — not from conception. That sounds odd, because for roughly the first two weeks of the count, there is no pregnancy yet. Conception typically happens around ovulation, about <strong>two weeks after</strong> the LMP in a textbook 28-day cycle.</p>
<p>The reason is practical: most people know the date their last period started, while the exact date of conception is usually unknowable. So medicine standardized on the date everyone can actually point to. The consequence is a built-in two-week offset:</p>
<ul>
<li>"<strong>4 weeks pregnant</strong>" means roughly 2 weeks after conception — often right when a test first turns positive.</li>
<li>"12 weeks pregnant" means roughly 10 weeks of actual embryonic development.</li>
</ul>
<p>Every number in this article uses that LMP-based count, because that is what clinicians, apps, and ultrasound reports generally use.</p>

<h2>Why 40 weeks is not 10 months — or exactly 9</h2>
<p>Forty weeks is <strong>280 days</strong>. If you count in <strong>28-day months</strong> — four weeks apiece, often called "lunar months" in older obstetric tradition, though an astronomical lunar month is actually closer to 29.5 days — 280 days is exactly 10 of them, which is where "ten months" traditions come from. But calendar months average about 30.4 days, so 280 days works out to roughly <strong>9 calendar months plus about a week</strong>.</p>
<p>That is why "nine months" and "40 weeks" both circulate and both are approximately right. It is also why there is no clean weeks-to-months conversion chart: a calendar month is about 4.3 weeks, not 4. If you want a rough month figure, divide the week number by 4.3 — week 26 is about six months along, not six and a half.</p>

<h2>Trimester boundaries</h2>
<p>Pregnancy is conventionally split into three trimesters. A common division is:</p>
<ul>
<li><strong>First trimester:</strong> weeks 1–12</li>
<li><strong>Second trimester:</strong> weeks 13–27</li>
<li><strong>Third trimester:</strong> week 28 until delivery</li>
</ul>
<p>Be aware that the exact cut points vary by source — some place the end of the first trimester at week 13 or 14, and the second-to-third boundary is sometimes drawn at week 27 or 28. The boundaries are conventions for organizing care and milestones, not biological switches, so do not be surprised if your clinic's dates differ slightly from an app's. If you are trying to see when a boundary lands on a real calendar, a page like <a href="/weeks-from-today/12/">12 weeks from today</a> converts the week count into an actual date instantly.</p>

<h2>Preterm, early term, and full term</h2>
<p>The weeks near the end are graded more finely, because the distinctions matter clinically:</p>
<ul>
<li><strong>Preterm:</strong> birth before 37 weeks</li>
<li><strong>Early term:</strong> 37 through 38 weeks</li>
<li><strong>Full term:</strong> 39 through 40 weeks</li>
<li><strong>Late term:</strong> week 41, and <strong>postterm</strong> from 42 weeks</li>
</ul>
<p>These categories were tightened by obstetric organizations precisely because 37 weeks and 40 weeks are not equivalent — "term" was redefined so that <strong>full term means 39–40 weeks</strong>, not simply "made it to 37."</p>

<h2>The due date is a calculation, not a promise</h2>
<p>The classic method is <strong>Naegele's rule</strong>: take the first day of the LMP and add <strong>280 days</strong>. The traditional shortcut — add one year, subtract three months, add seven days — usually lands on the same date, though it can drift by a day or two because calendar months are not all the same length and leap years interfere (a classic example of the pitfalls covered in our guide to <a href="/guides/leap-years-and-date-math-pitfalls/">leap years and date math</a>). The rule assumes a 28-day cycle with ovulation on day 14; if your cycles run longer or shorter, the estimate shifts, which is one reason a first-trimester ultrasound is often used to confirm or adjust the date.</p>
<p>Either way, the due date is the midpoint of a range, not an appointment. Only a small minority of babies arrive on the exact date; arriving a week or two on either side of it is entirely ordinary. Treat the due date as the center of a window rather than a deadline to plan around to the day.</p>

<p>If you want to run the numbers yourself, DateSum's calculators handle the tedious part. Enter the first day of the LMP into the <a href="/days-between/">days between dates calculator</a> to see exactly how many days — and therefore weeks — have elapsed, or jump straight to <a href="/weeks-from-today/40/">40 weeks from today</a> to see where a full 280-day count lands on the calendar.</p>`,
  },
  {
    slug: 'billing-cycles-explained',
    title: "Billing Cycles: Why 'Monthly' Isn't Always 30 Days",
    description: "Why monthly billing runs 28-31 days: calendar-month renewals, date clamping, credit card grace periods, proration, and honest annual-vs-monthly price math.",
    body: `
<p>Sign up for a subscription on January 31 and the next charge usually arrives on <strong>February 28</strong> — a 28-day cycle. The charge after that might land on March 28 or March 31, depending on how the biller handles short months. "Monthly" billing almost never means "every 30 days." It means once per calendar month, and calendar months run <strong>28 to 31 days</strong>. That three-day spread explains most of the small surprises people find on their statements.</p>

<h2>"Monthly" means calendar months, not 30 days</h2>
<p>Most subscriptions anchor your billing date to the calendar day you signed up. Join on the 15th and you are charged on the 15th of every month. The gap between charges is 28, 29, 30, or 31 days depending on which month you are crossing — the biller does not care that the intervals are unequal, only that the date matches.</p>
<p>The complication is short months. There is no February 31, so a renewal anchored to the 31st gets clamped: it lands on February 28 (or February 29 in a leap year). What happens next varies by service. Many billers remember the original anchor and snap back to the 31st in March; others quietly reset your billing day to the 28th going forward. If your renewal date seems to have drifted, a February clamp is the usual culprit.</p>

<h2>Credit cards work differently: statement cycles plus a grace period</h2>
<p>Credit cards do not renew anything — they cut a statement at the end of each billing cycle, and those cycles are typically a fixed length somewhere between <strong>28 and 31 days</strong>, closing around the same day each month. Two dates matter, and they are not the same:</p>
<ul>
<li><strong>Statement close date</strong> — the day the cycle ends and your balance is totaled.</li>
<li><strong>Payment due date</strong> — the deadline to pay. In the United States, issuers must set it at least <strong>21 days</strong> after the statement is sent.</li>
</ul>
<p>The window between those dates is the grace period. On most cards, if you pay the full statement balance by the due date, purchases in that cycle accrue no interest (cash advances usually get no grace period at all — check your card's terms). One practical consequence: a purchase made the day after your statement closes rides the entire next cycle plus the grace period, so it can go roughly seven weeks before payment is actually due.</p>

<h2>How to compare annual vs monthly pricing</h2>
<p>The honest comparison is simple: multiply the monthly price by <strong>12</strong> and put it next to the annual price. Twelve monthly charges cover a full year — 365 or 366 days — exactly like one annual charge does. A $10/month plan costs $120 per year; if the annual plan is $100, you save $20, about 17%.</p>
<p>The mistake to avoid is treating a month as 30 days and computing "30 × 12 = 360 days" or a daily rate of price ÷ 30. That framework overstates the monthly plan's cost, because a real year of monthly billing buys you 365 days, not 360. The error is small — a percent or two — but it is a made-up number when the real one is just as easy to calculate.</p>

<h2>Prorated charges when you start mid-cycle</h2>
<p>Some services bill everyone on a fixed date — the 1st of the month is common — instead of your signup anniversary. Join on the 20th and your first charge is prorated: you pay for the days remaining in the current cycle, then the full price on the next cycle date. The usual formula is days remaining ÷ days in the month × the monthly price, which means the per-day rate itself changes with the month's length. Upgrades work the same way on many platforms: you get a credit for the unused portion of the old plan and a prorated charge for the new one. A first invoice that looks "wrong" is very often just proration doing its job.</p>

<h2>Practical habits that prevent billing surprises</h2>
<ul>
<li><strong>Know your exact dates.</strong> "Around the 15th" is not a date. Find the renewal date in the account settings and the statement close date on your card.</li>
<li><strong>Align renewals with payday.</strong> Many services let you change the billing date; moving renewals to just after payday smooths cash flow.</li>
<li><strong>Cancel with a buffer.</strong> Renewals fire at a specific instant, not at the end of the renewal day — and some services process them at the start of that day in their own time zone, often UTC. Policies vary, so cancel at least a full day early rather than testing the deadline.</li>
<li><strong>Watch February.</strong> Anything anchored to the 29th, 30th, or 31st will get clamped, and services differ on whether the date bounces back afterward.</li>
</ul>

<p>When the exact date matters — a trial ending, a renewal you intend to cancel, a prorated first invoice you want to check — count it rather than estimate it. Use the <a href="/months-from-today/1/">one month from today</a> calculator to see where your next renewal actually lands, <a href="/months-from-today/12/">12 months from today</a> for an annual plan, and the <a href="/days-between/">days between dates</a> calculator to verify how long a specific cycle really ran.</p>`,
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
