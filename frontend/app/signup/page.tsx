"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/use-user"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { User, Mail, MapPin, ChevronRight, ChevronLeft, CheckCircle, ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"

type SignupStep = 1 | 2 | 3

export default function SignupPage() {
  const router = useRouter()
  const { saveUser } = useUser()

  const [step, setStep] = useState<SignupStep>(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    role: "farmer" as "farmer" | "buyer",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.email)) {
      alert("Please fill in all fields")
      return
    }
    if (step === 2 && !formData.location) {
      alert("Please select a location")
      return
    }
    if (step < 3) {
      setStep((step + 1) as SignupStep)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as SignupStep)
    }
  }

  const handleSubmit = () => {
    saveUser(formData)
    router.push("/dashboard")
  }

  const handleRoleToggle = (role: "farmer" | "buyer") => {
    setFormData((prev) => ({ ...prev, role }))
    setStep(2)
  }

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.4 } },
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Navigation/>
      <div className="w-full max-w-lg">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 mx-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">Step {step} of 3</p>
        </div>

        <motion.div key={step} variants={containerVariants} initial="hidden" animate="visible" exit="exit">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Welcome to CropTrust</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">Let's start with your basic information</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Role Selection */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What's your role?</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">Choose how you'll participate in CropTrust</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Farmer option */}
                <motion.button
                  onClick={() => handleRoleToggle("farmer")}
                  className={`w-full p-6 border-2 rounded-lg transition-all ${
                    formData.role === "farmer" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-3xl mb-3">🚜</div>
                  <h3 className="font-semibold text-lg">Farmer</h3>
                  <p className="text-sm text-muted-foreground mt-2">List your crops and reach buyers directly</p>
                </motion.button>

                {/* Buyer option */}
                <motion.button
                  onClick={() => handleRoleToggle("buyer")}
                  className={`w-full p-6 border-2 rounded-lg transition-all ${
                    formData.role === "buyer" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-3xl mb-3">🛒</div>
                  <h3 className="font-semibold text-lg">Buyer</h3>
                  <p className="text-sm text-muted-foreground mt-2">Discover fresh crops from verified farmers</p>
                </motion.button>

                {/* Location field */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Your city or region"
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">You're all set!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-primary/10 rounded-lg p-6 flex flex-col items-center text-center">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.6 }}>
                    <CheckCircle className="w-16 h-16 text-primary mb-4" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">Account Created Successfully</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Welcome to the CropTrust community, {formData.name}!
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3 text-sm">
                  <p>
                    <strong>Name:</strong> {formData.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {formData.role === "farmer" ? "🚜 Farmer" : "🛒 Buyer"}
                  </p>
                  <p>
                    <strong>Location:</strong> {formData.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Navigation buttons */}
        <div className="mt-8 flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={handleNext} className={step > 1 ? "flex-1" : "w-full"}>
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="w-full">
              Go to Dashboard
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Sign in link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}