// scripts/optimize-images.js
//
// Batch-converts every jpg/jpeg/png under `inputDir` into two WebP variants:
//   - <name>-thumb.webp  (480px wide, quality 75)  -> grid/card thumbnails
//   - <name>.webp        (1200px wide, quality 82) -> detail page images
//
// Run with:  node scripts/optimize-images.js
//
// Requires:  npm install sharp --save-dev
//   (if npm install fails on this box, use: npm install sharp --save-dev --break-system-packages)

import sharp from "sharp";
import { readdirSync, mkdirSync, statSync } from "fs";
import path from "path";

const inputDir = "public/assets/instruments";
const outputDir = "public/assets/instruments";

// How many files to process at once. Sharp is CPU/memory heavy per image,
// so keep this modest on small servers (2-4). Raise it on a beefier machine.
const CONCURRENCY = 3;

const stats = { converted: 0, skipped: 0, failed: 0, bytesIn: 0, bytesOut: 0 };

function collectImageFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectImageFiles(fullPath));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function processFile(srcPath) {
  const relPath = path.relative(inputDir, srcPath);
  const outPath = path.join(outputDir, relPath);
  const outDir = path.dirname(outPath);
  const base = outPath.replace(/\.(jpg|jpeg|png)$/i, "");

  mkdirSync(outDir, { recursive: true });

  try {
    const inputSize = statSync(srcPath).size;

    await sharp(srcPath)
      .resize({ width: 480, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(`${base}-thumb.webp`);

    const fullInfo = await sharp(srcPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(`${base}.webp`);

    stats.converted++;
    stats.bytesIn += inputSize;
    stats.bytesOut += fullInfo.size;

    console.log(`✔ ${relPath}`);
  } catch (err) {
    stats.failed++;
    console.error(`✘ ${relPath}: ${err.message}`);
  }
}

async function runWithConcurrency(files, limit) {
  let cursor = 0;
  async function worker() {
    while (cursor < files.length) {
      const file = files[cursor++];
      await processFile(file);
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
}

async function main() {
  const files = collectImageFiles(inputDir);

  if (files.length === 0) {
    console.log(`No jpg/jpeg/png files found under ${inputDir}`);
    return;
  }

  console.log(`Found ${files.length} images. Converting with concurrency=${CONCURRENCY}...\n`);
  await runWithConcurrency(files, CONCURRENCY);

  const mb = (n) => (n / (1024 * 1024)).toFixed(2);
  console.log("\n--- Done ---");
  console.log(`Converted: ${stats.converted}`);
  console.log(`Failed:    ${stats.failed}`);
  if (stats.bytesIn > 0) {
    const reduction = (100 * (1 - stats.bytesOut / stats.bytesIn)).toFixed(1);
    console.log(`Original total (full-size sources): ${mb(stats.bytesIn)} MB`);
    console.log(`New total (detail .webp only):       ${mb(stats.bytesOut)} MB`);
    console.log(`Size reduction: ~${reduction}%`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
