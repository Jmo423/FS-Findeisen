# Design-Audit — Fahrschule Findeisen

**Modus:** Visueller Audit (10 Dimensionen) + AI-Slop-Check gegen den bestehenden Codebase.
Kein Neuaufbau (Modus 1), da bereits ein bewusst entworfenes „Confident Blue"-System aus
`docs/superpowers/specs/2026-07-07-premium-scroll-website-design.md` implementiert ist.

## Scorecard

| # | Dimension | Score | Begründung |
|---|---|---|---|
| 1 | Farbkonsistenz | 9/10 | Null Roh-Hexwerte in `components/**` und `app/**` (verifiziert per Grep) — alle Farben laufen über `brand-{50…950}`-Tokens aus `tailwind.config.ts`. Ein Akzentton, keine Lila/Blau-KI-Defaults. |
| 2 | Typografie-Hierarchie | 9/10 (war 7/10) | **Gefixt:** 7 identische Sektions-`<h2>` waren zwischen `tracking-tight`/`tracking-tighter` gesplittet — jetzt einheitlich `tracking-tighter`. Font-Pairing (Manrope/Outfit) konsistent, Skalen-Stufen (`text-3xl → sm:text-5xl`) durchgängig. |
| 3 | Spacing-Rhythmus | 9/10 | `py-28`/`py-24`/`py-16`/`py-10` — alle auf der 4px-Skala, keine willkürlichen Werte in Sektions-Innenabständen gefunden. |
| 4 | Komponenten-Konsistenz | 8/10 | `Button.tsx` mit 3 Varianten überall verwendet; `glass-card`/`glass-card-dark` 9× genutzt, nur 2 Ausprägungen. Header-Kontakt-Pill und Burger sind bewusst eigenständig (Nav-Elemente, keine CTAs). |
| 5 | Responsive-Verhalten | 9/10 (war 8/10) | 375px/768px/1280px verifiziert. **768px nachgeprüft:** alle 11 Routen per headless Chromium + axe-core gescannt, `document.documentElement.scrollWidth` == `clientWidth` auf jeder Seite — kein horizontales Scrollen. |
| 6 | Dark Mode | n/a | Kein nutzerseitiger Dark-Mode-Toggle — war nie Teil der Spec; die Navy-Sektionen sind fixe Markenfarbwahl, kein `prefers-color-scheme`. |
| 7 | Animation | 9/10 | Durations konsistent bei 200–300ms für Micro-Interactions (per Grep verifiziert), `prefers-reduced-motion` global respektiert, Spring-Physics beim Magnetic-Button. |
| 8 | Barrierefreiheit | 9/10 (war 8/10) | Fokus-Ringe und ≥44px-Touch-Targets aus vorheriger Runde bestätigt. **Kontrastwerte jetzt mit Tool geprüft:** axe-core (WCAG2AA) über alle 11 Routen bei 768px. 2 echte Verstöße gefunden und gefixt (siehe unten), 1 verbleibender Treffer als False Positive eingestuft (WCAG-1.4.3-Ausnahme für Logos/Markennamen). |
| 9 | Informationsdichte | 9/10 | Großzügige `py-28`-Sektionsabstände passen zum „Art Gallery"-Dichteziel — keine überladenen Bereiche. |
| 10 | Politur | 7/10 | Hover-/Transition-States durchgängig vorhanden. Kein Kontaktformular (nur `tel:`/`mailto:`) — bewusst offengelassen, siehe unten. Kartenplatzhalter auf `/kontakt` ist reine Gradient-Fläche ohne Illustration. |

**Gesamt: 8,7/10** (bei 9 bewerteten Dimensionen, Dark Mode n/a)

## AI-Slop-Check

| Muster | Befund |
|---|---|
| Gratuitöse Gradients | **Bestanden** — ein einziger Navy-Gradient (`from-brand-950 via-brand-900 to-brand-700/800`), wiederverwendet über `PageIntro` (8 Unterseiten), `Hero`, `LicenseClassesShowcase`. Kein Gradient-Wildwuchs pro Komponente. |
| Lila-zu-Blau-Default | **Bestanden** — explizit verboten, komplett Navy/Blau-Familie, kein Lila im gesamten Code. |
| Zweckfreier Glassmorphism | **Bestanden** — `glass-card`/`glass-card-dark` mit echter Inner-Border-Refraktion (Inset-Shadow), für tatsächliche Elevation genutzt, nicht dekorativ. |
| Rundungs-Wildwuchs | **Bestanden** — Zwei-Stufen-System: `rounded-full` für Pills/Buttons/Chips, `rounded-card` für große Container. Keine zufällige Radius-Mischung. |
| Exzessive Scroll-Animationen | **Grenzwertig, aber beabsichtigt** — sehr hohe Dichte an `whileInView`-Reveals, aber explizite Spec-Anforderung („cinematische Pin-Szenen"), respektiert reduced-motion, konsistente Timing-Tokens. Kein Slop, sondern Art-Direction. |
| Generischer zentrierter Hero über Stock-Gradient | **Bestanden** — asymmetrisches Layout (Text links, Fakten-Panel rechts), keine Stock-Bilder. |
| Charakterloser Sans-Serif-Stack | **Bestanden** — Manrope/Outfit-Pairing, Inter explizit verbannt. |

**Fazit:** Die Seite liest sich nicht als generisches KI-Design — konsistentes, art-direktiertes System mit einer Handvoll behebbarer Politur-Lücken statt struktureller Slop-Muster.

## Offene Punkte (nicht in diesem Pass behoben)

Keine — beide zuvor offenen Punkte (Kontaktformular, Kartenplatzhalter) wurden in den
nachfolgenden Sessions umgesetzt, siehe unten.

## In diesem Pass behoben

- 7 Sektions-Headlines (`TeamTeaser.tsx:27`, `FinalCta.tsx:18`, `LicenseClassesShowcase.tsx:110`, `app/ueber-uns/page.tsx` ×4) von `tracking-tight` auf `tracking-tighter` vereinheitlicht — matcht jetzt `WhyUs.tsx`, `Reviews.tsx`, `PricingCta.tsx`.

## Zweiter Pass — 768px-Breakpoint & Kontrast-Tool-Check

**Methode:** Headless Chromium (Playwright, lokal installiert) bei 768×1024, alle 11 Routen; `axe-core` (WCAG2AA-Ruleset) pro Seite ausgeführt.

**768px-Breakpoint:** Kein horizontales Scrollen auf irgendeiner der 11 Routen (`scrollWidth` == `clientWidth` überall). Punkt vollständig geschlossen.

**Kontrast-Scan — Befunde:**

| Fund | Ort | Ursache | Aktion |
|---|---|---|---|
| Kontrast 4.27:1 (Soll 4.5:1) auf Spitznamen-Text | `TeamMemberCard.tsx:21` | `text-brand-950/60` zu blass auf hellem Karten-Hintergrund | **Gefixt:** Opacity auf `/75` angehoben, Kontrast jetzt konform. Betrifft Team-Karten auf `/ueber-uns` und `TeamTeaser.tsx`. |
| Kontrast 1.58:1 (Soll 3:1) auf Marken-Marquee-Text | `BrandMarquee.tsx` | Marquee-Container hatte `aria-label` + teils `aria-hidden={false}` auf einzelne Spans, obwohl der Text (25%-Opacity-Wasserzeichen aus Fahrzeugmarken) rein dekorativ ist und die echte Flotte bereits barrierefrei auf `/ueber-uns` (Fleet-Sektion) gelistet wird | **Teilgefixt + als False Positive eingestuft:** Ganzer Marquee-Container jetzt `aria-hidden="true"` (korrekt für dupliziertes Loop-Element, verhindert Doppel-Vorlesen). Der verbleibende axe-Treffer auf die reine Sichtbar-Kontrast-Prüfung ist nach WCAG 1.4.3 („Text that is part of a logo or brand name has no minimum contrast requirement") nicht zu beheben, ohne das bewusste Wasserzeichen-Design zu zerstören — akzeptierte Ausnahme, keine offene Aufgabe. |

**Ergebnis:** 9 von 11 Routen 0 axe-Verstöße; `/` und `/ueber-uns` je 5 verbleibende Treffer, alle auf denselben BrandMarquee-Fall zurückzuführen (per WCAG-Ausnahme abgedeckt).

## Dritter Pass — Kontaktformular & Kartenintegration

**Kontaktformular** (`components/shared/ContactForm.tsx`): Name, E-Mail, Telefon (optional),
„Interesse an" (Dropdown aus allen 10 Führerscheinklassen, `lib/data/licenseClasses.ts`),
Nachricht, DSGVO-Pflicht-Checkbox mit Link zu `/datenschutz`, Honeypot-Feld. Versand über
Web3Forms (`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, siehe `.env.local.example`) — kein eigenes
Backend nötig. Ohne gesetzten Key rendert das Formular normal, validiert clientseitig, zeigt
aber einen Betreiber-Hinweis und schlägt beim Versand kontrolliert fehl (Fallback-Text mit
Verweis auf Telefon/E-Mail statt stillem Datenverlust). `Button.tsx` um `type`/`disabled`
erweitert, damit der Submit-Button nativ per Enter auslöst. `/datenschutz` um einen Absatz zur
Auftragsverarbeitung durch Web3Forms ergänzt (mit `[durch Betreiber zu ergänzen]`-Platzhalter
für AVV/Sitzland, gleiches Muster wie die übrigen offenen Rechtsfragen der Seite). Per
Playwright verifiziert: leeres Formular wird durch native Browser-Validierung blockiert,
gültige Eingaben lösen den Web3Forms-Request aus, Fehlerzustand verwirft die Eingaben des
Nutzers nicht.

**Kartenintegration** (`components/shared/LocationMap.tsx`): Der Gradient-Platzhalter wurde
durch zwei echte OpenStreetMap-Embeds ersetzt (ein Embed pro Standort statt einer gemeinsamen
Karte, da Hormersdorf und Zwönitz ca. 6 km auseinanderliegen und eine gemeinsame Bounding-Box
zu weit herausgezoomt wäre). Koordinaten wurden per Nominatim-Geocoding verifiziert und gegen
die exakte Hausnummer/Straße abgeglichen (`lib/data/locations.ts`: `lat`/`lon`-Felder,
Hormersdorf 50.6716181/12.8883379, Zwönitz 50.6327785/12.807511), keine geschätzten
Koordinaten. Jede Karte zeigt einen Marker und einen „Route planen"-Link zur vollen
OSM-Ansicht. `loading="lazy"` auf den Iframes — beim ersten Headless-Test unterhalb des
Viewports fälschlich als „lädt nicht" interpretiert, nach Scroll-in-View-Test bestätigt: Karten
laden korrekt, sobald sie in den sichtbaren Bereich kommen (erwartetes Lazy-Loading-Verhalten,
kein Bug).
