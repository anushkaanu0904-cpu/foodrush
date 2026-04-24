import { useAuthContext } from "../context/AuthContext";

export function useAuth() {
  return useAuthContext();
}

export function useAdmin() {
  const { isAdmin, isAuthenticated, isLoading } = useAuthContext();
  return { isAdmin, isAuthenticated, isLoading };
}
