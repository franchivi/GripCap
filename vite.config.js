import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('.', import.meta.url))

// Páginas legales: cada una es una entrada HTML propia, de modo que GitHub
// Pages las sirve con HTTP 200 en /aviso-legal/, /privacidad/, /cookies/ y
// /envios-y-devoluciones/ (con el truco del 404.html devolverían HTTP 404,
// que es incorrecto y Google no las indexaría). El router de la SPA lee la
// ruta del navegador y renderiza el documento correspondiente.
const LEGAL_ENTRIES = ['aviso-legal', 'privacidad', 'cookies', 'envios-y-devoluciones']

// Cualquier otra ruta desconocida cae en 404.html, que renderiza la SPA y
// muestra la página "no encontrada".
function spaFallback() {
  let outDir = 'dist'
  return {
    name: 'gripcap-spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const src = resolve(root, outDir, 'index.html')
      const dst = resolve(root, outDir, '404.html')
      if (existsSync(src)) copyFileSync(src, dst)
    },
  }
}

export default defineConfig({
  plugins: [react(), spaFallback()],
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
