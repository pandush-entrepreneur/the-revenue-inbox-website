/* The page is readable without script. JavaScript enhances existing controls. */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// The compact client row scrolls natively, with no autoplay or duplicate content.

// Real campaign totals remain in HTML. Motion introduces the report, never changes its data.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const reports = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('report-entered');
      reports.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-campaign-report], .conversion-chart').forEach(report => reports.observe(report));
}

const filters = document.querySelector('.case-filters');
if (filters) {
  filters.hidden = false;
  filters.querySelectorAll('[data-case-filter]').forEach(button => {
    button.addEventListener('click', () => {
      filters.querySelectorAll('button').forEach(option => option.setAttribute('aria-pressed', String(option === button)));
      document.querySelectorAll('[data-case-type]').forEach(row => {
        row.hidden = button.dataset.caseFilter !== 'all' && row.dataset.caseType !== button.dataset.caseFilter;
      });
    });
  });
}
const menu = document.querySelector('.mobile-menu');
if (menu) {
  const closeMenu = () => { menu.open = false; };
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      closeMenu();
      menu.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', event => {
    if (menu.open && !menu.contains(event.target)) closeMenu();
  });
}
let scrollPending = false;
window.addEventListener('scroll', () => {
  if (scrollPending) return;
  scrollPending = true;
  requestAnimationFrame(() => {
    document.body.classList.toggle('is-scrolled', window.scrollY > 48);
    scrollPending = false;
  });
}, { passive: true });

// Vimeo receives no request until the visitor chooses a video.
document.querySelectorAll('[data-video]').forEach(facade => {
  facade.addEventListener('click', event => {
    event.preventDefault();
    const frame = document.createElement('iframe');
    frame.src = `https://player.vimeo.com/video/${facade.dataset.video}?autoplay=1&title=0&byline=0&portrait=0&dnt=1&color=8A40EA`;
    frame.title = facade.getAttribute('aria-label').replace('Watch testimonial: ', 'Client testimonial: ');
    frame.allow = 'autoplay; fullscreen; picture-in-picture';
    frame.allowFullscreen = true;
    const player = document.createElement('div');
    player.className = 'video-player';
    player.append(frame);
    const fallback = document.createElement('a');
    fallback.href = facade.href;
    fallback.target = '_blank';
    fallback.rel = 'noopener';
    fallback.className = 'text-link';
    fallback.textContent = 'Open video on Vimeo';
    facade.replaceWith(player, fallback);
    frame.focus();
  });
});

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const model = document.querySelector('.pipeline-math-section');
if (model) {
  const scenarios = { conservative: 3, expected: 7, strong: 13 };
  const breakEvenValues = { 15000: '1.2', 25000: '0.72', 50000: '0.36' };
  model.querySelectorAll('input[name="acv"]').forEach(input => {
    input.addEventListener('change', () => {
      const acv = Number(input.value);
      for (const [scenario, deals] of Object.entries(scenarios)) {
        model.querySelector(`.revenue-value[data-scenario="${scenario}"]`).textContent = currency.format(acv * deals);
      }
      model.querySelector('#acv-assumption').textContent = `${currency.format(acv)} average contract value`;
      model.querySelector('#break-even-value').textContent = breakEvenValues[acv];
      model.querySelector('#break-even-copy').textContent = acv === 15000
        ? 'At a $15,000 contract value, 1.2 closed deals cover the full 90-day program. The conservative scenario returns three.'
        : `At a ${currency.format(acv)} contract value, less than one closed deal covers the full 90-day program. The conservative scenario returns three.`;
    });
  });
}

// Only off-screen content receives reveal styling, and only after observation is ready.
// Full opacity preserves contrast even if a browser never delivers an observer event.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-intro > *, .case-row, .process-list li, .testimonial, .founder, .pricing-panel, .guarantee, .case-story > *, .campaign-evidence').forEach(element => {
    if (element.getBoundingClientRect().top <= window.innerHeight) return;
    observer.observe(element);
    element.classList.add('reveal-ready');
  });
  reducedMotion.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    document.querySelectorAll('.reveal-ready').forEach(element => element.classList.add('is-visible'));
  });
}
