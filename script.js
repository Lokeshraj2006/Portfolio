/* ===================================================================
   LOKESHRAJ M — Portfolio Website
   Interactive Scripts
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Initialize Lucide Icons ──
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ══════════════════════════════════════════════
  // MOBILE NAVIGATION
  // ══════════════════════════════════════════════
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', toggleMobileMenu);
  navOverlay.addEventListener('click', closeMobileMenu);

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ══════════════════════════════════════════════
  // NAVBAR SCROLL EFFECTS
  // ══════════════════════════════════════════════
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  function handleNavScroll() {
    const currentScrollY = window.scrollY;

    // Add scrolled class for shadow
    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ══════════════════════════════════════════════
  // ACTIVE NAVIGATION LINK HIGHLIGHTING
  // ══════════════════════════════════════════════
  const sections = document.querySelectorAll('section[id]');
  const navItems = navLinks.querySelectorAll('a');

  function highlightActiveNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // ══════════════════════════════════════════════
  // INTERSECTION OBSERVER — REVEAL ANIMATIONS
  // ══════════════════════════════════════════════
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ══════════════════════════════════════════════
  // STAGGERED REVEAL FOR GRID CHILDREN
  // ══════════════════════════════════════════════
  const staggerContainers = document.querySelectorAll(
    '.skills-grid, .projects-grid, .certs-grid, .experience-list'
  );

  staggerContainers.forEach(container => {
    const children = container.querySelectorAll('.reveal');
    children.forEach((child, index) => {
      child.style.transitionDelay = `${index * 0.1}s`;
    });
  });

  // ══════════════════════════════════════════════
  // CONTACT FORM HANDLING
  // ══════════════════════════════════════════════
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject') || 'No Subject';
      const message = formData.get('message');

      // Basic validation
      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Construct mailto link
      const mailtoLink = `mailto:lokeshrajm2496@gmail.com?subject=${encodeURIComponent(subject + ' — from ' + name)}&body=${encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
      window.open(mailtoLink, '_blank');

      showToast('Opening your email client...', 'success');
      contactForm.reset();
    });
  }

  // ══════════════════════════════════════════════
  // TOAST NOTIFICATION
  // ══════════════════════════════════════════════
  function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${message}</span>
    `;

    // Style the toast
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      padding: '16px 28px',
      borderRadius: '12px',
      background: type === 'success'
        ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(197, 160, 89, 0.15))'
        : 'rgba(239, 68, 68, 0.15)',
      border: `1px solid ${type === 'success' ? 'rgba(212, 175, 55, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
      backdropFilter: 'blur(20px)',
      color: '#f1f5f9',
      fontSize: '0.9rem',
      fontFamily: "'Inter', sans-serif",
      fontWeight: '500',
      zIndex: '9999',
      opacity: '0',
      transform: 'translateY(20px)',
      transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    });

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    // Auto remove
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // ══════════════════════════════════════════════
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ══════════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ══════════════════════════════════════════════
  // TYPING EFFECT FOR HERO SUBTITLE
  // ══════════════════════════════════════════════
  const subtitleEl = document.querySelector('.hero-subtitle');
  if (subtitleEl) {
    const roles = [
      'Data Analytics & AI Developer',
      'Python Developer',
      'Business Intelligence Builder'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        subtitleEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        subtitleEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      // Add blinking cursor
      subtitleEl.style.borderRight = '2px solid var(--accent-gold)';

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before next word
      }

      setTimeout(typeEffect, typingSpeed);
    }

    // Start typing after hero animations complete
    setTimeout(typeEffect, 1200);
  }

  // ══════════════════════════════════════════════
  // PARALLAX EFFECT FOR BACKGROUND BLOBS
  // ══════════════════════════════════════════════
  const blobs = document.querySelectorAll('.blob');

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    blobs.forEach((blob, i) => {
      const speed = (i + 1) * 8;
      blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  }, { passive: true });

  // ══════════════════════════════════════════════
  // CURSOR-TRACKING CARD GLOW EFFECT
  // Adds a radial glow that follows the mouse
  // across all glassmorphic cards for that
  // premium "Obsidian Cyber" tactile feel
  // ══════════════════════════════════════════════
  const glowCards = document.querySelectorAll(
    '.project-card, .skill-category, .exp-card, .cert-card, .stat-card, .edu-item, .contact-link, .contact-form, .floating-icons .fi'
  );

  glowCards.forEach(card => {
    // Create a glow overlay element
    const glowOverlay = document.createElement('div');
    glowOverlay.classList.add('cursor-glow');
    Object.assign(glowOverlay.style, {
      position: 'absolute',
      inset: '0',
      borderRadius: 'inherit',
      pointerEvents: 'none',
      opacity: '0',
      transition: 'opacity 0.35s ease',
      zIndex: '1',
      background: 'radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(212, 175, 55, 0.04), transparent 40%)',
    });

    // Ensure card is positioned for the overlay
    const pos = getComputedStyle(card).position;
    if (pos === 'static') {
      card.style.position = 'relative';
    }

    card.appendChild(glowOverlay);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glowOverlay.style.setProperty('--glow-x', `${x}px`);
      glowOverlay.style.setProperty('--glow-y', `${y}px`);
      glowOverlay.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(212, 175, 55, 0.04), transparent 40%)`;
      glowOverlay.style.opacity = '1';
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      glowOverlay.style.opacity = '0';
    });
  });

  // ══════════════════════════════════════════════
  // SUBTLE 3D TILT ON PROJECT CARDS
  // Creates a perspective-based tilt that adds
  // physical depth when hovering
  // ══════════════════════════════════════════════
  const tiltCards = document.querySelectorAll('.project-card, .skill-category');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3; // max 3deg
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ══════════════════════════════════════════════
  // BORDER SHIMMER ON SCROLL
  // Adds a brief shimmer to cards as they
  // first appear on screen
  // ══════════════════════════════════════════════
  const shimmerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'borderShimmer 1.5s ease-out forwards';
        shimmerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.project-card, .exp-card, .skill-category').forEach(card => {
    shimmerObserver.observe(card);
  });

});
