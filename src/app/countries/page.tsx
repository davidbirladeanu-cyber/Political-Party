"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { getAllCountries } from "@/lib/data/store";
import { Search, Filter, Globe, ArrowRight, ShieldCheck } from "lucide-react";

export default function CountriesPage() {
  const allCountries = useMemo(() => getAllCountries(), []);

  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCoverage, setSelectedCoverage] = useState("all");

  const regions = ["all", "Europe", "Americas", "Asia", "Africa", "Oceania"];

  const filtered = useMemo(() => {
    return allCountries.filter((c) => {
      const matchesSearch =
        search.trim() === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.officialName.toLowerCase().includes(search.toLowerCase()) ||
        c.capital.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase() === search.toLowerCase();

      const matchesRegion =
        selectedRegion === "all" || c.region === selectedRegion;

      const matchesCoverage =
        selectedCoverage === "all" || c.coverageStatus === selectedCoverage;

      return matchesSearch && matchesRegion && matchesCoverage;
    });
  }, [allCountries, search, selectedRegion, selectedCoverage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[{ label: "Countries Directory" }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-earth-750">
        <div>
          <h1 className="text-3xl font-serif font-bold text-earth-50">
            Sovereign States &amp; Jurisdictions
          </h1>
          <p className="text-xs sm:text-sm text-earth-300 mt-1">
            Structured database of constitutional architectures, heads of state &amp; government, and electoral registries.
          </p>
        </div>

        <div className="text-xs font-mono text-sand-300 bg-earth-850 px-3 py-1.5 rounded-lg border border-earth-750">
          Showing {filtered.length} of {allCountries.length} countries
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-earth-850 p-4 rounded-card border border-earth-750 shadow-card">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-earth-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by country name, capital, or ISO code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-earth-900 border border-earth-750 rounded-xl pl-10 pr-4 py-2 text-xs text-earth-100 placeholder-earth-400 focus:outline-none focus:border-sand-300/40"
          />
        </div>

        {/* Region pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition whitespace-nowrap ${
                selectedRegion === reg
                  ? "bg-sand-300 text-earth-950 font-semibold"
                  : "bg-earth-800 text-earth-300 hover:bg-earth-750 hover:text-earth-50"
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Coverage dropdown */}
        <select
          value={selectedCoverage}
          onChange={(e) => setSelectedCoverage(e.target.value)}
          className="bg-earth-900 border border-earth-750 text-xs text-earth-200 rounded-xl px-3 py-2 focus:outline-none"
        >
          <option value="all">All Coverage Levels</option>
          <option value="full">Full Intelligence (Deep Regional)</option>
          <option value="partial">Partial Records</option>
          <option value="basic">Basic Directory</option>
        </select>
      </div>

      {/* Country Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((country) => (
          <Link
            key={country.code}
            href={`/countries/${country.code.toLowerCase()}`}
            className="group block rounded-card border border-earth-750 bg-earth-850 p-5 shadow-card hover:border-sand-300/40 hover:bg-earth-800 transition duration-200"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{country.flag}</span>
                <div>
                  <h3 className="text-base font-bold text-earth-50 group-hover:text-sand-300 transition leading-tight">
                    {country.name}
                  </h3>
                  <span className="text-xs text-earth-400">
                    {country.capital} • {country.subregion}
                  </span>
                </div>
              </div>

              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                  country.coverageStatus === "full"
                    ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                    : country.coverageStatus === "partial"
                    ? "bg-amber-950/60 text-amber-400 border border-amber-800/40"
                    : "bg-earth-900 text-earth-400 border border-earth-750"
                }`}
              >
                {country.coverageStatus}
              </span>
            </div>

            <p className="text-xs text-earth-400 line-clamp-2 mb-4 leading-relaxed">
              {country.description}
            </p>

            <div className="space-y-1.5 text-xs bg-earth-900/60 p-3 rounded-xl border border-earth-750 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-earth-400">System:</span>
                <span className="font-medium text-earth-200 truncate max-w-[170px]">
                  {country.politicalSystem}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-earth-400">Head of Gov:</span>
                <span className="font-medium text-sand-300">
                  {country.headOfGovernment}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-earth-400">Chamber:</span>
                <span className="font-medium text-earth-200">
                  {country.chamberStructure} ({country.totalLegislativeSeats} seats)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs border-t border-earth-750 pt-3 text-earth-400">
              <span className="font-mono">
                {country.latestTurnoutPercent
                  ? `Turnout: ${country.latestTurnoutPercent}%`
                  : `Last Vote: ${country.lastElectionDate || "N/A"}`}
              </span>

              <div className="flex items-center gap-1 text-sand-300 group-hover:translate-x-0.5 transition">
                <span>View Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
