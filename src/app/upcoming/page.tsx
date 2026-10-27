"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { getAllUpcomingElections, getAllCountries } from "@/lib/data/store";
import { Calendar, Clock, Filter, Search, ExternalLink, ShieldCheck } from "lucide-react";

export default function UpcomingElectionsPage() {
  const upcoming = useMemo(() => getAllUpcomingElections(), []);
  const countries = useMemo(() => getAllCountries(), []);

  const [search, setSearch] = useState("");
  const [selectedCertainty, setSelectedCertainty] = useState("all");

  const filtered = useMemo(() => {
    return upcoming.filter((u) => {
      const matchesSearch =
        search.trim() === "" ||
        u.electionName.toLowerCase().includes(search.toLowerCase()) ||
        u.countryName.toLowerCase().includes(search.toLowerCase());

      const matchesCertainty =
        selectedCertainty === "all" || u.dateCertainty === selectedCertainty;

      return matchesSearch && matchesCertainty;
    });
  }, [upcoming, search, selectedCertainty]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[{ label: "Upcoming Elections" }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-earth-750">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-300/10 border border-sand-300/20 text-sand-300 text-xs font-mono font-medium mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Verified Global Election Calendar (2025–2027)</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-earth-50">
            Upcoming Sovereign Elections
          </h1>
          <p className="text-xs sm:text-sm text-earth-300 mt-1 max-w-2xl">
            Official scheduled elections and constitutional fixed-term deadlines. We never invent dates; each record is cross-referenced with national commissions.
          </p>
        </div>

        <div className="text-xs font-mono text-sand-300 bg-earth-850 px-3 py-1.5 rounded-lg border border-earth-750">
          Tracking {filtered.length} scheduled votes
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-earth-850 p-4 rounded-card border border-earth-750 shadow-card">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-earth-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search upcoming elections by name or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-earth-900 border border-earth-750 rounded-xl pl-10 pr-4 py-2 text-xs text-earth-100 placeholder-earth-400 focus:outline-none focus:border-sand-300/40"
          />
        </div>

        <select
          value={selectedCertainty}
          onChange={(e) => setSelectedCertainty(e.target.value)}
          className="bg-earth-900 border border-earth-750 text-xs text-earth-200 rounded-xl px-3 py-2 focus:outline-none"
        >
          <option value="all">All Date Classifications</option>
          <option value="confirmed">Confirmed Date</option>
          <option value="constitutional_deadline">Constitutional Deadline</option>
          <option value="tentative">Tentative Window</option>
        </select>
      </div>

      {/* Upcoming Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const country = countries.find((c) => c.code === item.countryCode);

          return (
            <div
              key={item.id}
              className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-4 hover:border-earth-700 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{country?.flag || "🌐"}</span>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-sand-300">
                      {item.countryName}
                    </span>
                    <h3 className="text-base font-bold text-earth-100 leading-tight">
                      {item.electionName}
                    </h3>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold flex-shrink-0 ${
                    item.dateCertainty === "confirmed"
                      ? "bg-sand-300/15 text-sand-300 border border-sand-300/30"
                      : "bg-earth-800 text-earth-300 border border-earth-700"
                  }`}
                >
                  {item.dateCertainty}
                </span>
              </div>

              <p className="text-xs text-earth-400 leading-relaxed">
                {item.description}
              </p>

              <div className="p-3.5 rounded-xl bg-earth-900 border border-earth-750 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-earth-300">
                  <span>Scheduled Date:</span>
                  <strong className="text-earth-50">{item.scheduledDate}</strong>
                </div>

                <div className="flex items-center justify-between text-earth-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sand-300" />
                    <span>Countdown:</span>
                  </span>
                  <span className="font-bold text-sand-300">
                    ~{item.daysRemaining} days remaining
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-earth-400 border-t border-earth-750 pt-3">
                <span className="text-[11px] truncate max-w-[200px]">
                  Source: {item.officialSource}
                </span>
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sand-300 hover:text-sand-200 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
