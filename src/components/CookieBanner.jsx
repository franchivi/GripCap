import { useEffect, useState } from 'react'
import { Cookie } from 'lucide-react'

const CONSENT_KEY = 'gripcap_cookie_consent_v1'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true)
    } catch {
      // Si localStorage no esta disponible, mostramos el aviso igualmente
      setVisible(true)
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, 'aceptado')
    } catch {
      // sin almacenamiento: basta con cerrar el aviso en esta sesion
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-ink-border bg-ink-surface/95 px-4 py-4 shadow-[0_-8px_40px_rgba(0,0,0,0.6)] backdrop-blur-md sm:px-6"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Cookie size={22} className="mt-0.5 shrink-0 text-racing" />
          <div>
            <p className="text-sm font-semibold text-white">Aviso de cookies</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-400">
              Utilizamos <strong className="text-zinc-200">cookies técnicas propias</strong> (necesarias para el
              carrito) y el almacenamiento local de tu navegador. No usamos cookies de análisis ni de
              publicidad. Puedes consultar más detalles en nuestra{' '}
              <a href="/cookies" className="text-racing hover:underline">
                política de cookies
              </a>
              .
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <a href="/cookies" className="text-xs font-semibold uppercase tracking-wider text-zinc-400 transition hover:text-white">
            Más información
          </a>
          <button onClick={accept} className="btn-primary px-5 py-2.5 text-xs">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
