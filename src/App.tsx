import { useState, type FormEvent, type ReactNode } from "react";

type IconName =
  | "arrow"
  | "calendar"
  | "compass"
  | "globe"
  | "graduation"
  | "heart"
  | "location"
  | "menu"
  | "spark"
  | "users";

type Service = "Tours & Packages" | "Study Abroad" | "Migration";

const publicAsset = (filename: string) => `${import.meta.env.BASE_URL}${filename}`;

const services: Service[] = ["Tours & Packages", "Study Abroad", "Migration"];

const destinations = [
  {
    category: "Nature & adventure",
    country: "Pakistan",
    name: "Hunza & Skardu",
    image: publicAsset("hunza-hero.jpg"),
    alt: "Snow-capped Karakoram mountains above the green Hunza Valley",
  },
  {
    category: "Culture & discovery",
    country: "Türkiye",
    name: "Discover Türkiye",
    image: publicAsset("istanbul.jpg"),
    alt: "Istanbul's historic skyline and waterfront at sunset",
  },
  {
    category: "City escape",
    country: "United Arab Emirates",
    name: "The Dubai Escape",
    image: publicAsset("dubai.jpg"),
    alt: "Dubai skyline rising above the waterfront",
  },
  {
    category: "Island getaway",
    country: "Maldives",
    name: "Magical Maldives",
    image: publicAsset("maldives.jpg"),
    alt: "Overwater villas on a tropical Maldives lagoon",
  },
];

const searchOptions: Record<Service, string[]> = {
  "Tours & Packages": ["Pakistan", "Türkiye", "United Arab Emirates", "Maldives"],
  "Study Abroad": ["United Kingdom", "Canada", "Australia", "Türkiye"],
  Migration: ["Canada", "Australia", "United Kingdom", "New Zealand"],
};

const serviceIcon: Record<Service, IconName> = {
  "Tours & Packages": "compass",
  "Study Abroad": "graduation",
  Migration: "globe",
};

function Icon({ name, className }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </>
    ),
    graduation: (
      <>
        <path d="m2 10 10-5 10 5-10 5-10-5Z" />
        <path d="M6 12v5c3.5 3 8.5 3 12 0v-5M22 10v6" />
      </>
    ),
    heart: (
      <path d="M20.8 8.6c0 5.2-8.8 10.3-8.8 10.3S3.2 13.8 3.2 8.6a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2Z" />
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    spark: (
      <>
        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
        <path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}

function Brand() {
  return (
    <a aria-label="KSB Travel and Tourism home" className="brand" href="#home">
      <span className="brand-symbol" aria-hidden="true">
        <svg fill="none" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="21" />
          <path d="m34 12-6 16-4-4-8 8-3-3 8-8-4-4 17-5Z" />
          <path d="M7 36c12 1 25-8 35-20" />
        </svg>
      </span>
      <span className="brand-copy">
        <strong>KSB.</strong>
        <small>TRAVEL &amp; TOURISM</small>
      </span>
    </a>
  );
}

function App() {
  const [activeService, setActiveService] = useState<Service>("Tours & Packages");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState("1 traveler");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const place = destination || "your next destination";
    const when = travelDate
      ? ` around ${new Date(`${travelDate}T00:00:00`).toLocaleDateString("en", {
          month: "long",
          year: "numeric",
        })}`
      : "";
    setSearchMessage(
      `Your ${activeService.toLowerCase()} journey to ${place}${when} for ${travelers} is ready to plan. Let's talk!`,
    );
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>
            <Icon name="location" />
            Alkabir Town Phase 2, Lahore, Pakistan
          </span>
          <span className="topbar-promise">
            <Icon name="globe" />
            Your journey. Our commitment.
          </span>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <button
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="menu-toggle"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            type="button"
          >
            <Icon name="menu" />
          </button>
          <nav
            aria-label="Main navigation"
            className={`primary-nav${menuOpen ? " is-open" : ""}`}
            id="primary-navigation"
          >
            <a className="active" href="#home" onClick={closeMenu}>
              Home
            </a>
            <a href="#destinations" onClick={closeMenu}>
              Tours &amp; Packages
            </a>
            <a href="#study-abroad" onClick={closeMenu}>
              Study Abroad
            </a>
            <a href="#migration" onClick={closeMenu}>
              Migration
            </a>
            <a href="#about" onClick={closeMenu}>
              About Us
            </a>
          </nav>
          <a className="button header-cta" href="#contact">
            Let’s Plan Your Trip <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <main>
        <section aria-labelledby="hero-title" className="hero" id="home">
          <img
            alt=""
            className="hero-image"
            fetchPriority="high"
            src={publicAsset("hunza-hero.jpg")}
          />
          <div className="hero-shade" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="hero-eyebrow">
                <Icon name="spark" />A world of possibilities awaits
              </span>
              <h1 id="hero-title">
                Travel. Explore.
                <br />
                <span>Begin your next chapter.</span>
              </h1>
              <p>
                Unforgettable holidays, global education, and new beginnings.
                <br />
                Wherever you’re headed, go further with KSB.
              </p>
              <div className="hero-actions">
                <a className="button button-lime" href="#destinations">
                  Explore Our Packages <span aria-hidden="true">↗</span>
                </a>
                <a className="button button-outline" href="#contact">
                  Talk to Our Team <Icon name="arrow" />
                </a>
              </div>
            </div>
            <div className="hero-caption">
              <Icon name="location" />
              <span>
                <strong>Hunza Valley, Pakistan</strong>
                <small>A little closer to extraordinary.</small>
              </span>
            </div>

            <div className="journey-search">
              <div aria-label="Choose a service" className="service-tabs" role="tablist">
                {services.map((service) => (
                  <button
                    aria-selected={activeService === service}
                    className={activeService === service ? "selected" : ""}
                    key={service}
                    onClick={() => {
                      setActiveService(service);
                      setDestination("");
                      setSearchMessage("");
                    }}
                    role="tab"
                    type="button"
                  >
                    <Icon name={serviceIcon[service]} />
                    {service}
                  </button>
                ))}
              </div>
              <form className="search-form" onSubmit={handleSearch}>
                <label className="search-field destination-field">
                  <span>
                    <Icon name="location" />
                    {activeService === "Tours & Packages"
                      ? "Where would you like to go?"
                      : "Where are you headed?"}
                  </span>
                  <select
                    onChange={(event) => setDestination(event.target.value)}
                    value={destination}
                  >
                    <option value="">All destinations</option>
                    {searchOptions[activeService].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="search-field date-field">
                  <span>
                    <Icon name="calendar" />
                    {activeService === "Study Abroad"
                      ? "When do you plan to start?"
                      : "When are you going?"}
                  </span>
                  <input
                    aria-label="Travel or start date"
                    onChange={(event) => setTravelDate(event.target.value)}
                    type="date"
                    value={travelDate}
                  />
                </label>
                <label className="search-field travelers-field">
                  <span>
                    <Icon name="users" />
                    {activeService === "Tours & Packages"
                      ? "Who’s coming along?"
                      : "Who are you planning for?"}
                  </span>
                  <select onChange={(event) => setTravelers(event.target.value)} value={travelers}>
                    <option>1 traveler</option>
                    <option>2 travelers</option>
                    <option>3–5 travelers</option>
                    <option>6+ travelers</option>
                  </select>
                </label>
                <button className="button search-submit" type="submit">
                  Find My Journey <Icon name="arrow" />
                </button>
              </form>
              {searchMessage && (
                <p aria-live="polite" className="search-message">
                  {searchMessage} <a href="#contact">Contact our team</a>.
                </p>
              )}
            </div>
          </div>
        </section>

        <section aria-label="Why travel with KSB" className="container benefits">
          <article className="benefit">
            <span className="benefit-icon">
              <Icon name="compass" />
            </span>
            <div>
              <h2>Thoughtfully planned trips</h2>
              <p>Journeys that feel like you.</p>
            </div>
          </article>
          <article className="benefit">
            <span className="benefit-icon">
              <Icon name="graduation" />
            </span>
            <div>
              <h2>Global study opportunities</h2>
              <p>Your ambitions, a world of options.</p>
            </div>
          </article>
          <article className="benefit">
            <span className="benefit-icon">
              <Icon name="globe" />
            </span>
            <div>
              <h2>Migration guidance</h2>
              <p>A clearer path to your next chapter.</p>
            </div>
          </article>
          <article className="benefit">
            <span className="benefit-icon">
              <Icon name="heart" />
            </span>
            <div>
              <h2>Personal, honest support</h2>
              <p>A real person. Every step of the way.</p>
            </div>
          </article>
        </section>

        <section
          aria-labelledby="destinations-title"
          className="container destinations section"
          id="destinations"
        >
          <div className="section-heading">
            <div>
              <p className="section-kicker">Find your kind of escape</p>
              <h2 id="destinations-title">Extraordinary places. Lasting memories.</h2>
              <p className="section-subtitle">
                From the peaks of Pakistan to a little further from home.
              </p>
            </div>
            <a className="text-link" href="#contact">
              All destinations <Icon name="arrow" />
            </a>
          </div>

          <div className="destination-grid">
            {destinations.map((destinationCard) => (
              <article className="destination-card" key={destinationCard.name}>
                <a
                  aria-label={`Explore ${destinationCard.name}`}
                  className="destination-photo"
                  href="#contact"
                >
                  <img alt={destinationCard.alt} loading="lazy" src={destinationCard.image} />
                  <span className="destination-tag">{destinationCard.category}</span>
                </a>
                <div className="destination-details">
                  <p className="destination-country">
                    <Icon name="location" />
                    {destinationCard.country}
                  </p>
                  <h3>{destinationCard.name}</h3>
                  <div className="destination-footer">
                    <span>Tailor-made journeys</span>
                    <a href="#contact">
                      Explore <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="future-title" className="future-section" id="about">
          <div className="container future-inner">
            <div className="future-intro">
              <p className="section-kicker">More than a destination</p>
              <h2 id="future-title">Your future has no borders.</h2>
              <p>New experiences are just the beginning. Discover what comes next.</p>
            </div>
            <div className="future-grid">
              <article className="future-card study-card" id="study-abroad">
                <img alt="" loading="lazy" src={publicAsset("istanbul.jpg")} />
                <div className="future-card-shade" />
                <div className="future-card-content">
                  <span className="future-icon">
                    <Icon name="graduation" />
                  </span>
                  <h3>
                    A world-class education.
                    <br />A world of opportunity.
                  </h3>
                  <p>
                    Take your ambitions abroad with guidance on university selection, admission
                    applications, and student visa preparation.
                  </p>
                  <a className="button button-outline" href="#contact">
                    Explore Study Abroad <Icon name="arrow" />
                  </a>
                </div>
              </article>
              <article className="future-card migration-card" id="migration">
                <img alt="" loading="lazy" src={publicAsset("dubai.jpg")} />
                <div className="future-card-shade" />
                <div className="future-card-content">
                  <span className="future-icon">
                    <Icon name="globe" />
                  </span>
                  <h3>
                    A new country.
                    <br />A fresh start.
                  </h3>
                  <p>
                    Make sense of your migration options with personal guidance, document
                    preparation support, and a clear view of the next steps.
                  </p>
                  <a className="button button-outline" href="#contact">
                    Discover Migration Support <Icon name="arrow" />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section aria-labelledby="contact-title" className="container contact-cta" id="contact">
          <div className="contact-mark">
            <Icon name="spark" />
          </div>
          <p className="section-kicker">Your next chapter starts here</p>
          <h2 id="contact-title">Every great journey starts with a conversation.</h2>
          <p>A holiday, a new campus, or a fresh start. Let’s take the next step together.</p>
          <a
            className="button"
            href="https://ksb-journeys-green-portal.lovable.app/contact"
            rel="noreferrer"
            target="_blank"
          >
            Let’s Talk About Your Plans <Icon name="arrow" />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              Connecting you to new places and possibilities.
              <br />
              From Lahore, to wherever life takes you.
            </p>
          </div>
          <div>
            <h2>Explore with KSB</h2>
            <a href="#destinations">Tours &amp; Packages</a>
            <a href="#study-abroad">Study Abroad</a>
            <a href="#migration">Migration</a>
          </div>
          <div>
            <h2>Come say hello</h2>
            <p>
              Alkabir Town Phase 2
              <br />
              Lahore, Pakistan
            </p>
            <a href="#contact">Get in touch</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 KSB Travel and Tourism. All rights reserved.</span>
          <span>Made for journeys. Built on care.</span>
        </div>
      </footer>
    </>
  );
}

export default App;
