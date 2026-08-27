import { ArrowUpRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type Category = {
  name: string
  image: string
  href: string
  imageAlt?: string
}

export type CategoryTileProps = {
  category: Category
  className?: string
}

export function CategoryTile({ category, className }: CategoryTileProps) {
  return (
    <article className={cn("min-w-0", className)}>
      <a
        className="group/category relative block aspect-[4/5] min-h-72 overflow-hidden rounded-[1.75rem] bg-surface-2 shadow-[0_18px_55px_rgb(0_0_0_/_0.22)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgb(0_0_0_/_0.4)] focus-visible:ring-3 focus-visible:ring-ring/60 motion-reduce:transform-none motion-reduce:transition-none sm:aspect-[3/4]"
        href={category.href}
      >
        <img
          alt={category.imageAlt ?? `${category.name} trading card game`}
          className="size-full object-cover object-center opacity-90 contrast-125 transition-transform duration-700 ease-out group-hover/category:scale-105 motion-reduce:transition-none"
          height="1200"
          loading="lazy"
          src={category.image}
          width="900"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgb(113_133_255_/_0.32),transparent_32%),linear-gradient(to_top,rgb(8_9_13_/_0.96)_2%,rgb(8_9_13_/_0.2)_62%,transparent)]"
        />
        <div className="absolute top-5 right-5 flex size-11 items-center justify-center rounded-full bg-background/75 text-foreground backdrop-blur-md transition-transform duration-300 group-hover/category:translate-x-0.5 group-hover/category:-translate-y-0.5 group-hover/category:bg-primary group-hover/category:text-primary-foreground motion-reduce:transform-none motion-reduce:transition-none">
          <ArrowUpRightIcon aria-hidden="true" />
        </div>
        <div className="absolute right-6 bottom-6 left-6">
          <h3
            className="offtime-display max-w-[12ch] text-[clamp(2rem,4vw,3.5rem)] leading-[0.88] text-balance text-white"
            translate="no"
          >
            {category.name}
          </h3>
        </div>
      </a>
    </article>
  )
}
