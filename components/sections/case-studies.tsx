"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getPortfolioItems } from "@/lib/supabase-data"
import type { PortfolioItem } from "@/lib/types"

interface CaseStudy {
  title: string
  category: string
  image: string
}

interface CaseStudiesProps {
  studies?: CaseStudy[]
  category?: 'design' | 'photography' | 'art'
  useSupabase?: boolean
}

export function CaseStudies({ studies, category, useSupabase = false }: CaseStudiesProps) {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(useSupabase)

  useEffect(() => {
    if (!useSupabase) return
    
    async function loadPortfolio() {
      try {
        const data = await getPortfolioItems(category)
        setPortfolioItems(data)
      } catch (error) {
        console.error('Error loading portfolio:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPortfolio()
  }, [category, useSupabase])

  const displayItems = useSupabase
    ? portfolioItems.map(item => ({
        title: item.title,
        category: item.short_description || item.category,
        image: item.image_url || '/placeholder.svg'
      }))
    : studies || []

  if (loading) {
    return (
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-32 bg-muted rounded mb-12" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] rounded-2xl bg-muted mb-4" />
                <div className="h-4 w-24 bg-muted rounded mb-2" />
                <div className="h-5 w-32 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm uppercase tracking-widest text-muted-foreground mb-12"
        >
          Case Studies
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {displayItems.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass mb-4">
                <img
                  src={study.image || "/placeholder.svg"}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
                {study.category}
              </span>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {study.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
