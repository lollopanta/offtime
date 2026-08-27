import * as React from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ArrowRightIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { Campaign } from "@/components/offtime/home/home-data"

const wheelCooldown = 600
const wheelGestureGap = 180
const wheelThreshold = 32

export function HeroCarousel({ campaigns }: { campaigns: Campaign[] }) {
  const root = React.useRef<HTMLElement>(null)
  const carouselRoot = React.useRef<HTMLDivElement>(null)
  const horizontalWheelDistance = React.useRef(0)
  const lastWheelEventAt = React.useRef(0)
  const lastWheelSlideAt = React.useRef(0)
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [reduceMotion, setReduceMotion] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setReduceMotion(media.matches)

    updatePreference()
    media.addEventListener("change", updatePreference)
    return () => media.removeEventListener("change", updatePreference)
  }, [])

  React.useEffect(() => {
    if (!api) return

    const updateCurrent = () => setCurrent(api.selectedScrollSnap())
    updateCurrent()
    api.on("select", updateCurrent)
    api.on("reInit", updateCurrent)

    return () => {
      api.off("select", updateCurrent)
      api.off("reInit", updateCurrent)
    }
  }, [api])

  React.useEffect(() => {
    if (!api || campaigns.length < 2 || reduceMotion) {
      return
    }

    const interval = window.setInterval(() => {
      if (!document.hidden) api.scrollNext()
    }, 8000)

    return () => window.clearInterval(interval)
  }, [api, campaigns.length, reduceMotion])

  React.useEffect(() => {
    const carousel = carouselRoot.current
    if (!api || !carousel) return

    const handleHorizontalWheel = (event: WheelEvent) => {
      if (
        Math.abs(event.deltaX) <= Math.abs(event.deltaY) ||
        Math.abs(event.deltaX) < 1
      ) {
        return
      }

      event.preventDefault()

      const now = performance.now()
      if (now - lastWheelSlideAt.current < wheelCooldown) return

      if (now - lastWheelEventAt.current > wheelGestureGap) {
        horizontalWheelDistance.current = 0
      }

      lastWheelEventAt.current = now
      horizontalWheelDistance.current += event.deltaX

      if (Math.abs(horizontalWheelDistance.current) < wheelThreshold) return

      if (horizontalWheelDistance.current > 0) api.scrollNext()
      else api.scrollPrev()

      horizontalWheelDistance.current = 0
      lastWheelSlideAt.current = now
    }

    carousel.addEventListener("wheel", handleHorizontalWheel, {
      passive: false,
    })
    return () => carousel.removeEventListener("wheel", handleHorizontalWheel)
  }, [api])

  useGSAP(
    () => {
      if (reduceMotion) return

      const activeSlide = root.current?.querySelector(
        `[data-campaign-index="${current}"]`
      )
      if (!activeSlide) return

      gsap.fromTo(
        activeSlide.querySelector("[data-campaign-art]"),
        { scale: 1.035, autoAlpha: 0.75 },
        { scale: 1, autoAlpha: 1, duration: 0.9, ease: "power3.out" }
      )
    },
    { scope: root, dependencies: [current, reduceMotion], revertOnUpdate: true }
  )

  if (!campaigns.length) {
    return (
      <section className="w-full bg-surface-1">
        <div className="offtime-container py-16 sm:py-24">
          <p className="offtime-kicker">Aggiornamenti OFFTIME</p>
          <h1 className="offtime-display mt-3 max-w-3xl text-5xl leading-[0.92] text-foreground">
            Nuove campagne in arrivo.
          </h1>
          <a
            className={buttonVariants({ className: "mt-7", size: "lg" })}
            href="/shop"
          >
            Esplora il catalogo
            <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
          </a>
        </div>
      </section>
    )
  }

  return (
    <section ref={root} aria-labelledby="campaigns-title" className="w-full">
      <h1 className="sr-only" id="campaigns-title">
        Campagne e novità OFFTIME
      </h1>
      <Carousel
        ref={carouselRoot}
        aria-label="Campagne OFFTIME"
        className="overflow-hidden overscroll-x-contain bg-surface-1"
        opts={{ loop: true }}
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
              <a
                aria-label={`${campaign.title} — ${campaign.ctaLabel}`}
                className="relative block min-h-[28rem] overflow-hidden bg-surface-2 focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-inset sm:min-h-[34rem] lg:min-h-[42rem]"
                href={campaign.href}
              >
                <img
                  alt={campaign.imageAlt}
                  className="absolute inset-0 size-full object-cover object-center"
                  data-campaign-art
                  fetchPriority={index === 0 ? "high" : "auto"}
                  height="1000"
                  loading={index === 0 ? "eager" : "lazy"}
                  src={campaign.image}
                  width="1600"
                />
              </a>
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
  )
}
