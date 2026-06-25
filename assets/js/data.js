/* =================================================================
   LEGION SHOP — Catalog data (digital subscriptions store)
   مبني على تحليل reference/ANALYSIS.md
   ================================================================= */
window.LEGION = window.LEGION || {};

/* الأقسام */
window.LEGION.categories = [
  { key: "ai",        name: "الذكاء الاصطناعي", glyph: "🤖", color: "#a855f7", count: 6 },
  { key: "design",    name: "تصميم وابداع",      glyph: "🎨", color: "#ec4899", count: 8 },
  { key: "cinema",    name: "سينما",             glyph: "🎬", color: "#ef4444", count: 9 },
  { key: "games",     name: "الالعاب",           glyph: "🎮", color: "#22c55e", count: 7 },
  { key: "software",  name: "برامج",             glyph: "💻", color: "#3b82f6", count: 5 },
  { key: "music",     name: "موسيقى وترفيه",     glyph: "🎵", color: "#f472b6", count: 4 },
  { key: "vpn",       name: "VPN",               glyph: "🔒", color: "#8b5cf6", count: 3 },
  { key: "antivirus", name: "انتي فايروس",       glyph: "🛡️", color: "#14b8a6", count: 3 },
  { key: "education", name: "تعليم",             glyph: "🎓", color: "#f59e0b", count: 4 },
];

/* أنواع شارات التسليم */
const D_INSTANT = { type: "instant", label: "تسليم فوري بعد الدفع", icon: "bolt", tone: "teal" };
const D_EMAIL   = { type: "email",   label: "يتطلب بريد إلكتروني",  icon: "mail", tone: "slate" };

/* المنتجات — كل منتج له باقات (مدة → سعر) */
window.LEGION.products = [
  {
    id: "chatgpt", name: "اشتراك ChatGPT الاصلي", cat: "ai", brand: "OpenAI",
    glyph: "❋", color: "#10a37f", featured: true, purchases: 14, delivery: D_EMAIL, rating: 5.0,
    plans: [
      { name: "شهر واحد", days: 30, price: 7000 },
      { name: "3 أشهر", days: 90, price: 15000 },
      { name: "6 أشهر", days: 180, price: 25000 },
      { name: "سنوي", days: 365, price: 45000 },
    ],
    about: [
      "اشترك في ChatGPT وخلِّ أفكارك أسرع، شغلك أذكى، ووقتك أثمن.",
      "مع الاشتراك تحصل على تجربة أقوى تساعدك بالكتابة، الترجمة، الدراسة، التخطيط، تحليل الملفات، توليد الأفكار، وصناعة المحتوى باحترافية وسرعة.",
      "جرّب مستوى جديد من الإنتاجية — اشتراك واحد يختصر عليك ساعات من التفكير والبحث والكتابة.",
    ],
  },
  {
    id: "gemini", name: "اشتراك Gemini الاصلي", cat: "ai", brand: "Google",
    glyph: "✦", color: "#4285f4", featured: true, purchases: 13, delivery: D_EMAIL, rating: 4.9,
    plans: [
      { name: "شهر واحد", days: 30, price: 7000 },
      { name: "3 أشهر", days: 90, price: 15000 },
      { name: "سنوي", days: 365, price: 19999 },
    ],
    about: [
      "اشترك في Gemini واكتشف طريقة أذكى للإنجاز والتعلّم والإبداع.",
      "مع Gemini تكتب أسرع، تولّد أفكاراً جديدة، تترجم المحتوى، تلخّص المعلومات، تخطط لشغلك، وتزيد إنتاجيتك اليومية باستخدام الذكاء الاصطناعي.",
      "اشتراك واحد. إجابات أذكى. إنتاجية أفضل. أفكار أكثر إبداعاً.",
    ],
  },
  {
    id: "adobe", name: "اشتراك Adobe الاصلي", cat: "design", brand: "Adobe",
    glyph: "Ai", color: "#ed2224", featured: true, purchases: 21, delivery: D_INSTANT, rating: 4.9,
    plans: [
      { name: "شهر واحد", days: 30, price: 15000 },
      { name: "6 أشهر", days: 180, price: 55000 },
      { name: "سنة", days: 365, price: 99000 },
    ],
    about: [
      "اشترك في Adobe وابدأ بصناعة تصاميم ومحتوى احترافي بمستوى أعلى.",
      "مع Adobe تقدر تصمم صور، تعدّل فيديوهات، تنشئ شعارات، تحرر ملفات PDF، تعدّل الصور، وتنتج محتوى إبداعي مناسب للسوشيال ميديا، الإعلانات، الأعمال، والمشاريع الشخصية.",
      "اشتراك واحد. أدوات أقوى. تصاميم أفضل. إبداع بلا حدود.",
    ],
  },
  {
    id: "capcut", name: "اشتراك CapCut الاصلي", cat: "design", brand: "CapCut",
    glyph: "✄", color: "#22d3ee", featured: true, purchases: 18, delivery: D_EMAIL, rating: 4.8,
    plans: [
      { name: "شهر واحد", days: 30, price: 10000 },
      { name: "6 أشهر", days: 180, price: 18000 },
      { name: "سنوي", days: 365, price: 25000 },
    ],
    about: [
      "اشترك في CapCut واصنع محتوى احترافي بسهولة وسرعة.",
      "مع CapCut تقدر تعدّل الفيديوهات، تضيف مؤثرات وانتقالات، تستخدم قوالب جاهزة، تحسّن جودة المقاطع، تضيف نصوص وموسيقى، وتطلع فيديوهات جذابة للسوشيال ميديا خلال دقائق.",
      "اشتراك واحد. مونتاج أسهل. فيديوهات أجمل. محتوى أكثر احترافية.",
    ],
  },
  {
    id: "canva", name: "اشتراك Canva برو", cat: "design", brand: "Canva",
    glyph: "C", color: "#7d2ae8", featured: false, purchases: 9, delivery: D_INSTANT, rating: 4.8,
    plans: [
      { name: "شهر واحد", days: 30, price: 3000 },
      { name: "6 أشهر", days: 180, price: 5000 },
      { name: "سنة", days: 365, price: 7000 },
    ],
    about: [
      "بعد الشراء سيتم المباشرة في اتمام طلبك خلال ساعة او أقل.",
      "75 مليون صورة مخزنة ومقاطع فيديو وتصاميم وقوالب جرافيك مميزة متاحة للاستخدام.",
      "جدولة المحتوى لوسائل التواصل (انستغرام، فيسبوك، تويتر، بنترست، لينكد ان).",
      "أكثر من 420 ألف قالب مجاني مع تصاميم جديدة يومياً، إزالة الخلفية، أكثر من 3,000 خط مميز، وتخزين سحابي 100 جيجابايت.",
      "😎 اشتراك رسمي 100% — وستصلك رسالة بالإيميل من الشركة نفسها لتفعيل الاشتراك.",
    ],
  },
  {
    id: "netflix", name: "اشتراك Netflix الاصلي", cat: "cinema", brand: "Netflix",
    glyph: "N", color: "#e50914", featured: true, purchases: 27, delivery: D_EMAIL, rating: 4.9,
    plans: [
      { name: "شهر واحد", days: 30, price: 4000 },
      { name: "6 أشهر", days: 180, price: 14999 },
      { name: "سنة", days: 365, price: 24999 },
    ],
    about: [
      "اشترك في Netflix واستمتع بعالم من الترفيه بأي وقت ومن أي مكان.",
      "مع Netflix تقدر تشاهد أفلام، مسلسلات، وثائقيات، أنمي، وعروض حصرية بجودة عالية وعلى أجهزتك المفضلة.",
      "اشتراك واحد. ترفيه بلا حدود. أفلام، مسلسلات، وأكثر.",
    ],
  },
  {
    id: "office365", name: "اشتراك Office 365", cat: "software", brand: "Microsoft",
    glyph: "▦", color: "#ea580c", featured: false, purchases: 11, delivery: D_INSTANT, rating: 4.8,
    plans: [
      { name: "سنوي (حساب خاص)", days: 365, price: 25000 },
    ],
    about: [
      "دخول على 5 أجهزة مختلفة بنفس الوقت.",
      "سعة تخزين 1 تيرا (ألف جيجا) على OneDrive ☁️.",
      "💻📱 يدعم جميع الأجهزة: Windows - Mac - Android - iPhone.",
      "يدعم اللغة العربية والإنجليزية وجميع اللغات الأخرى.",
      "المنتج عبارة عن حساب جاهز مفعّل فيه الاشتراك (اسم مستخدم وكلمة مرور) ويمكن للعميل تغيير كلمة المرور.",
      "سيتم طلب تعيين كلمة مرور خاصة بك عند أول تسجيل دخول في الموقع الرسمي: www.office.com",
    ],
  },
  {
    id: "xboxgamepass", name: "اشتراك Xbox Game Pass Ultimate", cat: "games", brand: "Microsoft",
    glyph: "✕", color: "#107c10", featured: true, purchases: 15, delivery: D_INSTANT, rating: 4.9,
    plans: [
      { name: "شهرين (مشترك)", days: 60, price: 100 },
      { name: "شهرين ونص (مشترك)", days: 75, price: 16000 },
      { name: "شهرين (خاص)", days: 60, price: 22000 },
      { name: "شهرين ونص (خاص)", days: 75, price: 28000 },
    ],
    about: [
      "🎮 اشتراك إكس بوكس كيم باس ألتيميت (Xbox Game Pass Ultimate).",
      "استمتع بمكتبة ضخمة من الألعاب وعيش التجربة لأقصى حد! نوفّر لك الاشتراك بنوعين حق تختار اللي يناسب ميزانيتك واحتياجاتك:",
      "◆ النوع الأول — الحساب المشترك: خيار اقتصادي ومضمون بدون ما يتأثر لعبك، يشتغل على أجهزة PC والإكس بوكس.",
      "👑 النوع الثاني — الحساب الخاص (VIP): حساب خاص بيك لوحدك، تحكم مطلق وتقدر تغيّر معلومات الحساب.",
      "🚀 المميزات: وصول لأكثر من 400 لعبة، ألعاب اليوم الأول (Day One)، اشتراك EA Play مجاني، اللعب أونلاين، وخصومات تصل إلى 20% على الألعاب.",
      "الأمان: آمن 100% ومضمون، وسيتم إرفاق جميع تعليمات التفعيل فور إتمام الطلب.",
    ],
  },
  {
    id: "discordnitro", name: "اشتراك Discord Nitro", cat: "games", brand: "Discord",
    glyph: "🎮", color: "#5865f2", featured: false, purchases: 8, delivery: D_INSTANT, rating: 4.7,
    plans: [
      { name: "شهر واحد", days: 30, price: 12000 },
      { name: "سنوي", days: 365, price: 110000 },
    ],
    about: [
      "اشترك في Discord Nitro على حسابك الشخصي واحصل على مزايا حصرية.",
      "رفع ملفات أكبر، إيموجي وملصقات مخصصة في كل السيرفرات، بث بجودة عالية، وبروفايل مميز.",
      "التفعيل يتم مباشرة على حسابك الشخصي بأمان تام.",
    ],
  },
  {
    id: "cimax", name: "اشتراك cimax", cat: "cinema", brand: "CimaX",
    glyph: "✕", color: "#2563eb", featured: false, purchases: 32, delivery: D_INSTANT, rating: 4.6,
    plans: [
      { name: "شهر واحد", days: 30, price: 1000 },
      { name: "سنوي", days: 365, price: 9000 },
    ],
    about: [
      "اشترك في cimax وشاهد أحدث الأفلام والمسلسلات العربية والأجنبية بجودة عالية.",
      "مكتبة ضخمة محدّثة باستمرار، بدون إعلانات مزعجة، وعلى جميع الأجهزة.",
    ],
  },
  {
    id: "cimax-premium", name: "اشتراك سيماكس بريميوم", cat: "cinema", brand: "CimaX",
    glyph: "✕", color: "#1d4ed8", featured: false, purchases: 19, delivery: D_INSTANT, rating: 4.7,
    plans: [
      { name: "تجريبي", days: 7, price: 1 },
      { name: "شهر واحد", days: 30, price: 3000 },
    ],
    about: [
      "النسخة البريميوم من سيماكس — جودة 4K، مشاهدة على أكثر من جهاز، وتحميل للمشاهدة لاحقاً.",
      "أحدث الإصدارات أولاً بأول مع تجربة مشاهدة خالية من الإعلانات.",
    ],
  },
  {
    id: "spotify", name: "اشتراك Spotify Premium", cat: "music", brand: "Spotify",
    glyph: "♫", color: "#1db954", featured: true, purchases: 17, delivery: D_EMAIL, rating: 4.8,
    plans: [
      { name: "شهر واحد", days: 30, price: 5000 },
      { name: "3 أشهر", days: 90, price: 12000 },
      { name: "سنوي", days: 365, price: 40000 },
    ],
    about: [
      "استمع لملايين الأغاني والبودكاست بدون إعلانات ومع جودة صوت عالية.",
      "تحميل الموسيقى للاستماع بدون إنترنت، وتشغيل أي أغنية في أي وقت.",
    ],
  },
  {
    id: "youtube-premium", name: "اشتراك YouTube Premium", cat: "music", brand: "YouTube",
    glyph: "▶", color: "#ff0000", featured: false, purchases: 14, delivery: D_EMAIL, rating: 4.7,
    plans: [
      { name: "شهر واحد", days: 30, price: 6000 },
      { name: "سنوي", days: 365, price: 50000 },
    ],
    about: [
      "شاهد يوتيوب بدون إعلانات، مع التشغيل في الخلفية ويوتيوب ميوزك.",
      "حمّل الفيديوهات وشاهدها بدون إنترنت في أي وقت.",
    ],
  },
  {
    id: "nordvpn", name: "اشتراك NordVPN", cat: "vpn", brand: "Nord",
    glyph: "🔒", color: "#4687ff", featured: true, purchases: 10, delivery: D_INSTANT, rating: 4.8,
    plans: [
      { name: "شهر واحد", days: 30, price: 6000 },
      { name: "سنوي", days: 365, price: 45000 },
    ],
    about: [
      "احمِ خصوصيتك وتصفّح بأمان مع NordVPN — تشفير قوي وسرعات عالية.",
      "تجاوز الحجب، وادخل المحتوى من أي دولة، على جميع أجهزتك.",
    ],
  },
  {
    id: "eset", name: "اشتراك ESET Antivirus", cat: "antivirus", brand: "ESET",
    glyph: "🛡️", color: "#0aa1dd", featured: false, purchases: 7, delivery: D_INSTANT, rating: 4.7,
    plans: [
      { name: "سنوي — جهاز", days: 365, price: 12000 },
      { name: "سنوي — 3 أجهزة", days: 365, price: 25000 },
    ],
    about: [
      "حماية شاملة من الفيروسات والبرمجيات الخبيثة وهجمات التصيّد.",
      "أداء خفيف لا يبطئ جهازك، مع حماية للتصفّح والمعاملات البنكية.",
    ],
  },
  {
    id: "notebooklm", name: "اشتراك NotebookLM", cat: "education", brand: "Google",
    glyph: "📓", color: "#f59e0b", featured: false, purchases: 6, delivery: D_EMAIL, rating: 4.6,
    plans: [
      { name: "شهر واحد", days: 30, price: 8000 },
      { name: "سنوي", days: 365, price: 60000 },
    ],
    about: [
      "حوّل ملفاتك ومصادرك إلى مساعد دراسي ذكي — تلخيص، أسئلة، وشرح فوري.",
      "مثالي للطلاب والباحثين: حضّر للامتحانات بسهولة وفهم أعمق.",
    ],
  },
];

/* أقسام الصفحة الرئيسية (مجموعات عرض) */
window.LEGION.homeSections = [
  { key: "featured", title: "ابرز الاشتراكات", icon: "crown", filter: (p) => p.featured },
  { key: "best", title: "الأكثر مبيعاً", icon: "fire", filter: (p) => p.purchases >= 14 },
  { key: "newest", title: "احدث المنتجات", icon: "star", filter: () => true, limit: 8 },
  { key: "design", title: "برامج التصميم", icon: "palette", filter: (p) => p.cat === "design" },
];

/* شرائح الهيرو */
window.LEGION.heroSlides = [
  { title: "اشتراكات متنوعة", subtitle: "جميع الاشتراكات الرقمية في مكان واحد",
    glyphs: ["❋", "N", "▶", "✦", "C", "♫"], color1: "#a855f7", color2: "#6d28d9" },
  { title: "العاب بليستيشن", subtitle: "العاب بليستيشن في مكان واحد",
    glyphs: ["🎮", "🏆", "🎯", "⚔️", "👾", "🕹️"], color1: "#3b82f6", color2: "#7c3aed" },
  { title: "أقوى أدوات الذكاء الاصطناعي", subtitle: "ChatGPT و Gemini وأكثر بأفضل الأسعار",
    glyphs: ["❋", "✦", "🤖", "🧠", "⚡", "✨"], color1: "#10a37f", color2: "#4285f4" },
];
