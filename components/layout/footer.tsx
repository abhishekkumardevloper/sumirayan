import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 text-center sm:text-left">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-base sm:text-lg">S</span>
              </div>
              <span className="text-foreground font-semibold text-lg sm:text-xl tracking-tight">Sumirayan Design</span>
            </Link>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto sm:mx-0 mb-5 sm:mb-6">
              The Best Solution in Your Budget. We are a premium creative agency specializing in Design, Photography &
              Videography, and Art.
            </p>
            <div className="flex justify-center sm:justify-start gap-3 sm:gap-4">
              {[
                {
                  name: "Instagram",
                  icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                },
                {
                  name: "YouTube",
                  icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z",
                },
                {
                  name: "Facebook",
                  icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                  aria-label={social.name}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
            <nav className="flex flex-col gap-2.5 sm:gap-3">
              <Link href="/design" className="text-muted-foreground hover:text-foreground transition-colors text-sm min-h-[44px] sm:min-h-0 flex items-center justify-center sm:justify-start">
                Design
              </Link>
              <Link href="/photography" className="text-muted-foreground hover:text-foreground transition-colors text-sm min-h-[44px] sm:min-h-0 flex items-center justify-center sm:justify-start">
                Photography
              </Link>
              <Link href="/art" className="text-muted-foreground hover:text-foreground transition-colors text-sm min-h-[44px] sm:min-h-0 flex items-center justify-center sm:justify-start">
                Art
              </Link>
              <Link href="/learn" className="text-muted-foreground hover:text-foreground transition-colors text-sm min-h-[44px] sm:min-h-0 flex items-center justify-center sm:justify-start">
                Learn
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <nav className="flex flex-col gap-2.5 sm:gap-3">
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm min-h-[44px] sm:min-h-0 flex items-center justify-center sm:justify-start">
                About
              </Link>
              <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors text-sm min-h-[44px] sm:min-h-0 flex items-center justify-center sm:justify-start">
                Careers
              </Link>
              <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors text-sm min-h-[44px] sm:min-h-0 flex items-center justify-center sm:justify-start">
                Events
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm min-h-[44px] sm:min-h-0 flex items-center justify-center sm:justify-start">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs sm:text-sm text-center md:text-left">
            © {new Date().getFullYear()} Sumirayan Design Private Limited. All rights reserved.
          </p>
          <div className="flex flex-row items-center gap-4 sm:gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground text-xs sm:text-sm transition-colors min-h-[44px] flex items-center">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-xs sm:text-sm transition-colors min-h-[44px] flex items-center">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
