/** HTML layout and shared components. All builders return strings. */

export function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

function adsenseHead(config) {
  if (!config.adsensePublisherId) return '';
  return `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.adsensePublisherId}" crossorigin="anonymous"></script>`;
}

/** In-content ad container. Renders nothing until a publisher ID is configured. */
export function adSlot(config) {
  if (!config.adsensePublisherId) return '';
  return `<div class="ad-slot"><ins class="adsbygoogle" style="display:block" data-ad-client="${config.adsensePublisherId}" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>`;
}

export function page({ config, path, title, description, content, faq = null, buildDate, schema = [] }) {
  const canonical = config.siteUrl.replace(/\/$/, '') + path;
  const ld = [...schema];
  if (faq && faq.length) {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    });
  }
  ld.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: config.brand, item: config.siteUrl },
      ...(path !== '/' ? [{ '@type': 'ListItem', position: 2, name: title.split(/[|–]/)[0].trim(), item: canonical }] : []),
    ],
  });
  const faqLd = ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');

  return `<!doctype html>
<html lang="${config.language}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<link rel="canonical" href="${canonical}">
<link rel="stylesheet" href="/styles.css">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#2242c8"/><text x="16" y="22" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" fill="#fff">31</text></svg>')}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
${adsenseHead(config)}${faqLd}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <nav aria-label="Main navigation" class="site-nav">
    <a class="brand" href="/"><span class="brand-mark">31</span> ${esc(config.brand)}</a>
    <div class="nav-links">
      <a href="/days-from-today/">Days from today</a>
      <a href="/business-days-from-today/">Business days</a>
      <a href="/days-until/">Countdowns</a>
      <a href="/guides/">Guides</a>
    </div>
  </nav>
</header>
<main id="main">
${content}
</main>
<footer class="site-footer">
  <div class="footer-grid">
    <div>
      <p class="footer-brand">${esc(config.brand)}</p>
      <p class="footer-note">${esc(config.tagline)}. Dates computed for your local timezone. Last built ${esc(buildDate)}.</p>
    </div>
    <nav aria-label="Tools" class="footer-col">
      <h2>Tools</h2>
      <a href="/days-between/">Days between dates</a>
      <a href="/age-calculator/">Age calculator</a>
      <a href="/days-from-today/">Days from today</a>
      <a href="/business-days-from-today/">Business days from today</a>
      <a href="/weeks-from-today/">Weeks from today</a>
      <a href="/months-from-today/">Months from today</a>
    </nav>
    <nav aria-label="Site" class="footer-col">
      <h2>Site</h2>
      <a href="/about/">About</a>
      <a href="/contact/">Contact</a>
      <a href="/privacy/">Privacy policy</a>
      <a href="/terms/">Terms of use</a>
    </nav>
  </div>
</footer>
<script type="module" src="/app.js"></script>
</body>
</html>`;
}

/** Giant answer block. dataAttrs lets the client script refresh stale numbers. */
export function answerHero({ eyebrow, big, sub, dataAttrs = '' }) {
  return `<section class="answer-hero" ${dataAttrs}>
  <p class="eyebrow">${eyebrow}</p>
  <p class="answer-big">${big}</p>
  <p class="answer-sub">${sub}</p>
</section>`;
}

export function factsList(rows) {
  const items = rows
    .filter(([, v]) => v !== null && v !== undefined && v !== '')
    .map(([k, v, attrs]) => `<div class="fact"><dt>${esc(k)}</dt><dd${attrs ? ' ' + attrs : ''}>${v}</dd></div>`)
    .join('\n');
  return `<section class="facts" aria-label="Details"><dl>${items}</dl></section>`;
}

export function faqBlock(faq) {
  const items = faq.map(([q, a]) =>
    `<details class="faq-item"><summary>${esc(q)}</summary><p>${a}</p></details>`).join('\n');
  return `<section class="faq" aria-labelledby="faq-heading">
  <h2 id="faq-heading">Frequently asked questions</h2>
  ${items}
</section>`;
}

export function linksGrid(title, links) {
  const items = links.map(({ href, label }) =>
    `<a class="chip" href="${href}">${esc(label)}</a>`).join('\n');
  return `<section class="related" aria-label="${esc(title)}">
  <h2>${esc(title)}</h2>
  <div class="chip-grid">${items}</div>
</section>`;
}

export function prose(html) {
  return `<section class="prose">${html}</section>`;
}

/** WebApplication JSON-LD for interactive calculator pages (active rich-result type). */
export function webAppSchema(config, path, name, description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: config.siteUrl.replace(/\/$/, '') + path,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}
