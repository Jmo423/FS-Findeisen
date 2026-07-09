export type TeamGroup = 'leitung' | 'fahrlehrer' | 'verwaltung'

export interface TeamMember {
  name: string
  nickname?: string
  role: string
  group: TeamGroup
}

// Reale Teamdaten von fahrschule-findeisen.de (Stand Spec 2026-07-07).
// Hinweis: Die Spec nennt "12 Personen", listet aber 13 Namen —
// der Zähler auf der Startseite nutzt daher team.length.
export const team: TeamMember[] = [
  { name: 'Max Findeisen', role: 'Inhaber & Fahrlehrer (B/BE/A)', group: 'leitung' },
  { name: 'Jens Findeisen', role: 'Fahrlehrer — seit 1980 im Einsatz', group: 'fahrlehrer' },
  { name: 'René Göttner', role: 'Fahrlehrer', group: 'fahrlehrer' },
  { name: 'Matthias Bucher', nickname: 'MaBu', role: 'Fahrlehrer', group: 'fahrlehrer' },
  { name: 'Alice Torres Rojas', role: 'Fahrlehrerin', group: 'fahrlehrer' },
  { name: 'Yves Walzel', role: 'Fahrlehrer', group: 'fahrlehrer' },
  { name: 'Josefine Kersandt', nickname: 'Josi', role: 'Fahrlehrerin', group: 'fahrlehrer' },
  { name: 'Carolin Günther', nickname: 'Caro', role: 'Fahrlehrerin', group: 'fahrlehrer' },
  { name: 'Lena Haase', role: 'Fahrlehrerin', group: 'fahrlehrer' },
  { name: 'Rebecca Kötteritz', role: 'Fahrlehrerin', group: 'fahrlehrer' },
  { name: 'Silke Thoma', role: 'Verwaltung', group: 'verwaltung' },
  { name: 'Heike Ullmann', role: 'Verwaltung', group: 'verwaltung' },
  { name: 'Ute Kögel', role: 'Zweigstelle Zwönitz', group: 'verwaltung' },
]

export const teamSize = team.length
