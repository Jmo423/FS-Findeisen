/** Navy-Intro-Band für alle Unterseiten — sorgt dafür, dass der
 *  transparente Header am Seitenanfang immer auf dunklem Grund steht. */
export default function PageIntro({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <section className="bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 px-6 pb-20 pt-40 text-white">
      <div className="mx-auto max-w-content">
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/75">{subtitle}</p>}
      </div>
    </section>
  )
}
