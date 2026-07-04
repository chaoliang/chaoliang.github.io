import { page, prose, esc } from '../lib/html.js';

export function legalPages(config, buildDate) {
  const make = (path, title, description, body) => ({
    path,
    html: page({
      config, path,
      title: `${title} | ${config.brand}`,
      description,
      content: `<article class="guide"><h1>${esc(title)}</h1>${prose(body)}</article>`,
      buildDate,
    }),
  });

  return [
    make('/about/', 'About', `What ${config.brand} is and how the calculators work.`, `
<p>${esc(config.brand)} is a set of fast, free date calculators: days from today, business days,
days between dates, age, and live holiday countdowns. It exists because date arithmetic fails people at
the worst moments — missed return windows, visa overstays, late filings — and most answers online are
either ad-walled or subtly wrong about conventions.</p>
<p>Every calculation here uses the conventions of courts and banks: today is day zero, calendar counts
include weekends, business-day counts skip them, and all arithmetic is done on whole calendar days anchored
to noon UTC, so daylight-saving transitions can never shift a result. Movable holidays are computed from
their actual rules (Easter from the ecclesiastical algorithm, Thanksgiving as the fourth Thursday of
November), not from lookup lists that go stale.</p>
<p>The site is intentionally lightweight: no accounts, no tracking beyond basic analytics/advertising
described in the <a href="/privacy/">privacy policy</a>, and every tool runs instantly in your browser.</p>
<p>Questions or corrections? <a href="/contact/">Get in touch</a> — accuracy reports are especially welcome.</p>`),

    make('/contact/', 'Contact', `How to reach the ${config.brand} team.`, `
<p>Found an error, have a feature request, or want to report a problem with the site?</p>
<p>Email us at <a href="mailto:${esc(config.contactEmail)}">${esc(config.contactEmail)}</a>.
We read everything; accuracy reports get priority.</p>
<p>Please include the page URL and, for calculation issues, the dates you entered and the result you expected.</p>`),

    make('/privacy/', 'Privacy Policy', `${config.brand} privacy policy: what data is collected and how it is used.`, `
<p>Last updated: ${esc(buildDate)}</p>
<h2>What we collect</h2>
<p>${esc(config.brand)} does not require accounts and does not collect personal information. Dates you enter
into calculators are processed entirely in your browser and are never transmitted to our servers.</p>
<h2>Advertising and cookies</h2>
<p>This site displays advertising served by Google AdSense. Google and its partners may use cookies
(including the DoubleClick cookie) to serve ads based on your prior visits to this or other websites.
You can opt out of personalized advertising at
<a href="https://adssettings.google.com" rel="noopener">Google Ads Settings</a>. Third-party vendors' use
of advertising cookies is described in
<a href="https://policies.google.com/technologies/ads" rel="noopener">Google's advertising policies</a>.</p>
<h2>Analytics</h2>
<p>We may use privacy-respecting, aggregate analytics to understand which pages are useful. No analytics
data is sold or shared beyond the processors involved in providing the service.</p>
<h2>Hosting logs</h2>
<p>Our hosting provider may keep standard server logs (IP address, user agent, requested URL) for security
and operational purposes, retained for a limited period.</p>
<h2>Your choices</h2>
<p>You can use browser settings or extensions to block cookies and ads; all calculators work fully without
them. For questions about this policy, <a href="/contact/">contact us</a>.</p>`),

    make('/terms/', 'Terms of Use', `${config.brand} terms of use.`, `
<p>Last updated: ${esc(buildDate)}</p>
<h2>Use of the site</h2>
<p>${esc(config.brand)} is provided free of charge for personal and commercial use. You may link to any page.
Automated scraping that burdens the service is not permitted.</p>
<h2>No warranty</h2>
<p>Calculations are provided in good faith and tested carefully, but the site is provided "as is", without
warranty of any kind. Conventions for counting days vary by jurisdiction, contract, and institution.</p>
<h2>Not professional advice</h2>
<p>Nothing on this site is legal, financial, immigration, or medical advice. For deadlines with legal or
financial consequences, verify the counting convention with the institution that set the deadline or a
qualified professional.</p>
<h2>Limitation of liability</h2>
<p>To the maximum extent permitted by law, we are not liable for any loss arising from reliance on the
calculations or content of this site.</p>
<h2>Changes</h2>
<p>These terms may be updated from time to time; the date above reflects the latest revision.</p>`),
  ];
}
