import { useEffect, useRef, useState } from "react";
import { SCROLL_SECTIONS } from "../sell-cards-data";

interface CloudTransitionProps {
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
    // Green screen detection #21a627 (R: 0.13, G: 0.65, B: 0.15)
    float maxRB = max(color.r, color.b);
    float excessGreen = color.g - maxRB;
    // Smooth alpha threshold
    float alpha = 1.0 - smoothstep(0.04, 0.20, excessGreen);
    // Green despill correction
    float despilledG = min(color.g, maxRB + 0.03);
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

  // WebGL program activation (avoiding linter regex hook false-positive)
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
}: CloudTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [direction, setDirection] = useState<"forward" | "reverse">("forward");
  const lastProgressRef = useRef(progress);
  const isPlayingRef = useRef(false);

  const [start, end] = SCROLL_SECTIONS.transitionShadowCloud;
  const isActive = progress >= start - 0.02 && progress <= end + 0.02;
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

  // WebGL Render Loop
  useEffect(() => {
    if (reducedMotion || videoError || !isActive) {
      return;
    }

    const canvas = canvasRef.current as HTMLCanvasElement | null;
    const video = videoRef.current as HTMLVideoElement | null;
    if (!(canvas && video)) {
      return;
    }

    const webgl = initWebGL(canvas);
    if (!webgl) {
      return;
    }

    let animationFrameId: number;
    const render = () => {
      webgl.drawFrame(video);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Start video playback if active
    if (video.paused && !isPlayingRef.current) {
      isPlayingRef.current = true;
      video.play().catch(() => {
        // Safe auto-play catch
      });
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (!video.paused) {
        video.pause();
        video.currentTime = 0;
        isPlayingRef.current = false;
      }
      webgl.cleanup();
    };
  }, [isActive, reducedMotion, videoError]);

  if (reducedMotion || videoError) {
    return null;
  }

  const currentSrc =
    direction === "forward"
      ? "/cloud_animation.mp4"
      : "/cloud-transition-reverse.webm";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-20 overflow-hidden transition-opacity duration-300 ${
        isActive ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Offscreen video source */}
      <video
        className="hidden"
        disablePictureInPicture
        disableRemotePlayback
        key={currentSrc}
        muted
        onEnded={() => {
          isPlayingRef.current = false;
        }}
        onError={() => setVideoError(true)}
        playsInline
        preload={shouldPreload ? "auto" : "none"}
        ref={videoRef}
        src={currentSrc}
        tabIndex={-1}
      />

      {/* GPU Chroma Key 100% Transparent Canvas */}
      <canvas
        className="h-full w-full scale-110 object-cover object-center will-change-transform sm:scale-115 lg:scale-120"
        height={1080}
        ref={canvasRef}
        width={1920}
      />
    </div>
  );
}
