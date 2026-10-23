#!/usr/bin/env node
/**
 * Genera los snapshots de prerender/ a partir del build de dist/.
 *
 * Para qué sirve: sin esto, el HTML que recibe Google tiene el <div id="root">
 * vacío y todo el contenido va dentro del JavaScript. Google acaba
 * renderizándolo, pero tarde e irregular. Con el HTML ya montado, el contenido
 * está en la primera pasada, sin ejecutar JS.
 *
 * Cuándo hay que ejecutarlo: solo cuando cambie el contenido visible de la web.
 * Si no, el HTML servido se queda con el texto antiguo (el plugin de Vite avisa
 * cuando detecta que quedó desfasado).
 *
 * Uso:
 *   npm run build      → genera dist/
 *   npm run prerender  → regenera prerender/*.html desde dist/
 *   npm run build      → vuelve a compilar inyectando los snapshots nuevos
 *
 * Requiere Playwright (no está en las dependencias para no engordar el CI):
 *   npm i -D playwright && npx playwright install chromium
 *
 * Nota: se lanza un Chromium real, pero las animaciones no llegan a
 * ejecutarse, así que los elementos animados se quedan en su estado inicial
 * (opacity: 0). Eso los dejaría invisibles para Google, por eso el script
 * elimina esas opacidades antes de guardar el HTML.
 */
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const DIST = join(root, 'dist')
const OUT = join(root, 'prerender')
const PORT = 8791

const ROUTES = {
  '/': 'home',
  '/aviso-legal/': 'aviso-legal',
  '/privacidad/': 'privacidad',
  '/cookies/': 'cookies',
  '/envios-y-devoluciones/': 'envios-y-devoluciones',
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.mp4': 'video/mp4',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
}

// --- servidor estático mínimo, imitando GitHub Pages ---
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(req.url.split('?')[0])
  if (path.endsWith('/')) path += 'index.html'
  let file = join(DIST, path)
  if (!existsSync(file)) file = join(DIST, 'index.html') // fallback de la SPA
  try {
    const body = await readFile(file)
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404).end('not found')
  }
})

let chromium
try {
  ;({ chromium } = await import('playwright'))
} catch {
  console.error(
    '\n  Falta Playwright. Instálalo una vez con:\n' +
      '    npm i -D playwright && npx playwright install chromium\n'
  )
  process.exit(1)
}

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('\n  No hay dist/. Ejecuta antes:  npm run build\n')
  process.exit(1)
}

await mkdir(OUT, { recursive: true })
await new Promise((r) => server.listen(PORT, '127.0.0.1', r))
console.log(`  servidor local en http://127.0.0.1:${PORT}`)

const browser = await chromium.launch()
const page = await browser.newPage()

for (const [ruta, slug] of Object.entries(ROUTES)) {
  await page.goto(`http://127.0.0.1:${PORT}${ruta}`, { waitUntil: 'networkidle' })
  // El aviso de cookies solo aparece en la primera visita: se limpia para que
  // quede en el snapshot, que es lo que ve alguien que llega por primera vez.
  if (slug === 'home') {
    await page.evaluate(() => localStorage.removeItem('gripcap_cookie_consent_v1'))
    await page.goto(`http://127.0.0.1:${PORT}${ruta}`, { waitUntil: 'networkidle' })
  }
  await page.waitForTimeout(1500)

  const html = await page.evaluate(() => {
    const root = document.getElementById('root')
    if (!root) return ''
    // Elimina las opacidades y desplazamientos iniciales de framer-motion: si se
    // quedan, Google vería medio contenido oculto.
    root.querySelectorAll('*').forEach((el) => {
      const st = el.getAttribute('style')
      if (!st) return
      const limpio = st
        .split(';')
        .map((s) => s.trim())
        .filter((d) => d && !/^opacity\s*:/i.test(d) && !/^transform\s*:\s*(translate|scale)/i.test(d))
        .join('; ')
      if (limpio) el.setAttribute('style', limpio)
      else el.removeAttribute('style')
    })
    return root.innerHTML
  })

  await writeFile(join(OUT, `${slug}.html`), html, 'utf8')
  console.log(`  ✓ ${slug.padEnd(24)} ${html.length.toLocaleString('es-ES')} caracteres`)
}

await browser.close()
server.close()
console.log('\n  Listo. Vuelve a compilar con:  npm run build\n')
