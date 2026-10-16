import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Upload, CheckCircle2 } from 'lucide-react'
import { TIERS, BASE_PRICE, discountFor, unitPrice, eur } from '../data'

const empty = { club: '', contact: '', email: '', phone: '', qty: '', file: null }

export default function B2BSection() {
  const [tier, setTier] = useState(TIERS[5])
  const [form, setForm] = useState(empty)
  const [sent, setSent] = useState(false)
  const fileRef = useRef(null)

  const disc = discountFor(tier.pairs)
  const unit = unitPrice(tier.pairs)
  const total = unit * tier.pairs
  const saving = (BASE_PRICE - unit) * tier.pairs

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm(empty)
    if (fileRef.current) fileRef.current.value = ''
  }

  const pickTier = (t) => {
    setTier(t)
    setForm((f) => ({ ...f, qty: String(t.pairs) }))
  }

  return (
    <section id="clubes" className="relative scroll-mt-16 border-y border-ink-border bg-ink-darker/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="section-tag">// 03 · Descuentos por Volumen</p>
        <h2 className="section-title mt-2">
          Clubes, marchas <span className="text-racing">y tiendas</span>
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Equipa a tu grupeta o diseña una edición especial para tu marcha cicloturista. Grabado de escudo oficial incluido a partir de 10 pares.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Calculadora por volumen */}
          <div className="tech-card p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold uppercase text-white">Calculadora de tarifas B2B</h3>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TIERS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => pickTier(t)}
                  className={`relative border px-2 py-3 font-display text-xs font-bold uppercase transition ${
                    tier.id === t.id
                      ? 'border-racing bg-racing text-black shadow-[0_0_15px_rgba(255,98,25,0.4)]'
                      : 'border-ink-border bg-ink-darker text-zinc-300 hover:border-zinc-500'
                  }`}
                >
                  {t.label}
                  {t.discount > 0 && (
                    <span className={`block text-[10px] ${tier.id === t.id ? 'text-black/80 font-bold' : 'text-racing'}`}>
                      -{Math.round(t.discount * 100)}%
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Stat label="Precio / par" value={eur(unit)} sub={disc > 0 ? <s className="text-zinc-500">{eur(BASE_PRICE)}</s> : 'tarifa base'} />
              <Stat label="Descuento aplicado" value={`${Math.round(disc * 100)}%`} accent />
              <Stat label={`Total estimado (${tier.label})`} value={eur(total)} big />
              <Stat label="Ahorro del lote" value={eur(saving)} accent />
            </div>

            <div className="mt-6">
              <div className="mb-1.5 flex justify-between text-[11px] uppercase tracking-widest text-zinc-400">
                <span>Escala de ahorro</span>
                <span className="text-racing font-bold">Hasta 35% de descuento</span>
              </div>
              <div className="h-2.5 bg-ink-darker rounded-full overflow-hidden border border-ink-border">
                <motion.div
                  className="h-full bg-gradient-to-r from-anod via-racing to-racing-glow"
                  animate={{ width: `${(disc / 0.35) * 100}%` }}
                />
              </div>
            </div>
            <p className="mt-4 text-xs text-zinc-400 leading-relaxed">
              * IVA incluido. Grabado láser de alta precisión y vectorización de logotipo incluida para pedidos de equipo.
            </p>
          </div>

          {/* Formulario directo */}
          <form onSubmit={submit} className="tech-card space-y-4 p-6 sm:p-8">
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
                <CheckCircle2 size={56} className="text-racing" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase text-white">¡Solicitud recibida!</h3>
                <p className="mt-2 text-sm text-zinc-300">Te enviaremos la propuesta técnica y el boceto 2D de tu tapón en menos de 24h.</p>
                <button type="button" onClick={() => setSent(false)} className="btn-ghost mt-6">Nueva solicitud</button>
              </motion.div>
            ) : (
              <>
                <h3 className="font-display text-lg font-bold uppercase text-white">Solicitar presupuesto personalizado</h3>
                <input required className="input" placeholder="Nombre del Club / Peña / Empresa" value={form.club} onChange={set('club')} />
                <input required className="input" placeholder="Nombre y apellidos del responsable" value={form.contact} onChange={set('contact')} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required type="email" className="input" placeholder="Correo electrónico" value={form.email} onChange={set('email')} />
                  <input required type="tel" className="input" placeholder="Teléfono de contacto" value={form.phone} onChange={set('phone')} />
                </div>
                <input required type="number" min={1} className="input" placeholder="Cantidad de pares deseada" value={form.qty} onChange={set('qty')} />
                <label className="flex cursor-pointer items-center gap-3 border border-dashed border-ink-border bg-ink-darker/60 p-4 text-sm text-zinc-400 transition hover:border-anod hover:text-anod">
                  <Upload size={18} />
                  <span className="truncate">{form.file ? form.file.name : 'Subir escudo / archivo vectorial (SVG, AI, PDF, PNG)'}</span>
                  <input ref={fileRef} type="file" accept=".svg,.png,.pdf,.ai,.jpg" className="hidden" onChange={(e) => setForm({ ...form, file: e.target.files?.[0] ?? null })} />
                </label>
                <button id="b2b-submit" type="submit" className="btn-primary w-full">
                  <Send size={16} /> Enviar solicitud para clubes
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value, sub, accent, big }) {
  return (
    <div className="border border-ink-border bg-ink-darker/80 p-4 shadow-sm">
      <p className="text-[11px] uppercase tracking-widest text-zinc-400">{label}</p>
      <motion.p
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`font-display font-bold ${big ? 'text-3xl text-white' : 'text-2xl'} ${accent ? 'text-racing' : 'text-white'}`}
      >
        {value}
      </motion.p>
      {sub && <p className="text-xs text-zinc-400 mt-0.5">{sub}</p>}
    </div>
  )
}
