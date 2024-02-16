import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "@/components/molecules/Toaster";
import { ThemeProvider } from "@/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kecilinflix",
  description: "Kecilinflix - Watch movies and TV shows online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Why wrapped with Suspense?. Because in Next.js 14 the useSearchParams() required to be used inside <Suspense> */}
        <Suspense>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
