import { useState, type FormEvent } from "react";
import { contactUrl, showSection } from "./site";

const services: [string, string][] = [
  [
    "New passport guidance",
    "Understand the usual application steps, documents and appointment preparation for a first passport.",
  ],
  [
    "Passport renewal guidance",
    "Check what to prepare when renewing an expired, damaged or nearly-full passport.",
  ],
  [
    "Urgent travel planning",
    "Discuss passport validity and timing before a visa application or international departure.",
  ],
  [
    "Family document checklist",
    "Organize passport details for adults, children and a family travel file.",
  ],
];
const faqs = [
  [
    "How long should my passport be valid for travel?",
    "Many destinations require several months of validity beyond the planned arrival date. Requirements vary, so check the destination authority, airline and visa instructions before travelling.",
  ],
  [
    "Which documents are usually needed?",
    "Requirements can include identity documents, photographs, an existing passport for renewal and supporting records. The exact list depends on the applicant and the current official instructions.",
  ],
  [
    "Can KSB issue or renew my passport?",
    "No. Passport applications and issuance are handled by the relevant Pakistani authority. KSB can help you understand the travel-planning checklist and timing to discuss with the official office.",
  ],
  [
    "What if my passport is lost or damaged?",
    "Report the situation through the official process and check the replacement requirements. Do not rely on an unofficial shortcut, especially if travel is close.",
  ],
];

export default function PassportPage() {
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  function chooseService(title: string) {
    setService(title);
    setError("");
    showSection("passport-enquiry");
  }

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
    if (!service) {
      setError("Choose a passport service.");
      return;
    }
    const when = travelDate
      ? new Date(`${travelDate}T00:00:00`).toLocaleDateString("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "a date still to confirm";
    setError("");
    setSummary(
      `${name.trim()} asked KSB Travel and Tourism about ${service.toLowerCase()} for travel around ${when}.${notes.trim() ? ` Note: ${notes.trim()}` : ""} This summary is saved on this page only and has not been submitted.`,
    );
    showSection("passport-enquiry");
  }

  return (
    <main className="passport-page">
      <section className="passport-hero" aria-labelledby="passport-title">
        <div className="passport-hero-shape" aria-hidden="true" />
        <div className="container passport-hero-content">
          <a className="passport-back" href="#home">
            ← Back to KSB home
          </a>
          <p className="section-kicker">KSB TRAVEL AND TOURISM</p>
          <h1 id="passport-title">Passport guidance for your journey</h1>
          <p>
            Prepare your documents and timing with a clear checklist before applying for a passport
            or planning international travel.
          </p>
          <button className="button" onClick={() => showSection("passport-services")} type="button">
            View passport services <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <section
        className="container passport-services"
        id="passport-services"
        aria-labelledby="passport-services-title"
        tabIndex={-1}
      >
        <div className="passport-heading">
          <div>
            <p className="section-kicker">PASSPORT SUPPORT</p>
            <h2 id="passport-services-title">Choose the guidance you need</h2>
          </div>
          <p>
            Official passport offices set the requirements, fees and processing timelines. KSB helps
            you prepare questions and travel documents; confirm the latest details through the
            official channel.
          </p>
        </div>
        <div className="passport-service-grid">
          {services.map(([title, text], index) => (
            <article key={title}>
              <strong>0{index + 1}</strong>
              <h3>{title}</h3>
              <p>{text}</p>
              <button onClick={() => chooseService(title)} type="button">
                Ask KSB about this <span aria-hidden="true">↗</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="passport-band" aria-labelledby="passport-steps-title">
        <div className="container">
          <p className="section-kicker">A SIMPLE CHECKLIST</p>
          <h2 id="passport-steps-title">Prepare before your appointment</h2>
          <div className="passport-steps">
            <article>
              <strong>01</strong>
              <h3>Check identity documents</h3>
              <p>
                Keep the required identity records, existing passport and photographs ready
                according to the current official instructions.
              </p>
            </article>
            <article>
              <strong>02</strong>
              <h3>Check validity and timing</h3>
              <p>
                Work backwards from your visa and departure date so there is enough time for
                processing and corrections.
              </p>
            </article>
            <article>
              <strong>03</strong>
              <h3>Keep records safe</h3>
              <p>
                Store copies of important documents securely and avoid sharing passport scans with
                unverified parties.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="container passport-faq" aria-labelledby="passport-faq-title">
        <p className="section-kicker">COMMON QUESTIONS</p>
        <h2 id="passport-faq-title">Passport guidance, explained</h2>
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
        className="container passport-enquiry"
        id="passport-enquiry"
        aria-labelledby="passport-enquiry-title"
        tabIndex={-1}
      >
        <div>
          <p className="section-kicker">KSB TRAVEL AND TOURISM</p>
          <h2 id="passport-enquiry-title">Ask about passport preparation</h2>
          <p>
            Share what you need and when you plan to travel. KSB can help you understand which
            questions and documents to check. This page does not submit a passport application.
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
          <label className="passport-full">
            Passport service
            <select onChange={(event) => setService(event.target.value)} required value={service}>
              <option value="">Select a service</option>
              {services.map(([title]) => (
                <option key={title}>{title}</option>
              ))}
            </select>
          </label>
          <label>
            Expected travel date
            <input
              onChange={(event) => setTravelDate(event.target.value)}
              type="date"
              value={travelDate}
            />
          </label>
          <label className="passport-notes">
            Anything we should know
            <textarea onChange={(event) => setNotes(event.target.value)} value={notes} />
          </label>
          <button className="button" type="submit">
            Prepare enquiry
          </button>
          {error ? <p className="passport-error">{error}</p> : null}
          {summary ? (
            <div className="passport-summary">
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
