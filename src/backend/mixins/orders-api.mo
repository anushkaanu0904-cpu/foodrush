import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderLib "../lib/orders";
import OrderTypes "../types/orders";
import RestaurantTypes "../types/restaurants";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : Map.Map<Common.OrderId, OrderTypes.Order>,
  foodItems : Map.Map<Common.FoodItemId, RestaurantTypes.FoodItem>,
  restaurants : Map.Map<Common.RestaurantId, RestaurantTypes.Restaurant>,
  counters : Map.Map<Text, Nat>,
) {
  func nextOrderId(key : Text) : Nat {
    let current = switch (counters.get(key)) {
      case null 1;
      case (?n) n;
    };
    counters.add(key, current + 1);
    current;
  };

  public shared ({ caller }) func placeOrder(input : OrderTypes.OrderInput) : async Common.OrderId {
    OrderLib.placeOrder(orders, foodItems, restaurants, nextOrderId("order"), accessControlState, caller, input);
  };

  public query ({ caller }) func getOrder(orderId : Common.OrderId) : async ?OrderTypes.Order {
    OrderLib.getOrder(orders, accessControlState, caller, orderId);
  };

  public query ({ caller }) func listMyOrders(statusFilter : ?Common.OrderStatus) : async [OrderTypes.Order] {
    OrderLib.listCustomerOrders(orders, caller, statusFilter);
  };

  public query ({ caller }) func listAllOrders(
    restaurantFilter : ?Common.RestaurantId,
    statusFilter : ?Common.OrderStatus,
  ) : async [OrderTypes.Order] {
    OrderLib.listAllOrders(orders, accessControlState, caller, restaurantFilter, statusFilter);
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Common.OrderId, newStatus : Common.OrderStatus) : async () {
    OrderLib.updateOrderStatus(orders, accessControlState, caller, orderId, newStatus);
  };

  public shared func confirmOrderPayment(sessionId : Text) : async () {
    let found = orders.values().find(func(o) {
      switch (o.stripeSessionId) {
        case (?sid) { sid == sessionId };
        case null false;
      };
    });
    switch (found) {
      case null {};
      case (?o) {
        OrderLib.updateOrderPaymentStatus(orders, o.id, sessionId, #paid);
      };
    };
  };
};
