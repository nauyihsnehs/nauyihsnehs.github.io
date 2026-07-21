import { resolve } from "node:path";

import { defineConfig } from "vite";

import { content } from "./src/content.js";
import { renderResourcesPage, renderSite } from "./src/render.js";

const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        resources: resolve(import.meta.dirname, "resources/index.html"),
      },
    },
  },
  plugins: [
    {
      name: "render-pages",
      transformIndexHtml(html) {
        const buildTime = new Date().toISOString();
        const resources = html.includes("<!-- resources-site -->");
        const marker = resources ? "<!-- resources-site -->" : "<!-- site -->";
        const site = resources
          ? renderResourcesPage(content, buildTime)
          : renderSite(content, buildTime);

        return html
          .replace(
            /<html[^>]*>/,
            `<html lang="${site.htmlLang}" data-theme="${site.theme}" data-mode="${site.mode}" data-resolved-mode="${site.mode === "dark" ? "dark" : "light"}">`,
          )
          .replaceAll("__TITLE__", escape(site.title))
          .replaceAll("__DESCRIPTION__", escape(site.description))
          .replace(marker, site.body);
      },
    },
  ],
});
