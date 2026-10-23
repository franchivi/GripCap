// Resuelve rutas de /public respetando el `base` de Vite (necesario para GitHub Pages)
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const BASE_PRICE = 6 // € por par
export const LOGO_FEE = 0 // € incluido en el precio por par

export const WHATSAPP_PHONE = '34658288233'
export const WHATSAPP_DISPLAY = '658 28 82 33'

export const discountFor = () => 0

export const unitPrice = () => BASE_PRICE

export const eur = (n) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)

// Colores basados en el tapón real GripCap y la identidad visual:
// 1. Negro / Titanio Gunmetal anodizado (acabado original GripCap)
// 2. Naranja Racing corte bisel
// 3. Azul Eléctrico destello
// 4. Plata Cruda / Aluminio mecanizado CNC
export const COLORS = [
  {
    id: 'gunmetal',
    name: 'Negro / Titanio Gunmetal',
    hex: '#2A2D34',
    baseDark: '#16181D',
    baseMid: '#2E323B',
    baseLight: '#484E5B',
    gradient:
      'linear-gradient(165deg, #3A3F4B 0%, #22252C 35%, #17191E 55%, #2D313A 80%, #1B1D23 100%)',
    rimAccent: '#D8DEE9',
  },
  {
    id: 'orange',
    name: 'Naranja Racing',
    hex: '#FF6219',
    baseDark: '#8F2D00',
    baseMid: '#E04F0B',
    baseLight: '#FF8547',
    gradient:
      'linear-gradient(165deg, #FF8345 0%, #E04F0B 35%, #9E3302 55%, #F25C16 80%, #B33B04 100%)',
    rimAccent: '#F4F6F8',
  },
  {
    id: 'blue',
    name: 'Azul Eléctrico',
    hex: '#1485EE',
    baseDark: '#083D73',
    baseMid: '#106EC9',
    baseLight: '#4CA6FF',
    gradient:
      'linear-gradient(165deg, #47A3FF 0%, #1170CC 35%, #094682 55%, #1A82E8 80%, #0B5094 100%)',
    rimAccent: '#F4F6F8',
  },
  {
    id: 'silver',
    name: 'Aluminio Mecanizado',
    hex: '#CBD1DB',
    baseDark: '#7C8390',
    baseMid: '#B8C0CC',
    baseLight: '#EEF1F6',
    gradient:
      'linear-gradient(165deg, #F0F3F8 0%, #B8C0CC 35%, #8A92A0 55%, #D5DCE6 80%, #9BA3B0 100%)',
    rimAccent: '#1C1E24',
  },
]

export const FONTS = [
  { id: 'chakra', name: 'Chakra', family: '"Chakra Petch", sans-serif', weight: 700 },
  { id: 'orbitron', name: 'Orbitron', family: 'Orbitron, sans-serif', weight: 900 },
  { id: 'rajdhani', name: 'Rajdhani', family: 'Rajdhani, sans-serif', weight: 700 },
  { id: 'blackops', name: 'Black Ops', family: '"Black Ops One", sans-serif', weight: 400 },
]
