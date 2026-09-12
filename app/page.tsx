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
      <section className="hero-bg relative flex h-dvh max-h-dvh flex-col overflow-hidden">
        <HeroHeader />

        <main className="relative z-10 flex min-h-0 flex-1 flex-col items-center px-6 pb-[5.75rem] pt-14 sm:pb-24 sm:pt-16">
          <div className="mt-[min(4vh,1.5rem)] shrink-0 sm:mt-[min(5vh,2rem)]">
            <GlitchHeadline />
          </div>

          <HeroComputer />
        </main>

        <nav
          className="anim-bar absolute inset-x-0 bottom-4 z-30 mx-auto flex w-[min(92vw,360px)] items-center justify-between rounded-full border border-white/80 bg-white/80 px-3.5 py-2.5 shadow-[0_8px_36px_rgba(0,0,0,0.1)] backdrop-blur-[16px] sm:bottom-6 sm:w-[min(92vw,380px)] sm:px-4 sm:py-3"
          aria-label="Primary"
        >
          <a href="/" className="flex items-center pl-1" aria-label="Home">
            <Image
              src="/logo.svg"
              alt=""
              width={22}
              height={28}
              className="h-7 w-auto"
            />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-[14px] bg-[#1a1a1a] px-5 py-2.5 text-[14px] font-normal tracking-[-0.01em] text-white transition-colors hover:bg-black sm:px-6 sm:py-3 sm:text-[15px]"
          >
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
