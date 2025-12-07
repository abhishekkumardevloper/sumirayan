"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function EventsLearnPreview() {

  const APPLY_LINK =
    "https://docs.google.com/forms/d/e/1FAIpQLSditdPgSknXtq_6FnaEsaZyyJp2zlmGwj0YvhDf7W09Mf4-XA/viewform?usp=sharing&ouid=111351627280286504766"

  // ✅ YOUR PERMANENT EVENT DATA
  const event = {
    title: "Inter-College Painting Competition 2025",
    description:
      '“Explore Your Creativity” — Inter-college painting competition by Sumirayan Design Pvt. Ltd. in collaboration with College of Arts & Crafts, Patna. Theme: "Bihar & Dr. Rajendra Prasad".',
    datetime: "2025-12-09T11:00:00",
    venue: "Ground, College of Arts & Crafts, Patna",
  }

  const formatDateTime = (str: string) => {
    const d = new Date(str)
    return {
      date: d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      time: d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    }
  }

  const { date, time } = formatDateTime(event.datetime)

  return (
    <section className="py-12 sm:py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-xl sm:rounded-2xl p-6 md:p-8">

            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs mb-4">
              Upcoming
            </span>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
              {event.title}
            </h2>

            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              {event.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground mb-5">
              <span>📅 {date} — {time}</span>
              <span>📍 Venue: {event.venue}</span>
            </div>

            <a
              href={APPLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block
                px-6 py-3
                rounded-lg
                bg-primary
                text-white
                font-semibold
                transition hover:scale-105 glow-primary
              "
            >
              Apply Now →
            </a>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
