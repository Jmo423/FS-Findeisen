/** Eingebettete OpenStreetMap-Kachel für einen Standort, mit Marker und Link zur Vollansicht */
export default function LocationMap({
  lat,
  lon,
  label,
}: {
  lat: number
  lon: number
  label: string
}) {
  const latDelta = 0.004
  const lonDelta = 0.007
  const bbox = [lon - lonDelta, lat - latDelta, lon + lonDelta, lat + latDelta].join(',')
  const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`
  const fullMapHref = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`

  return (
    <div className="overflow-hidden rounded-card shadow-card">
      <iframe
        src={embedSrc}
        title={`Kartenausschnitt ${label}`}
        loading="lazy"
        className="h-64 w-full border-0 sm:h-72"
      />
      <div className="flex items-center justify-between bg-white px-5 py-3 text-sm">
        <span className="font-medium text-brand-950">{label}</span>
        <a
          href={fullMapHref}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-semibold text-brand-700"
        >
          Route planen
        </a>
      </div>
    </div>
  )
}
