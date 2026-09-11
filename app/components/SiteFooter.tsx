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
    country: "Australia",
    address: "560 Village Blvd., Suite 120 #3, West Palm Beach, FL-33409, Australia",
  },
  {
    country: "Canada",
    address: "73 Meadway, Bramhall Stockport, Manchester - SK7 1LX, Canada",
  },
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

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.5l2.9 6.1 6.7.7-5 4.6 1.4 6.6L12 17.8 5.9 20.5 7.3 14l-5-4.6 6.7-.7L12 2.5z"
      />
    </svg>
  );
}

function Achievements() {
  return (
    <div className="footer-achievements">
      <div className="footer-badge-row">
        <div className="footer-badge footer-badge-clutch">
          <span className="footer-clutch-mark" aria-label="Clutch">
            clutch
          </span>
          <span className="footer-badge-sub">TOP 1000 COMPANIES</span>
        </div>

        <div className="footer-badge footer-badge-google">
          <svg
            className="footer-google-logo"
            viewBox="0 0 74 24"
            aria-label="Google"
          >
            {/* G */}
            <path
              fill="#4285F4"
              d="M9.24 10.5v3h5.2c-.21 1.1-.84 2.03-1.79 2.66v2.21h2.9c1.7-1.56 2.67-3.86 2.67-6.59 0-.63-.06-1.24-.17-1.83H9.24v.55z"
            />
            <path
              fill="#34A853"
              d="M9.24 18.75c2.43 0 4.47-.8 5.96-2.18l-2.9-2.21c-.8.54-1.83.86-3.06.86-2.36 0-4.36-1.59-5.07-3.73H1.14v2.27C2.63 16.96 5.66 18.75 9.24 18.75z"
            />
            <path
              fill="#FBBC05"
              d="M4.17 12c0-.72.12-1.42.34-2.07V7.66H1.14A9.7 9.7 0 0 0 0 12c0 1.56.37 3.03 1.14 4.34l3.37-2.27c-.22-.65-.34-1.35-.34-2.07z"
            />
            <path
              fill="#EA4335"
              d="M9.24 5.18c1.32 0 2.5.45 3.43 1.34l2.57-2.57C13.7 2.42 11.66 1.5 9.24 1.5 5.66 1.5 2.63 3.29 1.14 6.16l3.37 2.27c.71-2.14 2.71-3.25 4.73-3.25z"
            />
            {/* o */}
            <path
              fill="#EA4335"
              d="M27.6 8.55c-2.55 0-4.62 1.97-4.62 4.58s2.07 4.58 4.62 4.58 4.62-1.97 4.62-4.58-2.07-4.58-4.62-4.58zm0 7.35c-1.42 0-2.58-1.22-2.58-2.77s1.16-2.77 2.58-2.77 2.58 1.22 2.58 2.77-1.16 2.77-2.58 2.77z"
            />
            {/* o */}
            <path
              fill="#FBBC05"
              d="M38.95 8.55c-2.55 0-4.62 1.97-4.62 4.58s2.07 4.58 4.62 4.58 4.62-1.97 4.62-4.58-2.07-4.58-4.62-4.58zm0 7.35c-1.42 0-2.58-1.22-2.58-2.77s1.16-2.77 2.58-2.77 2.58 1.22 2.58 2.77-1.16 2.77-2.58 2.77z"
            />
            {/* g */}
            <path
              fill="#4285F4"
              d="M51.05 8.4v8.55c0 3.52-2.07 4.96-4.52 4.96-2.3 0-3.69-1.55-4.21-2.82l1.82-.76c.32.76 1.1 1.65 2.39 1.65 1.57 0 2.54-.98 2.54-2.82v-.7h-.05c-.48.59-1.41 1.11-2.58 1.11-2.45 0-4.69-2.14-4.69-4.9s2.24-4.9 4.69-4.9c1.17 0 2.1.52 2.58 1.11h.05V8.4h1.98zm-1.98 4.73c0-1.55-1.3-2.77-2.76-2.77s-2.82 1.22-2.82 2.77 1.36 2.77 2.82 2.77 2.76-1.22 2.76-2.77z"
            />
            {/* l */}
            <path fill="#34A853" d="M54.35 2.1v15.6h2.05V2.1h-2.05z" />
            {/* e */}
            <path
              fill="#EA4335"
              d="M66.45 11.35l1.6 1.07c-.66.98-2.25 2.66-4.98 2.66-3.01 0-5.48-2.45-5.48-5.5s2.5-5.55 5.58-5.55c3.12 0 4.64 2.48 5.14 3.82l.28.7-8.03 3.33c.61 1.2 1.57 1.85 2.92 1.85 1.35 0 2.29-.66 3.0-1.38zm-6.23-1.55 5.35-2.21c-.3-.75-1.2-1.27-2.25-1.27-1.35 0-2.88 1.2-3.1 3.48z"
            />
          </svg>
          <span className="footer-badge-sub">5 Star Customer Rating</span>
        </div>
      </div>

      <div className="footer-stars-bar" aria-label="5 star rating">
        <StarIcon className="footer-star-icon" />
        <span className="footer-stars-track">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} />
          ))}
        </span>
      </div>
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
                            ? "/#testimonials"
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
            <a href="mailto:info@strugbits.com" className="footer-contact-line">
              info@strugbits.com
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            Copyright © 2026 Strugbits. All rights reserved
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
      </div>
    </footer>
  );
}
