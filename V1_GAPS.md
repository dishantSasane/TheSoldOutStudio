# V1 GAP ANALYSIS
> V1 (TheSoldOutStudio Next.js) vs Wix Reference (soldoutlabsgrowth.wixstudio.com/soldoutlabs)
> Priority order: 🔴 = ship-blocker, 🟠 = high, 🟡 = medium, 🟢 = low/intentional difference

---

## NAVBAR

| Status | Item | V1 | Wix Reference |
|--------|------|----|---------------|
| ❌ | Background color | `var(--sol-red)` — full red bg | White / transparent |
| ❌ | Logo treatment | Plain text "The SoldOut Studio" (no icon) | Asterisk SVG icon + "SoldOut Labs" stacked wordmark |
| ✅ | Nav links | About, Services | About, Services |
| ✅ | CTA button | "Contact Us" — pill style | "Contact Us" — pill style |
| ❌ | CTA button color | White outline on red bg | Red outline on white bg |
| ✅ | Mobile hamburger | ✅ present | ✅ present |

**🔴 Priority fix:** Navbar background should be **white**, not red. The red navbar makes V1 look completely different on first impression. Nav link and CTA colors need inverting.

---

## HERO

| Status | Item | V1 | Wix Reference |
|--------|------|----|---------------|
| ✅ | Scroll-pinned mechanic | ✅ stacking videos on scroll | ✅ same |
| ✅ | H1 text | "STEP INTO THE SPOTLIGHT WITH SOLDOUT!" | Same |
| ✅ | H1 color | Red | Red |
| ✅ | H1 font | Sora-weight bold | Sora |
| ❌ | H1 size | `clamp(2.6rem, 7vw, 7.5rem)` → max ~108px | 169px (much larger) |
| ❌ | Subtitle | "Don't worry, It's already SoldOut." | "No one can miss you now" |
| ❌ | CTA text | "Start Your Growth" | "Get a Quote" |
| ❌ | Video count | 3 videos | 4 videos |
| ✅ | Progress track indicators | ✅ present (V1 addition) | ❌ not on Wix |
| ✅ | Scroll hint | ✅ present | ❌ not on Wix |
| ✅ | Mobile hero | Dedicated full-screen video bg | Same page responsive |

**🟠 Priority fix:** H1 font size is ~35% too small vs reference. The impact comes from the 169px scale. CTA copy and subtitle should match reference.

---

## STATS SECTION

| Status | Item | V1 | Wix Reference |
|--------|------|----|---------------|
| ❌ | Section headline | "Why Brands Choose Us" | "Your source of growth" |
| ❌ | Layout | 3 feature cards (icon + title + desc) | 3 giant number stats (35% / 10M / 25%) |
| ❌ | Content type | Qualitative (pillars/features) | Quantitative (metrics) |
| ❌ | Number sizes | None | ~200px Sora RED numbers |
| ❌ | Subtitle | "We focus on consistency…" | "Empowering brands with targeted digital and outdoor advertising" |
| ✅ | Background | White | White |
| ✅ | Scroll-reveal animation | ✅ fade-up on intersect | ✅ |

**🔴 Priority fix:** This section is a complete visual mismatch. Reference uses **massive red numbers** (35% / 10M / 25%) as the centrepiece. V1 has feature cards. Needs full replacement with giant metric numbers layout.

---

## ABOUT / CREATIVE FORCE SECTION

| Status | Item | V1 | Wix Reference |
|--------|------|----|---------------|
| ✅ | Full-bleed video background | ✅ | ✅ |
| ✅ | H2 text (approx) | "THE CREATIVE FORCE BEHIND YOUR BRAND'S GROWTH" | "THE CREATIVE FORCE BEHIND YOUR BRAND'S SUCCESS" |
| ❌ | H2 word | "GROWTH" | "SUCCESS" |
| ✅ | H2 font | Sora bold white uppercase | Sora bold white uppercase |
| ❌ | Red diagonal banner | ❌ missing — text is bottom-aligned overlay | ✅ rotating red banner containing H2 |
| ✅ | Body copy | Real copy about SoldOut services | ❌ Wix placeholder lorem ipsum |
| ❌ | Body copy position | Bottom-left area | White card top-right overlay |
| 🟢 | Copy quality | V1 has **better, real copy** | Placeholder — V1 wins here |

**🟠 Priority fix:** The diagonal red banner animation is the visual signature of this section on the reference. V1 is missing it entirely — just has text at the bottom. Add rotated red banner element with the H2. Also fix "GROWTH" → "SUCCESS".

---

## SERVICES SECTION

| Status | Item | V1 | Wix Reference |
|--------|------|----|---------------|
| ❌ | Background | `var(--sol-black)` — BLACK | `#EB0000` — full RED |
| ❌ | H2 text | "End-to-End Content & Social Media Solutions" | "A FULL SPECTRUM OF SERVICES TO REACH YOUR TARGET AUDIENCE" |
| ❌ | H2 size | `clamp(1.6rem, 4vw, 2.8rem)` | 72px Sora |
| ✅ | Numbered list (01–04) | ✅ | ✅ |
| ❌ | Service items content | Content Production, Creative Media, Social Management, Strategy | Billboards, Transit, Place-based, Digital OOH |
| 🟢 | Service content accuracy | V1 content is **correct for their actual business** | Wix = OOH/billboard agency (different business) |
| ✅ | "Contact Us Today" CTA | ✅ white outline pill | ✅ white outline pill |
| ✅ | Stagger animation | ✅ fade-up with delay | ✅ |

**🔴 Priority fix:** Background color is the biggest visual miss — section should be **RED not black**. H2 size needs to be much larger (~72px). Keep the V1 service content (it's correct for the actual business), but adopt the Wix layout treatment: white text on red, large Sora H2, full-bleed red.

---

## TRUSTED BY

| Status | Item | V1 | Wix Reference |
|--------|------|----|---------------|
| ✅ | Scattered logo layout | ✅ rotated absolute positioning | ✅ same |
| ✅ | Giant marquee text | ✅ | ✅ |
| ❌ | Marquee text | "TRUSTED BY THE BEST" | "TRUSTED BY" (just two words, bigger) |
| ✅ | Background | White | White |
| ✅ | Marquee color | Black | Black |
| ✅ | Logo rotation treatment | ✅ | ✅ |
| 🟢 | Brand logos | Different (SutraHR, Autofina, etc.) | Different (foreva*, Ocean, etc.) — expected |
| ✅ | Mobile flex-row logos | ✅ present | ✅ |

**🟡 Priority fix:** Marquee text — remove "THE BEST", just use "TRUSTED BY". This also makes the text larger in the viewport.

---

## CONTACT / CTA SECTION

| Status | Item | V1 | Wix Reference |
|--------|------|----|---------------|
| ✅ | Background | Red | Red |
| ❌ | H2 text | "READY TO GET SOLDOUT?" | "GET A QUOTE" |
| ❌ | H2 size | `clamp(3rem, 8vw, 6rem)` | 119px Sora |
| ❌ | CTA mechanic | WhatsApp button (primary) + Instagram link | Traditional HTML form (first/last name, email, phone, service dropdown) |
| 🟢 | WhatsApp approach | V1 WhatsApp-first is **better for their market** | Form-based — Wix default widget |
| ❌ | Form fields | None — no form | First name, Last name, Email, Phone, Service dropdown, Submit |

**🟠 Priority fix:** H2 size is too small vs reference (119px vs ~72px max in V1). Consider adding "GET A QUOTE" as H2 or keeping "READY TO GET SOLDOUT?" but scaling it to reference size. The WhatsApp CTA is a deliberate V1 improvement — keep it. But the heading visual weight needs to match the reference.

---

## FOOTER

| Status | Item | V1 | Wix Reference |
|--------|------|----|---------------|
| ✅ | Background | Black | Black |
| ✅ | Logo | SVG asterisk-snowflake icon | Same iconography |
| ✅ | Site menu column | About, Services, Contact Us | Same |
| ❌ | "Follow us" column | ❌ missing as column — social links only in bottom bar | Instagram, Facebook, Youtube, TikTok |
| ✅ | Contact column | Real address (Vasai West) | Placeholder (San Francisco) |
| ✅ | Legal column | Privacy Policy, Accessibility Statement | Same |
| ❌ | Copyright text | "The SoldOut Studio" | "SoldOut Labs" — different brand name |

**🟡 Priority fix:** Add dedicated "Follow us" column to footer with Instagram (primary) + WhatsApp links. Real social links, not Wix placeholders.

---

## MISSING SECTIONS (in Wix, not in V1)

| Status | Section | Notes |
|--------|---------|-------|
| 🔴 Missing | Giant number stats (35% / 10M / 25%) | Core trust signal — completely absent in V1 |
| 🟡 Missing | Dark transition section between Trusted By and Form | Visual breathing room, dark video bg |

---

## V1-ONLY ADDITIONS (not on Wix — keep these)

| Item | Why it's better |
|------|----------------|
| Hero progress track indicators | Gives user context about which video is playing |
| Hero scroll hint (pulsing line) | Educates user to scroll |
| Real About copy | Wix has placeholder lorem ipsum; V1 has actual brand story |
| Real service descriptions | V1 services match actual business (content/social media, not OOH) |
| WhatsApp CTA | More appropriate for their market than a cold web form |
| Real contact address (Vasai West) | Wix has San Francisco placeholder |
| Pre-filled WhatsApp message | Reduces friction for lead conversion |

---

## PRIORITY FIX ORDER

| Priority | Fix | Impact |
|----------|-----|--------|
| 🔴 1 | Navbar: change bg from red → white, invert link/button colors | First impression, entire visual tone |
| 🔴 2 | Stats: replace feature cards with 35% / 10M / 25% giant number layout | Missing the centrepiece trust section |
| 🔴 3 | Services: change bg from black → red | Major visual mismatch with reference |
| 🟠 4 | Hero H1: scale up font size to ~169px equivalent | Needs more visual impact |
| 🟠 5 | About: add diagonal red banner element around H2 | Signature visual treatment missing |
| 🟠 6 | About H2: "GROWTH" → "SUCCESS" | Copy alignment |
| 🟠 7 | Services H2: increase size to ~72px Sora | Undersized vs reference |
| 🟠 8 | Contact H2: increase size to ~119px equivalent | Undersized vs reference |
| 🟡 9 | Trusted By: shorten marquee to "TRUSTED BY" (drop "THE BEST") | Makes text larger, matches reference |
| 🟡 10 | Footer: add "Follow us" column with real social links | Missing column |
| 🟡 11 | Hero subtitle: "No one can miss you now" | Copy alignment |
| 🟡 12 | Hero CTA: "Get a Quote" | Copy alignment |
