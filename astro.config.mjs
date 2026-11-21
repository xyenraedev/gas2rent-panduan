// @ts-check
import { defineConfig } from "astro/config";

/**
 * Static documentation site. No adapter, no framework, no CMS.
 *
 * Astro turns `src/content/panduan.md` into HTML at build time and gives every
 * heading a github-slugger id, so `## 9. Syarat sewa` becomes `#9-syarat-sewa`.
 * The sidebar is built from those same headings, so it can't drift from the page.
 */
export default defineConfig({
  site: "https://gas2rent-panduan.xyenrae.dev",
});
