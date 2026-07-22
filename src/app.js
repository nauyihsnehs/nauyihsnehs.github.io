const root = document.documentElement;
const app = document.querySelector("#app");
const systemMode = matchMedia("(prefers-color-scheme: dark)");
const hoverPointer = matchMedia("(hover: hover) and (pointer: fine)");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const layeredResearchTransitions = Boolean(
  document.startViewTransition &&
    CSS.supports("view-transition-class: research-shell"),
);
const i18n = JSON.parse(document.querySelector("#i18n").textContent);
const defaults = new WeakMap();
const timers = new WeakMap();
const researchScrollTimers = new WeakMap();
const researchTargets = new WeakMap();
const researchViewTransitions = new WeakMap();
const researchPendingTargets = new WeakMap();
const researchJumps = new WeakSet();
const selectableCard =
  ".publication-item, .education-item, .project-item";
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
    .querySelectorAll("[data-research-carousel]")
    .forEach((carousel) => updateResearchStatus(carousel));
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

const updateResourceView = () => {
  const views = [...app.querySelectorAll("[data-resource-view]")];
  if (!views.length) return;
  const requested = location.hash.slice(1);
  const active =
    views.find(({ dataset }) => dataset.resourceView === requested) ?? views[0];
  views.forEach((view) => (view.hidden = view !== active));
  app.querySelectorAll("[data-resource-view-link]").forEach((link) => {
    if (link.dataset.resourceViewLink === active.dataset.resourceView) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const cyclePortrait = (portrait) => {
  const sources = JSON.parse(portrait.dataset.portraitSources);
  const index = (Number(portrait.dataset.portraitIndex) + 1) % sources.length;
  portrait.dataset.portraitIndex = String(index);
  portrait.querySelector("[data-portrait-image]").src = sources[index];
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

const researchCards = (carousel) => [
  ...carousel.querySelectorAll("[data-research-card]"),
];

const researchSlides = (carousel) => [
  ...carousel.querySelectorAll("[data-research-index]"),
];

const researchRealSlide = (carousel, index) =>
  carousel.querySelector(
    `[data-research-card][data-research-index="${index}"]`,
  );

const researchScrollLimit = (viewport) =>
  Math.max(0, viewport.scrollWidth - viewport.clientWidth);

const researchSnapPosition = (viewport, card) =>
  Math.min(
    researchScrollLimit(viewport),
    Math.max(
      0,
      card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2,
    ),
  );

const researchNavigationIndex = (carousel) =>
  researchPendingTargets.get(carousel) ??
  researchTargets.get(carousel)?.index ??
  Number(carousel.dataset.researchCurrent);

const researchClosestSlide = (viewport) => {
  const carousel = viewport.closest("[data-research-carousel]");
  let closest;
  let distance = Infinity;
  researchSlides(carousel).forEach((slide) => {
    const nextDistance = Math.abs(
      researchSnapPosition(viewport, slide) - viewport.scrollLeft,
    );
    if (nextDistance >= distance) return;
    closest = slide;
    distance = nextDistance;
  });
  return closest;
};

const setResearchProgress = (carousel, index) => {
  const active = carousel.querySelector("[data-research-progress-active]");
  const next = carousel.querySelector(
    `[data-research-progress-index="${index}"]`,
  );
  if (active === next) return;
  active?.removeAttribute("data-research-progress-active");
  active?.setAttribute("aria-pressed", "false");
  if (!next) return;
  next.dataset.researchProgressActive = "true";
  next.setAttribute("aria-pressed", "true");
};

const setResearchPreviews = (carousel, index) => {
  const count = researchCards(carousel).length;
  if (count < 2) return;
  const focused = document.activeElement.closest?.("[data-research-preview]");
  const adjacent = {
    "-1": (index - 1 + count) % count,
    "1": (index + 1) % count,
  };
  carousel.querySelectorAll("[data-research-preview]").forEach((preview) => {
    const visible = Number(preview.dataset.researchPreviewIndex) ===
      adjacent[preview.dataset.researchDirection];
    if (preview.hidden === !visible) return;
    preview.hidden = !visible;
    if (visible) {
      preview.dataset.researchPreviewActive = "true";
    } else {
      preview.removeAttribute("data-research-preview-active");
    }
  });
  if (!focused?.hidden) return;
  carousel
    .querySelector(
      `[data-research-direction="${focused.dataset.researchDirection}"]` +
        "[data-research-preview-active]",
    )
    ?.focus({ preventScroll: true });
};

const setResearchMotionDirection = (carousel, target) => {
  const active = carousel.querySelector("[data-research-active]");
  if (!active || active === target) return 0;
  const viewport = carousel.querySelector("[data-research-viewport]");
  const direction = Math.sign(
    researchSnapPosition(viewport, target) -
      researchSnapPosition(viewport, active),
  );
  direction && (carousel.dataset.researchMotionDirection = String(direction));
  return direction;
};

const setResearchActiveSlide = (carousel, active) => {
  const current = carousel.querySelector("[data-research-active]");
  if (current !== active) {
    current?.removeAttribute("data-research-active");
    active && (active.dataset.researchActive = "true");
  }
  active && setResearchProgress(carousel, Number(active.dataset.researchIndex));
};

const clearResearchSync = (viewport) => {
  const timer = researchScrollTimers.get(viewport);
  timer && clearTimeout(timer);
  researchScrollTimers.delete(viewport);
};

const scrollResearchTo = (viewport, slide, instant) => {
  const left = researchSnapPosition(viewport, slide);
  if (!instant) {
    viewport.scrollTo({ left, behavior: "smooth" });
    return;
  }
  researchJumps.add(viewport);
  viewport.style.scrollBehavior = "auto";
  viewport.scrollTo({ left });
  viewport.style.removeProperty("scroll-behavior");
  requestAnimationFrame(() =>
    requestAnimationFrame(() => researchJumps.delete(viewport)),
  );
};

const updateResearchStatus = (carousel) => {
  const index = Number(carousel.dataset.researchCurrent);
  const cards = researchCards(carousel);
  carousel.querySelectorAll("[data-research-direction]").forEach((button) => {
    button.disabled = cards.length < 2;
  });
  carousel.querySelector("[data-research-status]").textContent =
    cards[index].querySelector("h3").textContent;
};

const updateResearchState = (carousel, index, slide = researchRealSlide(carousel, index)) => {
  carousel.dataset.researchCurrent = String(index);
  setResearchActiveSlide(carousel, slide);
  setResearchPreviews(carousel, index);
  updateResearchStatus(carousel);
};

const releaseResearchJump = (carousel) =>
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      carousel.removeAttribute("data-research-jumping"),
    ),
  );

const commitResearchIndex = (carousel, index) => {
  const viewport = carousel.querySelector("[data-research-viewport]");
  const real = researchRealSlide(carousel, index);
  carousel.dataset.researchJumping = "true";
  scrollResearchTo(viewport, real, true);
  updateResearchState(carousel, index, real);
  releaseResearchJump(carousel);
};

const commitResearchSlide = (carousel, slide) => {
  const index = Number(slide.dataset.researchIndex);
  if (!slide.hasAttribute("data-research-clone")) {
    updateResearchState(carousel, index, slide);
    return;
  }
  commitResearchIndex(carousel, index);
};

const finishResearchViewTransition = (carousel, transition) => {
  if (researchViewTransitions.get(carousel) !== transition) return;
  researchViewTransitions.delete(carousel);
  carousel.removeAttribute("data-research-motion-direction");
  carousel.removeAttribute("data-research-transitioning");
  if (!document.querySelector("[data-research-transitioning]")) {
    root.removeAttribute("data-research-motion-direction");
  }
  const pending = researchPendingTargets.get(carousel);
  researchPendingTargets.delete(carousel);
  if (pending == null || pending === Number(carousel.dataset.researchCurrent)) {
    return;
  }
  showResearchSlide(carousel, pending);
};

const startResearchViewTransition = (carousel, index, direction) => {
  carousel.dataset.researchTransitioning = "true";
  root.dataset.researchMotionDirection = String(direction);
  const transition = document.startViewTransition(() => {
    const viewport = carousel.querySelector("[data-research-viewport]");
    clearResearchSync(viewport);
    researchTargets.delete(carousel);
    commitResearchIndex(carousel, index);
  });
  researchViewTransitions.set(carousel, transition);
  const finish = () => finishResearchViewTransition(carousel, transition);
  transition.finished.then(finish, finish);
};

const showResearchSlide = (carousel, requested) => {
  const cards = researchCards(carousel);
  if (cards.length < 2) return;
  const index = (requested + cards.length) % cards.length;
  if (researchViewTransitions.has(carousel)) {
    if (index === Number(carousel.dataset.researchCurrent)) {
      researchPendingTargets.delete(carousel);
    } else {
      researchPendingTargets.set(carousel, index);
    }
    return;
  }
  if (index === Number(carousel.dataset.researchCurrent)) return;
  const viewport = carousel.querySelector("[data-research-viewport]");
  const candidates = researchSlides(carousel).filter(
    (candidate) => Number(candidate.dataset.researchIndex) === index,
  );
  const nearest = candidates.reduce((closest, candidate) => {
    const distance = Math.abs(
      researchSnapPosition(viewport, candidate) - viewport.scrollLeft,
    );
    const closestDistance = Math.abs(
      researchSnapPosition(viewport, closest) - viewport.scrollLeft,
    );
    return distance < closestDistance ? candidate : closest;
  });
  const direction = setResearchMotionDirection(carousel, nearest);
  if (layeredResearchTransitions && !reducedMotion.matches) {
    startResearchViewTransition(carousel, index, direction);
    return;
  }
  const slide = reducedMotion.matches
    ? researchRealSlide(carousel, index)
    : nearest;
  const left = researchSnapPosition(viewport, slide);
  const instant =
    reducedMotion.matches || Math.abs(viewport.scrollLeft - left) < 1;
  clearResearchSync(viewport);
  researchTargets.set(carousel, { index, slide });
  setResearchActiveSlide(carousel, slide);
  setResearchPreviews(carousel, index);
  scrollResearchTo(viewport, slide, instant);
  if (!instant) return;
  researchTargets.delete(carousel);
  commitResearchSlide(carousel, slide);
};

const settleResearchSlide = (viewport) => {
  const carousel = viewport.closest("[data-research-carousel]");
  const target = researchTargets.get(carousel);
  const slide = target?.slide ?? researchClosestSlide(viewport);
  if (!target) setResearchMotionDirection(carousel, slide);
  researchTargets.delete(carousel);
  commitResearchSlide(carousel, slide);
};

const scheduleResearchSync = (viewport) => {
  clearResearchSync(viewport);
  researchScrollTimers.set(
    viewport,
    setTimeout(() => {
      settleResearchSlide(viewport);
      researchScrollTimers.delete(viewport);
    }, 140),
  );
};

const takeResearchControl = (event) => {
  const viewport = event.target.closest?.("[data-research-viewport]");
  if (!viewport) return;
  const carousel = viewport.closest("[data-research-carousel]");
  if (researchViewTransitions.has(carousel)) return;
  if (!researchTargets.has(carousel)) return;
  researchTargets.delete(carousel);
  clearResearchSync(viewport);
};

const initializeResearch = () => {
  app.querySelectorAll("[data-research-carousel]").forEach((carousel) => {
    const first = researchRealSlide(carousel, 0);
    scrollResearchTo(carousel.querySelector("[data-research-viewport]"), first, true);
    updateResearchState(carousel, 0, first);
    carousel.dataset.researchReady = "true";
  });
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
  const portrait = target.closest("[data-portrait-carousel]");
  const researchDirection = target.closest("[data-research-direction]");
  const researchPreview = target.closest("[data-research-preview-index]");
  const researchProgress = target.closest("[data-research-progress-index]");
  const media = target.closest("[data-swap-media]");

  if (settingsToggle) {
    settingsPinned = settingsOpen ? false : true;
    updateSettings(!settingsOpen);
  } else if (target.closest("[data-contact-close]")) {
    closeContact(true);
  } else if (contactButton) {
    toggleContact(contactButton);
  } else if (researchPreview) {
    showResearchSlide(
      researchPreview.closest("[data-research-carousel]"),
      Number(researchPreview.dataset.researchPreviewIndex),
    );
  } else if (researchDirection) {
    const carousel = researchDirection.closest("[data-research-carousel]");
    showResearchSlide(
      carousel,
      researchNavigationIndex(carousel) +
        Number(researchDirection.dataset.researchDirection),
    );
  } else if (researchProgress) {
    const carousel = researchProgress.closest("[data-research-carousel]");
    showResearchSlide(
      carousel,
      Number(researchProgress.dataset.researchProgressIndex),
    );
  } else if (portrait) {
    cyclePortrait(portrait);
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
  if (settings && !settings.contains(event.relatedTarget) && hoverPointer.matches) {
    entered ? updateSettings(true) : !settingsPinned && updateSettings(false);
  }
  if (media && !media.contains(event.relatedTarget) && hoverPointer.matches) {
    const allowed = media.dataset.motion !== "true" || !reducedMotion.matches;
    entered && allowed
      ? setMediaActive(media, true)
      : media.dataset.pinned !== "true" && setMediaActive(media, false);
  }
};

app.addEventListener("pointerover", (event) => pointerState(event, true));
app.addEventListener("pointerout", (event) => pointerState(event, false));
app.addEventListener("pointerdown", takeResearchControl);
app.addEventListener("wheel", takeResearchControl, { passive: true });
app.addEventListener(
  "scroll",
  (event) => {
    const viewport = event.target.closest?.("[data-research-viewport]");
    if (!viewport || researchJumps.has(viewport)) return;
    scheduleResearchSync(viewport);
  },
  { capture: true, passive: true },
);
app.addEventListener("focusin", (event) => {
  const settings = event.target.closest("[data-settings]");
  const media = event.target.closest("[data-swap-media]");
  settings && updateSettings(true);
  if (media) {
    const allowed = media.dataset.motion !== "true" || !reducedMotion.matches;
    allowed && setMediaActive(media, true);
  }
});
app.addEventListener("focusout", (event) => {
  const settings = event.target.closest("[data-settings]");
  const media = event.target.closest("[data-swap-media]");
  if (settings && !settings.contains(event.relatedTarget) && !settingsPinned) {
    updateSettings(false);
  }
  if (media && !media.contains(event.relatedTarget) && media.dataset.pinned !== "true") {
    setMediaActive(media, false);
  }
});
app.addEventListener("keydown", (event) => {
  const carousel = event.target.closest("[data-research-carousel]");
  if (carousel && ["ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.preventDefault();
    const direction = event.key === "ArrowLeft" ? -1 : 1;
    showResearchSlide(
      carousel,
      researchNavigationIndex(carousel) + direction,
    );
    return;
  }
  if (!["Enter", " "].includes(event.key)) return;
  const portrait = event.target.closest("[data-portrait-carousel]");
  const media = event.target.closest("[data-swap-media]");
  if (!portrait && !media) return;
  event.preventDefault();
  portrait ? cyclePortrait(portrait) : activateMedia(media);
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
  if (!event.target.closest("[data-swap-media]")) resetMedia();
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const restoreSettings = settingsOpen && !contactTrigger;
  closeContact(true);
  resetMedia();
  settingsPinned = false;
  updateSettings(false);
  restoreSettings && app.querySelector("[data-settings-toggle]").focus();
});
systemMode.addEventListener("change", () => mode === "auto" && applyAppearance());
addEventListener("scroll", updateBackToTop, { passive: true });
addEventListener("hashchange", updateResourceView);

localize();
applyAppearance();
initializeResearch();
updateLanguage(language);
root.style.visibility = "";
updateResourceView();
updateBackToTop();
