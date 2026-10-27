import React from "react";
import Link from "next/link";
import { Election } from "@/types";
import { Calendar, Vote, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ElectionCard({ election }: { election: Election }) {
  const isCertified = election.status === "certified";

  return (
    <Link
      href={`/elections/${election.id}`}
      className="group block rounded-card border border-earth-750 bg-earth-850 p-5 shadow-card hover:border-sand-300/40 hover:bg-earth-800 transition duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">
            {election.countryCode === "RO"
              ? "🇷🇴"
              : election.countryCode === "FR"
              ? "🇫🇷"
              : election.countryCode === "US"
              ? "🇺🇸"
              : election.countryCode === "GB"
              ? "🇬🇧"
              : election.countryCode === "DE"
              ? "🇩🇪"
              : "🌐"}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-sand-300">
            {election.countryName}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-earth-900 border border-earth-750 text-earth-300">
            {election.electionType.replace("_", " ")}
          </span>
          {isCertified && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              <span>Certified</span>
            </span>
          )}
        </div>
      </div>

      <h3 className="text-base font-bold text-earth-50 group-hover:text-sand-300 transition mb-2">
        {election.name}
      </h3>

      <p className="text-xs text-earth-400 line-clamp-2 mb-4 leading-relaxed">
        {election.summary}
      </p>

      {/* Stats row */}
      <div className="flex items-center justify-between text-xs border-t border-earth-750 pt-3 text-earth-300">
        <div className="flex items-center gap-1.5 text-earth-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{election.date}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono">
            Turnout: <strong className="text-sand-300">{election.turnoutPercentage}%</strong>
          </span>
          <ArrowRight className="w-4 h-4 text-earth-500 group-hover:text-sand-300 group-hover:translate-x-0.5 transition" />
        </div>
      </div>
    </Link>
  );
}
