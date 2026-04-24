import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useActor } from "../hooks/useBackend";
import type { UserProfile, UserRole } from "../types";

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  profile: UserProfile | null;
  role: UserRole | null;
  login: () => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, login, clear } = useInternetIdentity();
  const { actor, isFetching } = useActor();
  const actorRef = useRef(actor);
  actorRef.current = actor;

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Safety fallback: if the actor never resolves (e.g. no CANISTER_ID_BACKEND),
  // stop blocking public routes after 1.5 s.
  useEffect(() => {
    fallbackTimerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    };
  }, []);

  const refreshProfile = useCallback(async () => {
    const currentActor = actorRef.current;
    if (!currentActor || !isAuthenticated) {
      setProfile(null);
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }
    try {
      const [p, adminStatus] = await Promise.all([
        currentActor.getCallerUserProfile(),
        currentActor.isCallerAdmin(),
      ]);
      setProfile(p);
      setIsAdmin(adminStatus);
    } catch {
      setProfile(null);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isFetching) {
      if (isAuthenticated) {
        refreshProfile();
      } else {
        setProfile(null);
        setIsAdmin(false);
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, isFetching, refreshProfile]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        isAdmin,
        profile,
        role: profile?.role ?? null,
        login,
        logout: clear,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be inside AuthProvider");
  return ctx;
}
