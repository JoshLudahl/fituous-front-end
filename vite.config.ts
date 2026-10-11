import { defineConfig } from "vite";

/**
 * A single page with no server rendering, so the build is just static assets.
 *
 * `base: "/"` keeps absolute asset paths, which is what Workers static assets expects at the root. If this
 * is ever served from a subpath, change it to "./" rather than moving files around.
 */
export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    rollupOptions: {
      // Two pages, two files. The policy is a real page rather than a route in the landing page, so it
      // has its own URL, its own title and its own metadata for anyone searching for it.
      input: {
        main: "index.html",
        policy: "policy.html",
      },
    },
    // The page is one HTML file and one small bundle: no need to split it further.
    assetsInlineLimit: 4096,
  },
});
