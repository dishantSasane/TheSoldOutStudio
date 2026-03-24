import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import AboutSection from "@/components/ui/AboutSection"
import Stats from "@/components/Stats"
import Services from "@/components/Services"
import TrustedBy from "@/components/TrustedBy"
import ConnectSection from "@/components/ConnectSection"
import Footer from "@/components/Footer"
import DarkTransition from "@/components/ui/DarkTransition"

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <AboutSection />
      <Services />
      <TrustedBy />
      <DarkTransition />
      <ConnectSection />
      <Footer />
    </main>
  )
}
