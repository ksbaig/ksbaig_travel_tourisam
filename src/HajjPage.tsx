import { useState, type FormEvent } from "react";
import { contactUrl, showSection } from "./site";

const cities = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Faisalabad",
  "Sialkot",
];
const packageTypes = ["Economy", "Comfort", "Premium", "Custom group"];
const packages = [
  [
    "Economy Hajj planning",
    "Practical accommodation and transport options shaped around your group and budget.",
  ],
  [
    "Comfort Hajj planning",
    "A balanced plan with additional comfort, clearer logistics and support throughout the journey.",
  ],
  [
    "Premium Hajj planning",
    "Discuss preferred accommodation, transfers and a more tailored itinerary for your family or group.",
  ],
];
const steps = [
  [
    "01",
    "Share your requirements",
    "Tell KSB your departure city, group size, preferred dates and the level of support you need.",
  ],
  [
    "02",
    "Review the details",
    "We help you understand the proposed itinerary, inclusions, documents and current requirements.",
  ],
  [
    "03",
    "Prepare with confidence",
    "Keep your written confirmation and follow the latest official Hajj instructions before departure.",
  ],
];
const faqs = [
  [
    "How do I request a Hajj package from Pakistan?",
    "Choose your departure city and package preference, then prepare an enquiry. KSB will confirm the current route, availability, eligibility and next steps.",
  ],
  [
    "Are Hajj prices shown on this page?",
    "No. Hajj costs depend on the official scheme, dates, flights, accommodation, transport and group arrangements. Request a current written quotation.",
  ],
  [
    "What documents will I need?",
    "Requirements can change and depend on the official Hajj process. Keep passports and identity documents ready, and confirm the latest instructions with official authorities and KSB.",
  ],
  [
    "Can families or groups request a plan?",
    "Yes. Share the number of adults, children, room preferences and any mobility or support needs so the team can discuss suitable arrangements.",
  ],
  [
    "Does this page submit a Hajj application?",
    "No. This page only prepares a local enquiry summary. It does not submit an application, reserve a place, process payment or guarantee a visa.",
  ],
];

export default function HajjPage() {
  const [city, setCity] = useState("Lahore");
  const [packageType, setPackageType] = useState("Economy");
  const [travellers, setTravellers] = useState("2");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = mobile.replace(/\D/g, "");
    if (name.trim().length < 2) {
      setError("Enter your name.");
      return;
    }
    if (digits.length < 10 || digits.length > 15) {
      setError("Enter a mobile number with 10 to 15 digits.");
      return;
    }
    setError("");
    setSummary(
      `${name.trim()} asked KSB Travel and Tourism about a ${packageType.toLowerCase()} Hajj plan from ${city} for ${travellers} traveller${travellers === "1" ? "" : "s"}.${notes.trim() ? ` Note: ${notes.trim()}` : ""} This summary is saved on this page only and has not been submitted.`,
    );
    showSection("hajj-enquiry");
  }

  return (
    <main className="hajj-page">
      <section className="hajj-hero" aria-labelledby="hajj-title">
        <div className="hajj-hero-glow" aria-hidden="true" />
        <div className="container hajj-hero-content">
          <a className="hajj-back" href="#home">
            ← Back to KSB home
          </a>
          <p className="section-kicker">KSB TRAVEL AND TOURISM</p>
          <h1 id="hajj-title">Hajj packages from Pakistan</h1>
          <p>
            A sacred journey, thoughtfully planned with clear guidance and personal support from
            KSB.
          </p>
          <button className="button" onClick={() => showSection("hajj-enquiry")} type="button">
            Plan your Hajj <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <section className="container hajj-finder" aria-labelledby="hajj-finder-title">
        <div>
          <p className="section-kicker">START YOUR ENQUIRY</p>
          <h2 id="hajj-finder-title">Tell us how you would like to travel</h2>
          <p>
            Choose your departure city and a starting package style. KSB will confirm current
            availability, official requirements and a written itinerary.
          </p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            showSection("hajj-packages");
          }}
        >
          <label>
            Departure city
            <select onChange={(event) => setCity(event.target.value)} value={city}>
              {cities.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Package preference
            <select onChange={(event) => setPackageType(event.target.value)} value={packageType}>
              {packageTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Travellers
            <select onChange={(event) => setTravellers(event.target.value)} value={travellers}>
              {["1", "2", "3", "4", "5+"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <button className="button" type="submit">
            Explore options
          </button>
        </form>
      </section>

      <section
        className="container hajj-packages"
        id="hajj-packages"
        aria-labelledby="hajj-packages-title"
        tabIndex={-1}
      >
        <div className="hajj-heading">
          <div>
            <p className="section-kicker">PACKAGES TO DISCUSS</p>
            <h2 id="hajj-packages-title">Choose a starting point</h2>
          </div>
          <p>
            Final prices, dates and inclusions are confirmed after KSB checks the current official
            process and supplier availability.
          </p>
        </div>
        <div className="hajj-package-grid">
          {packages.map(([title, text], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <button
                onClick={() => {
                  setPackageType(index === 0 ? "Economy" : index === 1 ? "Comfort" : "Premium");
                  showSection("hajj-enquiry");
                }}
                type="button"
              >
                Ask about this option <span aria-hidden="true">↗</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="hajj-band" aria-labelledby="hajj-steps-title">
        <div className="container">
          <p className="section-kicker">A CLEARER WAY TO PREPARE</p>
          <h2 id="hajj-steps-title">From first question to your journey</h2>
          <div className="hajj-steps">
            {steps.map(([number, title, text]) => (
              <article key={number}>
                <strong>{number}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container hajj-faq" aria-labelledby="hajj-faq-title">
        <p className="section-kicker">COMMON QUESTIONS</p>
        <h2 id="hajj-faq-title">Hajj planning, explained</h2>
        {faqs.map(([question, answer], index) => (
          <details
            key={question}
            onToggle={(event) => {
              if (event.currentTarget.open) setOpenFaq(index);
            }}
            open={openFaq === index}
          >
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>

      <section
        className="container hajj-enquiry"
        id="hajj-enquiry"
        aria-labelledby="hajj-enquiry-title"
        tabIndex={-1}
      >
        <div>
          <p className="section-kicker">KSB TRAVEL AND TOURISM</p>
          <h2 id="hajj-enquiry-title">Request Hajj guidance</h2>
          <p>
            Share your details and KSB will help you understand the current options. This page does
            not make a booking or submit an application.
          </p>
        </div>
        <form onSubmit={prepareEnquiry}>
          <label>
            Your name
            <input onChange={(event) => setName(event.target.value)} required value={name} />
          </label>
          <label>
            Mobile number
            <input
              inputMode="tel"
              onChange={(event) => setMobile(event.target.value)}
              placeholder="+92 300 0000000"
              required
              value={mobile}
            />
          </label>
          <label>
            Departure city
            <select onChange={(event) => setCity(event.target.value)} value={city}>
              {cities.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Package preference
            <select onChange={(event) => setPackageType(event.target.value)} value={packageType}>
              {packageTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="hajj-notes">
            Anything we should know
            <textarea onChange={(event) => setNotes(event.target.value)} value={notes} />
          </label>
          <button className="button" type="submit">
            Prepare enquiry
          </button>
          {error ? <p className="hajj-error">{error}</p> : null}
          {summary ? (
            <div className="hajj-summary">
              <p>{summary}</p>
              <a className="button" href={contactUrl} rel="noreferrer" target="_blank">
                Continue to KSB contact
              </a>
            </div>
          ) : null}
        </form>
      </section>
    </main>
  );
}
