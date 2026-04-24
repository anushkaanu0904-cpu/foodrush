import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ReviewTypes "../types/reviews";
import OrderTypes "../types/orders";
import UserTypes "../types/users";
import Common "../types/common";

module {
  func recalcStats(
    reviews : Map.Map<Common.ReviewId, ReviewTypes.Review>,
    reviewStats : Map.Map<Common.RestaurantId, ReviewTypes.RestaurantRatingStats>,
    restaurantId : Common.RestaurantId,
  ) {
    let restaurantReviews = reviews.values().filter(func(r) { r.restaurantId == restaurantId }).toArray();
    let count = restaurantReviews.size();
    if (count == 0) {
      reviewStats.add(restaurantId, { restaurantId; averageRating = 0.0; reviewCount = 0 });
    } else {
      let total = restaurantReviews.foldLeft(0, func(acc, r) { acc + r.rating });
      let avg = total.toFloat() / count.toFloat();
      reviewStats.add(restaurantId, { restaurantId; averageRating = avg; reviewCount = count });
    };
  };

  public func postReview(
    reviews : Map.Map<Common.ReviewId, ReviewTypes.Review>,
    reviewStats : Map.Map<Common.RestaurantId, ReviewTypes.RestaurantRatingStats>,
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    userProfiles : Map.Map<Principal, UserTypes.UserProfile>,
    nextId : Nat,
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
    input : ReviewTypes.ReviewInput,
  ) : Common.ReviewId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to post reviews");
    };
    if (input.rating < 1 or input.rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    // Verify order is delivered and belongs to caller
    let order = switch (orders.get(input.orderId)) {
      case null { Runtime.trap("Order not found") };
      case (?o) { o };
    };
    if (not Principal.equal(order.customerId, caller)) {
      Runtime.trap("Unauthorized: Can only review your own orders");
    };
    switch (order.status) {
      case (#delivered) {};
      case _ { Runtime.trap("Can only review delivered orders") };
    };
    // Check not already reviewed
    let alreadyReviewed = reviews.values().any(func(r) {
      r.orderId == input.orderId and Principal.equal(r.customerId, caller)
    });
    if (alreadyReviewed) {
      Runtime.trap("You have already reviewed this order");
    };

    let customerName = switch (userProfiles.get(caller)) {
      case null { "Anonymous" };
      case (?p) { p.name };
    };

    let review : ReviewTypes.Review = {
      id = nextId;
      restaurantId = input.restaurantId;
      orderId = input.orderId;
      customerId = caller;
      customerName = customerName;
      rating = input.rating;
      comment = input.comment;
      createdAt = Time.now();
    };
    reviews.add(nextId, review);
    recalcStats(reviews, reviewStats, input.restaurantId);
    nextId;
  };

  public func listRestaurantReviews(
    reviews : Map.Map<Common.ReviewId, ReviewTypes.Review>,
    restaurantId : Common.RestaurantId,
  ) : [ReviewTypes.Review] {
    reviews.values().filter(func(r) { r.restaurantId == restaurantId }).toArray();
  };

  public func getRestaurantRatingStats(
    reviewStats : Map.Map<Common.RestaurantId, ReviewTypes.RestaurantRatingStats>,
    restaurantId : Common.RestaurantId,
  ) : ?ReviewTypes.RestaurantRatingStats {
    reviewStats.get(restaurantId);
  };

  public func deleteReview(
    reviews : Map.Map<Common.ReviewId, ReviewTypes.Review>,
    reviewStats : Map.Map<Common.RestaurantId, ReviewTypes.RestaurantRatingStats>,
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
    reviewId : Common.ReviewId,
  ) : () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete reviews");
    };
    switch (reviews.get(reviewId)) {
      case null { Runtime.trap("Review not found") };
      case (?r) {
        let restaurantId = r.restaurantId;
        reviews.remove(reviewId);
        recalcStats(reviews, reviewStats, restaurantId);
      };
    };
  };

  public func listAllReviews(
    reviews : Map.Map<Common.ReviewId, ReviewTypes.Review>,
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
  ) : [ReviewTypes.Review] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all reviews");
    };
    reviews.values().toArray();
  };
};
