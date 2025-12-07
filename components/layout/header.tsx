"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { navLinks } from "@/lib/data"
import { supabase } from "@/lib/supabaseClient"
import { useSupabaseUser } from "@/hooks/use-supabase-user"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, loading } = useSupabaseUser()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsMenuOpen(false)
    router.push("/")
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center h-full">
              <Image
                src="sumirayan design.png"  
                alt="Sumirayan Design"
                width={200}
                height={60}
                priority
                className="h-10 sm:h-12 w-auto max-w-[140px] sm:max-w-none"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/design"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                Design
              </Link>
              <Link
                href="/photography"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                Photography
              </Link>
              <Link
                href="/art"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                Art
              </Link>
              <Link
                href="/learn"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                Learn
              </Link>
            </nav>

            <div className="flex items-center gap-2 sm:gap-4">
              {!loading && (
                <div className="hidden lg:flex items-center gap-3">
                  {user ? (
                    <>
                      <Link
                        href="/account"
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                      >
                        Account
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}

              <button
                onClick={() => setIsMenuOpen(true)}
                className="w-11 h-11 flex items-center justify-center rounded-lg border border-border hover:bg-muted hover:border-foreground transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl"
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center h-full">
                  <svg 
                    viewBox="0 0 800 200" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 sm:h-12 w-auto max-w-[160px] sm:max-w-none"
                  >
                    <circle cx="340" cy="50" r="30" fill="#E53935"/>
                    <text x="10" y="130" fontFamily="Arial, sans-serif" fontSize="120" fontWeight="bold" fill="#1565C0" letterSpacing="8">
                      sumirayan
                    </text>
                    <path d="M 10 160 Q 400 180 750 160" stroke="#1565C0" strokeWidth="20" fill="none" strokeLinecap="round"/>
                    <text x="650" y="130" fontFamily="Arial, sans-serif" fontSize="60" fontWeight="bold" fill="#E53935" letterSpacing="2">
                      DESIGN
                    </text>
                  </svg>
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 flex flex-col lg:flex-row">
                <div className="flex-1 flex flex-col justify-center px-8 lg:px-16">
                  <nav className="space-y-2">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground hover:text-primary transition-colors py-2"
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-full font-semibold text-base sm:text-lg hover:opacity-90 transition-opacity glow-primary"
                    >
                      Start Your Campaign
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </motion.div>
                </div>

                <div className="lg:w-80 p-8 lg:p-16 flex flex-col justify-end lg:justify-center gap-4 border-t lg:border-t-0 lg:border-l border-border">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <p className="text-muted-foreground text-sm mb-4">
                      {user ? `Signed in as ${user.email}` : "Access Sumirayan Learn"}
                    </p>
                    <div className="flex flex-col gap-3">
                      {user ? (
                        <>
                          <Link
                            href="/account"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg text-center font-medium hover:opacity-90 transition-opacity"
                          >
                            My Account
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="px-6 py-3 border border-border rounded-lg text-center font-medium hover:bg-muted transition-colors"
                          >
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-6 py-3 border border-border rounded-lg text-center font-medium hover:bg-muted transition-colors"
                          >
                            Log In
                          </Link>
                          <Link
                            href="/signup"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg text-center font-medium hover:opacity-90 transition-opacity"
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-8"
                  >
                    <p className="text-muted-foreground text-sm mb-4">Follow Us</p>
                    <div className="flex gap-4">
                      {["Instagram", "YouTube", "Facebook"].map((social) => (
                        <a
                          key={social}
                          href="#"
                          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                        >
                          {social}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
