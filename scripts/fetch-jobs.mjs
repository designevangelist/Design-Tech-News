import fs from 'fs';
import path from 'path';

// ===== JOB SOURCES =====
const REMOTIVE_CATEGORIES = [
  'software-dev',
  'design',
  'product',
  'data',
  'devops',
  'finance',
  'marketing',
];

const WWR_FEEDS = [
  { url: 'https://weworkremotely.com/categories/remote-programming-jobs.rss', type: 'Engineering' },
  { url: 'https://weworkremotely.com/categories/remote-design-jobs.rss', type: 'Design' },
  { url: 'https://weworkremotely.com/categories/remote-product-jobs.rss', type: 'Product' },
  { url: 'https://weworkremotely.com/categories/remote-front-end-programming-jobs.rss', type: 'Engineering' },
  { url: 'https://weworkremotely.com/categories/remote-back-end-programming-jobs.rss', type: 'Engineering' },
  { url: 'https://weworkremotely.com/categories/remote-full-stack-programming-jobs.rss', type: 'Engineering' },
];

const KEYWORDS = [
  'design', 'designer', 'developer', 'engineer', 'frontend', 'backend',
  'product', 'ui', 'ux', 'data', 'fullstack', 'mobile', 'ios', 'android',
  'react', 'node', 'python', 'javascript', 'typescript', 'software', 'web',
  'figma', 'brand', 'visual', 'motion', 'graphics', 'creative',
];

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#\d+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatJobType(type) {
  const map = {
    'full_time': 'Full-time',
    'part_time': 'Part-time',
    'contract': 'Contract',
    'internship': 'Internship',
    'freelance': 'Contract',
  };
  return map[type?.toLowerCase()] || 'Full-time';
}

// ✅ FIX: slug is based on the job URL — never changes between runs
function createSlug(jobUrl) {
  try {
    const url = new URL(jobUrl);
    // Use the pathname only — stable, unique per listing
    return url.pathname
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 80);
  } catch {
    // Fallback: hash-like slug from the raw URL string
    return jobUrl
      .toLowerCase()
      .replace(/https?:\/\//g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 80);
  }
}

function jobExists(slug) {
  return fs.existsSync(path.join('src/content/jobs', `${slug}.md`));
}

function isRelevant(title) {
  const t = title.toLowerCase();
  return KEYWORDS.some(kw => t.includes(kw));
}

function parseWWR(xml, jobType) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];
    const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
                  item.match(/<title>(.*?)<\/title>/)?.[1];
    const link = item.match(/<link>(.*?)<\/link>/)?.[1];
    const desc = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] || '';

    if (title && link) {
      const parts = title.split(':');
      const jobTitle = parts.length > 1 ? parts.slice(1).join(':').trim() : title.trim();
      const companyName = parts.length > 1 ? parts[0].trim() : 'Remote Company';

      items.push({
        title: jobTitle,
        company_name: companyName,
        url: link.trim(),
        job_type: 'full_time',
        jobTypeLabel: jobType,
        candidate_required_location: 'Remote',
        salary: '',
        description: stripHtml(desc).substring(0, 500),
      });
    }
  }
  return items;
}

async function fetchJobs() {
  console.log('🔍 Fetching jobs from all sources...\n');

  if (!fs.existsSync('src/content/jobs')) {
    fs.mkdirSync('src/content/jobs', { recursive: true });
  }

  let allJobs = [];

  // === SOURCE 1: Remotive API ===
  console.log('📡 Source 1: Remotive API');
  for (const category of REMOTIVE_CATEGORIES) {
    try {
      const res = await fetch(`https://remotive.com/api/remote-jobs?category=${category}&limit=10`);
      const data = await res.json();
      allJobs = allJobs.concat(data.jobs || []);
      console.log(`  ✓ ${category}: ${data.jobs?.length || 0} jobs`);
    } catch (err) {
      console.log(`  ✗ ${category}: ${err.message}`);
    }
  }

  // === SOURCE 2: WeWorkRemotely RSS ===
  console.log('\n📡 Source 2: WeWorkRemotely RSS');
  for (const feed of WWR_FEEDS) {
    try {
      const res = await fetch(feed.url, {
        headers: { 'User-Agent': 'DesignTechNews Job Fetcher' }
      });
      if (!res.ok) { console.log(`  ✗ ${feed.type}: HTTP ${res.status}`); continue; }
      const xml = await res.text();
      const items = parseWWR(xml, feed.type);
      allJobs = allJobs.concat(items.slice(0, 8));
      console.log(`  ✓ ${feed.type}: ${items.length} jobs`);
    } catch (err) {
      console.log(`  ✗ ${feed.type}: ${err.message}`);
    }
  }

  // Filter relevant jobs
  const filtered = allJobs.filter(job => isRelevant(job.title));
  console.log(`\n📋 ${filtered.length} relevant jobs from ${allJobs.length} total\n`);

  let created = 0;
  let skipped = 0;

  for (const job of filtered) {
    // ✅ FIX: slug derived from the job URL — same job always gets same slug
    const slug = createSlug(job.url);
    if (jobExists(slug)) { skipped++; continue; }

    const jobType = job.jobTypeLabel || formatJobType(job.job_type);
    const location = job.candidate_required_location || 'Remote';
    const salary = job.salary || '';
    const body = job.description
      ? stripHtml(job.description).substring(0, 5000)
      : `## About This Role\n\nThis is a ${jobType} position at ${job.company_name} based in ${location}.\n\n## How to Apply\n\nClick the Apply button to visit the company careers page for the full job description and to submit your application.`;

    const content = `---
title: "${job.title.replace(/"/g, "'")}"
company: "${job.company_name.replace(/"/g, "'")}"
location: "${location}"
jobType: "${jobType}"
${salary ? `salary: "${salary}"` : ''}
${job.company_logo ? `logo: "${job.company_logo}"` : ''}
link: "${job.url}"
---

${body}
`;

    fs.writeFileSync(path.join('src/content/jobs', `${slug}.md`), content, 'utf-8');
    created++;
    console.log(`✓ ${job.title.substring(0, 50)} @ ${job.company_name}`);
  }

  console.log(`\n✅ Done! Created ${created} new jobs, skipped ${skipped} existing.`);
}

fetchJobs();
