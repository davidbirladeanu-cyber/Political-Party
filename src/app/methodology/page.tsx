"use client";

import React, { useMemo } from "react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { getAllDataSources } from "@/lib/data/store";
import {
  ShieldCheck,
  Database,
  ExternalLink,
  Lock,
  Scale,
  FileCheck,
  CheckCircle,
} from "lucide-react";

export default function MethodologyPage() {
  const sources = useMemo(() => getAllDataSources(), []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: "Data & Methodology" }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-earth-750">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-300/10 border border-sand-300/20 text-sand-300 text-xs font-mono font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Data Integrity, Legal Provenance &amp; Verification Protocol</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-earth-50">
            Source Integrity &amp; Ingestion Methodology
          </h1>
          <p className="text-xs sm:text-sm text-earth-300 max-w-3xl leading-relaxed font-light">
            Equal Earth is built upon an unyielding commitment to data veracity. We do not invent figures, interpolate unverified margins, or extrapolate preliminary numbers into certified declarations.
          </p>
        </div>
      </div>

      {/* Core Principles Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-earth-800 border border-earth-750 flex items-center justify-center text-emerald-400">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-earth-50">
            1. Source Hierarchy &amp; Verification
          </h3>
          <p className="text-xs text-earth-400 leading-relaxed">
            Data is strictly ingested in hierarchical order: National Election Authorities (e.g. AEP Romania, Ministère de l&apos;Intérieur France, FEC USA) &gt; Parliamentary registries &gt; Official statistical agencies. Non-governmental media projections are never recorded as certified results.
          </p>
        </div>

        <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-earth-800 border border-earth-750 flex items-center justify-center text-sand-300">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-earth-50">
            2. Anti-Fabrication Principle
          </h3>
          <p className="text-xs text-earth-400 leading-relaxed">
            Where verified sub-national or historical data does not yet exist, Equal Earth renders an explicit unavailable-data indicator rather than synthetic or modeled approximations. Zero-values are strictly distinguished from unreported values.
          </p>
        </div>

        <div className="rounded-card border border-earth-750 bg-earth-850 p-6 shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-earth-800 border border-earth-750 flex items-center justify-center text-sky-400">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-earth-50">
            3. Equal Earth Map Projection Standard
          </h3>
          <p className="text-xs text-earth-400 leading-relaxed">
            Unlike Web Mercator which introduces severe high-latitude area distortions (making Greenland appear the size of Africa), Equal Earth is an equal-area pseudocylindrical projection that preserves true relative geographic scales without visual distortion.
          </p>
        </div>
      </div>

      {/* Verified Official Data Registries Table */}
      <section className="rounded-card border border-earth-750 bg-earth-850 p-6 sm:p-8 shadow-card space-y-6">
        <div className="border-b border-earth-750 pb-4">
          <h2 className="text-xl font-serif font-bold text-earth-50">
            Institutional Data Sources &amp; Legal Licenses
          </h2>
          <p className="text-xs text-earth-400 mt-1">
            Current ingestion connections, legal statutory basis, and audit timestamps.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-earth-750 text-earth-400 font-mono text-[11px]">
                <th className="py-3 px-3">COUNTRY / SCOPE</th>
                <th className="py-3 px-3">AUTHORITY</th>
                <th className="py-3 px-3">STATUTORY LEGAL BASIS</th>
                <th className="py-3 px-3">DATA LICENSE</th>
                <th className="py-3 px-3">LAST AUDIT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-earth-750">
              {sources.map((src) => (
                <tr key={src.id} className="hover:bg-earth-800/60 transition">
                  <td className="py-3.5 px-3 font-semibold text-earth-100">
                    {src.countryName}
                  </td>
                  <td className="py-3.5 px-3">
                    <a
                      href={src.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-sand-300 hover:text-sand-200 inline-flex items-center gap-1 transition"
                    >
                      <span>{src.authorityName}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="py-3.5 px-3 text-earth-300 max-w-xs truncate" title={src.legalBasis}>
                    {src.legalBasis}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-earth-400">
                    {src.dataLicense}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-earth-300">
                    {src.lastAuditDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Multi-Dimensional Ideological Scoring Methodology */}
      <section className="rounded-card border border-earth-750 bg-earth-850 p-6 sm:p-8 shadow-card space-y-4 text-xs">
        <h2 className="text-base font-bold text-earth-50 border-b border-earth-750 pb-3">
          Multidimensional Political Party Positioning Methodology
        </h2>

        <p className="text-earth-300 leading-relaxed">
          Traditional political analysis compresses diverse parties onto a single 1-dimensional &ldquo;Left vs. Right&rdquo; spectrum. In contemporary democracies, such reductionism fails to account for parties with socially conservative and economically interventionist platforms, or liberal parties championing open markets alongside progressive social rights.
        </p>

        <p className="text-earth-300 leading-relaxed">
          Equal Earth evaluates each registered party across four distinct independent axes calibrated from -10.0 to +10.0:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-earth-900 border border-earth-750 space-y-1">
            <strong className="text-sand-300 block">1. Economic Axis (-10 to +10):</strong>
            <span className="text-earth-400 leading-relaxed block">
              Measures state redistribution, public sector ownership, taxation progressivity, versus deregulation and free enterprise.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-earth-900 border border-earth-750 space-y-1">
            <strong className="text-sand-300 block">2. Social &amp; Cultural Axis (-10 to +10):</strong>
            <span className="text-earth-400 leading-relaxed block">
              Measures civil liberties, secularism, environmental policy, versus religious heritage and traditional social institutions.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-earth-900 border border-earth-750 space-y-1">
            <strong className="text-sand-300 block">3. European Integration Axis (-10 to +10):</strong>
            <span className="text-earth-400 leading-relaxed block">
              Evaluates support for European federalism and supranational integration versus sovereign national veto and Euroscepticism.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-earth-900 border border-earth-750 space-y-1">
            <strong className="text-sand-300 block">4. National Sovereignty Index (-10 to +10):</strong>
            <span className="text-earth-400 leading-relaxed block">
              Measures internationalism, multilateral alliances (NATO, UN), versus isolationism, border autarky, and patriotic primacy.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
