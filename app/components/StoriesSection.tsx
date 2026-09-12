"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const PORTRAITS = [
  "/story-1.png",
  "/story-2.png",
  "/story-3.png",
  "/story-4.png",
  "/story-5.png",
  "/story-6.png",
  "/story-7.png",
  "/story-8.png",
] as const;

type StoryItem =
  | { type: "portrait"; src: string }
  | { type: "feature" };

const STORIES: StoryItem[] = [
  { type: "portrait", src: PORTRAITS[0] },
  { type: "portrait", src: PORTRAITS[1] },
  { type: "portrait", src: PORTRAITS[2] },
  { type: "portrait", src: PORTRAITS[3] },
  { type: "feature" },
  { type: "portrait", src: PORTRAITS[4] },
  { type: "portrait", src: PORTRAITS[5] },
  { type: "portrait", src: PORTRAITS[6] },
  { type: "portrait", src: PORTRAITS[7] },
];

const STATS = [
  { value: "86+", label: "PROJECTS COMPLETED" },
  { value: "80%", label: "CLIENT SATISFACTION" },
  { value: "32", label: "AWARDS WON" },
  { value: "89%", label: "SUCCESS RATE" },
] as const;

const FEATURE_THUMBS = [
  PORTRAITS[1],
  PORTRAITS[2],
  PORTRAITS[5],
] as const;

/** px drag ≈ one card step */
const DRAG_STEP = 92;

function cardTransform(offset: number, compact = false) {
  const abs = Math.abs(offset);
  const rotateY = offset * (compact ? -18 : -28);
  const translateX = offset * (compact ? 78 : 118);
  const translateZ = -abs * (compact ? 60 : 90);
  const scale = Math.max(
    compact ? 0.78 : 0.72,
    1 - abs * (compact ? 0.1 : 0.12),
  );
  const opacity = Math.max(0.28, 1 - abs * 0.18);
  return {
    transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex: Math.round(40 - abs * 10),
  };
}

export function StoriesSection() {
  const [active, setActive] = useState(4);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [compact, setCompact] = useState(false);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    origin: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const go = useCallback((next: number) => {
    setActive(((next % STORIES.length) + STORIES.length) % STORIES.length);
    setDragOffset(0);
  }, []);

  useEffect(() => {
    const syncCompact = () => setCompact(window.innerWidth < 640);
    syncCompact();
    window.addEventListener("resize", syncCompact);
    return () => window.removeEventListener("resize", syncCompact);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const root = trackRef.current;
      if (!root) return;
      if (
        !root.contains(document.activeElement) &&
        document.activeElement !== root
      )
        return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(active - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(active + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  const endDrag = (clientX: number) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = clientX - drag.startX;
    const steps = Math.round(-dx / DRAG_STEP);
    if (drag.moved || steps !== 0) suppressClickRef.current = true;
    dragRef.current = null;
    setDragging(false);
    if (steps !== 0) go(drag.origin + steps);
    else setDragOffset(0);
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    suppressClickRef.current = false;
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      origin: active,
      moved: false,
    };
    setDragging(true);
    setDragOffset(0);
    trackRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.startX;
    if (Math.abs(dx) > 6) drag.moved = true;
    setDragOffset(-dx / DRAG_STEP);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return;
    endDrag(e.clientX);
  };

  const onPointerCancel = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    setDragOffset(0);
  };

  return (
    <section
      id="stories"
      className="stories-section relative overflow-hidden px-4 pb-0 pt-16 sm:px-8 sm:pt-24 md:pt-28"
      aria-label="Stories"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="imac-shell">
          <div className="imac-bezel">
            <div className="imac-screen">
              <div className="stories-screen-inner">
                <h2 className="stories-title" aria-hidden="true">
                  STORIES
                </h2>
                <h2 className="sr-only">Stories</h2>

                <div
                  ref={trackRef}
                  className={`stories-carousel ${dragging ? "is-dragging" : ""}`}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerCancel}
                  role="listbox"
                  aria-label="Story carousel — drag or use arrow keys"
                  tabIndex={0}
                >
                  <div className="stories-stage">
                    {STORIES.map((item, i) => {
                      const offset = i - active - dragOffset;
                      const style = cardTransform(offset, compact);
                      const isCenter = Math.abs(offset) < 0.5;

                      return (
                        <button
                          key={i}
                          type="button"
                          role="option"
                          aria-selected={isCenter}
                          className={`story-card ${item.type === "feature" ? "story-card-feature" : "story-card-portrait"} ${isCenter ? "is-active" : ""} ${dragging ? "is-dragging" : ""}`}
                          style={style}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (suppressClickRef.current) {
                              suppressClickRef.current = false;
                              return;
                            }
                            go(i);
                          }}
                        >
                          {item.type === "feature" ? (
                            <div className="feature-panel">
                              <p className="feature-heading">
                                Inspiring Journeys Of Strength And Hope.
                              </p>
                              <div className="feature-thumbs">
                                {FEATURE_THUMBS.map((src) => (
                                  <span key={src} className="feature-thumb">
                                    <Image
                                      src={src}
                                      alt=""
                                      width={72}
                                      height={72}
                                      className="h-full w-full object-cover"
                                      draggable={false}
                                    />
                                  </span>
                                ))}
                              </div>
                              <span className="feature-cta">Watch Story</span>
                            </div>
                          ) : (
                            <>
                              <Image
                                src={item.src}
                                alt=""
                                fill
                                sizes="220px"
                                className="object-cover"
                                draggable={false}
                              />
                              <span className="story-play" aria-hidden="true">
                                <svg
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="11"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    fill="rgba(255,255,255,0.12)"
                                  />
                                  <path
                                    d="M10 8.5v7l6-3.5-6-3.5z"
                                    fill="white"
                                  />
                                </svg>
                              </span>
                            </>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="stories-stats">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="stories-stat">
                      <span className="stories-stat-value">{stat.value}</span>
                      <span className="stories-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div className="stories-brands">
                  <p className="stories-brands-label">
                    BRANDS WHO ARE PART OF OUR SUCCESS STORY.
                  </p>
                  <div className="stories-logos-marquee" aria-hidden="true">
                    <div className="stories-logos-track">
                      <BrandDreamWorks />
                      <BrandSony />
                      <BrandTissot />
                      <BrandConverse />
                      <BrandMark />
                      <BrandDreamWorks />
                      <BrandSony />
                      <BrandTissot />
                      <BrandConverse />
                      <BrandMark />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="imac-chin" aria-hidden="true">
            <span className="imac-chin-bar" />
          </div>
          <div className="imac-stand" aria-hidden="true">
            <div className="imac-neck" />
            <div className="imac-foot" />
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandDreamWorks() {
  return (
    <svg viewBox="0 0 120 36" className="stories-logo">
      <text
        x="60"
        y="24"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontFamily="Georgia, serif"
        fontStyle="italic"
      >
        DreamWorks
      </text>
    </svg>
  );
}

function BrandSony() {
  return (
    <svg viewBox="0 0 80 36" className="stories-logo">
      <text
        x="40"
        y="24"
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="700"
        letterSpacing="4"
      >
        SONY
      </text>
    </svg>
  );
}

function BrandTissot() {
  return (
    <svg viewBox="0 0 90 36" className="stories-logo">
      <text
        x="45"
        y="24"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontFamily="Georgia, serif"
        letterSpacing="3"
      >
        TISSOT
      </text>
    </svg>
  );
}

function BrandConverse() {
  return (
    <svg viewBox="0 0 110 36" className="stories-logo">
      <text
        x="55"
        y="24"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="700"
        letterSpacing="1"
      >
        CONVERSE
      </text>
    </svg>
  );
}

function BrandMark() {
  return (
    <svg viewBox="0 0 40 36" className="stories-logo">
      <path
        d="M8 28 V8 h6 l6 12 6-12 h6 v20 h-5 V14 l-5.5 11h-3L13 14v14H8z"
        fill="white"
      />
    </svg>
  );
}
