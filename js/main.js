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
    if (e.key === 'Escape') {
      closeMenu();
      if (orderModal && !orderModal.hidden) closeOrderModal();
    }
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

  /* ── STOCK MANAGEMENT ─────────────────────────────────────── */
  const STOCK_START = { golden: 100, silver: 100 };
  const STOCK_TOTAL = 100;

  function getStock(product) {
    const saved = localStorage.getItem('gf-stock-' + product);
    return saved !== null ? parseInt(saved, 10) : STOCK_START[product];
  }

  function decrementStock(product) {
    const newVal = Math.max(0, getStock(product) - 1);
    localStorage.setItem('gf-stock-' + product, newVal);
    return newVal;
  }

  function renderStockBars() {
    ['golden', 'silver'].forEach(function (p) {
      const rem   = getStock(p);
      const fillEl = document.getElementById(p + '-fill');
      const numEl  = document.getElementById(p + '-stock');
      if (fillEl) fillEl.style.width = (rem / STOCK_TOTAL * 100) + '%';
      if (numEl)  numEl.textContent  = rem;
    });
  }

  renderStockBars();

  /* ── ORDER MODAL ───────────────────────────────────────────── */
  const orderModal     = document.getElementById('orderModal');
  const modalOverlay   = document.getElementById('modalOverlay');
  const modalCloseBtn  = document.getElementById('modalClose');
  const orderForm      = document.getElementById('orderForm');
  const modalSuccess   = document.getElementById('modalSuccess');
  const successCloseBtn = document.getElementById('successCloseBtn');

  let currentProduct   = null;
  let reservationTimer = null;
  let reservationSecs  = 600;

  const PRODUCTS = {
    golden: { name: 'Golden Fusion', badge: '⭐ Golden Fusion', badgeClass: 'badge--gold',   price: '€39,99', priceNum: 39.99, shipping: 4.95 },
    silver: { name: 'Silver Fusion', badge: 'Silver Fusion',    badgeClass: 'badge--silver', price: '€34,99', priceNum: 34.99, shipping: 4.95 }
  };

  function openOrderModal(product) {
    currentProduct = product;
    const p     = PRODUCTS[product];
    const stock = getStock(product);
    const total = '€' + (p.priceNum + p.shipping).toFixed(2).replace('.', ',');

    const badgeEl = document.getElementById('modalBadge');
    badgeEl.textContent = p.badge;
    badgeEl.className   = 'modal-product-badge ' + p.badgeClass;

    document.getElementById('modalTitle').textContent        = 'Pre-order — ' + p.name;
    document.getElementById('modalPrice').textContent        = p.price;
    document.getElementById('modalStock').textContent        = stock;
    document.getElementById('modalProductName').textContent  = p.name;
    document.getElementById('modalSummaryPrice').textContent = p.price;
    document.getElementById('modalTotal').textContent        = total;

    orderForm.hidden    = false;
    modalSuccess.hidden = true;
    orderForm.reset();
    orderForm.querySelectorAll('input, select').forEach(function (el) { el.style.borderColor = ''; });

    orderModal.hidden           = false;
    document.body.style.overflow = 'hidden';

    reservationSecs = 600;
    clearInterval(reservationTimer);
    tickReservation();
    reservationTimer = setInterval(tickReservation, 1000);
  }

  function closeOrderModal() {
    orderModal.hidden            = true;
    document.body.style.overflow = '';
    clearInterval(reservationTimer);
  }

  function tickReservation() {
    if (reservationSecs <= 0) { clearInterval(reservationTimer); closeOrderModal(); return; }
    document.getElementById('resMins').textContent = pad(Math.floor(reservationSecs / 60), 2);
    document.getElementById('resSecs').textContent = pad(reservationSecs % 60, 2);
    reservationSecs--;
  }

  orderForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;
    orderForm.querySelectorAll('[required]').forEach(function (el) {
      el.style.borderColor = '';
      if (!el.value.trim()) { el.style.borderColor = 'var(--red)'; valid = false; }
    });
    if (!valid) return;

    const newStock  = decrementStock(currentProduct);
    renderStockBars();
    document.getElementById('modalStock').textContent = newStock;

    const orderNum = STOCK_TOTAL - newStock;
    document.getElementById('successEmail').textContent  = document.getElementById('m-email').value;
    document.getElementById('successNumber').textContent = '#' + pad(orderNum, 3);

    orderForm.hidden    = true;
    modalSuccess.hidden = false;
    clearInterval(reservationTimer);
  });

  modalOverlay.addEventListener('click', closeOrderModal);
  modalCloseBtn.addEventListener('click', closeOrderModal);
  successCloseBtn.addEventListener('click', closeOrderModal);

  document.querySelectorAll('[data-order]').forEach(function (btn) {
    btn.addEventListener('click', function () { openOrderModal(this.dataset.order); });
  });

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
