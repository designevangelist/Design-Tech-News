// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
}

if (mobileClose) {
  mobileClose.addEventListener('click', () => {
    hamburger && hamburger.classList.remove('open');
    mobileNav && mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
}

// Close mobile nav on link click
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger && hamburger.classList.remove('open');
    mobileNav && mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== FILTER BUTTONS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.filter-bar');
    group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    const container = group.nextElementSibling;
    if (!container) return;
    const cards = container.querySelectorAll('article');

    const keywords = {
      // Jobs
      design: ['design', 'designer', 'ui', 'ux', 'brand', 'visual'],
      engineering: ['engineer', 'developer', 'frontend', 'backend', 'ios', 'android', 'software', 'fullstack'],
      product: ['product manager', 'product owner', 'pm '],
      data: ['data', 'ml', 'machine learning', 'ai ', 'analyst'],
      // News
      'ai design': ['figma', 'adobe', 'ai', 'firefly', 'copilot', 'claude', 'gpt', 'design tool'],
      'africa tech': ['africa', 'african', 'nigeria', 'kenya', 'ghana', 'lagos', 'nairobi', 'moniepoint', 'wave', 'flutterwave'],
      'tools': ['vercel', 'github', 'linear', 'tool', 'launch', 'release', 'update', 'introduces', 'integrat'],
      'startups': ['startup', 'arr', 'saas', 'enterprise', 'unicorn', 'raises', 'series', 'funding'],
      'funding': ['raises', 'funding', 'million', 'series', 'investment', 'round'],
    };

    cards.forEach(card => {
      if (filter === 'all') {
        card.style.display = '';
        return;
      }
      const title = card.querySelector('h3, h4')?.textContent.toLowerCase() || '';
      const matches = keywords[filter]?.some(kw => title.includes(kw));
      card.style.display = matches ? '' : 'none';
    });
  });
});

// ===== ENHANCED SEARCH =====
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  let debounceTimer;

  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.card, .job-card-v, .news-card');
      let visibleCount = 0;

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const matches = query === '' || text.includes(query);
        card.style.display = matches ? '' : 'none';
        if (matches) visibleCount++;
      });

      // Show no results message
      let noResults = document.getElementById('no-results');
      if (!noResults) {
        noResults = document.createElement('p');
        noResults.id = 'no-results';
        noResults.style.cssText = 'color:var(--text-muted);font-size:1rem;padding:40px 0;text-align:center;width:100%;';
        noResults.textContent = 'No results found. Try a different search term.';
        searchInput.closest('.container')?.querySelector('.card-grid, .jobs-list')?.appendChild(noResults);
      }
      noResults.style.display = visibleCount === 0 && query !== '' ? 'block' : 'none';

      // Update pagination if active
      const paginationCtrl = document.querySelector('.pagination-controls');
      if (paginationCtrl) {
        paginationCtrl.style.display = query === '' ? 'flex' : 'none';
      }
    }, 300);
  });
}

// ===== NEWSLETTER FORM =====
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button');
    if (input && input.value) {
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#16A34A';
      input.value = '';
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
      }, 3000);
    }
  });
});

// ===== MAILCHIMP AJAX =====
document.addEventListener('DOMContentLoaded', () => {
  const mcForm = document.getElementById('mc-form');
  if (mcForm) {
    mcForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('mc-email').value;
      const btn = document.getElementById('mc-btn');
      
      btn.textContent = 'Subscribing...';
      btn.disabled = true;

      const url = `https://app.us16.list-manage.com/subscribe/post-json?u=3b667d867a0c7d77bc2de09db&id=3d67b5db75&f_id=00bdc2e1f0&EMAIL=${encodeURIComponent(email)}&c=handleMailchimpResponse`;

      const script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);

      window.handleMailchimpResponse = (data) => {
        document.body.removeChild(script);
        btn.textContent = '✓ Subscribed!';
        btn.style.background = '#16A34A';
        document.getElementById('newsletter-default').style.display = 'none';
        document.getElementById('newsletter-success').style.display = 'flex';
      };
    });
  }
});

// ===== MAILCHIMP AJAX - ALL PAGES =====
document.querySelectorAll('.newsletter-sub').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button[type="submit"]');
    const email = emailInput.value;
    const successDiv = form.closest('.newsletter-layout').querySelector('.newsletter-sub-success');

    btn.textContent = 'Subscribing...';
    btn.disabled = true;

    const url = `https://app.us16.list-manage.com/subscribe/post-json?u=3b667d867a0c7d77bc2de09db&id=3d67b5db75&f_id=00bdc2e1f0&EMAIL=${encodeURIComponent(email)}&c=handleMCResponse`;

    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);

    window.handleMCResponse = (data) => {
      document.body.removeChild(script);
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#16A34A';
      if (successDiv) {
        successDiv.style.display = 'flex';
      }
    };
  });
});

// ===== ACTIVE NAV =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.card, .job-card, .news-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s';
  observer.observe(el);
});

// ===== PAGINATION =====
function initPagination(containerSelector, itemSelector, perPage = 12) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const items = Array.from(container.querySelectorAll(itemSelector));
  if (items.length <= perPage) return;

  let currentPage = 1;
  const totalPages = Math.ceil(items.length / perPage);

  function showPage(page) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    items.forEach((item, i) => {
      item.style.display = i >= start && i < end ? '' : 'none';
    });
    updateControls();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateControls() {
    const ctrl = document.querySelector(`${containerSelector}-pagination`);
    if (!ctrl) return;
    ctrl.querySelector('.page-info').textContent = `Page ${currentPage} of ${totalPages}`;
    ctrl.querySelector('.btn-prev').disabled = currentPage === 1;
    ctrl.querySelector('.btn-next').disabled = currentPage === totalPages;
  }

  // Create pagination controls
  const ctrl = document.createElement('div');
  ctrl.className = 'pagination-controls';
  ctrl.setAttribute('id', `${containerSelector.replace('.', '')}-pagination`);
  ctrl.innerHTML = `
    <button class="btn-prev pagination-btn">← Previous</button>
    <span class="page-info">Page 1 of ${totalPages}</span>
    <button class="btn-next pagination-btn">Next →</button>
  `;
  container.parentNode.insertBefore(ctrl, container.nextSibling);

  ctrl.querySelector('.btn-prev').addEventListener('click', () => {
    if (currentPage > 1) { currentPage--; showPage(currentPage); }
  });
  ctrl.querySelector('.btn-next').addEventListener('click', () => {
    if (currentPage < totalPages) { currentPage++; showPage(currentPage); }
  });

  showPage(1);
}

// Init pagination on jobs and news pages
document.addEventListener('DOMContentLoaded', () => {
  initPagination('.card-grid', '.news-card', 12);
  initPagination('.jobs-list', '.job-card-v', 12);
});