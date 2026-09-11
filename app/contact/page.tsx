import type { Metadata } from "next";
import { ContactSection } from "../components/ContactSection";
import { HeroHeader } from "../components/HeroHeader";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact — Behind the Pixels",
  description:
    "Fill the form to request a quote. Let’s strategize, build, and promote your next project.",
};

const DETAILS = [
  {
    label: "Email",
    value: "info@strugbits.com",
    href: "mailto:info@strugbits.com",
  },
  {
    label: "Phone",
    value: "866-***-2**0",
    href: "tel:8660002000",
  },
  {
    label: "Hours",
    value: "Mon–Fri, 9am–6pm",
    href: null,
  },
] as const;

const OFFICES = [
  {
    country: "USA",
    address: "560 Village Blvd., Suite 120 #3, West Palm Beach, FL-33409",
  },
  {
    country: "UK",
    address: "73 Meadway, Bramhall Stockport, Manchester - SK7 1LX",
  },
  {
    country: "Canada",
    address: "73 Meadway, Bramhall Stockport, Manchester - SK7 1LX",
  },
  {
    country: "Australia",
    address: "560 Village Blvd., Suite 120 #3, West Palm Beach, FL-33409",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <div className="relative">
        <HeroHeader tone="dark" />
        <ContactSection />
      </div>

      <section className="contact-page-details">
        <div className="contact-page-details-inner">
          <div data-reveal>
            <p className="contact-page-eyebrow">
              <span className="about-dot" aria-hidden="true" />
              Direct lines
            </p>
            <h2 className="contact-page-heading">Talk to the studio</h2>
          </div>

          <div
            className="contact-page-channels"
            data-reveal-stagger
            data-reveal
          >
            {DETAILS.map((item) => (
              <div key={item.label} className="contact-page-channel" data-reveal-child>
                <p className="contact-page-channel-label">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="contact-page-channel-value">
                    {item.value}
                  </a>
                ) : (
                  <p className="contact-page-channel-value">{item.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="contact-page-offices" data-reveal>
            <p className="contact-page-eyebrow">
              <span className="about-dot" aria-hidden="true" />
              Locations
            </p>
            <div className="contact-page-office-grid" data-reveal-stagger data-reveal>
              {OFFICES.map((office) => (
                <article key={office.country} className="contact-page-office" data-reveal-child>
                  <h3 className="contact-page-office-country">{office.country}</h3>
                  <p className="contact-page-office-address">{office.address}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div data-reveal="fade">
        <SiteFooter />
      </div>
    </>
  );
}
