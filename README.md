# SIC - Sophisticated Instrument Centre (IIT Indore)

The **Sophisticated Instrument Centre (SIC)** web portal is a modern, responsive web application designed for the Indian Institute of Technology Indore (IIT Indore). This platform serves as a centralized hub to streamline the management, exploration, and reservation of state-of-the-art scientific and analytical instruments housed within the centre, making cutting-edge research facilities accessible to researchers nationwide.


## Tech Stack

* **Frontend Framework:** React 19 (JavaScript)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router Dom (v7)
* **Components & Icons:** Lucide React, Tabler Icons, Swiper (for interactive sliders)

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```


## Project Structure

```text
C:.
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
├───public
│   │   abhinandan.png
│   │   abhinandan2.png
│   │   close-sic.png
│   │   davv-students.png
│   │   Hero_Section_1.jpg
│   │   iiti-logo.png
│   │   manifest.json
│   │   robots.txt
│   │   sic-logo.jpg
│   │   sic.png
│   │   Team_Hero_1.jpg
│   │
│   ├───assets
│   │   ├───dst
│   │   │       gpu.png
│   │   │       nmr.png
│   │   │       raman.png
│   │   │       rtg.png
│   │   │       ult.png
│   │   │       utm.png
│   │   │
│   │   ├───events
│   │   │       event1.png
│   │   │       event2.png
│   │   │
│   │   ├───FacultyPhotos
│   │   │       Team_1.png
│   │   │       Team_10.png
│   │   │       Team_11.png
│   │   │       Team_12.jpeg
│   │   │       Team_13.png
│   │   │       Team_14.jpg
│   │   │       Team_15.jpg
│   │   │       Team_16.jpg
│   │   │       Team_17.jpg
│   │   │       Team_18.jpg
│   │   │       Team_19.jpg
│   │   │       Team_2.png
│   │   │       Team_3.jpg
│   │   │       Team_4.png
│   │   │       Team_5.png
│   │   │       Team_6.png
│   │   │       Team_7.png
│   │   │       Team_8.png
│   │   │       Team_9.jpeg
│   │   │
│   │   ├───Forms
│   │   ├───instruments
│   │   │   │   POLARIMETER-thumb.webp
│   │   │   │   POLARIMETER.jpg
│   │   │   │   POLARIMETER.webp
│   │   │   │   RHEOMETER-thumb.webp
│   │   │   │   RHEOMETER.jpg
│   │   │   │   RHEOMETER.webp
│   │   │   │
│   │   │   ├───BET-Surface-Analyzer
│   │   │   │       BET-thumb.webp
│   │   │   │       BET.jpg
│   │   │   │       BET.webp
│   │   │   │       bet1-thumb.webp
│   │   │   │       bet1.jpeg
│   │   │   │       bet1.png
│   │   │   │       bet1.webp
│   │   │   │       bet2-thumb.webp
│   │   │   │       bet2.png
│   │   │   │       bet2.webp
│   │   │   │
│   │   │   ├───Centre-of-Excellence-ACR-Initiative
│   │   │   │   ├───AK-Viscometer
│   │   │   │   │       image-thumb.webp
│   │   │   │   │       image.png
│   │   │   │   │       image.webp
│   │   │   │   │
│   │   │   │   ├───B-Viscometer
│   │   │   │   │       image-thumb.webp
│   │   │   │   │       image.png
│   │   │   │   │       image.webp
│   │   │   │   │
│   │   │   │   ├───Flash-Point-Tester
│   │   │   │   │       image-thumb.webp
│   │   │   │   │       image.png
│   │   │   │   │       image.webp
│   │   │   │   │       image2-thumb.webp
│   │   │   │   │       image2.png
│   │   │   │   │       image2.webp
│   │   │   │   │       pma300-thumb.webp
│   │   │   │   │       pma300.png
│   │   │   │   │       pma300.webp
│   │   │   │   │
│   │   │   │   ├───FT-IR
│   │   │   │   │       image-thumb.webp
│   │   │   │   │       image.png
│   │   │   │   │       image.webp
│   │   │   │   │
│   │   │   │   ├───ICP-OES
│   │   │   │   │       image-thumb.webp
│   │   │   │   │       image.png
│   │   │   │   │       image.webp
│   │   │   │   │
│   │   │   │   └───Millipore
│   │   │   │           image-thumb.webp
│   │   │   │           image.png
│   │   │   │           image.webp
│   │   │   │
│   │   │   ├───Chromatography
│   │   │   │   ├───GC-MS
│   │   │   │   │       chro_gc1-thumb.webp
│   │   │   │   │       chro_gc1.jpeg
│   │   │   │   │       chro_gc1.png
│   │   │   │   │       chro_gc1.webp
│   │   │   │   │       chro_gc2-thumb.webp
│   │   │   │   │       chro_gc2.png
│   │   │   │   │       chro_gc2.webp
│   │   │   │   │       chro_gc3-thumb.webp
│   │   │   │   │       chro_gc3.png
│   │   │   │   │       chro_gc3.webp
│   │   │   │   │
│   │   │   │   ├───HPLC-RP
│   │   │   │   │       chro_hp-thumb.webp
│   │   │   │   │       chro_hp.png
│   │   │   │   │       chro_hp.webp
│   │   │   │   │
│   │   │   │   └───LC-HRMS
│   │   │   │           LC-HRMS 2-thumb.webp
│   │   │   │           LC-HRMS 2.jpg
│   │   │   │           LC-HRMS 2.webp
│   │   │   │
│   │   │   ├───Element-Analyzer
│   │   │   │       elean-thumb.webp
│   │   │   │       elean.png
│   │   │   │       elean.webp
│   │   │   │
│   │   │   ├───LN2-Plant
│   │   │   │       LIQUID NITROGEN PLANT-thumb.webp
│   │   │   │       LIQUID NITROGEN PLANT.jpg
│   │   │   │       LIQUID NITROGEN PLANT.webp
│   │   │   │
│   │   │   ├───Lyophilizer
│   │   │   │       lyo4-thumb.webp
│   │   │   │       lyo4.jpeg
│   │   │   │       lyo4.webp
│   │   │   │       Lyophilizer Labconco-thumb.webp
│   │   │   │       Lyophilizer Labconco.jpg
│   │   │   │       Lyophilizer Labconco.webp
│   │   │   │       Lyophilizer VirTis-thumb.webp
│   │   │   │       Lyophilizer VirTis.jpg
│   │   │   │       Lyophilizer VirTis.webp
│   │   │   │       VirTis-thumb.webp
│   │   │   │       VirTis.jpeg
│   │   │   │       VirTis.webp
│   │   │   │
│   │   │   ├───Microscopy
│   │   │   │   ├───AFM
│   │   │   │   │       AFM 1-thumb.webp
│   │   │   │   │       AFM 1.jpg
│   │   │   │   │       AFM 1.webp
│   │   │   │   │       AFM 2-thumb.webp
│   │   │   │   │       AFM 2.jpg
│   │   │   │   │       AFM 2.webp
│   │   │   │   │       AFM 3-thumb.webp
│   │   │   │   │       AFM 3.jpg
│   │   │   │   │       AFM 3.webp
│   │   │   │   │       AFM 4-thumb.webp
│   │   │   │   │       AFM 4.jpg
│   │   │   │   │       AFM 4.webp
│   │   │   │   │
│   │   │   │   ├───CLSM
│   │   │   │   │       CLSM 1-thumb.webp
│   │   │   │   │       CLSM 1.jpg
│   │   │   │   │       CLSM 1.webp
│   │   │   │   │       CLSM 2-thumb.webp
│   │   │   │   │       CLSM 2.jpg
│   │   │   │   │       CLSM 2.webp
│   │   │   │   │       mc1-thumb.webp
│   │   │   │   │       mc1.jpeg
│   │   │   │   │       mc1.webp
│   │   │   │   │
│   │   │   │   ├───Gemini-360
│   │   │   │   │       mg1-thumb.webp
│   │   │   │   │       mg1.png
│   │   │   │   │       mg1.webp
│   │   │   │   │       mg2-thumb.webp
│   │   │   │   │       mg2.png
│   │   │   │   │       mg2.webp
│   │   │   │   │
│   │   │   │   ├───Supra-55
│   │   │   │   │       ms1-thumb.webp
│   │   │   │   │       ms1.png
│   │   │   │   │       ms1.webp
│   │   │   │   │       ms2-thumb.webp
│   │   │   │   │       ms2.png
│   │   │   │   │       ms2.webp
│   │   │   │   │       ms3-thumb.webp
│   │   │   │   │       ms3.png
│   │   │   │   │       ms3.webp
│   │   │   │   │
│   │   │   │   └───TEM
│   │   │   │           TEM-1-thumb.webp
│   │   │   │           TEM-1.jpg
│   │   │   │           TEM-1.webp
│   │   │   │           TEM-2-thumb.webp
│   │   │   │           TEM-2.jpg
│   │   │   │           TEM-2.webp
│   │   │   │           tem1-thumb.webp
│   │   │   │           tem1.png
│   │   │   │           tem1.webp
│   │   │   │           tem2-thumb.webp
│   │   │   │           tem2.png
│   │   │   │           tem2.webp
│   │   │   │
│   │   │   ├───Microwave-Reactor
│   │   │   │       MICROWAVE-thumb.webp
│   │   │   │       MICROWAVE.jpg
│   │   │   │       MICROWAVE.webp
│   │   │   │
│   │   │   ├───MilliQ-DI-Water
│   │   │   │       mdw1-thumb.webp
│   │   │   │       mdw1.png
│   │   │   │       mdw1.webp
│   │   │   │
│   │   │   ├───Spectroscopy
│   │   │   │   ├───CD
│   │   │   │   │       CD-thumb.webp
│   │   │   │   │       CD.jpeg
│   │   │   │   │       CD.webp
│   │   │   │   │
│   │   │   │   ├───FT-IR
│   │   │   │   │       s_ft-thumb.webp
│   │   │   │   │       s_ft.png
│   │   │   │   │       s_ft.webp
│   │   │   │   │
│   │   │   │   ├───NMR-400
│   │   │   │   │       NMR-400-thumb.webp
│   │   │   │   │       NMR-400.jpg
│   │   │   │   │       NMR-400.webp
│   │   │   │   │       snmr400_1-thumb.webp
│   │   │   │   │       snmr400_1.jpeg
│   │   │   │   │       snmr400_1.png
│   │   │   │   │       snmr400_1.webp
│   │   │   │   │       snmr400_2-thumb.webp
│   │   │   │   │       snmr400_2.png
│   │   │   │   │       snmr400_2.webp
│   │   │   │   │
│   │   │   │   ├───NMR-500
│   │   │   │   │       NMR 400-thumb.webp
│   │   │   │   │       NMR 400.jpg
│   │   │   │   │       NMR 400.webp
│   │   │   │   │       NMR-500-thumb.webp
│   │   │   │   │       NMR-500.jpg
│   │   │   │   │       NMR-500.webp
│   │   │   │   │       nmr500-thumb.webp
│   │   │   │   │       nmr500.jpeg
│   │   │   │   │       nmr500.webp
│   │   │   │   │       snmr500_1-thumb.webp
│   │   │   │   │       snmr500_1.jpeg
│   │   │   │   │       snmr500_1.png
│   │   │   │   │       snmr500_1.webp
│   │   │   │   │       snmr500_2-thumb.webp
│   │   │   │   │       snmr500_2.png
│   │   │   │   │       snmr500_2.webp
│   │   │   │   │       snmr500_3-thumb.webp
│   │   │   │   │       snmr500_3.png
│   │   │   │   │       snmr500_3.webp
│   │   │   │   │
│   │   │   │   ├───Spectrofluorometer
│   │   │   │   │       FLUORIMETER-thumb.webp
│   │   │   │   │       FLUORIMETER.jpg
│   │   │   │   │       FLUORIMETER.webp
│   │   │   │   │
│   │   │   │   ├───TCSPC
│   │   │   │   │       TCSPC-thumb.webp
│   │   │   │   │       TCSPC.jpg
│   │   │   │   │       TCSPC.webp
│   │   │   │   │
│   │   │   │   ├───UV-VIS-NIR
│   │   │   │   │       UV VIS NIR-thumb.webp
│   │   │   │   │       UV VIS NIR.jpg
│   │   │   │   │       UV VIS NIR.webp
│   │   │   │   │
│   │   │   │   └───UV-Visible-Spectrometer
│   │   │   │           UV VIS SPECTROMETER-thumb.webp
│   │   │   │           UV VIS SPECTROMETER.jpg
│   │   │   │           UV VIS SPECTROMETER.webp
│   │   │   │
│   │   │   ├───Thermal-Analysis
│   │   │   │   ├───DSC
│   │   │   │   │       ta_d1-thumb.webp
│   │   │   │   │       ta_d1.jpeg
│   │   │   │   │       ta_d1.png
│   │   │   │   │       ta_d1.webp
│   │   │   │   │       ta_d2-thumb.webp
│   │   │   │   │       ta_d2.png
│   │   │   │   │       ta_d2.webp
│   │   │   │   │
│   │   │   │   └───TGA
│   │   │   │           ta_t1-thumb.webp
│   │   │   │           ta_t1.jpeg
│   │   │   │           ta_t1.png
│   │   │   │           ta_t1.webp
│   │   │   │           ta_t2-thumb.webp
│   │   │   │           ta_t2.png
│   │   │   │           ta_t2.webp
│   │   │   │           ta_t3-thumb.webp
│   │   │   │           ta_t3.png
│   │   │   │           ta_t3.webp
│   │   │   │
│   │   │   └───X-Ray
│   │   │       ├───BSE-BSD
│   │   │       │       xb1-thumb.webp
│   │   │       │       xb1.png
│   │   │       │       xb1.webp
│   │   │       │
│   │   │       ├───EDS-EDX
│   │   │       │       xe1-thumb.webp
│   │   │       │       xe1.png
│   │   │       │       xe1.webp
│   │   │       │       xe2-thumb.webp
│   │   │       │       xe2.png
│   │   │       │       xe2.webp
│   │   │       │
│   │   │       └───SCXRD
│   │   │               SC-XRD 1-thumb.webp
│   │   │               SC-XRD 1.jpg
│   │   │               SC-XRD 1.webp
│   │   │               SC-XRD 2-thumb.webp
│   │   │               SC-XRD 2.jpg
│   │   │               SC-XRD 2.webp
│   │   │               SC-XRD-thumb.webp
│   │   │               SC-XRD.jpg
│   │   │               SC-XRD.webp
│   │   │
│   │   ├───outreach
│   │   │       masters-visit.png
│   │   │       outreach-sic.jpeg
│   │   │       saumya-gupta.png
│   │   │       sic-army-visit.png
│   │   │       sic-ppl.png
│   │   │       sic-ppl2.png
│   │   │       visit.png
│   │   │       workshop-fesem.png
│   │   │
│   │   ├───slider
│   │   │       AFM 1.jpg
│   │   │       bet.jpeg
│   │   │       BET.jpg
│   │   │       clsm.jpeg
│   │   │       dsc.jpeg
│   │   │       event1.png
│   │   │       gc-ms.jpeg
│   │   │       hplc.png
│   │   │       LC-HRMS 2.jpg
│   │   │       slider1.png
│   │   │       tga1.jpeg
│   │   │
│   │   └───TeamPhotos
│   │           Team_1.jpg
│   │           Team_2.jpeg
│   │           Team_3.jpg
│   │           Team_4.jpg
│   │           Team_5.jpg
│   │           Team_6.jpg
│   │           Team_7.jpg
│   │
│   └───documents
│           500_NMR_request_form.pdf
│           AFM requisition form.pdf
│           BET Surface Analyzer.pdf
│           CD.pdf
│           Confocal.pdf
│           Elemental Analysis_CHNS.pdf
│           FLUORESCENCE SPECTROSCOPY.pdf
│           FTIR (1).pdf
│           GCMS (3).pdf
│           LC-HRMS.pdf
│           NMR.pdf
│           RP-HPLC.pdf
│           Sample Requirements.docx
│           SIC-Fee-Structure-15-July-2026.pdf
│           SIC-Fee-Structure-29.09.2025.pdf
│
├───scripts
│       optimize-images.mjs
│
└───src
    │   App.css
    │   App.jsx
    │   App.test.js
    │   index.css
    │   index.jsx
    │   logo.svg
    │   reportWebVitals.js
    │   setupTests.js
    │
    ├───components
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
    │   ├───FacultyPage
    │   │       HeroSection.css
    │   │       HeroSection.jsx
    │   │       SectionTitle.css
    │   │       SectionTitle.jsx
    │   │       TeamCard.css
    │   │       TeamCard.jsx
    │   │
    │   └───ui
    │           button.jsx
    │           card.jsx
    │
    ├───data
    │       eventsData.js
    │       FacultyData.js
    │       instrumentsData.js
    │       TeamData.js
    │
    ├───lib
    │       utils.js
    │
    ├───locales
    ├───pages
    │   │   About.jsx
    │   │   Booking.jsx
    │   │   Bookingform.jsx
    │   │   Contact.jsx
    │   │   DstFist.jsx
    │   │   Events.jsx
    │   │   Excellence.jsx
    │   │   FacultyPage.css
    │   │   FacultyPage.jsx
    │   │   FAQ.jsx
    │   │   Home.jsx
    │   │   Outreach.jsx
    │   │   SampleAnalysisCharges.jsx
    │   │   TeamPage.css
    │   │   TeamPage.jsx
    │   │   UsageCharges.jsx
    │   │
    │   └───Instruments
    │           FacilityStatus.jsx
    │           InstrumentDetail.jsx
    │           InstrumentForms.jsx
    │           Instruments.jsx
    │
    ├───styles
    │       globals.css
    │
    └───utils
            imageloader.jsx

```
