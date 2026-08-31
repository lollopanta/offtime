import {
  faInstagram,
  faTiktok,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <div className="offtime-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="min-w-0">
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
            <div className="mt-6 text-muted-foreground text-sm leading-6">
              <p className="font-medium text-foreground">OFF TIME SRL</p>
              <address className="not-italic">
                Via Appia Nuova, 673/675 - Roma (RM)
              </address>
              <p>Partita IVA 18084231002</p>
            </div>
          </div>
          <nav aria-label="Esplora" className="min-w-0">
            <h2 className="font-medium text-sm">Esplora</h2>
            <div className="mt-3 flex flex-col items-start gap-1">
              <Link
                className="inline-flex min-h-11 items-center text-muted-foreground text-sm underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:text-foreground focus-visible:underline"
                to="/community"
              >
                Community
              </Link>
              <Link
                className="inline-flex min-h-11 items-center text-muted-foreground text-sm underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:text-foreground focus-visible:underline"
                to="/vendi"
              >
                Vendi le tue carte
              </Link>
            </div>
          </nav>
          <nav aria-label="Seguici" className="min-w-0">
            <h2 className="font-medium text-sm">Seguici</h2>
            <div className="mt-3 flex flex-col items-start gap-1">
              <a
                className="inline-flex min-h-11 items-center gap-2 text-muted-foreground text-sm underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:text-foreground focus-visible:underline"
                href="https://chat.whatsapp.com/LlQDZdEqqKo1I33Mm6mUuL"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon
                  aria-hidden="true"
                  className="size-4"
                  icon={faWhatsapp}
                />
                Community WhatsApp
              </a>
              <a
                className="inline-flex min-h-11 items-center gap-2 text-muted-foreground text-sm underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:text-foreground focus-visible:underline"
                href="https://www.instagram.com/offtime.store"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon
                  aria-hidden="true"
                  className="size-4"
                  icon={faInstagram}
                />
                Instagram
              </a>
              <a
                className="inline-flex min-h-11 items-center gap-2 text-muted-foreground text-sm underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:text-foreground focus-visible:underline"
                href="https://www.tiktok.com/@offtimestore?_r=1&_t=zn-925xiq9fy6i"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon
                  aria-hidden="true"
                  className="size-4"
                  icon={faTiktok}
                />
                TikTok
              </a>
            </div>
          </nav>
        </div>
      </footer>
    </div>
  );
}
