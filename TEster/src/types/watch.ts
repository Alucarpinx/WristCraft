export type PartKey =
  | "case"
  | "dial"
  | "hands"
  | "strap"
  | "crystal"
  | "movement";

export interface PartOption {
  id: string;
  name: string;
  price: number;
  color: string;
  hex: string;
}

export interface PartSection {
  label: string;
  options: PartOption[];
}

export interface WatchBuild {
  case: string;
  dial: string;
  hands: string;
  strap: string;
  crystal: string;
  movement: string;
}

export interface CommunityBuild {
  id: number;
  name: string;
  author: string;
  price: number;
  likes: number;
  emoji: string;
  tags: string[];
  parts: WatchBuild;
}

export interface Guide {
  id: number;
  type: "official" | "community";
  title: string;
  excerpt: string;
  author: string;
  read: string;
  banner: string;
  emoji: string;
}
