"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { processSteps } from "@/lib/data"

export function Process() {
  return (
    <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          label="How We Work"
          title="Our Process"
          description="A systematic approach to delivering exceptional creative solutions."
        />

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line - Only visible on desktop */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-5 sm:top-6 lg:top-8 left-1/2 w-full h-px bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="relative text-center">
                {/* Step Number */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 lg:mb-6">
                  <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary">{step.step}</span>
                </div>

                {/* Content */}
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 md:line-clamp-none">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
