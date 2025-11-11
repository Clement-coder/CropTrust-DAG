"use client"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Eye, Tag, Scale, DollarSign, Image as ImageIcon } from "lucide-react"
import { useListings, Listing } from "@/hooks/use-listings"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { ConfirmationModal } from "@/components/ui/confirmation-modal"
import { useState } from "react"

export default function ListingsPage() {
  const { listings, addListing, updateListing, deleteListing } = useListings()
  const [isNewListingDialogOpen, setIsNewListingDialogOpen] = useState(false)
  const [newListing, setNewListing] = useState<Omit<Listing, "id" | "views" | "inquiries" | "ownerId" | "createdAt">>({
    name: "",
    quantity: "",
    price: "",
    status: "active", // Added status
    image: "", // Added image
  })
  const [editingListing, setEditingListing] = useState<Listing | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [shake, setShake] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [listingToDeleteId, setListingToDeleteId] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        if (editingListing) {
          setEditingListing({ ...editingListing, image: reader.result as string })
        } else {
          setNewListing({ ...newListing, image: reader.result as string })
        }
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
      if (editingListing) {
        setEditingListing({ ...editingListing, image: undefined })
      } else {
        setNewListing({ ...newListing, image: undefined })
      }
    }
  }

  const validateAndSubmit = () => {
    const currentListing = editingListing || newListing
    if (!currentListing.name || !currentListing.quantity || !currentListing.price) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    if (editingListing) {
      handleUpdateListing()
    } else {
      handleAddListing()
    }
  }

  const handleAddListing = () => {
    // Placeholder for current user ID - replace with actual user ID from auth context
    const currentUserId = "user-123"
    addListing(newListing, currentUserId)
    setNewListing({ name: "", quantity: "", price: "", status: "active", image: "" })
    setImagePreview(null)
    setIsNewListingDialogOpen(false)
  }

  const handleEditListing = (listing: Listing) => {
    setEditingListing(listing)
    setImagePreview(listing.image || null)
    setIsNewListingDialogOpen(true)
  }

  const handleUpdateListing = () => {
    if (editingListing) {
      updateListing(editingListing)
      setEditingListing(null)
      setImagePreview(null)
      setIsNewListingDialogOpen(false)
    }
  }

  const handleDeleteClick = (id: string) => {
    setListingToDeleteId(id)
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = () => {
    if (listingToDeleteId) {
      deleteListing(listingToDeleteId)
      setListingToDeleteId(null)
      setShowDeleteConfirm(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            className="text-3xl font-bold text-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            My Listings
          </motion.h1>
          <Button onClick={() => {
            setEditingListing(null)
            setNewListing({ name: "", quantity: "", price: "", status: "active" })
            setImagePreview(null)
            setIsNewListingDialogOpen(true)
          }}>
            <Plus size={18} />
            New Listing
          </Button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Active Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Image</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Product</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Quantity</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Views</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Inquiries</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.filter(l => l.status === 'active').length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-8 text-muted-foreground">
                          No active listings yet. Click "New Listing" to add one.
                        </td>
                      </tr>
                    ) : (
                      listings.filter(l => l.status === 'active').map((listing, index) => (
                        <motion.tr
                          key={listing.id}
                          className="border-b border-border hover:bg-muted/50 transition"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <td className="py-4 px-4">
                            {listing.image ? (
                              <img src={listing.image} alt={listing.name} className="w-16 h-16 object-cover rounded-md" />
                            ) : (
                              <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                                <ImageIcon size={24} />
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-4">{listing.name}</td>
                          <td className="py-4 px-4 text-muted-foreground">{listing.quantity}</td>
                          <td className="py-4 px-4 font-semibold text-primary">${listing.price}</td>
                          <td className="py-4 px-4">
                            <span
                              className={`text-xs px-3 py-1 rounded-full font-medium ${
                                listing.status === "active"
                                  ? "bg-success/10 text-success"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {listing.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 flex items-center gap-1">
                            <Eye size={16} className="text-muted-foreground" />
                            {listing.views}
                          </td>
                          <td className="py-4 px-4">{listing.inquiries}</td>
                          <td className="py-4 px-4 flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditListing(listing)}>
                              <Edit size={16} />
                            </Button>
                            <Button size="sm" variant="outline" className="text-destructive bg-transparent" onClick={() => handleDeleteClick(listing.id)}>
                              <Trash2 size={16} />
                            </Button>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>My Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Image</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Product</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Quantity</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.filter(l => l.status === 'sold out').length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-muted-foreground">
                          You haven't purchased any items yet.
                        </td>
                      </tr>
                    ) : (
                      listings.filter(l => l.status === 'sold out').map((listing, index) => (
                        <motion.tr
                          key={listing.id}
                          className="border-b border-border hover:bg-muted/50 transition"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <td className="py-4 px-4">
                            {listing.image ? (
                              <img src={listing.image} alt={listing.name} className="w-16 h-16 object-cover rounded-md" />
                            ) : (
                              <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                                <ImageIcon size={24} />
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-4">{listing.name}</td>
                          <td className="py-4 px-4 text-muted-foreground">{listing.quantity}</td>
                          <td className="py-4 px-4 font-semibold text-primary">${listing.price}</td>
                          <td className="py-4 px-4">
                            <span
                              className={`text-xs px-3 py-1 rounded-full font-medium bg-muted text-muted-foreground`}
                            >
                              Purchased
                            </span>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Dialog open={isNewListingDialogOpen} onOpenChange={setIsNewListingDialogOpen}>
        <DialogContent className={`sm:max-w-lg ${shake ? 'shake' : ''}`}>
          <DialogHeader>
            <DialogTitle>{editingListing ? "Edit Listing" : "New Listing"}</DialogTitle>
            <DialogDescription>
              {editingListing ? 'Make changes to your listing here.' : 'Add a new product listing to the marketplace.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Product Name
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  id="name"
                  value={editingListing ? editingListing.name : newListing.name}
                  onChange={(e) =>
                    editingListing
                      ? setEditingListing({ ...editingListing, name: e.target.value })
                      : setNewListing({ ...newListing, name: e.target.value })
                  }
                  className={`w-full pl-10 pr-3 py-2 border ${
                    shake && !(editingListing ? editingListing.name : newListing.name) ? 'border-destructive' : 'border-input'
                  } bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="quantity" className="text-sm font-medium text-foreground">
                Quantity
              </label>
              <div className="relative">
                <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  id="quantity"
                  type="number" // Changed to number type
                  value={editingListing ? editingListing.quantity : newListing.quantity}
                  onChange={(e) =>
                    editingListing
                      ? setEditingListing({ ...editingListing, quantity: e.target.value })
                      : setNewListing({ ...newListing, quantity: e.target.value })
                  }
                  className={`w-full pl-10 pr-3 py-2 border ${
                    shake && !(editingListing ? editingListing.quantity : newListing.quantity) ? 'border-destructive' : 'border-input'
                  } bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price" className="text-sm font-medium text-foreground">
                Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  id="price"
                  value={editingListing ? editingListing.price : newListing.price}
                  onChange={(e) =>
                    editingListing
                      ? setEditingListing({ ...editingListing, price: e.target.value })
                      : setNewListing({ ...newListing, price: e.target.value })
                  }
                  className={`w-full pl-10 pr-3 py-2 border ${
                    shake && !(editingListing ? editingListing.price : newListing.price) ? 'border-destructive' : 'border-input'
                  } bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="image" className="text-sm font-medium text-foreground">
                Image
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full pl-10 pr-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            {imagePreview && (
              <div className="col-span-4 flex justify-center">
                <img src={imagePreview} alt="Image Preview" className="max-h-40 object-cover rounded-md" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={validateAndSubmit}>
              {editingListing ? "Save changes" : "Add Listing"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this listing? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
      />
    </DashboardLayout>
  )
}
