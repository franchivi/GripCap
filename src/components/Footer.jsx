import { MessageCircle, Mail, Instagram, Youtube, Facebook } from 'lucide-react'
import { asset, WHATSAPP_PHONE, WHATSAPP_DISPLAY } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-ink-border bg-ink-darker/95 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <img src={asset('logo-3d.png')} alt="GripCap" className="w-56 filter drop-shadow-md" />
          <p className="mt-2 text-sm text-zinc-500">GripCap - Handmade & Engineered for Bikes</p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Youtube, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#top"
                aria-label="Red social"
                className="border border-zinc-800 p-2 text-zinc-400 transition hover:border-racing hover:text-racing"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="section-tag mb-4">Legal</p>
          <ul className="space-y-2 text-sm text-zinc-400">
            {['Aviso legal', 'Política de privacidad', 'Cookies', 'Envíos y devoluciones'].map((l) => (
              <li key={l}>
                <a href="#top" className="transition hover:text-white">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="section-tag mb-4">Contacto directo</p>
          <div className="space-y-3">
            <a
              id="footer-whatsapp"
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola GripCap, quiero información sobre los tapones personalizados')}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full"
            >
              <MessageCircle size={16} /> WhatsApp +34 {WHATSAPP_DISPLAY}
            </a>
            <a href="mailto:hola@gripcap.es" className="btn-ghost w-full">
              <Mail size={16} /> hola@gripcap.es
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-900 py-5 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} GripCap. Todos los derechos reservados.
      </div>
    </footer>
  )
}
