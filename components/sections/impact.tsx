"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { stats } from "@/lib/data"

export function Impact() {
  return (
    <section className="py-12 sm:py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Stats */}
          <div>
            <SectionHeading label="Our Impact" title="Numbers That Speak" align="left" />
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6"
                >
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-xs sm:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Client Logos */}
          <div className="mt-4 lg:mt-0">
            <h3 className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mb-4 sm:mb-6">Trusted By</h3>
            <div className="overflow-hidden relative">
              <motion.div
                animate={{ x: [0, -1200] }}
                transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="flex gap-4 sm:gap-6 md:gap-8"
              >
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-20 h-10 sm:w-28 sm:h-14 md:w-32 md:h-16 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground text-xs sm:text-sm font-medium"
                  >
                    Logo {(i % 6) + 1}
                  </div>
                ))}
              </motion.div>
              <div className="absolute inset-y-0 left-0 w-10 sm:w-16 md:w-20 bg-gradient-to-r from-background to-transparent" />
              <div className="absolute inset-y-0 right-0 w-10 sm:w-16 md:w-20 bg-gradient-to-l from-background to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
