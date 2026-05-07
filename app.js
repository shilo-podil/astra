// Astra AI - Frontend Logic
const STORAGE_KEYS = {
  apiKey: 'astra_api_key',
  userName: 'astra_user_name',
  theme: 'astra_theme',
  conversations: 'astra_conversations',
  activeId: 'astra_active_id',
  category: 'astra_category',
};

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
  /^\s*(צייר לי|צייר|תצייר|תיצור תמונה|תייצר תמונה|תמונה של|תן לי תמונה|הראה לי תמונה|generate an? image of|create an? image of|draw|make an? image of|picture of|imagine)\s+(.+)/i,
];

function detectImageRequest(text) {
  for (const re of IMAGE_TRIGGERS) {
    const m = text.match(re);
    if (m) return m[m.length - 1].trim();
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
  conversations: JSON.parse(localStorage.getItem(STORAGE_KEYS.conversations) || '[]'),
  activeId: localStorage.getItem(STORAGE_KEYS.activeId) || null,
  loading: false,
};

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
    div.title = c.title;
    div.innerHTML = `<span>💬</span><span style="overflow:hidden;text-overflow:ellipsis;">${escapeHtml(c.title)}</span>`;
    div.addEventListener('click', () => loadConversation(c.id));
    els.history.appendChild(div);
  });
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
  conv.messages.forEach(m => addMessageDOM(m.role, m.content));
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

  // Image generation intent
  const imagePrompt = detectImageRequest(text);
  if (imagePrompt) {
    state.loading = true;
    updateSendButton();
    const typingEl = addMessageDOM('bot', '🎨 מייצר תמונה...', true);
    try {
      const seed = Math.floor(Math.random() * 1e6);
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=1024&height=1024&seed=${seed}&nologo=true&enhance=true`;
      const reply = `הנה התמונה: **${imagePrompt}**\n\n![${imagePrompt}](${url})`;
      typingEl.remove();
      addMessageDOM('bot', reply);
      conv.messages.push({ role: 'assistant', content: reply });
      persist();
    } catch (err) {
      typingEl.remove();
      const msg = `לא הצלחתי ליצור את התמונה. נסה שוב 🔄`;
      addMessageDOM('bot', msg);
      conv.messages.push({ role: 'assistant', content: msg });
      persist();
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
    }, 250);
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
    const fallback = `אופס, נתקלתי בבעיית רשת. נסה שוב בעוד רגע 🔄`;
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

async function callPublicAI(conv) {
  const cat = CATEGORIES[state.category];
  const messages = [
    { role: 'system', content: cat.system },
    ...conv.messages.map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content,
    })),
  ];
  const res = await fetch('https://text.pollinations.ai/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, model: 'openai', stream: false, private: true }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    const data = await res.json();
    return data.choices?.[0]?.message?.content
      || data.message?.content
      || data.content
      || (typeof data === 'string' ? data : JSON.stringify(data));
  }
  return await res.text();
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
  els.settingsModal.hidden = false;
}
function closeSettings() { els.settingsModal.hidden = true; }

function saveSettings() {
  state.apiKey = els.apiKeyInput.value.trim();
  state.userName = els.userNameInput.value.trim() || 'אתה';
  state.theme = els.themeSelect.value;
  localStorage.setItem(STORAGE_KEYS.apiKey, state.apiKey);
  localStorage.setItem(STORAGE_KEYS.userName, state.userName);
  localStorage.setItem(STORAGE_KEYS.theme, state.theme);
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
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !els.settingsModal.hidden) closeSettings();
});

applyTheme();
renderCategories();
renderSuggestions();
renderHistory();
renderMessages();
updateSendButton();
