import { ArrowRightIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { GameCategory } from "@/components/offtime/home/home-data"

const toneClass: Record<GameCategory["tone"], string> = {
  blue: "hover:border-offtime-blue-bright/65 hover:bg-offtime-blue/15",
  pink: "hover:border-offtime-pink/65 hover:bg-release",
  violet: "hover:border-offtime-violet/70 hover:bg-offtime-violet/10",
  neutral: "hover:border-foreground/30 hover:bg-surface-2",
}

export function GameCategories({ categories }: { categories: GameCategory[] }) {
  const featured = categories
    .filter((category) => category.featured)
    .slice(0, 6)

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
            className="offtime-display mt-3 scroll-mt-28 text-4xl leading-[0.95] text-foreground sm:text-5xl"
            id="games-title"
          >
            I brand che muovono il tuo OFFTIME.
          </h2>
        </div>
        <a
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/shop/giochi"
        >
          Tutti i giochi
          <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
        </a>
      </div>

      {featured.length ? (
        <div className="mt-10 grid grid-flow-dense grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {featured.map((category) => (
            <a
              className={cn(
                "group flex min-h-36 min-w-0 flex-col justify-between rounded-md border border-border bg-surface-1 p-4 transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-3 focus-visible:ring-ring/60 motion-reduce:transform-none motion-reduce:transition-none",
                toneClass[category.tone]
              )}
              href={category.href}
              key={category.href}
            >
              <span className="font-mono text-[0.6875rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                {category.code}
              </span>
              <span
                className="text-xl font-bold tracking-[-0.055em] text-balance break-words text-foreground group-hover:text-primary-hover"
                translate="no"
              >
                {category.name}
              </span>
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-md border border-border bg-surface-1 p-6 text-muted-foreground">
          I giochi torneranno presto. Nel frattempo esplora il catalogo
          completo.
        </p>
      )}
    </section>
  )
}
