import Time "mo:core/Time";

module {
  public type UserId = Principal;
  public type RestaurantId = Nat;
  public type FoodItemId = Nat;
  public type OrderId = Nat;
  public type ReviewId = Nat;
  public type Timestamp = Time.Time;

  public type UserRole = {
    #customer;
    #admin;
    #restaurant_owner;
  };

  public type OrderStatus = {
    #pending;
    #preparing;
    #out_for_delivery;
    #delivered;
    #cancelled;
  };

  public type DietaryTag = {
    #veg;
    #vegan;
    #gluten_free;
    #dairy_free;
    #spicy;
    #halal;
  };
};
