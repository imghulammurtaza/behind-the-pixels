"use client";

import Image from "next/image";

const SERVICES = [
  {
    tag: "FOUNDATION",
    index: "/01",
    title: "Brand Identity",
    image: "/service-brand.png",
    description:
      "The foundation of every project — how your brand looks, feels, and communicates.",
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
    image: "/service-strategy.png",
    description:
      "Clear direction backed by insight and planning to move from idea to execution.",
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
    image: "/service-design.png",
    description:
      "From first concepts to polished products that people want to use and share.",
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
    image: "/service-ai.png",
    description:
      "Practical applications of AI to unlock smarter products and workflows.",
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
    image: "/service-seo.png",
    description:
      "Make your brand findable — structure, content, and signals that earn attention.",
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
    image: "/service-dev.png",
    description:
      "Turning ideas and designs into scalable, functional, and reliable digital products.",
    items: [
      "Web and app development",
      "CMS integration and setup",
      "E-commerce builds and optimisation",
      "Custom feature development",
      "Ongoing technical support",
    ],
  },
] as const;

export function ServicesSection() {
  const last = SERVICES.length - 1;

  return (
    <section
      id="services"
      className="services-section relative bg-[#f2f1ed] text-black"
    >
      {/* One containing block so SERVICES + last card unstick and rise together */}
      <div className="relative w-full">
        <div className="services-sticky-head sticky top-0 z-0 pt-6 pb-6 text-center sm:pt-8 sm:pb-8">
          <h2 className="services-title" data-reveal="scale">
            SERVICES
          </h2>
          <p
            className="services-subtitle mt-3 px-5 sm:px-8"
            data-reveal
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            WHAT WE DO BEST, AND WHAT YOUR NEXT PROJECT NEEDS MOST.
          </p>
        </div>

        {SERVICES.map((service, index) => (
          <article
            key={service.index}
            className="service-card service-card-stack sticky z-10"
            style={{
              top: "0px",
              zIndex: 20 + index,
              marginBottom: index === last ? "0" : "40vh",
            }}
          >
            <div className="service-card-glass">
              <div className="service-card-meta">
                <div>
                  <p className="service-tag">{service.tag}</p>
                  <span className="service-accent" />
                </div>
                <span className="service-index">{service.index}</span>
              </div>
            </div>

            <div className="service-card-body">
              <h3 className="service-card-title">
                {service.title === "Development" ? (
                  <a href="/solutions/website-development" className="service-card-link">
                    {service.title}
                  </a>
                ) : (
                  service.title
                )}
              </h3>

              <div className="service-card-grid">
                <div className="service-card-left">
                  <div className="service-card-image">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                  </div>
                  <p className="service-card-desc">{service.description}</p>
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
