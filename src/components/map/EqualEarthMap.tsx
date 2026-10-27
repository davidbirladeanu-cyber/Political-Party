"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { geoEqualEarth, geoPath, geoGraticule10 } from "d3-geo";
import * as topojson from "topojson-client";
import { Country, UpcomingElection } from "@/types";
import { COUNTRIES } from "@/lib/data/countries";
import { ELECTIONS } from "@/lib/data/elections";
import { GOVERNMENTS } from "@/lib/data/governments";
import { UPCOMING_ELECTIONS } from "@/lib/data/upcoming";
import {
  getHistoricalEntityForTerritory,
  getClosestHistoricalEra,
  HistoricalEntity,
} from "@/lib/data/historical-eras";
import { useRouter } from "next/navigation";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Vote,
  Sparkles,
} from "lucide-react";

export type MapMode =
  | "political-control"
  | "election-winner"
  | "turnout"
  | "upcoming"
  | "coverage";

interface TooltipData {
  x: number;
  y: number;
  country?: Country;
  historicalEntity?: HistoricalEntity;
  territoryName?: string;
  latestElectionWinner?: string;
  latestElectionWinnerColor?: string;
  upcomingInfo?: UpcomingElection;
}

export default function EqualEarthMap({
  selectedCountryCode,
  onSelectCountry,
  className = "",
  minimal = false,
  customHeight,
  year = 2026,
  onSelectHistoricalEntity,
}: {
  selectedCountryCode?: string;
  onSelectCountry?: (country: Country) => void;
  className?: string;
  minimal?: boolean;
  customHeight?: number;
  year?: number;
  onSelectHistoricalEntity?: (entity: HistoricalEntity) => void;
}) {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [mapMode, setMapMode] = useState<MapMode>("political-control");
  const [worldData, setWorldData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Zoom & Pan state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Tooltip & Hover
  const [hoveredCountryCode, setHoveredCountryCode] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  // Search in map
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Window/Container Dimensions
  const [dimensions, setDimensions] = useState({ width: 960, height: 500 });

  // Load TopoJSON data
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setIsLoading(true);
        const res = await fetch("/data/countries-110m.json");
        if (!res.ok) {
          throw new Error("Failed to load map data");
        }
        const json = await res.json();
        if (isMounted) {
          setWorldData(json);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Failed to load TopoJSON dataset");
          setIsLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Responsive resize observer
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height: containerHeight } = entry.contentRect;
        const calculatedHeight =
          customHeight ||
          (containerHeight > 80
            ? containerHeight
            : Math.max(280, Math.min(650, width * 0.48)));
        setDimensions({ width, height: calculatedHeight });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [minimal, customHeight]);

  // Quick lookup maps
  const countryByNumeric = useMemo(() => {
    const map = new Map<string, Country>();
    for (const c of COUNTRIES) {
      map.set(c.numericCode, c);
      map.set(String(parseInt(c.numericCode, 10)), c);
    }
    return map;
  }, []);

  const latestElectionByCountry = useMemo(() => {
    const map = new Map<string, any>();
    for (const e of ELECTIONS) {
      if (!map.has(e.countryCode)) {
        map.set(e.countryCode, e);
      }
    }
    return map;
  }, []);

  const upcomingByCountry = useMemo(() => {
    const map = new Map<string, UpcomingElection>();
    for (const u of UPCOMING_ELECTIONS) {
      if (!map.has(u.countryCode)) {
        map.set(u.countryCode, u);
      }
    }
    return map;
  }, []);

  // D3 Equal Earth Projection & GeoPath: entire globe is completely visible
  const { pathGenerator, graticulePath, spherePath, countryFeatures, landPath } = useMemo(() => {
    const { width, height } = dimensions;
    // Scale ensures the entire globe fits with comfortable margin inside the container
    const scale = Math.min(width / 5.65, height / 2.85);
    const projection = geoEqualEarth()
      .scale(scale)
      .translate([width / 2, height / 2]);

    const pathGen = geoPath().projection(projection);

    const graticule = geoGraticule10();
    const gratPath = pathGen(graticule) || "";

    const sphere = { type: "Sphere" };
    const sphPath = pathGen(sphere as any) || "";

    let features: any[] = [];
    let lPath = "";

    if (worldData && worldData.objects) {
      if (worldData.objects.countries) {
        const geoObj: any = topojson.feature(worldData, worldData.objects.countries);
        features = geoObj.features || [];
      }
      if (worldData.objects.land) {
        const landObj: any = topojson.feature(worldData, worldData.objects.land);
        lPath = pathGen(landObj) || "";
      }
    }

    return {
      pathGenerator: pathGen,
      graticulePath: gratPath,
      spherePath: sphPath,
      countryFeatures: features,
      landPath: lPath,
    };
  }, [dimensions, worldData]);

  // Historical merged empires with dissolved internal borders & territory centroids
  const historicalRenderData = useMemo(() => {
    if (!worldData || !worldData.objects || !worldData.objects.countries || year >= 2026) {
      return null;
    }

    const era = getClosestHistoricalEra(year);
    const geometries = worldData.objects.countries.geometries || [];

    const mergedEntities = era.entities
      .map((entity) => {
        const matchingGeoms = geometries.filter((g: any) => {
          const id3 = String(g.id).padStart(3, "0");
          const idNorm = String(parseInt(id3, 10));
          return (
            entity.territoryNumericCodes.includes(id3) ||
            entity.territoryNumericCodes.includes(idNorm)
          );
        });

        if (matchingGeoms.length === 0) return null;

        const merged = topojson.merge(worldData, matchingGeoms);
        const pathD = merged ? pathGenerator(merged) || "" : "";
        if (!pathD) return null;

        let centroid: [number, number] | null = null;
        try {
          const c = pathGenerator.centroid(merged);
          if (c && !isNaN(c[0]) && !isNaN(c[1])) {
            centroid = [c[0], c[1]];
          }
        } catch {
          centroid = null;
        }

        return {
          entity,
          pathD,
          centroid,
        };
      })
      .filter((e): e is { entity: HistoricalEntity; pathD: string; centroid: [number, number] | null } =>
        Boolean(e)
      );

    return {
      era,
      mergedEntities,
    };
  }, [worldData, year, pathGenerator]);

  // Color generator based on mode
  const getCountryFill = (country: Country | undefined): string => {
    if (!country) {
      return "#1E201C"; // Neutral non-catalogued territory
    }

    switch (mapMode) {
      case "political-control": {
        const gov = GOVERNMENTS.find((g) => g.countryCode === country.code && g.status === "current");
        if (!gov) {
          if (country.politicalSystem.includes("presidential")) return "#3A4550";
          if (country.politicalSystem.includes("monarchy")) return "#4E4059";
          return "#2A2C26";
        }
        if (gov.type === "Majority coalition") return "#2E6B4A"; // Forest Green
        if (gov.type === "Single-party majority") return "#9A4B3A"; // Brick Red
        if (gov.type === "Minority coalition") return "#9B7629"; // Warm Amber
        if (gov.type.includes("Caretaker")) return "#5B6470"; // Slate
        return "#374A58";
      }

      case "election-winner": {
        const el = latestElectionByCountry.get(country.code);
        if (el && el.winnerColor) {
          return el.winnerColor;
        }
        // Fallback tone for country with no election logged yet
        return country.coverageStatus === "full" ? "#3D7A5A" : "#282924";
      }

      case "turnout": {
        const turnout = country.latestTurnoutPercent;
        if (turnout === undefined || turnout === null) return "#22231F";
        if (turnout >= 80) return "#7C3AED"; // Purple (>80%)
        if (turnout >= 70) return "#2563EB"; // Blue (70-80%)
        if (turnout >= 60) return "#059669"; // Emerald (60-70%)
        if (turnout >= 50) return "#D97706"; // Amber (50-60%)
        return "#DC2626"; // Crimson (<50%)
      }

      case "upcoming": {
        const upc = upcomingByCountry.get(country.code);
        if (upc) {
          return upc.dateCertainty === "confirmed" ? "#D7C5A3" : "#C49A45"; // Soft sand accent
        }
        return "#1C1D1A";
      }

      case "coverage": {
        if (country.coverageStatus === "full") return "#3D7A5A"; // Full electoral intelligence
        if (country.coverageStatus === "partial") return "#A88338"; // Partial records
        return "#2A2B26"; // Basic catalog
      }

      default:
        return "#232520";
    }
  };

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.5, 5));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.5, 0.8));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Mouse drag handlers for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only primary button
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Search selection handler
  const handleSelectFromSearch = (country: Country) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    if (onSelectCountry) {
      onSelectCountry(country);
    } else {
      router.push(`/countries/${country.code.toLowerCase()}`);
    }
  };

  // Filtered search list
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.officialName.toLowerCase().includes(q) ||
        c.code.toLowerCase() === q
    ).slice(0, 8);
  }, [searchQuery]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-card border border-earth-700 bg-earth-900 shadow-card overflow-hidden select-none ${className}`}
    >
      {/* Top Map Toolbar */}
      {!minimal && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-earth-750 bg-earth-850 px-5 py-3.5 z-20 relative">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-300/10 border border-sand-300/20 text-sand-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Equal Earth Projection</span>
            </div>
            <span className="hidden sm:inline text-xs text-earth-400">
              True equal-area global map • D3.js GIS
            </span>
          </div>

          {/* Map Visualization Modes */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-xs text-earth-400 mr-1 hidden md:inline">Mode:</span>
            {(
              [
                { id: "political-control", label: "Political Control", icon: ShieldCheck },
                { id: "election-winner", label: "Election Winner", icon: Vote },
                { id: "turnout", label: "Turnout", icon: CheckCircle2 },
                { id: "upcoming", label: "Upcoming 2025–26", icon: Calendar },
                { id: "coverage", label: "Coverage Status", icon: Layers },
              ] as const
            ).map((mode) => {
              const Icon = mode.icon;
              const active = mapMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setMapMode(mode.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? "bg-sand-300 text-earth-950 shadow-subtle font-semibold"
                      : "bg-earth-800 text-earth-300 hover:bg-earth-750 hover:text-earth-50 border border-earth-700/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SVG Canvas Area */}
      <div
        className="relative w-full cursor-grab active:cursor-grabbing overflow-hidden"
        style={{ height: `${dimensions.height}px` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-earth-900/90 z-10">
            <div className="w-8 h-8 rounded-full border-2 border-sand-300 border-t-transparent animate-spin mb-3"></div>
            <p className="text-sm text-sand-300">Rendering Equal Earth Geographies...</p>
            <p className="text-xs text-earth-400 mt-1">TopoJSON 110m standard boundary vectors</p>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-earth-900 z-10 px-6 text-center">
            <p className="text-sm text-rose-400 font-medium">Map projection failed: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-1.5 rounded-lg bg-earth-800 hover:bg-earth-750 text-xs text-earth-200 border border-earth-700"
            >
              Retry
            </button>
          </div>
        )}

        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full block"
        >
          {/* Background Ocean Fill */}
          <rect
            width={dimensions.width}
            height={dimensions.height}
            fill="#10110F"
          />

          {/* Scalable Container for Pan and Zoom */}
          <g
            transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoomLevel})`}
            style={{ transformOrigin: "center center", transition: isDragging ? "none" : "transform 0.15s ease-out" }}
          >
            {/* Sphere Ocean Boundary */}
            {spherePath && (
              <path
                d={spherePath}
                fill="#0D0E0C"
                stroke="#2A2D26"
                strokeWidth="0.8"
              />
            )}

            {/* Graticules Lines */}
            <path
              d={graticulePath}
              fill="none"
              stroke="#1C1E19"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />

            {/* Natural Continental Landmass Base (worldhist.org style - clean continents with zero phantom modern borders) */}
            {landPath && (
              <path
                d={landPath}
                fill="#161714"
                stroke="#252720"
                strokeWidth="0.7"
                className="outline-none"
              />
            )}

            {/* HISTORICAL ERA (< 2026): Merged Empires (real shifting empire borders) */}
            {year < 2026 && historicalRenderData ? (
              <g className="historical-empires-layer">
                {historicalRenderData.mergedEntities.map(({ entity, pathD, centroid }: any) => {
                  const isHovered = hoveredCountryCode === entity.id;
                  const labelText = entity.shortName || entity.name.split("(")[0].trim();
                  return (
                    <g key={entity.id} className="group">
                      <path
                        d={pathD}
                        fill={entity.color}
                        fillOpacity={0.82}
                        stroke={isHovered ? "#FFFFFF" : entity.borderColor || "#D7C5A3"}
                        strokeWidth={isHovered ? 2.0 : 1.15}
                        strokeOpacity={1}
                        className="transition-colors duration-150 cursor-pointer outline-none hover:brightness-110"
                        onMouseEnter={(e) => {
                          setHoveredCountryCode(entity.id);
                          const rect = containerRef.current?.getBoundingClientRect();
                          const x = rect ? e.clientX - rect.left : e.clientX;
                          const y = rect ? e.clientY - rect.top : e.clientY;
                          setTooltip({
                            x,
                            y,
                            historicalEntity: entity,
                          });
                        }}
                        onMouseMove={(e) => {
                          if (!tooltip) return;
                          const rect = containerRef.current?.getBoundingClientRect();
                          const x = rect ? e.clientX - rect.left : e.clientX;
                          const y = rect ? e.clientY - rect.top : e.clientY;
                          setTooltip((prev) => (prev ? { ...prev, x, y } : null));
                        }}
                        onMouseLeave={() => {
                          setHoveredCountryCode(null);
                          setTooltip(null);
                        }}
                        onClick={() => {
                          if (onSelectHistoricalEntity) {
                            onSelectHistoricalEntity(entity);
                          }
                        }}
                      />
                      {/* Empire Territory Label centered on the land (worldhist style) */}
                      {centroid && (
                        <text
                          x={centroid[0]}
                          y={centroid[1]}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#FDF8ED"
                          stroke="#0C0D0B"
                          strokeWidth="3.2px"
                          paintOrder="stroke fill"
                          fontSize="9.5px"
                          fontWeight="700"
                          letterSpacing="0.04em"
                          className="pointer-events-none select-none"
                        >
                          {labelText}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            ) : (
              /* MODERN ERA (>= 2026): Modern Sovereign Countries with electoral modes */
              countryFeatures.map((feature: any, idx: number) => {
                const numId = String(feature.id).padStart(3, "0");
                const country = countryByNumeric.get(numId);
                const isHovered = hoveredCountryCode === String(feature.id);
                const isSelected = country && selectedCountryCode === country.code;
                const fill = getCountryFill(country);
                const pathD = pathGenerator(feature) || "";

                return (
                  <path
                    key={feature.id || idx}
                    d={pathD}
                    fill={fill}
                    stroke={
                      isSelected
                        ? "#D7C5A3"
                        : isHovered
                        ? "#F2EFE6"
                        : "#3A3C34"
                    }
                    strokeWidth={isSelected ? 1.6 : isHovered ? 1.2 : 0.65}
                    className="transition-colors duration-150 cursor-pointer outline-none"
                    onMouseEnter={(e) => {
                      setHoveredCountryCode(String(feature.id));
                      const rect = containerRef.current?.getBoundingClientRect();
                      const x = rect ? e.clientX - rect.left : e.clientX;
                      const y = rect ? e.clientY - rect.top : e.clientY;

                      const latestEl = country ? latestElectionByCountry.get(country.code) : undefined;
                      const upc = country ? upcomingByCountry.get(country.code) : undefined;

                      setTooltip({
                        x,
                        y,
                        country,
                        territoryName: feature.properties?.name,
                        latestElectionWinner: latestEl?.winningPartyOrCandidate,
                        latestElectionWinnerColor: latestEl?.winnerColor,
                        upcomingInfo: upc,
                      });
                    }}
                    onMouseMove={(e) => {
                      if (!tooltip) return;
                      const rect = containerRef.current?.getBoundingClientRect();
                      const x = rect ? e.clientX - rect.left : e.clientX;
                      const y = rect ? e.clientY - rect.top : e.clientY;
                      setTooltip((prev) => (prev ? { ...prev, x, y } : null));
                    }}
                    onMouseLeave={() => {
                      setHoveredCountryCode(null);
                      setTooltip(null);
                    }}
                    onClick={() => {
                      if (country) {
                        if (onSelectCountry) {
                          onSelectCountry(country);
                        } else {
                          router.push(`/countries/${country.code.toLowerCase()}`);
                        }
                      }
                    }}
                  />
                );
              })
            )}
          </g>
        </svg>

        {/* Map Control Floating Buttons */}
        <div className="absolute bottom-5 right-5 flex flex-col gap-1.5 z-20">
          <button
            onClick={handleZoomIn}
            title="Zoom in"
            className="w-8 h-8 rounded-lg bg-earth-800/90 hover:bg-earth-700 text-earth-100 border border-earth-700/80 shadow-subtle flex items-center justify-center transition"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom out"
            className="w-8 h-8 rounded-lg bg-earth-800/90 hover:bg-earth-700 text-earth-100 border border-earth-700/80 shadow-subtle flex items-center justify-center transition"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            title="Reset world view"
            className="w-8 h-8 rounded-lg bg-earth-800/90 hover:bg-earth-700 text-earth-100 border border-earth-700/80 shadow-subtle flex items-center justify-center transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search on Map Floating Widget (hidden in minimal mode) */}
        {!minimal && (
          <div className="absolute top-4 left-4 z-20">
            <div className="relative">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-earth-850/95 border border-earth-700/80 shadow-card backdrop-blur-md">
                <Search className="w-3.5 h-3.5 text-earth-400" />
                <input
                  type="text"
                  placeholder="Find any country..."
                  value={searchQuery}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  className="bg-transparent text-xs text-earth-50 placeholder-earth-400 focus:outline-none w-36 sm:w-44"
                />
              </div>

              {/* Quick search dropdown */}
              {isSearchOpen && filteredCountries.length > 0 && (
                <div className="absolute top-full left-0 mt-1.5 w-60 rounded-xl bg-earth-850 border border-earth-700 shadow-card py-1.5 z-30">
                  {filteredCountries.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => handleSelectFromSearch(c)}
                      className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-earth-750 transition"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{c.flag}</span>
                        <div>
                          <p className="text-xs font-medium text-earth-100">{c.name}</p>
                          <p className="text-[10px] text-earth-400">{c.politicalSystem}</p>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-earth-800 text-sand-300">
                        {c.code}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hover Tooltip */}
        {tooltip && (
          <div
            className={`pointer-events-none absolute z-30 rounded-xl bg-earth-850/95 border border-earth-700 shadow-card backdrop-blur-md transition-all duration-75 ${
              minimal ? "px-3 py-1.5" : "px-4 py-3 max-w-xs"
            }`}
            style={{
              left: `${Math.min(dimensions.width - (minimal ? 200 : 260), Math.max(16, tooltip.x + 14))}px`,
              top: `${Math.min(dimensions.height - (minimal ? 70 : 160), Math.max(16, tooltip.y - 30))}px`,
            }}
          >
            {/* Historical Mode Tooltip (< 2026) */}
            {year < 2026 ? (
              tooltip.historicalEntity ? (
                minimal ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{tooltip.historicalEntity.emblem}</span>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {tooltip.historicalEntity.name}
                      </span>
                      {tooltip.territoryName && (
                        <span className="text-[10px] text-earth-300 block">
                          Zona {tooltip.territoryName} • {tooltip.historicalEntity.ruler}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-2xl">{tooltip.historicalEntity.emblem}</span>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">
                          {tooltip.historicalEntity.name}
                        </h4>
                        <p className="text-[11px] text-sand-300">
                          {tooltip.territoryName ? `Zona ${tooltip.territoryName}` : tooltip.historicalEntity.capital}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs border-t border-earth-750 pt-2 mt-2">
                      <div className="flex items-center justify-between text-earth-300">
                        <span>Lider / Suveran:</span>
                        <span className="font-semibold text-earth-100 text-right truncate max-w-[140px]">
                          {tooltip.historicalEntity.ruler}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-earth-300">
                        <span>Capitală istorică:</span>
                        <span className="font-medium text-sand-300">
                          {tooltip.historicalEntity.capital}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2.5 pt-1.5 border-t border-earth-750 flex items-center justify-between text-[11px] text-sand-300 font-medium">
                      <span>Clic pentru fișa istorică</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </>
                )
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-lg">🗺️</span>
                  <div>
                    <span className="text-xs font-semibold text-earth-200 block">
                      {tooltip.territoryName || "Teritoriu"}
                    </span>
                    <span className="text-[10px] text-earth-400 block">
                      Comunități autohtone / Tribale în anul {year}
                    </span>
                  </div>
                </div>
              )
            ) : /* Modern Mode Tooltip (>= 2026) */
            tooltip.country ? (
              minimal ? (
                <div className="flex items-center gap-2">
                  <span className="text-xl">{tooltip.country.flag}</span>
                  <span className="text-sm font-semibold text-earth-50">
                    {tooltip.country.name}
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl">{tooltip.country.flag}</span>
                    <div>
                      <h4 className="text-sm font-semibold text-earth-50 leading-tight">
                        {tooltip.country.name}
                      </h4>
                      <p className="text-[11px] text-earth-400">
                        {tooltip.country.politicalSystem}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs border-t border-earth-750 pt-2 mt-2">
                    <div className="flex items-center justify-between text-earth-300">
                      <span>Head of Gov:</span>
                      <span className="font-medium text-earth-100 text-right truncate max-w-[140px]">
                        {tooltip.country.headOfGovernment}
                      </span>
                    </div>

                    {tooltip.country.latestTurnoutPercent && (
                      <div className="flex items-center justify-between text-earth-300">
                        <span>Last Turnout:</span>
                        <span className="font-mono font-medium text-sand-300">
                          {tooltip.country.latestTurnoutPercent}%
                        </span>
                      </div>
                    )}

                    {tooltip.latestElectionWinner && (
                      <div className="flex items-center justify-between text-earth-300">
                        <span>Recent Winner:</span>
                        <span
                          className="font-medium truncate max-w-[140px]"
                          style={{ color: tooltip.latestElectionWinnerColor || "#D7C5A3" }}
                        >
                          {tooltip.latestElectionWinner}
                        </span>
                      </div>
                    )}

                    {tooltip.upcomingInfo && (
                      <div className="flex items-center justify-between text-sand-400 bg-sand-300/10 px-1.5 py-0.5 rounded text-[11px]">
                        <span>Next Election:</span>
                        <span className="font-medium">{tooltip.upcomingInfo.scheduledDate}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-2.5 pt-1.5 border-t border-earth-750 flex items-center justify-between text-[11px] text-sand-300 font-medium">
                    <span>Fă clic pentru a alege tipul de alegeri</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </>
              )
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-lg">🌐</span>
                <div>
                  <span className="text-xs font-semibold text-earth-200 block">
                    {tooltip.territoryName || "Stat Suveran"}
                  </span>
                  <span className="text-[10px] text-earth-400 block">
                    Teritoriu suveran în anul 2026
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dynamic Map Legend Footer (hidden in minimal mode) */}
      {!minimal && (
        <div className="border-t border-earth-750 bg-earth-850/80 px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-earth-300">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-earth-200">Legend:</span>
            {mapMode === "political-control" && (
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2E6B4A]"></span>
                  <span>Majority Coalition</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9A4B3A]"></span>
                  <span>Single-Party Majority</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9B7629]"></span>
                  <span>Minority Coalition</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3A4550]"></span>
                  <span>Presidential / Other</span>
                </span>
              </div>
            )}

            {mapMode === "election-winner" && (
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]"></span>
                  <span>Social Dem / Left</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                  <span>Conservative / Right</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                  <span>Liberal / Center</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]"></span>
                  <span>Populist / Sovereignist</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
                  <span>Regional / Green</span>
                </span>
              </div>
            )}

            {mapMode === "turnout" && (
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]"></span>
                  <span>&gt;80%</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                  <span>70–80%</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#059669]"></span>
                  <span>60–70%</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]"></span>
                  <span>50–60%</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]"></span>
                  <span>&lt;50%</span>
                </span>
              </div>
            )}

            {mapMode === "upcoming" && (
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D7C5A3]"></span>
                  <span>Confirmed Date</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C49A45]"></span>
                  <span>Tentative / Constitutional Deadline</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1C1D1A]"></span>
                  <span>No Upcoming Vote Scheduled</span>
                </span>
              </div>
            )}

            {mapMode === "coverage" && (
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3D7A5A]"></span>
                  <span>Full Intelligence (Deep Regional & Rounds)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A88338]"></span>
                  <span>Partial Verified Results</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2A2B26]"></span>
                  <span>Baseline Directory Profile</span>
                </span>
              </div>
            )}
          </div>

          <div className="text-[11px] text-earth-400">
            Source: Natural Earth / Šavrič et al. (Equal Earth projection)
          </div>
        </div>
      )}
    </div>
  );
}
