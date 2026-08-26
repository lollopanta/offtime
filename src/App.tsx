import { useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRightIcon, CheckIcon, SearchIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/offtime/product-card"
import { temporaryProducts } from "@/components/offtime/product-data"
import { SiteHeader } from "@/components/offtime/site-header"

const swatches = [
  {
    name: "OFFTIME Blue",
    token: "--offtime-blue",
    value: "#4658AD",
    className: "bg-offtime-blue",
  },
  {
    name: "OFFTIME Pink",
    token: "--offtime-pink",
    value: "#EF75AA",
    className: "bg-offtime-pink",
  },
  {
    name: "Base",
    token: "--surface-0",
    value: "#08090D",
    className: "bg-surface-0",
  },
  {
    name: "Raised",
    token: "--surface-2",
    value: "#181B24",
    className: "bg-surface-2",
  },
] as const

const spacing = [
  ["04", "--space-1", "0.25rem"],
  ["08", "--space-2", "0.5rem"],
  ["16", "--space-4", "1rem"],
  ["24", "--space-6", "1.5rem"],
  ["48", "--space-12", "3rem"],
] as const

const scrubWords = "Built for a vivid, deliberate shopping experience.".split(
  " "
)

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="flex max-w-2xl flex-col gap-3">
      <p className="offtime-kicker">{eyebrow}</p>
      <h2
        id={id}
        className="offtime-display scroll-mt-8 text-3xl text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-7 text-pretty text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}

function DesignSystemPage() {
  const page = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      gsap.registerPlugin(ScrollTrigger)

      gsap.from("[data-hero-reveal]", {
        y: 18,
        autoAlpha: 0,
        duration: 0.72,
        ease: "power3.out",
        stagger: 0.09,
      })

      gsap.fromTo(
        "[data-scroll-logo]",
        { scale: 0.8, autoAlpha: 0.25 },
        {
          scale: 1,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-scroll-stage]",
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      )

      gsap.fromTo(
        "[data-scrub-word]",
        { autoAlpha: 0.18 },
        {
          autoAlpha: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: {
            trigger: "[data-scrub-copy]",
            start: "top 88%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      )
    },
    { scope: page }
  )

  return (
    <div ref={page} className="min-h-svh overflow-x-hidden bg-background">
      <a
        className={buttonVariants({
          variant: "secondary",
          size: "sm",
          className: "offtime-skip-link",
        })}
        href="#content"
      >
        Skip to content
      </a>

      <header className="offtime-container pt-[max(1rem,env(safe-area-inset-top))] sm:pt-6">
        <nav
          aria-label="Design system navigation"
          className="offtime-surface flex min-h-14 items-center justify-between gap-4 bg-surface-1/90 px-3 py-2 backdrop-blur-md sm:px-4"
        >
          <a
            className="flex min-w-0 items-center gap-2 rounded-sm"
            href="/design-system"
            aria-label="OFFTIME design system home"
          >
            <img
              alt="OFFTIME"
              className="size-9 shrink-0 rounded-[0.45rem] object-cover object-center"
              height="36"
              fetchPriority="high"
              src="/logo.webp"
              width="36"
            />
            <span
              className="truncate text-sm font-semibold tracking-[-0.03em]"
              translate="no"
            >
              OFFTIME
            </span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Design system
            </span>
          </a>
          <div className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
            <a
              className="rounded-sm px-2 py-1.5 transition-colors hover:text-foreground"
              href="#foundation"
            >
              Foundation
            </a>
            <a
              className="rounded-sm px-2 py-1.5 transition-colors hover:text-foreground"
              href="#components"
            >
              Components
            </a>
            <a
              className="rounded-sm px-2 py-1.5 transition-colors hover:text-foreground"
              href="#guidance"
            >
              Guidance
            </a>
          </div>
          <Badge
            variant="outline"
            className="text-offtime-pink-bright border-offtime-pink/45 bg-offtime-pink/10"
          >
            v0.1
          </Badge>
        </nav>
      </header>

      <main
        id="content"
        className="offtime-container pt-20 pb-20 sm:pt-28 sm:pb-28"
      >
        <section
          aria-labelledby="page-title"
          className="relative flex flex-col items-start gap-8 py-8 sm:py-14"
        >
          <p data-hero-reveal className="offtime-kicker">
            A living interface foundation
          </p>
          <h1
            id="page-title"
            data-hero-reveal
            className="offtime-display max-w-6xl text-[clamp(3.15rem,8vw,7rem)] leading-[0.9] text-foreground"
          >
            Make every detail feel intentionally{" "}
            <span className="text-offtime-pink-bright">OFFTIME.</span>
          </h1>
          <div data-hero-reveal className="flex max-w-xl flex-col gap-6">
            <p className="text-lg leading-8 text-pretty text-muted-foreground sm:text-xl">
              A dark, high-clarity toolkit for the next OFFTIME commerce
              experience—anchored in blue energy, pink warmth, and deliberate
              restraint.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                className={buttonVariants({ variant: "default", size: "lg" })}
                href="#foundation"
              >
                Explore the foundation
                <ArrowUpRightIcon data-icon="inline-end" />
              </a>
              <a
                className={buttonVariants({
                  variant: "secondary",
                  size: "lg",
                })}
                href="#components"
              >
                Test component states
              </a>
            </div>
          </div>
        </section>

        <Separator className="my-16 sm:my-24" />

        <section
          id="foundation"
          aria-labelledby="foundation-title"
          className="scroll-mt-8"
        >
          <SectionHeading
            id="foundation-title"
            eyebrow="Foundation"
            title="The set of rules every screen starts with."
            description="Brand color, surface depth, type roles, and a predictable spacing rhythm form the visual contract for every OFFTIME component."
          />

          <div className="mt-10 grid grid-flow-dense gap-4 md:grid-cols-4">
            {swatches.map((swatch) => (
              <article
                key={swatch.token}
                className="offtime-surface offtime-surface-interactive min-w-0 bg-surface-1 p-3 md:col-span-2"
              >
                <div className={`offtime-swatch ${swatch.className}`} />
                <div className="flex items-end justify-between gap-3 px-1 pt-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-foreground">
                      {swatch.name}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {swatch.token}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                    {swatch.value}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div
            className="mt-4 grid grid-flow-dense gap-4 md:grid-cols-4"
            data-scroll-stage
          >
            <article className="offtime-surface min-w-0 bg-surface-1 p-6 md:col-span-2">
              <p className="offtime-kicker">Surface levels</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ["Base", "bg-surface-0"],
                  ["Card", "bg-surface-1"],
                  ["Raised", "bg-surface-2"],
                ].map(([label, className]) => (
                  <div key={label} className="min-w-0">
                    <div
                      className={`h-20 rounded-sm border border-border ${className}`}
                    />
                    <p className="mt-2 truncate text-xs text-muted-foreground">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </article>
            <article className="offtime-surface min-w-0 overflow-hidden bg-surface-2 p-6 md:col-span-2">
              <div className="flex h-full flex-col justify-between gap-8">
                <div>
                  <p className="offtime-kicker">Brand presence</p>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                    The mark stays expressive; the surrounding system remains
                    calm enough to let product, price, and choice read first.
                  </p>
                </div>
                <img
                  data-scroll-logo
                  alt="OFFTIME logo artwork"
                  className="h-28 w-full origin-left object-contain object-left sm:h-32"
                  height="128"
                  loading="lazy"
                  src="/logo.webp"
                  width="384"
                />
              </div>
            </article>
            <article className="offtime-surface min-w-0 bg-surface-1 p-6 md:col-span-1">
              <p className="offtime-kicker">Radius</p>
              <div className="mt-6 flex items-end gap-3">
                <div className="size-16 rounded-sm border border-offtime-blue/60 bg-offtime-blue/15" />
                <div className="size-20 rounded-md border border-offtime-pink/60 bg-offtime-pink/15" />
              </div>
              <p className="mt-5 font-mono text-xs text-muted-foreground">
                8px / 14px
              </p>
            </article>
            <article className="offtime-surface min-w-0 bg-surface-3 p-6 md:col-span-2">
              <p className="offtime-kicker">Type rhythm</p>
              <p className="mt-4 font-mono text-xs leading-6 text-muted-foreground">
                UI / Geist Variable
                <br />
                Metadata / SF Mono
              </p>
            </article>
            <article className="offtime-surface min-w-0 bg-offtime-blue p-6 text-white md:col-span-1">
              <p className="font-mono text-xs font-semibold tracking-[0.12em] text-white/75 uppercase">
                Readability
              </p>
              <p className="mt-5 text-xl font-semibold tracking-[-0.04em] text-balance">
                Bright content, one clear action.
              </p>
            </article>
          </div>
        </section>

        <Separator className="my-16 sm:my-24" />

        <section aria-labelledby="type-title" className="scroll-mt-8">
          <SectionHeading
            id="type-title"
            eyebrow="Typography"
            title="Clear hierarchy with an editorial edge."
            description="Geist Variable handles display and interface work; the mono role is reserved for SKU-like metadata, timestamps, and token names."
          />
          <div className="offtime-surface mt-10 overflow-hidden bg-surface-1">
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-border p-6 sm:p-8 lg:border-r lg:border-b-0">
                <p className="offtime-kicker">Display</p>
                <p className="offtime-display mt-7 text-5xl leading-[0.92] tracking-[-0.07em] sm:text-6xl">
                  Weekend energy, every day.
                </p>
              </div>
              <div className="flex flex-col divide-y divide-border">
                <div className="p-6 sm:p-8">
                  <p className="offtime-kicker">Headings</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-foreground">
                    H2 brings the focus.
                  </h2>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.025em] text-foreground">
                    H3 carries the structure.
                  </h3>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="offtime-kicker">Body</p>
                  <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                    Body copy is generous, calm, and easy to scan. It supports
                    product discovery without competing with product imagery or
                    the next clear action.
                  </p>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="offtime-kicker">Metadata</p>
                  <p className="mt-4 font-mono text-xs leading-6 tracking-[0.02em] text-muted-foreground">
                    DROP-026 / 08.26.26 / IN STOCK / €140.00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-16 sm:my-24" />

        <section
          id="components"
          aria-labelledby="components-title"
          className="scroll-mt-8"
        >
          <SectionHeading
            id="components-title"
            eyebrow="Components"
            title="Familiar mechanics, unmistakably OFFTIME."
            description="The primitives stay native and accessible. Tokens supply the character, so components are consistent without decorative noise."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <article className="offtime-surface bg-surface-1 p-6 sm:p-8">
              <h3 className="text-base font-semibold text-foreground">
                Actions
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Primary is decisive; secondary holds context; ghost is quiet
                until intent appears.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button size="lg">
                  Add to bag <ArrowUpRightIcon data-icon="inline-end" />
                </Button>
                <Button variant="secondary" size="lg">
                  Save for later
                </Button>
                <Button variant="ghost" size="lg">
                  View details
                </Button>
              </div>
            </article>
            <article className="offtime-surface bg-surface-1 p-6 sm:p-8">
              <h3 className="text-base font-semibold text-foreground">
                Search input
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                A comfortable hit area, clear focus state, and a real form
                control from the outset.
              </p>
              <form
                className="mt-6"
                onSubmit={(event) => event.preventDefault()}
              >
                <label htmlFor="system-search" className="sr-only">
                  Search the OFFTIME catalog
                </label>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <SearchIcon aria-hidden="true" />
                  </InputGroupAddon>
                  <InputGroupInput
                    autoComplete="off"
                    id="system-search"
                    name="search"
                    placeholder="Search pieces, drops, stories…"
                    type="search"
                  />
                  <InputGroupAddon align="inline-end">
                    <span className="font-mono text-[0.6875rem]">⌘&nbsp;K</span>
                  </InputGroupAddon>
                </InputGroup>
              </form>
            </article>
            <article className="offtime-surface bg-surface-1 p-6 sm:p-8">
              <h3 className="text-base font-semibold text-foreground">
                Statuses
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Status always has a written label; color reinforces meaning
                rather than carrying it alone.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge>
                  <CheckIcon aria-hidden="true" /> In stock
                </Badge>
                <Badge variant="secondary">New release</Badge>
                <Badge variant="outline">Coming soon</Badge>
                <Badge variant="destructive">Low stock</Badge>
              </div>
            </article>
            <article className="offtime-surface bg-surface-1 p-6 sm:p-8">
              <h3 className="text-base font-semibold text-foreground">
                Hover and focus
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Every interactive element lifts only slightly on hover and
                receives a fully visible blue focus ring with keyboard
                navigation.
              </p>
              <Button className="mt-6" variant="outline">
                Tab to inspect the focus state
              </Button>
            </article>
          </div>
        </section>

        <Separator className="my-16 sm:my-24" />

        <section aria-labelledby="rhythm-title" className="scroll-mt-8">
          <SectionHeading
            id="rhythm-title"
            eyebrow="Rhythm"
            title="Space is part of the voice."
            description="A small set of repeatable intervals keeps sparse moments composed and dense product moments legible."
          />
          <div className="offtime-surface mt-10 bg-surface-1 p-6 sm:p-8">
            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {spacing.map(([label, token, value]) => (
                <div key={token} className="min-w-0">
                  <dt className="font-mono text-xs text-muted-foreground">
                    {token}
                  </dt>
                  <dd className="mt-3 flex items-end gap-3">
                    <span className="font-mono text-xl text-foreground tabular-nums">
                      {label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {value}
                    </span>
                  </dd>
                  <div className="mt-4 h-2 rounded-full bg-offtime-pink/20">
                    <div
                      className="h-2 rounded-full bg-offtime-pink"
                      style={{ width: `var(${token})` }}
                    />
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Separator className="my-16 sm:my-24" />

        <section
          id="guidance"
          aria-labelledby="guidance-title"
          className="scroll-mt-8"
        >
          <SectionHeading
            id="guidance-title"
            eyebrow="In use"
            title="A few rules make the system travel well."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <Accordion
              className="offtime-surface overflow-hidden bg-surface-1 px-6 sm:px-8"
              defaultValue={["clarity"]}
              multiple
            >
              <AccordionItem value="clarity">
                <AccordionTrigger>
                  Put product clarity before visual effect.
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Use the primary blue for the one next action. Let surface
                  contrast and typography organize everything else.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="restraint">
                <AccordionTrigger>
                  Use pink as a signal, not a background.
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Pink works best for delight, release moments, and active
                  emphasis. Keep large areas dark and breathable.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="metadata">
                <AccordionTrigger>
                  Keep operational data compact and mono.
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  SKU, price, drop status, and dates should remain easy to scan
                  without competing with the product’s story.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Carousel
              aria-label="OFFTIME component direction"
              className="offtime-surface bg-surface-2 px-14 py-8 sm:px-16"
              opts={{ loop: true }}
            >
              <CarouselContent>
                {[
                  [
                    "Deep surfaces",
                    "Quiet backgrounds give product imagery and bright calls to action room to land.",
                  ],
                  [
                    "Blue intent",
                    "Blue concentrates attention on choice, progress, and the next meaningful step.",
                  ],
                  [
                    "Pink warmth",
                    "Pink keeps the system expressive without losing the premium, dark foundation.",
                  ],
                ].map(([title, copy]) => (
                  <CarouselItem key={title}>
                    <div className="flex min-h-40 flex-col justify-between gap-6">
                      <p className="offtime-kicker">System direction</p>
                      <div>
                        <h3 className="text-2xl font-semibold tracking-[-0.045em] text-foreground">
                          {title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                          {copy}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                aria-label="Previous direction"
                className="left-3 size-11 border-border bg-surface-1 hover:bg-surface-3"
              />
              <CarouselNext
                aria-label="Next direction"
                className="right-3 size-11 border-border bg-surface-1 hover:bg-surface-3"
              />
            </Carousel>
          </div>

          <p
            data-scrub-copy
            className="offtime-display mt-20 max-w-5xl text-3xl leading-[1.02] text-foreground sm:mt-28 sm:text-5xl"
          >
            {scrubWords.map((word, index) => (
              <span
                data-scrub-word
                key={`${word}-${index}`}
                className="mr-[0.24em] inline-block"
              >
                {word}
              </span>
            ))}
          </p>
        </section>
      </main>

      <footer className="border-t border-border bg-surface-1">
        <div className="offtime-container flex flex-col gap-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:py-14">
          <div>
            <p className="offtime-display text-3xl text-foreground">
              Ready to build with intent.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              OFFTIME design foundation · v0.1
            </p>
          </div>
          <a
            className={buttonVariants({ variant: "default", size: "lg" })}
            href="#foundation"
          >
            Back to foundation <ArrowUpRightIcon data-icon="inline-end" />
          </a>
        </div>
      </footer>
    </div>
  )
}

function StorefrontPage() {
  const storefront = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      gsap.registerPlugin(ScrollTrigger)

      gsap.from("[data-storefront-hero]", {
        y: 20,
        autoAlpha: 0,
        duration: 0.72,
        ease: "power3.out",
        stagger: 0.08,
      })

      gsap.from("[data-storefront-card]", {
        y: 18,
        autoAlpha: 0,
        duration: 0.56,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "[data-storefront-grid]",
          start: "top 82%",
        },
      })
    },
    { scope: storefront }
  )

  return (
    <div ref={storefront} className="min-h-svh bg-background">
      <a
        className={buttonVariants({
          variant: "secondary",
          size: "sm",
          className: "offtime-skip-link",
        })}
        href="#catalogo"
      >
        Vai al catalogo
      </a>
      <SiteHeader cartCount={2} />

      <main className="w-full max-w-full overflow-x-hidden">
        <section className="offtime-container grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:py-36">
          <div className="flex max-w-3xl flex-col items-start gap-7">
            <p data-storefront-hero className="offtime-kicker">
              Carte che restano
            </p>
            <h1
              data-storefront-hero
              className="offtime-display max-w-6xl text-[clamp(3.25rem,7vw,6.4rem)] leading-[0.9] text-foreground"
            >
              Colleziona ciò che non passa.
            </h1>
            <p
              data-storefront-hero
              className="max-w-xl text-lg leading-8 text-pretty text-muted-foreground sm:text-xl"
            >
              Scopri booster box, carte singole e nuove uscite selezionate per
              chi prende sul serio il proprio OFFTIME.
            </p>
            <div data-storefront-hero className="flex flex-wrap gap-3">
              <a
                className={buttonVariants({ variant: "default", size: "lg" })}
                href="#catalogo"
              >
                Esplora i drop
                <ArrowUpRightIcon data-icon="inline-end" />
              </a>
              <a
                className={buttonVariants({
                  variant: "secondary",
                  size: "lg",
                })}
                href="/preordini"
              >
                Guarda i preordini
              </a>
            </div>
          </div>

          <div
            data-storefront-hero
            className="offtime-surface relative aspect-[4/5] overflow-hidden bg-surface-2 lg:w-full lg:max-w-md lg:justify-self-end"
          >
            <img
              alt="Collezionabile in evidenza"
              className="size-full object-cover object-center opacity-90 contrast-125"
              fetchPriority="high"
              height="1125"
              src={temporaryProducts[0].image}
              width="900"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_76%_12%,color-mix(in_srgb,var(--offtime-pink)_24%,transparent),transparent_36%),linear-gradient(to_top,rgb(8_9_13_/_0.7),transparent_55%)]"
            />
            <div className="absolute right-5 bottom-5 left-5">
              <p className="offtime-kicker">In evidenza</p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-foreground">
                {temporaryProducts[0].name}
              </p>
            </div>
          </div>
        </section>

        <section
          id="catalogo"
          aria-labelledby="catalogo-title"
          className="border-y border-border bg-surface-1 py-20 sm:py-28"
        >
          <div className="offtime-container">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="offtime-kicker">Nuovi arrivi</p>
                <h2
                  id="catalogo-title"
                  className="offtime-display mt-3 scroll-mt-28 text-4xl text-foreground sm:text-5xl"
                >
                  Pronti per il tuo raccoglitore.
                </h2>
              </div>
              <a
                className={buttonVariants({ variant: "outline", size: "lg" })}
                href="/shop"
              >
                Tutti i prodotti
                <ArrowUpRightIcon data-icon="inline-end" />
              </a>
            </div>

            <div
              data-storefront-grid
              className="mt-10 grid grid-flow-dense gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {temporaryProducts.map((product) => (
                <div data-storefront-card key={product.href}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background">
        <div className="offtime-container flex flex-col gap-6 py-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="offtime-display text-3xl text-foreground">
              Il tuo prossimo pezzo ti aspetta.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              OFFTIME · Carte, cultura, community.
            </p>
          </div>
          <a
            className={buttonVariants({ variant: "secondary", size: "lg" })}
            href="/community"
          >
            Entra nella community
          </a>
        </div>
      </footer>
    </div>
  )
}

export function App() {
  const isDesignSystem = window.location.pathname === "/design-system"

  useEffect(() => {
    document.title = isDesignSystem ? "OFFTIME Design System" : "OFFTIME"
  }, [isDesignSystem])

  return isDesignSystem ? <DesignSystemPage /> : <StorefrontPage />
}

export default App
