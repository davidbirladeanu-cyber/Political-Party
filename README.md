# Equal Earth — Global Elections Intelligence Platform

**Political Party** is a production-quality, source-driven global political and electoral intelligence platform. Built with Next.js 15, TypeScript, Tailwind CSS, Prisma ORM, and D3.js with the Equal Earth projection.

---

## 1. Product Vision & Highlights

Equal Earth provides an editorial, non-partisan observatory of global democratic processes:
- **Interactive Equal Earth World Map**: An authentic equal-area pseudocylindrical projection (`geoEqualEarth`) that preserves true relative geographic scales without Web Mercator distortions. Supports 5 visualization modes: *Political Control*, *Last Election Winner*, *Voter Turnout*, *Upcoming Elections (2025–26)*, and *Dataset Coverage*.
- **Deep Country Electoral Dossiers**: Comprehensive constitutional profiles, bicameral/unicameral parliamentary architectures, heads of state & government, and certified electoral histories.
- **Romania Benchmark Implementation**: Deep multi-tier coverage for Romania including the 2024 Presidential Election (Round 1), 2024 Parliamentary Election (Chamber of Deputies & Senate), 2024 European Parliament Election, 2024 Local Elections, and a **42-county sub-national explorer** (all 41 Județe + Bucharest + Diaspora).
- **Multidimensional Political Parties Database**: Beyond 1-dimensional "left vs right" simplifications; parties are analyzed across four independent axes: *Economic Policy*, *Social/Cultural Policy*, *European Integration*, and *National Sovereignty*.
- **Governments & Coalitions Tracker**: Monitors governing majorities, junior coalition partners, confidence-and-supply pacts, and parliamentary opposition.
- **Verified Election Calendar**: Confirmed election dates and constitutional fixed-term deadlines with countdown timers (zero fabricated dates).
- **Certified Results Visualizations**: Semicircular Parliament Hemicycle seating charts, horizontal candidate/party bar charts, turnout gauges, and vote share vs. seat share disproportionality comparisons.
- **Source Integrity & CSV Export**: Every record is attributed to official national election commissions (e.g. AEP / BEC Romania, Ministère de l'Intérieur France, FEC USA, UK Electoral Commission, Bundeswahlleiterin Germany) with instant CSV export.

---

## 2. Visual Identity & Design System

- **Background & Surfaces**: Editorial deep charcoal `#111210`, `#191A17`, and `#20211D`.
- **Typography & Warm Accents**: Warm ivory primary text (`#F2EFE6`), muted gray secondary text (`#A5A398`), and soft sand/beige accent (`#D7C5A3`).
- **Restrained Semantic Palette**: Configurable party colors and status badges (Certified, Preliminary, Scheduled, Postponed) without partisan stereotypes.
- **Component Geometry**: Rounded cards (16–24px radius), subtle low-contrast borders (`#252622`), minimal shadows, and high-legibility tabular typography.

---

## 3. Technology Stack

- **Framework**: Next.js 15 (App Router with React 19)
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS with custom editorial tokens
- **Cartography & GIS**: D3.js (`d3-geo` with `geoEqualEarth`, `geoGraticule10`) + `topojson-client` + Natural Earth / World Atlas vectors
- **Database & Data Layer**: Prisma ORM with SQLite (zero-config local database, easily swappable for PostgreSQL via `DATABASE_URL`)
- **Testing**: Node.js test runner (`tsx --test`) verifying turnout math, ballot counts, and search indexing

---

## 4. Key Application Routes

| Route | Description |
|---|---|
| `/` | Global Overview Dashboard with KPIs, Equal Earth map, recent results, and upcoming calendar |
| `/world-map` | Full-screen interactive Equal Earth map with mode toggles and country intelligence panel |
| `/countries` | Sovereign states directory with regional and coverage filters |
| `/countries/ro` | Deep Romania profile with 42-county regional drill-down, parliamentary archive, and Ciolacu cabinet |
| `/countries/[code]` | Dynamic country profile (e.g., `/countries/fr`, `/countries/us`, `/countries/gb`, `/countries/de`) |
| `/elections` | Certified global elections archive with multi-tier filters |
| `/elections/ro-parl-2024` | 2024 Romanian Parliamentary election with Hemicycle seating, bar charts, and CSV export |
| `/parties` | Multidimensional political parties database |
| `/parties/ro-psd` | Deep political party profile (PSD, PNL, USR, AUR, UDMR, SOS, POT, Ensemble, NFP, RN, GOP, DEM, Labour, Tories) |
| `/governments` | Governments & Coalitions tracker |
| `/governments/gov-ro-ciolacu` | Detailed government composition, coalition agreement, and opposition breakdown |
| `/upcoming` | Verified upcoming election calendar with countdowns (2025–2027) |
| `/methodology` | Data integrity protocol, legal provenance, and statutory licenses |

---

## 5. Local Setup & Quickstart

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Initialize Prisma database (creates local dev.db)
npx prisma generate
npx prisma db push

# 3. Run automated calculation tests
npm test

# 4. Start the development server
npm run dev
# Or run the production build
npm run build
npm start
```

The application will be live at `http://localhost:3000`.

---

## 6. Verification and Test Results

Automated unit tests in `src/tests/calculations.test.ts` verify:
1. Turnout percentage accuracy ($VotesCast / RegisteredVoters \times 100$)
2. Ballot arithmetic integrity ($ValidVotes + InvalidVotes = VotesCast$)
3. Seat share and disproportionality differences ($SeatShare - VoteShare$)
4. Global coverage statistics derivation without data hallucination
5. CSV export generation with official source attribution
6. Global command search modal (`⌘K` / `Ctrl+K`) across countries, parties, candidates, and elections

---

## 7. Data Licensing & Sources
- **Romania**: Autoritatea Electorală Permanentă (AEP) & Biroul Electoral Central (BEC) — Open Government Data
- **France**: Ministère de l'Intérieur et des Outre-mer — Licence Ouverte 2.0 (Etalab)
- **United States**: Federal Election Commission (FEC) — U.S. Public Domain
- **United Kingdom**: The Electoral Commission (UK) — Open Government Licence v3.0
- **Germany**: Die Bundeswahlleiterin — dl-de/zero-2-0
- **Geographic Vectors**: Natural Earth / Šavrič, Patterson & Jenny (Equal Earth projection) — Public Domain (CC0)
