import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Simulator from './components/Simulator'
import BentoGrid from './components/BentoGrid'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import LegalLayout, { currentRoute } from './components/LegalLayout'
import { asset, WHATSAPP_PHONE, WHATSAPP_DISPLAY } from './data'

const STORAGE_KEY = 'gripcap_saved_cart_v1'

function Home() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // Si localStorage supera cuota con muchas imágenes, mantener en memoria
    }
  }, [cart])

  const addToCart = (item) => setCart((c) => [...c, item])
  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id))

  return (
    <div className="relative min-h-screen overflow-x-hidden text-zinc-200">
      {/* Fondo fotográfico GripCap: ciclista en sendero montañoso */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${asset('fondoweb.jpg')})`,
        }}
      >
        {/* Capa de atmósfera oscura y gradientes técnicos para legibilidad premium */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-darker/70 via-ink-darker/60 to-ink-darker/95" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-ink-darker/40 to-ink-darker/90" />
      </div>

      <div className="relative z-10">
        <Navbar cart={cart} removeFromCart={removeFromCart} />
        <main>
          <Hero />
          <Simulator cart={cart} addToCart={addToCart} />
          <BentoGrid />
          <Gallery />
        </main>
        <Footer />
      </div>

      {/* Botón flotante de WhatsApp vinculado al 658288233 */}
      <a
        id="floating-whatsapp"
        href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola GripCap, quiero información o hacer un pedido de tapones personalizados')}`}
        target="_blank"
        rel="noreferrer"
        aria-label={`Contactar por WhatsApp al ${WHATSAPP_DISPLAY}`}
        title={`WhatsApp ${WHATSAPP_DISPLAY}`}
        className="group fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full border border-[#25D366]/60 bg-[#25D366] px-4 py-3.5 font-display text-xs font-black uppercase tracking-wider text-black shadow-[0_0_30px_rgba(37,211,102,0.55)] transition-all duration-300 hover:scale-105 hover:bg-[#20bd5a]"
      >
        <MessageCircle size={22} className="fill-black text-[#25D366]" />
        <span className="hidden sm:inline">WhatsApp · {WHATSAPP_DISPLAY}</span>
      </a>

      <CookieBanner />
    </div>
  )
}

// Enrutado por ruta del servidor: la web principal vive en "/" y las páginas
// legales en /aviso-legal, /privacidad, /cookies y /envios-y-devoluciones.
// GitHub Pages sirve 404.html para esas rutas y el layout legal lee la ruta del
// navegador para renderizar el documento correspondiente.
export default function App() {
  const route = currentRoute()
  return route === '/' ? <Home /> : <LegalLayout />
}
