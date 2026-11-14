# Hotel Shree Shivay, Omkareshwar — website

A fast, mobile-first website for **Hotel Shree Shivay (होटल श्री शिवाय)**, Omkareshwar.
Plain HTML, CSS and JavaScript: no framework, no npm packages, no API keys.

## What's on the site

- Hero with room photo slideshow, Google rating (4.3★, 27 reviews) and "Rooms from ₹2,050"
- **WhatsApp booking** everywhere (number 88279 95348): header, hero, floating button,
  bottom bar on phones, and a booking form that writes the message for the guest
  (name, dates, nights, guests, AC/Non-AC)
- Phone numbers 88279 95348 and 62666 90461 shown with tap-to-call
- **English / हिंदी** switch (remembered on the guest's device)
- Rooms (AC / Non-AC), facilities, video tour (autoplays muted when on screen),
  photo gallery with filters and full-screen viewer (swipe on phones)
- Explore Omkareshwar (Mamleshwar and Omkareshwar Jyotirlinga, ghats, parikrama, Ekatma Dham)
- Real Google reviews, Google Map (no key needed), FAQ
- SEO: page title and description, Google "Hotel" structured data, link preview image for WhatsApp/Facebook,
  sitemap, favicon and app icons

## Folders

| Path | What it is |
|---|---|
| `site/` | The website source. Edit files here. |
| `site/index.html` | All page content (English text) |
| `site/assets/js/main.js` | Behaviour + **Hindi translations** (`HI = { ... }`) and WhatsApp message text (`MSG`) |
| `site/assets/css/styles.css` | Design (colours are at the top under `:root`) |
| `site/assets/img/`, `site/assets/video/` | Web-ready photos and videos |
| `scripts/build.mjs` | Copies `site/` to `dist/` and fills in the website address |
| `netlify.toml` | Netlify settings |
| `tools/prepare_media.py` | Re-creates the web photos/videos from `Images/` and `Videos/` |
| `Images/`, `Videos/` | Original WhatsApp photos/videos (not published) |

## Deploy to Netlify

### Option A — from GitHub (recommended; updates go live on every push)

1. Put this folder in a GitHub repository. The `.gitignore` already leaves out the
   property registry PDF, `dist/` and test files.
2. In Netlify: **Add new site → Import an existing project →** pick the repository.
3. Netlify reads `netlify.toml` automatically (build command `node scripts/build.mjs`,
   publish folder `dist`). Click **Deploy**.

### Option B — drag and drop (no GitHub)

1. On your computer run: `node scripts/build.mjs`
   (or `SITE_URL=https://www.yourdomain.com node scripts/build.mjs` once you have a domain).
2. In Netlify: **Add new site → Deploy manually**, and drag the **`dist`** folder in.

### Add your domain (when you buy one)

1. Netlify → your site → **Domain management → Add a domain**, and follow the DNS steps.
2. Netlify turns on HTTPS automatically.
3. **Redeploy** (Deploys → Trigger deploy). The build picks up the new domain by itself
   and puts it in the SEO tags, link preview and sitemap. (With drag-and-drop, rebuild
   with `SITE_URL=...` and drag `dist` again.)

### After going live

- Add the website link to your **Google Business Profile** (the Maps listing shows "Add website").
- Share the link on WhatsApp once to check the preview image shows.

## Common edits

- **Price**: search for `2,050` in `site/index.html` and `site/assets/js/main.js` (Hindi text).
- **Phone / WhatsApp number**: search for `8827995348` and `88279 95348` in `site/`,
  and update `WA_NUMBER` at the top of `main.js`.
- **Text**: English is in `index.html`; the Hindi version of the same line is in `main.js`
  under the same key (for example `data-i18n="hero.lead"` ↔ `"hero.lead": "..."`).
- **New photos**: add them to `Images/`, list them in `tools/prepare_media.py`, run
  `python3 tools/prepare_media.py /path/to/ffmpeg`, then add them to the gallery in `index.html`.

## Test locally

```bash
node scripts/build.mjs
python3 -m http.server 8080 --directory dist
# open http://localhost:8080
```
