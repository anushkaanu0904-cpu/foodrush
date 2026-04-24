import Common "common";

module {
  public type CartItem = {
    foodItemId : Common.FoodItemId;
    restaurantId : Common.RestaurantId;
    name : Text;
    price : Nat;
    quantity : Nat;
  };

  public type OrderItem = {
    foodItemId : Common.FoodItemId;
    name : Text;
    price : Nat;
    quantity : Nat;
  };

  public type Order = {
    id : Common.OrderId;
    customerId : Common.UserId;
    restaurantId : Common.RestaurantId;
    restaurantName : Text;
    items : [OrderItem];
    deliveryAddress : Text;
    phone : Text;
    specialInstructions : Text;
    subtotal : Nat;
    deliveryFee : Nat;
    taxes : Nat;
    total : Nat;
    status : Common.OrderStatus;
    stripeSessionId : ?Text;
    paymentStatus : PaymentStatus;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type OrderInput = {
    restaurantId : Common.RestaurantId;
    items : [OrderItemInput];
    deliveryAddress : Text;
    phone : Text;
    specialInstructions : Text;
    stripeSessionId : ?Text;
  };

  public type OrderItemInput = {
    foodItemId : Common.FoodItemId;
    quantity : Nat;
  };

  public type PaymentStatus = {
    #pending;
    #paid;
    #failed;
    #refunded;
  };
};
