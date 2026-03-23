"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LandingWatch from "@/components/landing/LandingWatch";

// Each story beat: what text shows at what scroll depth (0–100)
const BEATS = [
  {
    start: 0,
    end: 28,
    eyebrow: "Introducing WristCraft",
    headline: "Your watch.\nYour rules.",
    body: "The first real-time 3D watch configurator built for enthusiasts, collectors, and dreamers.",
    showCta: false,
  },
  {
    start: 28,
    end: 55,
    eyebrow: "Every component. Your choice.",
    headline: "Built from\nthe inside out.",
    body: "Choose your movement, case, dial, crystal, hands, and strap. See every change reflected instantly in full 3D.",
    showCta: false,
  },
  {
    start: 55,
    end: 80,
    eyebrow: "Community",
    headline: "Share what\nyou've made.",
    body: "Browse thousands of community builds. Load any configuration into your builder with one click.",
    showCta: false,
  },
  {
    start: 80,
    end: 100,
    eyebrow: "Ready to start?",
    headline: "Start building\ntoday.",
    body: "Free to use. No account needed to explore. Sign up when you're ready to save and share.",
    showCta: true,
  },
];

const FEATURES = [
  { icon: "⚙️", label: "6 Part Categories" },
  { icon: "🎨", label: "Real-time 3D Preview" },
  { icon: "👥", label: "Community Builds" },
  { icon: "📖", label: "Guides & Articles" },
];

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0); // 0–100
  const [scrollProg, setScrollProg] = useState(0); // 0–1

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const pct = Math.min(
        100,
        (window.scrollY / (el.scrollHeight - window.innerHeight)) * 100
      );
      setScrollPct(pct);
      setScrollProg(pct / 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Find active beat
  const beat =
    [...BEATS].reverse().find((b) => scrollPct >= b.start) ?? BEATS[0];

  // Opacity for beat text
  const fadeIn = 5;
  const fadeOut = 8;
  let opacity = 1;
  if (scrollPct < beat.start + fadeIn) {
    opacity = (scrollPct - beat.start) / fadeIn;
  } else if (scrollPct > beat.end - fadeOut) {
    opacity = (beat.end - scrollPct) / fadeOut;
  }
  opacity = Math.max(0, Math.min(1, opacity));

  // Features fade in from 20% scroll
  const featOpacity = Math.min(1, Math.max(0, (scrollProg - 0.18) * 4));

  return (
    // Tall container — gives us scroll distance for the animation
    <div ref={containerRef} style={{ height: "500vh", position: "relative" }}>
      {/* ── Sticky viewport: stays fixed while user scrolls ── */}
      <div style={stickyStyle}>
        {/* Background — light warm gradient */}
        <div style={bgStyle} />

        {/* Subtle bottom fade for depth */}
        <div style={bottomFadeStyle} />

        {/* 3D Watch — fills the viewport */}
        <LandingWatch scrollProgress={scrollProg} />

        {/* ── Left text block ── */}
        <div
          style={{
            ...textBlockStyle,
            opacity,
            transform: `translateY(${(1 - opacity) * 20}px)`,
            transition: "opacity 0.45s ease, transform 0.45s ease",
          }}
        >
          {/* Eyebrow */}
          <p style={eyebrowStyle}>{beat.eyebrow}</p>

          {/* Headline */}
          <h1 style={headlineStyle}>{beat.headline}</h1>

          {/* Body */}
          <p style={bodyStyle}>{beat.body}</p>

          {/* CTA — only on last beat */}
          {beat.showCta && (
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem" }}>
              <Link href="/builder" style={ctaPrimaryStyle}>
                Open Builder →
              </Link>
              <Link href="/community" style={ctaSecondaryStyle}>
                Browse Builds
              </Link>
            </div>
          )}
        </div>

        {/* ── Right feature chips ── */}
        <div
          style={{
            ...featuresStyle,
            opacity: featOpacity,
            transition: "opacity 0.5s ease",
          }}
        >
          {FEATURES.map((f) => (
            <div key={f.label} style={chipStyle}>
              <span style={{ fontSize: "1rem" }}>{f.icon}</span>
              <span style={chipLabelStyle}>{f.label}</span>
            </div>
          ))}
        </div>

        {/* ── Scroll hint (fades out as you start scrolling) ── */}
        <div
          style={{
            ...scrollHintStyle,
            opacity: Math.max(0, 1 - scrollProg * 6),
          }}
        >
          <span style={scrollHintTextStyle}>Scroll to explore</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            style={{ animation: "bounce 1.8s infinite" }}
          >
            <path
              d="M4 7l5 5 5-5"
              stroke="#8B7355"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ── Progress bar ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2px",
            width: `${scrollPct}%`,
            background:
              "linear-gradient(90deg, var(--accent-2), var(--accent))",
            transition: "width 0.1s linear",
          }}
        />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
      `}</style>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const stickyStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  height: "100vh",
  width: "100%",
  overflow: "hidden",
};

const bgStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "radial-gradient(ellipse at 55% 45%, #F5EFE6 0%, #FAFAF8 55%, #EDE8E0 100%)",
  zIndex: 0,
};

const bottomFadeStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "120px",
  background: "linear-gradient(to bottom, transparent, rgba(250,250,248,0.6))",
  zIndex: 2,
  pointerEvents: "none",
};

const textBlockStyle: React.CSSProperties = {
  position: "absolute",
  left: "8vw",
  top: "50%",
  transform: "translateY(-50%)",
  maxWidth: 460,
  zIndex: 3,
};

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.65rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--accent)",
  marginBottom: "1rem",
};

const headlineStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
  fontWeight: 300,
  lineHeight: 1.08,
  color: "var(--text)",
  marginBottom: "1.25rem",
  whiteSpace: "pre-line",
  letterSpacing: "-0.01em",
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.92rem",
  color: "var(--text-2)",
  lineHeight: 1.8,
  maxWidth: 380,
};

const ctaPrimaryStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  padding: "0.8rem 1.6rem",
  background: "var(--accent)",
  color: "var(--text-inv)",
  borderRadius: "3px",
  textDecoration: "none",
  boxShadow: "var(--shadow-md)",
};

const ctaSecondaryStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  padding: "0.8rem 1.6rem",
  background: "transparent",
  color: "var(--accent)",
  border: "1px solid var(--border)",
  borderRadius: "3px",
  textDecoration: "none",
};

const featuresStyle: React.CSSProperties = {
  position: "absolute",
  right: "5vw",
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  gap: "0.65rem",
  zIndex: 3,
};

const chipStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  background: "rgba(250,250,248,0.82)",
  border: "1px solid var(--border-soft)",
  borderRadius: "6px",
  padding: "0.55rem 0.9rem",
  backdropFilter: "blur(8px)",
  boxShadow: "var(--shadow-sm)",
};

const chipLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "var(--text-2)",
};

const scrollHintStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "2.5rem",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.4rem",
  zIndex: 3,
  transition: "opacity 0.3s",
};

const scrollHintTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.6rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--text-3)",
};
