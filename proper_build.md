# Proper Build Plan — Fahrschule Findeisen Premium Scroll-Website

**Quelle:** `docs/superpowers/specs/2026-07-07-premium-scroll-website-design.md`
**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v3 · Framer Motion 12 · Lenis (neu)
**Komplexität:** GROSS (kompletter Neubau, 11 Routen, ~25 Komponenten)

---

## 1. Anforderungs-Zusammenfassung

- Startseite als cinematisches Scroll-Erlebnis mit 7 Sektionen, davon 2 Pin-Szenen (Hero, Führerscheinklassen).
- 10 Unterseiten (6 mit Inhalt, 4 als `ComingSoon`), damit kein Navigationslink 404 wirft.
- Design-System "Confident Blue" (`#0d3d6e` → `#1a65b0` → `#2f8fe0`), Manrope (Display) + Inter (Text) via `next/font/google`.
- Alle Inhalte sind reale Geschäftsdaten aus der Spec — **keine erfundenen Preise, Bewertungen oder Fotos**. Platzhalter klar im Code markieren.
- `prefers-reduced-motion`: Pin-Szenen, Parallax, Intro und Lenis entfallen; einfache Fades bleiben.
- Bestehende Dateien (`components/Header.tsx`, `HeroSection.tsx`, `TeamSection.tsx`, `NewsSection.tsx`, `FloatingContactButton.tsx`, `app/page.tsx`-Inhalt, `app/globals.css`-Inhalt, `IMPLEMENTATION_IMPROVMENTS.md`) sind verworfen → löschen bzw. ersetzen.

## 2. Ist-Zustand (verifiziert)

| Befund | Konsequenz |
|---|---|
| `package.json`: framer-motion ^12, next ^15.3, react ^19, tailwind ^3 | Nur `lenis` neu installieren |
| Alte Komponenten liegen flach unter `components/` | Löschen, neue Struktur `components/{layout,home,shared}/` |
| Kein `lib/`-Ordner | `lib/data/` neu anlegen |
| Kein Git-Repo | Kein Branch nötig; destruktive Schritte trotzdem erst nach Plan-Freigabe |
| Tailwind v3 mit `tailwind.config.ts` | Farb-/Font-Tokens dort erweitern (nicht v4-CSS-Syntax verwenden) |

## 3. Build-Phasen

### Phase 0 — Aufräumen & Fundament
1. `npm install lenis`
2. Löschen: `components/Header.tsx`, `HeroSection.tsx`, `TeamSection.tsx`, `NewsSection.tsx`, `FloatingContactButton.tsx`, `IMPLEMENTATION_IMPROVMENTS.md`
3. `tailwind.config.ts`: Farbpalette `brand` (navy `#0d3d6e`, mid `#1a65b0`, sky `#2f8fe0` + Abstufungen 50–950), Font-Familien `display`/`sans` (CSS-Variablen), Container-/Radius-/Shadow-Tokens
4. `app/globals.css` neu: Reset-Ergänzungen, Rausch-Textur-Overlay (CSS `::after` mit SVG-Noise als data-URI), Selection-Farbe, Utility-Klassen für Glas-Karten, Link-Unterstreichungs-Animation

**Validierung:** `npx tsc --noEmit` läuft ohne Fehler (alte Imports entfernt).

### Phase 1 — Datenschicht (`lib/data/`)
Alle Inhalte typisiert an einer Stelle, Startseite + Unterseiten teilen die Quelle:

| Datei | Inhalt |
|---|---|
| `lib/data/licenseClasses.ts` | 10 Klassen (AM…T) mit Mindestalter, Beschreibung, `isHighlight` für B/B197-USP |
| `lib/data/team.ts` | 12 Personen mit Rolle (Inhaber/Fahrlehrer:in/Verwaltung/Zweigstelle), Spitznamen |
| `lib/data/fleet.ts` | Fahrzeuge nach Kategorie (PKW/Zweirad/LKW/Traktor) + `brands`-Array für Marquee |
| `lib/data/locations.ts` | Hauptsitz Hormersdorf + Zweigstelle Zwönitz mit Adresse, Telefon, E-Mail, Öffnungszeiten |

**Validierung:** `npx tsc --noEmit`.

### Phase 2 — Shared- & Layout-Komponenten
Reihenfolge nach Abhängigkeit (Blätter zuerst):

1. `components/shared/Button.tsx` — Varianten primary/secondary/ghost, magnetischer Hover (Framer Motion `useMotionValue`, deaktiviert bei reduced motion), als `<Link>` oder `<button>`
2. `components/shared/AnimatedCounter.tsx` — zählt bei `whileInView` hoch (`useMotionValue` + `animate`), reduced motion → statischer Endwert
3. `components/shared/BrandMarquee.tsx` — CSS-Keyframe-Loop mit dupliziertem Track, `pause` bei reduced motion, Marken aus `fleet.ts`
4. `components/shared/LicenseClassCard.tsx`, `TeamMemberCard.tsx`, `LocationCard.tsx` — präsentationale Karten mit Gradient-Platzhalterflächen (Kommentar: `/* PLATZHALTER: durch echtes Foto in /public ersetzen */`)
5. `components/shared/ComingSoon.tsx` — Seitentitel als Prop, kurzer Text, CTA zu `/kontakt`
6. `components/layout/SmoothScrollProvider.tsx` — Client-Komponente: Lenis-Instanz in `useEffect`, `raf`-Loop, **Skip komplett bei `useReducedMotion()`**, Cleanup bei Unmount
7. `components/layout/Header.tsx` — Sticky-Nav, Wortmarken-Logo (Text, Blau-Verlauf per `bg-clip-text`, Kommentar „austauschbar gegen Logodatei"), Links: Start, Über uns, Klassen, Preise, Aufbauseminare, Termine, Checkliste, BKF, Kontakt; Mobile-Burger mit Framer-Motion-Overlay; Hintergrund-Blur ab Scrollposition > 0
8. `components/layout/Footer.tsx` — beide Standorte (aus `locations.ts`), Öffnungszeiten, Tel/E-Mail, Links zu `/impressum` + `/datenschutz`
9. `components/layout/ScrollProgress.tsx` — dünne Top-Leiste (`useScroll().scrollYProgress` + `scaleX`) + rechter Rand: klickbare Sektions-Punkte (nur ≥ `lg`, IntersectionObserver für aktive Sektion, scrollt zu Anker-IDs)

**Validierung:** `npx tsc --noEmit`; Komponenten kompilieren im Dev-Server.

### Phase 3 — Startseite (7 Sektionen)
`app/layout.tsx` zuerst: Manrope + Inter via `next/font/google` als CSS-Variablen, `<SmoothScrollProvider>`, Header, Footer, Metadata (Titel, Description, `lang="de"`).

Dann `components/home/` in Seitenreihenfolge, `app/page.tsx` komponiert alle mit Anker-IDs (`#hero`, `#warum`, `#klassen`, `#team`, `#bewertungen`, `#preise`, `#kontakt`):

1. **`Hero.tsx` (Pin-Szene):** Vollbild `min-h-screen`, Sticky-Container über ~200vh, Markenblau-Verlauf, Headline „Dein Weg zum Führerschein" mit Mask-Reveal (übergroße Schrift, `clipPath`/`y`-Transform an `useScroll` gekoppelt), Subline (Familienbetrieb, Zwönitz/Hormersdorf), CTAs „Jetzt anmelden" → `/kontakt` und „Klassen ansehen" → `#klassen`. Optionaler Intro-Moment: Logo-Fade beim Erstbesuch, `sessionStorage`-Flag, überspringbar per Klick, entfällt bei reduced motion. Reduced motion → statischer Hero mit Fade.
2. **`WhyUs.tsx`:** 3 USP-Karten (moderne Flotte inkl. E-Autos, Familienbetrieb seit Jahrzehnten, 2 Standorte), gestaffeltes `whileInView`-Einfaden, darunter `BrandMarquee`.
3. **`LicenseClassesShowcase.tsx` (Pin-Szene):** Sticky-Panel über ~300–400vh; Klassen-Chips (10 Klassen), aktive Klasse dockt beim Scrollen an (Scroll-Fortschritt → Index), Detail-Panel wechselt mit `AnimatePresence`; B197 als hervorgehobener Innovations-Hinweis. Reduced motion / Mobile-Fallback: normale scrollbare Karten-Liste (Chips als Tabs per Klick).
4. **`TeamTeaser.tsx`:** `AnimatedCounter` (12 Teammitglieder, 10 Klassen, 2 Standorte), 3–4 Beispiel-Karten, Link „Ganzes Team kennenlernen" → `/ueber-uns`.
5. **`Reviews.tsx`:** Sterne + 2–3 Platzhalter-Zitate, im Code deutlich markiert: `/* PLATZHALTER-BEWERTUNGEN — durch echte Kundenstimmen ersetzen */`.
6. **`PricingCta.tsx`:** dunkle Navy-Kontrastsektion, Beratungsversprechen, „Preise auf Anfrage", CTA „Angebot anfragen" → `/kontakt`, Sekundärlink → `/preise`.
7. **`FinalCta.tsx`:** finaler CTA mit beiden `LocationCard`s, Telefonnummer klickbar (`tel:`), Link → `/kontakt`.

**Scroll-Farbverlauf:** Wrapper in `page.tsx` interpoliert Hintergrundfarbe zwischen Sektionen (`useScroll` + `useTransform` auf CSS-Variable), bei reduced motion statische Abschnittsfarben.

**Validierung:** Dev-Server, komplette Seite durchscrollen (Desktop + 375px), Pin-Szenen und Fortschrittsleiste prüfen.

### Phase 4 — Unterseiten
Gleiche Farbwelt/Typografie, **keine** Pin-Szenen, nur einfache `whileInView`-Fades:

| Route | Inhalt |
|---|---|
| `/ueber-uns` | Story-Intro, alle 12 Teammitglieder (`team.ts`), Flotte nach Kategorien (`fleet.ts`), beide Standorte |
| `/fahrerlaubnisklassen` | Alle 10 Klassen als interaktives Accordion/Karten (Client-Komponente), B197-Hinweis prominent |
| `/preise` | „Preise auf Anfrage"-Sektion, Beratungs-CTA → `/kontakt`, keine Preistabelle |
| `/kontakt` | Beide Standorte mit Adresse/Öffnungszeiten/Tel/E-Mail, Kartenplatzhalter (Gradient-Fläche, markiert) |
| `/impressum` | Angaben aus `locations.ts`; Lücken (USt-ID, Aufsichtsbehörde) als **„[durch Betreiber zu ergänzen]"** markiert |
| `/datenschutz` | DSGVO-Grundstruktur (Verantwortlicher, Hosting, Rechte); Lücken ebenso markiert |
| `/aufbauseminare`, `/termine`, `/checkliste`, `/bkf-module` | je `<ComingSoon title="…" />` |

**Validierung:** Alle Header-/Footer-Links klicken — keiner führt ins Leere.

### Phase 5 — Verifikation & Abschluss
1. `npm run build` — Produktions-Build fehlerfrei
2. Reduced-Motion-Check in DevTools (Rendering → Emulate `prefers-reduced-motion`): Pin-Szenen/Parallax/Intro entfallen, Inhalte vollständig erreichbar, natives Scrollen
3. Responsive-Check: 375px, 768px, 1280px
4. Alle Navigationslinks (Header + Footer + Inline-CTAs) durchklicken
5. Lighthouse-Sichtprüfung: keine Layout-Shifts durch Fonts (`display: swap` via next/font automatisch)

## 4. Datei-Übersicht

| Datei | Aktion |
|---|---|
| `package.json` | UPDATE — `lenis` hinzufügen |
| `tailwind.config.ts` | UPDATE — Brand-Tokens |
| `app/globals.css`, `app/layout.tsx`, `app/page.tsx` | ERSETZEN |
| `app/{ueber-uns,fahrerlaubnisklassen,preise,kontakt,impressum,datenschutz,aufbauseminare,termine,checkliste,bkf-module}/page.tsx` | NEU (10 Dateien) |
| `components/layout/{Header,Footer,ScrollProgress,SmoothScrollProvider}.tsx` | NEU |
| `components/home/{Hero,WhyUs,LicenseClassesShowcase,TeamTeaser,Reviews,PricingCta,FinalCta}.tsx` | NEU |
| `components/shared/{LicenseClassCard,TeamMemberCard,LocationCard,BrandMarquee,AnimatedCounter,ComingSoon,Button}.tsx` | NEU |
| `lib/data/{licenseClasses,team,fleet,locations}.ts` | NEU |
| `components/{Header,HeroSection,TeamSection,NewsSection,FloatingContactButton}.tsx`, `IMPLEMENTATION_IMPROVMENTS.md` | LÖSCHEN |

## 5. Risiken

| Risiko | Wahrscheinlichkeit | Gegenmaßnahme |
|---|---|---|
| Lenis + Framer `useScroll` desynchron (Pin-Szenen ruckeln) | MITTEL | Lenis im `raf`-Loop ohne eigenes Easing-Hijacking von nativen Ankern; `scrollTo` von Lenis für Sektions-Punkte nutzen |
| Pin-Szenen auf Mobile unbrauchbar (wenig Viewport) | MITTEL | Klassen-Showcase bekommt expliziten Mobile-Fallback (Tabs statt Scroll-Docking) |
| SSR/Hydration-Fehler durch `sessionStorage`-Intro | MITTEL | Intro erst nach Mount rendern (`useEffect`-Flag), Server rendert immer ohne Intro |
| `next lint` schlägt fehl (keine ESLint-Config im Repo sichtbar) | NIEDRIG | Verifikation über `tsc --noEmit` + `next build`, lint nur falls konfiguriert |
| Tailwind v3 vs. v4 Syntaxverwechslung | NIEDRIG | Tokens ausschließlich in `tailwind.config.ts`, kein `@theme` |
| Farbverlauf-Interpolation zwischen Sektionen teuer | NIEDRIG | Nur eine CSS-Variable am Wrapper animieren, keine per-Element-Repaints |

## 6. Abnahme-Checkliste

- [x] `npm run build` läuft fehlerfrei (12 Routen, alle statisch)
- [x] Startseite: 7 Sektionen mit Anker-IDs; Pin-Szenen, Fortschrittsleiste, Sektions-Punkte und Counter per Headless-Chrome-Screenshots verifiziert (Klassen-Docking wechselt korrekt mit Scroll-Position, Punkt-Klick scrollt via Lenis zu #kontakt)
- [x] Alle 10 Unterseiten erreichbar (HTTP 200), unbekannte Route wirft 404, alle internen Links zeigen auf existierende Routen
- [x] Reduced motion (emuliert): Pin-Strecken entfallen (Scrollhöhe 7907px → 4521px), Lenis deaktiviert, Inhalte vollständig sichtbar, keine Konsolen-/Hydration-Fehler
- [x] Responsive: 375px und 1280px per Screenshot geprüft, keine Layout-Brüche
- [x] UI/UX-Audit (ui-ux-pro-max): Fokus-Ringe auf allen eigenen interaktiven Elementen ergänzt (`.focus-ring`-Utility), Touch-Targets auf ≥44px angehoben (Burger 44×44, Klassen-Chips 56×46, Filter-Buttons 64×44) — per Playwright gemessen und bestätigt
- [x] Keine erfundenen Daten; Platzhalter (Bewertungen, Fotos, Karte, Impressums-Lücken) im Code kommentiert
- [x] Alte Komponenten & `IMPLEMENTATION_IMPROVMENTS.md` entfernt
