// components/cinema/MovieDetailBody.tsx
"use client";

import Image from "next/image";
import type { Movie, Showtime } from "@/config/businesses/cinema";
import ShowtimeBadge from "./ShowtimeBadge";

type MovieDetailBodyProps = {
  movie: Movie;
  onShowtimeSelect?: (movie: Movie, showtime: Showtime) => void;
};

export default function MovieDetailBody({
  movie,
  onShowtimeSelect,
}: MovieDetailBodyProps) {
  if (!movie) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
      {/* ---------- TOP: Poster + Key Info ---------- */}
      <div className="grid gap-10 md:grid-cols-[280px_1fr] md:items-start">
        {/* Poster */}
        <div className="relative w-full max-w-[280px] mx-auto md:mx-0 aspect-[2/3] rounded-lg overflow-hidden bg-surface border border-border">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            sizes="280px"
            priority
            className="object-cover"
          />
        </div>

        {/* Key info */}
        <div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-text tracking-tight">
            {movie.title}
          </h1>

          {/* Meta row */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-muted">
            {movie.rating && (
              <span className="px-2 py-0.5 rounded-sm border border-border text-xs font-semibold uppercase tracking-wider">
                {movie.rating}
              </span>
            )}
            {movie.duration && <span>{movie.duration}</span>}
            {movie.releaseDate && (
              <>
                <span className="opacity-40">•</span>
                <span>{movie.releaseDate}</span>
              </>
            )}
            {movie.language && (
              <>
                <span className="opacity-40">•</span>
                <span>{movie.language}</span>
              </>
            )}
          </div>

          {/* Genres */}
          {movie.genres?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 rounded-full bg-surface text-text-muted text-xs uppercase tracking-wider border border-border"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Long synopsis */}
          <p className="mt-6 text-text leading-relaxed max-w-2xl">
            {movie.longSynopsis ?? movie.synopsis}
          </p>

          {/* Director + Cast summary */}
          {movie.director && (
            <p className="mt-4 text-sm text-text-muted">
              <span className="text-text font-medium">Director:</span>{" "}
              {movie.director}
            </p>
          )}

          {/* Showtimes */}
          {movie.showtimes?.length > 0 && (
  <div className="mt-8">
    <div className="flex items-baseline justify-between mb-3">
      <h2 className="text-xs uppercase tracking-widest font-semibold text-text-muted">
        Showtimes
      </h2>
      <span className="text-xs text-text-muted">Tap a time to book</span>
    </div>
    <div className="flex flex-wrap gap-3">
      {movie.showtimes.map((s, i) => (
        <ShowtimeBadge
          key={`${movie.id}-${s.time}-${s.type}-${i}`}
          showtime={s}
          movieId={movie.id}
        />
      ))}
    </div>
  </div>
)}
        </div>
      </div>

      {/* ---------- TRAILER ---------- */}
      {movie.trailerId && (
        <div className="mt-16">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-text-muted mb-4">
            Trailer
          </h2>
          <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-surface-sunken">
            <iframe
              src={`https://www.youtube.com/embed/${movie.trailerId}`}
              title={`${movie.title} — Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}

      {/* ---------- CAST ---------- */}
      {movie.cast && movie.cast.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-text-muted mb-6">
            Cast
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {movie.cast.map((member) => (
              <div
                key={member.name}
                className="p-4 rounded-lg border border-border bg-surface"
              >
                <p className="font-semibold text-text">{member.name}</p>
                <p className="mt-1 text-sm text-text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}