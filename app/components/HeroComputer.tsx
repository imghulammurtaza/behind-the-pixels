"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Phase = "idle" | "zoom" | "video";

export function HeroComputer() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [portalReady, setPortalReady] = useState(false);
  const [origin, setOrigin] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (phase !== "video") return;
    const video = videoRef.current;
    if (!video) return;

    const start = async () => {
      video.currentTime = 0;
      video.muted = true;
      try {
        await video.play();
        video.muted = false;
      } catch {
        video.muted = true;
        void video.play().catch(() => {});
      }
    };

    void start();
  }, [phase]);

  useEffect(() => {
    if (phase === "idle") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [phase]);

  const open = () => {
    const el = btnRef.current;
    if (!el || phase !== "idle") return;
    const rect = el.getBoundingClientRect();
    setOrigin({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    setPhase("zoom");
    window.setTimeout(() => setPhase("video"), 780);
  };

  const close = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setPhase("idle");
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label="Click me — play showreel"
        onClick={open}
        className="anim-computer group relative mt-auto mb-[min(3vh,1.25rem)] w-full max-w-[min(62vw,310px)] shrink-0 cursor-pointer border-0 bg-transparent p-0 sm:mb-[min(4vh,1.75rem)] sm:max-w-[min(48vw,350px)] md:max-w-[min(38vw,370px)]"
      >
        <Image
          src="/retro-computer.png"
          alt="Vintage computer showing Behind the Pixels"
          width={729}
          height={676}
          priority
          className="hero-computer-img h-auto max-h-[min(42dvh,380px)] w-full object-contain drop-shadow-[0_24px_48px_rgba(70,50,30,0.16)] transition-transform duration-500 group-hover:scale-[1.015] group-active:scale-[0.99]"
        />
      </button>

      {portalReady &&
        phase !== "idle" &&
        createPortal(
          <div
            className={`hero-zoom-layer ${phase === "video" ? "is-video" : "is-zoom"}`}
            role="dialog"
            aria-modal="true"
            aria-label="Showreel"
          >
            {phase === "zoom" && (
              <div
                className="hero-zoom-computer"
                style={{
                  top: origin.top,
                  left: origin.left,
                  width: origin.width,
                  height: origin.height,
                }}
              >
                <Image
                  src="/retro-computer.png"
                  alt=""
                  width={729}
                  height={676}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            )}

            <div className="hero-zoom-video-wrap">
              <video
                ref={videoRef}
                className="hero-zoom-video"
                src="/video.mp4"
                playsInline
                autoPlay
                preload="auto"
                controls={false}
                disablePictureInPicture
              />
              <div className="hero-zoom-green" aria-hidden="true" />
              <div className="hero-zoom-scan" aria-hidden="true" />
              <button
                type="button"
                className="hero-zoom-close"
                onClick={close}
                aria-label="Close video"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 4l10 10M14 4L4 14"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
