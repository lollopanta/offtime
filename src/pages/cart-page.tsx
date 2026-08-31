import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { CartLines, currency } from "@/components/offtime/cart-lines";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCart } from "@/features/cart/cart-context";

export function CartPage() {
  const { count, lines, subtotal } = useCart();

  return (
    <main className="offtime-container py-12 sm:py-16" id="content">
      <p className="offtime-kicker">Il tuo ordine</p>
      <h1 className="offtime-display mt-3 text-5xl text-foreground leading-[0.92] sm:text-7xl">
        Il tuo carrello.
      </h1>
      {lines.length ? (
        <div className="mt-4 flex items-center gap-2 text-muted-foreground text-sm">
          <span className="font-semibold text-foreground tabular-nums">
            {count}
          </span>
          {count === 1 ? "articolo" : "articoli"}
        </div>
      ) : null}
      {lines.length ? (
        <div className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-12">
          <section aria-labelledby="cart-items-title">
            <h2 className="font-semibold text-xl" id="cart-items-title">
              Articoli nel carrello
            </h2>
            <CartLines />
          </section>
          <aside className="offtime-surface h-fit bg-surface-1 p-6 xl:sticky xl:top-6">
            <p className="font-mono font-semibold text-muted-foreground text-xs uppercase tracking-[0.1em]">
              Riepilogo
            </p>
            <div className="mt-6 flex items-center justify-between gap-4 text-muted-foreground text-sm">
              <span>Articoli</span>
              <span className="tabular-nums">{count}</span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 border-border border-t pt-4 font-semibold text-lg tabular-nums">
              <span>Subtotale</span>
              <span>{currency.format(subtotal)}</span>
            </div>
            <p className="mt-4 text-muted-foreground text-sm leading-6">
              Spedizione calcolata successivamente.
            </p>
            <Button
              className="mt-6 w-full disabled:opacity-100"
              disabled
              size="lg"
            >
              Procedi al checkout
            </Button>
            <p className="mt-2 text-center text-muted-foreground text-xs">
              Checkout non ancora disponibile.
            </p>
            <Link
              className={buttonVariants({
                className: "mt-4 w-full",
                size: "lg",
                variant: "outline",
              })}
              to="/shop"
            >
              Continua lo shopping
            </Link>
          </aside>
        </div>
      ) : (
        <div className="offtime-surface mt-10 max-w-2xl bg-surface-1 p-7 sm:p-10">
          <h2 className="font-semibold text-2xl">Il tuo carrello è vuoto.</h2>
          <p className="mt-3 text-muted-foreground leading-7">
            Il catalogo è pronto quando trovi il prossimo pezzo per la tua
            collezione.
          </p>
          <Link
            className={buttonVariants({ className: "mt-6", size: "lg" })}
            to="/shop"
          >
            Torna allo shop{" "}
            <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
          </Link>
        </div>
      )}
    </main>
  );
}
