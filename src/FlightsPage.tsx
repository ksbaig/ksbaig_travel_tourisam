import { useEffect, useRef, useState, type FormEvent } from "react";
import { contactUrl, publicAsset, showSection } from "./site";

type TripType = "return" | "one-way" | "multi-city";
type FlightLeg = { id: number; from: string; to: string; date: string };
type FlightRequest = {
  tripType: TripType;
  legs: FlightLeg[];
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  cabin: string;
  airline: string;
  direct: boolean;
  luggage: boolean;
};

const asset = (filename: string) => publicAsset(`flights/${filename}`);
const airports = [
  { city: "Lahore", code: "LHE" },
  { city: "Karachi", code: "KHI" },
  { city: "Islamabad", code: "ISB" },
  { city: "Multan", code: "MUX" },
  { city: "Peshawar", code: "PEW" },
  { city: "Faisalabad", code: "LYP" },
  { city: "Quetta", code: "UET" },
  { city: "Dubai", code: "DXB" },
  { city: "Jeddah", code: "JED" },
  { city: "London", code: "LHR" },
  { city: "Bangkok", code: "BKK" },
  { city: "Baku", code: "GYD" },
  { city: "Dammam", code: "DMM" },
  { city: "Riyadh", code: "RUH" },
  { city: "Doha", code: "DOH" },
  { city: "Manchester", code: "MAN" },
  { city: "Toronto", code: "YYZ" },
  { city: "New York", code: "JFK" },
  { city: "Istanbul", code: "IST" },
  { city: "Male", code: "MLE" },
  { city: "Denpasar", code: "DPS" },
];
const departureCities = airports.slice(0, 7);
const internationalAirports = airports.slice(7);
const tripLabels: Record<TripType, string> = {
  return: "Return",
  "one-way": "One way",
  "multi-city": "Multi-city",
};
const destinations = [
  { city: "Dubai", code: "DXB", image: "dubai.webp", caption: "A city of possibilities" },
  { city: "Jeddah", code: "JED", image: "jeddah.webp", caption: "Your gateway to Saudi Arabia" },
  { city: "London", code: "LHR", image: "london.webp", caption: "A new chapter awaits" },
  { city: "Bangkok", code: "BKK", image: "bangkok.webp", caption: "Culture, colour and discovery" },
  { city: "Baku", code: "GYD", image: "baku.webp", caption: "Where old meets new" },
  { city: "Dammam", code: "DMM", image: "dammam.webp", caption: "Discover the eastern coast" },
];
const airlines = [
  { name: "PIA", image: "ta-img-3.webp" },
  { name: "Emirates", image: "ta-img-10.webp" },
  { name: "Qatar Airways", image: "ta-img-11.webp" },
  { name: "Saudia", image: "ta-img-1.webp" },
  { name: "Etihad Airways", image: "ta-img-2.webp" },
  { name: "Turkish Airlines", image: "ta-img-7.webp" },
  { name: "Fly Jinnah", image: "logo-flyjinnah.webp" },
  { name: "Thai Airways", image: "logo-thai-airways.webp" },
  { name: "Gulf Air", image: "ta-img-6.webp" },
  { name: "SriLankan Airlines", image: "ta-img-5.webp" },
  { name: "Kuwait Airways", image: "ta-img-9.webp" },
];
const benefits = [
  {
    title: "Thoughtful options",
    image: "insurance-icon-1.webp",
    text: "Discuss routes and fares around your travel dates, budget and priorities.",
  },
  {
    title: "Clear trip details",
    image: "insurance-icon-2.webp",
    text: "Understand your itinerary, baggage and fare conditions before confirming.",
  },
  {
    title: "Flexible planning",
    image: "insurance-icon-3.webp",
    text: "Compare different dates, cabins and airlines with personal guidance.",
  },
  {
    title: "Personal support",
    image: "insurance-icon-4.webp",
    text: "A conversation with the KSB team, from your first question to your travel plans.",
  },
];
const faqs = [
  {
    question: "Can I book domestic and international flights with KSB?",
    answer:
      "Contact KSB Travel and Tourism to discuss travel within Pakistan or to an international destination. Routes, schedules and fares must be confirmed for your exact dates.",
  },
  {
    question: "Does this page show live fares or issue tickets?",
    answer:
      "No. This page helps you prepare your flight preferences. Live airline inventory, payments and ticket issuance are not connected. Contact our team for an up-to-date quote and confirmation.",
  },
  {
    question: "How do I find a more affordable flight?",
    answer:
      "Compare several travel dates, nearby airports and connecting flights. Review baggage, change fees and the overall journey time rather than comparing the headline fare alone.",
  },
  {
    question: "What documents do I need for a domestic flight?",
    answer:
      "Confirm the airline's accepted identification for every traveler, including children. Requirements can vary by nationality and traveler age. Use the same name on your booking as on your travel document.",
  },
  {
    question: "What should I check before an international flight?",
    answer:
      "Check passport validity, destination and transit visa requirements, health rules and any onward-ticket requirements with your airline and official authorities before paying.",
  },
  {
    question: "Is baggage included in my fare?",
    answer:
      "Allowances depend on the airline, route, cabin and fare type. The 'With checked luggage' preference asks our team to include baggage options; it does not guarantee an allowance. Confirm weight, dimensions and fees in your quote.",
  },
  {
    question: "Can I request a multi-city journey?",
    answer:
      "Yes. Choose Multi-city and enter each flight in chronological order. You can add or remove additional flights, keeping at least two legs. The team will confirm connections and availability.",
  },
  {
    question: "How do changes, cancellations and payment work?",
    answer:
      "Ask for the full fare conditions, payment options, ticketing deadline and any service charges before confirming. Refunds and changes depend on the airline and the specific fare purchased.",
  },
];

function localDate() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function normalizeAirport(value: string) {
  const normalized = value.trim().replace(/\s+/g, " ").toLowerCase();
  const airport = airports.find((item) =>
    [
      item.city.toLowerCase(),
      item.code.toLowerCase(),
      `${item.city} (${item.code})`.toLowerCase(),
    ].includes(normalized),
  );
  return airport?.code ?? normalized;
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function FlightsPage() {
  const [tripType, setTripType] = useState<TripType>("return");
  const [legs, setLegs] = useState<FlightLeg[]>([
    { id: 1, from: "Lahore (LHE)", to: "", date: "" },
    { id: 2, from: "", to: "", date: "" },
  ]);
  const nextLegId = useRef(3);
  const travelersRef = useRef<HTMLDetailsElement>(null);
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [infants, setInfants] = useState("0");
  const [cabin, setCabin] = useState("Economy");
  const [airline, setAirline] = useState("Any airline");
  const [direct, setDirect] = useState(false);
  const [luggage, setLuggage] = useState(false);
  const [departureCity, setDepartureCity] = useState("Lahore (LHE)");
  const [error, setError] = useState("");
  const [request, setRequest] = useState<FlightRequest | null>(null);
  const visibleLegs = tripType === "multi-city" ? legs : legs.slice(0, 1);
  const today = localDate();

  useEffect(() => {
    if (request) showSection("flights-enquiry");
  }, [request]);

  function updateLeg(id: number, field: "from" | "to" | "date", value: string) {
    setLegs((current) => current.map((leg) => (leg.id === id ? { ...leg, [field]: value } : leg)));
  }

  function clearRequest() {
    setRequest(null);
    setError("");
  }

  function chooseRoute(from: string, to: string) {
    setLegs((current) => current.map((leg, index) => (index === 0 ? { ...leg, from, to } : leg)));
    clearRequest();
    showSection("flights-search");
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const passengerCounts = [Number(adults), Number(children), Number(infants)];
    if (
      passengerCounts.some((count) => !Number.isSafeInteger(count) || count < 0) ||
      Number(adults) < 1
    ) {
      if (travelersRef.current) travelersRef.current.open = true;
      setError("Enter valid traveler counts, including at least one adult.");
      return;
    }
    if (Number(infants) > Number(adults)) {
      if (travelersRef.current) travelersRef.current.open = true;
      setError(
        "Each infant needs an accompanying adult. Please adjust the traveler counts or contact KSB for guidance.",
      );
      return;
    }
    for (const [index, leg] of visibleLegs.entries()) {
      if (
        !leg.from.trim() ||
        !leg.to.trim() ||
        normalizeAirport(leg.from) === normalizeAirport(leg.to)
      ) {
        setError(`Flight ${index + 1}: enter different departure and arrival cities or airports.`);
        return;
      }
      const previousDate = visibleLegs[index - 1]?.date;
      if (!leg.date || leg.date < today || (previousDate && leg.date < previousDate)) {
        setError(
          `Flight ${index + 1}: choose a date from today onward, no earlier than the previous flight.`,
        );
        return;
      }
    }
    if (tripType === "return" && (!returnDate || returnDate < (visibleLegs[0]?.date ?? today))) {
      setError("Choose a return date on or after your departure date.");
      return;
    }
    setError("");
    if (travelersRef.current) travelersRef.current.open = false;
    setRequest({
      tripType,
      legs: visibleLegs.map((leg) => ({ ...leg, from: leg.from.trim(), to: leg.to.trim() })),
      returnDate: tripType === "return" ? returnDate : "",
      adults: Number(adults),
      children: Number(children),
      infants: Number(infants),
      cabin,
      airline,
      direct,
      luggage,
    });
  }

  return (
    <main className="flights-page">
      <section aria-labelledby="flights-title" className="flights-hero">
        <img
          alt="An aircraft approaching the runway beneath a sunset sky"
          fetchPriority="high"
          src={asset("flight-hero.jpg")}
        />
        <div className="flights-hero-shade" />
        <div className="container flights-hero-content">
          <a href="#home">Home / Flights</a>
          <p>TAKE YOUR NEXT CHAPTER FURTHER</p>
          <h1 id="flights-title">
            Your next flight.
            <br />A world of possibilities.
          </h1>
          <span>Domestic and international flights from Pakistan, planned with KSB.</span>
        </div>
      </section>

      <div className="container">
        <form
          aria-label="Flight search"
          className="flights-search"
          data-trip-type={tripType}
          id="flights-search"
          onChange={clearRequest}
          onInvalid={(event) => {
            if (
              event.target instanceof HTMLInputElement &&
              travelersRef.current?.contains(event.target)
            )
              travelersRef.current.open = true;
          }}
          onSubmit={submitSearch}
          tabIndex={-1}
        >
          <div className="flights-search-heading">
            <h2>Find your next flight</h2>
            <span>KSB TRAVEL &amp; TOURISM</span>
          </div>
          <fieldset className="flights-trip-types">
            <legend className="flights-sr-only">Trip type</legend>
            {(Object.keys(tripLabels) as TripType[]).map((type) => (
              <label key={type}>
                <input
                  checked={tripType === type}
                  name="trip-type"
                  onChange={() => setTripType(type)}
                  type="radio"
                  value={type}
                />
                {tripLabels[type]}
              </label>
            ))}
          </fieldset>
          <datalist id="flights-airports">
            {airports.map((airport) => (
              <option key={airport.code} value={`${airport.city} (${airport.code})`} />
            ))}
          </datalist>
          <div className="flights-search-body">
            <div className="flights-legs">
              {visibleLegs.map((leg, index) => (
                <fieldset className="flights-leg" key={leg.id}>
                  <legend className={tripType === "multi-city" ? "" : "flights-sr-only"}>
                    Flight {index + 1}
                  </legend>
                  <div className="flights-leg-fields">
                    <label>
                      From
                      <input
                        aria-label={`Flight ${index + 1} from`}
                        autoComplete="off"
                        list="flights-airports"
                        maxLength={120}
                        onChange={(event) => updateLeg(leg.id, "from", event.target.value)}
                        placeholder="City or airport"
                        required
                        type="text"
                        value={leg.from}
                      />
                    </label>
                    <button
                      aria-label={`Swap flight ${index + 1} airports`}
                      className="flights-swap"
                      onClick={() => {
                        setLegs((current) =>
                          current.map((item) =>
                            item.id === leg.id ? { ...item, from: item.to, to: item.from } : item,
                          ),
                        );
                        clearRequest();
                      }}
                      type="button"
                    >
                      &#8644;
                    </button>
                    <label>
                      To
                      <input
                        aria-label={`Flight ${index + 1} to`}
                        autoComplete="off"
                        list="flights-airports"
                        maxLength={120}
                        onChange={(event) => updateLeg(leg.id, "to", event.target.value)}
                        placeholder="City or airport"
                        required
                        type="text"
                        value={leg.to}
                      />
                    </label>
                    <label>
                      Departure date
                      <input
                        aria-label={`Flight ${index + 1} departure date`}
                        min={visibleLegs[index - 1]?.date || today}
                        onChange={(event) => updateLeg(leg.id, "date", event.target.value)}
                        required
                        type="date"
                        value={leg.date}
                      />
                    </label>
                    {tripType === "return" && (
                      <label>
                        Return date
                        <input
                          min={leg.date || today}
                          onChange={(event) => setReturnDate(event.target.value)}
                          required
                          type="date"
                          value={returnDate}
                        />
                      </label>
                    )}
                    {tripType === "multi-city" && legs.length > 2 && (
                      <button
                        aria-label={`Remove flight ${index + 1}`}
                        className="flights-remove"
                        onClick={() => {
                          setLegs((current) => current.filter((item) => item.id !== leg.id));
                          clearRequest();
                        }}
                        type="button"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </fieldset>
              ))}
              {tripType === "multi-city" && (
                <button
                  className="flights-text-button"
                  onClick={() => {
                    const id = nextLegId.current++;
                    setLegs((current) => [
                      ...current,
                      {
                        id,
                        from: current.at(-1)?.to ?? "",
                        to: "",
                        date: current.at(-1)?.date ?? "",
                      },
                    ]);
                    clearRequest();
                  }}
                  type="button"
                >
                  + Add another flight
                </button>
              )}
            </div>
            <div className="flights-travelers">
              <span>Travelers</span>
              <details ref={travelersRef}>
                <summary>
                  {Number(adults) + Number(children) + Number(infants) || 0} traveler
                  {Number(adults) + Number(children) + Number(infants) === 1 ? "" : "s"}{" "}
                  <span aria-hidden="true">&#8964;</span>
                </summary>
                <div className="flights-travelers-panel">
                  <label>
                    <span>
                      Adults<small>12 years and over</small>
                    </span>
                    <input
                      aria-label="Adults"
                      min="1"
                      onChange={(event) => setAdults(event.target.value)}
                      required
                      step="1"
                      type="number"
                      value={adults}
                    />
                  </label>
                  <label>
                    <span>
                      Children<small>2 to 11 years</small>
                    </span>
                    <input
                      aria-label="Children"
                      min="0"
                      onChange={(event) => setChildren(event.target.value)}
                      required
                      step="1"
                      type="number"
                      value={children}
                    />
                  </label>
                  <label>
                    <span>
                      Infants<small>Under 2 years</small>
                    </span>
                    <input
                      aria-label="Infants"
                      min="0"
                      onChange={(event) => setInfants(event.target.value)}
                      required
                      step="1"
                      type="number"
                      value={infants}
                    />
                  </label>
                  <button
                    className="flights-text-button"
                    onClick={() => {
                      if (travelersRef.current) travelersRef.current.open = false;
                    }}
                    type="button"
                  >
                    Done
                  </button>
                </div>
              </details>
            </div>
          </div>
          <div className="flights-search-options">
            <label className="flights-check">
              <input
                checked={direct}
                onChange={(event) => setDirect(event.target.checked)}
                type="checkbox"
              />
              Direct flights only
            </label>
            <label className="flights-check">
              <input
                checked={luggage}
                onChange={(event) => setLuggage(event.target.checked)}
                type="checkbox"
              />
              With checked luggage
            </label>
            <label className="flights-select-label">
              Cabin class
              <select onChange={(event) => setCabin(event.target.value)} value={cabin}>
                {["Economy", "Premium economy", "Business", "First"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="flights-select-label">
              Preferred airline
              <select onChange={(event) => setAirline(event.target.value)} value={airline}>
                <option>Any airline</option>
                {airlines.map((item) => (
                  <option key={item.name}>{item.name}</option>
                ))}
              </select>
            </label>
            <button className="button button-lime flights-search-submit" type="submit">
              Search flights <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
          {error && (
            <p className="flights-error" role="alert">
              {error}
            </p>
          )}
          <p className="flights-search-note">
            Prepare an enquiry with our team. Live fares, online payment and ticketing are not
            connected.
          </p>
        </form>

        <section aria-label="Why plan your flight with KSB" className="flights-benefits">
          {benefits.map((benefit) => (
            <article key={benefit.title}>
              <img alt="" loading="lazy" src={asset(benefit.image)} />
              <h2>{benefit.title}</h2>
              <p>{benefit.text}</p>
            </article>
          ))}
        </section>
      </div>

      <section aria-labelledby="flights-destinations-title" className="flights-block flights-soft">
        <div className="container">
          <div className="flights-section-heading">
            <div>
              <p className="section-kicker">WHERE WILL YOU GO NEXT?</p>
              <h2 id="flights-destinations-title">Top destinations</h2>
            </div>
            <p>
              From familiar places to somewhere entirely new.
              <br />
              Choose a destination to start planning.
            </p>
          </div>
          <div className="flights-destination-grid">
            {destinations.map((destination) => (
              <button
                aria-label={`Plan a flight to ${destination.city}`}
                className="flights-destination-card"
                key={destination.code}
                onClick={() =>
                  chooseRoute(
                    legs[0]?.from || "Lahore (LHE)",
                    `${destination.city} (${destination.code})`,
                  )
                }
                type="button"
              >
                <img
                  alt={`${destination.city} city landmark`}
                  loading="lazy"
                  src={asset(destination.image)}
                />
                <span>
                  <strong>{destination.city}</strong>
                  <small>{destination.caption}</small>
                  <em>
                    Request a fare <span aria-hidden="true">&rarr;</span>
                  </em>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="flights-routes-title" className="container flights-block">
        <div className="flights-section-heading">
          <div>
            <p className="section-kicker">START YOUR JOURNEY CLOSER TO HOME</p>
            <h2 id="flights-routes-title">Your next international flight</h2>
          </div>
          <p>
            Explore routes from your preferred departure city.
            <br />
            Schedules and connections are confirmed with your quote.
          </p>
        </div>
        <div aria-label="Departure city" className="flights-city-tabs">
          {departureCities.map((city) => (
            <button
              aria-pressed={departureCity === `${city.city} (${city.code})`}
              className={departureCity === `${city.city} (${city.code})` ? "selected" : ""}
              key={city.code}
              onClick={() => setDepartureCity(`${city.city} (${city.code})`)}
              type="button"
            >
              <span>From</span>
              <strong>{city.city}</strong>
            </button>
          ))}
        </div>
        <div className="flights-route-links">
          {internationalAirports.map((city) => (
            <button
              key={city.code}
              onClick={() => chooseRoute(departureCity, `${city.city} (${city.code})`)}
              type="button"
            >
              {departureCity.split(" (")[0]} to {city.city}
              <span aria-hidden="true">&rarr;</span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="flights-airlines-title" className="flights-block flights-soft">
        <div className="container">
          <div className="flights-section-heading flights-heading-centered">
            <p className="section-kicker">FIND THE RIGHT FIT FOR YOUR JOURNEY</p>
            <h2 id="flights-airlines-title">Explore airlines for your next flight</h2>
            <p>
              Select an airline preference to discuss with KSB. Availability depends on your route
              and dates.
            </p>
          </div>
          <div className="flights-airline-grid">
            {airlines.map((item) => (
              <button
                aria-label={`Prefer ${item.name}`}
                aria-pressed={airline === item.name}
                key={item.name}
                onClick={() => {
                  setAirline(item.name);
                  clearRequest();
                  showSection("flights-search");
                }}
                type="button"
              >
                <img alt={item.name} loading="lazy" src={asset(item.image)} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container flights-guide flights-block">
        <article>
          <p className="section-kicker">FLIGHT PLANNING, MADE PERSONAL</p>
          <h2>Domestic &amp; international flights with KSB</h2>
          <p>
            A family visit, a business trip or a long-awaited holiday starts with the right flight.
            KSB Travel and Tourism helps you discuss routes, dates and fare options with a person
            who understands your plans.
          </p>
          <div className="flights-guide-columns">
            <section>
              <h3>Travel within Pakistan</h3>
              <p>
                Explore journeys between Karachi, Lahore, Islamabad and other Pakistani cities. Ask
                about direct services, flight times and the baggage you need for your trip.
              </p>
              <p>
                Traveling with children or older family members? Tell us about seating, mobility or
                assistance needs before arrangements are confirmed.
              </p>
            </section>
            <section>
              <h3>Travel beyond borders</h3>
              <p>
                Plan a journey to the Gulf, the UK, Asia or farther afield. Compare connections as
                well as total travel time, transit requirements and arrival airports.
              </p>
              <p>
                Combining your flights with a pilgrimage? Explore our{" "}
                <a href="#umrah">Umrah packages</a> for help planning your time in Makkah and
                Madinah.
              </p>
            </section>
          </div>
        </article>
        <article>
          <h2>Popular routes from Pakistan</h2>
          <div className="flights-guide-columns">
            <section>
              <h3>Pakistan to the United Kingdom</h3>
              <p>
                Discuss flights to London, Manchester and other UK destinations. Check whether a
                direct service or a connection best suits your plans, and allow time for any onward
                travel.
              </p>
            </section>
            <section>
              <h3>Middle East &amp; Gulf destinations</h3>
              <p>
                Dubai, Jeddah, Riyadh, Doha and Dammam are popular destinations for family visits,
                work and pilgrimage. Ask about suitable airports and onward transfers for your final
                destination.
              </p>
            </section>
          </div>
        </article>
        <article>
          <h2>Know your baggage before you fly</h2>
          <p>
            Allowances are specific to your ticket. Confirm every flight in a connecting or
            multi-airline itinerary rather than assuming the same rules apply throughout.
          </p>
          <div
            aria-label="Baggage planning guide"
            className="flights-table-wrap"
            role="region"
            tabIndex={0}
          >
            <table>
              <caption>What to confirm with your fare</caption>
              <thead>
                <tr>
                  <th scope="col">Baggage type</th>
                  <th scope="col">Details to check</th>
                  <th scope="col">Before departure</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Cabin baggage</th>
                  <td>Number of items, dimensions and weight</td>
                  <td>Check liquids and restricted-item rules</td>
                </tr>
                <tr>
                  <th scope="row">Checked baggage</th>
                  <td>Included pieces or total weight, and extra-bag fees</td>
                  <td>Check each traveler and each flight segment</td>
                </tr>
                <tr>
                  <th scope="row">Special items</th>
                  <td>Sports equipment, mobility aids and infant equipment</td>
                  <td>Request approval or assistance in advance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
        <article className="flights-status-guide">
          <div>
            <p className="section-kicker">BEFORE YOU LEAVE FOR THE AIRPORT</p>
            <h2>Check your flight status</h2>
            <p>
              Use your airline's official website or app with the flight number and date to check
              current departure times, delays and terminal information. Recheck close to departure;
              schedules can change.
            </p>
          </div>
          <div>
            <h3>Keep these details handy</h3>
            <ul>
              <li>Your airline and flight number</li>
              <li>The departure date and local time</li>
              <li>Your booking reference and travel document</li>
            </ul>
            <p>This page does not display live flight-tracking data.</p>
          </div>
        </article>
        <article>
          <div className="flights-section-heading flights-heading-centered">
            <h2>A few simple steps to your next journey</h2>
            <p>Know what happens next when you plan with KSB.</p>
          </div>
          <ol className="flights-steps">
            <li>
              <span>01</span>
              <h3>Choose your journey</h3>
              <p>Enter your cities, dates, travelers and preferred cabin.</p>
            </li>
            <li>
              <span>02</span>
              <h3>Talk to our team</h3>
              <p>Share your preferences and request current fares and options.</p>
            </li>
            <li>
              <span>03</span>
              <h3>Review the details</h3>
              <p>Check names, baggage, connections, total cost and fare conditions.</p>
            </li>
            <li>
              <span>04</span>
              <h3>Confirm &amp; prepare</h3>
              <p>Agree payment and ticketing with KSB, then check your travel documents.</p>
            </li>
          </ol>
        </article>
        <section aria-labelledby="flights-faq-title" className="flights-faq">
          <p className="section-kicker">HELPFUL ANSWERS FOR YOUR NEXT FLIGHT</p>
          <h2 id="flights-faq-title">Frequently asked questions</h2>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </section>
      </div>

      <section
        aria-labelledby="flights-enquiry-title"
        className="flights-enquiry flights-block"
        id="flights-enquiry"
        tabIndex={-1}
      >
        <div className="container flights-enquiry-layout">
          <div>
            <p className="section-kicker">YOUR JOURNEY. OUR COMMITMENT.</p>
            <h2 id="flights-enquiry-title">Let's plan your next flight.</h2>
            <p>Personal guidance from KSB Travel and Tourism, wherever life takes you.</p>
            <p>Alkabir Town Phase 2, Lahore, Pakistan</p>
            <button
              className="button button-outline"
              onClick={() => showSection("flights-search")}
              type="button"
            >
              {request ? "Edit flight preferences" : "Choose flight preferences"}{" "}
              <span aria-hidden="true">&uarr;</span>
            </button>
          </div>
          <div className="flights-enquiry-card">
            <h3>{request ? "Your flight preferences" : "Talk to the KSB team"}</h3>
            {request ? (
              <>
                <p className="flights-request-type">
                  {tripLabels[request.tripType]} &middot; {request.cabin}
                </p>
                <ol className="flights-request-legs">
                  {request.legs.map((leg) => (
                    <li key={leg.id}>
                      <strong>
                        {leg.from} <span aria-hidden="true">&rarr;</span> {leg.to}
                      </strong>
                      <span>{formatDate(leg.date)}</span>
                    </li>
                  ))}
                </ol>
                <dl>
                  {request.returnDate && (
                    <div>
                      <dt>Return date</dt>
                      <dd>{formatDate(request.returnDate)}</dd>
                    </div>
                  )}
                  <div>
                    <dt>Travelers</dt>
                    <dd>
                      {request.adults} adult(s), {request.children} child(ren), {request.infants}{" "}
                      infant(s)
                    </dd>
                  </div>
                  <div>
                    <dt>Airline</dt>
                    <dd>{request.airline}</dd>
                  </div>
                  <div>
                    <dt>Flight preference</dt>
                    <dd>{request.direct ? "Direct flights only" : "Connections considered"}</dd>
                  </div>
                  <div>
                    <dt>Baggage preference</dt>
                    <dd>{request.luggage ? "Checked luggage requested" : "Confirm with fare"}</dd>
                  </div>
                </dl>
              </>
            ) : (
              <p>
                Use the search form to prepare your route and dates, or contact us directly for help
                getting started.
              </p>
            )}
            <a className="button" href={contactUrl} rel="noreferrer" target="_blank">
              Contact KSB for flight options <span aria-hidden="true">&nearr;</span>
            </a>
            <p className="flights-enquiry-note">
              This opens our contact page. Your preferences are not sent automatically; share them
              with our team. No enquiry, payment or booking has been submitted.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
