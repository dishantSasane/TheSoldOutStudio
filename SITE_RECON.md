# SITE RECON — soldoutlabsgrowth.wixstudio.com/soldoutlabs
> Generated 2026-03-25 via Playwright MCP. Screenshots in `public/recon/`.

---

## FONTS

| Role | Font Stack | Computed Size |
|------|-----------|--------------|
| Hero H1 | `sora, sans-serif` | 169px |
| About/Services H2 | `sora, sans-serif` | 64–72px |
| Get a Quote H2 | `sora, sans-serif` | 119px |
| Stats H2 ("Your source of growth") | `madefor-display` | 38px |
| Body / form labels | `madefor-text` | ~16px |
| Logo wordmark ("SoldOut Labs") | `wfont_11f19f_...` / `orig_movatif_w_00_bold` | 30px |

**Summary:** Two primary typefaces — **Sora** (all uppercase hero headings) and **Madefor** (subheadings + body). Logo uses a custom Wix-loaded display font (Movatif Bold).

---

## COLORS

| Hex | RGB | Usage |
|-----|-----|-------|
| `#EB0000` | `rgb(235, 0, 0)` | Primary red — hero text, CTAs, services bg, form bg |
| `#000000` | `rgb(0, 0, 0)` | Footer bg, "TRUSTED BY" marquee text, body text |
| `#FFFFFF` | `rgb(255, 255, 255)` | White — text on dark/red, navbar bg, stats bg |
| `#333133` | `rgb(51, 49, 51)` | Dark charcoal — secondary body text |
| `rgba(0,0,0,0.8)` | — | Semi-transparent dark overlay on about section |

---

## SECTIONS (top → bottom, scroll positions from JS recon)

### 1. Navbar (sticky, always visible)
- **Background:** White / transparent
- **Logo:** Asterisk-snowflake SVG icon (black) + stacked "SoldOut / Labs" text in custom Movatif Bold
- **Nav links:** "About", "Services" — in red (`#EB0000`), no underline, serif feel
- **CTA button:** "Contact Us" — red-outline pill (border `#EB0000`, text `#EB0000`, white fill on hover)
- **Mobile:** Hamburger icon shown, collapses to full-screen overlay

### 2. Hero (scroll-pinned, ~3955px scroll height)
- **Background:** White left side, dark right side
- **H1:** "STEP INTO THE SPOTLIGHT WITH SOLDOUT!" — Sora 169px, RED, uppercase, very tight tracking
- **Subtitle:** "No one can miss you now" — madefor-text, dark, ~18px
- **CTA:** "Get a Quote" — red filled pill button
- **Right panel:** 4 stacked billboard videos that slide in from bottom as user scrolls:
  1. `00006.mov` — car brand on LED billboard
  2. Decorative — animated brand billboard
  3. Decorative — cosmic/galaxy billboard (Times Square-style)
  4. `new.mov` — street billboard night
- **Animation:** Each video panel translates from `translateY(100%)` to `translateY(0)` as scroll progresses. Section is `position: sticky` with 4× viewport height.

### 3. Stats ("Your source of growth")
- **Background:** White
- **H2:** "Your source of growth" — madefor-display 38px, RED, centered
- **Subtitle:** "Empowering brands with targeted digital and outdoor advertising" — madefor-text, dark
- **Stats (3 columns, all red):**
  - `35%` — "ROI growth through strategic OOH ads"
  - `10M` — "Consumers saw our campaigns in the past year"
  - `25%` — "Increase in conversion rate across various industries"
- **Numbers font:** Sora, ~200px, RED, ultra-bold

### 4. About — Creative Force (full-bleed video section, 957px)
- **Background:** Full-bleed video (`00003.mov`) — nighttime city billboard with Cask & Co ad
- **Overlay:** Red diagonal banner (rotated ~-20deg) containing H2 in Sora white 64px
- **H2:** "THE CREATIVE FORCE BEHIND YOUR BRAND'S SUCCESS"
- **Animation:** Red banner appears to rotate/slide in on scroll entry

### 5. About — Copy Overlay (957px, overlaid on same video)
- White card overlay (top-right quadrant) with lorem ipsum placeholder text:
  > "This is a space to share more about the business…"
- This is **Wix default placeholder content** — not real copy

### 6. Services (full-width, 923px)
- **Background:** `#EB0000` (full red)
- **H2:** "A FULL SPECTRUM OF SERVICES TO REACH YOUR TARGET AUDIENCE" — Sora 72px, WHITE
- **Subtitle:** "From strategy to execution, we bring campaigns that deliver" — madefor-display, white
- **Numbered list (white, madefor-display):**
  - 01 Billboards and large format displays
  - 02 Transit advertising
  - 03 Place-based advertising
  - 04 Digital out-of-home (OOH)
- **CTA:** "Contact Us Today" — white outline pill
- **No image** — text-only layout, full red bg

### 7. Trusted By (1134px)
- **Background:** White
- **Giant marquee:** "TRUSTED BY" repeated — Sora ~500px+, BLACK, scrolls left continuously
- **Client logos scattered** (rotated, absolute-positioned, top and bottom):
  - foreva*, Ocean, Skripton, Wheelbus, HERA (top row)
  - Rei, Datox.Ai, LADERATE, Drivery, SOMETHING (bottom row)
- **Logo style:** Mix of red and black logos, various sizes, tilted randomly

### 8. Dark Transition / Section (847px at 8617)
- Appears to be a transitional section — full-bleed dark/video background
- Functions as visual separator between Trusted By and Form

### 9. Contact Form / "GET A QUOTE" (546px)
- **Background:** `#EB0000`
- **H2:** "GET A QUOTE" — Sora 119px, WHITE, uppercase, stacked left
- **Form (right side, white inputs):**
  - First name* / Last name*
  - Email* / Phone (with country selector)
  - "Requested service" dropdown (default: "Billboards & Large Format Displays")
  - White "Submit" button (full-width)

### 10. Footer (330px)
- **Background:** `#000000` (black)
- **Logo:** Asterisk-snowflake icon in white + red partial arc
- **Columns:**
  - **Site menu:** About, Services, Contact Us
  - **Follow us:** Instagram, Facebook, Youtube, TikTok (all pointing to WixStudio — placeholder)
  - **Contact:** info@mysite.com / 123-456-7890 / 500 Terry Francine Street — **all placeholder**
  - **Legal:** Privacy Policy, Accessibility Statement
- **Bottom bar:** "© 2026 by SoldOut Labs. Built on Wix Studio"

---

## ANIMATIONS (scroll-triggered)

| Section | Animation | Type |
|---------|-----------|------|
| Hero | 4 videos slide up sequentially | JS scroll-pinned, `translateY` |
| About | Red diagonal banner rotates/reveals on entry | CSS transform rotate |
| Stats | Numbers/text fade-up on viewport enter | IntersectionObserver + CSS |
| Trusted By | "TRUSTED BY" text scrolls left infinitely | CSS marquee / `animation: scroll` |
| Services list | Items stagger-fade in | IntersectionObserver + CSS delay |

---

## MOBILE (375px)

- Navbar shrinks to hamburger; logo still shows icon + text
- Hero H1 text scales down (still huge, ~40vw)
- Videos stack vertically (full-width column)
- Stats 3-col collapses to single column, numbers still large
- Services list remains readable, single column
- Trusted By logos shift to flex rows (no absolute scatter)
- Form remains side-by-side on narrow — slightly cramped but functional
- Footer columns collapse to vertical stack

---

## PAGES

- `/` — Home (single-page, all sections)
- `/privacy-policy` — exists (Wix default)
- `/accessibility-statement` — exists (Wix default)
- No other pages detected

---

## PLACEHOLDER CONTENT (NOT REAL)

- About body copy: Wix default filler text
- Footer contact: info@mysite.com, 123-456-7890, San Francisco address
- Footer social: links to WixStudio accounts
- Brand: "SoldOut Labs" on Wix vs "The SoldOut Studio" on V1 — different brand name
