import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useCallback, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

/** Whether the user prefers reduced motion */
function prefersReducedMotion() {
  return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Mount Lenis + GSAP ScrollTrigger for the sell-cards experience.
 * Returns normalized scroll progress [0..1] and programmatic scroll/lock controls.
 */
export function useSellScroll(
  wrapperRef: React.RefObject<HTMLDivElement | null>
) {
  const [progress, setProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  const lockScroll = useCallback(() => {
    const lenis = lenisRef.current as Lenis | null;
    lenis?.stop();
  }, []);

  const unlockScroll = useCallback(() => {
    const lenis = lenisRef.current as Lenis | null;
    lenis?.start();
  }, []);

  const scrollToProgress = useCallback(
    (targetProgress: number) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        return;
      }
      const maxScroll = wrapper.scrollHeight - window.innerHeight;
      const targetY = maxScroll * targetProgress;
      const lenis = lenisRef.current as Lenis | null;
      if (lenis) {
        lenis.scrollTo(targetY, { force: true, immediate: true });
      }
      window.scrollTo(0, targetY);
      setProgress(targetProgress);
      ScrollTrigger.update();
    },
    [wrapperRef]
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const reduced = prefersReducedMotion();

    // Lenis smooth scroll — skip interpolation for reduced motion
    let lenis: Lenis | undefined;
    let tick: ((time: number) => void) | undefined;
    if (!reduced) {
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      // Sync Lenis → GSAP
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Master ScrollTrigger over the entire wrapper
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        end: "bottom bottom",
        onUpdate: (self) => {
          setProgress(self.progress);
        },
        scrub: true,
        start: "top top",
        trigger: wrapper,
      });
    });

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
      if (lenis) {
        if (tick) {
          gsap.ticker.remove(tick);
        }
        lenis.destroy();
        lenisRef.current = null;
      }
    };
  }, [wrapperRef]);

  return {
    lockScroll,
    prefersReducedMotion: prefersReducedMotion(),
    progress,
    scrollToProgress,
    unlockScroll,
  };
}
