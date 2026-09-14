"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const SERVICES = [
  {
    tag: "FOUNDATION",
    index: "/01",
    title: "Brand Identity",
    image: null,
    video: "/OtherAssets/BrandIdentityVideo.mp4",
    face: null,
    descriptionLines: [
      "The foundation of every project -",
      "how your brand looks, feels, and communicates.",
    ],
    items: [
      "Positioning and messaging frameworks",
      "Visual identity systems",
      "Brand guidelines for consistent use",
      "Digital-first brand systems",
      "Branded assets across campaigns and touchpoints",
    ],
  },
  {
    tag: "GROWTH",
    index: "/02",
    title: "Strategy",
    image: null,
    video: "/OtherAssets/StretgyVideo.mp4",
    face: null,
    descriptionLines: [
      "Clear direction backed by insight and planning",
      "to move from idea to execution.",
    ],
    items: [
      "Market and audience research",
      "Product and campaign strategy",
      "User journey mapping",
      "Go-to-market planning",
      "Measurement and iteration frameworks",
    ],
  },
  {
    tag: "CREATIVE",
    index: "/03",
    title: "Design & Innovation",
    image: null,
    video: "/OtherAssets/DesignVideo.mp4",
    face: null,
    descriptionLines: [
      "From first concepts to polished products that",
      "people want to use and share.",
    ],
    items: [
      "UX and UI design",
      "Prototyping and user testing",
      "Digital product and service design",
      "Iteration and validation",
      "Launch planning and support",
    ],
  },
  {
    tag: "SMART AI",
    index: "/04",
    title: "AI Systems",
    image: "/OtherAssets/Aisystemimage.jpg",
    video: null,
    face: null,
    descriptionLines: [
      "Practical applications of AI to unlock",
      "smarter products and workflows.",
    ],
    items: [
      "Define AI vision and roadmap",
      "Intelligent experience design",
      "Model selection and integration",
      "Automation and agent workflows",
      "Responsible AI guidelines",
    ],
  },
  {
    tag: "DISCOVERABLE",
    index: "/05",
    title: "SEO",
    image: null,
    video: "/OtherAssets/SEOVideo.mp4",
    face: null,
    descriptionLines: [
      "Make your brand findable - structure, content,",
      "and signals that earn attention.",
    ],
    items: [
      "Technical SEO audits",
      "Keyword and content strategy",
      "On-page optimisation",
      "Authority and link building",
      "Analytics and reporting",
    ],
  },
  {
    tag: "BUILD",
    index: "/06",
    title: "Development",
    image: null,
    video: "/OtherAssets/DevelopmentVideo.mp4",
    face: null,
    descriptionLines: [
      "Turning ideas and designs into scalable,",
      "functional, and reliable digital products.",
    ],
    items: [
      "Web and app development",
      "CMS integration and setup",
      "E-commerce builds and optimisation",
      "Custom feature development",
      "Ongoing technical support",
    ],
  },
] as const;

const SUBTITLE = "WHAT WE DO BEST, AND WHAT YOUR NEXT PROJECT NEEDS MOST.";

export function ServicesSection() {
  const last = SERVICES.length - 1;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const section = sectionRef.current;
    if (!title || !section) return;

    const blurs = section.querySelectorAll<HTMLElement>(".service-card-blur-copy");

    const sync = () => {
      const titleRect = title.getBoundingClientRect();
      const titleStyle = window.getComputedStyle(title);

      blurs.forEach((blur) => {
        const frost = blur.parentElement;
        if (!frost) return;
        const frostRect = frost.getBoundingClientRect();

        blur.style.top = `${titleRect.top - frostRect.top}px`;
        blur.style.left = `${titleRect.left - frostRect.left}px`;
        blur.style.width = `${titleRect.width}px`;
        blur.style.height = `${titleRect.height}px`;
        blur.style.fontSize = titleStyle.fontSize;
        blur.style.letterSpacing = titleStyle.letterSpacing;
        blur.style.lineHeight = titleStyle.lineHeight;
        blur.style.fontWeight = titleStyle.fontWeight;
      });
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="services-section relative bg-[#f2f1ed] text-black"
    >
      <div className="relative w-full">
        <div className="services-sticky-head sticky top-0 z-0 pt-1 pb-3 sm:pt-2 sm:pb-4">
          <div className="services-title-block">
            <h2 ref={titleRef} className="services-title">
              SERVICES
            </h2>
            <p className="services-subtitle">{SUBTITLE}</p>
          </div>
        </div>

        {SERVICES.map((service, index) => (
          <article
            key={service.index}
            className="service-card service-card-stack sticky z-10"
            style={{
              top: 0,
              zIndex: 20 + index,
              marginBottom: index === last ? "0" : "40vh",
            }}
          >
            {/* Top frost overlay: soft wash + local blur over card content */}
            <div className="service-card-frost" aria-hidden="true">
              <p className="service-card-blur-copy">SERVICES</p>
            </div>

            <div className="service-card-body">
              <div className="service-card-meta">
                <div>
                  <p className="service-tag">{service.tag}</p>
                  <span className="service-accent" />
                </div>
                <span className="service-index">{service.index}</span>
              </div>

              <h3 className="service-card-title">
                {service.title === "Development" ? (
                  <a
                    href="/solutions/website-development"
                    className="service-card-link"
                  >
                    {service.title}
                  </a>
                ) : (
                  service.title
                )}
              </h3>

              <div className="service-card-grid">
                <div className="service-card-left">
                  <div className="service-card-image">
                    {service.video ? (
                      <video
                        className="service-card-video"
                        src={service.video}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                      />
                    ) : (
                      <Image
                        src={service.image!}
                        alt=""
                        fill
                        sizes="280px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <p className="service-card-desc">
                    {service.descriptionLines.map((line) => (
                      <span key={line} className="service-card-desc-line">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>

                <ul className="service-card-list">
                  {service.items.map((item) => (
                    <li key={item}>
                      <span className="service-plus" aria-hidden="true">
                        +
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
