import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, Maximize2 } from 'lucide-react'
import { asset } from '../data'

const mediaItems = [
  {
    type: 'video',
    src: asset('gallery/1022.mp4'),
    poster: asset('gallery/tapon1.jpg'),
    alt: 'Vídeo 360º del tapón GripCap en aluminio anodizado y TPU',
    cls: 'col-span-2 row-span-2',
    label: 'Vídeo 360º · Nuestro Tapón GripCap al Detalle',
  },
  {
    type: 'image',
    src: asset('gallery/anunciogripcap.jpg'),
    alt: 'Personaliza tu bici con GripCap por solo 6€ el par',
    cls: 'col-span-2 row-span-2',
    label: 'Promoción Oficial · ¡Tu par de tapones por solo 6 €!',
  },
  {
    type: 'image',
    src: asset('gallery/bicimontana.jpg'),
    alt: 'Tapón GripCap montado en puño de MTB',
    cls: 'col-span-2 md:col-span-2 row-span-2',
    label: 'Montaje MTB · Puño de montaña con tapón GripCap',
  },
  {
    type: 'image',
    src: asset('gallery/bicicarretera.jpg'),
    alt: 'Tapón GripCap montado en manillar de bicicleta de carretera',
    cls: 'col-span-2 md:col-span-2 row-span-2',
    label: 'Montaje Carretera & Gravel · Ajuste perfecto en manillar',
  },
  {
    type: 'image',
    src: asset('gallery/tapon1.jpg'),
    alt: 'Tapón GripCap personalizado Trotacerros MTB',
    cls: 'col-span-2 md:col-span-2 row-span-2',
    label: 'Diseño Personalizado · Trotacerros MTB',
  },
  {
    type: 'image',
    src: asset('gallery/caja-gripcap.jpg'),
    alt: 'Presentación de par de tapones personalizados GripCap en su estuche',
    cls: 'col-span-2 md:col-span-2 row-span-2',
    label: 'Presentación GripCap · Tu par personalizado listo para montar',
  },
]

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="galeria" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-20 sm:px-6">
      <p className="section-tag">// 03 · Galería de Imágenes & Vídeo</p>
      <h2 className="section-title mt-2">
        Nuestros tapones en <span className="text-anod">bicicletas reales</span>
      </h2>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Descubre el acabado real en aluminio anodizado cepillado y cuerpo de TPU impreso en 3D tanto en MTB como en carretera y gravel.
      </p>

      <div className="mt-10 grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[230px] md:grid-cols-4">
        {mediaItems.map((item, i) => (
          <motion.figure
            key={item.src}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            onClick={() => setSelected(item)}
            className={`group bevel relative cursor-pointer overflow-hidden border border-ink-border bg-ink-darker ${item.cls}`}
          >
            {item.type === 'video' ? (
              <video
                src={item.src}
                poster={item.poster}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-70 transition group-hover:opacity-90" />
            <div className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100">
              {item.type === 'video' ? <Play size={15} /> : <Maximize2 size={15} />}
            </div>
            <figcaption className="pointer-events-none absolute bottom-3 left-3 right-3 font-display text-xs font-bold uppercase tracking-wider text-white">
              <span className="text-racing">●</span> {item.label}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      {/* Lightbox para ver imagen o vídeo en grande */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Cerrar vista ampliada"
              className="absolute right-6 top-6 rounded-full border border-zinc-700 bg-ink-surface p-2.5 text-white hover:border-racing"
            >
              <X size={22} />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-4xl overflow-hidden border border-ink-border bg-ink-darker shadow-2xl"
            >
              {selected.type === 'video' ? (
                <video
                  src={selected.src}
                  controls
                  autoPlay
                  loop
                  className="max-h-[80vh] w-full object-contain"
                />
              ) : (
                <img
                  src={selected.src}
                  alt={selected.alt}
                  className="max-h-[80vh] w-full object-contain"
                />
              )}
              <div className="border-t border-ink-border bg-ink-surface px-4 py-3 font-display text-xs font-bold uppercase tracking-wider text-white">
                <span className="text-racing">●</span> {selected.label}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
