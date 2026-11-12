import { useState, type FormEvent } from "react";
import { contactUrl, publicAsset, showSection } from "./site";

const asset = (filename: string) => publicAsset(`umrah/${filename}`);
const durations = [7, 10, 14, 15, 21, 28];
const cities = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Multan",
  "Quetta",
  "Peshawar",
  "Faisalabad",
  "Sialkot",
];

const packages = [
  {
    name: "Economy",
    makkah: "Value-focused accommodation",
    madinah: "Practical, comfortable stays",
    description:
      "Explore budget-conscious hotels and compare transport options before choosing your itinerary.",
  },
  {
    name: "Near Haram",
    makkah: "Hotels closer to Al-Haram",
    madinah: "Hotels closer to Al-Masjid an-Nabawi",
    description:
      "Ask for walking distances, accessible routes and room availability near the holy mosques.",
  },
  {
    name: "3 Star",
    makkah: "3-star hotel options",
    madinah: "3-star hotel options",
    description:
      "Balance everyday comfort with your budget. Specific hotels and facilities are confirmed in your quote.",
  },
  {
    name: "Shuttle",
    makkah: "Hotels with shuttle options",
    madinah: "Accommodation to suit your plans",
    description:
      "Compare hotel shuttle schedules, pickup points and journey times with our team before booking.",
  },
  {
    name: "4 Star",
    makkah: "4-star hotel options",
    madinah: "4-star hotel options",
    description:
      "Discuss a comfortable stay with the room arrangements and facilities that matter to your group.",
  },
  {
    name: "5 Star",
    makkah: "5-star hotel options",
    madinah: "5-star hotel options",
    description:
      "Explore premium accommodation and tailored transfers. Hotel names, views and meal plans are subject to confirmation.",
  },
];

const options = [
  { title: "5 Star Packages", image: "5-star-umra-icon.webp" },
  { title: "4 Star Packages", image: "4star umrah.webp" },
  { title: "3 Star Packages", image: "3 star umrah.webp" },
  { title: "Short Packages", image: "short-umrah.webp" },
  { title: "Ramadan Packages", image: "ramadan-umrah.webp" },
  { title: "Rabi ul Awwal Packages", image: "Rabi ul Awwal Packages.webp" },
  { title: "Family Umrah Packages", image: "family-umrah.png" },
  { title: "Makkah Ziarat", image: "makkah-icon.png" },
  { title: "Madinah Ziarat", image: "madinah-icon.png" },
  { title: "How to Perform Umrah", image: "how-to-peromr.webp" },
];

const extras = [
  {
    country: "Saudi Arabia",
    image: "saudi-umrah.png",
    label: "Discover a little more",
    description: "Discuss a visit to Jeddah or Taif alongside your time in the holy cities.",
  },
  {
    country: "Qatar",
    image: "qatar-umrah.png",
    label: "A stopover to remember",
    description: "Explore the possibility of a Doha stopover with your onward journey.",
  },
  {
    country: "Dubai",
    image: "dubai-umrah.png",
    label: "Make time for family",
    description: "Ask about combining your pilgrimage with a short family break in Dubai.",
  },
];

const inclusions = [
  {
    title: "Return flights",
    image: "u-flight-icon-1.webp",
    text: "Compare departure airports, baggage allowances and flight connections.",
  },
  {
    title: "Umrah visa",
    image: "u-visa-icon-1.webp",
    text: "Get guidance on the documents and visa requirements for your journey.",
  },
  {
    title: "Hotel accommodation",
    image: "u-hotel-icon-1.webp",
    text: "Choose your preferred room type, location and nights in each holy city.",
  },
  {
    title: "Ground transport",
    image: "u-transport-icon-1.webp",
    text: "Discuss airport transfers and travel between Makkah and Madinah.",
  },
  {
    title: "Travel insurance",
    image: "insurance-icon-1.webp",
    text: "Check applicable cover, exclusions and current entry requirements.",
  },
  {
    title: "Ziarat visits",
    image: "makkah-icon.png",
    text: "Ask about optional visits and whether they fit your itinerary.",
  },
];

const faqs = [
  {
    question: "How many days should I plan for Umrah?",
    answer:
      "The right length depends on your travel dates, pace and time in each city. Explore 7, 10, 14, 15, 21 or 28 days, or ask KSB for a custom itinerary.",
  },
  {
    question: "How much does an Umrah package from Pakistan cost?",
    answer:
      "Prices depend on flights, dates, hotel location, room sharing and transport. Request a written quote from KSB Travel and Tourism for your exact group and dates. The options on this page are not live priced offers.",
  },
  {
    question: "What can my package include?",
    answer:
      "You can discuss flights, visa assistance, accommodation and transfers, with optional meals or Ziarat. Only the services listed in your final confirmed quote are included.",
  },
  {
    question: "When is the most affordable time to travel?",
    answer:
      "Demand, flight schedules and hotel availability affect prices. Compare several departure dates with our team; peak periods such as Ramadan can have higher demand.",
  },
  {
    question: "Can I customize hotels and the length of my stay?",
    answer:
      "Yes, discuss your preferred hotels, room arrangements and number of nights in Makkah and Madinah. Availability and the final itinerary must be confirmed before payment.",
  },
  {
    question: "Can families and solo travelers request a package?",
    answer:
      "Both families and individual travelers can request a tailored quote. Tell our team about children, room-sharing preferences and any mobility needs so suitable arrangements can be discussed.",
  },
  {
    question: "What documents and visa do I need?",
    answer:
      "Requirements depend on your nationality, residency and the current Saudi rules. Confirm passport validity, visa eligibility and any health or permit requirements with our team and official authorities before booking.",
  },
  {
    question: "How do I book with KSB Travel and Tourism?",
    answer:
      "Choose your preferences on this page, then contact our team. Review your written itinerary, inclusions, price and payment and cancellation terms before confirming. Using this page does not make a booking or submit an enquiry.",
  },
];

export default function UmrahPage() {
  const [duration, setDuration] = useState("7");
  const [passengers, setPassengers] = useState("2");
  const [category, setCategory] = useState("All packages");
  const [city, setCity] = useState("Lahore");
  const [interest, setInterest] = useState("Customized Umrah package");
  const [searchSummary, setSearchSummary] = useState("");

  const visiblePackages = packages.filter(
    (item) => category === "All packages" || item.name === category,
  );

  function enquire(subject: string) {
    setInterest(subject);
    showSection("umrah-enquiry");
  }

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchSummary(
      "Your preferences are ready to explore. Select a package below to discuss a personalized quote.",
    );
    showSection("umrah-results");
  }

  return (
    <main className="umrah-page">
      <section aria-labelledby="umrah-page-title" className="umrah-hero">
        <img
          alt="The Kaaba at Masjid al-Haram in Makkah"
          fetchPriority="high"
          src={`${import.meta.env.BASE_URL}umrah-packages-fro-pakistan-price.jpg`}
        />
        <div className="umrah-hero-overlay" />
        <div className="container umrah-hero-content">
          <a className="umrah-breadcrumb" href="#home">
            Home / Umrah
          </a>
          <p>YOUR JOURNEY OF FAITH, OUR PERSONAL CARE</p>
          <h1 id="umrah-page-title">Umrah Packages from Pakistan</h1>
          <span>A meaningful journey. Thoughtfully planned with KSB.</span>
        </div>
      </section>

      <div className="container">
        <form aria-label="Find an Umrah package" className="umrah-finder" onSubmit={search}>
          <h2>Find your customized Umrah package</h2>
          <div className="umrah-finder-fields">
            <label>
              Duration of your journey
              <select value={duration} onChange={(event) => setDuration(event.target.value)}>
                {durations.map((days) => (
                  <option key={days} value={days}>
                    {days} days
                  </option>
                ))}
              </select>
            </label>
            <label>
              How many travelers?
              <select value={passengers} onChange={(event) => setPassengers(event.target.value)}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                  <option key={count} value={count}>
                    {count} traveler{count === 1 ? "" : "s"}
                  </option>
                ))}
                <option value="10+">More than 10 travelers</option>
              </select>
            </label>
            <label>
              Package type
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option>All packages</option>
                {packages.map((item) => (
                  <option key={item.name}>{item.name}</option>
                ))}
              </select>
            </label>
            <button className="button button-lime" type="submit">
              Search packages <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </form>
        <div className="umrah-intro">
          <p>
            Your pilgrimage deserves time, care and thoughtful planning. At{" "}
            <strong>KSB Travel and Tourism</strong>, we help you explore Umrah arrangements around
            your family, your budget and the time you want to spend in Makkah and Madinah.
          </p>
          <p>
            From a short visit to a longer stay, discuss flights, hotels, visa guidance and
            transfers with our team. Start with an option below and let us help you shape your
            journey.
          </p>
        </div>
      </div>

      <section aria-labelledby="umrah-cities-title" className="umrah-block umrah-soft">
        <div className="container">
          <div className="umrah-section-heading">
            <p className="section-kicker">CLOSER TO HOME, CLOSER TO YOUR JOURNEY</p>
            <h2 id="umrah-cities-title">Umrah packages from your city</h2>
            <p>Choose your departure city to personalize your package enquiry.</p>
          </div>
          <div className="umrah-city-grid" aria-label="Departure city">
            {cities.map((name) => (
              <button
                aria-pressed={city === name}
                className={city === name ? "selected" : ""}
                key={name}
                onClick={() => setCity(name)}
                type="button"
              >
                <img alt="" loading="lazy" src={asset(`${name.toLowerCase()}.png`)} />
                <span>{name}</span>
              </button>
            ))}
          </div>
          <p className="umrah-selection-note" role="status">
            Your departure city: <strong>{city}</strong>
          </p>
        </div>
      </section>

      <section aria-labelledby="umrah-durations-title" className="container umrah-block">
        <div className="umrah-section-heading">
          <h2 id="umrah-durations-title">A journey that fits your time</h2>
          <p>
            A focused visit or a more relaxed stay. Choose the duration that feels right for you.
          </p>
        </div>
        <div className="umrah-duration-grid" aria-label="Package duration">
          {durations.map((days) => (
            <button
              aria-pressed={duration === String(days)}
              className={duration === String(days) ? "selected" : ""}
              key={days}
              onClick={() => setDuration(String(days))}
              type="button"
            >
              <strong>{days}</strong>
              <span>Days</span>
            </button>
          ))}
        </div>
        <div className="umrah-centered-action">
          <button
            className="button"
            onClick={() => enquire("Custom duration and itinerary")}
            type="button"
          >
            Make my custom package <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </section>

      <section
        aria-labelledby="umrah-results-title"
        className="container umrah-block umrah-results"
        id="umrah-results"
        tabIndex={-1}
      >
        <div className="umrah-section-heading">
          <p className="section-kicker">YOUR STAY, YOUR WAY</p>
          <h2 id="umrah-results-title">Explore Umrah packages from Pakistan</h2>
          <p>
            Compare accommodation styles for your journey. Ask us for a personalized price with
            flights, visa assistance, hotels and transport clearly itemized.
          </p>
        </div>
        <div aria-label="Compare package durations" className="umrah-duration-tabs">
          {durations.map((days) => (
            <button
              aria-pressed={duration === String(days)}
              className={duration === String(days) ? "selected" : ""}
              key={days}
              onClick={() => setDuration(String(days))}
              type="button"
            >
              {days} Days
            </button>
          ))}
        </div>
        <div className="umrah-results-bar">
          <p role="status">
            {duration}-day options from {city} &middot; {passengers} traveler
            {passengers === "1" ? "" : "s"} &middot; {visiblePackages.length} package styles
          </p>
          {category !== "All packages" && (
            <button
              className="umrah-text-button"
              onClick={() => {
                setCategory("All packages");
                setSearchSummary("");
              }}
              type="button"
            >
              Show all styles
            </button>
          )}
        </div>
        {searchSummary && (
          <p className="umrah-search-status" role="status">
            {searchSummary}
          </p>
        )}
        <div className="umrah-package-list">
          {visiblePackages.map((item) => (
            <article
              aria-label={`${item.name} Umrah package`}
              className="umrah-package-row"
              key={item.name}
            >
              <div className="umrah-package-tier">
                <span aria-hidden="true">&#10022;</span>
                <h3>{item.name}</h3>
                <small>{duration} days</small>
              </div>
              <div className="umrah-hotel">
                <img alt="" loading="lazy" src={asset("makkah-icon.png")} />
                <div>
                  <small>MAKKAH</small>
                  <h4>{item.makkah}</h4>
                  <span>Hotel confirmed with your quote</span>
                </div>
              </div>
              <div className="umrah-hotel">
                <img alt="" loading="lazy" src={asset("madinah-icon.png")} />
                <div>
                  <small>MADINAH</small>
                  <h4>{item.madinah}</h4>
                  <span>Room options on request</span>
                </div>
              </div>
              <p className="umrah-package-services">
                Discuss flights, visa, hotels &amp; transfers
              </p>
              <div className="umrah-package-price">
                <small>Personalized pricing</small>
                <strong>Request a quote</strong>
                <button onClick={() => enquire(`${item.name} Umrah package`)} type="button">
                  Enquire now <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
              <details className="umrah-package-details">
                <summary>Package details</summary>
                <p>
                  {item.description} Your {duration}-day itinerary, nights in each city, inclusions
                  and cancellation terms will be agreed with KSB before booking.
                </p>
              </details>
            </article>
          ))}
        </div>
        <p className="umrah-disclaimer">
          These are planning options, not confirmed offers. Prices, hotels, availability and
          inclusions are confirmed in your individual quote. No payment or booking is made on this
          page.
        </p>
      </section>

      <section aria-labelledby="umrah-help-title" className="umrah-help">
        <div className="container">
          <span className="umrah-help-icon" aria-hidden="true">
            &#10022;
          </span>
          <h2 id="umrah-help-title">A real person. Every step of the way.</h2>
          <p>
            Have a question about your Umrah plans? Talk through your dates, hotel preferences and
            family arrangements with the KSB team.
          </p>
          <a className="button button-lime" href="#umrah/enquiry">
            Talk to our Umrah team <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>

      <section aria-labelledby="umrah-options-title" className="container umrah-block">
        <div className="umrah-section-heading">
          <h2 id="umrah-options-title">More Umrah options</h2>
          <p>Different ways to plan a journey that is personal to you.</p>
        </div>
        <div className="umrah-options-grid">
          {options.map((option) => (
            <button
              key={option.title}
              onClick={() =>
                option.title === "How to Perform Umrah"
                  ? showSection("umrah-guide")
                  : enquire(option.title)
              }
              type="button"
            >
              <img alt="" loading="lazy" src={asset(option.image)} />
              <span>{option.title}</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="umrah-plus-title" className="umrah-soft umrah-block">
        <div className="container">
          <div className="umrah-section-heading">
            <p className="section-kicker">ONE JOURNEY, MORE POSSIBILITIES</p>
            <h2 id="umrah-plus-title">Umrah + a little more discovery</h2>
            <p>
              Ask about adding a stopover or a family holiday to your pilgrimage, subject to visas
              and flight availability.
            </p>
          </div>
          <div className="umrah-plus-grid">
            {extras.map((extra) => (
              <article className="umrah-plus-card" key={extra.country}>
                <img
                  alt={`${extra.country} travel inspiration`}
                  loading="lazy"
                  src={asset(extra.image)}
                />
                <div>
                  <small>{extra.label}</small>
                  <h3>Umrah + {extra.country}</h3>
                  <p>{extra.description}</p>
                  <button
                    className="umrah-text-button"
                    onClick={() => enquire(`Umrah + ${extra.country}`)}
                    type="button"
                  >
                    Explore this journey <span aria-hidden="true">&rarr;</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="umrah-inclusions-title" className="container umrah-block">
        <div className="umrah-section-heading">
          <h2 id="umrah-inclusions-title">What goes into an Umrah package?</h2>
          <p>
            Bring the important details together. We will help you understand what is included
            before you confirm.
          </p>
        </div>
        <div className="umrah-inclusions-grid">
          {inclusions.map((item) => (
            <article key={item.title}>
              <img alt="" loading="lazy" src={asset(item.image)} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="umrah-booking-title" className="umrah-soft umrah-block">
        <div className="container">
          <div className="umrah-section-heading">
            <p className="section-kicker">SIMPLE STEPS. THOUGHTFUL SUPPORT.</p>
            <h2 id="umrah-booking-title">How to plan your Umrah with KSB</h2>
          </div>
          <ol className="umrah-steps">
            <li>
              <span>01</span>
              <h3>Find your package</h3>
              <p>Choose your departure city, duration and preferred style of stay.</p>
            </li>
            <li>
              <span>02</span>
              <h3>Make it personal</h3>
              <p>Discuss dates, rooms, accessibility and any special requests with our team.</p>
            </li>
            <li>
              <span>03</span>
              <h3>Review your quote</h3>
              <p>
                Check the itinerary, total cost, inclusions and cancellation terms before payment.
              </p>
            </li>
            <li>
              <span>04</span>
              <h3>Prepare for departure</h3>
              <p>
                Once confirmed, review your travel documents, bookings and transfer arrangements.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section aria-labelledby="umrah-hotels-title" className="container umrah-block">
        <div className="umrah-section-heading">
          <h2 id="umrah-hotels-title">Choosing the right hotel for your journey</h2>
          <p>The best stay is one that works for your needs, not just its star rating.</p>
        </div>
        <div className="umrah-advice-grid">
          <article>
            <span>01 / SOLO TRAVELERS</span>
            <h3>A comfortable base</h3>
            <p>
              Compare room-sharing arrangements, transport links and the flexibility you need for
              your stay.
            </p>
          </article>
          <article>
            <span>02 / FAMILIES</span>
            <h3>Space for everyone</h3>
            <p>
              Ask about family rooms, meal plans, lifts and practical walking routes with children
              or older relatives.
            </p>
          </article>
          <article>
            <span>03 / CONVENIENCE</span>
            <h3>Keep the distance in mind</h3>
            <p>
              Check the actual walking route to mosque entrances. Map distance alone may not reflect
              access or crowds.
            </p>
          </article>
          <article>
            <span>04 / VALUE</span>
            <h3>Make your budget go further</h3>
            <p>
              Consider hotels a little farther away, but confirm shuttle availability, frequency and
              additional costs.
            </p>
          </article>
        </div>
      </section>

      <section
        aria-labelledby="umrah-guide-title"
        className="umrah-soft umrah-block"
        id="umrah-guide"
        tabIndex={-1}
      >
        <div className="container umrah-guide-layout">
          <div>
            <p className="section-kicker">PREPARE WITH PEACE OF MIND</p>
            <h2 id="umrah-guide-title">Make space for what matters most.</h2>
            <p>
              Plan the practical details early so you can give your journey the attention it
              deserves.
            </p>
            <a className="button" href="#umrah/enquiry">
              Ask KSB for guidance <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <div className="umrah-guide-points">
            <article>
              <h3>Before you travel</h3>
              <p>
                Confirm current entry and health requirements, keep copies of your documents and
                check baggage allowances.
              </p>
            </article>
            <article>
              <h3>Learn about the pilgrimage</h3>
              <p>
                Study Ihram, Tawaf, Sa'i and the completion of Umrah with a trusted religious guide.
                Confirm any permit requirements through official Saudi channels.
              </p>
            </article>
            <article>
              <h3>Take care of yourself</h3>
              <p>
                Allow time to rest, plan for the weather and discuss any mobility or medical needs
                with the appropriate professionals before departure.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="umrah-services-title" className="container umrah-block">
        <div className="umrah-section-heading">
          <h2 id="umrah-services-title">Need help with just part of your journey?</h2>
          <p>Already have some arrangements in place? Tell us what you still need.</p>
        </div>
        <div className="umrah-service-links">
          {["Hotels", "Transport", "Visa guidance", "Flight tickets"].map((service) => (
            <button
              key={service}
              onClick={() => enquire(`Umrah ${service.toLowerCase()}`)}
              type="button"
            >
              {service}
              <span aria-hidden="true">&rarr;</span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="umrah-faq-title" className="container umrah-block umrah-faq">
        <div className="umrah-section-heading">
          <p className="section-kicker">A LITTLE CLARITY BEFORE YOU GO</p>
          <h2 id="umrah-faq-title">Frequently asked questions</h2>
        </div>
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>

      <section
        aria-labelledby="umrah-enquiry-title"
        className="umrah-enquiry umrah-block"
        id="umrah-enquiry"
        tabIndex={-1}
      >
        <div className="container umrah-enquiry-layout">
          <div>
            <p className="section-kicker">LET'S PLAN YOUR JOURNEY</p>
            <h2 id="umrah-enquiry-title">Your Umrah starts with a conversation.</h2>
            <p>
              Personal guidance from KSB Travel and Tourism, from your first question to your travel
              preparations.
            </p>
            <p className="umrah-enquiry-address">Alkabir Town Phase 2, Lahore, Pakistan</p>
          </div>
          <div className="umrah-enquiry-card">
            <h3>Your travel preferences</h3>
            <dl>
              <div>
                <dt>Interested in</dt>
                <dd>{interest}</dd>
              </div>
              <div>
                <dt>Departing from</dt>
                <dd>{city}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{duration} days</dd>
              </div>
              <div>
                <dt>Travelers</dt>
                <dd>{passengers}</dd>
              </div>
              <div>
                <dt>Package style</dt>
                <dd>{category}</dd>
              </div>
            </dl>
            <a className="button" href={contactUrl} rel="noreferrer" target="_blank">
              Contact KSB for a quote <span aria-hidden="true">&nearr;</span>
            </a>
            <p>
              This opens our contact page. Share these preferences with our team; they are not sent
              automatically. No enquiry has been submitted yet.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
