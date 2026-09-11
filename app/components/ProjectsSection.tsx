"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
    date: "April 6",
    image: "/project-brands.png",
    categoryIndex: 0,
  },
  {
    title: "Tips for Selecting a Timeless Brand Name",
    date: "April 6",
    image: "/project-hope.png",
    categoryIndex: 1,
  },
  {
    title: "Strategies for Choosing a Brand Name That Endures",
    date: "April 6",
    image: "/project-sprint.png",
    categoryIndex: 2,
  },
  {
    title: "Guidelines for Picking a Lasting Brand Name",
    date: "April 6",
    image: "/project-typography.png",
    categoryIndex: 3,
  },
] as const;

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n));
}

function stickTop(index: number) {
  if (index === 0) return "20vh";
  return `${20 + index * 6}vh`;
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftListRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const leftList = leftListRef.current;
    if (!section) return;

    let frame = 0;
    let lastActive = 0;

    const sync = () => {
      frame = 0;
      const cards = Array.from(
        section.querySelectorAll<HTMLElement>("[data-project-card]"),
      );
      if (!cards.length) return;

      const top = section.offsetTop;
      const end = top + section.offsetHeight - window.innerHeight;
      const progress = clamp((window.scrollY - top) / Math.max(end - top, 1));

      if (leftList) {
        const travel = window.innerWidth < 1024 ? 0 : progress * 160;
        leftList.style.transform = `translate3d(0, ${-travel}px, 0)`;
      }

      let current = 0;
      const line = window.innerHeight * 0.32;
      for (let i = 0; i < cards.length; i++) {
        if (cards[i]!.getBoundingClientRect().top <= line + 48) current = i;
      }
      if (current !== lastActive) {
        lastActive = current;
        setActiveIndex(current);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const last = PROJECTS.length - 1;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#121212] text-white"
    >
      <div className="px-5 pt-8 sm:px-8 md:px-10 lg:px-12 xl:px-14" data-reveal>
        <p className="text-[13px] font-medium tracking-wide text-white/45">
          Form
        </p>
        <div className="mt-3 flex items-center">
          <span className="h-px w-9 bg-[#ff2d1a]" />
          <span className="h-px flex-1 bg-white/20" />
        </div>
        <h2 className="mt-5 pb-6 text-[clamp(2.25rem,6vw,4.75rem)] font-semibold tracking-[-0.045em]">
          Projects
        </h2>
      </div>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-8 px-5 pb-16 sm:px-8 md:px-10 lg:grid-cols-[minmax(200px,0.62fr)_minmax(0,1.8fr)] lg:gap-10 lg:px-12 xl:px-14">
        <aside className="lg:sticky lg:top-8 lg:self-start lg:pb-24">
          <div ref={leftListRef} className="will-change-transform">
            <p className="mb-5 text-[11px] font-medium tracking-[0.14em] text-white/40">
              ART PROJECTS:
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 lg:block lg:space-y-3.5 lg:gap-0">
              {CATEGORIES.map((label, i) => {
                const isActive = PROJECTS[activeIndex]?.categoryIndex === i;
                return (
                  <li key={label}>
                    <span
                      className={`block text-[12px] font-medium tracking-[0.06em] transition-colors duration-300 sm:text-[13px] ${
                        isActive ? "text-white" : "text-white/32"
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

        <div className="relative min-w-0 overflow-visible">
          {PROJECTS.map((project, index) => {
            const isFront = index === activeIndex;

            return (
              <article
                key={project.title}
                data-project-card
                className={`project-card-exact project-card-stack sticky mx-auto flex overflow-hidden ${
                  isFront ? "is-front" : "is-back"
                } ${index === 1 ? "project-card-nudge" : ""}`}
                style={{
                  top: stickTop(index),
                  zIndex: 10 + index,
                  marginBottom: index === last ? "40vh" : "58vh",
                }}
              >
                <div className="project-card-copy relative z-[2] flex w-full shrink-0 flex-col justify-start px-5 pt-6 sm:w-[40%] sm:px-8 sm:pt-9 md:px-11 md:pt-11 lg:px-12 lg:pt-12">
                  <h3 className="max-w-none text-[clamp(1.35rem,2.6vw,2.35rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:max-w-[10ch]">
                    {project.title}
                  </h3>
                  <p className="mt-3.5 text-[13px] font-normal text-[#8a8a8a] sm:text-[14px]">
                    {project.date}
                  </p>
                </div>

                <div className="project-card-media relative min-h-[200px] min-w-0 flex-1 p-4 sm:min-h-0 sm:p-5 md:p-[18px]">
                  <div className="relative h-full min-h-[200px] overflow-hidden rounded-[16px] sm:min-h-0 sm:rounded-[18px] md:rounded-[20px]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 90vw, 520px"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
