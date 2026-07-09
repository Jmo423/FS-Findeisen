import Link from 'next/link'
import { locations } from '@/lib/data/locations'

const footerNav = [
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Führerscheinklassen', href: '/fahrerlaubnisklassen' },
  { label: 'Preise', href: '/preise' },
  { label: 'Aufbauseminare', href: '/aufbauseminare' },
  { label: 'Termine', href: '/termine' },
  { label: 'Checkliste', href: '/checkliste' },
  { label: 'BKF-Module', href: '/bkf-module' },
  { label: 'Kontakt', href: '/kontakt' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-950 px-6 py-16 text-white">
      <div className="mx-auto grid max-w-content gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* Wortmarke — PLATZHALTER, austauschbar gegen Logodatei */}
          <p className="font-display text-lg font-extrabold">Fahrschule Findeisen</p>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Familienbetrieb im Erzgebirge — mit moderner Flotte und allen Führerscheinklassen
            von AM bis T.
          </p>
        </div>

        {locations.map((location) => (
          <div key={location.id}>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white/50">
              {location.name}
            </h3>
            <address className="mt-3 text-sm not-italic leading-relaxed text-white/80">
              {location.street}
              <br />
              {location.city}
            </address>
            {location.phone && (
              <a
                href={`tel:${location.phone.replace(/[^+\d]/g, '')}`}
                className="link-underline mt-2 inline-block text-sm font-semibold"
              >
                {location.phone}
              </a>
            )}
            {location.email && (
              <div>
                <a
                  href={`mailto:${location.email}`}
                  className="link-underline mt-1 inline-block text-sm text-white/80"
                >
                  {location.email}
                </a>
              </div>
            )}
            <dl className="mt-3 space-y-0.5 text-xs text-white/60">
              {location.openingHours.map(({ day, hours }) => (
                <div key={day} className="flex justify-between gap-3">
                  <dt>{day}</dt>
                  <dd>{hours}</dd>
                </div>
              ))}
            </dl>
            {location.note && <p className="mt-1 text-xs text-white/50">{location.note}</p>}
          </div>
        ))}

        <nav aria-label="Footer-Navigation">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white/50">
            Navigation
          </h3>
          <ul className="mt-3 space-y-1.5">
            {footerNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-underline text-sm text-white/80">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-12 flex max-w-content flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
        <p>© {new Date().getFullYear()} Fahrschule Findeisen, Inhaber Max Findeisen</p>
        <div className="flex gap-5">
          <Link href="/impressum" className="link-underline">
            Impressum
          </Link>
          <Link href="/datenschutz" className="link-underline">
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  )
}
