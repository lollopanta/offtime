export interface ChapterTextures {
  backCard: string;
  backLabel: string;
  frontCard: string;
  frontLabel: string;
}

export interface Chapter {
  /** Environment color palette */
  env: {
    bg: string;
    accent: string;
    rimLight: string;
    ambientIntensity: number;
  };
  eyebrow: string;
  id: string;
  layout: "text-right" | "text-left";
  model: string;
  subtitle?: string;
  textures: ChapterTextures;
  title: string;
}

export const chapters: Chapter[] = [
  {
    env: {
      accent: "#c0392b",
      ambientIntensity: 0.35,
      bg: "#160908",
      rimLight: "#e67e22",
    },
    eyebrow: "01 · Fuoco & Icone",
    id: "charizard",
    layout: "text-right",
    model: "/models/PSA_Charizard_Textured.glb",
    subtitle:
      "Le collezioni portano con sé storie, ricordi e pietre miliari del collezionismo. Anche i pezzi storici che riposano nei raccoglitori meritano di trovare un nuovo appassionato.",
    textures: {
      backCard: "/models/charizard_back.jpeg",
      backLabel: "/models/psa_label_back.jpg",
      frontCard: "/models/charizard_front.jpg",
      frontLabel: "/models/psa_label_front.jpg",
    },
    title: "Alcune carte\nnon si dimenticano.",
  },
  {
    env: {
      accent: "#8b68d7",
      ambientIntensity: 0.3,
      bg: "#0d0917",
      rimLight: "#ef75aa",
    },
    eyebrow: "02 · Ombra & Segreti",
    id: "gengar",
    layout: "text-left",
    model: "/models/PSA_Gengar_Textured.glb",
    subtitle:
      "Singole carte nascoste, binder completi, carte dimenticate nei cassetti: ogni pezzo ha un potenziale da riscoprire.",
    textures: {
      backCard: "/models/charizard_back.jpeg",
      backLabel: "/models/psa_label_back.jpg",
      frontCard: "/models/gengar_front.png",
      frontLabel: "/models/psa_gengar_label_front.jpg",
    },
    title: "Ogni collezione nasconde\nqualcosa di speciale.",
  },
  {
    env: {
      accent: "#94a3b8",
      ambientIntensity: 0.5,
      bg: "#1a1f2c",
      rimLight: "#e2e8f0",
    },
    eyebrow: "03 · Nuvole & Libertà",
    id: "luffy",
    layout: "text-right",
    model: "/models/PSA_Luffy_Textured.glb",
    subtitle:
      "Vendere carte non è la fine di una passione, ma l'inizio della prossima avventura: nuovi set, nuovi deck o semplicemente spazio per nuovi traguardi.",
    textures: {
      backCard: "/models/one_piece_back.jpg",
      backLabel: "/models/psa_label_back.jpg",
      frontCard: "/models/luffy_front.jpg",
      frontLabel: "/models/luffy_psalabel_front.jpg",
    },
    title: "È il momento\ndel prossimo capitolo.",
  },
];

export const SCROLL_SECTIONS = {
  charizard: [0.12, 0.3],
  cta: [0.88, 1],
  gengar: [0.4, 0.58],
  intro: [0, 0.12],
  luffy: [0.68, 0.88],
  transitionFireShadow: [0.3, 0.4],
  transitionShadowCloud: [0.58, 0.68],
} as const;
