"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { getPartyById } from "@/lib/data/store";
import SourceAttribution from "@/components/common/SourceAttribution";
import {
  Users,
  Shield,
  Calendar,
  ExternalLink,
  MapPin,
  TrendingUp,
  Award,
  Globe,
  ArrowRight,
} from "lucide-react";

export default function PartyProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const party = useMemo(() => getPartyById(id), [id]);

  if (!party) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-earth-100">Party Record Not Found</h1>
        <p className="text-sm text-earth-400">No party matching identifier &ldquo;{id}&rdquo;.</p>
        <Link
          href="/parties"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sand-300 text-earth-950 text-xs font-semibold"
        >
          <span>Return to Parties Directory</span>
        </Link>
      </div>
    );
  }

  // Ideology Axis Helper
  const renderAxis = (label: string, value: number, leftLabel: string, rightLabel: string) => {
    // Value is -10 to +10. Map to 0% to 100%
    const percent = ((value + 10) / 20) * 100;

    return (
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-earth-200">{label}</span>
          <span className="font-mono text-sand-300 font-bold">
            {value > 0 ? `+${value.toFixed(1)}` : value.toFixed(1)}
          </span>
        </div>

        <div className="relative h-2 w-full bg-earth-800 rounded-full overflow-hidden border border-earth-750">
          {/* Center line (neutral 0) */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-earth-600 z-10"></div>
          {/* Marker */}
          <div
            className="absolute top-0 bottom-0 w-3 rounded-full transition-all duration-700"
            style={{
              left: `calc(${percent}% - 6px)`,
              backgroundColor: party.color,
            }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-earth-400 font-mono">
          <span>{leftLabel}</span>
          <span>Center (0)</span>
          <span>{rightLabel}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "Countries", href: "/countries" },
          { label: party.countryName, href: `/countries/${party.countryCode.toLowerCase()}` },
          { label: "Political Parties", href: "/parties" },
          { label: `${party.acronym} — ${party.commonName}` },
        ]}
      />

      {/* Header Banner */}
      <div className="rounded-card border border-earth-750 bg-earth-850 p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-6">
            <span
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold font-mono text-lg text-white shadow-card flex-shrink-0"
              style={{ backgroundColor: party.color }}
            >
              {party.acronym.slice(0, 3)}
            </span>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-4xl font-serif font-bold text-earth-50">
                  {party.commonName}
                </h1>
                <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-earth-900 border border-earth-750 text-sand-300 font-semibold">
                  {party.acronym}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-earth-900 border border-earth-750 text-emerald-400 font-bold">
                  {party.currentRole}
                </span>
              </div>

              <p className="text-sm text-earth-300 font-serif italic">
                {party.officialName}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-earth-400 pt-1 font-mono">
                <span>Founded: {party.foundingYear}</span>
                <span>•</span>
                <span>Jurisdiction: {party.countryName}</span>
                {party.europeanAffiliation && (
                  <>
                    <span>•</span>
                    <span className="text-sand-300">{party.europeanAffiliation}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {party.website && (
            <a
              href={party.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-earth-800 hover:bg-earth-750 text-xs font-semibold text-earth-100 border border-earth-700 shadow-subtle transition flex-shrink-0"
            >
              <span>Official Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Main Grid: Multi-dimensional Ideology vs History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Multidimensional Ideological Assessment (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-6">
            <div className="border-b border-earth-750 pb-3">
              <h2 className="text-base font-bold text-earth-50">
                Multi-Dimensional Ideological Positioning
              </h2>
              <p className="text-xs text-earth-400 mt-0.5">
                Evaluated across four non-simplistic political policy dimensions.
              </p>
            </div>

            <div className="space-y-5">
              {renderAxis(
                "Economic Policy",
                party.ideology.economicPosition,
                "State Redistribution (-10)",
                "Free Market (+10)"
              )}
              {renderAxis(
                "Social & Cultural Policy",
                party.ideology.socialPosition,
                "Progressive / Liberal (-10)",
                "Traditional / Conservative (+10)"
              )}
              {renderAxis(
                "European Integration",
                party.ideology.europeanIntegration,
                "Hard Eurosceptic (-10)",
                "Federalist / Pro-EU (+10)"
              )}
              {renderAxis(
                "National Sovereignty Index",
                party.ideology.sovereigntyIndex,
                "Internationalist (-10)",
                "National Sovereignist (+10)"
              )}
            </div>

            {/* Sourced Classification vs Self Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-earth-750 text-xs">
              <div className="p-4 rounded-xl bg-earth-900 border border-earth-750 space-y-1.5">
                <span className="font-semibold text-sand-300 uppercase tracking-wider text-[11px]">
                  Independently Sourced Classification:
                </span>
                <p className="text-earth-200 leading-relaxed">
                  {party.ideology.independentAssessment}
                </p>
                <span className="text-[10px] text-earth-400 block pt-1 font-mono">
                  Source: {party.ideology.source}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-earth-900 border border-earth-750 space-y-1.5">
                <span className="font-semibold text-earth-200 uppercase tracking-wider text-[11px]">
                  Party Self-Description:
                </span>
                <p className="text-earth-300 leading-relaxed italic">
                  &ldquo;{party.ideology.selfDescribedPosition}&rdquo;
                </p>
                <span className="text-[10px] text-earth-400 block pt-1 font-mono">
                  Platform Manifesto Declaration
                </span>
              </div>
            </div>
          </div>

          {/* Electoral History Table */}
          <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-4">
            <h3 className="text-base font-bold text-earth-50 border-b border-earth-750 pb-3">
              Certified Electoral History
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-earth-750 text-earth-400 font-mono text-[11px]">
                    <th className="py-2.5 px-3">ELECTION</th>
                    <th className="py-2.5 px-3">YEAR</th>
                    <th className="py-2.5 px-3">VOTE SHARE</th>
                    <th className="py-2.5 px-3">SEATS WON</th>
                    <th className="py-2.5 px-3">SEAT SHARE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-earth-750">
                  {party.electoralHistory.map((h, i) => (
                    <tr key={i} className="hover:bg-earth-800/60 transition">
                      <td className="py-3 px-3 font-semibold text-earth-100">
                        {h.electionName}
                      </td>
                      <td className="py-3 px-3 font-mono text-sand-300">{h.year}</td>
                      <td className="py-3 px-3 font-mono font-bold text-earth-50">
                        {h.votePercentage}%
                      </td>
                      <td className="py-3 px-3 font-mono font-semibold text-earth-100">
                        {h.seatsWon} seats
                      </td>
                      <td className="py-3 px-3 font-mono text-earth-300">
                        {((h.seatsWon / h.totalSeats) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Leadership & Strongholds (1 col) */}
        <div className="space-y-6">
          {/* Current Leader & Leadership History */}
          <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-4">
            <h3 className="text-sm font-semibold text-earth-50 uppercase tracking-wider text-[11px] border-b border-earth-750 pb-3">
              Leadership &amp; Tenures
            </h3>

            <div className="p-3.5 rounded-xl bg-earth-900 border border-earth-750 space-y-1 text-xs">
              <span className="text-earth-400 text-[11px]">Current Party Leader:</span>
              <p className="text-base font-bold text-sand-300">{party.currentLeader}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-earth-300">Historical Presidents:</span>
              <div className="space-y-2">
                {party.leadershipHistory.map((lh, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-earth-800 text-xs font-mono"
                  >
                    <span className="font-medium text-earth-200">{lh.leader}</span>
                    <span className="text-earth-400 text-[11px]">{lh.tenure}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regional Strongholds & Coalitions */}
          <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-4 text-xs">
            <h3 className="text-sm font-semibold text-earth-50 uppercase tracking-wider text-[11px] border-b border-earth-750 pb-3">
              Geographic Strongholds &amp; Alliances
            </h3>

            <div>
              <span className="text-earth-400 font-semibold block mb-2">Regional Strongholds:</span>
              <div className="flex flex-wrap gap-1.5">
                {party.strongholds.map((s, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-earth-800 border border-earth-750 text-earth-200"
                  >
                    <MapPin className="w-3 h-3 text-sand-300" />
                    <span>{s}</span>
                  </span>
                ))}
              </div>
            </div>

            {party.coalitions.length > 0 && (
              <div className="pt-3 border-t border-earth-750">
                <span className="text-earth-400 font-semibold block mb-2">
                  Coalition Alliances:
                </span>
                <div className="space-y-1">
                  {party.coalitions.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-earth-900 border border-earth-750 text-earth-200 font-medium"
                    >
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Source Provenance */}
          <SourceAttribution
            authorityName={party.sources.join("; ")}
            verificationDate={party.lastVerified}
          />
        </div>
      </div>
    </div>
  );
}
