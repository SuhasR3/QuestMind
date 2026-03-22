import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getInsforgeClient } from '../lib/insforgeClient';
import { syncUserProfile } from '../lib/syncUserProfile';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [{ insforge, configError }] = useState(() => {
    try {
      return { insforge: getInsforgeClient(), configError: null };
    } catch (e) {
      return { insforge: null, configError: e.message };
    }
  });

  const refreshUser = useCallback(async () => {
    if (!insforge) {
      setLoading(false);
      return;
    }
    const { data, error } = await insforge.auth.getCurrentUser();
    if (error) {
      setUser(null);
    } else {
      setUser(data.user ?? null);
    }
  }, [insforge]);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!insforge) {
        setLoading(false);
        return;
      }
      try {
        await insforge.auth.authCallbackHandled;
      } catch {
        /* OAuth callback detection is best-effort */
      }
      if (cancelled) return;
      await refreshUser();
      if (cancelled) return;
      setLoading(false);
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [insforge, refreshUser]);

  useEffect(() => {
    if (!insforge || !user) return;
    let cancelled = false;
    syncUserProfile(insforge, user).then(() => {
      if (!cancelled && import.meta.env.DEV) {
        console.debug('[QuestMind] user_profiles synced for', user.id);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [insforge, user]);

  const signInWithPassword = useCallback(
    async ({ email, password }) => {
      if (!insforge) return { error: new Error('Client not configured') };
      const { data, error } = await insforge.auth.signInWithPassword({ email, password });
      if (!error) {
        await refreshUser();
      }
      return { data, error };
    },
    [insforge, refreshUser]
  );

  const signUp = useCallback(
    async ({ email, password, name }) => {
      if (!insforge) return { error: new Error('Client not configured') };
      const { data, error } = await insforge.auth.signUp({ email, password, name });
      if (!error && data?.accessToken) {
        await refreshUser();
      }
      return { data, error };
    },
    [insforge, refreshUser]
  );

  const verifyEmail = useCallback(
    async ({ email, otp }) => {
      if (!insforge) return { error: new Error('Client not configured') };
      const { data, error } = await insforge.auth.verifyEmail({ email, otp });
      if (!error) {
        await refreshUser();
      }
      return { data, error };
    },
    [insforge, refreshUser]
  );

  const resendVerificationEmail = useCallback(
    async ({ email }) => {
      if (!insforge) return { error: new Error('Client not configured') };
      return insforge.auth.resendVerificationEmail({ email });
    },
    [insforge]
  );

  const signInWithOAuth = useCallback(
    async ({ provider, redirectTo }) => {
      if (!insforge) return { error: new Error('Client not configured') };
      return insforge.auth.signInWithOAuth({ provider, redirectTo });
    },
    [insforge]
  );

  const signOut = useCallback(async () => {
    if (!insforge) return { error: new Error('Client not configured') };
    const { error } = await insforge.auth.signOut();
    if (!error) {
      setUser(null);
    }
    return { error };
  }, [insforge]);

  const value = useMemo(
    () => ({
      user,
      loading,
      configError,
      insforge,
      refreshUser,
      signInWithPassword,
      signUp,
      verifyEmail,
      resendVerificationEmail,
      signInWithOAuth,
      signOut,
    }),
    [
      user,
      loading,
      configError,
      insforge,
      refreshUser,
      signInWithPassword,
      signUp,
      verifyEmail,
      resendVerificationEmail,
      signInWithOAuth,
      signOut,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
