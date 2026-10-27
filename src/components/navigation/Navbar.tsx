"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe,
  Vote,
  Users,
  Shield,
  Calendar,
  Layers,
  Search,
  Menu,
  X,
  Compass,
  FileSpreadsheet,
} from "lucide-react";
import GlobalSearchModal from "@/components/search/GlobalSearchModal";

const NAV_LINKS = [
  { href: "/", label: "Hartă", icon: Globe },
  { href: "/elections", label: "Alegeri", icon: Vote },
  { href: "/countries", label: "Țări", icon: Layers },
  { href: "/parties", label: "Partide", icon: Users },
  { href: "/governments", label: "Guverne", icon: Shield },
  { href: "/upcoming", label: "Calendar", icon: Calendar },
  { href: "/methodology", label: "Metodologie", icon: FileSpreadsheet },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-earth-750/70 bg-earth-900/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-sand-300 text-earth-950 flex items-center justify-center font-bold font-mono text-sm shadow-subtle group-hover:scale-105 transition-transform">
              EE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base sm:text-lg text-earth-50 tracking-tight group-hover:text-sand-300 transition">
                  Equal Earth
                </span>
                <span className="hidden sm:inline text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-sand-300/10 text-sand-300 border border-sand-300/20 font-medium">
                  Political Party
                </span>
              </div>
            </div>
          </Link>

          {/* Clean Quick Search Pill */}
          <div className="flex-1 max-w-md mx-2 sm:mx-6">
            <button
              id="global-search-trigger"
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-1.5 sm:py-2 rounded-xl bg-earth-850 hover:bg-earth-800 text-earth-400 hover:text-earth-200 text-xs border border-earth-750/80 shadow-subtle transition"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-sand-300" />
                <span className="truncate">Caută orice țară sau scrutin...</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-earth-900 text-[10px] text-earth-400 border border-earth-750 font-mono">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Compact Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.slice(0, 4).map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? "bg-earth-800 text-sand-300 font-semibold border border-earth-700/80"
                      : "text-earth-300 hover:text-earth-100 hover:bg-earth-850"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Menu trigger for remaining */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-earth-850 hover:bg-earth-800 text-earth-300 hover:text-earth-100 border border-earth-750 text-xs ml-1 transition"
              title="Mai multe secțiuni"
            >
              <Menu className="w-4 h-4" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-earth-850 text-earth-200 border border-earth-750"
              aria-label="Meniu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dropdown Menu for all modules */}
        {isMobileMenuOpen && (
          <div className="border-t border-earth-750 bg-earth-900/95 px-4 py-3 space-y-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium ${
                      isActive
                        ? "bg-earth-800 text-sand-300 font-semibold border border-earth-700"
                        : "text-earth-300 hover:bg-earth-850 hover:text-earth-100"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-sand-300" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
