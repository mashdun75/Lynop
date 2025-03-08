"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createSupabaseClient } from "@/lib/supabase";
import { Session, SupabaseClient } from "@supabase/supabase-js";

type SupabaseContext = {
  supabase: SupabaseClient;
  session: Session | null;
};

const SupabaseContext = createContext<SupabaseContext | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => {
    // Only create the client on the client side
    if (typeof window !== "undefined") {
      return createSupabaseClient();
    }
    // Return a dummy client for SSR
    return {} as SupabaseClient;
  });
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Only run auth state change on client side with valid supabase instance
    if (typeof window !== "undefined" && supabase.auth) {
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        console.log(
          "Auth state changed:",
          _event,
          session ? "User logged in" : "No session",
        );
        setSession(session);
      });

      return () => subscription.unsubscribe();
    }
  }, [supabase]);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }
  return context;
};
