import { ShoppingBagIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { CartDrawer } from "@/components/offtime/cart-drawer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CartEntryProps {
  className?: string;
  count: number;
}

export function CartEntry({ count, className }: CartEntryProps) {
  const label =
    count === 1 ? "Carrello, 1 articolo" : `Carrello, ${count} articoli`;

  const cartIcon = (
    <>
      <ShoppingBagIcon aria-hidden="true" />
      {count > 0 ? (
        <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-offtime-pink font-bold text-[0.625rem] text-background tabular-nums">
          {count > 9 ? "9+" : String(count)}
        </span>
      ) : null}
    </>
  );

  return (
    <>
      <div className="hidden xl:block">
        <CartDrawer
          trigger={
            <Button
              aria-label={label}
              className={cn("relative", className)}
              size="icon"
              variant="ghost"
            >
              {cartIcon}
            </Button>
          }
        />
      </div>
      <Link
        aria-label={label}
        className={cn(
          "relative inline-flex items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-primary-hover xl:hidden",
          className
        )}
        to="/carrello"
      >
        {cartIcon}
      </Link>
    </>
  );
}
