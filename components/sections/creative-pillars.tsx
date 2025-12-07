"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { SectionHeading } from "@/components/ui/section-heading"

const pillars = [
  {
    title: "Design",
    tagline: "Crafting Visual Excellence",
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
    points: [
      "Campaign Planning & Strategy",
      "Digital Marketing Excellence",
      "Graphic Design & Branding",
      "Professional Video Editing",
    ],
    href: "/design",
    color: "from-primary/20 to-transparent",
  },
  {
    title: "Photography & Videography",
    tagline: "Capturing Moments, Creating Memories",
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    points: [
      "Wedding & Event Coverage",
      "Product & Commercial Shoots",
      "Portrait & Fashion Sessions",
      "YouTube & Social Content",
    ],
    href: "/photography",
    color: "from-secondary/20 to-transparent",
  },
  {
    title: "Art",
    tagline: "Where Imagination Meets Canvas",
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    points: [
      "Digital & Traditional Painting",
      "Wall Murals & Installations",
      "Sketching & Illustrations",
      "Custom Handmade Artwork",
    ],
    href: "/art",
    color: "from-purple-500/20 to-transparent",
  },
]

export function CreativePillars() {
  return (
    <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="What We Do"
          title="Our Creative Pillars"
          description="Three distinct disciplines, one unified vision. We bring together design, photography, and art to create compelling experiences."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={pillar.href} className="block group">
                <div
                  className={`relative glass rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 h-full transition-all duration-300 group-hover:-translate-y-2 overflow-hidden`}
                >
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div className="relative">
                    {/* Icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 sm:mb-4 lg:mb-6">
                      {pillar.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground mb-1 sm:mb-2">{pillar.title}</h3>
                    <p className="text-primary text-xs sm:text-sm font-medium mb-2 sm:mb-3 lg:mb-4">{pillar.tagline}</p>

                    {/* Points */}
                    <ul className="space-y-1 sm:space-y-1.5 lg:space-y-2 mb-3 sm:mb-4 lg:mb-6">
                      {pillar.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-muted-foreground text-xs sm:text-sm">
                          <svg
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="leading-tight">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Link */}
                    <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all text-sm min-h-[44px]">
                      Explore
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
