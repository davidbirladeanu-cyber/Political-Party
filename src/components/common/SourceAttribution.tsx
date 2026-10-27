import React from "react";
import { ShieldCheck, ExternalLink, Calendar, CheckCircle } from "lucide-react";

interface SourceAttributionProps {
  authorityName: string;
  sourceUrl?: string;
  verificationDate: string;
  certifiedDate?: string;
  className?: string;
}

export default function SourceAttribution({
  authorityName,
  sourceUrl,
  verificationDate,
  certifiedDate,
  className = "",
}: SourceAttributionProps) {
  return (
    <div
      className={`rounded-xl border border-earth-750 bg-earth-850/60 p-4 text-xs ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 text-sand-300 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Official Provenance & Verification</span>
        </div>
        {certifiedDate && (
          <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
            <CheckCircle className="w-3 h-3" />
            <span>Certified Results</span>
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 text-earth-300">
        <div>
          <span className="text-earth-400">Source: </span>
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-earth-100 hover:text-sand-300 inline-flex items-center gap-1 transition"
            >
              <span>{authorityName}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span className="font-medium text-earth-100">{authorityName}</span>
          )}
        </div>

        <div className="flex items-center gap-4 text-earth-400 font-mono text-[11px]">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Verified: {verificationDate}</span>
          </span>
          {certifiedDate && <span>Certified: {certifiedDate}</span>}
        </div>
      </div>
    </div>
  );
}
