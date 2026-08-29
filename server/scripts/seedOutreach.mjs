import { pool, ensureSchema } from "../db.js";

const RESET = process.argv.includes("--reset");

// The original Outreach visitor list used to live as a hardcoded array in
// src/pages/Outreach.jsx. It's inlined here since that's where it
// previously lived (there's no separate outreachData.js source file).
const OUTREACH_SEED = [
  {
    date: "18-19 June 2026",
    title: "Workshop on FE-SEM and AFM",
    image: "/assets/outreach/workshop-fesem.png",
    description: "",
  },
  {
    date: "Oct 15, 2025",
    title: "Prof Irina A. Kurzina VISIT SIC",
    image: "/assets/outreach/visit.png",
    description: "Professor from Tomsk state university, Russia Visit SIC",
  },
  {
    date: "Oct 14, 2025",
    title: "Masters students from IPS academy Indore visit to SIC",
    image: "/assets/outreach/masters-visit.png",
    description: "",
  },
  {
    date: "July 24, 2025",
    title: "FOREIGN ARMY OFFICERS VISIT SIC",
    image: "/assets/outreach/sic-army-visit.png",
    description: "Under MCTE MHOW",
  },
  {
    date: "June 6, 2025",
    title: "Visit of Ms. Saumya Gupta IAS",
    image: "/assets/outreach/saumya-gupta.png",
    description: "Visit of Ms. Saumya Gupta IAS ,Joint secretary Technical Education, MoE , GoI",
  },
  {
    date: "July 15, 2024",
    title: "Send off function for Ms. Mitali Dave",
    image: "/assets/outreach/sic-ppl.png",
    description: "",
  },
  {
    date: "May 30, 2024",
    title: "Visit of Dr. K. Sivan",
    image: "/assets/outreach/outreach-sic.jpeg",
    description: "BOG Chairman IIT Indore and Former Chairman ISRO visit to SIC",
  },
  {
    date: "December 22, 2022",
    title: "Foreign students visit under exchange program",
    image: "/assets/outreach/sic-ppl2.png",
    description: "",
  },
];

async function main() {
  await ensureSchema();

  // Idempotent by default: skip entries that already exist (matched by
  // title + date), so running this more than once never creates duplicates.
  // Pass --reset to wipe the table first and insert everything fresh.
  if (RESET) {
    await pool.query("DELETE FROM outreach");
  }

  let inserted = 0;
  let skipped = 0;

  for (const item of OUTREACH_SEED) {
    if (!RESET) {
      const [existing] = await pool.query(
        "SELECT id FROM outreach WHERE title = ? AND date_label = ?",
        [item.title, item.date]
      );
      if (existing.length > 0) {
        skipped++;
        continue;
      }
    }

    await pool.query(
      `INSERT INTO outreach (date_label, title, image, description)
       VALUES (?,?,?,?)`,
      [item.date, item.title, item.image || "", item.description || ""]
    );
    inserted++;
  }

  console.log(`Seeded ${inserted} outreach entries (skipped ${skipped} already present).`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
