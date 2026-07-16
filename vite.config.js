import { defineConfig } from "vite";
import { content } from "./src/content.js";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const defaultText = (value) => value[content.site.defaultLanguage];
const replaceBlock = (html, name, replacement) =>
  html.replace(
    new RegExp(`\\s*<!-- content-${name}:start -->[\\s\\S]*?<!-- content-${name}:end -->`),
    `\n    ${replacement}`,
  );

const injectContent = (html) => {
  const language = content.display.languages.find(
    ({ id }) => id === content.site.defaultLanguage,
  );
  const title = escapeHtml(defaultText(content.site.title));
  const description = escapeHtml(defaultText(content.site.description));
  const resolvedMode = content.display.defaultMode === "dark" ? "dark" : "light";
  const openingTag = `<html lang="${language.htmlLang}" data-theme="${content.display.defaultTheme}" data-mode="${content.display.defaultMode}" data-resolved-mode="${resolvedMode}">`;
  const head = `<meta name="description" content="${description}" />
    <meta name="theme-color" content="#ffffff" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <title>${title}</title>`;
  const skip = `<a class="skip-link" id="skip-link" href="#main">${escapeHtml(defaultText(content.ui.skip))}</a>`;
  const loading = `<p class="loading-note">${escapeHtml(defaultText(content.ui.loading))}</p>`;
  const noscript = `<p class="noscript-note">${escapeHtml(defaultText(content.ui.noscript))}</p>`;

  return [
    ["<html lang=\"en\" data-theme=\"white\" data-mode=\"auto\" data-resolved-mode=\"light\">", openingTag],
    ["head", head],
    ["skip", skip],
    ["loading", loading],
    ["noscript", noscript],
  ].reduce(
    (result, [name, replacement]) =>
      name.startsWith("<html")
        ? result.replace(name, replacement)
        : replaceBlock(result, name, replacement),
    html,
  );
};

export default defineConfig({
  base: "./",
  plugins: [
    {
      name: "inject-site-content",
      transformIndexHtml: injectContent,
    },
  ],
  define: {
    "import.meta.env.VITE_BUILD_TIME": JSON.stringify(new Date().toISOString()),
  },
});
