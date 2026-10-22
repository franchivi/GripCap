import { useState } from 'react'
import { Menu, X, ShoppingCart, Trash2, MessageCircle, Download } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { eur, asset, WHATSAPP_DISPLAY } from '../data'
import { sendOrderToWhatsApp } from '../utils/orderWhatsapp'

const links = [
  { href: '#simulador', label: 'Simulador' },
  { href: '#materiales', label: 'Materiales & Rendimiento' },
  { href: '#galeria', label: 'Imágenes & Vídeo' },
]

export default function Navbar({ cart, removeFromCart }) {
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [orderNotice, setOrderNotice] = useState(null)
  const total = cart.reduce((s, i) => s + i.total, 0)

  const handleOrderCart = async () => {
    if (!cart.length) {
      const el = document.getElementById('simulador')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      return
    }
    const res = await sendOrderToWhatsApp(cart)
    if (res) {
      setOrderNotice(res)
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-border bg-ink-darker/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" aria-label="GripCap inicio" className="flex items-center gap-3">
          <img
            src={asset('logo.png')}
            alt="GripCap"
            className="h-8 w-auto mix-blend-screen transition hover:opacity-90 sm:h-9"
          />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-display text-xs font-semibold uppercase tracking-widest text-zinc-300 transition hover:text-racing active:text-anod"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            id="cart-btn"
            aria-label="Carrito"
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-zinc-300 transition hover:text-anod"
          >
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center bg-racing text-[10px] font-black text-black">
                {cart.length}
              </span>
            )}
          </button>
          <button
            id="nav-cta"
            onClick={() => (cart.length > 0 ? setCartOpen(true) : handleOrderCart())}
            className="btn-primary hidden !py-2 sm:inline-flex"
          >
            <MessageCircle size={15} /> Pedir Ahora
          </button>
          <button aria-label="Menú" className="p-2 text-zinc-300 lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink-border bg-ink-surface lg:hidden"
          >
            <ul className="flex flex-col gap-1 p-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-sm font-semibold uppercase tracking-widest text-zinc-300 hover:text-racing"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setOpen(false)
                    if (cart.length > 0) setCartOpen(true)
                    else handleOrderCart()
                  }}
                  className="btn-primary mt-2 w-full"
                >
                  <MessageCircle size={15} /> Pedir Ahora
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col border-l border-ink-border bg-ink-surface p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between border-b border-ink-border pb-4">
                <h2 className="font-display text-xl font-bold uppercase text-white">
                  Tu carrito <span className="text-racing">GripCap</span>
                </h2>
                <button onClick={() => setCartOpen(false)} aria-label="Cerrar" className="text-zinc-400 hover:text-white">
                  <X />
                </button>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto">
                {cart.length === 0 && (
                  <p className="text-sm text-zinc-500">
                    Aún no has guardado ningún diseño. Configura tus tapones en el simulador y pulsa &ldquo;Guardar diseño / Añadir al carrito&rdquo;.
                  </p>
                )}
                {cart.map((i) => (
                  <div key={i.id} className="flex items-center gap-3 border border-ink-border bg-ink-darker/70 p-3">
                    {i.previewDataUrl ? (
                      <img
                        src={i.previewDataUrl}
                        alt={i.summary}
                        className="h-14 w-14 shrink-0 rounded-full border border-zinc-700 object-cover shadow-md"
                      />
                    ) : (
                      <span
                        className="h-12 w-12 shrink-0 rounded-full border border-zinc-700 shadow-md"
                        style={{ background: i.gradient }}
                      />
                    )}
                    <div className="min-w-0 flex-1 text-sm">
                      <p className="truncate font-semibold text-white">{i.summary}</p>
                      <p className="text-xs text-zinc-400">
                        {i.pairs} par(es) · <span className="font-bold text-racing">{eur(i.total)}</span>
                      </p>
                    </div>
                    {i.previewDataUrl && (
                      <a
                        href={i.previewDataUrl}
                        download={`gripcap-${i.id}.png`}
                        title="Descargar imagen del diseño"
                        className="text-zinc-400 hover:text-anod transition"
                      >
                        <Download size={16} />
                      </a>
                    )}
                    <button
                      onClick={() => removeFromCart(i.id)}
                      aria-label="Eliminar"
                      className="text-zinc-500 hover:text-racing transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {orderNotice && (
                <div className="mt-3 rounded border border-[#25D366]/40 bg-[#25D366]/10 p-3 text-xs text-zinc-200">
                  {orderNotice.copiedToClipboard
                    ? '✅ Imagen copiada al portapapeles y descargada. Pégala (Ctrl+V) o adjúntala en el chat de WhatsApp.'
                    : '✅ Imagen descargada. Adjúntala en la conversación de WhatsApp que se ha abierto.'}
                </div>
              )}

              <div className="mt-4 border-t border-ink-border pt-4">
                <div className="mb-4 flex justify-between font-display text-lg font-bold text-white">
                  <span>TOTAL</span>
                  <span className="text-racing">{eur(total)}</span>
                </div>
                <button
                  id="cart-order-wa"
                  onClick={handleOrderCart}
                  className="bevel-sm flex w-full items-center justify-center gap-2 bg-[#25D366] px-5 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#1ebe5d] disabled:opacity-40"
                  disabled={!cart.length}
                >
                  <MessageCircle size={17} /> Pedir Ahora por WhatsApp ({WHATSAPP_DISPLAY})
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
