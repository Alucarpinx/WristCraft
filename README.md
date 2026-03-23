# WristCraft — 3D Watch Configurator

WristCraft is a real-time 3D watch builder and community platform for watch enthusiasts, collectors, and hobbyists. Inspired by the workflow of PCPartPicker but built with an aesthetic appeal, it lets users design a custom watch from individual components, visualize it in 3D, and share their builds with a community.

---

## What It Does

### Watch Builder

Users can configure a custom watch by selecting individual components across six categories — case, dial, hands, strap, crystal, and movement. Every selection updates the 3D model in real time. A summary panel tracks the estimated cost of the build and lists every selected part. Completed builds can be named and shared to the community.

### Landing Experience

The homepage features a scroll-driven 3D animation. A real GLB watch model is rendered via Three.js and zooms toward the viewer as they scroll, transitioning from a freely spinning overview to a close-up of the dial face. Text uses CSS `mix-blend-mode: difference` to remain readable against both the light background and the dark watch model simultaneously.

### Community

A filterable gallery of community-submitted watch builds. Each card shows the build name, author, component tags, estimated price, and like count. Any build can be loaded into the builder with one click, letting users remix existing configurations.

### Guides & Articles

A curated collection of watch-related guides and blog posts from both the WristCraft editorial team and the community. Articles cover topics like movement types, case materials, dial finishing techniques, and budget build walkthroughs.

---

## Tech Stack

| Layer           | Technology                                   | Why                                                                                            |
| --------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org)             | Full-stack React framework with App Router, file-based routing, and seamless Vercel deployment |
| Language        | [TypeScript](https://www.typescriptlang.org) | Static typing catches bugs at compile time and improves code maintainability                   |
| 3D Rendering    | [Three.js](https://threejs.org)              | WebGL-based 3D library powering both the landing page GLB viewer and the builder visualizer    |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com)   | Utility-first CSS with a custom design token system for the warm luxury color palette          |
| Fonts           | [Google Fonts](https://fonts.google.com)     | Cormorant Garamond (editorial serif) + Syne (geometric sans) + DM Mono (data/labels)           |
| Deployment      | [Vercel](https://vercel.com)                 | Zero-config deployment with automatic preview URLs on every push                               |
| Version Control | [GitHub](https://github.com)                 | Source control and portfolio visibility                                                        |

### Planned Additions

- **Supabase** — Postgres database + auth for saved builds and user accounts
- **React Three Fiber** — React-idiomatic wrapper around Three.js for the builder scene
- **Framer Motion** — Page transitions and micro-interactions

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page — scroll-driven 3D hero
│   ├── layout.tsx            # Root layout with Navbar
│   ├── builder/
│   │   └── page.tsx          # /builder route
│   └── community/
│       └── page.tsx          # /community route
├── components/
│   ├── nav/
│   │   └── Navbar.tsx        # Fixed top navigation
│   ├── landing/
│   │   └── LandingWatch.tsx  # GLB loader + scroll zoom animation
│   └── builder/
│       └── WatchScene.tsx    # Three.js builder scene with part swapping
├── lib/
│   └── watchData.ts          # All parts, pricing, community builds, guides
└── types/
    └── watch.ts              # TypeScript interfaces for all data shapes
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 10+

### Installation

```bash
git clone https://github.com/Alucarpinx/wristcraft.git
cd wristcraft
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

````bash
npm run build
npm start

---

## Design System

The UI uses a warm aesthetic built around CSS custom properties:

```css
--bg: #fafaf8 /* warm white page background */ --surface: #f2efe9
  /* card and panel surfaces */ --text: #1c1917 /* near-black primary text */
  --accent: #8b7355 /* refined bronze accent */ --accent-2: #c4a882
  /* light bronze */;
````

Typography pairs **Cormorant Garamond** (display headings) with **Syne** (UI text) and **DM Mono** (labels and data).

---

## Roadmap

- [x] Scroll-driven landing page with 3D GLB watch
- [x] Light design system
- [x] Community builds grid with filtering
- [x] Guides and articles section
- [ ] Full builder with real-time 3D part swapping
- [ ] User authentication via Supabase
- [ ] Save and share builds
- [ ] Like and comment on community builds
- [ ] Mobile responsive layout

---

## License

MIT — free to use, modify, and distribute.

---

_Built as a portfolio project demonstrating React, Three.js, Next.js, and modern frontend development practices._
