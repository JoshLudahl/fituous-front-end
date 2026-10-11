# Fituous landing page

A static single-page site. No framework, no server rendering, no runtime in the Worker.

## Run it

```bash
cd front-end
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then writes dist/
npm run preview    # serves the built output
```

## Deploy to Cloudflare Workers

```bash
npx wrangler login   # once
npm run deploy       # builds, then uploads dist/ as static assets
```

`wrangler.jsonc` declares nothing but an asset directory, so there is no Worker script and no cold
start. If you ever need per-request rendering (a blog, per-visitor Open Graph images), that is when the
OpenNext adapter becomes worth its weight, and not before.

## Where things live

| File | What it holds |
|---|---|
| `index.html` | The landing page: every section and all the copy |
| `policy.html` | The privacy policy, on the same stylesheet and shell |
| `src/styles.css` | The design. Colours come from the app's own palette (below) |
| `src/main.ts` | Two small behaviours: the mobile nav and the footer year |

Copy lives in `index.html` deliberately. For a one-page site it is easier to edit in place than to keep
in a separate content module that only the page reads.

## Colours

Taken from the app's palette so the page matches the product:

| Token | Value | Used for |
|---|---|---|
| Primary | `#37A9E7` | Links, accents, badges, the app mark |
| Background | `#1A1C1E` | Page surface |
| Success | `#22C55E` | The "yes" column in the comparison |
| Error | `#EF4444` | The "usual deal" column |

The accent is the brand blue everywhere. The app's gold (`#F8C513`) is deliberately absent: it marks
one card inside the product, and a landing page leading with it would lead with a colour that is not
yours.

The greys and borders between those are derived, not copied: the app has more surface tokens than a
landing page needs. Swap them in `src/styles.css` if you want the exact values.

## The privacy policy

`policy.html` is a second page rather than a route, so it builds to `dist/policy.html`.

**Link to it with the `.html` extension.** `wrangler.jsonc` sets
`not_found_handling: "single-page-application"`, which means an unknown path such as `/policy` serves the
landing page instead of this one. `/policy.html` is served as the real file. If you want the extensionless
URL, that needs a Worker script or a redirect rule rather than a static asset.

The page was rebuilt on the site's own stylesheet. It previously loaded Bulma, Google Fonts, FontAwesome
and jsDelivr, plus two local paths that do not exist in this project. Dropping them was not only tidiness:
third-party requests from a page that claims no tracking are a contradiction, and they were the heaviest
thing on it.

One edit to the wording: the copyright line said "Sofklass, LLC" once where it meant "Softklass, LLC".
That looked like a typo in the company's own name rather than a legal distinction, so it is corrected.
Revert it if it was deliberate.

## Before you publish: checklist

- [ ] **Store links.** Every `href="#"` marked `data-store-link` must point at the real App Store and
      Google Play listings. They are deliberately not invented here.
- [ ] **Price.** The page says "one-time purchase" and never states a figure, because it is not mine to
      set. Add one only if you want it in writing.
- [ ] **Screenshots.** The features grid has no images yet; the app's screenshots would go there.
- [ ] **Privacy policy.** It has no "last updated" date. Add one if you want it, rather than have one
      invented for you.
- [ ] **Store links in the policy page header.** The nav there carries the same placeholder CTA.
- [ ] **Claims.** Every factual claim on the page is one you confirmed: no subscription, no account, no
      ads, no tracking, on-device voice, and nothing sold from the Open Food Facts or USDA data. If any
      of those stops being true, the page has to change with it.
# fituous-front-end
