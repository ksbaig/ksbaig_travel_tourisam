import { useMemo, useState, type FormEvent } from "react";
import { contactUrl, publicAsset, showSection } from "./site";

type Currency = {
  code: string;
  name: string;
  image: string;
  region: string;
};

const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", image: "usd.webp", region: "Americas" },
  { code: "AED", name: "UAE Dirham", image: "aed.webp", region: "Gulf" },
  { code: "SAR", name: "Saudi Riyal", image: "sar.webp", region: "Gulf" },
  { code: "GBP", name: "British Pound", image: "gbp.webp", region: "Europe" },
  { code: "EUR", name: "Euro", image: "eur.webp", region: "Europe" },
  { code: "AUD", name: "Australian Dollar", image: "aud.webp", region: "Pacific" },
  { code: "CAD", name: "Canadian Dollar", image: "cad.webp", region: "Americas" },
  { code: "JPY", name: "Japanese Yen", image: "jpy.webp", region: "Asia" },
  { code: "RMB", name: "Chinese Yuan", image: "rmb.webp", region: "Asia" },
  { code: "THB", name: "Thai Baht", image: "thb.webp", region: "Asia" },
  { code: "TRY", name: "Turkish Lira", image: "try.webp", region: "Europe" },
];

const faqs = [
  [
    "Are the rates on this page live?",
    "No. Currency markets move throughout the day, and this page does not connect to a live exchange-rate feed. Ask KSB to confirm the current rate before exchanging money or budgeting a trip.",
  ],
  [
    "What is the difference between open-market and bank rates?",
    "A bank, exchange company and open market may each use different buying and selling rates, spreads and fees. Compare the exact rate and service charge for your transaction.",
  ],
  [
    "How much foreign currency should I take?",
    "That depends on your destination, accommodation, cards and itinerary. Keep a practical amount for arrival expenses and confirm what is accepted locally.",
  ],
  [
    "Can KSB arrange currency exchange?",
    "KSB can discuss travel-planning questions and direct you to confirm the current exchange route. Availability, limits and fees must be checked before you exchange.",
  ],
];

export default function CurrencyPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All regions");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const regions = ["All regions", "Gulf", "Europe", "Asia", "Americas", "Pacific"];
  const visibleCurrencies = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return currencies.filter((currency) => {
      const matchesQuery =
        !normalized ||
        currency.code.toLowerCase().includes(normalized) ||
        currency.name.toLowerCase().includes(normalized);
      return matchesQuery && (region === "All regions" || currency.region === region);
    });
  }, [query, region]);

  function chooseCurrency(currency: Currency) {
    setSelectedCurrency(currency.code);
    setError("");
    showSection("currency-enquiry");
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
    if (!selectedCurrency) {
      setError("Choose a currency.");
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
      `${name.trim()} asked KSB Travel and Tourism about the current PKR rate and travel guidance for ${selectedCurrency} around ${when}.${notes.trim() ? ` Note: ${notes.trim()}` : ""} This summary is saved on this page only and has not been submitted.`,
    );
    showSection("currency-enquiry");
  }

  return (
    <main className="currency-page">
      <section className="currency-hero" aria-labelledby="currency-title">
        <div className="currency-hero-shape" aria-hidden="true" />
        <div className="container currency-hero-content">
          <a className="currency-back" href="#home">
            ← Back to KSB home
          </a>
          <p className="section-kicker">KSB TRAVEL AND TOURISM</p>
          <h1 id="currency-title">Currency rates in Pakistan</h1>
          <p>
            Explore commonly requested currencies and ask KSB for the current PKR rate before your
            journey.
          </p>
          <button
            className="button"
            onClick={() => showSection("currency-directory")}
            type="button"
          >
            View currencies <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <section
        className="container currency-directory"
        id="currency-directory"
        aria-labelledby="currency-directory-title"
        tabIndex={-1}
      >
        <div className="currency-heading">
          <div>
            <p className="section-kicker">CURRENCY DIRECTORY</p>
            <h2 id="currency-directory-title">Common currencies for travellers</h2>
          </div>
          <p>
            Rates vary by market, provider, time and transaction type. The cards below are a
            reference list, not live rates.
          </p>
        </div>
        <div className="currency-controls">
          <label>
            Search currency
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="For example, USD or Dollar"
              value={query}
            />
          </label>
          <div className="currency-regions" aria-label="Currency regions">
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
        <div className="currency-grid">
          {visibleCurrencies.map((currency) => (
            <article className="currency-card" key={currency.code}>
              <div className="currency-card-top">
                <img alt="" src={publicAsset(`currency/${currency.image}`)} />
                <strong>{currency.code}</strong>
              </div>
              <p>{currency.name}</p>
              <small>{currency.region} · PKR rate to confirm</small>
              <button onClick={() => chooseCurrency(currency)} type="button">
                Ask for today's rate <span aria-hidden="true">↗</span>
              </button>
            </article>
          ))}
        </div>
        {visibleCurrencies.length === 0 ? (
          <p className="currency-empty">
            No currency matches that search. Try a code such as USD, GBP or AED.
          </p>
        ) : null}
      </section>

      <section className="currency-band" aria-labelledby="currency-guidance-title">
        <div className="container">
          <p className="section-kicker">TRAVEL MONEY GUIDANCE</p>
          <h2 id="currency-guidance-title">Plan your spending with the right information</h2>
          <div className="currency-guidance">
            <article>
              <strong>01</strong>
              <h3>Check the date</h3>
              <p>
                Rates change, so confirm close to the time you need to buy or exchange currency.
              </p>
            </article>
            <article>
              <strong>02</strong>
              <h3>Compare the total</h3>
              <p>
                Ask whether a quote includes a spread, commission or transfer fee before accepting
                it.
              </p>
            </article>
            <article>
              <strong>03</strong>
              <h3>Keep a backup</h3>
              <p>
                Carry a mix of payment methods and keep important funds secure while travelling.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="container currency-faq" aria-labelledby="currency-faq-title">
        <p className="section-kicker">COMMON QUESTIONS</p>
        <h2 id="currency-faq-title">Currency guidance, explained</h2>
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
        className="container currency-enquiry"
        id="currency-enquiry"
        aria-labelledby="currency-enquiry-title"
        tabIndex={-1}
      >
        <div>
          <p className="section-kicker">KSB TRAVEL AND TOURISM</p>
          <h2 id="currency-enquiry-title">Ask about today's currency guidance</h2>
          <p>
            Share the currency and travel timing you have in mind. KSB can help you understand what
            to check. This page does not execute an exchange.
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
          <label className="currency-full">
            Currency
            <select
              onChange={(event) => setSelectedCurrency(event.target.value)}
              required
              value={selectedCurrency}
            >
              <option value="">Select a currency</option>
              {currencies.map((currency) => (
                <option key={currency.code}>{currency.code}</option>
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
          <label className="currency-notes">
            Anything we should know
            <textarea onChange={(event) => setNotes(event.target.value)} value={notes} />
          </label>
          <button className="button" type="submit">
            Prepare enquiry
          </button>
          {error ? <p className="currency-error">{error}</p> : null}
          {summary ? (
            <div className="currency-summary">
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
