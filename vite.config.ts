import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

/**
 * A single page with no server rendering, so the build is just static assets.
 *
 * `base: "/"` keeps absolute asset paths, which is what Workers static assets expects at the root. If this
 * is ever served from a subpath, change it to "./" rather than moving files around.
 */
export default defineConfig({
  base: "/",
  // Tailwind v4 is a Vite plugin and a CSS `@import`, with no PostCSS step and no config file: the
  // design tokens live in `src/styles.css`, where the utilities that use them are read from.
  plugins: [tailwindcss()],
  build: {
    outDir: "dist",
    rollupOptions: {
      // Three pages, three files. The policy and the support page are real pages rather than routes
      // in the landing page, so each has its own URL, its own title and its own metadata for anyone
      // searching for it.
      input: {
        main: "index.html",
        policy: "policy.html",
        support: "support.html",
      },
    },
    // The page is one HTML file and one small bundle: no need to split it further.
    assetsInlineLimit: 4096,
  },
});
