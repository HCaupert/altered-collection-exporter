"use client";

import { useAuth } from "@/lib/auth/AuthProvider";
import { FormEventHandler, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";

const AvailableLocales = ["fr-fr", "en-us"] as const;
type AvailableLocales = (typeof AvailableLocales)[number];

function findDefaultLocale(): AvailableLocales {
  const language = navigator.language.toLowerCase() as AvailableLocales;
  return AvailableLocales.includes(language) ? language : "en-us";
}

function isValidJwt(s: any) {
  if (typeof s !== "string") return false;
  try {
    jwtDecode(s);
    return true;
  } catch (e) {}
  return false;
}

export function ExportForm({
  createExport,
  empty,
}: {
  createExport: ({
    locale,
    bearer,
  }: {
    locale: AvailableLocales;
    bearer: string;
  }) => void;
  empty: boolean;
}) {
  const { bearer } = useAuth();
  const [locale, setLocale] = useState(findDefaultLocale());
  const [bearerInput, setBearerInput] = useState(bearer ?? "");

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createExport({ locale, bearer: bearerInput });
  };

  const bearerIsValid = isValidJwt(bearerInput);

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-2 gap-2 mb-6">
        <Label>Language</Label>
        <Label>
          Your Auth <span className="text-destructive">*</span>
        </Label>
        <Select
          value={locale}
          onValueChange={(e) => setLocale(e as AvailableLocales)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fr-fr">French</SelectItem>
            <SelectItem value="en-us">English</SelectItem>
          </SelectContent>
        </Select>
        <Input
          onChange={(e) => setBearerInput(e.target.value)}
          value={bearerInput}
          autoFocus
          type="password"
          autoComplete="false"
          className={cn(
            bearerIsValid
              ? "border-green-300 focus-visible:ring-green-300"
              : "border-destructive focus-visible:ring-destructive",
          )}
          placeholder="Probably a weird thing..."
        />
      </div>
      {!empty && (
        <p className="text-muted-foreground text-sm mb-4 font-light">
          Note that making a new export will reset your current collection.
        </p>
      )}
      <DialogFooter>
        <Button type="submit" disabled={!bearerIsValid}>
          Export
        </Button>
      </DialogFooter>
    </form>
  );
}
