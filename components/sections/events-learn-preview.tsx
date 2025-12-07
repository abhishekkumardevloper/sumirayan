"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { getNextUpcomingEvent, getFeaturedPost } from "@/lib/supabase-data"
import type { Event, Post } from "@/lib/types"

export function EventsLearnPreview() {
  const [upcomingEvent, setUpcomingEvent] = useState<Event | null>(null)
  const [featuredArticle, setFeaturedArticle] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [event, article] = await Promise.all([
          getNextUpcomingEvent(),
          getFeaturedPost()
        ])
        setUpcomingEvent(event)
        setFeaturedArticle(article)
      } catch (error) {
        console.error('Error loading preview data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 animate-pulse">
              <div className="h-5 sm:h-6 w-28 sm:w-32 bg-muted rounded mb-3 sm:mb-4" />
              <div className="h-6 sm:h-8 w-full bg-muted rounded mb-2" />
              <div className="h-3 sm:h-4 w-3/4 bg-muted rounded mb-3 sm:mb-4" />
              <div className="h-3 sm:h-4 w-1/2 bg-muted rounded" />
            </div>
            <div className="glass rounded-xl sm:rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-video bg-muted" />
              <div className="p-4 sm:p-6">
                <div className="h-3 sm:h-4 w-20 sm:w-24 bg-muted rounded mb-2" />
                <div className="h-5 sm:h-6 w-full bg-muted rounded mb-2" />
                <div className="h-3 sm:h-4 w-3/4 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground">Upcoming Events</h3>
              <Link href="/events" className="text-primary text-xs sm:text-sm font-medium hover:underline min-h-[44px] flex items-center">
                View All
              </Link>
            </div>
            {upcomingEvent ? (
              <div className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 h-full">
                <span className="inline-block px-2.5 py-1 sm:px-3 rounded-full bg-primary/20 text-primary text-xs font-medium mb-3 sm:mb-4">
                  Upcoming
                </span>
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2">{upcomingEvent.title}</h4>
                <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">{upcomingEvent.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {formatDate(upcomingEvent.date)}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="truncate">{upcomingEvent.location}</span>
                  </span>
                </div>
              </div>
            ) : (
              <div className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 h-full flex items-center justify-center">
                <p className="text-muted-foreground text-sm sm:text-base">No upcoming events. Check back soon!</p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground">From Learn</h3>
              <Link href="/learn" className="text-primary text-xs sm:text-sm font-medium hover:underline min-h-[44px] flex items-center">
                View All
              </Link>
            </div>
            {featuredArticle ? (
              <Link href={`/learn/${featuredArticle.slug}`} className="block group">
                <div className="glass rounded-xl sm:rounded-2xl overflow-hidden h-full">
                  <div className="aspect-video relative">
                    <img
                      src={featuredArticle.image_url || "/placeholder.svg"}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {featuredArticle.is_premium && (
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                        <span className="px-2 py-0.5 sm:py-1 rounded-full bg-yellow-500/90 text-yellow-900 text-xs font-bold">
                          Premium
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <span className="px-2 py-0.5 sm:py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
                        {featuredArticle.tag}
                      </span>
                      <span className="text-muted-foreground text-xs">{featuredArticle.read_time}</span>
                    </div>
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {featuredArticle.title}
                    </h4>
                    <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">{featuredArticle.excerpt}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 h-full flex items-center justify-center">
                <p className="text-muted-foreground text-sm sm:text-base">No featured articles yet.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
