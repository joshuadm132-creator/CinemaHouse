// components/cinema/MovieCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Movie, Showtime } from "@/config/businesses/cinema";
import ShowtimeBadge from "./ShowtimeBadge";

type MovieCardProps = {
  movie: Movie;
  onShowtimeSelect?: (movie: Movie, showtime: Showtime) => void;
  detailsHref?: string;
};

export default function MovieCard({
  movie,
  onShowtimeSelect,
  detailsHref,
}: MovieCardProps) {
  if (!movie) return null;

  const href = detailsHref ?? `/movies/${movie.id}`;

  return (
    <article className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-6 sm:py-8 border-b border-border w-full max-w-full overflow-hidden">
      {/* ---------- POSTER ---------- */}
      <Link
        href={href}
        className="
          relative
          w-28 sm:w-40 md:w-48
          aspect-[2/3] shrink-0
          rounded-lg overflow-hidden bg-surface
          mx-0 self-start sm:self-auto
          shadow-md transition-transform active:scale-95 sm:hover:scale-105
        "
      >
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 112px, (max-width: 768px) 160px, 192px"
          className="object-cover"
        />
      </Link>

      {/* ---------- INFO ---------- */}
      <div className="flex-grow flex flex-col min-w-0 w-full">
        <Link href={href} className="w-full max-w-full">
          <h3 className="text-xl sm:text-2xl font-bold text-text hover:text-primary transition-colors leading-tight line-clamp-2 sm:line-clamp-1 break-words">
            {movie.title}
          </h3>
        </Link>

        {/* Metadata & Genres */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-text-muted mt-1.5 min-w-0 max-w-full">
          <span className="font-semibold text-text bg-surface-hover px-1.5 py-0.5 rounded text-[11px] sm:text-xs shrink-0">
            {movie.rating}
          </span>
          <span className="opacity-40 shrink-0">•</span>
          <span className="shrink-0">{movie.duration}</span>
          {movie.genres?.length > 0 && (
            <>
              <span className="opacity-40 shrink-0">•</span>
              <span className="truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none">
                {movie.genres.join(", ")}
              </span>
            </>
          )}
        </div>

        {/* Synopsis */}
        <p className="text-xs sm:text-sm text-text-muted mt-2.5 mb-4 max-w-2xl line-clamp-2 sm:line-clamp-3 leading-relaxed break-words">
          {movie.synopsis}
        </p>

        {/* ---------- SHOWTIMES ---------- */}
        {movie.showtimes?.length > 0 && (
          <div className="mt-auto pt-2 w-full max-w-full min-w-0">
            <p className="text-[11px] sm:text-xs font-medium text-text-muted mb-2 tracking-wide uppercase">
              Tap time to book
            </p>
            
            {/* Scrollable container on mobile to prevent wrapping vertical sprawl */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-0.5 scrollbar-none -mx-1 px-1 touch-pan-x">
              {movie.showtimes.map((showtime, i) => (
                <div key={`${movie.id}-${showtime.time}-${showtime.type}-${i}`} className="shrink-0">
                  <ShowtimeBadge
                    showtime={showtime}
                    movieId={movie.id}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}