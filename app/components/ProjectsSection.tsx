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

/** First card near top; later cards stop a step lower (stack peek) */
function stickTop(index: number) {
  return `calc(2.5rem + ${index * 2.1}rem)`;
}

function stickTopPx(index: number) {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return (2.5 + index * 2.1) * rem;
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    let lastActive = 0;

    const sync = () => {
      frame = 0;
      const cards = Array.from(
        section.querySelectorAll<HTMLElement>("[data-project-card]"),
      );
      if (!cards.length) return;

      let current = 0;
      const line = window.innerHeight * 0.28;
      for (let i = 0; i < cards.length; i++) {
        if (cards[i]!.getBoundingClientRect().top <= line + 40) current = i;
      }
      if (current !== lastActive) {
        lastActive = current;
        setActiveIndex(current);
      }

      // After 4th card parks, scroll left nav away in sync with the stack
      const aside = asideRef.current;
      const lastCard = cards[cards.length - 1]!;
      if (aside && window.innerWidth >= 1024) {
        const expected = stickTopPx(cards.length - 1);
        const top = lastCard.getBoundingClientRect().top;
        if (top < expected - 0.5) {
          aside.style.transform = `translate3d(0, ${top - expected}px, 0)`;
        } else {
          aside.style.transform = "";
        }
      } else if (aside) {
        aside.style.transform = "";
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
      {/* Kept: Form + accent line + Projects heading */}
      <div className="px-5 pt-8 sm:px-8 md:px-10 lg:px-12 xl:px-14">
        <p className="text-[14px] font-normal tracking-wide text-white/45">
          Form
        </p>
        <div className="mt-3 flex items-center">
          <span className="h-px w-9 bg-[#ff2d1a]" />
          <span className="h-px flex-1 bg-white/20" />
        </div>
        <h2 className="mt-5 pb-10 text-[clamp(3rem,7.8vw,5rem)] font-normal leading-[0.95] tracking-[-0.04em] sm:pb-12 lg:pb-14">
          Projects
        </h2>
      </div>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-8 px-5 pb-8 pt-2 sm:px-8 md:px-10 lg:grid-cols-[minmax(200px,0.62fr)_minmax(0,1.8fr)] lg:gap-10 lg:px-12 lg:pt-4 xl:px-14">
        <aside
          ref={asideRef}
          className="lg:sticky lg:top-10 lg:self-start lg:pb-8 will-change-transform"
        >
          <div className="projects-nav">
            <p className="projects-nav-label">ART PROJECTS:</p>
            <ul className="projects-nav-list">
              {CATEGORIES.map((label, i) => {
                const isActive = PROJECTS[activeIndex]?.categoryIndex === i;
                return (
                  <li key={label}>
                    <span
                      className={`projects-nav-item ${
                        isActive ? "is-active" : ""
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

        <div className="relative min-w-0 overflow-visible pb-6 lg:pb-8">
          {PROJECTS.map((project, index) => {
            const layer =
              index < activeIndex
                ? "is-back"
                : index === activeIndex
                  ? "is-front"
                  : "is-next";
            const isLast = index === last;

            return (
              <article
                key={project.title}
                data-project-card
                className={`project-card-exact project-card-stack sticky mx-auto flex ${layer} ${
                  index === 1 ? "project-card-nudge" : ""
                }`}
                style={{
                  top: stickTop(index),
                  zIndex: 10 + index,
                  /* Stack room; last card exits sooner to cut bottom black gap */
                  marginBottom: isLast ? "12vh" : "85vh",
                }}
              >
                <div className="project-card-glass" aria-hidden="true" />
                <div className="project-card-body">
                  <div className="project-card-copy flex w-full shrink-0 flex-col justify-start px-5 pt-6 sm:w-[48%] sm:min-w-[16.5rem] sm:px-7 sm:pt-9 md:px-9 md:pt-11 lg:px-10 lg:pt-12">
                    <h3 className="project-card-title text-[clamp(1.45rem,2.5vw,1.85rem)] font-normal leading-[1.2] tracking-[-0.025em] text-white">
                      {project.titleLines.map((line) => (
                        <span key={line} className="block whitespace-nowrap">
                          {line}
                        </span>
                      ))}
                    </h3>
                    <p className="mt-4 text-[14px] font-normal leading-none text-[#8a8a8a]">
                      {project.date}
                    </p>
                  </div>

                  <div className="project-card-media min-h-[200px] min-w-0 flex-1 p-4 sm:min-h-0 sm:p-5 md:p-[18px]">
                    <div className="relative h-full min-h-[200px] overflow-hidden sm:min-h-0">
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
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
