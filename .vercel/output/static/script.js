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

document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger && hamburger.classList.remove('open');
    mobileNav && mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== PAGINATION =====
function initPagination(containerSelector, itemSelector, perPage = 12) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  let currentPage = 1;

  function getAllItems() {
    return Array.from(container.querySelectorAll(itemSelector));
  }

  function getVisibleItems() {
    return getAllItems().filter(item => !item.hasAttribute('data-filter-hidden'));
  }

  function showPage(page) {
    const visibleItems = getVisibleItems();
    const totalPages = Math.max(Math.ceil(visibleItems.length / perPage), 1);
    currentPage = Math.min(Math.max(page, 1), totalPages);

    getAllItems().forEach(item => item.setAttribute('data-page-hidden', 'true'));

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    visibleItems.slice(start, end).forEach(item => item.removeAttribute('data-page-hidden'));

    updateControls(totalPages);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateControls(totalPages) {
    const ctrl = document.getElementById(`pagination-ctrl-${containerSelector.replace(/[^a-z0-9]/gi, '')}`);
    if (!ctrl) return;
    ctrl.querySelector('.page-info').textContent = `Page ${currentPage} of ${totalPages}`;
    ctrl.querySelector('.btn-prev').disabled = currentPage <= 1;
    ctrl.querySelector('.btn-next').disabled = currentPage >= totalPages;
    ctrl.style.display = totalPages <= 1 ? 'none' : 'flex';
  }

  const ctrlId = `pagination-ctrl-${containerSelector.replace(/[^a-z0-9]/gi, '')}`;
  const ctrl = document.createElement('div');
  ctrl.className = 'pagination-controls';
  ctrl.id = ctrlId;
  ctrl.innerHTML = `
    <button class="btn-prev pagination-btn">← Previous</button>
    <span class="page-info">Page 1 of 1</span>
    <button class="btn-next pagination-btn">Next →</button>
  `;
  container.parentNode.insertBefore(ctrl, container.nextSibling);

  ctrl.querySelector('.btn-prev').addEventListener('click', () => {
    if (currentPage > 1) showPage(currentPage - 1);
  });
  ctrl.querySelector('.btn-next').addEventListener('click', () => {
    const total = Math.ceil(getVisibleItems().length / perPage);
    if (currentPage < total) showPage(currentPage + 1);
  });

  const style = document.createElement('style');
  style.textContent = `[data-page-hidden="true"] { display: none !important; }`;
  document.head.appendChild(style);

  container._resetPagination = () => showPage(1);

  showPage(1);
}

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
      design: ['product designer', 'ui designer', 'ux designer', 'ui/ux', 'graphic designer', 'brand designer', 'visual designer', 'web designer', 'motion designer', 'design lead', 'head of design', 'creative director'],
      engineering: ['engineer', 'developer', 'frontend', 'backend', 'fullstack', 'full-stack', 'full stack', 'ios developer', 'android developer', 'software developer', 'web developer', 'devops', 'python', 'java ', 'react developer', 'node developer'],
      product: ['product manager', 'product owner', 'head of product', 'vp of product', 'director of product'],
      data: ['data analyst', 'data scientist', 'data engineer', 'machine learning', 'ml engineer', 'ai engineer', 'analytics'],
      'ai design': ['figma', 'adobe', 'firefly', 'copilot', 'claude', 'gpt', 'design tool', 'ai design', 'ux tool'],
      'africa tech': ['africa', 'african', 'nigeria', 'kenya', 'ghana', 'lagos', 'nairobi', 'moniepoint', 'wave', 'flutterwave', 'paystack'],
      'tools': ['vercel', 'github', 'linear', 'tool', 'launch', 'release', 'introduces', 'integrat', 'new feature'],
      'startups': ['startup', 'arr', 'saas', 'enterprise', 'unicorn', 'raises', 'series', 'funding'],
      'funding': ['raises', 'funding', 'million', 'series', 'investment', 'round'],
    };

    cards.forEach(card => {
      if (filter === 'all') {
        card.removeAttribute('data-filter-hidden');
      } else {
        const title = card.querySelector('h3, h4')?.textContent.toLowerCase() || '';
        const matches = keywords[filter]?.some(kw => title.includes(kw));
        if (matches) {
          card.removeAttribute('data-filter-hidden');
        } else {
          card.setAttribute('data-filter-hidden', 'true');
        }
      }
    });

    setTimeout(() => {
      if (container._resetPagination) container._resetPagination();
    }, 50);
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
        if (matches) {
          card.removeAttribute('data-filter-hidden');
          visibleCount++;
        } else {
          card.setAttribute('data-filter-hidden', 'true');
        }
      });

      let noResults = document.getElementById('no-results');
      if (!noResults) {
        noResults = document.createElement('p');
        noResults.id = 'no-results';
        noResults.style.cssText = 'color:var(--text-muted);font-size:1rem;padding:40px 0;text-align:center;width:100%;';
        noResults.textContent = 'No results found. Try a different search term.';
        searchInput.closest('.container')?.querySelector('.card-grid, .jobs-list')?.appendChild(noResults);
      }
      noResults.style.display = visibleCount === 0 && query !== '' ? 'block' : 'none';

      const container = searchInput.closest('.container')?.querySelector('.card-grid, .jobs-list');
      if (container?._resetPagination) {
        setTimeout(() => container._resetPagination(), 50);
      }

      const paginationCtrl = document.querySelector('.pagination-controls');
      if (paginationCtrl) {
        paginationCtrl.style.display = query === '' ? 'flex' : 'none';
      }
    }, 300);
  });
}

// ===== NEWSLETTER FORM =====
const newsletterForms = document.querySelectorAll('.newsletter-form:not(#mc-form):not(.newsletter-sub)');
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

// ===== MAILCHIMP AJAX - HOMEPAGE =====
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
      if (successDiv) successDiv.style.display = 'flex';
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

// ===== INIT PAGINATION =====
document.addEventListener('DOMContentLoaded', () => {
  initPagination('.card-grid', '.news-card', 12);
  initPagination('.jobs-list', '.job-card-v', 12);
});