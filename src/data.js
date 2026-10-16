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

// Colores basados en la identidad visual del logo 3D:
// 1. Titanio Carbón / Gunmetal anodizado
// 2. Naranja Racing corte bisel
// 3. Azul Eléctrico destello
// 4. Plata Cruda / Aluminio mecanizado CNC
export const COLORS = [
  {
    id: 'gunmetal',
    name: 'Titanio Gunmetal (Logo)',
    hex: '#3E424B',
    gradient: 'conic-gradient(from 25deg, #4A4F5C, #282B33, #636A7A, #1C1E23, #4A4F5C, #24272D, #555B69, #4A4F5C)',
    rimAccent: '#FF6219',
  },
  {
    id: 'orange',
    name: 'Naranja Racing (Logo)',
    hex: '#FF6219',
    gradient: 'conic-gradient(from 25deg, #FF7B33, #D44E0E, #FF9558, #B83D05, #FF7B33, #CF4708, #FFA069, #FF7B33)',
    rimAccent: '#1485EE',
  },
  {
    id: 'blue',
    name: 'Azul Eléctrico (Logo)',
    hex: '#1485EE',
    gradient: 'conic-gradient(from 25deg, #2A9AFF, #0E68C2, #5CB4FF, #0A529C, #2A9AFF, #0E62B5, #67BAFF, #2A9AFF)',
    rimAccent: '#FF6219',
  },
  {
    id: 'silver',
    name: 'Aluminio Mecanizado',
    hex: '#CBD1DB',
    gradient: 'conic-gradient(from 25deg, #E6EAF0, #9DA4B0, #F4F6F9, #838A96, #E6EAF0, #A6ADBA, #F0F3F7, #E6EAF0)',
    rimAccent: '#1485EE',
  },
]

export const FONTS = [
  { id: 'chakra', name: 'Chakra', family: '"Chakra Petch", sans-serif', weight: 700 },
  { id: 'orbitron', name: 'Orbitron', family: 'Orbitron, sans-serif', weight: 900 },
  { id: 'rajdhani', name: 'Rajdhani', family: 'Rajdhani, sans-serif', weight: 700 },
  { id: 'blackops', name: 'Black Ops', family: '"Black Ops One", sans-serif', weight: 400 },
]

export const GRIPS = [
  { id: 'foam', name: 'Puño espuma', ring: '#21232A' },
  { id: 'silicone', name: 'Puño silicona', ring: '#2D313B' },
]
