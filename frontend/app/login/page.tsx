"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/use-user"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Mail, Lock, LogIn } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function LoginPage() {
  const router = useRouter()
  const { saveUser } = useUser()

  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [isShaking, setIsShaking] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = { email: "", password: "" }
    let hasError = false

    if (!formData.email) {
      newErrors.email = "Email is required"
      hasError = true
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      hasError = true
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      triggerShake()
      return
    }

    // Mock login
    const stored = localStorage.getItem("croptrustUser")
    if (stored) {
      const user = JSON.parse(stored)
      if (user.email === formData.email) {
        saveUser(user)
        router.push("/dashboard")
        return
      }
    }

    setErrors({ email: "Invalid email or password", password: "" })
    triggerShake()
  }

  const triggerShake = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)
  }

  const shakeVariants = {
    shake: { x: [0, -10, 10, -10, 10, 0] },
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Navigation />

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="shadow-lg border border-border">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white text-xl">
                🌱
              </div>
            </div>
            <span className="font-serif text-2xl font-bold text-primary">
              CropTrust
            </span>
            <CardTitle className="text-2xl mt-4">Welcome Back 👋</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in to your account
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                className="relative"
                animate={isShaking && errors.email ? "shake" : ""}
                variants={shakeVariants}
                transition={{ duration: 0.5 }}
              >
                <Mail className="absolute left-3 top-5 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.email ? "border-destructive" : "border-border"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.email}
                  </p>
                )}
              </motion.div>

              <motion.div
                className="relative"
                animate={isShaking && errors.password ? "shake" : ""}
                variants={shakeVariants}
                transition={{ duration: 0.5 }}
              >
                <Lock className="absolute left-3 top-5 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.password ? "border-destructive" : "border-border"
                  }`}
                />
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.password}
                  </p>
                )}
              </motion.div>

              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Create one for free
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
