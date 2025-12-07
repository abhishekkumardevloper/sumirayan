"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { GradientButton } from "@/components/ui/gradient-button"

export default function ContactPage() {
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
    // Static form - no submission handling yet
    console.log("Form submitted:", formData)
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="py-12"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Contact Us
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                Let&apos;s Create Something Amazing
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                Ready to bring your vision to life? We&apos;d love to hear from you. Reach out to discuss your project
                or just say hello.
              </p>

              {/* Contact Details */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Office</h3>
                  <p className="text-foreground">
                    Biskoman Colony Near Oxygen Hospital
                    <br />
                    Patna-7
                    <br />
                    India
                  </p>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Email</h3>
                  <a href="mailto:hello@sumirayan.com" className="text-foreground hover:text-primary transition-colors">
                    sumirayandesign@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Phone</h3>
                  <a href="tel:+919876543210" className="text-foreground hover:text-primary transition-colors">
                    +91 89368 41201
                  </a>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {["Instagram", "YouTube", "LinkedIn", "Twitter"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="py-12"
            >
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl font-bold text-foreground mb-6">Start Your Campaign</h2>

                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+91 12345 67890"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Project Type *</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
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
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Budget Range</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Tell us about your project..."
                      required
                    />
                  </div>

                  <GradientButton variant="primary" size="lg" className="w-full">
                    Send Message
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </GradientButton>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
