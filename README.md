# KT Buyers' Agent

Marketing site for KT Buyers' Agent — an independent property buyers' advocate serving Brisbane and the Gold Coast.

Static HTML / CSS / JS. No build step. Deployed via GitHub Pages.

## Local preview

Just open `index.html` in a browser, or run any static server:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Hosted on GitHub Pages from the `main` branch. Any push to `main` redeploys.

## Structure

- `index.html` — single-page site
- `css/styles.css` — styles
- `js/main.js` — mobile nav, scroll reveal, footer year
- `assets/` — favicon and SVG images
- `.nojekyll` — tells Pages to serve files as-is

## Before going live

- Replace `hello@ktbuyersagent.com.au` and phone number with real contact details
- Replace the Formspree form `action` URL (or swap for a different form backend)
- Swap the SVG portrait placeholder for a real photo
- Update REBAA membership claim, PI cover amount, and licence details to match reality
