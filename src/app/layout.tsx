import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Link from "next/link";
import { ShieldCheck, Globe, Database, FileText } from "lucide-react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Equal Earth — Global Political & Electoral Intelligence Platform",
  description:
    "Data-driven global election intelligence platform with Equal Earth interactive maps, multi-dimensional political party analysis, verified results, and government tracking.",
  keywords: [
    "elections",
    "political parties",
    "Equal Earth projection",
    "electoral results",
    "Romania elections",
    "parliamentary elections",
    "presidential elections",
    "government coalitions",
  ],
  authors: [{ name: "Equal Earth Intelligence" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col bg-earth-900 text-earth-50 antialiased selection:bg-sand-300 selection:text-earth-950">
        <Navbar />

        <main className="flex-1 w-full">{children}</main>

        {/* Global Editorial Footer */}
        <footer className="border-t border-earth-750 bg-earth-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-earth-400">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Col 1: Platform Overview */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sand-300 text-earth-950 flex items-center justify-center font-bold font-mono text-xs">
                  EE
                </div>
                <span className="font-serif font-bold text-base text-earth-100">
                  Equal Earth
                </span>
              </div>
              <p className="text-earth-400 text-xs leading-relaxed">
                A serious, non-partisan global political and electoral intelligence platform combining geographic accuracy (Equal Earth projection) with official election commission provenance.
              </p>
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Synthetic Data • Source-Verified</span>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="font-semibold text-earth-200 uppercase tracking-wider mb-3 text-[11px]">
                Intelligence Modules
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/world-map" className="hover:text-sand-300 transition">
                    Interactive Equal Earth Map
                  </Link>
                </li>
                <li>
                  <Link href="/countries/ro" className="hover:text-sand-300 transition">
                    Romania Deep Intelligence (2024)
                  </Link>
                </li>
                <li>
                  <Link href="/elections" className="hover:text-sand-300 transition">
                    Certified Election Records
                  </Link>
                </li>
                <li>
                  <Link href="/governments" className="hover:text-sand-300 transition">
                    Governments & Coalitions Tracker
                  </Link>
                </li>
                <li>
                  <Link href="/parties" className="hover:text-sand-300 transition">
                    Multi-Dimensional Party Directory
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Political Systems */}
            <div>
              <h4 className="font-semibold text-earth-200 uppercase tracking-wider mb-3 text-[11px]">
                Electoral Architectures
              </h4>
              <ul className="space-y-2">
                <li className="text-earth-400">Semi-Presidential (Romania, France)</li>
                <li className="text-earth-400">Federal Presidential (United States, Brazil)</li>
                <li className="text-earth-400">Constitutional Monarchy (UK, Netherlands)</li>
                <li className="text-earth-400">Directorial Democracy (Switzerland)</li>
                <li className="text-earth-400">Proportional Representation (d&apos;Hondt, Sainte-Laguë)</li>
              </ul>
            </div>

            {/* Col 4: Data Sources & Legal */}
            <div>
              <h4 className="font-semibold text-earth-200 uppercase tracking-wider mb-3 text-[11px]">
                Data & Standards
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/methodology" className="hover:text-sand-300 transition flex items-center gap-1">
                    <Database className="w-3 h-3 text-sand-300" />
                    <span>Data Integrity & Methodology</span>
                  </Link>
                </li>
                <li className="text-earth-400">AEP & BEC Romania Official Registry</li>
                <li className="text-earth-400">Ministère de l&apos;Intérieur (France)</li>
                <li className="text-earth-400">Federal Election Commission (US)</li>
                <li className="text-earth-400">Equal Earth Projection: Šavrič et al.</li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto border-t border-earth-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-earth-500 text-[11px]">
            <p>© {new Date().getFullYear()} Equal Earth Intelligence Platform. All election results sourced from official national authorities.</p>
            <div className="flex items-center gap-4">
              <Link href="/methodology" className="hover:text-earth-300 transition">
                Data Provenance
              </Link>
              <span>•</span>
              <span className="font-mono">ISO 3166-1 Geographic Standards</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
