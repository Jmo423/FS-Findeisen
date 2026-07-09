import type { Metadata } from 'next'
import ComingSoon from '@/components/shared/ComingSoon'

export const metadata: Metadata = {
  title: 'Aufbauseminare — Fahrschule Findeisen',
  description:
    'Aufbauseminare bei der Fahrschule Findeisen: ASF (Nachschulung) und FES (Punktabbau). Inhalte folgen in Kürze.',
}

export default function AufbauseminarePage() {
  return <ComingSoon title="Aufbauseminare (ASF & FES)" />
}
