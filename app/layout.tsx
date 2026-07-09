import type { Metadata } from 'next'
import { Manrope, Outfit } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export const metadata: Metadata = {
  title: 'Fahrschule Findeisen — Dein Weg zum Führerschein',
  description:
    'Fahrschule Findeisen in Zwönitz und Hormersdorf: moderne Fahrzeugflotte, alle Führerscheinklassen von AM bis T, Klasse B197 und ein familiäres Team.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${outfit.variable} ${manrope.variable}`}>
      <body className="noise-overlay">
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
