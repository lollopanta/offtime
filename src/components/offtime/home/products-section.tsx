import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon } from "lucide-react";
import { useRef } from "react";
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

gsap.registerPlugin(ScrollTrigger);

export function ProductsSection({
  ariaLabel,
  ctaLabel,
  ctaTo,
  eyebrow,
  id,
  products,
  title,
}: {
  ariaLabel: string;
  ctaLabel: string;
  ctaTo: string;
  eyebrow: string;
  id: string;
  products: readonly Product[];
  title: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleId = `${id}-title`;

  useGSAP(
    () => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !sectionRef.current
      ) {
        return;
      }

      gsap.from(
        sectionRef.current.querySelectorAll("[data-product-rail-item]"),
        {
          autoAlpha: 0,
          ease: "power3.out",
          scrollTrigger: {
            once: true,
            start: "top 80%",
            trigger: sectionRef.current,
          },
          stagger: 0.08,
          y: 24,
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      aria-labelledby={titleId}
      className="bg-surface-1 py-14 sm:py-20"
      id={id}
      ref={sectionRef}
    >
      <Carousel
        aria-label={ariaLabel}
        className="offtime-container"
        opts={{ align: "start", loop: true, slidesToScroll: 1 }}
      >
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="offtime-kicker">{eyebrow}</p>
            <h2
              className="offtime-display mt-3 scroll-mt-28 text-4xl text-foreground leading-[0.95] sm:text-5xl"
              id={titleId}
            >
              {title}
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
              to={ctaTo}
            >
              {ctaLabel}
              <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
            </Link>
          </div>
        </div>

        {products.length ? (
          <CarouselContent className="mt-8 -ml-3">
            {products.map((product) => (
              <CarouselItem
                className="basis-[86%] pl-3 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                data-product-rail-item
                key={product.id}
              >
                <ProductCard className="h-full" compact product={product} />
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
