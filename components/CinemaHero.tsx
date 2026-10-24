// components/cinema/CinemaHero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/config/businesses/cinema";

type CinemaHeroProps = {
  movie: Movie;
  badge?: string;
  ctaLabel?: string;
  ctaSubtext?: string;
  onCtaClick?: () => void;
  ctaHref?: string;
};

export default function CinemaHero({
  movie,
  badge = "Now Showing",
  ctaLabel = "Book Tickets",
  ctaSubtext,
  onCtaClick,
  ctaHref,
}: CinemaHeroProps) {
  if (!movie) return null;

  const ctaClasses = `
    w-fit
    bg-primary hover:bg-primary-hover active:bg-primary-active
    text-primary-fg
    text-xs sm:text-sm uppercase tracking-widest font-semibold
    px-5 py-3 rounded-sm
    transition-colors duration-150
    inline-block text-center
  `;

  return (
    <section className="relative w-full max-w-full h-[380px] sm:h-[460px] md:h-[560px] bg-hero-bg overflow-hidden">
      <Image
        src={movie.backdrop}
        alt={movie.title}
        fill
        priority
        className="object-cover opacity-60"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-hero-bg via-hero-bg/40 to-transparent" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-8 md:px-10 flex flex-col justify-end pb-8 sm:pb-12 md:pb-20">
        {badge && (
          <span className="inline-block w-fit mb-2 sm:mb-4 bg-badge text-badge-fg text-[10px] sm:text-[11px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-sm">
            {badge}
          </span>
        )}

        <h1 className="text-hero-text text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-2 sm:mb-3 max-w-2xl break-words leading-tight line-clamp-2">
          {movie.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-hero-text/80 mb-4 sm:mb-6">
          {movie.rating && <span className="font-semibold">{movie.rating}</span>}
          {movie.duration && (
            <>
              <span className="opacity-50">•</span>
              <span>{movie.duration}</span>
            </>
          )}
          {movie.genres?.length > 0 && (
            <>
              <span className="opacity-50">•</span>
              <span className="truncate max-w-[200px] sm:max-w-none">{movie.genres.join(", ")}</span>
            </>
          )}
        </div>

        <div className="flex flex-col gap-2 w-fit">
          {ctaHref ? (
            <Link href={ctaHref} className={ctaClasses}>
              {ctaLabel}
            </Link>
          ) : (
            <button onClick={onCtaClick} className={ctaClasses}>
              {ctaLabel}
            </button>
          )}
          {ctaSubtext && (
            <p className="text-[10px] sm:text-xs text-hero-text/60 uppercase tracking-widest">
              {ctaSubtext}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}