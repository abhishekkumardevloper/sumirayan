import type React from "react"
import type { Metadata, Viewport } from "next"
import { Poppins, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Sumirayan Design Private Limited | The Best Solution in Your Budget",
  description:
    "Premium creative advertising agency specializing in Design, Photography & Videography, and Art. Campaign Planning, Digital Marketing, Graphic Design, Video Editing, Wedding Photography, Events, Product Shoots, Portraits, and Handmade Artwork.",
  keywords: [
    "creative agency",
    "design",
    "photography",
    "videography",
    "art",
    "digital marketing",
    "branding",
    "advertising",
  ],
  authors: [{ name: "Sumirayan Design" }],
  openGraph: {
    title: "Sumirayan Design Private Limited",
    description: "The Best Solution in Your Budget - Premium Creative Agency",
    type: "website",
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#050509",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body
        className={`${poppins.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground min-h-screen w-full max-w-full overflow-x-hidden`}
      >
        {/* full-width wrapper so content mobile pe squeeze na ho */}
        <div className="min-h-screen w-full max-w-full">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
