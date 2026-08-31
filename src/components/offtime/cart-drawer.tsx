import type { ReactElement } from "react";
import { Link } from "react-router-dom";

import { CartLines, currency } from "@/components/offtime/cart-lines";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/features/cart/cart-context";

export function CartDrawer({ trigger }: { trigger: ReactElement }) {
  const { count, subtotal } = useCart();

  return (
    <Sheet>
      <SheetTrigger render={trigger} />
      <SheetContent
        className="flex w-[min(100vw,28rem)] flex-col border-border bg-background p-0 sm:max-w-none"
        side="right"
      >
        <SheetHeader className="border-border border-b px-6 py-5">
          <SheetTitle>Il tuo carrello</SheetTitle>
          <SheetDescription>
            {count === 1
              ? "1 articolo selezionato"
              : `${count} articoli selezionati`}
          </SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6">
          <CartLines compact />
        </div>
        {count ? (
          <div className="border-border border-t p-6">
            <div className="flex items-center justify-between gap-4 font-semibold text-base tabular-nums">
              <span>Subtotale</span>
              <span>{currency.format(subtotal)}</span>
            </div>
            <Button
              className="mt-5 w-full disabled:opacity-100"
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
                className: "mt-3 w-full",
                size: "lg",
                variant: "outline",
              })}
              to="/carrello"
            >
              Visualizza carrello
            </Link>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
