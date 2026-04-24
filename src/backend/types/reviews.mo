import Common "common";

module {
  public type Review = {
    id : Common.ReviewId;
    restaurantId : Common.RestaurantId;
    orderId : Common.OrderId;
    customerId : Common.UserId;
    customerName : Text;
    rating : Nat;
    comment : Text;
    createdAt : Common.Timestamp;
  };

  public type ReviewInput = {
    restaurantId : Common.RestaurantId;
    orderId : Common.OrderId;
    rating : Nat;
    comment : Text;
  };

  public type RestaurantRatingStats = {
    restaurantId : Common.RestaurantId;
    averageRating : Float;
    reviewCount : Nat;
  };
};
