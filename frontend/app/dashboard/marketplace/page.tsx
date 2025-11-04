"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { CropCard } from "@/components/marketplace/crop-card"
import { Filters, type FilterState } from "@/components/marketplace/filters"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

const mockCrops = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    farmer: "Okafor Farms",
    location: "Lagos State",
    price: "₦8,500/kg",
    quantity: "500kg",
    rating: 4.8,
    reviews: 124,
    image: "",
    inStock: true,
  },
  {
    id: 2,
    name: "Organic Lettuce",
    farmer: "Green Valley",
    location: "Ibadan, Oyo",
    price: "₦3,200/bundle",
    quantity: "200 bundles",
    rating: 4.6,
    reviews: 89,
    image: "",
    inStock: true,
  },
  {
    id: 3,
    name: "Premium Carrots",
    farmer: "Root & Branch Co",
    location: "Kano",
    price: "₦5,000/kg",
    quantity: "300kg",
    rating: 4.9,
    reviews: 156,
    image: "",
    inStock: false,
  },
  {
    id: 4,
    name: "Sweet Corn",
    farmer: "Harvest King Farms",
    location: "Abuja FCT",
    price: "₦1,500/cob",
    quantity: "1000 cobs",
    rating: 4.5,
    reviews: 78,
    image: "",
    inStock: true,
  },
  {
    id: 5,
    name: "Red Bell Peppers",
    farmer: "Spice Garden",
    location: "Lagos State",
    price: "₦6,000/kg",
    quantity: "150kg",
    rating: 4.7,
    reviews: 102,
    image: "",
    inStock: true,
  },
  {
    id: 6,
    name: "White Onions",
    farmer: "Allium Traders",
    location: "Port Harcourt",
    price: "₦4,200/kg",
    quantity: "400kg",
    rating: 4.4,
    reviews: 64,
    image: "",
    inStock: true,
  },
  {
    id: 7,
    name: "Golden Maize",
    farmer: "Grain Masters",
    location: "Kano",
    price: "₦12,000/bag",
    quantity: "100 bags",
    rating: 4.8,
    reviews: 145,
    image: "",
    inStock: true,
  },
  {
    id: 8,
    name: "Spinach Bundle",
    farmer: "Leaf Produce",
    location: "Ibadan, Oyo",
    price: "₦2,500/bundle",
    quantity: "350 bundles",
    rating: 4.6,
    reviews: 91,
    image: "",
    inStock: true,
  },
]

export default function MarketplacePage() {
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

  const filteredCrops = mockCrops.filter((crop) => {
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
  const paginatedCrops = filteredCrops.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
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
            </div>

            {/* Results info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {paginatedCrops.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
                {Math.min(currentPage * itemsPerPage, filteredCrops.length)} of {filteredCrops.length} products
              </p>
            </div>

            {/* Products Grid */}
            {paginatedCrops.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {paginatedCrops.map((crop) => (
                    <CropCard key={crop.id} {...crop} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
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
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
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
    </DashboardLayout>
  )
}
