"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    // Reset when navigating between pages so animations can replay
    for (const el of nodes) {
      el.classList.remove("is-revealed");
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const el of nodes) el.classList.add("is-revealed");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          target.classList.add("is-revealed");
          io.unobserve(target);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    // Small delay so first paint applies hidden state before observe
    const id = window.requestAnimationFrame(() => {
      for (const el of nodes) io.observe(el);
    });

    return () => {
      window.cancelAnimationFrame(id);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
