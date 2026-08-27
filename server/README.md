# SIC Admin Server

Express + MySQL backend for the SIC-IITI admin panel. Manages **instruments**
and **events** as database records instead of static JS files, so the admin
panel can create/edit/delete them and the public site reflects changes
immediately.

Architecture mirrors OutreachCell's admin panel: a shared-secret header
(`x-admin-secret`) protects write endpoints; reads are public.

## Setup

```bash
cd server
npm install
cp .env.example .env
# edit .env: set DB_HOST/DB_USER/DB_PASSWORD/DB_NAME and a strong ADMIN_SECRET
```

Create the database (schema is applied automatically on boot, but the
database itself must exist first):

```sql
CREATE DATABASE sic_admin CHARACTER SET utf8mb4;
```

Start the server:

```bash
npm start        # or: npm run dev  (auto-restarts on changes)
```

This boots on `http://localhost:5000` by default and creates the
`instruments`, `events`, and `category_descriptions` tables automatically.

## Importing your existing data

Your current `instrumentsData.js` and `eventsData.js` already have real
content — don't retype it. Run the seed script once to import everything
into MySQL:

```bash
INSTRUMENTS_DATA_PATH=/absolute/path/to/frontend/src/data/instrumentsData.js \
EVENTS_DATA_PATH=/absolute/path/to/frontend/src/data/eventsData.js \
npm run seed
```

Existing image paths (e.g. `/assets/instruments/Microscopy/AFM/afm1.jpg`) are
kept exactly as-is — those files already live in the frontend's `public`
folder and don't need to be re-uploaded. Images you add later through the
admin panel are stored under `server/uploads/` and served at
`/uploads/...`.

Safe to re-run with `npm run seed -- --reset` if you need to wipe and
re-import.

## API

All instrument/event fields match the shape of the old static data files
(`fullName`, `usageCharges: { academic, industrial, unit }`, `features: []`,
etc.) so the frontend components barely had to change.

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/api/instruments` | public | full list |
| GET | `/api/instruments/categories` | public | distinct categories + descriptions |
| GET | `/api/instruments/:id` | public | single instrument |
| POST | `/api/instruments` | admin | create |
| PUT | `/api/instruments/:id` | admin | update fields |
| DELETE | `/api/instruments/:id` | admin | delete (and its uploaded images) |
| POST | `/api/instruments/:id/images` | admin | multipart `images` field, appends |
| DELETE | `/api/instruments/:id/images` | admin | body `{ url }`, removes one image |
| PUT | `/api/instruments/categories/:category` | admin | body `{ description }` |
| GET | `/api/events` | public | full list |
| GET | `/api/events/:id` | public | single event |
| POST | `/api/events` | admin | multipart, `imageFile` optional |
| PUT | `/api/events/:id` | admin | multipart, `imageFile` optional |
| DELETE | `/api/events/:id` | admin | delete (and its image) |
| POST | `/api/admin/verify` | admin | used by the login screen to check the secret |

Admin routes require header: `x-admin-secret: <your ADMIN_SECRET>`.

## Deploying

- Put this behind HTTPS (nginx/Caddy reverse proxy, or a platform like
  Render/Railway) — the admin secret travels in a header and must not go
  over plain HTTP.
- Set `CORS_ORIGIN` to your deployed frontend's real origin.
- Persist `server/uploads/` (mount a volume) so uploaded images survive
  deploys/restarts.
