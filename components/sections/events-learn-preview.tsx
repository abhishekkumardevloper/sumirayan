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

  const APPLY_LINK =
    "https://docs.google.com/forms/d/e/1FAIpQLSditdPgSknXtq_6FnaEsaZyyJp2zlmGwj0YvhDf7W09Mf4-XA/viewform?usp=sharing&ouid=111351627280286504766"

  useEffect(() => {
    async function loadData() {
      try {
        const [event, article] = await Promise.all([
          getNextUpcomingEvent(),
          getFeaturedPost(),
        ])
        setUpcomingEvent(event)
        setFeaturedArticle(article)
      } catch (error) {
        console.error("Error loading preview data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // 🔹 Fallback painting competition data
  const fallbackDate = "2025-12-09T11:00:00"
  const fallbackTitle = "Inter-College Painting Competition 2025"
  const fallbackLocation = "Ground, College of Arts & Crafts, Patna"
  const fallbackDescription =
    '“Explore Your Creativity” — Inter-college painting competition by Sumirayan Design Pvt. Ltd. in collaboration with College of Arts & Crafts, Patna. Theme: "Bihar & Dr. Rajendra Prasad". One hour, one canvas. Mix media allowed; paper will be provided, participants must bring their own materials.'

  const eventTitle = upcomingEvent?.title || fallbackTitle
  const eventDescription = upcomingEvent?.description || fallbackDescription
  const eventDate = upcomingEvent?.date || fallbackDate
  const eventLocation = upcomingEvent?.location || fallbackLocation

  if (loading) return null

  return (
    <section className="py-12 sm:py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* UPCOMING EVENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground">
                Upcoming Events
              </h3>

              <Link href="/events" className="text-primary text-xs sm:text-sm font-medium hover:underline min-h-[44px] flex items-center">
                View All
              </Link>
            </div>

            <div className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 h-full relative">
              <span className="inline-block px-2.5 py-1 sm:px-3 rounded-full bg-primary/20 text-primary text-xs font-medium mb-3 sm:mb-4">
                Upcoming
              </span>

              <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                {eventTitle}
              </h4>

              <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base line-clamp-4 sm:line-clamp-none">
                {eventDescription}
              </p>

              {!upcomingEvent && (
                <div className="space-y-1 mb-4 text-xs sm:text-sm text-muted-foreground">
                  <p>
                    <span className="font-semibold">Theme:</span> Bihar &amp; Dr. Rajendra Prasad – One hour, one canvas
                  </p>
                  <p>
                    <span className="font-semibold">Medium:</span> Mix media (any colour medium allowed)
                  </p>
                  <p>
                    <span className="font-semibold">Eligibility:</span> Max 5 students per college, individuals welcome
                  </p>
                  <p>
                    <span className="font-semibold">Awards:</span> Top 3 medal winners; all participants receive medals & certificates
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-5">
                <span className="flex items-center gap-2">
                  📅 {formatDate(eventDate)} – 11:00 AM
                </span>
                <span className="flex items-center gap-2">
                  📍 {eventLocation}
                </span>
              </div>

              {/* APPLY NOW BUTTON */}
              <a
                href={APPLY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  rounded-lg px-6 py-3
                  bg-primary text-primary-foreground
                  font-semibold text-sm sm:text-base
                  transition-all duration-200
                  hover:scale-[1.03]
                  hover:shadow-lg glow-primary
                  w-full sm:w-auto
                "
              >
                Apply Now →
              </a>
            </div>
          </motion.div>

          {/* FROM LEARN (UNCHANGED) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground">
                From Learn
              </h3>

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
                  </div>

                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <span className="px-2 py-0.5 sm:py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
                        {featuredArticle.tag}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {featuredArticle.read_time}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {featuredArticle.title}
                    </h4>

                    <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="glass p-6 rounded-xl sm:rounded-2xl text-center text-muted-foreground">
                No featured articles yet.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
