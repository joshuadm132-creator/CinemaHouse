// app/movies/[id]/book/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business } from "@/config/business";
import BookingClient from "@/components/BookingClient";

type Params = { id: string };


type SearchParams = {
  time?: string;
  type?: string;
  screen?: string;
};

type PageProps = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};

export const metadata: Metadata = {
  title: "Book Tickets",
  robots: { index: false, follow: false },
};

export default async function BookingPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { time, type, screen: screenId } = await searchParams;

  const cinema = business as any;
  const movie =
    cinema.nowShowing.movies.find((m: any) => m.id === id) ??
    cinema.comingSoon.movies.find((m: any) => m.id === id);

  if (!movie) notFound();

  const showtime = movie.showtimes?.find(
    (s: any) => s.time === time && s.type === type
  );

  if (!showtime) notFound();

  const screens: any[] = cinema.screens ?? [];
  const screen =
    screens.find((s) => s.id === screenId) ??
    screens.find((s) => s.id === showtime.screenId) ??
    screens[0];

  if (!screen) notFound();

  return (
    <BookingClient
      movie={movie}
      showtime={showtime}
      screen={screen}
      whatsapp={cinema.contact.whatsapp}
      movieHref={`/movies/${movie.id}`}
    />
  );
}