import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/button";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { getEventBySlug, getEventStatus } from "@/domain/events";
import { communityContent } from "@/features/community/community-content";
import { cn } from "@/lib/utils";
import { NotFoundPage } from "@/pages/not-found-page";

const currency = new Intl.NumberFormat("it-IT", {
  currency: "EUR",
  maximumFractionDigits: 2,
  style: "currency",
});

function formatSchedule(startsAt: string) {
  const date = new Date(startsAt);
  if (Number.isNaN(date.getTime())) {
    return { date: "Data da definire", time: "Orario da definire" };
  }

  return {
    date: new Intl.DateTimeFormat("it-IT", {
      day: "numeric",
      month: "long",
      timeZone: "Europe/Rome",
      weekday: "long",
      year: "numeric",
    }).format(date),
    time: new Intl.DateTimeFormat("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Rome",
    }).format(date),
  };
}

export function EventDetailPage() {
  const { eventSlug } = useParams();
  const event = eventSlug ? getEventBySlug(eventSlug) : undefined;

  if (!event) {
    return <NotFoundPage />;
  }

  const schedule = formatSchedule(event.startsAt);
  const status = getEventStatus(event);
  const isSoldOut = status === "sold-out";
  let statusLabel = "Posti disponibili";
  if (status === "almost-full") {
    statusLabel = "Quasi completo";
  } else if (isSoldOut) {
    statusLabel = "Sold out";
  }

  return (
    <main className="offtime-container py-10 sm:py-16" id="content">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/eventi" />}>
              Eventi
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{event.game}</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{event.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:gap-16">
        <div className="offtime-surface overflow-hidden bg-surface-1 lg:sticky lg:top-28 lg:self-start">
          <ImageWithSkeleton
            alt={`${event.game}: ${event.name}`}
            className={cn("object-cover", isSoldOut && "grayscale")}
            containerClassName="aspect-[4/5] w-full"
            height="900"
            src={event.image}
            width="720"
          />
        </div>

        <div className="min-w-0 lg:pt-4">
          <p className="offtime-kicker" translate="no">
            {event.game}
          </p>
          <h1 className="offtime-display mt-3 text-4xl text-foreground leading-[0.94] sm:text-6xl">
            {event.name}
          </h1>
          <Badge
            className={cn(
              "mt-6",
              status === "almost-full" &&
                "border-offtime-pink/60 bg-release text-release-foreground",
              isSoldOut && "bg-surface-3 text-muted-foreground"
            )}
            variant="outline"
          >
            {statusLabel}
          </Badge>

          <dl className="mt-8 grid gap-5 border-border border-y py-6 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-muted-foreground text-xs uppercase tracking-[0.1em]">
                Data e ora
              </dt>
              <dd className="mt-2 font-semibold text-foreground capitalize">
                {schedule.date}
              </dd>
              <dd className="mt-1 font-mono text-offtime-pink-bright tabular-nums">
                {schedule.time}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-muted-foreground text-xs uppercase tracking-[0.1em]">
                Quota evento
              </dt>
              <dd className="mt-2 font-semibold text-2xl text-foreground tabular-nums">
                {event.price === 0 ? "Gratis" : currency.format(event.price)}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-muted-foreground text-xs uppercase tracking-[0.1em]">
                Posti disponibili
              </dt>
              <dd className="mt-2 font-semibold text-foreground tabular-nums">
                {Math.max(0, event.availableSlots)} di {event.totalSlots}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-muted-foreground text-xs uppercase tracking-[0.1em]">
                Gioco
              </dt>
              <dd className="mt-2 font-semibold text-foreground">
                {event.game}
              </dd>
            </div>
          </dl>

          <section aria-labelledby="event-information-title" className="mt-8">
            <h2
              className="font-semibold text-foreground text-xl"
              id="event-information-title"
            >
              Informazioni evento
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground leading-7">
              Per disponibilità e partecipazione, contatta direttamente OFFTIME.
            </p>
          </section>

          {isSoldOut ? (
            <Button className="mt-8 w-full sm:w-auto" disabled size="lg">
              Posti esauriti
            </Button>
          ) : (
            <a
              className={buttonVariants({ className: "mt-8", size: "lg" })}
              href={communityContent.whatsappUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Contatta OFFTIME
              <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
            </a>
          )}
          <Link
            className={buttonVariants({
              className: "mt-4 sm:ml-3",
              size: "lg",
              variant: "outline",
            })}
            to="/eventi"
          >
            <ArrowLeftIcon aria-hidden="true" data-icon="inline-start" />
            Tutti gli eventi
          </Link>
        </div>
      </div>
    </main>
  );
}
