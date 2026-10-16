import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { asset } from '../data'

const tiles = [
  { src: asset('gallery/mtb.jpg'), alt: 'Tapón negro grabado en puño de espuma de MTB', cls: 'row-span-2', label: 'Trailhead MTB · Puño espuma' },
  { src: asset('gallery/gravel.jpg'), alt: 'Tapón azul eléctrico dorsal 42 en manillar gravel', cls: 'row-span-2 md:col-span-2', label: 'Dorsal 42 · Gravel Azul Eléctrico' },
  { src: asset('gallery/pair.jpg'), alt: 'Par de tapones plata y rojo grabados', cls: 'col-span-2 md:col-span-2', label: 'Edición Club · Titanio Gunmetal / Naranja' },
]

const reviews = [
  { name: 'Marcos Vidal', role: 'Presidente · Peña Ciclista Los Calvos', text: 'Encargamos 25 pares con el escudo oficial. Llevan seis meses de barro, caídas y lavados a presión y el grabado sigue impoluto.' },
  { name: 'Laura Ortega', role: 'Enduro & Downhill · Pirineos', text: 'En la primera trialera di con una piedra en el extremo del manillar: el TPU absorbió el golpe en vez de rajarse como los de plástico rígido.' },
  { name: 'Biciclas Norte', role: 'Distribuidor & Taller · Bilbao', text: 'La terminación del aluminio anodizado junto al grabado por láser tiene un nivel de detalle increíble. Muy recomendables.' },
]

export default function Gallery() {
  return (
    <section id="galeria" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-20 sm:px-6">
      <p className="section-tag">// 04 · En Acción</p>
      <h2 className="section-title mt-2">
        Montados en <span className="text-anod">bicicletas reales</span>
      </h2>

      <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
        {tiles.map((t, i) => (
          <motion.figure
            key={t.src}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group bevel relative overflow-hidden border border-ink-border ${t.cls}`}
          >
            <img
              src={t.src}
              alt={t.alt}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 transition group-hover:opacity-90" />
            <figcaption className="absolute bottom-3 left-3 right-3 font-display text-xs font-bold uppercase tracking-wider text-white transition">
              <span className="text-racing">●</span> {t.label}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {reviews.map((r, i) => (
          <motion.blockquote
            key={r.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="tech-card p-6 border-ink-border hover:border-racing/50"
          >
            <Quote className="text-racing" size={22} />
            <div className="mt-3 flex gap-0.5 text-racing">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">“{r.text}”</p>
            <footer className="mt-4 border-t border-ink-border pt-3">
              <p className="font-display text-sm font-bold text-white">{r.name}</p>
              <p className="text-xs text-zinc-400">{r.role}</p>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  )
}
