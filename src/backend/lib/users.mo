import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/users";
import Common "../types/common";

module {
  public func getCallerProfile(
    userProfiles : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
  ) : ?Types.UserProfile {
    userProfiles.get(caller);
  };

  public func saveCallerProfile(
    userProfiles : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
    input : Types.UserProfileInput,
  ) : () {
    let now = Time.now();
    let existing = userProfiles.get(caller);
    let profile : Types.UserProfile = switch (existing) {
      case (?p) {
        {
          p with
          name = input.name;
          email = input.email;
          phone = input.phone;
          defaultAddress = input.defaultAddress;
        };
      };
      case null {
        {
          id = caller;
          name = input.name;
          email = input.email;
          phone = input.phone;
          defaultAddress = input.defaultAddress;
          role = #customer;
          isDeleted = false;
          createdAt = now;
        };
      };
    };
    userProfiles.add(caller, profile);
  };

  public func getUserProfile(
    userProfiles : Map.Map<Principal, Types.UserProfile>,
    userId : Common.UserId,
  ) : ?Types.UserProfile {
    userProfiles.get(userId);
  };

  public func listUsers(
    userProfiles : Map.Map<Principal, Types.UserProfile>,
    roleFilter : ?Common.UserRole,
  ) : [Types.UserProfile] {
    let all = userProfiles.values().filter(func(p) { not p.isDeleted });
    switch (roleFilter) {
      case null { all.toArray() };
      case (?role) {
        all.filter(func(p) {
          switch (p.role, role) {
            case (#customer, #customer) true;
            case (#admin, #admin) true;
            case (#restaurant_owner, #restaurant_owner) true;
            case _ false;
          };
        }).toArray();
      };
    };
  };

  public func softDeleteUser(
    userProfiles : Map.Map<Principal, Types.UserProfile>,
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
    userId : Common.UserId,
  ) : () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete users");
    };
    switch (userProfiles.get(userId)) {
      case null { Runtime.trap("User not found") };
      case (?p) {
        userProfiles.add(userId, { p with isDeleted = true });
      };
    };
  };

  public func assignUserRole(
    userProfiles : Map.Map<Principal, Types.UserProfile>,
    accessControlState : AccessControl.AccessControlState,
    caller : Principal,
    userId : Common.UserId,
    role : Common.UserRole,
  ) : () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can assign roles");
    };
    // Sync with AccessControl for #admin role
    let acRole : AccessControl.UserRole = switch (role) {
      case (#admin) #admin;
      case _ #user;
    };
    AccessControl.assignRole(accessControlState, caller, userId, acRole);
    // Update profile role if profile exists
    switch (userProfiles.get(userId)) {
      case null {};
      case (?p) {
        userProfiles.add(userId, { p with role = role });
      };
    };
  };
};
