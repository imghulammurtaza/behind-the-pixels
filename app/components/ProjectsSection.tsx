"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

const CATEGORIES = [
  "WEBSITE DESIGN",
  "PERFORMANCE MARKETING",
  "BRANDING",
  "UI/UX DESIGN",
  "VIDEO EDITING",
  "PRODUCT DEVELOPMENT",
] as const;

const PROJECTS = [
  {
    title: "Building Brands from Within",
    titleLines: ["Building Brands from", "Within"],
    date: "April 6",
    image: "/project-brands.png",
    categoryIndex: 0,
  },
  {
    title: "Tips for Selecting a Timeless Brand Name",
    titleLines: ["Tips for Selecting a", "Timeless Brand Name"],
    date: "April 6",
    image: "/project-hope.png",
    categoryIndex: 1,
  },
  {
    title: "Strategies for Choosing a Brand Name That Endures",
    titleLines: ["Strategies for Choosing a", "Brand Name That Endures"],
    date: "April 6",
    image: "/project-sprint.png",
    categoryIndex: 2,
  },
  {
    title: "Guidelines for Picking a Lasting Brand Name",
    titleLines: ["Guidelines for Picking a", "Lasting Brand Name"],
    date: "April 6",
    image: "/project-typography.png",
    categoryIndex: 3,
  },
] as const;

const STACK_X_REM = 6.9;
const CARD_H_REM = 24;
const OVERLAP_REM = CARD_H_REM * 0.5;
const STICK_BASE_REM = 2;
const PEEK_REM = 10.5;
const LAST = PROJECTS.length - 1;
const DESKTOP = 1024;

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n));
}

function easeOut(t: number) {
  return 1 - (1 - t) * (1 - t);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function segment(progress: number, start: number, end: number) {
  return easeOut(clamp((progress - start) / Math.max(end - start, 0.0001)));
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let frame = 0;
    let lastActive = 1;

    const layout = () => {
      const desktop = window.innerWidth >= DESKTOP;
      track.style.setProperty(
        "--projects-pin-h",
        desktop ? `${Math.round(window.innerHeight * 3.6)}px` : "auto",
      );
    };

    const sync = () => {
      frame = 0;
      const desktop = window.innerWidth >= DESKTOP;
      const cards = Array.from(
        section.querySelectorAll<HTMLElement>("[data-project-card]"),
      );
      if (!cards.length) return;

      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const stackX = STACK_X_REM * rem;
      const cardH = CARD_H_REM * rem;
      const overlap = OVERLAP_REM * rem;
      const base = STICK_BASE_REM * rem;
      const peek = PEEK_REM * rem;
      const stageH = window.innerHeight;
      const stackH = cards[0]!.parentElement?.clientHeight || stageH;

      if (!desktop) {
        cards.forEach((card) => {
          card.style.transform = "";
        });
        if (lastActive !== 0) {
          lastActive = 0;
          setActiveIndex(0);
        }
        return;
      }

      const xL = 0;
      const xR = stackX;
      const y0 = base;
      const y1 = Math.min(base + overlap, stackH * 0.34);
      const y2 = Math.min(y1 + cardH * 0.7, stackH - peek);
      const y3start = stackH + 40;

      const rect = track.getBoundingClientRect();
      const max = Math.max(track.offsetHeight - stageH, 1);
      const progress = clamp(-rect.top / max);

      const cover3 = segment(progress, 0.08, 0.36);
      const cover2 = segment(progress, 0.36, 0.64);
      const moveUp = segment(progress, 0.64, 0.92);

      const y3at3 = lerp(y3start, y2, cover3);
      const y2at2 = lerp(y2, y1, cover2);
      const y3at2 = lerp(y3at3, y1, cover2);
      const ys = [
        y0,
        lerp(y1, y0, moveUp),
        lerp(y2at2, y0, moveUp),
        lerp(y3at2, y0, moveUp),
      ];

      const x3at3 = lerp(xR, xL, cover3);
      const x2at2 = lerp(xL, xR, cover2);
      const x3at2 = lerp(x3at3, xR, cover2);
      const xs = [
        xL,
        lerp(xR, xL, moveUp),
        lerp(x2at2, xL, moveUp),
        lerp(x3at2, xL, moveUp),
      ];

      cards.forEach((card, index) => {
        card.style.transform = `translate3d(${xs[index] ?? xL}px, ${ys[index] ?? y0}px, 0)`;
      });

      let current = 1;
      if (progress >= 0.08) current = 3;
      if (current !== lastActive) {
        lastActive = current;
        setActiveIndex(current);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(sync);
    };

    layout();
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("resize", layout);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("resize", layout);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#101010] text-white"
    >
      <div className="w-full shrink-0 bg-[#101010] px-5 pt-12 sm:px-8 md:px-10 lg:px-8 xl:px-[4rem]">
        <p className="m-0 text-xs font-normal tracking-[0.02em] leading-[1.2] text-white/40">
          Form
        </p>
        <div className="mt-[0.85rem] flex w-full items-center">
          <span className="block h-[1.5px] w-[2.15rem] shrink-0 bg-[#ff2d1a]" />
          <span className="block h-px flex-1 bg-white" />
        </div>
        <h2 className="mt-[2.65rem] mb-0 pb-[4.275rem] text-[5.15rem] !font-[410] tracking-[-0.07em] leading-[0.94] text-white">
          Projects
        </h2>
      </div>

      <div
        ref={trackRef}
        className="relative lg:h-[var(--projects-pin-h,300vh)]"
      >
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-5 pb-24 pt-[0.15rem] sm:px-8 md:px-10 lg:sticky lg:top-0 lg:h-screen lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:items-start lg:gap-10 lg:overflow-hidden lg:px-10 lg:pb-0 lg:pt-8 xl:px-[4rem]">
          <aside className="relative lg:self-start">
            <div className="pt-[0.15rem] font-sans font-normal">
              <p className="mb-2 mt-0 text-[0.6875rem] lg:text-[0.8rem] font-normal uppercase leading-[1.25] tracking-[0.08em] text-white">
                ART PROJECTS:
              </p>
              <ul className="mt-3 mb-0 flex list-none flex-col gap-[0.28rem] p-0 pl-7 max-lg:flex-row max-lg:flex-wrap max-lg:gap-x-4 max-lg:gap-y-[0.55rem] max-lg:pl-3 xl:pt-2">
                {CATEGORIES.map((label, i) => {
                  const isActive = PROJECTS[activeIndex]?.categoryIndex === i;
                  return (
                    <li key={label}>
                      <span
                        className={`block whitespace-nowrap text-[0.72rem] lg:text-[0.8rem] font-normal uppercase leading-[1.25] tracking-[0.055em] transition-colors duration-300 ${
                          isActive ? "text-white/55" : "text-white/38"
                        }`}
                      >
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <div className="relative min-w-0 overflow-visible max-lg:flex max-lg:flex-col lg:ml-auto lg:h-full lg:w-[min(100%,50.05rem)]">
            {PROJECTS.map((project, index) => {
              const layer =
                index < activeIndex
                  ? "back"
                  : index === activeIndex
                    ? index === LAST
                      ? "front"
                      : "next"
                    : "waiting";

              return (
                <article
                  key={project.title}
                  data-project-card
                  data-layer={layer}
                  className="group relative isolate flex h-auto min-h-0 w-full max-w-[43.125rem] flex-col overflow-hidden rounded-2xl border border-white/[0.055] bg-transparent shadow-[0_16px_40px_rgba(0,0,0,0.28)] will-change-transform max-lg:mb-5 sm:h-[24rem] sm:flex-row lg:absolute lg:top-0 lg:left-0 lg:mb-0 data-[layer=back]:border-white/[0.07] data-[layer=back]:shadow-[0_14px_40px_rgba(0,0,0,0.28)] data-[layer=next]:border-white/12 data-[layer=next]:shadow-[0_-24px_64px_rgba(255,255,255,0.1),0_16px_40px_rgba(0,0,0,0.28)] data-[layer=front]:border-white/12 data-[layer=front]:shadow-[0_-24px_64px_rgba(255,255,255,0.1),0_16px_40px_rgba(0,0,0,0.28)] max-lg:data-[layer=next]:shadow-[0_16px_40px_rgba(0,0,0,0.28)] max-lg:data-[layer=front]:shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
                  style={{ zIndex: 10 + index }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] bg-[#202020] group-data-[layer=next]:bg-[#3a3a3a] group-data-[layer=front]:bg-[#3a3a3a]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-[1] hidden rounded-[inherit] bg-[radial-gradient(ellipse_58%_42%_at_36%_0%,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.28)_36%,rgba(255,255,255,0.06)_58%,transparent_74%)] group-data-[layer=next]:block group-data-[layer=front]:block max-lg:hidden"
                  />
                  <div className="relative z-[2] flex h-full min-h-0 w-full flex-1 flex-col sm:flex-row">
                    <div className="flex w-full shrink-0 flex-col justify-start bg-transparent px-5 pt-6 pb-5 sm:w-[19.75rem] sm:min-w-[15.5rem] sm:px-7 sm:pt-8 sm:pr-5 sm:pb-6 sm:pl-8">
                      <h3 className="m-0 max-w-none text-[1.35rem] font-normal leading-[1.22] tracking-[-0.022em] text-white sm:text-[1.5rem]">
                        {project.titleLines.map((line) => (
                          <span
                            key={line}
                            className="block whitespace-normal sm:whitespace-nowrap"
                          >
                            {line}
                          </span>
                        ))}
                      </h3>
                      <p className="mt-4 mb-0 text-sm font-normal leading-none text-[#7a7a7a] sm:mt-6">
                        {project.date}
                      </p>
                    </div>

                    <div className="flex min-h-0 min-w-0 flex-1 items-stretch justify-end bg-transparent p-3 sm:p-3.5 sm:pl-0">
                      <div className="relative aspect-square h-full max-h-full w-auto min-w-0 flex-1 overflow-hidden rounded-none bg-black/20 max-md:min-h-[200px] max-md:w-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 90vw, 340px"
                          className="rounded-none object-cover object-center"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
