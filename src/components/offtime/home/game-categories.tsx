import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import type { GameCategory } from "@/content/home";

export function GameCategories({ categories }: { categories: GameCategory[] }) {
  const featured = categories
    .filter((category) => category.featured)
    .slice(0, 6);

  return (
    <section
      aria-labelledby="games-title"
      className="offtime-container py-20 sm:py-28"
      id="giochi"
    >
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-3xl">
          <p className="offtime-kicker">Scegli il tuo gioco</p>
          <h2
            className="offtime-display mt-3 scroll-mt-28 text-4xl text-foreground leading-[0.95] sm:text-5xl"
            id="games-title"
          >
            I brand che muovono il tuo OFFTIME.
          </h2>
        </div>
        <Link
          className={buttonVariants({ size: "lg", variant: "outline" })}
          to="/shop"
        >
          Tutti i giochi
          <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
        </Link>
      </div>

      {featured.length ? (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12">
          {featured.map((category) => (
            <Link
              aria-label={category.name}
              className="group flex min-h-28 min-w-32 flex-1 basis-36 items-center justify-center rounded-sm focus-visible:ring-3 focus-visible:ring-ring/60"
              key={category.href}
              to={category.href}
            >
              <img
                alt=""
                className="h-auto max-h-28 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
                height="112"
                loading="lazy"
                src={category.image}
                width="720"
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-md border border-border bg-surface-1 p-6 text-muted-foreground">
          I giochi torneranno presto. Nel frattempo esplora il catalogo
          completo.
        </p>
      )}
    </section>
  );
}
