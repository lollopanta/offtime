import * as React from "react"
import { CheckIcon, HeartIcon, ShoppingBagIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { Product, ProductStatus } from "@/components/offtime/product-data"

export type { Product, ProductStatus } from "@/components/offtime/product-data"

export type ProductCardProps = {
  className?: string
  isLoading?: boolean
  onAddToCart?: (product: Product) => void
  onWishlistChange?: (product: Product, isWishlisted: boolean) => void
  product?: Product
}

const statusLabel: Record<ProductStatus, string> = {
  available: "Disponibile",
  preorder: "Preordine",
  sale: "In saldo",
  "sold-out": "Esaurito",
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <article
      aria-busy="true"
      aria-label="Caricamento prodotto"
      className={cn("offtime-surface overflow-hidden bg-surface-1", className)}
    >
      <Skeleton className="aspect-[4/5] rounded-none bg-surface-2" />
      <div className="flex flex-col gap-3 p-5">
        <Skeleton className="h-5 w-24 bg-surface-2" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-4/5 bg-surface-2" />
          <Skeleton className="h-4 w-2/5 bg-surface-2" />
        </div>
        <Skeleton className="mt-1 h-6 w-20 bg-surface-2" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-11 flex-1 bg-surface-2" />
          <Skeleton className="size-11 bg-surface-2" />
        </div>
      </div>
    </article>
  )
}

export function ProductCard({
  className,
  isLoading = false,
  onAddToCart,
  onWishlistChange,
  product,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = React.useState(false)
  const [isAdded, setIsAdded] = React.useState(false)

  if (isLoading || !product) {
    return <ProductCardSkeleton className={className} />
  }

  const isSoldOut = product.status === "sold-out"
  const productHref =
    product.href ??
    `/prodotto/${encodeURIComponent(`${product.game}-${product.name}`.toLowerCase())}`

  const handleAddToCart = () => {
    if (isSoldOut) return

    setIsAdded(true)
    onAddToCart?.(product)
  }

  const handleWishlist = () => {
    const nextValue = !isWishlisted
    setIsWishlisted(nextValue)
    onWishlistChange?.(product, nextValue)
  }

  return (
    <article
      className={cn(
        "offtime-surface group/product-card overflow-hidden bg-surface-1 transition-transform duration-300 hover:-translate-y-0.5 hover:border-primary/70 hover:bg-surface-2 hover:shadow-[0_20px_52px_rgb(0_0_0_/_0.28)] motion-reduce:transform-none motion-reduce:transition-none",
        className
      )}
    >
      <a
        aria-label={`Guarda ${product.name}`}
        className="relative block aspect-[4/5] overflow-hidden bg-surface-2"
        href={productHref}
      >
        <img
          alt={product.imageAlt ?? `${product.name}, ${product.language}`}
          className={cn(
            "size-full origin-center scale-[1.04] object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/product-card:scale-100 motion-reduce:scale-100 motion-reduce:transition-none",
            isSoldOut && "opacity-60 grayscale"
          )}
          height="1125"
          loading="lazy"
          src={product.image}
          width="900"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/35 to-transparent"
        />
        <div className="absolute top-3 left-3">
          <Badge
            variant={product.status === "preorder" ? "default" : "outline"}
            className={cn(
              "border-border bg-background/85 text-foreground backdrop-blur-sm",
              product.status === "preorder" &&
                "border-primary bg-primary text-primary-foreground",
              product.status === "sale" &&
                "border-offtime-pink/60 bg-release text-release-foreground",
              isSoldOut && "bg-surface-3 text-muted-foreground"
            )}
          >
            {statusLabel[product.status]}
          </Badge>
        </div>
      </a>

      <div className="flex flex-col gap-3 p-5">
        <p
          className="font-mono text-[0.6875rem] font-semibold tracking-[0.1em] text-offtime-pink-bright uppercase"
          translate="no"
        >
          {product.game}
        </p>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold tracking-[-0.025em] text-foreground">
            <a
              className="rounded-sm transition-colors hover:text-primary"
              href={productHref}
            >
              {product.name}
            </a>
          </h3>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {product.type} · {product.language}
          </p>
        </div>
        <div className="flex min-h-7 items-end gap-2">
          <p className="text-lg font-semibold tracking-[-0.04em] text-foreground tabular-nums">
            {formatPrice(product.price)}
          </p>
          {product.status === "sale" && product.originalPrice ? (
            <p className="pb-0.5 text-xs text-muted-foreground tabular-nums line-through">
              {formatPrice(product.originalPrice)}
            </p>
          ) : null}
        </div>
        <div className="mt-1 flex items-center gap-2">
          <Button
            className="min-w-0 flex-1"
            disabled={isSoldOut}
            onClick={handleAddToCart}
            variant={isAdded ? "secondary" : "default"}
          >
            {isSoldOut ? (
              "Esaurito"
            ) : isAdded ? (
              <>
                <CheckIcon aria-hidden="true" data-icon="inline-start" />
                Aggiunto
              </>
            ) : (
              <>
                <ShoppingBagIcon aria-hidden="true" data-icon="inline-start" />
                Aggiungi al carrello
              </>
            )}
          </Button>
          <Button
            aria-label={
              isWishlisted
                ? `Rimuovi ${product.name} dai preferiti`
                : `Aggiungi ${product.name} ai preferiti`
            }
            aria-pressed={isWishlisted}
            onClick={handleWishlist}
            size="icon"
            variant={isWishlisted ? "secondary" : "outline"}
          >
            <HeartIcon
              aria-hidden="true"
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </Button>
        </div>
        <p aria-live="polite" className="sr-only">
          {isAdded ? `${product.name} aggiunto al carrello.` : ""}
        </p>
      </div>
    </article>
  )
}
