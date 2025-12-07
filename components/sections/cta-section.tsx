"use client"

import { motion } from "framer-motion"
import { GradientButton } from "@/components/ui/gradient-button"

interface CTASectionProps {
  title?: string
  description?: string
}

export function CTASection({
  title = "Ready to Start Your Project?",
  description = "Let's create something extraordinary together. Get in touch with our team to discuss your vision.",
}: CTASectionProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">{title}</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">{description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <GradientButton href="/contact" variant="primary" size="lg">
              Start Your Campaign
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </GradientButton>
            <GradientButton href="/" variant="outline" size="lg">
              View Our Work
            </GradientButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
