export type LicenseCategory = 'zweirad' | 'pkw' | 'lkw' | 'landwirtschaft'

export interface LicenseClass {
  code: string
  minAge: string
  title: string
  description: string
  category: LicenseCategory
  /** Hervorhebung im Showcase (z. B. B mit B197-Option) */
  isHighlight?: boolean
  /** Optionales Hintergrundvideo im Showcase (Fahrzeug in Aktion), Pfad unter /public */
  video?: string
  /** Optionales freigestelltes Bild im Showcase (fliegt ein/aus, dreht sich per Scroll) */
  showcaseImage?: string
}

export const licenseClasses: LicenseClass[] = [
  {
    code: 'AM',
    minAge: 'ab 15',
    title: 'Moped & Roller',
    description:
      'Zweiräder und leichte Vierräder bis 45 km/h — der früheste Einstieg in die Mobilität.',
    category: 'zweirad',
    showcaseImage: '/images/soco-no-bg.svg',
  },
  {
    code: 'A1',
    minAge: 'ab 16',
    title: 'Leichtkrafträder',
    description:
      'Motorräder bis 125 cm³ und 11 kW — perfekt für den Start auf zwei Rädern.',
    category: 'zweirad',
    showcaseImage: '/images/honda-cb125-no-bg.svg',
  },
  {
    code: 'A2',
    minAge: 'ab 18',
    title: 'Mittelklasse-Motorräder',
    description: 'Motorräder bis 35 kW — der nächste Schritt für ambitionierte Biker.',
    category: 'zweirad',
    showcaseImage: '/images/honda-cb500f-no-bg.svg',
  },
  {
    code: 'A',
    minAge: 'ab 20*',
    title: 'Motorräder unbegrenzt',
    description:
      'Alle Motorräder ohne Leistungsbeschränkung. *Mindestalter abhängig von Vorbesitz.',
    category: 'zweirad',
    showcaseImage: '/images/honda-cb650r-no-bg.svg',
  },
  {
    code: 'B',
    minAge: 'ab 17/18',
    title: 'PKW',
    description:
      'Der Klassiker: PKW bis 3,5 t — auch als begleitetes Fahren ab 17. Mit Klasse B197: Ausbildung auf Schalt- und Automatikfahrzeug, Prüfung auf Automatik — ohne Schaltbeschränkung im Führerschein.',
    category: 'pkw',
    isHighlight: true,
  },
  {
    code: 'BE',
    minAge: 'ab 17/18',
    title: 'PKW mit Anhänger',
    description: 'PKW-Gespanne mit Anhängern über 750 kg — für Wohnwagen, Pferde- oder Bootsanhänger.',
    category: 'pkw',
  },
  {
    code: 'C',
    minAge: 'ab 18*',
    title: 'LKW',
    description:
      'Kraftfahrzeuge über 3,5 t — der Einstieg ins Berufskraftfahren. *Mindestalter abhängig von Ausbildung.',
    category: 'lkw',
  },
  {
    code: 'CE',
    minAge: 'ab 18*',
    title: 'LKW mit Anhänger',
    description:
      'Schwere Züge und Sattelkraftfahrzeuge — die Königsklasse im Güterverkehr. *Mindestalter abhängig von Ausbildung.',
    category: 'lkw',
  },
  {
    code: 'L',
    minAge: 'ab 16',
    title: 'Traktoren bis 40 km/h',
    description: 'Land- und forstwirtschaftliche Zugmaschinen bis 40 km/h.',
    category: 'landwirtschaft',
  },
  {
    code: 'T',
    minAge: 'ab 16',
    title: 'Traktoren bis 60 km/h',
    description:
      'Land- und forstwirtschaftliche Zugmaschinen bis 60 km/h — inklusive selbstfahrender Arbeitsmaschinen.',
    category: 'landwirtschaft',
  },
]
