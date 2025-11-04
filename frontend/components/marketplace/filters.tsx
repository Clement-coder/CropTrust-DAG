"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  priceRange: [number, number]
  cropType: string
  location: string
  rating: number
  inStockOnly: boolean
}

import { useMedia } from "use-media";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// ... (rest of the component code)

export function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100000],
    cropType: "",
    location: "",
    rating: 0,
    inStockOnly: false,
  });

  const [expanded, setExpanded] = useState({
    price: true,
    crop: true,
    location: false,
    rating: false,
  });

  const isSmallScreen = useMedia({ maxWidth: "1024px" });

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  };

  const cropTypes = ["Tomatoes", "Maize", "Lettuce", "Carrots", "Onions", "Peppers"];
  const locations = ["Lagos", "Kano", "Ibadan", "Abuja", "Port Harcourt"];

  const filterContent = (
    <div className="space-y-4">
      {/* In Stock Only */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="inStock"
          checked={filters.inStockOnly}
          onChange={(e) => handleFilterChange({ inStockOnly: e.target.checked })}
          className="w-4 h-4 rounded cursor-pointer accent-primary"
        />
        <label htmlFor="inStock" className="ml-2 cursor-pointer text-sm">
          In Stock Only
        </label>
      </div>

      {/* Crop Type */}
      <div>
        <button
          className="flex items-center justify-between w-full mb-2"
          onClick={() => setExpanded((prev) => ({ ...prev, crop: !prev.crop }))}
        >
          <span className="font-semibold text-sm">Crop Type</span>
          <ChevronDown size={16} className={`transition ${expanded.crop ? "rotate-180" : ""}`} />
        </button>
        {expanded.crop && (
          <div className="space-y-2 ml-2">
            {cropTypes.map((crop) => (
              <label key={crop} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="crop"
                  value={crop}
                  checked={filters.cropType === crop}
                  onChange={() => handleFilterChange({ cropType: crop })}
                  className="w-4 h-4 accent-primary"
                />
                <span className="ml-2 text-sm">{crop}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Location */}
      <div>
        <button
          className="flex items-center justify-between w-full mb-2"
          onClick={() => setExpanded((prev) => ({ ...prev, location: !prev.location }))}
        >
          <span className="font-semibold text-sm">Location</span>
          <ChevronDown size={16} className={`transition ${expanded.location ? "rotate-180" : ""}`} />
        </button>
        {expanded.location && (
          <div className="space-y-2 ml-2">
            {locations.map((loc) => (
              <label key={loc} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  value={loc}
                  checked={filters.location === loc}
                  onChange={() => handleFilterChange({ location: loc })}
                  className="w-4 h-4 accent-primary"
                />
                <span className="ml-2 text-sm">{loc}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Min Rating */}
      <div>
        <button
          className="flex items-center justify-between w-full mb-2"
          onClick={() => setExpanded((prev) => ({ ...prev, rating: !prev.rating }))}
        >
          <span className="font-semibold text-sm">Min. Rating</span>
          <ChevronDown size={16} className={`transition ${expanded.rating ? "rotate-180" : ""}`} />
        </button>
        {expanded.rating && (
          <div className="space-y-2 ml-2">
            {[4.5, 4, 3.5, 3].map((rate) => (
              <label key={rate} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rate}
                  checked={filters.rating === rate}
                  onChange={() => handleFilterChange({ rating: rate })}
                  className="w-4 h-4 accent-primary"
                />
                <span className="ml-2 text-sm">{rate}+ Stars</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (isSmallScreen) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">Filters</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
          </DialogHeader>
          {filterContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        {filterContent}
      </CardContent>
    </Card>
  );
}
