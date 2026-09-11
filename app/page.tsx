import Image from "next/image";
import { ContactSection } from "./components/ContactSection";
import { GlitchHeadline } from "./components/GlitchHeadline";
import { HeroHeader } from "./components/HeroHeader";
import { ProjectsSection } from "./components/ProjectsSection";
import { ServicesSection } from "./components/ServicesSection";
import { SiteFooter } from "./components/SiteFooter";
import { StoriesSection } from "./components/StoriesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <section className="hero-bg relative flex min-h-dvh flex-col">
        <HeroHeader />

        <main className="relative z-10 flex flex-1 flex-col items-center px-6 pb-32 pt-[4.75rem] sm:pt-24 md:pt-28">
          <GlitchHeadline />

          <button
            type="button"
            aria-label="Click me"
            className="anim-computer group relative mt-3 w-full max-w-[min(78vw,420px)] cursor-pointer border-0 bg-transparent p-0 sm:mt-5 sm:max-w-[min(92vw,580px)] md:mt-6"
          >
            <Image
              src="/retro-computer.png"
              alt="Vintage computer showing Behind the Pixels"
              width={729}
              height={676}
              priority
              className="h-auto w-full drop-shadow-[0_24px_48px_rgba(70,50,30,0.16)] transition-transform duration-500 group-hover:scale-[1.015] group-active:scale-[0.99]"
            />
          </button>
        </main>

        <nav
          className="anim-bar absolute inset-x-0 bottom-5 z-30 mx-auto flex w-[min(92vw,360px)] items-center justify-between rounded-full border border-white/80 bg-white/80 px-3.5 py-2.5 shadow-[0_8px_36px_rgba(0,0,0,0.1)] backdrop-blur-[16px] sm:bottom-7 sm:w-[min(92vw,380px)] sm:px-4 sm:py-3"
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
            className="inline-flex items-center justify-center rounded-[14px] bg-[#1a1a1a] px-5 py-2.5 text-[14px] font-medium tracking-[-0.01em] text-white transition-colors hover:bg-black sm:px-6 sm:py-3 sm:text-[15px]"
          >
            Start Project
          </a>
        </nav>
      </section>

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
