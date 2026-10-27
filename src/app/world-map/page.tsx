"use client";

import React, { useState } from "react";
import EqualEarthMap from "@/components/map/EqualEarthMap";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { Country } from "@/types";
import { COUNTRIES } from "@/lib/data/countries";
import { ELECTIONS } from "@/lib/data/elections";
import { GOVERNMENTS } from "@/lib/data/governments";
import Link from "next/link";
import {
  Globe,
  ArrowRight,
  Shield,
  Vote,
  Calendar,
  Layers,
  ExternalLink,
  CheckCircle,
} from "lucide-react";

export default function WorldMapPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(
    COUNTRIES.find((c) => c.code === "RO") || null
  );

  const countryElections = selectedCountry
    ? ELECTIONS.filter((e) => e.countryCode === selectedCountry.code)
    : [];

  const currentGov = selectedCountry
    ? GOVERNMENTS.find(
        (g) => g.countryCode === selectedCountry.code && g.status === "current"
      )
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[{ label: "Equal Earth World Map" }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-earth-750">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-300/10 border border-sand-300/20 text-sand-300 text-xs font-mono font-medium mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>Equal Earth Equal-Area Geographic Projection</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-earth-50">
            Interactive Global Map
          </h1>
          <p className="text-xs sm:text-sm text-earth-300 mt-1 max-w-2xl">
            Select any sovereign nation to inspect its executive power, head of government, latest certified elections, and electoral system.
          </p>
        </div>

        {selectedCountry && (
          <Link
            href={`/countries/${selectedCountry.code.toLowerCase()}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sand-300 text-earth-950 font-semibold text-xs shadow-card hover:bg-sand-200 transition"
          >
            <span>Open {selectedCountry.name} Profile</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Main Grid: Map + Selected Country Intelligence Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EqualEarthMap
            selectedCountryCode={selectedCountry?.code}
            onSelectCountry={(c) => setSelectedCountry(c)}
          />
        </div>

        {/* Selected Country Details Sidebar */}
        <div className="space-y-4">
          {selectedCountry ? (
            <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-5">
              <div className="flex items-start justify-between gap-3 border-b border-earth-750 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedCountry.flag}</span>
                  <div>
                    <h3 className="text-lg font-bold text-earth-50 leading-tight">
                      {selectedCountry.name}
                    </h3>
                    <p className="text-xs text-earth-400">
                      {selectedCountry.officialName}
                    </p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-earth-900 border border-earth-750 text-sand-300 font-semibold">
                  {selectedCountry.coverageStatus} coverage
                </span>
              </div>

              {/* Political System Specs */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-earth-800">
                  <span className="text-earth-400">Political System:</span>
                  <span className="font-medium text-earth-100 text-right truncate max-w-[170px]">
                    {selectedCountry.politicalSystem}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-earth-800">
                  <span className="text-earth-400">Head of State:</span>
                  <span className="font-medium text-earth-100">
                    {selectedCountry.headOfState}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-earth-800">
                  <span className="text-earth-400">Head of Government:</span>
                  <span className="font-medium text-sand-300">
                    {selectedCountry.headOfGovernment}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-earth-800">
                  <span className="text-earth-400">Legislature:</span>
                  <span className="font-medium text-earth-100">
                    {selectedCountry.legislatureName} ({selectedCountry.chamberStructure})
                  </span>
                </div>

                {selectedCountry.latestTurnoutPercent && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-earth-800">
                    <span className="text-earth-400">Latest Turnout:</span>
                    <span className="font-mono font-bold text-sand-300">
                      {selectedCountry.latestTurnoutPercent}%
                    </span>
                  </div>
                )}
              </div>

              {/* Current Government Summary */}
              {currentGov && (
                <div className="p-3 rounded-xl bg-earth-900 border border-earth-750 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-earth-100 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{currentGov.name}</span>
                    </span>
                    <span className="text-[10px] text-earth-400 font-mono">
                      {currentGov.governingSeatsTotal}/{currentGov.totalSeats} seats
                    </span>
                  </div>
                  <p className="text-[11px] text-earth-400 line-clamp-2">
                    {currentGov.coalitionAgreementSummary}
                  </p>
                </div>
              )}

              {/* Elections on Record */}
              <div className="space-y-2 pt-2 border-t border-earth-750">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-earth-200">Elections on File:</span>
                  <span className="text-earth-400 font-mono">{countryElections.length}</span>
                </div>

                {countryElections.length > 0 ? (
                  <div className="space-y-1.5">
                    {countryElections.map((el) => (
                      <Link
                        key={el.id}
                        href={`/elections/${el.id}`}
                        className="flex items-center justify-between p-2 rounded-lg bg-earth-800 hover:bg-earth-750 text-xs transition"
                      >
                        <div className="truncate mr-2">
                          <p className="font-medium text-earth-100 truncate">{el.name}</p>
                          <p className="text-[10px] text-earth-400">{el.date}</p>
                        </div>
                        <span className="font-mono text-sand-300 text-[11px] font-semibold">
                          {el.turnoutPercentage}%
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-earth-400 italic">
                    Historical election archives in progress for this jurisdiction.
                  </p>
                )}
              </div>

              {/* Open Country Page button */}
              <Link
                href={`/countries/${selectedCountry.code.toLowerCase()}`}
                className="w-full py-2.5 rounded-xl bg-earth-800 hover:bg-earth-750 border border-earth-700 text-earth-100 font-medium text-xs flex items-center justify-center gap-1.5 transition"
              >
                <span>View Full Country Electoral Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="rounded-card border border-earth-750 bg-earth-850 p-6 text-center text-xs text-earth-400">
              Click any country on the map to load its profile.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
