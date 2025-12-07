"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { GradientButton } from "@/components/ui/gradient-button"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section className="py-8 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />

      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 relative">
        <SectionHeading
          label="Get Started"
          title="Start Your Campaign"
          description="Ready to bring your vision to life? Tell us about your project and we'll get back to you within 24 hours."
        />

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="glass rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {/* Name */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base min-h-[44px]"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base min-h-[44px]"
                placeholder="your@email.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base min-h-[44px]"
                placeholder="+91 12345 67890"
              />
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">Project Type</label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base min-h-[44px]"
              >
                <option value="">Select a service</option>
                <option value="design">Design & Branding</option>
                <option value="photography">Photography & Videography</option>
                <option value="art">Art & Murals</option>
                <option value="marketing">Digital Marketing</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Budget */}
            <div className="sm:col-span-2">
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">Budget Range</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base min-h-[44px]"
              >
                <option value="">Select budget range</option>
                <option value="10k-25k">₹10,000 - ₹25,000</option>
                <option value="25k-50k">₹25,000 - ₹50,000</option>
                <option value="50k-1L">₹50,000 - ₹1,00,000</option>
                <option value="1L-5L">₹1,00,000 - ₹5,00,000</option>
                <option value="5L+">₹5,00,000+</option>
              </select>
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm sm:text-base"
                placeholder="Tell us about your project..."
              />
            </div>
          </div>

          <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center">
            <GradientButton variant="primary" size="lg" type="submit" className="w-full sm:w-auto min-h-[44px] text-sm sm:text-base">
              Send Message
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </GradientButton>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
