import type { Metadata } from 'next'
import PageIntro from '@/components/shared/PageIntro'
import { mainLocation } from '@/lib/data/locations'

export const metadata: Metadata = {
  title: 'Datenschutz — Fahrschule Findeisen',
  description: 'Datenschutzerklärung der Fahrschule Findeisen.',
}

export default function DatenschutzPage() {
  return (
    <>
      <PageIntro title="Datenschutzerklärung" />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl space-y-10 leading-relaxed text-brand-950/80">
          <div>
            <h2 className="font-display text-xl font-bold text-brand-950">1. Verantwortlicher</h2>
            <p className="mt-3">
              Fahrschule Findeisen, Inhaber Max Findeisen
              <br />
              {mainLocation.street}, {mainLocation.city}
              <br />
              Telefon: {mainLocation.phone} · E-Mail: {mainLocation.email}
            </p>
            <p className="mt-3 font-semibold text-brand-600">
              [durch Betreiber zu ergänzen: ggf. benannte:r Datenschutzbeauftragte:r bzw.
              datenschutzrechtlich verantwortliche Person]
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-brand-950">
              2. Erhebung und Verarbeitung von Daten
            </h2>
            <p className="mt-3">
              Beim Besuch dieser Website werden durch den Hosting-Anbieter technisch
              notwendige Daten (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs,
              aufgerufene Seiten) in Server-Logfiles verarbeitet. Die Verarbeitung erfolgt
              auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zum Zweck des sicheren und
              stabilen Betriebs der Website.
            </p>
            <p className="mt-3 font-semibold text-brand-600">
              [durch Betreiber zu ergänzen: Hosting-Anbieter mit Anschrift sowie ggf.
              Auftragsverarbeitungsvertrag]
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-brand-950">
              3. Kontaktaufnahme
            </h2>
            <p className="mt-3">
              Wenn du uns per Telefon, E-Mail oder über das Kontaktformular auf dieser Website
              erreichst, verarbeiten wir die von dir mitgeteilten Daten (Name, Kontaktdaten,
              ggf. Interesse an einer Führerscheinklasse, Anliegen) zur Bearbeitung deiner
              Anfrage (Art. 6 Abs. 1 lit. b DSGVO).
            </p>
            <p className="mt-3">
              Für die technische Übermittlung des Kontaktformulars nutzen wir den
              Formular-Dienstleister Web3Forms. Deine Eingaben werden dabei an Web3Forms
              übertragen und von dort per E-Mail an uns weitergeleitet; Web3Forms speichert
              die Inhalte nach eigenen Angaben nicht dauerhaft.
            </p>
            <p className="mt-3 font-semibold text-brand-600">
              [durch Betreiber zu ergänzen: Prüfung/Abschluss einer
              Auftragsverarbeitungsvereinbarung mit Web3Forms sowie Angabe des Sitzlandes
              des Dienstleisters]
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-brand-950">
              4. Cookies und Tracking
            </h2>
            <p className="mt-3">
              Diese Website verwendet keine Tracking- oder Marketing-Cookies. Es wird
              lediglich ein technisch notwendiger sessionStorage-Eintrag genutzt, um die
              Intro-Animation nur einmal pro Sitzung anzuzeigen; dieser enthält keine
              personenbezogenen Daten.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-brand-950">5. Deine Rechte</h2>
            <p className="mt-3">
              Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16),
              Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
              Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Außerdem steht dir
              ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu, in Sachsen:
              Sächsische Datenschutz- und Transparenzbeauftragte.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
