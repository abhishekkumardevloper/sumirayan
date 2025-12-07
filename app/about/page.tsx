"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { stats } from "@/lib/data"
import { GradientButton } from "@/components/ui/gradient-button"

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              The Best Solution in Your Budget
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Sumirayan Design Private Limited is a premium creative agency where passion meets precision. We transform
              ideas into visual masterpieces that captivate, inspire, and deliver results.
            </p>
          </motion.div>
        </section>

        {/* Story */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded with a vision to democratize premium creative services, Sumirayan Design has grown from a
                  small studio to a full-service creative agency serving clients across industries.
                </p>
                <p>
                  Our name, derived from the Sanskrit word for &quot;beautiful creation,&quot; reflects our commitment
                  to crafting visually stunning and strategically effective solutions for every client.
                </p>
                <p>
                  Today, we&apos;re proud to be the trusted creative partner for over 150 brands, delivering excellence
                  in design, photography, and art while staying true to our founding principle: exceptional quality
                  doesn&apos;t have to break the bank.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square rounded-2xl overflow-hidden glass"
            >
              <img
                src="/creative-team-working-together-in-modern-studio.jpg"
                alt="Sumirayan Design Team"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center"
          >
            Our Values
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Excellence",
                description:
                  "We never settle for good enough. Every project receives our full creative dedication and meticulous attention to detail.",
                icon: "✦",
              },
              {
                title: "Innovation",
                description:
                  "We stay ahead of trends and embrace new technologies to deliver cutting-edge creative solutions.",
                icon: "◈",
              },
              {
                title: "Integrity",
                description:
                  "Transparency and honesty guide every client relationship. We promise what we can deliver, and deliver what we promise.",
                icon: "◇",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <div className="text-4xl mb-4 text-primary">{value.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Work Together?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help bring your creative vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GradientButton href="/contact" variant="primary" size="lg">
                Start Your Campaign
              </GradientButton>
              <GradientButton href="/careers" variant="outline" size="lg">
                Join Our Team
              </GradientButton>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  )
}
