import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import ReviewLib "../lib/reviews";
import ReviewTypes "../types/reviews";
import OrderTypes "../types/orders";
import UserTypes "../types/users";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  reviews : Map.Map<Common.ReviewId, ReviewTypes.Review>,
  reviewStats : Map.Map<Common.RestaurantId, ReviewTypes.RestaurantRatingStats>,
  orders : Map.Map<Common.OrderId, OrderTypes.Order>,
  userProfiles : Map.Map<Principal, UserTypes.UserProfile>,
  counters : Map.Map<Text, Nat>,
) {
  func nextReviewId(key : Text) : Nat {
    let current = switch (counters.get(key)) {
      case null 1;
      case (?n) n;
    };
    counters.add(key, current + 1);
    current;
  };

  public shared ({ caller }) func postReview(input : ReviewTypes.ReviewInput) : async Common.ReviewId {
    ReviewLib.postReview(reviews, reviewStats, orders, userProfiles, nextReviewId("review"), accessControlState, caller, input);
  };

  public query func listRestaurantReviews(restaurantId : Common.RestaurantId) : async [ReviewTypes.Review] {
    ReviewLib.listRestaurantReviews(reviews, restaurantId);
  };

  public query func getRestaurantRatingStats(restaurantId : Common.RestaurantId) : async ?ReviewTypes.RestaurantRatingStats {
    ReviewLib.getRestaurantRatingStats(reviewStats, restaurantId);
  };

  public shared ({ caller }) func deleteReview(reviewId : Common.ReviewId) : async () {
    ReviewLib.deleteReview(reviews, reviewStats, accessControlState, caller, reviewId);
  };

  public query ({ caller }) func listAllReviews() : async [ReviewTypes.Review] {
    ReviewLib.listAllReviews(reviews, accessControlState, caller);
  };
};
