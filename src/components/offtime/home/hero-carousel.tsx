import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRightIcon } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import type { Campaign } from "@/content/home";
import { cn } from "@/lib/utils";

const wheelCooldown = 600;
const wheelGestureGap = 180;
const wheelThreshold = 32;

export function HeroCarousel({ campaigns }: { campaigns: Campaign[] }) {
  const root = React.useRef<HTMLElement>(null);
  const carouselRoot = React.useRef<HTMLDivElement>(null);
  const horizontalWheelDistance = React.useRef(0);
  const lastWheelEventAt = React.useRef(0);
  const lastWheelSlideAt = React.useRef(0);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(media.matches);

    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const updateCurrent = () => setCurrent(api.selectedScrollSnap());
    updateCurrent();
    api.on("select", updateCurrent);
    api.on("reInit", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
      api.off("reInit", updateCurrent);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api || campaigns.length < 2 || reduceMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      if (!document.hidden) {
        api.scrollNext();
      }
    }, 8000);

    return () => window.clearInterval(interval);
  }, [api, campaigns.length, reduceMotion]);

  React.useEffect(() => {
    const carousel = carouselRoot.current;
    if (!(api && carousel)) {
      return;
    }

    const handleHorizontalWheel = (event: WheelEvent) => {
      if (
        Math.abs(event.deltaX) <= Math.abs(event.deltaY) ||
        Math.abs(event.deltaX) < 1
      ) {
        return;
      }

      event.preventDefault();

      const now = performance.now();
      if (now - lastWheelSlideAt.current < wheelCooldown) {
        return;
      }

      if (now - lastWheelEventAt.current > wheelGestureGap) {
        horizontalWheelDistance.current = 0;
      }

      lastWheelEventAt.current = now;
      horizontalWheelDistance.current += event.deltaX;

      if (Math.abs(horizontalWheelDistance.current) < wheelThreshold) {
        return;
      }

      if (horizontalWheelDistance.current > 0) {
        api.scrollNext();
      } else {
        api.scrollPrev();
      }

      horizontalWheelDistance.current = 0;
      lastWheelSlideAt.current = now;
    };

    carousel.addEventListener("wheel", handleHorizontalWheel, {
      passive: false,
    });
    return () => carousel.removeEventListener("wheel", handleHorizontalWheel);
  }, [api]);

  useGSAP(
    () => {
      if (reduceMotion) {
        return;
      }

      const activeSlide = root.current?.querySelector(
        `[data-campaign-index="${current}"]`
      );
      if (!activeSlide) {
        return;
      }

      gsap.fromTo(
        activeSlide.querySelector("[data-campaign-art]"),
        { autoAlpha: 0.75, scale: 1.035 },
        { autoAlpha: 1, duration: 0.9, ease: "power3.out", scale: 1 }
      );
    },
    {
      dependencies: [current, reduceMotion],
      revertOnUpdate: true,
      scope: root,
    }
  );

  if (!campaigns.length) {
    return (
      <section className="w-full bg-surface-1">
        <div className="offtime-container py-16 sm:py-24">
          <p className="offtime-kicker">Aggiornamenti OFFTIME</p>
          <h1 className="offtime-display mt-3 max-w-3xl text-5xl text-foreground leading-[0.92]">
            Nuove campagne in arrivo.
          </h1>
          <Link
            className={buttonVariants({ className: "mt-7", size: "lg" })}
            to="/shop"
          >
            Esplora il catalogo
            <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="campaigns-title" className="w-full" ref={root}>
      <h1 className="sr-only" id="campaigns-title">
        Campagne e novità OFFTIME
      </h1>
      <Carousel
        aria-label="Campagne OFFTIME"
        className="overflow-hidden overscroll-x-contain bg-surface-1"
        opts={{ loop: true }}
        ref={carouselRoot}
        setApi={setApi}
      >
        <CarouselContent className="ml-0">
          {campaigns.map((campaign, index) => (
            <CarouselItem
              aria-hidden={index !== current}
              className="pl-0"
              data-campaign-index={index}
              inert={index !== current}
              key={campaign.id}
            >
              <article className="relative min-h-[32rem] overflow-hidden bg-surface-2 sm:min-h-[40rem] lg:min-h-[48rem]">
                <ImageWithSkeleton
                  alt={campaign.imageAlt}
                  className={cn(
                    "object-cover",
                    campaign.image.includes("placehold.co")
                      ? "object-center"
                      : "object-bottom"
                  )}
                  containerClassName="absolute inset-0 size-full"
                  data-campaign-art
                  fetchPriority={index === 0 ? "high" : "auto"}
                  height="1000"
                  loading={index === 0 ? "eager" : "lazy"}
                  src={campaign.image}
                  width="1600"
                />
                {campaign.artworkOnly || !campaign.content ? (
                  <Link
                    aria-label={campaign.accessibleLabel}
                    className="absolute inset-0 focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-inset"
                    to={campaign.href}
                  />
                ) : (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/75 to-transparent px-6 pt-28 pb-10 sm:px-12 sm:pb-14 lg:px-[max(2rem,calc((100vw-var(--container-width))/2))]">
                    <div className="max-w-2xl">
                      <p className="offtime-kicker">
                        {campaign.content.eyebrow}
                      </p>
                      <h2 className="offtime-display mt-3 text-4xl text-foreground leading-[0.92] sm:text-6xl">
                        {campaign.content.title}
                      </h2>
                      <p className="mt-4 max-w-xl text-base text-muted-foreground leading-7 sm:text-lg">
                        {campaign.content.description}
                      </p>
                      <Link
                        className={buttonVariants({
                          className: "mt-6",
                          size: "lg",
                        })}
                        to={campaign.href}
                      >
                        {campaign.content.ctaLabel}
                        <ArrowRightIcon
                          aria-hidden="true"
                          data-icon="inline-end"
                        />
                      </Link>
                    </div>
                  </div>
                )}
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          aria-label="Campagna precedente"
          className="inset-y-auto! top-1/2! right-auto! bottom-auto! left-2! my-0! size-14 -translate-y-1/2! border-transparent bg-transparent text-white opacity-60 shadow-none drop-shadow-md duration-200 hover:bg-transparent hover:text-white hover:opacity-100 focus-visible:opacity-100 sm:left-4! [&_svg]:size-10!"
          variant="ghost"
        />
        <CarouselNext
          aria-label="Campagna successiva"
          className="inset-y-auto! top-1/2! right-2! bottom-auto! left-auto! my-0! size-14 -translate-y-1/2! border-transparent bg-transparent text-white opacity-60 shadow-none drop-shadow-md duration-200 hover:bg-transparent hover:text-white hover:opacity-100 focus-visible:opacity-100 sm:right-4! [&_svg]:size-10!"
          variant="ghost"
        />
      </Carousel>
    </section>
  );
}
