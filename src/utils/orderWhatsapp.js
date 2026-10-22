import { BASE_PRICE, WHATSAPP_PHONE, eur } from '../data'

/**
 * Carga una imagen desde una URL o DataURL para dibujarla en canvas.
 */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/**
 * Renderiza el tapón GripCap personalizado en un canvas 600x600 y devuelve un PNG DataURL.
 * Reproduce fielmente el diseño real de GripCap:
 * - Cuerpo exterior de TPU negro impreso en 3D con las 3 muescas perimetrales a 120°
 * - Estrías concéntricas de impresión 3D
 * - Disco central de aluminio anodizado cepillado horizontalmente
 * - Aro fino plateado grabado a láser cerca del borde del aluminio
 * - Texto o logotipo personalizado en el centro
 */
export async function renderPlugToDataUrl({
  color,
  mode,
  text,
  font,
  scale = 1,
  logoDataUrl,
  logoScale = 1,
}) {
  const size = 600
  const cx = size / 2
  const cy = size / 2
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  // Fondo oscuro técnico con halo sutil
  const bgGrad = ctx.createRadialGradient(cx, cy, 40, cx, cy, 300)
  bgGrad.addColorStop(0, '#181B22')
  bgGrad.addColorStop(1, '#0B0C0F')
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, size, size)

  // Sombra exterior del tapón
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy + 8, 256, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.65)'
  ctx.filter = 'blur(16px)'
  ctx.fill()
  ctx.restore()

  // 1. Cuerpo exterior TPU impreso en 3D (radio 255) con 3 muescas a 300°, 60° y 180°
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, 255, 0, Math.PI * 2)
  ctx.clip()

  const tpuGrad = ctx.createLinearGradient(cx - 220, cy - 220, cx + 220, cy + 220)
  tpuGrad.addColorStop(0, '#2E323B')
  tpuGrad.addColorStop(0.45, '#17191E')
  tpuGrad.addColorStop(1, '#0C0D10')
  ctx.fillStyle = tpuGrad
  ctx.fillRect(0, 0, size, size)

  // Anillos escalonados de impresión 3D en el bisel del TPU
  for (let r = 252; r >= 216; r -= 5) {
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = r % 10 === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.55)'
    ctx.lineWidth = 1.5
    ctx.stroke()
  }

  // 3 muescas perimetrales características del tapón GripCap (a -140°, -20°, 100° / cada 120°)
  const notchAngles = [-145, -25, 95].map((deg) => (deg * Math.PI) / 180)
  notchAngles.forEach((angle) => {
    const nx = cx + Math.cos(angle) * 258
    const ny = cy + Math.sin(angle) * 258
    ctx.beginPath()
    ctx.arc(nx, ny, 28, 0, Math.PI * 2)
    ctx.fillStyle = '#0D0F13'
    ctx.fill()
    ctx.lineWidth = 3
    ctx.strokeStyle = '#252932'
    ctx.stroke()
  })
  ctx.restore()

  // Borde exterior fino del TPU
  ctx.beginPath()
  ctx.arc(cx, cy, 255, 0, Math.PI * 2)
  ctx.strokeStyle = '#2A2E37'
  ctx.lineWidth = 2
  ctx.stroke()

  // 2. Ranura / asiento profundo entre el TPU y el disco de aluminio
  ctx.beginPath()
  ctx.arc(cx, cy, 214, 0, Math.PI * 2)
  ctx.fillStyle = '#07080A'
  ctx.fill()
  ctx.lineWidth = 3
  ctx.strokeStyle = '#232730'
  ctx.stroke()

  // 3. Disco central de aluminio anodizado (radio 204)
  const aluRadius = 204
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, aluRadius, 0, Math.PI * 2)
  ctx.clip()

  const aluGrad = ctx.createLinearGradient(cx - aluRadius, cy - aluRadius, cx + aluRadius, cy + aluRadius)
  aluGrad.addColorStop(0, color.baseLight || '#3A3F4B')
  aluGrad.addColorStop(0.38, color.baseMid || '#22252C')
  aluGrad.addColorStop(0.62, color.baseDark || '#17191E')
  aluGrad.addColorStop(1, color.baseMid || '#282C35')
  ctx.fillStyle = aluGrad
  ctx.fillRect(cx - aluRadius, cy - aluRadius, aluRadius * 2, aluRadius * 2)

  // Textura de cepillado horizontal del aluminio anodizado
  ctx.lineWidth = 1
  for (let y = cy - aluRadius; y <= cy + aluRadius; y += 2) {
    const alpha = (y * 7) % 5 === 0 ? 0.07 : 0.03
    ctx.strokeStyle = y % 4 === 0 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha * 1.4})`
    ctx.beginPath()
    ctx.moveTo(cx - aluRadius, y)
    ctx.lineTo(cx + aluRadius, y)
    ctx.stroke()
  }

  // Contenido central (Logotipo o Texto)
  if (mode === 'logo' && logoDataUrl) {
    try {
      const img = await loadImage(logoDataUrl)
      const maxDim = aluRadius * 1.45 * logoScale
      const ratio = Math.min(maxDim / img.width, maxDim / img.height)
      const w = img.width * ratio
      const h = img.height * ratio
      ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h)
    } catch {
      // Fallback si falla carga de imagen
    }
  } else {
    const display = (text || 'GRIPCAP').toUpperCase()
    const fontSize = Math.round(88 * scale)
    ctx.font = `${font?.weight || 700} ${fontSize}px ${font?.family || 'sans-serif'}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#E6EBF2'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.55)'
    ctx.shadowBlur = 4
    ctx.shadowOffsetY = 2
    ctx.fillText(display, cx, cy + 3)
    ctx.shadowColor = 'transparent'
  }

  // Aro fino plateado grabado a láser cerca del borde exterior del disco de aluminio (sello GripCap)
  ctx.beginPath()
  ctx.arc(cx, cy, aluRadius - 12, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.85)'
  ctx.lineWidth = 3.5
  ctx.stroke()

  // Brillo diagonal sutil de estudio
  const sheen = ctx.createLinearGradient(cx - aluRadius, cy - aluRadius, cx + aluRadius, cy + aluRadius)
  sheen.addColorStop(0, 'rgba(255,255,255,0.16)')
  sheen.addColorStop(0.4, 'rgba(255,255,255,0.02)')
  sheen.addColorStop(0.65, 'rgba(0,0,0,0.0)')
  sheen.addColorStop(1, 'rgba(0,0,0,0.28)')
  ctx.fillStyle = sheen
  ctx.fillRect(cx - aluRadius, cy - aluRadius, aluRadius * 2, aluRadius * 2)

  ctx.restore()

  // Bisel interior del disco de aluminio
  ctx.beginPath()
  ctx.arc(cx, cy, aluRadius, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(255,255,255,0.15)'
  ctx.lineWidth = 1.5
  ctx.stroke()

  return canvas.toDataURL('image/png')
}

/**
 * Genera una lámina PNG resumen con todos los diseños del pedido (imagen + texto + cantidad + total)
 * para enviar por WhatsApp.
 */
export async function generateOrderSheetDataUrl(items) {
  if (!items || items.length === 0) return null
  if (items.length === 1 && items[0].previewDataUrl) {
    // Creamos una tarjeta limpia con el tapón y los datos del diseño
  }

  const cardH = 220
  const headerH = 90
  const footerH = 80
  const width = 800
  const height = headerH + items.length * cardH + footerH

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  // Fondo
  ctx.fillStyle = '#0D0E12'
  ctx.fillRect(0, 0, width, height)

  // Cabecera
  ctx.fillStyle = '#FF6219'
  ctx.font = 'bold 26px sans-serif'
  ctx.fillText('PEDIDO GRIPCAP · TAPONES PERSONALIZADOS', 32, 48)
  ctx.fillStyle = '#9CA3AF'
  ctx.font = '15px sans-serif'
  ctx.fillText(`Precio: ${eur(BASE_PRICE)} / par · WhatsApp: 653 418 174`, 32, 74)

  for (let idx = 0; idx < items.length; idx++) {
    const item = items[idx]
    const y = headerH + idx * cardH

    // Caja de ítem
    ctx.fillStyle = '#151820'
    ctx.fillRect(28, y + 10, width - 56, cardH - 20)
    ctx.strokeStyle = '#262B36'
    ctx.lineWidth = 1.5
    ctx.strokeRect(28, y + 10, width - 56, cardH - 20)

    // Imagen del tapón
    if (item.previewDataUrl) {
      try {
        const img = await loadImage(item.previewDataUrl)
        ctx.drawImage(img, 44, y + 22, 176, 176)
      } catch {
        // continuar
      }
    }

    // Datos del diseño
    ctx.fillStyle = '#FF6219'
    ctx.font = 'bold 15px sans-serif'
    ctx.fillText(`DISEÑO #${idx + 1}`, 244, y + 50)

    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 20px sans-serif'
    ctx.fillText(item.summary || 'Tapón GripCap Personalizado', 244, y + 82)

    ctx.fillStyle = '#CBD5E1'
    ctx.font = '16px sans-serif'
    ctx.fillText(`Color: ${item.colorName || 'Negro / Titanio Gunmetal'}`, 244, y + 114)
    ctx.fillText(
      item.mode === 'logo'
        ? `Grabado: Logotipo (${item.logoName || 'Imagen adjunta'})`
        : `Grabado: Texto "${item.text || ''}" · Fuente ${item.fontName || 'Chakra'}`,
      244,
      y + 140
    )

    ctx.fillStyle = '#FF6219'
    ctx.font = 'bold 18px sans-serif'
    ctx.fillText(
      `Cantidad: ${item.pairs} par(es)  —  Subtotal: ${eur(item.total)}`,
      244,
      y + 174
    )
  }

  // Total pie
  const totalPairs = items.reduce((s, i) => s + i.pairs, 0)
  const totalEur = items.reduce((s, i) => s + i.total, 0)
  const fy = headerH + items.length * cardH + 45

  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 24px sans-serif'
  ctx.fillText(`TOTAL PEDIDO (${totalPairs} par${totalPairs > 1 ? 'es' : ''}): ${eur(totalEur)}`, 32, fy)

  return canvas.toDataURL('image/png')
}

/**
 * Construye el texto del mensaje de WhatsApp para los diseños guardados.
 */
export function buildWhatsAppText(items) {
  const totalPairs = items.reduce((s, i) => s + i.pairs, 0)
  const totalEur = items.reduce((s, i) => s + i.total, 0)

  const lines = [
    '¡Hola *GripCap*! 👋 Quiero realizar el siguiente pedido de tapones personalizados:',
    '',
    ...items.map((item, idx) => {
      const detail =
        item.mode === 'logo'
          ? `Logotipo (${item.logoName || 'imagen personalizada'})`
          : `Texto "${item.text}" (Fuente: ${item.fontName || 'Chakra'})`
      return `*${idx + 1}.* ${item.colorName || item.summary} · ${detail} — *${item.pairs} par(es)* (${eur(item.total)})`
    }),
    '',
    `💰 *Total (${totalPairs} par${totalPairs > 1 ? 'es' : ''} a ${eur(BASE_PRICE)}/par): ${eur(totalEur)}*`,
    '📎 *Adjunto en este chat la imagen de mi diseño.*',
  ]

  return lines.join('\n')
}

/**
 * Descarga la imagen del diseño, la copia al portapapeles (si el navegador lo permite)
 * y abre WhatsApp con el número 653418174 y los detalles del pedido.
 */
export async function sendOrderToWhatsApp(items) {
  if (!items || items.length === 0) return null

  const sheetDataUrl =
    items.length === 1 && items[0].previewDataUrl
      ? await generateOrderSheetDataUrl(items)
      : await generateOrderSheetDataUrl(items)

  let copiedToClipboard = false

  if (sheetDataUrl) {
    // 1. Descargar automáticamente el PNG del diseño para poder adjuntarlo
    const link = document.createElement('a')
    link.href = sheetDataUrl
    link.download = `diseno-gripcap-${Date.now().toString().slice(-4)}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // 2. Copiar imagen al portapapeles para poder pegarla con Ctrl+V directamente en WhatsApp
    try {
      const res = await fetch(sheetDataUrl)
      const blob = await res.blob()
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([new window.ClipboardItem({ 'image/png': blob })])
        copiedToClipboard = true
      }
    } catch {
      // Algunos navegadores móviles no permiten escritura directa de imagen en portapapeles
    }
  }

  const message = buildWhatsAppText(items)
  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`

  window.open(waUrl, '_blank', 'noopener,noreferrer')

  return {
    sheetDataUrl,
    copiedToClipboard,
    waUrl,
    message,
  }
}
