import { useState } from 'react'
import Logo from './Logo'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-arctic/90 backdrop-blur-md border-b border-noir/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />

        <ul className="hidden md:flex gap-8 items-center text-sm font-medium text-noir">
          {links.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="hover:text-saffron transition-colors duration-150 ease-out">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#pricing"
          className="hidden md:inline-block bg-forsythia text-noir px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity duration-150 ease-out"
        >
          Get Started
        </a>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-noir transition-transform duration-200 ease-out ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-noir transition-opacity duration-200 ease-out ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-noir transition-transform duration-200 ease-out ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {open && (
        <ul className="md:hidden flex flex-col gap-4 px-4 pb-6 text-noir font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
