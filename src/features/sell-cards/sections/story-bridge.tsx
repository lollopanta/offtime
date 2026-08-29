interface StoryBridgeProps {
  align?: "center" | "left" | "right";
  className?: string;
  kicker: string;
  quote: string;
}

export function StoryBridge({
  kicker,
  quote,
  className = "relative min-h-[70svh]",
  align = "center",
}: StoryBridgeProps) {
  let alignClasses = "items-center text-center mx-auto";
  if (align === "left") {
    alignClasses = "items-start text-left lg:mr-auto lg:ml-0";
  } else if (align === "right") {
    alignClasses = "items-start text-left lg:ml-auto lg:mr-0";
  }

  return (
    <section
      aria-label={kicker}
      className={`offtime-container relative z-10 flex flex-col justify-center py-16 ${className}`}
    >
      <div
        className={`flex max-w-xl flex-col rounded-2xl bg-surface-0/30 p-6 backdrop-blur-xs sm:bg-transparent sm:p-0 ${alignClasses}`}
      >
        <span className="font-mono font-semibold text-offtime-pink-bright/90 text-xs uppercase tracking-widest">
          {kicker}
        </span>
        <blockquote className="offtime-display mt-3 text-inherit text-xl leading-snug opacity-90 sm:text-2xl lg:text-3xl">
          “{quote}”
        </blockquote>
        <div className="mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-offtime-pink to-offtime-blue opacity-50" />
      </div>
    </section>
  );
}
