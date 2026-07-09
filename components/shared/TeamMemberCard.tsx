import type { TeamMember } from '@/lib/data/team'

/** Teammitglied-Karte. PLATZHALTER: Gradient-Avatar mit Initialen —
 *  durch echte Fotos in /public ersetzen, sobald verfügbar. */
export default function TeamMemberCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  return (
    <div className="glass-card flex flex-col items-center gap-3 p-6 text-center transition-shadow duration-300 hover:shadow-card-hover">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 via-brand-600 to-brand-900 font-display text-xl font-extrabold text-white">
        {initials}
      </div>
      <div>
        <p className="font-display font-bold text-brand-950">
          {member.name}
          {member.nickname && (
            <span className="text-brand-950/75"> „{member.nickname}&ldquo;</span>
          )}
        </p>
        <p className="mt-1 text-sm text-brand-950/70">{member.role}</p>
      </div>
    </div>
  )
}
