import { defineConfig } from "vite";

import { content } from "./src/content.js";
import { renderSite } from "./src/render.js";

const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");

export default defineConfig({
  base: "./",
  plugins: [
    {
      name: "render-site",
      transformIndexHtml(html) {
        const buildTime = new Date().toISOString();
        const site = renderSite(content, buildTime);

        return html
          .replace(
            /<html[^>]*>/,
            `<html lang="${site.htmlLang}" data-theme="${site.theme}" data-mode="${site.mode}" data-resolved-mode="${site.mode === "dark" ? "dark" : "light"}">`,
          )
          .replaceAll("__TITLE__", escape(site.title))
          .replaceAll("__DESCRIPTION__", escape(site.description))
          .replace("<!-- site -->", site.body);
      },
    },
  ],
});
