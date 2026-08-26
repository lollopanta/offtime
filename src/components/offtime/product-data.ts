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
    image: "https://i.imgur.com/FltJi1C.png",
    href: "/prodotto/op-09-emperors-in-the-new-world",
  },
  {
    game: "One Piece",
    name: "OP-10 Royal Blood Booster Box",
    type: "Booster Box",
    language: "ENG",
    price: 109.9,
    status: "preorder",
    image: "https://picsum.photos/seed/offtime-one-piece/900/1125",
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
    image: "https://picsum.photos/seed/offtime-pokemon/900/1125",
    href: "/prodotto/mega-evolution-elite-trainer-box",
  },
  {
    game: "Magic: The Gathering",
    name: "Final Fantasy Collector Booster Box",
    type: "Collector Booster Box",
    language: "ENG",
    price: 449.9,
    status: "sold-out",
    image: "https://picsum.photos/seed/offtime-mtg/900/1125",
    href: "/prodotto/final-fantasy-collector-booster-box",
  },
]
