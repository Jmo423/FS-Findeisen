import type { Metadata } from 'next'
import ComingSoon from '@/components/shared/ComingSoon'

export const metadata: Metadata = {
  title: 'BKF-Module — Fahrschule Findeisen',
  description:
    'Weiterbildung für Berufskraftfahrer (BKF-Module) bei der Fahrschule Findeisen. Inhalte folgen in Kürze.',
}

export default function BkfModulePage() {
  return <ComingSoon title="BKF-Module" />
}
