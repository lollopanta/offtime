import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import type { CommunityReel } from "@/features/community/community-content";
import { cn } from "@/lib/utils";

interface CommunityReelViewerProps {
  instagramUrl: string;
  reels: readonly CommunityReel[];
}

export function CommunityReelViewer({
  instagramUrl,
  reels,
}: CommunityReelViewerProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isInView, setIsInView] = React.useState(false);
  const [isSwitching, setIsSwitching] = React.useState(false);
  const [transitionDirection, setTransitionDirection] = React.useState(1);
  const [viewer, setViewer] = React.useState<HTMLDivElement | null>(null);
  const hasReels = reels.length > 0;
  const activeReel = reels[activeIndex];

  React.useEffect(() => {
    if (!viewer) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "280px 0px" }
    );
    observer.observe(viewer);
    return () => observer.disconnect();
  }, [viewer]);

  const changeReel = (direction: -1 | 1) => {
    if (isSwitching || reels.length < 2) {
      return;
    }

    setIsSwitching(true);
    setTransitionDirection(direction);
    window.setTimeout(() => {
      setActiveIndex(
        (index) => (index + direction + reels.length) % reels.length
      );
      setIsSwitching(false);
    }, 140);
  };

  return (
    <section
      aria-labelledby="reels-title"
      className="offtime-container py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="offtime-kicker">Dal feed al tavolo</p>
        <h2
          className="offtime-display mt-4 scroll-mt-28 text-5xl text-foreground leading-[0.9] sm:text-7xl"
          id="reels-title"
        >
          Opening, tornei e momenti OFFTIME.
        </h2>
      </div>

      <div className="mx-auto mt-12 max-w-[29rem] sm:mt-16" ref={setViewer}>
        <div
          className={cn(
            "relative aspect-[9/16] overflow-hidden rounded-[1.125rem] border border-border bg-surface-1 shadow-[0_24px_70px_rgb(0_0_0_/_0.35)] transition-[opacity,transform] duration-150 motion-reduce:transition-none",
            isSwitching &&
              (transitionDirection > 0
                ? "translate-x-1 opacity-0"
                : "-translate-x-1 opacity-0")
          )}
        >
          {hasReels && activeReel && isInView ? (
            <iframe
              className="size-full bg-surface-2"
              key={activeReel.id}
              loading="lazy"
              src={activeReel.embedUrl}
              title={`Reel Instagram OFFTIME ${activeIndex + 1} di ${reels.length}: ${activeReel.label}`}
            />
          ) : (
            <div className="flex size-full flex-col justify-end bg-[radial-gradient(circle_at_50%_16%,rgb(113_133_255_/_0.32),transparent_34%),linear-gradient(155deg,rgb(24_27_36),rgb(8_9_13)_72%)] p-7 text-left sm:p-9">
              <p className="offtime-kicker">OFFTIME su Instagram</p>
              <p className="offtime-display mt-3 text-3xl text-foreground leading-[0.92]">
                Il prossimo momento dal tavolo arriva qui.
              </p>
              <a
                className={cn(
                  buttonVariants({ size: "lg", variant: "secondary" }),
                  "mt-6 w-fit"
                )}
                href={instagramUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Apri Instagram
                <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
              </a>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <Button
            aria-label="Reel precedente"
            className="size-11 rounded-full border-border bg-surface-1 text-foreground shadow-none hover:bg-surface-3 sm:size-12"
            disabled={reels.length < 2 || isSwitching}
            onClick={() => changeReel(-1)}
            size="icon-lg"
            variant="outline"
          >
            <ArrowLeftIcon aria-hidden="true" />
          </Button>

          <div className="flex items-center justify-center gap-3 font-mono text-muted-foreground text-xs tabular-nums tracking-[0.18em]">
            <span>
              {hasReels
                ? `${String(activeIndex + 1).padStart(2, "0")} / ${String(reels.length).padStart(2, "0")}`
                : "REEL IN ARRIVO"}
            </span>
            {hasReels ? (
              <div aria-hidden="true" className="flex gap-1.5">
                {reels.map((reel, index) => (
                  <span
                    className={cn(
                      "size-1.5 rounded-full bg-muted-foreground/35 transition-colors",
                      index === activeIndex && "bg-offtime-pink-bright"
                    )}
                    key={reel.id}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <Button
            aria-label="Reel successivo"
            className="size-11 rounded-full border-border bg-surface-1 text-foreground shadow-none hover:bg-surface-3 sm:size-12"
            disabled={reels.length < 2 || isSwitching}
            onClick={() => changeReel(1)}
            size="icon-lg"
            variant="outline"
          >
            <ArrowRightIcon aria-hidden="true" />
          </Button>
        </div>
      </div>

      <a
        className="mx-auto mt-8 flex min-h-11 w-fit items-center gap-2 text-muted-foreground text-sm underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:text-foreground focus-visible:underline"
        href={activeReel?.url ?? instagramUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        Segui OFFTIME su Instagram
        <ArrowRightIcon aria-hidden="true" className="size-4" />
      </a>
    </section>
  );
}
