# 👑 Shubh Aarambh - Royal Wedding Invitation Website

A luxury, interactive Indian royal wedding invitation website recreated from **[myinvitations.io/invitation/shubh-aarambh/](https://myinvitations.io/invitation/shubh-aarambh/)**.

---

## 🌟 Key Features & Animations

1. **Pre-loader**:
   - Circular progress ring counter with smooth easing.
2. **Video Cover Opening ("Tap to Open")**:
   - Fullscreen video & poster cover with glowing animated button.
   - Smooth opening door/unlock transition that automatically plays background music.
3. **Hero Palace Arch Section**:
   - Dynamic palace background (desktop & mobile responsive).
   - Fluttering doves animation across the sky.
   - Royal arch frame, sacred Sanskrit shloka (*मंगलम् भगवान विष्णु...*), host parents' details, and couple names with gold accents.
   - Swaying floral bouquets with mouse parallax and mobile tilt.
4. **Royal Farman / Scroll Unrolling Animation**:
   - Interactive royal scroll (*Patrika*) unrolling with traditional invitation wording.
5. **"Meet The Couple" Profile Cards**:
   - Shimmering gold text gradients for Bride & Groom names.
   - Glowing circular portrait frames.
   - Floating hearts and sparkle animations.
6. **"Save The Date" & Countdown Timer**:
   - Interactive pull-to-reveal royal door/scratch seal.
   - Live real-time countdown timer (Days, Hours, Minutes, Seconds).
7. **Photo Memories - Polaroid Gallery Stack**:
   - Card stack animation with smooth drag and scroll-through.
   - Hanging fairy lights / lanterns with warm filament glow.
   - Fullscreen interactive lightbox viewer.
8. **3D Flip Calendar Book (Wedding Functions)**:
   - Realistic 3D turnable book pages for each function:
     - **Maahi Geet** (Tue, 9 Feb 2027 · 6:30 PM – 9:00 PM)
     - **Wedding Reception** (Wed, 10 Feb 2027 · From 6:00 PM onwards · Dinner at 9:00 PM)
     - **Wedding Phere** (Wed, 10 Feb 2027 · 10:00 PM – 4:00 AM)
     - **Vidaai** (Thu, 11 Feb 2027 · 4:00 AM – 5:00 AM)
   - Dates, timings, venue addresses, *"Get Directions"* and *"Add to Calendar"* buttons.
9. **Venue Details & Google Maps**:
   - Venue highlights (*Le Vivanta - Virar, Mumbai*).
   - Embedded interactive Google Map and navigation link.
10. **Romantic Poetry & Thank You Blessing**:
    - Warm wishes and blessing message in a royal maroon & gold footer.
11. **Floating Background Music Player**:
    - Romantic wedding melody with interactive floating player.
    - Animated music equalizer bars and auto-resume.

---

## 📁 Project Structure

```
Wedding_site/
│
├── index.html         # Main standalone HTML file
├── README.md          # Documentation & customization guide
├── css/
│   └── styles.css     # Complete styling, animations, typography & responsive layouts
├── js/
│   ├── jquery.min.js          # Core helper library
│   ├── animations.js          # GSAP & ScrollTrigger animations
│   ├── cover-video.js         # Video cover & door reveal logic
│   ├── hero-palace.js         # Palace parallax, doves & flower sway
│   ├── event-flip-calendar.js # 3D realistic book page-flip engine
│   ├── door-reveal.js         # Door countdown pull & unlock interaction
│   ├── gallery-coverflow.js   # Polaroid gallery stack & lightbox
│   ├── fireworks.js           # Particle & firework effects
│   ├── music-toggle.js        # Background audio player with equalizer
│   └── frontend.js            # Scroll events & navigation helpers
└── assets/
    ├── sr-logo-gold.png       # Sanjana & Rahul gold monogram logo (transparent)
    ├── sr-logo-maroon.png     # Sanjana & Rahul royal maroon monogram logo
    ├── sr-logo-white.png      # Sanjana & Rahul white monogram logo
    ├── favicon.png            # Website tab favicon badge
    ├── Shubh-Aarambh.mp4      # Royal entrance video
    ├── cover-poster-2.jpg     # Cover poster image
    ├── bride.png / groom.png  # Rahul & Sanjana portraits (FullSizeRender.JPG / IMG_7205.JPG)
    ├── childhood-kids.png     # 'Where It All Began' - These Kids Are Getting Married keepsake poster
    ├── gallery-1.png ... 6    # Photo Memories Polaroid stack (JVK_0543, JVK_0849, IMG_1339, 2.png, us.jpg, shootedits 3)
    ├── wedding-sangeet.webp   # Event 1: Maahi Geet (Dancing celebration illustration)
    ├── wedding-reception.webp # Event 2: Wedding Reception (Grand Baraat horse arrival illustration)
    ├── wedding.webp           # Event 3: Wedding Phere (Mandap & sacred vows illustration)
    ├── wedding-custom.webp    # Event 4: Vidaai (Traditional Doli procession illustration)
    ├── wedding-vanue.webp     # Venue Mandap decor illustration
    ├── ishq_hai_...wav        # Background audio
    └── *.webp / *.png / *.svg # Royal frames, doves, seal badges, ornaments
```

---

## 🚀 How to Run Locally

You can run this project directly with any static server:

### Option 1: Python
```bash
# In the project directory:
python -m http.server 3000
```
Then open `http://localhost:3000` in your web browser.

### Option 2: VS Code Live Server
Right-click on `index.html` and select **"Open with Live Server"**.

---

## 💌 Wedding RSVP & Google Drive / Excel Integration

The website includes an interactive royal RSVP section placed on a gold-flecked royal red background after the celebration footer.

### Form Fields Included:
- **Full Name** (`name`)
- **Email Address** (`email`)
- **Contact / Phone / WhatsApp** (`phone`)
- **Number of People / Guests** (interactive `+` / `−` counter)
- **Occasions / Events Attending** (Multi-select pills: *All Festivities*, *Maahi Geet & Sangeet*, *Wedding Reception*, *Wedding Phere*, *Vidaai*)

### Features:
1. **Google Sheets Sync (Google Drive)**: Automatically appends each guest's RSVP as a new row into your Google Sheet via Google Apps Script.
2. **Offline-Safe Local Backup**: Submissions are automatically backed up in the browser's `localStorage`.
3. **1-Click Excel / CSV Export**: Click **"Download Guest List (Excel CSV)"** at the bottom of the RSVP form to immediately download an Excel-compatible `.csv` file.

---

### 📋 3-Minute Google Sheets Setup (Save directly to Google Drive as Excel):

1. Go to [Google Sheets](https://sheets.google.com) and create a **Blank Spreadsheet**.
2. Name it: `Sanjana & Rahul Wedding RSVPs`.
3. In the top menu, click **Extensions** → **Apps Script**.
4. Open the file `google_apps_script.js` in this repository, copy all the code, and paste it into the Apps Script editor (replacing any default text).
5. Click the **Save** icon (💾).
6. In the top right, click **Deploy** → **New deployment**.
7. Click the gear icon (⚙️) next to *Select type* and choose **Web app**.
8. Fill in:
   - **Description**: `Wedding RSVP Service`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` *(Crucial so guests can submit without signing into Google)*
9. Click **Deploy**, authorize permissions if prompted, and copy the generated **Web app URL** (e.g. `https://script.google.com/macros/s/.../exec`).
10. Open [index.html](file:///d:/Wedding_site/index.html) and paste this URL into the `data-script-url` attribute on `<form id="im-rsvp-form" data-script-url="...">` (or in [rsvp-form.js](file:///d:/Wedding_site/js/rsvp-form.js) line 15).

---

## 🎨 How to Customize

- **Couple & Parents Names**:
  - Bride: `Sanjana Ramakrishnan` (Daughter of `Mr. Visvesvaran Ramakrishnan & Mrs. Rajeswari Ramakrishnan` — Hosts)
  - Groom: `Rahul Singh` (Son of `Mr. Rajkumar Singh & Mrs. Geeta Singh`)
- **Wedding Date & Countdown**: Update `data-countdown-target` in `index.html`.
- **Events & Timings**: In the `.im-flipcal` section in `index.html`, edit the function names, dates, timings, and Google Maps venue links.
- **Photos & Media**: Replace files inside `assets/` (e.g. `bride.png`, `groom.png`, `gallery-*.png`) or change image paths directly in `index.html`.

