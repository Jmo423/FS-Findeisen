import type { Metadata } from 'next'
import ComingSoon from '@/components/shared/ComingSoon'

export const metadata: Metadata = {
  title: 'Checkliste — Fahrschule Findeisen',
  description:
    'Checkliste für deinen Führerscheinantrag bei der Fahrschule Findeisen. Inhalte folgen in Kürze.',
}

export default function ChecklistePage() {
  return <ComingSoon title="Checkliste" />
}
