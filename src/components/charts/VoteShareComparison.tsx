"use client";

import React, { useState } from "react";
import { PartyResult } from "@/types";

interface VoteShareComparisonProps {
  partyResults: PartyResult[];
  electoralSystemName?: string;
}

export default function VoteShareComparison({
  partyResults,
  electoralSystemName,
}: VoteShareComparisonProps) {
  const [sortBy, setSortBy] = useState<"vote" | "seat">("vote");

  const sortedResults = [...partyResults].sort((a, b) => {
    if (sortBy === "seat") {
      return (b.seatSharePercentage || 0) - (a.seatSharePercentage || 0);
    }
    return b.votePercentage - a.votePercentage;
  });

  return (
    <div className="rounded-card border border-earth-700 bg-earth-850 p-6 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-earth-750">
        <div>
          <h3 className="text-sm font-semibold text-earth-50">
            Vote Share vs. Seat Share Disproportionality
          </h3>
          <p className="text-xs text-earth-400">
            System: {electoralSystemName || "Proportional / Plurality Representation"}
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-earth-800 border border-earth-700 text-xs">
          <button
            onClick={() => setSortBy("vote")}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              sortBy === "vote"
                ? "bg-sand-300 text-earth-950 font-semibold"
                : "text-earth-300 hover:text-earth-100"
            }`}
          >
            Sort by Votes
          </button>
          <button
            onClick={() => setSortBy("seat")}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              sortBy === "seat"
                ? "bg-sand-300 text-earth-950 font-semibold"
                : "text-earth-300 hover:text-earth-100"
            }`}
          >
            Sort by Seats
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedResults.map((p) => {
          const voteShare = p.votePercentage;
          const seatShare = p.seatSharePercentage || (p.totalSeats ? (p.seatsWon / p.totalSeats) * 100 : 0);
          const diff = seatShare - voteShare;

          return (
            <div key={p.partyId} className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="font-semibold text-earth-50">{p.acronym}</span>
                  <span className="text-earth-400 hidden sm:inline truncate max-w-[200px]">
                    {p.name}
                  </span>
                </div>

                <div className="flex items-center gap-4 font-mono">
                  <span className="text-earth-300">
                    Votes: <strong className="text-earth-100">{voteShare.toFixed(1)}%</strong>
                  </span>
                  <span className="text-earth-300">
                    Seats: <strong className="text-sand-300">{seatShare.toFixed(1)}%</strong> ({p.seatsWon})
                  </span>
                  <span
                    className={`font-semibold min-w-[50px] text-right ${
                      diff > 0.5
                        ? "text-emerald-400"
                        : diff < -0.5
                        ? "text-rose-400"
                        : "text-earth-400"
                    }`}
                  >
                    {diff > 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`}
                  </span>
                </div>
              </div>

              {/* Dual bar comparison */}
              <div className="space-y-1">
                {/* Vote share bar */}
                <div className="h-2 w-full bg-earth-800 rounded-full overflow-hidden flex items-center">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(100, Math.max(1, voteShare * 1.5))}%`,
                      backgroundColor: p.color,
                      opacity: 0.7,
                    }}
                  />
                </div>
                {/* Seat share bar */}
                <div className="h-2 w-full bg-earth-800 rounded-full overflow-hidden flex items-center">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(100, Math.max(1, seatShare * 1.5))}%`,
                      backgroundColor: p.color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-earth-750 flex items-center justify-between text-[11px] text-earth-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-1.5 bg-earth-400 rounded-sm opacity-70"></span>
            <span>Vote Share</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-1.5 bg-sand-300 rounded-sm"></span>
            <span>Seat Share</span>
          </span>
        </div>
        <span>Positive difference denotes majoritarian seat bonus</span>
      </div>
    </div>
  );
}
