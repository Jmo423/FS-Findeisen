import type { Metadata } from 'next'
import PageIntro from '@/components/shared/PageIntro'
import LocationCard from '@/components/shared/LocationCard'
import ContactForm from '@/components/shared/ContactForm'
import LocationMap from '@/components/shared/LocationMap'
import { locations } from '@/lib/data/locations'

export const metadata: Metadata = {
  title: 'Kontakt — Fahrschule Findeisen',
  description:
    'Kontakt zur Fahrschule Findeisen: Jahnsbacher Straße 5 in Hormersdorf und Schillerstr. 8 in Zwönitz. Telefon 03721-22256.',
}

export default function KontaktPage() {
  return (
    <>
      <PageIntro
        title="Kontakt"
        subtitle="Ruf an, schreib uns oder komm einfach vorbei — wir freuen uns auf dich."
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-content">
          <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
            <ContactForm />

            <div className="flex flex-col gap-6">
              {locations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {locations.map((location) => (
              <LocationMap
                key={location.id}
                lat={location.lat}
                lon={location.lon}
                label={location.name}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
