import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";

import { Button, buttonVariants } from "@/components/ui/button";
import { productPath } from "@/domain/catalog";
import { useCart } from "@/features/cart/cart-context";
import { cn } from "@/lib/utils";

const currency = new Intl.NumberFormat("it-IT", {
  currency: "EUR",
  style: "currency",
});

export function CartLines({ compact = false }: { compact?: boolean }) {
  const { lines, removeProduct, updateQuantity } = useCart();

  if (!lines.length) {
    return (
      <div className="py-8 text-center">
        <p className="font-semibold text-foreground">
          Il tuo carrello è vuoto.
        </p>
        <p className="mt-2 text-muted-foreground text-sm leading-6">
          Il prossimo pezzo è nello shop.
        </p>
        <Link
          className={buttonVariants({ className: "mt-5", variant: "outline" })}
          to="/shop"
        >
          Torna allo shop
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {lines.map((line) => (
        <li
          className={cn(
            "py-5",
            compact
              ? "grid grid-cols-[5rem_minmax(0,1fr)] gap-3"
              : "grid grid-cols-[7rem_minmax(0,1fr)] gap-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6"
          )}
          key={line.product.id}
        >
          <Link
            aria-label={`Apri ${line.product.name}`}
            className="row-span-2 shrink-0 rounded-md"
            to={productPath(line.product)}
          >
            <img
              alt=""
              className={cn(
                "rounded-md border border-border bg-surface-2 object-contain",
                compact ? "size-20" : "h-36 w-28 sm:h-44 sm:w-[8.5rem]"
              )}
              height={compact ? "80" : "176"}
              src={line.product.image}
              width={compact ? "80" : "136"}
            />
          </Link>
          <div className="min-w-0">
            <p className="font-mono font-semibold text-[0.625rem] text-offtime-pink-bright uppercase tracking-[0.1em]">
              {line.product.game}
            </p>
            <Link
              className={cn(
                "mt-1 block font-semibold text-foreground hover:text-primary-hover",
                compact
                  ? "truncate text-sm"
                  : "line-clamp-2 text-base leading-6"
              )}
              to={productPath(line.product)}
            >
              {line.product.name}
            </Link>
            <p className="mt-1 text-muted-foreground text-xs leading-5">
              {[
                line.product.set,
                line.product.language,
                line.product.type,
              ].join(" · ")}
            </p>
            <p className="mt-3 font-semibold text-foreground text-sm tabular-nums xl:hidden">
              {currency.format(line.product.price * line.quantity)}
            </p>
          </div>
          <div
            className={cn(
              "flex items-center gap-3",
              compact
                ? "col-start-2 justify-between"
                : "col-span-2 flex-wrap sm:col-span-1 sm:col-start-2 xl:col-span-2 xl:grid xl:grid-cols-[auto_1fr_auto] xl:items-center"
            )}
          >
            <fieldset className="flex items-center rounded-md border border-border bg-background">
              <legend className="sr-only">Quantità {line.product.name}</legend>
              <Button
                aria-label={`Riduci quantità ${line.product.name}`}
                disabled={line.quantity === 1}
                onClick={() =>
                  updateQuantity(line.product.id, line.quantity - 1)
                }
                size="icon"
                variant="ghost"
              >
                <MinusIcon aria-hidden="true" />
              </Button>
              <span className="min-w-9 text-center font-semibold text-sm tabular-nums">
                {line.quantity}
              </span>
              <Button
                aria-label={`Aumenta quantità ${line.product.name}`}
                onClick={() =>
                  updateQuantity(line.product.id, line.quantity + 1)
                }
                size="icon"
                variant="ghost"
              >
                <PlusIcon aria-hidden="true" />
              </Button>
            </fieldset>
            <Button
              aria-label={`Rimuovi ${line.product.name}`}
              className="gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={() => removeProduct(line.product.id)}
              size="default"
              variant="ghost"
            >
              <Trash2Icon aria-hidden="true" />
              Rimuovi
            </Button>
            {compact ? null : (
              <div className="ml-auto hidden text-right xl:col-start-3 xl:block">
                <p className="font-semibold text-base text-foreground tabular-nums">
                  {currency.format(line.product.price * line.quantity)}
                </p>
                <p className="mt-1 text-muted-foreground text-xs tabular-nums">
                  {currency.format(line.product.price)} cad.
                </p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export { currency };
