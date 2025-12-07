import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { CreativePillars } from "@/components/sections/creative-pillars"
import { SignatureProjects } from "@/components/sections/signature-projects"
import { Process } from "@/components/sections/process"
import { Impact } from "@/components/sections/impact"
import { Testimonials } from "@/components/sections/testimonials"
import { EventsLearnPreview } from "@/components/sections/events-learn-preview"
import { ContactForm } from "@/components/sections/contact-form"
import { CareersPreview } from "@/components/sections/careers-preview"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <EventsLearnPreview />
        <CreativePillars />
        <SignatureProjects />
        <Process />
        <Impact />
        <Testimonials />
        <ContactForm />
        <CareersPreview />
      </main>
      <Footer />
    </>
  )
}
