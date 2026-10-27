"use client";

import React from "react";
import { Download } from "lucide-react";

interface ExportButtonProps {
  filename: string;
  data: string;
  label?: string;
  className?: string;
}

export default function ExportButton({
  filename,
  data,
  label = "Export CSV",
  className = "",
}: ExportButtonProps) {
  const handleDownload = () => {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-earth-800 hover:bg-earth-750 text-xs font-medium text-earth-200 hover:text-earth-50 border border-earth-700/80 shadow-subtle transition ${className}`}
    >
      <Download className="w-3.5 h-3.5 text-sand-300" />
      <span>{label}</span>
    </button>
  );
}
