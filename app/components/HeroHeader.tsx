"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/#projects" },
  { label: "Stories", href: "/#stories" },
  { label: "Services", href: "/#services" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/contact" },
] as const;

function LiquidLink({
  href,
  label,
  index,
  open,
  onNavigate,
}: {
  href: string;
  label: string;
  index: number;
  open: boolean;
  onNavigate: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const uid = useId().replace(/:/g, "");
  const filterId = `menu-liquid-${uid}`;

  return (
    <a
      href={href}
      className={`site-menu-link ${hovered ? "is-liquid" : ""}`}
      style={{
        transitionDelay: open
          ? `${90 + index * 60}ms`
          : `${(LINKS.length - 1 - index) * 45}ms`,
        filter: hovered ? `url(#${filterId})` : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onNavigate}
    >
      <svg className="liquid-svg-defs" aria-hidden="true" focusable="false">
        <defs>
          <filter
            id={filterId}
            x="-25%"
            y="-40%"
            width="150%"
            height="180%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.014 0.045"
              numOctaves="2"
              seed={index + 2}
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="2.2s"
                values="0.01 0.03;0.028 0.055;0.01 0.03"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={16}
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                dur="2.2s"
                values="10;20;13;18;10"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>
      {label}
    </a>
  );
}

export function HeroHeader({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const chrome =
    tone === "dark"
      ? "text-[15px] font-medium tracking-[-0.01em] text-white/75 transition-opacity hover:text-white hover:opacity-100"
      : "text-[15px] font-medium tracking-[-0.01em] text-black transition-opacity hover:opacity-55";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const menu = (
    <div
      id="site-menu"
      className={`site-menu ${open ? "is-open" : ""}`}
      aria-hidden={!open}
    >
      <div className="site-menu-top">
        <a
          href="/contact"
          className="site-menu-chrome"
          onClick={() => setOpen(false)}
        >
          Let&apos;s Talk
        </a>
        <button
          type="button"
          className="site-menu-chrome"
          onClick={() => setOpen(false)}
        >
          Close Menu
        </button>
      </div>

      <nav className="site-menu-nav" aria-label="Full menu">
        {LINKS.map((link, i) => (
          <LiquidLink
            key={link.href}
            href={link.href}
            label={link.label}
            index={i}
            open={open}
            onNavigate={() => setOpen(false)}
          />
        ))}
      </nav>

      <div className="site-menu-footer">
        <a
          href="/contact"
          className="site-menu-cta"
          onClick={() => setOpen(false)}
        >
          Start Project
        </a>
        <p className="site-menu-note">Behind the Pixels</p>
      </div>
    </div>
  );

  return (
    <>
      <header className="anim-nav absolute inset-x-0 top-0 z-20 flex items-start justify-between px-6 pt-7 sm:px-10 sm:pt-9 md:px-14 lg:px-16">
        <a href="/contact" className={chrome}>
          Let&apos;s Talk
        </a>
        <button
          type="button"
          className={`cursor-pointer border-0 bg-transparent p-0 ${chrome}`}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
        >
          Open Menu
        </button>
      </header>

      {mounted ? createPortal(menu, document.body) : null}
    </>
  );
}
