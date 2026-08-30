interface StoryBridgeProps {
  className?: string;
  quote: string;
}

export function StoryBridge({
  quote,
  className = "relative min-h-[85svh]",
}: StoryBridgeProps) {
  return (
    <section
      aria-label="Transizione"
      className={`offtime-container relative z-10 flex flex-col items-center justify-start pt-24 pb-12 sm:pt-28 md:pt-32 ${className}`}
    >
      <blockquote className="offtime-display max-w-xl text-center text-xl leading-snug opacity-75 sm:max-w-2xl sm:text-2xl lg:text-3xl">
        &ldquo;{quote}&rdquo;
      </blockquote>
    </section>
  );
}
