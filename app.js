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

const I18N = {
  he: { newChat: 'שיחה חדשה', categories: 'קטגוריות', history: 'היסטוריה', settings: 'הגדרות', cat_general: 'כללי', cat_code: 'קוד ופיתוח', cat_writing: 'כתיבה', cat_learning: 'לימוד והבנה', cat_life: 'חיים ויומיום', cat_business: 'עסקים', cat_creative: 'יצירה ורעיונות', cat_analysis: 'ניתוח ומחקר', inputPlaceholder: 'שאל את Astra כל דבר...', disclaimer: 'Astra AI יכולה לטעות. בדוק מידע חשוב.', sendHint: 'Enter לשליחה • Shift+Enter לשורה חדשה', welcomeTitle: 'שלום, אני', emptyHistory: 'אין שיחות עדיין', settingsTitle: 'הגדרות', apiKeyLabel: 'Anthropic API Key', nameLabel: 'שם תצוגה', namePh: 'איך לקרוא לך?', themeLabel: 'ערכת נושא', themeDark: 'כהה', themeLight: 'בהיר', langLabel: 'שפה', cancel: 'ביטול', save: 'שמור', askGeneral: 'במה אוכל לעזור היום?', askCode: 'מה תרצה שאכתוב לך בקוד?', askWriting: 'מה תרצה שאכתוב?', askLearning: 'מה תרצה ללמוד היום?', askLife: 'במה תרצה שאעזור לך?', askBusiness: 'על מה תרצה לעבוד היום?', askCreative: 'מה תרצה ליצור?', askAnalysis: 'מה תרצה שאנתח עבורך?' },
  en: { newChat: 'New chat', categories: 'Categories', history: 'History', settings: 'Settings', cat_general: 'General', cat_code: 'Code & Dev', cat_writing: 'Writing', cat_learning: 'Learning', cat_life: 'Life & Daily', cat_business: 'Business', cat_creative: 'Creative', cat_analysis: 'Analysis', inputPlaceholder: 'Ask Astra anything...', disclaimer: 'Astra AI can make mistakes. Verify important info.', sendHint: 'Enter to send • Shift+Enter for new line', welcomeTitle: "Hello, I'm", emptyHistory: 'No conversations yet', settingsTitle: 'Settings', apiKeyLabel: 'Anthropic API Key', nameLabel: 'Display name', namePh: 'What should I call you?', themeLabel: 'Theme', themeDark: 'Dark', themeLight: 'Light', langLabel: 'Language', cancel: 'Cancel', save: 'Save', askGeneral: 'How can I help you today?', askCode: 'What code do you need?', askWriting: 'What would you like me to write?', askLearning: 'What would you like to learn?', askLife: 'How can I help you?', askBusiness: 'What are we working on today?', askCreative: 'What would you like to create?', askAnalysis: 'What would you like me to analyze?' },
  es: { newChat: 'Nueva conversación', categories: 'Categorías', history: 'Historial', settings: 'Ajustes', cat_general: 'General', cat_code: 'Código', cat_writing: 'Escritura', cat_learning: 'Aprendizaje', cat_life: 'Vida diaria', cat_business: 'Negocios', cat_creative: 'Creativo', cat_analysis: 'Análisis', inputPlaceholder: 'Pregúntame cualquier cosa...', disclaimer: 'Astra AI puede equivocarse. Verifica información importante.', sendHint: 'Enter para enviar • Shift+Enter nueva línea', welcomeTitle: 'Hola, soy', emptyHistory: 'Sin conversaciones aún', settingsTitle: 'Ajustes', apiKeyLabel: 'Clave API Anthropic', nameLabel: 'Nombre', namePh: '¿Cómo te llamas?', themeLabel: 'Tema', themeDark: 'Oscuro', themeLight: 'Claro', langLabel: 'Idioma', cancel: 'Cancelar', save: 'Guardar', askGeneral: '¿Cómo puedo ayudarte hoy?', askCode: '¿Qué código necesitas?', askWriting: '¿Qué te gustaría que escriba?', askLearning: '¿Qué te gustaría aprender?', askLife: '¿En qué puedo ayudarte?', askBusiness: '¿En qué trabajamos hoy?', askCreative: '¿Qué quieres crear?', askAnalysis: '¿Qué quieres analizar?' },
  ar: { newChat: 'محادثة جديدة', categories: 'الفئات', history: 'السجل', settings: 'الإعدادات', cat_general: 'عام', cat_code: 'البرمجة', cat_writing: 'الكتابة', cat_learning: 'التعلم', cat_life: 'الحياة', cat_business: 'الأعمال', cat_creative: 'إبداعي', cat_analysis: 'التحليل', inputPlaceholder: 'اسألني أي شيء...', disclaimer: 'قد ترتكب Astra AI أخطاء. تحقق من المعلومات المهمة.', sendHint: 'Enter للإرسال • Shift+Enter سطر جديد', welcomeTitle: 'مرحباً، أنا', emptyHistory: 'لا توجد محادثات بعد', settingsTitle: 'الإعدادات', apiKeyLabel: 'مفتاح Anthropic API', nameLabel: 'الاسم', namePh: 'بماذا أناديك؟', themeLabel: 'السمة', themeDark: 'داكن', themeLight: 'فاتح', langLabel: 'اللغة', cancel: 'إلغاء', save: 'حفظ', askGeneral: 'كيف يمكنني مساعدتك اليوم؟', askCode: 'ما الكود الذي تحتاجه؟', askWriting: 'ماذا تريدني أن أكتب؟', askLearning: 'ماذا تريد أن تتعلم؟', askLife: 'بماذا أساعدك؟', askBusiness: 'على ماذا نعمل اليوم؟', askCreative: 'ماذا تريد أن تنشئ؟', askAnalysis: 'ماذا تريدني أن أحلل؟' },
  ru: { newChat: 'Новый чат', categories: 'Категории', history: 'История', settings: 'Настройки', cat_general: 'Общее', cat_code: 'Код', cat_writing: 'Текст', cat_learning: 'Обучение', cat_life: 'Жизнь', cat_business: 'Бизнес', cat_creative: 'Творчество', cat_analysis: 'Анализ', inputPlaceholder: 'Спросите Astra о чём угодно...', disclaimer: 'Astra AI может ошибаться. Проверяйте важную информацию.', sendHint: 'Enter — отправить • Shift+Enter — новая строка', welcomeTitle: 'Привет, я', emptyHistory: 'Чатов пока нет', settingsTitle: 'Настройки', apiKeyLabel: 'Ключ Anthropic API', nameLabel: 'Имя', namePh: 'Как тебя зовут?', themeLabel: 'Тема', themeDark: 'Тёмная', themeLight: 'Светлая', langLabel: 'Язык', cancel: 'Отмена', save: 'Сохранить', askGeneral: 'Чем могу помочь сегодня?', askCode: 'Какой код нужен?', askWriting: 'Что мне написать?', askLearning: 'Что хотите изучить?', askLife: 'Чем помочь?', askBusiness: 'Над чем работаем?', askCreative: 'Что создадим?', askAnalysis: 'Что проанализировать?' },
  fr: { newChat: 'Nouvelle conversation', categories: 'Catégories', history: 'Historique', settings: 'Paramètres', cat_general: 'Général', cat_code: 'Code', cat_writing: 'Écriture', cat_learning: 'Apprentissage', cat_life: 'Vie quotidienne', cat_business: 'Affaires', cat_creative: 'Créatif', cat_analysis: 'Analyse', inputPlaceholder: 'Demandez à Astra...', disclaimer: 'Astra AI peut se tromper. Vérifiez les infos importantes.', sendHint: 'Entrée pour envoyer • Shift+Entrée nouvelle ligne', welcomeTitle: 'Bonjour, je suis', emptyHistory: 'Aucune conversation', settingsTitle: 'Paramètres', apiKeyLabel: 'Clé API Anthropic', nameLabel: 'Nom', namePh: 'Comment vous appeler ?', themeLabel: 'Thème', themeDark: 'Sombre', themeLight: 'Clair', langLabel: 'Langue', cancel: 'Annuler', save: 'Enregistrer', askGeneral: 'Comment puis-je aider ?', askCode: 'Quel code voulez-vous ?', askWriting: 'Que dois-je écrire ?', askLearning: 'Que voulez-vous apprendre ?', askLife: 'Comment puis-je aider ?', askBusiness: 'Sur quoi travaillons-nous ?', askCreative: 'Que créer ?', askAnalysis: 'Quoi analyser ?' },
  de: { newChat: 'Neuer Chat', categories: 'Kategorien', history: 'Verlauf', settings: 'Einstellungen', cat_general: 'Allgemein', cat_code: 'Code', cat_writing: 'Schreiben', cat_learning: 'Lernen', cat_life: 'Alltag', cat_business: 'Business', cat_creative: 'Kreativ', cat_analysis: 'Analyse', inputPlaceholder: 'Frag Astra alles...', disclaimer: 'Astra AI kann sich irren. Wichtige Infos prüfen.', sendHint: 'Enter zum Senden • Shift+Enter neue Zeile', welcomeTitle: 'Hallo, ich bin', emptyHistory: 'Keine Chats', settingsTitle: 'Einstellungen', apiKeyLabel: 'Anthropic API-Schlüssel', nameLabel: 'Name', namePh: 'Wie heißt du?', themeLabel: 'Design', themeDark: 'Dunkel', themeLight: 'Hell', langLabel: 'Sprache', cancel: 'Abbrechen', save: 'Speichern', askGeneral: 'Wie kann ich heute helfen?', askCode: 'Welchen Code brauchst du?', askWriting: 'Was soll ich schreiben?', askLearning: 'Was möchtest du lernen?', askLife: 'Wobei kann ich helfen?', askBusiness: 'Woran arbeiten wir?', askCreative: 'Was erschaffen wir?', askAnalysis: 'Was soll ich analysieren?' },
  'zh-CN': { newChat: '新对话', categories: '分类', history: '历史', settings: '设置', cat_general: '常规', cat_code: '代码', cat_writing: '写作', cat_learning: '学习', cat_life: '生活', cat_business: '商务', cat_creative: '创意', cat_analysis: '分析', inputPlaceholder: '问 Astra 任何事...', disclaimer: 'Astra AI 可能会犯错，请核实重要信息。', sendHint: 'Enter 发送 • Shift+Enter 换行', welcomeTitle: '你好，我是', emptyHistory: '暂无对话', settingsTitle: '设置', apiKeyLabel: 'Anthropic API 密钥', nameLabel: '昵称', namePh: '怎么称呼你？', themeLabel: '主题', themeDark: '深色', themeLight: '浅色', langLabel: '语言', cancel: '取消', save: '保存', askGeneral: '今天能帮你什么？', askCode: '你需要什么代码？', askWriting: '想让我写什么？', askLearning: '想学什么？', askLife: '怎么帮你？', askBusiness: '今天处理什么？', askCreative: '想创作什么？', askAnalysis: '分析什么？' },
  ja: { newChat: '新しい会話', categories: 'カテゴリー', history: '履歴', settings: '設定', cat_general: '一般', cat_code: 'コード', cat_writing: '執筆', cat_learning: '学習', cat_life: '日常', cat_business: 'ビジネス', cat_creative: 'クリエイティブ', cat_analysis: '分析', inputPlaceholder: 'Astra に何でも聞いて...', disclaimer: 'Astra AI は間違うことがあります。重要な情報は確認してください。', sendHint: 'Enter で送信 • Shift+Enter 改行', welcomeTitle: 'こんにちは、', emptyHistory: '会話なし', settingsTitle: '設定', apiKeyLabel: 'Anthropic API キー', nameLabel: '名前', namePh: 'お名前は？', themeLabel: 'テーマ', themeDark: 'ダーク', themeLight: 'ライト', langLabel: '言語', cancel: 'キャンセル', save: '保存', askGeneral: '今日は何をお手伝い？', askCode: 'どんなコード？', askWriting: '何を書きましょう？', askLearning: '何を学びますか？', askLife: '何を手伝いますか？', askBusiness: '今日は何を？', askCreative: '何を作りますか？', askAnalysis: '何を分析しますか？' },
  it: { newChat: 'Nuova chat', categories: 'Categorie', history: 'Cronologia', settings: 'Impostazioni', cat_general: 'Generale', cat_code: 'Codice', cat_writing: 'Scrittura', cat_learning: 'Apprendimento', cat_life: 'Vita', cat_business: 'Business', cat_creative: 'Creativo', cat_analysis: 'Analisi', inputPlaceholder: 'Chiedi qualsiasi cosa...', disclaimer: 'Astra AI può sbagliare. Verifica informazioni importanti.', sendHint: 'Invio per inviare • Shift+Invio nuova riga', welcomeTitle: 'Ciao, sono', emptyHistory: 'Nessuna conversazione', settingsTitle: 'Impostazioni', apiKeyLabel: 'Chiave API Anthropic', nameLabel: 'Nome', namePh: 'Come ti chiami?', themeLabel: 'Tema', themeDark: 'Scuro', themeLight: 'Chiaro', langLabel: 'Lingua', cancel: 'Annulla', save: 'Salva', askGeneral: 'Come posso aiutarti oggi?', askCode: 'Che codice ti serve?', askWriting: 'Cosa devo scrivere?', askLearning: 'Cosa vuoi imparare?', askLife: 'In cosa posso aiutarti?', askBusiness: 'Su cosa lavoriamo?', askCreative: 'Cosa creiamo?', askAnalysis: 'Cosa analizziamo?' },
  pt: { newChat: 'Nova conversa', categories: 'Categorias', history: 'Histórico', settings: 'Configurações', cat_general: 'Geral', cat_code: 'Código', cat_writing: 'Escrita', cat_learning: 'Aprendizado', cat_life: 'Vida', cat_business: 'Negócios', cat_creative: 'Criativo', cat_analysis: 'Análise', inputPlaceholder: 'Pergunte qualquer coisa...', disclaimer: 'Astra AI pode errar. Verifique informações importantes.', sendHint: 'Enter para enviar • Shift+Enter nova linha', welcomeTitle: 'Olá, sou', emptyHistory: 'Sem conversas', settingsTitle: 'Configurações', apiKeyLabel: 'Chave API Anthropic', nameLabel: 'Nome', namePh: 'Como te chamar?', themeLabel: 'Tema', themeDark: 'Escuro', themeLight: 'Claro', langLabel: 'Idioma', cancel: 'Cancelar', save: 'Salvar', askGeneral: 'Como posso ajudar hoje?', askCode: 'Que código precisa?', askWriting: 'O que devo escrever?', askLearning: 'O que quer aprender?', askLife: 'Como posso ajudar?', askBusiness: 'No que trabalhamos?', askCreative: 'O que criamos?', askAnalysis: 'O que analisar?' },
  tr: { newChat: 'Yeni sohbet', categories: 'Kategoriler', history: 'Geçmiş', settings: 'Ayarlar', cat_general: 'Genel', cat_code: 'Kod', cat_writing: 'Yazma', cat_learning: 'Öğrenme', cat_life: 'Yaşam', cat_business: 'İş', cat_creative: 'Yaratıcı', cat_analysis: 'Analiz', inputPlaceholder: 'Astra\'ya her şeyi sorabilirsin...', disclaimer: 'Astra AI hata yapabilir. Önemli bilgileri doğrula.', sendHint: 'Enter ile gönder • Shift+Enter yeni satır', welcomeTitle: 'Merhaba, ben', emptyHistory: 'Henüz sohbet yok', settingsTitle: 'Ayarlar', apiKeyLabel: 'Anthropic API Anahtarı', nameLabel: 'İsim', namePh: 'Sana nasıl seslenelim?', themeLabel: 'Tema', themeDark: 'Koyu', themeLight: 'Açık', langLabel: 'Dil', cancel: 'İptal', save: 'Kaydet', askGeneral: 'Bugün nasıl yardım edebilirim?', askCode: 'Ne kod lazım?', askWriting: 'Ne yazayım?', askLearning: 'Ne öğrenmek istersin?', askLife: 'Nasıl yardım edebilirim?', askBusiness: 'Bugün ne üzerinde çalışıyoruz?', askCreative: 'Ne yaratalım?', askAnalysis: 'Ne analiz edeyim?' },
};

const RTL_LANGS = ['he', 'ar', 'fa', 'ur'];

function t(key) {
  const map = I18N[state.lang] || I18N[state.lang.split('-')[0]] || I18N.en;
  return map[key] || I18N.en[key] || key;
}

function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = RTL_LANGS.includes(state.lang) ? 'rtl' : 'ltr';
  // Sidebar
  const newChatBtn = document.getElementById('newChatMain');
  if (newChatBtn) {
    const txt = newChatBtn.childNodes[newChatBtn.childNodes.length - 1];
    if (txt && txt.nodeType === 3) txt.textContent = ' ' + t('newChat');
  }
  const sectionTitles = document.querySelectorAll('.section-title');
  if (sectionTitles[0]) sectionTitles[0].textContent = t('categories');
  if (sectionTitles[1]) sectionTitles[1].textContent = t('history');
  const settingsBtn = document.getElementById('settingsBtn');
  if (settingsBtn) {
    const last = settingsBtn.childNodes[settingsBtn.childNodes.length - 1];
    if (last && last.nodeType === 3) last.textContent = ' ' + t('settings');
  }
  // Categories
  const catKeys = ['general', 'code', 'writing', 'learning', 'life', 'business', 'creative', 'analysis'];
  document.querySelectorAll('.category').forEach((btn) => {
    const cat = btn.dataset.category;
    const span = btn.querySelectorAll('span')[1];
    if (span) span.textContent = t('cat_' + cat);
  });
  // Welcome
  const h1 = document.querySelector('.welcome h1');
  if (h1) h1.innerHTML = `${escapeHtml(t('welcomeTitle'))} <span class="grad">Astra</span>`;
  const subtitle = document.querySelector('.subtitle');
  if (subtitle) {
    const askKey = 'ask' + state.category.charAt(0).toUpperCase() + state.category.slice(1);
    subtitle.textContent = t(askKey);
  }
  // Input
  const inputEl = document.getElementById('input');
  if (inputEl) inputEl.placeholder = t('inputPlaceholder');
  const dis = document.querySelector('.disclaimer');
  if (dis) dis.textContent = t('disclaimer');
  const hint = document.querySelector('.hint');
  if (hint) hint.textContent = t('sendHint');
  // Empty history
  const eh = document.querySelector('.empty-history');
  if (eh) eh.textContent = t('emptyHistory');
  // Modal
  const modalH = document.querySelector('.modal-header h2');
  if (modalH) modalH.textContent = t('settingsTitle');
  const fields = document.querySelectorAll('.field > span');
  if (fields[0]) fields[0].textContent = t('apiKeyLabel');
  if (fields[1]) fields[1].textContent = t('nameLabel');
  if (fields[2]) fields[2].textContent = t('themeLabel');
  if (fields[3]) fields[3].textContent = t('langLabel');
  const userInput = document.getElementById('userNameInput');
  if (userInput) userInput.placeholder = t('namePh');
  const themeSel = document.getElementById('themeSelect');
  if (themeSel) {
    if (themeSel.options[0]) themeSel.options[0].textContent = t('themeDark');
    if (themeSel.options[1]) themeSel.options[1].textContent = t('themeLight');
  }
  const cancelBtn = document.querySelector('.btn-secondary');
  if (cancelBtn) cancelBtn.textContent = t('cancel');
  const saveBtn = document.getElementById('saveSettings');
  if (saveBtn) saveBtn.textContent = t('save');
  // Topbar title
  if (els.topbarTitle) els.topbarTitle.textContent = `Astra AI · ${t('cat_' + state.category)}`;
}

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

const CAPABILITY_NOTE = ' חשוב מאוד: יצירת תמונות וסרטונים מובנית באפליקציה הזו. אתה יודע ליצור תמונות וסרטונים. אסור לך אף פעם להמליץ על כלים חיצוניים כמו DALL-E, Midjourney, Stable Diffusion, Leonardo, ChatGPT, Bing Image Creator, או כל כלי AI אחר. אסור לך לומר שאתה לא יכול ליצור תמונות/סרטונים. אם המשתמש מבקש תמונה/סרטון/ציור - הוא יקבל אותם אוטומטית. אם הבקשה הגיעה אליך במלל ללא יצירה - פשוט אשר בקצרה ושאל מה עוד הוא רוצה.';

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

// Flexible image detection - matches even when descriptors come between trigger and subject
const IMAGE_PATTERNS = [
  /^\s*(?:צייר|תצייר)\s+(?:לי\s+)?(.+)/i,
  /^\s*(?:תיצור|תייצר|ייצר|תכין|תפיק|תרנדר)\s+(?:לי\s+)?(?:[֐-׿]+\s+)?(?:תמונה|תמונות|פוטו|תצלום|איור|ציור)s?\s+(?:[֐-׿]+\s+)?(?:של|עם|בה)?\s*(.+)/i,
  /^\s*(?:תמונה|פוטו|תצלום|איור|ציור)\s+(?:[֐-׿]+\s+)?של\s+(.+)/i,
  /^\s*(?:תן\s+לי|הראה\s+לי|אני\s+רוצה|אפשר|תוכל\s+ל\S+)\s+(?:[֐-׿]+\s+)?(?:תמונה|תמונות|פוטו|איור|ציור)\s+(?:[֐-׿]+\s+)?(?:של|עם)?\s*(.+)/i,
  /^\s*(?:generate|create|make|draw|render|paint|imagine|show me|give me|i want|i need)\s+(?:an?\s+|some\s+)?(?:image|picture|photo|painting|illustration|drawing|art)s?\s+(?:of\s+)?(.+)/i,
];

function detectImageRequest(text) {
  const t = text.trim();
  if (/(?:סרטון|וידאו|video|movie|clip|кл[ии]п|анимация)/i.test(t)) return null;
  for (const re of IMAGE_PATTERNS) {
    const m = t.match(re);
    if (m && m[1] && m[1].trim().length > 0) {
      return m[1].trim().replace(/^(?:של|of|with|with\s+a)\s+/i, '').replace(/[?!.,]+$/, '').trim();
    }
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

const QUALITY_SUFFIX = ', photorealistic, sharp focus, ultra detailed, professional photography';
const VIDEO_QUALITY = ', cinematic, sharp focus, professional cinematography, photorealistic';

// Search REAL images from Wikipedia + Wikimedia Commons (no key needed, fully free)
async function fetchWikipediaImage(query) {
  try {
    const u = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&pithumbsize=1280&titles=${encodeURIComponent(query)}&origin=*&redirects=1`;
    const r = await fetchWithTimeout(u, {}, 6000);
    const d = await r.json();
    const pages = Object.values(d.query?.pages || {});
    if (pages[0]?.thumbnail?.source) return { url: pages[0].thumbnail.source, source: 'wikipedia' };
  } catch {}
  return null;
}

async function fetchCommonsImages(query, count = 8) {
  try {
    const u = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json&origin=*&gsrlimit=${count + 4}`;
    const r = await fetchWithTimeout(u, {}, 6000);
    const d = await r.json();
    const pages = Object.values(d.query?.pages || {});
    return pages
      .filter(p => p.imageinfo?.[0]?.thumburl && /\.(jpg|jpeg|png|webp)$/i.test(p.imageinfo[0].thumburl))
      .map(p => ({ url: p.imageinfo[0].thumburl, source: 'commons' }))
      .slice(0, count);
  } catch {}
  return [];
}

// DuckDuckGo image search via CORS proxy - returns real web images (Google-like)
async function searchDuckDuckGoImages(query, count = 8) {
  const proxies = ['https://corsproxy.io/?', 'https://api.allorigins.win/raw?url=', 'https://api.codetabs.com/v1/proxy?quest='];
  for (const proxy of proxies) {
    try {
      const pageUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`;
      const r1 = await fetchWithTimeout(proxy + encodeURIComponent(pageUrl), {}, 6000);
      if (!r1.ok) continue;
      const html = await r1.text();
      const m = html.match(/vqd=['"]([^'"&]+)['"]/) || html.match(/vqd=([\d-]+)/);
      if (!m) continue;
      const vqd = m[1];
      const imgUrl = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${encodeURIComponent(vqd)}&f=,,,,,&p=1&u=bing`;
      const r2 = await fetchWithTimeout(proxy + encodeURIComponent(imgUrl), {}, 6000);
      if (!r2.ok) continue;
      const data = await r2.json();
      const results = (data.results || []).filter(r => r.image && /^https?:\/\//.test(r.image));
      if (results.length === 0) continue;
      return results.slice(0, count).map(r => ({ url: r.image, thumbnail: r.thumbnail || r.image, source: 'ddg', title: r.title || '' }));
    } catch {}
  }
  return [];
}

async function searchRealImages(query, count = 6) {
  const eng = await translateToEnglish(query);
  // Primary: real web images via DuckDuckGo (Google-quality results)
  const ddg = await searchDuckDuckGoImages(eng, count + 2);
  if (ddg.length >= count) return ddg.slice(0, count);
  // Fallback: Wikipedia + Commons
  const out = [...ddg];
  const wiki = await fetchWikipediaImage(eng);
  if (wiki) out.push(wiki);
  const commons = await fetchCommonsImages(eng, count + 2);
  out.push(...commons);
  const seen = new Set();
  return out.filter(r => { if (seen.has(r.url)) return false; seen.add(r.url); return true; }).slice(0, count);
}

// AI-enhance prompt for image generation (like ChatGPT does for DALL-E)
async function enhanceImagePrompt(prompt, mode = 'image') {
  const englishPrompt = await translateToEnglish(prompt);
  try {
    const sysMsg = mode === 'video'
      ? 'You are a professional cinematic prompt engineer. Take the user request and rewrite it as a detailed, vivid English video frame prompt. Add: specific subject details, dramatic lighting, composition, camera angle, atmosphere, cinematic style. Output ONLY the improved prompt, max 50 words. No preamble.'
      : 'You are a professional image prompt engineer like Midjourney/DALL-E. Take the user request and rewrite it as a detailed, vivid English photo prompt. Add: specific subject details (clothing, expression, pose), lighting (golden hour, soft, dramatic), composition (close-up, wide), camera (DSLR, lens), atmosphere, ultra-realistic photographic style. Output ONLY the improved prompt, max 60 words. No preamble.';
    const res = await fetchWithTimeout('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: sysMsg },
          { role: 'user', content: englishPrompt }
        ],
        model: 'openai-large',
        stream: false,
        private: true,
      }),
    }, 8000);
    if (res.ok) {
      const data = await res.json();
      const enhanced = (data.choices?.[0]?.message?.content || '').trim().replace(/^["']|["']$/g, '');
      if (enhanced && enhanced.length > englishPrompt.length && enhanced.length < 500) return enhanced;
    }
  } catch {}
  return englishPrompt;
}

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
  const { width = 1024, height = 1024, seed = Math.floor(Math.random() * 1e6), model = 'flux', suffix = QUALITY_SUFFIX } = opts;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + (suffix || ''))}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=${model}&enhance=true`;
}

// Loremflickr returned generic random photos for unmatched tags - unreliable.
// Use Pollinations flux-realism with extreme photorealistic prompt for accurate, real-looking photos.
function buildRealPhotoUrl(query, opts = {}) {
  return buildImageUrl(query, { ...opts, model: 'flux-realism' });
}

function attachAutoRetry(imgEl, prompt, opts = {}) {
  const maxRetries = opts.maxRetries || 12;
  const width = opts.width || 1024;
  const height = opts.height || 1024;
  const suffix = opts.suffix !== undefined ? opts.suffix : QUALITY_SUFFIX;
  // Real Pollinations models, prioritized by quality
  const models = ['flux', 'flux-realism', 'flux', 'flux-realism', 'turbo', 'flux', 'flux-realism', 'flux', 'turbo', 'flux', 'flux-realism', 'flux'];
  let retries = 0;
  const onError = () => {
    if (retries >= maxRetries) {
      setTimeout(onError, 5000);
      retries = 0;
      return;
    }
    retries++;
    const newSeed = Math.floor(Math.random() * 1e6);
    const model = models[retries % models.length];
    const url = buildImageUrl(prompt, { width, height, seed: newSeed, model, suffix });
    setTimeout(() => { imgEl.src = url; }, 400);
  };
  imgEl.addEventListener('error', onError);
}

const VIDEO_PATTERNS = [
  /^\s*(?:תיצור|תייצר|ייצר|תכין|תפיק)\s+(?:לי\s+)?(?:[֐-׿]+\s+)?(?:סרטון|וידאו|אנימציה|קליפ)\s+(?:[֐-׿]+\s+)?(?:של|עם|בה)?\s*(.+)/i,
  /^\s*(?:סרטון|וידאו|אנימציה|קליפ)\s+(?:[֐-׿]+\s+)?של\s+(.+)/i,
  /^\s*(?:תן\s+לי|הראה\s+לי|אני\s+רוצה|אפשר)\s+(?:[֐-׿]+\s+)?(?:סרטון|וידאו|אנימציה|קליפ)\s+(?:[֐-׿]+\s+)?(?:של|עם)?\s*(.+)/i,
  /^\s*(?:generate|create|make|render)\s+(?:a\s+|some\s+)?(?:video|movie|clip|animation)s?\s+(?:of\s+)?(.+)/i,
];

function detectVideoRequest(text) {
  const t = text.trim();
  for (const re of VIDEO_PATTERNS) {
    const m = t.match(re);
    if (m && m[1] && m[1].trim().length > 0) {
      return m[1].trim().replace(/^(?:של|of)\s+/i, '').replace(/[?!.,]+$/, '').trim();
    }
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
  els.topbarTitle.textContent = `Astra AI · ${t('cat_' + state.category)}`;
  // Update subtitle to category-specific question
  const subtitle = document.querySelector('.subtitle');
  if (subtitle) {
    const askKey = 'ask' + state.category.charAt(0).toUpperCase() + state.category.slice(1);
    subtitle.textContent = t(askKey);
  }
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
        { label: '🗑️ מחק שיחה זו', action: () => deleteConversation(c.id), danger: true },
        { label: '🗑️ מחק את כל הפרוייקטים', action: deleteAllConversations, danger: true },
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

function deleteAllConversations() {
  if (!state.conversations.length) {
    showToast('אין שיחות למחוק');
    return;
  }
  const count = state.conversations.length;
  if (!confirm(`למחוק את כל ${count} השיחות? לא ניתן לבטל.`)) return;
  state.conversations = [];
  state.activeId = null;
  persist();
  renderHistory();
  renderMessages();
  showToast(`${count} שיחות נמחקו ✓`);
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
      // Try real photos from Wikipedia/Commons first
      const realImgs = await searchRealImages(knowSubject, 6);
      let images;
      if (realImgs.length >= 3) {
        // Mostly real - fill with extra real or AI
        images = realImgs.slice(0, 6).map(r => ({ url: r.url, caption: knowSubject }));
        if (images.length < 6) {
          const enhancedSubject = await enhanceImagePrompt(knowSubject, 'image');
          const baseSeed = Math.floor(Math.random() * 1e6);
          while (images.length < 6) {
            images.push({
              url: buildImageUrl(enhancedSubject, { width: 768, height: 768, seed: baseSeed + images.length * 13, model: 'flux', suffix: '' }),
              caption: knowSubject,
            });
          }
        }
      } else {
        const enhancedSubject = await enhanceImagePrompt(knowSubject, 'image');
        const baseSeed = Math.floor(Math.random() * 1e6);
        images = Array.from({ length: 6 }, (_, i) => ({
          url: buildImageUrl(enhancedSubject, { width: 768, height: 768, seed: baseSeed + i * 13, model: 'flux', suffix: '' }),
          caption: knowSubject,
        }));
        // Prepend any real images we found
        realImgs.forEach((r, i) => { images[i] = { url: r.url, caption: knowSubject }; });
      }
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
      const enhancedPrompt = await enhanceImagePrompt(videoPrompt, 'video');
      const baseSeed = Math.floor(Math.random() * 1e6);
      const frames = [];
      for (let i = 0; i < 8; i++) {
        frames.push(buildImageUrl(enhancedPrompt, { width: 1024, height: 1024, seed: baseSeed + i * 11, model: 'flux', suffix: '' }));
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
      // Try real photo first (Wikipedia + Commons)
      const real = await searchRealImages(imagePrompt, 1);
      let url;
      if (real.length > 0) {
        url = real[0].url;
      } else {
        const enhancedPrompt = await enhanceImagePrompt(imagePrompt, 'image');
        const seed = Math.floor(Math.random() * 1e6);
        url = buildImageUrl(enhancedPrompt, { seed, model: 'flux', suffix: '' });
      }
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
  applyLanguage();
  renderCategories();
  renderSuggestions();
  renderHistory();
  closeSettings();
  showToast('ההגדרות נשמרו ✓');
  renderMessages();
}

function toggleSidebar() { els.app.classList.toggle('sidebar-open'); }
function closeSidebarMobile() {
  if (window.innerWidth <= 820) els.app.classList.remove('sidebar-open');
}

const clearHistBtn = document.getElementById('clearHistoryBtn');
if (clearHistBtn) clearHistBtn.addEventListener('click', deleteAllConversations);

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

// Continuous voice conversation mode (like ChatGPT voice)
const voiceModeBtn = document.getElementById('voiceModeBtn');
let voiceMode = false;
let voiceRecog = null;

function setVoiceState(s) {
  const orb = document.getElementById('voiceOrb');
  const status = document.getElementById('voiceStatus');
  if (orb) {
    orb.classList.remove('listening', 'thinking', 'speaking');
    if (s) orb.classList.add(s);
  }
  if (status) {
    const labels = { listening: 'מקשיב...', thinking: 'חושב...', speaking: 'מדבר...' };
    status.textContent = labels[s] || 'דבר אליי';
  }
}

function stopVoiceMode() {
  voiceMode = false;
  if (voiceModeBtn) voiceModeBtn.classList.remove('active');
  if (voiceRecog) { try { voiceRecog.abort(); } catch {} voiceRecog = null; }
  if (window.speechSynthesis) speechSynthesis.cancel();
  document.querySelectorAll('.speak-btn.active').forEach(b => b.classList.remove('active'));
  const ov = document.getElementById('voiceOverlay');
  if (ov) ov.hidden = true;
}

function speakAndWait(text) {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window) || !text) return resolve();
    const clean = text
      .replace(/^__(IMG|VID|GRID)__.*$/s, '')
      .replace(/[*_`#~]+/g, '')
      .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();
    if (!clean) return resolve();
    const u = new SpeechSynthesisUtterance(clean);
    if (/[א-ת]/.test(clean)) u.lang = 'he-IL';
    else if (/[ا-ي]/.test(clean)) u.lang = 'ar-SA';
    else if (/[а-яА-Я]/.test(clean)) u.lang = 'ru-RU';
    else u.lang = 'en-US';
    u.rate = 1.0;
    u.onend = resolve;
    u.onerror = resolve;
    speechSynthesis.speak(u);
  });
}

function startVoiceListening() {
  if (!voiceMode) return;
  setVoiceState('listening');
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;
  try {
    voiceRecog = new SR();
    voiceRecog.lang = 'he-IL';
    voiceRecog.continuous = false;
    voiceRecog.interimResults = false;
    voiceRecog.onresult = async (e) => {
      const text = e.results[0][0].transcript.trim();
      if (!text || !voiceMode) return;
      setVoiceState('thinking');
      els.input.value = text;
      autoResize();
      updateSendButton();
      await sendMessage();
      if (!voiceMode) return;
      const conv = getActive();
      const lastMsg = conv?.messages[conv.messages.length - 1];
      if (lastMsg && lastMsg.role === 'assistant' && voiceMode) {
        setVoiceState('speaking');
        await speakAndWait(lastMsg.content);
      }
      if (voiceMode) setTimeout(startVoiceListening, 400);
    };
    voiceRecog.onerror = (e) => {
      if (voiceMode && e.error !== 'aborted') setTimeout(startVoiceListening, 800);
    };
    voiceRecog.onend = () => { voiceRecog = null; };
    voiceRecog.start();
  } catch {
    if (voiceMode) setTimeout(startVoiceListening, 800);
  }
}

if (voiceModeBtn) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR || !('speechSynthesis' in window)) {
    voiceModeBtn.style.display = 'none';
  } else {
    voiceModeBtn.addEventListener('click', async () => {
      if (voiceMode) {
        stopVoiceMode();
      } else {
        voiceMode = true;
        voiceModeBtn.classList.add('active');
        const ov = document.getElementById('voiceOverlay');
        if (ov) ov.hidden = false;
        setVoiceState('speaking');
        await speakAndWait('שלום, אני מקשיב.');
        if (voiceMode) startVoiceListening();
      }
    });
    const voiceExitBtn = document.getElementById('voiceExit');
    if (voiceExitBtn) voiceExitBtn.addEventListener('click', stopVoiceMode);
  }
}

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
applyLanguage();
renderCategories();
renderSuggestions();
renderHistory();
renderMessages();
updateSendButton();
showSplash();
showTutorialIfFirstVisit();
