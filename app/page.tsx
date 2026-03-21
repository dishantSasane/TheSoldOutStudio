import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Stats from "@/components/Stats"
import Services from "@/components/Services"
import TrustedBy from "@/components/TrustedBy"
import ConnectSection from "@/components/ConnectSection"
import Footer from "@/components/Footer"

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <TrustedBy />
      <ConnectSection />
      <Footer />
    </main>
  )
}
