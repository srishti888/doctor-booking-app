"use client";

import { useState } from "react";

type SelectSlotProps = {
  slots: string[];
  selected: string;
  setSelectedAction: (slot: string) => void;
};

function parseSlot(slot: string) {
  const date = new Date(slot);
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  // Format as "9 AM" / "2 PM" — no minutes
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
  const dateKey = date.toDateString();
  return { dayName, day, month, time, iso: slot, dateKey };
}

function groupByDate(slots: string[]) {
  const groups: Record<string, ReturnType<typeof parseSlot>[]> = {};
  slots.forEach((slot) => {
    const parsed = parseSlot(slot);
    if (!groups[parsed.dateKey]) groups[parsed.dateKey] = [];
    groups[parsed.dateKey].push(parsed);
  });
  return groups;
}

export default function SelectSlot({
  slots,
  selected,
  setSelectedAction,
}: SelectSlotProps) {
  if (!slots || slots.length === 0)
    return (
      <p className="text-sm" style={{ color: "#8B6B5B" }}>
        No slots available
      </p>
    );

  const grouped = groupByDate(slots);
  const dateKeys = Object.keys(grouped);

  // Default active day = day of selected slot, or first day
  const defaultDay = selected
    ? new Date(selected).toDateString()
    : dateKeys[0];
  const [activeDay, setActiveDay] = useState<string>(defaultDay);

  const slotsForActiveDay = grouped[activeDay] ?? [];

  return (
    <div>
      {/* ── Date strip ── */}
      <div
        className="flex gap-2 overflow-x-auto pb-1 mb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {dateKeys.map((key) => {
          const sample = grouped[key][0];
          const isActive = key === activeDay;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveDay(key)}
              className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl font-semibold transition-all duration-200"
              style={{
                width: 56,
                height: 72,
                border: isActive ? "2px solid #75C1A7" : "2px solid #DFDFDE",
                backgroundColor: isActive ? "rgba(117,193,167,0.12)" : "#fff",
                color: isActive ? "#75C1A7" : "#8B6B5B",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {sample.dayName}
              </span>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  lineHeight: 1.1,
                  color: isActive ? "#75C1A7" : "#48352D",
                }}
              >
                {sample.day}
              </span>
              <span
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {sample.month}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Time grid for selected day ── */}
      <div className="grid grid-cols-3 gap-2">
        {slotsForActiveDay.map((s) => {
          const isSelected = selected === s.iso;
          return (
            <button
              key={s.iso}
              type="button"
              onClick={() => setSelectedAction(s.iso)}
              className="rounded-xl py-3 text-sm font-medium transition-all duration-200"
              style={{
                border: isSelected ? "none" : "1.5px solid #C4BFBE",
                backgroundColor: isSelected ? "#75C1A7" : "#fff",
                color: isSelected ? "#fff" : "#48352D",
                cursor: "pointer",
                boxShadow: isSelected
                  ? "0 2px 8px rgba(117,193,167,0.3)"
                  : "none",
              }}
            >
              {s.time}
            </button>
          );
        })}
      </div>
    </div>
  );
}