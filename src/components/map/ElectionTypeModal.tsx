"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Country } from "@/types";
import { getElectionsByCountry } from "@/lib/data/store";
import { X, ArrowLeft } from "lucide-react";

interface ElectionTypeModalProps {
  country: Country | null;
  onClose: () => void;
}

type ElectionCategory = "presidential" | "parliamentary" | "local" | "european_parliament";

interface YearOption {
  year: string;
  badge?: string;
  action: () => void;
}

export default function ElectionTypeModal({
  country,
  onClose,
}: ElectionTypeModalProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<ElectionCategory | null>(null);

  // Reset selected category when country changes or closes
  useEffect(() => {
    setSelectedCategory(null);
  }, [country]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Elections logged in database for this country
  const countryElections = useMemo(() => {
    if (!country) return [];
    return getElectionsByCountry(country.code);
  }, [country]);

  // Available election categories for step 1
  const categories = useMemo(() => {
    if (!country) return [];

    const isRomania = country.code === "RO";
    const isEUMember = [
      "RO", "FR", "DE", "IT", "ES", "PL", "NL", "BE", "SE", "AT", "GR", "PT", "CZ", "BG", "FI", "DK", "IE", "HU"
    ].includes(country.code);

    const cats: { key: ElectionCategory; label: string }[] = [];

    if (isRomania) {
      cats.push({ key: "presidential", label: "Prezidențiale" });
      cats.push({ key: "parliamentary", label: "Parlamentare" });
      cats.push({ key: "local", label: "Locale" });
      cats.push({ key: "european_parliament", label: "Europarlamentare" });
      return cats;
    }

    const hasPres =
      countryElections.some((e) => e.electionType === "presidential") ||
      country.politicalSystem.toLowerCase().includes("presidential") ||
      country.headOfStateTitle.toLowerCase().includes("president");

    const hasParl =
      countryElections.some((e) => e.electionType === "parliamentary") ||
      !country.politicalSystem.toLowerCase().includes("absolute monarchy");

    if (hasPres) cats.push({ key: "presidential", label: "Prezidențiale" });
    if (hasParl) cats.push({ key: "parliamentary", label: "Parlamentare" });
    if (isEUMember) cats.push({ key: "european_parliament", label: "Europarlamentare" });

    return cats;
  }, [country, countryElections]);

  // Available years for step 2 (once a category is clicked)
  const yearOptions = useMemo((): YearOption[] => {
    if (!country || !selectedCategory) return [];

    const isRomania = country.code === "RO";

    // ROMANIA SPECIFIC YEARS
    if (isRomania) {
      if (selectedCategory === "presidential") {
        return [
          {
            year: "2025",
            badge: "Reluare",
            action: () => {
              onClose();
              router.push("/elections/ro-pres-2025");
            },
          },
          {
            year: "2024",
            action: () => {
              onClose();
              router.push("/elections/ro-pres-2024");
            },
          },
          {
            year: "2019",
            action: () => {
              onClose();
              router.push("/countries/ro?tab=elections&type=presidential&year=2019");
            },
          },
          {
            year: "2014",
            action: () => {
              onClose();
              router.push("/countries/ro?tab=elections&type=presidential&year=2014");
            },
          },
        ];
      }

      if (selectedCategory === "parliamentary") {
        return [
          {
            year: "2024",
            action: () => {
              onClose();
              router.push("/elections/ro-parl-2024");
            },
          },
          {
            year: "2020",
            action: () => {
              onClose();
              router.push("/elections/ro-parl-2020");
            },
          },
          {
            year: "2016",
            action: () => {
              onClose();
              router.push("/countries/ro?tab=elections&type=parliamentary&year=2016");
            },
          },
        ];
      }

      if (selectedCategory === "local") {
        return [
          {
            year: "2024",
            action: () => {
              onClose();
              router.push("/countries/ro?tab=regions&year=2024");
            },
          },
          {
            year: "2020",
            action: () => {
              onClose();
              router.push("/countries/ro?tab=regions&year=2020");
            },
          },
        ];
      }

      if (selectedCategory === "european_parliament") {
        return [
          {
            year: "2024",
            action: () => {
              onClose();
              router.push("/elections/ro-ep-2024");
            },
          },
          {
            year: "2019",
            action: () => {
              onClose();
              router.push("/countries/ro?tab=elections&type=european_parliament&year=2019");
            },
          },
        ];
      }
    }

    // OTHER COUNTRIES: dynamic matching with ELECTIONS database
    const matchingElections = countryElections.filter(
      (e) => e.electionType === selectedCategory
    );

    const years: YearOption[] = [];

    for (const el of matchingElections) {
      const yr = el.date.split("-")[0];
      years.push({
        year: yr,
        action: () => {
          onClose();
          router.push(`/elections/${el.id}`);
        },
      });
    }

    // Add fallback historical years if only one exists
    if (years.length === 1) {
      const baseYear = parseInt(years[0].year, 10);
      const prevYear = String(baseYear - 4);
      years.push({
        year: prevYear,
        action: () => {
          onClose();
          router.push(`/countries/${country.code.toLowerCase()}?tab=elections&year=${prevYear}`);
        },
      });
    } else if (years.length === 0) {
      years.push(
        {
          year: "2024",
          action: () => {
            onClose();
            router.push(`/countries/${country.code.toLowerCase()}?tab=elections&year=2024`);
          },
        },
        {
          year: "2020",
          action: () => {
            onClose();
            router.push(`/countries/${country.code.toLowerCase()}?tab=elections&year=2020`);
          },
        }
      );
    }

    return years;
  }, [country, selectedCategory, countryElections, onClose, router]);

  if (!country) return null;

  const categoryTitle =
    selectedCategory === "presidential"
      ? "Prezidențiale"
      : selectedCategory === "parliamentary"
      ? "Parlamentare"
      : selectedCategory === "local"
      ? "Locale"
      : selectedCategory === "european_parliament"
      ? "Europarlamentare"
      : "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-950/40 backdrop-blur-xs animate-in fade-in duration-100"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[280px] sm:max-w-xs rounded-2xl border border-earth-700 bg-earth-900/95 p-4 shadow-2xl backdrop-blur-md animate-in zoom-in-95 duration-100 space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* STEP 1: Alege tipul de alegeri */}
        {!selectedCategory ? (
          <>
            <div className="flex items-center justify-between border-b border-earth-800 pb-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-2xl select-none">{country.flag}</span>
                <h3 className="text-base font-bold text-earth-50 truncate">
                  {country.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-earth-400 hover:text-earth-100 hover:bg-earth-800 transition"
                aria-label="Închide"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className="w-full py-2.5 px-4 rounded-xl bg-earth-850 hover:bg-sand-300 hover:text-earth-950 text-earth-100 text-sm font-medium transition text-center border border-earth-750/60 hover:border-sand-300 shadow-subtle active:scale-[0.98]"
                >
                  {cat.label}
                </button>
              ))}

              <button
                onClick={() => {
                  onClose();
                  router.push(`/countries/${country.code.toLowerCase()}`);
                }}
                className="w-full py-1.5 text-center text-xs text-earth-400 hover:text-sand-300 transition pt-1"
              >
                Profil Țară
              </button>
            </div>
          </>
        ) : (
          /* STEP 2: Alege anul (dupa ce apesi pe parlament spre exemplu) */
          <>
            <div className="flex items-center justify-between border-b border-earth-800 pb-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="p-1 -ml-1 rounded-lg text-sand-300 hover:text-sand-200 hover:bg-earth-800 transition flex items-center gap-1"
                  title="Înapoi"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h3 className="text-sm font-bold text-earth-50 truncate">
                  {country.flag} {categoryTitle}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-earth-400 hover:text-earth-100 hover:bg-earth-800 transition"
                aria-label="Închide"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 pt-1">
              <p className="text-xs text-earth-400 font-medium px-0.5">
                Alege anul:
              </p>

              <div className="grid grid-cols-2 gap-2">
                {yearOptions.map((opt) => (
                  <button
                    key={opt.year}
                    onClick={opt.action}
                    className="py-2.5 px-3 rounded-xl bg-earth-850 hover:bg-sand-300 hover:text-earth-950 text-earth-100 text-sm font-semibold transition text-center border border-earth-750/60 hover:border-sand-300 shadow-subtle active:scale-[0.98] flex items-center justify-center gap-1.5"
                  >
                    <span>{opt.year}</span>
                    {opt.badge && (
                      <span className="text-[10px] font-normal px-1 py-0.2 rounded bg-sand-300/20 text-sand-300 group-hover:bg-earth-950 group-hover:text-sand-300">
                        {opt.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
