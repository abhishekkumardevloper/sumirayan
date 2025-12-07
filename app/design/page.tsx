"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ServiceHero } from "@/components/sections/service-hero"
import { ServiceGrid } from "@/components/sections/service-grid"
import { CaseStudies } from "@/components/sections/case-studies"
import { CTASection } from "@/components/sections/cta-section"
import { services } from "@/lib/data"

export default function DesignPage() {
  const designData = services.design

  return (
    <>
      <Header />
      <main>
        <ServiceHero title={designData.title} tagline={designData.tagline} description={designData.description} />
        <ServiceGrid services={designData.services} />
        <CaseStudies category="design" useSupabase={true} />
        <CTASection
          title="Ready to Transform Your Brand?"
          description="From campaign planning to complete brand overhauls, our design team is ready to elevate your visual presence."
        />
      </main>
      <Footer />
    </>
  )
}
