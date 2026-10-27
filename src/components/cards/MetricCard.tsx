import React from "react";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  badgeColor?: string;
  trend?: string;
  className?: string;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  badgeColor = "bg-earth-800 text-sand-300",
  trend,
  className = "",
}: MetricCardProps) {
  return (
    <div
      className={`rounded-card border border-earth-750 bg-earth-850 p-5 shadow-card hover:border-earth-700 transition ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-earth-400 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-earth-900 border border-earth-750 flex items-center justify-center text-sand-300">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl sm:text-3xl font-bold font-mono text-earth-50 tracking-tight">
          {value}
        </span>
        {badge && (
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center justify-between text-xs text-earth-400 mt-2">
          {subtitle && <span>{subtitle}</span>}
          {trend && <span className="font-mono text-sand-400">{trend}</span>}
        </div>
      )}
    </div>
  );
}
