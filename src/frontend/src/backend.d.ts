import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type OrderId = bigint;
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface OrderItem {
    name: string;
    foodItemId: FoodItemId;
    quantity: bigint;
    price: bigint;
}
export interface OrderInput {
    deliveryAddress: string;
    restaurantId: RestaurantId;
    specialInstructions: string;
    phone: string;
    items: Array<OrderItemInput>;
    stripeSessionId?: string;
}
export interface OrderItemInput {
    foodItemId: FoodItemId;
    quantity: bigint;
}
export interface RestaurantInput {
    deliveryFee: bigint;
    ownerId: UserId;
    name: string;
    cuisineType: string;
    description: string;
    deliveryTimeMinutes: bigint;
    address: string;
    minimumOrder: bigint;
    image: ExternalBlob;
    phone: string;
    operatingHours: OperatingHours;
}
export type RestaurantId = bigint;
export interface RestaurantRatingStats {
    restaurantId: RestaurantId;
    averageRating: number;
    reviewCount: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface FoodItem {
    id: FoodItemId;
    name: string;
    createdAt: Timestamp;
    isAvailable: boolean;
    description: string;
    restaurantId: RestaurantId;
    updatedAt: Timestamp;
    dietaryTags: Array<DietaryTag>;
    category: string;
    image: ExternalBlob;
    price: bigint;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type ReviewId = bigint;
export interface OperatingHours {
    closeTime: string;
    daysOpen: Array<string>;
    openTime: string;
}
export interface Review {
    id: ReviewId;
    customerName: string;
    createdAt: Timestamp;
    orderId: OrderId;
    restaurantId: RestaurantId;
    comment: string;
    customerId: UserId;
    rating: bigint;
}
export interface SearchFilters {
    minRating?: number;
    sortBy?: SortOption;
    cuisineType?: string;
    maxPrice?: bigint;
    dietaryTags: Array<DietaryTag>;
    category?: string;
    minPrice?: bigint;
    searchQuery?: string;
}
export type FoodItemId = bigint;
export interface Restaurant {
    id: RestaurantId;
    deliveryFee: bigint;
    ownerId: UserId;
    name: string;
    createdAt: Timestamp;
    cuisineType: string;
    description: string;
    isActive: boolean;
    deliveryTimeMinutes: bigint;
    updatedAt: Timestamp;
    address: string;
    minimumOrder: bigint;
    image: ExternalBlob;
    phone: string;
    operatingHours: OperatingHours;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    taxes: bigint;
    deliveryAddress: string;
    total: bigint;
    paymentStatus: PaymentStatus;
    deliveryFee: bigint;
    createdAt: Timestamp;
    restaurantId: RestaurantId;
    updatedAt: Timestamp;
    specialInstructions: string;
    restaurantName: string;
    customerId: UserId;
    phone: string;
    items: Array<OrderItem>;
    stripeSessionId?: string;
    subtotal: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = Principal;
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface FoodItemInput {
    name: string;
    description: string;
    restaurantId: RestaurantId;
    dietaryTags: Array<DietaryTag>;
    category: string;
    image: ExternalBlob;
    price: bigint;
}
export interface RestaurantSummary {
    id: RestaurantId;
    deliveryFee: bigint;
    name: string;
    cuisineType: string;
    isActive: boolean;
    deliveryTimeMinutes: bigint;
    averageRating: number;
    minimumOrder: bigint;
    image: ExternalBlob;
    reviewCount: bigint;
}
export interface UserProfileInput {
    name: string;
    email: string;
    phone: string;
    defaultAddress: string;
}
export interface UserProfile {
    id: UserId;
    isDeleted: boolean;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    email: string;
    phone: string;
    defaultAddress: string;
}
export interface ReviewInput {
    orderId: OrderId;
    restaurantId: RestaurantId;
    comment: string;
    rating: bigint;
}
export enum DietaryTag {
    veg = "veg",
    halal = "halal",
    vegan = "vegan",
    dairy_free = "dairy_free",
    spicy = "spicy",
    gluten_free = "gluten_free"
}
export enum OrderStatus {
    preparing = "preparing",
    cancelled = "cancelled",
    pending = "pending",
    out_for_delivery = "out_for_delivery",
    delivered = "delivered"
}
export enum PaymentStatus {
    pending = "pending",
    paid = "paid",
    refunded = "refunded",
    failed = "failed"
}
export enum SortOption {
    deliveryTime = "deliveryTime",
    priceDesc = "priceDesc",
    rating = "rating",
    priceAsc = "priceAsc"
}
export enum UserRole {
    admin = "admin",
    customer = "customer",
    restaurant_owner = "restaurant_owner"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    assignUserRole(userId: UserId, role: UserRole): Promise<void>;
    confirmOrderPayment(sessionId: string): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createFoodItem(input: FoodItemInput): Promise<FoodItemId>;
    createRestaurant(input: RestaurantInput): Promise<RestaurantId>;
    deleteFoodItem(foodItemId: FoodItemId): Promise<void>;
    deleteRestaurant(restaurantId: RestaurantId): Promise<void>;
    deleteReview(reviewId: ReviewId): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole__1>;
    getFoodItem(foodItemId: FoodItemId): Promise<FoodItem | null>;
    getOrder(orderId: OrderId): Promise<Order | null>;
    getRestaurant(restaurantId: RestaurantId): Promise<Restaurant | null>;
    getRestaurantRatingStats(restaurantId: RestaurantId): Promise<RestaurantRatingStats | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(userId: UserId): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listAllOrders(restaurantFilter: RestaurantId | null, statusFilter: OrderStatus | null): Promise<Array<Order>>;
    listAllReviews(): Promise<Array<Review>>;
    listFoodItems(restaurantId: RestaurantId): Promise<Array<FoodItem>>;
    listMyOrders(statusFilter: OrderStatus | null): Promise<Array<Order>>;
    listRestaurantReviews(restaurantId: RestaurantId): Promise<Array<Review>>;
    listRestaurants(filters: SearchFilters | null): Promise<Array<RestaurantSummary>>;
    listUsers(roleFilter: UserRole | null): Promise<Array<UserProfile>>;
    placeOrder(input: OrderInput): Promise<OrderId>;
    postReview(input: ReviewInput): Promise<ReviewId>;
    saveCallerUserProfile(input: UserProfileInput): Promise<void>;
    searchFoodItems(filters: SearchFilters): Promise<Array<FoodItem>>;
    seedSampleData(): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    softDeleteUser(userId: UserId): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateFoodItem(foodItemId: FoodItemId, input: FoodItemInput): Promise<void>;
    updateOrderStatus(orderId: OrderId, newStatus: OrderStatus): Promise<void>;
    updateRestaurant(restaurantId: RestaurantId, input: RestaurantInput): Promise<void>;
}
