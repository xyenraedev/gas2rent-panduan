/**
 * Fails the build if the table of contents and the article disagree.
 *
 * Both are generated from the same heading list, so this should never fail. It
 * exists for the one way they still can: a group boundary naming a slug that no
 * longer exists, which would silently drop sections from the contents.
 */
import { readFileSync } from "node:fs";

const html = readFileSync("dist/index.html", "utf8");

const nav = html.match(/<nav class="toc" aria-label="Daftar isi" data-toc>[\s\S]*?<\/nav>/);

if (!nav) {
  console.error("check: daftar isi tidak ditemukan");
  process.exit(1);
}

const listed = new Set(
  [...nav[0].matchAll(/<a href="#([^"]+)"/g)].map((m) => m[1]),
);

const headings = [...html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map(
  (m) => ({ id: m[1], text: m[2].replace(/<[^>]+>/g, "").trim() }),
);

const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

const problems = [];

for (const id of listed) {
  if (!ids.has(id)) problems.push(`#${id} tidak punya target`);
}

for (const heading of headings) {
  if (!listed.has(heading.id)) {
    problems.push(`"${heading.text}" tidak ada di daftar isi`);
  }
}

if (!headings.length) problems.push("tidak ada bagian yang terbaca");

// An empty group means a boundary slug no longer matches a heading, which
// silently hides every section that belonged to it.
for (const group of nav[0].matchAll(
  /<p class="toc-title">([^<]+)<\/p>\s*<ul>([\s\S]*?)<\/ul>/g,
)) {
  if (!/<li>/.test(group[2])) {
    problems.push(`grup "${group[1]}" kosong — slug batasnya tidak cocok`);
  }
}

if (problems.length) {
  console.error("check: gagal");
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(`check: ok — ${headings.length} bagian, ${listed.size} anchor`);
