import type { Metadata } from 'next'
import PageIntro from '@/components/shared/PageIntro'
import ClassesExplorer from './ClassesExplorer'

export const metadata: Metadata = {
  title: 'Führerscheinklassen — Fahrschule Findeisen',
  description:
    'Alle Führerscheinklassen von AM bis T bei der Fahrschule Findeisen — inklusive Klasse B197: Schaltkompetenz ohne Automatikbeschränkung.',
}

export default function FahrerlaubnisklassenPage() {
  return (
    <>
      <PageIntro
        title="Führerscheinklassen"
        subtitle="Von AM bis T — bei uns machst du jeden Führerschein. Finde deine Klasse."
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-content">
          <ClassesExplorer />

          <div className="mt-16 rounded-card bg-brand-950 p-8 text-white sm:p-10">
            <h2 className="font-display text-2xl font-extrabold">
              Unser Tipp: Klasse B197
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-white/75">
              Mit B197 lernst du auf Schalt- und Automatikfahrzeug, legst die Prüfung aber
              entspannt auf Automatik ab — und darfst trotzdem beides fahren. Die perfekte
              Kombination aus Zukunft (E-Autos fahren Automatik) und voller Flexibilität.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
