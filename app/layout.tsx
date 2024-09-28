import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import { QueryClientProvider } from "@/app/QueryClientProvider";
import { AuthProvider } from "@/app/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

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
  title: "Altered Collection Exporter",
  description: "Simple yet powerful collection exported for Altered TCG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <QueryClientProvider>
          <AuthProvider>
            <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
              <main className="flex flex-col gap-8 row-start-2 items-center">
                {children}
              </main>
              <footer className="row-start-3 text-muted-foreground text-center">
                <p>
                  This project is not related altered, and is distributed freely
                  and openly.
                </p>
                <a
                  className="hover:underline"
                  href="https://github.com/HCaupert/altered-collection-exporter"
                >
                  Code is open-source.
                </a>
              </footer>
            </div>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
