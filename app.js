(() => {
  "use strict";

  const DEFAULT_SITES = [
    { id: "ardaspor", name: "ARDASPOR", url: "https://ardaspor40.top/" },
    { id: "inatbox", name: "INATBOX", url: "https://inattv1328.xyz/" },
    { id: "trgoals", name: "TRGOALS", url: "https://taraftarium1087.xyz/" },
    { id: "patronspor", name: "PATRONSPOR", url: "https://patronizle60.cfd/" },
    { id: "mahsunsports", name: "MahsunSports", url: "https://mahsunsports60.xyz/" },
    { id: "netspor", name: "NETSPOR", url: "https://netspor.co/" },
    { id: "zeustv", name: "Zeus TV", url: "https://zeustv276.live/" },
    { id: "fctv33", name: "FCTV33", url: "https://www.fctv33.com/tr" },
    { id: "extratv", name: "Extra TV", url: "https://www.extrabet2112.com/tr/int/sport/TV" },
    { id: "liveball", name: "Liveball", url: "https://liveball.sx/" },
    { id: "ardaspor-giris", name: "Arda Spor Giriş", url: "https://ardaspor.live/", quick: true },
    { id: "inatbox-giris", name: "Inatbox Giriş", url: "https://inattvgiris.co/", quick: true },
    { id: "patronspor-giris", name: "PatronSpor Giriş", url: "https://patronspor.is/", quick: true },
    { id: "trgoal-giris", name: "TrGoal Giriş", url: "https://taraftarium24.io/", quick: true },
    { id: "mahsunsports-giris", name: "MahsunSports Giriş", url: "https://mahsunsports.com/", quick: true }
  ];


  const I18N = {
    en: {
      links: "Links", updateLinks: "Update links", linksChecking: "Checking for new links…",
      linksText: "Sites change addresses often. Kickoff checks the link list published with this app and updates matching sites for you. Sites you added yourself are never changed.",
      linksUpToDate: "Your links are up to date.", linksUpdated: "Links updated: {n}", linksFailed: "Couldn’t reach the link list. Try again later.",
      home: "Kickoff home", language: "Language", panelLayout: "Panel layout", auto: "Auto",
      closeAll: "Close all", settings: "Settings", addSite: "Add site", editSite: "Edit site",
      savedSites: "Your saved sites", quickAccess: "Quick access", quickAccessSites: "Quick access sites",
      close: "Close", siteName: "Site name", siteNamePh: "My football site", siteUrl: "Website address",
      addToQuick: "Add to Quick access", delete: "Delete", cancel: "Cancel", saveSite: "Save site",
      siteList: "Site list",
      siteListText: "Save a backup of your Kickoff site list or add sites from a JSON file. Your list and layout are stored in this browser.",
      exportSites: "Export sites", importSites: "Import sites", browserLimits: "Browser limits",
      browserLimitsText: "Some websites block being shown inside another page. Use the open-in-new-tab button on that panel if it stays blank. Browser rules also prevent this page from changing another site's video volume or reliably checking whether its links are online.",
      optionsFor: "Options for {name}", addressFor: "Address for {name}",
      cantDisplay: "Can’t display this site here",
      cantDisplayText: "Some websites prevent being embedded in another page. Open it in a separate tab to continue.",
      openNewTab: "Open site in new tab", reload: "Reload {name}", openIn: "Open {name} in a new tab",
      fullscreen: "Fullscreen {name}", closeSite: "Close {name}",
      chooseSite: "Choose a site", addFirst: "Add your first site",
      chooseText: "Select a saved site above or use Quick access. Open several panels to arrange your arena.",
      addFirstText: "Add a name and website address to get started.",
      closePanel: "Close panel", openPanel: "Open panel",
      removeQuick: "Remove from Quick access", addQuick: "Add to Quick access",
      openTab: "Open in new tab", deleteSite: "Delete site",
      confirmDelete: "Delete {name} from your saved sites?",
      quickAddBtn: "+ Add site", quickAddTitle: "Add a site to Quick access",
      quickEmpty: "Nothing here yet. Use a site’s options menu to add it.",
      imported: "Site list imported.", badFile: "That file isn’t a valid Kickoff sites list."
    },
    tr: {
      links: "Bağlantılar", updateLinks: "Bağlantıları güncelle", linksChecking: "Yeni bağlantılar kontrol ediliyor…",
      linksText: "Sitelerin adresleri sık sık değişir. Kickoff, bu uygulamayla yayınlanan bağlantı listesini kontrol eder ve eşleşen siteleri sizin için günceller. Kendi eklediğiniz siteler asla değiştirilmez.",
      linksUpToDate: "Bağlantılarınız güncel.", linksUpdated: "Güncellenen bağlantılar: {n}", linksFailed: "Bağlantı listesine ulaşılamadı. Daha sonra tekrar deneyin.",
      home: "Kickoff ana sayfa", language: "Dil", panelLayout: "Panel düzeni", auto: "Otomatik",
      closeAll: "Tümünü kapat", settings: "Ayarlar", addSite: "Site ekle", editSite: "Siteyi düzenle",
      savedSites: "Kayıtlı siteleriniz", quickAccess: "Hızlı erişim", quickAccessSites: "Hızlı erişim siteleri",
      close: "Kapat", siteName: "Site adı", siteNamePh: "Futbol sitem", siteUrl: "Web adresi",
      addToQuick: "Hızlı erişime ekle", delete: "Sil", cancel: "İptal", saveSite: "Siteyi kaydet",
      siteList: "Site listesi",
      siteListText: "Kickoff site listenizin yedeğini kaydedin veya bir JSON dosyasından site ekleyin. Listeniz ve düzeniniz bu tarayıcıda saklanır.",
      exportSites: "Siteleri dışa aktar", importSites: "Siteleri içe aktar", browserLimits: "Tarayıcı sınırlamaları",
      browserLimitsText: "Bazı web siteleri başka bir sayfanın içinde gösterilmeyi engeller. Panel boş kalırsa o paneldeki yeni sekmede aç düğmesini kullanın. Tarayıcı kuralları ayrıca bu sayfanın başka bir sitenin video ses düzeyini değiştirmesini veya bağlantılarının çevrimiçi olup olmadığını güvenilir şekilde denetlemesini engeller.",
      optionsFor: "{name} için seçenekler", addressFor: "{name} adresi",
      cantDisplay: "Bu site burada gösterilemiyor",
      cantDisplayText: "Bazı web siteleri başka bir sayfaya gömülmeyi engeller. Devam etmek için ayrı bir sekmede açın.",
      openNewTab: "Siteyi yeni sekmede aç", reload: "{name} sitesini yeniden yükle", openIn: "{name} sitesini yeni sekmede aç",
      fullscreen: "{name} tam ekran", closeSite: "{name} sitesini kapat",
      chooseSite: "Bir site seçin", addFirst: "İlk sitenizi ekleyin",
      chooseText: "Yukarıdan kayıtlı bir site seçin veya Hızlı erişimi kullanın. Arenanızı düzenlemek için birkaç panel açın.",
      addFirstText: "Başlamak için bir ad ve web adresi ekleyin.",
      closePanel: "Paneli kapat", openPanel: "Paneli aç",
      removeQuick: "Hızlı erişimden kaldır", addQuick: "Hızlı erişime ekle",
      openTab: "Yeni sekmede aç", deleteSite: "Siteyi sil",
      confirmDelete: "{name} kayıtlı sitelerinizden silinsin mi?",
      quickAddBtn: "+ Site ekle", quickAddTitle: "Hızlı erişime site ekle",
      quickEmpty: "Burada henüz bir şey yok. Eklemek için sitenin seçenekler menüsünü kullanın.",
      imported: "Site listesi içe aktarıldı.", badFile: "Bu dosya geçerli bir Kickoff site listesi değil."
    }
  };
  let lang = "en";
  try { const saved = localStorage.getItem("fa.web.lang"); if (saved && I18N[saved]) lang = saved; } catch {}
  const t = (key, vars) => {
    let text = I18N[lang][key] ?? I18N.en[key] ?? key;
    for (const name in vars) text = text.split("{" + name + "}").join(vars[name]);
    return text;
  };
  // Translatable elements carry data-i18n-* attributes, so switching language
  // updates them in place without rebuilding panels (which would reload the iframes).
  const applyOne = el => {
    const vars = el.dataset.i18nVars ? JSON.parse(el.dataset.i18nVars) : undefined;
    if (el.dataset.i18nText) el.textContent = t(el.dataset.i18nText, vars);
    if (el.dataset.i18nTitle) el.title = t(el.dataset.i18nTitle, vars);
    if (el.dataset.i18nAriaLabel) el.setAttribute("aria-label", t(el.dataset.i18nAriaLabel, vars));
    if (el.dataset.i18nPlaceholder) el.placeholder = t(el.dataset.i18nPlaceholder, vars);
  };
  const applyI18n = (root = document) => {
    if (root !== document) applyOne(root);
    root.querySelectorAll("[data-i18n-text],[data-i18n-title],[data-i18n-aria-label],[data-i18n-placeholder]").forEach(applyOne);
  };
  const tag = (el, spec, vars) => {
    if (spec.text) el.dataset.i18nText = spec.text;
    if (spec.title) el.dataset.i18nTitle = spec.title;
    if (spec.aria) el.dataset.i18nAriaLabel = spec.aria;
    if (vars) el.dataset.i18nVars = JSON.stringify(vars);
    applyOne(el);
    return el;
  };
  function setLang(next) {
    if (!I18N[next]) return;
    lang = next;
    try { localStorage.setItem("fa.web.lang", next); } catch {}
    document.documentElement.lang = next;
    document.querySelectorAll("#lang button").forEach(item => item.setAttribute("aria-pressed", String(item.dataset.lang === next)));
    applyI18n();
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const uid = () => "site-" + Math.random().toString(36).slice(2, 10);
  const validUrl = (value) => {
    try {
      const parsed = new URL(value.trim());
      return ["https:", "http:"].includes(parsed.protocol) ? parsed.href : "";
    } catch { return ""; }
  };
  const read = (key, fallback) => {
    try { const value = JSON.parse(localStorage.getItem("fa.web." + key)); return value ?? fallback; }
    catch { return fallback; }
  };
  let sites = read("sites", null);
  if (!Array.isArray(sites)) sites = DEFAULT_SITES.map(site => ({ ...site }));
  sites = sites.filter(site => site && site.name && validUrl(site.url)).map(site => ({ ...site, url: validUrl(site.url), id: site.id || uid() }));
  let dismissed = read("dismissed", []);
  if (!Array.isArray(dismissed)) dismissed = [];
  let layout = Number(read("layout", 0)) || 0;
  let open = read("open", []);
  if (!Array.isArray(open)) open = [];
  open = open.filter(id => sites.some(site => site.id === id));
  const $sites = $("#sites");
  const $stage = $("#stage");
  const $menuRoot = $("#menuRoot");
  let editingId = null;

  function save() {
    localStorage.setItem("fa.web.sites", JSON.stringify(sites));
    localStorage.setItem("fa.web.layout", JSON.stringify(layout));
    localStorage.setItem("fa.web.open", JSON.stringify(open));
    localStorage.setItem("fa.web.dismissed", JSON.stringify(dismissed));
  }

  function removeSite(id) {
    sites = sites.filter(item => item.id !== id);
    open = open.filter(item => item !== id);
    if (!dismissed.includes(id)) dismissed.push(id);
  }

  function avatar(name) {
    const node = document.createElement("span");
    node.className = "avatar";
    node.style.setProperty("--h", String([...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360));
    node.textContent = name.trim().slice(0, 1).toUpperCase();
    return node;
  }

  function button(label, className, titleKey, vars, action) {
    const node = document.createElement("button");
    node.type = "button";
    node.className = className;
    node.textContent = label;
    tag(node, { title: titleKey, aria: titleKey }, vars);
    node.addEventListener("click", action);
    return node;
  }

  function siteChip(site) {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.dataset.id = site.id;
    chip.draggable = true;
    if (open.includes(site.id)) chip.setAttribute("aria-current", "true");
    const go = document.createElement("button");
    go.type = "button";
    go.className = "go";
    go.append(avatar(site.name), document.createTextNode(site.name));
    go.addEventListener("click", () => togglePane(site.id));
    const more = button("⋮", "more", "optionsFor", { name: site.name }, event => {
      event.stopPropagation(); showMenu(more, site);
    });
    chip.append(go, more);
    chip.addEventListener("dragstart", event => {
      chip.classList.add("drag");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", site.id);
    });
    chip.addEventListener("dragend", () => chip.classList.remove("drag"));
    chip.addEventListener("dragover", event => event.preventDefault());
    chip.addEventListener("drop", event => {
      event.preventDefault();
      const draggedId = event.dataTransfer.getData("text/plain");
      if (draggedId && draggedId !== site.id) {
        const from = sites.findIndex(item => item.id === draggedId);
        const to = sites.findIndex(item => item.id === site.id);
        const [moved] = sites.splice(from, 1);
        sites.splice(to, 0, moved);
        render();
      }
    });
    return chip;
  }

  function renderSites() {
    $sites.replaceChildren();
    $sites.className = "site-list";
    sites.filter(site => !site.quick).forEach(site => $sites.append(siteChip(site)));
    $("#quickCount").textContent = String(sites.filter(site => site.quick).length);
    $("#quickBtn").classList.toggle("has-open", sites.some(site => site.quick && open.includes(site.id)));
  }

  function makePane(site) {
    const pane = document.createElement("section");
    pane.className = "pane";
    pane.dataset.id = site.id;
    const bar = document.createElement("div");
    bar.className = "bar";
    const title = document.createElement("b");
    title.textContent = site.name;
    const address = document.createElement("input");
    address.type = "text";
    address.value = site.url;
    tag(address, { aria: "addressFor" }, { name: site.name });
    address.spellcheck = false;
    address.addEventListener("focus", () => address.select());
    address.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        const url = validUrl(address.value);
        if (url) {
          address.value = url;
          site.url = url;
          frame.src = url;
          save();
        }
        address.blur();
      } else if (event.key === "Escape") address.value = site.url;
    });
    const frameWrap = document.createElement("div");
    frameWrap.className = "frame-wrap";
    const frame = document.createElement("iframe");
    frame.title = site.name;
    frame.allow = "autoplay; fullscreen; encrypted-media; picture-in-picture";
    frame.allowFullscreen = true;
    frame.referrerPolicy = "no-referrer";
    frame.src = site.url;
    const error = document.createElement("div");
    error.className = "frame-error";
    const errorBox = document.createElement("div");
    errorBox.append(tag(document.createElement("h3"), { text: "cantDisplay" }), tag(document.createElement("p"), { text: "cantDisplayText" }));
    error.append(errorBox);
    const launch = document.createElement("button");
    launch.type = "button";
    launch.className = "primary";
    tag(launch, { text: "openNewTab" });
    launch.addEventListener("click", () => window.open(site.url, "_blank", "noopener,noreferrer"));
    error.firstElementChild.append(launch);
    // Browsers do not expose cross-origin frame errors consistently. Keep a visible fallback in the pane toolbar.
    const reload = button("↻", "", "reload", { name: site.name }, () => { error.classList.remove("show"); frame.src = address.value; });
    const external = button("↗", "", "openIn", { name: site.name }, () => window.open(validUrl(address.value) || site.url, "_blank", "noopener,noreferrer"));
    const fullscreen = button("⛶", "", "fullscreen", { name: site.name }, () => pane.requestFullscreen?.());
    const close = button("×", "", "closeSite", { name: site.name }, () => togglePane(site.id));
    bar.append(title, address, reload, external, fullscreen, close);
    frameWrap.append(frame, error);
    pane.append(bar, frameWrap);
    return pane;
  }

  function renderStage() {
    $stage.replaceChildren();
    const active = open.map(id => sites.find(site => site.id === id)).filter(Boolean);
    if (!active.length) {
      const empty = document.createElement("div");
      empty.className = "empty";
      const heading = document.createElement("h2");
      tag(heading, { text: sites.length ? "chooseSite" : "addFirst" });
      const text = document.createElement("p");
      tag(text, { text: sites.length ? "chooseText" : "addFirstText" });
      empty.append(heading, text);
      if (!sites.length) {
        const add = document.createElement("button");
        add.className = "primary";
        tag(add, { text: "addSite" });
        add.addEventListener("click", openAddDialog);
        empty.append(add);
      }
      $stage.append(empty);
      $stage.style.gridTemplateColumns = "1fr";
      return;
    }
    active.forEach(site => $stage.append(makePane(site)));
    const cols = layout || Math.ceil(Math.sqrt(active.length));
    $stage.style.gridTemplateColumns = `repeat(${Math.min(cols, active.length)},minmax(0,1fr))`;
  }

  function renderLayout() {
    document.querySelectorAll("#layout button").forEach(item => item.setAttribute("aria-pressed", String(Number(item.dataset.layout) === layout)));
  }

  function render() {
    save();
    renderSites();
    renderStage();
    renderLayout();
    renderQuickPanel();
  }

  function togglePane(id) {
    open = open.includes(id) ? open.filter(item => item !== id) : [...open, id];
    render();
  }

  function showMenu(anchor, site) {
    $menuRoot.replaceChildren();
    const menu = document.createElement("div");
    menu.className = "menu";
    const rect = anchor.getBoundingClientRect();
    menu.style.left = `${Math.max(8, Math.min(rect.right - 200, innerWidth - 216))}px`;
    menu.style.top = `${Math.min(rect.bottom + 5, innerHeight - 180)}px`;
    const item = (label, action) => {
      const control = document.createElement("button");
      control.type = "button";
      control.textContent = label;
      control.addEventListener("click", () => { $menuRoot.replaceChildren(); action(); });
      menu.append(control);
    };
    item(open.includes(site.id) ? t("closePanel") : t("openPanel"), () => togglePane(site.id));
    item(site.quick ? t("removeQuick") : t("addQuick"), () => {
      site.quick = !site.quick;
      if (!site.quick) delete site.quick;
      render();
    });
    item(t("editSite"), () => openEditDialog(site));
    item(t("openTab"), () => window.open(site.url, "_blank", "noopener,noreferrer"));
    item(t("deleteSite"), () => {
      if (confirm(t("confirmDelete", { name: site.name }))) {
        removeSite(site.id);
        render();
      }
    });
    $menuRoot.append(menu);
  }

  function renderQuickPanel() {
    const existing = $(".quick-panel");
    if (!$("#quickBtn").matches("[aria-expanded=true]")) { existing?.remove(); return; }
    const panel = existing || document.createElement("div");
    panel.className = "quick-panel";
    panel.setAttribute("role", "dialog");
    tag(panel, { aria: "quickAccessSites" });
    panel.replaceChildren();
    const header = document.createElement("div");
    header.className = "quick-head";
    const heading = document.createElement("h3");
    tag(heading, { text: "quickAccess" });
    const add = button("", "quick-add", "quickAddTitle", undefined, () => {
      $("#quickBtn").setAttribute("aria-expanded", "false");
      renderQuickPanel();
      openAddDialog(true);
    });
    tag(add, { text: "quickAddBtn", title: "quickAddTitle", aria: "quickAddTitle" });
    header.append(heading, add);
    panel.append(header);
    const favorites = sites.filter(site => site.quick);
    if (!favorites.length) {
      const hint = document.createElement("p");
      hint.className = "empty-hint";
      tag(hint, { text: "quickEmpty" });
      panel.append(hint);
    }
    favorites.forEach(site => {
      const row = document.createElement("div");
      row.className = "quick-row";
      const go = document.createElement("button");
      go.type = "button";
      go.className = "quick-open";
      go.append(avatar(site.name));
      const copy = document.createElement("span");
      copy.className = "quick-copy";
      const label = document.createElement("span");
      label.className = "quick-name";
      label.textContent = site.name;
      const small = document.createElement("small");
      small.textContent = site.url;
      copy.append(label, small);
      go.append(copy);
      go.addEventListener("click", () => togglePane(site.id));
      const opt = button("⋮", "more", "optionsFor", { name: site.name }, event => {
        event.stopPropagation(); showMenu(opt, site);
      });
      row.append(go, opt);
      panel.append(row);
    });
    if (!existing) document.body.append(panel);
  }

  function openAddDialog(quick = false) {
    editingId = null;
    tag($("#siteTitle"), { text: "addSite" });
    $("#siteName").value = "";
    $("#siteUrl").value = "https://";
    $("#siteQuick").checked = quick === true;
    $("#deleteSite").classList.add("hidden");
    $("#siteDialog").showModal();
    $("#siteName").focus();
  }

  function openEditDialog(site) {
    editingId = site.id;
    tag($("#siteTitle"), { text: "editSite" });
    $("#siteName").value = site.name;
    $("#siteUrl").value = site.url;
    $("#siteQuick").checked = Boolean(site.quick);
    $("#deleteSite").classList.remove("hidden");
    $("#siteDialog").showModal();
    $("#siteName").focus();
  }

  $("#siteForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = $("#siteName").value.trim();
    const url = validUrl($("#siteUrl").value);
    if (!name || !url) return;
    const existing = sites.find(site => site.id === editingId);
    const quick = $("#siteQuick").checked;
    if (existing) Object.assign(existing, { name, url, quick });
    else sites.push({ id: uid(), name, url, quick });
    $("#siteDialog").close();
    render();
  });

  $("#deleteSite").addEventListener("click", () => {
    const site = sites.find(item => item.id === editingId);
    if (site && confirm(t("confirmDelete", { name: site.name }))) {
      removeSite(editingId);
      $("#siteDialog").close();
      render();
    }
  });

  $("#lang").addEventListener("click", event => {
    const target = event.target.closest("button[data-lang]");
    if (target) setLang(target.dataset.lang);
  });
  $("#addSite").addEventListener("click", openAddDialog);
  $("#closeAll").addEventListener("click", () => { open = []; render(); });
  $("#layout").addEventListener("click", event => {
    const target = event.target.closest("button[data-layout]");
    if (target) { layout = Number(target.dataset.layout); render(); }
  });
  $("#quickBtn").addEventListener("click", () => {
    const expanded = $("#quickBtn").getAttribute("aria-expanded") === "true";
    $("#quickBtn").setAttribute("aria-expanded", String(!expanded));
    renderQuickPanel();
  });
  $("#settingsBtn").addEventListener("click", () => $("#settingsDialog").showModal());
  document.querySelectorAll("[data-close]").forEach(control => control.addEventListener("click", () => $("#" + control.dataset.close).close()));
  document.addEventListener("click", event => {
    if (!event.target.closest(".menu,.more")) $menuRoot.replaceChildren();
    if (!event.target.closest(".quick-panel,#quickBtn")) {
      $("#quickBtn").setAttribute("aria-expanded", "false");
      renderQuickPanel();
    }
  });
  document.addEventListener("keydown", event => { if (event.key === "Escape") $menuRoot.replaceChildren(); });

  $("#exportSites").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(sites.map(({ id, name, url, quick }) => quick ? { id, name, url, quick } : { id, name, url }), null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "kickoff-sites.json";
    link.click();
    URL.revokeObjectURL(link.href);
  });
  $("#importSites").addEventListener("click", () => $("#importFile").click());
  $("#importFile").addEventListener("change", async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const payload = JSON.parse(await file.text());
      const imported = Array.isArray(payload) ? payload : payload.sites;
      if (!Array.isArray(imported)) throw new Error("Expected a list of sites");
      imported.forEach(item => {
        const url = validUrl(String(item.url || ""));
        const name = String(item.name || "").trim().slice(0, 40);
        const wanted = String(item.id || "").slice(0, 60);
        const id = wanted && !sites.some(site => site.id === wanted) ? wanted : uid();
        if (url && name && !sites.some(site => site.url === url)) sites.push({ id, name, url, ...(item.quick ? { quick: true } : {}) });
      });
      render();
      tag($("#status"), { text: "imported" });
    } catch { alert(t("badFile")); }
    event.target.value = "";
  });

  // ---- Update links: sync with links.json published next to the app ----
  const LINKS_URL = "links.json";
  let lastLinksCheck = 0;
  let toastTimer;
  function toast(message) {
    const node = $("#toast");
    node.textContent = message;
    node.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove("show"), 4500);
  }
  async function updateLinks({ silent = false } = {}) {
    const status = $("#linksStatus");
    const trigger = $("#updateLinks");
    if (!silent) { tag(status, { text: "linksChecking" }); trigger.disabled = true; }
    let list;
    try {
      const response = await fetch(LINKS_URL + "?t=" + Date.now(), { cache: "no-store" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const payload = await response.json();
      list = Array.isArray(payload) ? payload : payload.sites;
      if (!Array.isArray(list)) throw new Error("Expected a list of sites");
    } catch {
      if (!silent) tag(status, { text: "linksFailed" });
      trigger.disabled = false;
      return;
    }
    lastLinksCheck = Date.now();
    let count = 0;
    for (const item of list) {
      const id = String(item?.id || "").slice(0, 60);
      const url = validUrl(String(item?.url || ""));
      const name = String(item?.name || "").trim().slice(0, 40);
      if (!id || !url) continue;
      const site = sites.find(entry => entry.id === id);
      if (site) {
        // Only act when the published link changed since we last applied it,
        // so a manual edit is kept until the published list changes again.
        if (site.linkUrl !== url) {
          if (site.url !== url) { site.url = url; count++; }
          site.linkUrl = url;
        }
      } else if (name && !dismissed.includes(id)) {
        sites.push({ id, name, url, linkUrl: url, ...(item.quick ? { quick: true } : {}) });
        count++;
      }
    }
    trigger.disabled = false;
    if (count) {
      render();
      tag(status, { text: "linksUpdated" }, { n: count });
      toast(t("linksUpdated", { n: count }));
    } else {
      save();
      tag(status, { text: "linksUpToDate" });
    }
  }
  $("#updateLinks").addEventListener("click", () => updateLinks());
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && Date.now() - lastLinksCheck > 30 * 60 * 1000) updateLinks({ silent: true });
  });

  setLang(lang);
  render();
  updateLinks({ silent: true });
})();
