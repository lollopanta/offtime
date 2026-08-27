export type ProductStatus = "available" | "preorder" | "sale" | "sold-out"

export type Product = {
  game: string
  name: string
  type: string
  language: string
  price: number
  status: ProductStatus
  image: string
  href?: string
  imageAlt?: string
  originalPrice?: number
}

export const temporaryProducts: Product[] = [
  {
    game: "One Piece",
    name: "OP-09 Emperors in the New World",
    type: "Booster Box",
    language: "ENG",
    price: 119.9,
    status: "available",
    image:
      "https://gomgomcards.com/wp-content/uploads/2026/02/op09-sealed-booster-box-eng-gom-gomwatermark.webp",
    href: "/prodotto/op-09-emperors-in-the-new-world",
  },
  {
    game: "One Piece",
    name: "OP-10 Royal Blood Booster Box",
    type: "Booster Box",
    language: "ENG",
    price: 109.9,
    status: "preorder",
    image:
      "https://placehold.co/900x1125/172044/f7f7fa?text=OP-10%0ABOOSTER+BOX",
    href: "/prodotto/op-10-royal-blood-booster-box",
  },
  {
    game: "Pokémon",
    name: "Mega Evolution Elite Trainer Box",
    type: "Elite Trainer Box",
    language: "ITA",
    price: 64.9,
    originalPrice: 74.9,
    status: "sale",
    image:
      "https://placehold.co/900x1125/2a1723/f7f7fa?text=MEGA+EVOLUTION%0AETB",
    href: "/prodotto/mega-evolution-elite-trainer-box",
  },
  {
    game: "Magic: The Gathering",
    name: "Final Fantasy Collector Booster Box",
    type: "Collector Booster Box",
    language: "ENG",
    price: 449.9,
    status: "sold-out",
    image:
      "https://placehold.co/900x1125/181b24/f7f7fa?text=FINAL+FANTASY%0ACOLLECTOR+BOX",
    href: "/prodotto/final-fantasy-collector-booster-box",
  },
  {
    game: "Disney Lorcana",
    name: "Reign of Jafar Booster Display",
    type: "Booster Box",
    language: "ENG",
    price: 124.9,
    status: "available",
    image:
      "https://placehold.co/900x1125/241629/f7f7fa?text=REIGN+OF+JAFAR%0ABOOSTER+DISPLAY",
    href: "/prodotto/reign-of-jafar-booster-display",
  },
]
