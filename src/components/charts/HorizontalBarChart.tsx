"use client";

import React from "react";
import { CandidateResult, PartyResult } from "@/types";

interface BarChartProps {
  items: Array<{
    id: string;
    label: string;
    sublabel?: string;
    value: number; // Percentage, e.g. 22.3
    secondaryValue?: number; // Total votes
    seatsWon?: number;
    color: string;
    isWinner?: boolean;
    badge?: string;
  }>;
  maxValue?: number;
  valueFormatter?: (val: number) => string;
}

export default function HorizontalBarChart({
  items,
  maxValue,
  valueFormatter = (val) => `${val.toFixed(1)}%`,
}: BarChartProps) {
  const max = maxValue || Math.max(...items.map((i) => i.value), 10);

  return (
    <div className="w-full space-y-3.5">
      {items.map((item) => {
        const widthPercent = Math.min(100, Math.max(3, (item.value / max) * 100));

        return (
          <div key={item.id} className="group relative">
            <div className="flex items-baseline justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-semibold text-earth-50 group-hover:text-sand-300 transition">
                  {item.label}
                </span>
                {item.sublabel && (
                  <span className="text-earth-400 text-[11px] hidden sm:inline">
                    {item.sublabel}
                  </span>
                )}
                {item.isWinner && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-medium">
                    Winner
                  </span>
                )}
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded bg-earth-800 text-earth-300 text-[10px] border border-earth-700">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 font-mono">
                {item.secondaryValue !== undefined && (
                  <span className="text-earth-400 text-[11px] hidden md:inline">
                    {item.secondaryValue.toLocaleString()} votes
                  </span>
                )}
                {item.seatsWon !== undefined && (
                  <span className="px-2 py-0.5 rounded bg-earth-800 text-sand-300 text-xs font-semibold border border-earth-700/80">
                    {item.seatsWon} seats
                  </span>
                )}
                <span className="text-sm font-bold text-earth-100 min-w-[50px] text-right">
                  {valueFormatter(item.value)}
                </span>
              </div>
            </div>

            {/* Progress track */}
            <div className="relative h-2.5 w-full bg-earth-800 rounded-full overflow-hidden border border-earth-750">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out group-hover:brightness-110"
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
