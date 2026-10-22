import { useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload,
  ShoppingCart,
  Check,
  Trash2,
  Minus,
  Plus,
  Type,
  ZoomIn,
  RotateCcw,
  MessageCircle,
  Download,
  X,
} from 'lucide-react'
import { COLORS, FONTS, BASE_PRICE, WHATSAPP_DISPLAY, eur } from '../data'
import { renderPlugToDataUrl, sendOrderToWhatsApp } from '../utils/orderWhatsapp'

/**
 * Vista frontal fiel al tapón real GripCap:
 * - Cuerpo exterior de TPU negro impreso en 3D con sus 3 muescas perimetrales a 120° y estrías concéntricas
 * - Ranura interior de asiento
 * - Chapa central de aluminio anodizado con cepillado lineal horizontal
 * - Aro fino plateado grabado a láser junto al borde exterior del aluminio
 * - Grabado central (texto o logotipo sin filtro blanco roto)
 */
function CapPreview({ color, text, font, scale, logo, logoScale, mode }) {
  // 3 muescas perimetrales del cuerpo TPU a 120° como en el tapón real GripCap
  const notches = [-145, -25, 95]

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[440px] select-none"
      style={{ containerType: 'inline-size' }}
    >
      {/* Sombra ambiental y resplandor técnico */}
      <div
        className="absolute inset-[4%] rounded-full transition-all duration-500"
        style={{
          boxShadow: `0 30px 70px rgba(0,0,0,.9), 0 0 45px ${color.hex}25`,
        }}
      />

      {/* 1. Cuerpo exterior TPU impreso en 3D con sus 3 muescas perimetrales */}
      <div
        className="absolute inset-[4%] overflow-hidden rounded-full border-2 border-[#2A2E37]"
        style={{
          background: 'linear-gradient(145deg, #2E323C 0%, #17191E 48%, #0B0C0F 100%)',
          boxShadow:
            'inset 0 3px 10px rgba(255,255,255,.14), inset 0 -10px 24px rgba(0,0,0,.95)',
        }}
      >
        {/* Líneas concéntricas escalonadas del bisel impreso en 3D */}
        <div
          className="absolute inset-0 rounded-full opacity-55"
          style={{
            backgroundImage:
              'repeating-radial-gradient(circle at center, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1.5px, rgba(0,0,0,0.6) 1.5px, rgba(0,0,0,0.6) 4.5px)',
          }}
        />

        {/* Las 3 muescas semicirculares del borde TPU (idénticas al tapón real GripCap) */}
        {notches.map((deg) => (
          <div
            key={deg}
            className="pointer-events-none absolute inset-0"
            style={{ transform: `rotate(${deg}deg)` }}
          >
            <div
              className="absolute left-1/2 -top-[4.2%] h-[9.5%] w-[11%] -translate-x-1/2 rounded-full border-2 border-[#262A33] bg-[#0B0C0F]"
              style={{
                boxShadow: 'inset 0 -3px 6px rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.9)',
              }}
            />
          </div>
        ))}
      </div>

      {/* 2. Ranura / canal de encaje entre el labio de TPU y la chapa de aluminio */}
      <div
        className="absolute inset-[13.5%] rounded-full border border-[#252932] bg-[#07080A]"
        style={{
          boxShadow: 'inset 0 4px 12px rgba(0,0,0,.95), 0 1px 2px rgba(255,255,255,.08)',
        }}
      />

      {/* 3. Chapa frontal de aluminio anodizado con cepillado horizontal y aro plateado */}
      <motion.div
        key={color.id}
        initial={{ opacity: 0.75, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-[15.5%] overflow-hidden rounded-full"
        style={{
          background: color.gradient,
          boxShadow:
            'inset 0 0 0 1.5px rgba(255,255,255,.18), inset 0 0 26px rgba(0,0,0,.65), 0 6px 20px rgba(0,0,0,.75)',
        }}
      >
        {/* Textura de aluminio cepillado horizontal (idéntica al tapón real) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-45 mix-blend-overlay"
          style={{
            backgroundImage:
              'repeating-linear-gradient(180deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 1px, rgba(0,0,0,0.28) 1px, rgba(0,0,0,0.28) 2.5px)',
          }}
        />

        {/* Reflejo metálico diagonal de estudio */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,.24) 0%, rgba(255,255,255,.03) 38%, transparent 60%, rgba(0,0,0,.38) 100%)',
          }}
        />

        {/* Grabado central (Texto o Logotipo subido tal cual, sin ponerlo blanco) */}
        <div className="absolute inset-[6%] flex items-center justify-center overflow-hidden rounded-full">
          {mode === 'logo' && logo ? (
            <img
              src={logo}
              alt="Logotipo personalizado en tapón GripCap"
              draggable={false}
              style={{
                width: `${logoScale * 74}%`,
                height: `${logoScale * 74}%`,
                objectFit: 'contain',
              }}
            />
          ) : (
            <span
              style={{
                fontFamily: font.family,
                fontWeight: font.weight,
                fontSize: `${scale * 17}cqw`,
                lineHeight: 1,
                color: '#E8ECF2',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                textShadow:
                  '0 1px 0 rgba(255,255,255,.45), 0 2px 6px rgba(0,0,0,.65)',
              }}
            >
              {text || '—'}
            </span>
          )}
        </div>

        {/* Aro fino plateado grabado a láser junto al borde del aluminio (sello del tapón GripCap) */}
        <div
          className="pointer-events-none absolute inset-[4.2%] rounded-full"
          style={{
            border: '2.5px solid rgba(228, 234, 242, 0.85)',
            boxShadow: '0 0 4px rgba(0,0,0,0.5), inset 0 0 4px rgba(0,0,0,0.45)',
          }}
        />
      </motion.div>
    </div>
  )
}

export default function Simulator({ cart, addToCart }) {
  const [color, setColor] = useState(COLORS[0])
  const [mode, setMode] = useState('text')
  const [text, setText] = useState('GRIPCAP')
  const [font, setFont] = useState(FONTS[0])
  const [scale, setScale] = useState(0.75)
  const [logo, setLogo] = useState(null)
  const [logoName, setLogoName] = useState('')
  const [logoScale, setLogoScale] = useState(1)
  const [pairs, setPairs] = useState(1)
  const [toast, setToast] = useState(false)
  const [orderModal, setOrderModal] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  const onFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (!/^image\/(svg\+xml|png|jpeg|jpg|webp)$/.test(f.type)) {
      return setError('Formato no válido. Usa PNG, JPG, WEBP o SVG.')
    }
    if (f.size > 8 * 1024 * 1024) {
      return setError('Archivo demasiado grande (máx. 8 MB).')
    }
    setError('')
    const reader = new FileReader()
    reader.onload = () => {
      setLogo(reader.result)
      setLogoName(f.name)
      setMode('logo')
    }
    reader.readAsDataURL(f)
  }

  const clearLogo = () => {
    setLogo(null)
    setLogoName('')
    setMode('text')
    if (fileRef.current) fileRef.current.value = ''
  }

  const hasLogo = mode === 'logo' && logo
  const unit = BASE_PRICE
  const total = unit * pairs
  const description = useMemo(
    () =>
      `${color.name} · ${
        hasLogo ? `Logo ${logoName}` : `Texto "${(text || '').toUpperCase()}" (${font.name})`
      }`,
    [color, hasLogo, logoName, text, font]
  )

  const buildCurrentItem = async () => {
    const previewDataUrl = await renderPlugToDataUrl({
      color,
      mode: hasLogo ? 'logo' : 'text',
      text,
      font,
      scale,
      logoDataUrl: hasLogo ? logo : null,
      logoScale,
    })

    return {
      id: Date.now(),
      colorId: color.id,
      colorName: color.name,
      mode: hasLogo ? 'logo' : 'text',
      text: (text || '').toUpperCase(),
      fontName: font.name,
      scale,
      logoName: hasLogo ? logoName : '',
      logoDataUrl: hasLogo ? logo : null,
      previewDataUrl,
      summary: description,
      pairs,
      unitPrice: unit,
      total,
      gradient: color.gradient,
    }
  }

  const save = async () => {
    if (saving) return
    setSaving(true)
    try {
      const item = await buildCurrentItem()
      addToCart(item)
      setToast(true)
      setTimeout(() => setToast(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  const handleOrderNow = async () => {
    if (saving) return
    setSaving(true)
    try {
      let itemsToOrder = cart
      if (!itemsToOrder || itemsToOrder.length === 0) {
        const currentItem = await buildCurrentItem()
        addToCart(currentItem)
        itemsToOrder = [currentItem]
      }
      const res = await sendOrderToWhatsApp(itemsToOrder)
      if (res) {
        setOrderModal(res)
      }
    } finally {
      setSaving(false)
    }
  }

  const reset = () => {
    setColor(COLORS[0])
    setText('GRIPCAP')
    setScale(0.75)
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
        Personaliza nuestro tapón de TPU + aluminio anodizado con tu texto, dorsal o logotipo por solo{' '}
        <span className="font-bold text-racing">{eur(BASE_PRICE)} el par</span>. Guarda tus diseños en el carrito y haz tu pedido directo por WhatsApp.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Preview Container */}
        <div
          className="tech-card flex flex-col justify-between p-6 sm:p-10 border-ink-border"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 45%, ${color.hex}28, transparent 68%)`,
          }}
        >
          <div className="mb-4 flex items-center justify-between font-display text-[11px] uppercase tracking-widest text-zinc-400">
            <span>Vista frontal real · Tapón GripCap Ø 19–22 mm</span>
            <span className="flex items-center gap-1.5 font-bold text-anod">
              <span className="h-2 w-2 rounded-full bg-anod animate-pulse" /> LIVE LASER
            </span>
          </div>

          <div className="my-auto py-4">
            <CapPreview {...{ color, text, font, scale, logo, logoScale, mode }} />
          </div>

          <p className="mt-4 text-center font-display text-xs uppercase tracking-wider text-zinc-400">
            Cuerpo TPU 3D con 3 muescas · Chapa de aluminio anodizado cepillado ·{' '}
            <span className="font-bold text-racing">{eur(BASE_PRICE)} / par</span>
          </p>
        </div>

        {/* Controles de personalización */}
        <div className="tech-card space-y-6 p-6 sm:p-8">
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
                ['logo', 'Logotipo / Imagen', Upload],
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
              <motion.div
                key="t"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <input
                  id="sim-text"
                  className="input font-display text-lg uppercase tracking-wider font-bold"
                  maxLength={10}
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
                <Range
                  icon={ZoomIn}
                  label="Tamaño del texto"
                  value={scale}
                  min={0.4}
                  max={1.6}
                  onChange={setScale}
                />
              </motion.div>
            ) : (
              <motion.div
                key="l"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <button
                  id="sim-upload"
                  onClick={() => fileRef.current?.click()}
                  className="flex w-full items-center justify-center gap-2 border border-dashed border-anod/60 bg-anod/10 py-4 font-display text-xs font-bold uppercase tracking-wider text-anod transition hover:bg-anod/20"
                >
                  <Upload size={16} /> {logoName || 'Subir logotipo o imagen (PNG / JPG / SVG)'}
                </button>
                {logo && (
                  <>
                    <Range
                      icon={ZoomIn}
                      label="Escala de la imagen"
                      value={logoScale}
                      min={0.3}
                      max={1.6}
                      onChange={setLogoScale}
                    />
                    <button
                      onClick={clearLogo}
                      className="flex items-center gap-2 text-xs text-zinc-400 hover:text-racing transition"
                    >
                      <Trash2 size={14} /> Quitar imagen
                    </button>
                  </>
                )}
                {error && <p className="text-xs text-red-400">{error}</p>}
              </motion.div>
            )}
          </AnimatePresence>
          <input
            ref={fileRef}
            type="file"
            accept=".svg,.png,.jpg,.jpeg,.webp,image/svg+xml,image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={onFile}
          />

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
                Precio único: <strong className="text-racing">{eur(BASE_PRICE)} / par</strong>
              </span>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="border border-ink-border bg-ink-darker/90 p-4 text-sm shadow-inner">
            <p className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-racing">
              Resumen de configuración
            </p>
            <dl className="space-y-1.5 text-zinc-400">
              <Row k="Diseño" v={description} />
              <Row k="Precio por par" v={eur(BASE_PRICE)} accent />
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

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              id="sim-add"
              onClick={save}
              className="btn-primary flex-1"
              disabled={(mode === 'text' && !text.trim()) || saving}
            >
              <ShoppingCart size={16} /> Guardar diseño / Añadir al carrito
            </button>
            <button
              id="sim-order-wa"
              onClick={handleOrderNow}
              disabled={(mode === 'text' && !text.trim() && (!cart || cart.length === 0)) || saving}
              className="bevel-sm inline-flex items-center justify-center gap-2 bg-[#25D366] px-5 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#1ebe5d]"
            >
              <MessageCircle size={16} /> Pedir Ahora
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
            className="fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 border border-racing bg-ink-darker px-5 py-3 font-display text-sm font-bold uppercase text-white shadow-[0_0_35px_rgba(255,98,25,.5)]"
          >
            <Check size={16} className="text-racing" /> Diseño e imagen guardados en tu carrito
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de confirmación de envío de imagen y diseño a WhatsApp */}
      <AnimatePresence>
        {orderModal && (
          <>
            <motion.div
              className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOrderModal(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="fixed left-1/2 top-1/2 z-[90] w-[92%] max-w-lg -translate-x-1/2 -translate-y-1/2 border border-ink-border bg-ink-surface p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-ink-border pb-3">
                <h3 className="font-display text-lg font-bold uppercase text-white">
                  Pedido enviado a <span className="text-[#25D366]">WhatsApp ({WHATSAPP_DISPLAY})</span>
                </h3>
                <button
                  onClick={() => setOrderModal(null)}
                  className="text-zinc-400 hover:text-white"
                  aria-label="Cerrar"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm text-zinc-300">
                <p>
                  Se ha abierto el chat de WhatsApp con el número{' '}
                  <strong className="text-white">{WHATSAPP_DISPLAY}</strong> con los detalles de tu diseño y hemos generado la imagen de tu pedido:
                </p>
                {orderModal.sheetDataUrl && (
                  <div className="overflow-hidden border border-ink-border bg-ink-darker p-2">
                    <img
                      src={orderModal.sheetDataUrl}
                      alt="Resumen gráfico del diseño GripCap"
                      className="max-h-56 w-full object-contain"
                    />
                  </div>
                )}
                <p className="rounded border border-[#25D366]/40 bg-[#25D366]/10 p-3 text-xs text-zinc-200">
                  {orderModal.copiedToClipboard
                    ? '✅ La imagen de tu diseño se ha copiado al portapapeles y descargado: solo pulsa Pegar (Ctrl+V) o adjúntala en el chat de WhatsApp.'
                    : '✅ La imagen de tu diseño se ha descargado en tu dispositivo: adjúntala directamente en la conversación de WhatsApp.'}
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                {orderModal.sheetDataUrl && (
                  <a
                    href={orderModal.sheetDataUrl}
                    download="diseno-gripcap.png"
                    className="btn-ghost flex-1 text-center"
                  >
                    <Download size={15} /> Descargar imagen
                  </a>
                )}
                <a
                  href={orderModal.waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bevel-sm inline-flex flex-1 items-center justify-center gap-2 bg-[#25D366] px-4 py-3 font-display text-xs font-bold uppercase tracking-wider text-black hover:bg-[#1ebe5d]"
                >
                  <MessageCircle size={16} /> Abrir WhatsApp ({WHATSAPP_DISPLAY})
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

function Range({ icon: Icon, label, value, min, max, onChange }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-zinc-400">
        <span className="flex items-center gap-1.5">
          <Icon size={14} /> {label}
        </span>
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
