import { useState, type FormEvent } from "react";
import { showSection } from "./site";

const destinations: [string, string][] = [
  ["United Kingdom", "Universities, foundation routes and postgraduate options."],
  ["Australia", "Course planning, applications and student-visa preparation."],
  ["Germany", "Explore public and private study pathways and requirements."],
  ["Turkey", "Discuss universities, programs and application timelines."],
  ["New Zealand", "Plan an international education journey around your goals."],
  [
    "Other destinations",
    "Tell KSB where you would like to study and we will discuss the next steps.",
  ],
];

const services = [
  [
    "01",
    "Course and university guidance",
    "Shortlist options that match your academic background, budget and career plans.",
  ],
  [
    "02",
    "Application preparation",
    "Organize your documents, personal statement and application timeline with practical guidance.",
  ],
  [
    "03",
    "Scholarship discussion",
    "Identify scholarship questions and funding documents to check with the institution.",
  ],
  [
    "04",
    "Student visa preparation",
    "Prepare a clear checklist and confirm current requirements through the official channel.",
  ],
];

const faqs = [
  [
    "What should I prepare before applying?",
    "Start with your academic records, passport, English-language evidence if required, CV or personal statement and a realistic budget. Each institution sets its own requirements.",
  ],
  [
    "Can KSB guarantee admission or a visa?",
    "No. Universities and immigration authorities make their own decisions. KSB can help you prepare and understand the process, but cannot guarantee an outcome.",
  ],
  [
    "Do I need IELTS or another English test?",
    "Requirements vary by destination, institution and course. Check the latest test rules with the university before booking an exam.",
  ],
  [
    "When should I begin?",
    "Begin several months before your preferred intake so there is time for research, applications, offers, funding and visa preparation.",
  ],
];

export default function StudyAbroadPage() {
  const [destination, setDestination] = useState("");
  const [level, setLevel] = useState("Undergraduate");
  const [intake, setIntake] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");

  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = mobile.replace(/\D/g, "");
    if (name.trim().length < 2) return setError("Enter your name.");
    if (digits.length < 10 || digits.length > 15)
      return setError("Enter a mobile number with 10 to 15 digits.");
    if (!destination) return setError("Choose a preferred destination.");
    setError("");
    setSummary(
      `${name.trim()} asked KSB Travel and Tourism about ${level.toLowerCase()} study in ${destination}${intake ? ` for the ${intake} intake` : ""}.${notes.trim() ? ` Note: ${notes.trim()}` : ""} This summary is saved on this page only and has not been submitted.`,
    );
    showSection("study-abroad-enquiry");
  }

  return (
    <main className="study-abroad-page">
      <section className="study-abroad-hero" aria-labelledby="study-abroad-title">
        <div className="container study-abroad-hero-content">
          <a className="study-abroad-back" href="#home">
            ← Back to KSB home
          </a>
          <p className="section-kicker">KSB TRAVEL AND TOURISM</p>
          <h1 id="study-abroad-title">Your next chapter starts here</h1>
          <p>
            Explore international study options with a clear plan for courses, applications, funding
            and student-visa preparation.
          </p>
          <button
            className="button"
            onClick={() => showSection("study-abroad-enquiry")}
            type="button"
          >
            Start your study plan <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <section className="container study-abroad-intro" aria-labelledby="study-abroad-intro-title">
        <div>
          <p className="section-kicker">STUDY ABROAD GUIDANCE</p>
          <h2 id="study-abroad-intro-title">Make an informed education decision</h2>
        </div>
        <p>
          Studying abroad is a major decision. KSB can help you compare destinations, understand the
          application journey and prepare questions for universities and official authorities.
          Requirements, fees and outcomes must always be confirmed with the relevant institution.
        </p>
      </section>

      <section className="study-abroad-services" aria-labelledby="study-abroad-services-title">
        <div className="container">
          <p className="section-kicker">HOW KSB CAN HELP</p>
          <h2 id="study-abroad-services-title">Support from first shortlist to departure</h2>
          <div className="study-abroad-service-grid">
            {services.map(([number, title, text]) => (
              <article key={title}>
                <strong>{number}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="container study-abroad-destinations"
        aria-labelledby="study-abroad-destinations-title"
      >
        <div className="study-abroad-heading">
          <div>
            <p className="section-kicker">POPULAR PATHWAYS</p>
            <h2 id="study-abroad-destinations-title">Where could you study?</h2>
          </div>
          <p>
            Choose a starting point and share your academic goals. KSB will help you identify what
            to verify before applying.
          </p>
        </div>
        <div className="study-abroad-destination-grid">
          {destinations.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
              <button
                onClick={() => {
                  setDestination(title);
                  showSection("study-abroad-enquiry");
                }}
                type="button"
              >
                Ask about this destination <span aria-hidden="true">↗</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="study-abroad-band" aria-labelledby="study-abroad-steps-title">
        <div className="container">
          <p className="section-kicker">A CLEARER JOURNEY</p>
          <h2 id="study-abroad-steps-title">Prepare one step at a time</h2>
          <div className="study-abroad-steps">
            <article>
              <strong>01</strong>
              <h3>Understand your goals</h3>
              <p>
                Consider your subject, qualification level, budget, destination and career
                direction.
              </p>
            </article>
            <article>
              <strong>02</strong>
              <h3>Build your shortlist</h3>
              <p>Compare entry requirements, course content, location, costs and intake dates.</p>
            </article>
            <article>
              <strong>03</strong>
              <h3>Check official requirements</h3>
              <p>Confirm the latest admission and visa rules before submitting documents.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="container study-abroad-faq" aria-labelledby="study-abroad-faq-title">
        <p className="section-kicker">COMMON QUESTIONS</p>
        <h2 id="study-abroad-faq-title">Study abroad, explained</h2>
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>

      <section
        className="container study-abroad-enquiry"
        id="study-abroad-enquiry"
        tabIndex={-1}
        aria-labelledby="study-abroad-enquiry-title"
      >
        <div>
          <p className="section-kicker">KSB TRAVEL AND TOURISM</p>
          <h2 id="study-abroad-enquiry-title">Start your study abroad enquiry</h2>
          <p>
            Share your preferred destination and study level. This form prepares a local summary
            only; it does not submit an application or visa request.
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
            Preferred destination
            <select
              onChange={(event) => setDestination(event.target.value)}
              required
              value={destination}
            >
              <option value="">Choose a destination</option>
              {destinations.map(([title]) => (
                <option key={title}>{title}</option>
              ))}
            </select>
          </label>
          <label>
            Study level
            <select onChange={(event) => setLevel(event.target.value)} value={level}>
              <option>Undergraduate</option>
              <option>Postgraduate</option>
              <option>PhD / research</option>
              <option>Language or foundation</option>
            </select>
          </label>
          <label>
            Preferred intake
            <input
              onChange={(event) => setIntake(event.target.value)}
              placeholder="e.g. September 2027"
              value={intake}
            />
          </label>
          <label className="study-abroad-full">
            Academic goals or questions
            <textarea onChange={(event) => setNotes(event.target.value)} value={notes} />
          </label>
          {error && (
            <p className="form-error study-abroad-full" role="alert">
              {error}
            </p>
          )}
          <button className="button study-abroad-full" type="submit">
            Prepare enquiry summary <span aria-hidden="true">↗</span>
          </button>
          {summary && (
            <p className="form-success study-abroad-full" role="status">
              {summary}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
