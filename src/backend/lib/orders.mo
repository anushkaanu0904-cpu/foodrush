import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderTypes "../types/orders";
import RestaurantTypes "../types/restaurants";
import Common "../types/common";

module {
  public func placeOrder(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    foodItems : Map.Map<Common.FoodItemId, RestaurantTypes.FoodItem>,
    restaurants : Map.Map<Common.RestaurantId, RestaurantTypes.Restaurant>,
    nextId : Nat,
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
    input : OrderTypes.OrderInput,
  ) : Common.OrderId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to place orders");
    };
    let restaurant = switch (restaurants.get(input.restaurantId)) {
      case null { Runtime.trap("Restaurant not found") };
      case (?r) { r };
    };

    // Build order items and calculate subtotal
    var subtotal : Nat = 0;
    let orderItems = input.items.map(func(ii) {
      let fi = switch (foodItems.get(ii.foodItemId)) {
        case null { Runtime.trap("Food item not found: " # ii.foodItemId.toText()) };
        case (?f) { f };
      };
      if (fi.restaurantId != input.restaurantId) {
        Runtime.trap("Food item does not belong to this restaurant");
      };
      subtotal += fi.price * ii.quantity;
      {
        foodItemId = ii.foodItemId;
        name = fi.name;
        price = fi.price;
        quantity = ii.quantity;
      };
    });

    let taxes = subtotal / 10; // 10% tax
    let total = subtotal + restaurant.deliveryFee + taxes;
    let now = Time.now();

    let order : OrderTypes.Order = {
      id = nextId;
      customerId = caller;
      restaurantId = input.restaurantId;
      restaurantName = restaurant.name;
      items = orderItems;
      deliveryAddress = input.deliveryAddress;
      phone = input.phone;
      specialInstructions = input.specialInstructions;
      subtotal = subtotal;
      deliveryFee = restaurant.deliveryFee;
      taxes = taxes;
      total = total;
      status = #pending;
      stripeSessionId = input.stripeSessionId;
      paymentStatus = #pending;
      createdAt = now;
      updatedAt = now;
    };
    orders.add(nextId, order);
    nextId;
  };

  public func getOrder(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
    orderId : Common.OrderId,
  ) : ?OrderTypes.Order {
    switch (orders.get(orderId)) {
      case null null;
      case (?o) {
        // Allow customer to see own order or admin to see any
        if (Principal.equal(o.customerId, caller) or AccessControl.isAdmin(accessControlState, caller)) {
          ?o;
        } else {
          Runtime.trap("Unauthorized: Cannot view this order");
        };
      };
    };
  };

  public func listCustomerOrders(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    caller : Principal,
    statusFilter : ?Common.OrderStatus,
  ) : [OrderTypes.Order] {
    var iter = orders.values().filter(func(o) { Principal.equal(o.customerId, caller) });
    switch (statusFilter) {
      case null {};
      case (?s) {
        iter := iter.filter(func(o) {
          switch (o.status, s) {
            case (#pending, #pending) true;
            case (#preparing, #preparing) true;
            case (#out_for_delivery, #out_for_delivery) true;
            case (#delivered, #delivered) true;
            case (#cancelled, #cancelled) true;
            case _ false;
          };
        });
      };
    };
    iter.toArray();
  };

  public func listAllOrders(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
    restaurantFilter : ?Common.RestaurantId,
    statusFilter : ?Common.OrderStatus,
  ) : [OrderTypes.Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all orders");
    };
    var iter = orders.values();
    switch (restaurantFilter) {
      case null {};
      case (?rid) {
        iter := iter.filter(func(o) { o.restaurantId == rid });
      };
    };
    switch (statusFilter) {
      case null {};
      case (?s) {
        iter := iter.filter(func(o) {
          switch (o.status, s) {
            case (#pending, #pending) true;
            case (#preparing, #preparing) true;
            case (#out_for_delivery, #out_for_delivery) true;
            case (#delivered, #delivered) true;
            case (#cancelled, #cancelled) true;
            case _ false;
          };
        });
      };
    };
    iter.toArray();
  };

  public func updateOrderStatus(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
    orderId : Common.OrderId,
    newStatus : Common.OrderStatus,
  ) : () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    switch (orders.get(orderId)) {
      case null { Runtime.trap("Order not found") };
      case (?o) {
        orders.add(orderId, { o with status = newStatus; updatedAt = Time.now() });
      };
    };
  };

  public func updateOrderPaymentStatus(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    orderId : Common.OrderId,
    sessionId : Text,
    paymentStatus : OrderTypes.PaymentStatus,
  ) : () {
    switch (orders.get(orderId)) {
      case null { Runtime.trap("Order not found") };
      case (?o) {
        orders.add(orderId, {
          o with
          stripeSessionId = ?sessionId;
          paymentStatus = paymentStatus;
          updatedAt = Time.now();
        });
      };
    };
  };
};
