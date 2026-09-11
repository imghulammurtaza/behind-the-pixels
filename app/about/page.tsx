import Image from "next/image";
import type { Metadata } from "next";
import { HeroHeader } from "../components/HeroHeader";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "About — Behind the Pixels",
  description:
    "We strategize, build, and promote brands with clarity, craft, and conviction.",
};

const VALUES = [
  {
    tag: "CLARITY",
    title: "Strategy first",
    body: "Every project starts with positioning, audience, and a sharp point of view — before pixels or campaigns.",
  },
  {
    tag: "CRAFT",
    title: "Design with intent",
    body: "Interfaces, identities, and systems that feel inevitable: considered, usable, and built to last.",
  },
  {
    tag: "MOMENTUM",
    title: "Promote with precision",
    body: "Launch, iterate, and amplify — so the work doesn’t stop at the handoff, it keeps performing.",
  },
  {
    tag: "PARTNERSHIP",
    title: "Built beside you",
    body: "We operate as an extension of your team: transparent process, direct communication, shared ownership.",
  },
] as const;

const PROCESS = [
  { step: "01", title: "Discover", text: "Goals, constraints, audience, and the real problem to solve." },
  { step: "02", title: "Define", text: "Positioning, narrative, and the system that will carry the brand." },
  { step: "03", title: "Design", text: "Identity, product, and experience — crafted for clarity and delight." },
  { step: "04", title: "Deliver", text: "Build, launch, and grow with measurement baked into the plan." },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="about-hero hero-bg relative overflow-hidden">
        <HeroHeader tone="light" />
        <div className="about-hero-inner">
          <p className="about-kicker" data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
            Studio
          </p>
          <div className="about-rule" data-reveal style={{ ["--reveal-delay" as string]: "140ms" }}>
            <span className="about-rule-accent" />
            <span className="about-rule-rest" />
          </div>
          <h1 className="about-title" data-reveal="scale" style={{ ["--reveal-delay" as string]: "180ms" }}>
            ABOUT
          </h1>
          <p className="about-lead" data-reveal style={{ ["--reveal-delay" as string]: "280ms" }}>
            Behind the pixels — we strategize, build, and promote brands that
            feel clear, human, and hard to ignore.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="about-story-inner">
          <div className="about-story-copy" data-reveal="left">
            <p className="about-label">
              <span className="about-dot" aria-hidden="true" />
              Who we are
            </p>
            <h2 className="about-story-heading">
              A studio for brands that want more than decoration.
            </h2>
            <p className="about-story-text">
              We sit at the intersection of strategy, design, and growth. That
              means identity systems that scale, digital products people want to
              use, and campaigns that actually move the needle — not just look
              good in a deck.
            </p>
            <p className="about-story-text">
              From first conversations to launch and beyond, we stay close to the
              work: sharp briefs, honest feedback, and craft you can feel in
              every detail.
            </p>
          </div>
          <div className="about-story-media" data-reveal="right" style={{ ["--reveal-delay" as string]: "120ms" }}>
            <Image
              src="/about-studio.png"
              alt="Creative studio workspace"
              fill
              sizes="(max-width: 960px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="about-values-inner">
          <p className="about-section-eyebrow" data-reveal>
            What guides us
          </p>
          <h2 className="about-section-title" data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
            Principles we build on
          </h2>
          <div className="about-values-grid" data-reveal-stagger data-reveal>
            {VALUES.map((item) => (
              <article key={item.tag} className="about-value" data-reveal-child>
                <p className="about-value-tag">{item.tag}</p>
                <span className="about-value-accent" />
                <h3 className="about-value-title">{item.title}</h3>
                <p className="about-value-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-process">
        <div className="about-process-inner">
          <p className="about-label about-label-light" data-reveal>
            <span className="about-dot" aria-hidden="true" />
            How we work
          </p>
          <h2 className="about-process-heading" data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
            From idea to impact
          </h2>
          <div className="about-process-grid" data-reveal-stagger data-reveal>
            {PROCESS.map((item) => (
              <article key={item.step} className="about-process-card" data-reveal-child>
                <span className="about-process-step">{item.step}</span>
                <h3 className="about-process-title">{item.title}</h3>
                <p className="about-process-text">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta" data-reveal="scale">
        <div className="about-cta-inner">
          <h2 className="about-cta-heading">
            Ready to get
            <br />
            started?
          </h2>
          <a href="/contact" className="about-cta-button">
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
