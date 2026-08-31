export interface CommunityReel {
  embedUrl: string;
  id: string;
  label: string;
  url: string;
}

export interface CommunityPhoto {
  alt: string;
  src: string;
}

export const communityContent = {
  featuredEventIds: ["one-piece-store-tournament", "lega-pokemon"],
  instagramUrl: "https://www.instagram.com/offtime.store",
  mapEmbedUrl:
    "https://www.google.com/maps?q=41.8652603,12.5315469&z=16&output=embed",
  mapUrl: "https://maps.app.goo.gl/J5pKo5H9rUtLKD1i9",
  photos: [] as readonly CommunityPhoto[],
  reels: [] as readonly CommunityReel[],
  storeAddress: "Via Appia Nuova, 673/675 · Roma",
  tiktokUrl: "https://www.tiktok.com/@offtimestore?_r=1&_t=zn-925xiq9fy6i",
  whatsappUrl: "https://chat.whatsapp.com/LlQDZdEqqKo1I33Mm6mUuL",
} as const;
