"use client"

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react"
import { useListings, type Listing } from "./use-listings"
import { usePrivy } from "@privy-io/react-auth"

export interface Product extends Listing {
  // All fields from Listing are inherited
  // Add any additional fields specific to Product if needed, e.g.,
  // farmer: string; // This can be derived from listing.seller
  // location: string; // This can be a static value or derived
  rating: number
  reviews: number
  isOwner: boolean
  inStock?: boolean
}

interface ProductContextType {
  products: Product[]
  updateProductQuantity: (productId: number, quantity: number) => void // Changed productId to number
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function useProducts() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const { listings } = useListings()
  const { user } = usePrivy()
  const [products, setProducts] = useState<Product[]>([])

  // Placeholder for current user ID - replace with actual user ID from auth context
  const currentUserId = user?.wallet?.address || ""

  useEffect(() => {
    const combinedProducts: Product[] = listings.map((listing) => {
      const isOwner = listing.seller === currentUserId

      return {
        ...listing,
        rating: 4.5, // Placeholder
        reviews: 100, // Placeholder
        isOwner,
        inStock: listing.isListed && listing.quantity > 0,
      }
    })

    setProducts(combinedProducts)
  }, [listings, currentUserId])

  const updateProductQuantity = (productId: number, quantity: number) => { // Changed productId to number
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity - quantity } : p,
      ),
    )
  }

  const value = {
    products,
    updateProductQuantity,
  }

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}
