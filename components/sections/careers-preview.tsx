"use client"

import { motion } from "framer-motion"
import { jobs } from "@/lib/data"
import { GradientButton } from "@/components/ui/gradient-button"

export function CareersPreview() {
  const featuredJobs = jobs.slice(0, 3)

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              Join Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">We&apos;re Hiring</h2>
          </div>
          <GradientButton href="/careers" variant="outline">
            View All Positions
          </GradientButton>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 group hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">{job.title}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    job.type === "Full-time"
                      ? "bg-primary/20 text-primary"
                      : job.type === "Contract"
                        ? "bg-secondary/20 text-secondary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {job.type}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{job.description}</p>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                {job.location}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
