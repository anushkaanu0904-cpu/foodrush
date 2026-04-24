import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Float "mo:core/Float";
import AccessControl "mo:caffeineai-authorization/access-control";
import RestaurantTypes "../types/restaurants";
import ReviewTypes "../types/reviews";
import Common "../types/common";

module {
  func matchesDietaryTags(itemTags : [Common.DietaryTag], filterTags : [Common.DietaryTag]) : Bool {
    if (filterTags.size() == 0) return true;
    filterTags.all(func(ft) {
      itemTags.any(func(it) {
        switch (it, ft) {
          case (#veg, #veg) true;
          case (#vegan, #vegan) true;
          case (#gluten_free, #gluten_free) true;
          case (#dairy_free, #dairy_free) true;
          case (#spicy, #spicy) true;
          case (#halal, #halal) true;
          case _ false;
        };
      });
    });
  };

  public func listRestaurants(
    restaurants : Map.Map<Common.RestaurantId, RestaurantTypes.Restaurant>,
    reviewStats : Map.Map<Common.RestaurantId, ReviewTypes.RestaurantRatingStats>,
    filters : ?RestaurantTypes.SearchFilters,
  ) : [RestaurantTypes.RestaurantSummary] {
    var iter = restaurants.values().filter(func(r) { r.isActive });

    switch (filters) {
      case null {};
      case (?f) {
        switch (f.searchQuery) {
          case null {};
          case (?sq) {
            let lower = sq.toLower();
            iter := iter.filter(func(r) {
              r.name.toLower().contains(#text lower) or r.cuisineType.toLower().contains(#text lower)
            });
          };
        };
        switch (f.cuisineType) {
          case null {};
          case (?ct) {
            iter := iter.filter(func(r) { r.cuisineType.toLower() == ct.toLower() });
          };
        };
      };
    };

    iter.map<RestaurantTypes.Restaurant, RestaurantTypes.RestaurantSummary>(func(r) {
      let stats = reviewStats.get(r.id);
      let (avgRating, reviewCount) = switch (stats) {
        case null (0.0, 0);
        case (?s) (s.averageRating, s.reviewCount);
      };
      {
        id = r.id;
        name = r.name;
        cuisineType = r.cuisineType;
        image = r.image;
        deliveryTimeMinutes = r.deliveryTimeMinutes;
        deliveryFee = r.deliveryFee;
        minimumOrder = r.minimumOrder;
        averageRating = avgRating;
        reviewCount = reviewCount;
        isActive = r.isActive;
      };
    }).toArray();
  };

  public func getRestaurant(
    restaurants : Map.Map<Common.RestaurantId, RestaurantTypes.Restaurant>,
    _reviewStats : Map.Map<Common.RestaurantId, ReviewTypes.RestaurantRatingStats>,
    restaurantId : Common.RestaurantId,
  ) : ?RestaurantTypes.Restaurant {
    restaurants.get(restaurantId);
  };

  public func createRestaurant(
    restaurants : Map.Map<Common.RestaurantId, RestaurantTypes.Restaurant>,
    nextId : Nat,
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
    input : RestaurantTypes.RestaurantInput,
  ) : Common.RestaurantId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create restaurants");
    };
    let now = Time.now();
    let restaurant : RestaurantTypes.Restaurant = {
      id = nextId;
      name = input.name;
      description = input.description;
      cuisineType = input.cuisineType;
      image = input.image;
      address = input.address;
      phone = input.phone;
      operatingHours = input.operatingHours;
      deliveryTimeMinutes = input.deliveryTimeMinutes;
      deliveryFee = input.deliveryFee;
      minimumOrder = input.minimumOrder;
      isActive = true;
      ownerId = input.ownerId;
      createdAt = now;
      updatedAt = now;
    };
    restaurants.add(nextId, restaurant);
    nextId;
  };

  public func updateRestaurant(
    restaurants : Map.Map<Common.RestaurantId, RestaurantTypes.Restaurant>,
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
    restaurantId : Common.RestaurantId,
    input : RestaurantTypes.RestaurantInput,
  ) : () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update restaurants");
    };
    switch (restaurants.get(restaurantId)) {
      case null { Runtime.trap("Restaurant not found") };
      case (?r) {
        restaurants.add(restaurantId, {
          r with
          name = input.name;
          description = input.description;
          cuisineType = input.cuisineType;
          image = input.image;
          address = input.address;
          phone = input.phone;
          operatingHours = input.operatingHours;
          deliveryTimeMinutes = input.deliveryTimeMinutes;
          deliveryFee = input.deliveryFee;
          minimumOrder = input.minimumOrder;
          ownerId = input.ownerId;
          updatedAt = Time.now();
        });
      };
    };
  };

  public func deleteRestaurant(
    restaurants : Map.Map<Common.RestaurantId, RestaurantTypes.Restaurant>,
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
    restaurantId : Common.RestaurantId,
  ) : () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete restaurants");
    };
    switch (restaurants.get(restaurantId)) {
      case null { Runtime.trap("Restaurant not found") };
      case (?r) {
        restaurants.add(restaurantId, { r with isActive = false; updatedAt = Time.now() });
      };
    };
  };

  public func listFoodItems(
    foodItems : Map.Map<Common.FoodItemId, RestaurantTypes.FoodItem>,
    restaurantId : Common.RestaurantId,
  ) : [RestaurantTypes.FoodItem] {
    foodItems.values().filter(func(fi) {
      fi.restaurantId == restaurantId and fi.isAvailable
    }).toArray();
  };

  public func getFoodItem(
    foodItems : Map.Map<Common.FoodItemId, RestaurantTypes.FoodItem>,
    foodItemId : Common.FoodItemId,
  ) : ?RestaurantTypes.FoodItem {
    foodItems.get(foodItemId);
  };

  public func createFoodItem(
    foodItems : Map.Map<Common.FoodItemId, RestaurantTypes.FoodItem>,
    restaurants : Map.Map<Common.RestaurantId, RestaurantTypes.Restaurant>,
    nextId : Nat,
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
    input : RestaurantTypes.FoodItemInput,
  ) : Common.FoodItemId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create food items");
    };
    switch (restaurants.get(input.restaurantId)) {
      case null { Runtime.trap("Restaurant not found") };
      case (?_) {};
    };
    let now = Time.now();
    let foodItem : RestaurantTypes.FoodItem = {
      id = nextId;
      restaurantId = input.restaurantId;
      name = input.name;
      description = input.description;
      image = input.image;
      price = input.price;
      category = input.category;
      dietaryTags = input.dietaryTags;
      isAvailable = true;
      createdAt = now;
      updatedAt = now;
    };
    foodItems.add(nextId, foodItem);
    nextId;
  };

  public func updateFoodItem(
    foodItems : Map.Map<Common.FoodItemId, RestaurantTypes.FoodItem>,
    _restaurants : Map.Map<Common.RestaurantId, RestaurantTypes.Restaurant>,
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
    foodItemId : Common.FoodItemId,
    input : RestaurantTypes.FoodItemInput,
  ) : () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update food items");
    };
    switch (foodItems.get(foodItemId)) {
      case null { Runtime.trap("Food item not found") };
      case (?fi) {
        foodItems.add(foodItemId, {
          fi with
          name = input.name;
          description = input.description;
          image = input.image;
          price = input.price;
          category = input.category;
          dietaryTags = input.dietaryTags;
          updatedAt = Time.now();
        });
      };
    };
  };

  public func deleteFoodItem(
    foodItems : Map.Map<Common.FoodItemId, RestaurantTypes.FoodItem>,
    _restaurants : Map.Map<Common.RestaurantId, RestaurantTypes.Restaurant>,
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
    foodItemId : Common.FoodItemId,
  ) : () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete food items");
    };
    switch (foodItems.get(foodItemId)) {
      case null { Runtime.trap("Food item not found") };
      case (?fi) {
        foodItems.add(foodItemId, { fi with isAvailable = false; updatedAt = Time.now() });
      };
    };
  };

  public func searchFoodItems(
    foodItems : Map.Map<Common.FoodItemId, RestaurantTypes.FoodItem>,
    filters : RestaurantTypes.SearchFilters,
  ) : [RestaurantTypes.FoodItem] {
    var iter = foodItems.values().filter(func(fi) { fi.isAvailable });

    switch (filters.searchQuery) {
      case null {};
      case (?sq) {
        let lower = sq.toLower();
        iter := iter.filter(func(fi) {
          fi.name.toLower().contains(#text lower) or fi.description.toLower().contains(#text lower)
        });
      };
    };
    switch (filters.category) {
      case null {};
      case (?cat) {
        iter := iter.filter(func(fi) { fi.category.toLower() == cat.toLower() });
      };
    };
    switch (filters.minPrice) {
      case null {};
      case (?minP) {
        iter := iter.filter(func(fi) { fi.price >= minP });
      };
    };
    switch (filters.maxPrice) {
      case null {};
      case (?maxP) {
        iter := iter.filter(func(fi) { fi.price <= maxP });
      };
    };
    if (filters.dietaryTags.size() > 0) {
      let tags = filters.dietaryTags;
      iter := iter.filter(func(fi) { matchesDietaryTags(fi.dietaryTags, tags) });
    };

    iter.toArray();
  };
};
