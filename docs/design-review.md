# Homepage design review — findings and decisions

Review of the rendered homepage after the section-by-section refinement (November 2026). Each finding now carries the owner's decision: done, kept as is (with the reason), or deferred.

**How it was checked:** full-page renders at 375, 768, 1024 and 1440 px, plus live-browser checks of the booking path, contrast, keyboard focus, reduced motion and markup.
**Not verified:** the Google map (it did not load in either test browser), real phones, Safari, screen readers.

## Recommended order

1. [x] ~~Book directly from every "Objednat se" button (1.1)~~ — **kept as is by decision**, see 1.1. The sticky-header fix (1.3) was split out and is **done**.
2. [ ] Put the concrete facts in the hero instead of the generic badges (2.1) — **deferred**: generic wording stays for now.
3. [ ] Fill the missing prices for whitening and the home-care lesson (2.2) — **deferred**.
4. [x] ~~Fix the gold heading contrast (1.2)~~ — **kept as is by decision**, see 1.2.
5. [ ] Use real clinic photos in the hero and the second O nás block (2.3, 2.4) — **deferred** until a suitable photo exists.

## 1. Critical usability and accessibility

### 1.1 Booking takes two steps — header, hero, mobile menu (observable)

Every "Objednat se" button links to `#contact`. The only link that actually books is "Rezervovat termín online" (Hygessa, `CONTACT.bookingUrl`) inside the opening-hours card. A patient who clicks "Objednat se" expects a booking form and lands on a section they must read and click again; on mobile that is a long scroll and a second tap.

**Fix (proposed):** point the hero and header "Objednat se" buttons straight to `CONTACT.bookingUrl` (new tab, calendar icon, like the contact button). Keep "Naše služby" as the secondary hero button; Kontakt keeps phone and e-mail for people who prefer to call.

**Decision — keep as is.** Not every patient wants to book through the online system; many prefer to call. "Objednat se" therefore leads to Kontakt, where the online booking button, phone number and e-mail sit side by side and the patient chooses. Since then, the Kontakt card also gets a soft gold arrival cue after the jump (see `docs/motion-audit.md`), which points straight at the booking options.

### 1.2 Gold heading words fall below contrast requirements — all section headings (observable)

`.text-gradient-gold` runs from `--color-gold-deep` (4.0:1 on the background) to `--color-gold-bright` (2.0:1). Large text needs 3:1, so the light end of the key words ("Váš komfort", "Zlín-Malenovice", …) fails.

**Fix (proposed):** keep the gradient, but darken its light stop so the whole word stays above 3:1.

**Decision — keep the original gradient.** A compliant version was tried (light end mixed to `color-mix(in oklch, var(--color-gold-bright) 35%, var(--color-gold-deep))`, 4.0:1 → 3.1:1), but it narrowed the range between the two golds so much that the gradient almost disappeared, and the shimmer is part of the brand look. The original deep → bright gradient stays; its light end remains below the 3:1 guideline as a known, accepted trade-off. A comment in `tailwind.css` points here. If revisited: start the gradient from a deeper gold instead of lightening less, which keeps a visible range while staying at 3:1 or above.

### 1.3 Sticky header may hide keyboard focus — whole page (likely; not confirmed by automated check)

The sticky header is 105 px tall (desktop) and `html` has no `scroll-padding-top`. Tabbing backwards can scroll a focused link under the header (WCAG 2.4.11). Section anchors use `scroll-mt-24` (96 px), so jumps land 9 px under the header.

**Fix:** add `scroll-padding-top` of about 112 px on `html` (one line in `tailwind.css`).

**Done.** `<html>` now has `scroll-pt-24 md:scroll-pt-28` (96 / 112 px, header 81 / 105 px) in `Layout.astro`, replacing the per-section `scroll-mt-24`. Measured: every section jump lands 15 px (mobile) / 7 px (desktop) below the header, and a link parked under the header scrolls fully into view when it receives keyboard focus.

## 2. High-impact visual improvements

### 2.1 The hero hides the clinic's best facts (observable)

The subtitle "Profesionální péče pro Váš krásný úsměv." and the three badges (Profesionální péče, Moderní prostředí, Citlivý přístup) could belong to any clinic. The page's meta description already lists the concrete reasons to choose this clinic — POLIMAL Malenovice, online booking, free parking, step-free access, prices from 1 050 Kč — but on the page they appear only at the bottom.

**Fix:** replace the `VALUES` badges in `Hero.astro` with those facts, same row and icon style. Text change, not a layout change.

**Decision — deferred.** The generic wording stays for now; making it more specific and authentic is planned for later. Since the review, the badges became one quiet dotted line (hero refinement), so a later swap is a text-only change in `VALUES`.

### 2.2 Two services have no price — Služby / Ceník (observable)

"Bělení zubů" and "Instruktáž domácí péče" are listed in Služby but missing from `src/data/pricing.ts`. Whitening is the service patients most often want priced before booking.

**Fix:** add both to the price list (prices must come from the clinic), or label them "cena po konzultaci". Optional: show "od … Kč" on each service card next to the duration.

**Decision — deferred.** To be done later, once the prices are settled.

### 2.3 The hero photo is the least clinic-specific image (subjective, high impact)

`landing_page.png` (family with toothbrushes) is polished but looks like a stock photo; every other image shows the real room or the real hygienist.

**Fix:** a real clinic photo inside the blob frame — the hygienist in the room, or a calm detail of the treatment chair. Needs new photography.

**Decision — deferred** until a good, suitable photo exists. Replacement brief: real clinic photo, at least 2000 px square, soft daylight, warm neutrals; subject in the central two-thirds so the blob crop never cuts it. (The current image's alt text was corrected in the hero refinement.)

### 2.4 The hygienist appears twice in a row — O nás → Náš tým (observable)

The second O nás block ends with her selfie (`person_new.png`), and Náš tým opens with her portrait (`profil.png`) in the same outfit. It reads as a repeat. `person_new2.png` is the same selfie, so it is not a substitute.

**Fix:** a different photo in that O nás block (treatment room, instruments, waiting area); if none is available, drop the image and center the card at a reading width.

**Decision — deferred** together with 2.3, until suitable photos exist.

### 2.5 O nás has a lot of text before practical information (content preference)

Seven points, about 200 words; "Šetrný přístup bez stresu", "Přátelská a uvolněná atmosféra" and "Individuální péče přesně na míru" overlap. On mobile it is about two screens of text before the team, services or prices.

**Fix:** merge into four or five points, one or two sentences each. Content only; layout stays.

## 3. Optional finishing touches

- [ ] **Gap below the hero (1440 px):** about 180 px between the hero and "O nás", more than between other sections. Reduce to match.
- [ ] **Short FAQ near Kontakt (content):** what happens at the first visit, how to cancel, whether health insurance contributes (often via bonus programs).
- [ ] **Google map and privacy:** the iframe loads content from Google. Mention it in the privacy policy, or replace it with a static map image and an "Otevřít v Mapách" link (lighter, consent-free).
- [ ] **Footer brand:** plain "SanaDenta" text where the header uses the logo; a light logo variant would tie them together (needs the asset).
- [ ] **Active section in navigation:** nice to have on a one-page site, not necessary.
- Repeated section-heading pattern (label, centered H2, intro) — consistent and fine; leave as is.

## Keep as is

- Warm cream and gold palette, Playfair Display + Inter, gold italic key phrase in headings.
- Hero blob frame and gold line-and-star ornament; blob portrait in Náš tým.
- Real photography of the treatment room (SanaDenta cup) and of the hygienist.
- Whiter `bg-card` panels across sections (see Design rules in `README.md`).
- Ceník: three category cards, lining numerals, duration on every item.
- Kontakt: hours with the booking button, one card for phone/e-mail/address, access note.
- Accessibility baseline: `lang="cs"`, alt text on all images, ordered headings, skip link, 2 px deep-gold focus ring (5.4:1), `motion-safe` animations, body text 7:1, button text 10:1, 44 px main touch targets.
