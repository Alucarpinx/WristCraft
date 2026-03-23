"use client";

// app/page.tsx — Landing Page
//
// How the scroll animation works:
// 1. The page is very tall (500vh) so the user scrolls a long distance
// 2. The canvas is "sticky" — it stays fixed in the viewport while the user scrolls
// 3. We track scroll position and convert it to a 0–1 number (scrollProgress)
// 4. That number gets passed to WatchScene which moves the camera closer
// 5. Marketing sections are positioned absolutely at different scroll depths
//    and fade in using CSS as the user reaches them

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import WatchScene from "@/components/builder/WatchScene";
import { DEFAULT_BUILD } from "@/lib/watchData";

// Each "beat" of the landing page — what shows at what scroll depth
const STORY_BEATS = [
  {
    scrollStart: 0, // visible from 0% scroll
    scrollEnd: 25, // fades out at 25% scroll
    eyebrow: "Introducing WristCraft",
    headline: "Your watch.\nYour rules.",
    body: "The first real-time 3D watch configurator built for enthusiasts, collectors, and dreamers.",
  },
  {
    scrollStart: 25,
    scrollEnd: 55,
    eyebrow: "Every component. Your choice.",
    headline: "Built from\nthe inside out.",
    body: "Choose your movement, case, dial, crystal, hands, and strap. See every change reflected instantly in full 3D.",
  },
  {
    scrollStart: 55,
    scrollEnd: 80,
    eyebrow: "Community",
    headline: "Share what\nyou've made.",
    body: "Browse thousands of community builds. Load any configuration into your builder with one click.",
  },
  {
    scrollStart: 80,
    scrollEnd: 100,
    eyebrow: "Ready?",
    headline: "Start building\ntoday.",
    body: "It's free. No account required to explore. Sign up when you're ready to save and share.",
  },
];

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [scrollPercent, setScrollPercent] = useState(0); // 0 to 100

  // Track scroll position and convert to a percentage
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollTop = window.scrollY;
      const totalScrollable = container.scrollHeight - window.innerHeight;
      const percent = Math.min(100, (scrollTop / totalScrollable) * 100);

      setScrollPercent(percent);
      setScrollProgress(percent / 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Figure out which story beat to show based on scroll position
  const activeBeat =
    STORY_BEATS.findLast((beat) => scrollPercent >= beat.scrollStart) ??
    STORY_BEATS[0];

  // How visible is the current beat? Fades in at start, out before end
  const beatProgress = (() => {
    const { scrollStart, scrollEnd } = activeBeat;
    const fadeIn = 5; // percent of scroll to fade in
    const fadeOut = 8; // percent of scroll to fade out before next beat

    if (scrollPercent < scrollStart + fadeIn) {
      return (scrollPercent - scrollStart) / fadeIn;
    }
    if (scrollPercent > scrollEnd - fadeOut) {
      return (scrollEnd - scrollPercent) / fadeOut;
    }
    return 1;
  })();

  const opacity = Math.max(0, Math.min(1, beatProgress));

  return (
    // The outer container is tall — this is what makes scrolling possible
    <div ref={containerRef} style={{ height: "500vh", position: "relative" }}>
      {/* ── Sticky canvas wrapper — stays in viewport as user scrolls ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background:
            "radial-gradient(ellipse at 50% 60%, #1a1a2e 0%, #0a0a0f 70%)",
        }}
      >
        {/* Subtle gold glow that intensifies as you scroll in */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 65%)",
            opacity: scrollProgress * 2,
            pointerEvents: "none",
            transition: "opacity 0.1s",
          }}
        />

        {/* The 3D watch — takes the full canvas */}
        <WatchScene
          build={DEFAULT_BUILD}
          scrollProgress={scrollProgress}
          interactive={false} // auto-spins on landing, no drag needed
          className="w-full h-full"
        />

        {/* ── Story text overlay ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          {/* Left side text block */}
          <div
            style={{
              marginLeft: "8vw",
              maxWidth: 480,
              opacity,
              transform: `translateY(${(1 - opacity) * 24}px)`,
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#c9a84c",
                marginBottom: "1rem",
              }}
            >
              {activeBeat.eyebrow}
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                color: "#f5f0e8",
                marginBottom: "1.25rem",
                whiteSpace: "pre-line",
              }}
            >
              {activeBeat.headline}
            </h1>

            {/* Body */}
            <p
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "0.95rem",
                color: "#a8aab8",
                lineHeight: 1.75,
                marginBottom: "2rem",
                maxWidth: 380,
              }}
            >
              {activeBeat.body}
            </p>

            {/* CTA — only show on last beat */}
            {activeBeat.scrollStart >= 80 && (
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  pointerEvents: "all",
                }}
              >
                <Link href="/builder" style={ctaGoldStyle}>
                  Open Builder →
                </Link>
                <Link href="/community" style={ctaGhostStyle}>
                  Browse Builds
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ── Scroll indicator (fades out as user starts scrolling) ── */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: Math.max(0, 1 - scrollProgress * 5),
            transition: "opacity 0.3s",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#a8aab8",
            }}
          >
            Scroll to explore
          </span>
          {/* Animated chevron */}
          <div style={{ animation: "bounce 1.8s infinite" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 8l5 5 5-5"
                stroke="#c9a84c"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* ── Progress bar along the bottom ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2px",
            width: `${scrollPercent}%`,
            background: "linear-gradient(90deg, #7a6030, #c9a84c)",
            transition: "width 0.1s linear",
          }}
        />

        {/* ── Right side: feature chips (appear mid-scroll) ── */}
        <div
          style={{
            position: "absolute",
            right: "5vw",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            opacity: Math.min(1, Math.max(0, (scrollProgress - 0.2) * 3)),
            transition: "opacity 0.5s",
          }}
        >
          {[
            { icon: "⚙️", label: "6 Part Categories" },
            { icon: "🎨", label: "Real-time 3D" },
            { icon: "👥", label: "Community Builds" },
            { icon: "📖", label: "Guides & Blogs" },
          ].map((f) => (
            <div
              key={f.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                background: "rgba(26,26,36,0.7)",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: "4px",
                padding: "0.5rem 0.85rem",
                backdropFilter: "blur(8px)",
              }}
            >
              <span style={{ fontSize: "1rem" }}>{f.icon}</span>
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "0.75rem",
                  color: "#c8c0b0",
                }}
              >
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bounce animation keyframes */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </div>
  );
}

// ── Inline styles for CTAs ──
const ctaGoldStyle: React.CSSProperties = {
  fontFamily: "'Syne', sans-serif",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  padding: "0.75rem 1.5rem",
  background: "#c9a84c",
  color: "#0a0a0f",
  borderRadius: "2px",
  textDecoration: "none",
  transition: "background 0.2s",
};

const ctaGhostStyle: React.CSSProperties = {
  fontFamily: "'Syne', sans-serif",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  padding: "0.75rem 1.5rem",
  background: "none",
  color: "#c9a84c",
  border: "1px solid rgba(201,168,76,0.35)",
  borderRadius: "2px",
  textDecoration: "none",
};
