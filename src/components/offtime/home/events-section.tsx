import { ArrowRightIcon } from "lucide-react"

import { EventCard, type Event } from "@/components/offtime/event-card"
import { buttonVariants } from "@/components/ui/button"

export function EventsSection({ events }: { events: Event[] }) {
  return (
    <section
      aria-labelledby="events-title"
      className="offtime-container py-20 sm:py-28"
      id="eventi"
    >
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-3xl">
          <p className="offtime-kicker">In negozio</p>
          <h2
            className="offtime-display mt-3 scroll-mt-28 text-4xl leading-[0.95] text-foreground sm:text-5xl"
            id="events-title"
          >
            Il prossimo match comincia qui.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-pretty text-muted-foreground">
            Tornei, leghe e serate community: scegli il tuo tavolo e prenota il
            posto prima che finisca.
          </p>
        </div>
        <a
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/eventi"
        >
          Tutti gli eventi
          <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
        </a>
      </div>

      {events.length ? (
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {events.slice(0, 4).map((event) => (
            <EventCard event={event} key={event.href ?? event.name} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-md border border-border bg-surface-1 p-6 text-muted-foreground">
          Nessun evento in calendario. Torna presto per i prossimi tornei.
        </p>
      )}
    </section>
  )
}
