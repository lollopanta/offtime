import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <main className="offtime-container py-20 sm:py-28" id="content">
      <p className="offtime-kicker">404</p>
      <h1 className="offtime-display mt-3 max-w-3xl text-5xl text-foreground leading-[0.92] sm:text-7xl">
        Questa carta non è nel raccoglitore.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground leading-8">
        Il link potrebbe essere cambiato, oppure questo contenuto non è più
        disponibile.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className={buttonVariants({ size: "lg" })} to="/">
          <ArrowLeftIcon aria-hidden="true" data-icon="inline-start" /> Home
        </Link>
        <Link
          className={buttonVariants({ size: "lg", variant: "outline" })}
          to="/shop"
        >
          Vai allo shop
        </Link>
      </div>
    </main>
  );
}
