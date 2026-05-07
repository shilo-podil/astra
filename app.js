// Astra AI - Frontend Logic
const STORAGE_KEYS = {
  apiKey: 'astra_api_key',
  userName: 'astra_user_name',
  theme: 'astra_theme',
  conversations: 'astra_conversations',
  activeId: 'astra_active_id',
  category: 'astra_category',
  lang: 'astra_lang',
  visited: 'astra_visited',
};

const LANGUAGES = [
  { code: 'he', name: 'עברית', text: 'מאת אלון דה בר' },
  { code: 'en', name: 'English', text: 'by Alon Debeer' },
  { code: 'es', name: 'Español', text: 'por Alon Debeer' },
  { code: 'ar', name: 'العربية', text: 'بقلم آلون دي بير' },
  { code: 'ru', name: 'Русский', text: 'Алон Де Бер' },
  { code: 'fr', name: 'Français', text: 'par Alon Debeer' },
  { code: 'de', name: 'Deutsch', text: 'von Alon Debeer' },
  { code: 'zh-CN', name: '简体中文', text: '作者：阿隆·德比尔' },
  { code: 'zh-TW', name: '繁體中文', text: '作者：阿隆·德比爾' },
  { code: 'ja', name: '日本語', text: 'アロン・デ・ビアによる' },
  { code: 'ko', name: '한국어', text: '알론 디비어 작' },
  { code: 'it', name: 'Italiano', text: 'di Alon Debeer' },
  { code: 'pt', name: 'Português', text: 'por Alon Debeer' },
  { code: 'nl', name: 'Nederlands', text: 'door Alon Debeer' },
  { code: 'tr', name: 'Türkçe', text: 'Alon Debeer tarafından' },
  { code: 'pl', name: 'Polski', text: 'autor: Alon Debeer' },
  { code: 'sv', name: 'Svenska', text: 'av Alon Debeer' },
  { code: 'el', name: 'Ελληνικά', text: 'από τον Alon Debeer' },
  { code: 'hi', name: 'हिन्दी', text: 'एलन डेबीयर द्वारा' },
  { code: 'th', name: 'ไทย', text: 'โดย Alon Debeer' },
  { code: 'vi', name: 'Tiếng Việt', text: 'bởi Alon Debeer' },
  { code: 'id', name: 'Indonesia', text: 'oleh Alon Debeer' },
  { code: 'cs', name: 'Čeština', text: 'od Alona Debeera' },
  { code: 'ro', name: 'Română', text: 'de Alon Debeer' },
  { code: 'hu', name: 'Magyar', text: 'Alon Debeer által' },
  { code: 'uk', name: 'Українська', text: 'Алон Де Бер' },
  { code: 'bg', name: 'Български', text: 'от Alon Debeer' },
  { code: 'da', name: 'Dansk', text: 'af Alon Debeer' },
  { code: 'fi', name: 'Suomi', text: 'kirjoittanut Alon Debeer' },
  { code: 'no', name: 'Norsk', text: 'av Alon Debeer' },
  { code: 'sk', name: 'Slovenčina', text: 'od Alona Debeera' },
  { code: 'hr', name: 'Hrvatski', text: 'Alon Debeer' },
  { code: 'sr', name: 'Српски', text: 'Алон Дебер' },
  { code: 'lt', name: 'Lietuvių', text: 'Alon Debeer' },
  { code: 'lv', name: 'Latviešu', text: 'Alon Debeer' },
  { code: 'et', name: 'Eesti', text: 'Alon Debeer' },
  { code: 'sl', name: 'Slovenščina', text: 'Alon Debeer' },
  { code: 'tl', name: 'Tagalog', text: 'ni Alon Debeer' },
  { code: 'bn', name: 'বাংলা', text: 'এলন ডেবিয়ার দ্বারা' },
  { code: 'ur', name: 'اردو', text: 'از طرف ایلون ڈیبیر' },
  { code: 'fa', name: 'فارسی', text: 'توسط آلون دی بیر' },
  { code: 'ms', name: 'Melayu', text: 'oleh Alon Debeer' },
  { code: 'ta', name: 'தமிழ்', text: 'அலன் டெபீர் மூலம்' },
  { code: 'te', name: 'తెలుగు', text: 'అలాన్ డెబీర్ చే' },
  { code: 'mr', name: 'मराठी', text: 'अॅलन डेबियर द्वारे' },
  { code: 'gu', name: 'ગુજરાતી', text: 'એલન ડેબીયર દ્વારા' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', text: 'ਏਲਨ ਡੇਬੀਅਰ ਦੁਆਰਾ' },
  { code: 'mn', name: 'Монгол', text: 'Алон Дебеер' },
  { code: 'mk', name: 'Македонски', text: 'од Алон Дебер' },
  { code: 'sq', name: 'Shqip', text: 'nga Alon Debeer' },
  { code: 'ka', name: 'ქართული', text: 'ალონ დიბერი' },
];

const LANG_INSTRUCTION = ' חשוב: זהה אוטומטית את השפה שבה המשתמש כותב וענה תמיד באותה שפה (עברית, אנגלית, ערבית, רוסית, ספרדית, צרפתית או כל שפה אחרת בעולם). אל תכריז על השפה - פשוט ענה בה.';

const CAPABILITY_NOTE = ' אם המשתמש מבקש "תמונה", "צייר", "תיצור תמונה" או דומה - הוא כבר ייקבל תמונה אוטומטית, לא תצטרך לטפל בזה. אם תקבל בקשה כזו במלל - תאשר בקצרה שיצרת.';

const CATEGORIES = {
  general: {
    name: 'כללי',
    system: 'אתה Astra AI - עוזר חכם, ידידותי, חם וקליל. ענה בקצרה ולעניין אלא אם מבקשים פירוט. אל תזכיר אף פעם שאתה GPT, OpenAI, Anthropic או כל מותג אחר - אתה Astra AI.' + LANG_INSTRUCTION + CAPABILITY_NOTE,
    prompts: [
      { emoji: '🎨', text: 'צייר לי חתול אסטרונאוט במשקפיים' },
      { emoji: '🧠', text: 'תן לי חידון על תורת היחסות' },
      { emoji: '💡', text: 'תן לי טיפ מפתיע לחיים שלא ידעתי' },
      { emoji: '🌍', text: 'תרגם "שלום עולם" ל-10 שפות' },
    ],
  },
  code: {
    name: 'קוד ופיתוח',
    system: 'אתה Astra AI במצב מפתח מומחה. ענה עם דוגמאות קוד נקיות. השתמש ב-code blocks (```) בכל פעם שאתה מציג קוד. הסבר את הקוד בקצרה. אל תזכיר שום מותג AI אחר - אתה Astra AI.' + LANG_INSTRUCTION,
    prompts: [
      { emoji: '💻', text: 'כתוב פונקציית מיון מהירה ב-Python' },
      { emoji: '🐛', text: 'איך מאתרים זליגת זיכרון ב-JavaScript?' },
      { emoji: '⚛️', text: 'הסבר לי React Hooks עם דוגמה' },
      { emoji: '🚀', text: 'מה ההבדל בין SQL ל-NoSQL?' },
    ],
  },
  writing: {
    name: 'כתיבה',
    system: 'אתה Astra AI במצב כתיבה מקצועית. עזור לנסח טקסטים ברורים ומשכנעים. שמור על טון מתאים להקשר. אתה Astra AI - לא תזכיר שום מותג אחר.' + LANG_INSTRUCTION,
    prompts: [
      { emoji: '✍️', text: 'נסח מייל מקצועי לבקשת העלאה' },
      { emoji: '📝', text: 'כתוב הקדמה לעבודה אקדמית על AI' },
      { emoji: '📣', text: 'נסח פוסט לינקדאין על קידום' },
      { emoji: '💌', text: 'כתוב הודעת תודה למרצה' },
    ],
  },
  learning: {
    name: 'לימוד והבנה',
    system: 'אתה Astra AI במצב מורה. הסבר נושאים מורכבים בצורה פשוטה, עם דוגמאות מהחיים. שאל שאלות שמעוררות חשיבה. אתה Astra AI - לא תזכיר שום מותג אחר.' + LANG_INSTRUCTION,
    prompts: [
      { emoji: '🎓', text: 'הסבר לי איך עובד מנוע חיפוש' },
      { emoji: '🧬', text: 'מה זה DNA בקצרה?' },
      { emoji: '📚', text: '5 דרכים לזכור חומר טוב יותר' },
      { emoji: '🌌', text: 'הסבר חור שחור לילד בן 10' },
    ],
  },
  life: {
    name: 'חיים ויומיום',
    system: 'אתה Astra AI במצב יועץ אישי. ענה בטון חם, אמפתי ומעשי. תן עצות ברות ביצוע. אתה Astra AI.' + LANG_INSTRUCTION,
    prompts: [
      { emoji: '🌱', text: 'איך יוצרים הרגלים שמחזיקים מעמד?' },
      { emoji: '🍳', text: 'מתכון מהיר לארוחת ערב בריאה' },
      { emoji: '😴', text: 'איך לישון טוב יותר בלילה?' },
      { emoji: '💪', text: 'אימון בית 15 דקות בלי ציוד' },
    ],
  },
  business: {
    name: 'עסקים ופרודקטיביות',
    system: 'אתה Astra AI במצב יועץ עסקי. תן עצות מעשיות ונקודות מבט אסטרטגיות. אתה Astra AI.' + LANG_INSTRUCTION,
    prompts: [
      { emoji: '💼', text: '5 רעיונות לסטארטאפ בתחום החינוך' },
      { emoji: '📈', text: 'איך מתחילים לשווק עסק קטן?' },
      { emoji: '⏰', text: 'שיטות לניהול זמן יעיל' },
      { emoji: '💰', text: 'איך לבנות תקציב חודשי חכם?' },
    ],
  },
  creative: {
    name: 'יצירה ורעיונות',
    system: 'אתה Astra AI במצב יצירתי. ספק רעיונות מקוריים ומפתיעים. אל תפחד להיות נועז. אתה Astra AI.' + LANG_INSTRUCTION,
    prompts: [
      { emoji: '🎨', text: 'צייר נוף עתידני עם רכבות מעופפות' },
      { emoji: '🎵', text: 'הצע שמות לאלבום מוזיקה' },
      { emoji: '🎬', text: 'רעיון לסרט קצר ב-3 דקות' },
      { emoji: '🦄', text: 'משהו מטורף ומקורי לעשות היום' },
    ],
  },
  analysis: {
    name: 'ניתוח ומחקר',
    system: 'אתה Astra AI במצב אנליסט. נתח לעומק, פרק לרכיבים, השווה אפשרויות. אתה Astra AI.' + LANG_INSTRUCTION,
    prompts: [
      { emoji: '📊', text: 'נתח יתרונות וחסרונות של עבודה מהבית' },
      { emoji: '🔍', text: 'השווה בין React לבין Vue' },
      { emoji: '⚖️', text: 'יתרונות וחסרונות של רכב חשמלי' },
      { emoji: '🧩', text: 'נתח את הסיכונים של AI לחברה' },
    ],
  },
};

const QUICK_REPLIES = [
  {
    patterns: [/^\s*(שלום|היי+|הי+|אהלן|הלו|hello|hi|hey|привет|hola|bonjour|مرحبا)\s*[!?.\s]*$/i],
    replies: [
      'היי! 😊 איך אפשר לעזור היום?',
      'שלום! במה תרצה שאעזור?',
      'אהלן! מה תרצה לדעת?',
      'הי! מה קורה? 👋',
    ],
  },
  {
    patterns: [/(מה נשמע|מה שלומך|מה קורה|מה המצב|מה איתך|how are you)/i],
    replies: [
      'הכל בסדר! 😊 על מה תרצה לעבוד היום?',
      'מצוין, תודה ששאלת. במה אעזור?',
      'הולך טוב! מה תרצה לעשות?',
      'אני מוכן לעבודה! מה התוכנית?',
    ],
  },
  {
    patterns: [/(מי אתה|מה השם שלך|איך קוראים לך|מה אתה|תציג את עצמך|ספר על עצמך|who are you|what are you)/i],
    replies: [
      'אני **Astra AI** ✨\n\nאני יודע לעשות הרבה דברים:\n🎨 ליצור תמונות (פשוט תכתוב "צייר לי...")\n🧠 לעשות חידונים\n💻 לכתוב ולהסביר קוד\n✍️ לכתוב טקסטים ומיילים\n🎓 ללמד נושאים מורכבים\n🌍 לתרגם בין כל השפות\n📊 לנתח, להשוות, לסכם\n\nשאל אותי כל דבר!',
    ],
  },
  {
    patterns: [/^\s*(תודה|תודה רבה|תנקיו|thanks|thank you|תודה לך|שכויאח|gracias|merci|спасибо)\s*[!?.\s]*$/i],
    replies: ['בכיף! 😊 יש עוד משהו?', 'אין בעד מה :)', 'שמחתי לעזור! משהו נוסף?'],
  },
  {
    patterns: [/^\s*(ביי|להתראות|נתראה|לילה טוב|bye|goodbye|adios)\s*[!?.\s]*$/i],
    replies: ['להתראות! חזור מתי שתרצה ✨', 'ביי! היה כיף לעזור 👋'],
  },
  {
    patterns: [/(בוקר טוב|good morning)/i],
    replies: ['בוקר אור! ☀️ איך אפשר לעזור?', 'בוקר טוב! מה התוכניות להיום?'],
  },
  {
    patterns: [/(ערב טוב|good evening)/i],
    replies: ['ערב טוב! 🌙 במה אעזור?'],
  },
  {
    patterns: [/(מה אתה יודע לעשות|מה אתה יכול|מה היכולות שלך|איך אתה יכול לעזור|^\s*עזרה\s*$|what can you do)/i],
    replies: [
      'אני יודע לעשות המון:\n\n🎨 **תמונות** - "צייר לי חתול במשקפיים"\n🧠 **חידונים** - "תן לי חידון על מתמטיקה"\n💻 **קוד** - לכתוב, להסביר, לתקן\n✍️ **כתיבה** - מיילים, מאמרים, פוסטים\n🎓 **לימוד** - הסברים על כל נושא\n🌍 **תרגום** - בין כל השפות בעולם\n📊 **ניתוח והשוואה**\n🌱 **טיפים לחיים**\n\nפשוט תכתוב מה שאתה רוצה!',
    ],
  },
];

function tryQuickReply(text) {
  const t = text.trim();
  for (const rule of QUICK_REPLIES) {
    if (rule.patterns.some(p => p.test(t))) {
      return rule.replies[Math.floor(Math.random() * rule.replies.length)];
    }
  }
  if (/(מה השעה|איזה שעה|השעה עכשיו|what time)/i.test(t)) {
    return `השעה כעת **${new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}** 🕐`;
  }
  if (/(מה התאריך|איזה תאריך|איזה יום היום|^\s*מה היום|what.*date|what day)/i.test(t)) {
    return `היום ${new Date().toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} 📅`;
  }
  const m = t.match(/^\s*(-?\d+(?:\.\d+)?)\s*([+\-*\/x×÷])\s*(-?\d+(?:\.\d+)?)\s*=?\s*[?!.]*$/);
  if (m) {
    const a = parseFloat(m[1]), b = parseFloat(m[3]);
    let op = m[2].replace(/[x×]/, '*').replace('÷', '/');
    let r = null;
    if (op === '+') r = a + b;
    else if (op === '-') r = a - b;
    else if (op === '*') r = a * b;
    else if (op === '/') r = b === 0 ? null : a / b;
    if (r !== null) return `${a} ${op} ${b} = **${Number.isInteger(r) ? r : r.toFixed(4).replace(/\.?0+$/, '')}** ✨`;
  }
  return null;
}

// Intent detection: image generation
const IMAGE_TRIGGERS = [
  /^\s*(?:צייר לי|תצייר לי|צייר|תצייר|תיצור לי תמונה של|תיצור תמונה של|תיצור לי תמונה|תיצור תמונה|תייצר לי תמונה של|תייצר תמונה של|תייצר לי תמונה|תייצר תמונה|ייצר תמונה|תכין תמונה|תפיק תמונה|תרנדר|תמונה של|תן לי תמונה של|תן לי תמונה|הראה לי תמונה של|הראה לי תמונה|אני רוצה תמונה של|אני רוצה תמונה|generate an? image of|generate an? image|create an? image of|create an? image|make an? image of|make an? image|draw an? image of|draw|picture of|imagine|render)\s*[:\-,]?\s*(.+)/i,
];

function detectImageRequest(text) {
  for (const re of IMAGE_TRIGGERS) {
    const m = text.match(re);
    if (m && m[1] && m[1].trim().length > 0) return m[1].trim();
  }
  return null;
}

const KNOW_TRIGGERS = [
  /^\s*(?:אתה יודע מה זה|אתה יודע מי זה|אתה יודע מי|אתה מכיר את|תכיר לי את|תראה לי איך נראה|תראה לי תמונה של|מה זה |מי זה |איך נראה |do you know what (?:is |a |an )?|show me what .* looks like|what does .* look like|what is a? )\s*(.+)/i,
];

function detectKnowRequest(text) {
  for (const re of KNOW_TRIGGERS) {
    const m = text.match(re);
    if (m && m[1] && m[1].trim().length > 1) {
      return m[1].trim().replace(/[?!.]+$/, '').trim();
    }
  }
  return null;
}

const QUALITY_SUFFIX = ', raw unedited photograph, real photo, candid documentary photography, hyperrealistic, photorealistic, taken with iphone 15 pro, natural lighting, real life, authentic, lifelike, depth of field, bokeh, 8k, professional, not AI, real photograph';
const VIDEO_QUALITY = ', cinematic film still, real footage, photorealistic, professional cinematography, natural lighting, depth of field, 8k, hyperrealistic, real life';

// Translate Hebrew/Arabic/Russian to English silently for better photo search
async function translateToEnglish(text) {
  if (!/[֐-׿؀-ۿЀ-ӿ]/.test(text)) return text;
  try {
    const r = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`);
    if (!r.ok) return text;
    const d = await r.json();
    return d[0].map(x => x[0]).join(' ');
  } catch { return text; }
}

// Auto-retry image loading - never shows an error to the user
function buildImageUrl(prompt, opts = {}) {
  const { width = 1024, height = 1024, seed = Math.floor(Math.random() * 1e6), model = 'flux-realism', suffix = QUALITY_SUFFIX } = opts;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + (suffix || ''))}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=${model}&enhance=true`;
}

// Real photos via Loremflickr (real Flickr photos, no AI)
function buildRealPhotoUrl(query, opts = {}) {
  const { width = 1024, height = 1024, seed = Math.floor(Math.random() * 1e6) } = opts;
  const tags = query.toLowerCase().split(/[\s,]+/).filter(w => /^[a-z]+$/.test(w)).slice(0, 4).join(',');
  if (!tags) return buildImageUrl(query, opts);
  return `https://loremflickr.com/${width}/${height}/${encodeURIComponent(tags)}?lock=${seed}`;
}

function attachAutoRetry(imgEl, prompt, opts = {}) {
  const maxRetries = opts.maxRetries || 12;
  const width = opts.width || 1024;
  const height = opts.height || 1024;
  const suffix = opts.suffix !== undefined ? opts.suffix : QUALITY_SUFFIX;
  // Strategy: real photos first, AI photorealism as fallback
  const strategies = ['flickr', 'flickr', 'flickr', 'ai-realism', 'ai-realism', 'ai-flux', 'ai-turbo', 'flickr', 'ai-realism', 'ai-flux', 'ai-turbo', 'ai-realism'];
  let retries = 0;
  const onError = () => {
    if (retries >= maxRetries) {
      setTimeout(onError, 5000);
      retries = 0;
      return;
    }
    retries++;
    const newSeed = Math.floor(Math.random() * 1e6);
    const strategy = strategies[retries % strategies.length];
    let url;
    if (strategy === 'flickr') {
      url = buildRealPhotoUrl(prompt, { width, height, seed: newSeed });
    } else {
      const model = strategy === 'ai-flux' ? 'flux' : strategy === 'ai-turbo' ? 'turbo' : 'flux-realism';
      url = buildImageUrl(prompt, { width, height, seed: newSeed, model, suffix });
    }
    setTimeout(() => { imgEl.src = url; }, 400);
  };
  imgEl.addEventListener('error', onError);
}

const VIDEO_TRIGGERS = [
  /^\s*(?:תיצור לי סרטון של|תיצור סרטון של|תיצור לי סרטון|תיצור סרטון|תייצר לי סרטון של|תייצר סרטון של|תייצר לי סרטון|תייצר סרטון|ייצר סרטון|תכין סרטון|תפיק סרטון|סרטון של|תן לי סרטון של|תן לי סרטון|הראה לי סרטון של|הראה לי סרטון|אני רוצה סרטון של|אני רוצה סרטון|generate a video of|generate a video|create a video of|create a video|make a video of|make a video|video of)\s*[:\-,]?\s*(.+)/i,
];

function detectVideoRequest(text) {
  for (const re of VIDEO_TRIGGERS) {
    const m = text.match(re);
    if (m && m[1] && m[1].trim().length > 0) return m[1].trim();
  }
  return null;
}

const QUIZ_TRIGGERS = [
  /^\s*(תן לי חידון|עשה לי חידון|תעשה חידון|חידון על|חידון של|תכין לי חידון|quiz me about|make a quiz about|create a quiz on)\s+(.+)/i,
  /^\s*(תן לי חידון|עשה לי חידון|חידון|quiz|make a quiz)\s*[!?.]*\s*$/i,
];

function detectQuizRequest(text) {
  for (const re of QUIZ_TRIGGERS) {
    const m = text.match(re);
    if (m) return (m[2] || '').trim() || null;
  }
  return null;
}

const state = {
  apiKey: localStorage.getItem(STORAGE_KEYS.apiKey) || '',
  userName: localStorage.getItem(STORAGE_KEYS.userName) || 'אתה',
  theme: localStorage.getItem(STORAGE_KEYS.theme) || 'dark',
  category: localStorage.getItem(STORAGE_KEYS.category) || 'general',
  lang: localStorage.getItem(STORAGE_KEYS.lang) || 'he',
  conversations: JSON.parse(localStorage.getItem(STORAGE_KEYS.conversations) || '[]'),
  activeId: localStorage.getItem(STORAGE_KEYS.activeId) || null,
  loading: false,
};

function getAuthorText(code) {
  const lang = LANGUAGES.find(l => l.code === code) || LANGUAGES[0];
  return lang.text;
}

function showSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  const sub = document.getElementById('splashSub');
  if (sub) sub.textContent = getAuthorText(state.lang);
  splash.classList.add('visible');
  setTimeout(() => splash.classList.add('fading'), 1800);
  setTimeout(() => { splash.style.display = 'none'; }, 3200);
}

function populateLangSelect() {
  const sel = document.getElementById('langSelect');
  if (!sel || sel.options.length) return;
  LANGUAGES.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l.code;
    opt.textContent = l.name;
    sel.appendChild(opt);
  });
  sel.value = state.lang;
}

function showTutorialIfFirstVisit() {
  if (localStorage.getItem(STORAGE_KEYS.visited)) return;
  setTimeout(() => {
    const overlay = document.createElement('div');
    overlay.className = 'tutorial';
    overlay.innerHTML = `
      <div class="tutorial-card">
        <div class="tut-emoji">✨</div>
        <h2>ברוך הבא ל-Astra AI</h2>
        <p>אני יכול:</p>
        <ul class="tut-list">
          <li>🎨 <b>ליצור תמונות</b> אמיתיות - "תיצור תמונה של כדורגל"</li>
          <li>🎬 <b>ליצור סרטונים</b> - "תיצור סרטון של גלים"</li>
          <li>🔍 <b>להראות לך מה זה X</b> - "אתה יודע מה זה quasar?"</li>
          <li>🧠 <b>חידונים</b> - "תן לי חידון על מתמטיקה"</li>
          <li>💻 <b>קוד, תרגום, כתיבה</b> ועוד הרבה</li>
          <li>🎤 <b>הקלטה קולית</b> - לחץ על המיקרופון</li>
          <li>🖱️ <b>קליק ימני על שיחה</b> - מחיקה / עריכה / המשך</li>
          <li>📱 <b>התקנה כאפליקציה</b> - כפתור למטה משמאל</li>
        </ul>
        <button class="btn-primary tut-close">בוא נתחיל</button>
      </div>
    `;
    overlay.querySelector('.tut-close').addEventListener('click', () => {
      overlay.remove();
      localStorage.setItem(STORAGE_KEYS.visited, '1');
    });
    document.body.appendChild(overlay);
  }, 3300);
}

const $ = (id) => document.getElementById(id);
const els = {
  app: document.querySelector('.app'),
  sidebar: $('sidebar'),
  menuBtn: $('menuBtn'),
  closeSidebarBtn: $('closeSidebarBtn'),
  newChatMain: $('newChatMain'),
  categories: $('categories'),
  history: $('history'),
  settingsBtn: $('settingsBtn'),
  settingsModal: $('settingsModal'),
  apiKeyInput: $('apiKeyInput'),
  userNameInput: $('userNameInput'),
  themeSelect: $('themeSelect'),
  saveSettings: $('saveSettings'),
  topbarTitle: $('topbarTitle'),
  chat: $('chat'),
  welcome: $('welcome'),
  suggestions: $('suggestions'),
  messages: $('messages'),
  input: $('input'),
  sendBtn: $('sendBtn'),
  toast: $('toast'),
};

function applyTheme() { document.documentElement.setAttribute('data-theme', state.theme); }

function showToast(msg, isError = false) {
  els.toast.textContent = msg;
  els.toast.classList.toggle('error', isError);
  els.toast.classList.add('show');
  setTimeout(() => els.toast.classList.remove('show'), 3000);
}

function persist() {
  localStorage.setItem(STORAGE_KEYS.conversations, JSON.stringify(state.conversations));
  if (state.activeId) localStorage.setItem(STORAGE_KEYS.activeId, state.activeId);
  localStorage.setItem(STORAGE_KEYS.category, state.category);
}

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

function getActive() { return state.conversations.find(c => c.id === state.activeId); }

function renderCategories() {
  els.categories.querySelectorAll('.category').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === state.category);
  });
}

function renderSuggestions() {
  const cat = CATEGORIES[state.category];
  els.suggestions.innerHTML = '';
  cat.prompts.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'suggestion';
    btn.innerHTML = `<span class="sug-emoji">${p.emoji}</span><span>${escapeHtml(p.text)}</span>`;
    btn.addEventListener('click', () => {
      els.input.value = p.text;
      els.input.focus();
      autoResize();
      updateSendButton();
    });
    els.suggestions.appendChild(btn);
  });
  els.topbarTitle.textContent = `Astra AI · ${cat.name}`;
}

function renderHistory() {
  const list = state.conversations.slice().reverse();
  if (list.length === 0) {
    els.history.innerHTML = '<p class="empty-history">אין שיחות עדיין</p>';
    return;
  }
  els.history.innerHTML = '';
  list.forEach(c => {
    const div = document.createElement('div');
    div.className = 'history-item' + (c.id === state.activeId ? ' active' : '');
    div.title = c.title + ' (קליק ימני לאפשרויות)';
    div.innerHTML = `<span>💬</span><span style="overflow:hidden;text-overflow:ellipsis;">${escapeHtml(c.title)}</span>`;
    div.addEventListener('click', () => loadConversation(c.id));
    div.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showContextMenu(e.pageX, e.pageY, [
        { label: '▶ המשך שיחה', action: () => loadConversation(c.id) },
        { label: '✏️ ערוך שם', action: () => renameConversation(c.id) },
        { label: '🗑️ מחק', action: () => deleteConversation(c.id), danger: true },
      ]);
    });
    els.history.appendChild(div);
  });
}

function showContextMenu(x, y, items) {
  closeContextMenu();
  const menu = document.createElement('div');
  menu.className = 'ctx-menu';
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'ctx-item' + (item.danger ? ' danger' : '');
    btn.textContent = item.label;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      item.action();
      closeContextMenu();
    });
    menu.appendChild(btn);
  });
  document.body.appendChild(menu);
  // Adjust position if off-screen
  const r = menu.getBoundingClientRect();
  if (r.right > window.innerWidth) menu.style.left = (window.innerWidth - r.width - 8) + 'px';
  if (r.bottom > window.innerHeight) menu.style.top = (window.innerHeight - r.height - 8) + 'px';
  setTimeout(() => {
    document.addEventListener('click', closeContextMenu, { once: true });
    document.addEventListener('contextmenu', closeContextMenu, { once: true });
  }, 0);
}

function closeContextMenu() {
  document.querySelectorAll('.ctx-menu').forEach(m => m.remove());
}

function deleteConversation(id) {
  if (!confirm('למחוק את השיחה?')) return;
  state.conversations = state.conversations.filter(c => c.id !== id);
  if (state.activeId === id) {
    state.activeId = state.conversations.length ? state.conversations[state.conversations.length - 1].id : null;
  }
  persist();
  renderHistory();
  renderMessages();
  showToast('השיחה נמחקה');
}

function renameConversation(id) {
  const conv = state.conversations.find(c => c.id === id);
  if (!conv) return;
  const newTitle = prompt('שם חדש לשיחה:', conv.title);
  if (newTitle && newTitle.trim()) {
    conv.title = newTitle.trim();
    persist();
    renderHistory();
    showToast('השם עודכן ✓');
  }
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function renderMarkdown(text) {
  let html = escapeHtml(text);
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
    `<pre><code>${code.trim()}</code></pre>`);
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="msg-image" loading="lazy" />');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  html = html.replace(/^\s*[-*] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`);
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');
  html = '<p>' + html + '</p>';
  html = html.replace(/<p>(<(h\d|ul|pre|img)>)/g, '$1').replace(/(<\/(h\d|ul|pre)>)<\/p>/g, '$1');
  return html;
}

function speak(text, btn) {
  if (!('speechSynthesis' in window)) return;
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    document.querySelectorAll('.speak-btn.active').forEach(b => b.classList.remove('active'));
    return;
  }
  const clean = text.replace(/[*_`#~]+/g, '').replace(/\!\[[^\]]*\]\([^)]+\)/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  const u = new SpeechSynthesisUtterance(clean);
  // Detect language roughly
  if (/[א-ת]/.test(clean)) u.lang = 'he-IL';
  else if (/[ا-ي]/.test(clean)) u.lang = 'ar-SA';
  else if (/[а-яА-Я]/.test(clean)) u.lang = 'ru-RU';
  else u.lang = 'en-US';
  u.rate = 1.0;
  if (btn) {
    btn.classList.add('active');
    u.onend = () => btn.classList.remove('active');
    u.onerror = () => btn.classList.remove('active');
  }
  speechSynthesis.speak(u);
}

function renderMessages() {
  const conv = getActive();
  els.messages.innerHTML = '';
  if (!conv || conv.messages.length === 0) {
    els.welcome.classList.remove('hidden');
    return;
  }
  els.welcome.classList.add('hidden');
  conv.messages.forEach(m => {
    if (m.role === 'assistant' && m.content.startsWith('__IMG__')) {
      try {
        const data = JSON.parse(m.content.slice(7));
        addImageCardDOM(data.prompt, data.url);
        return;
      } catch {}
    }
    if (m.role === 'assistant' && m.content.startsWith('__VID__')) {
      try {
        const data = JSON.parse(m.content.slice(7));
        addVideoCardDOM(data.prompt, data.frames);
        return;
      } catch {}
    }
    if (m.role === 'assistant' && m.content.startsWith('__GRID__')) {
      try {
        const data = JSON.parse(m.content.slice(8));
        addImageGridDOM(data.subject, data.images);
        return;
      } catch {}
    }
    addMessageDOM(m.role, m.content);
  });
}

function addImageGridDOM(subject, images) {
  els.welcome.classList.add('hidden');
  const div = document.createElement('div');
  div.className = 'msg bot';
  const cells = images.map((img, i) => `
    <div class="grid-cell" data-i="${i}">
      <div class="grid-loader"><div class="spinner"></div></div>
      <img alt="${escapeHtml(img.caption)}" loading="lazy" />
    </div>
  `).join('');
  div.innerHTML = `
    <div class="msg-avatar">A</div>
    <div class="msg-body">
      <div class="msg-name">Astra</div>
      <div class="grid-card">
        <div class="grid-title">🔍 ${escapeHtml(subject)}</div>
        <div class="img-grid">${cells}</div>
      </div>
    </div>
  `;
  div.querySelectorAll('.grid-cell').forEach((cell) => {
    const i = parseInt(cell.dataset.i, 10);
    const im = cell.querySelector('img');
    const loader = cell.querySelector('.grid-loader');
    im.addEventListener('load', () => { loader.style.display = 'none'; im.classList.add('loaded'); });
    attachAutoRetry(im, subject, { width: 768, height: 768 });
    im.src = images[i].url;
    cell.addEventListener('click', () => openLightbox(im.currentSrc || im.src, subject));
  });
  els.messages.appendChild(div);
  els.chat.scrollTop = els.chat.scrollHeight;
  return div;
}

function openLightbox(url, caption = '') {
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lb-close" title="סגור">×</button>
    <img src="${url}" alt="${escapeHtml(caption)}" />
    ${caption ? `<div class="lb-caption">${escapeHtml(caption)}</div>` : ''}
  `;
  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target.classList.contains('lb-close')) lb.remove();
  });
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { lb.remove(); document.removeEventListener('keydown', esc); }
  });
  document.body.appendChild(lb);
}

function addVideoCardDOM(prompt, frames) {
  els.welcome.classList.add('hidden');
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.innerHTML = `
    <div class="msg-avatar">A</div>
    <div class="msg-body">
      <div class="msg-name">Astra</div>
      <div class="img-card">
        <div class="img-wrap">
          <div class="img-loading"><div class="spinner"></div><span>מייצר סרטון (${frames.length} פריימים)...</span></div>
          <img class="img-main vid-frame" alt="${escapeHtml(prompt)}" />
          <div class="vid-overlay">
            <button class="vid-play" data-act="toggle">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
            </button>
            <div class="vid-progress"><div class="vid-bar"></div></div>
          </div>
        </div>
        <div class="img-footer">
          <div class="img-prompt" title="${escapeHtml(prompt)}">🎬 ${escapeHtml(prompt)}</div>
          <div class="img-actions">
            <button class="img-btn" data-act="regen" title="צור מחדש">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            </button>
            <button class="img-btn" data-act="download" title="הורד פריים נוכחי">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </button>
            <button class="img-btn" data-act="open" title="פתח פריים בחלון חדש">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  const img = div.querySelector('.vid-frame');
  const loader = div.querySelector('.img-loading');
  const playBtn = div.querySelector('.vid-play');
  const bar = div.querySelector('.vid-bar');

  // Preload all frames - retry failed ones silently
  let loaded = 0;
  const preloaded = [];
  const models = ['flux', 'turbo', 'flux', 'turbo'];
  frames.forEach((src, i) => {
    const im = new Image();
    let attempts = 0;
    im.onload = () => {
      loaded++;
      frames[i] = im.src;
      if (loaded === 1) {
        loader.style.display = 'none';
        img.style.opacity = '1';
        img.src = preloaded[0]?.src || src;
        startPlay();
      }
    };
    im.onerror = () => {
      if (attempts >= 8) return;
      attempts++;
      const newSeed = Math.floor(Math.random() * 1e6);
      const newModel = models[attempts % models.length];
      const newUrl = buildImageUrl(prompt + VIDEO_QUALITY + ', frame ' + (i+1), { width: 896, height: 896, seed: newSeed, model: newModel, suffix: '' });
      setTimeout(() => { im.src = newUrl; }, 500);
    };
    im.src = src;
    preloaded[i] = im;
  });

  let idx = 0;
  let playing = true;
  let timer = null;
  const FRAME_MS = 400;

  function step() {
    idx = (idx + 1) % frames.length;
    img.src = preloaded[idx]?.src || frames[idx];
    bar.style.width = ((idx + 1) / frames.length * 100) + '%';
  }
  function startPlay() {
    playing = true;
    playBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>';
    timer = setInterval(step, FRAME_MS);
  }
  function pausePlay() {
    playing = false;
    playBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>';
    if (timer) clearInterval(timer);
  }
  playBtn.addEventListener('click', () => playing ? pausePlay() : startPlay());

  div.querySelector('[data-act="download"]').addEventListener('click', async () => {
    try {
      const r = await fetch(frames[idx]);
      const blob = await r.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `astra-video-frame-${idx + 1}.jpg`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch { window.open(frames[idx], '_blank'); }
  });
  div.querySelector('[data-act="open"]').addEventListener('click', () => window.open(frames[idx], '_blank'));
  div.querySelector('[data-act="regen"]').addEventListener('click', () => {
    if (timer) clearInterval(timer);
    els.input.value = `סרטון של ${prompt}`;
    autoResize();
    updateSendButton();
    sendMessage();
  });

  els.messages.appendChild(div);
  els.chat.scrollTop = els.chat.scrollHeight;
  return div;
}

function addImageCardDOM(prompt, url) {
  els.welcome.classList.add('hidden');
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.innerHTML = `
    <div class="msg-avatar">A</div>
    <div class="msg-body">
      <div class="msg-name">Astra</div>
      <div class="img-card">
        <div class="img-wrap">
          <div class="img-loading"><div class="spinner"></div><span>מייצר תמונה...</span></div>
          <img class="img-main" alt="${escapeHtml(prompt)}" loading="lazy" />
        </div>
        <div class="img-footer">
          <div class="img-prompt" title="${escapeHtml(prompt)}">🎨 ${escapeHtml(prompt)}</div>
          <div class="img-actions">
            <button class="img-btn" data-act="regen" title="צור מחדש">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            </button>
            <button class="img-btn" data-act="download" title="הורדה">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </button>
            <button class="img-btn" data-act="open" title="פתח בחלון חדש">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </button>
            <button class="img-btn" data-act="copy" title="העתק קישור">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  const img = div.querySelector('.img-main');
  const loader = div.querySelector('.img-loading');
  img.addEventListener('load', () => { loader.style.display = 'none'; img.style.opacity = '1'; });
  attachAutoRetry(img, prompt);
  img.src = url;

  div.querySelector('[data-act="download"]').addEventListener('click', async () => {
    try {
      const r = await fetch(url);
      const blob = await r.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `astra-${Date.now()}.jpg`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch { window.open(url, '_blank'); }
  });
  div.querySelector('[data-act="open"]').addEventListener('click', () => window.open(url, '_blank'));
  div.querySelector('[data-act="copy"]').addEventListener('click', () => {
    navigator.clipboard.writeText(url).then(() => showToast('הקישור הועתק ✓'));
  });
  div.querySelector('[data-act="regen"]').addEventListener('click', () => {
    els.input.value = `צייר ${prompt}`;
    autoResize();
    updateSendButton();
    sendMessage();
  });

  els.messages.appendChild(div);
  els.chat.scrollTop = els.chat.scrollHeight;
  return div;
}

function addMessageDOM(role, content, isTyping = false) {
  els.welcome.classList.add('hidden');
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  const avatar = role === 'user' ? (state.userName[0] || 'A').toUpperCase() : 'A';
  const name = role === 'user' ? state.userName : 'Astra';
  let body;
  if (isTyping) {
    body = '<div class="typing"><span></span><span></span><span></span></div>';
  } else {
    const actions = role === 'bot'
      ? `<div class="msg-actions">
          <button class="msg-action speak-btn" title="הקראה" data-act="speak">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          </button>
          <button class="msg-action" title="העתק" data-act="copy">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
        </div>`
      : '';
    body = `<div class="msg-content">${renderMarkdown(content)}</div>${actions}`;
  }
  div.innerHTML = `
    <div class="msg-avatar">${escapeHtml(avatar)}</div>
    <div class="msg-body">
      <div class="msg-name">${escapeHtml(name)}</div>
      ${body}
    </div>
  `;
  if (role === 'bot' && !isTyping) {
    const speakBtn = div.querySelector('[data-act="speak"]');
    const copyBtn = div.querySelector('[data-act="copy"]');
    speakBtn?.addEventListener('click', () => speak(content, speakBtn));
    copyBtn?.addEventListener('click', () => {
      navigator.clipboard.writeText(content).then(() => showToast('הועתק ✓'));
    });
  }
  els.messages.appendChild(div);
  els.chat.scrollTop = els.chat.scrollHeight;
  return div;
}

function newConversation() {
  const conv = { id: uid(), title: 'שיחה חדשה', category: state.category, messages: [], createdAt: Date.now() };
  state.conversations.push(conv);
  state.activeId = conv.id;
  persist();
  renderHistory();
  renderMessages();
  els.input.focus();
  closeSidebarMobile();
}

function loadConversation(id) {
  state.activeId = id;
  const conv = getActive();
  if (conv && conv.category) {
    state.category = conv.category;
    renderCategories();
    renderSuggestions();
  }
  persist();
  renderHistory();
  renderMessages();
  closeSidebarMobile();
}

function ensureConversation() { if (!state.activeId || !getActive()) newConversation(); }

async function sendMessage() {
  const text = els.input.value.trim();
  if (!text || state.loading) return;

  ensureConversation();
  const conv = getActive();
  conv.messages.push({ role: 'user', content: text });
  if (conv.messages.length === 1) {
    conv.title = text.length > 38 ? text.slice(0, 38) + '…' : text;
  }
  conv.category = state.category;

  els.input.value = '';
  autoResize();
  updateSendButton();
  addMessageDOM('user', text);
  persist();
  renderHistory();

  // "What is X" / "Do you know X" intent - show image grid + explanation
  const knowSubject = detectKnowRequest(text);
  if (knowSubject && !detectVideoRequest(text) && !detectImageRequest(text)) {
    state.loading = true;
    updateSendButton();
    const typingEl = addMessageDOM('bot', '', true);
    try {
      const englishSubject = await translateToEnglish(knowSubject);
      const baseSeed = Math.floor(Math.random() * 1e6);
      const images = Array.from({ length: 6 }, (_, i) => ({
        url: buildRealPhotoUrl(englishSubject, { width: 768, height: 768, seed: baseSeed + i * 13 }),
        caption: knowSubject,
      }));
      const fakeConv = { ...conv, messages: [{ role: 'user', content: `הסבר בקצרה (3-4 משפטים) מה זה "${knowSubject}". ענה בעברית פשוטה וברורה.` }] };
      let explanation = '';
      try {
        explanation = state.apiKey ? await callClaude(fakeConv) : await callPublicAI(fakeConv);
      } catch { explanation = `**${knowSubject}**`; }
      typingEl.remove();
      addMessageDOM('bot', explanation);
      addImageGridDOM(knowSubject, images);
      conv.messages.push({ role: 'assistant', content: explanation });
      conv.messages.push({ role: 'assistant', content: `__GRID__${JSON.stringify({ subject: knowSubject, images })}` });
      persist();
    } catch (err) {
      typingEl.remove();
      const msg = `רק רגע, נסה לשאול שוב 💭`;
      addMessageDOM('bot', msg);
      conv.messages.push({ role: 'assistant', content: msg });
      persist();
    } finally {
      state.loading = false;
      updateSendButton();
    }
    return;
  }

  // Video generation intent
  const videoPrompt = detectVideoRequest(text);
  if (videoPrompt) {
    state.loading = true;
    updateSendButton();
    const typingEl = addMessageDOM('bot', '', true);
    try {
      const englishPrompt = await translateToEnglish(videoPrompt);
      const baseSeed = Math.floor(Math.random() * 1e6);
      const frames = [];
      for (let i = 0; i < 8; i++) {
        frames.push(buildRealPhotoUrl(englishPrompt, { width: 896, height: 896, seed: baseSeed + i * 11 }));
      }
      typingEl.remove();
      addVideoCardDOM(videoPrompt, frames);
      conv.messages.push({ role: 'assistant', content: `__VID__${JSON.stringify({ prompt: videoPrompt, frames })}` });
      persist();
    } catch (err) {
      typingEl.remove();
    } finally {
      state.loading = false;
      updateSendButton();
    }
    return;
  }

  // Image generation intent
  const imagePrompt = detectImageRequest(text);
  if (imagePrompt) {
    state.loading = true;
    updateSendButton();
    const typingEl = addMessageDOM('bot', '', true);
    try {
      const englishPrompt = await translateToEnglish(imagePrompt);
      const seed = Math.floor(Math.random() * 1e6);
      const url = buildRealPhotoUrl(englishPrompt, { seed });
      typingEl.remove();
      addImageCardDOM(imagePrompt, url);
      conv.messages.push({ role: 'assistant', content: `__IMG__${JSON.stringify({ prompt: imagePrompt, url })}` });
      persist();
    } catch (err) {
      typingEl.remove();
    } finally {
      state.loading = false;
      updateSendButton();
    }
    return;
  }

  // Quiz intent
  const quizTopic = detectQuizRequest(text);
  if (quizTopic !== null) {
    state.loading = true;
    updateSendButton();
    const typingEl = addMessageDOM('bot', '', true);
    try {
      const topic = quizTopic || 'נושא כללי מעניין';
      const quizPrompt = `צור חידון של 5 שאלות אמריקאיות על הנושא: "${topic}". פורמט נדרש (markdown):\n\n## 🧠 חידון: ${topic}\n\n**1. שאלה כאן?**\n- א) אופציה 1\n- ב) אופציה 2\n- ג) אופציה 3\n- ד) אופציה 4\n\n... וכך הלאה.\n\nבסוף, הוסף "<details><summary>📝 לחץ לתשובות</summary>\n\n1. ב\n2. ד\n... etc\n</details>"\n\nענה בעברית, מעניין ומאתגר אך הוגן.`;
      const fakeConv = { ...conv, messages: [{ role: 'user', content: quizPrompt }] };
      const reply = state.apiKey ? await callClaude(fakeConv) : await callPublicAI(fakeConv);
      typingEl.remove();
      addMessageDOM('bot', reply);
      conv.messages.push({ role: 'assistant', content: reply });
      persist();
    } catch (err) {
      typingEl.remove();
      const msg = `לא הצלחתי ליצור חידון כרגע. נסה שוב 🔄`;
      addMessageDOM('bot', msg);
      conv.messages.push({ role: 'assistant', content: msg });
      persist();
    } finally {
      state.loading = false;
      updateSendButton();
    }
    return;
  }

  // Quick local replies
  const quick = tryQuickReply(text);
  if (quick) {
    setTimeout(() => {
      addMessageDOM('bot', quick);
      conv.messages.push({ role: 'assistant', content: quick });
      persist();
    }, 60);
    return;
  }

  // AI call
  state.loading = true;
  updateSendButton();
  const typingEl = addMessageDOM('bot', '', true);
  try {
    const reply = state.apiKey ? await callClaude(conv) : await callPublicAI(conv);
    typingEl.remove();
    addMessageDOM('bot', reply);
    conv.messages.push({ role: 'assistant', content: reply });
    persist();
  } catch (err) {
    typingEl.remove();
    const fallback = `רק רגע, אני חושב על זה... תוכל לנסח שוב או לפרט יותר? 💭`;
    addMessageDOM('bot', fallback);
    conv.messages.push({ role: 'assistant', content: fallback });
    persist();
  } finally {
    state.loading = false;
    updateSendButton();
  }
}

async function callClaude(conv) {
  const cat = CATEGORIES[state.category];
  const messages = conv.messages.map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: m.content,
  }));
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': state.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 2048,
      system: cat.system,
      messages,
    }),
  });
  if (!res.ok) {
    let detail = '';
    try { detail = (await res.json()).error?.message || ''; } catch {}
    throw new Error(`${res.status} ${detail || res.statusText}`);
  }
  const data = await res.json();
  return data.content?.[0]?.text || '(תשובה ריקה)';
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 25000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function callPublicAI(conv) {
  const cat = CATEGORIES[state.category];
  const messages = [
    { role: 'system', content: cat.system + ' If you do not know something or need current information, use web search to find accurate up-to-date information.' },
    ...conv.messages
      .filter(m => !m.content.startsWith('__IMG__') && !m.content.startsWith('__VID__'))
      .map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      })),
  ];

  // Try multiple models with fallback - searchgpt has web access
  const models = ['searchgpt', 'openai-large', 'openai', 'mistral'];
  let lastErr = null;
  for (const model of models) {
    try {
      const res = await fetchWithTimeout('https://text.pollinations.ai/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, model, stream: false, private: true }),
      }, 22000);
      if (!res.ok) { lastErr = new Error(`HTTP ${res.status}`); continue; }
      const ct = res.headers.get('content-type') || '';
      let text;
      if (ct.includes('application/json')) {
        const data = await res.json();
        text = data.choices?.[0]?.message?.content
          || data.message?.content
          || data.content
          || '';
      } else {
        text = await res.text();
      }
      if (text && text.trim().length > 0) return text;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('כל המודלים לא זמינים כרגע');
}

function autoResize() {
  els.input.style.height = 'auto';
  els.input.style.height = Math.min(els.input.scrollHeight, 200) + 'px';
}

function updateSendButton() {
  const has = els.input.value.trim().length > 0;
  els.sendBtn.disabled = !has || state.loading;
}

function openSettings() {
  els.apiKeyInput.value = state.apiKey;
  els.userNameInput.value = state.userName === 'אתה' ? '' : state.userName;
  els.themeSelect.value = state.theme;
  populateLangSelect();
  const ls = document.getElementById('langSelect');
  if (ls) ls.value = state.lang;
  els.settingsModal.hidden = false;
}
function closeSettings() { els.settingsModal.hidden = true; }

function saveSettings() {
  state.apiKey = els.apiKeyInput.value.trim();
  state.userName = els.userNameInput.value.trim() || 'אתה';
  state.theme = els.themeSelect.value;
  const ls = document.getElementById('langSelect');
  if (ls && ls.value) state.lang = ls.value;
  localStorage.setItem(STORAGE_KEYS.apiKey, state.apiKey);
  localStorage.setItem(STORAGE_KEYS.userName, state.userName);
  localStorage.setItem(STORAGE_KEYS.theme, state.theme);
  localStorage.setItem(STORAGE_KEYS.lang, state.lang);
  applyTheme();
  closeSettings();
  showToast('ההגדרות נשמרו ✓');
  renderMessages();
}

function toggleSidebar() { els.app.classList.toggle('sidebar-open'); }
function closeSidebarMobile() {
  if (window.innerWidth <= 820) els.app.classList.remove('sidebar-open');
}

els.menuBtn.addEventListener('click', toggleSidebar);
els.closeSidebarBtn.addEventListener('click', toggleSidebar);
els.newChatMain.addEventListener('click', newConversation);
els.settingsBtn.addEventListener('click', openSettings);
els.saveSettings.addEventListener('click', saveSettings);
els.settingsModal.addEventListener('click', e => {
  if (e.target.dataset.close !== undefined) closeSettings();
});
els.categories.addEventListener('click', e => {
  const btn = e.target.closest('.category');
  if (!btn) return;
  state.category = btn.dataset.category;
  persist();
  renderCategories();
  renderSuggestions();
});
els.input.addEventListener('input', () => { autoResize(); updateSendButton(); });
els.input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
els.sendBtn.addEventListener('click', sendMessage);

// Voice input via Web Speech API
const micBtn = document.getElementById('micBtn');
if (micBtn) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    micBtn.style.display = 'none';
  } else {
    let recog = null;
    let listening = false;
    micBtn.addEventListener('click', () => {
      if (listening) { recog && recog.stop(); return; }
      recog = new SR();
      recog.lang = 'he-IL';
      recog.continuous = false;
      recog.interimResults = true;
      recog.onstart = () => { listening = true; micBtn.classList.add('active'); };
      recog.onresult = (e) => {
        let txt = '';
        for (let i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript;
        els.input.value = txt;
        autoResize();
        updateSendButton();
      };
      recog.onerror = () => { listening = false; micBtn.classList.remove('active'); };
      recog.onend = () => {
        listening = false;
        micBtn.classList.remove('active');
        if (els.input.value.trim()) sendMessage();
      };
      recog.start();
    });
  }
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !els.settingsModal.hidden) closeSettings();
});

window.addEventListener('error', (e) => {
  console.error('Astra error:', e.error || e.message);
  showToast('משהו השתבש - מנסה להתאושש', true);
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('Astra promise rejection:', e.reason);
});

applyTheme();
renderCategories();
renderSuggestions();
renderHistory();
renderMessages();
updateSendButton();
showSplash();
showTutorialIfFirstVisit();
