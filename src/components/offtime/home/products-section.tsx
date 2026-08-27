import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { ProductCard } from "@/components/offtime/product-card"
import type { Product } from "@/components/offtime/product-data"
import { buttonVariants } from "@/components/ui/button"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const autoplayDelay = 7000

export function ProductsSection({ products }: { products: Product[] }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [interactionCycle, setInteractionCycle] = React.useState(0)
  const [reduceMotion, setReduceMotion] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setReduceMotion(media.matches)

    updatePreference()
    media.addEventListener("change", updatePreference)
    return () => media.removeEventListener("change", updatePreference)
  }, [])

  React.useEffect(() => {
    if (!api || products.length < 2 || reduceMotion) return

    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      if (!document.hidden) api.scrollNext()
      interval = window.setInterval(() => {
        if (!document.hidden) api.scrollNext()
      }, autoplayDelay)
    }, autoplayDelay)

    return () => {
      window.clearTimeout(timeout)
      if (interval) window.clearInterval(interval)
    }
  }, [api, interactionCycle, products.length, reduceMotion])

  const restartAutoplay = () => setInteractionCycle((cycle) => cycle + 1)

  return (
    <section
      aria-labelledby="products-title"
      className="border-y border-border bg-surface-1 py-20 sm:py-28"
      id="catalogo"
    >
      <Carousel
        aria-label="Nuovi prodotti OFFTIME"
        className="offtime-container"
        onFocusCapture={restartAutoplay}
        onKeyDown={restartAutoplay}
        onPointerDownCapture={restartAutoplay}
        opts={{ align: "start", loop: true, slidesToScroll: 1 }}
        setApi={setApi}
      >
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="offtime-kicker">Nuovi arrivi</p>
            <h2
              className="offtime-display mt-3 scroll-mt-28 text-4xl leading-[0.95] text-foreground sm:text-5xl"
              id="products-title"
            >
              Pronti per il tuo raccoglitore.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {products.length ? (
              <>
                <CarouselPrevious
                  aria-label="Prodotti precedenti"
                  className="static size-11"
                />
                <CarouselNext
                  aria-label="Prodotti successivi"
                  className="static size-11"
                />
              </>
            ) : null}
            <a
              className={buttonVariants({ variant: "outline", size: "lg" })}
              href="/shop"
            >
              Tutti i prodotti
              <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
            </a>
          </div>
        </div>

        {products.length ? (
          <CarouselContent className="mt-10 -ml-3">
            {products.map((product) => (
              <CarouselItem
                className="basis-[86%] pl-3 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                key={product.href ?? product.name}
              >
                <ProductCard className="h-full" product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        ) : (
          <p className="mt-10 rounded-md border border-border bg-background p-6 text-muted-foreground">
            Nessun nuovo arrivo al momento. Esplora il catalogo completo.
          </p>
        )}
      </Carousel>
    </section>
  )
}
