import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LiveStats from './components/LiveStats'
import BentoAccordion from './components/BentoAccordion'
import PricingSection from './components/PricingSection'
import SocialProof from './components/SocialProof'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-arctic">
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <LiveStats />
        <BentoAccordion />
        <PricingSection />
        <SocialProof />
      </main>
      <Footer />
    </div>
  )
}

export default App
