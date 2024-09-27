"use client";

import { QueryClient, QueryClientProvider as QCP } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export function QueryClientProvider({ children }: { children: ReactNode }) {
  return <QCP client={queryClient}>{children}</QCP>;
}
