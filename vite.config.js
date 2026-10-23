import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync, readFileSync, writeFileSync, statSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, join } from 'node:path'

const root = fileURLToPath(new URL('.', import.meta.url))

// Fecha de modificación más reciente dentro de una carpeta (recursivo).
function masReciente(dir) {
  if (!existsSync(dir)) return 0
  let max = 0
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    const t = e.isDirectory() ? masReciente(p) : statSync(p).mtimeMs
    if (t > max) max = t
  }
  return max
}

// Páginas legales: cada una es una entrada HTML propia, de modo que GitHub
// Pages las sirve con HTTP 200 en /aviso-legal/, /privacidad/, /cookies/ y
// /envios-y-devoluciones/ (con el truco del 404.html devolverían HTTP 404,
// que es incorrecto y Google no las indexaría). El router de la SPA lee la
// ruta del navegador y renderiza el documento correspondiente.
const LEGAL_ENTRIES = ['aviso-legal', 'privacidad', 'cookies', 'envios-y-devoluciones']

// Sin esto, el HTML que recibe Google tiene el <div id="root"> vacío y todo el
// contenido va dentro del JavaScript: Google acaba renderizándolo, pero tarde
// e irregular. Los ficheros de prerender/ llevan el HTML ya montado, así que
// el contenido está en la primera pasada, sin ejecutar JS.
//
// Regenerar los snapshots (solo cuando cambie el contenido de la web):
//   npm run prerender   → necesita un navegador; ver scripts/prerender.mjs
const PRERENDER = { home: 'index.html', ...Object.fromEntries(LEGAL_ENTRIES.map((s) => [s, `${s}/index.html`])) }

function spaHtml() {
  let outDir = 'dist'
  return {
    name: 'gripcap-spa-html',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    buildStart() {
      // Si el contenido de src/ es más nuevo que los snapshots, se estaría
      // sirviendo HTML pre-renderizado con texto antiguo. Avisar fuerte.
      const snapDir = resolve(root, 'prerender')
      const srcDir = resolve(root, 'src')
      if (!existsSync(snapDir)) return
      if (masReciente(srcDir) > masReciente(snapDir) + 1000) {
        this.warn(
          'El contenido de src/ es más reciente que prerender/*.html.\n' +
            '    El HTML pre-renderizado se está sirviendo con texto antiguo.\n' +
            '    Regenera los snapshots con:  npm run build && npm run prerender && npm run build'
        )
      }
    },
    closeBundle() {
      const dist = resolve(root, outDir)
      const indexPath = resolve(dist, 'index.html')
      if (!existsSync(indexPath)) return

      // 1. El 404 conserva el HTML limpio (sin contenido), para que una ruta
      //    inexistente no muestre la portada antes de que actúe React.
      copyFileSync(indexPath, resolve(dist, '404.html'))

      // 2. Inyecta el HTML pre-renderizado dentro de <div id="root">
      for (const [slug, dest] of Object.entries(PRERENDER)) {
        const snap = resolve(root, 'prerender', `${slug}.html`)
        const target = resolve(dist, dest)
        if (!existsSync(snap) || !existsSync(target)) continue
        const contenido = readFileSync(snap, 'utf8').trim()
        if (!contenido) continue
        const html = readFileSync(target, 'utf8').replace(
          /<div id="root">\s*<\/div>/,
          `<div id="root">${contenido}</div>`
        )
        writeFileSync(target, html, 'utf8')
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), spaHtml()],
  // Rutas relativas: funciona en GitHub Pages (usuario.github.io/<repo>/) sin depender del nombre del repo
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        ...Object.fromEntries(LEGAL_ENTRIES.map((s) => [s, resolve(root, s, 'index.html')])),
      },
    },
  },
  server: {
    // Evita que el watcher falle con archivos bloqueados por otras apps (EBUSY en Windows)
    watch: { ignored: ['**/images/**'] },
  },
})
