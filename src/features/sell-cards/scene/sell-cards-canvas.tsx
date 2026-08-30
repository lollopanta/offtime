import { Environment } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { ACESFilmicToneMapping, Color, MathUtils } from "three";
import type { Chapter } from "../sell-cards-data";
import { chapters, SCROLL_SECTIONS } from "../sell-cards-data";
import { CollectibleSlab } from "./collectible-slab";

interface SellCardsCanvasProps {
  onCreated: () => void;
  progress: number;
  reducedMotion: boolean;
}

type ViewportProfile = "desktop" | "tablet" | "mobile";

function computeSceneState(progress: number) {
  const {
    charizard,
    transitionFireShadow,
    gengar,
    transitionShadowCloud,
    luffy,
    cta,
  } = SCROLL_SECTIONS;

  // Intro — Charizard is invisible initially, fades in when entering Chapter 1
  if (progress < charizard[0]) {
    return {
      activeIndex: 0,
      chapterProgress: 0,
      transitionProgress: 0,
    };
  }
  if (progress < charizard[1]) {
    return {
      activeIndex: 0,
      chapterProgress:
        (progress - charizard[0]) / (charizard[1] - charizard[0]),
      transitionProgress: 0,
    };
  }
  // Fire → Shadow transition (Charizard -> Gengar)
  if (progress < gengar[0]) {
    return {
      activeIndex: 0,
      chapterProgress: 1,
      transitionProgress:
        (progress - transitionFireShadow[0]) /
        (transitionFireShadow[1] - transitionFireShadow[0]),
    };
  }
  if (progress < gengar[1]) {
    return {
      activeIndex: 1,
      chapterProgress: (progress - gengar[0]) / (gengar[1] - gengar[0]),
      transitionProgress: 0,
    };
  }
  // Shadow → Cloud transition (Gengar -> Luffy)
  if (progress < luffy[0]) {
    return {
      activeIndex: 1,
      chapterProgress: 1,
      transitionProgress:
        (progress - transitionShadowCloud[0]) /
        (transitionShadowCloud[1] - transitionShadowCloud[0]),
    };
  }
  if (progress < cta[0]) {
    return {
      activeIndex: 2,
      chapterProgress: (progress - luffy[0]) / (luffy[1] - luffy[0]),
      transitionProgress: 0,
    };
  }

  // CTA phase
  const ctaProgress = Math.min(1, (progress - cta[0]) / 0.06);
  return {
    activeIndex: 2,
    chapterProgress: 1,
    transitionProgress: ctaProgress,
  };
}

function getChapterBaseX(
  activeIndex: number,
  profile: ViewportProfile
): number {
  if (profile === "mobile") {
    return 0;
  }
  if (profile === "tablet") {
    return activeIndex === 1 ? 0.48 : -0.52;
  }
  if (activeIndex === 0) {
    return -0.62;
  }
  if (activeIndex === 1) {
    return 0.62;
  }
  return -0.58;
}

function getBaseScale(profile: ViewportProfile): number {
  if (profile === "mobile") {
    return 0.0058;
  }
  if (profile === "tablet") {
    return 0.0078;
  }
  return 0.0102;
}

function getBaseY(profile: ViewportProfile): number {
  if (profile === "mobile") {
    return -0.22;
  }
  if (profile === "tablet") {
    return -0.04;
  }
  return -0.02;
}

function getTransitionBaseY(profile: ViewportProfile): number {
  if (profile === "mobile") {
    return -0.24;
  }
  if (profile === "tablet") {
    return -0.16;
  }
  return -0.14;
}

function computeIntroTransforms(
  introProgress: number,
  profile: ViewportProfile,
  baseScale: number
) {
  const isMobile = profile === "mobile";
  const targetX = getChapterBaseX(0, profile);
  const introEase = introProgress * introProgress;
  const x = isMobile ? 0 : MathUtils.lerp(0, targetX, introEase);
  const targetY = isMobile ? -0.22 : getBaseY(profile);
  const startY = isMobile ? -0.1 : -0.08;
  const y = MathUtils.lerp(startY, targetY, introEase);
  const rotY = MathUtils.lerp(0.2, 0.06, introEase);
  return {
    position: [x, y, 0] as [number, number, number],
    rotationX: 0.04,
    rotationY: rotY,
    rotationZ: -0.015,
    scale: baseScale,
  };
}

function getTransitionX(
  startX: number,
  endX: number,
  transitionProgress: number,
  isMobile: boolean,
  activeIndex: number
): number {
  if (isMobile) {
    return 0;
  }
  const swapPoint = activeIndex === 1 ? 0.38 : 0.5;
  if (transitionProgress < swapPoint) {
    return MathUtils.lerp(startX, 0, transitionProgress / swapPoint);
  }
  return MathUtils.lerp(
    0,
    endX,
    (transitionProgress - swapPoint) / (1 - swapPoint)
  );
}

function computeTransitionTransforms(
  activeIndex: number,
  transitionProgress: number,
  profile: ViewportProfile,
  baseScale: number
) {
  const startX = getChapterBaseX(activeIndex, profile);
  const nextIndex = activeIndex + 1;
  const endX = getChapterBaseX(nextIndex, profile);
  const isMobile = profile === "mobile";

  // Seamless path: moves through center during transition
  const x = getTransitionX(
    startX,
    endX,
    transitionProgress,
    isMobile,
    activeIndex
  );

  const baseY = getTransitionBaseY(profile);
  const y = baseY + Math.sin(transitionProgress * Math.PI) * 0.025;

  let rotY = 0;
  if (activeIndex === 0) {
    rotY =
      transitionProgress < 0.5
        ? MathUtils.lerp(0.06, Math.PI / 2, transitionProgress * 2)
        : MathUtils.lerp(-Math.PI / 2, -0.06, (transitionProgress - 0.5) * 2);
  } else {
    const swapPoint = 0.38;
    rotY =
      transitionProgress < swapPoint
        ? MathUtils.lerp(-0.06, -0.22, transitionProgress / swapPoint)
        : MathUtils.lerp(
            0.22,
            0.04,
            (transitionProgress - swapPoint) / (1 - swapPoint)
          );
  }
  return {
    position: [x, y, 0] as [number, number, number],
    rotationX: 0.04,
    rotationY: rotY,
    rotationZ: activeIndex === 1 ? 0.015 : -0.015,
    scale: baseScale,
  };
}

function computeChapterHold(
  activeIndex: number,
  chapterProgress: number,
  profile: ViewportProfile,
  baseScale: number
) {
  const chapterBaseX = getChapterBaseX(activeIndex, profile);
  const baseY = getBaseY(profile);

  if (activeIndex === 0) {
    const rotY = 0.06 + (chapterProgress - 0.5) * 0.04;
    return {
      position: [chapterBaseX, baseY, 0] as [number, number, number],
      rotationX: 0.04,
      rotationY: rotY,
      rotationZ: -0.015,
      scale: baseScale,
    };
  }

  if (activeIndex === 1) {
    const rotY = -0.06 - (chapterProgress - 0.5) * 0.04;
    return {
      position: [chapterBaseX, baseY, 0] as [number, number, number],
      rotationX: 0.03,
      rotationY: rotY,
      rotationZ: 0.015,
      scale: baseScale,
    };
  }

  // Luffy Gear 5
  const rotY = 0.04 + (chapterProgress - 0.5) * 0.03;
  return {
    position: [chapterBaseX, baseY + 0.01, 0] as [number, number, number],
    rotationX: 0.03,
    rotationY: rotY,
    rotationZ: -0.01,
    scale: baseScale,
  };
}

function computeSlabTransforms(
  activeIndex: number,
  chapterProgress: number,
  transitionProgress: number,
  isTransitioning: boolean,
  isCtaPhase: boolean,
  introProgress: number,
  profile: ViewportProfile
) {
  const isMobile = profile === "mobile";
  const isTablet = profile === "tablet";
  const baseScale = getBaseScale(profile);

  if (isCtaPhase) {
    let targetX = 0.62;
    if (isMobile) {
      targetX = 0.15;
    } else if (isTablet) {
      targetX = 0.44;
    }
    const chapterBaseX = getChapterBaseX(2, profile);
    const x = isMobile
      ? MathUtils.lerp(0, targetX, transitionProgress)
      : MathUtils.lerp(chapterBaseX, targetX, transitionProgress);
    const y = isMobile ? -0.34 : getBaseY(profile);
    return {
      position: [x, y, 0] as [number, number, number],
      rotationX: 0.04,
      rotationY: -0.06 + transitionProgress * 0.02,
      rotationZ: -0.01,
      scale: isMobile ? baseScale * 0.68 : baseScale,
    };
  }

  if (activeIndex === 0 && introProgress < 1 && !isTransitioning) {
    return computeIntroTransforms(introProgress, profile, baseScale);
  }

  if (isTransitioning) {
    return computeTransitionTransforms(
      activeIndex,
      transitionProgress,
      profile,
      baseScale
    );
  }

  return computeChapterHold(activeIndex, chapterProgress, profile, baseScale);
}

function lerpColor(a: string, b: string, t: number): string {
  const ca = new Color(a);
  const cb = new Color(b);
  ca.lerp(cb, t);
  return `#${ca.getHexString()}`;
}

function computeLighting(
  currentChapter: Chapter,
  nextChapter: Chapter,
  isTransitioning: boolean,
  transitionProgress: number
) {
  const t = isTransitioning ? transitionProgress : 0;
  const envColor = lerpColor(
    currentChapter.env.accent,
    nextChapter.env.accent,
    t
  );
  const ambientIntensity = MathUtils.lerp(
    currentChapter.env.ambientIntensity,
    nextChapter.env.ambientIntensity,
    t
  );
  const rimColor = lerpColor(
    currentChapter.env.rimLight,
    nextChapter.env.rimLight,
    t
  );
  return { ambientIntensity, envColor, rimColor };
}

function getReducedMotionX(
  activeIndex: number,
  isCtaPhase: boolean,
  profile: ViewportProfile
): number {
  if (profile === "mobile") {
    return 0;
  }
  if (isCtaPhase) {
    return 0.62;
  }
  return getChapterBaseX(activeIndex, profile);
}

function computeReducedMotionTransforms(
  activeIndex: number,
  isCtaPhase: boolean,
  profile: ViewportProfile
) {
  const baseScale = getBaseScale(profile);
  const baseY = profile === "mobile" ? -0.22 : getBaseY(profile);
  const x = getReducedMotionX(activeIndex, isCtaPhase, profile);
  return {
    position: [x, baseY, 0] as [number, number, number],
    rotationX: 0.04,
    rotationY: activeIndex === 1 ? -0.06 : 0.06,
    rotationZ: 0,
    scale: baseScale,
  };
}

function SceneLights({
  envColor,
  ambientIntensity,
  rimColor,
}: {
  envColor: string;
  ambientIntensity: number;
  rimColor: string;
}) {
  return (
    <>
      <ambientLight color={envColor} intensity={ambientIntensity * 1.5} />
      <directionalLight
        castShadow
        color="#ffffff"
        intensity={1.5}
        position={[3, 4, 5]}
      />
      <pointLight
        color={rimColor}
        distance={15}
        intensity={2.8}
        position={[-3, 2, -3]}
      />
      <pointLight
        color={envColor}
        distance={10}
        intensity={0.9}
        position={[1, -3, 2]}
      />
    </>
  );
}

function SceneContent({
  progress,
  reducedMotion,
}: {
  progress: number;
  reducedMotion: boolean;
}) {
  const size = useThree((state) => state.size);
  let profile: ViewportProfile = "desktop";
  if (size.width < 640) {
    profile = "mobile";
  } else if (size.width < 1024) {
    profile = "tablet";
  }

  const { activeIndex, chapterProgress, transitionProgress } = useMemo(
    () => computeSceneState(progress),
    [progress]
  );

  const isCtaPhase = progress >= SCROLL_SECTIONS.cta[0];
  const isTransitioning =
    !isCtaPhase && transitionProgress > 0 && transitionProgress < 1;
  const nextIndex = Math.min(activeIndex + 1, chapters.length - 1);
  const currentChapter = chapters[activeIndex];
  const nextChapter = chapters[nextIndex];

  // Intro fade in: Charizard is hidden in the initial OFFTIME branded intro (progress < 0.05)
  // and fades in smoothly as the user scrolls into Chapter 1 (0.05 -> 0.14)
  const introFade = progress < 0.05 ? 0 : Math.min(1, (progress - 0.05) / 0.08);
  const introProgress = Math.min(1, progress / SCROLL_SECTIONS.charizard[0]);

  const { envColor, ambientIntensity, rimColor } = useMemo(
    () =>
      computeLighting(
        currentChapter,
        nextChapter,
        isTransitioning,
        transitionProgress
      ),
    [currentChapter, nextChapter, isTransitioning, transitionProgress]
  );

  const transforms = useMemo(() => {
    if (reducedMotion) {
      return computeReducedMotionTransforms(activeIndex, isCtaPhase, profile);
    }
    return computeSlabTransforms(
      activeIndex,
      chapterProgress,
      transitionProgress,
      isTransitioning,
      isCtaPhase,
      introProgress,
      profile
    );
  }, [
    activeIndex,
    chapterProgress,
    transitionProgress,
    isTransitioning,
    isCtaPhase,
    introProgress,
    profile,
    reducedMotion,
  ]);

  const swapThreshold = activeIndex === 1 ? 0.38 : 0.5;
  const displayChapter =
    isTransitioning && transitionProgress >= swapThreshold
      ? nextChapter
      : currentChapter;

  let slabOpacity = 1.0;
  if (activeIndex === 0 && !isTransitioning) {
    slabOpacity = introFade;
  } else if (activeIndex === 1 && isTransitioning) {
    if (transitionProgress < swapThreshold) {
      slabOpacity = Math.max(0, 1 - (transitionProgress - 0.22) / 0.15);
    } else {
      slabOpacity = Math.max(
        0,
        Math.min(1, (transitionProgress - 0.44) / 0.18)
      );
    }
  } else if (profile === "mobile" && isCtaPhase) {
    slabOpacity = 0.45;
  }
  const isVisible = slabOpacity > 0.01;

  return (
    <>
      <SceneLights
        ambientIntensity={ambientIntensity}
        envColor={envColor}
        rimColor={rimColor}
      />

      <Suspense fallback={null}>
        {isVisible ? (
          <CollectibleSlab
            disableFloat={reducedMotion}
            opacity={slabOpacity}
            position={transforms.position}
            rotationX={transforms.rotationX}
            rotationY={transforms.rotationY}
            rotationZ={transforms.rotationZ}
            scale={transforms.scale}
            textures={displayChapter.textures}
            url={displayChapter.model}
            visible={isVisible}
          />
        ) : null}

        <Environment environmentIntensity={0.22} preset="city" />
      </Suspense>
    </>
  );
}

export function SellCardsCanvas({
  progress,
  reducedMotion,
  onCreated,
}: SellCardsCanvasProps) {
  return (
    <Canvas
      camera={{
        fov: 38,
        position: [0, 0, 3.5],
      }}
      className="!fixed !h-svh !w-full inset-0"
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      onCreated={onCreated}
      style={{ pointerEvents: "none" }}
    >
      <SceneContent progress={progress} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
