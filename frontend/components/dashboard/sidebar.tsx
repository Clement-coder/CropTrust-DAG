"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { useToast } from "@/hooks/use-toast"
import { Menu, X, LayoutDashboard, ShoppingCart, Store, Wallet, User, Settings, LogOut, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingCart, label: "My Listings", href: "/dashboard/listings" },
  { icon: Store, label: "Marketplace", href: "/dashboard/marketplace" },
  { icon: Wallet, label: "Wallet", href: "/dashboard/wallet" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { logout } = usePrivy()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      toast({
        title: "Logged out successfully",
        description: "You have been successfully logged out.",
        variant: "success",
      })
      window.location.href = "/"
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out.",
        variant: "destructive",
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 md:hidden z-40 p-2 hover:bg-muted rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 h-screen w-64 bg-background border-r border-border z-40 md:relative md:z-auto flex flex-col transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border flex items-center gap-2">
          <Image src="/CroptrustLog.png" alt="CropTrust Logo" width={32} height={32} />
          <span className="font-serif text-lg font-bold text-primary">CropTrust</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:bg-destructive/10"
              >
                <LogOut size={20} className="mr-2" />
                Logout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogDescription>
                  Are you sure you want to log out? You will be redirected to the homepage.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowLogoutConfirm(false)} disabled={isLoggingOut}>
                  Cancel
                </Button>
                <Button onClick={handleLogout} disabled={isLoggingOut}>
                  {isLoggingOut && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Confirm Logout
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.aside>
    </>
  )
}
