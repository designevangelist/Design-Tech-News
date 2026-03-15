import fs from 'fs';
import path from 'path';

// Categories to fetch from Remotive
const CATEGORIES = [
  'software-dev',
  'design',
  'product',
  'data',
];

// Strip HTML tags from description
function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Convert job type to readable format
function formatJobType(type) {
  const map = {
    'full_time': 'Full-time',
    'part_time': 'Part-time',
    'contract': 'Contract',
    'internship': 'Internship',
    'freelance': 'Contract',
  };
  return map[type] || 'Full-time';
}

// Create slug from title and company
function createSlug(title, company, id) {
  return `${title}-${company}-${id}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

// Check if file already exists
function jobExists(slug) {
  const filePath = path.join('src/content/jobs', `${slug}.md`);
  return fs.existsSync(filePath);
}

async function fetchJobs() {
  console.log('🔍 Fetching jobs from Remotive API...');
  
  let allJobs = [];

  for (const category of CATEGORIES) {
    try {
      const res = await fetch(`https://remotive.com/api/remote-jobs?category=${category}&limit=10`);
      const data = await res.json();
      allJobs = allJobs.concat(data.jobs || []);
      console.log(`✓ Fetched ${data.jobs?.length || 0} jobs from ${category}`);
    } catch (err) {
      console.error(`✗ Failed to fetch ${category}:`, err.message);
    }
  }

  // Filter for design and tech relevant jobs
  const keywords = ['design', 'designer', 'developer', 'engineer', 'frontend', 'backend', 'product', 'ui', 'ux', 'data', 'fullstack', 'mobile', 'ios', 'android', 'react', 'node', 'python'];
  
  const filtered = allJobs.filter(job => {
    const titleLower = job.title.toLowerCase();
    return keywords.some(kw => titleLower.includes(kw));
  });

  console.log(`\n📋 Found ${filtered.length} relevant jobs after filtering`);

  // Ensure directory exists
  if (!fs.existsSync('src/content/jobs')) {
    fs.mkdirSync('src/content/jobs', { recursive: true });
  }

  let created = 0;
  let skipped = 0;

  for (const job of filtered) {
    const slug = createSlug(job.title, job.company_name, job.id);
    
    if (jobExists(slug)) {
      skipped++;
      continue;
    }

    const jobType = formatJobType(job.job_type);
    const location = job.candidate_required_location || 'Remote';
    const salary = job.salary || '';
    const description = stripHtml(job.description).substring(0, 300) + '...';
    const date = new Date(job.publication_date).toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });

    // Clean description for markdown body
    const bodyText = stripHtml(job.description).substring(0, 1500);

    const content = `---
title: "${job.title.replace(/"/g, "'")}"
company: "${job.company_name.replace(/"/g, "'")}"
location: "${location}"
jobType: "${jobType}"
${salary ? `salary: "${salary}"` : ''}
link: "${job.url}"
---

${bodyText}
`;

    const filePath = path.join('src/content/jobs', `${slug}.md`);
    fs.writeFileSync(filePath, content, 'utf-8');
    created++;
    console.log(`✓ Created: ${job.title} at ${job.company_name}`);
  }

  console.log(`\n✅ Done! Created ${created} new jobs, skipped ${skipped} existing.`);
}

fetchJobs();