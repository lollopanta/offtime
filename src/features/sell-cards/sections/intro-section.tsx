import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

interface IntroSectionProps {
  className?: string;
}

export function IntroSection({ className }: IntroSectionProps) {
  return (
    <section aria-label="Introduzione" className={className}>
      <div className="offtime-container relative z-10 flex min-h-svh flex-col justify-start pt-24 pb-16 sm:justify-center sm:py-0">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Story copy & Primary CTA */}
          <div className="w-full max-w-xl rounded-2xl bg-surface-0/40 p-5 backdrop-blur-md sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
            <div className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-offtime-pink-bright" />
              <p className="offtime-kicker">Sell your cards · OFFTIME</p>
            </div>

            <h1 className="offtime-display mt-3 text-4xl text-inherit leading-[0.92] sm:mt-4 sm:text-6xl lg:text-7xl">
              Le tue carte meritano
              <br />
              una seconda vita.
            </h1>

            <p className="mt-4 text-base text-inherit leading-relaxed opacity-85 sm:mt-6 sm:text-lg sm:opacity-80">
              Porta le tue carte, i tuoi raccoglitori o l'intera collezione da
              OFFTIME. Le esaminiamo insieme e troviamo il modo migliore per
              valorizzarle.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                className={buttonVariants({
                  className:
                    "h-12 px-8 text-base shadow-lg shadow-offtime-blue/20",
                  size: "lg",
                })}
                to="/shop"
              >
                Richiedi una valutazione
              </Link>
              <a
                className={buttonVariants({
                  className: "h-12 px-6 text-base",
                  size: "lg",
                  variant: "outline",
                })}
                href="#charizard"
              >
                Esplora la storia
              </a>
            </div>
          </div>

          {/* Right Column: Prominent Floating OFFTIME Brand Image */}
          <div className="relative hidden items-center justify-center lg:flex">
            {/* Ambient atmospheric brand glow */}
            <div className="absolute h-96 w-96 rounded-full bg-gradient-to-tr from-offtime-blue/25 via-offtime-pink/20 to-offtime-violet/25 blur-3xl lg:h-[30rem] lg:w-[30rem]" />

            {/* Large Floating Logo Image */}
            <img
              alt="OFFTIME"
              className="offtime-float relative h-40 w-auto object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:scale-105 sm:h-48 lg:h-56 xl:h-64"
              height="256"
              src="/logo.webp"
              width="512"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
