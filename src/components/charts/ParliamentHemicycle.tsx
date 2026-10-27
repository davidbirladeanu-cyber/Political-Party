"use client";

import React, { useState, useMemo } from "react";

export interface ParliamentSeatGroup {
  id: string;
  name: string;
  acronym: string;
  seats: number;
  color: string;
  isGoverning?: boolean;
}

interface ParliamentHemicycleProps {
  groups: ParliamentSeatGroup[];
  totalSeats: number;
  majorityThreshold?: number;
  chamberName?: string;
}

export default function ParliamentHemicycle({
  groups,
  totalSeats,
  majorityThreshold,
  chamberName,
}: ParliamentHemicycleProps) {
  const [hoveredGroup, setHoveredGroup] = useState<ParliamentSeatGroup | null>(null);

  // Compute points on concentric semicircular arcs
  const { seatPoints, thresholdAngle } = useMemo(() => {
    const width = 500;
    const height = 270;
    const centerX = width / 2;
    const centerY = height - 20;

    const rowCount = 7;
    const innerRadius = 90;
    const outerRadius = 220;

    // Distribute totalSeats proportionally across rows
    // Row radius r_i = innerRadius + i * (outerRadius - innerRadius) / (rowCount - 1)
    // Capacity proportional to radius
    const rowRadii = Array.from({ length: rowCount }, (_, i) => {
      return innerRadius + (i * (outerRadius - innerRadius)) / (rowCount - 1);
    });

    const radiusSum = rowRadii.reduce((acc, r) => acc + r, 0);
    const rowCapacities = rowRadii.map((r) => Math.round((r / radiusSum) * totalSeats));

    // Fix rounding discrepancies so sum equals totalSeats
    const currentSum = rowCapacities.reduce((acc, c) => acc + c, 0);
    rowCapacities[rowCount - 1] += totalSeats - currentSum;

    // Expand groups into a flat list of individual seat items
    const seatList: Array<{ group: ParliamentSeatGroup }> = [];
    for (const g of groups) {
      for (let s = 0; s < g.seats; s++) {
        seatList.push({ group: g });
      }
    }

    // Assign seats to rows from outer to inner or row by row
    // Generate grid coordinates
    const allCoords: Array<{ x: number; y: number; angle: number }> = [];

    for (let r = 0; r < rowCount; r++) {
      const radius = rowRadii[r];
      const count = rowCapacities[r];
      for (let i = 0; i < count; i++) {
        // angle goes from Math.PI (left) to 0 (right)
        const angle = Math.PI - (i / (count - 1)) * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY - radius * Math.sin(angle);
        allCoords.push({ x, y, angle });
      }
    }

    // Sort coords by angle descending (left to right)
    allCoords.sort((a, b) => b.angle - a.angle);

    // Pair coordinates with seat groups
    const points = allCoords.slice(0, totalSeats).map((coord, index) => {
      const seatItem = seatList[index] || {
        group: { id: "empty", name: "Vacant", acronym: "-", seats: 0, color: "#333" },
      };
      return {
        ...coord,
        group: seatItem.group,
      };
    });

    return {
      seatPoints: points,
      thresholdAngle: Math.PI / 2, // 90 degrees vertical center
    };
  }, [groups, totalSeats]);

  const threshold = majorityThreshold || Math.floor(totalSeats / 2) + 1;

  return (
    <div className="w-full rounded-card border border-earth-700 bg-earth-850 p-6 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-earth-750">
        <div>
          <h3 className="text-sm font-semibold text-earth-50">
            {chamberName || "Parliamentary Chamber Seating"}
          </h3>
          <p className="text-xs text-earth-400">
            Total {totalSeats} seats • Majority threshold: {threshold} seats
          </p>
        </div>

        {hoveredGroup && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-earth-800 border border-earth-700 text-xs">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: hoveredGroup.color }}
            />
            <span className="font-semibold text-earth-100">{hoveredGroup.name}</span>
            <span className="font-mono text-sand-300 font-bold">
              {hoveredGroup.seats} seats ({((hoveredGroup.seats / totalSeats) * 100).toFixed(1)}%)
            </span>
          </div>
        )}
      </div>

      {/* Hemicycle SVG */}
      <div className="relative flex justify-center w-full overflow-hidden">
        <svg
          viewBox="0 0 500 270"
          className="w-full max-w-[500px] h-auto overflow-visible select-none"
        >
          {/* Semicircle Guidelines */}
          <line
            x1="250"
            y1="30"
            x2="250"
            y2="250"
            stroke="#45463F"
            strokeWidth="1"
            strokeDasharray="3,3"
          />

          <text
            x="250"
            y="20"
            textAnchor="middle"
            fill="#A5A398"
            fontSize="10"
            fontFamily="monospace"
          >
            Majority: {threshold}
          </text>

          {/* Seat Circles */}
          {seatPoints.map((pt, idx) => {
            const isHovered = hoveredGroup?.id === pt.group.id;
            const isFaded = hoveredGroup && hoveredGroup.id !== pt.group.id;

            return (
              <circle
                key={idx}
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 4.8 : 3.8}
                fill={pt.group.color}
                opacity={isFaded ? 0.25 : 1}
                stroke={isHovered ? "#F2EFE6" : "#111210"}
                strokeWidth={isHovered ? 1.5 : 0.6}
                className="transition-all duration-150 cursor-pointer"
                onMouseEnter={() => setHoveredGroup(pt.group)}
                onMouseLeave={() => setHoveredGroup(null)}
              />
            );
          })}
        </svg>
      </div>

      {/* Legend Grid */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 border-t border-earth-750 pt-4">
        {groups.map((group) => {
          const isHovered = hoveredGroup?.id === group.id;
          return (
            <button
              key={group.id}
              onMouseEnter={() => setHoveredGroup(group)}
              onMouseLeave={() => setHoveredGroup(null)}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-xs text-left transition ${
                isHovered
                  ? "bg-earth-800 border-sand-300/40 text-earth-50"
                  : "bg-earth-900/60 border-earth-750 text-earth-300 hover:bg-earth-800"
              }`}
            >
              <div className="flex items-center gap-2 truncate mr-1">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: group.color }}
                />
                <span className="font-medium truncate">{group.acronym}</span>
              </div>
              <span className="font-mono font-semibold text-earth-100 flex-shrink-0">
                {group.seats}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
