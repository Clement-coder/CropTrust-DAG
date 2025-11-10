"use client"
import { usePrivy } from "@privy-io/react-auth"
import { Bell, Search } from "lucide-react"
import { motion } from "framer-motion"

export function TopBar() {
  const { user } = usePrivy()

  return (
    <div className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-md">
        <div className="w-full relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-muted/50"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notifications */}
        <motion.button
          className="relative p-2 hover:bg-muted rounded-lg transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-warning rounded-full" />
        </motion.button>

        {/* User Avatar */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-foreground">Welcome, {user?.google?.name || "User"}</p>
          </div>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
            {user?.google?.name?.charAt(0) || "U"}
          </div>
        </div>
      </div>
    </div>
  )
}
