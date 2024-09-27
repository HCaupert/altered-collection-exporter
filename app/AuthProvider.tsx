"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  name: string;
  exp: number;
}

interface AuthContextType {
  bearer: string | null;
  setAuth: (value: string) => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [bearer, setBearer] = useState<string | null>(null);

  function setAuth(value: string) {
    const token = value.trim().replace(/Bearer\s*/i, "");
    setBearer(token);
  }

  function getUser() {
    if (!bearer) throw new Error("Unable to find the bearer...");

    const jwt: any = jwtDecode(bearer);
    return {
      name: jwt.given_name,
      exp: jwt.exp,
    };
  }

  return (
    <AuthContext.Provider
      value={{
        bearer,
        setAuth,
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
