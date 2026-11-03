import type { Plugin } from "vite";
export type ImagePointer = { url: string; original_filename: string; size: number; [key: string]: unknown };
export const originalAssetOrigin: string;
export function readImagePointers(root: string): Promise<{ path: string; pointer: ImagePointer }[]>;
export function portablePointer(pointer: ImagePointer): ImagePointer;
export function downloadOriginal(pointer: ImagePointer, fetcher?: typeof fetch): Promise<Uint8Array>;
export function portableImages(): Plugin;