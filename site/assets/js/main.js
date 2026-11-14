/* Hotel Shree Shivay — site script (no dependencies). */
(function () {
  "use strict";

  var WA_NUMBER = "918827995348";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function safe(name, fn) {
    try { fn(); } catch (e) { if (window.console) console.warn("[" + name + "]", e); }
  }
  function store(key, val) {
    try {
      if (val === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, val);
    } catch (e) { return null; }
  }

  /* ------------------------------------------------------------------
     Hindi translations. English text lives in the HTML itself.
     ------------------------------------------------------------------ */
  var HI = {
    "skip": "मुख्य सामग्री पर जाएँ",
    "nav.rooms": "कमरे",
    "nav.facilities": "सुविधाएँ",
    "nav.gallery": "गैलरी",
    "nav.explore": "ओंकारेश्वर",
    "nav.reviews": "समीक्षाएँ",
    "nav.location": "लोकेशन",
    "nav.faq": "सवाल-जवाब",
    "menu.open": "मेन्यू खोलें",
    "cta.wa": "WhatsApp पर बुक करें",
    "cta.book": "अभी बुक करें",
    "cta.call": "कॉल करें 88279 95348",
    "cta.chat": "WhatsApp पर बात करें",

    "hero.place": "ओंकारेश्वर, मध्य प्रदेश",
    "hero.lead": "ममलेश्वर ज्योतिर्लिंग से सिर्फ़ 7 मिनट की पैदल दूरी पर साफ़-सुथरे, आरामदायक AC और नॉन-AC कमरे। ओंकारेश्वर दर्शन के लिए आपका शांत ठिकाना।",
    "hero.rating": "Google रेटिंग · 27 समीक्षाएँ",
    "hero.from": "कमरे",
    "hero.night": "/रात से",

    "hl.1t": "7 मिनट पैदल",
    "hl.1d": "ममलेश्वर ज्योतिर्लिंग तक",
    "hl.2t": "17 मिनट पैदल",
    "hl.2d": "ओंकारेश्वर ज्योतिर्लिंग तक",
    "hl.3t": "AC और नॉन-AC",
    "hl.3d": "हर बजट के लिए कमरे",
    "hl.4t": "फ़्री वाई-फ़ाई",
    "hl.4d": "और मेहमानों के लिए पार्किंग",

    "about.eyebrow": "स्वागत है",
    "about.title": "ओंकार की नगरी में सुकून भरा ठहराव",
    "about.p1": "ओंकारेश्वर में पवित्र नर्मदा मांधाता द्वीप के चारों ओर बहती है, जिसका आकार पवित्र ॐ जैसा है। इसी द्वीप पर बारह ज्योतिर्लिंगों में से एक विराजमान है। होटल श्री शिवाय मंदिरों और फ़ूड स्ट्रीट से कुछ ही कदम की दूरी पर है, ताकि आप सुबह जल्दी दर्शन करके साफ़, ठंडे कमरे में आराम कर सकें।",
    "about.p2": "हमारे कमरे नए हैं, जिनमें मार्बल फ़िनिश फ़र्श, गर्म कोव लाइटिंग, डिज़ाइनर हेडबोर्ड और गर्म पानी वाले अटैच्ड बाथरूम हैं। मालिक और स्टाफ़ दर्शन, नौका विहार और आसपास घूमने में आपकी मदद के लिए हमेशा तैयार रहते हैं।",
    "val.1t": "अतिथि देवो भव",
    "val.1d": "हर मेहमान का स्वागत परिवार की तरह, आदर और अपनेपन के साथ।",
    "val.2t": "साफ़ और ताज़ा",
    "val.2d": "हर मेहमान के लिए कमरे और बाथरूम की पूरी सफ़ाई और ताज़ा बिस्तर।",
    "val.3t": "साफ़ किराया",
    "val.3d": "यात्रा से पहले WhatsApp पर अपने कमरे का सही किराया जान लें।",
    "val.4t": "स्थानीय मार्गदर्शन",
    "val.4d": "दर्शन का समय, नौका विहार, परिक्रमा और घूमने की जगहों के बारे में हमसे पूछें।",

    "rooms.eyebrow": "हमारे साथ ठहरें",
    "rooms.title": "हमारे कमरे",
    "rooms.sub": "डबल बेड वाले खुले-खुले कमरे, परिवार और तीर्थयात्री समूहों के लिए बिल्कुल सही। AC या नॉन-AC, जो चाहें चुनें।",
    "rooms.photos": "कमरों की तस्वीरें",
    "rooms.from": "कमरों का किराया",
    "rooms.per": "प्रति रात से",
    "rooms.note": "किराया तारीख़, त्योहार और कमरे के प्रकार के अनुसार बदलता है। आज का किराया जानने के लिए हमें मैसेज करें।",
    "rt.ac": "AC कमरा",
    "rt.acd": "दर्शन के बाद अच्छे आराम के लिए एयर-कंडीशन्ड कमरा, गर्मी के दिनों में भी।",
    "rt.non": "नॉन-AC कमरा",
    "rt.nond": "छत के पंखे वाला किफ़ायती विकल्प, उसी अपनेपन भरी मेहमाननवाज़ी के साथ।",
    "rt.ask": "उपलब्धता जानें",
    "rooms.inside": "हमारे कमरों में",
    "in.1": "साफ़, ताज़ा बिस्तर के साथ डबल बेड",
    "in.2": "LED टीवी",
    "in.3": "गीज़र (गर्म पानी) वाला अटैच्ड बाथरूम",
    "in.4": "फ़्री वाई-फ़ाई",
    "in.5": "मार्बल फ़िनिश फ़र्श और कोव लाइटिंग",

    "book.eyebrow": "झटपट बुकिंग",
    "book.title": "WhatsApp पर उपलब्धता जानें",
    "book.sub": "अपनी तारीख़ें भरें, आपका मैसेज तैयार होकर WhatsApp में खुल जाएगा। उपलब्धता और सही किराए के साथ जल्दी जवाब मिलेगा।",
    "book.p1": "कोई बुकिंग शुल्क नहीं, कोई साइन-अप नहीं",
    "book.p2": "सीधे होटल से बात करें",
    "book.p3": "चेक-इन दोपहर 2:00 बजे से",
    "book.or": "कॉल करना चाहते हैं?",
    "f.name": "आपका नाम",
    "f.nameph": "जैसे राहुल शर्मा",
    "f.in": "चेक-इन",
    "f.out": "चेक-आउट",
    "f.guests": "मेहमान",
    "f.room": "कमरे का प्रकार",
    "f.ac": "AC",
    "f.nonac": "नॉन-AC",
    "f.any": "कोई भी / तय नहीं",
    "f.msg": "संदेश",
    "f.optional": "(वैकल्पिक)",
    "f.msgph": "पहुँचने का समय, कमरों की संख्या, कोई अन्य ज़रूरत",
    "f.send": "WhatsApp पर भेजें",

    "fac.eyebrow": "सुविधाएँ",
    "fac.title": "सुकून भरी यात्रा के लिए हर ज़रूरी सुविधा",
    "fac.1": "AC कमरे",
    "fac.2": "नॉन-AC कमरे",
    "fac.3": "फ़्री वाई-फ़ाई",
    "fac.4": "पार्किंग",
    "fac.5": "गर्म पानी (गीज़र)",
    "fac.6": "अटैच्ड बाथरूम",
    "fac.7": "LED टीवी",
    "fac.8": "दर्शन और घूमने में मदद",
    "fac.9": "मंदिर पैदल दूरी पर",
    "fac.10": "चेक-इन दोपहर 2:00 बजे से",

    "tour.eyebrow": "वीडियो टूर",
    "tour.title": "हमारे कमरों की एक झलक",
    "tour.sub": "होटल में शूट किए गए असली वीडियो। चलाने या रोकने के लिए वीडियो पर टैप करें।",

    "gal.eyebrow": "गैलरी",
    "gal.title": "होटल देखें",
    "gal.filter": "तस्वीरें छाँटें",
    "gal.all": "सभी",
    "gal.rooms": "कमरे",
    "gal.bath": "बाथरूम",
    "gal.hotel": "होटल और प्रवेश",

    "exp.eyebrow": "ओंकारेश्वर घूमें",
    "exp.title": "दर्शन और बहुत कुछ, आपके कमरे के पास",
    "exp.sub": "पैदल दूरी का समय Google Maps के अनुसार है। अपनी यात्रा के दिन दर्शन का सबसे अच्छा समय हमसे पूछें।",
    "exp.1m": "550 मी · 7 मिनट पैदल",
    "exp.1t": "श्री ममलेश्वर ज्योतिर्लिंग",
    "exp.1d": "नर्मदा के दक्षिणी तट पर स्थित प्राचीन मंदिर। पूर्ण दर्शन के लिए श्रद्धालु ममलेश्वर और ओंकारेश्वर दोनों के दर्शन करते हैं।",
    "exp.2m": "900 मी · 17 मिनट पैदल",
    "exp.2t": "श्री ओंकारेश्वर ज्योतिर्लिंग",
    "exp.2d": "भगवान शिव के बारह ज्योतिर्लिंगों में से एक, नर्मदा के बीच मांधाता द्वीप पर।",
    "exp.3m": "नदी पर",
    "exp.3t": "नर्मदा घाट और नौका विहार",
    "exp.3d": "घाटों पर पवित्र स्नान करें, माँ नर्मदा में नौका विहार का आनंद लें और संध्या आरती में शामिल हों।",
    "exp.4m": "लगभग 7 किमी",
    "exp.4t": "ॐ परिक्रमा",
    "exp.4d": "मांधाता द्वीप की पवित्र परिक्रमा, रास्ते में मंदिरों और नदी के सुंदर नज़ारों के साथ।",
    "exp.5m": "मांधाता पर्वत",
    "exp.5t": "एकात्म धाम, स्टैच्यू ऑफ़ वननेस",
    "exp.5d": "नर्मदा को निहारती आदि शंकराचार्य की 108 फ़ुट ऊँची प्रतिमा।",
    "exp.6t": "योजना बनाने में मदद चाहिए?",
    "exp.6d": "हमारे मेहमान अक्सर बताते हैं कि मालिक के सुझावों से उनकी यात्रा आसान हो गई। बस पूछ लीजिए।",
    "exp.6b": "WhatsApp पर पूछें",

    "rev.eyebrow": "मेहमानों की राय",
    "rev.title": "हमारे मेहमान क्या कहते हैं",
    "rev.meta": "Google पर 27 समीक्षाएँ",
    "rev.all": "Google पर सभी समीक्षाएँ पढ़ें",

    "loc.eyebrow": "लोकेशन",
    "loc.title": "ओंकारेश्वर में हमें खोजें",
    "loc.d1": "श्री ममलेश्वर ज्योतिर्लिंग",
    "loc.d1v": "7 मिनट पैदल",
    "loc.d2": "श्री ओंकारेश्वर ज्योतिर्लिंग",
    "loc.d2v": "17 मिनट पैदल",
    "loc.d3": "इंदौर एयरपोर्ट (सड़क मार्ग)",
    "loc.d3v": "84 किमी · लगभग 3 घंटे",
    "loc.dir": "रास्ता देखें",
    "loc.open": "Google Maps में खोलें",

    "faq.eyebrow": "जानने योग्य बातें",
    "faq.title": "अक्सर पूछे जाने वाले सवाल",
    "faq.1q": "होटल मंदिरों से कितनी दूर है?",
    "faq.1a": "श्री ममलेश्वर ज्योतिर्लिंग लगभग 550 मीटर (7 मिनट पैदल) और श्री ओंकारेश्वर ज्योतिर्लिंग लगभग 900 मीटर (17 मिनट पैदल) की दूरी पर है। फ़ूड स्ट्रीट भी पास में है।",
    "faq.2q": "कमरे का किराया कितना है?",
    "faq.2a": "कमरे ₹2,050 प्रति रात से शुरू होते हैं। किराया आपकी तारीख़ों, त्योहार के सीज़न और AC या नॉन-AC कमरे पर निर्भर करता है। सही किराए के लिए हमें WhatsApp करें।",
    "faq.3q": "कमरा कैसे बुक करें?",
    "faq.3a": "88279 95348 पर WhatsApp करें या 88279 95348 / 62666 90461 पर कॉल करें। अपनी तारीख़ें, मेहमानों की संख्या और AC या नॉन-AC बताएँ।",
    "faq.4q": "चेक-इन का समय क्या है?",
    "faq.4a": "चेक-इन दोपहर 2:00 बजे से है। अगर आप जल्दी पहुँच रहे हैं, तो हमें मैसेज करें, हम बता देंगे कि क्या संभव है।",
    "faq.5q": "क्या पार्किंग उपलब्ध है?",
    "faq.5a": "हाँ, मेहमानों के लिए पार्किंग उपलब्ध है। बुकिंग करते समय अपने वाहन के बारे में बता दें।",
    "faq.6q": "क्या कमरों में वाई-फ़ाई और गर्म पानी है?",
    "faq.6a": "हाँ। मेहमानों के लिए वाई-फ़ाई फ़्री है, और अटैच्ड बाथरूम में गर्म पानी के लिए गीज़र है।",

    "cta.title": "ओंकारेश्वर यात्रा की योजना बना रहे हैं?",
    "cta.sub": "अभी मैसेज करें और मिनटों में अपना कमरा पक्का करें।",

    "foot.tag": "ममलेश्वर और ओंकारेश्वर ज्योतिर्लिंग के पास AC और नॉन-AC कमरे।",
    "foot.contact": "संपर्क",
    "foot.address": "पता",
    "foot.links": "देखें",
    "bar.call": "कॉल",
    "bar.dir": "रास्ता"
  };

  /* Text used by scripts (WhatsApp messages, form errors). */
  var MSG = {
    en: {
      hello: "Namaste! I would like to know about room availability at Hotel Shree Shivay, Omkareshwar.",
      plan: "Namaste! I am planning a trip to Omkareshwar and would like some help with darshan and sightseeing.",
      bookIntro: "Namaste! I would like to book a room at Hotel Shree Shivay, Omkareshwar.",
      name: "Name", checkin: "Check-in", checkout: "Check-out", guests: "Guests", room: "Room type", note: "Message",
      rooms: { "AC": "AC", "Non-AC": "Non-AC", "Any": "Any" },
      outro: "Please share availability and the rate.",
      night: function (n) { return n + (n === 1 ? " night" : " nights"); },
      errName: "Please enter your name.",
      errDates: "Please choose your check-in and check-out dates.",
      errPast: "Check-in date can't be in the past.",
      errOrder: "Check-out must be after check-in.",
      langLabel: "हिंदी में देखें",
      menuOpen: "Open menu", menuClose: "Close menu",
      locale: "en-IN"
    },
    hi: {
      hello: "नमस्ते! मुझे होटल श्री शिवाय, ओंकारेश्वर में कमरे की उपलब्धता के बारे में जानना है।",
      plan: "नमस्ते! मैं ओंकारेश्वर यात्रा की योजना बना रहा/रही हूँ। दर्शन और घूमने के बारे में जानकारी चाहिए।",
      bookIntro: "नमस्ते! मुझे होटल श्री शिवाय, ओंकारेश्वर में कमरा बुक करना है।",
      name: "नाम", checkin: "चेक-इन", checkout: "चेक-आउट", guests: "मेहमान", room: "कमरे का प्रकार", note: "संदेश",
      rooms: { "AC": "AC", "Non-AC": "नॉन-AC", "Any": "कोई भी" },
      outro: "कृपया उपलब्धता और किराया बताएँ।",
      night: function (n) { return n + " रात"; },
      errName: "कृपया अपना नाम लिखें।",
      errDates: "कृपया चेक-इन और चेक-आउट की तारीख़ चुनें।",
      errPast: "चेक-इन की तारीख़ बीती हुई नहीं हो सकती।",
      errOrder: "चेक-आउट की तारीख़ चेक-इन के बाद होनी चाहिए।",
      langLabel: "View in English",
      menuOpen: "मेन्यू खोलें", menuClose: "मेन्यू बंद करें",
      locale: "hi-IN"
    }
  };

  var lang = "en";
  function t() { return MSG[lang]; }

  function waLink(text) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  }

  function updateWaLinks() {
    $$("[data-wa]").forEach(function (a) {
      var kind = a.getAttribute("data-wa-text") || "hello";
      a.href = waLink(t()[kind] || t().hello);
    });
  }

  /* ---------------- Language ---------------- */
  function applyLang(next) {
    lang = next === "hi" ? "hi" : "en";
    document.documentElement.lang = lang;

    $$("[data-i18n]").forEach(function (el) {
      if (el.dataset.en === undefined) el.dataset.en = el.textContent;
      var key = el.getAttribute("data-i18n");
      el.textContent = lang === "hi" && HI[key] ? HI[key] : el.dataset.en;
    });
    $$("[data-i18n-ph]").forEach(function (el) {
      if (el.dataset.phEn === undefined) el.dataset.phEn = el.getAttribute("placeholder") || "";
      var key = el.getAttribute("data-i18n-ph");
      el.setAttribute("placeholder", lang === "hi" && HI[key] ? HI[key] : el.dataset.phEn);
    });
    $$("[data-i18n-aria]").forEach(function (el) {
      if (el.dataset.ariaEn === undefined) el.dataset.ariaEn = el.getAttribute("aria-label") || "";
      var key = el.getAttribute("data-i18n-aria");
      el.setAttribute("aria-label", lang === "hi" && HI[key] ? HI[key] : el.dataset.ariaEn);
    });
    $$("img[data-alt-hi]").forEach(function (img) {
      if (img.dataset.altEn === undefined) img.dataset.altEn = img.getAttribute("alt") || "";
      img.setAttribute("alt", lang === "hi" ? img.dataset.altHi : img.dataset.altEn);
    });

    var toggle = $("#lang-toggle");
    if (toggle) {
      toggle.setAttribute("aria-label", t().langLabel);
      $$(".lang-opt", toggle).forEach(function (o) {
        o.classList.toggle("is-on", o.getAttribute("data-lang-opt") === lang);
      });
    }
    var menuBtn = $(".menu-btn");
    if (menuBtn) {
      menuBtn.setAttribute("aria-label", document.body.classList.contains("menu-open") ? t().menuClose : t().menuOpen);
    }
    updateWaLinks();
    updateNights();
  }

  safe("lang", function () {
    var saved = store("ss-lang");
    applyLang(saved === "hi" ? "hi" : "en");
    var toggle = $("#lang-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        applyLang(lang === "hi" ? "en" : "hi");
        store("ss-lang", lang);
      });
    }
  });

  /* ---------------- Header + mobile menu ---------------- */
  safe("header", function () {
    var header = $(".site-header");
    var menuBtn = $(".menu-btn");
    var nav = $("#site-nav");
    if (!header) return;

    // Cheap enough to run on every scroll event; no rAF gate that could stall.
    function onScroll() {
      header.classList.toggle("is-scrolled", (window.scrollY || window.pageYOffset || 0) > 40);
    }
    ["scroll", "resize", "load", "hashchange", "pageshow"].forEach(function (ev) {
      window.addEventListener(ev, onScroll, { passive: true });
    });
    onScroll();

    if (!menuBtn || !nav) return;
    function setMenu(open) {
      document.body.classList.toggle("menu-open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? t().menuClose : t().menuOpen);
      if (open) {
        var first = $("a", nav);
        if (first) first.focus({ preventScroll: true });
      }
    }
    menuBtn.addEventListener("click", function () {
      setMenu(!document.body.classList.contains("menu-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    var mq = window.matchMedia("(min-width: 1080px)");
    var closeOnDesktop = function () { if (mq.matches) setMenu(false); };
    if (mq.addEventListener) mq.addEventListener("change", closeOnDesktop);
    else if (mq.addListener) mq.addListener(closeOnDesktop);
  });

  /* Highlight the nav link of the section in view */
  safe("nav-spy", function () {
    if (!("IntersectionObserver" in window)) return;
    var links = $$(".nav-list a[href^='#']");
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = map[en.target.id];
        if (!a) return;
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-current"); });
          a.classList.add("is-current");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
  });

  /* ---------------- Hero slideshow ---------------- */
  safe("hero", function () {
    var slides = $$(".hero-slide");
    var dots = $$(".hero-dot");
    if (slides.length < 2) return;
    var i = 0, timer = null;
    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
      dots.forEach(function (d, k) {
        d.classList.toggle("is-active", k === i);
        d.setAttribute("aria-pressed", k === i ? "true" : "false");
      });
    }
    function start() {
      if (reduceMotion || timer) return;
      timer = window.setInterval(function () { show(i + 1); }, 6000);
    }
    function stop() { window.clearInterval(timer); timer = null; }
    dots.forEach(function (d, k) {
      d.addEventListener("click", function () { stop(); show(k); start(); });
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });
    start();
  });

  /* ---------------- Room photo slider ---------------- */
  safe("slider", function () {
    $$("[data-slider]").forEach(function (root) {
      var track = $(".slider-track", root);
      var slides = $$(".slide", root);
      var cur = $("[data-slider-current]", root);
      var tot = $("[data-slider-total]", root);
      if (!track || !slides.length) return;
      if (tot) tot.textContent = slides.length;
      function index() {
        var w = track.clientWidth || 1;
        return Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / w)));
      }
      function go(n) {
        var target = (n + slides.length) % slides.length;
        track.scrollTo({ left: target * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
      }
      $$(".slider-btn", root).forEach(function (b) {
        b.addEventListener("click", function () { go(index() + Number(b.getAttribute("data-dir"))); });
      });
      track.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { e.preventDefault(); go(index() + 1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(index() - 1); }
      });
      track.addEventListener("scroll", function () {
        if (cur) cur.textContent = index() + 1;
      }, { passive: true });
    });
  });

  /* ---------------- Booking form -> WhatsApp ---------------- */
  var form, fIn, fOut, nightsEl;

  function parseDate(v) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || "");
    return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
  }
  function isoDate(d) {
    var mm = String(d.getMonth() + 1), dd = String(d.getDate());
    return d.getFullYear() + "-" + (mm.length < 2 ? "0" + mm : mm) + "-" + (dd.length < 2 ? "0" + dd : dd);
  }
  function fmtDate(d) {
    try {
      return d.toLocaleDateString(t().locale, { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    } catch (e) { return isoDate(d); }
  }
  function today() { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); }
  function nightsBetween(a, b) { return Math.round((b - a) / 86400000); }

  function updateNights() {
    if (!nightsEl || !fIn || !fOut) return;
    var a = parseDate(fIn.value), b = parseDate(fOut.value);
    var n = a && b ? nightsBetween(a, b) : 0;
    nightsEl.textContent = n > 0 ? t().night(n) : "";
  }

  safe("booking", function () {
    form = $("#book-form");
    if (!form) return;
    fIn = $("#f-in"); fOut = $("#f-out"); nightsEl = $("#nights");
    var fName = $("#f-name"), fGuests = $("#f-guests"), fRoom = $("#f-room"), fMsg = $("#f-msg");
    var err = $("#form-error");

    var minIn = today();
    fIn.min = isoDate(minIn);
    fOut.min = isoDate(new Date(minIn.getFullYear(), minIn.getMonth(), minIn.getDate() + 1));

    fIn.addEventListener("change", function () {
      var a = parseDate(fIn.value);
      if (a) {
        var next = new Date(a.getFullYear(), a.getMonth(), a.getDate() + 1);
        fOut.min = isoDate(next);
        var b = parseDate(fOut.value);
        if (!b || b <= a) fOut.value = isoDate(next);
      }
      fIn.removeAttribute("aria-invalid");
      updateNights();
    });
    fOut.addEventListener("change", function () { fOut.removeAttribute("aria-invalid"); updateNights(); });
    fName.addEventListener("input", function () { fName.removeAttribute("aria-invalid"); });

    // "Check availability" links on the room cards pre-select the room type.
    $$("[data-room]").forEach(function (a) {
      a.addEventListener("click", function () {
        fRoom.value = a.getAttribute("data-room");
      });
    });

    function fail(msg, field) {
      err.textContent = msg;
      err.hidden = false;
      if (field) { field.setAttribute("aria-invalid", "true"); field.focus(); }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      err.hidden = true;
      var name = (fName.value || "").trim();
      var a = parseDate(fIn.value), b = parseDate(fOut.value);
      if (!name) return fail(t().errName, fName);
      if (!a) return fail(t().errDates, fIn);
      if (!b) return fail(t().errDates, fOut);
      if (a < today()) return fail(t().errPast, fIn);
      if (b <= a) return fail(t().errOrder, fOut);

      var m = t();
      var lines = [
        m.bookIntro,
        "",
        m.name + ": " + name,
        m.checkin + ": " + fmtDate(a),
        m.checkout + ": " + fmtDate(b) + " (" + m.night(nightsBetween(a, b)) + ")",
        m.guests + ": " + fGuests.value,
        m.room + ": " + (m.rooms[fRoom.value] || fRoom.value)
      ];
      var note = (fMsg.value || "").trim();
      if (note) lines.push(m.note + ": " + note);
      lines.push("", m.outro);

      var url = waLink(lines.join("\n"));
      // (passing "noopener" makes window.open return null, so detach manually)
      var win = window.open(url, "_blank");
      if (win) { try { win.opener = null; } catch (x) { /* ignore */ } }
      else window.location.href = url;
    });

    updateNights();
  });

  /* ---------------- Gallery filter + lightbox ---------------- */
  safe("gallery", function () {
    var grid = $("#g-grid");
    if (!grid) return;
    var items = $$(".g-item", grid);
    var filters = $$(".filter");

    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter");
        filters.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        items.forEach(function (it) {
          it.hidden = !(f === "all" || it.getAttribute("data-cat") === f);
        });
      });
    });

    var lb = $("#lightbox");
    if (!lb) return;
    var img = $(".lb-img", lb), cap = $(".lb-cap", lb);
    var btnClose = $(".lb-close", lb), btnPrev = $(".lb-prev", lb), btnNext = $(".lb-next", lb);
    var list = [], pos = 0, opener = null, scrollY = 0;

    function visibleButtons() {
      return items.filter(function (it) { return !it.hidden; }).map(function (it) { return $(".g-btn", it); });
    }
    function render() {
      var b = list[pos];
      if (!b) return;
      var thumb = $("img", b);
      img.src = b.getAttribute("data-full");
      img.alt = thumb ? thumb.alt : "";
      cap.textContent = (thumb ? thumb.alt : "") + "  ·  " + (pos + 1) + " / " + list.length;
      var many = list.length > 1;
      btnPrev.hidden = !many; btnNext.hidden = !many;
    }
    function open(btn) {
      list = visibleButtons();
      pos = Math.max(0, list.indexOf(btn));
      opener = btn;
      scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      lb.hidden = false;
      render();
      btnClose.focus();
    }
    function close() {
      lb.hidden = true;
      img.removeAttribute("src");
      document.body.style.overflow = "";
      if (opener) opener.focus({ preventScroll: true });
      if (Math.abs(window.scrollY - scrollY) > 2) window.scrollTo(0, scrollY);
    }
    function step(d) { if (list.length) { pos = (pos + d + list.length) % list.length; render(); } }

    grid.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest(".g-btn");
      if (b) open(b);
    });
    btnClose.addEventListener("click", close);
    btnPrev.addEventListener("click", function () { step(-1); });
    btnNext.addEventListener("click", function () { step(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });

    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        var f = [btnClose, btnPrev, btnNext].filter(function (x) { return !x.hidden; });
        var idx = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(idx + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });

    // Swipe left/right on touch screens
    var sx = null, sy = null;
    lb.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) return;
      sx = e.touches[0].clientX; sy = e.touches[0].clientY;
    }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      sx = sy = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
    }, { passive: true });
  });

  /* ---------------- Video tour ---------------- */
  safe("videos", function () {
    var cards = $$(".tour-card");
    var saveData = navigator.connection && navigator.connection.saveData;
    var autoplay = !reduceMotion && !saveData && "IntersectionObserver" in window;

    function play(card) {
      var v = $("video", card);
      var p = v.play();
      card.classList.add("is-playing");
      if (p && p.catch) p.catch(function () { card.classList.remove("is-playing"); });
    }
    function pause(card) {
      $("video", card).pause();
      card.classList.remove("is-playing");
    }

    cards.forEach(function (card) {
      var v = $("video", card), btn = $(".tour-play", card);
      if (!v || !btn) return;
      btn.addEventListener("click", function () {
        if (v.paused) {
          card.dataset.userPaused = "";
          cards.forEach(function (c) { if (c !== card) pause(c); });
          play(card);
        } else {
          card.dataset.userPaused = "1";
          pause(card);
        }
      });
      v.addEventListener("pause", function () { card.classList.remove("is-playing"); });
      v.addEventListener("playing", function () { card.classList.add("is-playing"); });
    });

    if (!autoplay) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var card = en.target;
        if (en.isIntersecting && en.intersectionRatio >= 0.6) {
          if (!card.dataset.userPaused) play(card);
        } else {
          pause(card);
        }
      });
    }, { threshold: [0, 0.6] });
    cards.forEach(function (c) { io.observe(c); });
  });

  /* ---------------- Reveal on scroll ---------------- */
  safe("reveal", function () {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
    // Printing should never show hidden content.
    window.addEventListener("beforeprint", function () { els.forEach(function (el) { el.classList.add("is-in"); }); });
  });

  safe("year", function () {
    var y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
