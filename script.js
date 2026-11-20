// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (remembers choice; defaults to system preference)
const root = document.documentElement;
document.querySelector('.theme-toggle').addEventListener('click', () => {
  const systemDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const current = root.dataset.theme || (systemDark ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Project filters
const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.toggle('active', c === chip));
  const f = chip.dataset.filter;
  projects.forEach(p => { p.hidden = f !== 'all' && !p.dataset.tags.split(' ').includes(f); });
}));

// Reveal sections on scroll + highlight current nav link
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav ul a');
if ('IntersectionObserver' in window) {
  const revealable = [...sections].filter(s => !s.classList.contains('hero'));
  revealable.forEach(s => s.classList.add('reveal'));
  const revealer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  revealable.forEach(s => revealer.observe(s));

  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));
}
