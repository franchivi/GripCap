import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Simulator from './components/Simulator'
import BentoGrid from './components/BentoGrid'
import B2BSection from './components/B2BSection'
import Gallery from './components/Gallery'
import Footer from './components/Footer'

export default function App() {
  const [cart, setCart] = useState([])
  const addToCart = (item) => setCart((c) => [...c, item])
  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id))

  return (
    <>
      <Navbar cart={cart} removeFromCart={removeFromCart} />
      <main>
        <Hero />
        <Simulator addToCart={addToCart} />
        <BentoGrid />
        <B2BSection />
        <Gallery />
      </main>
      <Footer />
    </>
  )
}
