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
  }

  function avatar(name) {
    const node = document.createElement("span");
    node.className = "avatar";
    node.style.setProperty("--h", String([...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360));
    node.textContent = name.trim().slice(0, 1).toUpperCase();
    return node;
  }

  function button(label, className, title, action) {
    const node = document.createElement("button");
    node.type = "button";
    node.className = className;
    node.textContent = label;
    node.title = title;
    node.setAttribute("aria-label", title);
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
    const more = button("⋮", "more", "Options for " + site.name, event => {
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
    address.setAttribute("aria-label", "Address for " + site.name);
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
    error.innerHTML = "<div><h3>Can’t display this site here</h3><p>Some websites prevent being embedded in another page. Open it in a separate tab to continue.</p></div>";
    const launch = document.createElement("button");
    launch.type = "button";
    launch.className = "primary";
    launch.textContent = "Open site in new tab";
    launch.addEventListener("click", () => window.open(site.url, "_blank", "noopener,noreferrer"));
    error.firstElementChild.append(launch);
    // Browsers do not expose cross-origin frame errors consistently. Keep a visible fallback in the pane toolbar.
    const reload = button("↻", "", "Reload " + site.name, () => { error.classList.remove("show"); frame.src = address.value; });
    const external = button("↗", "", "Open " + site.name + " in a new tab", () => window.open(validUrl(address.value) || site.url, "_blank", "noopener,noreferrer"));
    const fullscreen = button("⛶", "", "Fullscreen " + site.name, () => pane.requestFullscreen?.());
    const close = button("×", "", "Close " + site.name, () => togglePane(site.id));
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
      heading.textContent = sites.length ? "Choose a site" : "Add your first site";
      const text = document.createElement("p");
      text.textContent = sites.length ? "Select a saved site above or use Quick access. Open several panels to arrange your arena." : "Add a name and website address to get started.";
      empty.append(heading, text);
      if (!sites.length) {
        const add = document.createElement("button");
        add.className = "primary";
        add.textContent = "Add site";
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
    $stage.style.gridAutoRows = "minmax(0,1fr)";
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
    item(open.includes(site.id) ? "Close panel" : "Open panel", () => togglePane(site.id));
    item(site.quick ? "Remove from Quick access" : "Add to Quick access", () => {
      site.quick = !site.quick;
      if (!site.quick) delete site.quick;
      render();
    });
    item("Edit site", () => openEditDialog(site));
    item("Open in new tab", () => window.open(site.url, "_blank", "noopener,noreferrer"));
    item("Delete site", () => {
      if (confirm(`Delete ${site.name} from your saved sites?`)) {
        sites = sites.filter(item => item.id !== site.id);
        open = open.filter(id => id !== site.id);
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
    panel.setAttribute("aria-label", "Quick access sites");
    panel.replaceChildren();
    const heading = document.createElement("h3");
    heading.textContent = "Quick access";
    panel.append(heading);
    const favorites = sites.filter(site => site.quick);
    if (!favorites.length) {
      const hint = document.createElement("p");
      hint.className = "empty-hint";
      hint.textContent = "Nothing here yet. Use a site’s options menu to add it.";
      panel.append(hint);
    }
    favorites.forEach(site => {
      const row = document.createElement("div");
      row.className = "quick-row";
      const go = document.createElement("button");
      go.type = "button";
      go.className = "quick-open";
      go.append(avatar(site.name), document.createTextNode(" "));
      const label = document.createElement("span");
      label.textContent = site.name;
      const small = document.createElement("small");
      small.textContent = site.url;
      go.append(label, small);
      go.addEventListener("click", () => togglePane(site.id));
      const opt = button("⋮", "more", "Options for " + site.name, event => {
        event.stopPropagation(); showMenu(opt, site);
      });
      row.append(go, opt);
      panel.append(row);
    });
    if (!existing) document.body.append(panel);
  }

  function openAddDialog() {
    editingId = null;
    $("#siteTitle").textContent = "Add site";
    $("#siteName").value = "";
    $("#siteUrl").value = "https://";
    $("#deleteSite").classList.add("hidden");
    $("#siteDialog").showModal();
    $("#siteName").focus();
  }

  function openEditDialog(site) {
    editingId = site.id;
    $("#siteTitle").textContent = "Edit site";
    $("#siteName").value = site.name;
    $("#siteUrl").value = site.url;
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
    if (existing) { existing.name = name; existing.url = url; }
    else sites.push({ id: uid(), name, url });
    $("#siteDialog").close();
    render();
  });

  $("#deleteSite").addEventListener("click", () => {
    const site = sites.find(item => item.id === editingId);
    if (site && confirm(`Delete ${site.name} from your saved sites?`)) {
      sites = sites.filter(item => item.id !== editingId);
      open = open.filter(id => id !== editingId);
      $("#siteDialog").close();
      render();
    }
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
    const blob = new Blob([JSON.stringify(sites.map(({ name, url, quick }) => quick ? { name, url, quick } : { name, url }), null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "football-arena-sites.json";
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
        if (url && name && !sites.some(site => site.url === url)) sites.push({ id: uid(), name, url, ...(item.quick ? { quick: true } : {}) });
      });
      render();
      $("#status").textContent = "Site list imported.";
    } catch { alert("That file isn’t a valid Football Arena sites list."); }
    event.target.value = "";
  });

  render();
})();
