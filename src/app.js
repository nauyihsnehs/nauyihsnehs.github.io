import "@fontsource/libertinus-serif/latin-400.css";
import "@fontsource/libertinus-serif/latin-ext-400.css";
import "@fontsource/libertinus-serif/latin-400-italic.css";
import "@fontsource/libertinus-serif/latin-ext-400-italic.css";
import "@fontsource/libertinus-serif/latin-600.css";
import "@fontsource/libertinus-serif/latin-ext-600.css";
import "@fontsource/libertinus-sans/latin-400.css";
import "@fontsource/libertinus-sans/latin-ext-400.css";
import "./styles.css";
import { content } from "./content.js";

const root = document.documentElement;
const app = document.querySelector("#app");
const skipLink = document.querySelector("#skip-link");
const description = document.querySelector('meta[name="description"]');
const themeColor = document.querySelector('meta[name="theme-color"]');
const systemMode = window.matchMedia("(prefers-color-scheme: dark)");
const hoverPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const savedLanguage = localStorage.getItem("academic-language");
const savedTheme = localStorage.getItem("academic-theme");
const savedMode = localStorage.getItem("academic-color-mode");
const themeNames = ["white", "claude", "linkedin", "spotify", "youtube", "twitch"];

let language = ["en", "zh"].includes(savedLanguage) ? savedLanguage : "en";
let theme = themeNames.includes(savedTheme) ? savedTheme : "white";
let mode = ["auto", "light", "dark"].includes(savedMode) ? savedMode : "auto";
let settingsOpen = false;
let settingsPinned = false;
let backToTopVisible = false;

const buildTime = new Date(import.meta.env.VITE_BUILD_TIME);

const pick = (value) =>
  typeof value === "string" ? value : (value[language] ?? value.en);

const resolvedMode = () =>
  mode === "auto" ? (systemMode.matches ? "dark" : "light") : mode;

const arrow = `
  <svg aria-hidden="true" viewBox="0 0 16 16">
    <path d="M3 13 13 3M6 3h7v7" />
  </svg>
`;

const gear = `
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5.4" />
    <circle cx="12" cy="12" r="2.2" />
    <path d="M12 2.5v4.1M12 17.4v4.1M2.5 12h4.1M17.4 12h4.1M5.28 5.28l2.9 2.9M15.82 15.82l2.9 2.9M18.72 5.28l-2.9 2.9M8.18 15.82l-2.9 2.9" />
  </svg>
`;

const upArrow = `
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="m6.5 14.5 5.5-5.5 5.5 5.5" />
  </svg>
`;

const paperTheme = `
  <svg class="theme-logo theme-logo--paper" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M6 3.5h9l3 3v14H6Z" />
    <path d="M15 3.5v3h3" />
  </svg>
`;

const claudeTheme = `
  <svg class="theme-logo theme-logo--claude" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M12 2.5v19M2.5 12h19M5.3 5.3l13.4 13.4M18.7 5.3 5.3 18.7" />
  </svg>
`;

const linkedinTheme = `
  <svg class="theme-logo theme-logo--linkedin" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M6 17 12 7l6 10M8.4 13h7.2" />
    <circle cx="6" cy="17" r="1.6" /><circle cx="12" cy="7" r="1.6" /><circle cx="18" cy="17" r="1.6" />
  </svg>
`;

const spotifyTheme = `
  <svg class="theme-logo theme-logo--spotify" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M4 8.5c5.4-1.7 10.8-1.3 16 .9M5.5 12.5c4.5-1.2 8.9-.8 13.2.8M7 16.2c3.5-.7 6.8-.4 10 .7" />
  </svg>
`;

const youtubeTheme = `
  <svg class="theme-logo theme-logo--youtube" aria-hidden="true" viewBox="0 0 24 24">
    <rect x="3.5" y="6" width="17" height="12" rx="3.5" />
    <path class="theme-logo-fill" d="m10 9.2 5 2.8-5 2.8Z" />
  </svg>
`;

const twitchTheme = `
  <svg class="theme-logo theme-logo--twitch" aria-hidden="true" viewBox="0 0 24 24">
    <path d="m12 3 8 6-3 9-10 3-3-9Z" />
    <path d="M9.5 10v4M14.5 9v4" />
  </svg>
`;

const autoMode = `
  <svg class="mode-logo" aria-hidden="true" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="7.5" />
    <path class="mode-logo-fill" d="M12 4.5a7.5 7.5 0 0 1 0 15Z" />
  </svg>
`;

const lightMode = `
  <svg class="mode-logo" aria-hidden="true" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
  </svg>
`;

const darkMode = `
  <svg class="mode-logo" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M19.5 15.3A8 8 0 0 1 8.7 4.5a8 8 0 1 0 10.8 10.8Z" />
  </svg>
`;

const themeOptions = [
  { value: "white", icon: paperTheme },
  { value: "claude", icon: claudeTheme },
  { value: "linkedin", icon: linkedinTheme },
  { value: "spotify", icon: spotifyTheme },
  { value: "youtube", icon: youtubeTheme },
  { value: "twitch", icon: twitchTheme },
];

const modeOptions = [
  { value: "auto", icon: autoMode },
  { value: "light", icon: lightMode },
  { value: "dark", icon: darkMode },
];

const renderProfileLinks = () =>
  content.links
    .map(
      ({ label, href }) =>
        href
          ? `<a class="text-link" href="${href}" target="_blank" rel="noreferrer">${label}${arrow}</a>`
          : `<span class="text-link text-link--empty" title="${pick(content.labels.replaceLink)}">${label}<span aria-hidden="true">＋</span></span>`,
    )
    .join("");

const renderPublicationLinks = (links) =>
  links
    .map(
      ({ label, href }) =>
        href
          ? `<a href="${href}" target="_blank" rel="noreferrer">${label}${arrow}</a>`
          : `<span title="${pick(content.labels.replaceLink)}">${label}<span aria-hidden="true">＋</span></span>`,
    )
    .join("");

const renderAuthors = (authors) =>
  authors
    .map(({ name, href }) =>
      href
        ? `<a href="${href}" target="_blank" rel="noreferrer">${name}</a>`
        : `<span>${name}</span>`,
    )
    .join(", ");

const renderEducationLogo = (item) => {
  const logo = `<img src="${item.logo}" alt="${pick(item.logoAlt)}" loading="lazy" />`;
  return item.institutionUrl
    ? `<a class="education-logo" href="${item.institutionUrl}" target="_blank" rel="noreferrer">${logo}</a>`
    : `<span class="education-logo">${logo}</span>`;
};

const renderEducation = () =>
  content.education
    .map(
      (item) => `
        <article class="education-item">
          ${renderEducationLogo(item)}
          <p class="education-period">${item.period}</p>
          <div class="education-copy">
            <h3>${pick(item.institution)}</h3>
            <p>${pick(item.degree)}</p>
            <p class="secondary">${pick(item.detail)}</p>
          </div>
        </article>
      `,
    )
    .join("");

const renderMotionMedia = (teaser) => {
  const motion = teaser.motion;
  if (!motion?.src) return "";

  return motion.type === "video"
    ? `<video class="media-alternate" data-motion-video data-src="${motion.src}" muted loop playsinline preload="none" aria-hidden="true"></video>`
    : `<img class="media-alternate" data-motion-image data-src="${motion.src}" alt="" aria-hidden="true" />`;
};

const renderTeaser = (teaser) => `
  <div
    class="swap-media teaser-media"
    data-swap-media
    data-motion="true"
    role="button"
    tabindex="0"
    aria-label="${pick(content.labels.showMotion)}"
    aria-pressed="false"
  >
    <img class="media-primary" src="${teaser.poster}" alt="${pick(teaser.alt)}" loading="lazy" />
    ${renderMotionMedia(teaser)}
  </div>
`;

const renderPublicationTitle = (publication) => {
  const title = pick(publication.title);
  return publication.titleUrl
    ? `<a href="${publication.titleUrl}" target="_blank" rel="noreferrer">${title}</a>`
    : title;
};

const renderPublications = () =>
  content.publications
    .map(
      (publication) => `
        <article class="publication-item">
          ${renderTeaser(publication.teaser)}
          <div class="publication-copy">
            <p class="publication-meta">${publication.year} · ${pick(publication.venue)} · ${pick(publication.note)}</p>
            <h3>${renderPublicationTitle(publication)}</h3>
            <p class="publication-authors">${renderAuthors(publication.authors)}</p>
            <div class="publication-links" aria-label="${pick(content.labels.publicationLinks)}">
              ${renderPublicationLinks(publication.links)}
            </div>
          </div>
        </article>
      `,
    )
    .join("");

const renderPortrait = () => `
  <div
    class="swap-media portrait-media"
    data-swap-media
    data-motion="false"
    role="button"
    tabindex="0"
    aria-label="${pick(content.labels.showAlternatePortrait)}"
    aria-pressed="false"
  >
    <img class="media-primary" src="${content.profile.portrait.primary}" alt="${pick(content.profile.portrait.alt)}" />
    <img class="media-alternate" src="${content.profile.portrait.alternate}" alt="" aria-hidden="true" />
  </div>
`;

const modeButton = (value, icon) => `
  <button
    class="mode-option"
    type="button"
    data-mode="${value}"
    aria-label="${pick(content.labels[value])}"
    title="${pick(content.labels[value])}"
    aria-pressed="${mode === value}"
  >${icon}</button>
`;

const themeButton = (value, icon) => `
  <button
    class="theme-option"
    type="button"
    data-theme="${value}"
    aria-label="${pick(content.labels[value])}"
    title="${pick(content.labels[value])}"
    aria-pressed="${theme === value}"
  >${icon}</button>
`;

const formattedBuildTime = () =>
  new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(buildTime);

const renderSettings = () => `
  <aside class="settings" data-settings data-open="${settingsOpen}" data-pinned="${settingsPinned}">
    <button
      class="settings-toggle"
      type="button"
      data-settings-toggle
      aria-label="${settingsOpen ? pick(content.labels.closeSettings) : pick(content.labels.settings)}"
      aria-expanded="${settingsOpen}"
      aria-controls="settings-panel"
    >${gear}</button>
    <div class="settings-panel" id="settings-panel" role="group" aria-label="${pick(content.labels.settings)}">
      <div class="settings-row">
        <span>${pick(content.labels.language)}</span>
        <div class="control-group">
          <button type="button" data-language="en" aria-pressed="${language === "en"}">EN</button>
          <button type="button" data-language="zh" aria-pressed="${language === "zh"}">中</button>
        </div>
      </div>
      <div class="settings-row">
        <span>${pick(content.labels.theme)}</span>
        <div class="control-group theme-group">
          ${themeOptions.map(({ value, icon }) => themeButton(value, icon)).join("")}
        </div>
      </div>
      <div class="settings-row">
        <span>${pick(content.labels.mode)}</span>
        <div class="control-group mode-group">
          ${modeOptions.map(({ value, icon }) => modeButton(value, icon)).join("")}
        </div>
      </div>
    </div>
  </aside>
`;

const renderFloatingTools = () => `
  <div class="floating-tools">
    ${renderSettings()}
    <a
      class="floating-button back-to-top"
      data-back-to-top
      data-visible="${backToTopVisible}"
      href="#main"
      aria-label="${pick(content.labels.backToTop)}"
      title="${pick(content.labels.backToTop)}"
    >${upArrow}</a>
  </div>
`;

const applyAppearance = () => {
  const activeMode = resolvedMode();
  root.dataset.theme = theme;
  root.dataset.mode = mode;
  root.dataset.resolvedMode = activeMode;
  themeColor.content = {
    "white-light": "#ffffff",
    "white-dark": "#161616",
    "claude-light": "#f1eadf",
    "claude-dark": "#25211e",
    "linkedin-light": "#f3f7fb",
    "linkedin-dark": "#101820",
    "spotify-light": "#f3f8f4",
    "spotify-dark": "#111713",
    "youtube-light": "#fff6f6",
    "youtube-dark": "#1b1112",
    "twitch-light": "#faf7ff",
    "twitch-dark": "#181323",
  }[`${theme}-${activeMode}`];
};

const render = () => {
  root.lang = language === "zh" ? "zh-CN" : "en";
  document.title = pick(content.site.title);
  description.content = pick(content.site.description);
  skipLink.textContent = pick(content.labels.skip);
  applyAppearance();

  app.innerHTML = `
    ${renderFloatingTools()}
    <main id="main" class="page-shell">
      <header class="profile-header">
        ${renderPortrait()}
        <div class="profile-copy">
          <h1>${pick(content.profile.name)}</h1>
          <p class="profile-role">${pick(content.profile.role)}</p>
          <p class="profile-introduction">${pick(content.profile.introduction)}</p>
          <div class="profile-links" aria-label="${pick(content.labels.personalLinks)}">
            ${renderProfileLinks()}
          </div>
        </div>
      </header>

      <section class="content-section" aria-labelledby="education-title">
        <h2 id="education-title">${pick(content.labels.educationTitle)}</h2>
        <div class="item-list">${renderEducation()}</div>
      </section>

      <section class="content-section" aria-labelledby="publications-title">
        <h2 id="publications-title">${pick(content.labels.publicationsTitle)}</h2>
        <div class="item-list">${renderPublications()}</div>
      </section>

      <footer>
        <span>© ${new Date().getFullYear()} ${pick(content.profile.name)}</span>
        <span>${pick(content.labels.lastUpdated)} <time datetime="${buildTime.toISOString()}">${formattedBuildTime()}</time></span>
      </footer>
    </main>
  `;
};

const updateSettings = (open) => {
  if (settingsOpen === open) return;

  settingsOpen = open;
  const settings = app.querySelector("[data-settings]");
  const toggle = app.querySelector("[data-settings-toggle]");
  if (!settings || !toggle) return;

  settings.dataset.open = String(open);
  settings.dataset.pinned = String(settingsPinned);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute(
    "aria-label",
    open ? pick(content.labels.closeSettings) : pick(content.labels.settings),
  );
};

const updateBackToTop = () => {
  const visible = window.scrollY > window.innerHeight * 0.75;
  if (visible === backToTopVisible) return;

  backToTopVisible = visible;
  const button = app.querySelector("[data-back-to-top]");
  button && (button.dataset.visible = String(visible));
};

const loadMotion = (media) => {
  const image = media.querySelector("[data-motion-image]");
  const video = media.querySelector("[data-motion-video]");

  image && !image.getAttribute("src") && image.setAttribute("src", image.dataset.src);
  if (video && !video.getAttribute("src")) {
    video.src = video.dataset.src;
    video.load();
  }
  video && void video.play().catch(() => undefined);
};

const stopMotion = (media) => {
  const image = media.querySelector("[data-motion-image]");
  const video = media.querySelector("[data-motion-video]");

  image?.removeAttribute("src");
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
};

const setMediaActive = (media, active) => {
  if (media.dataset.failed === "true" && active) return;
  if (media.dataset.active === String(active)) return;

  media.dataset.active = String(active);
  media.setAttribute("aria-pressed", String(active));
  active ? loadMotion(media) : stopMotion(media);
};

const resetMedia = (except) => {
  app
    .querySelectorAll(
      '[data-swap-media][data-active="true"], [data-swap-media][data-pinned="true"]',
    )
    .forEach((media) => {
    if (media === except) return;
    media.dataset.pinned = "false";
    setMediaActive(media, false);
    });
};

const toggleMedia = (media) => {
  const pinned = media.dataset.pinned !== "true";
  resetMedia(media);
  media.dataset.pinned = String(pinned);
  setMediaActive(media, pinned);
};

app.addEventListener("click", (event) => {
  const settingsToggle = event.target.closest("[data-settings-toggle]");
  const languageButton = event.target.closest("[data-language]");
  const themeButton = event.target.closest("[data-theme]");
  const modeButtonElement = event.target.closest("[data-mode]");
  const media = event.target.closest("[data-swap-media]");

  if (settingsToggle) {
    const closeOpenPanel = settingsOpen;
    settingsPinned = !closeOpenPanel;
    updateSettings(!closeOpenPanel);
    return;
  }

  if (media) toggleMedia(media);

  language = languageButton?.dataset.language ?? language;
  theme = themeButton?.dataset.theme ?? theme;
  mode = modeButtonElement?.dataset.mode ?? mode;

  languageButton && localStorage.setItem("academic-language", language);
  themeButton && localStorage.setItem("academic-theme", theme);
  modeButtonElement && localStorage.setItem("academic-color-mode", mode);
  (languageButton || themeButton || modeButtonElement) && render();
});

app.addEventListener("pointerover", (event) => {
  const settings = event.target.closest("[data-settings]");
  const media = event.target.closest("[data-swap-media]");

  const enteredSettings = settings && !settings.contains(event.relatedTarget);
  enteredSettings && hoverPointer.matches && updateSettings(true);
  if (media && hoverPointer.matches) {
    const motionAllowed = media.dataset.motion !== "true" || !reducedMotion.matches;
    motionAllowed && setMediaActive(media, true);
  }
});

app.addEventListener("pointerout", (event) => {
  const settings = event.target.closest("[data-settings]");
  const media = event.target.closest("[data-swap-media]");

  if (settings && !settings.contains(event.relatedTarget) && !settingsPinned) {
    updateSettings(false);
  }
  if (media && !media.contains(event.relatedTarget) && media.dataset.pinned !== "true") {
    setMediaActive(media, false);
  }
});

app.addEventListener("focusin", (event) => {
  const settings = event.target.closest("[data-settings]");
  const media = event.target.closest("[data-swap-media]");
  settings && updateSettings(true);
  if (media) {
    const motionAllowed = media.dataset.motion !== "true" || !reducedMotion.matches;
    motionAllowed && setMediaActive(media, true);
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
  const media = event.target.closest("[data-swap-media]");
  if (media && ["Enter", " "].includes(event.key)) {
    event.preventDefault();
    toggleMedia(media);
  }
});

app.addEventListener(
  "error",
  (event) => {
    const media = event.target.closest("[data-swap-media]");
    if (!media || event.target.classList.contains("media-primary")) return;
    media.dataset.failed = "true";
    media.dataset.pinned = "false";
    setMediaActive(media, false);
  },
  true,
);

document.addEventListener("click", (event) => {
  const selection = window.getSelection();
  if (selection && !selection.isCollapsed) return;

  if (settingsOpen && !event.target.closest("[data-settings]")) {
    settingsPinned = false;
    updateSettings(false);
  }
  if (!event.target.closest("[data-swap-media]")) resetMedia();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const restoreSettingsFocus = settingsOpen;
  settingsPinned = false;
  updateSettings(false);
  resetMedia();
  restoreSettingsFocus && app.querySelector("[data-settings-toggle]")?.focus();
});

systemMode.addEventListener("change", () => mode === "auto" && applyAppearance());
window.addEventListener("scroll", updateBackToTop, { passive: true });

render();
updateBackToTop();
