import { useCallback, useMemo, useRef, useState } from "react";
import { Color } from "three";
import { useSellScroll } from "./motion/use-sell-scroll";
import { SellCardsCanvas } from "./scene/sell-cards-canvas";
import { ChapterSection } from "./sections/chapter-section";
import { CloudTransition } from "./sections/cloud-transition";
import { EnvironmentalOverlays } from "./sections/environmental-overlays";
import { FinalCtaSection } from "./sections/final-cta-section";
import { IntroSection } from "./sections/intro-section";
import { StoryBridge } from "./sections/story-bridge";
import { chapters, SCROLL_SECTIONS } from "./sell-cards-data";

/** Interpolate hex colors for CSS backgrounds */
function lerpColorCSS(a: string, b: string, t: number): string {
  const ca = new Color(a);
  const cb = new Color(b);
  ca.lerp(cb, Math.min(1, Math.max(0, t)));
  return `#${ca.getHexString()}`;
}

function computeBgColor(progress: number): string {
  const s = SCROLL_SECTIONS;
  const dark = "#08090d";

  if (progress < s.charizard[0]) {
    return dark;
  }
  if (progress < s.transitionFireShadow[0]) {
    const t = Math.min(
      1,
      (progress - s.charizard[0]) / (s.charizard[1] - s.charizard[0])
    );
    return lerpColorCSS(dark, chapters[0].env.bg, Math.min(t * 2.5, 1));
  }
  if (progress < s.transitionFireShadow[1]) {
    const t =
      (progress - s.transitionFireShadow[0]) /
      (s.transitionFireShadow[1] - s.transitionFireShadow[0]);
    return lerpColorCSS(chapters[0].env.bg, chapters[1].env.bg, t);
  }
  if (progress < s.transitionShadowCloud[0]) {
    return chapters[1].env.bg;
  }
  if (progress < s.transitionShadowCloud[1]) {
    const t =
      (progress - s.transitionShadowCloud[0]) /
      (s.transitionShadowCloud[1] - s.transitionShadowCloud[0]);
    return lerpColorCSS(chapters[1].env.bg, chapters[2].env.bg, t);
  }
  if (progress < s.cta[0]) {
    return chapters[2].env.bg;
  }
  // Smooth return to dark OFFTIME identity
  const t = Math.min(1, (progress - s.cta[0]) / 0.06);
  return lerpColorCSS(chapters[2].env.bg, dark, t);
}

export function SellCardsExperience() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { progress, prefersReducedMotion: reducedMotion } =
    useSellScroll(wrapperRef);
  const [canvasReady, setCanvasReady] = useState(false);
  const [webglFailed] = useState(false);

  const handleCanvasCreated = useCallback(() => {
    setCanvasReady(true);
  }, []);

  const bgColor = useMemo(() => computeBgColor(progress), [progress]);

  // Check WebGL support once
  const hasWebGL = useMemo(() => {
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      return false;
    }
  }, []);

  return (
    <div
      className="relative text-foreground"
      ref={wrapperRef}
      style={{
        background: bgColor,
        transition: "background-color 0.4s ease",
      }}
    >
      {/* Loading overlay */}
      {!canvasReady && hasWebGL && !webglFailed ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-0">
          <div className="flex flex-col items-center gap-4">
            <img
              alt="OFFTIME"
              className="h-10 w-auto opacity-60"
              height="40"
              src="/logo.webp"
              width="106"
            />
            <div className="h-0.5 w-24 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full w-1/3 animate-pulse rounded-full bg-offtime-pink" />
            </div>
          </div>
        </div>
      ) : null}

      {/* 3D Canvas — persistent, fixed position */}
      {hasWebGL && !webglFailed ? (
        <SellCardsCanvas
          onCreated={handleCanvasCreated}
          progress={progress}
          reducedMotion={reducedMotion}
        />
      ) : null}

      {/* 2D Environmental Overlays (Fire Embers, Gengar Shadow Aura, Gear 5 Mist) */}
      <EnvironmentalOverlays progress={progress} />

      {/* Authored Cloud Transition Video Overlay (Gengar -> Luffy) */}
      <CloudTransition progress={progress} reducedMotion={reducedMotion} />
      {/* HTML Story — scrolls naturally over the fixed canvas */}
      <div>
        {/* Intro — OFFTIME Branded Entrance */}
        <IntroSection className="relative min-h-[120svh]" />

        {/* Chapter 1: Charizard (Card on Left, Text on Right) */}
        <ChapterSection
          className="relative min-h-[150svh]"
          eyebrow={chapters[0].eyebrow}
          id="charizard"
          layout={chapters[0].layout}
          subtitle={chapters[0].subtitle}
          title={chapters[0].title}
        />

        {/* Transition Bridge 1: Fire -> Shadow */}
        <StoryBridge
          className="relative min-h-[85svh]"
          quote="Dai grandi classici vintage ai tesori nascosti nei raccoglitori di una vita intera."
        />

        {/* Chapter 2: Gengar (Card on Right, Text on Left) */}
        <ChapterSection
          className="relative min-h-[150svh]"
          eyebrow={chapters[1].eyebrow}
          id="gengar"
          layout={chapters[1].layout}
          subtitle={chapters[1].subtitle}
          title={chapters[1].title}
        />

        {/* Transition Bridge 2: Shadow -> Cloud */}
        <StoryBridge
          className="relative min-h-[85svh]"
          quote="Vendere una carta è dare nuova linfa alla passione."
        />

        {/* Chapter 3: Luffy Gear 5 (Card on Left, Text on Right) */}
        <ChapterSection
          className="relative min-h-[150svh]"
          eyebrow={chapters[2].eyebrow}
          id="luffy"
          layout={chapters[2].layout}
          subtitle={chapters[2].subtitle}
          title={chapters[2].title}
        />

        {/* Final Conversion CTA */}
        <FinalCtaSection className="relative min-h-[120svh]" />
      </div>
    </div>
  );
}
