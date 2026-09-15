import Image from "next/image";
import { ContactSection } from "./components/ContactSection";
import { GlitchHeadline } from "./components/GlitchHeadline";
import { HeroComputer } from "./components/HeroComputer";
import { HeroHeader } from "./components/HeroHeader";
import { HomeVideo } from "./components/HomeVideo";
import { ProjectsSection } from "./components/ProjectsSection";
import { ServicesSection } from "./components/ServicesSection";
import { SiteFooter } from "./components/SiteFooter";
import { StoriesSection } from "./components/StoriesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <section className="hero-bg relative flex h-[90dvh] max-h-[102dvh] flex-col overflow-hidden">
        <HeroHeader />

        <main className="hero-main relative z-10 flex min-h-0 flex-1 flex-col items-center px-5 sm:px-8">
          <div className="hero-headline-wrap shrink-0">
            <GlitchHeadline />
          </div>

          <div className="hero-computer-wrap">
            <HeroComputer />
          </div>
        </main>

        <nav className="anim-bar hero-cta-bar" aria-label="Primary">
          <a href="/" className="hero-cta-logo" aria-label="Home">
            <Image
              src="/MainLogo.png"
              alt=""
              width={140}
              height={58}
              priority
              className="hero-cta-logo-img"
            />
          </a>
          <a href="#projects" className="hero-cta-btn">
            Start Project
          </a>
        </nav>
      </section>

      <HomeVideo />

      <ProjectsSection />
      <div data-reveal="scale">
        <StoriesSection />
      </div>
      <ServicesSection />
      <div data-reveal="fade">
        <TestimonialsSection />
      </div>
      <ContactSection />
      <div data-reveal="fade">
        <SiteFooter />
      </div>
    </>
  );
}
