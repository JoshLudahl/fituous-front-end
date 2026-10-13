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
| `index.html` | The landing page: every section, all the copy, and the Tailwind utilities that lay it out |
| `policy.html` | The privacy policy, on the same stylesheet and shell |
| `src/styles.css` | The design tokens. Tailwind v4 reads them from `@theme`; there is no `tailwind.config.js` |
| `src/main.ts` | Two small behaviours: the mobile nav and the footer year |

Copy lives in `index.html` deliberately. For a one-page site it is easier to edit in place than to keep
in a separate content module that only the page reads.

## Styling

Tailwind v4, through the official Vite plugin (`@tailwindcss/vite`) — a plugin and a CSS `@import`,
with no PostCSS step, no config file and no build step of its own.

```css
@import "tailwindcss";

@theme {
  --color-brand: #37a9e7;   /* becomes bg-brand, text-brand, border-brand, … */
  --container-wrap: 1120px; /* becomes max-w-wrap */
  --breakpoint-nav: 820px;  /* becomes max-nav: and nav: */
}
```

`src/styles.css` is the only place a colour or a size is written down. The markup carries the
utilities, so a component's styling is readable at the point of use, and two of the layout's own
breakpoints are named rather than numeric:

| Breakpoint | At | What it changes |
|---|---|---|
| `nav` | 820px | The menu collapses behind the toggle |
| `wide` | 980px | The feature tour goes from one column to two |

Both keep the pixel values the hand-written stylesheet used, because they belong to this layout rather
than to a device.

The one thing that is *not* a utility is the `@layer base` block at the foot of `src/styles.css`: a
heading's leading and the margin under a paragraph are properties of the tag, and repeating them on
forty paragraphs would be noise. Everything else, including the pseudo-element ticks and the FAQ's
open marker, is a utility with a variant (`before:content-['✓']`, `group-open:after:content-['–']`).

Two consequences worth knowing before you edit:

- **Preflight un-bolds `h1`–`h6`.** Tailwind resets heading weight to inherit, so a heading that needs
  to be bold says so: `font-bold`, `font-extrabold`. This is the one preflight reset that bites
  silently.
- **State is an attribute, not a class.** The open menu and the scrolled nav are `data-open` and
  `data-stuck`, set by `src/main.ts` and read by `data-[open]:` / `data-[stuck]:` variants. Variant
  order matters: the menu is written `max-nav:data-[open]:flex` so the open state lands after
  `max-nav:hidden` in the generated CSS and wins.


## Colours

Taken from the app's palette so the page matches the product, and declared once in the `@theme` block
of `src/styles.css`:

| Token | Value | Utilities | Used for |
|---|---|---|---|
| `--color-brand` | `#37A9E7` | `bg-brand`, `text-brand`, `border-brand` | Links, accents, badges, the app mark |
| `--color-page` | `#1A1C1E` | `bg-page` | Page surface |
| `--color-page-alt` | `#202326` | `bg-page-alt` | The alternating band behind Features and FAQ |
| `--color-surface` | `#23262A` | `bg-surface` | Cards, the mobile menu, the nav toggle |
| `--color-success` | `#22C55E` | `text-success`, `border-success` | The "yes" column in the comparison |
| `--color-danger` | `#EF4444` | `text-danger`, `border-danger` | The "usual deal" column |

The accent is the brand blue everywhere. The app's gold (`#F8C513`) is deliberately absent: it marks
one card inside the product, and a landing page leading with it would lead with a colour that is not
yours.

The greys and borders between those (`--color-ink`, `--color-ink-dim`, `--color-ink-faint`,
`--color-line`, `--color-line-strong`) are derived, not copied: the app has more surface tokens than a
landing page needs. Swap them in `src/styles.css` if you want the exact values.

One thing to know about the accent: the uppercase kickers ("Logging", "Progress", "Health platforms")
are brand blue. They always said `color: var(--primary)` in the hand-written stylesheet, but a
more specific rule for paragraphs was quietly overriding it to grey; the utilities no longer have that
accident to inherit. Add `text-ink-dim` to a kicker to put it back to grey.


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
