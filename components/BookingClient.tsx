// components/cinema/BookingClient.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Movie, Screen, Showtime } from "@/config/businesses/cinema";
import SeatMap from "./SeatMap";

type BookingClientProps = {
  movie: Movie;
  showtime: Showtime;
  screen: Screen;
  whatsapp: string;      // business WhatsApp number
  movieHref: string;     // back link
};

type Status = "idle" | "error";

export default function BookingClient({
  movie,
  showtime,
  screen,
  whatsapp,
  movieHref,
}: BookingClientProps) {
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const ticketPrice = useMemo(() => {
    // Parse "$10" or "$18" → 10 or 18. Fallback to 0.
    const n = Number((showtime.price ?? "0").replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }, [showtime.price]);

  const total = ticketPrice * selectedSeats.size;

  const toggleSeat = (seatId: string) => {
    setSelectedSeats((prev) => {
      const next = new Set(prev);
      if (next.has(seatId)) next.delete(seatId);
      else next.add(seatId);
      return next;
    });
  };

  const handleConfirm = () => {
    setError("");

    if (selectedSeats.size === 0) {
      setStatus("error");
      setError("Please select at least one seat.");
      return;
    }
    if (!name.trim() || !phone.trim()) {
      setStatus("error");
      setError("Please enter your name and phone number.");
      return;
    }

    const sortedSeats = Array.from(selectedSeats).sort();
    const lines = [
      `Booking Request — ${movie.title}`,
      "",
      `Showtime: ${showtime.time} (${showtime.type})`,
      `Screen: ${screen.name}`,
      `Seats: ${sortedSeats.join(", ")}`,
      `Total: $${total.toFixed(2)}`,
      "",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
    ];

    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;

    // Trigger WhatsApp open (same pattern as basket-client.tsx)
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setStatus("idle");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <Link
          href={movieHref}
          className="text-sm text-text-muted hover:text-text transition inline-flex items-center gap-1"
        >
          <span aria-hidden="true">←</span> Back to {movie.title}
        </Link>

        <h1 className="mt-4 text-3xl md:text-4xl font-heading font-bold text-text">
          Select your seats
        </h1>
        <p className="mt-2 text-text-muted">
          {movie.title} — {showtime.time} ({showtime.type}) — {screen.name}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px] items-start">
        {/* Seat map */}
        <div className="border border-border bg-surface p-6 md:p-8 overflow-x-auto">
          <SeatMap
            screen={screen}
            selected={selectedSeats}
            onToggle={toggleSeat}
          />
        </div>

        {/* Summary sidebar */}
        <aside className="lg:sticky lg:top-24 space-y-4">
          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-text-muted">
              Your booking
            </h2>

            <div className="mt-4 space-y-1 text-sm">
              <p className="text-text font-medium">{movie.title}</p>
              <p className="text-text-muted">
                {showtime.time} · {showtime.type}
              </p>
            </div>

            <div className="mt-6 border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-text-muted">
                <span>Seats</span>
                <span className="text-text">
                  {selectedSeats.size === 0
                    ? "None selected"
                    : Array.from(selectedSeats).sort().join(", ")}
                </span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Price per seat</span>
                <span className="text-text">
                  {ticketPrice === 0 ? "—" : `$${ticketPrice.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-text pt-2 border-t border-border">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Details form */}
            <div className="mt-6 space-y-3">
              <div>
                <label className="block text-xs font-medium text-text mb-1">
                  Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-text text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text mb-1">
                  Phone <span className="text-primary">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+263 77 123 4567"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-text text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
              </div>
            </div>

            {status === "error" && (
              <p className="mt-3 text-sm text-primary">{error}</p>
            )}

            <button
              type="button"
              onClick={handleConfirm}
              className="mt-5 w-full py-3 rounded-lg bg-primary text-primary-fg font-semibold hover:bg-primary-hover transition text-sm uppercase tracking-widest"
            >
              Confirm via WhatsApp
            </button>

            <p className="mt-3 text-xs text-text-muted text-center">
              We'll reply to confirm availability and payment.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}