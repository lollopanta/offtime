# OFFTIME Storefront

Frontend dello storefront OFFTIME, progettato per un negozio TCG con catalogo prodotti, campagne, categorie di gioco ed eventi in negozio.

Il progetto include due viste:

- `/` — homepage dello storefront;
- `/design-system` — riferimento visuale per token, componenti e stati UI.

## Stack

- React 19 e TypeScript;
- Vite 8;
- Tailwind CSS 4;
- shadcn/ui con primitive Base UI;
- Embla Carousel;
- GSAP per le animazioni editoriali;
- Geist Variable e Lucide Icons.

## Avvio locale

Richiede Node.js 20+ e pnpm.

```bash
pnpm install
pnpm dev
```

Vite mostrerà nel terminale l'indirizzo locale dell'applicazione, normalmente `http://localhost:5173`.

## Comandi

```bash
pnpm dev        # avvia il server di sviluppo
pnpm build      # controlla TypeScript e genera la build di produzione
pnpm preview    # serve localmente la build di produzione
pnpm typecheck  # esegue il controllo dei tipi
pnpm lint       # esegue ESLint sull'intero progetto
pnpm format     # formatta i file TypeScript e TSX
```

## Struttura

```text
src/
├── components/
│   ├── offtime/
│   │   ├── home/          # sezioni e dati demo della homepage
│   │   ├── event-card.tsx
│   │   ├── product-card.tsx
│   │   └── site-header.tsx
│   └── ui/                # primitive shadcn condivise
├── pages/
│   ├── design-system.tsx
│   └── storefront.tsx
├── App.tsx                # selezione della vista corrente
└── index.css              # token e stili globali OFFTIME
```

I contenuti demo della homepage si trovano in `src/components/offtime/home/home-data.ts`; i prodotti in `src/components/offtime/product-data.ts`. Logo e favicon sono in `public/`.

## UI e comportamento

- hero full-width con campagne data-driven, autoplay e navigazione tramite frecce, touch, tastiera e trackpad;
- carosello prodotti infinito, quattro elementi visibili su desktop e card più compatte su mobile;
- brand wall scalabile per le categorie TCG;
- card prodotto ed evento con stati commerciali e skeleton;
- ricerca desktop espandibile con gestione del focus;
- tema dark OFFTIME, layout responsive e supporto a `prefers-reduced-motion`.

Le regole del sistema visivo, inclusi colori, tipografia, radius e criteri di accessibilità, sono documentate in [`DESIGN.md`](./DESIGN.md).

## Stato del progetto

Questa repository contiene il frontend dimostrativo. Catalogo, ricerca, autenticazione, carrello, checkout e destinazioni dei link non sono ancora collegati a servizi backend. Alcune immagini nei dati demo provengono da URL esterni temporanei e dovranno essere sostituite con asset ufficiali/locali prima della pubblicazione.
