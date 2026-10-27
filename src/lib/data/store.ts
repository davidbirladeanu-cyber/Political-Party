import {
  Country,
  Election,
  PoliticalParty,
  Government,
  Candidate,
  UpcomingElection,
  DataSource,
  GlobalCoverageStats,
} from "@/types";
import { COUNTRIES } from "./countries";
import { ELECTIONS } from "./elections";
import { PARTIES } from "./parties";
import { GOVERNMENTS } from "./governments";
import { CANDIDATES } from "./candidates";
import { UPCOMING_ELECTIONS } from "./upcoming";
import { DATA_SOURCES } from "./sources";

// Global Coverage Statistics derived strictly from verified data
export function getGlobalCoverageStats(): GlobalCoverageStats {
  const fullCoverageCount = COUNTRIES.filter((c) => c.coverageStatus === "full").length;
  const partialCoverageCount = COUNTRIES.filter((c) => c.coverageStatus === "partial").length;
  const basicCoverageCount = COUNTRIES.filter((c) => c.coverageStatus === "basic").length;

  return {
    totalCountries: COUNTRIES.length,
    fullCoverageCount,
    partialCoverageCount,
    basicCoverageCount,
    totalElectionsTracked: ELECTIONS.length,
    totalPoliticalParties: PARTIES.length,
    totalCandidatesTracked: CANDIDATES.length,
    activeGovernmentsTracked: GOVERNMENTS.filter((g) => g.status === "current").length,
    upcomingElectionsScheduled: UPCOMING_ELECTIONS.length,
    dataSourcesVerified: DATA_SOURCES.length,
  };
}

// Country Queries
export function getAllCountries(): Country[] {
  return COUNTRIES;
}

export function getCountryByCode(codeOrSlug: string): Country | undefined {
  const normalized = codeOrSlug.toLowerCase().trim();
  return COUNTRIES.find(
    (c) =>
      c.code.toLowerCase() === normalized ||
      c.alpha3.toLowerCase() === normalized ||
      c.numericCode === normalized ||
      c.name.toLowerCase().replace(/\s+/g, "-") === normalized
  );
}

// Election Queries
export function getAllElections(): Election[] {
  return ELECTIONS;
}

export function getElectionById(id: string): Election | undefined {
  return ELECTIONS.find((e) => e.id === id);
}

export function getElectionsByCountry(countryCode: string): Election[] {
  return ELECTIONS.filter(
    (e) => e.countryCode.toUpperCase() === countryCode.toUpperCase()
  );
}

// Party Queries
export function getAllParties(): PoliticalParty[] {
  return PARTIES;
}

export function getPartyById(id: string): PoliticalParty | undefined {
  return PARTIES.find((p) => p.id === id);
}

export function getPartiesByCountry(countryCode: string): PoliticalParty[] {
  return PARTIES.filter(
    (p) => p.countryCode.toUpperCase() === countryCode.toUpperCase()
  );
}

// Government Queries
export function getAllGovernments(): Government[] {
  return GOVERNMENTS;
}

export function getGovernmentById(id: string): Government | undefined {
  return GOVERNMENTS.find((g) => g.id === id);
}

export function getCurrentGovernmentByCountry(countryCode: string): Government | undefined {
  return GOVERNMENTS.find(
    (g) => g.countryCode.toUpperCase() === countryCode.toUpperCase() && g.status === "current"
  );
}

// Candidate Queries
export function getAllCandidates(): Candidate[] {
  return CANDIDATES;
}

export function getCandidateById(id: string): Candidate | undefined {
  return CANDIDATES.find((c) => c.id === id);
}

export function getCandidatesByCountry(countryCode: string): Candidate[] {
  return CANDIDATES.filter(
    (c) => c.countryCode.toUpperCase() === countryCode.toUpperCase()
  );
}

// Upcoming Elections Queries
export function getAllUpcomingElections(): UpcomingElection[] {
  return UPCOMING_ELECTIONS.sort(
    (a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
  );
}

// Data Sources Queries
export function getAllDataSources(): DataSource[] {
  return DATA_SOURCES;
}

// Unified Global Search
export interface SearchResultItem {
  id: string;
  type: "country" | "election" | "party" | "candidate" | "government";
  title: string;
  subtitle: string;
  tag: string;
  url: string;
  countryCode?: string;
  flag?: string;
}

export function searchGlobal(query: string): SearchResultItem[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();

  const results: SearchResultItem[] = [];

  // Search Countries
  for (const c of COUNTRIES) {
    if (
      c.name.toLowerCase().includes(q) ||
      c.officialName.toLowerCase().includes(q) ||
      c.code.toLowerCase() === q ||
      c.alpha3.toLowerCase() === q ||
      c.capital.toLowerCase().includes(q)
    ) {
      results.push({
        id: `c-${c.code}`,
        type: "country",
        title: c.name,
        subtitle: `${c.politicalSystem} • Capital: ${c.capital}`,
        tag: c.coverageStatus.toUpperCase() + " COVERAGE",
        url: `/countries/${c.code.toLowerCase()}`,
        countryCode: c.code,
        flag: c.flag,
      });
    }
  }

  // Search Elections
  for (const e of ELECTIONS) {
    if (
      e.name.toLowerCase().includes(q) ||
      e.countryName.toLowerCase().includes(q) ||
      e.electionType.toLowerCase().includes(q) ||
      e.summary.toLowerCase().includes(q)
    ) {
      results.push({
        id: `e-${e.id}`,
        type: "election",
        title: e.name,
        subtitle: `${e.date} • Turnout: ${e.turnoutPercentage}% • ${e.status.toUpperCase()}`,
        tag: e.electionType.toUpperCase(),
        url: `/elections/${e.id}`,
        countryCode: e.countryCode,
      });
    }
  }

  // Search Parties
  for (const p of PARTIES) {
    if (
      p.commonName.toLowerCase().includes(q) ||
      p.officialName.toLowerCase().includes(q) ||
      p.acronym.toLowerCase() === q ||
      p.currentLeader.toLowerCase().includes(q) ||
      p.countryName.toLowerCase().includes(q)
    ) {
      results.push({
        id: `p-${p.id}`,
        type: "party",
        title: `${p.acronym} — ${p.commonName}`,
        subtitle: `${p.countryName} • Leader: ${p.currentLeader} • ${p.ideology.family}`,
        tag: p.currentRole,
        url: `/parties/${p.id}`,
        countryCode: p.countryCode,
      });
    }
  }

  // Search Candidates
  for (const cand of CANDIDATES) {
    if (
      cand.fullName.toLowerCase().includes(q) ||
      cand.publicRole.toLowerCase().includes(q) ||
      cand.countryName.toLowerCase().includes(q)
    ) {
      results.push({
        id: `cand-${cand.id}`,
        type: "candidate",
        title: cand.fullName,
        subtitle: `${cand.publicRole} • ${cand.countryName}`,
        tag: cand.currentPartyAcronym || "INDEPENDENT",
        url: `/candidates/${cand.id}`,
        countryCode: cand.countryCode,
      });
    }
  }

  // Search Governments
  for (const g of GOVERNMENTS) {
    if (
      g.name.toLowerCase().includes(q) ||
      g.headOfGovernment.toLowerCase().includes(q) ||
      g.countryName.toLowerCase().includes(q)
    ) {
      results.push({
        id: `g-${g.id}`,
        type: "government",
        title: g.name,
        subtitle: `${g.countryName} • Head: ${g.headOfGovernment} (${g.type})`,
        tag: g.status.toUpperCase(),
        url: `/governments/${g.id}`,
        countryCode: g.countryCode,
      });
    }
  }

  return results.slice(0, 15);
}

// CSV Export Utility for Election Results
export function exportElectionToCSV(election: Election): string {
  const round = election.rounds[0];
  let headers: string[] = [];
  let rows: string[][] = [];

  if (round?.partyResults && round.partyResults.length > 0) {
    headers = [
      "Election",
      "Country",
      "Date",
      "Party Acronym",
      "Party Name",
      "Vote Total",
      "Vote Percentage (%)",
      "Seats Won",
      "Total Seats",
      "Seat Share (%)",
      "Is Winner",
      "Official Source",
    ];

    rows = round.partyResults.map((p) => [
      `"${election.name}"`,
      `"${election.countryName}"`,
      `"${election.date}"`,
      `"${p.acronym}"`,
      `"${p.name}"`,
      `${p.voteTotal}`,
      `${p.votePercentage}`,
      `${p.seatsWon}`,
      `${p.totalSeats || ""}`,
      `${p.seatSharePercentage || ""}`,
      `${p.isWinner ? "TRUE" : "FALSE"}`,
      `"${election.officialSource}"`,
    ]);
  } else if (round?.candidateResults && round.candidateResults.length > 0) {
    headers = [
      "Election",
      "Country",
      "Date",
      "Candidate Name",
      "Party Affiliation",
      "Vote Total",
      "Vote Percentage (%)",
      "Qualified for Runoff",
      "Is Winner",
      "Official Source",
    ];

    rows = round.candidateResults.map((c) => [
      `"${election.name}"`,
      `"${election.countryName}"`,
      `"${election.date}"`,
      `"${c.name}"`,
      `"${c.partyName}"`,
      `${c.voteTotal}`,
      `${c.votePercentage}`,
      `${c.qualifiedForRunoff ? "TRUE" : "FALSE"}`,
      `${c.isWinner ? "TRUE" : "FALSE"}`,
      `"${election.officialSource}"`,
    ]);
  }

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  return csvContent;
}
