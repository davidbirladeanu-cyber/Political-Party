"use client";

import React, { useEffect } from "react";
import { HistoricalEntity } from "@/lib/data/historical-eras";
import { X, Calendar, Crown, Landmark, MapPin, Globe, Sparkles, BookOpen } from "lucide-react";

interface HistoricalDossierModalProps {
  entity: HistoricalEntity | null;
  year: number;
  onClose: () => void;
}

export default function HistoricalDossierModal({
  entity,
  year,
  onClose,
}: HistoricalDossierModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!entity) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-earth-950/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-earth-900 border border-earth-700 shadow-2xl p-6 text-earth-100 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-earth-750 pb-4">
          <div className="flex items-center gap-3.5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/10"
              style={{ backgroundColor: `${entity.color}33`, borderColor: entity.borderColor || entity.color }}
            >
              <span>{entity.emblem}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase"
                  style={{ backgroundColor: `${entity.color}40`, color: entity.borderColor || "#D7C5A3" }}
                >
                  Fișă Istorică • Anul {year} d.Hr.
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                {entity.name}
              </h2>
              <p className="text-xs text-earth-400 italic">{entity.englishName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-earth-400 hover:text-white hover:bg-earth-800 transition"
            aria-label="Închide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-earth-850 border border-earth-750/70 flex items-start gap-2.5">
            <Crown className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-earth-400 block text-[11px]">Conducător ({entity.rulerTitle})</span>
              <span className="font-semibold text-earth-50 text-sm">{entity.ruler}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-earth-850 border border-earth-750/70 flex items-start gap-2.5">
            <Landmark className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-earth-400 block text-[11px]">Capitală & Centru de Putere</span>
              <span className="font-semibold text-earth-50 text-sm">{entity.capital}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-earth-850 border border-earth-750/70 flex items-start gap-2.5 sm:col-span-2">
            <Globe className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-earth-400 block text-[11px]">Formă de Guvernământ & Regim</span>
              <span className="font-semibold text-earth-50 text-sm">{entity.governmentType}</span>
            </div>
          </div>
        </div>

        {/* Historical Summary */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-sand-300">
            <BookOpen className="w-4 h-4" />
            <span>Context Geopolitic & Semnificație Istorică</span>
          </div>
          <p className="text-sm text-earth-200 leading-relaxed bg-earth-850/60 p-3.5 rounded-xl border border-earth-750/50">
            {entity.summary}
          </p>
        </div>

        {/* Key Events */}
        {entity.keyEvents && entity.keyEvents.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-earth-300 block">Repere Cronologice Cheie:</span>
            <ul className="space-y-1.5 text-xs text-earth-300">
              {entity.keyEvents.map((evt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sand-300 mt-1.5 shrink-0" />
                  <span>{evt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Modern Countries Covered */}
        {entity.modernCountriesIncluded && entity.modernCountriesIncluded.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-earth-750">
            <div className="flex items-center justify-between text-xs text-earth-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sand-300" />
                <span>State moderne cuprinse istoric în acest teritoriu:</span>
              </span>
              <span className="font-mono text-[11px] text-sand-300">
                {entity.modernCountriesIncluded.length} state
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1">
              {entity.modernCountriesIncluded.map((c, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-earth-800 text-earth-200 text-[11px] border border-earth-700"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-earth-750 flex items-center justify-between text-xs">
          <span className="text-earth-400">Harta Istorică Equal Earth</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-sand-300 hover:bg-sand-200 text-earth-950 font-semibold transition"
          >
            Continuă Explorarea
          </button>
        </div>
      </div>
    </div>
  );
}
