import fs from 'fs';
import path from 'path';

// ===== 20+ NEWS RSS SOURCES =====
const FEEDS = [
  // Global Tech
  { url: 'https://techcrunch.com/feed/', category: 'Startups', icon: '🚀' },
  { url: 'https://www.theverge.com/rss/index.xml', category: 'Tools', icon: '⚡' },
  { url: 'https://feeds.wired.com/wired/index', category: 'AI Design', icon: '🤖' },
  { url: 'https://www.technologyreview.com/feed/', category: 'AI Design', icon: '🧠' },
  { url: 'https://mashable.com/feeds/rss/all', category: 'Tools', icon: '🛠️' },
  { url: 'https://venturebeat.com/feed/', category: 'AI Design', icon: '🤖' },
  { url: 'https://thenextweb.com/feed/', category: 'Startups', icon: '🚀' },
  { url: 'https://www.producthunt.com/feed', category: 'Tools', icon: '⚡' },
  { url: 'https://dev.to/feed', category: 'Tools', icon: '🛠️' },
  { url: 'https://css-tricks.com/feed/', category: 'Tools', icon: '🎨' },
  { url: 'https://smashingmagazine.com/feed/', category: 'AI Design', icon: '🎨' },
  { url: 'https://uxdesign.cc/feed', category: 'AI Design', icon: '🎨' },
  
  // Africa Tech
  { url: 'https://disruptafrica.com/feed/', category: 'Africa Tech', icon: '🌍' },
  { url: 'https://techpoint.africa/feed', category: 'Africa Tech', icon: '🌍' },
  { url: 'https://techcabal.com/feed/', category: 'Africa Tech', icon: '🌍' },
  { url: 'https://techinafrica.com/feed/', category: 'Africa Tech', icon: '🌍' },
  { url: 'https://itnewsafrica.com/feed/', category: 'Africa Tech', icon: '🌍' },
  { url: 'https://innovation-village.com/feed/', category: 'Africa Tech', icon: '🌍' },
  { url: 'https://techeconomy.ng/feed/', category: 'Africa Tech', icon: '🌍' },
  { url: 'https://techtrends.africa/feed/', category: 'Africa Tech', icon: '🌍' },
  { url: 'https://african.business/feed', category: 'Africa Tech', icon: '🌍' },
  { url: 'https://businesspost.ng/feed/', category: 'Funding', icon: '💰' },
];

const KEYWORDS = [
  'design', 'figma', 'ui', 'ux', 'africa', 'african', 'startup', 'ai',
  'artificial intelligence', 'developer', 'tech', 'nigeria', 'kenya',
  'ghana', 'fintech', 'funding', 'raises', 'product', 'saas', 'tool',
  'launch', 'app', 'software', 'engineer', 'innovation', 'digital',
  'mobile', 'venture', 'investment', 'series', 'unicorn', 'accelerator',
];

function stripHtml(html) {
  return html
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#\d+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  } catch {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }
}

function createSlug(title, date) {
  const dateSlug = (() => { try { return new Date(date).toISOString().split('T')[0]; } catch { return Date.now().toString(); } })();
  return `${title}-${dateSlug}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

function articleExists(slug) {
  return fs.existsSync(path.join('src/content/news', `${slug}.md`));
}

function isRelevant(title, description) {
  const text = (title + ' ' + description).toLowerCase();
  return KEYWORDS.some(kw => text.includes(kw));
}

function parseRSS(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];

    const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
                  item.match(/<title>(.*?)<\/title>/)?.[1];
    const link = item.match(/<link>(.*?)<\/link>/)?.[1] ||
                 item.match(/<link href="(.*?)"/)?.[1];
    const desc = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] ||
                 item.match(/<description>([\s\S]*?)<\/description>/)?.[1] || '';
    const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ||
                    item.match(/<published>(.*?)<\/published>/)?.[1];

    if (title && link) {
      items.push({
        title: stripHtml(title).trim(),
        link: link.trim(),
        description: stripHtml(desc).substring(0, 400),
        pubDate: pubDate?.trim() || new Date().toISOString(),
      });
    }
  }
  return items;
}

async function fetchNews() {
  console.log('📰 Fetching news from 20+ sources...\n');

  if (!fs.existsSync('src/content/news')) {
    fs.mkdirSync('src/content/news', { recursive: true });
  }

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const feed of FEEDS) {
    try {
      const res = await fetch(feed.url, {
        headers: { 'User-Agent': 'DesignTechNews RSS Reader/1.0' },
        signal: AbortSignal.timeout(8000),
      });

      if (!res.ok) { console.log(`✗ ${feed.url} — HTTP ${res.status}`); errors++; continue; }

      const xml = await res.text();
      const items = parseRSS(xml);
      const latest = items.slice(0, 5);
      let feedCreated = 0;

      for (const item of latest) {
        if (!isRelevant(item.title, item.description)) continue;

        const slug = createSlug(item.title, item.pubDate);
        if (articleExists(slug)) { skipped++; continue; }

        const date = formatDate(item.pubDate);
        const excerpt = (item.description.substring(0, 200) || 'Latest news from the design and tech ecosystem.').replace(/"/g, "'");

        const content = `---
title: "${item.title.replace(/"/g, "'")}"
category: "${feed.category}"
date: "${date}"
excerpt: "${excerpt}"
icon: "${feed.icon}"
---

${item.description || excerpt}

[Read full article](${item.link})
`;

        fs.writeFileSync(path.join('src/content/news', `${slug}.md`), content, 'utf-8');
        created++;
        feedCreated++;
      }

      console.log(`✓ ${feed.category} — ${new URL(feed.url).hostname} (${feedCreated} new)`);
    } catch (err) {
      console.log(`✗ ${feed.url} — ${err.message}`);
      errors++;
    }
  }

  console.log(`\n✅ Done! Created ${created} articles, skipped ${skipped} existing, ${errors} feed errors.`);
}

fetchNews();