import type { LicenseClass } from '@/lib/data/licenseClasses'

/** Präsentationale Karte für eine Führerscheinklasse */
export default function LicenseClassCard({ licenseClass }: { licenseClass: LicenseClass }) {
  const { code, minAge, title, description, isHighlight } = licenseClass

  return (
    <div
      className={`glass-card flex h-full flex-col gap-3 p-6 transition-shadow duration-300 hover:shadow-card-hover ${
        isHighlight ? 'ring-2 ring-brand-400' : ''
      }`}
    >
      <div className="flex items-baseline justify-between">
        <span className="font-display text-4xl font-extrabold text-brand-700">{code}</span>
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
          {minAge}
        </span>
      </div>
      <h3 className="font-display text-lg font-bold text-brand-950">{title}</h3>
      <p className="text-sm leading-relaxed text-brand-950/70">{description}</p>
      {isHighlight && (
        <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
          Neu: B197 — Automatik ohne Einschränkung
        </span>
      )}
    </div>
  )
}
