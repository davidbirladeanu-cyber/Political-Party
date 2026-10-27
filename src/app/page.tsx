"use client";

import React, { useState } from "react";
import EqualEarthMap from "@/components/map/EqualEarthMap";
import ElectionTypeModal from "@/components/map/ElectionTypeModal";
import HistoricalTimeline from "@/components/timeline/HistoricalTimeline";
import HistoricalDossierModal from "@/components/timeline/HistoricalDossierModal";
import { HistoricalEntity } from "@/lib/data/historical-eras";
import { Country } from "@/types";
import { Sparkles, History, Globe2, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [year, setYear] = useState<number>(2026);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedHistoricalEntity, setSelectedHistoricalEntity] =
    useState<HistoricalEntity | null>(null);

  const isHistorical = year < 2026;

  return (
    <main className="relative w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-hidden bg-earth-950 flex flex-col">
      {/* Top Floating Era Indicator */}
      <div className="absolute top-3 left-3 sm:left-6 z-20 pointer-events-auto flex items-center gap-2">
        <div
          className={`px-3 py-1.5 rounded-xl border backdrop-blur-md shadow-card flex items-center gap-2 text-xs transition-all ${
            isHistorical
              ? "bg-earth-900/90 border-sand-300/30 text-sand-200"
              : "bg-earth-900/85 border-earth-700/80 text-earth-300"
          }`}
        >
          {isHistorical ? (
            <>
              <History className="w-3.5 h-3.5 text-sand-300 animate-pulse" />
              <span>
                Cronologie Istorică: <strong className="text-white font-mono">Anul {year} d.Hr.</strong>
              </span>
              <button
                onClick={() => setYear(2026)}
                className="ml-2 px-2 py-0.5 rounded-md bg-sand-300/20 hover:bg-sand-300/30 text-sand-300 text-[10px] font-semibold transition"
              >
                Revin-o la 2026
              </button>
            </>
          ) : (
            <>
              <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                Geopolitică Contemporană: <strong className="text-white">Anul 2026</strong>
              </span>
              <span className="hidden sm:inline text-earth-400 text-[11px] ml-1">
                • Clic pe o țară pentru alegeri
              </span>
            </>
          )}
        </div>
      </div>

      {/* Main Map with Equal Earth Projection */}
      <EqualEarthMap
        minimal={true}
        year={year}
        selectedCountryCode={selectedCountry?.code}
        onSelectCountry={(country) => {
          if (year >= 2026) {
            setSelectedCountry(country);
          }
        }}
        onSelectHistoricalEntity={(entity) => {
          setSelectedHistoricalEntity(entity);
        }}
        className="w-full h-full flex-1 rounded-none border-0 shadow-none"
      />

      {/* Floating Bottom Timeline Bar */}
      <div className="absolute bottom-3 left-2 right-2 sm:left-6 sm:right-6 md:left-10 md:right-10 lg:left-16 lg:right-16 z-30 pointer-events-auto">
        <HistoricalTimeline year={year} onYearChange={setYear} />
      </div>

      {/* Modern Election Type Modal (active in 2026) */}
      {year >= 2026 && selectedCountry && (
        <ElectionTypeModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}

      {/* Historical Dossier Modal (active < 2026) */}
      {isHistorical && selectedHistoricalEntity && (
        <HistoricalDossierModal
          entity={selectedHistoricalEntity}
          year={year}
          onClose={() => setSelectedHistoricalEntity(null)}
        />
      )}
    </main>
  );
}
