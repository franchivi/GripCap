import { MessageCircle, Mail, Instagram, Youtube, Facebook } from 'lucide-react'
import { asset } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <img src={asset('logo-3d.jpg')} alt="BikeCap" className="w-56 mix-blend-lighten" />
          <p className="mt-2 text-sm text-zinc-500">BikeCap - Handmade & Engineered for Bikes</p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Youtube, Facebook].map((Icon, i) => (
              <a key={i} href="#top" aria-label="Red social" className="border border-zinc-800 p-2 text-zinc-400 transition hover:border-racing hover:text-racing"><Icon size={18} /></a>
            ))}
          </div>
        </div>
        <div>
          <p className="section-tag mb-4">Legal</p>
          <ul className="space-y-2 text-sm text-zinc-400">
            {['Aviso legal', 'Política de privacidad', 'Cookies', 'Envíos y devoluciones'].map((l) => (
              <li key={l}><a href="#top" className="transition hover:text-white">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="section-tag mb-4">Contacto directo</p>
          <div className="space-y-3">
            <a id="footer-whatsapp" href="https://wa.me/34600123456?text=Hola%20BikeCap" target="_blank" rel="noreferrer" className="btn-primary w-full"><MessageCircle size={16} /> WhatsApp +34 600 123 456</a>
            <a href="mailto:hola@bikecap.es" className="btn-ghost w-full"><Mail size={16} /> hola@bikecap.es</a>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-900 py-5 text-center text-xs text-zinc-600">© {new Date().getFullYear()} BikeCap. Todos los derechos reservados.</div>
    </footer>
  )
}
