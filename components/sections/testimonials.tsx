"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { getTestimonials } from "@/lib/supabase-data"
import type { Testimonial } from "@/lib/types"

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await getTestimonials()
        setTestimonials(data)
      } catch (error) {
        console.error('Error loading testimonials:', error)
      } finally {
        setLoading(false)
      }
    }
    loadTestimonials()
  }, [])

  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Testimonials"
            title="What Our Clients Say"
            description="Real stories from brands we've had the pleasure of working with."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 animate-pulse">
                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-muted rounded mb-3 sm:mb-4" />
                <div className="h-3 sm:h-4 bg-muted rounded w-full mb-2" />
                <div className="h-3 sm:h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 sm:h-4 bg-muted rounded w-1/2 mb-4 sm:mb-6" />
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted" />
                  <div>
                    <div className="h-3 sm:h-4 bg-muted rounded w-20 sm:w-24 mb-2" />
                    <div className="h-2 sm:h-3 bg-muted rounded w-24 sm:w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          description="Real stories from brands we've had the pleasure of working with."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary/30 mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-foreground text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed line-clamp-4 sm:line-clamp-none">{testimonial.quote}</p>

              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={testimonial.avatar_url || "/placeholder-user.jpg"}
                  alt={testimonial.client_name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground text-sm sm:text-base">{testimonial.client_name}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
