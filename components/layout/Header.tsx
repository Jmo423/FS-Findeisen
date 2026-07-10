'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Klassen', href: '/fahrerlaubnisklassen' },
  { label: 'Preise', href: '/preise' },
  { label: 'Aufbauseminare', href: '/aufbauseminare' },
  { label: 'Termine', href: '/termine' },
  { label: 'Checkliste', href: '/checkliste' },
  { label: 'BKF-Module', href: '/bkf-module' },
]

/** Sticky-Header: transparent auf dem Navy-Seitenanfang, blur/weiß nach dem Scrollen */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const light = !scrolled && !menuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        light ? 'bg-transparent text-white' : 'bg-white/85 text-brand-950 shadow-sm backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <img
            src="/images/logo-findeisen.png"
            alt="Fahrschule Findeisen"
            className={`h-9 w-auto transition-[filter] duration-300 ${light ? 'brightness-0 invert' : ''}`}
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Hauptnavigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring link-underline text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className={`focus-ring rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
              light
                ? 'bg-white text-brand-900 hover:bg-brand-100'
                : 'bg-brand-600 text-white hover:bg-brand-500'
            }`}
          >
            Kontakt
          </Link>
        </nav>

        {/* Mobile-Burger */}
        <button
          type="button"
          className="focus-ring flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`h-0.5 w-6 bg-current transition-transform duration-300 ${menuOpen ? 'translate-y-1 rotate-45' : ''}`}
          />
          <span
            className={`h-0.5 w-6 bg-current transition-transform duration-300 ${menuOpen ? '-translate-y-1 -rotate-45' : ''}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 top-full z-40 flex h-[100dvh] flex-col gap-2 bg-brand-950 px-8 py-10 text-white lg:hidden"
            aria-label="Mobile Navigation"
          >
            {[{ label: 'Start', href: '/' }, ...navLinks, { label: 'Kontakt', href: '/kontakt' }].map(
              (link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="focus-ring block py-2 font-display text-2xl font-bold"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ),
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
