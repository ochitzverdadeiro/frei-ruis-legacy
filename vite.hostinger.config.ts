import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { portableImages } from "./tooling/portable-images.mjs";

export default defineConfig({
  plugins: [portableImages()],
  tanstackStart: { server: { entry: "server" } },
  nitro: { preset: "node-server" },
});