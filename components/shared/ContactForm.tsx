'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { licenseClasses } from '@/lib/data/licenseClasses'
import Button from './Button'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ''

const inputClasses =
  'focus-ring rounded-xl border border-brand-200 bg-white/80 px-4 py-2.5 text-brand-950 placeholder:text-brand-950/40'

/** Kontaktformular, Versand über Web3Forms (kein eigenes Backend nötig).
 *  NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY muss vom Betreiber nach der Registrierung
 *  auf web3forms.com gesetzt werden. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot: bleibt für Menschen leer, Bots füllen häufig jedes Feld aus
    if (data.get('botcheck')) return

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      const result = await response.json()

      if (result.success) {
        setStatus('success')
        form.reset()
      } else {
        throw new Error(result.message || 'Unbekannter Fehler')
      }
    } catch {
      setStatus('error')
      setErrorMessage(
        'Deine Anfrage konnte nicht gesendet werden. Bitte ruf uns an oder schreib eine E-Mail — Kontaktdaten oben.'
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="glass-card flex flex-col items-center gap-3 p-8 text-center sm:p-10">
        <p className="font-display text-lg font-bold text-brand-950">
          Danke für deine Anfrage!
        </p>
        <p className="text-brand-950/70">Wir melden uns so schnell wie möglich bei dir zurück.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-5 p-6 sm:p-8">
      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
      <input type="hidden" name="subject" value="Neue Anfrage über die Website" />
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-brand-950">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Dein Name"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-brand-950">
            E-Mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="du@beispiel.de"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-semibold text-brand-950">
            Telefon
          </label>
          <input
            id="phone"
            name="Telefon"
            type="tel"
            autoComplete="tel"
            placeholder="Optional"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="interest" className="text-sm font-semibold text-brand-950">
            Interesse an
          </label>
          <select
            id="interest"
            name="Interesse an"
            defaultValue="Allgemeine Anfrage"
            className={inputClasses}
          >
            <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
            {licenseClasses.map((licenseClass) => (
              <option
                key={licenseClass.code}
                value={`Klasse ${licenseClass.code} — ${licenseClass.title}`}
              >
                Klasse {licenseClass.code} — {licenseClass.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold text-brand-950">
          Nachricht *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Wie können wir dir helfen?"
          className={`resize-none ${inputClasses}`}
        />
      </div>

      <label htmlFor="consent" className="flex items-start gap-3 text-sm text-brand-950/80">
        <input
          id="consent"
          type="checkbox"
          required
          className="focus-ring mt-0.5 h-4 w-4 rounded border-brand-300"
        />
        <span>
          Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage gespeichert und
          verarbeitet werden. Details in der{' '}
          <Link href="/datenschutz" className="link-underline font-semibold text-brand-700">
            Datenschutzerklärung
          </Link>
          .
        </span>
      </label>

      {status === 'error' && (
        <p role="alert" className="text-sm font-semibold text-red-600">
          {errorMessage}
        </p>
      )}

      <Button type="submit" disabled={status === 'submitting'} className="self-start">
        {status === 'submitting' ? 'Wird gesendet…' : 'Anfrage senden'}
      </Button>

      {!WEB3FORMS_ACCESS_KEY && (
        <p className="text-xs text-brand-950/50">
          Hinweis für den Betreiber: Web3Forms-Access-Key fehlt noch (Umgebungsvariable
          NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY), das Formular versendet erst nach Eintragung.
        </p>
      )}
    </form>
  )
}
