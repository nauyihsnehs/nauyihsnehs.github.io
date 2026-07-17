const root = document.documentElement;
const app = document.querySelector("#app");
const systemMode = matchMedia("(prefers-color-scheme: dark)");
const hoverPointer = matchMedia("(hover: hover) and (pointer: fine)");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const i18n = JSON.parse(document.querySelector("#i18n").textContent);
const defaults = new WeakMap();
const timers = new WeakMap();
const selectableCard =
  ".research-card, .publication-item, .education-item, .project-item";
const storage = {
  get: (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      return;
    }
  },
};

const languageIds = i18n.languages.map(({ id }) => id);
const themes = [...app.querySelectorAll("[data-theme]")].map(
  ({ dataset }) => dataset.theme,
);
const modes = [...app.querySelectorAll("[data-mode]")].map(
  ({ dataset }) => dataset.mode,
);
let language = languageIds.includes(storage.get("academic-language"))
  ? storage.get("academic-language")
  : i18n.defaultLanguage;
let theme = themes.includes(storage.get("academic-theme"))
  ? storage.get("academic-theme")
  : root.dataset.theme;
let mode = modes.includes(storage.get("academic-color-mode"))
  ? storage.get("academic-color-mode")
  : root.dataset.mode;
let settingsOpen = false;
let settingsPinned = false;
let contactTrigger;
let activeResearch;
let backToTopVisible = false;

const localize = (scope = document) => {
  const nodes = [
    ...(scope.matches?.("[data-i]") ? [scope] : []),
    ...scope.querySelectorAll("[data-i]"),
  ];
  for (const node of nodes) {
    const attribute = node.dataset.ia;
    if (!defaults.has(node)) {
      defaults.set(
        node,
        attribute ? node.getAttribute(attribute) : node.textContent,
      );
    }
    const value =
      language === i18n.alternateLanguage
        ? i18n.translations[node.dataset.i]
        : defaults.get(node);
    attribute ? node.setAttribute(attribute, value) : (node.textContent = value);
    if (attribute === "aria-label" && node.hasAttribute("title")) {
      node.title = value;
    }
  }
  for (const link of scope.querySelectorAll("[data-email-i]")) {
    defaults.has(link) || defaults.set(link, link.title);
    const label =
      language === i18n.alternateLanguage
        ? i18n.translations[link.dataset.emailI]
        : defaults.get(link);
    link.title = label;
    link.setAttribute("aria-label", `${label}: ${link.dataset.email}`);
  }
  const replacement = i18n.labels.replaceLink[language];
  scope
    .querySelectorAll("[data-empty-link]")
    .forEach((node) => (node.title = replacement));
  scope.querySelectorAll("[data-empty-label]").forEach((node) => {
    node.title = `${node.dataset.emptyLabel}: ${replacement}`;
  });
};

const locale = () =>
  i18n.languages.find(({ id }) => id === language).locale;

const updateBuildTime = () => {
  const time = app.querySelector("[data-build-time]");
  time.textContent = new Intl.DateTimeFormat(locale(), {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(time.dateTime));
};

const updateMetadata = () => {
  const title = i18n.labels.title[language];
  const description = i18n.labels.description[language];
  document.title = title;
  document.querySelector('meta[name="description"]').content = description;
  document.querySelector('meta[property="og:title"]').content = title;
  document.querySelector('meta[property="og:description"]').content = description;
};

const updateLanguage = (next) => {
  language = next;
  root.lang = i18n.languages.find(({ id }) => id === language).htmlLang;
  localize();
  app
    .querySelectorAll("[data-language]")
    .forEach((button) =>
      button.setAttribute("aria-pressed", String(button.dataset.language === language)),
    );
  const alternate = app.querySelector("[data-name-alternate]");
  if (alternate) {
    const alternateLanguage = language === "zh" ? "en" : "zh";
    alternate.lang = alternateLanguage === "zh" ? "zh-CN" : "en";
    alternate.textContent =
      language === "zh"
        ? `（${alternate.dataset.enName}）`
        : `(${alternate.dataset.zhName})`;
  }
  updateBuildTime();
  updateMetadata();
  updateSettingsLabel();
};

const resolvedMode = () =>
  mode === "auto" ? (systemMode.matches ? "dark" : "light") : mode;

const applyAppearance = () => {
  root.dataset.theme = theme;
  root.dataset.mode = mode;
  root.dataset.resolvedMode = resolvedMode();
  app
    .querySelectorAll(".theme-option")
    .forEach((button) =>
      button.setAttribute("aria-pressed", String(button.dataset.theme === theme)),
    );
  app
    .querySelectorAll(".mode-option")
    .forEach((button) =>
      button.setAttribute("aria-pressed", String(button.dataset.mode === mode)),
    );
  document.querySelector('meta[name="theme-color"]').content = getComputedStyle(
    root,
  )
    .getPropertyValue("--canvas")
    .trim();
};

const label = (name) => {
  return i18n.labels[name][language];
};

const updateSettingsLabel = () => {
  const toggle = app.querySelector("[data-settings-toggle]");
  toggle.setAttribute(
    "aria-label",
    label(settingsOpen ? "closeSettings" : "settings"),
  );
};

const updateSettings = (open) => {
  if (settingsOpen === open) return;
  settingsOpen = open;
  const settings = app.querySelector("[data-settings]");
  settings.dataset.open = String(open);
  settings.dataset.pinned = String(settingsPinned);
  app
    .querySelector("[data-settings-toggle]")
    .setAttribute("aria-expanded", String(open));
  updateSettingsLabel();
};

const closeContact = (restoreFocus = false) => {
  const popover = app.querySelector("[data-contact-popover]");
  if (!popover) return;
  popover.remove();
  app
    .querySelectorAll("[data-qr-contact]")
    .forEach((button) => button.setAttribute("aria-expanded", "false"));
  restoreFocus && contactTrigger?.focus();
  contactTrigger = null;
};

const toggleContact = (button) => {
  const open =
    app.querySelector("[data-contact-popover]") &&
    contactTrigger?.dataset.qrContact === button.dataset.qrContact;
  closeContact();
  if (open) return;
  contactTrigger = button;
  const template = app.querySelector(
    `[data-contact-template="${button.dataset.qrContact}"]`,
  );
  const popover = template.content.firstElementChild.cloneNode(true);
  button.closest("[data-contact-anchor]").append(popover);
  button.setAttribute("aria-expanded", "true");
  localize(popover);
};

const updateBackToTop = () => {
  const visible = scrollY > innerHeight * 0.75;
  if (visible === backToTopVisible) return;
  backToTopVisible = visible;
  app.querySelector("[data-back-to-top]").dataset.visible = String(visible);
};

const stopMotion = (media) => {
  const image = media.querySelector("[data-motion-image]");
  const video = media.querySelector("[data-motion-video]");
  const timer = timers.get(media);
  timer && clearTimeout(timer);
  timers.delete(media);
  if (image?.src) {
    timers.set(
      media,
      setTimeout(() => {
        if (media.dataset.active !== "true") image.removeAttribute("src");
        timers.delete(media);
      }, 180),
    );
  }
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
};

const setMediaActive = (media, active) => {
  if ((media.dataset.failed === "true" && active) ||
      media.dataset.active === String(active)) return;
  media.dataset.active = String(active);
  media.setAttribute("aria-pressed", String(active));
  if (!active) {
    stopMotion(media);
    return;
  }
  const timer = timers.get(media);
  timer && clearTimeout(timer);
  timers.delete(media);
  const image = media.querySelector("[data-motion-image]");
  const video = media.querySelector("[data-motion-video]");
  image && (image.src = image.dataset.src);
  if (video && !video.src) {
    video.src = video.dataset.src;
    video.load();
  }
  video?.play().catch(() => {});
};

const resetMedia = (except) => {
  app
    .querySelectorAll(
      '[data-swap-media][data-active="true"],[data-swap-media][data-pinned="true"]',
    )
    .forEach((media) => {
      if (media === except) return;
      media.dataset.pinned = "false";
      setMediaActive(media, false);
    });
};

const activateMedia = (media) => {
  resetMedia(media);
  if (media.dataset.motion !== "true") {
    const active = media.dataset.pinned !== "true";
    media.dataset.pinned = String(active);
    setMediaActive(media, active);
    return;
  }
  media.dataset.pinned = String(!hoverPointer.matches);
  const image = media.querySelector("[data-motion-image]");
  const video = media.querySelector("[data-motion-video]");
  if (media.dataset.active !== "true") {
    setMediaActive(media, true);
  } else if (image) {
    image.removeAttribute("src");
    void image.offsetWidth;
    image.src = image.dataset.src;
  } else if (video) {
    video.currentTime = 0;
    video.play().catch(() => {});
  }
};

const revealResearch = (card, revealed) => {
  card.dataset.revealed = String(revealed);
  card.setAttribute("aria-expanded", String(revealed));
};

const resetResearch = (except) => {
  app
    .querySelectorAll(
      '[data-research-card][data-pinned="true"],[data-research-card][data-revealed="true"]',
    )
    .forEach((card) => {
      if (card === except) return;
      card.dataset.pinned = "false";
      revealResearch(card, false);
    });
  if (!except || activeResearch !== except) activeResearch = null;
};

const activateResearch = (card) => {
  if (card.dataset.pinned === "true") return;
  resetResearch(card);
  card.dataset.pinned = "true";
  activeResearch = card;
  revealResearch(card, true);
};

const hasSelection = (target) => {
  const selection = getSelection();
  return Boolean(
    target.closest(selectableCard) && selection && !selection.isCollapsed,
  );
};

app.addEventListener("click", (event) => {
  if (hasSelection(event.target)) {
    event.preventDefault();
    return;
  }
  const target = event.target;
  const settingsToggle = target.closest("[data-settings-toggle]");
  const contactButton = target.closest("[data-qr-contact]");
  const languageButton = target.closest("[data-language]");
  const themeButton = target.closest(".theme-option");
  const modeButton = target.closest(".mode-option");
  const media = target.closest("[data-swap-media]");
  const research = target.closest("[data-research-card]");

  if (settingsToggle) {
    settingsPinned = settingsOpen ? false : true;
    updateSettings(!settingsOpen);
  } else if (target.closest("[data-contact-close]")) {
    closeContact(true);
  } else if (contactButton) {
    toggleContact(contactButton);
  } else if (research) {
    !hoverPointer.matches && activateResearch(research);
  } else if (media) {
    activateMedia(media);
  } else if (languageButton) {
    closeContact();
    storage.set("academic-language", languageButton.dataset.language);
    updateLanguage(languageButton.dataset.language);
  } else if (themeButton) {
    theme = themeButton.dataset.theme;
    storage.set("academic-theme", theme);
    applyAppearance();
  } else if (modeButton) {
    mode = modeButton.dataset.mode;
    storage.set("academic-color-mode", mode);
    applyAppearance();
  }
});

const pointerState = (event, entered) => {
  const target = event.target;
  const settings = target.closest("[data-settings]");
  const media = target.closest("[data-swap-media]");
  const research = target.closest("[data-research-card]");
  if (settings && !settings.contains(event.relatedTarget) && hoverPointer.matches) {
    entered ? updateSettings(true) : !settingsPinned && updateSettings(false);
  }
  if (media && !media.contains(event.relatedTarget) && hoverPointer.matches) {
    const allowed = media.dataset.motion !== "true" || !reducedMotion.matches;
    entered && allowed
      ? setMediaActive(media, true)
      : media.dataset.pinned !== "true" && setMediaActive(media, false);
  }
  if (research && !research.contains(event.relatedTarget) && hoverPointer.matches) {
    if (entered) {
      resetResearch(research);
      revealResearch(research, true);
    } else {
      research.dataset.pinned = "false";
      revealResearch(research, false);
      research.blur();
    }
  }
};

app.addEventListener("pointerover", (event) => pointerState(event, true));
app.addEventListener("pointerout", (event) => pointerState(event, false));
app.addEventListener("focusin", (event) => {
  const settings = event.target.closest("[data-settings]");
  const media = event.target.closest("[data-swap-media]");
  const research = event.target.closest("[data-research-card]");
  settings && updateSettings(true);
  if (research) {
    resetResearch(research);
    revealResearch(research, true);
  }
  if (media) {
    const allowed = media.dataset.motion !== "true" || !reducedMotion.matches;
    allowed && setMediaActive(media, true);
  }
});
app.addEventListener("focusout", (event) => {
  const settings = event.target.closest("[data-settings]");
  const media = event.target.closest("[data-swap-media]");
  const research = event.target.closest("[data-research-card]");
  if (settings && !settings.contains(event.relatedTarget) && !settingsPinned) {
    updateSettings(false);
  }
  if (media && !media.contains(event.relatedTarget) && media.dataset.pinned !== "true") {
    setMediaActive(media, false);
  }
  if (research && !research.contains(event.relatedTarget) &&
      research.dataset.pinned !== "true") revealResearch(research, false);
});
app.addEventListener("keydown", (event) => {
  if (!["Enter", " "].includes(event.key)) return;
  const media = event.target.closest("[data-swap-media]");
  const research = event.target.closest("[data-research-card]");
  if (!media && !research) return;
  event.preventDefault();
  media ? activateMedia(media) : activateResearch(research);
});
app.addEventListener(
  "error",
  (event) => {
    const media = event.target.closest("[data-swap-media]");
    if (!media || event.target.classList.contains("media-primary")) return;
    media.dataset.failed = "true";
    media.dataset.pinned = "false";
    setMediaActive(media, false);
    event.target.removeAttribute("src");
  },
  true,
);

document.addEventListener("click", (event) => {
  const selection = getSelection();
  if (selection && !selection.isCollapsed) return;
  if (settingsOpen && !event.target.closest("[data-settings]")) {
    settingsPinned = false;
    updateSettings(false);
  }
  if (!event.target.closest("[data-contact-anchor]")) closeContact(true);
  if (activeResearch && !event.target.closest("[data-research-card]")) {
    resetResearch();
  }
  if (!event.target.closest("[data-swap-media]")) resetMedia();
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const restoreSettings = settingsOpen && !contactTrigger;
  closeContact(true);
  resetResearch();
  resetMedia();
  settingsPinned = false;
  updateSettings(false);
  restoreSettings && app.querySelector("[data-settings-toggle]").focus();
});
systemMode.addEventListener("change", () => mode === "auto" && applyAppearance());
addEventListener("scroll", updateBackToTop, { passive: true });

localize();
applyAppearance();
updateLanguage(language);
root.style.visibility = "";
updateBackToTop();
