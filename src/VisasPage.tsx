import { useMemo, useState, type FormEvent } from "react";
import { contactUrl, publicAsset, showSection } from "./site";

type Region =
  "Africa" | "Americas" | "Asia" | "Central Asia" | "Europe" | "Middle East" | "Oceania";

type VisaRequest = {
  country: string;
  visaType: string;
  city: string;
  travelDate: string;
  travelers: string;
  name: string;
  mobile: string;
  notes: string;
};

const asset = (filename: string) => publicAsset(`visas/${filename}`);
const regions: Record<Region, string[]> = {
  Africa: [
    "Gabon",
    "Kenya",
    "Mauritius",
    "Morocco",
    "Namibia",
    "Rwanda",
    "South Africa",
    "Sudan",
    "Tanzania",
    "Uganda",
    "Zimbabwe",
  ],
  Americas: ["Canada", "Grenada", "United States"],
  Asia: [
    "Bangladesh",
    "Cambodia",
    "China",
    "Hong Kong",
    "Indonesia",
    "Japan",
    "Jordan",
    "Lao People's Democratic Republic",
    "Malaysia",
    "Mongolia",
    "Nepal",
    "Pakistan",
    "Philippines",
    "Singapore",
    "Sri Lanka",
    "Tajikistan",
    "Thailand",
    "Vietnam",
  ],
  "Central Asia": ["Afghanistan", "Azerbaijan", "Kazakhstan", "Kyrgyzstan", "Uzbekistan"],
  Europe: [
    "Albania",
    "Austria",
    "Belarus",
    "Belgium",
    "Czechia",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Ireland",
    "Italy",
    "Latvia",
    "Liechtenstein",
    "Luxembourg",
    "Malta",
    "Montenegro",
    "Netherlands",
    "Norway",
    "Poland",
    "Portugal",
    "Russian Federation",
    "Schengen",
    "Serbia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "United Kingdom",
  ],
  "Middle East": [
    "Bahrain",
    "Dubai",
    "Egypt",
    "Iraq",
    "Kuwait",
    "Oman",
    "Qatar",
    "Saudi Arabia",
    "United Arab Emirates",
  ],
  Oceania: ["Australia", "Maldives", "New Zealand"],
};
const countries = Object.values(regions).flat();
const regionOrder = Object.keys(regions) as Region[];
const visaTypes = ["Tourist", "Business", "Student", "Family visit", "Work", "E-visa"];
const cities = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Multan",
  "Faisalabad",
  "Peshawar",
  "Quetta",
];
const featured = [
  ["Azerbaijan", "azerbaijan.jpg"],
  ["Canada", "canada.jpg"],
  ["Dubai", "dubai.jpg"],
  ["Hong Kong", "hong-kong.png"],
  ["Indonesia", "indonesia.jpg"],
  ["Malaysia", "malaysia.jpg"],
  ["Pakistan", "pakistan.jpg"],
  ["Saudi Arabia", "saudi-arabia.jpg"],
  ["Singapore", "singapore.jpg"],
  ["Sri Lanka", "sri-lanka.jpg"],
  ["Thailand", "thailand.jpg"],
  ["Turkey", "turkey.jpg"],
  ["United Kingdom", "united-kingdom.jpg"],
] as const;
const regionGuides = [
  [
    "Middle East",
    "UAE, Saudi Arabia, Qatar, Bahrain, Oman",
    "Tourist, business, e-visa, family visit",
    "24 hours – 5 days",
  ],
  [
    "Asia & Far East",
    "Turkey, Malaysia, Thailand, Azerbaijan, Singapore, Vietnam",
    "E-visa, sticker tourist visa, business",
    "3 – 10 days",
  ],
  [
    "Europe (Schengen)",
    "Germany, France, Italy, Spain, Netherlands, Switzerland",
    "Short-stay visit and business",
    "15 – 30 days",
  ],
  [
    "Americas & Oceania",
    "USA, Canada, Australia, New Zealand",
    "Visitor, student, family",
    "1 – 6 months",
  ],
] as const;
const benefits = [
  [
    "In-depth profile review",
    "We look at travel history, finances, work or business papers, and ties to Pakistan so the file matches the visa you want.",
  ],
  [
    "Current policy check",
    "Embassy and visa-centre rules change. KSB checks the published requirements for your destination before documents are prepared.",
  ],
  [
    "Document preparation",
    "We help organise cover letters, travel plans, accommodation details and financial papers in the format a visa centre usually expects.",
  ],
  [
    "Careful file review",
    "A complete, consistent file reduces avoidable mistakes. It does not guarantee approval; the embassy or visa authority decides.",
  ],
  [
    "Application follow-up",
    "From document collection to passport return, KSB keeps you informed about the steps that are in our hands.",
  ],
] as const;
const cityGuides = [
  [
    "Applicants in Karachi",
    "Corporate travel, trade visits and family holidays often need tax papers, bank statements and a clear purpose of travel. KSB can review these online.",
  ],
  [
    "Lahore consultancy desk",
    "KSB Travel and Tourism is based in Alkabir Town Phase 2, Lahore. This desk handles Schengen, UK, US, Gulf and Asian visa preparation, including cover letters and interview preparation.",
  ],
  [
    "Applicants in Islamabad",
    "Travelers from Islamabad, Punjab, Khyber Pakhtunkhwa and Azad Jammu & Kashmir can prepare embassy interviews and Umrah-related visits with KSB. In-person meetings are arranged at the Lahore office or online.",
  ],
  [
    "Student visa guidance",
    "For study plans, KSB can help organise offer letters, sponsor papers and mock interview practice. Admission and visa decisions remain with the university and visa authority.",
  ],
] as const;
const visaFree = [
  [
    "Dominica",
    "Caribbean",
    "Up to 21 days",
    "Valid passport, return ticket, accommodation details",
  ],
  ["Haiti", "Caribbean", "Up to 90 days", "Valid passport, return ticket, accommodation details"],
  ["Micronesia", "Oceania", "Up to 30 days", "Valid passport, sufficient funds, onward ticket"],
  ["Vanuatu", "Oceania", "Up to 30 days", "Valid passport, return ticket, bank proof"],
] as const;
const visaOnArrival = [
  ["Maldives", "South Asia", "Often free for 30 days", "Hotel booking, return flight, funds"],
  ["Nepal", "South Asia", "Often USD 30–50", "Photo, valid passport, pre-arrival form"],
  ["Madagascar", "Africa", "About USD 10", "Passport valid for 6 months, return flight"],
  ["Qatar", "Middle East", "Varies", "Hayya or portal confirmation, hotel booking"],
  ["Cambodia", "Southeast Asia", "About USD 30", "Photo, funds, return ticket"],
] as const;
const eVisas = [
  [
    "Azerbaijan",
    "Often 3 working days; urgent options may be faster",
    "Commonly 30 days, single entry",
    "Passport scan and a valid email",
  ],
  [
    "Turkey",
    "Can be same day when eligible",
    "Often 30 days, with conditions",
    "May require a valid Schengen, US, UK or Ireland visa or residence permit",
  ],
  [
    "United Arab Emirates",
    "Often 24–48 hours",
    "Commonly 30 or 60 days",
    "Passport copy, photo and CNIC copy",
  ],
  [
    "Malaysia",
    "Often 2–5 working days",
    "Commonly 30 days",
    "Flights, hotel booking and bank statement",
  ],
  [
    "Kenya",
    "Often 48–72 hours for an eTA",
    "Up to 90 days",
    "Itinerary, hotel confirmation and passport scan",
  ],
] as const;
const faqs = [
  [
    "What do visa consultants do?",
    "A visa consultant explains the application route, checks which documents usually apply, and helps organise the file. KSB does not issue visas and cannot decide an application.",
  ],
  [
    "What documents are required from Pakistan?",
    "A passport with at least six months’ validity is the starting point. Most files also need a CNIC, photographs, financial papers, family details and work or business evidence. The exact list depends on the country and visa type.",
  ],
  [
    "Which visas are often simpler from Pakistan?",
    "Travelers often ask first about the UAE, Saudi Arabia, Thailand, Malaysia, Singapore, Vietnam, Sri Lanka, Cambodia, the Philippines, Azerbaijan, Kazakhstan, Nepal, Egypt, Morocco, Oman, Bahrain, Qatar and Turkey. “Simpler” does not mean automatic approval.",
  ],
  [
    "Which places may offer visa on arrival or an exemption?",
    "Published examples include Barbados, Cook Islands, Dominica, Gambia, Haiti, Rwanda, St. Vincent, Trinidad & Tobago and Vanuatu. These lists change and many are rarely used by Pakistani travelers, so confirm before you fly.",
  ],
  [
    "How strong is the Pakistani passport?",
    "Access depends on the destination, your profile and the visa category. KSB can explain the current route for a chosen country, but passport rankings are not an approval promise.",
  ],
] as const;

const emptyRequest: VisaRequest = {
  country: "",
  visaType: "Tourist",
  city: "Lahore",
  travelDate: "",
  travelers: "1",
  name: "",
  mobile: "",
  notes: "",
};

function regionFor(country: string): Region | "" {
  return regionOrder.find((region) => regions[region].includes(country)) ?? "";
}

function matchCountry(value: string) {
  const query = value.trim().toLowerCase();
  return countries.find((country) => country.toLowerCase() === query) ?? "";
}

function guidanceFor(country: string) {
  if (country === "Pakistan") {
    return {
      types: "Domestic travel",
      time: "Pakistani citizens do not need a visa to enter Pakistan. Choose another destination for an outbound visa.",
    };
  }
  if (country === "Schengen") {
    return {
      types: "Short-stay visit and business",
      time: "Often 15–30 days after a complete appointment file. The visa authority sets the real timeline.",
    };
  }
  const region = regionFor(country);
  if (region === "Middle East") {
    return {
      types: "Tourist, business, e-visa, family visit",
      time: "Often 24 hours to 5 days for straightforward files.",
    };
  }
  if (region === "Asia" || region === "Central Asia") {
    return {
      types: "E-visa, sticker tourist visa, business",
      time: "Often 3–10 days, depending on the visa centre.",
    };
  }
  if (region === "Europe") {
    return {
      types: "Short-stay visit, business or national visa",
      time: "Often 15–30 days after biometrics or submission.",
    };
  }
  if (region === "Americas" || region === "Oceania") {
    return {
      types: "Visitor, student or family",
      time: "Often 1–6 months. Interview routes take longer.",
    };
  }
  return {
    types: "Tourist, business or visit",
    time: "Timelines vary. KSB will check the current published range.",
  };
}

export default function VisasPage() {
  const [region, setRegion] = useState<Region>("Africa");
  const [query, setQuery] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [request, setRequest] = useState<VisaRequest>(emptyRequest);
  const [selected, setSelected] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [searchError, setSearchError] = useState("");
  const [enquiryError, setEnquiryError] = useState("");
  const [summary, setSummary] = useState("");
  const [copyNote, setCopyNote] = useState("");
  const suggestions = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return countries.slice(0, 8);
    return countries.filter((country) => country.toLowerCase().includes(value)).slice(0, 8);
  }, [query]);
  const guide = selected ? guidanceFor(selected) : null;

  function chooseCountry(country: string) {
    setSelected(country);
    setQuery(country);
    setRequest((current) => ({ ...current, country }));
    setSummary("");
    setSearchError("");
    setEnquiryError("");
    const matchedRegion = regionFor(country);
    if (matchedRegion) setRegion(matchedRegion);
    window.setTimeout(() => showSection("visas-country"), 0);
  }

  function searchVisa(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const country = matchCountry(query);
    if (!country) {
      setSearchError("Choose a destination from the list.");
      setSelected("");
      return;
    }
    setSearchError("");
    chooseCountry(country);
  }

  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const country = matchCountry(request.country);
    const digits = request.mobile.replace(/\D/g, "");
    if (request.name.trim().length < 2) {
      setEnquiryError("Enter the applicant’s name.");
      return;
    }
    if (digits.length < 10 || digits.length > 15) {
      setEnquiryError("Enter a mobile number with 10 to 15 digits.");
      return;
    }
    if (!country) {
      setEnquiryError("Choose a destination from the list.");
      return;
    }
    const when = request.travelDate
      ? new Date(`${request.travelDate}T00:00:00`).toLocaleDateString("en", {
          month: "long",
          year: "numeric",
        })
      : "a date still to confirm";
    setSelected(country);
    const matchedRegion = regionFor(country);
    if (matchedRegion) setRegion(matchedRegion);
    setEnquiryError("");
    setCopyNote("");
    setSummary(
      `${request.name.trim()} asked KSB Travel and Tourism about a ${request.visaType.toLowerCase()} visa for ${country}, applying from ${request.city}, for ${request.travelers} traveler${request.travelers === "1" ? "" : "s"} around ${when}.${request.notes.trim() ? ` Note: ${request.notes.trim()}` : ""} This summary is saved on this page only and has not been submitted.`,
    );
    showSection("visas-enquiry");
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
    <main className="visas-page">
      <section className="visas-hero" aria-labelledby="visas-title">
        <img alt="" src={asset("hero.jpg")} />
        <div className="visas-hero-shade" />
        <div className="container visas-hero-content">
          <a href="#home">← Back to KSB home</a>
          <p>KSB TRAVEL AND TOURISM</p>
          <h1 id="visas-title">Visa guidance for destinations worldwide, from Pakistan</h1>
          <span>
            KSB helps you understand the route, prepare a complete file and ask the right questions
            before you apply. Visas are decided by the destination authority, not by KSB.
          </span>
        </div>
      </section>

      <div className="container">
        <form className="visas-search" id="visas-search" onSubmit={searchVisa}>
          <div>
            <p>Get visa guidance for</p>
            <h2>Choose a destination</h2>
          </div>
          <label>
            Going to
            <input
              aria-autocomplete="list"
              aria-controls="visa-country-options"
              aria-expanded={countryOpen && suggestions.length > 0}
              onBlur={() => window.setTimeout(() => setCountryOpen(false), 150)}
              onChange={(event) => {
                setQuery(event.target.value);
                setCountryOpen(true);
                setSummary("");
                setSearchError("");
              }}
              onFocus={() => setCountryOpen(true)}
              placeholder="Enter a country"
              required
              role="combobox"
              value={query}
            />
          </label>
          {countryOpen ? (
            <ul id="visa-country-options" role="listbox">
              {suggestions.map((country) => (
                <li key={country}>
                  <button onClick={() => chooseCountry(country)} type="button">
                    {country}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          <button className="button" type="submit">
            Search
          </button>
          {searchError ? <p className="visas-error">{searchError}</p> : null}
        </form>
      </div>

      <section className="container visas-intro" aria-labelledby="visas-intro-title">
        <h2 id="visas-intro-title">Consultancy for Pakistani passport holders</h2>
        <p>
          Embassy rules, forms and appointment systems change. KSB Travel and Tourism checks the
          current published requirements, helps compile documents and reviews the file before you
          submit it. Select a destination to see the usual route. This is guidance, not an official
          visa result.
        </p>
        <ul className="visas-featured">
          {featured.map(([country, image]) => (
            <li key={country}>
              <button onClick={() => chooseCountry(country)} type="button">
                <img alt="" src={asset(image)} />
                <span>{country}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="container" aria-labelledby="visas-regions-title" id="visas-countries">
        <h2 id="visas-regions-title">Choose your destination country</h2>
        <div className="visas-tabs" role="tablist" aria-label="Destination regions">
          {regionOrder.map((item) => (
            <button
              aria-selected={region === item}
              className={region === item ? "is-active" : ""}
              key={item}
              onClick={() => setRegion(item)}
              role="tab"
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <ul className="visas-country-list">
          {regions[region].map((country) => (
            <li key={country}>
              <button onClick={() => chooseCountry(country)} type="button">
                {country}
              </button>
            </li>
          ))}
        </ul>
        <article className="visas-country" id="visas-country" tabIndex={-1}>
          {guide ? (
            <>
              <p>Selected destination</p>
              <h3>{selected}</h3>
              <dl>
                <div>
                  <dt>Region</dt>
                  <dd>{regionFor(selected)}</dd>
                </div>
                <div>
                  <dt>Usual visa types</dt>
                  <dd>{guide.types}</dd>
                </div>
                <div>
                  <dt>Typical published timing</dt>
                  <dd>{guide.time}</dd>
                </div>
              </dl>
              <a href="#visas/enquiry">Prepare an enquiry</a>
            </>
          ) : (
            <p>Select a country to see its usual visa route.</p>
          )}
        </article>
      </section>

      <section className="visas-band" aria-labelledby="visas-why-title">
        <div className="container">
          <h2 id="visas-why-title">Why prepare a visa file with KSB?</h2>
          <div className="visas-benefits">
            {benefits.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container visas-tables" aria-labelledby="visas-times-title">
        <h2 id="visas-times-title">Popular routes and typical timing</h2>
        <p>
          These are commonly published ranges for Pakistani applicants. They are not KSB fees, live
          processing times or approval results. Confirm the current rule before you pay or travel.
        </p>
        <div className="visas-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Region</th>
                <th>Popular destinations</th>
                <th>Visa types</th>
                <th>Typical timing</th>
              </tr>
            </thead>
            <tbody>
              {regionGuides.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container visas-cities" aria-labelledby="visas-cities-title">
        <h2 id="visas-cities-title">Visa consultancy from Pakistan</h2>
        <p>
          KSB supports applicants across Pakistan online. Face-to-face meetings are available at the
          Lahore office.
        </p>
        <div>
          {cityGuides.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p>
          Planning Umrah as well? See <a href="#umrah">Umrah packages</a> or{" "}
          <a href="#flights">flights</a>.
        </p>
      </section>

      <section className="container visas-tables" aria-labelledby="visas-entry-title">
        <h2 id="visas-entry-title">Visa-free, visa on arrival and e-visa examples</h2>
        <p>
          Entry rules change and can depend on your other visas, passport validity and the airport
          you use. This is not permission to travel. Check the destination authority before booking.
        </p>
        <h3>Examples of visa-free stays</h3>
        <div className="visas-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Region</th>
                <th>Published stay</th>
                <th>Usual checks</th>
              </tr>
            </thead>
            <tbody>
              {visaFree.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Examples of visa on arrival</h3>
        <div className="visas-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Region</th>
                <th>Published fee</th>
                <th>Usual documents</th>
              </tr>
            </thead>
            <tbody>
              {visaOnArrival.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Examples of online e-visas</h3>
        <div className="visas-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Destination</th>
                <th>Typical timing</th>
                <th>Validity and stay</th>
                <th>Key papers</th>
              </tr>
            </thead>
            <tbody>
              {eVisas.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container visas-faq" aria-labelledby="visas-faq-title">
        <h2 id="visas-faq-title">Frequently asked questions</h2>
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
        className="container visas-enquiry"
        aria-labelledby="visas-enquiry-title"
        id="visas-enquiry"
      >
        <div>
          <p>KSB TRAVEL AND TOURISM</p>
          <h2 id="visas-enquiry-title">Ask about a visa for any country</h2>
          <p>
            Tell us the destination and visa type. We will use this summary when you contact KSB. It
            is not submitted automatically and it is not a visa application.
          </p>
        </div>
        <form onSubmit={prepareEnquiry}>
          <label>
            Your name
            <input
              onChange={(event) => setRequest({ ...request, name: event.target.value })}
              required
              value={request.name}
            />
          </label>
          <label>
            Mobile number
            <input
              inputMode="tel"
              onChange={(event) => setRequest({ ...request, mobile: event.target.value })}
              placeholder="+92 300 0000000"
              required
              value={request.mobile}
            />
          </label>
          <label>
            Destination
            <input
              list="visa-destinations"
              onChange={(event) => setRequest({ ...request, country: event.target.value })}
              required
              value={request.country}
            />
          </label>
          <datalist id="visa-destinations">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          <label>
            Visa type
            <select
              onChange={(event) => setRequest({ ...request, visaType: event.target.value })}
              value={request.visaType}
            >
              {visaTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            Applying from
            <select
              onChange={(event) => setRequest({ ...request, city: event.target.value })}
              value={request.city}
            >
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </label>
          <label>
            Travel month
            <input
              onChange={(event) => setRequest({ ...request, travelDate: event.target.value })}
              type="date"
              value={request.travelDate}
            />
          </label>
          <label>
            Travelers
            <input
              max="20"
              min="1"
              onChange={(event) => setRequest({ ...request, travelers: event.target.value })}
              type="number"
              value={request.travelers}
            />
          </label>
          <label className="visas-notes">
            Anything we should know
            <textarea
              onChange={(event) => setRequest({ ...request, notes: event.target.value })}
              value={request.notes}
            />
          </label>
          <button className="button" type="submit">
            Prepare enquiry
          </button>
          {enquiryError ? <p className="visas-error">{enquiryError}</p> : null}
          {summary ? (
            <div className="visas-summary">
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
