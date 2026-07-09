import type { Metadata } from 'next'
import PageIntro from '@/components/shared/PageIntro'
import Button from '@/components/shared/Button'
import { mainLocation } from '@/lib/data/locations'

export const metadata: Metadata = {
  title: 'Preise — Fahrschule Findeisen',
  description:
    'Faire, individuelle Preise bei der Fahrschule Findeisen — persönlich beraten statt pauschal. Jetzt Angebot anfragen.',
}

// Bewusst keine Preistabelle: Es liegen keine öffentlichen Preisdaten vor,
// und erfundene Zahlen sind laut Spec ausgeschlossen.
export default function PreisePage() {
  return (
    <>
      <PageIntro
        title="Preise"
        subtitle="Jede Ausbildung ist individuell — dein Preis auch. Wir beraten dich persönlich."
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-content">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Persönliche Beratung',
                text: 'Wir schauen gemeinsam auf deine Vorkenntnisse, deine Wunschklasse und deinen Zeitplan.',
              },
              {
                title: 'Transparentes Angebot',
                text: 'Du bekommst ein klares Angebot mit allen Posten — Grundbetrag, Fahrstunden, Prüfungsgebühren.',
              },
              {
                title: 'Keine versteckten Kosten',
                text: 'Was wir vereinbaren, gilt. Fragen zu jedem Posten beantworten wir dir jederzeit.',
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-8">
                <h2 className="font-display text-lg font-bold text-brand-950">{item.title}</h2>
                <p className="mt-3 leading-relaxed text-brand-950/70">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center gap-5 rounded-card bg-brand-950 p-10 text-center text-white">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Hol dir dein persönliches Angebot.
            </h2>
            <p className="max-w-xl text-white/70">
              Ruf uns an unter{' '}
              <a
                href={`tel:${mainLocation.phone?.replace(/[^+\d]/g, '')}`}
                className="link-underline font-semibold text-white"
              >
                {mainLocation.phone}
              </a>{' '}
              oder schreib uns — wir melden uns schnellstmöglich zurück.
            </p>
            <Button href="/kontakt">Angebot anfragen</Button>
          </div>
        </div>
      </section>
    </>
  )
}
