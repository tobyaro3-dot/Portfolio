import { useRef } from "react";
import { useHlsVideo } from "../../hooks/useHlsVideo";

export type HlsVideoProps = {
  src: string;
  className?: string;
  flipped?: boolean;
  overlayClassName?: string;
};

export function HlsVideo({
  src,
  className = "",
  flipped = false,
  overlayClassName,
}: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useHlsVideo(videoRef, src);

  return (
    <>
      <video
        ref={videoRef}
        className={`absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover ${
          flipped ? "scale-y-[-1]" : ""
        } ${className}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {overlayClassName ? (
        <div className={`absolute inset-0 ${overlayClassName}`} />
      ) : null}
    </>
  );
}
