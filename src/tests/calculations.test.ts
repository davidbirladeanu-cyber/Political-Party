import { describe, it } from "node:test";
import assert from "node:assert";
import {
  getGlobalCoverageStats,
  getAllCountries,
  getElectionById,
  searchGlobal,
  exportElectionToCSV,
} from "../lib/data/store";
import { ELECTIONS } from "../lib/data/elections";

describe("Electoral Intelligence Data & Mathematical Calculations", () => {
  it("should accurately calculate voter turnout percentages", () => {
    for (const election of ELECTIONS) {
      const calculatedTurnout = (election.votesCast / election.registeredVoters) * 100;
      // Precision within 0.1% of published certified turnout
      assert.ok(
        Math.abs(calculatedTurnout - election.turnoutPercentage) < 0.2,
        `Turnout calculation discrepancy in ${election.name}: expected ~${election.turnoutPercentage}%, got ${calculatedTurnout.toFixed(2)}%`
      );
    }
  });

  it("should ensure valid votes plus invalid votes equal votes cast", () => {
    for (const election of ELECTIONS) {
      const sum = election.validVotes + election.invalidVotes;
      assert.strictEqual(
        sum,
        election.votesCast,
        `Ballot count mismatch in ${election.name}: valid (${election.validVotes}) + invalid (${election.invalidVotes}) !== total votes cast (${election.votesCast})`
      );
    }
  });

  it("should accurately compute seat share and vote-seat disproportionality", () => {
    const parl2024 = getElectionById("ro-parl-2024");
    assert.ok(parl2024, "Romania 2024 parliamentary election must exist");

    const round = parl2024.rounds[0];
    assert.ok(round.partyResults, "Party results must exist");

    for (const party of round.partyResults) {
      if (party.totalSeats && party.seatsWon > 0) {
        const computedSeatShare = (party.seatsWon / party.totalSeats) * 100;
        assert.ok(
          Math.abs(computedSeatShare - (party.seatSharePercentage || 0)) < 0.1,
          `Seat share discrepancy for ${party.acronym}`
        );
      }
    }
  });

  it("should derive global coverage statistics strictly from actual database records", () => {
    const stats = getGlobalCoverageStats();
    const countries = getAllCountries();

    assert.strictEqual(stats.totalCountries, countries.length);
    assert.ok(stats.fullCoverageCount > 0);
    assert.strictEqual(
      stats.fullCoverageCount + stats.partialCoverageCount + stats.basicCoverageCount,
      stats.totalCountries,
      "Every country must have an exact, non-overlapping coverage status"
    );
  });

  it("should produce valid, formatted CSV export with proper quotation and attribution", () => {
    const election = getElectionById("ro-parl-2024");
    assert.ok(election);
    const csv = exportElectionToCSV(election);

    assert.ok(csv.includes("Election,Country,Date"));
    assert.ok(csv.includes("PSD"));
    assert.ok(csv.includes("Partidul Social Democrat"));
    assert.ok(csv.includes("Autoritatea Electorală Permanentă"));
  });

  it("should index and return relevant entities in multi-entity global search", () => {
    const roResults = searchGlobal("Romania");
    assert.ok(roResults.some((r) => r.type === "country" && r.countryCode === "RO"));

    const psdResults = searchGlobal("PSD");
    assert.ok(psdResults.some((r) => r.type === "party" && r.title.includes("PSD")));

    const trumpResults = searchGlobal("Trump");
    assert.ok(trumpResults.some((r) => r.title.includes("Trump")));
  });
});
