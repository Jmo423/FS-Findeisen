import type { Location } from '@/lib/data/locations'

/** Standort-Karte mit Adresse, Kontakt und Öffnungszeiten */
export default function LocationCard({
  location,
  dark = false,
}: {
  location: Location
  dark?: boolean
}) {
  const text = dark ? 'text-white' : 'text-brand-950'
  const muted = dark ? 'text-white/70' : 'text-brand-950/70'

  return (
    <div className={`${dark ? 'glass-card-dark' : 'glass-card'} flex h-full flex-col gap-4 p-7`}>
      <h3 className={`font-display text-xl font-bold ${text}`}>{location.name}</h3>
      <address className={`not-italic ${muted}`}>
        {location.street}
        <br />
        {location.city}
      </address>
      {(location.phone || location.email) && (
        <div className="flex flex-col gap-1">
          {location.phone && (
            <a
              href={`tel:${location.phone.replace(/[^+\d]/g, '')}`}
              className={`link-underline w-fit font-semibold ${text}`}
            >
              {location.phone}
            </a>
          )}
          {location.email && (
            <a href={`mailto:${location.email}`} className={`link-underline w-fit ${muted}`}>
              {location.email}
            </a>
          )}
        </div>
      )}
      <dl className={`mt-auto space-y-1 text-sm ${muted}`}>
        {location.openingHours.map(({ day, hours }) => (
          <div key={day} className="flex justify-between gap-4">
            <dt>{day}</dt>
            <dd className="font-medium">{hours}</dd>
          </div>
        ))}
      </dl>
      {location.note && <p className={`text-xs ${muted}`}>{location.note}</p>}
    </div>
  )
}
