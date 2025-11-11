"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart.tsx"
import { useListings } from "@/hooks/use-listings"
import { CheckCircle, Loader, ShieldCheck, X } from "lucide-react"

interface CheckoutModalsProps {
  isOpen: boolean
  onClose: () => void
}

type CheckoutStep = "processing" | "escrow" | "confirmation"

export function CheckoutModals({ isOpen, onClose }: CheckoutModalsProps) {
  const { cartItems, clearCart, calculateTotal } = useCart()
  const { addPurchasedItems } = useListings()
  const [step, setStep] = useState<CheckoutStep>("processing")

  useEffect(() => {
    if (isOpen) {
      setStep("processing")
      const timer = setTimeout(() => {
        setStep("escrow")
      }, 3000) // Simulate processing time
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleConfirmOrder = () => {
    addPurchasedItems(cartItems)
    clearCart()
    setStep("confirmation")
  }

  const handleClose = () => {
    setStep("processing")
    onClose()
  }

  const renderModalContent = () => {
    switch (step) {
      case "processing":
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader className="w-16 h-16 text-primary" />
            </motion.div>
            <h2 className="mt-4 text-2xl font-semibold">
              Processing Transaction...
            </h2>
            <p className="mt-2 text-muted-foreground">
              Please wait while we securely process your payment.
            </p>
          </div>
        )
      case "escrow":
        return (
          <div className="p-8 text-center">
            <ShieldCheck className="w-16 h-16 mx-auto text-green-500" />
            <h2 className="mt-4 text-2xl font-semibold">
              Payment Locked in Escrow
            </h2>
            <p className="mt-2 text-muted-foreground">
              Your payment of ${calculateTotal().toFixed(2)} has been securely
              locked in our escrow service. The funds will be released to the
              seller only after you confirm receipt of your products.
            </p>
            <Button onClick={handleConfirmOrder} className="mt-6">
              Confirm and Place Order
            </Button>
          </div>
        )
      case "confirmation":
        return (
          <div className="p-8 text-center">
            <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
            <h2 className="mt-4 text-2xl font-semibold">Order Confirmed!</h2>
            <p className="mt-2 text-muted-foreground">
              Thank you for your purchase. Your order has been placed and the
              items have been added to your purchase history.
            </p>
            <Button onClick={handleClose} className="mt-6">
              Close
            </Button>
          </div>
        )
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-card rounded-lg shadow-xl w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="absolute top-4 right-4"
              >
                <X size={20} />
              </Button>
              {renderModalContent()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
