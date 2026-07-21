import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { content } from "../src/content.js";

const publicRoot = fileURLToPath(new URL("../public/", import.meta.url));
const errors = [];
const supportedSections = new Set([
  "contact",
  "research",
  "publications",
  "education",
  "projects",
  "resources",
]);
const supportedThemes = new Set([
  "white",
  "claude",
  "linkedin",
  "spotify",
  "youtube",
  "twitch",
  "bilibili",
]);
const supportedModes = new Set(["auto", "light", "dark"]);
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const videoExtensions = new Set([".mp4", ".webm"]);

const fail = (field, message) => errors.push(`${field}: ${message}`);
const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const requiredString = (value, field) => {
  if (typeof value !== "string" || !value.trim()) {
    fail(field, "must be a non-empty string");
    return false;
  }
  return true;
};

const optionalString = (value, field) => {
  if (typeof value !== "string") {
    fail(field, "must be a string");
    return false;
  }
  return true;
};

const localized = (value, field) => {
  if (!isObject(value)) {
    fail(field, "must be an object with en and zh values");
    return;
  }
  requiredString(value.en, `${field}.en`);
  requiredString(value.zh, `${field}.zh`);
};

const localizedList = (value, field) => {
  if (!isObject(value)) {
    fail(field, "must be an object with en and zh arrays");
    return;
  }
  for (const language of ["en", "zh"]) {
    const values = value[language];
    if (!Array.isArray(values) || !values.length) {
      fail(`${field}.${language}`, "must be a non-empty array");
      continue;
    }
    values.forEach((item, index) =>
      requiredString(item, `${field}.${language}[${index}]`),
    );
  }
};

const enabled = (value, field) => {
  if (typeof value !== "boolean") fail(field, "must be true or false");
};

const identifier = (value, field) => {
  if (!requiredString(value, field)) return;
  if (!/^[a-z][a-z0-9-]*$/.test(value)) {
    fail(field, "must use lowercase letters, digits, and hyphens");
  }
};

const list = (value, field, validate) => {
  if (!Array.isArray(value)) {
    fail(field, "must be an array");
    return;
  }
  const ids = new Set();
  value.forEach((item, index) => {
    const itemField = `${field}[${index}]`;
    if (!isObject(item)) {
      fail(itemField, "must be an object");
      return;
    }
    identifier(item.id, `${itemField}.id`);
    if (ids.has(item.id)) fail(`${itemField}.id`, `duplicate id ${item.id}`);
    ids.add(item.id);
    validate(item, itemField);
  });
};

const asset = (value, field, optional = false) => {
  if (optional && value === "") return;
  if (!requiredString(value, field)) return;
  if (path.isAbsolute(value) || value.split("/").includes("..")) {
    fail(field, "must be relative to public/ and may not contain ..");
    return;
  }
  const absolute = path.resolve(publicRoot, value);
  const insidePublic = absolute.startsWith(`${path.resolve(publicRoot)}${path.sep}`);
  if (!insidePublic) {
    fail(field, "resolves outside public/");
    return;
  }
  if (!existsSync(absolute) || !statSync(absolute).isFile()) {
    fail(field, `missing file public/${value}`);
  }
};

const assetList = (values, field) => {
  if (!Array.isArray(values) || values.length < 2) {
    fail(field, "must be an array with at least two assets");
    return;
  }
  if (new Set(values).size !== values.length) fail(field, "may not contain duplicates");
  values.forEach((value, index) => asset(value, `${field}[${index}]`));
};

const href = (value, field) => {
  if (!optionalString(value, field)) return;
  if (!value) return;
  if (value !== value.trim()) fail(field, "may not have surrounding whitespace");
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) {
    try {
      const url = new URL(value);
      if (!["http:", "https:"].includes(url.protocol)) {
        fail(field, "must use http or https");
      }
    } catch {
      fail(field, "must be a valid URL");
    }
    return;
  }
  if (value.startsWith("//")) {
    fail(field, "scheme-relative URLs are not allowed");
    return;
  }
  asset(value.replace(/^\.\//, ""), field);
};

const email = (value, field) => {
  if (!requiredString(value, field)) return;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    fail(field, "must be a valid email address");
  }
};

const date = (value, field) => {
  if (!requiredString(value, field)) return false;
  if (!/^(?:\d{4}|20X[X-Y])-(?:0[1-9]|1[0-2])$/.test(value)) {
    fail(field, "must use YYYY-MM; 20XX/20XY are allowed placeholders");
    return false;
  }
  return /^\d{4}-/.test(value);
};

const chronological = (start, end, field) => {
  const realStart = date(start, `${field}.startDate`);
  const realEnd = date(end, `${field}.endDate`);
  if (realStart && realEnd && start > end) {
    fail(`${field}.endDate`, "must not be earlier than startDate");
  }
};

const linkList = (value, field) =>
  list(value, field, (item, itemField) => {
    requiredString(item.label, `${itemField}.label`);
    href(item.href, `${itemField}.href`);
  });

const teaser = (value, field) => {
  if (!isObject(value)) {
    fail(field, "must be an object");
    return;
  }
  asset(value.poster, `${field}.poster`);
  localized(value.alt, `${field}.alt`);
  if (!value.motion) return;
  if (!isObject(value.motion)) {
    fail(`${field}.motion`, "must be an object");
    return;
  }
  if (!["image", "video"].includes(value.motion.type)) {
    fail(`${field}.motion.type`, "must be image or video");
  }
  if (!requiredString(value.motion.src, `${field}.motion.src`)) return;
  asset(value.motion.src, `${field}.motion.src`);
  const extension = path.extname(value.motion.src).toLowerCase();
  const allowed = value.motion.type === "video" ? videoExtensions : imageExtensions;
  if (!allowed.has(extension)) {
    fail(`${field}.motion.src`, `extension does not match ${value.motion.type}`);
  }
};

const validateContact = (section, field) => {
  list(section.emails, `${field}.emails`, (item, itemField) => {
    enabled(item.enabled, `${itemField}.enabled`);
    requiredString(item.type, `${itemField}.type`);
    if (!content.ui[`${item.type}Email`]) {
      fail(`${itemField}.type`, `missing ui.${item.type}Email label`);
    }
    email(item.address, `${itemField}.address`);
    asset(item.icon, `${itemField}.icon`);
  });

  const validateProfileLink = (item, itemField) => {
    enabled(item.enabled, `${itemField}.enabled`);
    identifier(item.platform, `${itemField}.platform`);
    requiredString(item.label, `${itemField}.label`);
    href(item.href, `${itemField}.href`);
    asset(item.icon, `${itemField}.icon`);
  };

  list(section.academicLinks, `${field}.academicLinks`, validateProfileLink);
  list(section.socialLinks, `${field}.socialLinks`, (item, itemField) => {
    validateProfileLink(item, itemField);
    asset(item.qr, `${itemField}.qr`, true);
    optionalString(item.account, `${itemField}.account`);
    if (item.qr) {
      requiredString(item.account, `${itemField}.account`);
      localized(item.qrAlt, `${itemField}.qrAlt`);
    }
  });
};

const validateResearch = (section, field) =>
  list(section.items, `${field}.items`, (item, itemField) => {
    enabled(item.enabled, `${itemField}.enabled`);
    localized(item.title, `${itemField}.title`);
    localizedList(item.keywords, `${itemField}.keywords`);
    localized(item.description, `${itemField}.description`);
    if (!isObject(item.image)) {
      fail(`${itemField}.image`, "must be an object");
      return;
    }
    asset(item.image.src, `${itemField}.image.src`);
    localized(item.image.alt, `${itemField}.image.alt`);
  });

const validatePublications = (section, field) =>
  list(section.items, `${field}.items`, (item, itemField) => {
    enabled(item.enabled, `${itemField}.enabled`);
    if (!requiredString(item.year, `${itemField}.year`)) return;
    if (!/^(?:\d{4}|20X[X-Y])$/.test(item.year)) {
      fail(`${itemField}.year`, "must be a four-digit year or 20XX/20XY placeholder");
    }
    localized(item.title, `${itemField}.title`);
    href(item.titleUrl, `${itemField}.titleUrl`);
    list(item.authors, `${itemField}.authors`, (author, authorField) => {
      requiredString(author.name, `${authorField}.name`);
      href(author.href, `${authorField}.href`);
    });
    localized(item.venue, `${itemField}.venue`);
    localized(item.note, `${itemField}.note`);
    linkList(item.links, `${itemField}.links`);
    teaser(item.teaser, `${itemField}.teaser`);
  });

const validateEducation = (section, field) =>
  list(section.items, `${field}.items`, (item, itemField) => {
    enabled(item.enabled, `${itemField}.enabled`);
    chronological(item.startDate, item.endDate, itemField);
    localized(item.institution, `${itemField}.institution`);
    localized(item.degree, `${itemField}.degree`);
    localized(item.detail, `${itemField}.detail`);
    list(item.highlights, `${itemField}.highlights`, (highlight, highlightField) => {
      localized(highlight.text, `${highlightField}.text`);
      href(highlight.href, `${highlightField}.href`);
    });
    asset(item.logo, `${itemField}.logo`);
    localized(item.logoAlt, `${itemField}.logoAlt`);
    href(item.institutionUrl, `${itemField}.institutionUrl`);
  });

const validateProjects = (section, field) =>
  list(section.items, `${field}.items`, (item, itemField) => {
    enabled(item.enabled, `${itemField}.enabled`);
    localized(item.title, `${itemField}.title`);
    href(item.titleUrl, `${itemField}.titleUrl`);
    localized(item.description, `${itemField}.description`);
    linkList(item.links, `${itemField}.links`);
    teaser(item.teaser, `${itemField}.teaser`);
  });

const validateResources = (section, field) =>
  list(section.items, `${field}.items`, (item, itemField) => {
    enabled(item.enabled, `${itemField}.enabled`);
    localized(item.title, `${itemField}.title`);
  });

const validateResourcePage = (value, field) => {
  if (!isObject(value)) {
    fail(field, "must be an object");
    return;
  }
  localized(value.title, `${field}.title`);
  localized(value.metaTitle, `${field}.metaTitle`);
  localized(value.description, `${field}.description`);
  localized(value.introduction, `${field}.introduction`);
  if (
    !Array.isArray(value.views) ||
    !value.views.some((view) => isObject(view) && view.enabled)
  ) {
    fail(`${field}.views`, "must contain at least one enabled view");
  }
  list(value.views, `${field}.views`, (view, viewField) => {
    enabled(view.enabled, `${viewField}.enabled`);
    localized(view.title, `${viewField}.title`);
    localized(view.description, `${viewField}.description`);
    if (
      !Array.isArray(view.items) ||
      !view.items.some((item) => isObject(item) && item.enabled)
    ) {
      fail(`${viewField}.items`, "must contain at least one enabled item");
    }
    list(view.items, `${viewField}.items`, (item, itemField) => {
      enabled(item.enabled, `${itemField}.enabled`);
      localized(item.title, `${itemField}.title`);
      localized(item.description, `${itemField}.description`);
      href(item.href, `${itemField}.href`);
    });
  });
};

const sectionValidators = {
  contact: validateContact,
  research: validateResearch,
  publications: validatePublications,
  education: validateEducation,
  projects: validateProjects,
  resources: validateResources,
};

localized(content.site.title, "site.title");
localized(content.site.description, "site.description");
requiredString(content.site.defaultLanguage, "site.defaultLanguage");
localized(content.profile.name, "profile.name");
localized(content.profile.role, "profile.role");
localized(content.profile.introduction, "profile.introduction");
requiredString(content.profile.initials, "profile.initials");
assetList(content.profile.portrait.sources, "profile.portrait.sources");
localized(content.profile.portrait.alt, "profile.portrait.alt");
validateResourcePage(content.resourcePage, "resourcePage");

list(content.display.languages, "display.languages", (item, field) => {
  requiredString(item.label, `${field}.label`);
  requiredString(item.htmlLang, `${field}.htmlLang`);
  requiredString(item.locale, `${field}.locale`);
});
const languageIds = new Set(content.display.languages?.map(({ id }) => id));
if (!languageIds.has(content.site.defaultLanguage)) {
  fail("site.defaultLanguage", "must exist in display.languages");
}
for (const language of ["en", "zh"]) {
  if (!languageIds.has(language)) fail("display.languages", `missing ${language}`);
}

const validateChoiceList = (values, field, supported) => {
  if (!Array.isArray(values) || !values.length) {
    fail(field, "must be a non-empty array");
    return;
  }
  const unique = new Set(values);
  if (unique.size !== values.length) fail(field, "may not contain duplicates");
  values.forEach((value, index) => {
    if (!supported.has(value)) fail(`${field}[${index}]`, `unsupported value ${value}`);
  });
};

validateChoiceList(content.display.themes, "display.themes", supportedThemes);
validateChoiceList(content.display.modes, "display.modes", supportedModes);
if (
  Array.isArray(content.display.themes) &&
  !content.display.themes.includes(content.display.defaultTheme)
) {
  fail("display.defaultTheme", "must exist in display.themes");
}
if (
  Array.isArray(content.display.modes) &&
  !content.display.modes.includes(content.display.defaultMode)
) {
  fail("display.defaultMode", "must exist in display.modes");
}

const requiredUi = [
  "loading",
  "noscript",
  "skip",
  "personalLinks",
  "emails",
  "educationEmail",
  "personalEmail",
  "closeContact",
  "publicationLinks",
  "projectLinks",
  "language",
  "theme",
  "mode",
  "settings",
  "closeSettings",
  "resourceLinks",
  "replaceLink",
  "cyclePortrait",
  "previousResearch",
  "nextResearch",
  "showMotion",
  "showProjectMotion",
  "backToTop",
  "lastUpdated",
  "home",
  "resourceCategories",
  "resourceEntries",
  "resourcePlaceholder",
  "openResource",
  ...(Array.isArray(content.display.themes) ? content.display.themes : []),
  ...(Array.isArray(content.display.modes) ? content.display.modes : []),
];
new Set(requiredUi).forEach((key) => localized(content.ui[key], `ui.${key}`));

list(content.sections, "sections", (section, field) => {
  enabled(section.enabled, `${field}.enabled`);
  localized(section.title, `${field}.title`);
  if (!supportedSections.has(section.id)) {
    fail(`${field}.id`, `unsupported section ${section.id}`);
    return;
  }
  sectionValidators[section.id](section, field);
});

const resourceSection = content.sections?.find(({ id }) => id === "resources");
const resourceIds = resourceSection?.items?.map(({ id }) => id) ?? [];
const viewIds = content.resourcePage?.views?.map(({ id }) => id) ?? [];
if (resourceIds.join("|") !== viewIds.join("|")) {
  fail(
    "resourcePage.views",
    "IDs and order must match the homepage resources section",
  );
}
resourceSection?.items?.forEach((item, index) => {
  if (item.enabled !== content.resourcePage?.views?.[index]?.enabled) {
    fail(
      `resourcePage.views[${index}].enabled`,
      "must match the corresponding homepage resource",
    );
  }
});

const configuredSections = new Set(content.sections?.map(({ id }) => id));
supportedSections.forEach((id) => {
  if (!configuredSections.has(id)) fail("sections", `missing ${id} section`);
});

if (errors.length) {
  throw new Error(`Invalid site content:\n- ${errors.join("\n- ")}`);
}
