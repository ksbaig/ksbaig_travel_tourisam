# React + TypeScript Starter

A minimal React application powered by Vite and TypeScript.

## Getting started

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

## Available scripts

- `npm run dev` starts the local development server.
- `npm run build` type-checks the project and creates a production build in `dist`.
- `npm run preview` serves the production build locally.
- `npm run lint` checks the project with ESLint.
- `npm run format` formats supported files with Prettier.

Start editing `src/App.tsx` to build your application.

## Umrah page

The Umrah navigation link opens the dedicated `#umrah` page. Hash-based navigation
supports refresh, browser history and GitHub Pages without server rewrites.
The existing homepage and its section links remain available.

`src/UmrahPage.tsx` contains the departure-city selector, duration and package-style
filters, package details, planning guides and FAQs. Reference images are served
locally from `public/umrah` and use Vite's configured base URL.

Package options are quote-based, not live inventory or confirmed prices. The
enquiry panel shows local travel preferences and links to the existing KSB contact
page; it does not transmit those preferences or submit a booking. Confirm KSB's
rates, hotel inventory and contact integration before enabling live enquiries.

## Flights page

The Flights navigation and footer links open `#flights`. `src/FlightsPage.tsx`
provides return, one-way and multi-city journey forms, city/airport suggestions,
traveler counts, cabin and airline preferences, and baggage/direct-flight choices.
Destination cards, departure-city routes and airline selections populate the form.
Required fields, date order, distinct airports and infant/adult counts are validated
before a local enquiry summary is prepared.

The page uses reference-inspired layouts with KSB branding and local images in
`public/flights`. The hero is cropped from the supplied image to exclude the
reference company's logo and embedded headline. Company contact details, public
asset paths and accessible section scrolling are shared through `src/site.ts`.

There is no live fare API, payment processing, ticket issuance or automatic enquiry
submission. The search prepares preferences to share with the existing KSB contact
page. Editing preferences clears the old summary; refreshing resets the form.
`#flights/search` and `#flights/enquiry` support direct navigation.

## Visas page

The Visas navigation and footer links open `#visas`. `src/VisasPage.tsx` provides
destination search, region tabs, typical document and timing guidance, entry-rule
examples and an enquiry summary. Reference images are served locally from
`public/visas`.

The page keeps KSB Travel and Tourism branding. It does not copy another company's
name, client visa scans, fees or approval claims. Entry rules are examples and must
be confirmed with the destination authority. The enquiry summary stays in the
browser and is not submitted automatically. `#visas/search` and `#visas/enquiry`
support direct navigation.

## eSIM page

The eSIM navigation and footer links open `#esim`. `src/EsimPage.tsx` provides
country and package-type search, destination cards, the listed day-wise plan, and
an enquiry summary. Reference images are served locally from `public/esim`.

The page keeps KSB Travel and Tourism branding. It does not process payment, issue
an eSIM, or show live data allowances. `#esim/search` and `#esim/enquiry` support
direct navigation.

## Insurance page

The Insurance navigation and footer links open `#insurance`. `src/InsurancePage.tsx`
provides destination and trip-type selection, travel dates, coverage guidance,
insurance options, FAQs and a local enquiry summary.

The page keeps KSB Travel and Tourism branding. It does not sell a policy, show
live premiums, promise claim outcomes or replace the insurer's policy wording.
Eligibility, exclusions, limits and visa requirements must be confirmed before
purchase. `#insurance/enquiry` supports direct navigation.

## Hajj page

The Hajj navigation and footer links open `#hajj`. `src/HajjPage.tsx` provides
departure-city and package-preference controls, Hajj planning options, preparation
steps, FAQs and a local enquiry summary.

The page keeps KSB Travel and Tourism branding. It does not show live prices,
submit Hajj applications, reserve places, process payments or guarantee eligibility.
Official requirements, dates, availability and the final written itinerary must be
confirmed before booking. `#hajj/enquiry` supports direct navigation.

## Offers page

The Offers navigation link opens `#offers`. `src/OffersPage.tsx` provides
reference-inspired offer cards, category filters, the supplied Uzbekistan banner,
and a local enquiry summary.

The page keeps KSB Travel and Tourism branding and does not copy the reference
company's name, phone numbers, prices or booking claims. Offer availability,
dates, inclusions and pricing must be confirmed by KSB before a customer books.
`#offers/enquiry` supports direct navigation.

## Airports page

The Airports item in the More menu opens `#airports`. `src/AirportsPage.tsx`
provides a Pakistan airport directory with city search, IATA codes, regional
filters, route guidance, FAQs and a local enquiry summary. The supplied airport
image is served from `public/airports`.

The page keeps KSB Travel and Tourism branding. Airport schedules, routes and
operating conditions must be confirmed for the traveller's date; the page does
not sell tickets or show live flight inventory. `#airports/enquiry` supports
direct navigation.

## Currency page

The Currency Rate item in the More menu opens `#currency`. `src/CurrencyPage.tsx`
provides searchable currency cards, region filters, travel-money guidance, FAQs
and a local enquiry summary. Supplied currency flag assets are served from
`public/currency`.

The page keeps KSB Travel and Tourism branding. It does not claim live exchange
rates or execute currency transactions; rates, spreads, fees and availability
must be confirmed before exchanging money. `#currency/enquiry` supports direct
navigation.

## Passport page

The Passport item in the More menu opens `#passport`. `src/PassportPage.tsx`
provides new-passport and renewal guidance, document preparation steps, FAQs and
a local enquiry summary.

The page keeps KSB Travel and Tourism branding. It does not issue passports,
submit applications, show official fees or guarantee processing times. Applicants
must confirm current requirements with the relevant Pakistani authority.
`#passport/enquiry` supports direct navigation.

## Car rental page

The Car rental item in the More menu opens `#car-rental`. `src/CarRentalPage.tsx`
provides a reference-inspired vehicle catalog, category filters, route and pickup
enquiry fields, FAQs and a local enquiry summary. Vehicle images are served from
`public/car-rental`.

The page keeps KSB Travel and Tourism branding and does not copy the reference
company's name, prices, phone numbers or booking claims. Vehicle availability,
condition, driver arrangements, route suitability and rates must be confirmed by
KSB before travel. `#car-rental/enquiry` supports direct navigation.

## Study Abroad page

The Study abroad item in the More menu opens `#study-abroad`. `src/StudyAbroadPage.tsx`
provides destination pathways, application and visa-preparation guidance, FAQs and
a local enquiry summary.

The page keeps KSB Travel and Tourism branding and does not copy the reference
company's name, logo, contact details, admission claims or visa guarantees.
Universities and immigration authorities set their own requirements and decisions.
`#study-abroad/enquiry` supports direct navigation.

## Deploy to GitHub Pages

The GitHub Actions workflow in `.github/workflows/pages.yml` builds and deploys
the site when changes are pushed to `main`. Enable **Settings → Pages → Build
and deployment → Source → GitHub Actions** in the repository settings.

The site will be available at:
https://ksbaig.github.io/ksbaig_travel_tourisam/
