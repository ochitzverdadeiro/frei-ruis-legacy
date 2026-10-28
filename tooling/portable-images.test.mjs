import test from "node:test";
import assert from "node:assert/strict";
import { downloadOriginal, portablePointer, readImagePointers, portableImages } from "./portable-images.mjs";

test("all eight original images retain their filenames on the deployment origin", async () => {
  const entries = await readImagePointers(process.cwd());
  assert.equal(entries.length, 8);
  assert.deepEqual(entries.map(({ pointer }) => portablePointer(pointer).url).sort(), [
    "/images/eremiterio.jpg", "/images/familia-antiga.jpg", "/images/frei-rui-capa.jpg",
    "/images/igreja-rodeio.jpg", "/images/lembranca-ordenacao.jpg", "/images/praca-imigrantes.jpg",
    "/images/rodeio-vista.jpg", "/images/totem-imigrantes.jpg",
  ]);
});

test("a failed or changed original prevents publishing broken image assets", async () => {
  const [{ pointer }] = await readImagePointers(process.cwd());
  await assert.rejects(downloadOriginal(pointer, async () => new Response("missing", { status: 404 })), /Original unavailable/);
  await assert.rejects(downloadOriginal(pointer, async () => new Response("not a JPEG")), /Invalid or changed original/);
});

test("production rewrites shared manifests while preview keeps existing asset behavior", async () => {
  const [{ path, pointer }] = await readImagePointers(process.cwd());
  const plugin = portableImages();
  await plugin.configResolved({ root: process.cwd(), command: "serve" });
  assert.equal(plugin.load(path), undefined);
  await plugin.configResolved({ root: process.cwd(), command: "build" });
  assert.equal(JSON.parse(plugin.load(path)).url, `/images/${pointer.original_filename}`);
});