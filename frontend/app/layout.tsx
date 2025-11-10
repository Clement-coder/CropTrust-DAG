import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Providers from "@/lib/providers"

const inter = Inter({ subsets: ["latin"] })
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "CropTrust - Agriculture Marketplace",
  description: "Connecting farmers and buyers with trust and transparency",
  generator: "v0.app",
}

import { Toaster } from "@/components/toaster";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body className={inter.className}>
        <Providers>
           {children}
        <Toaster />
        </Providers>
       
      </body>
    </html>
  );
}
