document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const navLinks  = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');

      const lines = hamburger.querySelectorAll('span');
      if (hamburger.classList.contains('active')) {
        lines[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        lines[1].style.opacity   = '0';
        lines[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
      } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity   = '1';
        lines[2].style.transform = 'none';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        const lines = hamburger.querySelectorAll('span');
        lines.forEach(l => l.style.transform = 'none');
        lines[1].style.opacity = '1';
      });
    });
  }

  // --- Sticky Header scroll effect ---
  const header = document.querySelector('.header-nav');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
      }
    });
  }

  // --- Animated Counters ---
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const step     = Math.ceil(target / (duration / 16));
    let current    = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current.toLocaleString() + (target >= 100 ? '+' : '');
    }, 16);
  }

  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

  // --- Events Filtering Logic ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const eventItems    = document.querySelectorAll('.event-item');

  if (filterButtons.length > 0 && eventItems.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');

        eventItems.forEach(item => {
          const itemType = item.getAttribute('data-type');
          if (filterValue === 'all' || itemType === filterValue) {
            item.style.display = 'flex';
            item.style.opacity = '0';
            setTimeout(() => {
              item.style.opacity    = '1';
              item.style.transition = 'opacity 0.35s ease';
            }, 40);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Contact Form Modal ---
  const contactForm   = document.getElementById('contactForm');
  const modal         = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModal');

  if (contactForm && modal) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = document.getElementById('formName').value.trim();
      const email   = document.getElementById('formEmail').value.trim();
      const subject = document.getElementById('formSubject').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (name && email && subject && message) {
        modal.classList.add('active');
        contactForm.reset();
      }
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // --- Scroll Animation (fade-in cards) ---
  const observerOpts = { root: null, rootMargin: '0px', threshold: 0.1 };

  const scrollObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, observerOpts);

  const scrollEls = document.querySelectorAll(
    '.overview-card, .timeline-content, .event-item, .branch-card, .leader-card'
  );
  scrollEls.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(22px)';
    el.style.transition = 'opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)';
    scrollObserver.observe(el);
  });

});
