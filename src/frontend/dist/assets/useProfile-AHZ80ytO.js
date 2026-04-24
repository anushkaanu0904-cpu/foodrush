import { i as useActor, h as useAuthContext, k as useQuery, l as useQueryClient } from "./index-BOLlBpkj.js";
import { u as useMutation } from "./useMutation-I4pzC6GI.js";
function useProfile() {
  const { actor, isFetching } = useActor();
  const { isAuthenticated } = useAuthContext();
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching && isAuthenticated
  });
}
function useAllUsers(roleFilter = null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["allUsers", roleFilter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUsers(roleFilter);
    },
    enabled: !!actor && !isFetching
  });
}
function useSaveProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const { refreshProfile } = useAuthContext();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(input);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["profile"] });
      await refreshProfile();
    }
  });
}
function useAssignUserRole() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      role
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.assignUserRole(userId, role);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allUsers"] })
  });
}
function useSoftDeleteUser() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      if (!actor) throw new Error("Not connected");
      return actor.softDeleteUser(userId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allUsers"] })
  });
}
export {
  useSaveProfile as a,
  useAllUsers as b,
  useSoftDeleteUser as c,
  useAssignUserRole as d,
  useProfile as u
};
