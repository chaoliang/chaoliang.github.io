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
  {
    slug: 'ach-wire-transfer-timing',
    title: "When Will My Transfer Arrive? ACH, Wire, and Same-Day Timing Rules",
    description: "How ACH, Same Day ACH, and wires actually schedule: Nacha cutoff windows, Fed holiday rules, and why five business days can span eight calendar days.",
    body: `
<p>"Three to five business days" is the most misleading phrase in American banking. Initiate a transfer Thursday afternoon after your bank's cutoff and the clock does not start until Friday; five business days from there lands on the <em>following</em> Friday — eight calendar days after you clicked send. Drop one Federal Reserve holiday into that span and it becomes eleven. US money movement runs on batch windows operated by the Federal Reserve and The Clearing House, and those windows close on weekends and Fed holidays. Once you know which rail your money is riding and when its cutoff falls, the arrival date stops being a guess.</p>

<h2>Four rails, four different clocks</h2>
<p>People say "transfer" for mechanisms that share almost nothing operationally.</p>
<ul>
<li><strong>ACH</strong> — batch entries governed by the Nacha Operating Rules, cleared through either the Federal Reserve's FedACH service or The Clearing House's EPN. Direct deposit, payroll, bill pay, and every app that asks you to link a bank account ride ACH.</li>
<li><strong>Same Day ACH</strong> — the same rail with additional intraday processing windows, phased in by Nacha starting September 2016. Offering it is optional for the <em>originating</em> bank but receiving it is mandatory for the <em>receiving</em> bank. That asymmetry is why you can be credited same-day at an institution that will not let you send same-day.</li>
<li><strong>Fedwire</strong> — genuine real-time gross settlement: each wire settles individually and finally on the Fed's books. <strong>CHIPS</strong>, operated by The Clearing House, gets lumped in with it but works differently — it nets payments multilaterally through the day and releases final settlement continuously against prefunded balances. Both produce irrevocable credit; neither unwinds on demand.</li>
<li><strong>RTP and FedNow</strong> — instant rails clearing in seconds, 24/7/365, holidays included. RTP launched in 2017, FedNow in July 2023. Coverage is the catch: many participating institutions are receive-only, so you may be able to accept an instant payment but not originate one.</li>
</ul>
<p>International wires get called "SWIFT," but SWIFT is a messaging network, not a settlement system. The money moves through a chain of correspondent banks, each with its own cutoff, compliance screening, and national holiday calendar.</p>

<h2>"Arrival" means three different things</h2>
<p>Most arguments about a late transfer are really disagreements about which event counts.</p>
<ul>
<li><strong>Sent</strong> — the originator handed the entry to its bank. Nothing has cleared. This is what most app screens display, and it is the least meaningful of the three.</li>
<li><strong>Settled</strong> — funds actually moved between banks. This is the legally operative moment.</li>
<li><strong>Available</strong> — your bank released the money to you. Regulation CC requires funds from electronic payments to be available no later than the business day after the banking day of receipt; banks routinely beat that ceiling. "Early direct deposit" works because the originating bank transmits the payroll file ahead of its effective entry date and the receiving bank posts against it before settlement.</li>
</ul>
<p>One widespread belief runs exactly backwards. Under the Nacha rules, ACH <em>credits</em> may be scheduled one or two banking days forward, while ACH <em>debits</em> must settle the next banking day. So when a payment app takes three days to pull money from your account, the rail is not the bottleneck — the originator is holding the transaction, typically for fraud screening or float. ACH also stays reversible in narrow circumstances: most administrative returns run two banking days from settlement, while a consumer claiming an unauthorized debit generally has 60 calendar days. That reversibility is precisely why ACH is slower than a wire.</p>

<h2>Same Day ACH: three windows, all Eastern Time</h2>
<p>Same Day ACH is not continuous processing. Nacha publishes fixed network deadlines, and missing one by a minute drops your entry into the next window — or, after the last, into the next business day.</p>
<table class="purpose-table">
<thead>
<tr><th>Window</th><th>Submission deadline (ET)</th><th>Settlement (ET)</th></tr>
</thead>
<tbody>
<tr><td>First</td><td>10:30 am</td><td>1:00 pm</td></tr>
<tr><td>Second</td><td>2:45 pm</td><td>5:00 pm</td></tr>
<tr><td>Third (added 2021)</td><td>4:45 pm</td><td>6:00 pm</td></tr>
</tbody>
</table>
<p>Two constraints trip people up. Nacha caps Same Day ACH at $1 million per entry, raised from $100,000 in March 2022; anything larger drops to standard next-day processing, often with no visible warning. And your bank sets an internal cutoff <em>earlier</em> than Nacha's so it has time to assemble and screen its file. That gap, not the network schedule, is the usual reason a payment that "should have been same day" wasn't.</p>

<h2>Wires: fast, final, and gated in the afternoon</h2>
<p>The Fedwire Funds Service opens at 9:00 pm ET on the preceding calendar day and closes at 7:00 pm ET, with an earlier 6:00 pm ET deadline for customer transfers than for bank-to-bank ones. Your bank's customer-facing cutoff is earlier still and varies by channel: online, mobile, branch, and phone often differ at one institution, and wires needing callback verification close sooner. There is no industry-standard consumer cutoff, so look yours up rather than assuming mid-afternoon.</p>
<p>A domestic wire sent before your bank's cutoff typically credits within hours. A completed wire cannot be pulled back unilaterally; recalling one requires the receiving bank's cooperation and the beneficiary's consent.</p>
<p>For international transfers, consumers have a protection worth using. The Remittance Transfer Rule under Regulation E requires covered providers to disclose the exchange rate, the fees, and <em>the date the funds will be available</em> before you pay, and to give you at least 30 minutes to cancel for a full refund. A provider that will not commit to an availability date in writing is telling you something about its correspondent chain.</p>

<h2>Federal Reserve holidays and the Saturday quirk</h2>
<p>Eleven days close Fedwire and ACH: New Year's Day, Martin Luther King Jr. Day, Washington's Birthday, Memorial Day, Juneteenth, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving, and Christmas. Three asymmetries cause real damage:</p>
<ul>
<li>Columbus Day and Veterans Day close the Fed but are ordinary working days at most private employers and on the stock exchanges — payroll teams get caught every year.</li>
<li>When a holiday falls on a <strong>Sunday</strong>, the Fed observes the following Monday and settlement stops. When it falls on a <strong>Saturday</strong>, Federal Reserve Banks stay <em>open</em> the preceding Friday, even though federal agencies close that day. Money moves on a day the government does not work.</li>
<li>The Friday after Thanksgiving is not a Fed holiday. ACH and Fedwire run normally, though bank staffing may be thinner.</li>
</ul>

<h2>Worked examples: how a five-day quote becomes a calendar week</h2>
<p>Assume standard ACH settling the next banking day, with the same-day windows missed.</p>
<table class="purpose-table">
<thead>
<tr><th>Initiated</th><th>Situation</th><th>Funds available</th><th>Calendar days</th></tr>
</thead>
<tbody>
<tr><td>Tuesday, 10:00 am</td><td>Before cutoff, no holiday</td><td>Wednesday morning</td><td>1</td></tr>
<tr><td>Friday, 6:00 pm</td><td>After cutoff, enters Monday's file</td><td>Tuesday morning</td><td>4</td></tr>
<tr><td>Friday before Memorial Day, 6:00 pm</td><td>After cutoff; Monday is a Fed holiday</td><td>Wednesday morning</td><td>5</td></tr>
<tr><td>Wednesday, quoted five business days</td><td>One weekend intervenes</td><td>Following Wednesday</td><td>7</td></tr>
<tr><td>Thursday before Thanksgiving week, quoted five business days</td><td>Thanksgiving Thursday is a Fed holiday; a weekend intervenes</td><td>Following Friday</td><td>8</td></tr>
<tr><td>Domestic wire, Friday 4:45 pm before a Monday holiday</td><td>Past the bank's cutoff; Fedwire closed Monday</td><td>Tuesday</td><td>4</td></tr>
</tbody>
</table>
<p>Two habits follow. Count the business days yourself rather than trusting an app's estimated date; those estimates are often generated before the cutoff is evaluated. And for anything with a hard deadline — a closing, an estimated tax payment, a wire to a title company — initiate a full business day early and confirm settlement independently. Payment fraud lives in the gap between "sent" and "final," and a wire is final.</p>

<p>To pin down a real date, use <a href="/business-days-from-today/5/">5 business days from today</a> to see where a "3 to 5 business day" quote lands, <a href="/business-days-from-today/2/">2 business days from today</a> for an ACH return deadline, <a href="/days-from-today/60/">60 days from today</a> for the unauthorized-debit dispute window, and <a href="/days-between/">days between two dates</a> to measure a gap you have already observed. The guide on <a href="/guides/how-to-count-business-days/">how to count business days</a> covers the weekend and holiday rules behind all of it.</p>`,
  },
  {
    slug: 'court-filing-deadlines',
    title: "How Court Deadlines Count Days (and Why Rule 6 Matters)",
    description: "How FRCP Rule 6(a) counts federal deadlines: skip day one, count weekends, roll the last day, add three for mail — with dated 2026 worked examples.",
    body: `
<p>Federal Rule of Civil Procedure 6(a) governs every "time period specified in these rules, in any local rule or court order, or in any statute that does not specify a method of computing time" — most deadlines in a federal civil case. The method is mechanical, and it defeats intuition. It also changed on December 1, 2009, so anything written earlier describes a method that no longer exists. This is a counting convention, not legal advice; real deadlines also turn on local rules and standing orders.</p>

<h2>The three steps of Rule 6(a)(1)</h2>

<p>For a period stated in days or a longer unit, Rule 6(a)(1) gives three instructions in order:</p>

<ul>
<li><strong>Exclude the day of the triggering event.</strong> Served Tuesday, Wednesday is day 1.</li>
<li><strong>Count every intervening day</strong> — Saturdays, Sundays, and legal holidays included. Since 2009 there is no business-day carve-out for short periods.</li>
<li><strong>Include the last day, unless it is a Saturday, Sunday, or legal holiday</strong>; then the period runs to the end of the next day that is none of those. This cascades: a Saturday deadline ends up on Tuesday if that Monday is a federal holiday.</li>
</ul>

<p>"Legal holiday" in Rule 6(a)(6) is narrower than people assume. Subsection (A) lists eleven federal holidays: New Year's Day, Martin Luther King Jr.'s Birthday, Washington's Birthday, Memorial Day, Juneteenth (added by amendment after Congress created the holiday in 2021), Independence Day, Labor Day, Columbus Day, Veterans' Day, Thanksgiving Day, and Christmas Day. Subsection (B) covers any day the President or Congress declares a holiday. Subsection (C) adds days declared a holiday by the state where the district court sits — <em>but only for periods measured forward from an event</em>. So Good Friday and the day after Thanksgiving, absent from the federal list, move a federal deadline only through route (C), only where the state has declared them holidays, and never on a backward count.</p>

<h2>Why pre-2009 guidance gets this wrong</h2>

<p>Before December 1, 2009, Rule 6(a) had a length-dependent switch: periods of less than 11 days excluded intermediate Saturdays, Sundays, and legal holidays, while longer periods counted every day.</p>

<p>The 2009 amendments deleted the switch and rewrote deadlines throughout the rules into multiples of seven, so the shorter effective time would not prejudice anyone. Ten-day periods generally became 14 and 20-day periods became 21; Rule 12(a)'s answer deadline went from 20 to 21 days; motions under Rules 50(b), 52(b), and 59(e) went from 10 days to 28.</p>

<p>That redesign has an exploitable side effect: 7, 14, 21, and 28 are multiples of seven, so a forward-counted period of one of those lengths <em>always lands on the same weekday as the trigger</em>. Served on a Thursday, your 21-day answer is due on a Thursday and can never fall on a weekend; only a legal holiday moves it. Periods of 30, 60, or 90 days have no such protection: 60 days from January 15 ends March 16 in a common year but March 15 in a leap year, one of the traps in our <a href="/guides/leap-years-and-date-math-pitfalls/">guide to leap years and date-math pitfalls</a>. For genuine business-day counting, see <a href="/guides/how-to-count-business-days/">how to count business days</a>.</p>

<h2>Worked examples</h2>

<table class="purpose-table">
<thead>
<tr><th>Period</th><th>Trigger</th><th>Raw count</th><th>Deadline</th><th>Why it moved</th></tr>
</thead>
<tbody>
<tr><td>21 days to answer, Rule 12(a)(1)(A)(i)</td><td>Fri, Mar 6, 2026</td><td>Fri, Mar 27, 2026</td><td>Fri, Mar 27, 2026</td><td>Multiple of seven: same weekday</td></tr>
<tr><td>14 days to object to a magistrate judge's report, Rule 72</td><td>Mon, May 11, 2026</td><td>Mon, May 25, 2026</td><td>Tue, May 26, 2026</td><td>Day 14 is Memorial Day</td></tr>
<tr><td>30 days for a notice of appeal, FRAP 4(a)(1)(A)</td><td>Thu, Jan 15, 2026</td><td>Sat, Feb 14, 2026</td><td>Tue, Feb 17, 2026</td><td>Saturday rolls to Monday, which is Washington's Birthday</td></tr>
<tr><td>14 days to respond, served by mail, Rules 6(a) and 6(d)</td><td>Thu, Sep 24, 2026</td><td>Thu, Oct 8; plus 3 = Sun, Oct 11</td><td>Tue, Oct 13, 2026</td><td>Sunday rolls to Monday, which is Columbus Day</td></tr>
<tr><td>Motion served 14 days before hearing, Rule 6(c)(1)(A)</td><td>Hearing Mon, Jun 8, 2026</td><td>Mon, May 25, 2026</td><td>Fri, May 22, 2026</td><td>Backward count: Memorial Day pushes it <em>earlier</em>, past the weekend</td></tr>
</tbody>
</table>

<h2>The three added days, and what changed in 2016</h2>

<p>Rule 6(d) adds three days when a party may or must act within a specified time after being served and service was by mail under Rule 5(b)(2)(C), by leaving the paper with the clerk under (D), or by other consented-to means under (F). Three details cause most errors:</p>

<ul>
<li><strong>The three days come after the Rule 6(a) computation, not before it.</strong> Compute the base period with any rollover, add three calendar days, then roll again if you land on a Saturday, Sunday, or legal holiday.</li>
<li><strong>Electronic service no longer earns the three days in federal court.</strong> Effective December 1, 2016, service through the court's e-filing system — Rule 5(b)(2)(E) — was struck from the Rule 6(d) list because it is instantaneous; FRAP 26(c) was amended the same way. Pre-2017 guidance still tells you to add three days for e-service.</li>
<li><strong>Rule 6(d) reaches only periods that run from service.</strong> The 28-day clock for a Rule 59(e) motion runs from entry of judgment, so nothing is added however the judgment reached you.</li>
</ul>

<h2>Hours, backward counting, and when the day ends</h2>

<p>Rule 6(a)(2) handles hour-based periods differently: counting starts <em>immediately</em> on the trigger, every hour counts, and a period ending on a Saturday, Sunday, or legal holiday runs to the same time on the next day that is not one of those.</p>

<p>Rule 6(a)(5) defines "next day" by direction of travel: forward for periods measured after an event, backward for periods measured before one. For "at least 14 days before the hearing," a weekend or holiday makes the deadline <em>earlier</em>, as the last table row shows. You lose days rather than gain them.</p>

<p>Rule 6(a)(4) sets when the last day ends: for electronic filing, midnight <em>in the court's time zone</em>, so counsel in Los Angeles filing in the Southern District of New York is late at 9:00 p.m. Pacific; otherwise, when the clerk's office is scheduled to close. A statute, local rule, or standing order may set an earlier time. Under Rule 6(a)(3), an inaccessible clerk's office — weather, shutdown, building emergency — extends the period to the first accessible day.</p>

<p>Two related traps. Rule 6(b)(2) bars any extension of time under Rules 50(b) and (d), 52(b), 59(b), (d), and (e), and 60(b), whatever the cause. And the appeal clock runs from <em>entry</em> of judgment on the civil docket, not the date typed on the order; where Rule 58 requires a separate document that never gets entered, FRAP 4(a)(7) and Rule 58(c)(2) deem judgment entered 150 days after the docket entry.</p>

<h2>State courts do not follow Rule 6 automatically</h2>

<p>Most state statutes track Rule 6(a)'s basics. The divergence is in service extensions and units:</p>

<ul>
<li><strong>California</strong> computes time under Code of Civil Procedure § 12 and extends it under § 1013: five calendar days for mail within California, ten elsewhere in the United States, twenty abroad. It also mixes units: § 1010.6 adds <em>two court days</em> for electronic service, and § 1005(b) requires moving papers served at least 16 <em>court days</em> before the hearing.</li>
<li><strong>New York</strong> uses General Construction Law § 25-a for the rollover and CPLR § 2103(b) for service: five days for mail, one business day for overnight delivery.</li>
</ul>

<p>California's e-service extension outlived the 2016 federal change, so never carry a federal answer across a state line. Rule 6(a) also yields to any statute that prescribes its own method of computing time.</p>

<p>To check the arithmetic, our <a href="/days-between/">days between two dates calculator</a> counts inclusive and exclusive spans, <a href="/days-from-today/30/">30 days from today</a> gives the plain calendar result before any rollover, and <a href="/business-days-from-today/14/">14 business days from today</a> handles genuine weekend exclusion. Verify the result against the court's calendar and local rules.</p>`,
  },
  {
    slug: 'probation-periods-and-90-day-rules',
    title: "90-Day Probation Periods: How to Count Them Correctly",
    description: "Why 90 days and three months differ by up to three days, which day counts as day one, and how probation, benefits and notice clocks run separately.",
    body: `
<p>Adding 90 days to a hire date looks like the simplest arithmetic in HR. It goes wrong because three clocks — probation, the benefits waiting period, and notice — start on different days, run in different units, and end under different rules. A day or two of drift decides whether a dismissal lands inside the trial period, and whether a health plan's waiting period is lawful.</p>

<h2>Day zero: which day is day one</h2>

<p>Most probation-date arguments come down to an unstated counting convention. Both are defensible:</p>

<ul>
<li><strong>Inclusive.</strong> The first day worked is day 1, so a 90-day probation starting Monday 5 January 2026 runs through the end of Saturday 4 April 2026. This is what handbooks usually mean by "the first 90 days of employment."</li>
<li><strong>Exclusive.</strong> The hire date is day 0, so "90 days from 5 January 2026" lands on Sunday 5 April 2026. This is the default in most date calculators and in "X days from the date of this notice" clauses.</li>
</ul>

<p>The two answers are always exactly one day apart — harmless until the day it matters. Two wrinkles compound it. The hire date in the HRIS is often not the date in the offer letter: if the offer says "start Monday 5 January" and that day is a company holiday, some systems record the first day physically worked instead. And on temp-to-perm conversions, agency time usually does not carry over: in the UK, twelve weeks in a role triggers equal-treatment rights on pay under the Agency Workers Regulations 2010, but continuous employment with the hirer starts at direct hire.</p>

<h2>"90 days" and "three months" are not the same period</h2>

<p>Three consecutive calendar months contain 89 to 92 days depending on which months they cross, so the gap is systematic rather than random. Under inclusive counting, three months is never shorter than 90 days — it runs 0 to 3 days longer. Under exclusive counting, it ranges from one day shorter to two days longer.</p>

<table class="purpose-table">
<tr><th>Start date (day 1)</th><th>Day 90 (inclusive)</th><th>Same date + 3 months</th><th>Difference</th></tr>
<tr><td>Mon 5 Jan 2026</td><td>Sat 4 Apr 2026</td><td>Sun 5 Apr 2026</td><td>3 months is 1 day longer</td></tr>
<tr><td>Mon 2 Feb 2026</td><td>Sat 2 May 2026</td><td>Sat 2 May 2026</td><td>identical</td></tr>
<tr><td>Mon 2 Mar 2026</td><td>Sat 30 May 2026</td><td>Tue 2 Jun 2026</td><td>3 months is 3 days longer</td></tr>
<tr><td>Wed 1 Dec 2027</td><td>Mon 28 Feb 2028</td><td>Wed 1 Mar 2028</td><td>3 months is 2 days longer (leap year)</td></tr>
</table>

<p>The February 2026 row matches by coincidence, which is why the problem stays invisible until a case lands on a different month. Month arithmetic also has to clamp: three months from 30 November 2026 ends 28 February 2027, but from 30 November 2027 it ends 29 February 2028. If your policy is written in months, decide in writing what happens when the target day-of-month does not exist — see <a href="/guides/leap-years-and-date-math-pitfalls/">leap years and date math pitfalls</a>.</p>

<h2>Calendar days is the norm, and little pauses the clock</h2>

<p>Unless the contract says otherwise, probation runs in calendar days: weekends, public holidays, shutdowns and sick days all count. Do not quietly convert to business days — ninety business days from Monday 5 January 2026 ends Friday 8 May, 124 calendar days and roughly 38% longer than intended. If you genuinely want working days, count them deliberately using <a href="/guides/how-to-count-business-days/">how to count business days</a>.</p>

<p>Whether absence suspends probation varies sharply by jurisdiction:</p>

<ul>
<li><strong>France</strong> extends the <em>période d'essai</em> day for day for absences — paid leave, sick leave, unpaid days. A trial period that looks expired on the calendar may still be running.</li>
<li><strong>Germany</strong> does not automatically extend the <em>Probezeit</em> for illness; the clock runs regardless unless the parties agreed otherwise.</li>
<li><strong>US and UK</strong> employers have no default suspension rule. If you want probation to pause during a leave, the handbook must say so — and applying it to protected leave invites a discrimination argument.</li>
</ul>

<h2>The benefits clock is a different clock</h2>

<p>In the US, the Affordable Care Act caps a group health plan's waiting period at 90 days, counted in calendar days including weekends and holidays, with coverage effective no later than the 91st day. Where the employee meets the plan's eligibility conditions on the hire date, day 1 is the hire date. A plan may add a bona fide orientation period of up to one month <em>before</em> that clock starts — the only lawful way to push the effective date further out.</p>

<p>This is where "coverage begins the first of the month following 90 days" causes trouble. For a 5 January hire, day 91 is 5 April, but the first of the following month is 1 May — 26 days past the deadline. That design only complies when day 90 lands on a month end, roughly one start date in thirty. The usual compliant alternatives are "first of the month following 60 days" and "first of the month following date of hire."</p>

<h2>What probation actually does — and doesn't do</h2>

<p>In most US states employment is at will, so completing probation does not change the legal standard for dismissal. Probation there is a process device: it sets expectations and forces a structured review. The risk runs the other way — handbook language implying that confirmed employees may only be dismissed "for cause" can undercut at-will status, which is why careful handbooks pair the probation clause with an at-will disclaimer. Montana is the exception: its wrongful-discharge statute makes discharge during a probationary period at will and supplies a default period when the employer sets none — raised from six to twelve months in 2021.</p>

<p>Elsewhere, probation interacts with statutory protection:</p>

<ul>
<li><strong>UK:</strong> probation is purely contractual, typically three to six months with shortened notice. Unfair-dismissal protection has turned on two years' continuous service, not probation status; legislated day-one protection with a statutory initial period is being phased in and was not expected before 2027, so confirm the position.</li>
<li><strong>Germany:</strong> a <em>Probezeit</em> of up to six months allows two weeks' notice under §622(3) BGB, and KSchG dismissal protection generally begins after six months' service in establishments above the small-employer threshold — hence the near-universal six months.</li>
<li><strong>China:</strong> the Labour Contract Law ties maximum probation to contract length: none under three months, one month up to a year, two months for one-to-three-year contracts, six months for longer and open-ended contracts. Only one probation period is permitted per employer–employee pair, and probation pay has a statutory floor.</li>
<li><strong>EU generally:</strong> the Transparent and Predictable Working Conditions Directive caps probation at six months and requires proportionality for fixed-term contracts — a six-month contract cannot carry a six-month trial.</li>
</ul>

<h2>Extensions and end-of-probation timing</h2>

<p>Once probation lapses, it is gone: an extension agreed after the end date is generally ineffective, because the clause it extends has already been spent. Put the extension in writing, deliver it before the last day of the original period, state the new end date as an explicit calendar date rather than "another three months," and confirm the contract or collective agreement permits extension at all. France is the strict case: renewal must be allowed by the applicable branch agreement <em>and</em> the contract, and agreed before the initial period expires.</p>

<p>The same discipline applies to dismissal timing. Check whether your contract requires notice to be <em>given</em> before probation ends or employment to <em>terminate</em> before it ends — very different deadlines when notice is a week or a month, and only one is satisfied by a meeting on the final day. Work backwards from the probation end date, not forwards from the review meeting.</p>

<p>Use <a href="/days-from-today/90/">90 days from today</a> for a probation end date, <a href="/months-from-today/3/">3 months from today</a> to see how far the month-based version diverges, and <a href="/days-between/">days between two dates</a> to audit a hire date against the end date in your HR system.</p>`,
  },
  {
    slug: 'medication-course-day-counting',
    title: "Counting a Medication Course: Day 1, Doses, and Refills",
    description: "How medication day counts actually work: inclusive Day 1, days supply vs days elapsed, 28/30/31-day pack drift, and refill-too-soon thresholds.",
    body: `
<p>Prescription date math looks trivial until you need an actual date. If a prescriber says "take this for 10 days starting today," what is the last dose day? If you filled a 30-day supply on the 2nd, when will your insurer pay for the refill? These are counting problems, and they run on the opposite convention from legal deadlines. This page covers the arithmetic only: what to take, what to do about a missed dose, and whether a course can stop early all belong to your pharmacist or prescriber.</p>

<h2>Day 1 is today: medication counting is inclusive</h2>

<p>Rule 6(a)(1)(A) of the US Federal Rules of Civil Procedure excludes the day of the triggering event, so "within 10 days of service" starts counting the day after service. Medication counting is the reverse: the day of the first dose is day 1. A 10-day course begun on a Monday ends the following Wednesday, not Thursday.</p>

<ul>
<li><strong>Last dose day</strong> = start date + (days − 1). A 10-day course starting March 2 ends March 11, because March 2 through March 11 inclusive is 10 days.</li>
<li><strong>First day without medication</strong> = start date + days. That same course leaves you clear from March 12.</li>
<li>A generic "what is 10 days from today" calculator returns March 12 — the day <em>after</em> the last dose. Ask it for 9 days when you want the final dose date.</li>
</ul>

<p>The anchor is not universal. "Day 3 of antibiotics" in a chart note treats the first calendar day as day 1, even if that day held only an evening dose. Post-exposure vaccine schedules run the other way, written as day 0, 3, 7, 14 — the first dose is day 0, so the four visits span 15 calendar days. Read which anchor a document uses rather than assuming; the two differ by exactly one day.</p>

<h2>Days supply is a dose count, not a calendar span</h2>

<p>The "days supply" attached to a US prescription is calculated, not observed: quantity dispensed divided by the maximum daily dose the directions allow. Thirty tablets with "one tablet twice daily" is a 15-day supply. Thirty tablets with "one to two tablets daily as needed" is also a 15-day supply, because the maximum drives the math — even though taking one a day stretches the bottle to 30.</p>

<p>The insurer's clock runs on days supply from the fill date; your bottle runs on how fast you actually use it. Take a PRN drug below the maximum and the bottle outlasts the days supply — the insurer's arithmetic does not notice.</p>

<p>Three conventions that are not universal:</p>

<ul>
<li>Products dosed by volume, weight, or actuation — insulin, inhalers, eye drops, creams — get estimated days supply from package conventions, not clean division. A 200-actuation inhaler at two puffs twice daily is four puffs a day, so 50 days.</li>
<li>Fixed-regimen packs carry their own days supply regardless of tablet count. A 6-tablet azithromycin pack covers 5 days because day 1 takes two tablets; a 21-tablet methylprednisolone dose pack covers 6 days on a descending taper. Tablet count divided by "one daily" is wrong for both.</li>
<li>UK NHS dispensing has no equivalent field driving a payer edit: quantity and directions sit on the label, and early-supply limits follow pharmacy and national policy rather than a percentage threshold.</li>
</ul>

<h2>Common course lengths, worked</h2>

<p>Every row counts inclusively from a first dose on Monday, March 2, 2026. Substitute your own start date; the offsets hold.</p>

<table class="purpose-table">
<thead>
<tr><th>Course</th><th>Last dose day</th><th>First day clear</th><th>Offset to add</th></tr>
</thead>
<tbody>
<tr><td>3-day course</td><td>Wed Mar 4</td><td>Thu Mar 5</td><td>+2 days</td></tr>
<tr><td>5-day course</td><td>Fri Mar 6</td><td>Sat Mar 7</td><td>+4 days</td></tr>
<tr><td>7-day course</td><td>Sun Mar 8</td><td>Mon Mar 9</td><td>+6 days</td></tr>
<tr><td>10-day course</td><td>Wed Mar 11</td><td>Thu Mar 12</td><td>+9 days</td></tr>
<tr><td>14-day course</td><td>Sun Mar 15</td><td>Mon Mar 16</td><td>+13 days</td></tr>
<tr><td>21-day course</td><td>Sun Mar 22</td><td>Mon Mar 23</td><td>+20 days</td></tr>
<tr><td>28-day cycle</td><td>Sun Mar 29</td><td>Mon Mar 30</td><td>+27 days</td></tr>
<tr><td>30-day supply</td><td>Tue Mar 31</td><td>Wed Apr 1</td><td>+29 days</td></tr>
<tr><td>90-day supply</td><td>Sat May 30</td><td>Sun May 31</td><td>+89 days</td></tr>
</tbody>
</table>

<p>The 7, 14, 21, and 28-day rows are whole weeks, so the last dose always lands the day before your start weekday. That is a free sanity check: a 14-day course beginning Monday that does not end on a Sunday has been miscounted.</p>

<h2>Why "one month" drifts off the calendar</h2>

<p>Twelve fills of 30 days cover 360 days, not 365. Refill the moment each supply runs out and you need about 12.17 fills a year, so the fill date walks backward roughly five days annually: fill on January 15 and you are filling around January 10 the next year. That is how a maintenance drug produces a thirteenth copay in a year nobody budgeted for. Four 90-day fills drift the same 360 days, spread over four events instead of twelve.</p>

<p>Cycle-based packs drift differently again:</p>

<ul>
<li><strong>28-day cycle:</strong> exactly four weeks, so every pack starts on the same weekday — that anchor is the design intent. The date moves earlier each cycle: start January 5, the last day is February 1, so the next pack starts February 2, not February 5. Thirteen cycles is 364 days, making a full year 13 packs, not 12.</li>
<li><strong>30-day supply:</strong> 30 is not divisible by 7, so the start weekday advances two positions per cycle and never settles.</li>
<li><strong>Calendar month:</strong> date-stable, weekday rotates, exactly 12 per year, but the span it covers swings between 28 and 31 days.</li>
</ul>

<p>A 21-day-plus-7-day-break regimen totals 28 days, so it behaves like the first row despite holding 21 units. When a schedule says "one pack a month," find out which of the three it means — they diverge by days within one quarter.</p>

<h2>Refill-too-soon thresholds and when to reorder</h2>

<p>US pharmacy benefit managers reject early refills at the point of sale with a "refill too soon" edit keyed to the percentage of days supply consumed, not to the bottle being empty. Thresholds commonly sit near 75–80% for a 30-day supply and 80–85% for a 90-day supply, but no number is universal: each plan, state Medicaid program, and drug class sets its own, and controlled substances are often held to a stricter percentage or a hard interval with no early window at all.</p>

<p>Worked: a 30-day supply filled March 2 at a 75% threshold clears once 22 days have elapsed, around March 24. A 90-day supply at 80% opens near day 72, or May 13. Some plans measure days elapsed since the last fill; others track a running balance across every fill of the same drug, so one approved early fill shortens the next window. A rejection message usually carries the date the plan will accept — that date is the plan's arithmetic, and it outranks yours.</p>

<ul>
<li><strong>Run-out date</strong> = fill date + days supply − 1. Your last covered day.</li>
<li><strong>Eligible date</strong> = fill date + (days supply × threshold), rounded down. Earliest the claim pays.</li>
<li>Reorder between those two dates, 3–5 days before run-out — earlier for mail order, controlled substances needing a fresh prescription, or a prior authorization renewal.</li>
<li>Check whether run-out lands on a weekend or public holiday. A prescriber's office closed on Friday afternoon is the most common cause of a gap.</li>
<li>Travelling? A vacation override usually has to be requested before you leave, not from the airport.</li>
</ul>

<p>To run your own dates: <a href="/days-between/">days between two dates</a> for the gap from fill to run-out, <a href="/days-from-today/30/">30 days from today</a> or <a href="/days-from-today/90/">90 days from today</a> to project a supply forward, and <a href="/business-days-from-today/5/">5 business days from today</a> when the constraint is a prescriber's office answering before the weekend. For February oddities, see <a href="/guides/leap-years-and-date-math-pitfalls/">leap years and date math pitfalls</a>.</p>`,
  },
  {
    slug: 'notice-periods-and-lease-endings',
    title: "Notice Periods: How to Count Backwards Without Missing the Deadline",
    description: "Count notice periods backwards: why 30 days, one month and end-of-period are different dates, and how to find your last safe send date.",
    body: `
<p>Most deadlines run forward: a bill is due in 30 days, a project ships in six weeks. Notice periods run the other way. The date that matters is fixed — a lease renewal, a policy anniversary, a last day of employment — and you work backwards to a send date you calculate yourself. Backward counting bites in a specific way: you learn you were late only after the thing you tried to stop has renewed.</p>

<h2>"30 days," "one month," and "end of the period" are three different dates</h2>

<p>Leases and contracts treat these as interchangeable. They are not.</p>

<ul>
<li><strong>30 days</strong> is a fixed count of calendar days. Notice on 31 January 2026 lands 30 days later on Monday 2 March 2026 — a third month.</li>
<li><strong>One month</strong> uses the corresponding-date rule: the same day number in the following month, and where that number does not exist, the last day of that month. One month from 31 January 2026 is 28 February — 28 days. One month from 31 March is 30 April. Lord Diplock set this out for English law in <em>Dodds v Walker</em> (House of Lords, 1981); German law codifies the same fallback at BGB §188(3). So "one month" runs anywhere from 28 to 31 days. More month-end traps: the <a href="/guides/leap-years-and-date-math-pitfalls/">leap year and date math pitfalls guide</a>.</li>
<li><strong>Notice expiring at the end of the period</strong> is not a duration at all. Under the common-law rule for a periodic (month-to-month) tenancy, notice ends the tenancy at the close of the next full rental period, not 30 days later. Serve on 2 September and the tenancy runs to 31 October — you owe October's rent. Several US statutes displace it, so never assume it applies.</li>
<li><strong>Clear days</strong> (English company and court practice — Companies Act 2006 section 360, Civil Procedure Rules 2.8(3)) excludes both the day of service and the day of the event. Fourteen clear days before a meeting on the 20th means service by the 5th, not the 6th.</li>
</ul>

<h2>The lease trap: your deadline is the rent due date, not the move-out date</h2>

<p>Where that rule applies, the costly misreading is treating "30 days' notice" as "30 days before I hand back the keys." The lease requires that written notice be <em>received</em> before the next rent due date, the tenancy then ending at the close of the following period. Rent due on the 1st, moving out end of September 2026: your deadline is Monday 31 August. If the office closes at 5pm and your notice lands in the after-hours drop box, it may be stamped 1 September. That one day costs a month's rent.</p>

<p>The statutory floor varies sharply. Where a contract beats the statute it usually governs; where it falls short the statute wins.</p>

<ul>
<li><strong>California</strong> (Civil Code §1946.1): 60 days from a landlord where any tenant has occupied a year or more, 30 days otherwise; a tenant gives at least the length of the periodic term. Critically, the period runs from service, <em>not</em> from a rent due date.</li>
<li><strong>New York</strong>: Real Property Law §226-c scales a landlord's non-renewal notice by tenancy length — 30, 60 or 90 days at the one- and two-year marks. Section 232-b keeps a true period-boundary rule for month-to-month tenancies outside New York City.</li>
<li><strong>England and Wales</strong>: a tenant's notice to quit a dwelling needs at least four weeks in writing with prescribed information (Protection from Eviction Act 1977, section 5), and must expire at the end of a rental period. The landlord side was rewritten by the Renters' Rights Act 2025 — verify what is in force before trusting an older Section 21 figure.</li>
<li><strong>Germany</strong> (BGB §573c): tenant notice received by the third working day of a calendar month ends the tenancy at the close of the month after next.</li>
</ul>

<h2>Auto-renewal windows have two edges</h2>

<p>Subscriptions and service contracts renew unless notice lands inside a defined window. "Not less than 90 and not more than 120 days prior to the renewal date" makes notice sent five months early as void as notice sent late.</p>

<p>Some jurisdictions make the vendor remind you. New York's General Obligations Law §5-903 makes an automatic-renewal clause unenforceable in contracts for service, maintenance or repair of property unless the provider gives written notice — personally or by certified mail, 15 to 30 days before your cancellation deadline — flagging the clause. California's Automatic Renewal Law adds its own disclosure and easy-cancellation duties. Neither is a general backstop, and there is no federal one: the FTC's "click to cancel" rule was vacated by the Eighth Circuit in July 2025 before taking effect.</p>

<h2>Sending is not receiving</h2>

<p>Most notice clauses turn on <em>receipt</em>. A deemed-service clause controls the arithmetic; the English Civil Procedure Rules, for instance, deem first-class post served on the second day after posting (rule 6.26). If the contract is silent, assume actual receipt is required and that you must prove it. A USPS Certificate of Mailing shows you sent something, not that it arrived; Certified Mail with Return Receipt yields a signature; a courier gives a timestamped scan. Email alone is weak unless the clause permits it and names an address.</p>

<h2>Computing the last safe send date</h2>

<ul>
<li>Fix the anchor: renewal date, period end, or move-out.</li>
<li>Identify the unit: calendar days, business days, months, or period boundaries.</li>
<li>Count backwards to the <strong>receipt deadline</strong>. The <a href="/days-between/">days between dates calculator</a> checks the gap in both directions.</li>
<li>If it lands on a weekend or holiday, <strong>move it earlier</strong>, not later. Federal Rule of Civil Procedure 6(a)(5) states it for court deadlines: the "next day" is found by counting forward when a period runs after an event and backward when it runs before one. Boilerplate extending deadlines "to the next business day" was written for forward ones; applied here it shortens the notice you owe.</li>
<li>Subtract deemed service or realistic transit, roll off weekends again, then add a two- to three-day buffer.</li>
</ul>

<table class="purpose-table">
<thead>
<tr><th>Anchor date</th><th>Notice requirement</th><th>Receipt deadline</th><th>Delivery method</th><th>Last safe send date</th></tr>
</thead>
<tbody>
<tr><td>Renewal Fri 1 Jan 2027</td><td>90 calendar days</td><td>Sat 3 Oct 2026, roll back to Fri 2 Oct</td><td>Certified mail, allow 5 days</td><td><strong>Fri 25 Sep 2026</strong></td></tr>
<tr><td>Renewal Mon 1 Mar 2027</td><td>30 business days</td><td>Thu 14 Jan 2027 (see note)</td><td>Courier, next business day</td><td><strong>Wed 13 Jan 2027</strong></td></tr>
<tr><td>Last working day Thu 31 Dec 2026</td><td>Three months to a month end</td><td>Wed 30 Sep 2026</td><td>Email plus signed hard copy</td><td><strong>Wed 30 Sep 2026</strong></td></tr>
<tr><td>German tenancy ending Sat 31 Oct 2026</td><td>BGB §573c, third working day of August</td><td>Tue 4 or Wed 5 Aug 2026 (see note)</td><td>Hand delivery, witnessed</td><td><strong>Fri 31 Jul 2026</strong></td></tr>
</tbody>
</table>

<p>Both marked rows reward checking. A weekday-only count back from 1 March 2027 lands on Monday 18 January; the two federal holidays in range — Martin Luther King Jr. Day on 18 January and Presidents' Day on 15 February — pull the deadline to Thursday 14 January, four calendar days earlier. Check it with <a href="/business-days-from-today/30/">30 business days from today</a> and the <a href="/guides/how-to-count-business-days/">guide to counting business days</a>. In the German row, <em>Werktag</em> ordinarily includes Saturday, making Tuesday 4 August the third working day; practice is unsettled on whether Saturday counts here, and excluding it gives Wednesday 5 August. Do not litigate a contested rule in advance: deliver by the last day of the previous month and it never arises.</p>

<p>Employment notice is rarely symmetric: under the UK's Employment Rights Act 1996 section 86, the minimum an employer owes rises with service — a week per year, capped at twelve — while an employee's stays at one week. In the US, employment is at-will everywhere except Montana, so the customary two weeks is a norm, not a legal duty. And diarise the <em>send</em> date, never the deadline — a reminder firing on the deadline tells you only that you are already too late.</p>`,
  },
  {
    slug: 'shipping-and-delivery-estimates',
    title: "Why \"3-5 Business Days\" Delivery Never Means 5 Days",
    description: "Why '3-5 business days' never means five calendar days: handling time, dispatch cutoffs, carrier weekend rules, holidays, and customs delays.",
    body: `
<p>A store promises "3-5 business days." You order Thursday afternoon. Five days later the tracking page still says a label was created. Nothing has gone wrong: that phrase is a transit estimate on a clock that had not started yet, counted in a calendar that skips two days out of every seven.</p>

<h2>Three dates, not one</h2>
<p>Every shipment has three dates; buyers see the first and the last:</p>
<ul>
<li><strong>Order date</strong> — when you paid. Carriers have no idea this date exists.</li>
<li><strong>Dispatch date</strong> — when the parcel is handed to the carrier and gets its origin scan. The transit clock starts here.</li>
<li><strong>Delivery date</strong> — the only one you care about.</li>
</ul>
<p>The gap between the first two is <em>handling time</em>, a number the merchant sets. eBay and Etsy require a stated handling or processing time on every listing; most other sites bury it in a shipping FAQ as "orders ship within 1-2 business days." That sentence, not the carrier estimate, is where most of your waiting happens.</p>
<p>Worse, the "Your order has shipped!" email usually fires when the <em>label is purchased</em>, not when the box moves. The tracking states say so plainly: USPS shows "Shipping Label Created, USPS Awaiting Item," UPS shows "Label Created," FedEx shows "Shipment information sent to FedEx." A Friday-evening confirmation often means a Monday pickup. Count from the first <em>origin scan</em>, not from the email.</p>

<h2>The cutoff time nobody tells you about</h2>
<p>Warehouses have a daily dispatch cutoff tied to the carrier's scheduled pickup, usually early-to-mid afternoon local time. An order at 2:59pm rides today's truck; an order at 3:01pm does not. Amazon's "Order within 4 hrs 12 mins" countdown is that cutoff, nothing more.</p>
<p>Two traps follow. Cutoffs run on the <em>warehouse's</em> local time, not yours: a 2pm PT cutoff is 5pm ET, so an East Coast buyer ordering at 4:30pm still makes it. And weekend orders collapse — few warehouses pick on weekends, so Friday-evening, Saturday, and Sunday orders all dispatch Monday.</p>
<p>Handling time has no shared convention, so read the wording. "Ships within 1 business day" means same-day dispatch for a before-cutoff order at some warehouses and next-business-day dispatch at others. On eBay the clock starts the first business day after payment clears, so one-day handling on a Friday-night order is a Monday dispatch.</p>

<h2>Whose business days? Ground and air count differently</h2>
<p>"Business days" for a carrier means Monday through Friday minus the holidays <em>that carrier</em> observes, and two details catch people out. First, weekend delivery has expanded faster than quoted transit has. UPS delivers Ground residential parcels on Saturday across much of the US; FedEx delivers residential Saturday broadly and Sunday in selected markets only. UPS's Time in Transit tool shows a Saturday date where that service runs, but the generic "3-5 business days" at checkout does not — treat a weekend arrival as a bonus. USPS is the exception: Saturday is a normal delivery day, so Ground Advantage and Priority Mail estimates genuinely land on one.</p>
<p>Second, and more painful, <em>express</em> air counts in business days too. FedEx 2Day and UPS 2nd Day Air shipped Thursday deliver <strong>Monday</strong>. Saturday delivery on those services is a paid add-on, not the default. "Two-day shipping" bought Thursday is four calendar days.</p>
<p>Holiday calendars diverge too. USPS closes for every federal holiday; UPS and FedEx work through Veterans Day and Columbus Day / Indigenous Peoples' Day. All three close for New Year's Day, Memorial Day, Independence Day, Labor Day, Thanksgiving, and Christmas.</p>

<table class="purpose-table">
<thead>
<tr><th>Service</th><th>Saturday</th><th>Sunday</th><th>Veterans Day</th></tr>
</thead>
<tbody>
<tr><td>USPS Ground Advantage / Priority</td><td>Normal delivery day</td><td>No, except Priority Mail Express</td><td>Closed</td></tr>
<tr><td>UPS Ground</td><td>Yes in many areas, not in checkout estimates</td><td>No</td><td>Normal operations</td></tr>
<tr><td>FedEx Home Delivery</td><td>Yes, residential</td><td>Selected markets only</td><td>Normal operations</td></tr>
<tr><td>UPS 2nd Day Air / FedEx 2Day</td><td>Only if purchased</td><td>No</td><td>Normal operations</td></tr>
</tbody>
</table>

<h2>Worked example: the Thursday order</h2>
<p>You order 4:45pm Thursday from a merchant with a 3pm cutoff and one business day of handling, shipping ground on a 3-5 business day estimate.</p>
<ul>
<li><strong>Thursday</strong> — order lands after cutoff. Nothing happens.</li>
<li><strong>Friday</strong> — picked, packed, scanned, collected on the afternoon pickup. Dispatch day is day <em>zero</em> for the carrier, not day one.</li>
<li><strong>Monday</strong> is transit day 1, Tuesday day 2, <strong>Wednesday</strong> day 3 — the earliest promised delivery.</li>
<li><strong>Friday</strong> is day 5 — the latest.</li>
</ul>
<p>So "3-5 business days" is 6 to 8 calendar days from your order. Add one federal holiday and the late end slides to Monday — eleven calendar days for something the checkout page called three to five.</p>

<table class="purpose-table">
<thead>
<tr><th>Order placed</th><th>Dispatch day</th><th>Earliest (3 bd)</th><th>Latest (5 bd)</th><th>Calendar days to latest</th></tr>
</thead>
<tbody>
<tr><td>Monday</td><td>Tuesday</td><td>Friday</td><td>Tuesday</td><td>8</td></tr>
<tr><td>Tuesday</td><td>Wednesday</td><td>Monday</td><td>Wednesday</td><td>8</td></tr>
<tr><td>Wednesday</td><td>Thursday</td><td>Tuesday</td><td>Thursday</td><td>8</td></tr>
<tr><td>Thursday</td><td>Friday</td><td>Wednesday</td><td>Friday</td><td>8</td></tr>
<tr><td>Friday</td><td>Monday</td><td>Thursday</td><td>Monday</td><td>10</td></tr>
<tr><td>Saturday</td><td>Monday</td><td>Thursday</td><td>Monday</td><td>9</td></tr>
<tr><td>Sunday</td><td>Monday</td><td>Thursday</td><td>Monday</td><td>8</td></tr>
</tbody>
</table>
<p>Assumes one business day of handling, no holidays. Worst case is eight to ten calendar days whatever weekday you order; Friday is worst.</p>

<h2>Peak season breaks the model</h2>
<p>From the Monday before Thanksgiving through the first week of January, the number that stretches is handling, not transit: warehouses that normally pick same-day slip to two or three business days while the product page estimate stays unchanged.</p>
<ul>
<li>UPS, FedEx, and USPS publish <strong>last-ship-by dates for Christmas delivery</strong> each year — typically the third week of December for ground and around December 23 for overnight. Use the current year's list — the dates shift with weekday alignment.</li>
<li>Peak surcharges run from around October into mid-January, per-package and heaviest on residential ground — exactly the service most free shipping uses.</li>
<li>Money-back guarantees are service-specific and get withdrawn when networks are stressed: UPS and FedEx suspended theirs across most services in spring 2020, restoring them piecemeal. Confirm yours still applies before treating a refund as a backstop.</li>
<li>If something must arrive by a date, buy transit time. Paid two-business-day air ordered December 18 beats free ground ordered December 10. Count the days left with a <a href="/days-until/christmas/">days until Christmas</a> countdown and work backwards.</li>
</ul>

<h2>International: the estimate excludes customs</h2>
<p>Every cross-border estimate is implicitly "X days <em>plus clearance</em>." Customs time is not in the number and not predictable: it depends on paperwork and on whether someone owes money.</p>
<ul>
<li><strong>DDP vs DAP.</strong> Delivered Duty Paid means duties and tax were collected at checkout and the parcel moves straight through. Under DAP/DDU the carrier chases the recipient for payment, holds the parcel until it clears, and adds a brokerage fee. "Duties included" is often worth several days.</li>
<li><strong>What actually stalls parcels:</strong> a vague commercial invoice ("gift," "samples"), a missing or wrong HS code, and missing recipient identifiers where the destination requires one — Italy's codice fiscale, Brazil's CPF, South Korea's personal customs clearance code.</li>
<li><strong>Thresholds differ and they change.</strong> The EU's IOSS scheme covers consignments up to EUR 150 with VAT collected at the point of sale, which clears far faster than pay-on-arrival; the UK threshold is GBP 135. The US is the cautionary case: the USD 800 de minimis exemption was suspended for China and Hong Kong goods in May 2025 and for all origins at the end of August 2025. Low value no longer implies a free pass — verify the destination's current rule.</li>
<li><strong>Tracking goes dark at postal handoffs.</strong> Cross-border postal services hand the parcel to the destination's postal operator, and scans often stop for days around that transfer. Silence mid-route is normal; silence for over a week after an "arrived at destination customs" scan is worth a query.</li>
</ul>

<p>The practical rule: find the dispatch date, count business days from there, add holidays. Use <a href="/business-days-from-today/5/">5 business days from today</a> for the transit leg, <a href="/days-between/">days between two dates</a> to see how long a parcel has really been moving, and <a href="/guides/how-to-count-business-days/">how to count business days</a> for the conventions.</p>`,
  },
  {
    slug: 'trial-periods-and-auto-renewals',
    title: "Free Trials: The Exact Moment You Get Charged",
    description: "Free trials charge at the exact clock time you signed up, not end of day — how to find your true last safe cancellation moment.",
    body: `
<p>You start a seven-day free trial at 9:40pm on Wednesday, July 29, 2026, and you plan to cancel "on the last day." On Wednesday, August 5 you open the app at 10pm and the charge has already posted. Nothing malfunctioned. The trial expired at 9:40pm — the same clock time you started it — and billing fired the moment it lapsed. Trial periods are measured from a timestamp, not from a calendar day.</p>

<h2>A "7-day trial" is 168 hours, not seven calendar days</h2>
<p>Stripe, which handles a large share of web subscriptions, stores the trial end as one Unix timestamp. When that instant passes, the subscription moves from <em>trialing</em> to <em>active</em> and an invoice is created. Stripe's documentation says that draft invoice is finalized — the point at which your card is charged — approximately one hour later. Treat that hour as a processing queue, not a grace period — it is a default, and invisible to you as a customer.</p>
<p>App-store trials are stricter than the arithmetic suggests, for two documented reasons:</p>
<ul>
<li><strong>Apple's</strong> cancellation support article says it plainly: if you signed up for a free or discounted trial and do not want to renew, cancel at least <strong>24 hours</strong> before it ends.</li>
<li><strong>Google Play's</strong> terms state you may be charged <strong>no earlier than 24 hours before</strong> each billing period begins. Same deadline, different mechanism — the charge itself can land a day early.</li>
</ul>
<p>So an App Store or Play trial started Wednesday, July 29 at 9:40pm has a true deadline of Tuesday, August 4 — not Wednesday.</p>

<h2>Monthly trials anchor to your signup day — and the 31st breaks</h2>
<p>A "one-month" trial is calendar-month arithmetic, not 30 days. The system stores your day-of-month as a billing anchor and advances to the same day next month; when that day does not exist, it clamps to the last day of the shorter month:</p>
<ul>
<li>Start January 31, 2026 → charge February 28, 2026. That is a <strong>28-day</strong> free month.</li>
<li>Start August 31, 2026 → charge September 30, 2026. A 30-day month.</li>
</ul>
<p>What happens <em>after</em> the clamp depends on how the provider stores the date. Stripe documents that a subscription anchored to January 31 bills the last day of the month closest to the anchor — February 28 (or 29), then March 31, then April 30 — because the anchor never moves. A system that instead computes "next charge = last charge plus one month" has no anchor to return to, so a single February ratchets the date down to the 28th permanently. If your renewal date drifted backward and stayed there, that is why; see <a href="/guides/leap-years-and-date-math-pitfalls/">leap years and date math pitfalls</a>.</p>
<p>"30-day trial" and "one-month trial" are also different products in February: start both on February 1, 2026 and they charge March 3 and March 1 respectively.</p>

<table class="purpose-table">
  <thead>
    <tr><th>Trial as advertised</th><th>Signup moment</th><th>True charge moment</th><th>What trips people up</th></tr>
  </thead>
  <tbody>
    <tr><td>7-day trial (direct card)</td><td>Wed Jul 29, 2026, 9:40pm</td><td>Wed Aug 5, 2026, 9:40pm</td><td>Not midnight on Aug 5 — same clock time</td></tr>
    <tr><td>7-day trial (App Store)</td><td>Wed Jul 29, 2026, 9:40pm</td><td>Cancel by Tue Aug 4, 9:40pm</td><td>Apple's own guidance: cancel 24h early</td></tr>
    <tr><td>7-day trial (Google Play)</td><td>Wed Jul 29, 2026, 9:40pm</td><td>Chargeable from Tue Aug 4, 9:40pm</td><td>Terms allow charging 24h before renewal</td></tr>
    <tr><td>14-day trial</td><td>Thu Feb 19, 2026, 6:05am</td><td>Thu Mar 5, 2026, 6:05am</td><td>Crosses a 28-day February</td></tr>
    <tr><td>30-day trial</td><td>Sun Feb 1, 2026</td><td>Tue Mar 3, 2026</td><td>30 days is not "one month" here</td></tr>
    <tr><td>1-month trial</td><td>Sat Jan 31, 2026</td><td>Sat Feb 28, 2026</td><td>Shortest possible free month: 28 days</td></tr>
    <tr><td>1-year plan</td><td>Thu Feb 29, 2024</td><td>Fri Feb 28, 2025</td><td>Leap-day anniversaries clamp inconsistently</td></tr>
  </tbody>
</table>

<h2>Whose clock is actually running</h2>
<p>The expiry instant is absolute. Timezones only affect how it is displayed and how the terms describe it:</p>
<ul>
<li><strong>Account page shows a date and a time.</strong> That is the system's real answer, almost always in your local timezone. Work backward from it.</li>
<li><strong>Account page shows a bare date</strong> ("your trial ends August 5"). The instant is hidden. Assume the start of that day in the vendor's home timezone and cancel the day before — a US Pacific vendor hits midnight while a European customer sleeps.</li>
<li><strong>Terms name a timezone</strong> ("11:59pm PT"). Convert once and write the local time down.</li>
<li><strong>Provider bills in nightly batches</strong>, as telecom and utility accounts often do. The charge lands inside a multi-hour window; treat the earliest edge as your deadline.</li>
</ul>
<p>The most useful artifact is your signup confirmation email. Its header timestamp is machine-generated when the subscription record was created — what the billing system counted from, not the time you remember clicking the button.</p>

<h2>Cancel on day one, or at the end? It depends on the platform</h2>
<p>Services implement cancellation in one of two ways, and the difference decides your strategy:</p>
<ul>
<li><strong>Scheduled non-renewal.</strong> You keep access until the period ends and the renewal never fires. Apple works this way, as does Stripe's cancel-at-period-end setting. Cancel immediately after signing up: no downside, and the arithmetic stops mattering.</li>
<li><strong>Immediate termination.</strong> Access ends the moment you click cancel, forcing you to wait until near the deadline — exactly where people miscount.</li>
</ul>
<p>This is why blanket "just cancel right away" advice is unsafe. Google Play's terms put <em>trials</em> in the second category: once you cancel a trial you immediately lose access to the content and any subscription privileges, unless the developer specifies otherwise. Cancelling a Play trial on day one throws the trial away. Paid Play subscriptions differ — cancel one and you keep it for the time already paid for. Check the confirmation wording first: "you'll have access until [date]" is the first model, "your subscription has ended" is the second.</p>

<h2>After the charge posts</h2>
<p>You are now in refund territory, where the rules are jurisdictional rather than technical. Apple routes requests through Report a Problem, granted at its discretion. Google Play eligibility varies by purchase type, payment method, timing and country; for subscriptions the developer normally decides once you have cancelled. Do not assume a self-service window exists — check the policy for your own country.</p>
<p>Two statutory backstops matter. In the EU and UK, distance-selling rules give a 14-day right of withdrawal — but for digital content delivered immediately you typically waive it at checkout, so it rarely helps with streaming or SaaS. In the US, ROSCA governs negative-option offers and requires clear disclosure, informed consent, and a simple mechanism to stop recurring charges. The FTC's stricter "click to cancel" rule was vacated by the Eighth Circuit on July 8, 2025, days before its compliance deadline, so state law now carries more weight: California's Automatic Renewal Law requires a reminder 3 to 21 days before a free trial longer than 31 days converts to paid.</p>

<h2>Computing your true last safe moment</h2>
<p>Do this once at signup, with the confirmation email open:</p>
<ul>
<li>Take the <strong>start instant</strong> from the email header, not from memory.</li>
<li>Add the trial length <strong>in the provider's own unit</strong> — days if the terms say days, calendar months if they say months. These diverge in February.</li>
<li>Subtract <strong>24 hours</strong> for App Store and Google Play trials; zero for most direct-card SaaS.</li>
<li>Subtract another <strong>24 hours</strong> of your own, for weekends and support queues.</li>
<li>Set <strong>two</strong> reminders — one at the buffered deadline, one the morning before. For the example above: Monday, August 3 and Tuesday, August 4.</li>
</ul>
<p>One thing not to do: freeze the card instead of cancelling. The contract stays alive, the failed charge enters dunning retries, and the unpaid balance can reach collections. Cancel the agreement; leave the card alone.</p>

<p>To pin down your own dates, use the <a href="/days-from-today/7/">7 days from today</a> and <a href="/days-from-today/30/">30 days from today</a> calculators, or <a href="/days-between/">days between two dates</a> to check how many days a "one-month" trial actually gave you.</p>`,
  },
  {
    slug: 'passport-validity-six-month-rule',
    title: "The Six-Month Passport Rule, Counted Properly",
    description: "How the six-month passport rule is actually counted: entry vs departure wording, Schengen's 3-month and 10-year tests, and renewal lead time.",
    body: `
<p>The "six-month passport rule" is not one rule. Each destination sets its own version, measures it from a different reference date, and stacks it on separate rules about blank pages and issue date — and airline check-in agents, not border officers, apply it first. Travellers who get caught rarely had an expired passport: it was valid the day they flew, and missed a threshold counted from a date they never considered.</p>

<h2>What the six months is measured from</h2>

<p>Three wordings dominate. Read the destination's own phrasing, not a summary of it.</p>

<ul>
<li><strong>"Valid for at least six months beyond the date of entry."</strong> The clock starts the day you land; trip length is irrelevant. Thailand, Vietnam, Indonesia, Singapore and the UAE use this form.</li>
<li><strong>"Valid for at least six months beyond the period of stay."</strong> The clock starts on your last day in the country, so a long trip pushes the required expiry further out. The Philippines words it this way; Russia keys its version to the visa's expiry date.</li>
<li><strong>"Valid for the duration of your stay."</strong> No margin at all. The United Kingdom, Canada and Japan apply this weaker standard to visa-exempt visitors, as have Ireland and Mexico; visa-required nationals often face longer.</li>
</ul>

<p>The Schengen Area uses a fourth formula, neither six months nor duration-of-stay. Under Article 6 of the Schengen Borders Code, a third-country national's travel document must be valid at least <em>three months</em> after the intended date of departure from the Member States' territory, and must have been <em>issued within the previous ten years</em>. Both are checked at entry, separately from the stay-length limit in <a href="/guides/the-90-180-day-schengen-rule/">the 90/180-day Schengen rule</a>.</p>

<p>A fifth variant is a buffer that is not six months at all: Turkey requires validity at least sixty days beyond the permitted duration of stay, not sixty days past the day you actually leave. Where the number is not six, take it literally and check what it counts from.</p>

<p>The threshold can also turn on <em>your</em> nationality: US Customs and Border Protection publishes a "six-month club" list of countries whose nationals are exempt from the six-month requirement and need validity only through their US stay. Two passengers on one flight can face different thresholds.</p>

<h2>Computing the earliest expiry date that qualifies</h2>

<p>Six months is calendar-month arithmetic, not 180 days: add six to the month and keep the day-of-month. Entry on 15 November 2026 requires validity through 15 May 2027, while adding 180 days lands on 14 May 2027 — one day too lenient. Six calendar months averages about 182.6 days, so the day-count shortcut sits on the wrong side of the line.</p>

<p>The real hazard is the end-of-month rollover. Entering 31 August 2026 gives a nominal target of "31 February 2027", which does not exist; some systems clamp to 28 February, others roll into March, and you cannot know which the airline uses. A leap day may not exist either: three months past 29 November 2026 is 29 February 2027, and 2027 is not a leap year (see <a href="/guides/leap-years-and-date-math-pitfalls/">leap years and date math pitfalls</a>). Where the target is ambiguous, assume the later date; later is stricter. If your margin is under a week either way, treat the passport as failing.</p>

<p>One fourteen-day trip — arriving 15 November 2026, leaving 29 November 2026 — under each variant:</p>

<table class="purpose-table">
<thead>
<tr><th>Rule as worded</th><th>Reference date</th><th>Passport valid through</th><th>Worded this way by</th></tr>
</thead>
<tbody>
<tr><td>Duration of stay</td><td>Last day in country (29 Nov 2026)</td><td>29 Nov 2026</td><td>UK, Canada, Japan</td></tr>
<tr><td>3 months beyond departure, issued within 10 years</td><td>Departure from the area (29 Nov 2026)</td><td>1 Mar 2027 (29 Feb 2027 does not exist)</td><td>Schengen Area</td></tr>
<tr><td>6 months beyond date of entry</td><td>Arrival (15 Nov 2026)</td><td>15 May 2027</td><td>Thailand, Vietnam, Indonesia, UAE</td></tr>
<tr><td>6 months beyond period of stay</td><td>End of stay (29 Nov 2026)</td><td>29 May 2027</td><td>Philippines</td></tr>
<tr><td>60 days beyond permitted stay</td><td>End of permitted stay, not actual departure</td><td>28 Jan 2027</td><td>Turkey</td></tr>
</tbody>
</table>

<p>One itinerary, and the acceptable expiry dates span six months end to end. Multi-country trips take the strictest rule of every country you enter, including transit points where you clear immigration.</p>

<h2>The requirements that sit alongside validity</h2>

<ul>
<li><strong>Blank pages.</strong> Enforced independently of validity: South Africa commonly requires two blank pages on entry, and several neighbours are similar. Since 1 January 2016 the US State Department no longer sews extra pages into an existing book — the only remedy is a new passport, so ask for the 52-page version rather than the 28-page, at no extra cost.</li>
<li><strong>Issue date, not just expiry.</strong> The Schengen ten-year rule caught British travellers after Brexit: the UK used to carry unused months onto the new passport, producing books valid up to ten years and nine months. Those months count towards expiry and are worthless for the issue-date test.</li>
<li><strong>Physical condition.</strong> Water damage, a detached page or an unreadable chip can get a passport refused even when every date checks out.</li>
<li><strong>Shorter children's books.</strong> US passports issued under age 16 are valid five years, not ten, as are the UK's. In a family the child's book is usually the binding constraint.</li>
</ul>

<h2>Why the airline decides this, not the border</h2>

<p>Under carrier-liability law — in the EU, Council Directive 2001/51/EC, supplementing Article 26 of the Schengen Convention — an airline that carries an inadmissible passenger faces a penalty Member States must set at a minimum of at least €3,000 per person, and must fly them home at its own cost. It has a financial stake in refusing you and none in your holiday.</p>

<p>Check-in agents do not read immigration statutes. They query Timatic, IATA's travel information database, which returns a pass or fail for your document, nationality and route, and applies the strictest available reading. An embassy email saying you are fine will not board you if Timatic disagrees, agents rarely have authority to override a fail, and you find out at the counter.</p>

<h2>Counting backwards from the trip, not forwards from today</h2>

<p>Renewal is serial, and each stage has its own queue. Work backwards from departure:</p>

<ul>
<li>Return postage and delivery, which sits outside published processing times.</li>
<li>Processing. Routine and expedited estimates move with seasonal demand, so read the figure published the day you apply.</li>
<li>Outbound postage and receipt logging: expedited service is measured from receipt at the agency, not the day you posted it.</li>
<li><strong>Then the visa</strong> — the stage people forget. Applications need the new passport number and stickered visas need the physical book, so renewal must finish first; the timelines add rather than overlap.</li>
</ul>

<p>Two traps. A mail-in renewal means surrendering your current book, so you cannot travel internationally while it is in process; the in-person alternative is rationed by proof of imminent travel, with US passport agency appointments requiring travel within 14 days, or 28 days if you need a foreign visa first. If a valid visa sits in the expiring book, check whether the issuer lets you carry both: the United States accepts an undamaged, unexpired visa in an expired passport presented with the new one.</p>

<h2>Verifying, and what to do when sources disagree</h2>

<p>Requirements change without notice, so use the above to read a rule, not as the rule. Take the governing text from the destination's embassy or immigration authority, a plain-language summary from your foreign ministry (US State Department country information, UK FCDO travel advice), and expect the airline to follow Timatic regardless. Where they conflict and your margin is thin, plan around the strictest reading — an unnecessary renewal costs far less than a denied boarding.</p>

<p>For your own dates, <a href="/months-from-today/6/">six months from today</a> gives the expiry a six-month-from-entry rule would demand if you landed today, and <a href="/days-between/">days between two dates</a> measures the margin between your return and your expiry.</p>`,
  },
  {
    slug: 'fiscal-quarters-and-reporting-dates',
    title: "Fiscal Quarters: Why Q1 Is Not Always January",
    description: "Why Q1 means October for Washington and February for retailers: fiscal year conventions, 53-week years, and turning quarter labels into dates.",
    body: `
<p>"Q1" means January through March only if the speaker is using the calendar year, and plenty of the organizations you deal with are not. The US federal government's Q1 is October through December; Microsoft's is July through September; NVIDIA's fiscal 2025 ended January 26, 2025. Confusing these conventions produces missed deadlines, broken year-over-year comparisons, and contracts that come due a quarter early.</p>

<h2>Calendar quarters are a default, not a standard</h2>

<p>Calendar quarters split the year into Jan–Mar, Apr–Jun, Jul–Sep and Oct–Dec. They are unequal by construction: Q1 has 90 days (91 in a leap year), Q2 has 91, and Q3 and Q4 have 92 each. A two-day spread distorts anything measured as a daily rate — one reason retail moved to week-based calendars.</p>

<p>A fiscal year is any 12-month accounting period an organization picks. Under IRC §441 a US corporation may elect the calendar year, a year ending on the last day of any month but December, or — under §441(f) — a "52-53 week tax year" that ends on the same weekday every year.</p>

<h2>The fiscal calendars you will actually meet</h2>

<p>The trap is not only the start month; it is the <em>labeling</em>. Some jurisdictions name a fiscal year for the year it ends in, others for the year it begins: India's "FY26" and Japan's "FY2025" cover the same twelve months, April 2025 through March 2026. The UK writes "2025/26" and sidesteps it.</p>

<table class="purpose-table">
<thead>
<tr><th>Entity</th><th>Fiscal year</th><th>Fiscal Q1</th><th>Named for</th></tr>
</thead>
<tbody>
<tr><td>US federal government</td><td>Oct 1 – Sep 30</td><td>Oct – Dec</td><td>Ending year (FY2026 = Oct 2025–Sep 2026)</td></tr>
<tr><td>46 US states</td><td>Jul 1 – Jun 30</td><td>Jul – Sep</td><td>Ending year</td></tr>
<tr><td>New York State</td><td>Apr 1 – Mar 31</td><td>Apr – Jun</td><td>Ending year</td></tr>
<tr><td>Texas</td><td>Sep 1 – Aug 31</td><td>Sep – Nov</td><td>Ending year</td></tr>
<tr><td>Alabama, Michigan</td><td>Oct 1 – Sep 30</td><td>Oct – Dec</td><td>Ending year</td></tr>
<tr><td>UK central government</td><td>Apr 1 – Mar 31</td><td>Apr – Jun</td><td>Written "2025/26"</td></tr>
<tr><td>UK personal tax year</td><td>Apr 6 – Apr 5</td><td>n/a</td><td>Written "2025/26"</td></tr>
<tr><td>Japan (government, most listed firms)</td><td>Apr 1 – Mar 31</td><td>Apr – Jun</td><td><strong>Starting</strong> year</td></tr>
<tr><td>India</td><td>Apr 1 – Mar 31</td><td>Apr – Jun</td><td>Ending year ("FY26")</td></tr>
<tr><td>Australia</td><td>Jul 1 – Jun 30</td><td>Jul – Sep</td><td>Ending year ("FY25")</td></tr>
<tr><td>US retail (NRF 4-5-4)</td><td>Sunday after the Saturday nearest Jan 31; 52–53 weeks</td><td>Feb – Apr</td><td>Varies by retailer</td></tr>
</tbody>
</table>

<p>UK <em>companies</em> are absent because each sets its own accounting reference date at Companies House; 31 March and 31 December are both common. Two rows have odd origins. The federal October start dates only from the Congressional Budget and Impoundment Control Act of 1974, effective FY1977, which left an orphaned "transition quarter" — July 1 to September 30, 1976 — in old budget tables. The UK's April 6 is a fossil of the 1752 Gregorian changeover plus a day added from 1800, a Julian leap year that was not a Gregorian one — the same off-by-one behind many <a href="/guides/leap-years-and-date-math-pitfalls/">leap year and date math pitfalls</a>.</p>

<h2>Retail 4-5-4 calendars and the 53-week year</h2>

<p>Retailers want every "month" to hold the same number of weekends, so a 13-week quarter splits into 4-5-4, 4-4-5 or 5-4-4 weeks; the National Retail Federation's published standard is 4-5-4. Every fiscal month ends on the same weekday, so Christmas week always lands in the same fiscal week.</p>

<p>The cost is that 52 weeks is 364 days. The average calendar year is 365.25, so year-end drifts about 1.25 days earlier annually; once the drift passes a week — roughly every five or six years — a 53rd week is inserted. What practitioners hit:</p>

<ul>
<li><strong>One quarter gets 14 weeks.</strong> Under the NRF calendar it falls in fiscal January (Q4). Apple's year ends the last Saturday of September: fiscal 2023 ran September 25, 2022 to September 30, 2023 — 371 days, 53 weeks — absorbed into a 14-week December quarter.</li>
<li><strong>Growth rates need restating.</strong> A 14-week quarter carries about 7.7% more selling days than a 13-week one; a 53-week year about 1.9% more than a 52-week year. Hence disclosures "on a comparable 52-week basis."</li>
<li><strong>Two rules give different year-ends.</strong> "Last Saturday in January" and "Saturday nearest January 31" differ; the "nearest" version can push year-end into February. Target's fiscal 2023 ended February 3, 2024 — which is what made it a 53-week year.</li>
<li><strong>Fixed-date retailers never get a 53rd week.</strong> Walmart's year ends January 31 whatever the weekday, so its quarters vary in length instead. Its fiscal 2026 runs February 1, 2025 to January 31, 2026 — the twelve months Target calls fiscal 2025. One year, two numbers.</li>
<li><strong>Retail week 1 is not ISO week 1.</strong> ISO 8601 defines week 1 as the week containing the first Thursday of January. Never join a retail calendar to ISO week numbers without a mapping table.</li>
</ul>

<h2>Converting a fiscal quarter label into real dates</h2>

<p>You need three inputs: the start month <em>M</em>, whether the year is named for its start or its end, and whether it is fixed-month or 52/53-week. For fixed-month calendars the arithmetic is one line: fiscal quarter <em>n</em> begins in calendar month ((<em>M</em> − 1 + 3(<em>n</em> − 1)) mod 12) + 1. If the year is named for its ending year <em>Y</em>, months <em>M</em> through December sit in <em>Y</em> − 1 and January through <em>M</em> − 1 sit in <em>Y</em>.</p>

<p>So US federal Q3 FY2026 → <em>M</em> = 10, <em>n</em> = 3 → month 4 → April 1 to June 30, 2026; Microsoft Q2 FY2026 → <em>M</em> = 7, <em>n</em> = 2 → October 1 to December 31, 2025. For 52/53-week calendars the formula does not apply: read the stated rule ("the 52- or 53-week period ending on the last Sunday in January") and count weeks from the prior year-end. NVIDIA's fiscal 2025 ran January 29, 2024 to January 26, 2025 — almost entirely calendar 2024 — which is why analysts "calendarize" it before comparing peers.</p>

<h2>Quarter end is not quarter close</h2>

<p>The last day of a quarter is a cutoff, not a delivery date. Numbers appear weeks later, on deadlines worth knowing precisely:</p>

<ul>
<li><strong>SEC Form 10-Q</strong> is due 40 days after quarter end for large accelerated and accelerated filers, 45 days for non-accelerated filers. The earnings press release almost always precedes it, so the headline number and the filed detail are separate dates.</li>
<li><strong>Form 10-K</strong> is due 60 days after fiscal year end for large accelerated filers, 75 for accelerated, 90 for non-accelerated.</li>
<li><strong>Federal obligations</strong> are hard-stopped: annual appropriations lapse at midnight September 30, which is why contracting concentrates in the government's final Q4 weeks.</li>
<li><strong>Contract wording</strong> compounds it. "Within 30 days of the end of each fiscal quarter" means calendar days unless it says business days — and a 52/53-week quarter ends on a Saturday, so day 30 can land on a weekend.</li>
</ul>

<h2>Counting business days in a quarter</h2>

<p>Quarters are not interchangeable capacity. Calendar 2026, counting Monday–Friday minus the eleven US federal holidays on their observed dates:</p>

<table class="purpose-table">
<thead>
<tr><th>Quarter</th><th>Dates</th><th>Calendar days</th><th>Weekdays</th><th>Holidays</th><th>Business days</th></tr>
</thead>
<tbody>
<tr><td>Q1</td><td>Jan 1 – Mar 31</td><td>90</td><td>64</td><td>3</td><td>61</td></tr>
<tr><td>Q2</td><td>Apr 1 – Jun 30</td><td>91</td><td>65</td><td>2</td><td>63</td></tr>
<tr><td>Q3</td><td>Jul 1 – Sep 30</td><td>92</td><td>66</td><td>2</td><td>64</td></tr>
<tr><td>Q4</td><td>Oct 1 – Dec 31</td><td>92</td><td>66</td><td>4</td><td>62</td></tr>
<tr><td><strong>Year</strong></td><td>Jan 1 – Dec 31</td><td><strong>365</strong></td><td><strong>261</strong></td><td><strong>11</strong></td><td><strong>250</strong></td></tr>
</tbody>
</table>

<p>Q1 2026 has 61 working days and Q3 has 64 — a 5% swing. Q3 gets off lightly because July 4 falls on a Saturday, observed Friday July 3, while Q4 absorbs four holidays. Plan every quarter as "about 65 days" and you overcommit Q1 and Q4.</p>

<p>"Business day" is not one definition either. US banks and the Federal Reserve close on Columbus Day and Veterans Day and the bond market follows SIFMA's recommended close, while the NYSE and Nasdaq stay open; on Good Friday the reverse holds. If settlement rather than trading drives your deadline, use the banking calendar — our guide on <a href="/guides/how-to-count-business-days/">how to count business days</a> covers the rest.</p>

<p>To check this against real dates: the <a href="/days-between/">days between dates calculator</a> for an exact fiscal period, <a href="/business-days-from-today/60/">60 business days from today</a> to project a filing deadline, and the <a href="/days-until/tax-day/">countdown to Tax Day</a> for filing season.</p>`,
  },
  {
    slug: 'statute-of-limitations-basics',
    title: "How Limitation Periods Are Counted (Accrual, Tolling, Discovery)",
    description: "How limitation periods are actually counted: accrual, the discovery rule, tolling, statutes of repose, and last-day rollover.",
    body: `
<p>A limitation period looks like arithmetic: a claim has "three years," so add three years and you have the deadline. In practice the hard question is almost always <em>when the clock started</em>. Four rules stack: accrual sets day zero, a discovery rule can move day zero later, tolling can pause a clock already running, and a statute of repose can kill the claim regardless of all three. Whether a particular claim is timely needs a lawyer; the statutes below are examples of drafting, not a survey.</p>

<h2>Accrual: day zero is a legal question, not a calendar one</h2>

<p>The period runs from the date the cause of action <strong>accrues</strong> — often not the day the defendant did something wrong.</p>

<ul>
<li><strong>Breach of contract</strong> generally accrues at breach, not at signature and not when the injured party notices; it is complete even if no loss has been felt yet.</li>
<li><strong>Negligence</strong> normally accrues when damage occurs, since damage is an element of the tort. Careless conduct that has caused nothing yet starts no clock.</li>
<li><strong>Instalment obligations</strong> accrue separately for each missed payment. Part payment or a signed written acknowledgement can restart the whole period — sections 29 and 30 of the Limitation Act 1980 in England and Wales — which is why a "dead" debt revives after one small payment.</li>
<li><strong>Continuing wrongs</strong> such as an ongoing nuisance can accrue afresh each day, so limitation governs how far back you can recover, not whether you can sue.</li>
<li><strong>Demand obligations</strong> split by jurisdiction. UCC § 3-118(b) gives six years after demand on a demand note, and bars it if neither principal nor interest is paid for a continuous ten years. Other systems treat a demand debt as accruing when the money is handed over.</li>
</ul>

<p>The arithmetic is the easy part. Two lawyers can agree the period is six years and still be years apart on the deadline.</p>

<h2>The discovery rule is not a default, and not everywhere</h2>

<p>A discovery rule moves the start date to when the claimant knew — or <em>reasonably should have known</em> — of the injury and its cause. The second half is what gets litigated: it is an objective standard, so the clock can start before the claimant understood anything, if a reasonable person would have investigated. An unexplained diagnosis or a survey flagging a defect can be that trigger.</p>

<p>Scope varies far more than general accounts suggest:</p>

<ul>
<li>England and Wales runs an alternative three-year period from the date of knowledge for latent damage in negligence (Limitation Act 1980, s.14A), capped by a fifteen-year longstop from the negligent act or omission (s.14B).</li>
<li>US federal securities fraud claims run two years from discovery of the violation's facts, and no later than five years from the violation (28 U.S.C. § 1658(b)).</li>
<li>Maine's Law Court has confined the discovery rule to a short list — legal malpractice, foreign-object and negligent-diagnosis medical malpractice, and asbestosis — so most Maine clocks run from injury whether anyone knew or not.</li>
<li>Ordinary contract claims often get no discovery rule at all, which catches out anyone assuming "I only just found out" helps.</li>
</ul>

<p>Check what "discovery" means in the provision. Some statutes require knowledge of the injury only; others also its cause and the defendant's identity — a gap worth years.</p>

<h2>Tolling pauses a running clock — it does not reset it</h2>

<p>When the condition ends, the clock resumes where it stopped; elapsed time is not given back. A three-year period that ran eight months, tolled two years, then resumed leaves two years and four months. Grounds vary:</p>

<ul>
<li><strong>Minority.</strong> Periods commonly do not run against a child. Under s.28 of the Limitation Act 1980 the clock starts at 18, so a three-year injury claim arising at age 6 expires at 21.</li>
<li><strong>Legal incapacity</strong> preventing a person from managing their own affairs, sometimes for as long as it lasts.</li>
<li><strong>Fraudulent concealment.</strong> Distinct from the discovery rule: it turns on the defendant's active concealment, not the claimant's ignorance.</li>
<li><strong>Defendant's absence.</strong> Several US states toll while the defendant is out of state or not amenable to service.</li>
<li><strong>Agreed tolling.</strong> These are contracts; the wording controls whether it suspends the clock or grants a fixed extension.</li>
<li><strong>Procedural suspension</strong> — a bankruptcy stay, a mandatory pre-action process, a court-ordered emergency suspension.</li>
</ul>

<h2>Statutes of repose: the outer wall</h2>

<p>A repose period runs from a fixed external event — substantial completion, first sale, the professional act — and expires on schedule regardless of accrual, discovery, or usually tolling. California's CCP § 337.15 is a clean example: ten years from substantial completion for property damage from latent construction defects, carved out only for willful misconduct and concealment.</p>

<table class="purpose-table">
<thead>
<tr><th>Feature</th><th>Statute of limitations</th><th>Statute of repose</th></tr>
</thead>
<tbody>
<tr><td>Clock starts at</td><td>Accrual, or discovery where a rule applies</td><td>A fixed event: completion, sale, the act</td></tr>
<tr><td>Discovery rule</td><td>Sometimes, by claim type</td><td>Generally not — that is the point</td></tr>
<tr><td>Tolling</td><td>Usually available</td><td>Rarely; carve-outs tend to be fraud or willful misconduct</td></tr>
<tr><td>Can expire before harm appears</td><td>No</td><td>Yes</td></tr>
<tr><td>Typical use</td><td>All claim types</td><td>Construction, products, professional services, securities</td></tr>
</tbody>
</table>

<p>They run in parallel and repose wins: a claim discovered last month with three years of limitation left is dead if repose has run.</p>

<h2>Lengths vary — check yours rather than assuming</h2>

<p>These examples illustrate the spread; none is the law where you are.</p>

<table class="purpose-table">
<thead>
<tr><th>Claim type</th><th>Verifiable examples</th><th>What to watch</th></tr>
</thead>
<tbody>
<tr><td>Personal injury</td><td>Maine 6 years (14 M.R.S. § 752); England and Wales 3 years (Limitation Act 1980, s.11)</td><td>Wrongful death often has its own shorter period (2 years in Maine)</td></tr>
<tr><td>Written contract</td><td>England and Wales 6 years (s.5); California 4 years (CCP § 337)</td><td>Some commercial contracts shorten it by agreement</td></tr>
<tr><td>Oral contract</td><td>California 2 years (CCP § 339); England and Wales 6 years, same as written</td><td>"Oral is shorter" is a US-state convention, not a universal</td></tr>
<tr><td>Deed or specialty</td><td>England and Wales 12 years (s.8)</td><td>Formal execution buys the longer period</td></tr>
<tr><td>Defamation</td><td>England and Wales 1 year (s.4A)</td><td>Deliberately short, to force prompt claims</td></tr>
<tr><td>Claim against a public body</td><td>Maine: written notice within 180 days (14 M.R.S. § 8107)</td><td>Notice deadline sits in front of the limitation period</td></tr>
</tbody>
</table>

<p>Watch the last row: missing a government notice deadline ends the claim while the limitation period is still running.</p>

<h2>Counting the last day</h2>

<ul>
<li><strong>Exclude day zero.</strong> Federal Rule of Civil Procedure 6(a)(1)(A) excludes the day of the triggering event and counts every day after, so a three-year period accruing 12 March 2024 lands on 12 March 2027. Some provisions produce the day before; calendar the earlier date.</li>
<li><strong>29 February has no anniversary.</strong> A period accruing 29 February 2024 has no matching date in 2025, 2026 or 2027. Some rules resolve to 28 February, others to 1 March, and day-count statutes sidestep it — see our <a href="/guides/leap-years-and-date-math-pitfalls/">leap years and date math pitfalls guide</a>.</li>
<li><strong>The last day rolls forward.</strong> Under FRCP 6(a)(1)(C) a deadline falling on a Saturday, Sunday or legal holiday runs to the next day that is none of those, on the court's holiday calendar rather than the bank one.</li>
<li><strong>Closing time is not automatically midnight.</strong> FRCP 6(a)(4) ends the last day at midnight in the court's time zone for electronic filing, but when the clerk's office closes for other filing methods. Local rules differ; the portal's behaviour is not the rule.</li>
</ul>

<p>Treat the calculated date as a hard internal deadline and file well before it. Rollover is a defence of last resort, not a plan.</p>

<p>For the arithmetic: <a href="/days-between/">days between two dates</a> measures elapsed time from an accrual date, <a href="/months-from-today/36/">36 months from today</a> projects a three-year horizon, and <a href="/business-days-from-today/30/">30 business days from today</a> covers rules written in business days — see our <a href="/guides/how-to-count-business-days/">guide to counting business days</a>. Where minority tolling applies, the <a href="/age-calculator/">age calculator</a> gives the date a claimant turns 18.</p>`,
  },
  {
    slug: 'school-terms-and-attendance-counting',
    title: "School Calendars: Instructional Days, Terms, and the 180-Day Rule",
    description: "How US school calendars count instructional days and hours, term lengths by system, snow-day waivers, and the 10% chronic absenteeism rule.",
    body: `
<p>School calendars look like ordinary date math until you try to build one. A term is not "18 weeks" — it is a required count of instructional days or hours laid across a calendar of holidays, in-service days, moving spring breaks, and closures nobody can predict in July. Get it wrong and a district owes the state makeup days in June.</p>

<h2>Where the 180-day figure comes from — and where it doesn't apply</h2>
<p>There is no federal minimum number of school days. Instructional time is set by state statute or state board rule, which is why the number changes at a state line. Education Commission of the States puts roughly 30 states at 180 days — the most common answer by far, and the one pacing guides and grading software assume. The exceptions are where calendars break.</p>
<ul>
<li><strong>Lower day floors.</strong> Maine, North Dakota, and Vermont require 175 instructional days. Colorado districts scheduling under 160 days need the commissioner's permission, and the binding constraint there is hours: 1,080 for secondary, 990 for elementary.</li>
<li><strong>Four-day weeks.</strong> Hundreds of districts, concentrated in rural Colorado, Missouri, Oregon, Idaho, and Oklahoma, run Monday–Thursday and hit the <em>hours</em> target with longer days: Colorado's 1,080 secondary hours over a 144-day four-day year is 7.5 hours daily, against 6.0 across 180 days.</li>
<li><strong>Minimum vs. printed calendar.</strong> Almost no district publishes exactly the minimum; most build 182–186 days so a couple of closures are absorbed without triggering makeup. Maine's statute is explicit about the gap: at least 180 school days, of which at least 175 are instructional.</li>
<li><strong>Teacher days are not instructional days.</strong> Professional development, records days, and full-day conferences are staff contract days that generally do not count as student instructional time. Contract length, often 185–190 days, is a separate number.</li>
</ul>

<h2>The states that count hours or minutes instead</h2>
<p>Several states dropped day counts because a day is a bad unit — a two-hour delay and a full day both counted as one. Texas HB 2610 (2015) rewrote Education Code §25.081 to require <strong>75,600 minutes</strong> of instruction a year instead of 180 days, defining a day of instruction as 420 minutes. The product is identical (420 × 180 = 75,600); the unit is not, so the total can legally be delivered in fewer, longer days. Ohio dropped its 180-day rule in 2014 for hours by grade band under ORC 3313.48 — 910 for grades K–6, 1,001 for grades 7–12. Minnesota and Wisconsin also set hours by grade band, several keeping a day floor so the year can't be compressed into marathon days.</p>
<p>Half days are where this bites. In a day-count state a three-hour half day counts as a full instructional day — exactly why those states schedule so many. In an hours state it contributes three hours and the shortfall comes from elsewhere, so two districts can match on days and still diverge sharply on instruction.</p>

<h2>Snow days, waivers, and remote instruction</h2>
<p>When a district closes for weather, which of three things happens is a state-law question, not a district preference.</p>
<ul>
<li><strong>Forgiveness.</strong> Many states forgive a fixed number of closure days — Ohio's statutory term is "calamity days." Past the allowance, the time gets made up.</li>
<li><strong>Makeup.</strong> Built-in makeup days sit at the end of the year or inside spring break, printed conditionally ("if needed"). Extending into June collides with graduation, testing windows, and summer building leases.</li>
<li><strong>Remote instruction.</strong> Illinois codified E-Learning Days, Indiana permits virtual instruction days, Ohio historically allowed "blizzard bag" packets — all generally requiring a plan approved in advance, so a district cannot decide on the morning of a storm that today counts.</li>
</ul>
<p>A district that banked surplus minutes with slightly longer days absorbs closures without touching the calendar — the stated motive for the Texas switch.</p>

<h2>Semesters, trimesters, and quarters</h2>
<p>Term structure sets when grades post and when credit is awarded. K–12 and higher education use the same words for different lengths, which causes real trouble in dual enrollment.</p>
<table class="purpose-table">
<thead>
<tr><th>System</th><th>Terms per year</th><th>Typical length</th><th>Instructional days per term</th><th>Where you see it</th></tr>
</thead>
<tbody>
<tr><td>K–12 semester</td><td>2</td><td>~18 weeks</td><td>~90</td><td>Most US high schools</td></tr>
<tr><td>K–12 trimester</td><td>3</td><td>~12 weeks</td><td>~60</td><td>Many middle schools; some MI and MN districts</td></tr>
<tr><td>K–12 quarter (marking period)</td><td>4</td><td>~9 weeks</td><td>~45</td><td>Report-card cycles inside semesters</td></tr>
<tr><td>Six-week grading period</td><td>6</td><td>~6 weeks</td><td>~30</td><td>Common in Texas districts</td></tr>
<tr><td>College semester</td><td>2 (+ summer)</td><td>15–16 weeks incl. finals</td><td>~70–75 class days</td><td>Most US universities</td></tr>
<tr><td>College quarter</td><td>3 (+ summer)</td><td>10–11 weeks</td><td>~50 class days</td><td>Most UC campuses, Stanford, Chicago, Dartmouth</td></tr>
<tr><td>4-1-4 with January term</td><td>2 + interim</td><td>14 weeks + 3–4 week term</td><td>varies</td><td>Many liberal arts colleges</td></tr>
</tbody>
</table>
<p>A K–12 "quarter" is a nine-week marking period inside a semester; a college quarter is a full credit-bearing term. Berkeley and Merced run semesters while the rest of the UC system runs quarters, and Ohio State converted from quarters to semesters in 2012. Two credit definitions sit underneath: the Carnegie unit, 120 contact hours per high school credit, and the federal credit hour at 34 CFR 600.2 — one hour of instruction plus two hours of outside work weekly for roughly 15 weeks.</p>

<h2>Chronic absenteeism: the 10% rule and its denominator</h2>
<p>Under ESSA most states report chronic absenteeism as a school-quality indicator, and the standard definition is <strong>missing 10% or more of the days a student was enrolled</strong>, excused and unexcused alike. On a 180-day year that is 18 days — about two a month, which is why it catches students nobody had flagged.</p>
<p>The denominator is where people go wrong: days <em>enrolled</em>, not days in the school year. A student enrolled 40 days who misses 5 is at 12.5% and chronically absent. Nine absences out of 85 enrolled days is 10.6%, over the line. The definition has also moved: the federal Civil Rights Data Collection used a flat 15-day threshold before 2017–18, so older federal counts don't compare with current percentage-based ones.</p>
<p>Chronic absenteeism is not truancy, and neither one is the funding metric. Truancy counts unexcused absences only and is set in state education code: California treats three full unexcused days, or three tardies over 30 minutes, as truancy. Funding is a third track — average-daily-attendance states turn absences straight into lost revenue, while Michigan blends a first-Wednesday-in-October count (weighted 90%) with the prior February's count (10%).</p>

<h2>Computing a term end date from a required day count</h2>
<p>The algorithm: step forward from day one, count weekdays only, skip every weekday marked holiday, break, or staff day. A 90-day first semester starting <strong>Monday, August 18, 2025</strong>, with Labor Day (Sep 1), Thanksgiving break (Nov 26–28), and winter break Dec 22 through Jan 2:</p>
<ul>
<li>Instructional day 1: Monday, August 18, 2025</li>
<li>Instructional day 45 (end of first quarter): Monday, October 20, 2025</li>
<li>Non-instructional weekdays removed: 14</li>
<li>Instructional day 90: <strong>Thursday, January 8, 2026</strong></li>
</ul>
<p>With no breaks at all, the 90th weekday would have been Friday, December 19, 2025. Removing 14 weekdays pushed the end date 20 calendar days later, because skipped weekdays drag the finish across extra weekends. Roughly 1.4 calendar days per instructional day removed is the ratio to keep in mind when someone asks what three more snow days will cost — and it is why a semester that "should" end before winter break puts finals after two weeks off.</p>
<p>Two more traps: Easter falls anywhere from March 22 to April 25, so a spring break pinned to it shifts the back half of the year, and February 29 is an ordinary instructional weekday when it lands on one (February 29, 2028 is a Tuesday).</p>

<p>The <a href="/business-days-from-today/90/">business days from today calculator</a> projects a term endpoint while skipping weekends; the <a href="/days-between/">days between dates calculator</a> measures an enrollment window for an attendance percentage. Conventions behind both: <a href="/guides/how-to-count-business-days/">how to count business days</a> and <a href="/guides/leap-years-and-date-math-pitfalls/">leap years and date math pitfalls</a>.</p>`,
  },
  {
    slug: 'contract-renewal-and-evergreen-clauses',
    title: "Evergreen Contracts: Counting the Window You Must Not Miss",
    description: "How auto-renewal notice windows are counted: which date the anniversary hangs off, both edges of the window, receipt rules, and a reminder ladder.",
    body: `
<p>An evergreen contract renews itself unless somebody stops it, and what stops it is a written notice delivered inside a window counted backwards from the renewal date. The counting is where the money goes. A 60-day notice period on a contract renewing Monday 1 March 2027 makes Thursday 31 December 2026 the last timely day; if the clause also bars notice more than 90 days out, the window opened on 1 December 2026 — October is as invalid as January.</p>

<h2>Where the clause hides, and the three obligations in it</h2>
<p>Auto-renewal language rarely sits under a heading saying "Auto-Renewal." It hides inside <em>Term and Termination</em> as one subordinate clause: the agreement "shall automatically renew for successive one-year periods unless either party provides written notice ... at least ninety (90) days prior to the end of the then-current term." Three obligations hide there, and a non-renewal fails on any one:</p>
<ul>
<li><strong>Form.</strong> "Written notice" is defined further down, in the Notices section: certified mail, courier with signature, or delivery to a named officer. Email is often excluded, or valid only if a hard copy follows — a perfectly timed email under a certified-mail clause is a failed notice.</li>
<li><strong>Recipient and address.</strong> Notices sections name an address and say how it may be changed. Absent that step, the printed address still governs.</li>
<li><strong>Timing.</strong> Both edges of the window, not just the near one.</li>
</ul>
<p>Statutory backstops are narrower than assumed. New York's General Obligations Law (§§ 5-901 and 5-903) makes an auto-renewal clause in a service, maintenance, or repair contract unenforceable unless the provider reminds the customer 15 to 30 days before their deadline — and it is not consumer-only. California's Automatic Renewal Law is. Neither saves a negotiated master services agreement; this is guidance on counting, not legal advice.</p>

<h2>Anniversary vs. effective vs. signature date</h2>
<p>Three dates on a typical contract differ: the <strong>signature date</strong>, the <strong>effective date</strong> (often backdated — "effective as of 1 January"), and the <strong>commencement date</strong>, when the term clock starts, often a go-live date set in an order form. The anniversary counts from whichever the Term clause points at: a contract signed 14 March, effective as of 1 January, with services commencing 1 April could end 31 December, 31 March, or 30 June depending on which sentence you read. Resolve it once in writing, then audit at order-form level — cancelling the MSA does not kill an order form that is mid-term.</p>

<h2>The window has two edges</h2>
<p>Most people internalise the closing edge — "at least 90 days prior" — and forget that many clauses also cap how early notice may be given: "not more than 180 days nor less than 90 days prior to expiration." Notice delivered 200 days out is premature and can be treated as ineffective; the counterparty wants a current-year decision, not a standing cancellation filed at signature. Four mechanics decide the close calls:</p>
<ul>
<li><strong>The anniversary is excluded.</strong> "At least 60 days prior to the renewal date" treats the renewal date as day zero. For a 1 March 2027 renewal, day 60 backwards lands on 31 December 2026 — the last timely day, and not one to aim for.</li>
<li><strong>Calendar or business days.</strong> Notice periods are usually calendar days; if the clause says business days you need the counterparty's holiday list, not your own — our <a href="/guides/how-to-count-business-days/">business-day counting guide</a> covers the method.</li>
<li><strong>Dispatch or receipt.</strong> "Deemed given upon receipt" puts transit inside your window: a 90-day period with a two-day courier means the envelope must leave 92 days out, not 90.</li>
<li><strong>Rollover.</strong> Many contracts have no rollover clause, so a deadline landing on a Sunday stays there — and where one exists, whether it helps a backwards-counted deadline is ambiguous. Act earlier.</li>
</ul>

<h2>Four windows, counted</h2>
<p>Renewal date treated as day zero. Business days exclude weekends and US federal holidays.</p>
<table class="purpose-table">
<thead>
<tr><th>Contract</th><th>Renewal date</th><th>Notice clause</th><th>Earliest notice</th><th>Last timely notice</th></tr>
</thead>
<tbody>
<tr><td>SaaS, successive 1-year terms</td><td>Mon 1 Mar 2027</td><td>60 days prior; no early cap</td><td>Any time</td><td>Thu 31 Dec 2026</td></tr>
<tr><td>Facilities services, 1-year terms</td><td>Thu 1 Jul 2027</td><td>Not more than 180 nor less than 90 days prior</td><td>Sat 2 Jan 2027</td><td>Fri 2 Apr 2027</td></tr>
<tr><td>Equipment lease, successive 3-year terms</td><td>Thu 30 Sep 2027</td><td>120 days prior; certified mail; effective on receipt</td><td>Any time</td><td>Received by Wed 2 Jun 2027</td></tr>
<tr><td>Insurance program, 1-year terms</td><td>Sat 1 Jan 2028</td><td>45 business days prior</td><td>Any time</td><td>Tue 26 Oct 2027</td></tr>
</tbody>
</table>
<p>Each row hides a lesson. The facilities window opens on a Saturday, so the first practical day is Monday 4 January 2027 — and that contract cannot be cancelled in November at all, leaving a December budget cycle unable to act until the new year.</p>
<p>The equipment lease is worse than it looks. Under a receipt rule the letter must arrive by 2 June, and Memorial Day falls on Monday 31 May 2027, inside the transit window. Posting certified mail on Tuesday 25 May puts the real deadline 128 calendar days out: a 120-day contractual window is a 128-day operational one.</p>
<p>The insurance row shows why business-day periods must be pinned down in writing. Four federal holidays fall between late October 2027 and that renewal: Veterans Day (Thursday 11 November), Thanksgiving (Thursday 25 November), and — because 25 December 2027 and 1 January 2028 both land on Saturdays — observances on Friday 24 and Friday 31 December. Excluding all four gives Tuesday 26 October; excluding only Thanksgiving and Christmas gives Thursday 28 October; excluding weekends alone gives Monday 1 November. Same clause, same calendar, six days of spread.</p>

<h2>Multi-year terms and the cost of one miss</h2>
<p>A missed notice on a one-year evergreen costs one more year; on "successive three-year terms" it costs three. A term running 30 September 2027 to 30 September 2030 is 1,096 days, not 1,095, because the 2028 leap day sits inside it — the off-by-one our <a href="/guides/leap-years-and-date-math-pitfalls/">leap year pitfalls guide</a> covers. Then check two clauses. A price escalator reading "the lesser of CPI or 5% at each anniversary" bites at auto-renewals too, so three years of compounding is the real cost, not the base fee. And a termination for convenience caps the damage at that notice period plus any early-termination fee — a clause often found only after writing off the window.</p>

<h2>The reminder ladder and the annual register</h2>
<p>Build a ladder of absolute calendar dates counted backwards from the anniversary, each step with its own owner. For a 90-day window:</p>
<ul>
<li><strong>Minus 180 days</strong> — commercial review opens: usage data, service issues, alternatives. Nobody decides yet.</li>
<li><strong>Minus 120 days</strong> — decide: renew, renegotiate, or exit. Confirm the earliest valid notice date if there is an early cap.</li>
<li><strong>Minus 105 days</strong> — notice drafted and reviewed if exiting; renegotiation opened if not.</li>
<li><strong>Minus 100 days</strong> — send, deliberately early, so a courier failure or wrong address is still correctable.</li>
<li><strong>Minus 85 days</strong> — confirm delivery; file the signed receipt or tracking record with the contract.</li>
</ul>
<p>Set these as fixed dates in a shared calendar, not relative reminders in one person's inbox: the failure mode is the contract owner leaving in month seven with the series in a personal calendar.</p>
<p>Underneath sits one register, a row per agreement — counterparty, anniversary, notice period, notice form, notice address, window opens, window closes, owner. Rebuild it annually and reconcile against accounts payable: vendors you pay who are not in it are the contracts that renew unnoticed. A blank anniversary is not a gap in the register; it is an unread contract.</p>

<p>For the arithmetic: <a href="/days-from-today/90/">90 days from today</a> counts a deadline forward, the <a href="/days-between/">days between dates calculator</a> measures effective date to anniversary, and <a href="/business-days-from-today/45/">45 business days from today</a> works in weekdays. For months, <a href="/months-from-today/6/">6 months from today</a> handles the month-end cases day math gets wrong.</p>`,
  },
];

/** Article index for the homepage — the site's substance, surfaced up front. */
export const GUIDE_INDEX = () => ARTICLES.map(({ slug, title, description }) => ({ slug, title, description }));

/** Wrap tables so wide ones scroll in their own box instead of the page body. */
function wrapTables(html) {
  return html.replace(/<table class="purpose-table">[\s\S]*?<\/table>/g,
    (t) => `<div class="table-scroll">${t}</div>`);
}

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
        prose(wrapTables(article.body)),
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
      title: `Deadline & Date-Counting Guides | ${config.brand}`,
      description: 'How institutions actually count days: court deadlines, business days, notice periods, transfer timing, trial renewals, visa windows, and where the rules differ.',
      content: `
<h1>Guides</h1>
<p class="lede">How courts, banks, carriers, employers, and contracts actually count days — including the
edge cases that cause disputes, and the places where conventions genuinely differ.</p>
<section class="guide-list guide-list-grid">
${ARTICLES.map((a) => `<a class="guide-card" href="/guides/${a.slug}/"><h2>${esc(a.title)}</h2><p>${esc(a.description)}</p></a>`).join('\n')}
</section>`,
      buildDate,
    }),
  };

  return [...pages, index];
}
