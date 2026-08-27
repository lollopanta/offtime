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
  contentSideOffset?: number
  onDismiss?: () => void
  searchHref: string
}

function ProductSearch({
  autoFocus = false,
  className,
  compact = false,
  contentSideOffset,
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
            "w-full bg-background shadow-none hover:border-border-strong dark:bg-input/0",
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
        <ComboboxContent
          className="border border-border bg-popover shadow-[0_18px_55px_rgb(0_0_0_/_0.35)]"
          sideOffset={contentSideOffset}
        >
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
        className="w-[min(88vw,23rem)] border-border bg-background p-0"
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
  const [isNavbarSearchOpen, setIsNavbarSearchOpen] = React.useState(false)
  const navbarSearch = React.useRef<HTMLDivElement>(null)
  const searchTrigger = React.useRef<HTMLButtonElement>(null)

  const closeNavbarSearch = () => {
    setIsNavbarSearchOpen(false)

    window.requestAnimationFrame(() => {
      searchTrigger.current?.focus()
    })
  }

  const openNavbarSearch = () => {
    setIsNavbarSearchOpen(true)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        navbarSearch.current?.querySelector("input")?.focus()
      })
    })
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
          <div className="grid min-h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-2 xl:gap-5 xl:py-3">
            <div
              aria-hidden={isNavbarSearchOpen}
              className={cn(
                "flex items-center transition-opacity duration-150 motion-reduce:transition-none xl:hidden",
                isNavbarSearchOpen && "pointer-events-none opacity-0"
              )}
              inert={isNavbarSearchOpen}
            >
              <MobileNavigation searchHref={searchHref} />
            </div>

            <a
              aria-hidden={isNavbarSearchOpen}
              aria-label="OFFTIME, home"
              className={cn(
                "flex min-w-0 items-center justify-center rounded-sm transition-opacity duration-150 motion-reduce:transition-none xl:justify-start",
                isNavbarSearchOpen && "pointer-events-none opacity-0"
              )}
              href="/"
              inert={isNavbarSearchOpen}
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

            <NavigationMenu
              aria-hidden={isNavbarSearchOpen}
              className={cn(
                "hidden transition-opacity duration-150 motion-reduce:transition-none xl:flex",
                isNavbarSearchOpen && "pointer-events-none opacity-0"
              )}
              inert={isNavbarSearchOpen}
              sideOffset={28}
            >
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
                className="relative h-11 w-11 shrink-0"
                onKeyDown={(event) => {
                  if (event.key === "Escape" && isNavbarSearchOpen) {
                    closeNavbarSearch()
                  }
                }}
              >
                <div
                  ref={navbarSearch}
                  aria-hidden={!isNavbarSearchOpen}
                  id="navbar-product-search"
                  inert={!isNavbarSearchOpen}
                  className={cn(
                    "absolute inset-y-0 right-[-2.875rem] w-[min(calc(100vw-2rem),76rem)] origin-right overflow-hidden rounded-md bg-surface-2 shadow-[0_16px_48px_rgb(0_0_0_/_0.28)] transition-[opacity,transform] duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform motion-reduce:transform-none motion-reduce:transition-opacity xl:right-[-8.625rem]",
                    isNavbarSearchOpen
                      ? "scale-x-100 opacity-100"
                      : "pointer-events-none scale-x-[0.12] opacity-0"
                  )}
                >
                  <ProductSearch
                    compact
                    contentSideOffset={28}
                    onDismiss={closeNavbarSearch}
                    searchHref={searchHref}
                  />
                </div>
                <Button
                  ref={searchTrigger}
                  aria-controls="navbar-product-search"
                  aria-expanded={isNavbarSearchOpen}
                  aria-hidden={isNavbarSearchOpen}
                  aria-label="Apri la ricerca"
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform] duration-150 motion-reduce:transition-none",
                    navbarIconClass,
                    isNavbarSearchOpen
                      ? "pointer-events-none scale-95 opacity-0"
                      : "scale-100 opacity-100"
                  )}
                  inert={isNavbarSearchOpen}
                  onClick={openNavbarSearch}
                  size="icon"
                  variant="ghost"
                >
                  <SearchIcon aria-hidden="true" />
                </Button>
              </div>

              <div
                aria-hidden={isNavbarSearchOpen}
                className={cn(
                  "flex items-center gap-0.5 transition-opacity duration-150 motion-reduce:transition-none",
                  isNavbarSearchOpen && "pointer-events-none opacity-0"
                )}
                inert={isNavbarSearchOpen}
              >
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
                      sideOffset={24}
                    >
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Il tuo account</DropdownMenuLabel>
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
        </div>
      </header>
    </TooltipProvider>
  )
}
