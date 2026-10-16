import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Simulator from './components/Simulator'
import BentoGrid from './components/BentoGrid'
import B2BSection from './components/B2BSection'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import { asset } from './data'

export default function App() {
  const [cart, setCart] = useState([])
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
          <Simulator addToCart={addToCart} />
          <BentoGrid />
          <B2BSection />
          <Gallery />
        </main>
        <Footer />
      </div>
    </div>
  )
}
