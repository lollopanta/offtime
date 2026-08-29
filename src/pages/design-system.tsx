import { ArrowLeftIcon, SearchIcon } from "lucide-react";
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
  ["Primary", "#4658AD", "bg-offtime-blue"],
  ["Focus", "#7185FF", "bg-offtime-blue-bright"],
  ["Release", "#EF75AA", "bg-offtime-pink"],
  ["Editorial", "#8B68D7", "bg-offtime-violet"],
] as const;

export function DesignSystemPage() {
  return (
    <div className="min-h-svh bg-background">
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

      <header className="border-border border-b bg-surface-1">
        <nav
          aria-label="Design system"
          className="offtime-container flex min-h-20 items-center justify-between gap-4"
        >
          <Link aria-label="OFFTIME, home" className="rounded-sm" to="/">
            <img
              alt="OFFTIME"
              className="h-14 w-auto object-contain"
              height="56"
              src="/logo.webp"
              width="144"
            />
          </Link>
          <Link className={buttonVariants({ variant: "outline" })} to="/">
            <ArrowLeftIcon aria-hidden="true" data-icon="inline-start" />
            Storefront
          </Link>
        </nav>
      </header>

      <main className="offtime-container py-16 sm:py-24" id="content">
        <div className="max-w-3xl">
          <p className="offtime-kicker">OFFTIME UI foundation</p>
          <h1 className="offtime-display mt-3 text-5xl text-foreground leading-[0.92] sm:text-7xl">
            Un sistema TCG riconoscibile e scalabile.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-8">
            Token, gerarchie e componenti reali usati nello storefront.
          </p>
        </div>

        <section aria-labelledby="foundation-title" className="pt-20">
          <p className="offtime-kicker">Foundation</p>
          <h2
            className="offtime-display mt-3 scroll-mt-28 text-4xl text-foreground"
            id="foundation-title"
          >
            Colore, forma e interazione.
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {swatches.map(([name, value, color]) => (
              <article
                className="rounded-md border border-border bg-surface-1 p-3"
                key={name}
              >
                <div className={`h-24 rounded-sm ${color}`} />
                <h3 className="mt-4 font-semibold text-sm">{name}</h3>
                <p className="mt-1 font-mono text-muted-foreground text-xs">
                  {value}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <article className="offtime-surface bg-surface-1 p-6">
              <p className="offtime-kicker">Radius</p>
              <div className="mt-6 flex items-end gap-4">
                <div className="size-16 rounded-sm border border-primary bg-primary/15" />
                <div className="size-20 rounded-md border border-offtime-pink bg-release" />
                <div className="size-24 rounded-xl border border-offtime-violet bg-offtime-violet/15" />
              </div>
              <p className="mt-4 font-mono text-muted-foreground text-xs">
                8px / 12px / 18px
              </p>
            </article>
            <article className="offtime-surface bg-surface-1 p-6">
              <p className="offtime-kicker">Controls</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button>Primaria</Button>
                <Button variant="secondary">Secondaria</Button>
                <Button variant="outline">Outline</Button>
                <Badge className="bg-release text-release-foreground">
                  Nuova uscita
                </Badge>
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
            </article>
          </div>
        </section>

        <section aria-labelledby="product-demo-title" className="pt-20">
          <p className="offtime-kicker">Commerce card</p>
          <h2
            className="offtime-display mt-3 scroll-mt-28 text-4xl text-foreground"
            id="product-demo-title"
          >
            ProductCard
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section aria-labelledby="event-demo-title" className="pt-20">
          <p className="offtime-kicker">Event states</p>
          <h2
            className="offtime-display mt-3 scroll-mt-28 text-4xl text-foreground"
            id="event-demo-title"
          >
            EventCard
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {events.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
            <EventCard className="lg:col-span-2" isLoading />
          </div>
        </section>
      </main>
    </div>
  );
}
