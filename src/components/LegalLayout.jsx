import { useEffect } from 'react'
import { ArrowLeft, Home, AlertCircle } from 'lucide-react'
import { asset, WHATSAPP_PHONE, WHATSAPP_DISPLAY } from '../data'
import { COMPANY } from '../legal'
import AvisoLegal from './legal/AvisoLegal'
import Privacidad from './legal/Privacidad'
import Cookies from './legal/Cookies'
import Envios from './legal/Envios'

// Rutas legales de primer nivel: con `base: './'` de Vite, las rutas en la
// raíz resuelven los assets como /assets/... sin depender del nombre del repo.
export const LEGAL_ROUTES = {
  '/aviso-legal': {
    title: 'Aviso legal',
    description:
      'Identificación del titular de GripCap, condiciones de uso del sitio web, propiedad intelectual y legislación aplicable.',
    Component: AvisoLegal,
  },
  '/privacidad': {
    title: 'Política de privacidad',
    description:
      'Responsable del tratamiento, datos recabados, finalidades, destinatarios y derechos del usuario conforme al RGPD.',
    Component: Privacidad,
  },
  '/cookies': {
    title: 'Política de cookies',
    description:
      'Tipos de cookies utilizadas por GripCap, almacenamiento local del carrito y cómo gestionarlas desde el navegador.',
    Component: Cookies,
  },
  '/envios-y-devoluciones': {
    title: 'Envíos y devoluciones',
    description:
      'Plazos de entrega a toda España, gastos de envío, derecho de desistimiento y devolución de productos personalizados.',
    Component: Envios,
  },
}

export function currentRoute() {
  const p = window.location.pathname.replace(/\/+$/, '')
  return p === '' ? '/' : p
}

function goHome() {
  window.location.href = '/'
}

function NotFound() {
  useEffect(() => {
    document.title = `Página no encontrada | GripCap`
  }, [])
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
      <AlertCircle size={48} className="mb-4 text-racing" />
      <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">Página no encontrada</h1>
      <p className="mt-3 text-sm text-zinc-400">
        La dirección que has indicado no existe o ha sido trasladada.
      </p>
      <button onClick={goHome} className="btn-primary mt-8">
        <Home size={16} /> Volver a la tienda
      </button>
    </main>
  )
}

export default function LegalLayout() {
  const route = currentRoute()
  const page = LEGAL_ROUTES[route]

  useEffect(() => {
    if (page) {
      document.title = `${page.title} | GripCap`
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', page.description)
    }
    window.scrollTo(0, 0)
  }, [page])

  if (!page) {
    return (
      <>
        <LegalHeader />
        <NotFound />
        <LegalFooter />
      </>
    )
  }

  const { Component } = page

  return (
    <div className="min-h-screen bg-ink-darker text-zinc-200">
      <LegalHeader />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Migas de pan */}
        <nav aria-label="Migas de pan" className="mb-8 text-xs text-zinc-500">
          <button onClick={goHome} className="transition hover:text-racing">
            Inicio
          </button>
          <span className="mx-2 text-zinc-700">/</span>
          <span className="text-zinc-400">{page.title}</span>
        </nav>

        <header className="mb-10 border-b border-ink-border pb-8">
          <p className="section-tag mb-3">{COMPANY.brand}</p>
          <h1 className="font-display text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
            {page.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">{page.description}</p>
        </header>

        <article className="pb-8">
          <Component />
        </article>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-ink-border pt-8">
          <button onClick={goHome} className="btn-ghost">
            <ArrowLeft size={16} /> Volver a la tienda
          </button>
          <p className="text-xs text-zinc-600">
            ¿Prefieres hablar con nosotros?{' '}
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola GripCap, tengo una consulta')}`}
              target="_blank"
              rel="noreferrer"
              className="text-racing hover:underline"
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </p>
        </div>
      </main>

      <LegalFooter />

      {/* Botón flotante de WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola GripCap, quiero información o hacer un pedido de tapones personalizados')}`}
        target="_blank"
        rel="noreferrer"
        aria-label={`Contactar por WhatsApp al ${WHATSAPP_DISPLAY}`}
        title={`WhatsApp ${WHATSAPP_DISPLAY}`}
        className="group fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full border border-[#25D366]/60 bg-[#25D366] px-4 py-3.5 font-display text-xs font-black uppercase tracking-wider text-black shadow-[0_0_30px_rgba(37,211,102,0.55)] transition-all duration-300 hover:scale-105 hover:bg-[#20bd5a]"
      >
        <span className="sm:hidden">WA</span>
        <span className="hidden sm:inline">WhatsApp · {WHATSAPP_DISPLAY}</span>
      </a>
    </div>
  )
}

function LegalHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-border bg-ink-darker/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <button onClick={goHome} className="flex items-center gap-3 transition hover:opacity-80">
          <img src={asset('logo.png')} alt="GripCap" className="h-8 w-auto mix-blend-screen sm:h-9" />



        </button>
        <button onClick={goHome} className="btn-ghost py-2 text-xs">
          <Home size={14} /> Inicio
        </button>
      </div>
    </header>
  )
}

function LegalFooter() {
  return (
    <footer className="border-t border-ink-border bg-ink-darker/95">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="section-tag mb-4">Legal</p>
        <ul className="grid gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          {Object.entries(LEGAL_ROUTES).map(([path, { title }]) => (
            <li key={path}>
              <a href={path} className="transition hover:text-white">
                {title}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 border-t border-ink-border pt-6 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} {COMPANY.brand} · {COMPANY.holder} · D.N.I. {COMPANY.dni} · Todos los
          derechos reservados.
        </div>
      </div>
    </footer>
  )
}
