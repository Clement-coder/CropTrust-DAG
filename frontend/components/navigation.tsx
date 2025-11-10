"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, AppWindow, Globe, FileText, Mail, LogIn, ArrowRight, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePrivy } from "@privy-io/react-auth"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { ready, authenticated, logout } = usePrivy()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary">
          <Image src="/CroptrustLog.png" alt="CropTrust Logo" width={32} height={32} />
          CropTrust
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="#how-it-works" className="flex items-center gap-2 text-foreground hover:text-primary transition">
            <AppWindow size={18} />
            How It Works
          </Link>
          <Link href="/dashboard/marketplace" className="flex items-center gap-2 text-foreground hover:text-primary transition">
            <Globe size={18} />
            Marketplace
          </Link>
          <Link href="#about" className="flex items-center gap-2 text-foreground hover:text-primary transition">
            <FileText size={18} />
            About
          </Link>
          <Link href="#contact" className="flex items-center gap-2 text-foreground hover:text-primary transition">
            <Mail size={18} />
            Contact
          </Link>
          <Link href="#testimonials" className="flex items-center gap-2 text-foreground hover:text-primary transition">
            <MessageSquare size={18} />
            Testimonials
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex gap-3">
          {!ready && <div />}
          {ready && !authenticated && (
            <Button variant="outline" asChild>
              <Link href="/signup" className="flex items-center gap-2">
                <LogIn size={18} />
                Sign Up
              </Link>
            </Button>
          )}
          {ready && authenticated && (
            <>
              <Button variant="outline" asChild>
                <Link href="/dashboard" className="flex items-center gap-2">
                  Dashboard
                </Link>
              </Button>
              <Button onClick={logout} className="flex items-center gap-2">
                <ArrowRight size={18} />
                Logout
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="flex flex-col gap-4 p-4">
            <Link
              href="#how-it-works"
              className="flex items-center gap-2 text-foreground hover:text-primary transition"
              onClick={() => setIsOpen(false)}
            >
              <AppWindow size={18} />
              How It Works
            </Link>
            <Link
              href="/dashboard/marketplace"
              className="flex items-center gap-2 text-foreground hover:text-primary transition"
              onClick={() => setIsOpen(false)}
            >
              <Globe size={18} />
              Marketplace
            </Link>
            <Link
              href="#about"
              className="flex items-center gap-2 text-foreground hover:text-primary transition"
              onClick={() => setIsOpen(false)}
            >
              <FileText size={18} />
              About
            </Link>
            <Link
              href="#contact"
              className="flex items-center gap-2 text-foreground hover:text-primary transition"
              onClick={() => setIsOpen(false)}
            >
              <Mail size={18} />
              Contact
            </Link>
            <Link
              href="#testimonials"
              className="flex items-center gap-2 text-foreground hover:text-primary transition"
              onClick={() => setIsOpen(false)}
            >
              <MessageSquare size={18} />
              Testimonials
            </Link>
            {!ready && <div />}
            {ready && !authenticated && (
              <Button variant="outline" asChild>
                <Link href="/signup" className="flex items-center gap-2">
                  <LogIn size={18} />
                  Sign Up
                </Link>
              </Button>
            )}
            {ready && authenticated && (
              <>
                <Button variant="outline" asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    Dashboard
                  </Link>
                </Button>
                <Button onClick={logout} className="flex items-center gap-2">
                  <ArrowRight size={18} />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
