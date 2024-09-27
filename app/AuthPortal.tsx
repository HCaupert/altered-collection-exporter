"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/app/AuthProvider";

export function AuthPortal({ children }: { children: ReactNode }) {
  const { setAuth, bearer } = useAuth();
  const [inputValue, setInputValue] = useState("");

  if (bearer) return children;

  return (
    <form className="flex flex-col gap-4 items-center justify-center">
      <Label>
        Type in your auth <span className="text-destructive">*</span>
      </Label>
      <Input
        autoComplete="false"
        autoFocus
        type="password"
        placeholder="Probably a weird thing..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        type="submit"
        disabled={!inputValue}
        onClick={() => setAuth(inputValue)}
      >
        Next
      </Button>
    </form>
  );
}
