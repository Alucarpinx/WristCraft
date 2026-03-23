// app/layout.tsx
// This file wraps EVERY page in your app.
// The Navbar goes here so it appears on all routes automatically.
// Note: this file itself is a Server Component (no "use client")
// because it just renders HTML structure — the Navbar handles its own interactivity.

import type { Metadata } from "next";
import Navbar from "@/components/nav/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "WristCraft — 3D Watch Configurator",
  description:
    "Design your dream watch in real-time 3D. Share builds with a community of enthusiasts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {/* pt-16 = padding-top 64px to clear the fixed navbar */}
        <main style={{ paddingTop: "64px" }}>{children}</main>
      </body>
    </html>
  );
}
