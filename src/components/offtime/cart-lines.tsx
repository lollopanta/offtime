import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { productPath } from "@/domain/catalog";
import { useCart } from "@/features/cart/cart-context";

const currency = new Intl.NumberFormat("it-IT", {
  currency: "EUR",
  style: "currency",
});

export function CartLines({ compact = false }: { compact?: boolean }) {
  const { lines, removeProduct, updateQuantity } = useCart();

  if (!lines.length) {
    return (
      <p className="rounded-md border border-border bg-surface-1 p-5 text-muted-foreground text-sm leading-6">
        Il tuo carrello è vuoto. Esplora il catalogo per trovare il prossimo
        pezzo.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {lines.map((line) => (
        <li className="flex gap-3 py-4" key={line.product.id}>
          <Link className="shrink-0 rounded-sm" to={productPath(line.product)}>
            <img
              alt=""
              className="size-20 rounded-md border border-border bg-surface-2 object-cover"
              height="100"
              src={line.product.image}
              width="80"
            />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="font-mono font-semibold text-[0.625rem] text-offtime-pink-bright uppercase tracking-[0.1em]">
              {line.product.game}
            </p>
            <Link
              className="mt-1 block truncate font-semibold text-foreground text-sm hover:text-primary-hover"
              to={productPath(line.product)}
            >
              {line.product.name}
            </Link>
            <p className="mt-1 text-muted-foreground text-sm tabular-nums">
              {currency.format(line.product.price)}
            </p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <fieldset className="flex items-center rounded-md border border-border bg-background">
                <legend className="sr-only">
                  Quantità {line.product.name}
                </legend>
                <Button
                  aria-label={`Riduci quantità ${line.product.name}`}
                  disabled={line.quantity === 1}
                  onClick={() =>
                    updateQuantity(line.product.id, line.quantity - 1)
                  }
                  size="icon-sm"
                  variant="ghost"
                >
                  <MinusIcon aria-hidden="true" />
                </Button>
                <span className="min-w-8 text-center font-semibold text-sm tabular-nums">
                  {line.quantity}
                </span>
                <Button
                  aria-label={`Aumenta quantità ${line.product.name}`}
                  onClick={() =>
                    updateQuantity(line.product.id, line.quantity + 1)
                  }
                  size="icon-sm"
                  variant="ghost"
                >
                  <PlusIcon aria-hidden="true" />
                </Button>
              </fieldset>
              <Button
                aria-label={`Rimuovi ${line.product.name}`}
                onClick={() => removeProduct(line.product.id)}
                size="icon-sm"
                variant="ghost"
              >
                <Trash2Icon aria-hidden="true" />
              </Button>
            </div>
          </div>
          {compact ? null : (
            <p className="font-semibold text-foreground text-sm tabular-nums">
              {currency.format(line.product.price * line.quantity)}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export { currency };
