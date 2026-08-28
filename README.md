# SIC - Sophisticated Instrumentation Centre (IIT Indore)

**Live site:** [https://sic.iiti.ac.in](https://sic.iiti.ac.in)

The **Sophisticated Instrumentation Centre (SIC)** web portal is the official web presence for the Sophisticated Instrumentation Centre at the Indian Institute of Technology Indore. SIC is a national facility, established in September 2011, that houses state-of-the-art analytical and characterization instruments — spanning chromatography, microscopy, spectroscopy, X-ray characterization, thermal analysis, and optical/physical property characterization — used by IIT Indore's own students, research scholars, and faculty, as well as external users from other academic institutions, national laboratories, and industry across central India and beyond.

This platform serves as a centralized hub for:

- Showcasing SIC's instruments, facilities, and technical capabilities
- Publishing events, workshops, and training programs
- Sharing usage/fee charges, sample analysis charges, and requisition forms
- Online instrument booking (via the SIC booking portal)
- Facility status, faculty/team directories, outreach activities, and the DST-FIST initiative
- An admin panel for SIC staff to manage instruments and events without touching code

## Tech Stack

**Frontend**
* React 19 (JavaScript)
* Vite (build tool & dev server)
* Tailwind CSS
* React Router DOM (v7)
* Lucide React, Tabler Icons, React Icons (icons)
* React Calendar, React CountUp, Swiper (interactive UI)
* Axios (API calls)

**Backend (Admin API)**
* Node.js + Express
* MySQL (via `mysql2`)
* Multer (image uploads)
* Shared-secret (`x-admin-secret` header) auth for write endpoints

Instruments and events used to live in static JS data files (`instrumentsData.js`, `eventsData.js`). They are now backed by a MySQL database through the `server/` API, so SIC staff can create/edit/delete them from the `/admin` panel and the public site reflects changes immediately — no redeploy required.

## Getting Started

### Frontend

```bash
npm install
cp .env.example .env
# set VITE_API_URL to point at your running backend (default http://localhost:5000)
npm run dev
```

### Backend (required for Events, Instruments, and Admin to work)

```bash
cd server
npm install
cp .env.example .env
# set DB_HOST / DB_USER / DB_PASSWORD / DB_NAME and a strong ADMIN_SECRET
npm start        # or: npm run dev (auto-restarts on changes)
```

The API boots on `http://localhost:5000` by default and creates its required tables automatically on first run. See [`server/README.md`](./server/README.md) for full API documentation, data seeding instructions, and deployment notes.

### Production build

```bash
npm run build     # optimizes images, then builds via Vite
npm run preview   # preview the production build locally
```

## Project Structure

```text
.
│   .env.example
│   .gitignore
│   components.json
│   index.html
│   jsconfig.json
│   package.json
│   postcss.config.js
│   README.md
│   tailwind.config.js
│   vite.config.js
│
├───.github
│   └───workflows
│           deploy.yml
│
├───scripts
│       optimize-images.mjs        # image optimization run before build
│
├───server                          # Express + MySQL admin API (see server/README.md)
│   │   .env.example
│   │   adminAuth.js               # x-admin-secret auth middleware
│   │   db.js                      # MySQL pool + schema bootstrap
│   │   index.js                   # app entry point
│   │   package.json
│   │   README.md
│   │   schema.sql
│   │   uploads.js                 # multer config for instrument/event images
│   │
│   ├───routes
│   │       admin.js               # admin secret verification
│   │       events.js              # /api/events CRUD
│   │       instruments.js         # /api/instruments CRUD
│   │
│   ├───scripts
│   │       seedFromStatic.mjs     # one-time import from old static data files
│   │
│   └───uploads                    # uploaded event/instrument images (served at /uploads)
│           ├───events
│           └───instruments
│
└───src
    │   App.css
    │   App.jsx                    # route definitions
    │   App.test.js
    │   index.css
    │   index.jsx
    │   logo.svg
    │   reportWebVitals.js
    │   setupTests.js
    │
    ├───components                 # shared UI (Navbar, Footer, HeroSlider, calendars, etc.)
    │   │   CustomCalendar.css
    │   │   Footer.jsx
    │   │   GoogleTranslate.jsx
    │   │   HeroSlider.css
    │   │   HeroSlider.jsx
    │   │   ImageScroll.jsx
    │   │   MyCalender.js
    │   │   MyCalender.jsx
    │   │   Navbar.jsx
    │   │
    │   ├───FacultyPage             # faculty listing components
    │   │       HeroSection.css / .jsx
    │   │       SectionTitle.css / .jsx
    │   │       TeamCard.css / .jsx
    │   │
    │   └───ui                      # shadcn/ui-style primitives
    │           button.jsx
    │           card.jsx
    │
    ├───data                        # remaining static reference data
    │       eventsData.js           # legacy fallback / seed source (live data now in MySQL)
    │       FacultyData.js
    │       instrumentsData.js      # legacy fallback / seed source (live data now in MySQL)
    │       TeamData.js
    │
    ├───hooks
    │       useInstrumentsData.js   # fetches/normalizes instrument data from the API
    │
    ├───lib
    │       adminApi.js             # authenticated admin CRUD calls (instruments/events)
    │       adminAuth.js            # admin session/secret handling on the client
    │       api.js                  # public read-only API calls (fetchEvents, fetchInstruments, ...)
    │       config.js               # API_BASE (reads VITE_API_URL)
    │       utils.js
    │
    ├───locales                     # i18n / translation resources
    │
    ├───pages
    │   │   About.jsx
    │   │   Booking.jsx
    │   │   Bookingform.jsx
    │   │   Contact.jsx
    │   │   DstFist.jsx             # DST-FIST scheme page
    │   │   Events.jsx              # public events listing, backed by /api/events
    │   │   Excellence.jsx
    │   │   FAQ.jsx
    │   │   FacultyPage.css / .jsx
    │   │   Home.jsx                # landing page (hero, about, events, impact stats, calendar)
    │   │   Outreach.jsx
    │   │   SampleAnalysisCharges.jsx
    │   │   TeamPage.css / .jsx
    │   │   UsageCharges.jsx
    │   │
    │   ├───Admin                   # /admin panel (protected by ADMIN_SECRET)
    │   │   │   AdminDashboard.jsx
    │   │   │   AdminLayout.jsx
    │   │   │   AdminLogin.jsx
    │   │   │   admin.css
    │   │   │   EventForm.jsx
    │   │   │   EventsAdmin.jsx
    │   │   │   InstrumentForm.jsx
    │   │   │   InstrumentsAdmin.jsx
    │   │   │
    │   │   └───components
    │   │           EmptyState.jsx
    │   │           FormField.jsx
    │   │           FormSheet.jsx
    │   │           ImageDropzone.jsx
    │   │           PageHeader.jsx
    │   │           resolveImageUrl.js
    │   │           Skeleton.jsx
    │   │           StatusBadge.jsx
    │   │           ui.js
    │   │
    │   └───Instruments
    │           FacilityStatus.jsx
    │           InstrumentDetail.jsx
    │           InstrumentForms.jsx
    │           Instruments.jsx     # public instruments listing, backed by /api/instruments
    │
    ├───styles
    │       globals.css
    │
    └───utils
            imageloader.jsx
```

> Note: static assets (images, PDFs/forms) live under a top-level `public/` folder that is served as-is by Vite/the web server and is not tracked in this structure — see `scripts/optimize-images.mjs` for how images are optimized at build time.

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/about` | About SIC |
| `/instruments` | Instruments listing |
| `/instruments/:id` | Instrument detail |
| `/instruments/forms` | Instrument requisition forms |
| `/booking`, `/bookingform` | Instrument booking |
| `/events` | Events & workshops |
| `/faculty`, `/team` | Faculty & team directories |
| `/contact` | Contact / support directory |
| `/faq` | FAQ |
| `/sample-analysis-charges` | Sample analysis charges |
| `/outreach` | Outreach activities |
| `/excellence` | Centre of Excellence (ACR Initiative) |
| `/dst-fist` | DST-FIST scheme |
| `/facility-status` | Live facility/instrument status |
| `/admin/login`, `/admin/*` | Admin panel (instruments & events management) |

## Deployment

The site is deployed at **[sic.iiti.ac.in](https://sic.iiti.ac.in)**. See [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) for the CI/CD pipeline and [`server/README.md`](./server/README.md) for backend deployment notes (HTTPS, `CORS_ORIGIN`, persisting `server/uploads/`, etc.).
