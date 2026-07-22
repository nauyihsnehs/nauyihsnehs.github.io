const escape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const icons = {
  arrow: '<svg aria-hidden="true" viewBox="0 0 16 16"><path d="M3 13 13 3M6 3h7v7"/></svg>',
  forward: '<svg aria-hidden="true" viewBox="0 0 16 16"><path d="M2.5 8h11M9.5 4l4 4-4 4"/></svg>',
  back: '<svg aria-hidden="true" viewBox="0 0 16 16"><path d="M13.5 8h-11M6.5 4l-4 4 4 4"/></svg>',
  gear: '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5.4"/><circle cx="12" cy="12" r="2.2"/><path d="M12 2.5v4.1M12 17.4v4.1M2.5 12h4.1M17.4 12h4.1M5.28 5.28l2.9 2.9M15.82 15.82l2.9 2.9M18.72 5.28l-2.9 2.9M8.18 15.82l-2.9 2.9"/></svg>',
  up: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6.5 14.5 5.5-5.5 5.5 5.5"/></svg>',
  contact: '<svg class="section-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M3.5 5.5h17v13h-17Z"/><path d="m4 6 8 7 8-7"/></svg>',
  research: '<svg class="section-icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2.2"/><path d="M4.2 8.2c1.8-3.1 4.3-4.6 6-3.6 1.8 1 2.1 4.1.3 7.2s-4.3 4.6-6 3.6c-1.8-1-2.1-4.1-.3-7.2Z"/><path d="M13.5 5c3.6 0 6.1 1.6 6.1 3.7s-2.5 3.7-6.1 3.7-6.1-1.6-6.1-3.7S9.9 5 13.5 5Z" transform="rotate(60 12 12)"/></svg>',
  publications: '<svg class="section-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M7 3.5h10v14H7Z"/><path d="M4 6.5v14h10M9.5 7.5h5M9.5 10.5h5M9.5 13.5h3.5"/></svg>',
  education: '<svg class="section-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="m3 9 9-4 9 4-9 4Z"/><path d="M6.5 11.2v4.3c2.9 2.1 8.1 2.1 11 0v-4.3M21 9v5"/></svg>',
  projects: '<svg class="section-icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 12h4c3 0 3-6 6-6M11 12c3 0 3 6 6 6"/></svg>',
  resources: '<svg class="section-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M8.5 15.5 6 18a3.5 3.5 0 0 1-5-5l3-3a3.5 3.5 0 0 1 5 0" transform="translate(3 -2)"/><path d="m15.5 8.5 2.5-2.5a3.5 3.5 0 0 1 5 5l-3 3a3.5 3.5 0 0 1-5 0" transform="translate(-3 2)"/><path d="m8.5 15.5 7-7"/></svg>',
};

const themeIcons = {
  white: '<svg class="theme-logo theme-logo--openai" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M4.2 7.5l5.2 3M14.6 13.5l5.2 3M4.2 16.5l5.2-3M14.6 10.5l5.2-3"/><circle cx="12" cy="3" r="1.2"/><circle cx="12" cy="21" r="1.2"/><circle cx="4.2" cy="7.5" r="1.2"/><circle cx="19.8" cy="16.5" r="1.2"/><circle cx="4.2" cy="16.5" r="1.2"/><circle cx="19.8" cy="7.5" r="1.2"/></svg>',
  claude: '<svg class="theme-logo theme-logo--claude" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2.5v19M2.5 12h19M5.3 5.3l13.4 13.4M18.7 5.3 5.3 18.7"/></svg>',
  linkedin: '<svg class="theme-logo theme-logo--linkedin" aria-hidden="true" viewBox="0 0 24 24"><path d="M6 17 12 7l6 10M8.4 13h7.2"/><circle cx="6" cy="17" r="1.6"/><circle cx="12" cy="7" r="1.6"/><circle cx="18" cy="17" r="1.6"/></svg>',
  spotify: '<svg class="theme-logo theme-logo--spotify" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 8.5c5.4-1.7 10.8-1.3 16 .9M5.5 12.5c4.5-1.2 8.9-.8 13.2.8M7 16.2c3.5-.7 6.8-.4 10 .7"/></svg>',
  youtube: '<svg class="theme-logo theme-logo--youtube" aria-hidden="true" viewBox="0 0 24 24"><rect x="3.5" y="6" width="17" height="12" rx="3.5"/><path class="theme-logo-fill" d="m10 9.2 5 2.8-5 2.8Z"/></svg>',
  twitch: '<svg class="theme-logo theme-logo--twitch" aria-hidden="true" viewBox="0 0 24 24"><path d="m12 3 8 6-3 9-10 3-3-9Z"/><path d="M9.5 10v4M14.5 9v4"/></svg>',
  bilibili: '<svg class="theme-logo theme-logo--bilibili" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 8.5c3-2.8 6-2.8 8 0s5 2.8 8 0M4 15.5c3-2.8 6-2.8 8 0s5 2.8 8 0"/><circle cx="4" cy="8.5" r="1.25"/><circle cx="20" cy="15.5" r="1.25"/></svg>',
};

const modeIcons = {
  auto: '<svg class="mode-logo" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7.5"/><path class="mode-logo-fill" d="M12 4.5a7.5 7.5 0 0 1 0 15Z"/></svg>',
  light: '<svg class="mode-logo" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.5"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/></svg>',
  dark: '<svg class="mode-logo" aria-hidden="true" viewBox="0 0 24 24"><path d="M19.5 15.3A8 8 0 0 1 8.7 4.5a8 8 0 1 0 10.8 10.8Z"/></svg>',
};

const createPage = (content, buildTime, metadata) => {
  const defaultLanguage = content.site.defaultLanguage;
  const alternateLanguage = content.display.languages.find(
    ({ id }) => id !== defaultLanguage,
  ).id;
  const translations = [];
  const index = (value) => {
    translations.push(
      typeof value === "string" ? value : value[alternateLanguage],
    );
    return translations.length - 1;
  };
  const text = (value, tag = "span", attributes = "") =>
    `<${tag}${attributes} data-i="${index(value)}">${escape(value[defaultLanguage])}</${tag}>`;
  const attribute = (value, name) =>
    `data-i="${index(value)}" data-ia="${name}" ${name}="${escape(value[defaultLanguage])}"`;
  const enabled = (items) => items.filter((item) => item.enabled);
  const settings = `
    <aside class="settings" data-settings data-open="false" data-pinned="false">
      <button class="settings-toggle" type="button" data-settings-toggle aria-label="${escape(content.ui.settings[defaultLanguage])}" aria-expanded="false" aria-controls="settings-panel">${icons.gear}</button>
      <div class="settings-panel" id="settings-panel" role="group" ${attribute(content.ui.settings, "aria-label")}>
        <div class="settings-row">${text(content.ui.language)}<div class="control-group">${content.display.languages.map(({ id, label }) => `<button type="button" data-language="${id}" aria-pressed="${id === defaultLanguage}">${escape(label)}</button>`).join("")}</div></div>
        <div class="settings-row">${text(content.ui.theme)}<div class="control-group theme-group">${content.display.themes.map((value) => `<button class="theme-option" type="button" data-theme="${value}" ${attribute(content.ui[value], "aria-label")} title="${escape(content.ui[value][defaultLanguage])}" aria-pressed="${value === content.display.defaultTheme}">${themeIcons[value]}</button>`).join("")}</div></div>
        <div class="settings-row">${text(content.ui.mode)}<div class="control-group mode-group">${content.display.modes.map((value) => `<button class="mode-option" type="button" data-mode="${value}" ${attribute(content.ui[value], "aria-label")} title="${escape(content.ui[value][defaultLanguage])}" aria-pressed="${value === content.display.defaultMode}">${modeIcons[value]}</button>`).join("")}</div></div>
      </div>
    </aside>`;
  const render = (main, className = "") => {
    const labels = {
      settings: content.ui.settings,
      closeSettings: content.ui.closeSettings,
      replaceLink: content.ui.replaceLink,
      title: metadata.title,
      description: metadata.description,
    };
    const body = `
      <a class="skip-link" id="skip-link" href="#main" data-i="${index(content.ui.skip)}">${escape(content.ui.skip[defaultLanguage])}</a>
      <div class="floating-tools">${settings}<a class="floating-button back-to-top" data-back-to-top data-visible="false" href="#main" ${attribute(content.ui.backToTop, "aria-label")} title="${escape(content.ui.backToTop[defaultLanguage])}">${icons.up}</a></div>
      <main id="main" class="page-shell${className ? ` ${className}` : ""}">
        ${main}
        <footer><span>© ${new Date(buildTime).getUTCFullYear()} ${text(content.profile.name)}</span><span>${text(content.ui.lastUpdated)} <time data-build-time datetime="${buildTime}"></time></span></footer>
      </main>
      <script id="i18n" type="application/json">${JSON.stringify({
        translations,
        labels,
        languages: content.display.languages,
        defaultLanguage,
        alternateLanguage,
      }).replaceAll("<", "\\u003c")}</script>`;
    return {
      body,
      title: metadata.title[defaultLanguage],
      description: metadata.description[defaultLanguage],
      htmlLang: content.display.languages.find(({ id }) => id === defaultLanguage)
        .htmlLang,
      theme: content.display.defaultTheme,
      mode: content.display.defaultMode,
    };
  };
  return { alternateLanguage, attribute, defaultLanguage, enabled, index, render, text };
};

export const renderSite = (content, buildTime) => {
  const {
    alternateLanguage,
    attribute,
    defaultLanguage,
    enabled,
    index,
    render,
    text,
  } = createPage(content, buildTime, content.site);
  const asset = (path) => escape(path);
  const contactIcon = (icon) =>
    `<span class="contact-icon" aria-hidden="true" style="--contact-icon:url('/${asset(icon)}')"></span>`;
  const externalIcon = ({ platform, label, href, icon }) =>
    href
      ? `<a class="profile-icon-link" data-platform="${platform}" href="${escape(href)}" target="_blank" rel="noreferrer" aria-label="${escape(label)}" title="${escape(label)}">${contactIcon(icon)}</a>`
      : `<span class="profile-icon-link profile-icon-link--empty" data-platform="${platform}" data-empty-label="${escape(label)}" role="img" aria-label="${escape(label)}" title="${escape(label)}: ${escape(content.ui.replaceLink[defaultLanguage])}">${contactIcon(icon)}</span>`;
  const popover = (item) => `
    <template data-contact-template="${item.platform}">
      <div class="profile-contact-popover" id="contact-popover-${item.platform}" data-contact-popover role="dialog" aria-modal="false" aria-labelledby="contact-popover-title-${item.platform}">
        <button class="contact-popover-close" type="button" data-contact-close ${attribute(content.ui.closeContact, "aria-label")} title="${escape(content.ui.closeContact[defaultLanguage])}">×</button>
        <strong id="contact-popover-title-${item.platform}">${escape(item.label)}</strong>
        <img src="./${asset(item.qr)}" ${attribute(item.qrAlt, "alt")} width="160" height="160" loading="lazy"/>
        <span class="contact-account">${escape(item.account)}</span>
      </div>
    </template>`;
  const socialIcon = (item) =>
    item.qr
      ? `<span class="contact-icon-anchor" data-contact-anchor="${item.platform}"><button class="profile-icon-link" type="button" data-platform="${item.platform}" data-qr-contact="${item.platform}" aria-label="${escape(item.label)}" title="${escape(item.label)}" aria-haspopup="dialog" aria-controls="contact-popover-${item.platform}" aria-expanded="false">${contactIcon(item.icon)}</button>${popover(item)}</span>`
      : externalIcon(item);
  const links = (items) =>
    items
      .map(({ label, href }) =>
        href
          ? `<a href="${escape(href)}" target="_blank" rel="noreferrer">${escape(label)}${icons.arrow}</a>`
          : `<span data-empty-link title="${escape(content.ui.replaceLink[defaultLanguage])}">${escape(label)}<span aria-hidden="true">＋</span></span>`,
      )
      .join("");
  const authors = (items) =>
    items
      .map(({ name, href }) =>
        href
          ? `<a href="${escape(href)}" target="_blank" rel="noreferrer">${escape(name)}</a>`
          : `<span>${escape(name)}</span>`,
      )
      .join(", ");
  const motion = (teaser) => {
    if (!teaser.motion?.src) return "";
    return teaser.motion.type === "video"
      ? `<video class="media-alternate" data-motion-video data-src="./${asset(teaser.motion.src)}" muted loop playsinline preload="none" aria-hidden="true"></video>`
      : `<img class="media-alternate" data-motion-image data-src="./${asset(teaser.motion.src)}" alt="" aria-hidden="true"/>`;
  };
  const teaser = (item, label) =>
    `<div class="swap-media teaser-media" data-swap-media data-motion="true" role="button" tabindex="0" ${attribute(label, "aria-label")} aria-pressed="false"><img class="media-primary" src="./${asset(item.poster)}" ${attribute(item.alt, "alt")} loading="lazy"/>${motion(item)}</div>`;
  const date = (value) => {
    const [year, month] = value.split("-");
    const real = /^\d{4}$/.test(year);
    const english = real
      ? new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${value}-01T00:00:00Z`))
      : `${new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" }).format(new Date(`2000-${month}-01T00:00:00Z`))} ${year}`;
    const chinese = `${year}年${Number(month)}月`;
    const labels = { en: english, zh: chinese };
    return `<time class="education-date" datetime="${value}" data-i="${index(labels)}">${labels[defaultLanguage]}</time>`;
  };
  const sectionRenderers = {
    contact: (section) => `
      <div class="contact-panel" data-contact-area role="group" ${attribute(content.ui.personalLinks, "aria-label")}>
        <div class="profile-email-row" role="group" ${attribute(content.ui.emails, "aria-label")}>${enabled(section.emails)
          .map((item) => {
            const label = content.ui[`${item.type}Email`];
            return `<a class="profile-email-link" href="mailto:${escape(item.address)}" data-email-i="${index(label)}" data-email="${escape(item.address)}" title="${escape(label[defaultLanguage])}" aria-label="${escape(`${label[defaultLanguage]}: ${item.address}`)}">${contactIcon(item.icon)}<span>${escape(item.address)}</span></a>`;
          })
          .join("")}</div>
        <div class="profile-icon-row" role="group" ${attribute(content.ui.personalLinks, "aria-label")}>${enabled(section.academicLinks).map(externalIcon).join("")}${enabled(section.socialLinks).map(socialIcon).join("")}</div>
      </div>`,
    research: (section) => {
      const items = enabled(section.items);
      const viewNames = (itemIndex) =>
        `--research-shell-view-name:research-shell-${itemIndex};` +
        `--research-media-view-name:research-media-${itemIndex};` +
        `--research-title-view-name:research-title-${itemIndex};` +
        `--research-details-view-name:research-details-${itemIndex}`;
      const card = (item, itemIndex, clone = false) =>
        `<article class="research-card" data-research-index="${itemIndex}" style="${viewNames(itemIndex)}"${clone ? " data-research-clone aria-hidden=\"true\" inert" : ` data-research-card="${item.id}"${itemIndex === 0 ? ' data-research-active="true"' : ""}`}><div class="research-visual"><img src="./${asset(item.image.src)}" ${attribute(item.image.alt, "alt")} loading="lazy"/></div><div class="research-copy">${text(item.title, "h3")}<div class="research-details"><p class="research-description" data-i="${index(item.description)}">${escape(item.description[defaultLanguage])}</p><ul class="research-keywords" ${attribute(item.title, "aria-label")}>${item.keywords[defaultLanguage].map((word, wordIndex) => `<li data-i="${index(item.keywords[alternateLanguage][wordIndex])}">${escape(word)}</li>`).join("")}</ul></div></div></article>`;
      const previewLabel = (direction, item) => {
        const action = content.ui[direction < 0 ? "previousResearch" : "nextResearch"];
        return {
          en: `${action.en}: ${item.title.en}`,
          zh: `${action.zh}：${item.title.zh}`,
        };
      };
      const previews = (direction, initialIndex) => items
        .map((item, itemIndex) => {
          const active = itemIndex === initialIndex;
          return `<button class="research-preview" type="button" data-research-preview data-research-preview-index="${itemIndex}" data-research-direction="${direction}" style="${viewNames(itemIndex)}"${active ? ' data-research-preview-active="true"' : " hidden"} ${attribute(previewLabel(direction, item), "aria-label")}><img src="./${asset(item.image.src)}" alt="" aria-hidden="true" loading="lazy"/>${text(item.title, "span", ' class="research-preview-title"')}</button>`;
        })
        .join("");
      const cards = items
        .map((item, itemIndex) => card(item, itemIndex))
        .join("");
      const slides = items.length > 1
        ? `${card(items.at(-1), items.length - 1, true)}${cards}${card(items[0], 0, true)}`
        : cards;
      const progress = items
        .map((item, itemIndex) => `<button class="research-progress-marker" type="button" data-research-progress-index="${itemIndex}" aria-pressed="${itemIndex === 0}"${itemIndex === 0 ? ' data-research-progress-active="true"' : ""} ${attribute(item.title, "aria-label")}></button>`)
        .join("");
      const previous = items.length > 1
        ? previews(-1, items.length - 1)
        : "";
      const next = items.length > 1 ? previews(1, 1) : "";
      return `<div class="research-carousel" data-research-carousel data-research-current="0" data-research-ready="false"><div class="research-stage"><div class="research-preview-rail" data-research-preview-rail="-1">${previous}</div><div class="research-main"><div class="research-viewport" data-research-viewport><div class="research-track">${slides}</div></div></div><div class="research-preview-rail" data-research-preview-rail="1">${next}</div><div class="research-progress" data-research-progress>${progress}</div></div><p class="visually-hidden" data-research-status role="status" aria-live="polite">${escape(items[0].title[defaultLanguage])}</p></div>`;
    },
    publications: (section) =>
      `<div class="publication-list">${enabled(section.items)
        .map((item) => `<article class="publication-item">${teaser(item.teaser, content.ui.showMotion)}<div class="publication-copy"><p class="publication-meta">${escape(item.year)} · ${text(item.venue)} · ${text(item.note)}</p><h3>${item.titleUrl ? `<a href="${escape(item.titleUrl)}" target="_blank" rel="noreferrer" data-i="${index(item.title)}">${escape(item.title[defaultLanguage])}</a>` : text(item.title)}</h3><p class="publication-authors">${authors(item.authors)}</p><div class="publication-links" ${attribute(content.ui.publicationLinks, "aria-label")}>${links(item.links)}</div></div></article>`)
        .join("")}</div>`,
    education: (section) =>
      `<div class="education-timeline">${enabled(section.items)
        .map((item) => `<article class="education-item"><div class="education-dates">${date(item.startDate)}${date(item.endDate)}</div><div class="education-copy${item.highlights?.length ? "" : " education-copy--compact"}">${item.institutionUrl ? `<a class="education-logo" href="${escape(item.institutionUrl)}" target="_blank" rel="noreferrer"><img src="./${asset(item.logo)}" ${attribute(item.logoAlt, "alt")} loading="lazy"/></a>` : `<span class="education-logo"><img src="./${asset(item.logo)}" ${attribute(item.logoAlt, "alt")} loading="lazy"/></span>`}<div class="education-text">${text(item.institution, "h3")}${text(item.degree, "p")}${text(item.detail, "p", ' class="secondary"')}</div>${item.highlights?.length ? `<ul class="education-highlights">${item.highlights.map((highlight) => `<li>${highlight.href ? `<a href="${escape(highlight.href)}" target="_blank" rel="noreferrer" data-i="${index(highlight.text)}">${escape(highlight.text[defaultLanguage])}</a>` : text(highlight.text)}</li>`).join("")}</ul>` : ""}</div></article>`)
        .join("")}</div>`,
    projects: (section) =>
      `<div class="project-list">${enabled(section.items)
        .map((item) => `<article class="project-item">${teaser(item.teaser, content.ui.showProjectMotion)}<div class="project-copy"><h3>${item.titleUrl ? `<a href="${escape(item.titleUrl)}" target="_blank" rel="noreferrer" data-i="${index(item.title)}">${escape(item.title[defaultLanguage])}</a>` : text(item.title)}</h3>${text(item.description, "p", ' class="project-description"')}<div class="project-links" ${attribute(content.ui.projectLinks, "aria-label")}>${links(item.links)}</div></div></article>`)
        .join("")}</div>`,
    resources: (section) =>
      `<div class="resource-grid" role="group" ${attribute(content.ui.resourceLinks, "aria-label")}>${enabled(section.items)
        .map((item) => `<a class="resource-card" href="./resources/#${item.id}">${text(item.title)}${icons.forward}</a>`)
        .join("")}</div>`,
  };

  const sections = enabled(content.sections)
    .map((section) => `<section class="content-section${section.id === "contact" ? " contact-section" : section.id === "research" ? " research-section" : section.id === "resources" ? " resources-section" : ""}" aria-labelledby="${section.id}-title"><h2 id="${section.id}-title">${icons[section.id]}${text(section.title)}</h2>${sectionRenderers[section.id](section)}</section>`)
    .join("");
  const alternateName = content.profile.name.zh === content.profile.name.en
    ? ""
    : `<span class="profile-name-alternate" data-name-alternate data-en-name="${escape(content.profile.name.en)}" data-zh-name="${escape(content.profile.name.zh)}" lang="${alternateLanguage === "zh" ? "zh-CN" : "en"}">${defaultLanguage === "zh" ? `（${escape(content.profile.name.en)}）` : `(${escape(content.profile.name.zh)})`}</span>`;
  const portraitSources = content.profile.portrait.sources.map(
    (source) => `./${source}`,
  );
  const main = `
      <header class="profile-header">
        <div class="swap-media portrait-media" data-portrait-carousel data-portrait-index="0" data-portrait-sources="${escape(JSON.stringify(portraitSources))}" role="button" tabindex="0" ${attribute(content.ui.cyclePortrait, "aria-label")}><img class="media-primary" data-portrait-image src="./${asset(content.profile.portrait.sources[0])}" ${attribute(content.profile.portrait.alt, "alt")} width="1086" height="1448" fetchpriority="high"/></div>
        <div class="profile-copy"><h1>${text(content.profile.name)}${alternateName}</h1>${text(content.profile.role, "p", ' class="profile-role"')}${text(content.profile.introduction, "p", ' class="profile-introduction"')}</div>
      </header>
      ${sections}`;
  return render(main);
};

export const renderResourcesPage = (content, buildTime) => {
  const metadata = {
    title: content.resourcePage.metaTitle,
    description: content.resourcePage.description,
  };
  const { attribute, defaultLanguage, enabled, render, text } = createPage(
    content,
    buildTime,
    metadata,
  );
  const views = enabled(content.resourcePage.views);
  const defaultView = views[0].id;
  const entry = (item) => {
    const link = item.href
      ? `<a class="resource-entry-link" href="${escape(item.href)}" target="_blank" rel="noreferrer">${text(content.ui.openResource)}${icons.arrow}</a>`
      : `<span class="resource-entry-link resource-entry-link--empty" data-empty-link title="${escape(content.ui.replaceLink[defaultLanguage])}">${text(content.ui.resourcePlaceholder)}<span aria-hidden="true">＋</span></span>`;
    return `<article class="resource-entry${item.href ? "" : " resource-entry--placeholder"}">${text(item.title, "h3")}${text(item.description, "p")}${link}</article>`;
  };
  const navigation = `
    <nav class="resource-category-nav" ${attribute(content.ui.resourceCategories, "aria-label")}>
      ${views.map((view) => `<a href="#${view.id}" data-resource-view-link="${view.id}"${view.id === defaultView ? ' aria-current="page"' : ""}>${text(view.title)}</a>`).join("")}
    </nav>`;
  const panels = views
    .map((view) => `
      <section class="resource-view" id="${view.id}" data-resource-view="${view.id}" aria-labelledby="${view.id}-title"${view.id === defaultView ? "" : " hidden"}>
        <div class="resource-view-heading">
          ${text(view.title, "h2", ` id="${view.id}-title"`)}
          ${text(view.description, "p")}
        </div>
        <div class="resource-entry-grid" role="list" ${attribute(content.ui.resourceEntries, "aria-label")}>
          ${enabled(view.items).map((item) => `<div role="listitem">${entry(item)}</div>`).join("")}
        </div>
      </section>`)
    .join("");
  const main = `
    <header class="resource-page-header">
      <a class="resource-home-link" href="../">${icons.back}${text(content.ui.home)}</a>
      <div class="resource-page-copy">
        ${text(content.resourcePage.title, "h1")}
        ${text(content.resourcePage.introduction, "p")}
      </div>
    </header>
    ${navigation}
    <div class="resource-view-stack">${panels}</div>`;
  return render(main, "resource-page-shell");
};
