"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthProvider";

export function AuthPortal({ children }: { children: ReactNode }) {
  const { setAuth, bearer } = useAuth();
  const [inputValue, setInputValue] = useState("");

  if (bearer) return children;

  return (
    <form
      className="flex flex-col gap-4 items-center justify-center"
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
        setAuth(inputValue);
        setInputValue("");
      }}
    >
      <Label>
        Type in your auth <span className="text-destructive">*</span>
      </Label>
      <div className="flex gap-4">
        <Input
          autoComplete="false"
          autoFocus
          type="password"
          placeholder="Probably a weird thing..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit" disabled={!inputValue}>
          Next
        </Button>
      </div>
      <Link
        className="hover:underline text-muted-foreground text-sm"
        href={"/auth"}
      >
        How to get my auth ?
      </Link>
    </form>
  );
}
