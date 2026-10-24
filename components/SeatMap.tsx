// components/cinema/SeatMap.tsx
"use client";

import type { Screen } from "@/config/businesses/cinema";

type SeatMapProps = {
  screen: Screen;
  selected: Set<string>;
  onToggle: (seatId: string) => void;
  maxSeats?: number;
};

/**
- Seats are identified by row letter + column number.
- A1 = row A (first row), seat 1 (leftmost).
- Rows are labeled A, B, C...
 */
export default function SeatMap({
  screen,
  selected,
  onToggle,
  maxSeats = 8,
}: SeatMapProps) {
  const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, screen.rows).split("");
  const unavailable = new Set(screen.unavailableSeats ?? []);
  const aislesAfter = new Set(screen.aisleAfterCol ?? []);
  const premiumRows = new Set(screen.premiumRows ?? []);

  const atLimit = selected.size >= maxSeats;

  return (
    <div className="w-full max-w-full">
      {/* Screen indicator */}
      <div className="mb-6 sm:mb-10 mx-auto max-w-xs sm:max-w-md">
        <div className="h-1.5 sm:h-2 rounded-full bg-gradient-to-b from-text/30 to-transparent" />
        <p className="text-center text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-text-muted mt-2">
          Screen
        </p>
      </div>

      {/* Seat grid container with horizontal mobile scroll */}
      <div className="w-full overflow-x-auto touch-pan-x pb-4 scrollbar-none">
        <div className="flex flex-col items-center gap-1.5 min-w-max mx-auto px-2">
          {rows.map((rowLetter) => {
            const isPremiumRow = premiumRows.has(rowLetter);

            return (
              <div key={rowLetter} className="flex items-center gap-1.5">
                {/* Row label — left */}
                <span className="w-4 sm:w-5 text-[10px] sm:text-xs text-text-muted text-right shrink-0">
                  {rowLetter}
                </span>

                {/* Seats */}
                <div className="flex gap-1 sm:gap-1.5 items-center">
                  {Array.from({ length: screen.seatsPerRow }, (_, i) => {
                    const col = i + 1;
                    const seatId = `${rowLetter}${col}`;
                    const isUnavailable = unavailable.has(seatId);
                    const isSelected = selected.has(seatId);
                    const isDisabled = isUnavailable || (!isSelected && atLimit);

                    return (
                      <div key={seatId} className="flex items-center">
                        <button
                          type="button"
                          disabled={isDisabled}
                          onClick={() => onToggle(seatId)}
                          aria-label={`Seat ${seatId}${
                            isUnavailable ? " (unavailable)" : ""
                          }`}
                          aria-pressed={isSelected}
                          title={seatId}
                          className={`
                            w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-[3px] sm:rounded-sm
                            transition-colors duration-100 shrink-0
                            ${
                              isUnavailable
                                ? "bg-seat-taken cursor-not-allowed"
                                : isSelected
                                ? "bg-seat-selected text-primary-fg"
                                : isPremiumRow
                                ? "bg-accent/20 hover:bg-accent/40 border border-accent/40"
                                : "bg-seat-available hover:bg-seat-available/70 border border-border"
                            }
                            ${isDisabled && !isUnavailable ? "opacity-40 cursor-not-allowed" : ""}
                          `}
                        />
                        {/* Aisle gap after this column */}
                        {aislesAfter.has(col) && <div className="w-2.5 sm:w-4 shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {/* Row label — right (for symmetry) */}
                <span className="w-4 sm:w-5 text-[10px] sm:text-xs text-text-muted shrink-0">
                  {rowLetter}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-text-muted">
        <LegendDot className="bg-seat-available border border-border" label="Available" />
        <LegendDot className="bg-accent/30 border border-accent/40" label="Premium" />
        <LegendDot className="bg-seat-selected" label="Selected" />
        <LegendDot className="bg-seat-taken" label="Taken" />
      </div>

      {atLimit && (
        <p className="mt-4 text-center text-xs sm:text-sm text-accent">
          Maximum {maxSeats} seats per booking.
        </p>
      )}
    </div>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 sm:gap-2">
      <span className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] sm:rounded-sm ${className}`} />
      <span>{label}</span>
    </span>
  );
}