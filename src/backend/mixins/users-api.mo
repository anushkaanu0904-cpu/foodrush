import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserLib "../lib/users";
import UserTypes "../types/users";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Principal, UserTypes.UserProfile>,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?UserTypes.UserProfile {
    UserLib.getCallerProfile(userProfiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(input : UserTypes.UserProfileInput) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to save profile");
    };
    UserLib.saveCallerProfile(userProfiles, caller, input);
  };

  public query ({ caller }) func getUserProfile(userId : Common.UserId) : async ?UserTypes.UserProfile {
    if (not Principal.equal(caller, userId) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    UserLib.getUserProfile(userProfiles, userId);
  };

  public query ({ caller }) func listUsers(roleFilter : ?Common.UserRole) : async [UserTypes.UserProfile] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list users");
    };
    UserLib.listUsers(userProfiles, roleFilter);
  };

  public shared ({ caller }) func softDeleteUser(userId : Common.UserId) : async () {
    UserLib.softDeleteUser(userProfiles, accessControlState, caller, userId);
  };

  public shared ({ caller }) func assignUserRole(userId : Common.UserId, role : Common.UserRole) : async () {
    UserLib.assignUserRole(userProfiles, accessControlState, caller, userId, role);
  };
};
