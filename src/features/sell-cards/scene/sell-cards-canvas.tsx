import { Environment } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { ACESFilmicToneMapping, Color, MathUtils } from "three";
import { type Chapter, chapters, SCROLL_SECTIONS } from "../sell-cards-data";
import { CollectibleSlab } from "./collectible-slab";

interface SellCardsCanvasProps {
  onCreated?: () => void;
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

  if (progress < charizard[0]) {
    return {
      activeIndex: 0,
      chapterProgress: progress / charizard[0],
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

  // Smooth CTA transition: card moves across to the right side
  const ctaProgress = Math.min(1, Math.max(0, (progress - cta[0]) / 0.05));
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
    return activeIndex === 1 ? 0.36 : -0.36;
  }
  // Desktop: Extreme lateral separation right on screen perimeter
  // Left: -0.74 (Charizard, Luffy) | Right: +0.74 (Gengar)
  return activeIndex === 1 ? 0.74 : -0.74;
}

function getCtaTransforms(
  chapterBaseX: number,
  transitionProgress: number,
  profile: ViewportProfile,
  baseScale: number
) {
  let targetX = 0.74;
  if (profile === "mobile") {
    targetX = 0;
  } else if (profile === "tablet") {
    targetX = 0.36;
  }

  // Glide cleanly across to the right side
  const x =
    profile === "mobile"
      ? 0
      : MathUtils.lerp(chapterBaseX, targetX, transitionProgress);
  const y = profile === "mobile" ? -0.22 : -0.02;
  const rotY = MathUtils.lerp(0.04, -0.06, transitionProgress);

  return {
    position: [x, y, 0] as [number, number, number],
    rotationX: 0.04,
    rotationY: rotY,
    rotationZ: -0.02,
    scale: baseScale,
  };
}

function getBaseScale(profile: ViewportProfile): number {
  if (profile === "mobile") {
    return 0.0068;
  }
  if (profile === "tablet") {
    return 0.009;
  }
  return 0.0102;
}

function computeSlabTransforms(
  activeIndex: number,
  chapterProgress: number,
  transitionProgress: number,
  isTransitioning: boolean,
  isCtaPhase: boolean,
  profile: ViewportProfile
) {
  const isMobile = profile === "mobile";
  const chapterBaseX = getChapterBaseX(activeIndex, profile);
  const baseY = isMobile ? -0.22 : -0.02;
  const baseScale = getBaseScale(profile);

  if (isCtaPhase) {
    return getCtaTransforms(
      chapterBaseX,
      transitionProgress,
      profile,
      baseScale
    );
  }

  if (isTransitioning) {
    const currentX = MathUtils.lerp(chapterBaseX, 0, transitionProgress);
    const baseAngle = activeIndex === 1 ? -0.04 : 0.04;
    const rotY = baseAngle + transitionProgress * 0.22;
    const y = baseY + Math.sin(transitionProgress * Math.PI) * 0.04;
    return {
      position: [currentX, y, 0] as [number, number, number],
      rotationX: 0.04,
      rotationY: rotY,
      rotationZ: activeIndex === 1 ? 0.02 : -0.02,
      scale: baseScale,
    };
  }

  // Chapter 0: Charizard (Far Left, slight turn towards text on the right)
  if (activeIndex === 0) {
    const rotY = 0.05 + (chapterProgress - 0.5) * 0.03;
    return {
      position: [chapterBaseX, baseY, 0] as [number, number, number],
      rotationX: 0.04,
      rotationY: rotY,
      rotationZ: -0.02,
      scale: baseScale,
    };
  }

  // Chapter 1: Gengar (Far Right, slight turn towards text on the left)
  if (activeIndex === 1) {
    const rotY = -0.06 - (chapterProgress - 0.5) * 0.03;
    return {
      position: [chapterBaseX, baseY, 0] as [number, number, number],
      rotationX: 0.03,
      rotationY: rotY,
      rotationZ: 0.02,
      scale: baseScale,
    };
  }

  // Chapter 2: Luffy Gear 5 (Far Left, dynamic buoyant tilt)
  const rotY = 0.04 + (chapterProgress - 0.5) * 0.04;
  return {
    position: [chapterBaseX, baseY, 0] as [number, number, number],
    rotationX: 0.05,
    rotationY: rotY,
    rotationZ: -0.02,
    scale: baseScale,
  };
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
  const envColor = isTransitioning
    ? lerpColor(
        currentChapter.env.accent,
        nextChapter.env.accent,
        transitionProgress
      )
    : currentChapter.env.accent;

  const ambientIntensity = isTransitioning
    ? MathUtils.lerp(
        currentChapter.env.ambientIntensity,
        nextChapter.env.ambientIntensity,
        transitionProgress
      )
    : currentChapter.env.ambientIntensity;

  const rimColor = isTransitioning
    ? lerpColor(
        currentChapter.env.rimLight,
        nextChapter.env.rimLight,
        transitionProgress
      )
    : currentChapter.env.rimLight;

  return { ambientIntensity, envColor, rimColor };
}

function computeReducedMotionTransforms(
  activeIndex: number,
  isCtaPhase: boolean,
  profile: ViewportProfile
) {
  const isMobile = profile === "mobile";
  let baseX = getChapterBaseX(activeIndex, profile);
  if (isCtaPhase) {
    baseX = isMobile ? 0 : 0.74;
  }
  const baseY = isMobile ? -0.22 : -0.02;
  const scale = isMobile ? 0.0068 : 0.0102;

  return {
    position: [baseX, baseY, 0] as [number, number, number],
    rotationX: 0.04,
    rotationY: activeIndex === 1 || isCtaPhase ? -0.04 : 0.04,
    rotationZ: -0.02,
    scale,
  };
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

  const currentTransforms = useMemo(() => {
    if (reducedMotion) {
      return computeReducedMotionTransforms(activeIndex, isCtaPhase, profile);
    }
    return computeSlabTransforms(
      activeIndex,
      chapterProgress,
      transitionProgress,
      isTransitioning,
      isCtaPhase,
      profile
    );
  }, [
    activeIndex,
    chapterProgress,
    transitionProgress,
    isTransitioning,
    isCtaPhase,
    profile,
    reducedMotion,
  ]);

  // Incoming slab transforms during rotation swap
  const nextTransforms = useMemo(() => {
    if (!isTransitioning) {
      return currentTransforms;
    }
    const nextTargetX = getChapterBaseX(nextIndex, profile);
    const progressFactor = Math.max(0, (transitionProgress - 0.45) / 0.55);
    const incomingX = MathUtils.lerp(0, nextTargetX, progressFactor);
    const incomingRotY = -0.22 + (transitionProgress - 0.5) * 0.44;
    return {
      position: [incomingX, currentTransforms.position[1], 0] as [
        number,
        number,
        number,
      ],
      rotationX: currentTransforms.rotationX,
      rotationY: incomingRotY,
      rotationZ: currentTransforms.rotationZ,
      scale: currentTransforms.scale,
    };
  }, [
    isTransitioning,
    transitionProgress,
    currentTransforms,
    nextIndex,
    profile,
  ]);

  // Dynamic Opacity calculation:
  // Charizard fades in synchronously as the background begins shifting to red (0.03 -> 0.13)
  const introFadeIn =
    progress < 0.03 ? 0 : Math.min(1, (progress - 0.03) / 0.1);

  let baseCurrentOpacity = isTransitioning
    ? Math.max(0, 1 - transitionProgress * 2)
    : 1;
  if (activeIndex === 0) {
    baseCurrentOpacity *= introFadeIn;
  }

  const showCurrent = baseCurrentOpacity > 0.005;
  const nextOpacity = isTransitioning
    ? Math.min(1, Math.max(0, (transitionProgress - 0.45) * (1 / 0.55)))
    : 0;
  const showNext = isTransitioning && nextOpacity > 0.005;

  return (
    <>
      <ambientLight color={envColor} intensity={ambientIntensity * 1.5} />

      <directionalLight
        castShadow
        color="#ffffff"
        intensity={1.4}
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
        intensity={0.8}
        position={[1, -3, 2]}
      />

      <Suspense fallback={null}>
        {showCurrent ? (
          <CollectibleSlab
            disableFloat={reducedMotion}
            opacity={baseCurrentOpacity}
            position={currentTransforms.position}
            rotationX={currentTransforms.rotationX}
            rotationY={currentTransforms.rotationY}
            rotationZ={currentTransforms.rotationZ}
            scale={currentTransforms.scale}
            textures={currentChapter.textures}
            url={currentChapter.model}
            visible={showCurrent}
          />
        ) : null}

        {showNext ? (
          <CollectibleSlab
            disableFloat={reducedMotion}
            opacity={nextOpacity}
            position={nextTransforms.position}
            rotationX={nextTransforms.rotationX}
            rotationY={nextTransforms.rotationY}
            rotationZ={nextTransforms.rotationZ}
            scale={nextTransforms.scale}
            textures={nextChapter.textures}
            url={nextChapter.model}
          />
        ) : null}

        <Environment environmentIntensity={0.18} preset="city" />
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
