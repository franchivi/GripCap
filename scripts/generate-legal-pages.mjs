#!/usr/bin/env node
/**
 * Genera las páginas legales (aviso-legal/, privacidad/, cookies/ y
 * envios-y-devoluciones/) a partir de index.html.
 *
 * Por qué existen como ficheros aparte: GitHub Pages sirve un 404.html para
 * cualquier ruta desconocida, y eso devuelve HTTP 404 — incorrecto para una
 * página que sí existe. Al ser entradas HTML propias, se sirven con HTTP 200.
 *
 * Así la cabecera (fuentes, Open Graph, datos estructurados del negocio) vive
 * en un único sitio: index.html. Se ejecuta solo con `npm run build`.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const BASE_URL = 'https://www.gripcap.es/'

const PAGES = {
  'aviso-legal': {
    title: 'Aviso legal',
    desc: 'Datos identificativos del titular de GripCap (Rafael Plata Castilla, DNI 30802720Q), condiciones de uso, propiedad intelectual y legislación aplicable.',
  },
  privacidad: {
    title: 'Política de privacidad',
    desc: 'Responsable del tratamiento, datos recabados, finalidades, destinatarios y derechos del usuario conforme al RGPD y la LOPDGDD.',
  },
  cookies: {
    title: 'Política de cookies',
    desc: 'GripCap no utiliza cookies de análisis ni de publicidad. Detalle de las cookies técnicas propias y cómo gestionarlas desde el navegador.',
  },
  'envios-y-devoluciones': {
    title: 'Envíos y devoluciones',
    desc: 'Envíos a toda España desde Córdoba: plazos de entrega, gastos de envío, derecho de desistimiento de 14 días y devolución de productos.',
  },
}

const source = readFileSync(resolve(root, 'index.html'), 'utf8')

// Reemplazo tolerante a saltos de línea / indentación dentro de la etiqueta meta
const meta = (text, attr) => {
  const re = new RegExp(`<meta\\s+${attr}\\s+content="[^"]*"\\s*/?>`, 'g')
  if (!re.test(text)) throw new Error(`No se encontró la meta ${attr} en index.html`)
  return text.replace(re, `<meta ${attr} content="__DESC__" />`)
}

function buildPage(slug, cfg) {
  const url = `${BASE_URL}${slug}/`
  let h = source

  h = h.replace(/<title>.*?<\/title>/, `<title>${cfg.title} | GripCap</title>`)
  h = meta(h, 'name="description"').replace('__DESC__', cfg.desc)
  h = meta(h, 'property="og:description"').replace('__DESC__', cfg.desc)
  h = meta(h, 'name="twitter:description"').replace('__DESC__', cfg.desc)

  h = h.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`)
  h = h.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`)
  h = h.replace(/<meta property="og:type" content="[^"]*"\s*\/?>/, '<meta property="og:type" content="article" />')
  h = h.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${cfg.title} | GripCap" />`)
  h = h.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${cfg.title} | GripCap" />`)

  // En una página legal no tiene sentido el schema de Producto
  h = h.replace(/\s*<!-- Datos estructurados: producto -->[\s\S]*?<\/script>\s*/, '\n')

  // Se sustituye el WebSite por un WebPage propio de la página
  h = h.replace(/\s*<!-- Datos estructurados: sitio web -->[\s\S]*?<\/script>\s*/, `
    <!-- Datos estructurados: página -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "${cfg.title}",
        "description": "${cfg.desc}",
        "url": "${url}",
        "inLanguage": "es-ES",
        "isPartOf": { "@id": "${BASE_URL}#business" }
      }
    </script>
`)

  // Las páginas cuelgan un nivel: favicon y apple-touch-icon suben uno
  h = h.replace(/href="\.\/(favicon\.png|logo\.png)"/g, 'href="../$1"')

  return h
}

for (const [slug, cfg] of Object.entries(PAGES)) {
  const dir = resolve(root, slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'index.html'), buildPage(slug, cfg), 'utf8')
  console.log(`  ✓ ${slug}/index.html`)
}
