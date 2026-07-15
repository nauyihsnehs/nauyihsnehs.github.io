import { content } from "./content.js";

const assetRoot = new URL(import.meta.url).pathname.includes("/src/")
  ? "./public/"
  : "./";
const asset = (path) => `${assetRoot}${path}`;
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
const themeNames = [
  "white",
  "claude",
  "linkedin",
  "spotify",
  "youtube",
  "twitch",
  "bilibili",
];

let language = ["en", "zh"].includes(savedLanguage) ? savedLanguage : "en";
let theme = themeNames.includes(savedTheme) ? savedTheme : "white";
let mode = ["auto", "light", "dark"].includes(savedMode) ? savedMode : "auto";
let settingsOpen = false;
let settingsPinned = false;
let backToTopVisible = false;
let activeContact = null;
let contactTrigger = null;
let activeResearchArea = null;
const motionUnloadTimers = new WeakMap();
const motionUnloadDelay = 180;

const buildTime = new Date(document.lastModified);

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

const educationSectionIcon = `
  <svg class="section-icon" aria-hidden="true" viewBox="0 0 24 24">
    <path d="m3 9 9-4 9 4-9 4Z" />
    <path d="M6.5 11.2v4.3c2.9 2.1 8.1 2.1 11 0v-4.3M21 9v5" />
  </svg>
`;

const publicationsSectionIcon = `
  <svg class="section-icon" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M7 3.5h10v14H7Z" />
    <path d="M4 6.5v14h10M9.5 7.5h5M9.5 10.5h5M9.5 13.5h3.5" />
  </svg>
`;

const projectsSectionIcon = `
  <svg class="section-icon" aria-hidden="true" viewBox="0 0 24 24">
    <circle cx="5" cy="12" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="19" cy="18" r="2" />
    <path d="M7 12h4c3 0 3-6 6-6M11 12c3 0 3 6 6 6" />
  </svg>
`;

const contactSectionIcon = `
  <svg class="section-icon" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M3.5 5.5h17v13h-17Z" /><path d="m4 6 8 7 8-7" />
  </svg>
`;

const researchSectionIcon = `
  <svg class="section-icon" aria-hidden="true" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="2.2" />
    <path d="M4.2 8.2c1.8-3.1 4.3-4.6 6-3.6 1.8 1 2.1 4.1.3 7.2s-4.3 4.6-6 3.6c-1.8-1-2.1-4.1-.3-7.2Z" />
    <path d="M13.5 5c3.6 0 6.1 1.6 6.1 3.7s-2.5 3.7-6.1 3.7-6.1-1.6-6.1-3.7S9.9 5 13.5 5Z" transform="rotate(60 12 12)" />
  </svg>
`;

const resourcesSectionIcon = `
  <svg class="section-icon" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M8.5 15.5 6 18a3.5 3.5 0 0 1-5-5l3-3a3.5 3.5 0 0 1 5 0" transform="translate(3 -2)" />
    <path d="m15.5 8.5 2.5-2.5a3.5 3.5 0 0 1 5 5l-3 3a3.5 3.5 0 0 1-5 0" transform="translate(-3 2)" />
    <path d="m8.5 15.5 7-7" />
  </svg>
`;

const contactIcons = {
  educationEmail: asset("icons/maildotru.svg"),
  personalEmail: asset("icons/gmail.svg"),
  scholar: asset("icons/googlescholar.svg"),
  orcid: asset("icons/orcid.svg"),
  github: asset("icons/github.svg"),
  researchgate: asset("icons/researchgate.svg"),
  qq: asset("icons/qq.svg"),
  wechat: asset("icons/wechat.svg"),
  x: asset("icons/x.svg"),
  telegram: asset("icons/telegram.svg"),
};

const renderContactIcon = (platform) =>
  `<span class="contact-icon" aria-hidden="true" style="--contact-icon: url('${contactIcons[platform]}')"></span>`;

const openaiTheme = `
  <svg class="theme-logo theme-logo--openai" aria-hidden="true" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v6M12 15v6M4.2 7.5l5.2 3M14.6 13.5l5.2 3M4.2 16.5l5.2-3M14.6 10.5l5.2-3" />
    <circle cx="12" cy="3" r="1.2" /><circle cx="12" cy="21" r="1.2" />
    <circle cx="4.2" cy="7.5" r="1.2" /><circle cx="19.8" cy="16.5" r="1.2" />
    <circle cx="4.2" cy="16.5" r="1.2" /><circle cx="19.8" cy="7.5" r="1.2" />
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

const bilibiliTheme = `
  <svg class="theme-logo theme-logo--bilibili" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M4 8.5c3-2.8 6-2.8 8 0s5 2.8 8 0M4 15.5c3-2.8 6-2.8 8 0s5 2.8 8 0" />
    <circle cx="4" cy="8.5" r="1.25" /><circle cx="20" cy="15.5" r="1.25" />
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
  { value: "white", icon: openaiTheme },
  { value: "claude", icon: claudeTheme },
  { value: "linkedin", icon: linkedinTheme },
  { value: "spotify", icon: spotifyTheme },
  { value: "youtube", icon: youtubeTheme },
  { value: "twitch", icon: twitchTheme },
  { value: "bilibili", icon: bilibiliTheme },
];

const modeOptions = [
  { value: "auto", icon: autoMode },
  { value: "light", icon: lightMode },
  { value: "dark", icon: darkMode },
];

const renderProfileName = () => {
  const primary = pick(content.profile.name);
  const alternateLanguage = language === "zh" ? "en" : "zh";
  const alternate = content.profile.name[alternateLanguage];
  const alternateName =
    alternate && alternate !== primary
      ? `<span class="profile-name-alternate" lang="${alternateLanguage === "zh" ? "zh-CN" : "en"}">${language === "zh" ? `（${alternate}）` : `(${alternate})`}</span>`
      : "";

  return `<h1><span>${primary}</span>${alternateName}</h1>`;
};

const renderEmailLinks = () =>
  content.emails
    .map(({ type, address }) => {
      const label = pick(content.labels[`${type}Email`]);
      return `
        <a class="profile-email-link" href="mailto:${address}" aria-label="${label}: ${address}" title="${label}">
          ${renderContactIcon(`${type}Email`)}
          <span>${address}</span>
        </a>
      `;
    })
    .join("");

const renderExternalIcon = ({ platform, label, href }) =>
  href
    ? `<a class="profile-icon-link" data-platform="${platform}" href="${href}" target="_blank" rel="noreferrer" aria-label="${label}" title="${label}">${renderContactIcon(platform)}</a>`
    : `<span class="profile-icon-link profile-icon-link--empty" data-platform="${platform}" role="img" aria-label="${label}" title="${label}: ${pick(content.labels.replaceLink)}">${renderContactIcon(platform)}</span>`;

const renderSocialIcon = (item) => {
  if (item.qr) {
    return `
      <span class="contact-icon-anchor" data-contact-anchor="${item.platform}">
        <button
          class="profile-icon-link"
          type="button"
          data-platform="${item.platform}"
          data-qr-contact="${item.platform}"
          aria-label="${item.label}"
          title="${item.label}"
          aria-haspopup="dialog"
          aria-controls="contact-popover-${item.platform}"
          aria-expanded="${activeContact === item.platform}"
        >${renderContactIcon(item.platform)}</button>
        ${activeContact === item.platform ? renderContactPopover(item.platform) : ""}
      </span>
    `;
  }

  return renderExternalIcon(item);
};

const renderContactPopover = (platform = activeContact) => {
  const contact = content.socialLinks.find((item) => item.platform === platform);
  if (!contact) return "";

  return `
    <div class="profile-contact-popover" id="contact-popover-${contact.platform}" data-contact-popover role="dialog" aria-modal="false" aria-labelledby="contact-popover-title-${contact.platform}">
      <button class="contact-popover-close" type="button" data-contact-close aria-label="${pick(content.labels.closeContact)}" title="${pick(content.labels.closeContact)}">×</button>
      <strong id="contact-popover-title-${contact.platform}">${contact.label}</strong>
      <img src="${contact.qr}" alt="${pick(contact.qrAlt)}" width="160" height="160" loading="lazy" />
      <span class="contact-account">${contact.account}</span>
    </div>
  `;
};

const renderContacts = () => `
  <div class="contact-panel" data-contact-area role="group" aria-label="${pick(content.labels.personalLinks)}">
    <div class="profile-email-row" role="group" aria-label="${pick(content.labels.emails)}">
      ${renderEmailLinks()}
    </div>
    <div class="profile-icon-row" role="group" aria-label="${pick(content.labels.personalLinks)}">
      ${content.academicLinks.map(renderExternalIcon).join("")}
      ${content.socialLinks.map(renderSocialIcon).join("")}
    </div>
  </div>
`;

const renderResearchAreas = () =>
  content.researchAreas
    .map((area, index) => {
      const areaId = `research-area-${index}`;
      const pinned = activeResearchArea === String(index);
      return `
        <article
          class="research-card"
          data-research-card="${index}"
          data-pinned="${pinned}"
          data-revealed="${pinned}"
          role="button"
          tabindex="0"
          aria-expanded="${pinned}"
          aria-describedby="${areaId}-description"
        >
          <div class="research-visual">
            <img src="${area.image.src}" alt="${pick(area.image.alt)}" loading="lazy" />
            <p class="research-description" id="${areaId}-description">${pick(area.description)}</p>
          </div>
          <h3>${pick(area.title)}</h3>
          <ul class="research-keywords" aria-label="${pick(area.title)}">
            ${pick(area.keywords).map((keyword) => `<li>${keyword}</li>`).join("")}
          </ul>
        </article>
      `;
    })
    .join("");

const renderResourceCategories = () =>
  content.resourceCategories
    .map(({ title, href }) => {
      const label = pick(title);
      return href
        ? `<a class="resource-card" href="${href}" target="_blank" rel="noreferrer"><span>${label}</span>${arrow}</a>`
        : `<span class="resource-card resource-card--empty" title="${pick(content.labels.replaceLink)}"><span>${label}</span><span aria-hidden="true">＋</span></span>`;
    })
    .join("");

const renderLinks = (links) =>
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

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatEducationDate = (value) => {
  const [year, month] = value.split("-");
  const monthNumber = Number.parseInt(month, 10);
  if (!year || !Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    return value;
  }

  return language === "zh"
    ? `${year}年${monthNumber}月`
    : `${monthNames[monthNumber - 1]} ${year}`;
};

const renderEducationDates = (startDate, endDate) => `
  <div class="education-dates">
    <time class="education-date" datetime="${startDate}">${formatEducationDate(startDate)}</time>
    <time class="education-date" datetime="${endDate}">${formatEducationDate(endDate)}</time>
  </div>
`;

const renderEducationHighlights = (highlights) => {
  if (!highlights?.length) return "";

  return `
    <ul class="education-highlights">
      ${highlights
        .map(({ text, href }) => {
          const label = pick(text);
          return `<li>${
            href
              ? `<a href="${href}" target="_blank" rel="noreferrer">${label}</a>`
              : `<span>${label}</span>`
          }</li>`;
        })
        .join("")}
    </ul>
  `;
};

const renderEducation = () =>
  content.education
    .map((item) => {
      const hasHighlights = Boolean(item.highlights?.length);
      return `
        <article class="education-item">
          ${renderEducationDates(item.startDate, item.endDate)}
          <div class="education-copy${hasHighlights ? "" : " education-copy--compact"}">
            ${renderEducationLogo(item)}
            <div class="education-text">
              <h3>${pick(item.institution)}</h3>
              <p>${pick(item.degree)}</p>
              <p class="secondary">${pick(item.detail)}</p>
            </div>
            ${renderEducationHighlights(item.highlights)}
          </div>
        </article>
      `;
    })
    .join("");

const renderMotionMedia = (teaser) => {
  const motion = teaser.motion;
  if (!motion?.src) return "";

  return motion.type === "video"
    ? `<video class="media-alternate" data-motion-video data-src="${motion.src}" muted loop playsinline preload="none" aria-hidden="true"></video>`
    : `<img class="media-alternate" data-motion-image data-src="${motion.src}" alt="" aria-hidden="true" />`;
};

const renderTeaser = (teaser, label) => `
  <div
    class="swap-media teaser-media"
    data-swap-media
    data-motion="true"
    role="button"
    tabindex="0"
    aria-label="${pick(label)}"
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
          ${renderTeaser(publication.teaser, content.labels.showMotion)}
          <div class="publication-copy">
            <p class="publication-meta">${publication.year} · ${pick(publication.venue)} · ${pick(publication.note)}</p>
            <h3>${renderPublicationTitle(publication)}</h3>
            <p class="publication-authors">${renderAuthors(publication.authors)}</p>
            <div class="publication-links" aria-label="${pick(content.labels.publicationLinks)}">
              ${renderLinks(publication.links)}
            </div>
          </div>
        </article>
      `,
    )
    .join("");

const renderProjectTitle = (project) => {
  const title = pick(project.title);
  return project.titleUrl
    ? `<a href="${project.titleUrl}" target="_blank" rel="noreferrer">${title}</a>`
    : title;
};

const renderProjects = () =>
  content.projects
    .map(
      (project) => `
        <article class="project-item">
          ${renderTeaser(project.teaser, content.labels.showProjectMotion)}
          <div class="project-copy">
            <h3>${renderProjectTitle(project)}</h3>
            <p class="project-description">${pick(project.description)}</p>
            <div class="project-links" aria-label="${pick(content.labels.projectLinks)}">
              ${renderLinks(project.links)}
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

const renderSectionTitle = (id, label, icon) => `
  <h2 id="${id}">${icon}<span>${pick(label)}</span></h2>
`;

const applyAppearance = () => {
  const activeMode = resolvedMode();
  root.dataset.theme = theme;
  root.dataset.mode = mode;
  root.dataset.resolvedMode = activeMode;
  themeColor.content = {
    "white-light": "#ffffff",
    "white-dark": "#111110",
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
    "bilibili-light": "#fff6fa",
    "bilibili-dark": "#1d1218",
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
          ${renderProfileName()}
          <p class="profile-role">${pick(content.profile.role)}</p>
          <p class="profile-introduction">${pick(content.profile.introduction)}</p>
        </div>
      </header>

      <section class="content-section contact-section" aria-labelledby="contact-title">
        ${renderSectionTitle("contact-title", content.labels.contactTitle, contactSectionIcon)}
        ${renderContacts()}
      </section>

      <section class="content-section research-section" aria-labelledby="research-areas-title">
        ${renderSectionTitle("research-areas-title", content.labels.researchAreasTitle, researchSectionIcon)}
        <div class="research-grid">${renderResearchAreas()}</div>
      </section>

      <section class="content-section" aria-labelledby="publications-title">
        ${renderSectionTitle("publications-title", content.labels.publicationsTitle, publicationsSectionIcon)}
        <div class="publication-list">${renderPublications()}</div>
      </section>

      <section class="content-section" aria-labelledby="education-title">
        ${renderSectionTitle("education-title", content.labels.educationTitle, educationSectionIcon)}
        <div class="education-timeline">${renderEducation()}</div>
      </section>

      <section class="content-section" aria-labelledby="projects-title">
        ${renderSectionTitle("projects-title", content.labels.projectsTitle, projectsSectionIcon)}
        <div class="project-list">${renderProjects()}</div>
      </section>

      <section class="content-section resources-section" aria-labelledby="resources-title">
        ${renderSectionTitle("resources-title", content.labels.resourcesTitle, resourcesSectionIcon)}
        <div class="resource-grid" role="group" aria-label="${pick(content.labels.resourceLinks)}">
          ${renderResourceCategories()}
        </div>
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

const closeContact = (restoreFocus = false) => {
  if (!activeContact) return;

  const trigger = contactTrigger;
  activeContact = null;
  contactTrigger = null;
  app.querySelector("[data-contact-popover]")?.remove();
  app
    .querySelectorAll("[data-qr-contact]")
    .forEach((button) => button.setAttribute("aria-expanded", "false"));
  restoreFocus && trigger?.focus();
};

const toggleContact = (platform, trigger) => {
  if (activeContact === platform) {
    closeContact(false);
    return;
  }

  activeContact = platform;
  contactTrigger = trigger;
  app.querySelector("[data-contact-popover]")?.remove();
  trigger
    .closest("[data-contact-anchor]")
    ?.insertAdjacentHTML("beforeend", renderContactPopover(platform));
  app.querySelectorAll("[data-qr-contact]").forEach((button) =>
    button.setAttribute(
      "aria-expanded",
      String(button.dataset.qrContact === activeContact),
    ),
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
  const pendingUnload = motionUnloadTimers.get(media);

  pendingUnload && window.clearTimeout(pendingUnload);
  motionUnloadTimers.delete(media);
  image && image.setAttribute("src", image.dataset.src);
  if (video && !video.getAttribute("src")) {
    video.src = video.dataset.src;
    video.load();
  }
  video && void video.play().catch(() => undefined);
};

const stopMotion = (media) => {
  const image = media.querySelector("[data-motion-image]");
  const video = media.querySelector("[data-motion-video]");
  const pendingUnload = motionUnloadTimers.get(media);

  pendingUnload && window.clearTimeout(pendingUnload);
  motionUnloadTimers.delete(media);
  if (image?.getAttribute("src")) {
    const timer = window.setTimeout(() => {
      if (media.dataset.active === "true") return;
      image.removeAttribute("src");
      motionUnloadTimers.delete(media);
    }, motionUnloadDelay);
    motionUnloadTimers.set(media, timer);
  }
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

const setResearchRevealed = (card, revealed) => {
  if (card.dataset.revealed === String(revealed)) return;
  card.dataset.revealed = String(revealed);
  card.setAttribute("aria-expanded", String(revealed));
};

const resetResearch = (except) => {
  const pinnedCard = activeResearchArea
    ? app.querySelector(`[data-research-card="${activeResearchArea}"]`)
    : null;

  app
    .querySelectorAll(
      '[data-research-card][data-pinned="true"], [data-research-card][data-revealed="true"]',
    )
    .forEach((card) => {
      if (card === except) return;
      card.dataset.pinned === "true" && (card.dataset.pinned = "false");
      setResearchRevealed(card, false);
    });

  if (!except || activeResearchArea !== except.dataset.researchCard) {
    activeResearchArea = null;
    !except && pinnedCard?.blur();
  }
};

const activateResearch = (card) => {
  if (card.dataset.pinned === "true") return;

  resetResearch(card);
  card.dataset.pinned = "true";
  activeResearchArea = card.dataset.researchCard;
  setResearchRevealed(card, true);
};

app.addEventListener("click", (event) => {
  const settingsToggle = event.target.closest("[data-settings-toggle]");
  const contactButton = event.target.closest("[data-qr-contact]");
  const contactClose = event.target.closest("[data-contact-close]");
  const languageButton = event.target.closest("[data-language]");
  const themeButton = event.target.closest("[data-theme]");
  const modeButtonElement = event.target.closest("[data-mode]");
  const media = event.target.closest("[data-swap-media]");
  const researchCard = event.target.closest("[data-research-card]");

  if (settingsToggle) {
    const closeOpenPanel = settingsOpen;
    settingsPinned = !closeOpenPanel;
    updateSettings(!closeOpenPanel);
    return;
  }

  if (contactClose) {
    closeContact(true);
    return;
  }

  if (contactButton) {
    toggleContact(contactButton.dataset.qrContact, contactButton);
    return;
  }

  if (researchCard) {
    !hoverPointer.matches && activateResearch(researchCard);
    return;
  }

  if (media) toggleMedia(media);

  language = languageButton?.dataset.language ?? language;
  theme = themeButton?.dataset.theme ?? theme;
  mode = modeButtonElement?.dataset.mode ?? mode;

  languageButton && localStorage.setItem("academic-language", language);
  themeButton && localStorage.setItem("academic-theme", theme);
  modeButtonElement && localStorage.setItem("academic-color-mode", mode);
  if (languageButton || themeButton || modeButtonElement) {
    closeContact(false);
    render();
  }
});

app.addEventListener("pointerover", (event) => {
  const settings = event.target.closest("[data-settings]");
  const media = event.target.closest("[data-swap-media]");
  const researchCard = event.target.closest("[data-research-card]");

  const enteredSettings = settings && !settings.contains(event.relatedTarget);
  const enteredResearch =
    researchCard && !researchCard.contains(event.relatedTarget);
  enteredSettings && hoverPointer.matches && updateSettings(true);
  if (enteredResearch && hoverPointer.matches) {
    resetResearch(researchCard);
    setResearchRevealed(researchCard, true);
  }
  if (media && hoverPointer.matches) {
    const motionAllowed = media.dataset.motion !== "true" || !reducedMotion.matches;
    motionAllowed && setMediaActive(media, true);
  }
});

app.addEventListener("pointerout", (event) => {
  const settings = event.target.closest("[data-settings]");
  const media = event.target.closest("[data-swap-media]");
  const researchCard = event.target.closest("[data-research-card]");

  if (settings && !settings.contains(event.relatedTarget) && !settingsPinned) {
    updateSettings(false);
  }
  if (media && !media.contains(event.relatedTarget) && media.dataset.pinned !== "true") {
    setMediaActive(media, false);
  }
  if (
    researchCard &&
    !researchCard.contains(event.relatedTarget) &&
    hoverPointer.matches
  ) {
    researchCard.dataset.pinned === "true" &&
      (researchCard.dataset.pinned = "false");
    setResearchRevealed(researchCard, false);
    researchCard.blur();
  }
});

app.addEventListener("focusin", (event) => {
  const settings = event.target.closest("[data-settings]");
  const media = event.target.closest("[data-swap-media]");
  const researchCard = event.target.closest("[data-research-card]");
  settings && updateSettings(true);
  if (researchCard) {
    resetResearch(researchCard);
    setResearchRevealed(researchCard, true);
  }
  if (media) {
    const motionAllowed = media.dataset.motion !== "true" || !reducedMotion.matches;
    motionAllowed && setMediaActive(media, true);
  }
});

app.addEventListener("focusout", (event) => {
  const settings = event.target.closest("[data-settings]");
  const media = event.target.closest("[data-swap-media]");
  const researchCard = event.target.closest("[data-research-card]");

  if (settings && !settings.contains(event.relatedTarget) && !settingsPinned) {
    updateSettings(false);
  }
  if (media && !media.contains(event.relatedTarget) && media.dataset.pinned !== "true") {
    setMediaActive(media, false);
  }
  if (
    researchCard &&
    !researchCard.contains(event.relatedTarget) &&
    researchCard.dataset.pinned !== "true"
  ) {
    setResearchRevealed(researchCard, false);
  }
});

app.addEventListener("keydown", (event) => {
  const media = event.target.closest("[data-swap-media]");
  const researchCard = event.target.closest("[data-research-card]");
  if (researchCard && ["Enter", " "].includes(event.key)) {
    event.preventDefault();
    return;
  }
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
    const pendingUnload = motionUnloadTimers.get(media);
    pendingUnload && window.clearTimeout(pendingUnload);
    motionUnloadTimers.delete(media);
    media.dataset.failed = "true";
    media.dataset.pinned = "false";
    setMediaActive(media, false);
    const scheduledUnload = motionUnloadTimers.get(media);
    scheduledUnload && window.clearTimeout(scheduledUnload);
    motionUnloadTimers.delete(media);
    event.target.removeAttribute("src");
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
  if (
    activeContact &&
    !event.target.closest(`[data-contact-anchor="${activeContact}"]`)
  ) {
    closeContact(true);
  }
  if (
    activeResearchArea &&
    !event.target.closest(`[data-research-card="${activeResearchArea}"]`)
  ) {
    resetResearch();
  }
  if (!event.target.closest("[data-swap-media]")) resetMedia();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const restoreContactFocus = activeContact;
  const restoreSettingsFocus = settingsOpen;
  closeContact(Boolean(restoreContactFocus));
  resetResearch();
  settingsPinned = false;
  updateSettings(false);
  resetMedia();
  !restoreContactFocus &&
    restoreSettingsFocus &&
    app.querySelector("[data-settings-toggle]")?.focus();
});

systemMode.addEventListener("change", () => mode === "auto" && applyAppearance());
window.addEventListener("scroll", updateBackToTop, { passive: true });

render();
updateBackToTop();
