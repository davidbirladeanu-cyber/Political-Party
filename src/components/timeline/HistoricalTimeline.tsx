"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  HISTORICAL_ERAS,
  getClosestHistoricalEra,
  HistoricalEra,
} from "@/lib/data/historical-eras";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Layers,
  Calendar,
} from "lucide-react";

interface HistoricalTimelineProps {
  year: number;
  onYearChange: (year: number) => void;
  className?: string;
}

const ERA_YEARS = [0, 500, 1000, 1500, 1800, 1914, 1945, 1991, 2026];

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

  // Play animation loop across milestones
  useEffect(() => {
    if (!isPlaying) {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
      return;
    }

    playTimerRef.current = setInterval(() => {
      const currentVal = yearRef.current;
      const currentIndex = ERA_YEARS.findIndex((y) => y >= currentVal);
      if (currentIndex === -1 || currentIndex >= ERA_YEARS.length - 1) {
        onYearChange(ERA_YEARS[0]);
      } else {
        onYearChange(ERA_YEARS[currentIndex + 1]);
      }
    }, 2800);

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, onYearChange]);

  const handleStepBack = () => {
    setIsPlaying(false);
    const prevEras = ERA_YEARS.filter((y) => y < year);
    if (prevEras.length > 0) {
      onYearChange(prevEras[prevEras.length - 1]);
    } else {
      onYearChange(ERA_YEARS[0]);
    }
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    const nextEras = ERA_YEARS.filter((y) => y > year);
    if (nextEras.length > 0) {
      onYearChange(nextEras[0]);
    } else {
      onYearChange(ERA_YEARS[ERA_YEARS.length - 1]);
    }
  };

  const isModern = year >= 2026;

  return (
    <div
      className={`w-full rounded-2xl bg-earth-900/95 border border-earth-700/80 shadow-2xl backdrop-blur-xl p-4 sm:p-5 select-none transition-all ${className}`}
    >
      {/* Header Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Year Display Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-earth-800 border border-earth-700/80 shadow-inner">
            <Clock className="w-4 h-4 text-sand-300" />
            <span className="font-mono text-base sm:text-lg font-bold text-white tracking-wide">
              {year === 0 ? "Anul 0 d.Hr." : `Anul ${year} d.Hr.`}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase ${
                  isModern
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-sand-300/15 text-sand-300 border border-sand-300/30"
                }`}
              >
                {isModern ? "Geopolitică Contemporană" : currentEra.period}
              </span>
              <span className="text-xs font-semibold text-earth-100 hidden sm:inline">
                {currentEra.title}
              </span>
            </div>
            <p className="text-[11px] text-earth-400 mt-0.5 line-clamp-1 max-w-md hidden md:block">
              {currentEra.description}
            </p>
          </div>
        </div>

        {/* Play & Navigation Controls */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              isPlaying
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30"
                : "bg-sand-300 text-earth-950 hover:bg-sand-200 shadow-md font-bold"
            }`}
            title={isPlaying ? "Oprește derularea automată" : "Pornește călătoria prin istorie"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pauză</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Redare Istorică</span>
              </>
            )}
          </button>

          <button
            onClick={handleStepBack}
            className="p-1.5 rounded-lg bg-earth-800 hover:bg-earth-750 text-earth-200 border border-earth-700 transition"
            title="Epoca precedentă"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleStepForward}
            className="p-1.5 rounded-lg bg-earth-800 hover:bg-earth-750 text-earth-200 border border-earth-700 transition"
            title="Epoca următoare"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              onYearChange(2026);
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition ${
              isModern
                ? "bg-earth-800 text-sand-300 border-sand-300/40"
                : "bg-earth-800/60 text-earth-300 border-earth-700 hover:text-earth-100"
            }`}
            title="Sari direct la anul curent (2026)"
          >
            Anul 2026 (Astăzi)
          </button>
        </div>
      </div>

      {/* Main Timeline Slider */}
      <div className="relative py-2">
        <input
          type="range"
          min="0"
          max="2026"
          step="1"
          value={year}
          onChange={(e) => {
            setIsPlaying(false);
            onYearChange(parseInt(e.target.value, 10));
          }}
          className="w-full h-2.5 bg-earth-800 rounded-lg appearance-none cursor-pointer accent-sand-300 focus:outline-none"
        />

        {/* Milestone Marks along the Slider */}
        <div className="relative w-full flex justify-between mt-1 px-1">
          {ERA_YEARS.map((y) => {
            const active = currentEra.year === y || (y === 2026 && isModern);
            const percentage = (y / 2026) * 100;
            return (
              <button
                key={y}
                onClick={() => {
                  setIsPlaying(false);
                  onYearChange(y);
                }}
                className="group flex flex-col items-center transition"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mb-1 transition-all ${
                    active
                      ? "bg-sand-300 ring-4 ring-sand-300/20 scale-125"
                      : "bg-earth-600 group-hover:bg-earth-400"
                  }`}
                />
                <span
                  className={`text-[10px] font-mono transition-colors ${
                    active
                      ? "text-sand-300 font-bold"
                      : "text-earth-400 group-hover:text-earth-200"
                  }`}
                >
                  {y}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Jump Era Buttons (scrollable row) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pt-2.5 border-t border-earth-800/80 scrollbar-none">
        <span className="text-[11px] text-earth-400 font-medium mr-1 shrink-0">
          Epoci Cheie:
        </span>
        {HISTORICAL_ERAS.map((era) => {
          const isSelected = currentEra.year === era.year && (!isModern || era.year === 2026);
          return (
            <button
              key={era.year}
              onClick={() => {
                setIsPlaying(false);
                onYearChange(era.year);
              }}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                isSelected
                  ? "bg-sand-300 text-earth-950 font-bold shadow-sm"
                  : "bg-earth-850/80 hover:bg-earth-750 text-earth-300 hover:text-earth-100 border border-earth-750/70"
              }`}
            >
              <span>{era.label}</span>
              <span className="opacity-70 ml-1 font-normal">
                • {era.year === 2026 ? "Prezent" : era.title.split("&")[0].trim()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
