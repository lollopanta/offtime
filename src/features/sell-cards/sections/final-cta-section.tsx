import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

export function FinalCtaSection({ className }: { className?: string }) {
  return (
    <section aria-label="Come funziona" className={className} id="cta">
      <div className="offtime-container relative z-10 flex min-h-svh flex-col justify-center py-16">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-xl xl:max-w-2xl">
          <p className="offtime-kicker opacity-60">OFFTIME · Valutazione</p>

          <h2 className="offtime-display mt-3 text-4xl leading-[0.92] sm:text-5xl lg:text-7xl">
            Portala da OFFTIME.
          </h2>

          <p className="mt-5 max-w-md text-base leading-relaxed opacity-65 sm:mt-6 sm:text-lg">
            Nessun impegno, nessuna procedura complicata. Vieni a trovarci in
            negozio: ci sediamo al tavolo insieme e analizziamo la tua
            collezione con la cura che merita.
          </p>

          {/* Editorial number steps — no cards, just typography */}
          <div className="mt-10 flex flex-col gap-6 sm:mt-12 sm:flex-row sm:gap-10 lg:gap-16">
            <div>
              <span className="font-mono text-2xl text-offtime-pink-bright/70 tabular-nums sm:text-3xl lg:text-4xl">
                01
              </span>
              <p className="mt-1 font-medium text-sm sm:text-base">
                Porta le carte
              </p>
            </div>
            <div>
              <span className="font-mono text-2xl text-offtime-pink-bright/70 tabular-nums sm:text-3xl lg:text-4xl">
                02
              </span>
              <p className="mt-1 font-medium text-sm sm:text-base">
                Le guardiamo insieme
              </p>
            </div>
            <div>
              <span className="font-mono text-2xl text-offtime-pink-bright/70 tabular-nums sm:text-3xl lg:text-4xl">
                03
              </span>
              <p className="mt-1 font-medium text-sm sm:text-base">
                Scegli il prossimo passo
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 sm:mt-12">
            <Link
              className={buttonVariants({
                className:
                  "h-14 px-8 text-base shadow-lg shadow-offtime-blue/25 sm:px-10",
                size: "lg",
              })}
              to="/shop"
            >
              Richiedi una valutazione
            </Link>
            <Link
              className={buttonVariants({
                className: "h-14 px-6 text-base sm:px-8",
                size: "lg",
                variant: "outline",
              })}
              to="/eventi"
            >
              Vieni a trovarci
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
