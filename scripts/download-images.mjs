// Downloads every site photo ONE time and saves it inside the project as Full-HD WebP.
// After this, images are static files in public/images — no outside links needed.
// Run:  npm run images        (re-download everything: npm run images -- --force)
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import sharp from "sharp";

const OUT = "public/images";
const force = process.argv.includes("--force");
const sources = JSON.parse(await readFile(new URL("./image-sources.json", import.meta.url), "utf8"));
await mkdir(OUT, { recursive: true });

const exists = (p) => access(p).then(() => true, () => false);

async function get(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error("file too small");
  return buf;
}

let ok = 0, fail = [];
for (const [name, urls] of Object.entries(sources)) {
  const isLogo = name === "logo";
  const file = `${OUT}/${name}.${isLogo ? "png" : "webp"}`;
  if (!force && (await exists(file))) { console.log("•", name, "(already saved)"); ok++; continue; }
  let saved = false;
  for (const url of urls) {
    try {
      const buf = await get(url);
      const img = sharp(buf);
      const meta = await img.metadata();
      if (isLogo) await img.png().toFile(file);
      else await img.resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 86 }).toFile(file);
      console.log("✓", name, `${meta.width}×${meta.height}`, "←", new URL(url).hostname);
      saved = true; ok++; break;
    } catch (e) {
      console.log("  …", name, "source failed:", e.message);
    }
  }
  if (!saved) fail.push(name);
}

await writeFile(`${OUT}/.gitkeep`, "");
console.log(`\nDone: ${ok}/${Object.keys(sources).length} saved in ${OUT}/`);
if (fail.length) console.log("Missing:", fail.join(", "), "— add your own HD photo with that name (.webp).");
