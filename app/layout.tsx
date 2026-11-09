import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Mazen — Software Developer",
  description: "Crafting high-performance web applications, resilient systems & tactile digital experiences.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-mode="light" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#E8E4E0" />
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-secondary selection:text-white transition-colors duration-300 min-h-screen">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

