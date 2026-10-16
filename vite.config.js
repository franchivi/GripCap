import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Rutas relativas: funciona en GitHub Pages (usuario.github.io/<repo>/) sin depender del nombre del repo
  base: './',
  server: {
    // Evita que el watcher falle con archivos bloqueados por otras apps (EBUSY en Windows)
    watch: { ignored: ['**/images/**'] },
  },
})
