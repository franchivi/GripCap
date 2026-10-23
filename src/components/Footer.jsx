import { MessageCircle, Mail, Instagram, Youtube, Facebook, MapPin } from 'lucide-react'
import { asset, WHATSAPP_PHONE, WHATSAPP_DISPLAY } from '../data'
import { COMPANY, ADDRESS_FULL } from '../legal'
import { LEGAL_ROUTES } from './LegalLayout'

// Perfiles sociales: rellenar en src/legal.js (SOCIAL) y aparecen solos.
const SOCIALS = [
  { Icon: Instagram, url: COMPANY.social?.instagram, label: 'Instagram' },
  { Icon: Youtube, url: COMPANY.social?.youtube, label: 'YouTube' },
  { Icon: Facebook, url: COMPANY.social?.facebook, label: 'Facebook' },
].filter((s) => s.url)

export default function Footer() {
  return (
    <footer className="border-t border-ink-border bg-ink-darker/95 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <img src={asset('logo-3d.png')} alt="GripCap" className="w-56 filter drop-shadow-md" />
          <p className="mt-2 text-sm text-zinc-500">GripCap - Handmade & Engineered for Bikes</p>
          <p className="mt-3 flex items-start gap-1.5 text-xs text-zinc-500">
            <MapPin size={13} className="mt-0.5 shrink-0 text-zinc-600" />
            <span>
              {COMPANY.holder} · D.N.I. {COMPANY.dni}
              <br />
              {ADDRESS_FULL}
            </span>
          </p>
          {SOCIALS.length > 0 && (
            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="border border-zinc-800 p-2 text-zinc-400 transition hover:border-racing hover:text-racing"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="section-tag mb-4">Legal</p>
          <ul className="space-y-2 text-sm text-zinc-400">
            {Object.entries(LEGAL_ROUTES).map(([path, { title }]) => (
              <li key={path}>
                <a href={path} className="transition hover:text-white">
                  {title}
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
            <a href={`mailto:${COMPANY.email}`} className="btn-ghost w-full">
              <Mail size={16} /> {COMPANY.email}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-900 py-5 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} {COMPANY.brand}. Todos los derechos reservados.
      </div>
    </footer>
  )
}
