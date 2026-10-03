const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.nav-list');
const menuItems = document.querySelectorAll('.nav-list a');
const yearNode = document.querySelector('#year');
const revealItems = document.querySelectorAll('.reveal');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isActive = mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active', isActive);
    hamburger.setAttribute('aria-expanded', String(isActive));
  });
}

if (mobileMenu && hamburger) {
  menuItems.forEach((item) => {
    item.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
