/* ═══════════════════════════════════════════════════════════════
   DHILIPKUMAR S — PORTFOLIO SCRIPTS
   Typing effect · Scroll reveal · Nav logic · Smooth interactions
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── TYPING EFFECT ──
  const typedEl = document.getElementById('typedText');
  const phrases = [
    'AI & Data Science Student',
    'Python Developer',
    'Machine Learning Enthusiast',
    'Computer Vision Explorer',
    'Problem Solver'
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeEffect() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 40;
    } else {
      typedEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIdx === current.length) {
      typingSpeed = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 400; // pause before next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();


  // ── NAVBAR SCROLL EFFECT ──
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-resume-btn)');
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    // Navbar background
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();


  // ── MOBILE NAV TOGGLE ──
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });


  // ── SCROLL REVEAL ──
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
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


  // ── CONTACT FORM HANDLER ──
  const contactForm = document.getElementById('contactForm');
  const formSubmit = document.getElementById('formSubmit');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // mailto fallback
    const mailtoLink = `mailto:dhilipkumarsmrd77@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    // Visual feedback
    formSubmit.textContent = '✓ Opening Email Client...';
    formSubmit.style.opacity = '0.7';

    setTimeout(() => {
      window.location.href = mailtoLink;
      formSubmit.textContent = 'Send Message →';
      formSubmit.style.opacity = '1';
      contactForm.reset();
    }, 600);
  });


  // ── LUCIDE ICONS INIT ──
  if (window.lucide) {
    lucide.createIcons();
  }


  // ── PARALLAX ON HERO (SUBTLE) ──
  const heroImage = document.querySelector('.hero-image');
  if (heroImage && window.innerWidth > 900) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      heroImage.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });
  }

});
