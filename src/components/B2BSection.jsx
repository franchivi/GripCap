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
    <section id="clubes" className="relative scroll-mt-16 border-y border-zinc-900 bg-zinc-950/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="section-tag">// 03 · B2B</p>
        <h2 className="section-title mt-2">Clubes, marchas <span className="text-racing">y tiendas</span></h2>
        <p className="mt-3 max-w-2xl text-zinc-400">Equipa a todo tu pelotón con el escudo grabado. Cuantos más pares, menos pagas por unidad.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Calculadora */}
          <div className="tech-card p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold uppercase text-white">Calculadora por volumen</h3>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TIERS.map((t) => (
                <button key={t.id} onClick={() => pickTier(t)}
                  className={`relative border px-2 py-3 font-display text-xs font-bold uppercase transition ${tier.id === t.id ? 'border-racing bg-racing text-black' : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-600'}`}>
                  {t.label}
                  {t.discount > 0 && <span className={`block text-[10px] ${tier.id === t.id ? 'text-black/70' : 'text-racing'}`}>-{Math.round(t.discount * 100)}%</span>}
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Stat label="Precio / par" value={eur(unit)} sub={disc > 0 ? <s className="text-zinc-600">{eur(BASE_PRICE)}</s> : 'precio base'} />
              <Stat label="Descuento" value={`${Math.round(disc * 100)}%`} accent />
              <Stat label={`Total ${tier.label}`} value={eur(total)} big />
              <Stat label="Ahorras" value={eur(saving)} accent />
            </div>

            <div className="mt-6">
              <div className="mb-1 flex justify-between text-[11px] uppercase tracking-widest text-zinc-500"><span>Descuento</span><span>35% máx.</span></div>
              <div className="h-2 bg-zinc-800">
                <motion.div className="h-full bg-gradient-to-r from-anod to-racing" animate={{ width: `${(disc / 0.35) * 100}%` }} />
              </div>
            </div>
            <p className="mt-4 text-xs text-zinc-500">* Precios IVA incl. Grabado de escudo incluido en lotes de 10+ pares.</p>
          </div>

          {/* Formulario */}
          <form onSubmit={submit} className="tech-card space-y-4 p-6 sm:p-8">
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
                <CheckCircle2 size={56} className="text-racing" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase text-white">¡Solicitud recibida!</h3>
                <p className="mt-2 text-sm text-zinc-400">Te enviaremos un presupuesto con boceto del grabado en menos de 24 h.</p>
                <button type="button" onClick={() => setSent(false)} className="btn-ghost mt-6">Nueva solicitud</button>
              </motion.div>
            ) : (
              <>
                <h3 className="font-display text-lg font-bold uppercase text-white">Solicitar presupuesto</h3>
                <input required className="input" placeholder="Nombre de la peña / club" value={form.club} onChange={set('club')} />
                <input required className="input" placeholder="Persona de contacto" value={form.contact} onChange={set('contact')} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required type="email" className="input" placeholder="Email" value={form.email} onChange={set('email')} />
                  <input required type="tel" className="input" placeholder="Teléfono" value={form.phone} onChange={set('phone')} />
                </div>
                <input required type="number" min={1} className="input" placeholder="Cantidad estimada de pares" value={form.qty} onChange={set('qty')} />
                <label className="flex cursor-pointer items-center gap-3 border border-dashed border-zinc-700 p-4 text-sm text-zinc-400 transition hover:border-anod hover:text-anod">
                  <Upload size={18} />
                  <span className="truncate">{form.file ? form.file.name : 'Subir escudo / arte final (SVG, PNG, PDF, AI)'}</span>
                  <input ref={fileRef} type="file" accept=".svg,.png,.pdf,.ai,.jpg" className="hidden" onChange={(e) => setForm({ ...form, file: e.target.files?.[0] ?? null })} />
                </label>
                <button id="b2b-submit" type="submit" className="btn-primary w-full"><Send size={16} /> Enviar solicitud</button>
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
    <div className="border border-zinc-800 bg-zinc-950/70 p-4">
      <p className="text-[11px] uppercase tracking-widest text-zinc-500">{label}</p>
      <motion.p key={value} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        className={`font-display font-bold ${big ? 'text-3xl text-white' : 'text-2xl'} ${accent ? 'text-racing' : 'text-white'}`}>{value}</motion.p>
      {sub && <p className="text-xs text-zinc-500">{sub}</p>}
    </div>
  )
}
