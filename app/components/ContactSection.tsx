"use client";

import Image from "next/image";
import { useState } from "react";

const SERVICE_OPTIONS = [
  "Brand Strategy",
  "Brand Identity",
  "User Experience Design",
  "Visual Content",
  "Web Development",
  "eCommerce",
  "Web & Mobile Applications",
  "Embedded & Hardware",
] as const;

const BUDGETS = ["$2,000", "$4,000", "$8,000", "$16,000+"] as const;

export function ContactSection() {
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<(typeof BUDGETS)[number] | null>(null);

  const toggleService = (label: string) => {
    setServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label],
    );
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contact">
      <div className="contact-bg-title" aria-hidden="true" data-reveal="scale">
        CONTACT
      </div>

      <div className="contact-inner">
        <div className="contact-form-label" data-reveal>
          <p>Form</p>
          <div className="contact-form-rule">
            <span className="contact-form-rule-accent" />
            <span className="contact-form-rule-rest" />
          </div>
        </div>

        <div className="contact-grid">
          <div className="contact-left" data-reveal="left">
            <h2 className="contact-heading">
              Ready to get
              <br />
              started?
            </h2>
            <div className="contact-mockup">
              <Image
                src="/contact-mockup.png"
                alt=""
                fill
                sizes="(max-width: 1024px) 90vw, 48vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          <form
            className="contact-form"
            data-reveal="right"
            style={{ ["--reveal-delay" as string]: "100ms" }}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <p className="contact-form-intro">
              FILL THE FORM TO REQUEST A QUOTE:
            </p>

            <div className="contact-row-2">
              <label className="contact-field">
                <span className="sr-only">Your Name</span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name *"
                  autoComplete="name"
                />
              </label>
              <label className="contact-field">
                <span className="sr-only">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email *"
                  autoComplete="email"
                />
              </label>
            </div>

            <label className="contact-field">
              <span className="sr-only">Phone</span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone (Optional)"
                autoComplete="tel"
              />
            </label>

            <label className="contact-field contact-field-area">
              <span className="sr-only">Tell us about your project</span>
              <textarea
                name="project"
                required
                rows={5}
                placeholder="Tell us about your project *"
              />
            </label>

            <fieldset className="contact-fieldset">
              <legend>SERVICES ARE INTERESTED IN</legend>
              <div className="contact-services">
                {SERVICE_OPTIONS.map((label) => {
                  const checked = services.includes(label);
                  return (
                    <label
                      key={label}
                      className={`contact-check ${checked ? "is-on" : ""}`}
                    >
                      <input
                        type="checkbox"
                        name="services"
                        value={label}
                        checked={checked}
                        onChange={() => toggleService(label)}
                      />
                      <span className="contact-check-dot" aria-hidden="true" />
                      <span>{label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="contact-fieldset">
              <legend>YOUR BUDGET</legend>
              <div className="contact-budgets">
                {BUDGETS.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className={`contact-budget ${budget === amount ? "is-on" : ""}`}
                    onClick={() => setBudget(amount)}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </fieldset>

            <button type="submit" className="contact-submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
