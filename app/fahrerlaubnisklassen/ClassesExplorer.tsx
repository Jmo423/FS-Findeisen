'use client'

import { useState } from 'react'
import { licenseClasses, type LicenseCategory } from '@/lib/data/licenseClasses'
import LicenseClassCard from '@/components/shared/LicenseClassCard'

const filters: { key: LicenseCategory | 'alle'; label: string }[] = [
  { key: 'alle', label: 'Alle' },
  { key: 'zweirad', label: 'Zweirad' },
  { key: 'pkw', label: 'PKW' },
  { key: 'lkw', label: 'LKW' },
  { key: 'landwirtschaft', label: 'Landwirtschaft' },
]

/** Interaktive Klassen-Übersicht mit Kategorie-Filter */
export default function ClassesExplorer() {
  const [filter, setFilter] = useState<LicenseCategory | 'alle'>('alle')

  const visible =
    filter === 'alle'
      ? licenseClasses
      : licenseClasses.filter((licenseClass) => licenseClass.category === filter)

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Klassen filtern">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            aria-pressed={filter === key}
            className={`focus-ring flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-bold transition-colors duration-200 ${
              filter === key
                ? 'bg-brand-600 text-white'
                : 'bg-brand-100 text-brand-800 hover:bg-brand-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((licenseClass) => (
          <LicenseClassCard key={licenseClass.code} licenseClass={licenseClass} />
        ))}
      </div>
    </div>
  )
}
