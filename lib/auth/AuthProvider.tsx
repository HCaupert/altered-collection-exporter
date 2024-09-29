"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

interface User {
  name: string;
  exp: number;
}

interface AuthContextType {
  bearer: string | null;
  setAuth: (value: string) => void;
  user: User | null;
  checkExpiry: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [bearer, setBearer] = useState<string | null>(null);

  function setAuth(value: string) {
    const token = value.trim().replace(/Bearer\s*/i, "");
    try {
      jwtDecode(token);
      toast.info("Successfully connected");
      setBearer(token);
    } catch (e) {
      toast.error("Your auth does not seem valid", {
        description: "Please try again",
      });
    }
  }

  function checkExpiry() {
    if (getUser().exp < new Date().getTime()) {
      toast.info("You auth has expired", {
        description: "Please log in again.",
      });
      setBearer(null);
    }
  }

  function getUser() {
    if (!bearer) throw new Error("Unable to find the bearer...");

    const jwt: any = jwtDecode(bearer);
    return {
      name: jwt.given_name,
      exp: jwt.exp * 1000,
    };
  }

  return (
    <AuthContext.Provider
      value={{
        bearer,
        setAuth,
        checkExpiry,
        get user() {
          return getUser();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
