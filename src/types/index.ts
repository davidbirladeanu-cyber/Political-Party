export type PoliticalSystem =
  | "Unitary semi-presidential republic"
  | "Unitary parliamentary republic"
  | "Federal presidential republic"
  | "Federal parliamentary republic"
  | "Unitary parliamentary constitutional monarchy"
  | "Federal parliamentary constitutional monarchy"
  | "Direct democracy / Federal directorial republic"
  | "One-party socialist republic"
  | "Absolute monarchy";

export type CoverageStatus = "full" | "partial" | "basic";

export interface Country {
  code: string; // ISO 3166-1 alpha-2 (e.g. "RO", "US", "FR")
  alpha3: string; // ISO 3166-1 alpha-3 (e.g. "ROU", "USA", "FRA")
  numericCode: string; // Numeric code for TopoJSON matching (e.g. "642", "840", "250")
  name: string;
  officialName: string;
  flag: string; // Unicode flag or emoji
  capital: string;
  region: "Europe" | "Americas" | "Asia" | "Africa" | "Oceania";
  subregion: string;
  politicalSystem: PoliticalSystem;
  headOfState: string;
  headOfStateTitle: string;
  headOfGovernment: string;
  headOfGovernmentTitle: string;
  legislatureName: string;
  chamberStructure: "Unicameral" | "Bicameral";
  upperChamberName?: string;
  lowerChamberName?: string;
  totalLegislativeSeats: number;
  currentGovernmentId: string;
  governingPartyIds: string[];
  oppositionPartyIds: string[];
  coverageStatus: CoverageStatus;
  lastElectionDate: string;
  nextScheduledElectionDate?: string;
  latestTurnoutPercent?: number;
  lastUpdated: string;
  description: string;
  electoralSystemSummary: string;
  officialSources: string[];
}

export type ElectionType =
  | "presidential"
  | "parliamentary"
  | "regional"
  | "local"
  | "european_parliament"
  | "referendum"
  | "mayoral";

export type ElectionStatus =
  | "certified"
  | "preliminary"
  | "ongoing"
  | "scheduled"
  | "cancelled"
  | "postponed";

export interface CandidateResult {
  candidateId: string;
  name: string;
  partyId?: string;
  partyName: string;
  partyAcronym: string;
  partyColor: string;
  voteTotal: number;
  votePercentage: number;
  isWinner: boolean;
  qualifiedForRunoff?: boolean;
}

export interface PartyResult {
  partyId: string;
  name: string;
  acronym: string;
  color: string;
  voteTotal: number;
  votePercentage: number;
  seatsWon: number;
  totalSeats?: number;
  seatSharePercentage?: number;
  seatChange?: number; // e.g. +5, -12
  voteShareChange?: number; // e.g. +2.4%
  isWinner: boolean;
  isGoverning: boolean;
}

export interface ElectionRound {
  roundNumber: number;
  roundName: string; // e.g. "Round 1" or "Runoff"
  date: string;
  registeredVoters: number;
  votesCast: number;
  validVotes: number;
  invalidVotes: number;
  blankBallots?: number;
  turnoutPercentage: number;
  candidateResults?: CandidateResult[];
  partyResults?: PartyResult[];
}

export interface RegionalResult {
  regionId: string;
  regionName: string;
  regionCode: string;
  turnoutPercentage: number;
  winningPartyOrCandidate: string;
  winnerColor: string;
  votePercentage: number;
  breakdown: Array<{
    name: string;
    acronym?: string;
    color: string;
    votePercentage: number;
    voteTotal: number;
    seatsWon?: number;
  }>;
}

export interface Election {
  id: string;
  countryCode: string;
  countryName: string;
  name: string;
  electionType: ElectionType;
  chamber?: "lower" | "upper" | "unicameral";
  date: string;
  status: ElectionStatus;
  electoralSystem: string;
  thresholdPercentage?: number;
  registeredVoters: number;
  votesCast: number;
  turnoutPercentage: number;
  validVotes: number;
  invalidVotes: number;
  hasRounds: boolean;
  rounds: ElectionRound[];
  regionalResults?: RegionalResult[];
  winningPartyOrCandidate: string;
  winnerColor: string;
  summary: string;
  officialSource: string;
  sourceUrl: string;
  verificationDate: string;
  certifiedDate?: string;
}

export interface IdeologicalClassification {
  economicPosition: number; // -10 (far left) to +10 (free market / right)
  socialPosition: number; // -10 (progressive / liberal) to +10 (traditional / conservative)
  europeanIntegration: number; // -10 (hard eurosceptic) to +10 (federalist / pro-EU)
  sovereigntyIndex: number; // -10 (internationalist) to +10 (nationalist / sovereignist)
  family: string; // e.g. "Social Democracy", "Liberal / Renew", "Christian Democracy / EPP", "Conservatives / ECR", "Greens", etc.
  selfDescribedPosition: string;
  independentAssessment: string;
  source: string;
}

export interface PoliticalParty {
  id: string;
  countryCode: string;
  countryName: string;
  officialName: string;
  commonName: string;
  acronym: string;
  color: string; // HEX color
  secondaryColor?: string;
  foundingYear: number;
  status: "active" | "dissolved" | "merged";
  website: string;
  logoUrl?: string;
  currentLeader: string;
  leadershipHistory: Array<{ leader: string; tenure: string }>;
  ideology: IdeologicalClassification;
  europeanAffiliation?: string; // e.g. "PES", "EPP", "ALDE / Renew Europe", "ECR", "ID"
  electoralHistory: Array<{
    electionId: string;
    electionName: string;
    year: number;
    votePercentage: number;
    seatsWon: number;
    totalSeats: number;
  }>;
  currentSeatsInLowerHouse?: number;
  currentSeatsInUpperHouse?: number;
  currentRole: "Government (Senior Partner)" | "Government (Junior Partner)" | "Opposition" | "External Support" | "Extra-parliamentary";
  strongholds: string[];
  coalitions: string[];
  sources: string[];
  lastVerified: string;
}

export interface GovernmentParty {
  partyId: string;
  partyName: string;
  acronym: string;
  color: string;
  role: "Lead Coalition Partner" | "Junior Coalition Partner" | "Confidence and Supply";
  seatsHeld: number;
  cabinetMinistersCount: number;
}

export interface Government {
  id: string;
  countryCode: string;
  countryName: string;
  name: string; // e.g. "Ciolacu Cabinet", "Barnier Cabinet"
  headOfGovernment: string;
  headOfGovernmentParty: string;
  headOfState: string;
  formationDate: string;
  dissolutionDate?: string;
  status: "current" | "historical";
  type: "Majority coalition" | "Minority coalition" | "Single-party majority" | "Caretaker / Technocratic";
  governingParties: GovernmentParty[];
  oppositionParties: Array<{
    partyId: string;
    partyName: string;
    acronym: string;
    color: string;
    seatsHeld: number;
  }>;
  parliamentaryChamber: string;
  totalSeats: number;
  majorityThreshold: number;
  governingSeatsTotal: number;
  majorityMargin: number; // e.g. +24 or -10 (for minority)
  confidenceAndSupplyNotes?: string;
  coalitionAgreementSummary: string;
  keyPriorities: string[];
  sources: string[];
  lastVerified: string;
}

export interface Candidate {
  id: string;
  fullName: string;
  countryCode: string;
  countryName: string;
  currentPartyId?: string;
  currentPartyName?: string;
  currentPartyAcronym?: string;
  partyColor?: string;
  publicRole: string;
  birthYear: number;
  biography: string;
  electionsContested: Array<{
    electionId: string;
    electionName: string;
    year: number;
    partyAffiliation: string;
    role: string;
    result: string;
    votePercentage?: number;
  }>;
  termsInOffice: Array<{
    office: string;
    tenure: string;
  }>;
  verifiedDate: string;
  sourceUrl: string;
}

export interface UpcomingElection {
  id: string;
  countryCode: string;
  countryName: string;
  electionName: string;
  electionType: ElectionType;
  scheduledDate: string;
  dateCertainty: "confirmed" | "tentative" | "constitutional_deadline";
  currentStatus: ElectionStatus;
  daysRemaining: number;
  officialSource: string;
  sourceUrl: string;
  description: string;
  lastVerified: string;
}

export interface DataSource {
  id: string;
  countryCode: string;
  countryName: string;
  authorityName: string;
  authorityType:
    | "national_election_commission"
    | "statistical_office"
    | "constitutional_court"
    | "parliament"
    | "international_body";
  officialUrl: string;
  legalBasis: string;
  dataLicense: string;
  datasetTypes: string[];
  updateFrequency: string;
  lastAuditDate: string;
  apiAvailable: boolean;
  contactOrPortalUrl: string;
}

export interface GlobalCoverageStats {
  totalCountries: number;
  fullCoverageCount: number;
  partialCoverageCount: number;
  basicCoverageCount: number;
  totalElectionsTracked: number;
  totalPoliticalParties: number;
  totalCandidatesTracked: number;
  activeGovernmentsTracked: number;
  upcomingElectionsScheduled: number;
  dataSourcesVerified: number;
}
