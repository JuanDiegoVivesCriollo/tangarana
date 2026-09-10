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
const seenTitles = new Map();
const seenDescriptions = new Map();

const destinationFor = (href) => {
  const pathname = href.split(/[?#]/)[0];
  if (pathname === "/") return join(root, "index.html");
  if (pathname.endsWith(".html")) return join(root, pathname.slice(1));
  return join(root, pathname.slice(1), "index.html");
};

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const name = relative(root, file);
  const isRedirect = /<meta http-equiv="refresh"/i.test(html);

  if (isRedirect) {
    if (!/<meta name="robots" content="noindex"/.test(html)) issues.push(`${name}: redirección sin noindex`);
    if (!/<link rel="canonical" href="https:\/\//.test(html)) issues.push(`${name}: redirección sin canonical absoluto`);
    continue;
  }

  const h1Count = (html.match(/<h1(?:\s|>)/g) ?? []).length;
  if (h1Count !== 1) issues.push(`${name}: contiene ${h1Count} H1`);
  if (!/<title>[^<]+<\/title>/.test(html)) issues.push(`${name}: falta title`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) issues.push(`${name}: falta meta description`);
  if (!/<link rel="canonical" href="https:\/\//.test(html)) issues.push(`${name}: falta canonical absoluto`);
  for (const property of ["og:title", "og:description", "og:url", "og:image"]) {
    if (!new RegExp(`<meta property="${property}" content="[^"]+"`).test(html)) issues.push(`${name}: falta ${property}`);
  }

  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const isNoindex = /<meta name="robots" content="noindex/.test(html);
  const expectedCanonical = name === "index.html"
    ? "https://tangaranatravel.pe/"
    : `https://tangaranatravel.pe/${name.replaceAll("\\", "/").replace(/index\.html$/, "")}`;
  if (!isNoindex && canonical !== expectedCanonical) issues.push(`${name}: canonical no apunta a la propia URL`);
  if (!isNoindex && title) {
    if (seenTitles.has(title)) issues.push(`${name}: title duplicado con ${seenTitles.get(title)}`);
    seenTitles.set(title, name);
  }
  if (!isNoindex && description) {
    if (seenDescriptions.has(description)) issues.push(`${name}: meta description duplicada con ${seenDescriptions.get(description)}`);
    seenDescriptions.set(description, name);
  }

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

const expectedH1 = {
  "index.html": "Tours en Oxapampa y la Selva Central",
  "tours\\index.html": "Tours a Pozuzo, Villa Rica, Perené y más",
  "tours\\pozuzo\\index.html": "Tour a Pozuzo",
  "tours\\villa-rica\\index.html": "Tour a Villa Rica",
  "tours\\perene\\index.html": "Tour al Valle del Perené",
  "tours\\chontabamba\\index.html": "Tour a Chontabamba",
  "tours\\catarata-rio-tigre\\index.html": "Tour a Catarata Río Tigre",
  "tours\\selva-central-4-dias\\index.html": "Tour Oxapampa, Pozuzo, Villa Rica y Perené — 4 días",
  "destinos\\oxapampa\\index.html": "Turismo en Oxapampa",
  "destinos\\pozuzo\\index.html": "Turismo en Pozuzo",
  "destinos\\villa-rica\\index.html": "Turismo en Villa Rica",
  "destinos\\valle-del-perene\\index.html": "Turismo en el Valle del Perené",
  "contacto\\index.html": "Contacta con Tangarana Travel Tours",
  "nosotros\\index.html": "Conoce Tangarana Travel Tours",
};

for (const [name, heading] of Object.entries(expectedH1)) {
  const file = join(root, name);
  if (!existsSync(file)) {
    issues.push(`Falta la página requerida ${name}`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  if (!html.includes(`<h1>${heading}</h1>`)) issues.push(`${name}: H1 objetivo no encontrado`);
}

const homeHtml = readFileSync(join(root, "index.html"), "utf8");
for (const path of ["/tours/pozuzo/", "/tours/villa-rica/", "/tours/perene/", "/tours/chontabamba/", "/tours/catarata-rio-tigre/", "/tours/selva-central-4-dias/"]) {
  if (!homeHtml.includes(`href="${path}"`)) issues.push(`Home: falta enlace rastreable hacia ${path}`);
}

const sitemap = existsSync(join(root, "sitemap-0.xml")) ? readFileSync(join(root, "sitemap-0.xml"), "utf8") : "";
for (const path of ["/tours/pozuzo/", "/tours/villa-rica/", "/tours/perene/", "/tours/chontabamba/", "/tours/catarata-rio-tigre/", "/tours/selva-central-4-dias/"]) {
  if (!sitemap.includes(`https://tangaranatravel.pe${path}`)) issues.push(`Sitemap: falta ${path}`);
}
for (const legacy of ["perene-dia-completo", "villa-rica-dia-completo", "pozuzo-dia-completo", "chontabamba-medio-dia"]) {
  if (sitemap.includes(legacy)) issues.push(`Sitemap: incluye redirección antigua ${legacy}`);
}

for (const required of ["robots.txt", "llms.txt", "llms-full.txt", "sitemap-index.xml", "404.html"]) {
  if (!existsSync(join(root, required))) issues.push(`Falta ${required}`);
}

if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}

console.log(`Auditoría correcta: ${htmlFiles.length} archivos HTML; H1, metadatos únicos, Open Graph, imágenes, enlaces, sitemap, redirecciones y JSON-LD verificados.`);
