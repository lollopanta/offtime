import { MinusIcon, PlusIcon, ShoppingBagIcon } from "lucide-react";
import * as React from "react";
import { Link, useParams } from "react-router-dom";

import { ProductCard } from "@/components/offtime/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/domain/catalog";
import { getProductBySlug, getRelatedProducts } from "@/domain/catalog";
import { useCart } from "@/features/cart/cart-context";
import { NotFoundPage } from "@/pages/not-found-page";

const statusLabel = {
  available: "Disponibile",
  preorder: "Preordine",
  sale: "In saldo",
  "sold-out": "Esaurito",
} as const;

const currency = new Intl.NumberFormat("it-IT", {
  currency: "EUR",
  minimumFractionDigits: 2,
  style: "currency",
});
function formatAvailability(product: Product) {
  if (product.status === "sold-out") {
    return "Esaurito";
  }
  if (product.status === "preorder") {
    return `${product.availability} preordini disponibili`;
  }
  if (product.availability <= 5) {
    return `Solo ${product.availability} rimasti`;
  }
  return "Disponibile in negozio";
}

export function ProductPage() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return <NotFoundPage />;
  }

  return <ProductDetail key={product.id} product={product} />;
}

function ProductDetail({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const [image, setImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [addedQuantity, setAddedQuantity] = React.useState(0);
  const soldOut = product.status === "sold-out";
  const preorder = product.status === "preorder";
  const maxQuantity = Math.max(1, product.availability);
  const related = getRelatedProducts(product);
  const availability = formatAvailability(product);
  const selectedImage = product.images[image] ?? product.image;
  let primaryActionLabel = "Aggiungi al carrello";
  if (soldOut) {
    primaryActionLabel = "Esaurito";
  } else if (preorder) {
    primaryActionLabel = "Preordina";
  }

  const updateQuantity = (nextQuantity: number) => {
    setQuantity(Math.min(maxQuantity, Math.max(1, nextQuantity)));
  };

  const handleAddToCart = () => {
    if (soldOut) {
      return;
    }
    addProduct(product, quantity);
    setAddedQuantity((currentQuantity) => currentQuantity + quantity);
  };
  return (
    <main className="offtime-container py-10 sm:py-16" id="content">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground text-sm"
      >
        <Link className="hover:text-foreground" to="/shop">
          Shop
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          className="hover:text-foreground"
          to={`/shop/${product.gameSlug}`}
        >
          {product.game}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="min-w-0 break-words text-foreground">
          {product.name}
        </span>
      </nav>
      <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] md:gap-10 lg:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          <div className="offtime-surface overflow-hidden bg-surface-1">
            <img
              alt={product.imageAlt}
              className="aspect-[4/5] w-full object-cover"
              height="1125"
              src={selectedImage}
              width="900"
            />
          </div>
          {product.images.length > 1 ? (
            <div className="mt-3 flex flex-wrap gap-3">
              {product.images.map((source, index) => (
                <button
                  aria-label={`Mostra immagine ${index + 1} di ${product.name}`}
                  aria-pressed={image === index}
                  className="overflow-hidden rounded-md border border-border bg-surface-1 data-[active=true]:border-primary"
                  data-active={image === index}
                  key={source}
                  onClick={() => setImage(index)}
                  type="button"
                >
                  <img
                    alt=""
                    className="size-16 object-cover"
                    height="80"
                    src={source}
                    width="64"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="min-w-0 md:pt-4 lg:pt-6">
          <p className="offtime-kicker" translate="no">
            {product.game}
          </p>
          <h1 className="offtime-display mt-3 text-4xl text-foreground leading-[0.94] sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {product.type} · {product.set} · {product.language}
          </p>
          <div className="mt-7 flex flex-wrap items-end gap-3">
            <p className="font-semibold text-3xl text-foreground tabular-nums tracking-[-0.05em]">
              {currency.format(product.price)}
            </p>
            {product.originalPrice ? (
              <p className="pb-1 text-muted-foreground text-sm tabular-nums line-through">
                {currency.format(product.originalPrice)}
              </p>
            ) : null}
            <Badge
              className="mb-1"
              variant={product.status === "preorder" ? "default" : "outline"}
            >
              {statusLabel[product.status]}
            </Badge>
          </div>
          <p className="mt-3 font-mono font-semibold text-offtime-pink-bright text-xs uppercase tracking-[0.08em]">
            {availability}
          </p>
          <section aria-labelledby="product-details-title" className="mt-8">
            <h2
              className="font-semibold text-foreground text-lg"
              id="product-details-title"
            >
              Dettagli prodotto
            </h2>
            <p className="mt-3 max-w-xl text-base text-muted-foreground leading-7">
              {product.description}
            </p>
          </section>

          <div className="mt-8 grid grid-cols-[minmax(0,1fr)_auto] gap-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-end">
            <div className="col-span-2 sm:col-span-1">
              <label
                className="mb-2 block font-medium text-sm"
                htmlFor="product-quantity"
              >
                Quantità
              </label>
              <div className="flex w-fit items-center rounded-md border border-border bg-surface-1">
                <Button
                  aria-label="Riduci quantità"
                  disabled={soldOut || quantity === 1}
                  onClick={() => updateQuantity(quantity - 1)}
                  size="icon"
                  variant="ghost"
                >
                  <MinusIcon aria-hidden="true" />
                </Button>
                <input
                  className="h-11 w-12 bg-transparent text-center font-semibold text-base tabular-nums outline-none disabled:text-muted-foreground"
                  disabled={soldOut}
                  id="product-quantity"
                  inputMode="numeric"
                  max={maxQuantity}
                  min="1"
                  name="quantity"
                  onChange={(event) =>
                    updateQuantity(Number(event.target.value) || 1)
                  }
                  type="number"
                  value={quantity}
                />
                <Button
                  aria-label="Aumenta quantità"
                  disabled={soldOut || quantity >= maxQuantity}
                  onClick={() => updateQuantity(quantity + 1)}
                  size="icon"
                  variant="ghost"
                >
                  <PlusIcon aria-hidden="true" />
                </Button>
              </div>
            </div>
            <Button
              className="w-full min-w-0"
              disabled={soldOut}
              onClick={handleAddToCart}
              size="lg"
            >
              <ShoppingBagIcon aria-hidden="true" data-icon="inline-start" />
              {primaryActionLabel}
            </Button>
          </div>
          <p
            aria-live="polite"
            className="mt-3 min-h-6 text-muted-foreground text-sm"
          >
            {addedQuantity > 0
              ? `${addedQuantity} ${addedQuantity === 1 ? "articolo aggiunto" : "articoli aggiunti"} al carrello.`
              : ""}
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-border border-t pt-7 text-sm sm:grid-cols-3">
            <div className="min-w-0">
              <dt className="font-mono text-muted-foreground text-xs uppercase tracking-[0.08em]">
                Gioco
              </dt>
              <dd className="mt-1 break-words font-medium">{product.game}</dd>
            </div>
            <div className="min-w-0">
              <dt className="font-mono text-muted-foreground text-xs uppercase tracking-[0.08em]">
                Set
              </dt>
              <dd className="mt-1 break-words font-medium">{product.set}</dd>
            </div>
            <div className="min-w-0">
              <dt className="font-mono text-muted-foreground text-xs uppercase tracking-[0.08em]">
                Tipo
              </dt>
              <dd className="mt-1 break-words font-medium">{product.type}</dd>
            </div>
            <div className="min-w-0">
              <dt className="font-mono text-muted-foreground text-xs uppercase tracking-[0.08em]">
                Lingua
              </dt>
              <dd className="mt-1 break-words font-medium">
                {product.language}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="font-mono text-muted-foreground text-xs uppercase tracking-[0.08em]">
                SKU
              </dt>
              <dd className="mt-1 break-words font-medium" translate="no">
                {product.sku}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="font-mono text-muted-foreground text-xs uppercase tracking-[0.08em]">
                Stato
              </dt>
              <dd className="mt-1 break-words font-medium">
                {statusLabel[product.status]}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {related.length ? (
        <section aria-labelledby="related-title" className="pt-20 sm:pt-28">
          <p className="offtime-kicker">Scelti per te</p>
          <h2
            className="offtime-display mt-3 text-4xl text-foreground sm:text-5xl"
            id="related-title"
          >
            Continua la collezione.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
