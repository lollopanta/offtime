import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { type Event, getEventStatus } from "@/domain/events";
import { cn } from "@/lib/utils";

export interface EventCardProps {
  className?: string;
  event?: Event;
  isLoading?: boolean;
}

function formatPrice(price: number) {
  if (price === 0) {
    return "Gratis";
  }

  return new Intl.NumberFormat("it-IT", {
    currency: "EUR",
    maximumFractionDigits: 2,
    style: "currency",
  }).format(price);
}

function formatSchedule(event: Event) {
  if (!event.startsAt) {
    return {
      date: event.date?.trim() || "DA DEFINIRE",
      time: event.time?.trim() || "—",
    };
  }

  const startsAt = new Date(event.startsAt);
  if (Number.isNaN(startsAt.getTime())) {
    return { date: "DA DEFINIRE", time: "—" };
  }

  return {
    date: new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "short",
      timeZone: "Europe/Rome",
    })
      .format(startsAt)
      .replace(".", "")
      .toLocaleUpperCase("it-IT"),
    time: new Intl.DateTimeFormat("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Rome",
    }).format(startsAt),
  };
}

export function EventCardSkeleton({ className }: { className?: string }) {
  return (
    <article
      aria-busy="true"
      aria-label="Caricamento evento"
      className={cn(
        "grid min-h-80 overflow-hidden rounded-xl bg-surface-1 sm:grid-cols-[0.88fr_1.12fr]",
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
  );
}

export function EventCard({
  className,
  event,
  isLoading = false,
}: EventCardProps) {
  if (isLoading || !event) {
    return <EventCardSkeleton className={className} />;
  }

  const eventStatus = getEventStatus(event);
  const isSoldOut = eventStatus === "sold-out";
  const schedule = formatSchedule(event);
  const isAlmostFull = eventStatus === "almost-full";
  let statusLabel = "Posti disponibili";
  if (isSoldOut) {
    statusLabel = "Sold out";
  } else if (isAlmostFull) {
    statusLabel = "Quasi completo";
  }
  const eventHref = event.href;

  return (
    <article
      className={cn(
        "group/event grid min-h-80 overflow-hidden rounded-xl bg-surface-1 ring-1 ring-white/10 transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgb(0_0_0_/_0.34)] motion-reduce:transform-none motion-reduce:transition-none sm:grid-cols-[0.88fr_1.12fr]",
        className
      )}
    >
      <div className="relative min-h-56 overflow-hidden bg-offtime-blue sm:min-h-full">
        <ImageWithSkeleton
          alt={event.imageAlt ?? `${event.game}: ${event.name}`}
          className={cn(
            "object-cover object-center opacity-90 contrast-125 transition-transform duration-700 ease-out group-hover/event:scale-105 motion-reduce:transition-none",
            isSoldOut && "grayscale"
          )}
          containerClassName="size-full"
          height="900"
          loading="lazy"
          src={event.image}
          width="720"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(145deg,rgb(70_88_173_/_0.12),transparent_42%),linear-gradient(to_top,rgb(8_9_13_/_0.88),transparent_68%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1 bg-offtime-violet"
        />
        <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4">
          <p
            className="font-bold font-mono text-white text-xs uppercase tracking-[0.14em]"
            translate="no"
          >
            {event.game}
          </p>
          <Badge
            className={cn(
              "h-auto border-border bg-background/85 px-3 py-1.5 font-semibold text-foreground text-xs backdrop-blur-md",
              isAlmostFull &&
                "border-offtime-pink/60 bg-release text-release-foreground",
              isSoldOut && "bg-surface-3 text-muted-foreground"
            )}
            variant="outline"
          >
            {statusLabel}
          </Badge>
        </div>
      </div>

      <div className="flex min-w-0 flex-col p-6 sm:p-7">
        <h3 className="offtime-display text-balance text-3xl text-foreground leading-[0.95] sm:text-4xl">
          {event.name}
        </h3>

        <div className="mt-7 grid grid-cols-[1fr_auto] gap-5 border-border border-y py-5">
          <div>
            <p className="font-bold font-mono text-2xl text-foreground tabular-nums tracking-[-0.06em]">
              {schedule.date}
            </p>
            <p className="mt-1 font-mono font-semibold text-offtime-pink-bright text-sm tabular-nums">
              {schedule.time}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-2xl text-foreground tabular-nums tracking-[-0.05em]">
              {formatPrice(event.price)}
            </p>
            <p className="mt-1 text-muted-foreground text-sm tabular-nums">
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
            <Link
              className={buttonVariants({
                className: "w-full",
                size: "lg",
              })}
              to={eventHref}
            >
              Dettagli evento
              <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
