"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { searchGlobal, SearchResultItem } from "@/lib/data/store";
import {
  Search,
  X,
  Globe,
  Vote,
  Users,
  Shield,
  User,
  ArrowRight,
  Command,
} from "lucide-react";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({
  isOpen,
  onClose,
}: GlobalSearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via custom event or parent prop
          const btn = document.getElementById("global-search-trigger");
          btn?.click();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Live search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }
    const res = searchGlobal(query);
    setResults(res);
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation through results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  const handleSelect = (item: SearchResultItem) => {
    onClose();
    router.push(item.url);
  };

  if (!isOpen) return null;

  const getIcon = (type: SearchResultItem["type"]) => {
    switch (type) {
      case "country":
        return <Globe className="w-4 h-4 text-sand-300" />;
      case "election":
        return <Vote className="w-4 h-4 text-rose-400" />;
      case "party":
        return <Users className="w-4 h-4 text-sky-400" />;
      case "government":
        return <Shield className="w-4 h-4 text-emerald-400" />;
      case "candidate":
        return <User className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-earth-950/80 backdrop-blur-md">
      <div
        className="w-full max-w-2xl rounded-2xl border border-earth-700 bg-earth-850 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-earth-750">
          <Search className="w-5 h-5 text-earth-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search countries, elections, parties, candidates, governments..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-sm text-earth-50 placeholder-earth-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="text-earth-400 hover:text-earth-200 transition"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-earth-800 text-[10px] text-earth-400 border border-earth-700 font-mono">
              ESC to exit
            </kbd>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {query.trim() === "" ? (
            <div className="p-6 text-center text-xs text-earth-400">
              <p className="font-medium text-earth-200 mb-1">
                Explore Global Elections Intelligence
              </p>
              <p>Type "Romania", "Presidential", "PSD", "Trump", "Macron", or "Scholz"</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center text-xs text-earth-400">
              No verified records found for &ldquo;<span className="text-earth-200">{query}</span>&rdquo;.
            </div>
          ) : (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition ${
                    isSelected
                      ? "bg-earth-800 border border-sand-300/30 text-earth-50"
                      : "hover:bg-earth-800/60 text-earth-200 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-earth-900 border border-earth-750 flex items-center justify-center flex-shrink-0">
                      {item.flag ? (
                        <span className="text-base">{item.flag}</span>
                      ) : (
                        getIcon(item.type)
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate text-earth-100">
                        {item.title}
                      </p>
                      <p className="text-xs text-earth-400 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium uppercase font-mono bg-earth-900 text-sand-300 border border-earth-750">
                      {item.tag}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-earth-400" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="border-t border-earth-750 bg-earth-900/60 px-4 py-2.5 flex items-center justify-between text-[11px] text-earth-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-earth-800 px-1 py-0.5 rounded border border-earth-700 text-earth-300">
                ↑↓
              </kbd>{" "}
              Navigate
            </span>
            <span>
              <kbd className="font-mono bg-earth-800 px-1 py-0.5 rounded border border-earth-700 text-earth-300">
                ↵
              </kbd>{" "}
              Open
            </span>
          </div>
          <span>Equal Earth Global Registry</span>
        </div>
      </div>
    </div>
  );
}
