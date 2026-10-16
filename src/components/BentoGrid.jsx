import { motion } from 'framer-motion'
import { ShieldCheck, Zap, Wrench, Leaf } from 'lucide-react'

const cards = [
  {
    icon: ShieldCheck, title: 'Cuerpo TPU Flexible Absorbe-Impactos', span: 'md:col-span-2',
    text: 'A diferencia del plástico rígido que se parte en la primera caída o contra una roca, el TPU impreso en 3D se deforma, absorbe la energía y recupera su forma.',
    tag: 'vs. plástico rígido', accent: 'text-racing',
    extra: (
      <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
        <div className="border border-zinc-800 bg-zinc-950/60 p-3"><p className="text-zinc-500">Plástico ABS</p><p className="mt-1 font-display text-lg font-bold text-red-400">Se parte</p></div>
        <div className="border border-racing/40 bg-racing/10 p-3"><p className="text-zinc-400">TPU BikeCap</p><p className="mt-1 font-display text-lg font-bold text-racing">Rebota</p></div>
      </div>
    ),
  },
  {
    icon: Zap, title: 'Grabado Láser de Fibra Permanente', span: '',
    text: 'Inmune a barro, piedras, sol directo y lavados a presión. No es pegatina ni pintura: el láser marca el metal.',
    tag: 'Inmune a UV', accent: 'text-anod',
  },
  {
    icon: Wrench, title: 'Ajuste sin tornillos pesados', span: '',
    text: 'Tolerancia precisa para entrar a presión en manillares estándar de 19 a 22 mm de diámetro interior. Cero holguras, cero peso extra.',
    tag: 'Ø 19–22 mm', accent: 'text-anod',
  },
  {
    icon: Leaf, title: 'Fabricación Bajo Demanda / Cero Residuos', span: 'md:col-span-2',
    text: 'Cada par se imprime y graba después de tu pedido. Sin stock muerto, sin excedentes, sin desperdicio de material.',
    tag: '0 stock · 0 residuos', accent: 'text-racing',
  },
]

export default function BentoGrid() {
  return (
    <section id="materiales" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-20 sm:px-6">
      <p className="section-tag">// 02 · Materiales & Rendimiento</p>
      <h2 className="section-title mt-2">Ingeniería que <span className="text-anod">resiste</span></h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {cards.map(({ icon: Icon, title, text, tag, accent, span, extra }, i) => (
          <motion.article key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }} className={`tech-card group p-6 sm:p-8 transition-colors hover:border-racing/50 ${span}`}>
            <div className="flex items-start justify-between">
              <Icon size={34} className={accent} />
              <span className="border border-zinc-700 px-2 py-1 font-display text-[10px] uppercase tracking-widest text-zinc-400">{tag}</span>
            </div>
            <h3 className="mt-6 font-display text-xl font-bold uppercase leading-tight text-white sm:text-2xl">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{text}</p>
            {extra}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-racing transition-all duration-500 group-hover:w-full" />
          </motion.article>
        ))}
      </div>
    </section>
  )
}
