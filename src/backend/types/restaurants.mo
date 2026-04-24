import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type OperatingHours = {
    openTime : Text;
    closeTime : Text;
    daysOpen : [Text];
  };

  public type Restaurant = {
    id : Common.RestaurantId;
    name : Text;
    description : Text;
    cuisineType : Text;
    image : Storage.ExternalBlob;
    address : Text;
    phone : Text;
    operatingHours : OperatingHours;
    deliveryTimeMinutes : Nat;
    deliveryFee : Nat;
    minimumOrder : Nat;
    isActive : Bool;
    ownerId : Common.UserId;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type RestaurantInput = {
    name : Text;
    description : Text;
    cuisineType : Text;
    image : Storage.ExternalBlob;
    address : Text;
    phone : Text;
    operatingHours : OperatingHours;
    deliveryTimeMinutes : Nat;
    deliveryFee : Nat;
    minimumOrder : Nat;
    ownerId : Common.UserId;
  };

  public type RestaurantSummary = {
    id : Common.RestaurantId;
    name : Text;
    cuisineType : Text;
    image : Storage.ExternalBlob;
    deliveryTimeMinutes : Nat;
    deliveryFee : Nat;
    minimumOrder : Nat;
    averageRating : Float;
    reviewCount : Nat;
    isActive : Bool;
  };

  public type FoodItem = {
    id : Common.FoodItemId;
    restaurantId : Common.RestaurantId;
    name : Text;
    description : Text;
    image : Storage.ExternalBlob;
    price : Nat;
    category : Text;
    dietaryTags : [Common.DietaryTag];
    isAvailable : Bool;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type FoodItemInput = {
    restaurantId : Common.RestaurantId;
    name : Text;
    description : Text;
    image : Storage.ExternalBlob;
    price : Nat;
    category : Text;
    dietaryTags : [Common.DietaryTag];
  };

  public type SearchFilters = {
    searchQuery : ?Text;
    cuisineType : ?Text;
    category : ?Text;
    minPrice : ?Nat;
    maxPrice : ?Nat;
    minRating : ?Float;
    dietaryTags : [Common.DietaryTag];
    sortBy : ?SortOption;
  };

  public type SortOption = {
    #rating;
    #deliveryTime;
    #priceAsc;
    #priceDesc;
  };
};
