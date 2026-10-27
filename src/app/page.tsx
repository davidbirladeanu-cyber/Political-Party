"use client";

import React, { useState } from "react";
import EqualEarthMap from "@/components/map/EqualEarthMap";
import ElectionTypeModal from "@/components/map/ElectionTypeModal";
import HistoricalTimeline from "@/components/timeline/HistoricalTimeline";
import HistoricalDossierModal from "@/components/timeline/HistoricalDossierModal";
import { HistoricalEntity } from "@/lib/data/historical-eras";
import { Country } from "@/types";

export default function HomePage() {
  const [year, setYear] = useState<number>(2026);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedHistoricalEntity, setSelectedHistoricalEntity] =
    useState<HistoricalEntity | null>(null);

  const isHistorical = year < 2026;

  return (
    <main className="w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] bg-[#0C0D0B] flex flex-col overflow-hidden">
      {/* Map Area: fits entire globe comfortably without any overlay obstructions */}
      <div className="flex-1 w-full min-h-0 relative flex items-center justify-center p-1 sm:p-2">
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
          className="w-full h-full flex-1 rounded-none border-0 shadow-none bg-transparent"
        />
      </div>

      {/* Docked Minimalist Timeline underneath the map */}
      <div className="w-full shrink-0 border-t border-earth-800/80 bg-[#11120F]/95 py-2 px-3 sm:px-6 z-20">
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
