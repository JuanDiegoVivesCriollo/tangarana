import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const dist = new URL("../dist/", import.meta.url);
const root = dist.pathname.replace(/^\/(?:[A-Za-z]:)/, (match) => match.slice(1)).replaceAll("/", "\\");

if (!existsSync(root)) {
  console.error("No existe dist/. Ejecuta npm run build primero.");
  process.exit(1);
}

const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const full = join(directory, entry.name);
  return entry.isDirectory() ? walk(full) : [full];
});

const htmlFiles = walk(root).filter((file) => file.endsWith(".html"));
const issues = [];

const destinationFor = (href) => {
  const pathname = href.split(/[?#]/)[0];
  if (pathname === "/") return join(root, "index.html");
  if (pathname.endsWith(".html")) return join(root, pathname.slice(1));
  return join(root, pathname.slice(1), "index.html");
};

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const name = relative(root, file);
  const h1Count = (html.match(/<h1(?:\s|>)/g) ?? []).length;
  if (h1Count !== 1) issues.push(`${name}: contiene ${h1Count} H1`);
  if (!/<title>[^<]+<\/title>/.test(html)) issues.push(`${name}: falta title`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) issues.push(`${name}: falta meta description`);
  if (!/<link rel="canonical" href="https:\/\//.test(html)) issues.push(`${name}: falta canonical absoluto`);

  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\bwidth="\d+"/.test(tag) || !/\bheight="\d+"/.test(tag)) issues.push(`${name}: imagen sin dimensiones`);
    if (!/\balt="[^"]*"/.test(tag)) issues.push(`${name}: imagen sin alt`);
  }

  for (const match of html.matchAll(/href="(\/[^"#]*)"/g)) {
    const href = match[1];
    if (href.startsWith("/_astro/") || href.startsWith("/icons/") || href.startsWith("/og/") || href === "/site.webmanifest") continue;
    if (!existsSync(destinationFor(href))) issues.push(`${name}: enlace interno roto ${href}`);
  }

  for (const block of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(block[1]); } catch { issues.push(`${name}: JSON-LD inválido`); }
  }
}

for (const required of ["robots.txt", "llms.txt", "llms-full.txt", "sitemap-index.xml", "404.html"]) {
  if (!existsSync(join(root, required))) issues.push(`Falta ${required}`);
}

if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}

console.log(`Auditoría correcta: ${htmlFiles.length} páginas, metadatos, H1, imágenes, enlaces internos y JSON-LD verificados.`);
