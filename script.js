// Inicializar iconos Lucide
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // === HEADER: scroll effect ===
  const header = document.querySelector('[data-header]');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  // === MENÚ MÓVIL ===
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const siteNav = document.querySelector('[data-nav]');
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('active');
  });
  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // === FILTRO CARTA ===
  const tabs = document.querySelectorAll('[role="tab"]');
  const cards = document.querySelectorAll('.menu-card');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const filtro = tab.dataset.menuFilter;
      cards.forEach(card => {
        const show = filtro === 'todos' || card.dataset.category === filtro;
        card.style.display = show ? 'flex' : 'none';
        if (show) { card.style.animation = 'fadeIn 0.3s ease'; }
      });
    });
  });

  // === ANIMACIÓN DE ENTRADA AL SCROLL ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.menu-card, .location-card, .review-card, .about-img, .badge').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });
});

// CSS animaciones via JS
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .fade-up.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);
