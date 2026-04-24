import { useCartContext } from "../context/CartContext";
import type { FoodItemId, RestaurantId } from "../types";

export function useCart() {
  const {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
  } = useCartContext();

  const getItemQuantity = (foodItemId: FoodItemId): number => {
    return cart.items.find((i) => i.foodItemId === foodItemId)?.quantity ?? 0;
  };

  const isFromDifferentRestaurant = (restaurantId: RestaurantId): boolean => {
    return cart.restaurantId !== null && cart.restaurantId !== restaurantId;
  };

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    getItemQuantity,
    isFromDifferentRestaurant,
  };
}
