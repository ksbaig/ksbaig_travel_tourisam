import { useState, type FormEvent } from "react";
import { contactUrl, showSection } from "./site";

const destinations = [
  "Worldwide",
  "Schengen Europe",
  "United Kingdom",
  "United Arab Emirates",
  "Saudi Arabia",
];
const insuranceTypes = ["Single trip", "Annual multi-trip", "Student travel", "Family travel"];
const benefits = [
  [
    "Medical support abroad",
    "Ask about cover for eligible emergency medical treatment and assistance while travelling.",
  ],
  [
    "Trip disruption guidance",
    "Understand the policy terms for delays, cancellations and missed connections before you travel.",
  ],
  [
    "Visa documentation",
    "KSB can help you discuss the insurance document requirements for a visa application.",
  ],
  [
    "Support before departure",
    "Compare the destination, dates and traveller details with a member of the KSB team.",
  ],
];
const faqs = [
  [
    "What does travel insurance cover?",
    "Cover varies by policy. It can include eligible emergency medical expenses, assistance, baggage and trip disruption, subject to limits, exclusions and the policy wording.",
  ],
  [
    "Do I need insurance for a Schengen visa?",
    "Schengen applications commonly require travel medical insurance that meets the destination authority's conditions. Confirm the latest requirement with the relevant consulate.",
  ],
  [
    "Can I buy a policy on this page?",
    "No. This page prepares an enquiry only. KSB confirms the current insurer, premium, eligibility and policy wording before any purchase.",
  ],
  [
    "When should I arrange insurance?",
    "Arrange it before departure and before submitting any application that requires proof of cover. The dates and destination must match your journey.",
  ],
];

export default function InsurancePage() {
  const [destination, setDestination] = useState("");
  const [insuranceType, setInsuranceType] = useState("Single trip");
  const [travelDate, setTravelDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState("1");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
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
    if (!destination) {
      setError("Choose a destination.");
      return;
    }
    if (travelDate && returnDate && returnDate < travelDate) {
      setError("Return date must be after the departure date.");
      return;
    }
    const dates = travelDate
      ? `from ${new Date(`${travelDate}T00:00:00`).toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" })}${returnDate ? ` to ${new Date(`${returnDate}T00:00:00`).toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" })}` : ""}`
      : "with dates still to confirm";
    setError("");
    setSummary(
      `${name.trim()} asked KSB Travel and Tourism about ${insuranceType.toLowerCase()} insurance for ${destination}, ${dates}, for ${travellers} traveller${travellers === "1" ? "" : "s"}.${email.trim() ? ` Email: ${email.trim()}.` : ""}${notes.trim() ? ` Note: ${notes.trim()}` : ""} This summary is saved on this page only and has not been submitted.`,
    );
    showSection("insurance-enquiry");
  }

  return (
    <main className="insurance-page">
      <section className="insurance-hero" aria-labelledby="insurance-title">
        <div className="insurance-hero-pattern" aria-hidden="true" />
        <div className="container insurance-hero-content">
          <a className="insurance-back" href="#home">
            ← Back to KSB home
          </a>
          <p className="section-kicker">KSB TRAVEL AND TOURISM</p>
          <h1 id="insurance-title">Travel insurance for your journey</h1>
          <p>
            Get guidance on travel medical cover, visa insurance and trip protection before you
            leave Pakistan.
          </p>
          <button className="button" onClick={() => showSection("insurance-enquiry")} type="button">
            Get an insurance quote <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <section className="container insurance-search" aria-labelledby="insurance-search-title">
        <div>
          <p className="section-kicker">PLAN WITH CONFIDENCE</p>
          <h2 id="insurance-search-title">Find cover for your trip</h2>
          <p>
            Share a few details and KSB will help you compare the current options. Prices,
            eligibility and policy limits are confirmed with you.
          </p>
        </div>
        <form onSubmit={prepareEnquiry}>
          <label>
            Destination
            <select onChange={(event) => setDestination(event.target.value)} value={destination}>
              <option value="">Select destination</option>
              {destinations.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Insurance type
            <select
              onChange={(event) => setInsuranceType(event.target.value)}
              value={insuranceType}
            >
              {insuranceTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Departure date
            <input
              onChange={(event) => setTravelDate(event.target.value)}
              type="date"
              value={travelDate}
            />
          </label>
          <label>
            Return date
            <input
              min={travelDate || undefined}
              onChange={(event) => setReturnDate(event.target.value)}
              type="date"
              value={returnDate}
            />
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
            Prepare enquiry
          </button>
          {error ? <p className="insurance-error">{error}</p> : null}
        </form>
      </section>

      <section className="container insurance-intro" aria-labelledby="insurance-intro-title">
        <p className="section-kicker">TRAVEL PROTECTION</p>
        <h2 id="insurance-intro-title">A little preparation can make a big difference</h2>
        <p>
          KSB Travel and Tourism helps travellers understand the insurance options relevant to their
          destination and plans. We explain what to check, what documents may be needed and which
          questions to ask before you commit.
        </p>
        <div className="insurance-benefits">
          {benefits.map(([title, text]) => (
            <article key={title}>
              <span aria-hidden="true">✓</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="insurance-band" aria-labelledby="insurance-options-title">
        <div className="container">
          <p className="section-kicker">INSURANCE OPTIONS</p>
          <h2 id="insurance-options-title">Support for different kinds of travel</h2>
          <div className="insurance-options">
            {insuranceTypes.map((item, index) => (
              <article key={item}>
                <strong>0{index + 1}</strong>
                <h3>{item}</h3>
                <p>
                  {index === 0
                    ? "For one planned holiday, visit or business trip."
                    : index === 1
                      ? "For travellers making several trips within a policy period."
                      : index === 2
                        ? "For students preparing to study or train abroad."
                        : "For families travelling together on one itinerary."}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container insurance-faq" aria-labelledby="insurance-faq-title">
        <p className="section-kicker">COMMON QUESTIONS</p>
        <h2 id="insurance-faq-title">Travel insurance, explained</h2>
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
        className="container insurance-enquiry"
        id="insurance-enquiry"
        aria-labelledby="insurance-enquiry-title"
        tabIndex={-1}
      >
        <div>
          <p className="section-kicker">KSB TRAVEL AND TOURISM</p>
          <h2 id="insurance-enquiry-title">Ask us to check your cover</h2>
          <p>
            Tell us about your trip and we will help you understand the available insurance route.
            Nothing is purchased from this page.
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
            Email (optional)
            <input onChange={(event) => setEmail(event.target.value)} type="email" value={email} />
          </label>
          <label>
            Destination
            <select
              onChange={(event) => setDestination(event.target.value)}
              required
              value={destination}
            >
              <option value="">Select destination</option>
              {destinations.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="insurance-notes">
            Anything we should know
            <textarea onChange={(event) => setNotes(event.target.value)} value={notes} />
          </label>
          <button className="button" type="submit">
            Prepare enquiry
          </button>
          {error ? <p className="insurance-error">{error}</p> : null}
          {summary ? (
            <div className="insurance-summary">
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
