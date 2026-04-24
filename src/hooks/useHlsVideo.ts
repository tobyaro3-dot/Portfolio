import { useEffect, type RefObject } from "react";
import Hls from "hls.js";

export function useHlsVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  src: string,
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    let hls: Hls | undefined;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    return () => {
      hls?.destroy();
      video.removeAttribute("src");
      video.load();
    };
  }, [src, videoRef]);
}
