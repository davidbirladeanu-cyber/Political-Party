"use client";

import React from "react";

interface TurnoutGaugeProps {
  turnoutPercentage: number;
  registeredVoters: number;
  votesCast: number;
  validVotes: number;
  invalidVotes: number;
}

export default function TurnoutGauge({
  turnoutPercentage,
  registeredVoters,
  votesCast,
  validVotes,
  invalidVotes,
}: TurnoutGaugeProps) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (turnoutPercentage / 100) * circumference;

  return (
    <div className="rounded-card border border-earth-700 bg-earth-850 p-6 shadow-card">
      <h3 className="text-sm font-semibold text-earth-50 mb-4 pb-2 border-b border-earth-750">
        Voter Turnout & Ballot Breakdown
      </h3>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Circular Gauge */}
        <div className="relative flex items-center justify-center">
          <svg className="w-36 h-36 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="#262723"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="#D7C5A3"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="font-mono text-2xl font-bold text-earth-50">
              {turnoutPercentage.toFixed(1)}%
            </span>
            <span className="text-[11px] text-earth-400 uppercase tracking-wider font-medium">
              Turnout
            </span>
          </div>
        </div>

        {/* Breakdown Stats */}
        <div className="space-y-2.5 text-xs flex-1 w-full">
          <div className="flex items-center justify-between p-2 rounded-lg bg-earth-800 border border-earth-750">
            <span className="text-earth-400">Registered Electorate:</span>
            <span className="font-mono font-semibold text-earth-100">
              {registeredVoters.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-earth-800 border border-earth-750">
            <span className="text-earth-400">Total Votes Cast:</span>
            <span className="font-mono font-semibold text-sand-300">
              {votesCast.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-earth-800 border border-earth-750">
            <span className="text-earth-400">Valid Ballots:</span>
            <span className="font-mono font-semibold text-emerald-400">
              {validVotes.toLocaleString()} (
              {((validVotes / votesCast) * 100).toFixed(1)}%)
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-earth-800 border border-earth-750">
            <span className="text-earth-400">Invalid / Blank:</span>
            <span className="font-mono font-semibold text-rose-400">
              {invalidVotes.toLocaleString()} (
              {((invalidVotes / votesCast) * 100).toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
