# Fahrschule Findeisen — Premium Scroll-Website (Design Spec)

## Ziel

Die Startseite wird komplett neu gebaut als hochwertiges, interaktives Scroll-Erlebnis, das sich anfühlt wie eine Agentur-Website im hohen vierstelligen/fünfstelligen Euro-Bereich. Ergänzend entstehen funktionale, aber weniger choreografierte Unterseiten für die wichtigsten Themen, damit kein Navigationslink ins Leere führt.

Alle bestehenden Dateien im Projekt (`components/Header.tsx`, `components/HeroSection.tsx`, `components/TeamSection.tsx`, `components/NewsSection.tsx`, `components/FloatingContactButton.tsx`, `app/page.tsx`, `app/globals.css`, `IMPLEMENTATION_IMPROVMENTS.md`) gelten als verworfen und werden durch einen kompletten Neubau ersetzt. Tailwind, Next.js 15 (App Router), React 19 und TypeScript bleiben als Basis-Stack erhalten.

## Reale Geschäftsdaten (von https://www.fahrschule-findeisen.de/ übernommen)

- **Name:** Fahrschule Findeisen, Inhaber Max Findeisen
- **Hauptsitz:** Jahnsbacher Straße 5, 08297 Zwönitz OT Hormersdorf — Tel: 03721-22256, E-Mail: info@fahrschule-findeisen.de
  - Öffnungszeiten: Mo 8–15 Uhr, Di 13–18 Uhr, Mi geschlossen, Do 13–18 Uhr, Fr geschlossen, sowie nach Vereinbarung
- **Zweigstelle Zwönitz:** Schillerstr. 8, 08297 Zwönitz — Do 13–15 Uhr
- **Führerscheinklassen:** AM (ab 15), A1 (ab 16), A2 (ab 18), A (ab 20*), B (ab 17/18), BE (ab 17/18), C (ab 18*), CE (ab 18*), L (ab 16), T (ab 16)
  - Besonderheit **Klasse B197**: Ausbildung auf Schalt- und Automatikfahrzeug, Prüfung auf Automatik — als USP hervorheben
- **Aufbauseminare:** ASF (Nachschulung), FES (Punktabbau)
- **BKF-Module:** Weiterbildung für Berufskraftfahrer
- **Team:** 12 Personen — Max Findeisen (Inhaber, Fahrlehrer B/BE/A), Jens Findeisen (Fahrlehrer seit 1980), René Göttner, Matthias „MaBu" Bucher, Alice Torres Rojas, Yves Walzel, Josefine „Josi" Kersandt, Carolin „Caro" Günther, Lena Haase, Rebecca Kötteritz (Fahrlehrer:innen), Silke Thoma & Heike Ullmann (Verwaltung), Ute Kögel (Zweigstelle Zwönitz)
- **Fahrzeugflotte (Auszug, real):** Hyundai Ioniq 5 (elektrisch), Hyundai i30 N, Mercedes EQA, Seat Ateca, Kia Sportage, Audi A3/Q5/A4 Avant/Q2, Cupra Formentor, Seat Leon, Ford Tourneo Custom; Zweiräder: Super Soco TS/TC, Kymco Super 8 R, Honda CB125/MSX125/CB500/CB650R, BMW G310R/R1250R; LKW: MAN TGX 26.440; Traktor: New Holland T5.140 DC
- **Marken in der Flotte (für Marquee-Element):** Audi, Hyundai, Mercedes, Kia, Seat, Cupra, BMW, Honda, Ford, MAN

**Fehlende Daten (bewusste Lücken):**
- Keine Preisangaben öffentlich verfügbar → keine erfundenen Zahlen, stattdessen "Preise auf Anfrage" mit Beratungs-CTA
- Keine Kundenbewertungen/Sterne auf der Bestandsseite → Platzhalter-Sektion, klar als austauschbar markiert
- Kein Logo-Bilddatei verfügbar (nur Screenshot der Bestandsseite gesehen: blauer Farbverlauf-Schriftzug mit Speed-Stripes) → vorerst textbasiertes Wortmarken-Logo im gleichen Farbschema, austauschbar sobald echte Datei vorliegt
- Keine Produktfotos (Fahrzeuge/Team/Gebäude) verfügbar → hochwertige Gradient-/Platzhalterflächen an klar markierten Stellen, austauschbar über `/public`

## Visuelles Design-System — "Confident Blue"

- **Primärfarbe:** Navy/Blau-Verlauf, abgeleitet vom bestehenden Markenblau (`#0d3d6e` → `#1a65b0` → `#2f8fe0`)
- **Neutral:** Weiß/sehr helles Blau-Grau als Basis, dunkles Navy für kontrastreiche Sektionen
- **Typografie:** Display-Font **Manrope** (kräftig, geometrisch) für Headlines; **Inter** für Fließtext — beide über `next/font/google`, keine externen Font-Requests
- **Formsprache:** Klare Kanten, dezente Schatten/Glas-Akzente auf Karten, großzügiger Weißraum, konsistente Radien

## Motion-System

- **Basis-Bibliothek:** Framer Motion (bereits Projektabhängigkeit) für alle Reveal- und scroll-gekoppelten Animationen (`useScroll`, `useTransform`, `whileInView`)
- **Neue Abhängigkeit:** `lenis` für butterweiches Smooth-Scrolling — einzige neue Library, klein und wartungsaktiv, integriert sich direkt mit Framer Motions Scroll-Hooks
- **Intensitätsstufe:** "Cinematische Pin-Szenen" — durchgehend elegante, gestaffelte Reveals, plus 2 fixierte Bühnenmomente (Hero, Führerscheinklassen-Sektion)
- **Premium-Layer obendrauf:**
  1. Scroll-gesteuerter Hintergrund-Farbverlauf zwischen Sektionen (kein harter Cut)
  2. Mask-Reveal-Effekt für große Headlines
  3. Dünne Scroll-Fortschrittsleiste + klickbare Sektions-Punkte (Desktop, rechter Rand)
  4. Animierte Kennzahlen-Counter (z. B. Teamgröße, Anzahl Klassen, Standorte)
  5. Auto-laufendes Marken-Marquee mit den echten Fahrzeugmarken der Flotte
  6. Magnetische Button-Hover-Effekte, einzeichnende Link-Unterstreichungen, subtiles Rausch-/Textur-Overlay
  7. Optionaler, überspringbarer Intro-Moment beim ersten Besuch (Logo-Animation, `sessionStorage`-gesteuert, nur einmal pro Sitzung)
- **Barrierefreiheit:** `prefers-reduced-motion` wird über Framer Motions `useReducedMotion` global geprüft — bei aktivierter Einstellung entfallen Pin-Szenen, Parallax, Intro-Animation und Farbverlauf; es bleiben einfache Fades. Lenis wird bei reduced motion deaktiviert (normales natives Scrollen).

## Startseite — 7 Abschnitte

1. **Hero (Pin-Szene):** Cinematischer Vollbild-Einstieg, Markenblau-Verlauf, Headline mit Mask-Reveal ("Dein Weg zum Führerschein"), Subline mit Familienbetrieb/Standort-Hinweis, zwei CTAs ("Jetzt anmelden" → `/kontakt`, "Klassen ansehen" → Anker zu Abschnitt 3)
2. **Warum Findeisen (Reveal-Sektion):** 3 USP-Karten (moderne Flotte inkl. E-Autos, Familienbetrieb seit Jahrzehnten, 2 Standorte), gestaffeltes Einfaden
3. **Führerscheinklassen (Pin-Szene):** Klassen-Chips (AM, A1, A2, A, B, BE, C, CE, L, T), aktive Klasse "andockt" beim Scrollen mit wechselndem Detail-Panel, Hinweis auf Klasse B197 als Innovations-USP
4. **Team (Reveal-Sektion):** Kompakte Vorstellung mit Teamgröße als animierter Zähler, Verlinkung zu vollständigem Team auf `/ueber-uns`
5. **Bewertungen (Platzhalter, Reveal):** Sternebewertung + Platzhalter-Zitat, klar als austauschbar markiert (Kommentar im Code)
6. **Preise auf Anfrage:** Kontrastsektion mit Beratungsversprechen und CTA "Angebot anfragen" → `/preise` bzw. `/kontakt` — keine erfundenen Zahlen
7. **Abschluss-CTA & Kontakt:** Finaler Call-to-Action mit beiden Adressen, Telefonnummer, Verlinkung zu `/kontakt`

## Unterseiten

- `/ueber-uns` — Story, vollständiges Team (alle 12 Personen), Flotte, beide Standorte als Sektionen; ruhigeres Design, gleiche Farbwelt/Typografie, ohne Pin-Choreografie
- `/fahrerlaubnisklassen` — Alle Klassen in interaktiver Karten-/Accordion-Übersicht, inkl. B197-Hinweis
- `/preise` — "Preise auf Anfrage"-Sektion mit Beratungs-CTA, keine Preistabelle
- `/kontakt` — Echte Adressen beider Standorte, Öffnungszeiten, Telefon, E-Mail, Kartenplatzhalter
- `/impressum`, `/datenschutz` — Rechtlich korrekte Grundstruktur mit echten Kontaktdaten; Lücken (USt-ID, Aufsichtsbehörde, verantwortliche Person Datenschutz) deutlich als "durch Betreiber zu ergänzen" markiert
- `/aufbauseminare`, `/termine`, `/checkliste`, `/bkf-module` — eine gemeinsame "Bald verfügbar"-Komponente (`ComingSoon`), damit kein Navigationslink 404 wirft

Alle Unterseiten teilen Header, Footer und das Farb-/Typografiesystem der Startseite, verzichten aber auf Pin-Szenen und Lenis-Parallax-Spielereien zugunsten schneller Informationsfindung.

## Komponenten- & Dateiarchitektur

```
app/
  layout.tsx                 — Fonts, Lenis-Provider, globales Grundgerüst
  page.tsx                   — Startseite, komponiert die 7 Home-Sections
  ueber-uns/page.tsx
  fahrerlaubnisklassen/page.tsx
  preise/page.tsx
  kontakt/page.tsx
  impressum/page.tsx
  datenschutz/page.tsx
  aufbauseminare/page.tsx
  termine/page.tsx
  checkliste/page.tsx
  bkf-module/page.tsx
  globals.css

components/
  layout/
    Header.tsx                — neue, konsolidierte Sticky-Nav
    Footer.tsx                — neu: Adresse, Öffnungszeiten, rechtliche Links
    ScrollProgress.tsx        — Fortschrittsleiste + Sektions-Punkte
    SmoothScrollProvider.tsx  — Lenis-Setup inkl. reduced-motion-Check
  home/
    Hero.tsx
    WhyUs.tsx
    LicenseClassesShowcase.tsx
    TeamTeaser.tsx
    Reviews.tsx
    PricingCta.tsx
    FinalCta.tsx
  shared/
    LicenseClassCard.tsx
    TeamMemberCard.tsx
    LocationCard.tsx
    BrandMarquee.tsx
    AnimatedCounter.tsx
    ComingSoon.tsx
    Button.tsx

lib/
  data/
    licenseClasses.ts
    team.ts
    fleet.ts
    locations.ts
```

Team, Fahrzeugflotte, Führerscheinklassen und Standorte leben als typisierte Daten in `lib/data/`, damit Startseiten-Teaser und Unterseiten dieselbe Quelle verwenden statt Inhalte zu duplizieren.

## Testing/Verifikation

- Manuelle Durchsicht im Dev-Server (`npm run dev`) über den Preview-Workflow: Startseite komplett durchscrollen (Desktop + Mobile-Breite), Pin-Szenen und Fortschrittsleiste prüfen
- `prefers-reduced-motion` in den Browser-DevTools aktivieren und verifizieren, dass Animationen degradieren, aber Inhalte vollständig erreichbar bleiben
- Alle Navigationslinks (Header + Footer) klicken, um sicherzustellen, dass keiner mehr ins Leere führt (echte Seite oder "Bald verfügbar")
- Responsive-Check bei 375px, 768px, 1280px
- `npm run build` zur Sicherstellung, dass der Produktions-Build fehlerfrei durchläuft

## Nicht-Ziele (bewusst außerhalb des Scopes)

- Keine echten Fotos/Logo-Datei einbinden (folgt, sobald Kunde Dateien liefert)
- Keine erfundenen Preise oder Kundenbewertungen
- Keine vollständige Choreografie auf den Unterseiten (nur Startseite bekommt die volle Pin-Szenen-Behandlung)
- Kein Blog/News-System (bestehende News-Sektion entfällt ersatzlos, da keine neuen Inhalte dafür vorgesehen sind)
