// Re-export types from backend.d.ts
export type {
  FoodItem,
  FoodItemId,
  FoodItemInput,
  OperatingHours,
  Order,
  OrderId,
  OrderInput,
  OrderItem,
  OrderItemInput,
  Restaurant,
  RestaurantId,
  RestaurantInput,
  RestaurantRatingStats,
  RestaurantSummary,
  Review,
  ReviewId,
  ReviewInput,
  SearchFilters,
  Timestamp,
  UserId,
  UserProfile,
  UserProfileInput,
  ShoppingItem,
  StripeSessionStatus,
  StripeConfiguration,
} from "../backend.d.ts";

// Re-export enums as values (not just types)
export {
  DietaryTag,
  OrderStatus,
  PaymentStatus,
  SortOption,
  UserRole,
} from "../backend";

export interface CartItem {
  foodItemId: bigint;
  name: string;
  price: bigint;
  quantity: number;
  image: string;
  restaurantId: bigint;
  restaurantName: string;
}

export interface CartState {
  items: CartItem[];
  restaurantId: bigint | null;
  restaurantName: string;
}

export type FilterState = {
  searchQuery: string;
  cuisineType: string;
  sortBy: string;
  minRating: number;
};
