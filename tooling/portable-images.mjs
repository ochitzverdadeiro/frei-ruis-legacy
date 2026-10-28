import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

export const originalAssetOrigin = "https://frei-ruis-legacy.lovable.app";

export async function readImagePointers(root) {
  const directory = resolve(root, "src/assets");
  const files = (await readdir(directory)).filter((name) => name.endsWith(".jpg.asset.json"));
  return Promise.all(files.map(async (name) => ({
    path: resolve(directory, name),
    pointer: JSON.parse(await readFile(resolve(directory, name), "utf8")),
  })));
}

export function portablePointer(pointer) {
  if (!/^[a-z0-9-]+\.jpg$/.test(pointer.original_filename)) {
    throw new Error(`Unsafe image filename: ${pointer.original_filename}`);
  }
  return { ...pointer, url: `/images/${pointer.original_filename}` };
}

export async function downloadOriginal(pointer, fetcher = fetch) {
  const source = new URL(pointer.url, originalAssetOrigin);
  if (source.origin !== originalAssetOrigin || !source.pathname.startsWith("/__l5e/assets-v1/")) {
    throw new Error(`Unexpected original location: ${pointer.original_filename}`);
  }
  const response = await fetcher(source, { signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error(`Original unavailable: ${pointer.original_filename} (HTTP ${response.status})`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length !== pointer.size || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) {
    throw new Error(`Invalid or changed original: ${pointer.original_filename}`);
  }
  return bytes;
}

// Source manifests remain CDN pointers. Production artifacts carry exact originals,
// served on the deployment's own origin, without Lovable's asset-serving endpoint.
export function portableImages() {
  let building = false;
  let pointers = [];
  return {
    name: "portable-original-images",
    enforce: "pre",
    async configResolved(config) {
      building = config.command === "build";
      if (building) pointers = await readImagePointers(config.root);
    },
    load(id) {
      if (!building) return;
      const entry = pointers.find((item) => item.path === id.split("?")[0]);
      if (entry) return JSON.stringify(portablePointer(entry.pointer));
    },
    async generateBundle() {
      if (!building || this.environment?.name !== "client") return;
      for (const { pointer } of pointers) {
        const source = await downloadOriginal(pointer);
        this.emitFile({ type: "asset", fileName: portablePointer(pointer).url.slice(1), source });
      }
    },
  };
}