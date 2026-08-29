import type { ChapterHighlight } from "../sell-cards-data";

interface ChapterSectionProps {
  className?: string;
  eyebrow: string;
  highlights?: ChapterHighlight[];
  id?: string;
  layout?: "text-right" | "text-left";
  subtitle?: string;
  title: string;
}

export function ChapterSection({
  eyebrow,
  title,
  subtitle,
  highlights = [],
  layout = "text-left",
  className,
  id,
}: ChapterSectionProps) {
  const isRight = layout === "text-right";
  const alignClass = isRight
    ? "lg:ml-auto lg:mr-4 xl:mr-12"
    : "lg:mr-auto lg:ml-4 xl:ml-12";

  return (
    <section aria-label={eyebrow} className={className} id={id}>
      <div className="offtime-container relative z-10 flex min-h-svh flex-col justify-start pt-24 pb-16 sm:justify-center sm:py-0">
        <div
          className={`w-full max-w-lg rounded-2xl bg-surface-0/40 p-5 backdrop-blur-md sm:bg-transparent sm:p-0 sm:backdrop-blur-none xl:max-w-xl ${alignClass}`}
        >
          {/* Eyebrow kicker */}
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-offtime-pink-bright" />
            <p className="offtime-kicker">{eyebrow}</p>
          </div>

          {/* Main Display Title */}
          <h2 className="offtime-display mt-3 text-3xl text-inherit leading-[0.92] sm:mt-4 sm:text-5xl lg:text-6xl">
            {title.split("\n").map((line, i) => (
              <span key={line}>
                {i > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h2>

          {/* Narrative Paragraph */}
          {subtitle ? (
            <p className="mt-4 text-base text-inherit leading-relaxed opacity-85 sm:mt-6 sm:text-lg sm:opacity-80">
              {subtitle}
            </p>
          ) : null}

          {/* Story & Value Highlights */}
          {highlights.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((h) => (
                <div
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-xs transition-colors hover:border-white/20"
                  key={h.label}
                >
                  <p className="font-semibold text-inherit text-sm">
                    {h.label}
                  </p>
                  <p className="mt-1 text-inherit text-xs leading-relaxed opacity-75">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
