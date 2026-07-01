/* =================================================================
   LEGION SHOP — ليجون شوب
   SPA: router, cart, favorites, hero carousel, search, animations
   ================================================================= */
(function () {
  "use strict";
  const DATA = window.LEGION;
  const CATS = DATA.categories, PRODUCTS = DATA.products, ROWS = DATA.homeRows, HERO = DATA.heroSlides;

  /* ---------- helpers ---------- */
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const catOf = (k) => CATS.find((c) => c.key === k);
  const catCount = (k) => PRODUCTS.filter((p) => p.cat === k).length;
  const fmt = (n) => n.toLocaleString("en-US");
  const money = (n) => `<b class="mn">${fmt(n)}</b> <i class="mc">د.ع</i>`;
  const minPrice = (p) => Math.min(...p.plans.map((x) => x.price));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- icons ---------- */
  const PATHS = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    tag: '<path d="M3 11V4a1 1 0 0 1 1-1h7l9 9-8 8-9-9Z"/><circle cx="7.5" cy="7.5" r="1.4"/>',
    bookmark: '<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    bag: '<path d="M6 7h12l1 13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1L6 7Z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',
    box: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h2.2l2.3 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L21.5 7H6"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 10-12h-7z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    crown: '<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8Z"/>',
    fire: '<path d="M12 3c1 4-2 5-2 8a2 2 0 0 0 4 0c0-1 0-2-.5-3 2 1 3.5 3 3.5 6a5 5 0 1 1-10 0c0-4 3-6 5-11Z"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.8 6.6 20l1-6.1L3.2 9.5l6.1-.9L12 3Z"/>',
    pen: '<path d="m14 4 6 6-10 10H4v-6L14 4Z"/><path d="m12 6 6 6"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    chevL: '<path d="m15 6-6 6 6 6"/>',
    chevR: '<path d="m9 6 6 6-6 6"/>',
    arrowL: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    close: '<path d="M6 6 18 18M18 6 6 18"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M18 7l-1 13H7L6 7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.01"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    login: '<path d="M14 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4"/><path d="M10 8l4 4-4 4M14 12H4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3C9.5 5.5 9.5 18.5 12 21"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  };
  const ic  = (n, w = 22) => `<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${PATHS[n]}</svg>`;
  const icF = (n, w = 22) => `<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="currentColor">${PATHS[n]}</svg>`;

  /* ---------- state ---------- */
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };
  let cart = store.get("legion_cart_v3", []);
  let favs = new Set(store.get("legion_favs_v3", []));

  /* =================================================================
     COMPONENTS
     ================================================================= */

  /* فن 3D للمنتج — بطاقة مكدسة بشعار العلامة الحقيقي */
  const brandLogo = (l, cls = "blogo") => {
    const u = `url('assets/img/brands/${l}.svg')`;
    return `<b class="${cls}" style="-webkit-mask-image:${u};mask-image:${u}"></b>`;
  };
  function art(p, size = "") {
    const isTxt = /^[A-Za-z▦❋✦✄✕♫▶C]+$/.test(p.glyph);
    const face = p.logo ? brandLogo(p.logo) : `<b class="${isTxt ? "t" : "e"}">${esc(p.glyph)}</b>`;
    return `<div class="art ${size}" style="--ac:${p.color}">
      <span class="art-rays"></span>
      <span class="art-stack s3"></span><span class="art-stack s2"></span>
      <span class="art-face">${face}<i>${esc(p.brand)}</i></span>
      <span class="art-shelf"></span>
    </div>`;
  }

  /* بطاقة منتج — مطابقة للصور: bookmark + فن + اسم + قسم + سعر + زر إضافة عريض */
  function card(p) {
    const c = catOf(p.cat);
    return `<article class="card reveal">
      <a class="card-media" href="#/product/${p.id}" style="--ac:${p.color}">
        <button class="card-fav ${favs.has(p.id) ? "on" : ""}" data-fav="${p.id}" aria-label="حفظ">${icF("bookmark", 15)}</button>
        ${art(p)}
      </a>
      <div class="card-body">
        <a href="#/product/${p.id}" class="card-name">${esc(p.name)}</a>
        <span class="card-cat">${c ? esc(c.name) : ""}</span>
        <div class="card-price">${money(minPrice(p))}</div>
        <button class="card-add" data-add="${p.id}">${ic("cart", 16)} إضافة للسلة</button>
      </div>
    </article>`;
  }

  /* صف أفقي بعنوان + «الكل» + أسهم تصفح (كما بالصور) */
  function row(title, icon, tint, list, rowId) {
    if (!list.length) return "";
    return `<section class="sec reveal">
      <div class="sec-head">
        <div class="sec-ctrl">
          <a class="sec-all" href="#/categories">الكل ${ic("arrowL", 15)}</a>
          <div class="sec-arrows">
            <button data-scroll="${rowId}" data-dir="1" aria-label="السابق">${ic("chevR", 17)}</button>
            <button data-scroll="${rowId}" data-dir="-1" aria-label="التالي">${ic("chevL", 17)}</button>
          </div>
        </div>
        <h2>${esc(title)} <span class="sec-ic" style="--tint:${tint}">${icF(icon, 17)}</span></h2>
      </div>
      <div class="hscroll" id="${rowId}">${list.map(card).join("")}</div>
    </section>`;
  }

  /* =================================================================
     HERO
     ================================================================= */
  let heroIdx = 0, heroTimer = 0;
  function heroHTML() {
    return `<section class="hero reveal">
      ${HERO.map((s, i) => `
        <div class="slide ${i === 0 ? "on" : ""}" style="--c1:${s.c1};--c2:${s.c2}">
          <div class="slide-art">
            <span class="slide-glow"></span>
            ${s.chips.map((ch, j) => `<span class="fchip p${j}" style="--cc:${ch.c}" data-depth="${(j % 3) + 1}">${ch.l ? brandLogo(ch.l, "blogo chip-logo") : esc(ch.g)}</span>`).join("")}
          </div>
          <div class="slide-copy">
            <h1>${esc(s.title)}</h1>
            <p>${esc(s.subtitle)}</p>
            <a class="btn grad" href="#/categories">تصفّح الآن ${ic("arrowL", 17)}</a>
          </div>
        </div>`).join("")}
      <button class="hero-btn r" id="heroPrev" aria-label="السابق">${ic("chevR", 20)}</button>
      <button class="hero-btn l" id="heroNext" aria-label="التالي">${ic("chevL", 20)}</button>
      <div class="dots" id="heroDots">${HERO.map((_, i) => `<button data-i="${i}" class="${i === 0 ? "on" : ""}"></button>`).join("")}</div>
    </section>`;
  }
  function heroGo(i) {
    const slides = $$(".hero .slide"); if (!slides.length) return;
    heroIdx = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("on", k === heroIdx));
    $$("#heroDots button").forEach((d, k) => d.classList.toggle("on", k === heroIdx));
  }
  function heroPlay() { clearInterval(heroTimer); heroTimer = setInterval(() => heroGo(heroIdx + 1), 5000); }

  /* =================================================================
     VIEWS
     ================================================================= */
  function brandStripHTML() {
    const items = DATA.brandStrip.map((b) =>
      `<span class="mitem">${brandLogo(b.l, "blogo mlogo")}<i>${esc(b.n)}</i></span>`).join("");
    return `<section class="marq reveal" aria-hidden="true">
      <div class="marq-track">${items}${items}</div>
    </section>`;
  }

  function vHome() {
    return heroHTML() + brandStripHTML() + `
      <section class="sec reveal">
        <div class="sec-head">
          <a class="sec-all" href="#/categories">الكل ${ic("arrowL", 15)}</a>
          <h2>الأقسام <span class="sec-ic" style="--tint:#a78bfa">${icF("grid", 17)}</span></h2>
        </div>
        <div class="cats-row">
          ${CATS.map((c) => `
            <a class="ctile" href="#/categories?c=${c.key}" style="--ac:${c.color}">
              <span class="ctile-badge">${catCount(c.key)}</span>
              <span class="ctile-ic">${c.glyph}</span>
              <span class="ctile-name">${esc(c.name)}</span>
            </a>`).join("")}
        </div>
      </section>
      ${ROWS.map((r, i) => {
        let list = r.filter ? PRODUCTS.filter(r.filter) : [...PRODUCTS].reverse();
        if (r.limit) list = list.slice(0, r.limit);
        return row(r.title, r.icon, r.tint, list, "row-" + r.key);
      }).join("")}`;
  }

  function vCategories(params) {
    const active = params.get("c") || "all";
    const list = active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === active);
    return `
      <header class="phead reveal"><h1>الأقسام</h1><p>تصفح جميع الاشتراكات والمنتجات</p></header>
      <div class="searchbox reveal">${ic("search", 19)}<input id="catSearch" type="search" placeholder="ابحث في المنتجات..." /></div>
      <div class="chips reveal">
        <button class="chip ${active === "all" ? "on" : ""}" data-cat="all">الكل ${icF("tag", 13)}</button>
        ${CATS.map((c) => `<button class="chip ${active === c.key ? "on" : ""}" data-cat="${c.key}">${esc(c.name)} <span class="chip-n">${catCount(c.key)}</span></button>`).join("")}
      </div>
      <div class="pgrid" id="catGrid">${list.map(card).join("")}</div>`;
  }

  function vOffers() {
    return `
      <header class="phead reveal"><h1>العروض</h1><p>أفضل الأسعار والخصومات</p></header>
      <div class="empty reveal">
        <span class="empty-ic">${icF("tag", 30)}</span>
        <h3>لا توجد عروض حالياً</h3>
        <p>تابعنا — عروض حصرية قادمة قريباً</p>
        <a class="btn grad" href="#/categories">تصفّح المنتجات</a>
      </div>`;
  }

  function vFavs() {
    const list = PRODUCTS.filter((p) => favs.has(p.id));
    if (!list.length) return `
      <header class="phead reveal"><h1>المفضلة</h1><p>المنتجات المحفوظة</p></header>
      <div class="empty reveal">
        <span class="empty-ic">${icF("bookmark", 30)}</span>
        <h3>لا توجد منتجات محفوظة</h3>
        <p>احفظ منتجاتك المفضلة لتجدها هنا</p>
        <a class="btn grad" href="#/categories">تصفّح المنتجات</a>
      </div>`;
    return `
      <header class="phead reveal"><h1>المفضلة</h1><p>${list.length} منتج محفوظ</p></header>
      <div class="pgrid">${list.map(card).join("")}</div>`;
  }

  function vAccount() {
    return `
      <header class="phead reveal"><h1>حسابي</h1><p>إدارة حسابك وطلباتك</p></header>
      <div class="acard reveal">
        <span class="acard-ic">${ic("user", 34)}</span>
        <h2>سجّل دخولك</h2>
        <p>لتتمكن من حفظ المنتجات وإتمام الشراء</p>
        <a class="btn grad wide" href="#/login">${ic("login", 17)} تسجيل الدخول</a>
        <a class="btn line wide" href="#/login">إنشاء حساب</a>
        <button class="btn ghost" id="langBtn">${ic("globe", 17)} English</button>
      </div>`;
  }

  function vLogin() {
    return `<div class="auth">
      <div class="auth-logo">
        <span class="wordmark">ليجون شوب</span>
        <p>متجر الاشتراكات الرقمية</p>
      </div>
      <form class="auth-card reveal in" id="loginForm">
        <h2>تسجيل الدخول</h2>
        <label>البريد الإلكتروني</label>
        <input type="email" required placeholder="example@email.com" />
        <label>كلمة المرور</label>
        <div class="pwrap">
          <input type="password" required placeholder="••••••••" />
          <button type="button" class="peye" aria-label="إظهار كلمة المرور">${ic("eye", 17)}</button>
        </div>
        <a class="forgot" href="#/login">نسيت كلمة المرور؟</a>
        <button class="btn grad wide" type="submit">${ic("login", 17)} تسجيل الدخول</button>
        <p class="alt">ليس لديك حساب؟ <a href="#/login">إنشاء حساب</a></p>
        <a class="back" href="#/">${ic("arrowL", 15)} العودة للمتجر</a>
      </form>
    </div>`;
  }

  function vProduct(id) {
    const p = byId(id);
    if (!p) return `<div class="empty"><h3>المنتج غير موجود</h3><a class="btn grad" href="#/">الرئيسية</a></div>`;
    const similar = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id)
      .concat(PRODUCTS.filter((x) => x.cat !== p.cat && x.featured && x.id !== p.id))
      .slice(0, 6);
    return `
    <div class="pd" data-pid="${p.id}">
      <div class="pd-main">
        <h1 class="pd-title reveal in">${esc(p.name)}</h1>
        <div class="plans" id="plans">
          ${p.plans.map((pl, i) => `
            <button class="plan ${i === 0 ? "on" : ""}" data-plan="${i}">
              <span class="plan-ck">${ic("check", 11)}</span>
              <b>${esc(pl.name)}</b>
              <i>${pl.days} يوم</i>
              <span class="plan-p">${money(pl.price)}</span>
            </button>`).join("")}
        </div>
        <div class="pd-badges">
          <span class="pdb fire">${icF("fire", 13)} ${p.purchases} عملية شراء</span>
          ${p.featured ? `<span class="pdb gold">${icF("crown", 13)} منتج مميز</span>` : ""}
          <span class="pdb ${p.delivery.tone}">${ic(p.delivery.icon, 13)} ${esc(p.delivery.label)}</span>
        </div>
        <div class="about">
          <h3>${icF("info", 17)} عن المنتج</h3>
          ${p.about.map((t) => `<p>${esc(t)}</p>`).join("")}
        </div>
        <div class="pd-cta">
          <button class="btn grad big" data-buy="${p.id}">${icF("bolt", 18)} اشتر الآن</button>
          <button class="btn line big" data-add="${p.id}">${ic("cart", 18)} أضف للسلة</button>
        </div>
      </div>
      <aside class="pd-side">
        <div class="pd-media reveal in" style="--ac:${p.color}">${art(p, "big")}</div>
        <button class="btn ghost wide ${favs.has(p.id) ? "on" : ""}" data-fav="${p.id}" data-favlabel>
          ${icF("bookmark", 16)} <span>${favs.has(p.id) ? "في المفضلة" : "إضافة للمفضلة"}</span>
        </button>
      </aside>
    </div>
    ${similar.length ? row("منتجات مشابهة", "layers", "#a78bfa", similar, "row-similar") : ""}`;
  }

  /* =================================================================
     ROUTER
     ================================================================= */
  function route() {
    const h = location.hash.replace(/^#/, "") || "/";
    const [path, q] = h.split("?");
    return { path, params: new URLSearchParams(q || "") };
  }

  function render() {
    clearInterval(heroTimer);
    const { path, params } = route();
    let html, key;
    if (path === "/" || path === "") { html = vHome(); key = "/"; }
    else if (path === "/categories") { html = vCategories(params); key = "/categories"; }
    else if (path === "/offers") { html = vOffers(); key = "/offers"; }
    else if (path === "/favorites") { html = vFavs(); key = "/favorites"; }
    else if (path === "/account") { html = vAccount(); key = "/account"; }
    else if (path === "/login") { html = vLogin(); key = ""; }
    else if (path.startsWith("/product/")) { html = vProduct(path.slice(9)); key = ""; }
    else { html = vHome(); key = "/"; }

    document.body.classList.toggle("is-login", path === "/login");
    document.body.classList.toggle("is-product", path.startsWith("/product/"));
    const view = $("#view");
    view.classList.remove("page-in");
    view.innerHTML = html;
    void view.offsetWidth; /* إعادة تشغيل أنميشن دخول الصفحة */
    view.classList.add("page-in");
    $$(".main-nav a").forEach((a) => a.classList.toggle("on", a.getAttribute("data-r") === key));
    window.scrollTo({ top: 0 });
    revealAll();
    if (key === "/") { bindHero(); heroPlay(); }
    closeLayers();
  }

  function bindHero() {
    $("#heroPrev")?.addEventListener("click", () => { heroGo(heroIdx - 1); heroPlay(); });
    $("#heroNext")?.addEventListener("click", () => { heroGo(heroIdx + 1); heroPlay(); });
    $$("#heroDots button").forEach((d) => d.addEventListener("click", () => { heroGo(+d.dataset.i); heroPlay(); }));
    /* بارالاكس ناعم لعناصر الهيرو مع حركة المؤشر */
    const hero = $(".hero");
    if (hero && matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion:reduce)").matches) {
      hero.addEventListener("mousemove", (e) => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        $$(".slide.on .fchip", hero).forEach((ch) => {
          const d = +ch.dataset.depth || 1;
          ch.style.setProperty("--px", `${x * d * -10}px`);
          ch.style.setProperty("--py", `${y * d * -8}px`);
        });
      });
      hero.addEventListener("mouseleave", () =>
        $$(".fchip", hero).forEach((ch) => { ch.style.setProperty("--px", "0px"); ch.style.setProperty("--py", "0px"); }));
    }
  }

  /* =================================================================
     CART
     ================================================================= */
  const cartQty = () => cart.reduce((s, x) => s + x.qty, 0);
  const cartSum = () => cart.reduce((s, x) => { const p = byId(x.id); return s + (p ? p.plans[x.plan].price * x.qty : 0); }, 0);

  function addCart(id, plan = 0, open = false) {
    const p = byId(id); if (!p) return;
    const k = `${id}|${plan}`;
    const f = cart.find((x) => x.k === k);
    if (f) f.qty++; else cart.push({ k, id, plan, qty: 1 });
    store.set("legion_cart_v3", cart);
    paintCart();
    $$(".js-cart").forEach((b) => b.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.18)" }, { transform: "scale(1)" }],
      { duration: 320, easing: "cubic-bezier(.2,.7,.2,1)" }));
    toast(`أُضيف «${p.name}» إلى السلة`);
    if (open) openCart();
  }
  function qty(k, d) {
    const it = cart.find((x) => x.k === k); if (!it) return;
    it.qty += d; if (it.qty < 1) cart = cart.filter((x) => x.k !== k);
    store.set("legion_cart_v3", cart); paintCart();
  }
  function drop(k) { cart = cart.filter((x) => x.k !== k); store.set("legion_cart_v3", cart); paintCart(); }

  function paintCart() {
    const n = cartQty();
    $$(".cart-n").forEach((b) => { b.textContent = n; b.classList.toggle("show", n > 0); });
    const box = $("#cartItems");
    if (box) {
      box.innerHTML = cart.length ? cart.map((x) => {
        const p = byId(x.id), pl = p.plans[x.plan];
        return `<div class="ci">
          <span class="ci-art" style="--ac:${p.color}">${p.logo ? brandLogo(p.logo, "blogo ci-logo") : `<b>${esc(p.glyph)}</b>`}</span>
          <div class="ci-info">
            <h4>${esc(p.name)}</h4>
            <i>${esc(pl.name)} · ${pl.days} يوم</i>
            <div class="ci-price">${money(pl.price * x.qty)}</div>
            <div class="stepper">
              <button data-dec="${x.k}">−</button><span>${x.qty}</span><button data-inc="${x.k}">+</button>
            </div>
          </div>
          <button class="ci-x" data-drop="${x.k}" aria-label="حذف">${ic("trash", 17)}</button>
        </div>`;
      }).join("") : `<div class="empty tight">
          <span class="empty-ic">${ic("cart", 26)}</span>
          <h3>سلة التسوق فارغة</h3><p>تسوق المنتجات</p>
          <a class="btn grad" href="#/categories" data-shut>تصفّح المنتجات</a>
        </div>`;
    }
    const t = $("#cartSum"); if (t) t.innerHTML = money(cartSum());
  }

  /* ---------- layers ---------- */
  const openCart = () => { $("#dim").classList.add("on"); $("#cartDrawer").classList.add("on"); document.body.style.overflow = "hidden"; };
  const openNav  = () => { $("#dim").classList.add("on"); $("#navDrawer").classList.add("on"); document.body.style.overflow = "hidden"; };
  const openFind = () => { $("#find").classList.add("on"); document.body.style.overflow = "hidden"; setTimeout(() => $("#findInput")?.focus(), 80); };
  function closeLayers() {
    ["#dim", "#cartDrawer", "#navDrawer", "#find"].forEach((s) => $(s)?.classList.remove("on"));
    document.body.style.overflow = "";
  }

  /* ---------- toast ---------- */
  function toast(m) {
    const t = document.createElement("div");
    t.className = "toast"; t.innerHTML = `<span>${ic("check", 15)}</span>${esc(m)}`;
    $("#toasts").appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 350); }, 2500);
  }

  /* ---------- reveal ---------- */
  let io;
  function revealAll() {
    io ||= new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    /* تتابع (stagger) لعناصر الشبكات والصفوف */
    $$(".hscroll, .pgrid, .cats-row, .plans").forEach((c) =>
      [...c.children].forEach((el, i) => el.style.setProperty("--i", i % 10)));
    $$(".reveal:not(.in)").forEach((el) => io.observe(el));
  }

  /* ---------- search ---------- */
  function findResults(q) {
    const box = $("#findResults");
    q = q.trim().toLowerCase();
    if (!q) { box.innerHTML = `<p class="hint">اكتب اسم منتج أو خدمة للبحث…</p>`; return; }
    const list = PRODUCTS.filter((p) => (p.name + p.brand + (catOf(p.cat)?.name || "")).toLowerCase().includes(q));
    box.innerHTML = list.length ? `<div class="pgrid find-grid">${list.map(card).join("")}</div>`
      : `<p class="hint">لا نتائج لـ «${esc(q)}» 🔎</p>`;
    $$(".reveal", box).forEach((el) => el.classList.add("in"));
  }

  /* =================================================================
     EVENTS
     ================================================================= */
  function selPlan() { return +($("#plans .plan.on")?.dataset.plan || 0); }

  document.addEventListener("click", (e) => {
    const t = e.target;
    const hit = (s) => t.closest(s);

    const fav = hit("[data-fav]");
    if (fav) {
      e.preventDefault();
      const id = fav.dataset.fav;
      const on = !favs.has(id);
      on ? favs.add(id) : favs.delete(id);
      store.set("legion_favs_v3", [...favs]);
      fav.classList.toggle("on", on);
      const lbl = fav.matches("[data-favlabel]") && fav.querySelector("span");
      if (lbl) lbl.textContent = on ? "في المفضلة" : "إضافة للمفضلة";
      if (on) toast("أُضيف إلى المفضلة");
      if (route().path === "/favorites") render();
      return;
    }

    const add = hit("[data-add]");
    if (add) { e.preventDefault(); addCart(add.dataset.add, hit(".pd") ? selPlan() : 0); return; }
    const buy = hit("[data-buy]");
    if (buy) { addCart(buy.dataset.buy, selPlan(), true); return; }

    const plan = hit("[data-plan]");
    if (plan) { $$("#plans .plan").forEach((p) => p.classList.remove("on")); plan.classList.add("on"); return; }

    const sc = hit("[data-scroll]");
    if (sc) {
      const el = document.getElementById(sc.dataset.scroll);
      if (el) el.scrollBy({ left: +sc.dataset.dir * el.clientWidth * -0.8, behavior: "smooth" });
      return;
    }

    const chip = hit("[data-cat]");
    if (chip) { location.hash = chip.dataset.cat === "all" ? "#/categories" : `#/categories?c=${chip.dataset.cat}`; return; }

    if (hit("[data-inc]")) return qty(hit("[data-inc]").dataset.inc, 1);
    if (hit("[data-dec]")) return qty(hit("[data-dec]").dataset.dec, -1);
    if (hit("[data-drop]")) return drop(hit("[data-drop]").dataset.drop);

    if (hit(".js-cart")) { e.preventDefault(); openCart(); return; }
    if (hit(".js-find")) { openFind(); return; }
    if (hit(".js-menu")) { openNav(); return; }
    if (hit("#dim") || hit("[data-shut]") || hit(".shut")) { closeLayers(); return; }
    if (hit("#checkout")) {
      if (!cart.length) return toast("سلتك فارغة — أضف منتجات أولاً");
      toast("جارٍ إتمام الطلب… 🚀");
      setTimeout(() => { cart = []; store.set("legion_cart_v3", cart); paintCart(); closeLayers(); toast("تم استلام طلبك بنجاح ✅"); }, 1200);
      return;
    }
    if (hit(".peye")) {
      const inp = hit(".pwrap").querySelector("input");
      inp.type = inp.type === "password" ? "text" : "password";
      return;
    }
    if (hit("#langBtn")) return toast("سيتوفر التبديل للإنجليزية قريباً 🌐");
    if (hit("#toTop")) return window.scrollTo({ top: 0, behavior: "smooth" });
    if (hit("#navDrawer a")) closeLayers();
  });

  document.addEventListener("input", (e) => {
    if (e.target.id === "findInput") return findResults(e.target.value);
    if (e.target.id === "catSearch") {
      const q = e.target.value.trim().toLowerCase();
      const active = $(".chips .chip.on")?.dataset.cat || "all";
      let list = active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === active);
      if (q) list = list.filter((p) => (p.name + p.brand).toLowerCase().includes(q));
      $("#catGrid").innerHTML = list.length ? list.map(card).join("") : `<p class="hint">لا نتائج 🔎</p>`;
      $$("#catGrid .reveal").forEach((el) => el.classList.add("in"));
    }
  });

  document.addEventListener("submit", (e) => {
    if (e.target.id === "loginForm") {
      e.preventDefault();
      toast("تم تسجيل الدخول بنجاح ✅");
      setTimeout(() => (location.hash = "#/"), 650);
    }
  });

  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLayers(); });
  window.addEventListener("hashchange", render);
  window.addEventListener("scroll", () => $("#toTop").classList.toggle("show", scrollY > 650), { passive: true });

  /* ---------- boot: بناء الشريط الجانبي ---------- */
  const NAV = [
    { r: "/",           n: "الرئيسية", i: "home" },
    { r: "/categories", n: "الأقسام",  i: "layers" },
    { r: "/offers",     n: "العروض",   i: "tag", badge: "جديد" },
    { r: "/favorites",  n: "المفضلة",  i: "bookmark" },
    { r: "/account",    n: "حسابي",    i: "user" },
  ];
  const navHTML = NAV.map((x) => `
    <a data-r="${x.r}" href="#${x.r}">
      <span class="lbl">${x.n}</span>
      ${x.badge ? `<span class="pill">${x.badge}</span>` : ""}
      <span class="ico">${ic(x.i, 21)}</span>
    </a>`).join("");
  $$(".main-nav").forEach((n) => (n.innerHTML = navHTML));

  paintCart();
  render();
})();
