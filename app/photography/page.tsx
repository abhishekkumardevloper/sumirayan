"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ServiceHero } from "@/components/sections/service-hero"
import { ServiceGrid } from "@/components/sections/service-grid"
import { GalleryGrid } from "@/components/sections/gallery-grid"
import { CTASection } from "@/components/sections/cta-section"
import { services } from "@/lib/data"

export default function PhotographyPage() {
  const photographyData = services.photography

  return (
    <>
      <Header />
      <main>
        <ServiceHero
          title={photographyData.title}
          tagline={photographyData.tagline}
          description={photographyData.description}
        />
        <ServiceGrid services={photographyData.services} />
        <GalleryGrid category="photography" useSupabase={true} title="Our Work" />
        <CTASection
          title="Let's Capture Your Story"
          description="From weddings to commercial shoots, our photography team brings artistic vision and technical excellence to every project."
        />
      </main>
      <Footer />
    </>
  )
}
