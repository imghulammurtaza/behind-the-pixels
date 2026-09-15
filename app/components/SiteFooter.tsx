import { FooterLogoLiquid } from "./FooterLogoLiquid";

const COMPANY = ["About us", "Testimonials", "Contacts", "Process"] as const;

const SOLUTIONS = [
  { label: "Website Development", href: "/solutions/website-development" },
  { label: "AI Development", href: "#" },
  { label: "Social Media Design", href: "#" },
  { label: "Ad Campaigns", href: "#" },
] as const;

const RESOURCES = ["Blogs", "Work"] as const;

const CASE_STUDIES = [
  "Websites",
  "Mobile Apps",
  "AI Development",
  "Agents",
] as const;

const LOCATIONS = [
  {
    country: "USA",
    address: "560 Village Blvd., Suite 120 #3, West Palm Beach, FL-33409, United States",
  },
  {
    country: "UK",
    address: "73 Meadway, Bramhall Stockport, Manchester - SK7 1LX, United Kingdom",
  },
] as const;

const SOCIALS = [
  "Facebook",
  "Instagram",
  "LinkedIn",
  "X",
  "Youtube",
] as const;

function ShowMore() {
  return (
    <button type="button" className="footer-show-more">
      Show more
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <path
          d="M3 4.5 L6 7.5 L9 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

function Achievements() {
  return (
    <div className="footer-achievements">
      <img
        src="/OtherAssets/ClutchandGoogle.png"
        alt="Clutch Top 1000 Companies and Google 5 Star Customer Rating"
        className="footer-clutch-google"
      />
      <img
        src="/OtherAssets/Trustpilot.png"
        alt="Trustpilot rating"
        className="footer-trustpilot"
      />
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div className="site-footer-inner">
        <div className="footer-top">
          <div className="footer-col">
            <p className="footer-col-title">Achievements</p>
            <Achievements />
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Company</p>
            <ul className="footer-links">
              {COMPANY.map((item) => (
                <li key={item}>
                  <a
                    href={
                      item === "About us"
                        ? "/about"
                        : item === "Contacts"
                          ? "/contact"
                          : item === "Testimonials"
                            ? "/testimonials"
                            : item === "Process"
                              ? "/process"
                              : "/#"
                    }
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Solutions</p>
            <ul className="footer-links">
              {SOLUTIONS.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <ShowMore />
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Resources</p>
            <ul className="footer-links">
              {RESOURCES.map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Case study</p>
            <ul className="footer-links">
              {CASE_STUDIES.map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
            <ShowMore />
          </div>
        </div>

        <div className="footer-block">
          <p className="footer-block-label">
            <span className="footer-dot" aria-hidden="true" />
            Locations
          </p>
          <div className="footer-locations">
            {LOCATIONS.map((loc) => (
              <div key={loc.country} className="footer-location">
                <p className="footer-country">{loc.country}</p>
                <p className="footer-address">{loc.address}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-block">
          <p className="footer-block-label">
            <span className="footer-dot" aria-hidden="true" />
            Contact
          </p>
          <div className="footer-contact-lines">
            <a href="tel:8660002000" className="footer-contact-line">
              866-***-2**0
            </a>
            <a href="mailto:info@piermont.com" className="footer-contact-line">
              info@piermont.com
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            Copyright © 2026 Piermont. All rights reserved
          </p>
          <div className="footer-socials">
            <span className="footer-socials-label">Socials:</span>
            {SOCIALS.map((name) => (
              <a key={name} href="#">
                {name}
              </a>
            ))}
          </div>
        </div>

        <FooterLogoLiquid />
      </div>
    </footer>
  );
}
