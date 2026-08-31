import {
  ArrowDownIcon,
  ArrowLeftIcon,
  CheckIcon,
  SearchIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import { EventCard } from "@/components/offtime/event-card";
import { ProductCard } from "@/components/offtime/product-card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { products } from "@/domain/catalog";
import { events } from "@/domain/events";

const swatches = [
  ["Primary", "#4658AD", "bg-offtime-blue", "Azioni decisive"],
  ["Focus", "#7185FF", "bg-offtime-blue-bright", "Focus e selezione"],
  ["Release", "#EF75AA", "bg-offtime-pink", "Novità e stato"],
  ["Editorial", "#8B68D7", "bg-offtime-violet", "Profondità di brand"],
] as const;

const surfaces = [
  ["Surface 0", "#08090D", "bg-surface-0"],
  ["Surface 1", "#101218", "bg-surface-1"],
  ["Surface 2", "#181B24", "bg-surface-2"],
  ["Surface 3", "#222633", "bg-surface-3"],
] as const;

const sections = [
  ["Foundation", "#foundation"],
  ["Components", "#components"],
  ["Commerce", "#commerce"],
  ["Events", "#events"],
] as const;

export function DesignSystemPage() {
  return (
    <div className="min-h-svh overflow-x-hidden bg-background">
      <a
        className={buttonVariants({
          className: "offtime-skip-link",
          size: "sm",
          variant: "secondary",
        })}
        href="#content"
      >
        Vai al contenuto
      </a>

      <header className="border-border border-b bg-surface-0/90 backdrop-blur-xl">
        <nav
          aria-label="Design system"
          className="offtime-container flex min-h-18 items-center justify-between gap-4"
        >
          <Link aria-label="OFFTIME, home" className="rounded-sm" to="/">
            <img
              alt="OFFTIME"
              className="h-11 w-auto object-contain"
              height="44"
              src="/logo.webp"
              width="113"
            />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[0.6875rem] text-muted-foreground uppercase tracking-[0.12em] sm:inline">
              System 01 · 2026
            </span>
            <Link
              className={buttonVariants({ size: "sm", variant: "outline" })}
              to="/"
            >
              <ArrowLeftIcon aria-hidden="true" data-icon="inline-start" />
              Storefront
            </Link>
          </div>
        </nav>
      </header>

      <main id="content">
        <section className="relative isolate overflow-hidden border-border border-b">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_20%,rgb(70_88_173_/_0.3),transparent_24rem),radial-gradient(circle_at_96%_82%,rgb(139_104_215_/_0.18),transparent_22rem)]"
          />
          <div className="offtime-container grid gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.3fr)_19rem] lg:items-end lg:py-28">
            <div className="max-w-4xl">
              <p className="offtime-kicker">OFFTIME / UI field guide</p>
              <h1 className="offtime-display mt-4 text-5xl text-foreground leading-[0.88] sm:text-7xl lg:text-8xl">
                Il sistema che fa parlare le carte.
              </h1>
              <p className="mt-6 max-w-2xl text-base text-muted-foreground leading-7 sm:text-lg sm:leading-8">
                Una grammatica visiva per scegliere, scoprire e collezionare
                senza togliere scena ai prodotti.
              </p>
              <a
                className={buttonVariants({
                  className: "mt-8",
                  variant: "secondary",
                })}
                href="#foundation"
              >
                Esplora il sistema
                <ArrowDownIcon aria-hidden="true" data-icon="inline-end" />
              </a>
            </div>

            <aside className="border-border border-t pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-7">
              <p className="font-mono text-[0.6875rem] text-muted-foreground uppercase tracking-[0.12em]">
                Principio operativo
              </p>
              <p className="mt-3 font-medium text-foreground text-xl leading-7 tracking-[-0.035em]">
                Prodotto davanti. Interfaccia appena dietro.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-5 border-border border-t pt-5">
                <div>
                  <dt className="font-mono text-[0.625rem] text-muted-foreground uppercase tracking-[0.1em]">
                    Theme
                  </dt>
                  <dd className="mt-1 font-semibold text-sm">Dark only</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.625rem] text-muted-foreground uppercase tracking-[0.1em]">
                    Grid
                  </dt>
                  <dd className="mt-1 font-semibold text-sm">4px rhythm</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <div className="offtime-container lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden lg:block">
            <nav
              aria-label="Indice della pagina"
              className="sticky top-8 py-12"
            >
              <p className="font-mono text-[0.625rem] text-muted-foreground uppercase tracking-[0.12em]">
                On this page
              </p>
              <ul className="mt-4 space-y-1">
                {sections.map(([label, href]) => (
                  <li key={href}>
                    <a
                      className="block rounded-sm px-2 py-2 text-muted-foreground text-sm transition-colors hover:bg-surface-2 hover:text-foreground"
                      href={href}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="divide-y divide-border">
            <section
              aria-labelledby="foundation-title"
              className="scroll-mt-8 py-14 sm:py-20"
              id="foundation"
            >
              <div className="max-w-2xl">
                <p className="offtime-kicker">01 / Foundation</p>
                <h2
                  className="offtime-display mt-3 text-4xl text-foreground sm:text-5xl"
                  id="foundation-title"
                >
                  Colore con un ruolo preciso.
                </h2>
                <p className="mt-4 text-muted-foreground leading-7">
                  Il blu guida la scelta. Rosa e viola segnalano contesto, mai
                  rumore.
                </p>
              </div>

              <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
                {swatches.map(([name, value, color, usage]) => (
                  <article className="bg-surface-1 p-4" key={name}>
                    <div className={`h-28 rounded-md ${color}`} />
                    <div className="mt-4 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-sm">{name}</h3>
                        <p className="mt-1 text-muted-foreground text-xs">
                          {usage}
                        </p>
                      </div>
                      <code className="font-mono text-[0.625rem] text-muted-foreground">
                        {value}
                      </code>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <article className="offtime-surface bg-surface-1 p-5 sm:p-6">
                  <p className="font-mono text-[0.625rem] text-muted-foreground uppercase tracking-[0.12em]">
                    Surface scale
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {surfaces.map(([name, value, color]) => (
                      <div key={name}>
                        <div
                          className={`h-20 rounded-sm border border-white/10 ${color}`}
                        />
                        <p className="mt-2 font-medium text-xs">{name}</p>
                        <code className="font-mono text-[0.625rem] text-muted-foreground">
                          {value}
                        </code>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="offtime-surface bg-surface-1 p-5 sm:p-6">
                  <p className="font-mono text-[0.625rem] text-muted-foreground uppercase tracking-[0.12em]">
                    Shape language
                  </p>
                  <div className="mt-6 flex items-end gap-4">
                    <div className="size-14 rounded-sm border border-primary bg-primary/15" />
                    <div className="size-20 rounded-md border border-offtime-pink bg-release" />
                    <div className="size-28 rounded-xl border border-offtime-violet bg-offtime-violet/15" />
                  </div>
                  <p className="mt-5 font-mono text-muted-foreground text-xs">
                    8px · 12px · 18px
                  </p>
                </article>
              </div>
            </section>

            <section
              aria-labelledby="components-title"
              className="scroll-mt-8 py-14 sm:py-20"
              id="components"
            >
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="offtime-kicker">02 / Components</p>
                  <h2
                    className="offtime-display mt-3 text-4xl text-foreground sm:text-5xl"
                    id="components-title"
                  >
                    Chiarezza prima della cromia.
                  </h2>
                </div>
                <p className="max-w-xs text-muted-foreground text-sm leading-6">
                  Ogni stato mantiene un’etichetta leggibile, anche senza
                  colore.
                </p>
              </div>

              <div className="mt-9 grid gap-4 lg:grid-cols-2">
                <article className="offtime-surface bg-surface-1 p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[0.625rem] text-muted-foreground uppercase tracking-[0.12em]">
                      Actions
                    </p>
                    <code className="font-mono text-[0.625rem] text-muted-foreground">
                      Button
                    </code>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button>Acquista ora</Button>
                    <Button variant="secondary">Salva per dopo</Button>
                    <Button variant="outline">Scopri il set</Button>
                    <Button disabled>Non disponibile</Button>
                  </div>
                  <div className="mt-7 border-border border-t pt-5">
                    <p className="font-medium text-sm">Status</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge>Disponibile</Badge>
                      <Badge className="bg-release text-release-foreground">
                        Nuova uscita
                      </Badge>
                      <Badge variant="outline">Preordine</Badge>
                    </div>
                  </div>
                </article>

                <article className="offtime-surface bg-surface-1 p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[0.625rem] text-muted-foreground uppercase tracking-[0.12em]">
                      Search input
                    </p>
                    <code className="font-mono text-[0.625rem] text-muted-foreground">
                      InputGroup
                    </code>
                  </div>
                  <label
                    className="mt-6 block font-medium text-sm"
                    htmlFor="demo-search"
                  >
                    Ricerca catalogo
                  </label>
                  <InputGroup className="mt-2">
                    <InputGroupAddon align="inline-start">
                      <SearchIcon aria-hidden="true" />
                    </InputGroupAddon>
                    <InputGroupInput
                      autoComplete="off"
                      id="demo-search"
                      name="demo-search"
                      placeholder="Cerca carte, box, set…"
                      type="search"
                    />
                  </InputGroup>
                  <p className="mt-3 text-muted-foreground text-xs leading-5">
                    Label persistente, ricerca nativa, nessun blocco durante la
                    digitazione.
                  </p>
                  <div className="mt-6 flex items-center gap-2 border-border border-t pt-5 text-muted-foreground text-sm">
                    <CheckIcon
                      aria-hidden="true"
                      className="size-4 text-offtime-pink-bright"
                    />
                    Focus visibile e target da tocco esteso.
                  </div>
                </article>
              </div>
            </section>

            <section
              aria-labelledby="commerce-title"
              className="scroll-mt-8 py-14 sm:py-20"
              id="commerce"
            >
              <div className="max-w-2xl">
                <p className="offtime-kicker">03 / Commerce specimen</p>
                <h2
                  className="offtime-display mt-3 text-4xl text-foreground sm:text-5xl"
                  id="commerce-title"
                >
                  La carta resta l’eroe.
                </h2>
                <p className="mt-4 text-muted-foreground leading-7">
                  Immagine, stato, prezzo e azione seguono sempre lo stesso
                  ordine di lettura.
                </p>
              </div>
              <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            <section
              aria-labelledby="events-title"
              className="scroll-mt-8 py-14 sm:py-20"
              id="events"
            >
              <div className="max-w-2xl">
                <p className="offtime-kicker">04 / Event states</p>
                <h2
                  className="offtime-display mt-3 text-4xl text-foreground sm:text-5xl"
                  id="events-title"
                >
                  Informazioni da tavolo, non da tabella.
                </h2>
                <p className="mt-4 text-muted-foreground leading-7">
                  Data, posti e quota sono vicini alla decisione, con una
                  gerarchia che regge anche negli stati incompleti.
                </p>
              </div>
              <div className="mt-9 grid gap-5 lg:grid-cols-2">
                {events.map((event) => (
                  <EventCard event={event} key={event.id} />
                ))}
                <EventCard className="lg:col-span-2" isLoading />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
