"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import ElectionCard from "@/components/cards/ElectionCard";
import { getAllElections, getAllCountries } from "@/lib/data/store";
import { Vote, Search, Filter, Calendar } from "lucide-react";

export default function ElectionsPage() {
  const allElections = useMemo(() => getAllElections(), []);
  const allCountries = useMemo(() => getAllCountries(), []);

  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filtered = useMemo(() => {
    return allElections.filter((e) => {
      const matchesSearch =
        search.trim() === "" ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.countryName.toLowerCase().includes(search.toLowerCase()) ||
        e.summary.toLowerCase().includes(search.toLowerCase());

      const matchesCountry =
        selectedCountry === "all" || e.countryCode === selectedCountry;

      const matchesType =
        selectedType === "all" || e.electionType === selectedType;

      return matchesSearch && matchesCountry && matchesType;
    });
  }, [allElections, search, selectedCountry, selectedType]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[{ label: "Elections Archive" }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-earth-750">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-300/10 border border-sand-300/20 text-sand-300 text-xs font-mono font-medium mb-2">
            <Vote className="w-3.5 h-3.5" />
            <span>Official Election Records Archive</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-earth-50">
            Certified Global Elections
          </h1>
          <p className="text-xs sm:text-sm text-earth-300 mt-1">
            Presidential runoffs, parliamentary proportional lists, European Parliament ballots, and municipal elections with verified vote totals.
          </p>
        </div>

        <div className="text-xs font-mono text-sand-300 bg-earth-850 px-3 py-1.5 rounded-lg border border-earth-750">
          Showing {filtered.length} of {allElections.length} elections
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-earth-850 p-4 rounded-card border border-earth-750 shadow-card">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-earth-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search elections by title or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-earth-900 border border-earth-750 rounded-xl pl-10 pr-4 py-2 text-xs text-earth-100 placeholder-earth-400 focus:outline-none focus:border-sand-300/40"
          />
        </div>

        {/* Country filter */}
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="bg-earth-900 border border-earth-750 text-xs text-earth-200 rounded-xl px-3 py-2 focus:outline-none"
        >
          <option value="all">All Jurisdictions</option>
          {allCountries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>

        {/* Election Type filter */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-earth-900 border border-earth-750 text-xs text-earth-200 rounded-xl px-3 py-2 focus:outline-none"
        >
          <option value="all">All Election Types</option>
          <option value="presidential">Presidential</option>
          <option value="parliamentary">Parliamentary</option>
          <option value="european_parliament">European Parliament</option>
          <option value="local">Local / Mayoral</option>
        </select>
      </div>

      {/* Grid of Elections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((election) => (
          <ElectionCard key={election.id} election={election} />
        ))}
      </div>
    </div>
  );
}
