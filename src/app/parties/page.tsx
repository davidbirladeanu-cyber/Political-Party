"use client";

import React, { useState, useMemo } from "react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import PartyCard from "@/components/cards/PartyCard";
import { getAllParties, getAllCountries } from "@/lib/data/store";
import { Users, Search, Filter } from "lucide-react";

export default function PartiesDirectoryPage() {
  const parties = useMemo(() => getAllParties(), []);
  const countries = useMemo(() => getAllCountries(), []);

  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");

  const filtered = useMemo(() => {
    return parties.filter((p) => {
      const matchesSearch =
        search.trim() === "" ||
        p.commonName.toLowerCase().includes(search.toLowerCase()) ||
        p.officialName.toLowerCase().includes(search.toLowerCase()) ||
        p.acronym.toLowerCase().includes(search.toLowerCase()) ||
        p.currentLeader.toLowerCase().includes(search.toLowerCase()) ||
        p.countryName.toLowerCase().includes(search.toLowerCase());

      const matchesCountry =
        selectedCountry === "all" || p.countryCode === selectedCountry;

      const matchesRole =
        selectedRole === "all" ||
        (selectedRole === "gov"
          ? p.currentRole.includes("Government")
          : p.currentRole === "Opposition");

      return matchesSearch && matchesCountry && matchesRole;
    });
  }, [parties, search, selectedCountry, selectedRole]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[{ label: "Political Parties" }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-earth-750">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-300/10 border border-sand-300/20 text-sand-300 text-xs font-mono font-medium mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Multidimensional Political Registry</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-earth-50">
            Political Parties Database
          </h1>
          <p className="text-xs sm:text-sm text-earth-300 mt-1">
            Registered political movements analyzed across economic, social, European integration, and national sovereignty dimensions.
          </p>
        </div>

        <div className="text-xs font-mono text-sand-300 bg-earth-850 px-3 py-1.5 rounded-lg border border-earth-750">
          Showing {filtered.length} of {parties.length} parties
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-earth-850 p-4 rounded-card border border-earth-750 shadow-card">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-earth-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search party by acronym, name, leader, or country..."
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
          <option value="all">All Countries</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>

        {/* Role filter */}
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="bg-earth-900 border border-earth-750 text-xs text-earth-200 rounded-xl px-3 py-2 focus:outline-none"
        >
          <option value="all">All Roles</option>
          <option value="gov">In Government</option>
          <option value="opp">In Opposition</option>
        </select>
      </div>

      {/* Grid of Parties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((party) => (
          <PartyCard key={party.id} party={party} />
        ))}
      </div>
    </div>
  );
}
