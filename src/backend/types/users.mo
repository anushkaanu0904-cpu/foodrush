import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type UserProfile = {
    id : Common.UserId;
    name : Text;
    email : Text;
    phone : Text;
    defaultAddress : Text;
    role : Common.UserRole;
    isDeleted : Bool;
    createdAt : Common.Timestamp;
  };

  public type UserProfileInput = {
    name : Text;
    email : Text;
    phone : Text;
    defaultAddress : Text;
  };
};
