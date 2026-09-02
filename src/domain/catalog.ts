export type ProductStatus = "available" | "preorder" | "sale" | "sold-out";

export interface Product {
  availability: number;
  description: string;
  game: string;
  gameSlug: string;
  id: string;
  image: string;
  imageAlt: string;
  images: readonly string[];
  language: string;
  name: string;
  originalPrice?: number;
  price: number;
  rank: number;
  set: string;
  sku: string;
  slug: string;
  status: ProductStatus;
  type: string;
}

export interface CatalogFilters {
  gameSlug?: string;
  languages?: readonly string[];
  query?: string;
  statuses?: readonly ProductStatus[];
  types?: readonly string[];
}

export type CatalogSort = "newest" | "price-asc" | "price-desc" | "name";

const image = (label: string, tone: string) =>
  `https://placehold.co/900x1125/${tone}/f7f7fa?text=${encodeURIComponent(label)}`;
const record = (
  product: Omit<Product, "images" | "imageAlt"> & { imageAlt?: string }
): Product => ({
  ...product,
  imageAlt: product.imageAlt ?? `${product.name}, ${product.language}`,
  images: [product.image, image(`${product.set}\nDETAIL`, "181b24")],
});

export const products = [
  record({
    availability: 6,
    description:
      "Ventiquattro buste della nona espansione, per chi vuole aprire il Nuovo Mondo con la propria crew.",
    game: "One Piece",
    gameSlug: "one-piece",
    id: "op09-bb-eng",
    image: "/products/op-09-emperors-in-the-new-world.png",
    language: "ENG",
    name: "OP-09 Emperors in the New World",
    price: 119.9,
    rank: 1,
    set: "OP-09",
    sku: "OP09-ENG-BB",
    slug: "op-09-emperors-in-the-new-world",
    status: "available",
    type: "Booster Box",
  }),
  record({
    availability: 18,
    description:
      "Booster box disponibile in preorder. Contatta OFFTIME per informazioni sulla disponibilità.",
    game: "One Piece",
    gameSlug: "one-piece",
    id: "op10-bb-eng",
    image: "/products/op-10-royal-blood.png",
    language: "ENG",
    name: "OP-10 Royal Blood Booster Box",
    price: 109.9,
    rank: 2,
    set: "OP-10",
    sku: "OP10-ENG-BB",
    slug: "op-10-royal-blood-booster-box",
    status: "preorder",
    type: "Booster Box",
  }),
  record({
    availability: 4,
    description:
      "Un box italiano dedicato alle due leggende che hanno cambiato la rotta della Grand Line.",
    game: "One Piece",
    gameSlug: "one-piece",
    id: "op08-bb-eng",
    image: "/products/op-08-two-legends.png",
    language: "ENG",
    name: "OP-08 Two Legends Booster Box",
    originalPrice: 114.9,
    price: 104.9,
    rank: 5,
    set: "OP-08",
    sku: "OP08-ENG-BB",
    slug: "op-08-two-legends-booster-box",
    status: "sale",
    type: "Booster Box",
  }),
  record({
    availability: 22,
    description:
      "Due buste e una carta DON!! in un formato compatto da aggiungere al raccoglitore.",
    game: "One Piece",
    gameSlug: "one-piece",
    id: "op07-starter-eng",
    image: image("OP-07\nDOUBLE PACK", "172044"),
    language: "ENG",
    name: "OP-07 500 Years in the Future Double Pack",
    price: 12.9,
    rank: 12,
    set: "OP-07",
    sku: "OP07-ENG-DP",
    slug: "op-07-500-years-in-the-future-double-pack",
    status: "available",
    type: "Double Pack",
  }),
  record({
    availability: 9,
    description:
      "Un Elite Trainer Box completo per tornare alle Mega Evoluzioni con bustine, accessori e raccoglitore.",
    game: "Pokémon",
    gameSlug: "pokemon",
    id: "pkm-mega-etb-ita",
    image: "/products/mega-evolution-etb.png",
    language: "ITA",
    name: "Mega Evolution Elite Trainer Box",
    originalPrice: 74.9,
    price: 64.9,
    rank: 3,
    set: "Mega Evolution",
    sku: "PKM-ME-ITA-ETB",
    slug: "mega-evolution-elite-trainer-box",
    status: "sale",
    type: "Elite Trainer Box",
  }),
  record({
    availability: 14,
    description:
      "Un punto di partenza curato per le rivalità più iconiche del GCC Pokémon.",
    game: "Pokémon",
    gameSlug: "pokemon",
    id: "pkm-destined-rivals-etb-eng",
    image: "/products/destined-rivals-etb.png",
    language: "ENG",
    name: "Destined Rivals Elite Trainer Box",
    price: 59.9,
    rank: 7,
    set: "Destined Rivals",
    sku: "PKM-DR-ENG-ETB",
    slug: "destined-rivals-elite-trainer-box",
    status: "available",
    type: "Elite Trainer Box",
  }),
  record({
    availability: 0,
    description:
      "Una collezione premium con accessori e carte promozionali dedicate alle evoluzioni più ricercate.",
    game: "Pokémon",
    gameSlug: "pokemon",
    id: "pkm-prismatic-collection",
    image: image("PRISMATIC\nPREMIUM", "2a1723"),
    language: "ENG",
    name: "Prismatic Evolutions Super-Premium Collection",
    price: 219.9,
    rank: 14,
    set: "Prismatic Evolutions",
    sku: "PKM-PE-ENG-SPC",
    slug: "prismatic-evolutions-super-premium-collection",
    status: "sold-out",
    type: "Premium Collection",
  }),
  record({
    availability: 12,
    description:
      "Preordine per un box dedicato ai Pokémon dei partner e alle loro storie condivise.",
    game: "Pokémon",
    gameSlug: "pokemon",
    id: "pkm-journey-together-bb",
    image: image("JOURNEY\nTOGETHER", "2a1723"),
    language: "ENG",
    name: "Journey Together Booster Box",
    price: 149.9,
    rank: 9,
    set: "Journey Together",
    sku: "PKM-JT-ENG-BB",
    slug: "journey-together-booster-box",
    status: "preorder",
    type: "Booster Box",
  }),
  record({
    availability: 0,
    description:
      "Trenta Play Booster in inglese per rivivere personaggi, luoghi e momenti iconici di Final Fantasy.",
    game: "Magic: The Gathering",
    gameSlug: "magic",
    id: "mtg-final-fantasy-pb",
    image: "/products/final-fantasy-play-booster.png",
    language: "ENG",
    name: "Final Fantasy Play Booster Box",
    price: 449.9,
    rank: 4,
    set: "Final Fantasy",
    sku: "MTG-FF-ENG-PB",
    slug: "final-fantasy-play-booster-box",
    status: "sold-out",
    type: "Play Booster Box",
  }),
  record({
    availability: 7,
    description:
      "Dodici Collector Booster da quindici carte con trattamenti speciali, draghi e tesori di Tarkir.",
    game: "Magic: The Gathering",
    gameSlug: "magic",
    id: "mtg-tarkir-cb",
    image: "/products/tarkir-dragonstorm-collector.png",
    language: "ENG",
    name: "Tarkir: Dragonstorm Collector Booster Box",
    price: 139.9,
    rank: 6,
    set: "Tarkir: Dragonstorm",
    sku: "MTG-TDM-ENG-CB",
    slug: "tarkir-dragonstorm-collector-booster-box",
    status: "available",
    type: "Collector Booster Box",
  }),
  record({
    availability: 11,
    description:
      "Buste, terre e accessori per mettere in moto la tua prossima collezione Magic.",
    game: "Magic: The Gathering",
    gameSlug: "magic",
    id: "mtg-aetherdrift-bundle",
    image: image("AETHERDRIFT\nBUNDLE", "181b24"),
    language: "ITA",
    name: "Aetherdrift Bundle",
    price: 49.9,
    rank: 11,
    set: "Aetherdrift",
    sku: "MTG-DFT-ITA-BND",
    slug: "aetherdrift-bundle",
    status: "available",
    type: "Bundle",
  }),
  record({
    availability: 8,
    description:
      "Un display Lorcana per scoprire il regno di Jafar e ampliare il tuo mazzo illumineer.",
    game: "Disney Lorcana",
    gameSlug: "lorcana",
    id: "lorcana-jafar-display",
    image: "/products/reign-of-jafar-display.png",
    language: "ENG",
    name: "Reign of Jafar Booster Display",
    price: 124.9,
    rank: 8,
    set: "Reign of Jafar",
    sku: "LRC-ROJ-ENG-DSP",
    slug: "reign-of-jafar-booster-display",
    status: "available",
    type: "Booster Display",
  }),
  record({
    availability: 16,
    description:
      "Preordine per un display italiano pieno di personaggi e racconti dall’isola di Archazia.",
    game: "Disney Lorcana",
    gameSlug: "lorcana",
    id: "lorcana-archazia-bb",
    image: image("ARCHAZIA'S\nISLAND", "241629"),
    language: "ITA",
    name: "Archazia’s Island Booster Display",
    price: 119.9,
    rank: 10,
    set: "Archazia’s Island",
    sku: "LRC-AI-ITA-DSP",
    slug: "archazias-island-booster-display",
    status: "preorder",
    type: "Booster Display",
  }),
  record({
    availability: 10,
    description:
      "Ventiquattro buste per aggiornare i tuoi archetipi e inseguire le carte più cercate dell’espansione.",
    game: "Yu-Gi-Oh!",
    gameSlug: "yu-gi-oh",
    id: "ygo-alliance-insight-bb",
    image: image("ALLIANCE\nINSIGHT", "24203a"),
    language: "ENG",
    name: "Alliance Insight Booster Box",
    price: 69.9,
    rank: 13,
    set: "Alliance Insight",
    sku: "YGO-ALIN-ENG-BB",
    slug: "alliance-insight-booster-box",
    status: "available",
    type: "Booster Box",
  }),
  record({
    availability: 5,
    description:
      "Una tin da collezione per celebrare le ristampe Quarter Century più amate.",
    game: "Yu-Gi-Oh!",
    gameSlug: "yu-gi-oh",
    id: "ygo-quarter-century-tin",
    image: image("QUARTER CENTURY\nTIN", "24203a"),
    language: "ITA",
    name: "Quarter Century Stampede Tin",
    originalPrice: 29.9,
    price: 24.9,
    rank: 15,
    set: "Quarter Century Stampede",
    sku: "YGO-QCST-ITA-TIN",
    slug: "quarter-century-stampede-tin",
    status: "sale",
    type: "Tin",
  }),
  record({
    availability: 3,
    description:
      "Un box speciale che riunisce due set per rimettere in campo i tuoi Digimon preferiti.",
    game: "Digimon",
    gameSlug: "digimon",
    id: "digimon-special-release",
    image: image("DIGIMON\nSPECIAL 2.0", "17313a"),
    language: "ENG",
    name: "Special Release Booster 2.0",
    price: 94.9,
    rank: 16,
    set: "BT-18/19",
    sku: "DGM-BT18-19-ENG",
    slug: "special-release-booster-2-0",
    status: "available",
    type: "Booster Box",
  }),
] as const satisfies readonly Product[];

export const productPath = (product: Product) => `/prodotto/${product.slug}`;

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProducts(filters: CatalogFilters = {}) {
  const query = filters.query?.trim().toLocaleLowerCase("it-IT");

  return products.filter((product) => {
    if (filters.gameSlug && product.gameSlug !== filters.gameSlug) {
      return false;
    }
    if (filters.statuses && !filters.statuses.includes(product.status)) {
      return false;
    }
    if (filters.types && !filters.types.includes(product.type)) {
      return false;
    }
    if (filters.languages && !filters.languages.includes(product.language)) {
      return false;
    }
    if (!query) {
      return true;
    }

    return [
      product.game,
      product.name,
      product.set,
      product.type,
      product.language,
    ].some((value) => value.toLocaleLowerCase("it-IT").includes(query));
  });
}
export function getRelatedProducts(product: Product, limit = 4) {
  return getProducts({ gameSlug: product.gameSlug })
    .filter((candidate) => candidate.id !== product.id)
    .sort((first, second) => {
      const sameSetDifference =
        Number(second.set === product.set) - Number(first.set === product.set);
      if (sameSetDifference !== 0) {
        return sameSetDifference;
      }
      const sameTypeDifference =
        Number(second.type === product.type) -
        Number(first.type === product.type);
      if (sameTypeDifference !== 0) {
        return sameTypeDifference;
      }
      return first.rank - second.rank;
    })
    .slice(0, Math.max(0, limit));
}

export const productTypes = [
  ...new Set(products.map((product) => product.type)),
].sort((first, second) => first.localeCompare(second, "it"));

export const productLanguages = [
  ...new Set(products.map((product) => product.language)),
].sort((first, second) => first.localeCompare(second, "it"));

export function sortProducts(items: readonly Product[], sort: CatalogSort) {
  return [...items].sort((first, second) => {
    if (sort === "price-asc") {
      return first.price - second.price;
    }
    if (sort === "price-desc") {
      return second.price - first.price;
    }
    if (sort === "name") {
      return first.name.localeCompare(second.name, "it");
    }
    return first.rank - second.rank;
  });
}

export const games = Array.from(
  new Map(
    products.map((product) => [product.gameSlug, product.game])
  ).entries(),
  ([slug, name]) => ({ name, slug })
);
