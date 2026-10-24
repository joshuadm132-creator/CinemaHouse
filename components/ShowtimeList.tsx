// components/cinema/ShowtimeList.tsx
"use client";

import { useMemo, useState } from "react";
import type { Movie, CinemaDate } from "@/config/businesses/cinema";
import DateSelector from "./DateSelector";
import MovieCard from "./MovieCard";

type SortBy = "newest" | "title" | "rating";

type ShowtimeListProps = {
  title: string;
  dates: CinemaDate[];
  movies: Movie[];
};

const ALL_DATES_ID = "all";

export default function ShowtimeList({
  title,
  dates,
  movies,
}: ShowtimeListProps) {
  // Default to the active date from config, or "all"
  const initialDate =
    dates.find((d) => d.active)?.id ?? ALL_DATES_ID;

  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [sortBy, setSortBy] = useState<SortBy>("newest");

  // Add a synthetic "ALL" entry at the start
  const extendedDates: CinemaDate[] = [
    { id: ALL_DATES_ID, label: "ALL", date: "Movies" },
    ...dates,
  ];

  const filteredMovies = useMemo(() => {
    // "all" bypasses the date filter
    const playing =
      selectedDate === ALL_DATES_ID
        ? movies
        : movies.filter(
            (movie) =>
              !movie.showtimeDates ||
              movie.showtimeDates.includes(selectedDate)
          );

    const sorted = [...playing];
    if (sortBy === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "rating") {
      sorted.sort((a, b) => a.rating.localeCompare(b.rating));
    }

    return sorted;
  }, [movies, selectedDate, sortBy]);

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-text">{title}</h2>

        <div className="flex gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="
              bg-surface-elevated text-text
              border border-border rounded-sm
              text-xs uppercase tracking-widest
              px-3 py-2
              focus:outline-none focus:border-primary
            "
          >
            <option value="newest">Order by Newest</option>
            <option value="title">Order by Title</option>
            <option value="rating">Order by Rating</option>
          </select>
        </div>
      </div>

      <DateSelector
        dates={extendedDates}
        selectedId={selectedDate}
        onSelect={setSelectedDate}
      />

      {filteredMovies.length > 0 ? (
        <div>
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-text-muted">
          No showtimes available for this date.
        </div>
      )}
    </section>
  );
}