import type { Metadata } from 'next'
import PageIntro from '@/components/shared/PageIntro'
import TeamMemberCard from '@/components/shared/TeamMemberCard'
import LocationCard from '@/components/shared/LocationCard'
import BrandMarquee from '@/components/shared/BrandMarquee'
import { team } from '@/lib/data/team'
import { fleet, type FleetCategory } from '@/lib/data/fleet'
import { locations } from '@/lib/data/locations'

export const metadata: Metadata = {
  title: 'Über uns — Fahrschule Findeisen',
  description:
    'Familienbetrieb im Erzgebirge: unser Team, unsere Fahrzeugflotte und unsere Standorte in Hormersdorf und Zwönitz.',
}

const fleetCategories: { key: FleetCategory; label: string }[] = [
  { key: 'pkw', label: 'PKW' },
  { key: 'zweirad', label: 'Zweiräder' },
  { key: 'lkw', label: 'LKW' },
  { key: 'traktor', label: 'Traktoren' },
]

export default function UeberUnsPage() {
  return (
    <>
      <PageIntro
        title="Über uns"
        subtitle="Fahrausbildung ist bei den Findeisens Familiensache — seit Jahrzehnten und mit ganzem Herzen."
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-content">
          <h2 className="font-display text-3xl font-extrabold tracking-tighter text-brand-950">
            Unsere Geschichte
          </h2>
          <p className="mt-5 max-w-3xl leading-relaxed text-brand-950/75">
            Die Fahrschule Findeisen ist ein Familienbetrieb aus dem Erzgebirge. Jens Findeisen
            bildet seit 1980 Fahrschüler:innen aus, heute führt Max Findeisen den Betrieb — mit
            einem Team, das Erfahrung und frische Ideen verbindet. Vom Moped bis zum
            Sattelzug: Bei uns bekommst du jede Ausbildung aus einer Hand, auf moderner
            Technik und mit persönlicher Betreuung.
          </p>
        </div>
      </section>

      <section className="bg-brand-50 px-6 py-20">
        <div className="mx-auto max-w-content">
          <h2 className="font-display text-3xl font-extrabold tracking-tighter text-brand-950">
            Das ganze Team
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-content">
          <h2 className="font-display text-3xl font-extrabold tracking-tighter text-brand-950">
            Unsere Flotte
          </h2>
          <p className="mt-3 max-w-2xl text-brand-950/70">
            Ein Auszug aus unserem Fuhrpark — vom E-Auto bis zum 26-Tonner.
          </p>
          {fleetCategories.map(({ key, label }) => {
            const vehicles = fleet.filter((vehicle) => vehicle.category === key)
            if (!vehicles.length) return null
            return (
              <div key={key} className="mt-10">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-600">
                  {label}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {vehicles.map((vehicle) => (
                    <li
                      key={vehicle.model}
                      className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-brand-950/80"
                    >
                      {vehicle.model}
                      {vehicle.isElectric && (
                        <svg
                          className="ml-1.5 inline h-3.5 w-3.5 align-[-2px] text-brand-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          role="img"
                          aria-label="Elektrofahrzeug"
                        >
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
        <BrandMarquee className="mt-20" />
      </section>

      <section className="bg-brand-50 px-6 py-20">
        <div className="mx-auto max-w-content">
          <h2 className="font-display text-3xl font-extrabold tracking-tighter text-brand-950">
            Unsere Standorte
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
