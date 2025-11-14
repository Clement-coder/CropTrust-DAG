"use client";

import { useState, useEffect, useMemo } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useCropTrust } from "./use-croptrust";
import { useQueryClient, useQueries } from "@tanstack/react-query";
import { readContract } from "@wagmi/core";
import { config } from "@/app/config/wagmi";
import { cropTrustAbi } from "../src/generated";
import { useReadCropTrustTotalCrops } from "../src/generated";

export interface Listing {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  imageUrl: string;
  seller: string;
  isListed: boolean;
  status: "active" | "sold out";
  views: number;
  inquiries: number;
  createdAt: string;
}

export function useListings() {
  const { user } = usePrivy();
  const { listCrop, isListCropConfirmed, isListingCrop, listCropError } =
    useCropTrust();

  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState(true);
  const [listingsError, setListingsError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    data: totalCropsData,
    isLoading: isLoadingTotalCrops,
    error: totalCropsError,
  } = useReadCropTrustTotalCrops();

  // Compute crop IDs
  const cropIds = useMemo(() => {
    if (!totalCropsData) return [];
    return Array.from({ length: Number(totalCropsData) }, (_, i) => i + 1);
  }, [totalCropsData]);

  // Fetch all crops
  const cropQueries = useQueries({
    queries: cropIds.map((id) => ({
      queryKey: ["crop", id],
      queryFn: async () => {
        try {
          const crop = await readContract(config, {
            abi: cropTrustAbi,
            address: process.env.NEXT_PUBLIC_CROPTRUST_CONTRACT as `0x${string}`,
            functionName: "getCrop",
            args: [BigInt(id)],
          });
          return crop;
        } catch (err) {
          console.error(`Error fetching crop ${id}:`, err);
          throw err;
        }
      },
      enabled: !!id,
    })),
  });

  // Build listings when all crops loaded
  useEffect(() => {
    if (isLoadingTotalCrops) {
      setIsLoadingListings(true);
      return;
    }

    if (totalCropsError) {
      setListingsError(totalCropsError.message);
      setIsLoadingListings(false);
      return;
    }

    if (cropQueries.length === 0) {
      setListings([]);
      setIsLoadingListings(false);
      return;
    }

    const allLoaded = cropQueries.every((q) => !q.isLoading && !q.isFetching);
    if (!allLoaded) return;

    const anyError = cropQueries.some((q) => q.isError);
    if (anyError) setListingsError("Failed to load some crops");

    const fetchedListings: Listing[] = cropQueries
      .map((q, i) => {
        const crop = q.data as any;
        if (!crop) return null;

        const [id, name, description, price, quantity, imageUrl, seller, isListed] =
          Object.values(crop);

        return {
          id: Number(id ?? i + 1),
          name: name || "Unnamed Crop",
          description: description || "No description provided",
          price: Number(price ?? 0),
          quantity: Number(quantity ?? 0),
          imageUrl: imageUrl || "/placeholder.jpg",
          seller: seller || "Unknown",
          isListed: Boolean(isListed),
          status: isListed && Number(quantity) > 0 ? "active" : "sold out",
          views: 0,
          inquiries: 0,
          createdAt: new Date().toISOString(),
        };
      })
      .filter(Boolean) as Listing[];

    setListings(fetchedListings);
    setIsLoadingListings(false);
  }, [isLoadingTotalCrops, totalCropsError, cropQueries]);

  // Re-fetch crops after a successful listing
  useEffect(() => {
    if (isListCropConfirmed) {
      console.log("✅ Crop listed successfully!");
      queryClient.invalidateQueries({ queryKey: ["totalCrops"] });
      queryClient.invalidateQueries({ queryKey: ["crop"] });
    }
  }, [isListCropConfirmed, queryClient]);

  // Add a new listing (on-chain)
  const addListing = async (
    newListing: Omit<
      Listing,
      "id" | "views" | "inquiries" | "seller" | "isListed" | "status" | "createdAt"
    >
  ) => {
    if (!user?.wallet) {
      console.error("User not authenticated or wallet not connected.");
      return;
    }

    try {
      await listCrop({
        address: process.env.NEXT_PUBLIC_CROPTRUST_CONTRACT as `0x${string}`,
        args: [
          newListing.name,
          newListing.description,
          BigInt(newListing.price),
          BigInt(newListing.quantity),
          newListing.imageUrl,
        ],
      });
    } catch (error) {
      console.error("Error listing crop:", error);
    }
  };

  const updateListing = (updatedListing: Listing) => {
    setListings((prev) =>
      prev.map((l) => (l.id === updatedListing.id ? updatedListing : l))
    );
  };

  const deleteListing = (id: number) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  const addPurchasedItems = (purchasedItems: any[]) => {
    console.warn(
      "⚠️ addPurchasedItems() needs to be updated for smart contract integration."
    );
  };

  return {
    listings,
    addListing,
    updateListing,
    deleteListing,
    addPurchasedItems,
    isListingCrop,
    listCropError,
    isLoadingListings,
    listingsError,
  };
}
