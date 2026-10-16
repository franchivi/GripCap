// Resuelve rutas de /public respetando el `base` de Vite (necesario para GitHub Pages)
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const BASE_PRICE = 24.9 // € por par
export const LOGO_FEE = 4 // € por par, grabado de logotipo personalizado

export const TIERS = [
  { id: 1, label: '1 par', pairs: 1, discount: 0 },
  { id: 2, label: '2 pares', pairs: 2, discount: 0.05 },
  { id: 3, label: '3 pares', pairs: 3, discount: 0.08 },
  { id: 4, label: '4 pares', pairs: 4, discount: 0.1 },
  { id: 5, label: '5 pares', pairs: 5, discount: 0.12 },
  { id: 10, label: '10 pares', pairs: 10, discount: 0.2 },
  { id: 25, label: '25 pares', pairs: 25, discount: 0.28 },
  { id: 50, label: '50+ pares', pairs: 50, discount: 0.35 },
]

export const discountFor = (pairs) =>
  [...TIERS].reverse().find((t) => pairs >= t.pairs)?.discount ?? 0

export const unitPrice = (pairs, extra = 0) =>
  (BASE_PRICE + extra) * (1 - discountFor(pairs))

export const eur = (n) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)

export const COLORS = [
  { id: 'black', name: 'Negro mate anodizado', hex: '#1b1d22',
    gradient: 'conic-gradient(from 20deg, #25282e, #101216, #2c3036, #0d0f12, #25282e, #14161a, #2b2f35, #25282e)' },
  { id: 'silver', name: 'Plata cepillada', hex: '#c8ccd2',
    gradient: 'conic-gradient(from 20deg, #e6e9ed, #9aa0a8, #f2f4f6, #888e97, #e6e9ed, #a7adb5, #f0f2f4, #e6e9ed)' },
  { id: 'blue', name: 'Azul eléctrico', hex: '#0088FF',
    gradient: 'conic-gradient(from 20deg, #2aa0ff, #0058b8, #4db4ff, #004a9c, #2aa0ff, #0068d0, #55b8ff, #2aa0ff)' },
  { id: 'red', name: 'Rojo competición', hex: '#e11d2e',
    gradient: 'conic-gradient(from 20deg, #ff3b4a, #a30e1b, #ff5a66, #8f0a16, #ff3b4a, #c4121f, #ff5560, #ff3b4a)' },
]

export const FONTS = [
  { id: 'chakra', name: 'Chakra', family: '"Chakra Petch", sans-serif', weight: 700 },
  { id: 'orbitron', name: 'Orbitron', family: 'Orbitron, sans-serif', weight: 900 },
  { id: 'rajdhani', name: 'Rajdhani', family: 'Rajdhani, sans-serif', weight: 700 },
  { id: 'blackops', name: 'Black Ops', family: '"Black Ops One", sans-serif', weight: 400 },
]

export const GRIPS = [
  { id: 'foam', name: 'Puño espuma', ring: '#2a2c31' },
  { id: 'silicone', name: 'Puño silicona', ring: '#3a3d44' },
]
