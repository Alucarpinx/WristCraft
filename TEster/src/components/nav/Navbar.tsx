"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/builder", label: "Builder" },
  { href: "/community", label: "Community" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <Link href="/" style={logoStyle}>
        Wrist
        <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
          Craft
        </span>
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex" }}>
        {NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              style={{
                ...navLinkStyle,
                color: isActive ? "var(--accent)" : "var(--text-2)",
                borderBottom: isActive
                  ? "2px solid var(--accent)"
                  : "2px solid transparent",
              }}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <button style={btnGhostStyle}>Sign In</button>
        <button style={btnAccentStyle}>Get Started</button>
      </div>
    </nav>
  );
}

const navStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 2.5rem",
  height: "64px",
  background: "rgba(250,250,248,0.88)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  borderBottom: "1px solid var(--border-soft)",
  boxShadow: "var(--shadow-sm)",
};

const logoStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.5rem",
  fontWeight: 300,
  letterSpacing: "0.06em",
  color: "var(--text)",
  textDecoration: "none",
};

const navLinkStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  padding: "0 1.25rem",
  height: "64px",
  lineHeight: "64px",
  display: "inline-block",
  transition: "color 0.2s",
  textDecoration: "none",
};

const btnGhostStyle: React.CSSProperties = {
  background: "none",
  border: "1px solid var(--border)",
  color: "var(--text-2)",
  fontFamily: "var(--font-sans)",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  padding: "0.5rem 1.25rem",
  cursor: "pointer",
  borderRadius: "3px",
  transition: "all 0.2s",
};

const btnAccentStyle: React.CSSProperties = {
  background: "var(--accent)",
  border: "1px solid var(--accent)",
  color: "var(--text-inv)",
  fontFamily: "var(--font-sans)",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  padding: "0.5rem 1.25rem",
  cursor: "pointer",
  borderRadius: "3px",
  transition: "all 0.2s",
};
