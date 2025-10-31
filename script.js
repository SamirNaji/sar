// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Intersection Observer for reveal-on-scroll
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));

// Subtle parallax for hero blobs on pointer move
const hero = document.querySelector('.hero');
if (hero) {
  const blobs = hero.querySelectorAll('.blob');
  hero.addEventListener('pointermove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    blobs.forEach((b, i) => {
      const strength = (i + 1) * 6; // different layers
      b.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
  });
}

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Theme and accent toggles with persistence
const htmlEl = document.documentElement;
const THEME_KEY = 'samir_theme';
const ACCENT_KEY = 'samir_accent';

function applyPrefs() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const savedAccent = localStorage.getItem(ACCENT_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    htmlEl.setAttribute('data-theme', savedTheme);
  }
  if (savedAccent === 'blue' || savedAccent === 'violet') {
    htmlEl.setAttribute('data-accent', savedAccent);
  }
}

applyPrefs();

const themeBtn = document.querySelector('.theme-toggle');
const accentBtn = document.querySelector('.accent-toggle');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
  });
}

if (accentBtn) {
  accentBtn.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-accent') || 'violet';
    const next = current === 'violet' ? 'blue' : 'violet';
    htmlEl.setAttribute('data-accent', next);
    localStorage.setItem(ACCENT_KEY, next);
  });
}


