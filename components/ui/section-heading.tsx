"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  align?: "left" | "center"
}

export function SectionHeading({ label, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} mb-8 sm:mb-12 px-1`}
    >
      {label && (
        <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
          {label}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance">{title}</h2>
      {description && <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">{description}</p>}
    </motion.div>
  )
}
