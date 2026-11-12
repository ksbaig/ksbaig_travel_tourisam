import { useEffect, useMemo, useState, type FormEvent } from "react";
import { contactUrl, publicAsset, showSection } from "./site";

type PackageType = "All Type" | "Fixed Data" | "Day Wise";

type Plan = {
  name: string;
  type: Exclude<PackageType, "All Type">;
  places: string[];
  summary: string;
};

const asset = (filename: string) => publicAsset(`esim/${filename}`);
const countries = ["Hong Kong", "Macau", "Malaysia", "Saudi Arabia", "Singapore", "Thailand"];
const packageTypes: PackageType[] = ["All Type", "Fixed Data", "Day Wise"];
const slides = ["hero.webp", "banner.webp"];
const steps = [
  ["step-1.webp", "Choose a country", "Search or select the country where you need mobile data."],
  [
    "step-2.webp",
    "Select a package",
    "Choose a day-wise or fixed-data style that matches your trip length.",
  ],
  [
    "step-3.webp",
    "Ask KSB to arrange it",
    "KSB confirms the current plan, coverage and setup details. This page does not take payment or issue an eSIM.",
  ],
  [
    "step-4.webp",
    "Activate and connect",
    "After KSB sends the setup instructions, install the eSIM and turn on data when the plan says to.",
  ],
] as const;
const destinations = [
  ["Hong Kong", "hong-kong.jpg"],
  ["Macau", "macau.jpg"],
] as const;
const plans: Plan[] = [
  {
    name: "Asian Multi-Network Daily",
    type: "Day Wise",
    places: ["Malaysia", "Singapore", "Thailand"],
    summary:
      "A day-wise data plan for Malaysia, Singapore and Thailand. KSB confirms the current allowance, networks and install timing before you travel.",
  },
];
const faqs = [
  [
    "Does every phone support an eSIM?",
    "No. The phone must support eSIM and usually needs to be carrier-unlocked. KSB can check a model before you rely on it for a trip.",
  ],
  [
    "Can I keep my Pakistani SIM?",
    "Many phones can keep a physical SIM alongside an eSIM. That is useful for calls and verification messages, but it depends on the handset.",
  ],
  [
    "Is the eSIM activated on this website?",
    "No. This page prepares your preference. It does not process payment, send a QR code, or activate service.",
  ],
  [
    "Will messaging and maps work?",
    "A data plan is meant for internet use such as maps, browsing and messaging apps. Voice calls and coverage depend on the plan KSB confirms.",
  ],
] as const;

function matchCountry(value: string) {
  const query = value.trim().toLowerCase();
  return countries.find((country) => country.toLowerCase() === query) ?? "";
}

export default function EsimPage() {
  const [slide, setSlide] = useState(0);
  const [countryQuery, setCountryQuery] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [packageType, setPackageType] = useState<PackageType>("All Type");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searched, setSearched] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [phoneModel, setPhoneModel] = useState("");
  const [notes, setNotes] = useState("");
  const [searchError, setSearchError] = useState("");
  const [enquiryError, setEnquiryError] = useState("");
  const [summary, setSummary] = useState("");
  const [copyNote, setCopyNote] = useState("");
  const suggestions = useMemo(() => {
    const query = countryQuery.trim().toLowerCase();
    return countries.filter((country) => !query || country.toLowerCase().includes(query));
  }, [countryQuery]);
  const visiblePlans = plans.filter((plan) => {
    const typeMatches = packageType === "All Type" || plan.type === packageType;
    const countryMatches = !selectedCountry || plan.places.includes(selectedCountry);
    return searched && typeMatches && countryMatches;
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % slides.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, []);

  function chooseCountry(country: string) {
    setCountryQuery(country);
    setSelectedCountry(country);
    setCountryOpen(false);
    setSearched(true);
    setSearchError("");
    setSummary("");
    showSection("esim-results");
  }

  function searchPlans(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const country = matchCountry(countryQuery);
    setCountryOpen(false);
    if (!country) {
      setSearchError("Choose a country from the list.");
      setSelectedCountry("");
      setSearched(false);
      return;
    }
    setSearchError("");
    setSelectedCountry(country);
    setSearched(true);
    setSummary("");
    showSection("esim-results");
  }

  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const country = matchCountry(countryQuery);
    const digits = mobile.replace(/\D/g, "");
    if (name.trim().length < 2) {
      setEnquiryError("Enter your name.");
      return;
    }
    if (digits.length < 10 || digits.length > 15) {
      setEnquiryError("Enter a mobile number with 10 to 15 digits.");
      return;
    }
    if (!country) {
      setEnquiryError("Choose a country from the list.");
      return;
    }
    const when = travelDate
      ? new Date(`${travelDate}T00:00:00`).toLocaleDateString("en", {
          month: "long",
          year: "numeric",
        })
      : "a travel date still to confirm";
    setEnquiryError("");
    setCopyNote("");
    setSelectedCountry(country);
    setSummary(
      `${name.trim()} asked KSB Travel and Tourism about a ${packageType.toLowerCase()} eSIM for ${country} around ${when}${phoneModel.trim() ? `, using ${phoneModel.trim()}` : ""}.${notes.trim() ? ` Note: ${notes.trim()}` : ""} This summary is saved on this page only and has not been submitted.`,
    );
    showSection("esim-enquiry");
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopyNote("Copied. Paste it into the KSB contact form.");
    } catch {
      setCopyNote("Copy is unavailable in this browser. Select the summary and copy it manually.");
    }
  }

  return (
    <main className="esim-page">
      <section className="esim-hero" aria-labelledby="esim-title">
        {slides.map((image, index) => (
          <img
            alt=""
            className={slide === index ? "is-active" : ""}
            key={image}
            src={asset(image)}
          />
        ))}
        <div className="esim-hero-shade" />
        <div className="container esim-hero-content">
          <a href="#home">← Back to KSB home</a>
          <p>KSB TRAVEL AND TOURISM</p>
          <h1 id="esim-title">eSIM data plans worldwide</h1>
          <span>
            Ask KSB about mobile data for your trip. No physical SIM swap is required when the plan
            and your phone support eSIM.
          </span>
          <div aria-label="Banner slides" role="group">
            {slides.map((image, index) => (
              <button
                aria-label={`Show banner ${index + 1}`}
                aria-pressed={slide === index}
                className={slide === index ? "is-active" : ""}
                key={image}
                onClick={() => setSlide(index)}
                type="button"
              />
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <form className="esim-search" id="esim-search" onSubmit={searchPlans}>
          <p>Where do you need an eSIM?</p>
          <label>
            Country
            <input
              aria-autocomplete="list"
              aria-controls="esim-country-options"
              aria-expanded={countryOpen}
              onBlur={() => window.setTimeout(() => setCountryOpen(false), 150)}
              onChange={(event) => {
                setCountryQuery(event.target.value);
                setCountryOpen(true);
                setSearchError("");
                setSummary("");
              }}
              onFocus={() => setCountryOpen(true)}
              placeholder="Search country"
              required
              role="combobox"
              value={countryQuery}
            />
          </label>
          {countryOpen && suggestions.length > 0 ? (
            <ul id="esim-country-options" role="listbox">
              {suggestions.map((country) => (
                <li key={country}>
                  <button onClick={() => chooseCountry(country)} type="button">
                    {country}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          <label>
            Package type
            <select
              onChange={(event) => setPackageType(event.target.value as PackageType)}
              value={packageType}
            >
              {packageTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <button className="button" type="submit">
            Search
          </button>
          {searchError ? <p className="esim-error">{searchError}</p> : null}
        </form>
      </div>

      <section className="container esim-intro" aria-labelledby="esim-intro-title">
        <h2 id="esim-intro-title">Mobile data for a trip from Pakistan</h2>
        <p>
          KSB Travel and Tourism can help you compare day-wise and fixed-data eSIM options before
          you travel. Roaming can be expensive, and buying a local SIM at the airport can take time.
          An eSIM keeps your physical SIM in place when your phone supports both.
        </p>
        <div className="esim-steps">
          {steps.map(([image, title, text]) => (
            <article key={title}>
              <img alt="" src={asset(image)} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container" aria-labelledby="esim-destinations-title">
        <h2 id="esim-destinations-title">Popular eSIM destinations</h2>
        <p>
          Choose a destination to check the plans KSB can discuss. Coverage and allowances are
          confirmed before travel.
        </p>
        <ul className="esim-destinations">
          {destinations.map(([country, image]) => (
            <li key={country}>
              <button onClick={() => chooseCountry(country)} type="button">
                <img alt="" src={asset(image)} />
                <span>{country}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="container esim-results"
        aria-labelledby="esim-results-title"
        id="esim-results"
        tabIndex={-1}
      >
        <h2 id="esim-results-title">Popular eSIM packages</h2>
        {visiblePlans.length > 0 ? (
          <div className="esim-plans">
            {visiblePlans.map((plan) => (
              <article key={plan.name}>
                <img alt="" src={asset("hero.webp")} />
                <div>
                  <h3>{plan.name}</h3>
                  <p>
                    {plan.type} · {plan.places.join(", ")}
                  </p>
                  <p>{plan.summary}</p>
                  <button onClick={() => showSection("esim-enquiry")} type="button">
                    Prepare an enquiry
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p>
            {searched
              ? `There is no listed package for ${selectedCountry || "that search"} and ${packageType}. KSB can still check the current options with you.`
              : "Search for a country to see matching packages. The listed day-wise plan covers Malaysia, Singapore and Thailand."}
          </p>
        )}
      </section>

      <section className="container" aria-labelledby="esim-countries-title" id="esim-countries">
        <h2 id="esim-countries-title">Get eSIM guidance for these countries</h2>
        <ul className="esim-country-list">
          {countries.map((country) => (
            <li key={country}>
              <button onClick={() => chooseCountry(country)} type="button">
                {country}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="container esim-faq" aria-labelledby="esim-faq-title">
        <h2 id="esim-faq-title">Before you travel</h2>
        {faqs.map(([question, answer], index) => (
          <article key={question}>
            <h3>
              <button
                aria-expanded={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                type="button"
              >
                {question}
              </button>
            </h3>
            {openFaq === index ? <p>{answer}</p> : null}
          </article>
        ))}
      </section>

      <section
        className="container esim-enquiry"
        aria-labelledby="esim-enquiry-title"
        id="esim-enquiry"
      >
        <div>
          <p>KSB TRAVEL AND TOURISM</p>
          <h2 id="esim-enquiry-title">Ask about an eSIM</h2>
          <p>
            Share the country, package type and phone model. KSB will confirm what is available.
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
            Country
            <input
              list="esim-destinations"
              onChange={(event) => setCountryQuery(event.target.value)}
              required
              value={countryQuery}
            />
          </label>
          <datalist id="esim-destinations">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          <label>
            Package type
            <select
              onChange={(event) => setPackageType(event.target.value as PackageType)}
              value={packageType}
            >
              {packageTypes.map((type) => (
                <option key={type}>{type}</option>
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
          <label>
            Phone model
            <input
              onChange={(event) => setPhoneModel(event.target.value)}
              placeholder="For example, iPhone 13"
              value={phoneModel}
            />
          </label>
          <label className="esim-notes">
            Anything we should know
            <textarea onChange={(event) => setNotes(event.target.value)} value={notes} />
          </label>
          <button className="button" type="submit">
            Prepare enquiry
          </button>
          {enquiryError ? <p className="esim-error">{enquiryError}</p> : null}
          {summary ? (
            <div className="esim-summary">
              <p>{summary}</p>
              <button onClick={copySummary} type="button">
                Copy summary
              </button>
              {copyNote ? <p>{copyNote}</p> : null}
              <a href={contactUrl} rel="noreferrer" target="_blank">
                Continue to KSB contact
              </a>
            </div>
          ) : null}
        </form>
      </section>
    </main>
  );
}
