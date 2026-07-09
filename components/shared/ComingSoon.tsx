import Button from '@/components/shared/Button'
import PageIntro from '@/components/shared/PageIntro'

/** Gemeinsame "Bald verfügbar"-Seite, damit kein Navigationslink 404 wirft */
export default function ComingSoon({ title }: { title: string }) {
  return (
    <>
      <PageIntro title={title} subtitle="Diese Seite befindet sich noch im Aufbau." />
      <section className="mx-auto flex max-w-content flex-col items-center gap-6 px-6 py-24 text-center">
        <h2 className="font-display text-2xl font-bold text-brand-950">
          Bald verfügbar
        </h2>
        <p className="max-w-xl text-brand-950/70">
          Wir arbeiten gerade an den Inhalten für diesen Bereich. Bis dahin beantworten wir
          deine Fragen gern persönlich — ruf uns an oder schreib uns.
        </p>
        <Button href="/kontakt">Kontakt aufnehmen</Button>
      </section>
    </>
  )
}
