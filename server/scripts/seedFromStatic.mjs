
import fs from "fs";
import os from "os";
import path from "path";
import { pool, ensureSchema } from "../db.js";

const RESET = process.argv.includes("--reset");

const INSTRUMENTS_DATA_PATH =
  process.env.INSTRUMENTS_DATA_PATH ||
  path.resolve("../src/data/instrumentsData.js");
const EVENTS_DATA_PATH =
  process.env.EVENTS_DATA_PATH || path.resolve("../src/data/eventsData.js");

async function importModule(sourcePath) {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(
      `Could not find ${sourcePath}. Point INSTRUMENTS_DATA_PATH / EVENTS_DATA_PATH ` +
        `env vars at your frontend's src/data/*.js files.`
    );
  }
 
  const tmpFile = path.join(
    os.tmpdir(),
    `sic-seed-${Date.now()}-${path.basename(sourcePath)}`.replace(/\.js$/, ".mjs")
  );
  fs.copyFileSync(sourcePath, tmpFile);
  try {
    return await import(`file://${tmpFile}`);
  } finally {
    fs.unlinkSync(tmpFile);
  }
}

async function seedInstruments() {
  const mod = await importModule(INSTRUMENTS_DATA_PATH);
  const instruments = mod.instrumentsData || mod.default || [];
  const categoryDescriptions = mod.categoryDescriptions || {};

  if (RESET) {
    await pool.query("DELETE FROM instruments");
    await pool.query("DELETE FROM category_descriptions");
  }

  let count = 0;
  for (const inst of instruments) {
    await pool.query(
      `INSERT INTO instruments
        (id, name, full_name, category, model, show_in_status, status,
         usage_academic, usage_industrial, usage_unit, features, applications,
         handled_by, email, location, images)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
       ON DUPLICATE KEY UPDATE
         name=VALUES(name), full_name=VALUES(full_name), category=VALUES(category),
         model=VALUES(model), show_in_status=VALUES(show_in_status), status=VALUES(status),
         usage_academic=VALUES(usage_academic), usage_industrial=VALUES(usage_industrial),
         usage_unit=VALUES(usage_unit), features=VALUES(features), applications=VALUES(applications),
         handled_by=VALUES(handled_by), email=VALUES(email), location=VALUES(location),
         images=VALUES(images)`,
      [
        inst.id,
        inst.name,
        inst.fullName || inst.name,
        inst.category,
        inst.model,
        inst.showInStatus !== false,
        inst.status || "Operational",
        inst.usageCharges?.academic || "",
        inst.usageCharges?.industrial || "",
        inst.usageCharges?.unit || "",
        JSON.stringify(inst.features || []),
        JSON.stringify(inst.applications || []),
        inst.handledBy || "",
        inst.email || "",
        inst.location || "",
        JSON.stringify(inst.images || []),
      ]
    );
    count++;
  }

  for (const [category, description] of Object.entries(categoryDescriptions)) {
    await pool.query(
      `INSERT INTO category_descriptions (category, description) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE description = VALUES(description)`,
      [category, description]
    );
  }

  console.log(`Seeded ${count} instruments and ${Object.keys(categoryDescriptions).length} category descriptions.`);
}

async function seedEvents() {
  const mod = await importModule(EVENTS_DATA_PATH);
  const events = mod.eventsData || mod.default || [];

  if (RESET) {
    await pool.query("DELETE FROM events");
  }

  let count = 0;
  for (const ev of events) {
    await pool.query(
      `INSERT INTO events (date_label, title, image, full_description, venue)
       VALUES (?,?,?,?,?)`,
      [ev.date, ev.title, ev.image || "", ev.fullDescription || "", ev.venue || ""]
    );
    count++;
  }

  console.log(`Seeded ${count} events.`);
}

async function main() {
  await ensureSchema();
  await seedInstruments();
  await seedEvents();
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
