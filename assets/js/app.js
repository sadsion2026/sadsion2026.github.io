/* =================================================================
   LEGION SHOP — App (SPA router, cart, favorites, UI)
   ================================================================= */
(function () {
  "use strict";
  const { categories: CATS, products: PRODUCTS, homeSections: HOME, heroSlides: HERO } = window.LEGION;

  /* ---------- Helpers ---------- */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const cat = (k) => CATS.find((c) => c.key === k);
  const fmt = (n) => n.toLocaleString("en-US");
  const money = (n) => `<span class="m-n">${fmt(n)}</span> <span class="m-c">د.ع</span>`;
  const minPrice = (p) => Math.min(...p.plans.map((x) => x.price));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Icons ---------- */
  const I = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    tag: '<path d="M3 11V4a1 1 0 0 1 1-1h7l9 9-8 8-9-9Z"/><circle cx="7.5" cy="7.5" r="1.4"/>',
    bookmark: '<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    bag: '<path d="M6 7h12l1 13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1L6 7Z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',
    box: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    bell: '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h2.2l2.3 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L21.5 7H6"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 10-12h-7z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    crown: '<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8Z"/>',
    fire: '<path d="M12 3c1 4-2 5-2 8a2 2 0 0 0 4 0c0-1 0-2-.5-3 2 1 3.5 3 3.5 6a5 5 0 1 1-10 0c0-4 3-6 5-11Z"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.8 6.6 20l1-6.1L3.2 9.5l6.1-.9L12 3Z"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2 0-1.5 1-2 2-2h2a3 3 0 0 0 3-3 8 8 0 0 0-9-9Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="14.5" cy="7.5" r="1"/><circle cx="17" cy="11" r="1"/>',
    chevL: '<path d="m15 6-6 6 6 6"/>',
    chevR: '<path d="m9 6 6 6-6 6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    close: '<path d="M6 6 18 18M18 6 6 18"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M18 7l-1 13H7L6 7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.01"/>',
    heart: '<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.2l-1.7-1.6a5 5 0 0 0-7.1 7.1l8.8 8.6 8.8-8.6a5 5 0 0 0 0-7.1Z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3C9.5 5.5 9.5 18.5 12 21"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    login: '<path d="M14 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4"/><path d="M10 8l4 4-4 4M14 12H4"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  };
  const svg = (n, w = 24) => `<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I[n] || ""}</svg>`;
  const svgFill = (n, w = 24) => `<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="currentColor">${I[n] || ""}</svg>`;

  /* ---------- State ---------- */
  let cart = load("legion2_cart", []);
  let favs = new Set(load("legion2_favs", []));
  function load(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  const saveCart = () => save("legion2_cart", cart);
  const saveFavs = () => save("legion2_favs", [...favs]);

  /* ---------- 3D product art ---------- */
  function art3d(p, size = "") {
    const big = /[A-Za-z]/.test(p.glyph) && p.glyph.length <= 2;
    return `<div class="art3d ${size}" style="--ac:${p.color}">
      <div class="art3d-glow"></div>
      <div class="art3d-card">
        <span class="art3d-glyph ${big ? "txt" : ""}">${esc(p.glyph)}</span>
      </div>
      <span class="art3d-brand">${esc(p.brand)}</span>
    </div>`;
  }

  /* ---------- Components ---------- */
  function productCard(p) {
    const c = cat(p.cat);
    const fav = favs.has(p.id) ? "active" : "";
    return `<a class="pcard" href="#/product/${p.id}" data-reveal>
      <div class="pcard-media" style="--ac:${p.color}">
        ${p.featured ? `<span class="pcard-badge">${svgFill("crown", 12)} مميز</span>` : ""}
        <button class="pcard-fav ${fav}" data-fav="${p.id}" aria-label="مفضلة">${svgFill("bookmark", 16)}</button>
        ${art3d(p)}
      </div>
      <div class="pcard-body">
        <h3>${esc(p.name)}</h3>
        <span class="pcard-cat">${c ? esc(c.name) : ""}</span>
        <div class="pcard-foot">
          <div class="pcard-price">${money(minPrice(p))}</div>
          <span class="pcard-add" data-quickadd="${p.id}">${svg("cart", 16)} إضافة</span>
        </div>
      </div>
    </a>`;
  }

  function carouselRow(title, icon, list) {
    if (!list.length) return "";
    return `<section class="row-sec" data-reveal>
      <div class="row-head">
        <a class="row-all" href="#/categories">الكل ${svg("arrow", 16)}</a>
        <h2>${esc(title)} <span class="row-ic">${svgFill(icon, 18)}</span></h2>
      </div>
      <div class="row-scroll">${list.map(productCard).join("")}</div>
    </section>`;
  }

  /* ---------- HERO ---------- */
  let heroIdx = 0, heroTimer = null;
  function heroHTML() {
    return `<section class="hero" data-reveal>
      <div class="hero-track" id="heroTrack">
        ${HERO.map((s, i) => `
          <div class="hero-slide ${i === 0 ? "active" : ""}" style="--c1:${s.color1};--c2:${s.color2}">
            <div class="hero-art">
              <div class="hero-orb"></div>
              ${s.glyphs.map((g, j) => `<span class="hero-chip c${j}">${esc(g)}</span>`).join("")}
            </div>
            <div class="hero-copy">
              <h1>${esc(s.title)}</h1>
              <p>${esc(s.subtitle)}</p>
              <a href="#/categories" class="btn btn-primary">تصفّح الآن ${svg("arrow", 18)}</a>
            </div>
          </div>`).join("")}
      </div>
      <button class="hero-nav prev" id="heroPrev" aria-label="السابق">${svg("chevR", 22)}</button>
      <button class="hero-nav next" id="heroNext" aria-label="التالي">${svg("chevL", 22)}</button>
      <div class="hero-dots" id="heroDots">${HERO.map((_, i) => `<button class="${i === 0 ? "active" : ""}" data-hero="${i}"></button>`).join("")}</div>
    </section>`;
  }
  function goHero(i) {
    const slides = $$("#heroTrack .hero-slide"); if (!slides.length) return;
    heroIdx = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("active", k === heroIdx));
    $$("#heroDots button").forEach((d, k) => d.classList.toggle("active", k === heroIdx));
  }
  function startHero() { stopHero(); heroTimer = setInterval(() => goHero(heroIdx + 1), 5500); }
  function stopHero() { if (heroTimer) clearInterval(heroTimer); }

  /* ---------- Category tile ---------- */
  function catTile(c) {
    return `<a class="cat-tile" href="#/categories?c=${c.key}" data-reveal style="--ac:${c.color}">
      <span class="cat-emoji">${c.glyph}</span>
      <span class="cat-name">${esc(c.name)}</span>
      <span class="cat-count">${c.count} منتج</span>
    </a>`;
  }

  /* =================================================================
     VIEWS
     ================================================================= */
  function viewHome() {
    return heroHTML() + `
      <section class="cats-block" data-reveal>
        <div class="row-head"><a class="row-all" href="#/categories">الكل ${svg("arrow", 16)}</a><h2>الأقسام <span class="row-ic">${svgFill("grid", 18)}</span></h2></div>
        <div class="cats-grid">${CATS.map(catTile).join("")}</div>
      </section>
      ${HOME.map((sec) => {
        let list = PRODUCTS.filter(sec.filter);
        if (sec.key === "newest") list = [...PRODUCTS].reverse();
        if (sec.limit) list = list.slice(0, sec.limit);
        return carouselRow(sec.title, sec.icon, list);
      }).join("")}
    `;
  }

  function viewCategories(params) {
    const active = params.get("c") || "all";
    const chips = [{ key: "all", name: "الكل" }, ...CATS.map((c) => ({ key: c.key, name: c.name, count: c.count }))];
    const list = active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === active);
    return `
      <div class="page-head" data-reveal>
        <h1>الأقسام</h1><p>تصفّح جميع الاشتراكات والمنتجات</p>
      </div>
      <div class="cat-search" data-reveal>${svg("search", 20)}<input id="catSearch" type="search" placeholder="ابحث في المنتجات..." /></div>
      <div class="chips" id="catChips" data-reveal>
        ${chips.map((c) => `<button class="chip ${c.key === active ? "active" : ""}" data-chip="${c.key}">${esc(c.name)}${c.count ? `<span class="chip-n">${c.count}</span>` : ""}</button>`).join("")}
      </div>
      <div class="grid-products" id="catGrid">${list.map(productCard).join("")}</div>
    `;
  }

  function viewOffers() {
    return `
      <div class="page-head" data-reveal><h1>العروض</h1><p>أفضل الأسعار والخصومات</p></div>
      <div class="empty" data-reveal>
        <div class="empty-ic">${svg("tag", 34)}</div>
        <h3>لا توجد عروض حالياً</h3>
        <p>تابعنا — عروض حصرية قادمة قريباً!</p>
        <a href="#/categories" class="btn btn-primary">تصفّح المنتجات</a>
      </div>`;
  }

  function viewFavorites() {
    const list = PRODUCTS.filter((p) => favs.has(p.id));
    if (!list.length) return `
      <div class="page-head" data-reveal><h1>المفضلة</h1><p>المنتجات المحفوظة</p></div>
      <div class="empty" data-reveal>
        <div class="empty-ic">${svg("bookmark", 34)}</div>
        <h3>لا توجد منتجات محفوظة</h3>
        <p>احفظ منتجاتك المفضلة لتجدها هنا</p>
        <a href="#/categories" class="btn btn-primary">تصفّح المنتجات</a>
      </div>`;
    return `
      <div class="page-head" data-reveal><h1>المفضلة</h1><p>${list.length} منتج محفوظ</p></div>
      <div class="grid-products">${list.map(productCard).join("")}</div>`;
  }

  function viewAccount() {
    return `
      <div class="page-head" data-reveal><h1>حسابي</h1><p>إدارة حسابك وطلباتك</p></div>
      <div class="account-card" data-reveal>
        <div class="account-avatar">${svg("user", 38)}</div>
        <h2>سجّل دخولك</h2>
        <p>لتتمكن من حفظ المنتجات وإتمام الشراء</p>
        <a href="#/login" class="btn btn-primary btn-block">${svg("login", 18)} تسجيل الدخول</a>
        <a href="#/login" class="btn btn-outline btn-block">إنشاء حساب</a>
        <button class="lang-toggle" id="langToggle">${svg("globe", 18)} English</button>
      </div>`;
  }

  function viewLogin() {
    return `<div class="auth-wrap">
      <div class="auth-brand">
        <div class="logo-pixel grad">ليجون شوب</div>
        <p>متجر الاشتراكات الرقمية</p>
      </div>
      <form class="auth-card" id="loginForm" data-reveal>
        <h2>تسجيل الدخول</h2>
        <label>البريد الإلكتروني</label>
        <input type="email" placeholder="example@email.com" required />
        <label>كلمة المرور</label>
        <div class="pw-field">
          <input type="password" placeholder="••••••••" required />
          <button type="button" class="pw-eye" aria-label="إظهار">${svg("eye", 18)}</button>
        </div>
        <a href="#/login" class="auth-forgot">نسيت كلمة المرور؟</a>
        <button type="submit" class="btn btn-primary btn-block">${svg("login", 18)} تسجيل الدخول</button>
        <p class="auth-alt">ليس لديك حساب؟ <a href="#/login">إنشاء حساب</a></p>
        <a href="#/" class="auth-back">${svg("arrow", 16)} العودة للمتجر</a>
      </form>
    </div>`;
  }

  function viewProduct(id) {
    const p = byId(id);
    if (!p) return `<div class="empty"><h3>المنتج غير موجود</h3><a href="#/" class="btn btn-primary">العودة للرئيسية</a></div>`;
    const c = cat(p.cat);
    const similar = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 6);
    const sel = 0;
    return `
    <div class="pd" data-pid="${p.id}">
      <div class="pd-info">
        <div class="pd-plans" id="pdPlans">
          ${p.plans.map((pl, i) => `
            <button class="plan ${i === sel ? "active" : ""}" data-plan="${i}">
              <span class="plan-check">${svg("check", 12)}</span>
              <span class="plan-name">${esc(pl.name)}</span>
              <span class="plan-days">${pl.days} يوم</span>
              <span class="plan-price">${money(pl.price)}</span>
            </button>`).join("")}
        </div>
        <div class="pd-badges">
          ${p.purchases ? `<span class="pd-badge fire">${svgFill("fire", 13)} ${p.purchases} عملية شراء</span>` : ""}
          ${p.featured ? `<span class="pd-badge gold">${svgFill("crown", 13)} منتج مميز</span>` : ""}
          <span class="pd-badge ${p.delivery.tone}">${svg(p.delivery.icon, 13)} ${esc(p.delivery.label)}</span>
        </div>
        <div class="pd-about">
          <div class="pd-about-head">${svgFill("info", 18)} عن المنتج</div>
          ${p.about.map((t) => `<p>${esc(t)}</p>`).join("")}
        </div>
        <div class="pd-actions">
          <button class="btn btn-primary btn-buy" data-buy="${p.id}">${svgFill("bolt", 18)} اشترِ الآن</button>
          <button class="btn btn-outline" data-add="${p.id}">${svg("cart", 18)} أضف للسلة</button>
        </div>
      </div>
      <aside class="pd-side">
        <div class="pd-media" style="--ac:${p.color}">${art3d(p, "lg")}</div>
        <button class="btn btn-ghost btn-block pd-fav ${favs.has(p.id) ? "active" : ""}" data-fav="${p.id}">${svgFill("bookmark", 17)} <span>${favs.has(p.id) ? "في المفضلة" : "إضافة للمفضلة"}</span></button>
      </aside>
    </div>
    ${similar.length ? `<section class="row-sec pd-similar" data-reveal>
      <div class="row-head"><h2>منتجات مشابهة</h2></div>
      <div class="row-scroll">${similar.map(productCard).join("")}</div>
    </section>` : ""}`;
  }

  /* =================================================================
     ROUTER
     ================================================================= */
  function parseRoute() {
    const h = location.hash.replace(/^#/, "") || "/";
    const [path, query] = h.split("?");
    return { path, params: new URLSearchParams(query || "") };
  }

  function render() {
    stopHero();
    const { path, params } = parseRoute();
    const view = $("#view");
    document.body.classList.toggle("route-login", path === "/login");
    let html = "", routeKey = "home";

    if (path === "/" || path === "") { html = viewHome(); routeKey = "home"; }
    else if (path === "/categories") { html = viewCategories(params); routeKey = "categories"; }
    else if (path === "/offers") { html = viewOffers(); routeKey = "offers"; }
    else if (path === "/favorites") { html = viewFavorites(); routeKey = "favorites"; }
    else if (path === "/account") { html = viewAccount(); routeKey = "account"; }
    else if (path === "/login") { html = viewLogin(); routeKey = "login"; }
    else if (path.startsWith("/product/")) { html = viewProduct(path.split("/")[2]); routeKey = "product"; }
    else { html = viewHome(); }

    view.innerHTML = html;
    setActiveNav(routeKey, params);
    window.scrollTo(0, 0);
    observeReveal();
    if (routeKey === "home") { bindHero(); startHero(); }
    closeAll();
  }

  function setActiveNav(key, params) {
    const map = { home: "/", categories: "/categories", offers: "/offers", favorites: "/favorites", account: "/account" };
    $$("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === map[key]));
  }

  /* ---------- Hero binding ---------- */
  function bindHero() {
    const t = $("#heroTrack"); if (!t) return;
    $("#heroPrev")?.addEventListener("click", () => { goHero(heroIdx + 1); startHero(); });
    $("#heroNext")?.addEventListener("click", () => { goHero(heroIdx - 1); startHero(); });
    $$("#heroDots button").forEach((b) => b.addEventListener("click", () => { goHero(+b.dataset.hero); startHero(); }));
  }

  /* =================================================================
     CART
     ================================================================= */
  function addToCart(id, planIdx = 0) {
    const p = byId(id); if (!p) return;
    const key = id + "|" + planIdx;
    const f = cart.find((x) => x.key === key);
    if (f) f.qty++; else cart.push({ key, id, plan: planIdx, qty: 1 });
    saveCart(); renderCart(); $$(".js-cart").forEach((b) => bump(b));
    toast(`أُضيف "${p.name}" إلى السلة`);
  }
  function changeQty(key, d) {
    const it = cart.find((x) => x.key === key); if (!it) return;
    it.qty += d; if (it.qty <= 0) cart = cart.filter((x) => x.key !== key);
    saveCart(); renderCart();
  }
  function rmCart(key) { cart = cart.filter((x) => x.key !== key); saveCart(); renderCart(); }
  const cartCount = () => cart.reduce((s, x) => s + x.qty, 0);
  const cartTotal = () => cart.reduce((s, x) => { const p = byId(x.id); return s + (p ? p.plans[x.plan].price * x.qty : 0); }, 0);

  function renderCart() {
    const n = cartCount();
    $$(".cart-count").forEach((badge) => { badge.textContent = n; badge.classList.toggle("show", n > 0); });
    const wrap = $("#cartItems"); if (!wrap) return;
    if (!cart.length) {
      wrap.innerHTML = `<div class="empty sm"><div class="empty-ic">${svg("cart", 30)}</div><h3>سلة التسوّق فارغة</h3><a href="#/categories" class="btn btn-primary" data-close>تصفّح المنتجات</a></div>`;
    } else {
      wrap.innerHTML = cart.map((x) => {
        const p = byId(x.id), pl = p.plans[x.plan];
        return `<div class="citem">
          <div class="citem-art" style="--ac:${p.color}">${art3d(p, "mini")}</div>
          <div class="citem-info">
            <h4>${esc(p.name)}</h4>
            <span class="citem-plan">${esc(pl.name)} · ${pl.days} يوم</span>
            <div class="citem-price">${money(pl.price * x.qty)}</div>
            <div class="qty"><button data-dec="${x.key}">−</button><span>${x.qty}</span><button data-inc="${x.key}">+</button></div>
          </div>
          <button class="citem-rm" data-rm="${x.key}" aria-label="حذف">${svg("trash", 18)}</button>
        </div>`;
      }).join("");
    }
    const tot = $("#cartTotal"); if (tot) tot.innerHTML = money(cartTotal());
  }

  function bump(elOrSel) {
    const e = typeof elOrSel === "string" ? $(elOrSel) : elOrSel; if (!e) return;
    e.animate([{ transform: "scale(1)" }, { transform: "scale(1.22)" }, { transform: "scale(1)" }], { duration: 360, easing: "cubic-bezier(.2,.7,.2,1)" });
  }

  /* ---------- Overlays ---------- */
  function openCart() { $("#scrim").classList.add("open"); $("#cartDrawer").classList.add("open"); lock(true); }
  function openNav() { $("#scrim").classList.add("open"); $("#navDrawer").classList.add("open"); lock(true); }
  function openSearch() { $("#searchModal").classList.add("open"); lock(true); setTimeout(() => $("#globalSearch")?.focus(), 60); }
  function closeAll() {
    $("#scrim")?.classList.remove("open");
    $("#cartDrawer")?.classList.remove("open");
    $("#navDrawer")?.classList.remove("open");
    $("#searchModal")?.classList.remove("open");
    lock(false);
  }
  function lock(on) { document.body.style.overflow = on ? "hidden" : ""; }

  /* ---------- Toast ---------- */
  function toast(msg) {
    const w = $("#toasts"); const t = document.createElement("div");
    t.className = "toast"; t.innerHTML = `<span class="toast-ic">${svg("check", 16)}</span>${esc(msg)}`;
    w.appendChild(t); requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 350); }, 2600);
  }

  /* ---------- Reveal ---------- */
  let io;
  function observeReveal() {
    if (!io) io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    $$("[data-reveal]:not(.in)").forEach((el) => io.observe(el));
  }

  /* ---------- Search results ---------- */
  function renderSearch(q) {
    const wrap = $("#searchResults"); if (!wrap) return;
    q = q.trim().toLowerCase();
    if (!q) { wrap.innerHTML = `<p class="search-hint">اكتب اسم منتج أو خدمة للبحث…</p>`; return; }
    const list = PRODUCTS.filter((p) => (p.name + " " + p.brand + " " + (cat(p.cat)?.name || "")).toLowerCase().includes(q));
    wrap.innerHTML = list.length
      ? `<div class="grid-products sm">${list.map(productCard).join("")}</div>`
      : `<p class="search-hint">لا نتائج لـ "${esc(q)}" 🔎</p>`;
  }

  /* =================================================================
     EVENTS
     ================================================================= */
  function bind() {
    document.addEventListener("click", (e) => {
      const t = e.target;

      // favorite toggle
      const fav = t.closest("[data-fav]");
      if (fav) { e.preventDefault(); const id = fav.dataset.fav; toggleFav(id, fav); return; }

      // quick add from card
      const qa = t.closest("[data-quickadd]");
      if (qa) { e.preventDefault(); addToCart(qa.dataset.quickadd, 0); return; }

      // product detail plan select
      const plan = t.closest("[data-plan]");
      if (plan) { $$("#pdPlans .plan").forEach((x) => x.classList.remove("active")); plan.classList.add("active"); return; }

      // add to cart (product detail) — use selected plan
      const add = t.closest("[data-add]");
      if (add) { addToCart(add.dataset.add, selectedPlan()); return; }
      const buy = t.closest("[data-buy]");
      if (buy) { addToCart(buy.dataset.buy, selectedPlan()); openCart(); return; }

      // cart qty
      const inc = t.closest("[data-inc]"); if (inc) { changeQty(inc.dataset.inc, 1); return; }
      const dec = t.closest("[data-dec]"); if (dec) { changeQty(dec.dataset.dec, -1); return; }
      const rm = t.closest("[data-rm]"); if (rm) { rmCart(rm.dataset.rm); return; }

      // category chips
      const chip = t.closest("[data-chip]");
      if (chip) { const k = chip.dataset.chip; location.hash = k === "all" ? "#/categories" : `#/categories?c=${k}`; return; }

      // open/close UI
      if (t.closest(".js-cart")) { e.preventDefault(); openCart(); return; }
      if (t.closest("#navBtn")) { openNav(); return; }
      if (t.closest(".js-search")) { openSearch(); return; }
      if (t.closest("#scrim") || t.closest("[data-close]") || t.closest(".close-x")) { closeAll(); return; }
      if (t.closest("#checkout")) { checkout(); return; }
      if (t.closest("[data-nav]")) { closeAll(); return; }
      if (t.closest("#toTop")) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }

      // password eye
      const eye = t.closest(".pw-eye");
      if (eye) { const inp = eye.previousElementSibling; inp.type = inp.type === "password" ? "text" : "password"; return; }
      // lang toggle (demo)
      if (t.closest("#langToggle")) { toast("سيتوفّر التبديل للإنجليزية قريباً"); return; }
    });

    // dynamic inputs
    document.addEventListener("input", (e) => {
      if (e.target.id === "catSearch") {
        const q = e.target.value.trim().toLowerCase();
        const grid = $("#catGrid"); if (!grid) return;
        const active = $("#catChips .chip.active")?.dataset.chip || "all";
        let list = active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === active);
        if (q) list = list.filter((p) => (p.name + " " + p.brand).toLowerCase().includes(q));
        grid.innerHTML = list.length ? list.map(productCard).join("") : `<p class="search-hint">لا نتائج 🔎</p>`;
        observeReveal();
      }
      if (e.target.id === "globalSearch") renderSearch(e.target.value);
    });

    document.addEventListener("submit", (e) => {
      if (e.target.id === "loginForm") { e.preventDefault(); toast("تم تسجيل الدخول بنجاح ✅"); setTimeout(() => location.hash = "#/", 700); }
    });

    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
    window.addEventListener("hashchange", render);
    window.addEventListener("scroll", () => $("#toTop")?.classList.toggle("show", window.scrollY > 700), { passive: true });
  }

  function selectedPlan() { const a = $("#pdPlans .plan.active"); return a ? +a.dataset.plan : 0; }

  function toggleFav(id, el) {
    if (favs.has(id)) { favs.delete(id); el?.classList.remove("active"); }
    else { favs.add(id); el?.classList.add("active"); toast("أُضيف إلى المفضلة 🔖"); }
    saveFavs();
    // refresh favorite labels on product page
    const lbl = el?.querySelector?.("span"); if (lbl) lbl.textContent = favs.has(id) ? "في المفضلة" : "إضافة للمفضلة";
    if (parseRoute().path === "/favorites") render();
  }

  function checkout() {
    if (!cart.length) { toast("سلتك فارغة"); return; }
    toast("جارٍ إتمام الطلب… 🚀");
    setTimeout(() => { cart = []; saveCart(); renderCart(); closeAll(); toast("تم استلام طلبك بنجاح ✅"); }, 1300);
  }

  /* ---------- Init ---------- */
  function buildChrome() {
    // inject nav items (desktop sidebar + mobile drawer share markup via JS)
    const navItems = [
      { route: "/", icon: "home", label: "الرئيسية" },
      { route: "/categories", icon: "layers", label: "الأقسام" },
      { route: "/offers", icon: "tag", label: "العروض", badge: "جديد" },
      { route: "/favorites", icon: "bookmark", label: "المفضلة" },
      { route: "/account", icon: "user", label: "حسابي" },
    ];
    const itemHTML = (it) => `<a class="nav-item" data-nav="${it.route}" href="#${it.route}">
      <span class="nav-ic">${svg(it.icon, 22)}</span>
      <span class="nav-label">${it.label}</span>
      ${it.badge ? `<span class="nav-badge">${it.badge}</span>` : ""}
    </a>`;
    $("#sidebarNav").innerHTML = navItems.map(itemHTML).join("");
    $("#drawerNav").innerHTML = navItems.map(itemHTML).join("");
  }

  function init() {
    buildChrome();
    bind();
    renderCart();
    render();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
