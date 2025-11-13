"use client";

import { useState, useEffect } from "react";
import { Listing } from "./use-listings";
import { useCropTrust } from "./use-croptrust";

export interface CartItem extends Omit<Listing, "quantity"> {
  quantity: number; // cart-specific quantity
}

export function useCart() {
  const {
    purchaseCrop,
    isPurchasingCrop,
    isPurchaseCropConfirmed,
    purchaseCropError,
  } = useCropTrust();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Clear cart on successful purchase
  useEffect(() => {
    if (isPurchaseCropConfirmed) {
      console.log("✅ Crop purchased successfully!");
      setCartItems([]);
    }
  }, [isPurchaseCropConfirmed]);

  // Add item to cart
  const addToCart = (item: Listing, quantityToAdd: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantityToAdd } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: quantityToAdd }];
      }
    });
  };

  // Update item quantity
  const updateItemQuantity = (itemId: number, newQuantity: number) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) return prevItems.filter((item) => item.id !== itemId);
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Clear entire cart
  const clearCart = () => setCartItems([]);

  // Calculate total price
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Get total quantity of items
  const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  // Checkout function
  const checkout = async () => {
    if (cartItems.length === 0) return;

    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      for (const item of cartItems) {
        await purchaseCrop({
          args: [item.id, BigInt(item.quantity)],
        });
      }
      // Cart will clear automatically on isPurchaseCropConfirmed
    } catch (error) {
      console.error("Error during checkout:", error);
      setCheckoutError("Failed to complete checkout.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateItemQuantity,
    calculateTotal,
    getCartCount,
    checkout,
    isCheckingOut,
    checkoutError,
    isPurchasingCrop,
    isPurchaseCropConfirmed,
    purchaseCropError,
  };
}
