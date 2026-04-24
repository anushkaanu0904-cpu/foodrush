import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Runtime "mo:core/Runtime";

import UserTypes "types/users";
import RestaurantTypes "types/restaurants";
import OrderTypes "types/orders";
import ReviewTypes "types/reviews";
import Common "types/common";

import UsersMixin "mixins/users-api";
import RestaurantsMixin "mixins/restaurants-api";
import OrdersMixin "mixins/orders-api";
import ReviewsMixin "mixins/reviews-api";

actor {
  // --- Authorization ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Object Storage ---
  include MixinObjectStorage();

  // --- Shared counters (restaurant, foodItem, order, review IDs) ---
  let counters = Map.empty<Text, Nat>();

  // --- User profiles ---
  let userProfiles = Map.empty<Principal, UserTypes.UserProfile>();
  include UsersMixin(accessControlState, userProfiles);

  // --- Restaurants & Food Items ---
  let restaurants = Map.empty<Common.RestaurantId, RestaurantTypes.Restaurant>();
  let foodItems = Map.empty<Common.FoodItemId, RestaurantTypes.FoodItem>();
  let reviewStats = Map.empty<Common.RestaurantId, ReviewTypes.RestaurantRatingStats>();
  include RestaurantsMixin(accessControlState, restaurants, foodItems, reviewStats, counters);

  // --- Orders ---
  let orders = Map.empty<Common.OrderId, OrderTypes.Order>();
  include OrdersMixin(accessControlState, orders, foodItems, restaurants, counters);

  // --- Reviews ---
  let reviews = Map.empty<Common.ReviewId, ReviewTypes.Review>();
  include ReviewsMixin(accessControlState, reviews, reviewStats, orders, userProfiles, counters);

  // --- Stripe ---
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfiguration := ?config;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?cfg) { cfg };
    };
  };

  public shared ({ caller }) func createCheckoutSession(
    items : [Stripe.ShoppingItem],
    successUrl : Text,
    cancelUrl : Text,
  ) : async Text {
    await Stripe.createCheckoutSession(getStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // --- Sample data seed ---
  public shared ({ caller }) func seedSampleData() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can seed sample data");
    };
    // Only seed if no restaurants exist yet
    if (not restaurants.isEmpty()) {
      Runtime.trap("Sample data already seeded");
    };
    // Placeholder blobs for images — frontend replaces with real uploads
    let emptyBlob : Blob = "" : Blob;

    let hours : RestaurantTypes.OperatingHours = {
      openTime = "09:00";
      closeTime = "23:00";
      daysOpen = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    };

    let r1Input : RestaurantTypes.RestaurantInput = {
      name = "Spice Garden";
      description = "Authentic Indian cuisine with rich flavors and aromatic spices.";
      cuisineType = "Indian";
      image = emptyBlob;
      address = "123 Curry Lane, Flavor Town";
      phone = "+1-555-0101";
      operatingHours = hours;
      deliveryTimeMinutes = 35;
      deliveryFee = 49;
      minimumOrder = 200;
      ownerId = caller;
    };

    let r2Input : RestaurantTypes.RestaurantInput = {
      name = "Burger Barn";
      description = "Juicy gourmet burgers and crispy fries made fresh daily.";
      cuisineType = "American";
      image = emptyBlob;
      address = "456 Patty Blvd, Grill City";
      phone = "+1-555-0102";
      operatingHours = hours;
      deliveryTimeMinutes = 25;
      deliveryFee = 29;
      minimumOrder = 150;
      ownerId = caller;
    };

    let r3Input : RestaurantTypes.RestaurantInput = {
      name = "Sushi Sakura";
      description = "Fresh and delicate Japanese sushi crafted by master chefs.";
      cuisineType = "Japanese";
      image = emptyBlob;
      address = "789 Sakura Street, Zen Quarter";
      phone = "+1-555-0103";
      operatingHours = hours;
      deliveryTimeMinutes = 40;
      deliveryFee = 59;
      minimumOrder = 300;
      ownerId = caller;
    };

    let r4Input : RestaurantTypes.RestaurantInput = {
      name = "Pizza Pronto";
      description = "Wood-fired artisan pizzas with the finest Italian ingredients.";
      cuisineType = "Italian";
      image = emptyBlob;
      address = "321 Mozzarella Ave, Napoli District";
      phone = "+1-555-0104";
      operatingHours = hours;
      deliveryTimeMinutes = 30;
      deliveryFee = 39;
      minimumOrder = 200;
      ownerId = caller;
    };

    let r5Input : RestaurantTypes.RestaurantInput = {
      name = "Dragon Wok";
      description = "Classic Chinese dishes, dim sum, and noodles cooked to perfection.";
      cuisineType = "Chinese";
      image = emptyBlob;
      address = "654 Wonton Way, Dragon District";
      phone = "+1-555-0105";
      operatingHours = hours;
      deliveryTimeMinutes = 30;
      deliveryFee = 35;
      minimumOrder = 180;
      ownerId = caller;
    };

    // Seed restaurants using counters map
    func seedNextId(key : Text) : Nat {
      let current = switch (counters.get(key)) {
        case null 1;
        case (?n) n;
      };
      counters.add(key, current + 1);
      current;
    };

    let now = Time.now();

    let addRestaurant = func(input : RestaurantTypes.RestaurantInput) : Common.RestaurantId {
      let id = seedNextId("restaurant");
      restaurants.add(id, {
        id;
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
      });
      id;
    };

    let addFoodItem = func(input : RestaurantTypes.FoodItemInput) {
      let id = seedNextId("foodItem");
      foodItems.add(id, {
        id;
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
      });
    };

    let r1Id = addRestaurant(r1Input);
    let r2Id = addRestaurant(r2Input);
    let r3Id = addRestaurant(r3Input);
    let r4Id = addRestaurant(r4Input);
    let r5Id = addRestaurant(r5Input);

    // Food items for Spice Garden
    addFoodItem({ restaurantId = r1Id; name = "Butter Chicken"; description = "Creamy tomato-based chicken curry"; image = emptyBlob; price = 280; category = "Main Course"; dietaryTags = [#halal] });
    addFoodItem({ restaurantId = r1Id; name = "Paneer Tikka"; description = "Grilled cottage cheese with spices"; image = emptyBlob; price = 220; category = "Starters"; dietaryTags = [#veg] });
    addFoodItem({ restaurantId = r1Id; name = "Dal Makhani"; description = "Slow-cooked black lentils in butter"; image = emptyBlob; price = 180; category = "Main Course"; dietaryTags = [#veg] });

    // Food items for Burger Barn
    addFoodItem({ restaurantId = r2Id; name = "Classic Cheeseburger"; description = "Beef patty with cheddar and fresh veggies"; image = emptyBlob; price = 199; category = "Burgers"; dietaryTags = [] });
    addFoodItem({ restaurantId = r2Id; name = "Crispy Fries"; description = "Golden fries with sea salt"; image = emptyBlob; price = 89; category = "Sides"; dietaryTags = [#veg, #vegan] });
    addFoodItem({ restaurantId = r2Id; name = "Chicken Bacon Ranch Burger"; description = "Grilled chicken, crispy bacon, ranch sauce"; image = emptyBlob; price = 249; category = "Burgers"; dietaryTags = [] });

    // Food items for Sushi Sakura
    addFoodItem({ restaurantId = r3Id; name = "Salmon Nigiri (8 pcs)"; description = "Fresh Atlantic salmon over seasoned rice"; image = emptyBlob; price = 360; category = "Nigiri"; dietaryTags = [#gluten_free] });
    addFoodItem({ restaurantId = r3Id; name = "California Roll"; description = "Crab, avocado, and cucumber"; image = emptyBlob; price = 280; category = "Rolls"; dietaryTags = [] });
    addFoodItem({ restaurantId = r3Id; name = "Miso Soup"; description = "Traditional Japanese miso with tofu and seaweed"; image = emptyBlob; price = 99; category = "Soups"; dietaryTags = [#vegan] });

    // Food items for Pizza Pronto
    addFoodItem({ restaurantId = r4Id; name = "Margherita Pizza"; description = "San Marzano tomatoes, fresh mozzarella, basil"; image = emptyBlob; price = 299; category = "Pizza"; dietaryTags = [#veg] });
    addFoodItem({ restaurantId = r4Id; name = "Pepperoni Feast"; description = "Double pepperoni with extra cheese"; image = emptyBlob; price = 349; category = "Pizza"; dietaryTags = [] });
    addFoodItem({ restaurantId = r4Id; name = "Tiramisu"; description = "Classic Italian dessert with espresso"; image = emptyBlob; price = 149; category = "Desserts"; dietaryTags = [#veg] });

    // Food items for Dragon Wok
    addFoodItem({ restaurantId = r5Id; name = "Kung Pao Chicken"; description = "Spicy stir-fried chicken with peanuts"; image = emptyBlob; price = 240; category = "Main Course"; dietaryTags = [#spicy] });
    addFoodItem({ restaurantId = r5Id; name = "Dim Sum Basket (6 pcs)"; description = "Assorted steamed dumplings"; image = emptyBlob; price = 220; category = "Dim Sum"; dietaryTags = [] });
    addFoodItem({ restaurantId = r5Id; name = "Vegetable Fried Rice"; description = "Wok-tossed rice with fresh vegetables"; image = emptyBlob; price = 160; category = "Rice"; dietaryTags = [#veg, #vegan] });
  };
};
