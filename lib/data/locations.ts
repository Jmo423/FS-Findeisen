export interface OpeningHour {
  day: string
  hours: string
}

export interface Location {
  id: string
  name: string
  street: string
  city: string
  phone?: string
  email?: string
  openingHours: OpeningHour[]
  note?: string
  /** Geokoordinaten für die Kartenanzeige (verifiziert per Nominatim/OpenStreetMap) */
  lat: number
  lon: number
}

// Reale Standortdaten von fahrschule-findeisen.de (Stand Spec 2026-07-07)
export const locations: Location[] = [
  {
    id: 'hormersdorf',
    name: 'Hauptsitz Hormersdorf',
    street: 'Jahnsbacher Straße 5',
    city: '08297 Zwönitz OT Hormersdorf',
    phone: '03721-22256',
    email: 'info@fahrschule-findeisen.de',
    openingHours: [
      { day: 'Montag', hours: '8–15 Uhr' },
      { day: 'Dienstag', hours: '13–18 Uhr' },
      { day: 'Mittwoch', hours: 'geschlossen' },
      { day: 'Donnerstag', hours: '13–18 Uhr' },
      { day: 'Freitag', hours: 'geschlossen' },
    ],
    note: 'sowie nach Vereinbarung',
    lat: 50.6716181,
    lon: 12.8883379,
  },
  {
    id: 'zwoenitz',
    name: 'Zweigstelle Zwönitz',
    street: 'Schillerstr. 8',
    city: '08297 Zwönitz',
    openingHours: [{ day: 'Donnerstag', hours: '13–15 Uhr' }],
    lat: 50.6327785,
    lon: 12.807511,
  },
]

export const mainLocation = locations[0]
