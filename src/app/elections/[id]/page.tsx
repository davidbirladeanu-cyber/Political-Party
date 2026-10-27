"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import HorizontalBarChart from "@/components/charts/HorizontalBarChart";
import ParliamentHemicycle from "@/components/charts/ParliamentHemicycle";
import TurnoutGauge from "@/components/charts/TurnoutGauge";
import VoteShareComparison from "@/components/charts/VoteShareComparison";
import SourceAttribution from "@/components/common/SourceAttribution";
import ExportButton from "@/components/common/ExportButton";
import { getElectionById, getAllElections, exportElectionToCSV } from "@/lib/data/store";
import {
  Vote,
  Calendar,
  CheckCircle2,
  Users,
  Layers,
  MapPin,
  Search,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function ElectionDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const election = useMemo(() => getElectionById(id), [id]);

  // Round selection state (for multi-round elections like presidential runoffs)
  const [selectedRoundIndex, setSelectedRoundIndex] = useState(0);

  // Regional search and sort state
  const [regionQuery, setRegionQuery] = useState("");
  const [regionSortBy, setRegionSortBy] = useState<"name" | "turnout" | "winner">("turnout");

  if (!election) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-earth-100">Election Record Not Found</h1>
        <p className="text-sm text-earth-400">No verified election record found for &ldquo;{id}&rdquo;.</p>
        <Link
          href="/elections"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sand-300 text-earth-950 text-xs font-semibold"
        >
          <span>Return to Elections Archive</span>
        </Link>
      </div>
    );
  }

  const currentRound = election.rounds[selectedRoundIndex] || election.rounds[0];
  const csvData = exportElectionToCSV(election);

  // Bar chart items from partyResults or candidateResults
  const barChartItems = useMemo(() => {
    if (currentRound?.partyResults && currentRound.partyResults.length > 0) {
      return currentRound.partyResults.map((p) => ({
        id: p.partyId,
        label: p.acronym,
        sublabel: p.name,
        value: p.votePercentage,
        secondaryValue: p.voteTotal,
        seatsWon: p.seatsWon,
        color: p.color,
        isWinner: p.isWinner,
        badge: p.isGoverning ? "Governing" : undefined,
      }));
    }

    if (currentRound?.candidateResults && currentRound.candidateResults.length > 0) {
      return currentRound.candidateResults.map((c) => ({
        id: c.candidateId,
        label: c.name,
        sublabel: c.partyName,
        value: c.votePercentage,
        secondaryValue: c.voteTotal,
        color: c.partyColor,
        isWinner: c.isWinner,
        badge: c.qualifiedForRunoff ? "Qualified for Runoff" : undefined,
      }));
    }

    return [];
  }, [currentRound]);

  // Parliament Hemicycle Groups
  const hemicycleGroups = useMemo(() => {
    if (!currentRound?.partyResults) return [];
    return currentRound.partyResults
      .filter((p) => p.seatsWon > 0)
      .map((p) => ({
        id: p.partyId,
        name: p.name,
        acronym: p.acronym,
        seats: p.seatsWon,
        color: p.color,
        isGoverning: p.isGoverning,
      }));
  }, [currentRound]);

  // Filtered Regional Results
  const filteredRegionalResults = useMemo(() => {
    if (!election.regionalResults) return [];
    let list = [...election.regionalResults];

    if (regionQuery.trim()) {
      const q = regionQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.regionName.toLowerCase().includes(q) ||
          r.regionCode.toLowerCase().includes(q) ||
          r.winningPartyOrCandidate.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      if (regionSortBy === "turnout") return b.turnoutPercentage - a.turnoutPercentage;
      if (regionSortBy === "winner") return a.winningPartyOrCandidate.localeCompare(b.winningPartyOrCandidate);
      return a.regionName.localeCompare(b.regionName);
    });

    return list;
  }, [election.regionalResults, regionQuery, regionSortBy]);

  const electionYear = election.date ? election.date.split("-")[0] : "2024";

  const electionTypeLabel =
    election.electionType === "presidential"
      ? "Presidential"
      : election.electionType === "parliamentary"
      ? "Parliamentary"
      : election.electionType === "european_parliament"
      ? "European Parliament"
      : election.electionType
      ? election.electionType.charAt(0).toUpperCase() + election.electionType.slice(1)
      : "General";

  // Sibling elections (same country & type) for year switching
  const siblingElections = useMemo(() => {
    return getAllElections()
      .filter(
        (e) =>
          e.countryCode === election.countryCode &&
          e.electionType === election.electionType
      )
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [election]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "Countries", href: "/countries" },
          { label: election.countryName, href: `/countries/${election.countryCode.toLowerCase()}` },
          { label: "Elections", href: "/elections" },
          { label: electionTypeLabel, href: `/countries/${election.countryCode.toLowerCase()}?tab=elections&type=${election.electionType}` },
          { label: "Years", href: `/countries/${election.countryCode.toLowerCase()}?tab=elections` },
          { label: electionYear },
        ]}
      />

      {/* Header Banner */}
      <div className="rounded-card border border-earth-750 bg-earth-850 p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xl">
                {election.countryCode === "RO"
                  ? "🇷🇴"
                  : election.countryCode === "FR"
                  ? "🇫🇷"
                  : election.countryCode === "US"
                  ? "🇺🇸"
                  : election.countryCode === "GB"
                  ? "🇬🇧"
                  : election.countryCode === "DE"
                  ? "🇩🇪"
                  : "🌐"}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-sand-300">
                {election.countryName}
              </span>
              <span className="text-earth-500">•</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-earth-900 border border-earth-750 text-earth-300">
                {election.electionType.replace("_", " ")}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                <CheckCircle2 className="w-3 h-3" />
                <span>{election.status.toUpperCase()}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-earth-50 tracking-tight">
              {election.name}
            </h1>

            <p className="text-xs sm:text-sm text-earth-300 leading-relaxed max-w-3xl">
              {election.summary}
            </p>

            {siblingElections.length > 1 && (
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs font-semibold text-earth-400">Ediții / Ani:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {siblingElections.map((sib) => {
                    const sibYear = sib.date.split("-")[0];
                    const isCurrent = sib.id === election.id;
                    return (
                      <Link
                        key={sib.id}
                        href={`/elections/${sib.id}`}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                          isCurrent
                            ? "bg-sand-300 text-earth-950 shadow-subtle"
                            : "bg-earth-800 hover:bg-earth-750 text-earth-300 hover:text-earth-100 border border-earth-700/60"
                        }`}
                      >
                        {sibYear}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Action Export and Top Stats */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 flex-shrink-0">
            <ExportButton
              filename={`${election.id}-official-results.csv`}
              data={csvData}
              label="Export Certified Results (CSV)"
            />

            <div className="p-3 rounded-xl bg-earth-900 border border-earth-750 text-right font-mono text-xs w-full sm:w-auto">
              <span className="text-earth-400 text-[10px] block">VERIFIED TURNOUT</span>
              <span className="text-lg font-bold text-sand-300">
                {election.turnoutPercentage}%
              </span>
              <span className="text-[10px] text-earth-400 block mt-0.5">
                {election.votesCast.toLocaleString()} votes cast
              </span>
            </div>
          </div>
        </div>

        {/* Multi-Round Switcher (if election has multiple rounds) */}
        {election.hasRounds && election.rounds.length > 1 && (
          <div className="flex items-center gap-2 border-t border-earth-750 pt-4">
            <span className="text-xs text-earth-400 mr-2 font-medium">Ballot Rounds:</span>
            {election.rounds.map((round, index) => (
              <button
                key={round.roundNumber}
                onClick={() => setSelectedRoundIndex(index)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedRoundIndex === index
                    ? "bg-sand-300 text-earth-950 shadow-subtle"
                    : "bg-earth-800 text-earth-300 hover:bg-earth-750 hover:text-earth-50 border border-earth-700"
                }`}
              >
                {round.roundName}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Primary Visualizations Grid: Bar Chart + Turnout Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Horizontal Bar Chart (2 cols) */}
        <div className="lg:col-span-2 rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-earth-750 pb-3">
            <div>
              <h2 className="text-base font-bold text-earth-50">
                {currentRound?.partyResults ? "Party Vote Shares & Seats" : "Candidate Vote Totals"}
              </h2>
              <p className="text-xs text-earth-400">
                {currentRound?.roundName || "Official Balloting Summary"}
              </p>
            </div>

            <div className="text-xs text-earth-400 font-mono">
              Threshold: {election.thresholdPercentage ? `${election.thresholdPercentage}%` : "None"}
            </div>
          </div>

          <HorizontalBarChart items={barChartItems} />
        </div>

        {/* Turnout & Ballot Breakdown (1 col) */}
        <div>
          <TurnoutGauge
            turnoutPercentage={currentRound.turnoutPercentage}
            registeredVoters={currentRound.registeredVoters}
            votesCast={currentRound.votesCast}
            validVotes={currentRound.validVotes}
            invalidVotes={currentRound.invalidVotes}
          />
        </div>
      </div>

      {/* Semicircular Parliament Hemicycle & Vote Share Comparison (if parliamentary) */}
      {hemicycleGroups.length > 0 && currentRound?.partyResults && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ParliamentHemicycle
            groups={hemicycleGroups}
            totalSeats={hemicycleGroups.reduce((acc, g) => acc + g.seats, 0)}
            majorityThreshold={
              Math.floor(hemicycleGroups.reduce((acc, g) => acc + g.seats, 0) / 2) + 1
            }
            chamberName={`${election.countryName} Parliamentary Seat Distribution`}
          />

          <VoteShareComparison
            partyResults={currentRound.partyResults}
            electoralSystemName={election.electoralSystem}
          />
        </div>
      )}

      {/* Regional Results Explorer Table (if available) */}
      {election.regionalResults && election.regionalResults.length > 0 && (
        <section className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-earth-750 pb-4">
            <div>
              <h3 className="text-base font-bold text-earth-50 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sand-300" />
                <span>Sub-National Regional Results ({election.regionalResults.length} Subdivisions)</span>
              </h3>
              <p className="text-xs text-earth-400 mt-0.5">
                County and district certified returns with winning formations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-earth-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search region..."
                  value={regionQuery}
                  onChange={(e) => setRegionQuery(e.target.value)}
                  className="bg-earth-900 border border-earth-750 rounded-xl pl-9 pr-3 py-1.5 text-xs text-earth-100 placeholder-earth-400 focus:outline-none w-44"
                />
              </div>

              <select
                value={regionSortBy}
                onChange={(e) => setRegionSortBy(e.target.value as any)}
                className="bg-earth-900 border border-earth-750 text-xs text-earth-200 rounded-xl px-3 py-1.5 focus:outline-none"
              >
                <option value="turnout">Sort by Turnout</option>
                <option value="name">Sort by Region Name</option>
                <option value="winner">Sort by Winner</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-earth-750 text-earth-400 text-[11px] font-mono">
                  <th className="py-2.5 px-3">REGION / COUNTY</th>
                  <th className="py-2.5 px-3">CODE</th>
                  <th className="py-2.5 px-3">TURNOUT</th>
                  <th className="py-2.5 px-3">WINNING FORMATION</th>
                  <th className="py-2.5 px-3">VOTE SHARE</th>
                  <th className="py-2.5 px-3">TOP RESULTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-earth-750">
                {filteredRegionalResults.map((r) => (
                  <tr key={r.regionId} className="hover:bg-earth-800/60 transition">
                    <td className="py-3 px-3 font-semibold text-earth-100">
                      {r.regionName}
                    </td>
                    <td className="py-3 px-3 font-mono text-sand-300">{r.regionCode}</td>
                    <td className="py-3 px-3 font-mono font-semibold text-earth-100">
                      {r.turnoutPercentage}%
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className="font-medium inline-flex items-center gap-1.5"
                        style={{ color: r.winnerColor }}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: r.winnerColor }}
                        />
                        <span>{r.winningPartyOrCandidate}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-earth-50">
                      {r.votePercentage}%
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {r.breakdown.slice(0, 3).map((b, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-earth-900 border border-earth-750 text-[10px] font-mono"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: b.color }}
                            />
                            <span>{b.acronym}</span>
                            <span className="text-earth-400">{b.votePercentage}%</span>
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Official Sources and Verification Provenance */}
      <section className="space-y-2">
        <h3 className="text-xs font-semibold text-earth-400 uppercase tracking-wider">
          Legal Provenance &amp; Verification
        </h3>
        <SourceAttribution
          authorityName={election.officialSource}
          sourceUrl={election.sourceUrl}
          verificationDate={election.verificationDate}
          certifiedDate={election.certifiedDate}
        />
      </section>
    </div>
  );
}
