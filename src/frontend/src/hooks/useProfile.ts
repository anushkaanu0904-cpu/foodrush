import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import type { UserId, UserProfile, UserProfileInput, UserRole } from "../types";
import { useActor } from "./useBackend";

export function useProfile() {
  const { actor, isFetching } = useActor();
  const { isAuthenticated } = useAuthContext();
  return useQuery<UserProfile | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

export function useUserProfile(userId: UserId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return null;
      return actor.getUserProfile(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useAllUsers(roleFilter: UserRole | null = null) {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile[]>({
    queryKey: ["allUsers", roleFilter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUsers(roleFilter);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const { refreshProfile } = useAuthContext();
  return useMutation({
    mutationFn: async (input: UserProfileInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(input);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["profile"] });
      await refreshProfile();
    },
  });
}

export function useAssignUserRole() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      role,
    }: { userId: UserId; role: UserRole }) => {
      if (!actor) throw new Error("Not connected");
      return actor.assignUserRole(userId, role);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allUsers"] }),
  });
}

export function useSoftDeleteUser() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId: UserId) => {
      if (!actor) throw new Error("Not connected");
      return actor.softDeleteUser(userId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allUsers"] }),
  });
}
