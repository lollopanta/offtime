import { Link, Outlet } from "react-router-dom";

import { SiteHeader } from "@/components/offtime/site-header";
import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/features/cart/cart-context";

export function StorefrontShell() {
  const { count } = useCart();

  return (
    <div className="min-h-svh bg-background">
      <a
        className={buttonVariants({
          className: "offtime-skip-link",
          size: "sm",
          variant: "secondary",
        })}
        href="#content"
      >
        Vai al contenuto
      </a>
      <SiteHeader cartCount={count} />
      <Outlet />
      <footer className="border-border border-t bg-surface-1">
        <div className="offtime-container flex flex-col gap-6 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <img
              alt="OFFTIME"
              className="h-12 w-auto object-contain object-left"
              height="48"
              loading="lazy"
              src="/logo.webp"
              width="128"
            />
            <p className="mt-3 text-muted-foreground text-sm">
              Carte, cultura, community.
            </p>
          </div>
          <nav aria-label="Piè di pagina" className="flex flex-wrap gap-2">
            <Link
              className={buttonVariants({ size: "lg", variant: "outline" })}
              to="/community"
            >
              Community
            </Link>
            <Link
              className={buttonVariants({ size: "lg", variant: "outline" })}
              to="/vendi"
            >
              Vendi le tue carte
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
