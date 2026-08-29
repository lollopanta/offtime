import {
  ArrowRightIcon,
  CalendarDaysIcon,
  MessageCircleIcon,
  Repeat2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";

import { EventCard } from "@/components/offtime/event-card";
import { buttonVariants } from "@/components/ui/button";
import { events } from "@/domain/events";

const destinations = {
  community: {
    action: "Scopri gli eventi",
    description:
      "Tornei, leghe, scambi e serate per chi vuole vivere il TCG anche fuori dal raccoglitore.",
    eyebrow: "OFFTIME community",
    href: "/eventi",
    icon: MessageCircleIcon,
    title: "Il tavolo è già apparecchiato.",
  },
  vendi: {
    action: "Esplora il catalogo",
    description:
      "Porta binder, box o collezioni in negozio: le guardiamo insieme e troviamo la strada più giusta per farle tornare in gioco.",
    eyebrow: "Valutazione in negozio",
    href: "/shop",
    icon: Repeat2Icon,
    title: "Dai valore alle carte che non giochi più.",
  },
} as const;

export function EventsPage() {
  return (
    <main className="offtime-container py-12 sm:py-16" id="content">
      <p className="offtime-kicker">In negozio</p>
      <h1 className="offtime-display mt-3 max-w-3xl text-5xl text-foreground leading-[0.92] sm:text-7xl">
        Il prossimo match comincia qui.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-8">
        Tornei, leghe e serate community: scegli il tuo tavolo e prenota prima
        che finisca.
      </p>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {events.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
    </main>
  );
}

export function DestinationPage({ kind }: { kind: keyof typeof destinations }) {
  const destination = destinations[kind];
  const Icon = destination.icon;

  return (
    <main className="offtime-container py-12 sm:py-16" id="content">
      <section className="offtime-surface relative overflow-hidden bg-surface-1 p-7 sm:p-12 lg:p-16">
        <Icon
          aria-hidden="true"
          className="absolute top-8 right-8 size-24 text-offtime-violet/35 sm:size-32"
        />
        <div className="relative max-w-3xl">
          <p className="offtime-kicker">{destination.eyebrow}</p>
          <h1 className="offtime-display mt-3 text-5xl text-foreground leading-[0.92] sm:text-7xl">
            {destination.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-8">
            {destination.description}
          </p>
          <Link
            className={buttonVariants({ className: "mt-8", size: "lg" })}
            to={destination.href}
          >
            {destination.action}{" "}
            <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
          </Link>
        </div>
      </section>
      <section
        aria-label="Come funziona"
        className="mt-12 grid gap-4 sm:grid-cols-3"
      >
        {[
          "Passa in negozio",
          "Parliamo della collezione",
          "Scegliamo il prossimo passo",
        ].map((step, index) => (
          <article
            className="rounded-xl border border-border bg-surface-1 p-5"
            key={step}
          >
            <p className="font-mono font-semibold text-offtime-pink-bright text-xs">
              0{index + 1}
            </p>
            <h2 className="mt-3 font-semibold text-lg">{step}</h2>
          </article>
        ))}
      </section>
      {kind === "community" ? (
        <Link
          className={buttonVariants({
            className: "mt-10",
            size: "lg",
            variant: "outline",
          })}
          to="/eventi"
        >
          <CalendarDaysIcon aria-hidden="true" data-icon="inline-start" />{" "}
          Calendario eventi
        </Link>
      ) : null}
    </main>
  );
}
