import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { EventsSection } from "@/components/offtime/home/events-section";
import { GameCategories } from "@/components/offtime/home/game-categories";
import { HeroCarousel } from "@/components/offtime/home/hero-carousel";
import { ProductsSection } from "@/components/offtime/home/products-section";
import { buttonVariants } from "@/components/ui/button";
import { campaigns, gameCategories, homeEvents } from "@/content/home";
import { products } from "@/domain/catalog";

export function StorefrontPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden" id="content">
      <HeroCarousel campaigns={campaigns} />
      <GameCategories categories={gameCategories} />
      <ProductsSection products={products} />
      <EventsSection events={homeEvents} />

      <section className="offtime-container pb-20 sm:pb-28">
        <div className="offtime-surface relative overflow-hidden bg-surface-1 p-7 sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:p-14">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1 bg-offtime-violet"
          />
          <div className="relative max-w-3xl">
            <p className="offtime-kicker">La tua collezione cambia</p>
            <h2 className="offtime-display mt-3 text-3xl text-foreground leading-[0.96] sm:text-5xl">
              Dai valore alle carte che non giochi più.
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-base text-muted-foreground leading-7">
              Portale in negozio: le valutiamo insieme e troviamo il modo giusto
              per farle tornare in gioco.
            </p>
          </div>
          <Link
            className={buttonVariants({
              className: "relative mt-7 shrink-0 lg:mt-0",
              size: "lg",
            })}
            to="/vendi"
          >
            Vendi le tue carte
            <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
          </Link>
        </div>
      </section>
    </main>
  );
}
