"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User, Session } from "@supabase/supabase-js";

const supabase = createClient();

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "user" | "artist" | "admin";
  created_at: string;
  updated_at: string;
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  isArtist: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (
    email: string,
    password: string,
    role: "user" | "artist" | "admin",
    firstName: string,
    lastName: string
  ) => Promise<{ user: User | null; session: Session | null }>;
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isArtist, setIsArtist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          await fetchProfile();
        } else {
          setIsAdmin(false);
          setIsArtist(false);
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async () => {
    if (user) {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          throw error;
        }

        setProfile(data);
        setIsAdmin(data.role === "admin");
        setIsArtist(data.role === "artist");
      } catch (error) {
        console.error("Error in fetchProfile:", error);
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      if (data.user) {
        await fetchProfile();
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const signup = async (
    email: string,
    password: string,
    role: "user" | "artist" | "admin",
    firstName: string,
    lastName: string
  ): Promise<{ user: User | null; session: Session | null }> => {
    try {
      console.log("Attempting signup with:", {
        email,
        role,
        firstName,
        lastName,
      });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: role,
          },
        },
      });
      if (error) {
        console.error("Signup error:", error);
        throw error;
      }

      console.log("Signup response:", data);

      if (data.user) {
        console.log("User created:", data.user);
        // No need to insert into profiles table here
      } else {
        console.log("User not created in signup response");
      }

      return { user: data.user, session: data.session };
    } catch (error) {
      console.error("Detailed signup error:", error);
      if (error instanceof Error) {
        throw new Error(`Signup failed: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred during signup");
      }
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error("No user logged in");

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id)
        .single();

      if (error) throw error;

      setProfile((prevProfile) => ({ ...prevProfile, ...updates } as Profile));
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    isAdmin,
    isArtist,
    isLoading,
    login,
    logout,
    signup,
    fetchProfile,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
