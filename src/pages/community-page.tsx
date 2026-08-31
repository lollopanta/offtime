import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon, MapPinIcon } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

import { EventCard } from "@/components/offtime/event-card";
import { buttonVariants } from "@/components/ui/button";
import { events } from "@/domain/events";
import { communityContent } from "@/features/community/community-content";
import { CommunityReelViewer } from "@/features/community/community-reel-viewer";

gsap.registerPlugin(ScrollTrigger);

const featuredEvents = events.filter((event) =>
  communityContent.featuredEventIds.some(
    (featuredEventId) => featuredEventId === event.id
  )
);

export function CommunityPage() {
  const root = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.fromTo(
        "[data-community-hero-mark]",
        { autoAlpha: 0, scale: 0.94, y: 18 },
        { autoAlpha: 1, duration: 0.7, ease: "power2.out", scale: 1, y: 0 }
      );

      const sections = gsap.utils.toArray<HTMLElement>(
        "[data-community-reveal]"
      );
      for (const section of sections) {
        gsap.fromTo(
          section,
          { autoAlpha: 0.3, scale: 0.98, y: 28 },
          {
            autoAlpha: 1,
            duration: 0.65,
            ease: "power2.out",
            scale: 1,
            scrollTrigger: { start: "top 84%", trigger: section },
            y: 0,
          }
        );
      }
    },
    { scope: root }
  );

  return (
    <main
      className="w-full max-w-full overflow-x-hidden"
      id="content"
      ref={root}
    >
      <section className="offtime-container py-10 sm:py-14 lg:py-20">
        <div className="grid overflow-hidden rounded-[1.125rem] border border-border bg-surface-1 lg:min-h-[39rem] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-between p-7 sm:p-12 lg:p-16">
            <div>
              <p className="offtime-kicker">OFFTIME community</p>
              <h1 className="offtime-display mt-5 max-w-5xl text-5xl text-foreground leading-[0.86] sm:text-7xl lg:text-8xl">
                Le carte sono solo <br className="hidden sm:block" />
                l&apos;inizio.
              </h1>
              <p className="mt-7 max-w-xl text-lg text-muted-foreground leading-8 sm:text-xl">
                Tornei, opening, trade e serate con chi vive il TCG come te.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link className={buttonVariants({ size: "lg" })} to="/eventi">
                Scopri gli eventi
                <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
              </Link>
              <a
                className={buttonVariants({ size: "lg", variant: "outline" })}
                href={communityContent.instagramUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Seguici su Instagram
                <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
              </a>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="relative min-h-72 overflow-hidden bg-[radial-gradient(circle_at_68%_16%,rgb(113_133_255_/_0.58),transparent_25%),radial-gradient(circle_at_30%_76%,rgb(239_117_170_/_0.42),transparent_28%),linear-gradient(145deg,rgb(35_40_82),rgb(14_16_25)_68%)]"
            data-community-hero-mark
          >
            <img
              alt=""
              className="absolute top-1/2 left-1/2 w-[min(76%,25rem)] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_28px_50px_rgb(0_0_0_/_0.32)]"
              height="1080"
              src="/logo.webp"
              width="1080"
            />
            <p className="absolute right-6 bottom-6 left-6 border-white/20 border-t pt-4 font-mono text-[0.65rem] text-white/70 uppercase tracking-[0.16em] sm:right-10 sm:bottom-10 sm:left-10">
              Roma · si gioca dal vivo
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="community-events-title"
        className="offtime-container py-24 sm:py-32 lg:py-40"
        data-community-reveal
      >
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <p className="offtime-kicker">Gioca dal vivo</p>
            <h2
              className="offtime-display mt-4 scroll-mt-28 text-5xl text-foreground leading-[0.9] sm:text-7xl"
              id="community-events-title"
            >
              Ci vediamo al tavolo.
            </h2>
          </div>
          <Link
            className={buttonVariants({ size: "lg", variant: "outline" })}
            to="/eventi"
          >
            Tutti gli eventi
            <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {featuredEvents.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
      </section>

      <div data-community-reveal>
        <CommunityReelViewer
          instagramUrl={communityContent.instagramUrl}
          reels={communityContent.reels}
        />
      </div>

      <section
        className="offtime-container py-24 sm:py-32 lg:py-40"
        data-community-reveal
      >
        <div className="grid items-end gap-10 border-border border-y py-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="offtime-kicker">Fuori dal feed</p>
            <h2 className="offtime-display mt-4 max-w-4xl text-5xl text-foreground leading-[0.9] sm:text-7xl">
              Qui si gioca davvero.
            </h2>
          </div>
          <p className="max-w-xl text-lg text-muted-foreground leading-8">
            L&apos;opening è migliore quando qualcuno è lì a vedere cosa trovi.
            E una trade ha sempre più senso quando inizia con una conversazione.
          </p>
        </div>
      </section>

      <section
        className="offtime-container pb-24 sm:pb-32 lg:pb-40"
        data-community-reveal
      >
        <div className="grid border-border border-y md:grid-cols-3">
          <a
            className="group min-h-64 border-border border-b p-7 transition-colors hover:bg-surface-1 md:border-r md:border-b-0 md:p-10"
            href={communityContent.instagramUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <p className="offtime-kicker">Instagram</p>
            <h2 className="offtime-display mt-4 text-4xl text-foreground leading-[0.92] sm:text-5xl">
              Resta nel loop.
            </h2>
            <p className="mt-4 max-w-sm text-muted-foreground leading-7">
              Opening, restock, eventi e momenti OFFTIME.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-foreground text-sm underline-offset-4 group-hover:underline">
              Seguici
              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </span>
          </a>
          <a
            className="group min-h-64 border-border border-b p-7 transition-colors hover:bg-surface-1 md:border-r md:border-b-0 md:p-10"
            href={communityContent.whatsappUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <p className="offtime-kicker">WhatsApp</p>
            <h2 className="offtime-display mt-4 text-4xl text-foreground leading-[0.92] sm:text-5xl">
              Community, in tasca.
            </h2>
            <p className="mt-4 max-w-sm text-muted-foreground leading-7">
              Aggiornamenti e conversazioni della community OFFTIME.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-foreground text-sm underline-offset-4 group-hover:underline">
              Entra
              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </span>
          </a>
          <a
            className="group min-h-64 p-7 transition-colors hover:bg-surface-1 md:p-10"
            href={communityContent.tiktokUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <p className="offtime-kicker">TikTok</p>
            <h2 className="offtime-display mt-4 text-4xl text-foreground leading-[0.92] sm:text-5xl">
              Più vicino al gioco.
            </h2>
            <p className="mt-4 max-w-sm text-muted-foreground leading-7">
              Video e momenti OFFTIME, direttamente dalla community.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-foreground text-sm underline-offset-4 group-hover:underline">
              Guarda
              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </span>
          </a>
        </div>
      </section>

      <section
        className="offtime-container pb-20 sm:pb-28"
        data-community-reveal
      >
        <div className="grid overflow-hidden rounded-[1.125rem] bg-surface-1 lg:grid-cols-[1fr_0.82fr]">
          <div className="relative p-7 sm:p-12 lg:p-16">
            <div className="max-w-4xl">
              <p className="offtime-kicker text-offtime-pink-bright">
                OFFTIME Roma
              </p>
              <h2 className="offtime-display mt-4 text-5xl text-foreground leading-[0.88] sm:text-7xl">
                Online è bello. <br /> Dal vivo è OFFTIME.
              </h2>
              <p className="mt-7 flex items-center gap-3 text-lg text-muted-foreground leading-8">
                <MapPinIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-offtime-pink-bright"
                />
                {communityContent.storeAddress}
              </p>
              <a
                className={buttonVariants({ className: "mt-9", size: "lg" })}
                href={communityContent.mapUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Indicazioni
                <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
              </a>
            </div>
          </div>
          <iframe
            className="min-h-80 w-full border-0 lg:min-h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={communityContent.mapEmbedUrl}
            title="Mappa per raggiungere OFFTIME Roma"
          />
        </div>
      </section>
    </main>
  );
}
