import React from "react";
import Link from "next/link";
import { Government } from "@/types";
import { Shield, ArrowRight, Calendar, UserCheck } from "lucide-react";

export default function GovernmentCard({
  government,
}: {
  government: Government;
}) {
  const isMajority = government.majorityMargin >= 0;

  return (
    <Link
      href={`/governments/${government.id}`}
      className="group block rounded-card border border-earth-750 bg-earth-850 p-5 shadow-card hover:border-sand-300/40 hover:bg-earth-800 transition duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-sand-300">
            {government.countryName}
          </span>
        </div>

        <span
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
            isMajority
              ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
              : "bg-amber-950/60 text-amber-400 border border-amber-800/40"
          }`}
        >
          {government.type}
        </span>
      </div>

      <h3 className="text-base font-bold text-earth-50 group-hover:text-sand-300 transition mb-2">
        {government.name}
      </h3>

      <div className="flex items-center gap-2 text-xs text-earth-300 mb-3">
        <UserCheck className="w-3.5 h-3.5 text-sand-300" />
        <span>Head: </span>
        <strong className="text-earth-100">{government.headOfGovernment}</strong>
        <span className="text-earth-400">({government.headOfGovernmentParty.split(" ")[0]})</span>
      </div>

      <p className="text-xs text-earth-400 line-clamp-2 mb-4 leading-relaxed">
        {government.coalitionAgreementSummary}
      </p>

      {/* Governing Coalition Parties Badges */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {government.governingParties.map((p) => (
          <span
            key={p.partyId}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] bg-earth-900 border border-earth-750 font-medium"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            <span className="text-earth-200">{p.acronym}</span>
            <span className="text-earth-400 font-mono text-[10px]">({p.seatsHeld})</span>
          </span>
        ))}
      </div>

      {/* Footer seats & formation */}
      <div className="flex items-center justify-between text-xs border-t border-earth-750 pt-3 text-earth-400">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3" />
          <span>Formed: {government.formationDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-earth-300">
            {government.governingSeatsTotal} / {government.totalSeats} seats
          </span>
          <ArrowRight className="w-4 h-4 text-earth-500 group-hover:text-sand-300 group-hover:translate-x-0.5 transition" />
        </div>
      </div>
    </Link>
  );
}
