import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { ProductCard } from "@/components/offtime/product-card";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Product } from "@/domain/catalog";

export function ProductsSection({
  products,
}: {
  products: readonly Product[];
}) {
  return (
    <section
      aria-labelledby="products-title"
      className="border-border border-y bg-surface-1 py-20 sm:py-28"
      id="catalogo"
    >
      <Carousel
        aria-label="Nuovi prodotti OFFTIME"
        className="offtime-container"
        opts={{ align: "start", loop: true, slidesToScroll: 1 }}
      >
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="offtime-kicker">Nuovi arrivi</p>
            <h2
              className="offtime-display mt-3 scroll-mt-28 text-4xl text-foreground leading-[0.95] sm:text-5xl"
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
            <Link
              className={buttonVariants({ size: "lg", variant: "outline" })}
              to="/shop"
            >
              Tutti i prodotti
              <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
            </Link>
          </div>
        </div>

        {products.length ? (
          <CarouselContent className="mt-10 -ml-3">
            {products.map((product) => (
              <CarouselItem
                className="basis-[86%] pl-3 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                key={product.id}
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
  );
}
