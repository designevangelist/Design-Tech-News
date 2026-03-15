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

// ===== SEARCH =====
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card, .job-card, .news-card');
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? '' : 'none';
    });
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
