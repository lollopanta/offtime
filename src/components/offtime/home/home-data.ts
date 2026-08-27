import type { Event } from "@/components/offtime/event-card"

export type Campaign = {
  id: string
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  href: string
  image: string
  imageAlt: string
  tone: "blue" | "pink" | "violet"
}

export type GameCategory = {
  name: string
  code: string
  href: string
  tone: "blue" | "pink" | "violet" | "neutral"
  featured?: boolean
}

export const campaigns: Campaign[] = [
  {
    id: "op-17",
    eyebrow: "Nuova espansione One Piece",
    title: "OP-17 — Preordina ora",
    description:
      "Blocca il tuo display prima dell’uscita e preparati al prossimo capitolo del Grand Line.",
    ctaLabel: "Preordina OP-17",
    href: "/preordini/op-17",
    image: "https://placehold.co/1600x1000/12182b/f7f7fa?text=OP-17%0APREORDER",
    imageAlt: "Artwork temporaneo per il preorder One Piece OP-17",
    tone: "blue",
  },
  {
    id: "ebay-auctions",
    eyebrow: "Aste OFFTIME",
    title: "Pezzi rari, un’offerta alla volta.",
    description:
      "Segui le aste eBay OFFTIME per carte graduate, chase card e collezioni selezionate.",
    ctaLabel: "Vai alle aste",
    href: "/aste-ebay",
    image:
      "https://placehold.co/1600x1000/241629/f7f7fa?text=OFFTIME%0AAUCTIONS",
    imageAlt: "Artwork temporaneo per le aste eBay OFFTIME",
    tone: "violet",
  },
  {
    id: "social-drops",
    eyebrow: "Live drop",
    title: "I drop arrivano prima sui social.",
    description:
      "Unboxing, restock e occasioni lampo: guarda le live e non perdere il prossimo drop.",
    ctaLabel: "Segui OFFTIME",
    href: "/community",
    image: "https://placehold.co/1600x1000/2a1723/f7f7fa?text=SOCIAL%0ADROPS",
    imageAlt: "Artwork temporaneo per i social drop OFFTIME",
    tone: "pink",
  },
  {
    id: "store-event",
    eyebrow: "Evento in negozio",
    title: "One Piece Store Tournament",
    description:
      "Trentadue posti, premi ufficiali e una giornata intera dedicata alla community.",
    ctaLabel: "Prenota il posto",
    href: "/eventi/one-piece-store-tournament",
    image:
      "https://placehold.co/1600x1000/172044/f7f7fa?text=STORE%0ATOURNAMENT",
    imageAlt: "Artwork temporaneo per lo Store Tournament OFFTIME",
    tone: "blue",
  },
]

export const gameCategories: GameCategory[] = [
  {
    name: "Pokémon",
    code: "PKM",
    href: "/shop/pokemon",
    tone: "pink",
    featured: true,
  },
  {
    name: "One Piece",
    code: "OP",
    href: "/shop/one-piece",
    tone: "blue",
    featured: true,
  },
  {
    name: "Yu-Gi-Oh!",
    code: "YGO",
    href: "/shop/yu-gi-oh",
    tone: "violet",
    featured: true,
  },
  {
    name: "Magic: The Gathering",
    code: "MTG",
    href: "/shop/magic-the-gathering",
    tone: "neutral",
    featured: true,
  },
  {
    name: "Disney Lorcana",
    code: "LRC",
    href: "/shop/lorcana",
    tone: "violet",
    featured: true,
  },
  {
    name: "Digimon",
    code: "DGM",
    href: "/shop/digimon",
    tone: "blue",
    featured: true,
  },
  { name: "Gundam", code: "GCG", href: "/shop/gundam", tone: "blue" },
  {
    name: "Dragon Ball",
    code: "DBS",
    href: "/shop/dragon-ball",
    tone: "pink",
  },
  { name: "Naruto", code: "NRT", href: "/shop/naruto", tone: "neutral" },
  {
    name: "Riftbound",
    code: "RFB",
    href: "/shop/riftbound",
    tone: "violet",
  },
  {
    name: "Flesh and Blood",
    code: "FAB",
    href: "/shop/flesh-and-blood",
    tone: "neutral",
  },
  {
    name: "Altri TCG",
    code: "TCG+",
    href: "/shop/altri-tcg",
    tone: "neutral",
  },
]

export const homeEvents: Event[] = [
  {
    game: "One Piece",
    name: "Store Tournament",
    startsAt: "2026-09-05T15:00:00+02:00",
    availableSlots: 24,
    totalSlots: 32,
    price: 10,
    image: "https://placehold.co/720x900/172044/f7f7fa?text=ONE%20PIECE",
    href: "/eventi/one-piece-store-tournament",
  },
  {
    game: "Pokémon",
    name: "Lega del sabato",
    startsAt: "2026-09-12T10:30:00+02:00",
    availableSlots: 12,
    totalSlots: 24,
    price: 0,
    image: "https://placehold.co/720x900/2a1723/f7f7fa?text=POKEMON",
    href: "/eventi/lega-pokemon",
  },
  {
    game: "Yu-Gi-Oh!",
    name: "OTS Championship",
    startsAt: "2026-09-19T14:30:00+02:00",
    availableSlots: 3,
    totalSlots: 24,
    price: 7.5,
    image: "https://placehold.co/720x900/241629/f7f7fa?text=YU-GI-OH",
    href: "/eventi/ots-championship",
  },
  {
    game: "Magic: The Gathering",
    name: "Friday Night Magic",
    startsAt: "2026-09-25T20:45:00+02:00",
    availableSlots: 0,
    totalSlots: 16,
    price: 15,
    image: "https://placehold.co/720x900/181b24/f7f7fa?text=MAGIC",
    href: "/eventi/friday-night-magic",
  },
]
