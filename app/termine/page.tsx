import type { Metadata } from 'next'
import ComingSoon from '@/components/shared/ComingSoon'

export const metadata: Metadata = {
  title: 'Termine — Fahrschule Findeisen',
  description: 'Aktuelle Theorie- und Kurstermine der Fahrschule Findeisen. Inhalte folgen in Kürze.',
}

export default function TerminePage() {
  return <ComingSoon title="Termine" />
}
