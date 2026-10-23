// Piezas de maquetación compartidas por las páginas legales.

export function LegalSection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="mb-4 mt-10 border-l-4 border-racing pl-3 font-display text-lg font-bold uppercase tracking-wide text-white sm:text-xl">
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-zinc-300">{children}</div>
    </section>
  )
}

export function P({ children }) {
  return <p className="text-sm leading-relaxed text-zinc-300">{children}</p>
}

export function List({ items }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-zinc-300 marker:text-racing">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  )
}

export function Info({ title, children }) {
  return (
    <div className="rounded-lg border border-ink-border bg-ink-surface/70 p-4">
      <p className="mb-1 font-display text-xs font-bold uppercase tracking-widest text-racing">{title}</p>
      <div className="text-sm leading-relaxed text-zinc-200">{children}</div>
    </div>
  )
}
