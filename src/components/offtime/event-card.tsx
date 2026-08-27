import { ArrowRightIcon } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export type Event = {
  game: string
  name: string
  date: string
  time: string
  availableSlots: number
  totalSlots: number
  price: number
  image: string
  href?: string
  imageAlt?: string
}

export type EventCardProps = {
  className?: string
  event?: Event
  isLoading?: boolean
}

function formatPrice(price: number) {
  if (price === 0) return "Gratis"

  return `€${new Intl.NumberFormat("it-IT", {
    maximumFractionDigits: 2,
  }).format(price)}`
}

export function EventCardSkeleton({ className }: { className?: string }) {
  return (
    <article
      aria-busy="true"
      aria-label="Caricamento evento"
      className={cn(
        "grid min-h-80 overflow-hidden rounded-3xl bg-surface-1 sm:grid-cols-[0.88fr_1.12fr]",
        className
      )}
    >
      <Skeleton className="min-h-52 rounded-none bg-surface-2 motion-reduce:animate-none" />
      <div className="flex flex-col gap-5 p-6 sm:p-7">
        <Skeleton className="h-4 w-24 bg-surface-2 motion-reduce:animate-none" />
        <Skeleton className="h-9 w-4/5 bg-surface-2 motion-reduce:animate-none" />
        <div className="mt-auto grid grid-cols-2 gap-3">
          <Skeleton className="h-16 bg-surface-2 motion-reduce:animate-none" />
          <Skeleton className="h-16 bg-surface-2 motion-reduce:animate-none" />
        </div>
        <Skeleton className="h-11 w-full bg-surface-2 motion-reduce:animate-none" />
      </div>
    </article>
  )
}

export function EventCard({
  className,
  event,
  isLoading = false,
}: EventCardProps) {
  if (isLoading || !event) {
    return <EventCardSkeleton className={className} />
  }

  const isSoldOut = event.availableSlots <= 0
  const isAlmostFull =
    !isSoldOut && event.availableSlots <= Math.ceil(event.totalSlots * 0.2)
  const statusLabel = isSoldOut
    ? "Sold out"
    : isAlmostFull
      ? "Quasi completo"
      : "Posti disponibili"
  const eventHref =
    event.href ??
    `/eventi/${encodeURIComponent(`${event.game}-${event.name}`.toLowerCase())}`

  return (
    <article
      className={cn(
        "group/event grid min-h-80 overflow-hidden rounded-3xl bg-surface-1 ring-1 ring-white/10 transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgb(0_0_0_/_0.34)] motion-reduce:transform-none motion-reduce:transition-none sm:grid-cols-[0.88fr_1.12fr]",
        className
      )}
    >
      <div className="relative min-h-56 overflow-hidden bg-offtime-blue sm:min-h-full">
        <img
          alt={event.imageAlt ?? `${event.game}: ${event.name}`}
          className={cn(
            "size-full object-cover object-center opacity-90 contrast-125 transition-transform duration-700 ease-out group-hover/event:scale-105 motion-reduce:transition-none",
            isSoldOut && "grayscale"
          )}
          height="900"
          loading="lazy"
          src={event.image}
          width="720"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(145deg,rgb(70_88_173_/_0.12),transparent_42%),linear-gradient(to_top,rgb(8_9_13_/_0.88),transparent_68%)]"
        />
        <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4">
          <p
            className="font-mono text-xs font-bold tracking-[0.14em] text-white uppercase"
            translate="no"
          >
            {event.game}
          </p>
          <span
            className={cn(
              "rounded-full bg-background/85 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-md",
              isAlmostFull && "bg-offtime-pink text-background",
              isSoldOut && "bg-surface-3 text-muted-foreground"
            )}
          >
            {statusLabel}
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-col p-6 sm:p-7">
        <h3 className="offtime-display text-3xl leading-[0.95] text-balance text-foreground sm:text-4xl">
          {event.name}
        </h3>

        <div className="mt-7 grid grid-cols-[1fr_auto] gap-5 border-y border-border py-5">
          <div>
            <p className="font-mono text-2xl font-bold tracking-[-0.06em] text-foreground tabular-nums">
              {event.date}
            </p>
            <p className="text-offtime-pink-bright mt-1 font-mono text-sm font-semibold tabular-nums">
              {event.time}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold tracking-[-0.05em] text-foreground tabular-nums">
              {formatPrice(event.price)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground tabular-nums">
              {Math.max(0, event.availableSlots)} / {event.totalSlots} posti
            </p>
          </div>
        </div>

        <div className="mt-auto pt-5">
          {isSoldOut ? (
            <Button className="w-full" disabled>
              Posti esauriti
            </Button>
          ) : (
            <a
              className={buttonVariants({
                className: "w-full",
                size: "lg",
              })}
              href={eventHref}
            >
              Iscriviti
              <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
