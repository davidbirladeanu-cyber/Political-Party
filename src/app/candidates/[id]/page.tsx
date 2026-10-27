"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { getCandidateById } from "@/lib/data/store";
import SourceAttribution from "@/components/common/SourceAttribution";
import {
  User,
  Vote,
  Award,
  Calendar,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function CandidateProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const candidate = useMemo(() => getCandidateById(id), [id]);

  if (!candidate) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-earth-100">Public Official Not Found</h1>
        <p className="text-sm text-earth-400">No profile matching identifier &ldquo;{id}&rdquo;.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sand-300 text-earth-950 text-xs font-semibold"
        >
          <span>Return Home</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "Countries", href: "/countries" },
          { label: candidate.countryName, href: `/countries/${candidate.countryCode.toLowerCase()}` },
          { label: "Candidates & Officials" },
          { label: candidate.fullName },
        ]}
      />

      {/* Header Banner */}
      <div className="rounded-card border border-earth-750 bg-earth-850 p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="w-16 h-16 rounded-2xl bg-earth-800 border border-earth-700 flex items-center justify-center text-sand-300 flex-shrink-0 shadow-subtle">
              <User className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-4xl font-serif font-bold text-earth-50">
                  {candidate.fullName}
                </h1>
                {candidate.currentPartyAcronym && (
                  <span
                    className="font-mono text-xs uppercase px-2 py-0.5 rounded font-semibold text-white shadow-sm"
                    style={{ backgroundColor: candidate.partyColor || "#78716C" }}
                  >
                    {candidate.currentPartyAcronym}
                  </span>
                )}
              </div>

              <p className="text-sm text-sand-300 font-medium">
                {candidate.publicRole}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-earth-400 pt-1 font-mono">
                <span>Born: {candidate.birthYear}</span>
                <span>•</span>
                <span>Jurisdiction: {candidate.countryName}</span>
                {candidate.currentPartyName && (
                  <>
                    <span>•</span>
                    <span className="text-earth-200">{candidate.currentPartyName}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {candidate.sourceUrl && (
            <a
              href={candidate.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-earth-800 hover:bg-earth-750 text-xs font-semibold text-earth-100 border border-earth-700 shadow-subtle transition flex-shrink-0"
            >
              <span>Official Institutional Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Grid: Biography & Elections Contested */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Biography & Contested Elections */}
        <div className="lg:col-span-2 space-y-6">
          {/* Biography */}
          <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-3">
            <h2 className="text-base font-bold text-earth-50 border-b border-earth-750 pb-3">
              Official Biography &amp; Public Record
            </h2>
            <p className="text-xs sm:text-sm text-earth-300 leading-relaxed font-light">
              {candidate.biography}
            </p>
          </div>

          {/* Elections Contested */}
          <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-4">
            <h3 className="text-base font-bold text-earth-50 border-b border-earth-750 pb-3 flex items-center gap-2">
              <Vote className="w-4 h-4 text-sand-300" />
              <span>Electoral History &amp; Ballots Contested</span>
            </h3>

            <div className="space-y-3">
              {candidate.electionsContested.map((el, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-earth-900 border border-earth-750 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono text-sand-300 block">{el.year}</span>
                      <h4 className="text-sm font-bold text-earth-100">{el.electionName}</h4>
                    </div>

                    {el.votePercentage !== undefined && (
                      <span className="font-mono text-base font-bold text-sand-300 text-right">
                        {el.votePercentage}%
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-t border-earth-750 pt-2 text-earth-400">
                    <span>Affiliation: <strong className="text-earth-200">{el.partyAffiliation}</strong></span>
                    <span className="font-medium text-emerald-400">{el.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Public Offices & Terms */}
        <div className="space-y-6">
          <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-4">
            <h3 className="text-sm font-semibold text-earth-50 uppercase tracking-wider text-[11px] border-b border-earth-750 pb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-sand-300" />
              <span>Public Offices &amp; Mandates</span>
            </h3>

            <div className="space-y-2.5">
              {candidate.termsInOffice.map((term, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-earth-900 border border-earth-750 text-xs space-y-1"
                >
                  <p className="font-semibold text-earth-100">{term.office}</p>
                  <span className="font-mono text-earth-400 text-[11px] block">
                    {term.tenure}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <SourceAttribution
            authorityName="National Electoral Registry / Institutional Records"
            verificationDate={candidate.verifiedDate}
          />
        </div>
      </div>
    </div>
  );
}
