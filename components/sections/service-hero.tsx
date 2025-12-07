"use client"

import { motion } from "framer-motion"

interface ServiceHeroProps {
  title: string
  tagline: string
  description: string
}

export function ServiceHero({ title, tagline, description }: ServiceHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center pt-24 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 -right-1/4 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            {tagline}
          </motion.span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">{description}</p>
        </motion.div>
      </div>
    </section>
  )
}
