import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, ShoppingCart, Check, Trash2, Minus, Plus, Type, ZoomIn, RotateCcw } from 'lucide-react'
import { COLORS, FONTS, GRIPS, LOGO_FEE, BASE_PRICE, discountFor, unitPrice, eur } from '../data'

function CapPreview({ color, grip, text, font, scale, logo, logoScale, silhouette, mode }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]" style={{ containerType: 'inline-size' }}>
      {/* Contorno del puño / manillar con iluminación según el color seleccionado */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-500"
        style={{
          background: `radial-gradient(circle at 35% 30%, ${grip.ring}, #0B0C0E 75%)`,
          boxShadow: `0 30px 80px rgba(0,0,0,.8), 0 0 40px ${color.hex}22, inset 0 0 0 2px #18191E`,
        }}
      >
        {/* textura espuma */}
        <div
          className="absolute inset-0 rounded-full opacity-25"
          style={{ backgroundImage: 'repeating-radial-gradient(circle, transparent 0 6px, rgba(255,255,255,.05) 6px 7px)' }}
        />
      </div>

      {/* Cuerpo TPU amortiguador impreso en 3D */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '9%',
          background: 'radial-gradient(circle at 30% 25%, #353943, #0D0E12 80%)',
          boxShadow: 'inset 0 4px 14px rgba(255,255,255,.12), inset 0 -8px 24px rgba(0,0,0,.95), 0 0 0 3px #121316',
        }}
      >
        {/* Estrías de impresión 3D aditiva */}
        <div
          className="absolute rounded-full"
          style={{
            inset: '3%',
            backgroundImage: 'repeating-conic-gradient(rgba(255,255,255,.06) 0 3deg, transparent 3deg 6deg)',
            mask: 'radial-gradient(circle, transparent 80%, #000 81%)',
            WebkitMask: 'radial-gradient(circle, transparent 80%, #000 81%)',
          }}
        />
      </div>

      {/* Disco superior de aluminio anodizado con biselado técnico */}
      <motion.div
        key={color.id}
        initial={{ opacity: 0.5, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute overflow-hidden rounded-full"
        style={{
          inset: '17%',
          background: color.gradient,
          boxShadow: `inset 0 0 0 3px rgba(255,255,255,.22), inset 0 0 30px rgba(0,0,0,.6), 0 8px 25px rgba(0,0,0,.7)`,
        }}
      >
        {/* Micro-textura cepillado radial */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{ backgroundImage: 'repeating-radial-gradient(circle, rgba(255,255,255,.35) 0 1px, rgba(0,0,0,.25) 1px 2px)' }}
        />
        {/* Reflejo biselado automoción */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,.32) 0%, transparent 40%, transparent 65%, rgba(0,0,0,.35) 100%)',
          }}
        />

        {/* Grabado láser */}
        <div className="absolute inset-0 flex items-center justify-center">
          {mode === 'logo' && logo ? (
            <img
              src={logo}
              alt="Logotipo grabado por láser"
              draggable={false}
              style={{
                width: `${logoScale * 55}%`,
                height: `${logoScale * 55}%`,
                objectFit: 'contain',
                filter: silhouette
                  ? 'brightness(0) invert(1) drop-shadow(0 0 2px rgba(255,255,255,.7))'
                  : 'none',
                opacity: 0.95,
                mixBlendMode: silhouette ? 'screen' : 'normal',
              }}
            />
          ) : (
            <span
              style={{
                fontFamily: font.family,
                fontWeight: font.weight,
                fontSize: `${scale * 17}cqw`,
                lineHeight: 1,
                color: '#F4F6F8',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                textShadow: '0 0 1px #fff, 0 1px 0 rgba(0,0,0,.4), 0 0 10px rgba(255,255,255,.3)',
                opacity: 0.95,
              }}
            >
              {text || '—'}
            </span>
          )}
        </div>
      </motion.div>

      {/* Pequeño detalle de mecanizado técnico */}
      <div className="absolute left-1/2 top-[3%] h-[3%] w-[10%] -translate-x-1/2 rounded-sm bg-black/60" />
    </div>
  )
}

export default function Simulator({ addToCart }) {
  const [color, setColor] = useState(COLORS[0])
  const [grip, setGrip] = useState(GRIPS[0])
  const [mode, setMode] = useState('text')
  const [text, setText] = useState('42')
  const [font, setFont] = useState(FONTS[0])
  const [scale, setScale] = useState(1)
  const [logo, setLogo] = useState(null)
  const [logoName, setLogoName] = useState('')
  const [logoScale, setLogoScale] = useState(1)
  const [silhouette, setSilhouette] = useState(true)
  const [pairs, setPairs] = useState(1)
  const [toast, setToast] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  useEffect(() => () => logo && URL.revokeObjectURL(logo), [logo])

  const onFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (!/^image\/(svg\+xml|png|jpeg|webp)$/.test(f.type)) return setError('Formato no válido. Usa SVG o PNG.')
    if (f.size > 5 * 1024 * 1024) return setError('Archivo demasiado grande (máx. 5 MB).')
    setError('')
    setLogo(URL.createObjectURL(f))
    setLogoName(f.name)
    setMode('logo')
  }

  const clearLogo = () => {
    setLogo(null)
    setLogoName('')
    setMode('text')
    if (fileRef.current) fileRef.current.value = ''
  }

  const hasLogo = mode === 'logo' && logo
  const extra = hasLogo ? LOGO_FEE : 0
  const disc = discountFor(pairs)
  const unit = unitPrice(pairs, extra)
  const total = unit * pairs
  const description = useMemo(
    () => `${color.name} · ${hasLogo ? `Logo ${logoName}` : `Texto "${(text || '').toUpperCase()}" (${font.name})`}`,
    [color, hasLogo, logoName, text, font]
  )

  const save = () => {
    addToCart({ id: Date.now(), summary: description, pairs, total, gradient: color.gradient })
    setToast(true)
    setTimeout(() => setToast(false), 2500)
  }

  const reset = () => {
    setColor(COLORS[0])
    setText('42')
    setScale(1)
    setLogoScale(1)
    setFont(FONTS[0])
    setMode('text')
    setPairs(1)
  }

  return (
    <section id="simulador" className="relative mx-auto max-w-7xl scroll-mt-16 px-4 py-20 sm:px-6">
      <p className="section-tag">// 01 · Simulador en Vivo</p>
      <h2 className="section-title mt-2">
        Configura tu <span className="bg-gradient-to-r from-racing to-anod bg-clip-text text-transparent">GripCap</span>
      </h2>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Personaliza los tapones con la paleta oficial (Titanio Gunmetal, Naranja Racing o Azul Eléctrico) y visualiza el grabado láser en tiempo real.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Preview Container */}
        <div
          className="tech-card flex flex-col justify-center p-6 sm:p-10 border-ink-border"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 40%, ${color.hex}25, transparent 65%)`,
          }}
        >
          <div className="mb-4 flex items-center justify-between font-display text-[11px] uppercase tracking-widest text-zinc-500">
            <span>Vista frontal · Manillar Ø 22 mm</span>
            <span className="flex items-center gap-1.5 font-bold text-anod">
              <span className="h-2 w-2 rounded-full bg-anod animate-pulse" /> LIVE LASER
            </span>
          </div>

          <CapPreview {...{ color, grip, text, font, scale, logo, logoScale, silhouette, mode }} />

          <div className="mt-6 flex justify-center gap-2">
            {GRIPS.map((g) => (
              <button
                key={g.id}
                onClick={() => setGrip(g)}
                className={`border px-3 py-1.5 font-display text-[11px] uppercase tracking-wider transition ${
                  grip.id === g.id
                    ? 'border-racing bg-racing/10 text-racing'
                    : 'border-ink-border text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        {/* Controles de personalización */}
        <div className="tech-card space-y-7 p-6 sm:p-8">
          {/* Selector de color */}
          <div>
            <label className="mb-3 block font-display text-xs font-bold uppercase tracking-widest text-zinc-400">
              1 · Color de aluminio — <span className="text-white font-bold">{color.name}</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  aria-label={c.name}
                  title={c.name}
                  onClick={() => setColor(c)}
                  className={`h-12 w-12 rounded-full border-2 transition hover:scale-110 shadow-lg ${
                    color.id === c.id
                      ? 'border-racing ring-4 ring-racing/30 scale-105'
                      : 'border-ink-border hover:border-zinc-500'
                  }`}
                  style={{ background: c.gradient }}
                />
              ))}
            </div>
          </div>

          {/* Tipo de grabado */}
          <div>
            <label className="mb-3 block font-display text-xs font-bold uppercase tracking-widest text-zinc-400">
              2 · Tipo de grabado láser
            </label>
            <div className="grid grid-cols-2 gap-px bg-ink-border p-px bevel-sm overflow-hidden">
              {[
                ['text', 'Texto / Dorsal', Type],
                ['logo', 'Logotipo Escudo', Upload],
              ].map(([id, label, Icon]) => (
                <button
                  key={id}
                  onClick={() => (id === 'logo' && !logo ? fileRef.current?.click() : setMode(id))}
                  className={`flex items-center justify-center gap-2 py-3 font-display text-xs font-bold uppercase tracking-wider transition ${
                    mode === id ? 'bg-racing text-black' : 'bg-ink-darker text-zinc-400 hover:text-white'
                  }`}
                >
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {mode === 'text' ? (
              <motion.div key="t" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <input
                  id="sim-text"
                  className="input font-display text-lg uppercase tracking-wider font-bold"
                  maxLength={8}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="DORSAL / NOMBRE"
                />
                <div className="grid grid-cols-2 gap-2">
                  {FONTS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFont(f)}
                      style={{ fontFamily: f.family, fontWeight: f.weight }}
                      className={`border py-2 text-lg uppercase transition ${
                        font.id === f.id
                          ? 'border-anod bg-anod/15 text-anod shadow-[0_0_15px_rgba(20,133,238,0.3)]'
                          : 'border-ink-border text-zinc-400 hover:border-zinc-600'
                      }`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
                <Range icon={ZoomIn} label="Tamaño del texto" value={scale} min={0.4} max={1.6} onChange={setScale} />
              </motion.div>
            ) : (
              <motion.div key="l" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <button
                  id="sim-upload"
                  onClick={() => fileRef.current?.click()}
                  className="flex w-full items-center justify-center gap-2 border border-dashed border-anod/60 bg-anod/10 py-4 font-display text-xs font-bold uppercase tracking-wider text-anod transition hover:bg-anod/20"
                >
                  <Upload size={16} /> {logoName || 'Subir logotipo del club (SVG / PNG)'}
                </button>
                {logo && (
                  <>
                    <Range icon={ZoomIn} label="Escala del logotipo" value={logoScale} min={0.4} max={1.5} onChange={setLogoScale} />
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-300">
                      <input
                        type="checkbox"
                        checked={silhouette}
                        onChange={(e) => setSilhouette(e.target.checked)}
                        className="accent-racing h-4 w-4"
                      />
                      Simular grabado láser (silueta aluminio expuesto)
                    </label>
                    <button onClick={clearLogo} className="flex items-center gap-2 text-xs text-zinc-500 hover:text-racing">
                      <Trash2 size={14} /> Quitar logotipo
                    </button>
                  </>
                )}
                {error && <p className="text-xs text-red-400">{error}</p>}
              </motion.div>
            )}
          </AnimatePresence>
          <input ref={fileRef} type="file" accept=".svg,.png,image/svg+xml,image/png" className="hidden" onChange={onFile} />

          {/* Cantidad de pares */}
          <div>
            <label className="mb-3 block font-display text-xs font-bold uppercase tracking-widest text-zinc-400">
              3 · Cantidad de pares
            </label>
            <div className="flex items-center gap-3">
              <button
                aria-label="Menos"
                onClick={() => setPairs(Math.max(1, pairs - 1))}
                className="border border-ink-border bg-ink-darker p-2.5 text-zinc-300 hover:border-racing transition"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-display text-2xl font-bold text-white">{pairs}</span>
              <button
                aria-label="Más"
                onClick={() => setPairs(Math.min(50, pairs + 1))}
                className="border border-ink-border bg-ink-darker p-2.5 text-zinc-300 hover:border-racing transition"
              >
                <Plus size={16} />
              </button>
              <span className="text-xs text-zinc-400">
                {disc > 0 ? (
                  <span className="font-bold text-racing">-{Math.round(disc * 100)}% descuento aplicado</span>
                ) : (
                  'Tarifa unitaria base'
                )}
              </span>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="border border-ink-border bg-ink-darker/90 p-4 text-sm shadow-inner">
            <p className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-racing">
              Resumen de configuración
            </p>
            <dl className="space-y-1.5 text-zinc-400">
              <Row k="Acabado" v={description} />
              <Row k="Base (par)" v={eur(BASE_PRICE)} />
              {hasLogo && <Row k="Grabado de escudo" v={`+${eur(LOGO_FEE)}`} />}
              {disc > 0 && <Row k="Descuento volumen" v={`-${Math.round(disc * 100)}%`} accent />}
              <Row k="Precio / par" v={eur(unit)} />
            </dl>
            <div className="mt-3 flex items-end justify-between border-t border-ink-border pt-3">
              <span className="font-display text-xs uppercase text-zinc-500">
                Total ({pairs} par{pairs > 1 ? 'es' : ''})
              </span>
              <motion.span
                key={total.toFixed(2)}
                initial={{ scale: 1.15, color: '#FF6219' }}
                animate={{ scale: 1, color: '#fff' }}
                className="font-display text-3xl font-bold text-white"
              >
                {eur(total)}
              </motion.span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              id="sim-add"
              onClick={save}
              className="btn-primary flex-1"
              disabled={mode === 'text' && !text.trim()}
            >
              <ShoppingCart size={16} /> Guardar diseño / Añadir al carrito
            </button>
            <button aria-label="Reiniciar" onClick={reset} className="btn-ghost !px-4" title="Restablecer">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 border border-racing bg-ink-darker px-5 py-3 font-display text-sm font-bold uppercase text-white shadow-[0_0_35px_rgba(255,98,25,.5)]"
          >
            <Check size={16} className="text-racing" /> Diseño guardado en tu carrito
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function Range({ icon: Icon, label, value, min, max, onChange }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-zinc-400">
        <span className="flex items-center gap-1.5"><Icon size={14} /> {label}</span>
        <span className="font-mono text-zinc-300">{Math.round(value * 100)}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={0.05}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-racing"
      />
    </div>
  )
}

function Row({ k, v, accent }) {
  return (
    <div className="flex justify-between gap-4">
      <dt>{k}</dt>
      <dd className={`text-right ${accent ? 'text-racing font-semibold' : 'text-zinc-200'}`}>{v}</dd>
    </div>
  )
}
