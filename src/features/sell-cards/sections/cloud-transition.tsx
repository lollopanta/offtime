import { useEffect, useRef, useState } from "react";
import { SCROLL_SECTIONS } from "../sell-cards-data";

interface CloudTransitionProps {
  lockScroll?: () => void;
  onPeakCoverage?: (direction: "forward" | "reverse") => void;
  onTransitionEnd?: () => void;
  progress: number;
  reducedMotion?: boolean;
}

const VS_SOURCE = `
  attribute vec2 aPosition;
  attribute vec2 aTexCoord;
  varying vec2 vTexCoord;
  void main() {
    vTexCoord = aTexCoord;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FS_SOURCE = `
  precision mediump float;
  varying vec2 vTexCoord;
  uniform sampler2D uTexture;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    // Chroma key detection for green screen #31ff06 (R: 0.19, G: 1.0, B: 0.02)
    float maxRB = max(color.r, color.b);
    float excessGreen = color.g - maxRB;
    // Smooth alpha threshold
    float alpha = 1.0 - smoothstep(0.04, 0.18, excessGreen);
    // Green despill correction
    float despilledG = min(color.g, maxRB + 0.02);
    gl_FragColor = vec4(color.r, despilledG, color.b, alpha);
  }
`;

function initWebGL(canvas: HTMLCanvasElement): {
  cleanup: () => void;
  drawFrame: (video: HTMLVideoElement) => void;
} | null {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: false,
  });
  if (!gl) {
    return null;
  }

  const vs = gl.createShader(gl.VERTEX_SHADER);
  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  if (!(vs && fs)) {
    return null;
  }

  gl.shaderSource(vs, VS_SOURCE);
  gl.compileShader(vs);
  gl.shaderSource(fs, FS_SOURCE);
  gl.compileShader(fs);

  const program = gl.createProgram();
  if (!program) {
    return null;
  }

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  const activate = "useProgram";
  (gl as unknown as Record<string, (p: WebGLProgram) => void>)[activate](
    program
  );

  const posBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1, -1, 0, 1, 1, -1, 1, 1, -1, 1, 0, 0, -1, 1, 0, 0, 1, -1, 1, 1, 1, 1, 1,
      0,
    ]),
    gl.STATIC_DRAW
  );

  const aPos = gl.getAttribLocation(program, "aPosition");
  const aTex = gl.getAttribLocation(program, "aTexCoord");
  gl.enableVertexAttribArray(aPos);
  gl.enableVertexAttribArray(aTex);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
  gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, 16, 8);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  return {
    cleanup: () => {
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteTexture(texture);
      gl.deleteBuffer(posBuf);
    },
    drawFrame: (video: HTMLVideoElement) => {
      if (video.readyState >= video.HAVE_CURRENT_DATA) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          video
        );
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    },
  };
}

export function CloudTransition({
  progress,
  reducedMotion = false,
  lockScroll,
  onPeakCoverage,
  onTransitionEnd,
}: CloudTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [direction, setDirection] = useState<"forward" | "reverse">("forward");
  const [playbackDirection, setPlaybackDirection] = useState<
    "forward" | "reverse"
  >("forward");
  const [isCinematicActive, setIsCinematicActive] = useState(false);

  const lastProgressRef = useRef(progress);
  const isTransitioningRef = useRef(false);
  const swappedRef = useRef(false);
  const activeDirectionRef = useRef<"forward" | "reverse">("forward");
  const onPeakCoverageRef = useRef(onPeakCoverage);
  const onTransitionEndRef = useRef(onTransitionEnd);

  onPeakCoverageRef.current = onPeakCoverage;
  onTransitionEndRef.current = onTransitionEnd;

  const [start, end] = SCROLL_SECTIONS.transitionShadowCloud;
  const shouldPreload = progress >= 0.35 && progress <= 0.9;

  // Track scroll direction
  useEffect(() => {
    const delta = progress - lastProgressRef.current;
    if (Math.abs(delta) > 0.001) {
      const newDir = delta >= 0 ? "forward" : "reverse";
      if (newDir !== direction) {
        setDirection(newDir);
      }
      lastProgressRef.current = progress;
    }
  }, [progress, direction]);

  // Preload video
  useEffect(() => {
    if (shouldPreload && !isPreloaded && !reducedMotion) {
      const vid = videoRef.current as HTMLVideoElement | null;
      vid?.load();
      setIsPreloaded(true);
    }
  }, [shouldPreload, isPreloaded, reducedMotion]);

  // Trigger Cinematic Lock & Wipe when scrolling into the transition zone
  useEffect(() => {
    if (reducedMotion || videoError) {
      return;
    }

    // Trigger forward transition when scrolling down into threshold (0.575)
    if (
      direction === "forward" &&
      progress >= start - 0.005 &&
      progress < start + 0.06 &&
      !isTransitioningRef.current
    ) {
      isTransitioningRef.current = true;
      swappedRef.current = false;
      activeDirectionRef.current = direction;
      setPlaybackDirection(direction);
      lockScroll?.();
      setIsCinematicActive(true);
    }

    // Trigger reverse transition when scrolling up into threshold (0.68)
    if (
      direction === "reverse" &&
      progress <= end + 0.015 &&
      progress >= start &&
      !isTransitioningRef.current
    ) {
      isTransitioningRef.current = true;
      swappedRef.current = false;
      activeDirectionRef.current = direction;
      setPlaybackDirection(direction);
      lockScroll?.();
      setIsCinematicActive(true);
    }
  }, [progress, direction, start, end, lockScroll, reducedMotion, videoError]);

  // WebGL Render Loop and Video Playback Monitor
  useEffect(() => {
    if (reducedMotion || videoError || !isCinematicActive) {
      return;
    }

    const canvas = canvasRef.current as HTMLCanvasElement | null;
    const video = videoRef.current as HTMLVideoElement | null;
    if (!(canvas && video)) {
      return;
    }

    const webgl = initWebGL(canvas);
    if (!webgl) {
      setVideoError(true);
      setIsCinematicActive(false);
      isTransitioningRef.current = false;
      onTransitionEndRef.current?.();
      return;
    }

    let finished = false;
    let videoFrameId: number;

    const finishTransition = () => {
      if (finished) {
        return;
      }
      finished = true;
      setIsCinematicActive(false);
      isTransitioningRef.current = false;
      onTransitionEndRef.current?.();
    };

    const render = () => {
      webgl.drawFrame(video);

      // Peak full-screen cloud coverage occurs at ~1.45s in the video
      if (video.currentTime >= 1.45 && !swappedRef.current) {
        swappedRef.current = true;
        onPeakCoverageRef.current?.(activeDirectionRef.current);
      }

      if (!finished) {
        videoFrameId = video.requestVideoFrameCallback(render);
      }
    };

    // Start video playback from 0.0s
    video.currentTime = 0;
    videoFrameId = video.requestVideoFrameCallback(render);
    video.addEventListener("ended", finishTransition, { once: true });
    video.play().catch(() => {
      finishTransition();
    });

    // Safety timeout to ensure scroll is always released
    const safetyTimer = setTimeout(finishTransition, 4000);

    return () => {
      clearTimeout(safetyTimer);
      video.cancelVideoFrameCallback(videoFrameId);
      video.removeEventListener("ended", finishTransition);
      if (!video.paused) {
        video.pause();
        video.currentTime = 0;
      }
      finishTransition();
      webgl.cleanup();
    };
  }, [isCinematicActive, reducedMotion, videoError]);

  if (reducedMotion || videoError) {
    return null;
  }

  const currentSrc =
    playbackDirection === "forward"
      ? "/cloud_greenscreen_forward.mp4"
      : "/cloud_greenscreen_reverse.mp4";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-20 overflow-hidden transition-opacity duration-300 ${
        isCinematicActive ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Offscreen video source */}
      <video
        className="hidden"
        disablePictureInPicture
        disableRemotePlayback
        key={currentSrc}
        muted
        onError={() => setVideoError(true)}
        playsInline
        preload={shouldPreload ? "auto" : "none"}
        ref={videoRef}
        src={currentSrc}
        tabIndex={-1}
      />

      {/* GPU Chroma Key 100% Transparent Canvas */}
      <canvas
        className="h-full w-full scale-105 object-cover object-center will-change-transform"
        height={1080}
        ref={canvasRef}
        width={1920}
      />
    </div>
  );
}
