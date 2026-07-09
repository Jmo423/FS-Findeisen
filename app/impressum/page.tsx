import type { Metadata } from 'next'
import PageIntro from '@/components/shared/PageIntro'
import { mainLocation } from '@/lib/data/locations'

export const metadata: Metadata = {
  title: 'Impressum — Fahrschule Findeisen',
  description: 'Impressum der Fahrschule Findeisen, Inhaber Max Findeisen.',
}

export default function ImpressumPage() {
  return (
    <>
      <PageIntro title="Impressum" />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl space-y-10 leading-relaxed text-brand-950/80">
          <div>
            <h2 className="font-display text-xl font-bold text-brand-950">
              Angaben gemäß § 5 DDG
            </h2>
            <p className="mt-3">
              Fahrschule Findeisen
              <br />
              Inhaber: Max Findeisen
              <br />
              {mainLocation.street}
              <br />
              {mainLocation.city}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-brand-950">Kontakt</h2>
            <p className="mt-3">
              Telefon: {mainLocation.phone}
              <br />
              E-Mail: {mainLocation.email}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-brand-950">Umsatzsteuer-ID</h2>
            <p className="mt-3 font-semibold text-brand-600">
              [durch Betreiber zu ergänzen: Umsatzsteuer-Identifikationsnummer, sofern
              vorhanden]
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-brand-950">
              Aufsichtsbehörde &amp; Berufsrecht
            </h2>
            <p className="mt-3 font-semibold text-brand-600">
              [durch Betreiber zu ergänzen: zuständige Fahrerlaubnisbehörde / Aufsichtsbehörde
              inkl. Anschrift; Berufsbezeichnung Fahrlehrer, verliehen in Deutschland;
              einschlägige Regelungen: Fahrlehrergesetz (FahrlG)]
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-brand-950">
              Verantwortlich für den Inhalt
            </h2>
            <p className="mt-3">
              Max Findeisen
              <br />
              {mainLocation.street}, {mainLocation.city}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-brand-950">Streitschlichtung</h2>
            <p className="mt-3">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
              (OS) bereit. Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
