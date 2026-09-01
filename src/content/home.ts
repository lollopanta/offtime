import { events } from "@/domain/events";

export interface CampaignContent {
  ctaLabel: string;
  description: string;
  eyebrow: string;
  title: string;
}

export interface Campaign {
  accessibleLabel: string;
  artworkOnly?: boolean;
  content?: CampaignContent;
  href: string;
  id: string;
  image: string;
  imageAlt: string;
  tone: "blue" | "pink" | "violet";
}

export interface GameCategory {
  code: string;
  featured?: boolean;
  href: string;
  image: string;
  name: string;
  tone: "blue" | "pink" | "violet" | "neutral";
}

export const campaigns: Campaign[] = [
  {
    accessibleLabel: "Preordini One Piece OP-17",
    artworkOnly: true,
    href: "/preordini",
    id: "op-17",
    image: "https://dnacards.it/wp-content/uploads/2026/08/op17-jp-desk.webp",
    imageAlt: "Artwork per il preorder One Piece OP-17",
    tone: "blue",
  },
  {
    accessibleLabel: "Aste OFFTIME",
    content: {
      ctaLabel: "Vai alle aste",
      description:
        "Segui le aste OFFTIME per carte graduate, chase card e collezioni selezionate.",
      eyebrow: "Aste OFFTIME",
      title: "Pezzi rari, un’offerta alla volta.",
    },
    href: "/shop?sort=price-desc",
    id: "ebay-auctions",
    image: "https://i.imgur.com/zodb6VD.jpeg",
    imageAlt: "Artwork per le aste eBay OFFTIME",
    tone: "violet",
  },
  {
    accessibleLabel: "Pokémon TCG: collezioni",
    content: {
      ctaLabel: "Scopri i set",
      description: "Dai un'occhiata alle collezioni di carte Pokemon.",
      eyebrow: "Pokemon",
      title: "Colleziona la prossima evoluzione.",
    },
    href: "/shop/pokemon?sort=price-desc",
    id: "pokemon-collections",
    image: "https://i.imgur.com/y2VMpfJ.jpeg",
    imageAlt: "Artwork per le collezioni Pokémon",
    tone: "violet",
  },
  {
    accessibleLabel: "Live drop OFFTIME",
    content: {
      ctaLabel: "Segui OFFTIME",
      description:
        "Unboxing, restock e occasioni lampo: guarda le live e non perdere il prossimo drop.",
      eyebrow: "Live drop",
      title: "I drop arrivano prima sui social.",
    },
    href: "/community",
    id: "social-drops",
    image: "https://i.imgur.com/ix9aWEC.jpeg",
    imageAlt: "Artwork per i social drop OFFTIME",
    tone: "pink",
  },
];

export const gameCategories: GameCategory[] = [
  {
    code: "PKM",
    featured: true,
    href: "/shop/pokemon",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Pok%C3%A9mon_Trading_Card_Game_logo.svg/1280px-Pok%C3%A9mon_Trading_Card_Game_logo.svg.png?utm_source=it.wikipedia.org&utm_campaign=index&utm_content=thumbnail",
    name: "Pokémon",
    tone: "pink",
  },
  {
    code: "OP",
    featured: true,
    href: "/shop/one-piece",
    image:
      "https://static.wixstatic.com/media/3c2f61_f81242658a2d4c608d96eaddfa8d4bde~mv2.png/v1/fill/w_560,h_314,al_c/3c2f61_f81242658a2d4c608d96eaddfa8d4bde~mv2.png",
    name: "One Piece",
    tone: "blue",
  },
  {
    code: "YGO",
    featured: true,
    href: "/shop/yu-gi-oh",
    image:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/0359f770-0e1b-4564-8d42-2f6de88fc7ae/djfyaww-003d0120-f129-49a3-96d1-eee0abf79131.png",
    name: "Yu-Gi-Oh!",
    tone: "violet",
  },
  {
    code: "MTG",
    featured: true,
    href: "/shop/magic",
    image:
      "https://gomgomcards.com/wp-content/uploads/2025/12/magic-1024x344.webp",
    name: "Magic: The Gathering",
    tone: "neutral",
  },
  {
    code: "LRC",
    featured: true,
    href: "/shop/lorcana",
    image:
      "https://gomgomcards.com/wp-content/uploads/2025/12/lorcana-1024x444.webp",
    name: "Disney Lorcana",
    tone: "violet",
  },
  {
    code: "DGM",
    featured: true,
    href: "/shop/digimon",
    image: "https://gomgomcards.com/wp-content/uploads/2025/12/digimon.webp",
    name: "Digimon",
    tone: "blue",
  },
];

export const homeEvents = events;
