# SIC-IITI Admin Panel — Setup Guide

This package adds an OutreachCell-style admin panel to your existing
SIC-IITI React site: a login-protected `/admin` area to add, edit, and
delete **Instruments** (including categories and images) and **Events**.
Data moves from the static `instrumentsData.js` / `eventsData.js` files
into a MySQL database, served by a small Express API.

## What's in here

```
server/               → new Express + MySQL backend (run this separately)
frontend-updates/     → new & changed files to drop into your existing frontend
```

Nothing in your existing project is modified automatically — you copy
`frontend-updates/src/...` on top of your own `src/` folder.

## 1. Set up the backend

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env`:
- `DB_HOST` / `DB_USER` / `DB_PASSWORD` / `DB_NAME` — your MySQL connection
- `ADMIN_SECRET` — a long random password; this is what logs you into `/admin`
- `CORS_ORIGIN` — your frontend's URL (`http://localhost:5173` for local dev)

Create the database once:

```sql
CREATE DATABASE sic_admin CHARACTER SET utf8mb4;
```

Start it:

```bash
npm start
```

It boots on `http://localhost:5000` and creates its tables automatically.

### Import your existing instruments & events

Don't retype your data — import what you already have:

```bash
INSTRUMENTS_DATA_PATH=/absolute/path/to/frontend/src/data/instrumentsData.js \
EVENTS_DATA_PATH=/absolute/path/to/frontend/src/data/eventsData.js \
npm run seed
```

See `server/README.md` for full details (API reference, deployment notes).

## 2. Update the frontend

Copy everything from `frontend-updates/src/` into your project's `src/`
folder (it will add new files and overwrite `App.jsx` and a handful of
pages that now fetch from the API instead of the static data files).
Also copy `.env.example` to your frontend project root.

```bash
cp -r frontend-updates/src/*  /path/to/your/frontend/src/
cp frontend-updates/.env.example /path/to/your/frontend/.env
```

Then in your frontend's `.env`, confirm `VITE_API_URL` points at your
running server (`http://localhost:5000` locally).

Restart your Vite dev server. Visit `/admin/login` and enter your
`ADMIN_SECRET`.

## What changed on the public site

- `Instruments.jsx`, `InstrumentDetail.jsx`, `Events.jsx`,
  `FacilityStatus.jsx`, `InstrumentForms.jsx`, `UsageCharges.jsx` now
  fetch instruments/events from the API instead of importing the static
  files, so anything you add/edit/delete in `/admin` shows up on the
  live site immediately.
- `SampleAnalysisCharges.jsx` and `Booking.jsx` were left untouched —
  they only use the static billing/contact info (`sampleAnalysisInfo`)
  and instrument request-form PDFs (`instrumentForms`), which aren't
  part of what you asked to manage. Say the word if you'd like those
  made admin-editable too.
- `instrumentsData.js` / `eventsData.js` are no longer imported by the
  pages above, but I left the files in place — nothing deletes them.
  Feel free to remove them once you've confirmed the seed import
  worked and the site looks right.

## Using the admin panel

- `/admin/login` — enter the admin secret
- `/admin/instruments` — list, search, edit, delete instruments
- `/admin/instruments/new` — add one (category accepts free text, with
  autocomplete of your existing categories)
- Editing an instrument lets you upload/remove images inline
- `/admin/events` — list, edit, delete events
- `/admin/events/new` — add one, with an optional image upload

## Known limitations / good next steps

- Auth is a single shared secret (like OutreachCell), not per-user
  accounts — fine for a small team, not for granular permissions.
- No image reordering yet (new uploads are appended to the end).
- No drag-and-drop category management UI — categories are just a text
  field with autocomplete; renaming a category means editing it on
  each instrument.
- `instrumentForms` (the PDF request forms) and `sampleAnalysisInfo`
  (billing/contact block) are still static — happy to wire those into
  the admin panel next if useful.
