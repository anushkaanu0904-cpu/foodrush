import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import RestaurantLib "../lib/restaurants";
import RestaurantTypes "../types/restaurants";
import ReviewTypes "../types/reviews";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  restaurants : Map.Map<Common.RestaurantId, RestaurantTypes.Restaurant>,
  foodItems : Map.Map<Common.FoodItemId, RestaurantTypes.FoodItem>,
  reviewStats : Map.Map<Common.RestaurantId, ReviewTypes.RestaurantRatingStats>,
  counters : Map.Map<Text, Nat>,
) {
  func nextRestaurantId(key : Text) : Nat {
    let current = switch (counters.get(key)) {
      case null 1;
      case (?n) n;
    };
    counters.add(key, current + 1);
    current;
  };

  public query func listRestaurants(filters : ?RestaurantTypes.SearchFilters) : async [RestaurantTypes.RestaurantSummary] {
    RestaurantLib.listRestaurants(restaurants, reviewStats, filters);
  };

  public query func getRestaurant(restaurantId : Common.RestaurantId) : async ?RestaurantTypes.Restaurant {
    RestaurantLib.getRestaurant(restaurants, reviewStats, restaurantId);
  };

  public shared ({ caller }) func createRestaurant(input : RestaurantTypes.RestaurantInput) : async Common.RestaurantId {
    RestaurantLib.createRestaurant(restaurants, nextRestaurantId("restaurant"), accessControlState, caller, input);
  };

  public shared ({ caller }) func updateRestaurant(restaurantId : Common.RestaurantId, input : RestaurantTypes.RestaurantInput) : async () {
    RestaurantLib.updateRestaurant(restaurants, accessControlState, caller, restaurantId, input);
  };

  public shared ({ caller }) func deleteRestaurant(restaurantId : Common.RestaurantId) : async () {
    RestaurantLib.deleteRestaurant(restaurants, accessControlState, caller, restaurantId);
  };

  public query func listFoodItems(restaurantId : Common.RestaurantId) : async [RestaurantTypes.FoodItem] {
    RestaurantLib.listFoodItems(foodItems, restaurantId);
  };

  public query func getFoodItem(foodItemId : Common.FoodItemId) : async ?RestaurantTypes.FoodItem {
    RestaurantLib.getFoodItem(foodItems, foodItemId);
  };

  public shared ({ caller }) func createFoodItem(input : RestaurantTypes.FoodItemInput) : async Common.FoodItemId {
    RestaurantLib.createFoodItem(foodItems, restaurants, nextRestaurantId("foodItem"), accessControlState, caller, input);
  };

  public shared ({ caller }) func updateFoodItem(foodItemId : Common.FoodItemId, input : RestaurantTypes.FoodItemInput) : async () {
    RestaurantLib.updateFoodItem(foodItems, restaurants, accessControlState, caller, foodItemId, input);
  };

  public shared ({ caller }) func deleteFoodItem(foodItemId : Common.FoodItemId) : async () {
    RestaurantLib.deleteFoodItem(foodItems, restaurants, accessControlState, caller, foodItemId);
  };

  public query func searchFoodItems(filters : RestaurantTypes.SearchFilters) : async [RestaurantTypes.FoodItem] {
    RestaurantLib.searchFoodItems(foodItems, filters);
  };
};
