const LOGOS = ['Acme Corp', 'Vertex Labs', 'Northwind', 'Halcyon', 'Quantix', 'Brightside']

export default function SocialProof() {
  return (
    <section aria-label="Trusted by companies" className="py-12 bg-arctic border-y border-noir/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-noir/50 font-mono">
          Trusted by teams shipping faster
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {LOGOS.map((name) => (
            <span key={name} className="text-noir/40 font-semibold text-sm">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
