import React from "react";
import Link from "next/link";
import { PoliticalParty } from "@/types";
import { ArrowRight, User, Shield } from "lucide-react";

export default function PartyCard({ party }: { party: PoliticalParty }) {
  return (
    <Link
      href={`/parties/${party.id}`}
      className="group block rounded-card border border-earth-750 bg-earth-850 p-5 shadow-card hover:border-sand-300/40 hover:bg-earth-800 transition duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <span
            className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-sm"
            style={{ backgroundColor: party.color }}
          />
          <div>
            <span className="text-base font-bold font-mono text-earth-50 group-hover:text-sand-300 transition">
              {party.acronym}
            </span>
            <span className="text-xs text-earth-400 ml-2">
              {party.countryName}
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-earth-900 border border-earth-750 text-earth-300">
          {party.currentRole.split(" ")[0]}
        </span>
      </div>

      <h4 className="text-sm font-semibold text-earth-100 mb-2 truncate">
        {party.commonName}
      </h4>

      <p className="text-xs text-earth-400 line-clamp-2 mb-4 leading-relaxed">
        {party.ideology.independentAssessment}
      </p>

      {/* Multidimensional Ideological indicators */}
      <div className="grid grid-cols-2 gap-2 text-[11px] bg-earth-900/60 p-2.5 rounded-lg border border-earth-750 mb-3">
        <div className="flex items-center justify-between text-earth-400">
          <span>Economic:</span>
          <span className="font-mono text-earth-200 font-medium">
            {party.ideology.economicPosition > 0 ? "Right (+)" : "Left (-)"}
          </span>
        </div>
        <div className="flex items-center justify-between text-earth-400">
          <span>Sovereignty:</span>
          <span className="font-mono text-earth-200 font-medium">
            {party.ideology.sovereigntyIndex > 0 ? "Sovereignist" : "Globalist"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-earth-400 border-t border-earth-750 pt-3">
        <div className="flex items-center gap-1.5 truncate max-w-[200px]">
          <User className="w-3 h-3 text-earth-500" />
          <span className="truncate">{party.currentLeader}</span>
        </div>
        <ArrowRight className="w-4 h-4 text-earth-500 group-hover:text-sand-300 group-hover:translate-x-0.5 transition flex-shrink-0" />
      </div>
    </Link>
  );
}
