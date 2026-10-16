import { useState } from 'react'
import { Menu, X, ShoppingCart, Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { eur, asset } from '../data'

const links = [
  { href: '#simulador', label: 'Simulador' },
  { href: '#materiales', label: 'Materiales & Rendimiento' },
  { href: '#clubes', label: 'Clubes & Equipos' },
  { href: '#galeria', label: 'Galería' },
]

export default function Navbar({ cart, removeFromCart }) {
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const total = cart.reduce((s, i) => s + i.total, 0)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800/80 bg-ink/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" aria-label="BikeCap inicio" className="flex items-center">
          <img src={asset('logo.png')} alt="BikeCap" className="h-8 w-auto mix-blend-screen sm:h-9" />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="font-display text-xs font-semibold uppercase tracking-widest text-zinc-400 transition hover:text-racing">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button id="cart-btn" aria-label="Carrito" onClick={() => setCartOpen(true)} className="relative p-2 text-zinc-300 hover:text-anod">
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center bg-racing text-[10px] font-black text-black">
                {cart.length}
              </span>
            )}
          </button>
          <a id="nav-cta" href="#clubes" className="btn-primary hidden !py-2 sm:inline-flex">Pedir Ahora / Presupuesto</a>
          <button aria-label="Menú" className="p-2 lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-zinc-800 bg-ink lg:hidden">
            <ul className="flex flex-col gap-1 p-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-3 font-display text-sm font-semibold uppercase tracking-widest text-zinc-300">
                    {l.label}
                  </a>
                </li>
              ))}
              <li><a href="#clubes" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">Pedir Ahora / Presupuesto</a></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div className="fixed inset-0 z-50 bg-black/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} />
            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col border-l border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold uppercase text-white">Tu carrito</h2>
                <button onClick={() => setCartOpen(false)} aria-label="Cerrar"><X /></button>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto">
                {cart.length === 0 && <p className="text-sm text-zinc-500">Aún no has guardado ningún diseño.</p>}
                {cart.map((i) => (
                  <div key={i.id} className="flex items-center gap-3 border border-zinc-800 bg-zinc-900/60 p-3">
                    <span className="h-10 w-10 shrink-0 rounded-full border border-zinc-700" style={{ background: i.gradient }} />
                    <div className="min-w-0 flex-1 text-sm">
                      <p className="truncate font-semibold text-white">{i.summary}</p>
                      <p className="text-xs text-zinc-500">{i.pairs} par(es) · {eur(i.total)}</p>
                    </div>
                    <button onClick={() => removeFromCart(i.id)} aria-label="Eliminar" className="text-zinc-500 hover:text-racing"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-zinc-800 pt-4">
                <div className="mb-4 flex justify-between font-display text-lg font-bold text-white">
                  <span>TOTAL</span><span className="text-racing">{eur(total)}</span>
                </div>
                <button className="btn-primary w-full" disabled={!cart.length}>Finalizar pedido</button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
