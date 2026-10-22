import { motion } from 'framer-motion'
import { Droplets, Flame, Bike, ArrowRight, Sparkles, MessageCircle } from 'lucide-react'
import { asset, BASE_PRICE, WHATSAPP_PHONE, eur } from '../data'

const stats = [
  { icon: Droplets, text: '100% Resistente a lavado a presión', color: 'text-anod' },
  { icon: Flame, text: 'Grabado láser sobre aluminio anodizado', color: 'text-racing' },
  { icon: Bike, text: 'Ajuste universal MTB / Gravel / Carretera', color: 'text-anod' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36">
      {/* Resplandores del logo: Naranja cálido bisel y azul eléctrico */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full bg-racing/15 blur-[150px]" />
      <div className="pointer-events-none absolute top-20 left-[-15%] h-[500px] w-[500px] rounded-full bg-anod/15 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="relative mb-6 inline-block">
            <img
              src={asset('logo-3d.png')}
              alt="GripCap Logo"
              className="w-full max-w-md filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.9)]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="bevel-sm inline-flex items-center gap-2 border border-racing/40 bg-racing/10 px-4 py-2 font-display text-[11px] font-bold uppercase tracking-[0.25em] text-racing">
              <Sparkles size={13} className="text-racing" />
              Tapones Customizados Premium
            </span>
            <span className="bevel-sm inline-flex items-center gap-1.5 bg-racing px-3.5 py-2 font-display text-xs font-black uppercase tracking-wider text-black shadow-[0_0_20px_rgba(255,98,25,0.45)]">
              ¡Solo {eur(BASE_PRICE)} el par!
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold uppercase italic leading-[1.05] text-white sm:text-6xl xl:text-7xl">
            Detalles que marcan la diferencia en cada{' '}
            <span className="bg-gradient-to-r from-racing via-racing-glow to-anod bg-clip-text text-transparent">
              sendero
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            Tapones de manillar de ultra-rendimiento. Cuerpo amortiguador en TPU elástico impreso en 3D + chapa frontal de aluminio anodizado grabado a láser por solo <strong className="text-white">{eur(BASE_PRICE)} el par</strong>.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a id="hero-cta-sim" href="#simulador" className="btn-primary">
              Diseñar mis tapones ({eur(BASE_PRICE)}/par) <ArrowRight size={16} />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola GripCap, quiero personalizar mis tapones de manillar')}`}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <MessageCircle size={16} className="text-[#25D366]" /> Consultar por WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Visual interactivo con vídeo 360º real del tapón GripCap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          {/* Anillos orbitales estilo técnico/automoción */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-racing/30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-6 rounded-full border border-anod/40"
          />
          <div className="absolute inset-10 overflow-hidden rounded-full border-4 border-ink-border bg-black shadow-[0_0_80px_rgba(255,98,25,0.35)]">
            <img
              src={asset('gallery/tapon1.jpg')}
              alt="Tapón GripCap Trotacerros MTB con grabado láser"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-7xl gap-3 px-4 sm:px-6 md:grid-cols-3">
        {stats.map(({ icon: Icon, text, color }, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="tech-card flex items-center gap-4 p-5 hover:border-racing/60"
          >
            <Icon className={`shrink-0 ${color}`} size={28} />
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-zinc-200">
              {text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
