"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { CropCard } from "@/components/marketplace/crop-card"
import { Filters, type FilterState } from "@/components/marketplace/filters"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Search, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react" // Added ShoppingCart icon
import { useListings } from "@/hooks/use-listings"
import { useCart } from "@/hooks/use-cart"
import { ContactFarmerModal } from "@/components/marketplace/contact-farmer-modal"
import { CartSidebar } from "@/components/marketplace/cart-sidebar" // Imported CartSidebar

export default function MarketplacePage() {
  const { listings } = useListings()
  const { addToCart, cartItems } = useCart() // Get cartItems to display count

  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100000],
    cropType: "",
    location: "",
    rating: 0,
    inStockOnly: false,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const [showContactModal, setShowContactModal] = useState(false)
  const [contactFarmerName, setContactFarmerName] = useState("")
  const [contactCropName, setContactCropName] = useState("")
  const [isCartOpen, setIsCartOpen] = useState(false) // State for cart sidebar

  // Placeholder for current user ID - replace with actual user ID from auth context
  const currentUserId = "user-123"

  const handleContactClick = (farmer: string, crop: string) => {
    setContactFarmerName(farmer)
    setContactCropName(crop)
    setShowContactModal(true)
  }

const marketplaceCrops = listings.map((listing) => {
  const ownerId = listing?.ownerId || ""; // fallback if undefined
  const isOwner = ownerId === currentUserId;

  return {
    id: listing.id,
    name: listing.name,
    farmer: isOwner
      ? "You"
      : ownerId
      ? `Farmer ${ownerId.slice(-4)}`
      : "Unknown Farmer", // fallback name
    location: "Local",
    price: listing.price,
    quantity: listing.quantity,
    rating: 4.5,
    reviews: 100,
    image: listing.image || "",
    inStock: listing.status === "active",
    ownerId,
    isOwner,
    createdAt: listing.createdAt,
  };
});


  // Apply filters
  const filteredCrops = marketplaceCrops.filter((crop) => {
    const matchesSearch =
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.farmer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCrop = !filters.cropType || crop.name.includes(filters.cropType)
    const matchesLocation = !filters.location || crop.location.includes(filters.location)
    const matchesRating = crop.rating >= filters.rating
    const matchesStock = !filters.inStockOnly || crop.inStock

    return matchesSearch && matchesCrop && matchesLocation && matchesRating && matchesStock
  })

  const totalPages = Math.ceil(filteredCrops.length / itemsPerPage)
  const paginatedCrops = filteredCrops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <motion.h1
          className="text-3xl font-bold text-foreground mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Marketplace
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div>
            <Filters onFilterChange={setFilters} />
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Search Bar and Cart Button */}
            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search crops..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button
                variant="outline"
                // size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              </Button>
            </div>

            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                {paginatedCrops.length > 0
                  ? (currentPage - 1) * itemsPerPage + 1
                  : 0}
                -
                {Math.min(currentPage * itemsPerPage, filteredCrops.length)} of{" "}
                {filteredCrops.length} products
              </p>
            </div>

            {/* Product Grid */}
            {paginatedCrops.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {paginatedCrops.map((crop) => (
                    <CropCard
                      key={crop.id}
                      {...crop}
                      addToCart={addToCart}
                      handleContactClick={handleContactClick}
                      isOwner={crop.isOwner} // Pass isOwner prop
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={16} />
                    </Button>

                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(totalPages, prev + 1)
                        )
                      }
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setFilters({
                      priceRange: [0, 100000],
                      cropType: "",
                      location: "",
                      rating: 0,
                      inStockOnly: false,
                    })
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Farmer Modal */}
      <ContactFarmerModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        farmerName={contactFarmerName}
        cropName={contactCropName}
      />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </DashboardLayout>
  )
}
