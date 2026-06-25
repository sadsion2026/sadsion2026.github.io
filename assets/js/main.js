/* =================================================================
   LEGION SHOP — Main JS
   Product catalog, cart engine, animations, interactions
   ================================================================= */
(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const fmt = (n) => n.toLocaleString("en-US");
  const CUR = "د.ع"; // Iraqi Dinar

  /* ---------- Product Catalog ---------- */
  const PRODUCTS = [
    { id: 1,  name: "بلايستيشن 5 برو — إصدار خاص", brand: "Sony", cat: "playstation", art: "🎮", price: 1090000, old: 1190000, rating: 4.9, reviews: 842, tag: "hot" },
    { id: 2,  name: "يد تحكم DualSense Edge لاسلكية", brand: "Sony", cat: "accessories", art: "🕹️", price: 285000, old: 320000, rating: 4.8, reviews: 511, tag: "sale" },
    { id: 3,  name: "Xbox Series X 1TB", brand: "Microsoft", cat: "xbox", art: "🎮", price: 745000, old: null, rating: 4.8, reviews: 623, tag: "new" },
    { id: 4,  name: "نينتندو سويتش OLED أبيض", brand: "Nintendo", cat: "nintendo", art: "🎮", price: 525000, old: 560000, rating: 4.9, reviews: 940, tag: "hot" },
    { id: 5,  name: "كرسي ألعاب Legion Pro RGB", brand: "Legion", cat: "accessories", art: "🪑", price: 410000, old: 480000, rating: 4.7, reviews: 287, tag: "sale" },
    { id: 6,  name: "سماعة ألعاب SteelSeries Arctis Nova", brand: "SteelSeries", cat: "accessories", art: "🎧", price: 195000, old: null, rating: 4.8, reviews: 402, tag: "new" },
    { id: 7,  name: "لابتوب ألعاب Legion 7i RTX 4080", brand: "Lenovo", cat: "pc", art: "💻", price: 3450000, old: 3700000, rating: 4.9, reviews: 156, tag: "hot" },
    { id: 8,  name: "بطاقة PlayStation Plus 12 شهر", brand: "Sony", cat: "cards", art: "💳", price: 95000, old: null, rating: 5.0, reviews: 1320, tag: null },
    { id: 9,  name: "ماوس ألعاب Logitech G Pro X", brand: "Logitech", cat: "accessories", art: "🖱️", price: 135000, old: 160000, rating: 4.7, reviews: 365, tag: "sale" },
    { id: 10, name: "شاشة ألعاب 27\" 240Hz QHD", brand: "ASUS", cat: "pc", art: "🖥️", price: 620000, old: null, rating: 4.8, reviews: 211, tag: "new" },
    { id: 11, name: "بطاقة Xbox Game Pass Ultimate", brand: "Microsoft", cat: "cards", art: "💳", price: 78000, old: 90000, rating: 4.9, reviews: 877, tag: "sale" },
    { id: 12, name: "كيبورد ميكانيكي Razer Huntsman", brand: "Razer", cat: "accessories", art: "⌨️", price: 175000, old: null, rating: 4.8, reviews: 298, tag: null },
    { id: 13, name: "نظارة واقع افتراضي PS VR2", brand: "Sony", cat: "playstation", art: "🥽", price: 690000, old: 760000, rating: 4.6, reviews: 174, tag: "sale" },
    { id: 14, name: "ساعة ذكية للألعاب والرياضة", brand: "Garmin", cat: "pc", art: "⌚", price: 240000, old: null, rating: 4.7, reviews: 132, tag: "new" },
    { id: 15, name: "حامل شحن ثنائي ليدات تحكم", brand: "Legion", cat: "accessories", art: "🔌", price: 42000, old: 55000, rating: 4.6, reviews: 489, tag: "hot" },
    { id: 16, name: "لعبة EA FC 25 — نسخة عربية", brand: "EA", cat: "playstation", art: "⚽", price: 88000, old: null, rating: 4.8, reviews: 1011, tag: null },
  ];

  const CATEGORIES = [
    { key: "playstation", name: "بلايستيشن", emoji: "🎮", count: 128, color: "rgba(34,211,238,.22)" },
    { key: "xbox",        name: "إكس بوكس",  emoji: "🟢", count: 96,  color: "rgba(45,212,167,.22)" },
    { key: "nintendo",    name: "نينتندو",   emoji: "🍄", count: 74,  color: "rgba(255,77,94,.22)" },
    { key: "pc",          name: "أجهزة وحواسيب", emoji: "💻", count: 210, color: "rgba(99,102,241,.22)" },
    { key: "accessories", name: "إكسسوارات", emoji: "🎧", count: 340, color: "rgba(168,85,247,.22)" },
    { key: "cards",       name: "بطاقات رقمية", emoji: "💳", count: 58,  color: "rgba(255,194,75,.22)" },
    { key: "audio",       name: "صوتيات",     emoji: "🔊", count: 112, color: "rgba(255,61,129,.22)" },
    { key: "mobile",      name: "هواتف وأجهزة", emoji: "📱", count: 165, color: "rgba(34,211,238,.22)" },
  ];

  const FILTERS = [
    { key: "all", name: "الكل" },
    { key: "playstation", name: "بلايستيشن" },
    { key: "xbox", name: "إكس بوكس" },
    { key: "nintendo", name: "نينتندو" },
    { key: "pc", name: "حواسيب" },
    { key: "accessories", name: "إكسسوارات" },
    { key: "cards", name: "بطاقات" },
  ];

  /* ---------- State ---------- */
  let cart = [];
  let wishlist = new Set();

  /* ---------- Star rating ---------- */
  function stars(r) {
    const full = Math.round(r);
    return "★".repeat(full) + "☆".repeat(5 - full);
  }

  /* ---------- Render Categories ---------- */
  function renderCategories() {
    const el = $("#categoryGrid");
    if (!el) return;
    el.innerHTML = CATEGORIES.map((c, i) => `
      <a href="#products" class="cat-card reveal ${"d" + ((i % 4) + 1)}" style="--cc:${c.color}" data-cat="${c.key}">
        <span class="arrow" aria-hidden="true">${ARROW}</span>
        <div class="emoji">${c.emoji}</div>
        <div>
          <h3>${c.name}</h3>
          <div class="count">${c.count} منتج</div>
        </div>
      </a>`).join("");
  }

  /* ---------- Render Products ---------- */
  function productCard(p, idx) {
    const tagHtml = p.tag ? `<span class="tag ${p.tag}">${TAGS[p.tag]}</span>` : "";
    const oldHtml = p.old ? `<span class="was">${fmt(p.old)}</span>` : "";
    const wished = wishlist.has(p.id) ? "active" : "";
    return `
    <article class="product reveal ${"d" + ((idx % 4) + 1)}" data-cat="${p.cat}">
      <div class="product-media">
        <div class="glow"></div>
        ${tagHtml}
        <button class="wish ${wished}" data-wish="${p.id}" aria-label="أضف للمفضلة">${HEART}</button>
        <div class="art">${p.art}</div>
      </div>
      <div class="product-body">
        <span class="brand-name">${p.brand}</span>
        <h3>${p.name}</h3>
        <div class="rating"><span class="stars">${stars(p.rating)}</span> ${p.rating} <span style="color:var(--muted-2)">(${fmt(p.reviews)})</span></div>
        <div class="price">
          <span class="now">${fmt(p.price)}</span><span class="cur">${CUR}</span>
          ${oldHtml}
        </div>
        <button class="add-cart" data-add="${p.id}">${CART_ICON}<span>أضف إلى السلة</span></button>
      </div>
    </article>`;
  }

  function renderProducts(filter = "all") {
    const el = $("#productGrid");
    if (!el) return;
    const list = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);
    el.innerHTML = list.map(productCard).join("");
    observeReveals();
  }

  function renderFilters() {
    const el = $("#filterBar");
    if (!el) return;
    el.innerHTML = FILTERS.map((f, i) =>
      `<button class="chip ${i === 0 ? "active" : ""}" data-filter="${f.key}">${f.name}</button>`
    ).join("");
  }

  /* ---------- Cart Engine ---------- */
  function addToCart(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    const found = cart.find((x) => x.id === id);
    if (found) found.qty += 1;
    else cart.push({ id, qty: 1 });
    saveCart();
    renderCart();
    bumpCart();
    toast(`تمت إضافة "${p.name.slice(0, 22)}…" إلى السلة`);
  }

  function changeQty(id, delta) {
    const it = cart.find((x) => x.id === id);
    if (!it) return;
    it.qty += delta;
    if (it.qty <= 0) cart = cart.filter((x) => x.id !== id);
    saveCart();
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter((x) => x.id !== id);
    saveCart();
    renderCart();
  }

  function cartCount() { return cart.reduce((s, x) => s + x.qty, 0); }
  function cartTotal() {
    return cart.reduce((s, x) => {
      const p = PRODUCTS.find((y) => y.id === x.id);
      return s + (p ? p.price * x.qty : 0);
    }, 0);
  }

  function renderCart() {
    const count = cartCount();
    const badge = $("#cartBadge");
    if (badge) {
      badge.textContent = count;
      badge.classList.toggle("show", count > 0);
    }
    const items = $("#cartItems");
    if (!items) return;
    if (!cart.length) {
      items.innerHTML = `<div class="cart-empty"><div class="big">🛒</div><p>سلة التسوق فارغة</p><a href="#products" class="btn btn-ghost" data-close-cart>تصفّح المنتجات</a></div>`;
    } else {
      items.innerHTML = cart.map((it) => {
        const p = PRODUCTS.find((x) => x.id === it.id);
        return `<div class="cart-item">
          <div class="thumb">${p.art}</div>
          <div class="info">
            <h4>${p.name}</h4>
            <div class="p">${fmt(p.price * it.qty)} ${CUR}</div>
            <div class="qty">
              <button data-dec="${p.id}" aria-label="إنقاص">−</button>
              <span>${it.qty}</span>
              <button data-inc="${p.id}" aria-label="زيادة">+</button>
            </div>
          </div>
          <button class="rm" data-rm="${p.id}" aria-label="حذف">${TRASH}</button>
        </div>`;
      }).join("");
    }
    const tot = $("#cartTotal");
    if (tot) tot.textContent = fmt(cartTotal()) + " " + CUR;
  }

  function bumpCart() {
    const b = $("#cartBtn");
    if (!b) return;
    b.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }],
      { duration: 360, easing: "cubic-bezier(.2,.7,.2,1)" }
    );
  }

  function saveCart() {
    try { localStorage.setItem("legion_cart", JSON.stringify(cart)); } catch (e) {}
  }
  function loadCart() {
    try {
      const d = JSON.parse(localStorage.getItem("legion_cart") || "[]");
      if (Array.isArray(d)) cart = d.filter((x) => PRODUCTS.some((p) => p.id === x.id));
      const w = JSON.parse(localStorage.getItem("legion_wish") || "[]");
      if (Array.isArray(w)) wishlist = new Set(w);
    } catch (e) {}
  }
  function saveWish() {
    try { localStorage.setItem("legion_wish", JSON.stringify([...wishlist])); } catch (e) {}
  }

  /* ---------- Drawer / Menu open-close ---------- */
  function openCart() { $("#overlay").classList.add("open"); $("#cartDrawer").classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeCart() { $("#cartDrawer").classList.remove("open"); maybeCloseOverlay(); }
  function openMenu() { $("#overlay").classList.add("open"); $("#mobileMenu").classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeMenu() { $("#mobileMenu").classList.remove("open"); maybeCloseOverlay(); }
  function maybeCloseOverlay() {
    const anyOpen = $("#cartDrawer").classList.contains("open") || $("#mobileMenu").classList.contains("open");
    if (!anyOpen) { $("#overlay").classList.remove("open"); document.body.style.overflow = ""; }
  }

  /* ---------- Toast ---------- */
  function toast(msg) {
    const wrap = $("#toastWrap");
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = `<span class="ic">${CHECK}</span><span>${msg}</span>`;
    wrap.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 400); }, 2600);
  }

  /* ---------- Scroll reveal ---------- */
  let io;
  function observeReveals() {
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    }
    $$(".reveal:not(.in)").forEach((el) => io.observe(el));
  }

  /* ---------- Animated counters ---------- */
  function animateCounters() {
    $$("[data-count]").forEach((el) => {
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || "";
      let started = false;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const dur = 1500, t0 = performance.now();
            const step = (now) => {
              const p = Math.min((now - t0) / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = fmt(Math.floor(eased * target)) + suffix;
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            obs.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      obs.observe(el);
    });
  }

  /* ---------- Countdown ---------- */
  function startCountdown() {
    const box = $("#countdown");
    if (!box) return;
    const end = Date.now() + (1000 * 60 * 60 * 23 + 1000 * 60 * 47 + 1000 * 33); // ~24h horizon
    function tick() {
      let diff = Math.max(0, end - Date.now());
      const h = Math.floor(diff / 3.6e6); diff -= h * 3.6e6;
      const m = Math.floor(diff / 6e4); diff -= m * 6e4;
      const s = Math.floor(diff / 1e3);
      const set = (sel, v) => { const e = $(sel, box); if (e) e.textContent = String(v).padStart(2, "0"); };
      set("[data-h]", h); set("[data-m]", m); set("[data-s]", s);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Header scroll + back to top ---------- */
  function onScroll() {
    const y = window.scrollY;
    $("#header").classList.toggle("scrolled", y > 20);
    $("#toTop").classList.toggle("show", y > 600);
  }

  /* ---------- Hero parallax (subtle) ---------- */
  function heroParallax() {
    const visual = $("#heroVisual");
    if (!visual || window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    window.addEventListener("mousemove", (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      visual.style.transform = `translate(${cx * 12}px, ${cy * 12}px)`;
      const card = $(".hero-card", visual);
      if (card) card.style.transform = `translate(${cx * -8}px, ${cy * -8}px) rotateY(${cx * 4}deg) rotateX(${cy * -4}deg)`;
    });
  }

  /* ---------- Live search filter ---------- */
  function bindSearch() {
    const input = $("#searchInput");
    if (!input) return;
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      // reset filter chips to "all"
      $$("#filterBar .chip").forEach((c) => c.classList.toggle("active", c.dataset.filter === "all"));
      const el = $("#productGrid");
      const list = q
        ? PRODUCTS.filter((p) => (p.name + " " + p.brand).toLowerCase().includes(q))
        : PRODUCTS;
      el.innerHTML = list.length
        ? list.map(productCard).join("")
        : `<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:2rem">لا توجد نتائج لـ "${q}" 🔍</p>`;
      observeReveals();
      if (q) document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ---------- Global event delegation ---------- */
  function bindEvents() {
    document.addEventListener("click", (e) => {
      const t = e.target;
      const add = t.closest("[data-add]");
      if (add) { addToCart(+add.dataset.add); return; }

      const inc = t.closest("[data-inc]");
      if (inc) { changeQty(+inc.dataset.inc, 1); return; }
      const dec = t.closest("[data-dec]");
      if (dec) { changeQty(+dec.dataset.dec, -1); return; }
      const rm = t.closest("[data-rm]");
      if (rm) { removeFromCart(+rm.dataset.rm); return; }

      const wish = t.closest("[data-wish]");
      if (wish) {
        const id = +wish.dataset.wish;
        if (wishlist.has(id)) { wishlist.delete(id); wish.classList.remove("active"); }
        else { wishlist.add(id); wish.classList.add("active"); toast("أُضيف إلى المفضلة ❤️"); }
        saveWish();
        return;
      }

      const filter = t.closest("[data-filter]");
      if (filter) {
        $$("#filterBar .chip").forEach((c) => c.classList.remove("active"));
        filter.classList.add("active");
        const si = $("#searchInput"); if (si) si.value = "";
        renderProducts(filter.dataset.filter);
        return;
      }

      const catCard = t.closest("[data-cat].cat-card");
      if (catCard) {
        const key = catCard.dataset.cat;
        const chip = $(`#filterBar .chip[data-filter="${key}"]`) || $('#filterBar .chip[data-filter="all"]');
        $$("#filterBar .chip").forEach((c) => c.classList.remove("active"));
        if (chip) chip.classList.add("active");
        renderProducts($(`#filterBar .chip[data-filter="${key}"]`) ? key : "all");
        return; // allow anchor jump to #products
      }

      if (t.closest("#cartBtn")) { e.preventDefault(); openCart(); return; }
      if (t.closest("#closeCart") || t.closest("[data-close-cart]")) { closeCart(); return; }
      if (t.closest("#menuBtn")) { openMenu(); return; }
      if (t.closest("#closeMenu")) { closeMenu(); return; }
      if (t.closest("#overlay")) { closeCart(); closeMenu(); return; }
      if (t.closest("#checkoutBtn")) { e.preventDefault(); doCheckout(); return; }
      if (t.closest(".mobile-menu a")) { closeMenu(); return; }
      if (t.closest("#toTop")) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    });

    // Newsletter
    const nl = $("#nlForm");
    if (nl) nl.addEventListener("submit", (e) => { e.preventDefault(); toast("تم الاشتراك بنجاح 🎉 ترقّب أحدث العروض"); nl.reset(); });

    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeCart(); closeMenu(); } });

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function doCheckout() {
    if (!cart.length) { toast("سلتك فارغة — أضف منتجات أولاً"); return; }
    toast("جارٍ تحويلك لإتمام الطلب… 🚀");
    setTimeout(() => { cart = []; saveCart(); renderCart(); closeCart(); toast("تم استلام طلبك بنجاح ✅"); }, 1400);
  }

  /* ---------- SVG Icons ---------- */
  const ARROW = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
  const HEART = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>`;
  const CART_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h2.2l2.3 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L21.5 7H6"/></svg>`;
  const TRASH = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>`;
  const CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
  const TAGS = { hot: "🔥 الأكثر طلباً", new: "✦ جديد", sale: "% تخفيض" };

  /* ---------- Init ---------- */
  function init() {
    loadCart();
    renderCategories();
    renderFilters();
    renderProducts();
    renderCart();
    bindEvents();
    bindSearch();
    observeReveals();
    animateCounters();
    startCountdown();
    heroParallax();
    onScroll();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
