import fs from 'fs';
import path from 'path';

// RSS feeds to fetch from
const FEEDS = [
  {
    url: 'https://techcrunch.com/feed/',
    category: 'Startups',
    icon: '🚀'
  },
  {
    url: 'https://www.theverge.com/rss/index.xml',
    category: 'Tools',
    icon: '⚡'
  },
  {
    url: 'https://feeds.feedburner.com/TechCrunch/',
    category: 'Africa Tech',
    icon: '🌍'
  },
  {
    url: 'https://disruptafrica.com/feed/',
    category: 'Africa Tech',
    icon: '🌍'
  },
];

// Keywords to filter relevant articles
const KEYWORDS = [
  'design', 'designer', 'figma', 'ui', 'ux', 'africa', 'african',
  'startup', 'ai', 'artificial intelligence', 'developer', 'tech',
  'nigeria', 'kenya', 'ghana', 'fintech', 'funding', 'raises',
  'product', 'saas', 'tool', 'launch', 'app', 'software'
];

// Parse RSS XML manually
function parseRSS(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];

    const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
                  item.match(/<title>(.*?)<\/title>/);
    const link = item.match(/<link>(.*?)<\/link>/) ||
                 item.match(/<link href="(.*?)"/);
    const desc = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) ||
                 item.match(/<description>(.*?)<\/description>/);
    const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/) ||
                    item.match(/<published>(.*?)<\/published>/);

    if (title && link) {
      items.push({
        title: title[1].trim(),
        link: link[1].trim(),
        description: desc ? desc[1].replace(/<[^>]*>/g, '').trim().substring(0, 300) : '',
        pubDate: pubDate ? pubDate[1].trim() : new Date().toISOString(),
      });
    }
  }

  return items;
}

// Format date nicely
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

// Create slug
function createSlug(title, date) {
  const dateSlug = new Date(date).toISOString().split('T')[0];
  return `${title}-${dateSlug}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

// Check if article already exists
function articleExists(slug) {
  const filePath = path.join('src/content/news', `${slug}.md`);
  return fs.existsSync(filePath);
}

// Check if title is relevant
function isRelevant(title, description) {
  const text = (title + ' ' + description).toLowerCase();
  return KEYWORDS.some(kw => text.includes(kw));
}

async function fetchNews() {
  console.log('📰 Fetching news from RSS feeds...');

  if (!fs.existsSync('src/content/news')) {
    fs.mkdirSync('src/content/news', { recursive: true });
  }

  let created = 0;
  let skipped = 0;

  for (const feed of FEEDS) {
    try {
      console.log(`\n🔍 Fetching: ${feed.url}`);
      const res = await fetch(feed.url, {
        headers: { 'User-Agent': 'DesignTechNews RSS Reader' }
      });

      if (!res.ok) {
        console.log(`✗ Failed: ${res.status}`);
        continue;
      }

      const xml = await res.text();
      const items = parseRSS(xml);
      console.log(`  Found ${items.length} items`);

      // Only take latest 5 from each feed
      const latest = items.slice(0, 5);

      for (const item of latest) {
        if (!isRelevant(item.title, item.description)) {
          continue;
        }

        const slug = createSlug(item.title, item.pubDate);

        if (articleExists(slug)) {
          skipped++;
          continue;
        }

        const date = formatDate(item.pubDate);
        const excerpt = item.description.substring(0, 200).replace(/"/g, "'") || 
                        `Latest news from the design and tech ecosystem.`;

        const content = `---
title: "${item.title.replace(/"/g, "'")}"
category: "${feed.category}"
date: "${date}"
excerpt: "${excerpt}"
icon: "${feed.icon}"
---

${item.description || excerpt}

[Read the full article](${item.link})
`;

        const filePath = path.join('src/content/news', `${slug}.md`);
        fs.writeFileSync(filePath, content, 'utf-8');
        created++;
        console.log(`  ✓ Created: ${item.title.substring(0, 60)}`);
      }
    } catch (err) {
      console.error(`  ✗ Error fetching ${feed.url}:`, err.message);
    }
  }

  console.log(`\n✅ Done! Created ${created} new articles, skipped ${skipped} existing.`);
}

fetchNews();