import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "SoldOut Labs — The Creative Force Behind Your Brand's Success",
  description:
    "Empowering brands with targeted digital and outdoor advertising that cuts through the noise. Billboards, transit ads, and digital OOH.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
