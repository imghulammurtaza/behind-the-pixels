"use client";

import { useEffect, useRef } from "react";

export function HomeVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const tryPlay = () => {
      const play = video.play();
      if (play && typeof play.catch === "function") {
        play.catch(() => {
          // Autoplay can be blocked until a gesture; keep muted and retry once.
          video.muted = true;
          void video.play().catch(() => {});
        });
      }
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);

    return () => {
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
    };
  }, []);

  return (
    <section className="home-video-section" aria-label="Showreel">
      <div className="home-video-frame" data-reveal="scale">
        <video
          ref={ref}
          className="home-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noplaybackrate noremoteplayback"
          tabIndex={-1}
          aria-hidden="true"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
