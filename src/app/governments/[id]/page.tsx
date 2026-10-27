"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { getGovernmentById } from "@/lib/data/store";
import SourceAttribution from "@/components/common/SourceAttribution";
import {
  Shield,
  Calendar,
  UserCheck,
  CheckCircle2,
  Users,
  Layers,
  ArrowRight,
  AlertCircle,
  FileText,
} from "lucide-react";

export default function GovernmentDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const gov = useMemo(() => getGovernmentById(id), [id]);

  if (!gov) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-earth-100">Government Record Not Found</h1>
        <p className="text-sm text-earth-400">No administration record matching identifier &ldquo;{id}&rdquo;.</p>
        <Link
          href="/governments"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sand-300 text-earth-950 text-xs font-semibold"
        >
          <span>Return to Governments Tracker</span>
        </Link>
      </div>
    );
  }

  const isMajority = gov.majorityMargin >= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "Countries", href: "/countries" },
          { label: gov.countryName, href: `/countries/${gov.countryCode.toLowerCase()}` },
          { label: "Governments & Coalitions", href: "/governments" },
          { label: gov.name },
        ]}
      />

      {/* Header Banner */}
      <div className="rounded-card border border-earth-750 bg-earth-850 p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-sand-300">
                {gov.countryName}
              </span>
              <span className="text-earth-500">•</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-earth-900 border border-earth-750 text-earth-300 font-semibold">
                {gov.type}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                  isMajority
                    ? "bg-emerald-950/70 text-emerald-400 border border-emerald-800/40"
                    : "bg-amber-950/70 text-amber-400 border border-amber-800/40"
                }`}
              >
                {isMajority ? `Majority (+${gov.majorityMargin})` : `Minority (${gov.majorityMargin})`}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-earth-50">
              {gov.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-earth-300 pt-1">
              <span>
                Head of Government: <strong className="text-sand-300">{gov.headOfGovernment}</strong>
              </span>
              <span>•</span>
              <span>
                Head of State: <strong className="text-earth-100">{gov.headOfState}</strong>
              </span>
              <span>•</span>
              <span className="font-mono text-earth-400">Formed: {gov.formationDate}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-earth-900 border border-earth-750 text-right font-mono text-xs flex-shrink-0 w-full sm:w-auto">
            <span className="text-earth-400 text-[10px] block">PARLIAMENTARY SUPPORT</span>
            <span className="text-2xl font-bold text-sand-300">
              {gov.governingSeatsTotal} / {gov.totalSeats}
            </span>
            <span className="text-[10px] text-earth-400 block mt-0.5">
              Majority threshold: {gov.majorityThreshold} seats
            </span>
          </div>
        </div>

        {gov.confidenceAndSupplyNotes && (
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-2.5 text-xs text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold text-amber-300">Parliamentary Support Context: </span>
              {gov.confidenceAndSupplyNotes}
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Governing Parties vs Opposition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Governing Parties */}
        <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-4">
          <div className="border-b border-earth-750 pb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-earth-50 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Governing Coalition Partners</span>
            </h2>
            <span className="text-xs font-mono text-earth-400">
              {gov.governingParties.length} parties
            </span>
          </div>

          <div className="space-y-3">
            {gov.governingParties.map((p) => (
              <div
                key={p.partyId}
                className="p-4 rounded-xl bg-earth-900 border border-earth-750 space-y-2 hover:border-earth-700 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: p.color }}
                    />
                    <div>
                      <h4 className="text-sm font-bold text-earth-100">{p.acronym}</h4>
                      <p className="text-xs text-earth-400">{p.partyName}</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-earth-800 border border-earth-750 text-sand-300 font-semibold">
                    {p.role}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-earth-300 border-t border-earth-750 pt-2 mt-2">
                  <span>Seats: <strong className="text-earth-50">{p.seatsHeld}</strong></span>
                  <span>Cabinet Portfolios: <strong className="text-earth-50">{p.cabinetMinistersCount}</strong></span>
                  <Link
                    href={`/parties/${p.partyId}`}
                    className="text-sand-300 hover:text-sand-200 inline-flex items-center gap-1 font-sans text-[11px]"
                  >
                    <span>Profile</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Opposition Parties */}
        <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-4">
          <div className="border-b border-earth-750 pb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-earth-50 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Parliamentary Opposition</span>
            </h2>
            <span className="text-xs font-mono text-earth-400">
              {gov.oppositionParties.length} parties
            </span>
          </div>

          <div className="space-y-3">
            {gov.oppositionParties.map((opp) => (
              <div
                key={opp.partyId}
                className="flex items-center justify-between p-3.5 rounded-xl bg-earth-900 border border-earth-750 text-xs"
              >
                <div className="flex items-center gap-2.5 truncate mr-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: opp.color }}
                  />
                  <div>
                    <h4 className="font-bold text-earth-100">{opp.acronym}</h4>
                    <p className="text-[11px] text-earth-400 truncate">{opp.partyName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono flex-shrink-0">
                  <span className="font-bold text-earth-50">{opp.seatsHeld} seats</span>
                  <Link
                    href={`/parties/${opp.partyId}`}
                    className="text-earth-400 hover:text-sand-300 transition"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coalition Agreement & Strategic Priorities */}
      <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-5">
        <h3 className="text-base font-bold text-earth-50 border-b border-earth-750 pb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-sand-300" />
          <span>Coalition Mandate &amp; Strategic Policy Priorities</span>
        </h3>

        <div className="p-4 rounded-xl bg-earth-900 border border-earth-750 text-xs text-earth-300 leading-relaxed">
          {gov.coalitionAgreementSummary}
        </div>

        {gov.keyPriorities && gov.keyPriorities.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-earth-200 uppercase tracking-wider text-[11px]">
              Key Executive Priorities:
            </span>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-earth-300">
              {gov.keyPriorities.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 p-3 rounded-lg bg-earth-900/60 border border-earth-750"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sand-300 mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Source Provenance */}
      <SourceAttribution
        authorityName={gov.sources.join("; ")}
        verificationDate={gov.lastVerified}
      />
    </div>
  );
}
