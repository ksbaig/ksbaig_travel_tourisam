import { useState, type FormEvent } from "react";
import { showSection, publicAsset } from "./site";

type Vehicle = {
  name: string;
  image: string;
  type: string;
  passengers: string;
  transmission: string;
  note: string;
};

const vehicles: Vehicle[] = [
  {
    name: "Coaster Classic",
    image: "coaster-classic-1.jpg",
    type: "Vans & buses",
    passengers: "Up to 22 passengers",
    transmission: "Manual",
    note: "A practical choice for family groups and shared transfers.",
  },
  {
    name: "Coaster Saloon",
    image: "saloon-coaster-1_1.jpg",
    type: "Vans & buses",
    passengers: "Up to 22 passengers",
    transmission: "Manual",
    note: "Comfortable group transport for city and intercity travel.",
  },
  {
    name: "Corolla GLi (2010–14)",
    image: "Corolla-GLi-2010-13-Model.jpg",
    type: "Cars",
    passengers: "Up to 4 passengers",
    transmission: "Manual",
    note: "A compact option for everyday city journeys.",
  },
  {
    name: "Corolla GLi (2015)",
    image: "GLi-2016-Model.jpg",
    type: "Cars",
    passengers: "Up to 4 passengers",
    transmission: "Manual",
    note: "A refined sedan for airport transfers and touring.",
  },
  {
    name: "Land Cruiser V8",
    image: "land-cruiser-v8-2015.jpg",
    type: "SUVs",
    passengers: "Up to 4 passengers",
    transmission: "Automatic",
    note: "Roomy, capable transport for longer routes.",
  },
  {
    name: "Luxury Bus",
    image: "Luxury-bus-2012.jpg",
    type: "Vans & buses",
    passengers: "Up to 32 passengers",
    transmission: "Automatic",
    note: "A group option for events, conferences and tours.",
  },
  {
    name: "Mountain Jeep",
    image: "mountain-jeep-rent-3.jpg",
    type: "4x4 & mountain travel",
    passengers: "Small groups",
    transmission: "To confirm",
    note: "Ask about vehicle suitability for mountain routes and conditions.",
  },
  {
    name: "Prado",
    image: "Prado-2010.jpg",
    type: "SUVs",
    passengers: "Up to 7 passengers",
    transmission: "Automatic",
    note: "A versatile SUV for family journeys and touring.",
  },
];

const faqs = [
  [
    "Can I rent with a driver?",
    "Yes, ask KSB to include a driver in your enquiry. Driver availability, route permissions and working hours must be confirmed for each itinerary.",
  ],
  [
    "Are rates shown online?",
    "No. Vehicle availability and rates vary by vehicle, dates, route, mileage, driver and season. KSB will confirm a written quote before you decide.",
  ],
  [
    "Can I use a vehicle for northern areas?",
    "Some routes require a suitable 4x4, local driver and weather-aware planning. Share the route so the appropriate vehicle can be checked.",
  ],
];

export default function CarRentalPage() {
  const [filter, setFilter] = useState("All");
  const [vehicle, setVehicle] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pickup, setPickup] = useState("");
  const [dates, setDates] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const filtered = filter === "All" ? vehicles : vehicles.filter((item) => item.type === filter);

  function chooseVehicle(name: string) {
    setVehicle(name);
    setError("");
    showSection("car-rental-enquiry");
  }

  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 2) return setError("Enter your name.");
    const digits = mobile.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15)
      return setError("Enter a mobile number with 10 to 15 digits.");
    if (!pickup.trim()) return setError("Enter a pickup location.");
    if (!vehicle) return setError("Choose a vehicle or service.");
    setError("");
    setSummary(
      `${name.trim()} asked KSB Travel and Tourism about ${vehicle} rental from ${pickup.trim()}${dates.trim() ? ` for ${dates.trim()}` : ""}.${notes.trim() ? ` Note: ${notes.trim()}` : ""} This summary is saved on this page only and has not been submitted.`,
    );
  }

  return (
    <main className="car-rental-page">
      <section className="car-rental-hero" aria-labelledby="car-rental-title">
        <div className="container car-rental-hero-content">
          <a className="car-rental-back" href="#home">
            ← Back to KSB home
          </a>
          <p className="section-kicker">KSB TRAVEL AND TOURISM</p>
          <h1 id="car-rental-title">Car rental for every journey</h1>
          <p>
            Choose practical cars, SUVs, vans and buses for airport transfers, city travel, family
            trips and routes across Pakistan.
          </p>
          <button className="button" onClick={() => showSection("car-rental-fleet")} type="button">
            View our fleet <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <section
        className="container car-rental-fleet"
        id="car-rental-fleet"
        tabIndex={-1}
        aria-labelledby="car-rental-fleet-title"
      >
        <div className="car-rental-heading">
          <div>
            <p className="section-kicker">TRAVEL YOUR WAY</p>
            <h2 id="car-rental-fleet-title">Explore the vehicle range</h2>
          </div>
          <p>
            Vehicle images and categories are reference-inspired. Confirm the exact model,
            condition, availability, inclusions and route suitability with KSB before travel.
          </p>
        </div>
        <div className="car-rental-filters" aria-label="Vehicle categories">
          {["All", "Cars", "SUVs", "Vans & buses", "4x4 & mountain travel"].map((item) => (
            <button
              className={filter === item ? "active" : ""}
              key={item}
              onClick={() => setFilter(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="car-rental-grid">
          {filtered.map((item) => (
            <article className="vehicle-card" key={item.name}>
              <img alt={item.name} src={publicAsset(`car-rental/${item.image}`)} />
              <div className="vehicle-card-body">
                <p className="vehicle-type">{item.type}</p>
                <h3>{item.name}</h3>
                <p>{item.note}</p>
                <dl>
                  <div>
                    <dt>Capacity</dt>
                    <dd>{item.passengers}</dd>
                  </div>
                  <div>
                    <dt>Transmission</dt>
                    <dd>{item.transmission}</dd>
                  </div>
                </dl>
                <button onClick={() => chooseVehicle(item.name)} type="button">
                  Ask about this vehicle <span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="car-rental-band" aria-labelledby="car-rental-use-title">
        <div className="container">
          <p className="section-kicker">MORE THAN A CAR</p>
          <h2 id="car-rental-use-title">A simple way to plan road travel</h2>
          <div className="car-rental-use-grid">
            <article>
              <strong>01</strong>
              <h3>Tell us the route</h3>
              <p>Share pickup, drop-off, dates and the places you want to visit.</p>
            </article>
            <article>
              <strong>02</strong>
              <h3>Match the vehicle</h3>
              <p>We can discuss capacity, luggage, road conditions and driver needs.</p>
            </article>
            <article>
              <strong>03</strong>
              <h3>Confirm the details</h3>
              <p>Review the written availability and quote before making a decision.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="container car-rental-faq" aria-labelledby="car-rental-faq-title">
        <p className="section-kicker">COMMON QUESTIONS</p>
        <h2 id="car-rental-faq-title">Car rental, explained</h2>
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>

      <section
        className="container car-rental-enquiry"
        id="car-rental-enquiry"
        tabIndex={-1}
        aria-labelledby="car-rental-enquiry-title"
      >
        <div>
          <p className="section-kicker">KSB TRAVEL AND TOURISM</p>
          <h2 id="car-rental-enquiry-title">Plan your vehicle enquiry</h2>
          <p>
            Tell us what you need and KSB can help you check suitable options. This form prepares a
            local summary only; it does not reserve a vehicle or process payment.
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
            Vehicle or service
            <select onChange={(event) => setVehicle(event.target.value)} required value={vehicle}>
              <option value="">Choose an option</option>
              {vehicles.map((item) => (
                <option key={item.name}>{item.name}</option>
              ))}
              <option>Vehicle with driver</option>
              <option>Group transfer</option>
            </select>
          </label>
          <label>
            Pickup location
            <input onChange={(event) => setPickup(event.target.value)} required value={pickup} />
          </label>
          <label>
            Travel dates
            <input
              onChange={(event) => setDates(event.target.value)}
              placeholder="e.g. 12–15 August"
              value={dates}
            />
          </label>
          <label className="car-rental-full">
            Route or notes
            <textarea onChange={(event) => setNotes(event.target.value)} value={notes} />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button car-rental-full" type="submit">
            Prepare enquiry summary <span aria-hidden="true">↗</span>
          </button>
          {summary && (
            <p className="form-success car-rental-full" role="status">
              {summary}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
