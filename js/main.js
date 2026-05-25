/* ================================================================
   GRIPFUSION — main.js
   Features: nav shrink on scroll · hamburger menu · scroll reveal
   ================================================================ */

(function () {
  'use strict';

  /* ── NAV: shrink on scroll ─────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── HAMBURGER MENU ────────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── LAUNCH COUNTDOWN ─────────────────────────────────────── */
  const launchDate = new Date('2027-01-01T00:00:00');
  const timerEl    = document.getElementById('launchTimer');

  function pad(n, len) { return String(n).padStart(len, '0'); }

  function updateCountdown() {
    const diff = launchDate - new Date();
    if (diff <= 0) {
      timerEl.innerHTML = '<span class="ct-launched">LAUNCHED!</span>';
      return;
    }
    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000)  / 60000);
    const seconds = Math.floor((diff % 60000)    / 1000);

    document.getElementById('ct-days').textContent  = pad(days, 3);
    document.getElementById('ct-hours').textContent = pad(hours, 2);
    document.getElementById('ct-mins').textContent  = pad(minutes, 2);
    document.getElementById('ct-secs').textContent  = pad(seconds, 2);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ── SCROLL REVEAL ─────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    /* Fallback: show everything for old browsers */
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

})();
