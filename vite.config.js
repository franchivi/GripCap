import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages no reescribe rutas: sirve 404.html ante cualquier ruta
// desconocida. Copiando el index a 404.html, el router de la SPA lee la ruta
// del navegador y renderiza las páginas legales (/aviso-legal, /privacidad...).
// Se hace aquí, en el build, para que funcione igual en local y en el workflow.
function spaFallback() {
  let outDir = 'dist'
  return {
    name: 'gripcap-spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const src = resolve(outDir, 'index.html')
      const dst = resolve(outDir, '404.html')
      if (existsSync(src)) copyFileSync(src, dst)
    },
  }
}

export default defineConfig({
  plugins: [react(), spaFallback()],
  // Rutas relativas: funciona en GitHub Pages (usuario.github.io/<repo>/) sin depender del nombre del repo
  base: './',
  server: {
    // Evita que el watcher falle con archivos bloqueados por otras apps (EBUSY en Windows)
    watch: { ignored: ['**/images/**'] },
  },
})
