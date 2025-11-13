"use client"

import {
  createContext,
  useContext,
  type ReactNode,
} from "react"
import { useCart as useCartHook, type CartItem } from "./use-cart" // Rename to avoid conflict
import { Listing } from "./use-listings"

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Listing, quantity: number) => void
  removeFromCart: (itemId: number) => void // Changed itemId to number
  updateItemQuantity: (itemId: number, newQuantity: number) => void // Changed itemId to number
  clearCart: () => void
  calculateTotal: () => number
  getCartCount: () => number
  checkout: () => Promise<void> // Added checkout function
  isCheckingOut: boolean
  checkoutError: string | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCartHook(); // Use the renamed hook

  const value = {
    cartItems: cart.cartItems,
    addToCart: cart.addToCart,
    removeFromCart: cart.removeFromCart,
    clearCart: cart.clearCart,
    updateItemQuantity: cart.updateItemQuantity,
    calculateTotal: cart.calculateTotal,
    getCartCount: cart.getCartCount,
    checkout: cart.checkout,
    isCheckingOut: cart.isCheckingOut,
    checkoutError: cart.checkoutError,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
