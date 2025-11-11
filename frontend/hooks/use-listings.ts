import { useState, useEffect } from "react"

export interface Listing {
  id: string
  name: string
  quantity: string
  price: string
  status: "active" | "sold out"
  views: number
  inquiries: number
  image?: string
  ownerId: string
  createdAt: string // Added createdAt
}

const LOCAL_STORAGE_KEY = "my-listings"

export function useListings() {
  const [listings, setListings] = useState<Listing[]>(() => {
    try {
      const storedListings = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (storedListings) {
        return JSON.parse(storedListings)
      }
      // Dummy data for initial load if no listings in local storage
      return [
        {
          id: "crop-1",
          name: "Organic Tomatoes",
          quantity: "100 kg",
          price: "2.50",
          status: "active",
          views: 120,
          inquiries: 15,
          image: "/images/tomato.jpg", // Assuming you have some dummy images
          ownerId: "user-123", // Owned by current user
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        },
        {
          id: "crop-2",
          name: "Fresh Lettuce",
          quantity: "50 heads",
          price: "1.20",
          status: "active",
          views: 80,
          inquiries: 10,
          image: "/images/lettuce.jpg",
          ownerId: "user-456", // Owned by another user
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        },
        {
          id: "crop-3",
          name: "Sweet Potatoes",
          quantity: "200 kg",
          price: "1.80",
          status: "active",
          views: 150,
          inquiries: 20,
          image: "/images/sweet-potato.jpg",
          ownerId: "user-123", // Owned by current user
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        },
        {
          id: "crop-4",
          name: "Bell Peppers",
          quantity: "75 kg",
          price: "3.00",
          status: "sold out",
          views: 90,
          inquiries: 5,
          image: "/images/bell-pepper.jpg",
          ownerId: "user-789", // Owned by another user
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        },
        {
          id: "crop-5",
          name: "Organic Carrots",
          quantity: "120 kg",
          price: "1.00",
          status: "active",
          views: 110,
          inquiries: 12,
          image: "/images/carrot.jpg",
          ownerId: "user-456", // Owned by another user
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        },
        {
          id: "crop-6",
          name: "Cucumbers",
          quantity: "60 kg",
          price: "1.50",
          status: "active",
          views: 70,
          inquiries: 8,
          image: "/images/cucumber.jpg",
          ownerId: "user-123", // Owned by current user
          createdAt: new Date().toISOString(), // Today
        },
      ]
    } catch (error) {
      console.error("Failed to load listings from local storage", error)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listings))
    } catch (error) {
      console.error("Failed to save listings to local storage", error)
    }
  }, [listings])

  const addListing = (newListing: Omit<Listing, "id" | "views" | "inquiries" | "ownerId" | "createdAt">, ownerId: string) => {
    const listingWithId: Listing = {
      ...newListing,
      id: crypto.randomUUID(),
      views: 0,
      inquiries: 0,
      ownerId: ownerId,
      createdAt: new Date().toISOString(), // Assign current timestamp
    }
    setListings((prevListings) => [...prevListings, listingWithId])
  }

  const updateListing = (updatedListing: Listing) => {
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing.id === updatedListing.id ? updatedListing : listing
      )
    )
  }

  const deleteListing = (id: string) => {
    setListings((prevListings) => prevListings.filter((listing) => listing.id !== id))
  }

  const addPurchasedItems = (purchasedItems: any[]) => {
    const newPurchasedListings: Listing[] = purchasedItems.map((item) => ({
      ...item,
      id: crypto.randomUUID(),
      status: "sold out" as const,
      views: 0,
      inquiries: 0,
      ownerId: "user-123", // This should be the current user's ID
      createdAt: new Date().toISOString(),
    }))
    setListings((prevListings) => [...prevListings, ...newPurchasedListings])
  }

  return { listings, addListing, updateListing, deleteListing, addPurchasedItems }
}
