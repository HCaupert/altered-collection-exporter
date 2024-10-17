import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import { QueryClientProvider } from "@/lib/reactquery/QueryClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { NavBar } from "@/lib/nav/NavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "My Altered Collection",
  description: "Simple yet powerful collection exporter for Altered TCG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        <Toaster />
        <QueryClientProvider>
          <AuthProvider>
            <div className="flex flex-col min-h-screen px-8 pt-2 pb-4 gap-16 relative container mx-auto">
              <NavBar />
              <main className="flex flex-col gap-8 items-center grow">
                {children}
              </main>
              <footer className="text-muted-foreground text-center text-sm">
                <p>
                  Equinox, Altered, and their logos are trademarks of Equinox.
                  © 2023-2024 Equinox. All Rights Reserved.{" "}
                </p>
                <p>
                  My Altered Collection is not affiliated with, endorsed,
                  sponsored, or specifically approved by Equinox.
                </p>
                <p>
                  My Altered Collection is developed and maintained by Hukoper,
                  this project is fanwork.
                </p>
                <p>
                  This project is distributed freely and openly.{" "}
                  <a
                    className="hover:underline"
                    href="https://github.com/HCaupert/altered-collection-exporter"
                  >
                    Code is open-source.
                  </a>
                </p>
              </footer>
            </div>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
