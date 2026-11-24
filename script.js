// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Email link: assemble the address only on click so it isn't in the page source
document.querySelectorAll('.email-link').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  location.href = 'mailto:' + a.dataset.user + '@' + a.dataset.domain;
}));

// "abstract" links toggle the .abstract block in the same entry
document.querySelectorAll('[data-toggle]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  const block = a.closest('.entry-text').querySelector('.abstract');
  if (block) block.hidden = !block.hidden;
}));
