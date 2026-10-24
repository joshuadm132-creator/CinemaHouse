// components/cinema/DateSelector.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { CinemaDate } from "@/config/businesses/cinema";

type DateSelectorProps = {
  dates: CinemaDate[];
  selectedId: string;
  onSelect: (dateId: string) => void;
  allId?: string;
};

export default function DateSelector({
  dates,
  selectedId,
  onSelect,
  allId = "all",
}: DateSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  if (!dates || dates.length === 0) return null;

  const allEntry = dates.find((d) => d.id === allId);
  const scrollableDates = dates.filter((d) => d.id !== allId);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [scrollableDates.length]);

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = 4 * (72 + 8);
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <div className="border-b border-border w-full">
      <div className="w-full flex justify-center px-4">
        <div className="flex items-center gap-2 w-full max-w-2xl min-w-0">
          {/* ALL — fixed */}
          {allEntry && (
            <div className="shrink-0 py-2">
              <DateChip
                day={allEntry}
                isActive={selectedId === allEntry.id}
                onClick={() => onSelect(allEntry.id)}
              />
            </div>
          )}

          {/* Left arrow */}
          <button
            type="button"
            onClick={() => scrollBy("left")}
            aria-label="Scroll dates left"
            disabled={!canScrollLeft}
            className={`
              hidden md:flex shrink-0 w-9 h-11
              items-center justify-center rounded-md
              bg-surface text-text-muted hover:text-text hover:border-primary/40
              transition-opacity border border-border
              ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
          >
            <ArrowLeft />
          </button>

          {/* Scrollable dates */}
          <div
            ref={scrollRef}
            className="
              flex-1 min-w-0 flex gap-2 overflow-x-auto py-2
              snap-x snap-mandatory scroll-smooth scrollbar-none
            "
          >
            {scrollableDates.map((day) => (
              <DateChip
                key={day.id}
                day={day}
                isActive={selectedId === day.id}
                onClick={() => onSelect(day.id)}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() => scrollBy("right")}
            aria-label="Scroll dates right"
            disabled={!canScrollRight}
            className={`
              hidden md:flex shrink-0 w-9 h-11
              items-center justify-center rounded-md
              bg-surface text-text-muted hover:text-text hover:border-primary/40
              transition-opacity border border-border
              ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

function DateChip({
  day,
  isActive,
  onClick,
}: {
  day: CinemaDate;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center
        min-w-[72px] shrink-0 px-3.5 py-2.5
        rounded-md snap-start
        transition-colors duration-150
        ${isActive
          ? "bg-surface-elevated text-text border-b-2 border-primary shadow-sm"
          : "bg-transparent text-text-muted hover:bg-surface hover:text-text"
        }
      `}
    >
      <span className="text-[10px] uppercase tracking-widest font-medium">
        {day.label}
      </span>
      <span className={`text-xs mt-0.5 ${isActive ? "font-semibold" : ""}`}>
        {day.date}
      </span>
    </button>
  );
}

function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}