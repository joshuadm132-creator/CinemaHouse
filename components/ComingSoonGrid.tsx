// components/cinema/ComingSoonGrid.tsx
import Image from "next/image";
import Link from "next/link";
import type { ComingSoonMovie } from "@/config/businesses/cinema";
import Reveal from "@/components/Reveal";

type ComingSoonGridProps = {
  movies: ComingSoonMovie[];
};

export default function ComingSoonGrid({ movies }: ComingSoonGridProps) {
  if (!movies || movies.length === 0) {
    return (
      <div className="py-20 text-center text-text-muted">
        No upcoming releases yet — check back soon.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {movies.map((movie, i) => (
        <Reveal key={movie.id} delay={i * 80}>
          <Link
            href={`/movies/${movie.id}`}
            className="group block h-full"
          >
            <article className="h-full flex flex-col rounded-xl overflow-hidden border border-border bg-surface transition hover:border-primary/40 hover:shadow-lg">
              {/* Poster */}
              <div className="relative aspect-[2/3] bg-surface-sunken overflow-hidden">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Release date ribbon */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-sm bg-badge text-badge-fg text-[11px] uppercase tracking-widest font-semibold">
                  {movie.releaseDate}
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-lg font-heading font-bold text-text group-hover:text-primary transition-colors">
                  {movie.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-text-muted">
                  {movie.rating && <span>{movie.rating}</span>}
                  {movie.duration && (
                    <>
                      <span className="opacity-40">•</span>
                      <span>{movie.duration}</span>
                    </>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {movie.genres.map((g) => (
                    <span
                      key={g}
                      className="px-2 py-0.5 rounded-full bg-background border border-border text-[10px] uppercase tracking-wider text-text-muted"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-sm text-text-muted leading-relaxed line-clamp-3">
                  {movie.synopsis}
                </p>
              </div>
            </article>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}