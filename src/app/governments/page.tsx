"use client";

import React, { useMemo, useState } from "react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import GovernmentCard from "@/components/cards/GovernmentCard";
import { getAllGovernments, getAllCountries } from "@/lib/data/store";
import { Shield, Search, Filter } from "lucide-react";

export default function GovernmentsDirectoryPage() {
  const governments = useMemo(() => getAllGovernments(), []);
  const countries = useMemo(() => getAllCountries(), []);

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const filtered = useMemo(() => {
    return governments.filter((g) => {
      const matchesSearch =
        search.trim() === "" ||
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.countryName.toLowerCase().includes(search.toLowerCase()) ||
        g.headOfGovernment.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        selectedType === "all" || g.type.toLowerCase().includes(selectedType.toLowerCase());

      return matchesSearch && matchesType;
    });
  }, [governments, search, selectedType]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[{ label: "Governments & Coalitions" }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-earth-750">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-300/10 border border-sand-300/20 text-sand-300 text-xs font-mono font-medium mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Executive Coalitions &amp; Opposition Observatory</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-earth-50">
            Governments &amp; Coalitions Tracker
          </h1>
          <p className="text-xs sm:text-sm text-earth-300 mt-1">
            Tracking governing majorities, junior coalition partners, confidence-and-supply pacts, and parliamentary opposition.
          </p>
        </div>

        <div className="text-xs font-mono text-sand-300 bg-earth-850 px-3 py-1.5 rounded-lg border border-earth-750">
          Tracking {filtered.length} administrations
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-earth-850 p-4 rounded-card border border-earth-750 shadow-card">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-earth-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by administration name, prime minister, or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-earth-900 border border-earth-750 rounded-xl pl-10 pr-4 py-2 text-xs text-earth-100 placeholder-earth-400 focus:outline-none focus:border-sand-300/40"
          />
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-earth-900 border border-earth-750 text-xs text-earth-200 rounded-xl px-3 py-2 focus:outline-none"
        >
          <option value="all">All Governance Models</option>
          <option value="majority coalition">Majority Coalition</option>
          <option value="minority">Minority Coalition</option>
          <option value="single-party">Single-Party Majority</option>
        </select>
      </div>

      {/* Governments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((gov) => (
          <GovernmentCard key={gov.id} government={gov} />
        ))}
      </div>
    </div>
  );
}
