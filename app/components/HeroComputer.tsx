"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Phase = "idle" | "zoom" | "video";

export function HeroComputer() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [portalReady, setPortalReady] = useState(false);
  const [origin, setOrigin] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    const screen = screenVideoRef.current;
    if (!screen) return;
    if (phase !== "idle") {
      screen.pause();
      return;
    }
    screen.muted = true;
    void screen.play().catch(() => {});
  }, [phase]);

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
        aria-label="Click me - play showreel"
        onClick={open}
        className="anim-computer group relative shrink-0 cursor-pointer border-0 bg-transparent p-0"
      >
        <span className="hero-pc-stage">
          <div className="hero-pc-screen" aria-hidden="true">
            <video
              ref={screenVideoRef}
              className="hero-pc-screen-video"
              src="/OtherAssets/pcVideo.mp4"
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
            />
            <span className="hero-pc-screen-green" aria-hidden="true" />
            <span className="hero-pc-click">
              <span className="hero-pc-click-mask">
                <span className="hero-pc-click-track">
                  <span className="hero-pc-click-line">Click me</span>
                  <span className="hero-pc-click-line" aria-hidden="true">
                    Click me
                  </span>
                </span>
              </span>
            </span>
          </div>

          <Image
            src="/OtherAssets/oldPC.png"
            alt="Vintage computer"
            width={617}
            height={411}
            priority
            className="hero-computer-img h-auto w-full object-contain drop-shadow-[0_24px_48px_rgba(70,50,30,0.16)]"
          />
        </span>
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
                  src="/OtherAssets/oldPC.png"
                  alt=""
                  width={617}
                  height={411}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            )}

            <div className="hero-zoom-video-wrap">
              <video
                ref={videoRef}
                className="hero-zoom-video"
                src="/OtherAssets/pcVideo.mp4"
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
