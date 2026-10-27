"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  HISTORICAL_ERAS,
  getClosestHistoricalEra,
  formatYear,
} from "@/lib/data/historical-eras";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

interface HistoricalTimelineProps {
  year: number;
  onYearChange: (year: number) => void;
  className?: string;
}

const ALL_MILESTONES = HISTORICAL_ERAS.map((e) => e.year);
const LABELED_YEARS = new Set([
  -3500,
  -2500,
  -1500,
  -500,
  0,
  500,
  800,
  1279,
  1600,
  1812,
  1914,
  1942,
  2026,
]);

export default function HistoricalTimeline({
  year,
  onYearChange,
  className = "",
}: HistoricalTimelineProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const currentEra = getClosestHistoricalEra(year);
  const yearRef = useRef(year);
  yearRef.current = year;
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Play animation loop across all historical milestones
  useEffect(() => {
    if (!isPlaying) {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
      return;
    }

    playTimerRef.current = setInterval(() => {
      const currentVal = yearRef.current;
      const currentIndex = ALL_MILESTONES.findIndex((y) => y >= currentVal);
      if (currentIndex === -1 || currentIndex >= ALL_MILESTONES.length - 1) {
        onYearChange(ALL_MILESTONES[0]);
      } else {
        onYearChange(ALL_MILESTONES[currentIndex + 1]);
      }
    }, 1800);

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, onYearChange]);

  const handleStepBack = () => {
    setIsPlaying(false);
    const prevMilestones = ALL_MILESTONES.filter((y) => y < year);
    if (prevMilestones.length > 0) {
      onYearChange(prevMilestones[prevMilestones.length - 1]);
    } else {
      onYearChange(ALL_MILESTONES[0]);
    }
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    const nextMilestones = ALL_MILESTONES.filter((y) => y > year);
    if (nextMilestones.length > 0) {
      onYearChange(nextMilestones[0]);
    } else {
      onYearChange(ALL_MILESTONES[ALL_MILESTONES.length - 1]);
    }
  };

  const isModern = year >= 2026;

  return (
    <div className={`w-full flex flex-col gap-1.5 select-none ${className}`}>
      {/* Top Controls Row */}
      <div className="flex items-center justify-between gap-2">
        {/* Left: Playback controls + Year & Era display */}
        <div className="flex items-center gap-2">
          {/* Play / Pause button */}
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition ${
              isPlaying
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                : "bg-sand-300 text-earth-950 hover:bg-sand-200"
            }`}
            title={isPlaying ? "Pauză" : "Redă călătoria prin istorie"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3" />
                <span className="hidden sm:inline">Pauză</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span className="hidden sm:inline">Redare</span>
              </>
            )}
          </button>

          {/* Step Back / Step Forward */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={handleStepBack}
              className="p-1 rounded bg-earth-850 hover:bg-earth-800 text-earth-300 border border-earth-750 transition"
              title="Epoca anterioară"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleStepForward}
              className="p-1 rounded bg-earth-850 hover:bg-earth-800 text-earth-300 border border-earth-750 transition"
              title="Epoca următoare"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Formatted Year Pill */}
          <span className="font-mono text-sm sm:text-base font-bold text-white px-2 py-0.5 rounded bg-earth-850 border border-earth-750">
            {formatYear(year)}
          </span>

          {/* Era Title */}
          <span className="text-xs text-sand-300 font-medium truncate max-w-[200px] sm:max-w-xs md:max-w-md hidden sm:inline">
            • {isModern ? "Lumea Contemporană (Alegeri & Granițe Moderne)" : currentEra.title}
          </span>
        </div>

        {/* Right: Quick jump to present */}
        <div className="flex items-center gap-2">
          {!isModern && (
            <button
              onClick={() => {
                setIsPlaying(false);
                onYearChange(2026);
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-earth-850 hover:bg-earth-800 text-earth-200 border border-earth-700 transition"
              title="Revino la anul curent (2026)"
            >
              <RotateCcw className="w-3 h-3 text-sand-300" />
              <span>Anul 2026 (Astăzi)</span>
            </button>
          )}
        </div>
      </div>

      {/* Sleek Timeline Slider Line */}
      <div className="relative w-full pt-1">
        <input
          type="range"
          min="-3500"
          max="2026"
          step="1"
          value={year}
          onChange={(e) => {
            setIsPlaying(false);
            onYearChange(parseInt(e.target.value, 10));
          }}
          className="w-full h-1.5 bg-earth-800 rounded-lg appearance-none cursor-pointer accent-sand-300 focus:outline-none"
        />

        {/* Milestone Marks along the Slider */}
        <div className="relative w-full flex justify-between mt-0.5 px-0.5">
          {ALL_MILESTONES.map((m) => {
            const isSelected = currentEra.year === m || (m === 2026 && isModern);
            const hasLabel = LABELED_YEARS.has(m);
            const label = m < 0 ? `${Math.abs(m)}BC` : m === 0 ? "0" : `${m}`;
            return (
              <button
                key={m}
                onClick={() => {
                  setIsPlaying(false);
                  onYearChange(m);
                }}
                className="group flex flex-col items-center"
                title={formatYear(m)}
              >
                <span
                  className={`rounded-full mb-0.5 transition-all ${
                    isSelected
                      ? "w-1.5 h-1.5 bg-sand-300 ring-2 ring-sand-300/40 scale-125"
                      : hasLabel
                      ? "w-1 h-1 bg-earth-500 group-hover:bg-earth-300"
                      : "w-0.5 h-0.5 bg-earth-700 group-hover:bg-earth-400"
                  }`}
                />
                {hasLabel && (
                  <span
                    className={`text-[8.5px] font-mono transition-colors ${
                      isSelected
                        ? "text-sand-300 font-bold"
                        : "text-earth-400 group-hover:text-earth-200"
                    }`}
                  >
                    {label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
