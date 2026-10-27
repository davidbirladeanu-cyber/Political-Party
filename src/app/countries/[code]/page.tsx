"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import {
  getCountryByCode,
  getElectionsByCountry,
  getPartiesByCountry,
  getCurrentGovernmentByCountry,
  getAllCountries,
} from "@/lib/data/store";
import { ROMANIA_REGIONAL_RESULTS_PARL_2024 } from "@/lib/data/regional-data";
import SourceAttribution from "@/components/common/SourceAttribution";
import {
  Vote,
  Shield,
  Users,
  MapPin,
  Calendar,
  ArrowRight,
  ChevronRight,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Layers,
} from "lucide-react";

export default function CountryProfilePage() {
  const params = useParams();
  const code = (params.code as string) || "ro";

  const country = useMemo(() => getCountryByCode(code), [code]);
  const elections = useMemo(() => (country ? getElectionsByCountry(country.code) : []), [country]);
  const parties = useMemo(() => (country ? getPartiesByCountry(country.code) : []), [country]);
  const currentGov = useMemo(() => (country ? getCurrentGovernmentByCountry(country.code) : null), [country]);

  // Tab State: 'overview' | 'elections' | 'regions' | 'government' | 'parties'
  const [activeTab, setActiveTab] = useState<"overview" | "elections" | "regions" | "government" | "parties">("overview");

  // Regional Filter State (for Romania or countries with regional results)
  const [regionSearch, setRegionSearch] = useState("");
  const [regionSort, setRegionSort] = useState<"name" | "turnout" | "winner">("turnout");

  // Election Type Filter
  const [selectedElectionType, setSelectedElectionType] = useState<string>("all");

  const isRomania = country?.code === "RO";

  const filteredRegions = useMemo(() => {
    if (!isRomania) return [];
    let list = [...ROMANIA_REGIONAL_RESULTS_PARL_2024];

    if (regionSearch.trim()) {
      const q = regionSearch.toLowerCase();
      list = list.filter(
        (r) =>
          r.regionName.toLowerCase().includes(q) ||
          r.regionCode.toLowerCase().includes(q) ||
          r.winningPartyOrCandidate.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      if (regionSort === "turnout") return b.turnoutPercentage - a.turnoutPercentage;
      if (regionSort === "winner") return a.winningPartyOrCandidate.localeCompare(b.winningPartyOrCandidate);
      return a.regionName.localeCompare(b.regionName);
    });

    return list;
  }, [isRomania, regionSearch, regionSort]);

  const filteredElections = useMemo(() => {
    if (selectedElectionType === "all") return elections;
    return elections.filter((e) => e.electionType === selectedElectionType);
  }, [elections, selectedElectionType]);

  if (!country) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-earth-100">Country Not Found</h1>
        <p className="text-sm text-earth-400">
          No sovereign jurisdiction matching code &ldquo;{code}&rdquo;.
        </p>
        <Link
          href="/countries"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sand-300 text-earth-950 text-xs font-semibold"
        >
          <span>Return to Countries Directory</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "Countries", href: "/countries" },
          { label: country.name },
        ]}
      />

      {/* Country Header Banner */}
      <div className="rounded-card border border-earth-750 bg-earth-850 p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4 sm:gap-6">
            <span className="text-5xl sm:text-6xl select-none flex-shrink-0 drop-shadow-md">
              {country.flag}
            </span>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-4xl font-serif font-bold text-earth-50">
                  {country.name}
                </h1>
                <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-earth-900 border border-earth-700 text-sand-300 font-semibold">
                  {country.code} • {country.alpha3}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                    country.coverageStatus === "full"
                      ? "bg-emerald-950/70 text-emerald-400 border border-emerald-800/50"
                      : "bg-amber-950/70 text-amber-400 border border-amber-800/50"
                  }`}
                >
                  {country.coverageStatus} Intelligence Dossier
                </span>
              </div>

              <p className="text-sm text-earth-300 font-serif italic">
                {country.officialName}
              </p>

              <p className="text-xs text-earth-400 mt-2 max-w-3xl leading-relaxed">
                {country.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-3 text-xs font-mono flex-shrink-0">
            <div className="bg-earth-900/80 px-3.5 py-2 rounded-xl border border-earth-750 text-right">
              <span className="text-earth-400 text-[10px] block">LATEST TURNOUT</span>
              <span className="text-base font-bold text-sand-300">
                {country.latestTurnoutPercent ? `${country.latestTurnoutPercent}%` : "N/A"}
              </span>
            </div>
            <div className="bg-earth-900/80 px-3.5 py-2 rounded-xl border border-earth-750 text-right">
              <span className="text-earth-400 text-[10px] block">NEXT SCHEDULED VOTE</span>
              <span className="text-xs font-bold text-earth-100">
                {country.nextScheduledElectionDate || "TBD"}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-t border-earth-750 pt-5 mt-6">
          {(
            [
              { id: "overview", label: "Executive & Constitutional Profile" },
              { id: "elections", label: `Elections Archive (${elections.length})` },
              ...(isRomania
                ? [{ id: "regions", label: "Regional & County Explorer (42 Județe)" }]
                : []),
              { id: "government", label: "Government & Cabinet" },
              { id: "parties", label: `Political Parties (${parties.length})` },
            ] as const
          ).map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                  active
                    ? "bg-sand-300 text-earth-950 shadow-card"
                    : "bg-earth-800 text-earth-300 hover:bg-earth-750 hover:text-earth-50 border border-earth-700/60"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: EXECUTIVE & CONSTITUTIONAL OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Core Constitutional System */}
            <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-4">
              <h2 className="text-base font-bold text-earth-50 border-b border-earth-750 pb-3">
                Constitutional &amp; Institutional Structure
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-earth-900 border border-earth-750 space-y-1">
                  <span className="text-earth-400 text-[11px]">System of Government:</span>
                  <p className="font-semibold text-earth-100 text-sm">
                    {country.politicalSystem}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-earth-900 border border-earth-750 space-y-1">
                  <span className="text-earth-400 text-[11px]">Capital City &amp; Seat:</span>
                  <p className="font-semibold text-earth-100 text-sm">
                    {country.capital}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-earth-900 border border-earth-750 space-y-1">
                  <span className="text-earth-400 text-[11px]">
                    {country.headOfStateTitle || "Head of State"}:
                  </span>
                  <p className="font-semibold text-sand-300 text-sm">
                    {country.headOfState}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-earth-900 border border-earth-750 space-y-1">
                  <span className="text-earth-400 text-[11px]">
                    {country.headOfGovernmentTitle || "Head of Government"}:
                  </span>
                  <p className="font-semibold text-sand-300 text-sm">
                    {country.headOfGovernment}
                  </p>
                </div>
              </div>

              {/* Electoral System Summary */}
              <div className="p-4 rounded-xl bg-earth-900/60 border border-earth-750 space-y-1.5 text-xs">
                <span className="font-semibold text-sand-300 uppercase tracking-wider text-[11px]">
                  Electoral Architecture &amp; Representation Method
                </span>
                <p className="text-earth-300 leading-relaxed">
                  {country.electoralSystemSummary}
                </p>
              </div>

              {/* Legislature structure */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-earth-200">
                  Parliamentary Architecture ({country.chamberStructure}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {country.lowerChamberName && (
                    <div className="p-3 rounded-lg bg-earth-800 border border-earth-750">
                      <span className="text-earth-400 text-[10px] block">LOWER / POPULAR CHAMBER</span>
                      <strong className="text-earth-100">{country.lowerChamberName}</strong>
                    </div>
                  )}
                  {country.upperChamberName && (
                    <div className="p-3 rounded-lg bg-earth-800 border border-earth-750">
                      <span className="text-earth-400 text-[10px] block">UPPER / REGIONAL CHAMBER</span>
                      <strong className="text-earth-100">{country.upperChamberName}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Elections List */}
            <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-earth-750 pb-3">
                <h3 className="text-base font-bold text-earth-50">
                  Electoral Timeline &amp; Certified Ballots
                </h3>
                <span className="text-xs text-earth-400 font-mono">
                  {elections.length} verified events
                </span>
              </div>

              <div className="space-y-3">
                {elections.map((election) => (
                  <Link
                    key={election.id}
                    href={`/elections/${election.id}`}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-earth-900/70 hover:bg-earth-800 border border-earth-750 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-earth-800 text-sand-300">
                          {election.electionType.replace("_", " ")}
                        </span>
                        <span className="text-xs font-mono text-earth-400">
                          {election.date}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-earth-100">
                        {election.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono flex-shrink-0">
                      <div className="text-right">
                        <span className="text-earth-400 text-[10px] block">TURNOUT</span>
                        <strong className="text-sand-300">{election.turnoutPercentage}%</strong>
                      </div>
                      <div className="text-right hidden sm:block">
                        <span className="text-earth-400 text-[10px] block">WINNER</span>
                        <strong
                          className="truncate max-w-[140px] block"
                          style={{ color: election.winnerColor }}
                        >
                          {election.winningPartyOrCandidate}
                        </strong>
                      </div>
                      <ChevronRight className="w-4 h-4 text-earth-500" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Government & Official Provenance */}
          <div className="space-y-6">
            {currentGov && (
              <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between border-b border-earth-750 pb-3">
                  <h3 className="text-sm font-semibold text-earth-50 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Incumbent Government</span>
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    {currentGov.type}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-earth-100">{currentGov.name}</h4>
                  <p className="text-xs text-earth-300 mt-1">
                    Prime Minister: <strong className="text-sand-300">{currentGov.headOfGovernment}</strong>
                  </p>
                </div>

                <div className="space-y-1.5 text-xs">
                  <span className="text-earth-400 text-[11px] font-semibold">
                    Governing Coalition Parties:
                  </span>
                  <div className="space-y-1.5">
                    {currentGov.governingParties.map((p) => (
                      <div
                        key={p.partyId}
                        className="flex items-center justify-between p-2 rounded-lg bg-earth-800"
                      >
                        <div className="flex items-center gap-2 truncate mr-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: p.color }}
                          />
                          <span className="font-semibold text-earth-100">{p.acronym}</span>
                          <span className="text-earth-400 text-[11px] truncate hidden sm:inline">
                            {p.partyName}
                          </span>
                        </div>
                        <span className="font-mono text-sand-300 font-bold">
                          {p.seatsHeld} seats
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-earth-900 border border-earth-750 text-xs text-earth-400 leading-relaxed">
                  {currentGov.coalitionAgreementSummary}
                </div>

                <Link
                  href={`/governments/${currentGov.id}`}
                  className="w-full py-2 rounded-lg bg-earth-800 hover:bg-earth-750 text-center text-xs font-semibold text-earth-200 block transition"
                >
                  Inspect Full Coalition Composition &amp; Opposition
                </Link>
              </div>
            )}

            {/* Official Sources */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-earth-400 uppercase tracking-wider">
                Official Electoral Sources
              </span>
              <SourceAttribution
                authorityName={country.officialSources.join("; ")}
                sourceUrl="https://prezenta.roaep.ro"
                verificationDate={country.lastUpdated}
                certifiedDate="2024-12-08"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ELECTIONS ARCHIVE */}
      {activeTab === "elections" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-earth-850 p-4 rounded-card border border-earth-750">
            <div className="flex items-center gap-2 text-xs font-semibold text-earth-200">
              <Filter className="w-3.5 h-3.5 text-sand-300" />
              <span>Filter by Type:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "All Elections" },
                { id: "presidential", label: "Presidential" },
                { id: "parliamentary", label: "Parliamentary" },
                { id: "european_parliament", label: "European Parliament" },
                { id: "local", label: "Local / Municipal" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedElectionType(t.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    selectedElectionType === t.id
                      ? "bg-sand-300 text-earth-950 font-semibold"
                      : "bg-earth-800 text-earth-300 hover:bg-earth-750 hover:text-earth-50"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredElections.map((election) => (
              <div
                key={election.id}
                className="rounded-card border border-earth-750 bg-earth-850 p-5 shadow-card space-y-4 hover:border-earth-700 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-earth-900 border border-earth-750 text-sand-300 font-semibold">
                    {election.electionType.replace("_", " ")}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{election.status}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-earth-100">{election.name}</h3>
                  <p className="text-xs text-earth-400 mt-1">{election.date}</p>
                </div>

                <p className="text-xs text-earth-400 line-clamp-3 leading-relaxed">
                  {election.summary}
                </p>

                <div className="p-3 rounded-lg bg-earth-900 border border-earth-750 text-xs space-y-1 font-mono">
                  <div className="flex items-center justify-between text-earth-300">
                    <span>Turnout:</span>
                    <strong className="text-sand-300">{election.turnoutPercentage}%</strong>
                  </div>
                  <div className="flex items-center justify-between text-earth-300">
                    <span>Registered:</span>
                    <span>{election.registeredVoters.toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  href={`/elections/${election.id}`}
                  className="w-full py-2 rounded-xl bg-earth-800 hover:bg-earth-750 text-xs font-semibold text-earth-100 flex items-center justify-center gap-2 border border-earth-700 transition"
                >
                  <span>Inspect Results &amp; Charts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ROMANIA REGIONAL & COUNTY EXPLORER (42 Județe & Bucharest) */}
      {activeTab === "regions" && isRomania && (
        <div className="space-y-6">
          <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-earth-750 pb-4">
              <div>
                <h2 className="text-lg font-bold text-earth-50 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sand-300" />
                  <span>Sub-National Administrative Drill-Down (Județe)</span>
                </h2>
                <p className="text-xs text-earth-400 mt-1">
                  First-level administrative counties of Romania with certified results from the 2024 parliamentary election.
                </p>
              </div>

              {/* Regional Search & Sorting */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-earth-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filter county (e.g. Cluj, Timiș)..."
                    value={regionSearch}
                    onChange={(e) => setRegionSearch(e.target.value)}
                    className="bg-earth-900 border border-earth-750 rounded-xl pl-9 pr-3 py-1.5 text-xs text-earth-100 placeholder-earth-400 focus:outline-none w-52"
                  />
                </div>

                <select
                  value={regionSort}
                  onChange={(e) => setRegionSort(e.target.value as any)}
                  className="bg-earth-900 border border-earth-750 text-xs text-earth-200 rounded-xl px-3 py-1.5 focus:outline-none"
                >
                  <option value="turnout">Sort by Turnout (%)</option>
                  <option value="name">Sort by County Name</option>
                  <option value="winner">Sort by Winning Party</option>
                </select>
              </div>
            </div>

            {/* Regional Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-earth-750 text-earth-400 text-[11px] font-mono">
                    <th className="py-3 px-3">COUNTY (JUDEȚ)</th>
                    <th className="py-3 px-3">CODE</th>
                    <th className="py-3 px-3">TURNOUT</th>
                    <th className="py-3 px-3">WINNING FORMATION</th>
                    <th className="py-3 px-3">WINNER SHARE</th>
                    <th className="py-3 px-3">PARTY BREAKDOWN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-earth-750">
                  {filteredRegions.map((reg) => (
                    <tr
                      key={reg.regionId}
                      className="hover:bg-earth-800/60 transition group"
                    >
                      <td className="py-3.5 px-3 font-semibold text-earth-100">
                        {reg.regionName}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-sand-300">
                        {reg.regionCode}
                      </td>
                      <td className="py-3.5 px-3 font-mono font-semibold text-earth-100">
                        {reg.turnoutPercentage}%
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className="font-medium inline-flex items-center gap-1.5"
                          style={{ color: reg.winnerColor }}
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: reg.winnerColor }}
                          />
                          <span>{reg.winningPartyOrCandidate}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-earth-50">
                        {reg.votePercentage}%
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {reg.breakdown.slice(0, 4).map((b, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-earth-900 border border-earth-750 text-[10px] font-mono"
                              title={`${b.name}: ${b.votePercentage}%`}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: b.color }}
                              />
                              <span className="text-earth-200">{b.acronym}</span>
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
          </div>
        </div>
      )}

      {/* TAB 4: GOVERNMENT & OPPOSITION */}
      {activeTab === "government" && (
        <div className="space-y-6">
          {currentGov ? (
            <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-earth-750 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-xl font-bold text-earth-50">{currentGov.name}</h2>
                  </div>
                  <p className="text-xs text-earth-400 mt-1">
                    Formed: {currentGov.formationDate} • Classification: {currentGov.type}
                  </p>
                </div>

                <div className="font-mono text-xs text-right">
                  <span className="text-earth-400 block text-[10px]">PARLIAMENTARY SUPPORT</span>
                  <span className="text-base font-bold text-sand-300">
                    {currentGov.governingSeatsTotal} / {currentGov.totalSeats} seats
                  </span>
                </div>
              </div>

              {/* Governing Coalition Parties */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-earth-100 uppercase tracking-wider text-[11px]">
                  Governing Coalition Parties
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentGov.governingParties.map((p) => (
                    <div
                      key={p.partyId}
                      className="p-4 rounded-xl bg-earth-900 border border-earth-750 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: p.color }}
                          />
                          <h4 className="text-sm font-bold text-earth-50">{p.acronym}</h4>
                          <span className="text-xs text-earth-400">{p.partyName}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-earth-800 text-sand-300">
                          {p.role}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono text-earth-400 pt-1">
                        <span>Deputies: {p.seatsHeld} seats</span>
                        <span>Cabinet Ministers: {p.cabinetMinistersCount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opposition Parties */}
              <div className="space-y-3 pt-4 border-t border-earth-750">
                <h3 className="text-sm font-semibold text-earth-100 uppercase tracking-wider text-[11px]">
                  Opposition Parties in Parliament
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {currentGov.oppositionParties.map((opp) => (
                    <div
                      key={opp.partyId}
                      className="flex items-center justify-between p-3 rounded-lg bg-earth-900/60 border border-earth-750 text-xs"
                    >
                      <div className="flex items-center gap-2 truncate mr-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: opp.color }}
                        />
                        <span className="font-semibold text-earth-100">{opp.acronym}</span>
                        <span className="text-earth-400 text-[11px] truncate">{opp.partyName}</span>
                      </div>
                      <span className="font-mono text-earth-300 font-semibold">
                        {opp.seatsHeld} seats
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-card border border-earth-750 bg-earth-850 text-center text-xs text-earth-400">
              Government tracking dossier in progress for this jurisdiction.
            </div>
          )}
        </div>
      )}

      {/* TAB 5: POLITICAL PARTIES */}
      {activeTab === "parties" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {parties.map((party) => (
            <div
              key={party.id}
              className="rounded-card border border-earth-750 bg-earth-850 p-5 shadow-card space-y-4 hover:border-earth-700 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: party.color }}
                  />
                  <div>
                    <h3 className="text-base font-bold font-mono text-earth-50">
                      {party.acronym}
                    </h3>
                    <span className="text-xs text-earth-400">{party.commonName}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-earth-900 border border-earth-750 text-sand-300">
                  {party.currentRole.split(" ")[0]}
                </span>
              </div>

              <p className="text-xs text-earth-400 leading-relaxed line-clamp-3">
                {party.ideology.independentAssessment}
              </p>

              <div className="p-3 rounded-lg bg-earth-900 border border-earth-750 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-earth-300">
                  <span>Leader:</span>
                  <strong className="text-earth-100">{party.currentLeader}</strong>
                </div>
                <div className="flex items-center justify-between text-earth-300">
                  <span>Ideology Family:</span>
                  <span className="text-sand-300">{party.ideology.family}</span>
                </div>
                {party.currentSeatsInLowerHouse !== undefined && (
                  <div className="flex items-center justify-between text-earth-300">
                    <span>Lower Chamber Seats:</span>
                    <strong className="font-mono text-earth-100">
                      {party.currentSeatsInLowerHouse}
                    </strong>
                  </div>
                )}
              </div>

              <Link
                href={`/parties/${party.id}`}
                className="w-full py-2 rounded-xl bg-earth-800 hover:bg-earth-750 text-xs font-semibold text-earth-100 flex items-center justify-center gap-1.5 border border-earth-700 transition"
              >
                <span>View Multidimensional Party Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
