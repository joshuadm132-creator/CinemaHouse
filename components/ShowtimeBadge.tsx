// components/cinema/ShowtimeBadge.tsx
"use client";

import { useRouter } from "next/navigation";
import type { Showtime } from "@/config/businesses/cinema";

type ShowtimeBadgeProps = {
  showtime: Showtime;
  movieId?: string;
  onSelect?: (showtime: Showtime) => void;
};

export default function ShowtimeBadge({
  showtime,
  movieId,
  onSelect,
}: ShowtimeBadgeProps) {
  const router = useRouter();
  if (!showtime) return null;

  const isPremium =
    showtime.type === "LUX" ||
    showtime.type === "VIP" ||
    showtime.type === "IMAX";
  const isSoldOut = showtime.soldOut === true;

  const handleClick = () => {
    if (isSoldOut) return;

    // If the parent provided a handler, use it
    if (onSelect) {
      onSelect(showtime);
      return;
    }

    // Otherwise, navigate to booking (requires movieId)
    if (movieId) {
      const qs = new URLSearchParams({
        time: showtime.time,
        type: showtime.type,
        ...(showtime.screenId ? { screen: showtime.screenId } : {}),
      });
      router.push(`/movies/${movieId}/book?${qs.toString()}`);
    }
  };
  return (
    <button
      disabled={isSoldOut}
       onClick={handleClick}
      className={`
        group flex flex-col items-center justify-center
        px-5 py-2 rounded-sm
        border transition-colors duration-150
        ${isSoldOut
          ? "bg-surface-sunken text-sold-out border-border cursor-not-allowed line-through"
          : isPremium
            ? "bg-accent text-accent-fg border-accent hover:bg-accent-hover"
            : "bg-surface-elevated text-text border-border hover:bg-primary hover:text-primary-fg hover:border-primary"
        }
      `}
    >
      <span className="text-sm font-semibold leading-tight">
        {showtime.time}
      </span>
      <span
        className={`
          text-[10px] uppercase tracking-widest mt-0.5
          ${isSoldOut
            ? "opacity-60"
            : isPremium
              ? "opacity-80"
              : "text-text-muted group-hover:text-primary-fg/80"
          }
        `}
      >
        {showtime.type}
      </span>
    </button>
  );
}