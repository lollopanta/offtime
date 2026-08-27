import { ArrowRightIcon } from "lucide-react"

import { EventsSection } from "@/components/offtime/home/events-section"
import { GameCategories } from "@/components/offtime/home/game-categories"
import { HeroCarousel } from "@/components/offtime/home/hero-carousel"
import {
  campaigns,
  gameCategories,
  homeEvents,
} from "@/components/offtime/home/home-data"
import { ProductsSection } from "@/components/offtime/home/products-section"
import { temporaryProducts } from "@/components/offtime/product-data"
import { SiteHeader } from "@/components/offtime/site-header"
import { buttonVariants } from "@/components/ui/button"

export function StorefrontPage() {
  return (
    <div className="min-h-svh bg-background">
      <a
        className={buttonVariants({
          variant: "secondary",
          size: "sm",
          className: "offtime-skip-link",
        })}
        href="#content"
      >
        Vai al contenuto
      </a>

      <SiteHeader cartCount={2} />

      <main className="w-full max-w-full overflow-x-hidden" id="content">
        <HeroCarousel campaigns={campaigns} />
        <GameCategories categories={gameCategories} />
        <ProductsSection products={temporaryProducts} />
        <EventsSection events={homeEvents} />

        <section className="offtime-container pb-20 sm:pb-28">
          <div className="offtime-surface relative overflow-hidden bg-surface-1 p-7 sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:p-14">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1 bg-offtime-violet"
            />
            <div className="relative max-w-3xl">
              <p className="offtime-kicker">La tua collezione cambia</p>
              <h2 className="offtime-display mt-3 text-3xl leading-[0.96] text-foreground sm:text-5xl">
                Dai valore alle carte che non giochi più.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-pretty text-muted-foreground">
                Portale in negozio: le valutiamo insieme e troviamo il modo
                giusto per farle tornare in gioco.
              </p>
            </div>
            <a
              className={buttonVariants({
                className: "relative mt-7 shrink-0 lg:mt-0",
                size: "lg",
              })}
              href="/vendi"
            >
              Vendi le tue carte
              <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface-1">
        <div className="offtime-container flex flex-col gap-6 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <img
              alt="OFFTIME"
              className="h-12 w-auto object-contain object-left"
              height="48"
              loading="lazy"
              src="/logo.webp"
              width="128"
            />
            <p className="mt-3 text-sm text-muted-foreground">
              Carte, cultura, community.
            </p>
          </div>
          <a
            className={buttonVariants({ variant: "outline", size: "lg" })}
            href="/community"
          >
            Entra nella community
          </a>
        </div>
      </footer>
    </div>
  )
}
