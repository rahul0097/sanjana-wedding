# 💍 Sanjana & Rahul — Royal Wedding Invitation

> *“Two souls, one heart, one beautiful journey.”*

A bespoke, royal Indian wedding invitation web experience crafted for **Sanjana Ramakrishnan & Rahul Singh**, celebrating their sacred union at **Le Vivanta, Virar, Mumbai** from **9th to 10th February 2027**.

🌐 **Live Website**: [https://rahul0097.github.io/sanjana-wedding/](https://rahul0097.github.io/sanjana-wedding/)

---

## 👑 The Couple & Hosts

- **The Bride**: **Sanjana Ramakrishnan**  
  *Daughter of Mrs. Rajeswari Ramakrishnan & Mr. Visvesvaran Ramakrishnan (Hosts)*
- **The Groom**: **Rahul Singh**  
  *Son of Mrs. Geeta Singh & Mr. Rajkumar Singh*
- **Wedding Destination**: **Le Vivanta — Virar, Mumbai, Maharashtra, India**
- **Dates**: **9th — 10th February 2027**

---

## 🌟 Key Features & Interactive Elements

1. **Royal Shubh Aarambh Entrance & Door Reveal**:
   - Cinematic entry video with royal brass fanfare.
   - Interactive golden wax-seal door that opens the invitation upon guest tap.
   - Automatic background music trigger (*"Ishq Hai..."*).

2. **Hero Palace Archway**:
   - Golden Rajasthani palace arch with fluttering doves.
   - Sacred Sanskrit blessing (*मंगलम् भगवान विष्णु...*).
   - Swaying floral marigold garlands responding to mouse move / phone tilt.

3. **Meet The Couple**:
   - Royal circular diamond filigree frames.
   - Perfectly centered portraits for both Bride & Groom (Sanjana & Rahul).
   - Warm golden shimmer typography and romantic couple introductions.

4. **"Where It All Began" & Live Countdown Timer**:
   - Couple keepsake portrait with romantic verse.
   - Real-time countdown timer tracking days, hours, minutes, and seconds until festivities commence.

5. **Photo Memories (Polaroid Gallery)**:
   - Floating Polaroid photo stack with hanging fairy lights and ambient filament glow.
   - Interactive swipe/carousel navigation and full-screen lightbox viewer.

6. **3D Interactive Wedding Itinerary Booklet**:
   - Realistic page-turning flipbook with responsive dual modes:
     - **Desktop**: Horizontal two-page spread with realistic book binding and spine shadow.
     - **Mobile**: Vertical flip card layout optimized for one-thumb scrolling.
   - **4 Sacred Wedding Functions**:
     - 🪕 **Maahi Geet**: Tuesday, 9th Feb 2027 · Royal Hall · 6:30 PM – 9:00 PM
     - 🐎 **Wedding Reception**: Wednesday, 10th Feb 2027 · Jupiter Hall · From 6:30 PM onwards · Dinner at 8:30 PM
     - 🔥 **Wedding Phere**: Wednesday, 10th Feb 2027 · Jupiter Hall · 10:00 PM – 4:00 AM
     - 🕊️ **Vidaai**: Thursday, 11th Feb 2027 · Jupiter Hall · 4:00 AM – 5:00 AM
   - Integrated **"Get Directions"** (Google Maps) and **"Add to Calendar"** (.ics / Google Calendar) buttons on every event.
   - Refined navigation buttons (*Close* and *Next*) with close action smoothly returning to the front cover.

7. **The Venue & Sacred Mandap Showcase**:
   - Panoramic architectural illustration of the sacred Mandap and palace lakeside decor.
   - Venue coordinates, directions, and interactive embedded Google Map for Le Vivanta, Virar.

8. **Interactive Celebration Video Showcase**:
   - Portrait 9:16 vertical reel player framed with a uniform 3px royal gold-to-ruby bezel.
   - Custom gold playback controls: center play button overlay, seekable progress scrubber, live time indicator, volume toggle, and fullscreen.
   - **Smart Audio Coordination**: Background music automatically pauses when the video plays and resumes when paused or finished.

9. **Royal Red RSVP Section (Google Sheets Connected)**:
   - Deep crimson background with royal gold monogram.
   - Multi-event selector pills (*All Festivities*, *Maahi Geet*, *Wedding Reception*, *Wedding Phere*, *Vidaai*).
   - Interactive `+ / −` guest counter.
   - Real-time submission directly to **Google Sheets** via Google Apps Script with permanent local storage backup.

10. **Floating Music Equalizer**:
    - Romantic wedding melody with floating persistent FAB.
    - Animated audio equalizer bars indicating playing state with tap-to-mute.

---

## 📁 Repository Structure

```
Wedding_site/
│
├── index.html                 # Main website markup & semantic structure
├── README.md                  # Project documentation & setup instructions
├── google_apps_script.js      # Backend script for Google Sheets RSVP sync
│
├── css/
│   └── styles.css             # Design system, animations, responsive layouts
│
├── js/
│   ├── celebration-video.js   # Video player & audio pause coordination
│   ├── cover-video.js         # Entry video & wax seal door interaction
│   ├── door-reveal.js         # Countdown pull & reveal logic
│   ├── event-flip-calendar.js # 3D realistic flipbook page engine
│   ├── fireworks.js           # Particle & celebration effects
│   ├── frontend.js            # General DOM interactions & scroll animations
│   ├── gallery-coverflow.js   # Polaroid gallery stack & lightbox viewer
│   ├── hero-palace.js         # Palace parallax, doves & flower sway
│   ├── jquery.min.js          # DOM utility helper
│   ├── music-toggle.js        # Background audio player with equalizer
│   └── rsvp-form.js           # RSVP validation, Google Sheets fetch & state
│
└── assets/
    ├── wedding-video.mp4      # Celebration reel video
    ├── Shubh-Aarambh.mp4      # Royal entrance video
    ├── ishq_hai_...wav        # Background audio
    ├── bride.png              # Sanjana's portrait
    ├── groom.png              # Rahul's portrait (centered)
    ├── childhood-kids.png     # Childhood memories illustration
    ├── sr-logo-gold.png       # Gold monogram emblem
    ├── sr-logo-maroon.png     # Maroon monogram emblem
    ├── wedding-sangeet.webp   # Event 1: Maahi Geet art
    ├── wedding-reception.webp # Event 2: Wedding Reception art
    ├── wedding.webp           # Event 3: Wedding Phere art
    ├── wedding-custom.webp    # Event 4: Vidaai art
    ├── wedding-vanue.webp     # Sacred Mandap venue art
    ├── gallery-1.png ... 6    # Couple photo memories
    └── *.png, *.webp, *.svg   # Royal frames, seals, dividers, ornaments
```

---

## 💌 Live Google Sheets RSVP Setup

The RSVP form sends submissions directly to your personal Google Sheet:

1. Open **[Google Sheets](https://sheets.google.com)** and create a new blank sheet named `Sanjana & Rahul Wedding RSVPs`.
2. Go to **Extensions** ➔ **Apps Script**.
3. Replace any existing code with the contents of [google_apps_script.js](file:///d:/Wedding_site/google_apps_script.js) and save (💾).
4. Click **Deploy** ➔ **New deployment** ➔ Select type: **Web app**.
5. Set **Execute as**: `Me` and **Who has access**: `Anyone`.
6. Click **Deploy**, grant permissions, and copy the **Web app URL**.
7. Paste this URL into [js/rsvp-form.js](file:///d:/Wedding_site/js/rsvp-form.js) line 15:
   ```javascript
   var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
   ```

Each submission records: **Timestamp, Guest Name, Email, Phone, Number of Guests, Selected Events, and Blessings / Notes**.

---

## 🚀 Deployment (GitHub Pages)

This static web invitation is deployed on **GitHub Pages**:

1. In the repository on GitHub, go to **Settings** ➔ **Pages**.
2. Under **Build and deployment** ➔ **Source**, select `Deploy from a branch`.
3. Choose branch: `main` and folder: `/ (root)`.
4. Click **Save**.
5. Your website is automatically published at:
   ```
   https://rahul0097.github.io/sanjana-wedding/
   ```

---

## 💻 Running Locally

To run and preview locally:
```bash
# In the project directory:
python -m http.server 3000
```
Then navigate to `http://localhost:3000` in any web browser.

---

*Made with love for Rahul & Sanjana’s Special Day.*
