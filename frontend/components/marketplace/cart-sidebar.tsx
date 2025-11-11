import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart.tsx"
import Image from "next/image"
import { X, Trash2, Minus, Plus, ShoppingCart } from "lucide-react"
import { CheckoutModals } from "./checkout-modals"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const sidebarVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, removeFromCart, updateItemQuantity, calculateTotal, getCartCount } = useCart()
  const [isCheckoutOpen, setCheckoutOpen] = useState(false)

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateItemQuantity(itemId, newQuantity)
  }

  const handleCheckout = () => {
    setCheckoutOpen(true)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.div
              className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-card shadow-lg flex flex-col z-50"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Cart ({getCartCount()})</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X size={20} />
                </Button>
              </div>
              <div className="p-4 flex-1 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingCart size={48} className="text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">Your cart is empty</h3>
                    <p className="text-muted-foreground">
                      Looks like you haven't added anything to your cart yet.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-md"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center rounded-md">
                              <span className="text-xl">🌾</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-foreground">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">${item.price} each</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </Button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10 ml-auto"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-4 border-t space-y-4 bg-background/50">
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <CheckoutModals
        isOpen={isCheckoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  )
}
