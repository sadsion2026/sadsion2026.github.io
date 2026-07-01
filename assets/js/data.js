/* =================================================================
   LEGION SHOP — ليجون شوب | متجر الاشتراكات الرقمية
   Catalog data — مستخرج حرفياً من صور الموقع الأصلي (reference/)
   ================================================================= */
window.LEGION = {};

/* ---------- الأقسام (9 أقسام كما في الصور) ---------- */
window.LEGION.categories = [
  { key: "cinema",    name: "سينما",             glyph: "🎬", color: "#ef4444" },
  { key: "ai",        name: "الذكاء الاصطناعي",  glyph: "🤖", color: "#8b5cf6" },
  { key: "games",     name: "الالعاب",           glyph: "🎮", color: "#22c55e" },
  { key: "design",    name: "تصميم وابداع",      glyph: "✒️", color: "#f59e0b" },
  { key: "software",  name: "برامج",             glyph: "💻", color: "#3b82f6" },
  { key: "antivirus", name: "انتي فايروس",       glyph: "🛡️", color: "#14b8a6" },
  { key: "vpn",       name: "VPN",               glyph: "🔒", color: "#a855f7" },
  { key: "music",     name: "موسيقى وترفيه",     glyph: "🎵", color: "#ec4899" },
  { key: "education", name: "تعليم",             glyph: "🎓", color: "#fb923c" },
];

/* ---------- شارات التسليم ---------- */
const D_INSTANT = { icon: "bolt", label: "تسليم فوري بعد الدفع", tone: "teal" };
const D_EMAIL   = { icon: "mail", label: "يتطلب بريد إلكتروني",  tone: "slate" };

/* ---------- المنتجات (أسماء/أسعار/باقات/أوصاف من الصور) ---------- */
window.LEGION.products = [
  {
    id: "chatgpt", logo: "openai", name: "اشتراك Chatgpt الاصلي", cat: "ai", brand: "OpenAI",
    glyph: "❋", color: "#7c3aed", featured: true, purchases: 14, delivery: D_EMAIL,
    plans: [
      { name: "شهر واحد", days: 30,  price: 7000 },
      { name: "3 أشهر",   days: 90,  price: 15000 },
      { name: "6 أشهر",   days: 180, price: 25000 },
      { name: "سنوي",     days: 365, price: 45000 },
    ],
    about: [
      "اشترك في ChatGPT وخلّي أفكارك أسرع، شغلك أذكى، ووقتك أثمن.",
      "مع الاشتراك تحصل على تجربة أقوى تساعدك بالكتابة، الترجمة، الدراسة، التخطيط، تحليل الملفات، توليد الأفكار، وصناعة المحتوى باحترافية وسرعة. سواء كنت طالب، صاحب مشروع، موظف، أو صانع محتوى، ChatGPT يكون مساعدك الذكي بكل وقت.",
      "جرّب مستوى جديد من الإنتاجية — اشتراك واحد يختصر عليك ساعات من التفكير والبحث والكتابة.",
    ],
  },
  {
    id: "gemini", logo: "gemini", name: "اشتراك Gemini الاصلي", cat: "ai", brand: "Google",
    glyph: "✦", color: "#3b82f6", featured: true, purchases: 13, delivery: D_EMAIL,
    plans: [
      { name: "شهر واحد", days: 30,  price: 10000 },
      { name: "3 أشهر",   days: 90,  price: 15000 },
      { name: "سنوي",     days: 365, price: 19999 },
    ],
    about: [
      "اشترك في Gemini واكتشف طريقة أذكى للإنجاز والتعلّم والإبداع.",
      "مع Gemini تكتب أسرع، تولّد أفكاراً جديدة، تترجم المحتوى، تلخّص المعلومات، تحلّل الصور والملفات، وتزيد إنتاجيتك اليومية بقوة ذكاء Google الاصطناعي.",
      "اشتراك واحد. إجابات أذكى. إنتاجية أفضل.",
    ],
  },
  {
    id: "adobe", logo: "adobe", name: "اشتراك Adobe الاصلي", cat: "design", brand: "Adobe",
    glyph: "A", color: "#dc2626", featured: true, purchases: 21, delivery: D_INSTANT,
    plans: [
      { name: "شهر واحد", days: 30,  price: 15000 },
      { name: "6 أشهر",   days: 180, price: 55000 },
      { name: "سنة",      days: 365, price: 99000 },
    ],
    about: [
      "اشترك في Adobe وابدأ بصناعة تصاميم ومحتوى احترافي بمستوى أعلى.",
      "مع Adobe تقدر تصمم صور، تعدّل فيديوهات، تنشئ شعارات، تحرر ملفات PDF، وتنتج محتوى إبداعي مناسب للسوشيال ميديا، الإعلانات، الأعمال، والمشاريع الشخصية.",
      "اشتراك واحد. أدوات أقوى. إبداع بلا حدود.",
    ],
  },
  {
    id: "capcut", logo: "capcut", name: "اشتراك CapCut اصلي", cat: "design", brand: "CapCut",
    glyph: "✄", color: "#0ea5b7", featured: true, purchases: 18, delivery: D_EMAIL,
    plans: [
      { name: "شهر واحد", days: 30,  price: 10000 },
      { name: "6 أشهر",   days: 180, price: 18000 },
      { name: "سنوي",     days: 365, price: 25000 },
    ],
    about: [
      "اشترك في CapCut برو واصنع محتوى احترافي بسهولة وسرعة.",
      "مؤثرات وانتقالات حصرية، قوالب جاهزة، إزالة خلفية الفيديو، تصدير 4K بدون علامة مائية، ومكتبة موسيقى ضخمة — كل أدوات المونتاج بين يديك.",
      "اشتراك واحد. مونتاج أسهل. فيديوهات أجمل.",
    ],
  },
  {
    id: "capcut-pro", logo: "capcut", name: "كب كات برو (شهر)", cat: "design", brand: "CapCut",
    glyph: "✄", color: "#164e63", featured: false, purchases: 7, delivery: D_EMAIL,
    plans: [{ name: "شهر واحد", days: 30, price: 10000 }],
    about: [
      "اشتراك كاب كات برو لمدة شهر على حسابك الشخصي.",
      "كل ميزات النسخة الاحترافية: قوالب حصرية، خطوط ومؤثرات إضافية، وتصدير بجودة عالية بدون علامة مائية.",
    ],
  },
  {
    id: "canva", logo: "canva", name: "كانفا برو (سنة)", cat: "design", brand: "Canva",
    glyph: "C", color: "#7d2ae8", featured: false, purchases: 9, delivery: D_INSTANT,
    plans: [
      { name: "شهر واحد", days: 30,  price: 3000 },
      { name: "سنة",      days: 365, price: 7000 },
    ],
    about: [
      "بعد الشراء سيتم المباشرة في اتمام طلبك خلال ساعة او أقل.",
      "75 مليون صورة مخزنة ومقاطع فيديو ومقاطع صوتية وتصاميم جرافيك مميزة متاحة للاستخدام.",
      "جدولة المحتوى لوسائل التواصل انستغرام تويتر فيسبوك بنترست لينكد ان.",
      "تصميم الشعارات والبوستات لمنصات التواصل الاجتماعي.",
      "أكثر من 420 ألف قالب مجاني مع تصاميم جديدة يوميا.",
      "ازالة الخلفية من الصور مع الحفاظ على جودة الصور.",
      "الوصول إلى أكثر من 3,000 خط مميز.",
      "صمم فلاتر سناب شات بضغطة زر.",
      "تخزين سحابي 100 جيجابايت.",
      "😎 أشتراك رسمي 100٪",
      "🥰 وستصلك رسالة بالايميل من الشركة نفسها لتفعيل الاشتراك",
    ],
  },
  {
    id: "netflix", logo: "netflix", name: "اشتراك Netflix الاصلي", cat: "cinema", brand: "Netflix",
    glyph: "N", color: "#e50914", featured: true, purchases: 27, delivery: D_EMAIL,
    plans: [
      { name: "شهر واحد", days: 30,  price: 4000 },
      { name: "6 أشهر",   days: 180, price: 14999 },
      { name: "سنة",      days: 365, price: 24999 },
    ],
    about: [
      "اشترك في Netflix واستمتع بعالم من الترفيه بأي وقت ومن أي مكان.",
      "أفلام، مسلسلات، وثائقيات، أنمي، وعروض حصرية بجودة عالية وعلى جميع أجهزتك المفضلة.",
      "اشتراك واحد. ترفيه بلا حدود.",
    ],
  },
  {
    id: "cimax", logo: "cimax", name: "اشتراك سيماكس", cat: "cinema", brand: "CimaX",
    glyph: "✕", color: "#2563eb", featured: false, purchases: 32, delivery: D_INSTANT,
    plans: [
      { name: "شهر واحد", days: 30,  price: 1000 },
      { name: "سنوي",     days: 365, price: 9000 },
    ],
    about: [
      "اشترك في سيماكس وشاهد أحدث الأفلام والمسلسلات العربية والأجنبية بجودة عالية.",
      "مكتبة ضخمة محدّثة باستمرار، بدون إعلانات مزعجة، وعلى جميع الأجهزة.",
    ],
  },
  {
    id: "cimax-premium", logo: "cimax", name: "اشتراك سيماكلوب بريميوم", cat: "cinema", brand: "CimaX",
    glyph: "✕", color: "#1d4ed8", featured: false, purchases: 19, delivery: D_INSTANT,
    plans: [
      { name: "تجريبي",   days: 7,  price: 1 },
      { name: "شهر واحد", days: 30, price: 3000 },
    ],
    about: [
      "النسخة البريميوم — جودة 4K، مشاهدة على أكثر من جهاز، وتحميل للمشاهدة لاحقاً.",
      "أحدث الإصدارات أولاً بأول مع تجربة مشاهدة خالية من الإعلانات.",
    ],
  },
  {
    id: "gamepass", logo: "xbox", name: "كيم باس الالتمت مشترك بين شخصين", cat: "games", brand: "Xbox",
    glyph: "✕", color: "#107c10", featured: true, purchases: 15, delivery: D_INSTANT,
    plans: [
      { name: "شهرين (مشترك)",      days: 60, price: 14000 },
      { name: "شهرين ونص (مشترك)",  days: 75, price: 16000 },
      { name: "شهرين (خاص)",        days: 60, price: 22000 },
      { name: "شهرين ونص (خاص)",    days: 75, price: 28000 },
    ],
    about: [
      "🎮 اشتراك إكس بوكس كيم باس ألتيميت — استمتع بمكتبة ضخمة من الألعاب وعيش التجربة لأقصى حد!",
      "◆ الحساب المشترك: خيار اقتصادي ومضمون بدون ما يتأثر لعبك، يشتغل على أجهزة PC والإكس بوكس.",
      "👑 الحساب الخاص (VIP): حساب خاص بيك لوحدك، تحكم مطلق وتقدر تغيّر معلومات الحساب.",
      "🚀 المميزات: وصول لأكثر من 400 لعبة، ألعاب اليوم الأول (Day One)، اشتراك EA Play مجاني، اللعب أونلاين، وخصومات تصل إلى 20% على الألعاب.",
      "آمن 100% ومضمون — سيتم إرفاق جميع تعليمات التفعيل فور إتمام الطلب.",
    ],
  },
  {
    id: "nitro", logo: "discord", name: "دسكورد نيترو (على حسابك الشخصي)", cat: "games", brand: "Discord",
    glyph: "🎮", color: "#5865f2", featured: false, purchases: 8, delivery: D_INSTANT,
    plans: [
      { name: "شهر واحد", days: 30,  price: 12000 },
      { name: "سنوي",     days: 365, price: 110000 },
    ],
    about: [
      "اشتراك Discord Nitro يُفعَّل مباشرة على حسابك الشخصي بأمان تام.",
      "رفع ملفات أكبر، إيموجي وملصقات مخصصة بكل السيرفرات، بث بجودة عالية، وبروفايل مميز.",
    ],
  },
  {
    id: "office365", logo: "microsoftoffice", name: "اوفيس 365 سنوي (حساب خاص)", cat: "software", brand: "Microsoft",
    glyph: "▦", color: "#ea580c", featured: false, purchases: 11, delivery: D_INSTANT,
    plans: [{ name: "سنوي (حساب خاص)", days: 365, price: 25000 }],
    about: [
      "دخول على 5 أجهزة مختلفة بنفس الوقت.",
      "سعة تخزين 1 تيرا (الف جيجا) على OneDrive ☁️",
      "يدعم جميع الأجهزة: Windows - Mac - Android - iPhone 💻📱",
      "يدعم اللغة العربية والإنجليزية وجميع اللغات الأخرى.",
      "حساب يقبل التفعيل حق بعد الفورمات أو ازالة المنتج.",
      "المنتج عبارة عن حساب جاهز مفعل فيه الاشتراك (اسم مستخدم وكلمة مرور) يمكن للعميل تغيير كلمة المرور.",
      "سيتم طلب تعيين كلمة مرور خاصة بك عند اول تسجيل دخول لك في الموقع الرسمي: www.office.com",
    ],
  },
  {
    id: "spotify", logo: "spotify", name: "اشتراك Spotify Premium", cat: "music", brand: "Spotify",
    glyph: "♫", color: "#1db954", featured: true, purchases: 17, delivery: D_EMAIL,
    plans: [
      { name: "شهر واحد", days: 30,  price: 5000 },
      { name: "3 أشهر",   days: 90,  price: 12000 },
      { name: "سنوي",     days: 365, price: 40000 },
    ],
    about: [
      "استمع لملايين الأغاني والبودكاست بدون إعلانات ومع جودة صوت عالية.",
      "تحميل الموسيقى للاستماع بدون إنترنت، وتشغيل أي أغنية بأي وقت.",
    ],
  },
  {
    id: "ytpremium", logo: "youtube", name: "اشتراك YouTube Premium", cat: "music", brand: "YouTube",
    glyph: "▶", color: "#ff0000", featured: false, purchases: 14, delivery: D_EMAIL,
    plans: [
      { name: "شهر واحد", days: 30,  price: 6000 },
      { name: "سنوي",     days: 365, price: 50000 },
    ],
    about: [
      "شاهد يوتيوب بدون إعلانات، مع التشغيل في الخلفية ويوتيوب ميوزك مجاناً.",
      "حمّل الفيديوهات وشاهدها بدون إنترنت بأي وقت.",
    ],
  },
  {
    id: "nordvpn", logo: "nordvpn", name: "اشتراك NordVPN", cat: "vpn", brand: "Nord",
    glyph: "🔒", color: "#4687ff", featured: false, purchases: 10, delivery: D_INSTANT,
    plans: [
      { name: "شهر واحد", days: 30,  price: 6000 },
      { name: "سنوي",     days: 365, price: 45000 },
    ],
    about: [
      "احمِ خصوصيتك وتصفّح بأمان — تشفير قوي وسرعات عالية.",
      "تجاوز الحجب وادخل المحتوى من أي دولة، على جميع أجهزتك.",
    ],
  },
  {
    id: "eset", logo: "eset", name: "اشتراك ESET انتي فايروس", cat: "antivirus", brand: "ESET",
    glyph: "🛡️", color: "#0aa1dd", featured: false, purchases: 7, delivery: D_INSTANT,
    plans: [
      { name: "سنوي — جهاز واحد", days: 365, price: 12000 },
      { name: "سنوي — 3 أجهزة",   days: 365, price: 25000 },
    ],
    about: [
      "حماية شاملة من الفيروسات والبرمجيات الخبيثة وهجمات التصيّد.",
      "أداء خفيف لا يبطئ جهازك، مع حماية للتصفح والمعاملات البنكية.",
    ],
  },
  {
    id: "notebooklm", logo: "google", name: "اشتراك NotebookLM", cat: "education", brand: "Google",
    glyph: "📓", color: "#f59e0b", featured: false, purchases: 6, delivery: D_EMAIL,
    plans: [
      { name: "شهر واحد", days: 30,  price: 8000 },
      { name: "سنوي",     days: 365, price: 60000 },
    ],
    about: [
      "حضرة الأمتحانات صارت سهلة 🎓 — حوّل ملفاتك ومصادرك إلى مساعد دراسي ذكي.",
      "تلخيص، أسئلة تفاعلية، وشرح فوري. مثالي للطلاب والباحثين.",
    ],
  },
  {
    id: "duolingo", logo: "duolingo", name: "اشتراك Duolingo Super", cat: "education", brand: "Duolingo",
    glyph: "🦉", color: "#58cc02", featured: false, purchases: 5, delivery: D_EMAIL,
    plans: [
      { name: "شهر واحد", days: 30,  price: 5000 },
      { name: "سنوي",     days: 365, price: 35000 },
    ],
    about: [
      "تعلّم اللغات بدون إعلانات ومع محاولات غير محدودة.",
      "دروس مخصصة وتقدّم أسرع مع ميزات سوبر الحصرية.",
    ],
  },
];

/* ---------- صفوف الصفحة الرئيسية (كما بالصور) ---------- */
window.LEGION.homeRows = [
  { key: "featured", title: "ابرز الاشتراكات", icon: "crown", tint: "#fbbf24", filter: (p) => p.featured },
  { key: "best",     title: "الاكثر مبيعا",    icon: "fire",  tint: "#fb7185", filter: (p) => p.purchases >= 13 },
  { key: "newest",   title: "احدث المنتجات",   icon: "star",  tint: "#34d399", limit: 8 },
  { key: "design",   title: "برامج التصميم",   icon: "pen",   tint: "#fbbf24", filter: (p) => p.cat === "design" },
];

/* ---------- شرائح الهيرو (بشعارات العلامات الحقيقية) ---------- */
window.LEGION.heroSlides = [
  {
    title: "اشتراكات متنوعة",
    subtitle: "جميع الاشتراكات الرقمية في مكان واحد",
    chips: [
      { l: "netflix", c: "#e50914" }, { l: "openai",  c: "#8b5cf6" },
      { l: "youtube", c: "#ff0000" }, { l: "gemini",  c: "#3b82f6" },
      { l: "canva",   c: "#8b3dff" }, { l: "spotify", c: "#1db954" },
      { l: "adobe",   c: "#ed2224" },
    ],
    c1: "#7c3aed", c2: "#a855f7",
  },
  {
    title: "العاب بليستيشن",
    subtitle: "العاب بليستيشن في مكان واحد",
    chips: [
      { l: "playstation", c: "#3b82f6" }, { g: "🏆", c: "#8b5cf6" },
      { l: "xbox",        c: "#107c10" }, { l: "discord", c: "#5865f2" },
      { g: "👾",          c: "#4f46e5" }, { l: "playstation", c: "#6366f1" },
      { g: "🎮",          c: "#2563eb" },
    ],
    c1: "#2563eb", c2: "#7c3aed",
  },
  {
    title: "قوة الذكاء الاصطناعي",
    subtitle: "ChatGPT و Gemini وأكثر بأفضل الأسعار",
    chips: [
      { l: "openai", c: "#8b5cf6" }, { l: "gemini", c: "#3b82f6" },
      { g: "🤖",     c: "#a855f7" }, { l: "google", c: "#4285f4" },
      { g: "⚡",     c: "#f59e0b" }, { l: "openai", c: "#6366f1" },
      { g: "✨",     c: "#c084fc" },
    ],
    c1: "#6d28d9", c2: "#4c1d95",
  },
];

/* ---------- شريط شعارات العلامات (ماركيز) ---------- */
window.LEGION.brandStrip = [
  { l: "netflix", n: "Netflix" }, { l: "openai", n: "OpenAI" }, { l: "gemini", n: "Gemini" },
  { l: "adobe", n: "Adobe" }, { l: "canva", n: "Canva" }, { l: "xbox", n: "Xbox" },
  { l: "playstation", n: "PlayStation" }, { l: "spotify", n: "Spotify" }, { l: "youtube", n: "YouTube" },
  { l: "discord", n: "Discord" }, { l: "capcut", n: "CapCut" }, { l: "microsoftoffice", n: "Office 365" },
  { l: "nordvpn", n: "NordVPN" }, { l: "duolingo", n: "Duolingo" },
];
