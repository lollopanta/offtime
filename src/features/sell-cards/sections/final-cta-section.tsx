import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

export function FinalCtaSection({ className }: { className?: string }) {
  const steps = [
    {
      desc: "Singole, binder o box interi.",
      label: "Porta le carte",
      num: "01",
    },
    {
      desc: "Valutazione aperta e trasparente.",
      label: "Le guardiamo insieme",
      num: "02",
    },
    {
      desc: "Decidi liberamente cosa fare.",
      label: "Scegli il prossimo passo",
      num: "03",
    },
  ];

  return (
    <section aria-label="Come funziona" className={className} id="cta">
      <div className="offtime-container relative z-10 flex min-h-svh flex-col justify-start pt-28 pb-16 sm:justify-center sm:py-0">
        <div className="w-full max-w-xl rounded-2xl bg-surface-0/40 p-6 backdrop-blur-md sm:bg-transparent sm:p-0 sm:backdrop-blur-none lg:mr-auto lg:ml-0 xl:max-w-2xl">
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-offtime-pink-bright" />
            <p className="offtime-kicker">OFFTIME · Valutazione</p>
          </div>

          <h2 className="offtime-display mt-3 text-4xl text-inherit leading-[0.92] sm:mt-4 sm:text-6xl lg:text-7xl">
            Portala da OFFTIME.
          </h2>

          <p className="mt-4 max-w-xl text-base text-inherit leading-relaxed opacity-85 sm:mt-6 sm:text-lg sm:opacity-80">
            Nessun impegno, nessuna procedura complicata. Vieni a trovarci in
            negozio: ci sediamo al tavolo insieme e analizziamo la tua
            collezione con la cura che merita.
          </p>

          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {steps.map((step) => (
              <li
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xs"
                key={step.num}
              >
                <span className="font-bold font-mono text-2xl text-offtime-pink-bright tabular-nums">
                  {step.num}
                </span>
                <p className="mt-2 font-semibold text-base text-inherit">
                  {step.label}
                </p>
                <p className="mt-1 text-inherit text-xs leading-relaxed opacity-75 sm:text-sm">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              className={buttonVariants({
                className: "h-12 px-8 text-base",
                size: "lg",
              })}
              to="/shop"
            >
              Richiedi una valutazione
            </Link>
            <Link
              className={buttonVariants({
                className: "h-12 px-6 text-base",
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
