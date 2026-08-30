interface ChapterSectionProps {
  className?: string;
  eyebrow: string;
  id?: string;
  layout?: "text-right" | "text-left";
  subtitle?: string;
  title: string;
}

export function ChapterSection({
  eyebrow,
  title,
  subtitle,
  layout = "text-left",
  className,
  id,
}: ChapterSectionProps) {
  const isRight = layout === "text-right";
  const alignClass = isRight
    ? "md:ml-auto md:mr-2 lg:mr-4 xl:mr-12"
    : "md:mr-auto md:ml-2 lg:ml-4 xl:ml-12";

  return (
    <section aria-label={eyebrow} className={className} id={id}>
      <div className="offtime-container relative z-10 flex min-h-svh flex-col justify-center py-16">
        <div
          className={`w-full max-w-[340px] sm:max-w-[380px] lg:max-w-xl ${alignClass}`}
        >
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-offtime-pink-bright" />
            <p className="offtime-kicker">{eyebrow}</p>
          </div>

          <h2 className="offtime-display mt-3 text-3xl leading-[0.92] sm:text-4xl lg:text-6xl xl:text-7xl">
            {title.split("\n").map((line, i) => (
              <span key={line}>
                {i > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h2>

          {subtitle ? (
            <p className="mt-5 max-w-md text-base leading-relaxed opacity-75 sm:mt-6 sm:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
