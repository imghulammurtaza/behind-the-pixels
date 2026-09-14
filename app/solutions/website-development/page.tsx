import Image from "next/image";
import type { Metadata } from "next";
import { HeroHeader } from "../../components/HeroHeader";
import { SiteFooter } from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Website Development - Custom Sites That Perform",
  description:
    "Custom websites built for speed, clarity, and conversion - from marketing sites to e-commerce and CMS platforms.",
};

const CAPABILITIES = [
  {
    tag: "MARKETING",
    title: "Brand & marketing sites",
    body: "Launch-ready sites with sharp messaging, motion, and layouts that turn visitors into conversations.",
  },
  {
    tag: "COMMERCE",
    title: "E-commerce experiences",
    body: "Product-led storefronts with clean checkout flows, inventory hooks, and performance that holds under load.",
  },
  {
    tag: "PLATFORM",
    title: "CMS & content systems",
    body: "Editable foundations so your team ships pages without waiting on a developer for every change.",
  },
  {
    tag: "PRODUCT",
    title: "Custom web apps",
    body: "Feature-rich interfaces - dashboards, portals, and tools - shaped around how your users actually work.",
  },
] as const;

const PROCESS = [
  {
    step: "01",
    title: "Discover",
    text: "Goals, audience, constraints, and the outcomes the site must deliver.",
  },
  {
    step: "02",
    title: "Architect",
    text: "IA, UX flows, and a technical plan built for scale and speed.",
  },
  {
    step: "03",
    title: "Design & build",
    text: "Pixel-true UI, accessible frontends, and reliable integrations.",
  },
  {
    step: "04",
    title: "Launch & grow",
    text: "Ship, measure, iterate - with support that keeps the site sharp.",
  },
] as const;

const DELIVERABLES = [
  "Responsive UI across every breakpoint",
  "Performance-first frontend architecture",
  "SEO-ready structure and metadata",
  "CMS or headless content setup",
  "Analytics and conversion tracking",
  "Ongoing support and iteration",
] as const;

const WORK = [
  {
    title: "Brand platforms",
    image: "/project-brands.png",
    alt: "Brand platform website showcase",
  },
  {
    title: "Campaign sites",
    image: "/project-hope.png",
    alt: "Campaign website showcase",
  },
  {
    title: "Product launches",
    image: "/project-sprint.png",
    alt: "Product launch website showcase",
  },
] as const;

export default function WebsiteDevelopmentPage() {
  return (
    <>
      <section className="sol-hero hero-bg relative overflow-hidden">
        <HeroHeader tone="light" />
        <div className="sol-hero-inner">
          <p
            className="sol-kicker"
            data-reveal
            style={{ ["--reveal-delay" as string]: "80ms" }}
          >
            Solutions
          </p>
          <div
            className="sol-rule"
            data-reveal
            style={{ ["--reveal-delay" as string]: "140ms" }}
          >
            <span className="sol-rule-accent" />
            <span className="sol-rule-rest" />
          </div>
          <h1
            className="sol-title"
            data-reveal="scale"
            style={{ ["--reveal-delay" as string]: "180ms" }}
          >
            WEBSITE
            <br />
            DEVELOPMENT
          </h1>
          <p
            className="sol-lead"
            data-reveal
            style={{ ["--reveal-delay" as string]: "280ms" }}
          >
            Custom sites built for speed, clarity, and conversion - crafted to
            feel unmistakably yours.
          </p>
          <div
            className="sol-hero-actions"
            data-reveal
            style={{ ["--reveal-delay" as string]: "360ms" }}
          >
            <a href="/contact" className="sol-btn sol-btn-primary">
              Start Project
            </a>
            <a href="#work" className="sol-btn sol-btn-ghost">
              See work
            </a>
          </div>
        </div>
      </section>

      <section className="sol-showcase" aria-label="Website development showcase">
        <div className="sol-showcase-media" data-reveal="scale">
          <Image
            src="/service-dev.png"
            alt="Website development workspace and product UI"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="sol-showcase-veil" aria-hidden="true" />
        </div>
      </section>

      <section className="sol-intro">
        <div className="sol-intro-inner">
          <div className="sol-intro-copy" data-reveal="left">
            <p className="sol-label">
              <span className="sol-dot" aria-hidden="true" />
              What we build
            </p>
            <h2 className="sol-intro-heading">
              Sites that look sharp and work harder.
            </h2>
            <p className="sol-intro-text">
              We design and engineer websites as products - clear information
              architecture, intentional motion, and clean code that stays fast
              as you grow.
            </p>
            <p className="sol-intro-text">
              From first wireframe to launch day, one team owns the full path:
              UX, UI, frontend, CMS, and the integrations that keep marketing
              moving.
            </p>
          </div>
          <div
            className="sol-intro-media"
            data-reveal="right"
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            <Image
              src="/contact-mockup.png"
              alt="Browser mockup of a polished marketing website"
              fill
              sizes="(max-width: 960px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="sol-capabilities">
        <div className="sol-capabilities-inner">
          <p className="sol-section-eyebrow" data-reveal>
            Capabilities
          </p>
          <h2
            className="sol-section-title"
            data-reveal
            style={{ ["--reveal-delay" as string]: "80ms" }}
          >
            Built for how your brand shows up online
          </h2>
          <div className="sol-capabilities-grid" data-reveal-stagger data-reveal>
            {CAPABILITIES.map((item) => (
              <article key={item.tag} className="sol-capability" data-reveal-child>
                <p className="sol-capability-tag">{item.tag}</p>
                <span className="sol-capability-accent" />
                <h3 className="sol-capability-title">{item.title}</h3>
                <p className="sol-capability-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sol-process">
        <div className="sol-process-inner">
          <p className="sol-label sol-label-light" data-reveal>
            <span className="sol-dot" aria-hidden="true" />
            How we ship
          </p>
          <h2
            className="sol-process-heading"
            data-reveal
            style={{ ["--reveal-delay" as string]: "80ms" }}
          >
            A clear path from brief to live site
          </h2>
          <div className="sol-process-grid" data-reveal-stagger data-reveal>
            {PROCESS.map((item) => (
              <article key={item.step} className="sol-process-card" data-reveal-child>
                <span className="sol-process-step">{item.step}</span>
                <h3 className="sol-process-title">{item.title}</h3>
                <p className="sol-process-text">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sol-deliverables">
        <div className="sol-deliverables-inner">
          <div className="sol-deliverables-head" data-reveal>
            <p className="sol-section-eyebrow">In every build</p>
            <h2 className="sol-section-title">What you walk away with</h2>
          </div>
          <ul className="sol-deliverables-list" data-reveal-stagger data-reveal>
            {DELIVERABLES.map((item) => (
              <li key={item} className="sol-deliverable" data-reveal-child>
                <span className="sol-deliverable-mark" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sol-work" id="work">
        <div className="sol-work-inner">
          <p className="sol-label sol-label-light" data-reveal>
            <span className="sol-dot" aria-hidden="true" />
            Selected work
          </p>
          <h2
            className="sol-work-heading"
            data-reveal
            style={{ ["--reveal-delay" as string]: "80ms" }}
          >
            Sites with presence and purpose
          </h2>
          <div className="sol-work-grid" data-reveal-stagger data-reveal>
            {WORK.map((item) => (
              <article key={item.title} className="sol-work-item" data-reveal-child>
                <div className="sol-work-media">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="sol-work-title">{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sol-cta" data-reveal="scale">
        <div className="sol-cta-inner">
          <h2 className="sol-cta-heading">
            Ready to build
            <br />
            your next site?
          </h2>
          <a href="/contact" className="sol-btn sol-btn-primary sol-btn-lg">
            Start Project
          </a>
        </div>
      </section>

      <div data-reveal="fade">
        <SiteFooter />
      </div>
    </>
  );
}
