import {
  PartKey,
  PartSection,
  WatchBuild,
  CommunityBuild,
  Guide,
} from "@/types/watch";

export const PARTS: Record<PartKey, PartSection> = {
  case: {
    label: "Case",
    options: [
      {
        id: "c1",
        name: "Brushed Steel 40mm",
        price: 420,
        color: "#a8aab8",
        hex: "#b8bac8",
      },
      {
        id: "c2",
        name: "Polished Rose Gold 38mm",
        price: 680,
        color: "#c9907a",
        hex: "#d4a090",
      },
      {
        id: "c3",
        name: "Matte Black PVD 42mm",
        price: 590,
        color: "#2a2a38",
        hex: "#3a3a4a",
      },
      {
        id: "c4",
        name: "18k Yellow Gold 36mm",
        price: 2400,
        color: "#c9a84c",
        hex: "#d4b860",
      },
    ],
  },
  dial: {
    label: "Dial",
    options: [
      {
        id: "d1",
        name: "Sunray Black",
        price: 180,
        color: "#1a1a24",
        hex: "#0a0a18",
      },
      {
        id: "d2",
        name: "Cream Linen",
        price: 160,
        color: "#f0e8d8",
        hex: "#e8dcc8",
      },
      {
        id: "d3",
        name: "Deep Navy",
        price: 195,
        color: "#1a2a4a",
        hex: "#1e3260",
      },
      {
        id: "d4",
        name: "Forest Green",
        price: 210,
        color: "#2a3a2a",
        hex: "#2e4630",
      },
      {
        id: "d5",
        name: "Salmon Lacquer",
        price: 220,
        color: "#c88870",
        hex: "#d49080",
      },
    ],
  },
  hands: {
    label: "Hands",
    options: [
      {
        id: "h1",
        name: "Dauphine Polished",
        price: 95,
        color: "#d0d0d8",
        hex: "#e0e0e8",
      },
      {
        id: "h2",
        name: "Baton Gold-Filled",
        price: 140,
        color: "#c9a84c",
        hex: "#d4b860",
      },
      {
        id: "h3",
        name: "Skeleton Open-Work",
        price: 280,
        color: "#808090",
        hex: "#909098",
      },
      {
        id: "h4",
        name: "Sword Blued Steel",
        price: 175,
        color: "#4a6080",
        hex: "#506878",
      },
    ],
  },
  strap: {
    label: "Strap / Bracelet",
    options: [
      {
        id: "s1",
        name: "Tan Calfskin",
        price: 85,
        color: "#a07848",
        hex: "#b08858",
      },
      {
        id: "s2",
        name: "Black Alligator",
        price: 340,
        color: "#1a1a1a",
        hex: "#252525",
      },
      {
        id: "s3",
        name: "Oyster Bracelet",
        price: 560,
        color: "#a8aab8",
        hex: "#b8bac8",
      },
      {
        id: "s4",
        name: "NATO Navy/Red",
        price: 45,
        color: "#1a2a4a",
        hex: "#1e3260",
      },
      {
        id: "s5",
        name: "Rubber Sport",
        price: 65,
        color: "#2a2a38",
        hex: "#1a1a28",
      },
    ],
  },
  crystal: {
    label: "Crystal",
    options: [
      {
        id: "cr1",
        name: "Sapphire AR-Coated",
        price: 220,
        color: "#a8c8e8",
        hex: "#c8e0f0",
      },
      {
        id: "cr2",
        name: "Mineral Glass",
        price: 60,
        color: "#c8d8e8",
        hex: "#d8e8f4",
      },
      {
        id: "cr3",
        name: "Box Acrylic (Vintage)",
        price: 40,
        color: "#d8e8e0",
        hex: "#e0eee8",
      },
    ],
  },
  movement: {
    label: "Movement",
    options: [
      {
        id: "m1",
        name: "ETA 2824-2 Auto",
        price: 380,
        color: "#c09840",
        hex: "#c8a848",
      },
      {
        id: "m2",
        name: "Miyota 9015 Auto",
        price: 220,
        color: "#808090",
        hex: "#909098",
      },
      {
        id: "m3",
        name: "Seiko NH35 Auto",
        price: 140,
        color: "#707880",
        hex: "#808898",
      },
      {
        id: "m4",
        name: "In-house Tourbillon",
        price: 8500,
        color: "#c9a84c",
        hex: "#d4b860",
      },
    ],
  },
};

export const DEFAULT_BUILD: WatchBuild = {
  case: "c1",
  dial: "d1",
  hands: "h1",
  strap: "s1",
  crystal: "cr1",
  movement: "m1",
};

export const COMMUNITY_BUILDS: CommunityBuild[] = [
  {
    id: 1,
    name: "Midnight Racer",
    author: "horogeek_79",
    price: 1840,
    likes: 247,
    emoji: "⌚",
    tags: ["Sport", "Black"],
    parts: {
      case: "c3",
      dial: "d1",
      hands: "h4",
      strap: "s5",
      crystal: "cr1",
      movement: "m1",
    },
  },
  {
    id: 2,
    name: "The Heritage",
    author: "vintagedials",
    price: 2715,
    likes: 391,
    emoji: "🕰",
    tags: ["Dress", "Gold", "Featured"],
    parts: {
      case: "c4",
      dial: "d2",
      hands: "h2",
      strap: "s2",
      crystal: "cr3",
      movement: "m1",
    },
  },
  {
    id: 3,
    name: "Ocean Dive",
    author: "wrist_depth",
    price: 1245,
    likes: 183,
    emoji: "🌊",
    tags: ["Dive", "Navy"],
    parts: {
      case: "c1",
      dial: "d3",
      hands: "h1",
      strap: "s4",
      crystal: "cr1",
      movement: "m3",
    },
  },
  {
    id: 4,
    name: "Rose Soirée",
    author: "lunawatch",
    price: 3290,
    likes: 512,
    emoji: "🌹",
    tags: ["Dress", "Rose Gold", "Featured"],
    parts: {
      case: "c2",
      dial: "d5",
      hands: "h2",
      strap: "s2",
      crystal: "cr1",
      movement: "m2",
    },
  },
  {
    id: 5,
    name: "Field Commander",
    author: "mil_specs",
    price: 890,
    likes: 156,
    emoji: "🪖",
    tags: ["Field", "Green"],
    parts: {
      case: "c1",
      dial: "d4",
      hands: "h1",
      strap: "s1",
      crystal: "cr2",
      movement: "m3",
    },
  },
  {
    id: 6,
    name: "Skeleton King",
    author: "xray_wrist",
    price: 9400,
    likes: 704,
    emoji: "💀",
    tags: ["Skeleton", "Gold", "Luxury"],
    parts: {
      case: "c4",
      dial: "d1",
      hands: "h3",
      strap: "s2",
      crystal: "cr1",
      movement: "m4",
    },
  },
];

export const GUIDES: Guide[] = [
  {
    id: 1,
    type: "official",
    title: "Understanding Watch Movements: A Beginner's Atlas",
    excerpt:
      "From lever escapements to co-axial mechanisms — a deep dive into the beating hearts that power fine timepieces.",
    author: "WristCraft Team",
    read: "12 min read",
    banner: "linear-gradient(135deg, #1a1a2e, #2a1a3e)",
    emoji: "⚙️",
  },
  {
    id: 2,
    type: "official",
    title: "Case Materials Guide: Steel, Gold & Beyond",
    excerpt:
      "316L, 904L, PVD, DLC — decoding the alphabet soup of watch case finishes and what they mean for your build.",
    author: "WristCraft Team",
    read: "8 min read",
    banner: "linear-gradient(135deg, #1a2a1a, #2a3a1e)",
    emoji: "🔩",
  },
  {
    id: 3,
    type: "community",
    title: "How I Built a Field Watch Under $600",
    excerpt:
      "A step-by-step walkthrough of sourcing parts, choosing the right movement, and getting a professional finish on a budget.",
    author: "mil_specs",
    read: "15 min read",
    banner: "linear-gradient(135deg, #1a2a2a, #1e3030)",
    emoji: "🪖",
  },
  {
    id: 4,
    type: "official",
    title: "Dial Finishing Techniques: From Sunray to Guilloché",
    excerpt:
      "The art of the dial — exploring how different finishing techniques catch light, define character, and signal craftsmanship.",
    author: "WristCraft Team",
    read: "10 min read",
    banner: "linear-gradient(135deg, #2a1a1a, #3a1e1e)",
    emoji: "🌅",
  },
  {
    id: 5,
    type: "community",
    title: "My Journey to the Perfect Dress Watch",
    excerpt:
      "Three years, seven iterations, and one late-night revelation about strap width. The full story of building the Rose Soirée.",
    author: "lunawatch",
    read: "20 min read",
    banner: "linear-gradient(135deg, #2a1a24, #3a1e30)",
    emoji: "🌹",
  },
  {
    id: 6,
    type: "official",
    title: "Sapphire vs. Mineral Crystal: The Full Breakdown",
    excerpt:
      "Hardness ratings, reflectivity, repairability — everything you need to decide which crystal deserves to protect your dial.",
    author: "WristCraft Team",
    read: "6 min read",
    banner: "linear-gradient(135deg, #1a1a2e, #1e2a3e)",
    emoji: "💎",
  },
];

// Helper — calculates total price of a build
export function calculateTotal(build: WatchBuild): number {
  return (Object.keys(build) as PartKey[]).reduce((sum, key) => {
    const option = PARTS[key]?.options.find((o) => o.id === build[key]);
    return sum + (option?.price || 0);
  }, 0);
}
