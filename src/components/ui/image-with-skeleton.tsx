import * as React from "react";

import { cn } from "@/lib/utils";

import { Skeleton } from "./skeleton";

type ImageWithSkeletonProps = Omit<
  React.ComponentProps<"img">,
  "alt" | "height" | "width"
> & {
  alt: string;
  containerClassName?: string;
  contentFit?: boolean;
  height: number | string;
  skeletonClassName?: string;
  width: number | string;
};

interface ContentFit {
  scale: number;
  source: string;
  x: number;
  y: number;
}

const alphaThreshold = 24;
const maximumScale = 1.5;
const sampleSize = 192;
const targetCoverage = 0.9;

function getContentFit(
  image: HTMLImageElement,
  frameAspectRatio: number
): Omit<ContentFit, "source"> | undefined {
  if (!(image.naturalHeight && image.naturalWidth)) {
    return undefined;
  }
  if (!frameAspectRatio) {
    return undefined;
  }

  const sampleScale = Math.min(
    1,
    sampleSize / image.naturalHeight,
    sampleSize / image.naturalWidth
  );
  const height = Math.max(1, Math.round(image.naturalHeight * sampleScale));
  const width = Math.max(1, Math.round(image.naturalWidth * sampleScale));
  const canvas = document.createElement("canvas");
  canvas.height = height;
  canvas.width = width;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    return undefined;
  }

  try {
    context.drawImage(image, 0, 0, width, height);
    const { data } = context.getImageData(0, 0, width, height);
    let left = width;
    let right = 0;
    let top = height;
    let bottom = 0;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        if (data[(y * width + x) * 4 + 3] < alphaThreshold) {
          continue;
        }
        left = Math.min(left, x);
        right = Math.max(right, x);
        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
      }
    }

    if (left > right || top > bottom) {
      return undefined;
    }

    const contentWidth = (right - left + 1) / width;
    const contentHeight = (bottom - top + 1) / height;
    if (contentWidth > 0.96 && contentHeight > 0.96) {
      return undefined;
    }

    const sourceAspectRatio = image.naturalWidth / image.naturalHeight;
    const renderedWidth =
      sourceAspectRatio > frameAspectRatio
        ? 1
        : sourceAspectRatio / frameAspectRatio;
    const renderedHeight =
      sourceAspectRatio > frameAspectRatio
        ? 1 / sourceAspectRatio
        : 1 / frameAspectRatio;
    const scale = Math.min(
      maximumScale,
      Math.max(
        1,
        Math.min(
          targetCoverage / (contentWidth * renderedWidth),
          targetCoverage / frameAspectRatio / (contentHeight * renderedHeight)
        )
      )
    );
    const centerX = (left + right + 1) / 2 / width;
    const centerY = (top + bottom + 1) / 2 / height;
    const contentCenterX = (1 - renderedWidth) / 2 + centerX * renderedWidth;
    const contentCenterY =
      (1 / frameAspectRatio - renderedHeight) / 2 + centerY * renderedHeight;

    return {
      scale,
      x: -scale * (contentCenterX - 0.5) * 100,
      y: -scale * (contentCenterY * frameAspectRatio - 0.5) * 100,
    };
  } catch {
    return undefined;
  }
}

export function ImageWithSkeleton({
  alt,
  className,
  containerClassName,
  contentFit = false,
  height,
  onError,
  onLoad,
  skeletonClassName,
  src,
  style,
  width,
  ...props
}: ImageWithSkeletonProps) {
  const [settledSrc, setSettledSrc] = React.useState<string>();
  const [contentFitStyle, setContentFitStyle] = React.useState<ContentFit>();
  const isLoading = settledSrc !== src;

  const measureContent = (image: HTMLImageElement) => {
    if (!src) {
      return;
    }
    const canMeasure = Boolean(contentFit && image.clientHeight);
    if (!canMeasure) {
      return;
    }

    const analyzer = new Image();
    analyzer.crossOrigin = "anonymous";
    analyzer.onload = () => {
      const fit = getContentFit(
        analyzer,
        image.clientWidth / image.clientHeight
      );
      if (fit) {
        setContentFitStyle({ ...fit, source: src });
      }
    };
    analyzer.src = src;
  };

  const activeContentFit =
    contentFitStyle?.source === src ? contentFitStyle : undefined;
  const contentFitVariables = activeContentFit
    ? ({
        ...style,
        "--content-fit-scale": activeContentFit.scale,
        "--content-fit-x": `${activeContentFit.x}%`,
        "--content-fit-y": `${activeContentFit.y}%`,
      } as React.CSSProperties)
    : style;

  return (
    <div aria-busy={isLoading} className={cn("relative", containerClassName)}>
      {isLoading ? (
        <Skeleton
          aria-hidden="true"
          className={cn(
            "absolute inset-0 size-full rounded-none bg-surface-2 motion-reduce:animate-none",
            skeletonClassName
          )}
        />
      ) : null}
      <img
        {...props}
        alt={alt}
        className={cn(
          "relative size-full",
          className,
          contentFit &&
            "object-contain [transform:translate(var(--content-fit-x,0%),var(--content-fit-y,0%))_scale(calc(var(--content-fit-scale,1)*var(--content-fit-hover-scale,1)))]"
        )}
        height={height}
        onError={(event) => {
          setSettledSrc(src);
          onError?.(event);
        }}
        onLoad={(event) => {
          setSettledSrc(src);
          measureContent(event.currentTarget);
          onLoad?.(event);
        }}
        src={src}
        style={contentFitVariables}
        width={width}
      />
    </div>
  );
}
