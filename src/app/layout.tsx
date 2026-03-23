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
        {/*
          No paddingTop here — the landing page is full-bleed and handles
          its own spacing. The builder and community pages add their own
          paddingTop individually.
        */}
        <main>{children}</main>
      </body>
    </html>
  );
}
