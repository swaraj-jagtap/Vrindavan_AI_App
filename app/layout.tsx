import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Vrindavan Garden — Premium Indoor & Outdoor Plants",
  description:
    "Discover our curated collection of houseplants, flowering plants, and rare botanical specimens. Expert care guides included.",
  generator: "v0.app",
  alternates: {
    canonical: "https://vrindavan-garden.example/",
  },
  openGraph: {
    siteName: "Vrindavan Garden",
    title: "Premium Plants & Botanical Collections | Vrindavan Garden",
    description:
      "Discover our curated collection of houseplants, flowering plants, and rare botanical specimens. Expert care guides included.",
    type: "website",
    url: "https://vrindavan-garden.example/",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opengraph-vrindavan.jpg-placeholder",
        alt: "Vrindavan Garden — Premium plants and botanical collections",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Plants & Botanical Collections | Vrindavan Garden",
    description:
      "Discover our curated collection of houseplants, flowering plants, and rare botanical specimens. Expert care guides included.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opengraph-vrindavan.jpg-placeholder",
        alt: "Vrindavan Garden — Premium plants and botanical collections",
      },
    ],
    site: "@vrindavangardens",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans bg-neutral-50 text-neutral-900 overflow-x-hidden">{children}</body>
    </html>
  )
}
