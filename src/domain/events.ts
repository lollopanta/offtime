export interface Event {
  availableSlots: number;
  date?: string;
  game: string;
  href: string;
  id: string;
  image: string;
  imageAlt?: string;
  name: string;
  price: number;
  startsAt: string;
  time?: string;
  totalSlots: number;
}

export const events = [
  {
    availableSlots: 24,
    game: "One Piece",
    href: "/eventi/one-piece-store-tournament",
    id: "one-piece-store-tournament",
    image:
      "https://www.tcgplayer.it/public/Images/8CH4qs28b8BEc9uaDkB21A%3d%3d/images/2025/OTTOBRE/banner_store_tournament_2025_vol4_op.jpg",
    name: "Store Tournament",
    price: 10,
    startsAt: "2026-09-05T15:00:00+02:00",
    totalSlots: 32,
  },
  {
    availableSlots: 12,
    game: "Pokémon",
    href: "/eventi/lega-pokemon",
    id: "lega-pokemon",
    image: "https://placehold.co/720x900/2a1723/f7f7fa?text=POKEMON",
    name: "Lega del sabato",
    price: 0,
    startsAt: "2026-09-12T10:30:00+02:00",
    totalSlots: 24,
  },
  {
    availableSlots: 3,
    game: "Yu-Gi-Oh!",
    href: "/eventi/ots-championship",
    id: "ots-championship",
    image: "https://placehold.co/720x900/241629/f7f7fa?text=YU-GI-OH",
    name: "OTS Championship",
    price: 7.5,
    startsAt: "2026-09-19T14:30:00+02:00",
    totalSlots: 24,
  },
  {
    availableSlots: 0,
    game: "Magic: The Gathering",
    href: "/eventi/friday-night-magic",
    id: "friday-night-magic",
    image: "https://placehold.co/720x900/181b24/f7f7fa?text=MAGIC",
    name: "Friday Night Magic",
    price: 15,
    startsAt: "2026-09-25T20:45:00+02:00",
    totalSlots: 16,
  },
] as const satisfies readonly Event[];

export function getEventBySlug(slug: string) {
  return events.find((event) => event.id === slug);
}

export function getEventStatus(event: Event) {
  if (event.availableSlots <= 0) {
    return "sold-out" as const;
  }

  return event.availableSlots <= Math.ceil(event.totalSlots * 0.2)
    ? ("almost-full" as const)
    : ("available" as const);
}
