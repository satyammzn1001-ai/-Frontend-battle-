import Logo from './Logo'

export default function Footer() {
  return (
    <footer id="contact" className="bg-noir text-arctic/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <Logo variant="dark" />
          <p className="mt-3 text-sm max-w-xs text-arctic/60">
            AI-driven automation for teams who'd rather build than babysit workflows.
          </p>
        </div>

        <div className="flex gap-8 text-sm">
          <div>
            <h4 className="text-arctic font-semibold mb-2">Product</h4>
            <ul className="space-y-1 text-arctic/60">
              <li><a href="#home" className="hover:text-arctic transition-colors duration-150">Home</a></li>
              <li><a href="#features" className="hover:text-arctic transition-colors duration-150">Features</a></li>
              <li><a href="#pricing" className="hover:text-arctic transition-colors duration-150">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-arctic font-semibold mb-2">Contact</h4>
            <ul className="space-y-1 text-arctic/60">
              <li>hello@kepler-ai.com</li>
            </ul>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-arctic/40 mt-10">
        © {new Date().getFullYear()} Kepler AI. All rights reserved.
      </p>
    </footer>
  )
}
