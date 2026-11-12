import { useMemo, useState, type FormEvent } from "react";
import { contactUrl, publicAsset, showSection } from "./site";

type OfferCategory = "All offers" | "Tours" | "Visas" | "Pilgrimage";
type Offer = {
  category: Exclude<OfferCategory, "All offers">;
  title: string;
  summary: string;
  label: string;
  image?: string;
};

const offers: Offer[] = [
  {
    category: "Tours",
    title: "Uzbekistan exploration journey",
    summary:
      "Discover Tashkent, the Chimgan Mountains, Samarkand and Bukhara with a thoughtful Central Asia itinerary. KSB will confirm the current flights, visa guidance, hotels, breakfasts, sightseeing and transfers.",
    label: "Featured",
    image: "uzbekistan-banner.png",
  },
  {
    category: "Visas",
    title: "Visa consultation planning",
    summary:
      "Discuss a clear document checklist and file preparation approach for your destination. KSB confirms the current service scope and consultation terms before you proceed.",
    label: "Ask KSB",
  },
  {
    category: "Pilgrimage",
    title: "Umrah package planning",
    summary:
      "Compare possible hotel categories, durations, flights, visa guidance and transfers for your Umrah journey. Availability and the final written quote must be confirmed.",
    label: "Popular",
  },
  {
    category: "Tours",
    title: "Seasonal family escapes",
    summary:
      "Ask about a tailored family break with destination, dates, accommodation and transport matched to your group. Current routes and inclusions are checked with you.",
    label: "Seasonal",
  },
];

const categories: OfferCategory[] = ["All offers", "Tours", "Visas", "Pilgrimage"];

export default function OffersPage() {
  const [category, setCategory] = useState<OfferCategory>("All offers");
  const [selectedOffer, setSelectedOffer] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const visibleOffers = useMemo(
    () => offers.filter((offer) => category === "All offers" || offer.category === category),
    [category],
  );

  function chooseOffer(title: string) {
    setSelectedOffer(title);
    setError("");
    showSection("offers-enquiry");
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
    if (!selectedOffer) {
      setError("Choose an offer first.");
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
      `${name.trim()} asked KSB Travel and Tourism about "${selectedOffer}" for ${when}.${notes.trim() ? ` Note: ${notes.trim()}` : ""} This summary is saved on this page only and has not been submitted.`,
    );
    showSection("offers-enquiry");
  }

  return (
    <main className="offers-page">
      <section className="offers-hero" aria-labelledby="offers-title">
        <div className="offers-hero-shape" aria-hidden="true" />
        <div className="container offers-hero-content">
          <a className="offers-back" href="#home">
            ← Back to KSB home
          </a>
          <p className="section-kicker">KSB TRAVEL AND TOURISM</p>
          <h1 id="offers-title">Travel offers worth exploring</h1>
          <p>
            Find seasonal travel ideas, pilgrimage planning and visa support from a team that keeps
            the important details clear.
          </p>
          <button className="button" onClick={() => showSection("offers-list")} type="button">
            Explore current offers <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <section
        className="container offers-list"
        id="offers-list"
        aria-labelledby="offers-list-title"
        tabIndex={-1}
      >
        <div className="offers-heading">
          <div>
            <p className="section-kicker">SPECIAL OFFERS</p>
            <h2 id="offers-list-title">Ideas for your next journey</h2>
          </div>
          <p>
            Offer availability, dates, inclusions and pricing can change. KSB confirms the current
            details before you make a decision.
          </p>
        </div>
        <div className="offers-filters" aria-label="Offer categories">
          {categories.map((item) => (
            <button
              aria-pressed={category === item}
              className={category === item ? "is-active" : ""}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="offer-grid">
          {visibleOffers.map((offer) => (
            <article className="offer-card" key={offer.title}>
              <div className="offer-card-image">
                {offer.image ? (
                  <img
                    alt="Historic architecture in Uzbekistan"
                    src={publicAsset(`offers/${offer.image}`)}
                  />
                ) : (
                  <span aria-hidden="true">{offer.category}</span>
                )}
                <strong>{offer.label}</strong>
              </div>
              <div className="offer-card-body">
                <p className="offer-category">{offer.category}</p>
                <h3>{offer.title}</h3>
                <p>{offer.summary}</p>
                <button onClick={() => chooseOffer(offer.title)} type="button">
                  Ask about this offer <span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="offers-note" aria-labelledby="offers-note-title">
        <div className="container">
          <p className="section-kicker">A CLEARER WAY TO BOOK</p>
          <h2 id="offers-note-title">The best offer is the one that fits your trip</h2>
          <p>
            Rather than relying on a headline price, ask KSB to confirm the dates, flights,
            accommodation, documents, baggage, transfers, exclusions and cancellation terms in
            writing.
          </p>
        </div>
      </section>

      <section
        className="container offers-enquiry"
        id="offers-enquiry"
        aria-labelledby="offers-enquiry-title"
        tabIndex={-1}
      >
        <div>
          <p className="section-kicker">KSB TRAVEL AND TOURISM</p>
          <h2 id="offers-enquiry-title">Ask about an offer</h2>
          <p>
            Tell us which offer interests you. This page prepares a local summary and does not
            process payment or reserve a place.
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
            Offer
            <select
              onChange={(event) => setSelectedOffer(event.target.value)}
              required
              value={selectedOffer}
            >
              <option value="">Select an offer</option>
              {offers.map((offer) => (
                <option key={offer.title}>{offer.title}</option>
              ))}
            </select>
          </label>
          <label>
            Preferred travel date
            <input
              onChange={(event) => setTravelDate(event.target.value)}
              type="date"
              value={travelDate}
            />
          </label>
          <label className="offers-notes">
            Anything we should know
            <textarea onChange={(event) => setNotes(event.target.value)} value={notes} />
          </label>
          <button className="button" type="submit">
            Prepare enquiry
          </button>
          {error ? <p className="offers-error">{error}</p> : null}
          {summary ? (
            <div className="offers-summary">
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
