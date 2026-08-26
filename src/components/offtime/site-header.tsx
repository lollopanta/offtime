import * as React from "react"
import {
  HeartIcon,
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserRoundIcon,
  XIcon,
} from "lucide-react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const navigation = [
  { label: "Shop", href: "/shop" },
  { label: "Preordini", href: "/preordini" },
  { label: "Eventi", href: "/eventi" },
  { label: "Vendi le tue carte", href: "/vendi" },
  { label: "Community", href: "/community" },
] as const

const searchSuggestions = [
  "One Piece OP-10 Booster Box",
  "Pokémon Mega Evolution",
  "Magic: The Gathering Final Fantasy",
  "Disney Lorcana",
  "Carte singole in evidenza",
] as const

type ProductSearchProps = {
  autoFocus?: boolean
  className?: string
  compact?: boolean
  onDismiss?: () => void
  searchHref: string
}

function ProductSearch({
  autoFocus = false,
  className,
  compact = false,
  onDismiss,
  searchHref,
}: ProductSearchProps) {
  return (
    <form action={searchHref} className={cn("w-full", className)} method="get">
      <Combobox items={searchSuggestions}>
        <ComboboxInput
          aria-label="Cerca prodotti"
          autoComplete="off"
          autoFocus={autoFocus}
          className={cn(
            "w-full bg-surface-2/85 shadow-none hover:border-border-strong",
            compact ? "md:h-11" : "md:h-12"
          )}
          name="q"
          placeholder="Cerca carte, box, set…"
          showTrigger={false}
        >
          <InputGroupAddon align="inline-start">
            <SearchIcon aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {onDismiss ? (
              <InputGroupButton
                aria-label="Chiudi la ricerca"
                onClick={onDismiss}
                size="icon-sm"
                type="button"
                variant="ghost"
              >
                <XIcon aria-hidden="true" />
              </InputGroupButton>
            ) : null}
            <InputGroupButton
              aria-label="Cerca"
              size="icon-sm"
              type="submit"
              variant="ghost"
            >
              <SearchIcon aria-hidden="true" />
            </InputGroupButton>
          </InputGroupAddon>
        </ComboboxInput>
        <ComboboxContent className="border border-border bg-popover shadow-[0_18px_55px_rgb(0_0_0_/_0.35)]">
          <ComboboxEmpty>Nessun prodotto trovato.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                <SearchIcon aria-hidden="true" />
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </form>
  )
}

const navbarIconClass = "size-11 [&_svg]:size-4"

function HeaderIconButton({
  label,
  children,
  href,
}: {
  label: string
  children: React.ReactNode
  href: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <a
            aria-label={label}
            className={cn(
              "inline-flex items-center justify-center rounded-md text-muted-foreground transition-[background-color,color,transform] hover:bg-surface-3 hover:text-foreground",
              navbarIconClass
            )}
            href={href}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function MobileNavigation({ searchHref }: { searchHref: string }) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            aria-label="Apri il menu"
            className={navbarIconClass}
            size="icon"
            variant="ghost"
          />
        }
      >
        <MenuIcon aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        className="w-[min(88vw,23rem)] border-border bg-popover p-0"
        side="left"
      >
        <SheetHeader className="border-b border-border px-6 py-6">
          <SheetTitle className="offtime-display text-2xl">
            Esplora OFFTIME
          </SheetTitle>
          <SheetDescription>
            Carte, collezionabili ed eventi per la tua passione.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-8 overflow-y-auto overscroll-contain px-6 py-6">
          <ProductSearch compact searchHref={searchHref} />
          <nav aria-label="Navigazione mobile">
            <ul className="flex flex-col gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    className="flex min-h-11 items-center rounded-sm px-3 text-lg font-medium tracking-[-0.03em] transition-[background-color,color,transform] hover:bg-surface-3 hover:text-foreground"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="grid grid-cols-2 gap-3 border-t border-border p-6">
          <a
            className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-surface-3 px-3 text-sm font-medium text-foreground transition-[background-color,color] hover:bg-accent"
            href="/preferiti"
          >
            <HeartIcon aria-hidden="true" />
            Preferiti
          </a>
          <a
            className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-surface-3 px-3 text-sm font-medium text-foreground transition-[background-color,color] hover:bg-accent"
            href="/account"
          >
            <UserRoundIcon aria-hidden="true" />
            Account
          </a>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export type SiteHeaderProps = {
  cartCount?: number
  className?: string
  searchHref?: string
}

export function SiteHeader({
  cartCount = 0,
  className,
  searchHref = "/cerca",
}: SiteHeaderProps) {
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = React.useState(false)
  const desktopSearch = React.useRef<HTMLDivElement>(null)

  const closeDesktopSearch = () => {
    setIsDesktopSearchOpen(false)

    window.requestAnimationFrame(() => {
      desktopSearch.current?.parentElement
        ?.querySelector<HTMLButtonElement>("[data-search-trigger]")
        ?.focus()
    })
  }

  const toggleDesktopSearch = () => {
    const nextValue = !isDesktopSearchOpen
    setIsDesktopSearchOpen(nextValue)

    if (nextValue) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          desktopSearch.current?.querySelector("input")?.focus()
        })
      })
    }
  }

  return (
    <TooltipProvider delay={450}>
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-border bg-background/90 pt-[env(safe-area-inset-top)] backdrop-blur-xl",
          className
        )}
      >
        <div className="offtime-container">
          <div className="grid min-h-16 grid-cols-[auto_1fr_auto_auto] items-center gap-3 py-2 xl:grid-cols-[auto_1fr_auto] xl:gap-5 xl:py-3">
            <div className="flex items-center xl:hidden">
              <MobileNavigation searchHref={searchHref} />
            </div>

            <a
              aria-label="OFFTIME, home"
              className="flex min-w-0 items-center justify-center rounded-sm xl:justify-start"
              href="/"
            >
              <img
                alt="OFFTIME"
                className="h-12 w-auto max-w-28 object-contain object-left sm:h-14 sm:max-w-32"
                fetchPriority="high"
                height="48"
                src="/logo.webp"
                width="128"
              />
            </a>

            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    aria-label="Apri la ricerca"
                    className={cn("xl:hidden", navbarIconClass)}
                    size="icon"
                    variant="ghost"
                  />
                }
              >
                <SearchIcon aria-hidden="true" />
              </SheetTrigger>
              <SheetContent
                className="h-auto border-border bg-popover p-0"
                side="top"
              >
                <SheetHeader className="px-6 pt-7 pb-4">
                  <SheetTitle className="offtime-display text-2xl">
                    Cerca nel catalogo
                  </SheetTitle>
                  <SheetDescription>
                    Trova box, carte singole e i prossimi drop.
                  </SheetDescription>
                </SheetHeader>
                <div className="px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                  <ProductSearch searchHref={searchHref} />
                </div>
              </SheetContent>
            </Sheet>

            <NavigationMenu className="hidden xl:flex">
              <NavigationMenuList className="gap-0.5">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent px-3 hover:bg-surface-3 data-open:bg-surface-3">
                    Shop
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-72 bg-popover">
                    <NavigationMenuLink
                      className="font-medium"
                      render={<a href="/shop/novita" />}
                    >
                      Novità
                    </NavigationMenuLink>
                    <NavigationMenuLink render={<a href="/shop/box" />}>
                      Booster Box & display
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      render={<a href="/shop/carte-singole" />}
                    >
                      Carte singole
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {navigation.slice(1).map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle({
                        className:
                          "h-11 bg-transparent px-3 text-muted-foreground hover:bg-surface-3 hover:text-foreground",
                      })}
                      render={<a href={item.href} />}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center justify-end gap-0.5">
              <div
                className="relative hidden h-11 w-11 xl:block"
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    closeDesktopSearch()
                  }
                }}
              >
                <div
                  ref={desktopSearch}
                  aria-hidden={!isDesktopSearchOpen}
                  id="desktop-product-search"
                  inert={!isDesktopSearchOpen}
                  className={cn(
                    "absolute inset-y-0 right-0 w-[min(42vw,34rem)] origin-right overflow-hidden rounded-md border border-border bg-surface-2 shadow-[0_16px_48px_rgb(0_0_0_/_0.28)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform motion-reduce:transition-none",
                    isDesktopSearchOpen
                      ? "scale-x-100 opacity-100"
                      : "pointer-events-none scale-x-[0.08] opacity-0"
                  )}
                >
                  <ProductSearch
                    compact
                    onDismiss={closeDesktopSearch}
                    searchHref={searchHref}
                  />
                </div>
                {!isDesktopSearchOpen ? (
                  <Button
                    aria-controls="desktop-product-search"
                    aria-expanded={false}
                    aria-label="Apri la ricerca"
                    className={cn("relative z-10", navbarIconClass)}
                    data-search-trigger
                    onClick={toggleDesktopSearch}
                    size="icon"
                    variant="ghost"
                  >
                    <SearchIcon aria-hidden="true" />
                  </Button>
                ) : null}
              </div>

              <div className="hidden items-center gap-0.5 xl:flex">
                <HeaderIconButton href="/preferiti" label="Preferiti">
                  <HeartIcon aria-hidden="true" />
                </HeaderIconButton>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        aria-label="Apri il menu account"
                        className={navbarIconClass}
                        size="icon"
                        variant="ghost"
                      />
                    }
                  >
                    <UserRoundIcon aria-hidden="true" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="border border-border bg-popover shadow-[0_18px_55px_rgb(0_0_0_/_0.35)]"
                  >
                    <DropdownMenuLabel>Il tuo account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem render={<a href="/account" />}>
                        Profilo
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<a href="/ordini" />}>
                        I tuoi ordini
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<a href="/accesso" />}>
                        Accedi
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <a
                aria-label={
                  cartCount === 1
                    ? "Carrello, 1 articolo"
                    : `Carrello, ${cartCount} articoli`
                }
                className={cn(
                  "relative inline-flex items-center justify-center rounded-md text-foreground transition-[background-color,color,transform] hover:bg-surface-3",
                  navbarIconClass
                )}
                href="/carrello"
              >
                <ShoppingBagIcon aria-hidden="true" />
                {cartCount > 0 ? (
                  <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-offtime-pink text-[0.625rem] font-bold text-background tabular-nums">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                ) : null}
              </a>
            </div>
          </div>
        </div>
      </header>
    </TooltipProvider>
  )
}
