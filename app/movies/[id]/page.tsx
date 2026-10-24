// app/movies/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business } from "@/config/business";
import CinemaHero from "@/components/CinemaHero";
import MovieDetailBody from "@/components/MovieDetailBody";

type Params = { id: string };
type PageProps = { params: Promise<Params> };

export async function generateStaticParams(): Promise<Params[]> {
  const cinema = business as any;
  const nowShowing = cinema.nowShowing.movies.map((m: any) => ({ id: m.id }));
  const comingSoon = cinema.comingSoon.movies.map((m: any) => ({ id: m.id }));
  return [...nowShowing, ...comingSoon];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const cinema = business as any;
  const movie =
    cinema.nowShowing.movies.find((m: any) => m.id === id) ??
    cinema.comingSoon.movies.find((m: any) => m.id === id);

  if (!movie) return { title: "Movie not found" };

  return {
    title: movie.title,
    description: movie.synopsis,
  };
}
export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params;
  const cinema = business as any;
  const movie =
    cinema.nowShowing.movies.find((m: any) => m.id === id) ??
    cinema.comingSoon.movies.find((m: any) => m.id === id);

  if (!movie) notFound();

  const firstShowtime = movie.showtimes?.[0];
  const bookHref = firstShowtime
    ? `/movies/${movie.id}/book?${new URLSearchParams({
        time: firstShowtime.time,
        type: firstShowtime.type,
        ...(firstShowtime.screenId ? { screen: firstShowtime.screenId } : {}),
      }).toString()}`
    : undefined;

  return (
    <>
      <CinemaHero
        movie={movie}
        badge={movie.genres?.[0] ?? "Coming Soon"}
        ctaLabel={bookHref ? "Book Earliest Showtime" : "Notify Me"}
        ctaSubtext={
          firstShowtime
            ? `${firstShowtime.time} · ${firstShowtime.type}`
            : undefined
        }
        ctaHref={bookHref}
      />
      <MovieDetailBody movie={movie} />
    </>
  );
}