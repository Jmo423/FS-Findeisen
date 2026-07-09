export type FleetCategory = 'pkw' | 'zweirad' | 'lkw' | 'traktor'

export interface FleetVehicle {
  model: string
  brand: string
  category: FleetCategory
  isElectric?: boolean
}

// Realer Flotten-Auszug von fahrschule-findeisen.de (Stand Spec 2026-07-07)
export const fleet: FleetVehicle[] = [
  { model: 'Hyundai Ioniq 5', brand: 'Hyundai', category: 'pkw', isElectric: true },
  { model: 'Hyundai i30 N', brand: 'Hyundai', category: 'pkw' },
  { model: 'Mercedes EQA', brand: 'Mercedes', category: 'pkw', isElectric: true },
  { model: 'Seat Ateca', brand: 'Seat', category: 'pkw' },
  { model: 'Kia Sportage', brand: 'Kia', category: 'pkw' },
  { model: 'Audi A3', brand: 'Audi', category: 'pkw' },
  { model: 'Audi Q5', brand: 'Audi', category: 'pkw' },
  { model: 'Audi A4 Avant', brand: 'Audi', category: 'pkw' },
  { model: 'Audi Q2', brand: 'Audi', category: 'pkw' },
  { model: 'Cupra Formentor', brand: 'Cupra', category: 'pkw' },
  { model: 'Seat Leon', brand: 'Seat', category: 'pkw' },
  { model: 'Ford Tourneo Custom', brand: 'Ford', category: 'pkw' },
  { model: 'Super Soco TS', brand: 'Super Soco', category: 'zweirad', isElectric: true },
  { model: 'Super Soco TC', brand: 'Super Soco', category: 'zweirad', isElectric: true },
  { model: 'Kymco Super 8 R', brand: 'Kymco', category: 'zweirad' },
  { model: 'Honda CB125', brand: 'Honda', category: 'zweirad' },
  { model: 'Honda MSX125', brand: 'Honda', category: 'zweirad' },
  { model: 'Honda CB500', brand: 'Honda', category: 'zweirad' },
  { model: 'Honda CB650R', brand: 'Honda', category: 'zweirad' },
  { model: 'BMW G310R', brand: 'BMW', category: 'zweirad' },
  { model: 'BMW R1250R', brand: 'BMW', category: 'zweirad' },
  { model: 'MAN TGX 26.440', brand: 'MAN', category: 'lkw' },
  { model: 'New Holland T5.140 DC', brand: 'New Holland', category: 'traktor' },
]

// Marken für das Marquee-Element (laut Spec)
export const fleetBrands = [
  'Audi',
  'Hyundai',
  'Mercedes',
  'Kia',
  'Seat',
  'Cupra',
  'BMW',
  'Honda',
  'Ford',
  'MAN',
]
