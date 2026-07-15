import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  define: {
    "import.meta.env.VITE_BUILD_TIME": JSON.stringify(new Date().toISOString()),
  },
});
