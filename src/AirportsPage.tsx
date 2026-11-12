import { useMemo, useState, type FormEvent } from "react";
import { contactUrl, publicAsset, showSection } from "./site";

type Airport = {
  city: string;
  name: string;
  code: string;
  region: string;
  international: boolean;
};

const airports: Airport[] = [
  {
    city: "Islamabad",
    name: "Islamabad International Airport",
    code: "ISB",
    region: "North",
    international: true,
  },
  {
    city: "Lahore",
    name: "Allama Iqbal International Airport",
    code: "LHE",
    region: "Central",
    international: true,
  },
  {
    city: "Karachi",
    name: "Jinnah International Airport",
    code: "KHI",
    region: "South",
    international: true,
  },
  {
    city: "Peshawar",
    name: "Bacha Khan International Airport",
    code: "PEW",
    region: "North",
    international: true,
  },
  {
    city: "Quetta",
    name: "Quetta International Airport",
    code: "UET",
    region: "West",
    international: true,
  },
  {
    city: "Multan",
    name: "Multan International Airport",
    code: "MUX",
    region: "Central",
    international: true,
  },
  {
    city: "Sialkot",
    name: "Sialkot International Airport",
    code: "SKT",
    region: "North",
    international: true,
  },
  { city: "Gilgit", name: "Gilgit Airport", code: "GIL", region: "North", international: false },
  { city: "Skardu", name: "Skardu Airport", code: "KDU", region: "North", international: false },
  {
    city: "Faisalabad",
    name: "Faisalabad International Airport",
    code: "LYP",
    region: "Central",
    international: false,
  },
];

const faqs = [
  [
    "What is an IATA airport code?",
    "An IATA code is the three-letter identifier used on tickets, baggage tags and flight searches. For example, ISB is Islamabad and LHE is Lahore.",
  ],
  [
    "Which airports are Pakistan's main international gateways?",
    "Islamabad, Lahore and Karachi are major international gateways. Other airports may serve international routes on selected schedules, so confirm the route for your dates.",
  ],
  [
    "Which airports serve northern Pakistan?",
    "Gilgit and Skardu are important airports for Gilgit-Baltistan. Weather can affect operations, so keep flexibility in a mountain itinerary.",
  ],
  [
    "Does an international airport have direct flights everywhere?",
    "No. Routes depend on the airline, season and travel date. You may need a connection even when an airport has international status.",
  ],
];

export default function AirportsPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All regions");
  const [selectedAirport, setSelectedAirport] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const regions = ["All regions", "North", "Central", "South", "West"];
  const visibleAirports = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return airports.filter((airport) => {
      const matchesQuery =
        !normalized ||
        airport.city.toLowerCase().includes(normalized) ||
        airport.name.toLowerCase().includes(normalized) ||
        airport.code.toLowerCase().includes(normalized);
      return matchesQuery && (region === "All regions" || airport.region === region);
    });
  }, [query, region]);

  function chooseAirport(airport: Airport) {
    setSelectedAirport(`${airport.city} (${airport.code})`);
    setError("");
    showSection("airports-enquiry");
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
    if (!selectedAirport) {
      setError("Choose an airport.");
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
      `${name.trim()} asked KSB Travel and Tourism about flights or airport guidance for ${selectedAirport} around ${when}.${notes.trim() ? ` Note: ${notes.trim()}` : ""} This summary is saved on this page only and has not been submitted.`,
    );
    showSection("airports-enquiry");
  }

  return (
    <main className="airports-page">
      <section className="airports-hero" aria-labelledby="airports-title">
        <img
          alt="Aircraft approaching an airport in Pakistan"
          src={publicAsset("airports/pakistan-airport.jpg")}
        />
        <div className="airports-hero-shade" />
        <div className="container airports-hero-content">
          <a className="airports-back" href="#home">
            ← Back to KSB home
          </a>
          <p className="section-kicker">KSB TRAVEL AND TOURISM</p>
          <h1 id="airports-title">Airports in Pakistan</h1>
          <p>
            Find city names, IATA codes and practical route guidance before you book your next
            flight.
          </p>
          <button
            className="button"
            onClick={() => showSection("airports-directory")}
            type="button"
          >
            View airport directory <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <section
        className="container airports-directory"
        id="airports-directory"
        aria-labelledby="airports-directory-title"
        tabIndex={-1}
      >
        <div className="airports-heading">
          <div>
            <p className="section-kicker">AIRPORT DIRECTORY</p>
            <h2 id="airports-directory-title">Search Pakistan's passenger airports</h2>
          </div>
          <p>
            Use the three-letter IATA code when searching flights or checking your ticket. Schedules
            and route availability should be confirmed for your travel date.
          </p>
        </div>
        <div className="airports-controls">
          <label>
            Search by city or code
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="For example, Lahore or LHE"
              value={query}
            />
          </label>
          <div className="airports-regions" aria-label="Airport regions">
            {regions.map((item) => (
              <button
                aria-pressed={region === item}
                className={region === item ? "is-active" : ""}
                key={item}
                onClick={() => setRegion(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="airport-grid">
          {visibleAirports.map((airport) => (
            <article className="airport-card" key={airport.code}>
              <div>
                <strong>{airport.code}</strong>
                <span>{airport.international ? "International" : "Domestic"}</span>
              </div>
              <p>{airport.region} Pakistan</p>
              <h3>{airport.name}</h3>
              <button onClick={() => chooseAirport(airport)} type="button">
                Plan from {airport.city} <span aria-hidden="true">↗</span>
              </button>
            </article>
          ))}
        </div>
        {visibleAirports.length === 0 ? (
          <p className="airports-empty">
            No airport matches that search. Try a city name or IATA code.
          </p>
        ) : null}
      </section>

      <section className="airports-band" aria-labelledby="airports-guidance-title">
        <div className="container">
          <p className="section-kicker">BEFORE YOU FLY</p>
          <h2 id="airports-guidance-title">A smoother airport day starts before departure</h2>
          <div className="airports-guidance">
            <article>
              <strong>01</strong>
              <h3>Check the code</h3>
              <p>Match the city and IATA code on your ticket so you arrive at the right airport.</p>
            </article>
            <article>
              <strong>02</strong>
              <h3>Check the route</h3>
              <p>
                International status does not guarantee a direct flight. Confirm connections and
                baggage rules.
              </p>
            </article>
            <article>
              <strong>03</strong>
              <h3>Leave room for change</h3>
              <p>
                Weather, airline schedules and airport operations can change. Keep important
                journeys flexible.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="container airports-faq" aria-labelledby="airports-faq-title">
        <p className="section-kicker">COMMON QUESTIONS</p>
        <h2 id="airports-faq-title">Airport guidance, explained</h2>
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
        className="container airports-enquiry"
        id="airports-enquiry"
        aria-labelledby="airports-enquiry-title"
        tabIndex={-1}
      >
        <div>
          <p className="section-kicker">KSB TRAVEL AND TOURISM</p>
          <h2 id="airports-enquiry-title">Plan your route from the right airport</h2>
          <p>
            Share the airport, route or travel question you have. KSB will help you check the
            available options. Nothing is booked from this page.
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
          <label className="airports-full">
            Airport
            <select
              onChange={(event) => setSelectedAirport(event.target.value)}
              required
              value={selectedAirport}
            >
              <option value="">Select an airport</option>
              {airports.map((airport) => (
                <option key={airport.code}>
                  {airport.city} ({airport.code})
                </option>
              ))}
            </select>
          </label>
          <label>
            Travel date
            <input
              onChange={(event) => setTravelDate(event.target.value)}
              type="date"
              value={travelDate}
            />
          </label>
          <label className="airports-notes">
            Anything we should know
            <textarea onChange={(event) => setNotes(event.target.value)} value={notes} />
          </label>
          <button className="button" type="submit">
            Prepare enquiry
          </button>
          {error ? <p className="airports-error">{error}</p> : null}
          {summary ? (
            <div className="airports-summary">
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
