/**
 * IndexNow ping: push every sitemap URL to Bing (which feeds ChatGPT/Copilot
 * retrieval). Run by CI on push events only — the daily cron rebuild already
 * refreshes content and Bing re-crawls on its own schedule.
 */
import { readFile } from 'node:fs/promises';

const KEY = 'aa3f81c62e074d5f9b27c40d1e85f6a9';

const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) throw new Error('no URLs found in dist/sitemap.xml');
const host = new URL(urls[0]).host;

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host,
    key: KEY,
    keyLocation: `https://${host}/${KEY}.txt`,
    urlList: urls,
  }),
});
// Never fail the deploy over a ping: Bing may 4xx until the key file is live.
console.log(`IndexNow: submitted ${urls.length} URLs for ${host} — HTTP ${res.status}`);
