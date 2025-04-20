import fetch from "node-fetch";
import fs from "fs-extra";
import { join } from "node:path";

const URL = `https://nonsa.pl/wiki/${encodeURIComponent("Kalendarz_świąt_nietypowych")}`;
const CACHE_DIR = ".cache";
const CACHE_FILE = join(CACHE_DIR, "wiki.html");
export const CACHE_DB = join(CACHE_DIR, "db.json");

const download = async () => {
  console.info(URL);
  await fs.ensureDir(CACHE_DIR);
  const cached = await fs
    .readFile(CACHE_FILE)
    .then((b) => String(b))
    .catch(() => null);
  if (cached) {
    console.info("Loaded Wiki art from cache");
    return String(cached);
  }
  const html = await fetch(URL).then((r) => {
    if (!r.ok) {
      throw new Error(r.statusText);
    }
    return r.text();
  });
  fs.writeFile(CACHE_FILE, html)
    .then(() => console.info("Saved wiki page to cache"))
    .catch(() => console.error("Couldn't store wiki page to cache")); // Not so important to break
  return html;
};

export default download;
