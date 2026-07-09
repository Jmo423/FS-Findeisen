import { fleetBrands } from '@/lib/data/fleet'

/** Auto-laufendes Marken-Marquee; pausiert bei prefers-reduced-motion */
export default function BrandMarquee({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-16 motion-reduce:[animation-play-state:paused]">
        {/* Track dupliziert für nahtlosen Loop; rein dekorativ, echte Flotte steht in fleet.ts / auf /ueber-uns */}
        {[...fleetBrands, ...fleetBrands].map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="whitespace-nowrap font-display text-2xl font-extrabold uppercase tracking-widest text-brand-900/25"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  )
}
