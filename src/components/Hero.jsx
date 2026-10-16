import { motion } from 'framer-motion'
import { Droplets, Flame, Bike, ArrowRight, Users } from 'lucide-react'
import { asset } from '../data'

const stats = [
  { icon: Droplets, text: '100% Resistente a lavado a presión' },
  { icon: Flame, text: 'Grabado láser indestructible' },
  { icon: Bike, text: 'Ajuste universal MTB / Gravel / Carretera' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36">
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full bg-racing/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-[-10%] h-[400px] w-[400px] rounded-full bg-anod/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <img src={asset('logo-3d.jpg')} alt="BikeCap" className="mb-6 w-full max-w-sm mix-blend-lighten" />
          <span className="bevel-sm inline-block border border-racing/40 bg-racing/10 px-4 py-2 font-display text-[11px] font-bold uppercase tracking-[0.25em] text-racing">
            Ingeniería Aero & Personalización Láser
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold uppercase italic leading-[1.02] text-white sm:text-6xl xl:text-7xl">
            Detalles que marcan la diferencia en cada <span className="bg-gradient-to-r from-racing to-racing-soft bg-clip-text text-transparent">sendero</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Tapones de manillar de ultra-rendimiento. Cuerpo amortiguador en TPU elástico impreso en 3D + chapa frontal de aluminio anodizado grabado a láser de fibra. Cero holguras, máxima resistencia.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a id="hero-cta-sim" href="#simulador" className="btn-primary">Diseñar mis tapones <ArrowRight size={16} /></a>
            <a id="hero-cta-clubs" href="#clubes" className="btn-ghost"><Users size={16} /> Lotes para Clubes</a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-md">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-zinc-700" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-6 rounded-full border border-anod/30" />
          <div className="absolute inset-12 overflow-hidden rounded-full border-4 border-zinc-800 shadow-[0_0_80px_rgba(255,85,0,0.25)]">
            <img src={asset('gallery/pair.jpg')} alt="Par de tapones BikeCap con aluminio anodizado grabado a láser" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -right-2 bottom-10 border border-zinc-800 bg-zinc-900/80 px-3 py-2 font-display text-xs backdrop-blur">
            <span className="text-racing">●</span> Ø 19–22 mm
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-7xl gap-px px-4 sm:px-6 md:grid-cols-3">
        {stats.map(({ icon: Icon, text }, i) => (
          <motion.div key={text} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="glass flex items-center gap-4 p-5">
            <Icon className="shrink-0 text-anod" size={28} />
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-zinc-200">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
