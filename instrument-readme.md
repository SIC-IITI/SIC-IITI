# Instruments Images Roadmap — Option 2 (public/assets)

This README is a complete, step-by-step guide for organizing ~100 instrument images and deploying them in your site under `public/assets/instruments` (the approach you asked for). It includes file structure, scripts to rename/convert/optimize images, a Node script to auto-generate a JSON/JS mapping for React, frontend usage examples (lazy loading, responsive), and deployment notes for an institute-hosted site (iiti.ac.in).

---

## Table of contents

1. Goals
2. Prerequisites
3. Naming & folder conventions
4. Folder structure (final on repo)
5. Preparation steps (organize & rename)
6. Image optimization pipeline (Node + `sharp`)
7. Auto-generate mapping file (`instruments.data.js`)
8. Frontend usage (React examples)
9. Deployment checklist for iiti.ac.in
10. Rollback & testing
11. Troubleshooting & tips

---

## 1) Goals

* Put ~100 images under `public/assets/instruments` grouped by category (e.g., `xray/scxrd`, `microscopy/`).
* Keep deploys light and predictable.
* Optimize images (convert to WebP, reasonable sizes, thumbnails) for faster load.
* Generate a single data file that the React app imports to display instruments.
* Avoid manually writing 100 image paths.

---

## 2) Prerequisites

* Node.js (v16+) & npm
* Git
* Access to repository that will be served on iiti.ac.in
* Terminal (Linux/macOS/WSL recommended)

Optional but recommended tools:

* `exiftool` (for reading metadata) — only if you need to preserve timestamps
* A code editor (VSCode)

---

## 3) Naming & folder conventions

* Use lowercase, hyphen-separated names. No spaces.
* Use category/subcategory then short descriptive name:

  * `xray/scxrd/rigaku-scxrd-01.webp`
  * `microscopy/sem-bruker-01.webp`
* Files:

  * `category[/subcategory]/<short-name>-<index>.webp`
  * Example: `xray-scan-scxrd-1.webp` or `microscopy-om-2.webp`

Why: predictable paths, easier generating mapping and automated scripts.

---

## 4) Final repo folder structure

```
public/
  assets/
    instruments/
      xray/
        scxrd/
          scxrd-01.webp
          scxrd-02.webp
        supra/
          supra-01.webp
      microscopy/
        om-01.webp
        sem-01.webp
      spectroscopy/
        uvvis-01.webp
        ftir-01.webp
```

Also add a generated data file:

```
src/
  data/
    instruments.data.js   
  components/
    InstrumentCard.jsx
    InstrumentGallery.jsx
```

---

## 5) Preparation steps (organize & rename)

If your images are messy across folders and filenames, do this locally:

1. Create a working folder:

```bash
mkdir ~/instruments_work && cd ~/instruments_work
```

2. Copy all raw images into `raw/` (keep originals):

```bash
mkdir raw
# copy all of your scattered images into raw/ (do this manually or with file manager)
```

3. Open `raw/` in VSCode or file explorer and visually group them into temporary subfolders using what you know (xray, microscopy, etc.). This is manual but quick for initial grouping.

4. Create an `organized/` folder to store correctly-named files.

**If you want to automate renaming by heuristics (e.g., folder name contains `scxrd`), use the provided Node script in the next section.**

---

## 6) Image optimization pipeline (Node + `sharp`)

We will use `sharp` to convert images to WebP and produce two sizes: a thumbnail (`w=400`) and a full display (`w=1200`) — adjust sizes as needed.

### Install dependencies

```bash
npm init -y
npm i sharp fs-extra glob
```

### Pipeline script: `scripts/optimize-images.js`

```js
// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

// CONFIG
const RAW_DIR = path.resolve(process.cwd(), 'raw');
const OUT_DIR = path.resolve(process.cwd(), 'public', 'assets', 'instruments');
const THUMB_W = 400;
const FULL_W = 1200;

async function ensureOut() {
  await fs.ensureDir(OUT_DIR);
}

function getAllFiles() {
  // glob all images in raw folder
  return glob.sync('**/*.+(jpg|jpeg|png|bmp|tiff|webp)', { cwd: RAW_DIR, nodir: true });
}

function sanitizeName(name) {
  return name.toLowerCase().replace(/[^a-z0-9-_./]/g, '-').replace(/-+/g, '-');
}

async function processFile(relPath) {
  const inPath = path.join(RAW_DIR, relPath);
  // Heuristic: if raw files are in folders like xray/scxrd/* use that to create out folder
  const parsed = path.parse(relPath);
  const parts = parsed.dir ? parsed.dir.split(path.sep) : ['misc'];
  const category = parts[0] || 'misc';
  const sub = parts.slice(1).join('-');
  const baseName = sanitizeName(parsed.name).slice(0, 60);
  const outBaseDir = path.join(OUT_DIR, category, sub || '');
  await fs.ensureDir(outBaseDir);

  // produce two versions
  const thumbName = `${baseName}-thumb.webp`;
  const fullName = `${baseName}-full.webp`;
  const thumbPath = path.join(outBaseDir, thumbName);
  const fullPath = path.join(outBaseDir, fullName);

  await sharp(inPath)
    .resize({ width: FULL_W, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(fullPath);

  await sharp(inPath)
    .resize({ width: THUMB_W, withoutEnlargement: true })
    .webp({ quality: 60 })
    .toFile(thumbPath);

  return {
    category,
    sub: sub || null,
    name: baseName,
    paths: {
      thumb: path.relative(process.cwd(), thumbPath).replace(/\\/g, '/'),
      full: path.relative(process.cwd(), fullPath).replace(/\\/g, '/'),
    },
  };
}

(async function main(){
  await ensureOut();
  const files = getAllFiles();
  console.log('Found', files.length, 'files');
  const records = [];
  for (const f of files) {
    try {
      const r = await processFile(f);
      records.push(r);
      console.log('Processed:', f);
    } catch (err) {
      console.error('Error processing', f, err.message);
    }
  }

  // Save metadata temporarily for inspection
  await fs.writeJson(path.join(process.cwd(), 'tmp_images_map.json'), records, { spaces: 2 });
  console.log('Done. tmp_images_map.json written.');
})();
```

### Run the pipeline

```bash
node scripts/optimize-images.js
```

It will create `public/assets/instruments/{category}/{sub}/...-thumb.webp` and `...-full.webp` and a `tmp_images_map.json` describing outputs.

---

## 7) Auto-generate mapping file (`src/data/instruments.data.js`)

Use the pipeline's `tmp_images_map.json` to create a structured JS data file that your React app can import.

Create script: `scripts/generate-data.js`

```js
// scripts/generate-data.js
const fs = require('fs-extra');
const path = require('path');

const TMP = path.resolve(process.cwd(), 'tmp_images_map.json');
const OUT = path.resolve(process.cwd(), 'src', 'data', 'instruments.data.js');

async function main(){
  const arr = await fs.readJson(TMP);
  // Group by category/sub
  const grouped = {};
  for (const item of arr) {
    const cat = item.category || 'misc';
    const sub = item.sub || 'default';
    grouped[cat] = grouped[cat] || {};
    grouped[cat][sub] = grouped[cat][sub] || [];
    grouped[cat][sub].push({
      name: item.name,
      thumb: '/' + item.paths.thumb.replace(/^public\//, ''),
      full: '/' + item.paths.full.replace(/^public\//, ''),
    });
  }

  const js = `// Auto-generated — do not edit by hand\nmodule.exports = ${JSON.stringify(grouped, null, 2)};\n`;
  await fs.ensureDir(path.dirname(OUT));
  await fs.writeFile(OUT, js);
  console.log('Wrote', OUT);
}

main();
```

Run:

```bash
node scripts/generate-data.js
```

This will produce `src/data/instruments.data.js` which you can `require()` or `import` in your React components.

---

## 8) Frontend usage (React examples)

### Example `src/data/instruments.data.js` export (generated)

```js
// module.exports = { xray: { scxrd: [ { name, thumb, full }, ... ] } }
```

### Simple gallery component (React)

```jsx
// src/components/InstrumentGallery.jsx
import React from 'react';
import instruments from '../data/instruments.data.js';

export default function InstrumentGallery(){
  // Convert grouped object to simple list
  const list = [];
  Object.keys(instruments).forEach(cat=>{
    Object.keys(instruments[cat]).forEach(sub=>{
      instruments[cat][sub].forEach(item=> list.push({...item, category:cat, sub}))
    })
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {list.map((it, idx)=> (
        <article key={idx} className="bg-white rounded shadow p-2">
          <a href={it.full} target="_blank" rel="noreferrer">
            <img src={it.thumb} alt={it.name} loading="lazy" style={{width:'100%', height:'auto'}} />
          </a>
          <h4 className="mt-2 text-sm font-medium">{it.name}</h4>
          <p className="text-xs text-gray-500">{it.category} / {it.sub}</p>
        </article>
      ))}
    </div>
  );
}
```

### Notes:

* `loading="lazy"` reduces initial payload.
* Link to `it.full` so users can open high-res image on click.
* If you want responsive `srcset`, you can generate extra sizes in the `sharp` script and include `srcSet`.

---

## 9) Deployment checklist for iiti.ac.in

1. Make a branch `assets/images-organize` and commit `public/assets/instruments` with thumbnail & full images and the generated `src/data/instruments.data.js`.
2. Keep original raw files out of the repo. Add `/raw` to `.gitignore`.
3. Run a local build: `npm run build` and preview with `serve -s build` (install `serve` globally if needed).
4. Test pages (gallery, instrument details) on your local machine and check image sizes and load times.
5. Push branch and open a pull request for review.
6. Once approved, merge to main and deploy to your hosting. If iiti uses a hosting admin, provide `public` contents to the admin or follow institute deployment docs.

Important: Because images live under `public/`, every time you update or add images you will need to redeploy the site. That's fine for occasional updates.

---

## 10) Rollback & testing

* Keep a backup of previous `public/assets/instruments` folder as a tarball before big changes:

```bash
tar -czvf instruments-backup-$(date +%F).tar.gz public/assets/instruments
```

* For each deployment, test on a staging instance or a local build.
* Use browser devtools to check that images are served with proper caching headers. If the institute server does not set long cache headers, consider adding cache-control in server config (ask admin).

---

## 11) Troubleshooting & tips

* If images still look large: re-run `sharp` with lower `quality` or smaller `FULL_W`.
* If filenames clash, `sanitizeName` will hash or truncate; you can tweak it to include a timestamp or a short hash.
* If `sharp` fails to install on your machine (native dependency), use an alternative: `imagemin` + plugins, or run `sharp` inside Docker.
* Consider Cloudinary or Github+jsDelivr later for CDN benefits.

---

## Quick reference commands

```bash
# 1) Install deps
npm i sharp fs-extra glob

# 2) Run conversion & optimization
node scripts/optimize-images.js

# 3) Generate instruments data
node scripts/generate-data.js

# 4) Local build & preview
npm run build
npx serve -s build
```

---

## Want it automated further?

I can:

* Produce a version of `optimize-images.js` that creates `srcset` variants (e.g., 400/800/1200) and updates `instruments.data.js` accordingly.
* Add a small CLI to interactively classify ambiguous images.
* Or produce a Dockerfile so `sharp` runs reliably on any machine.

Tell me which of these you want next and I’ll add it.
