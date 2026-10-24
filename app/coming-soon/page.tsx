// app/coming-soon/page.tsx
import type { Metadata } from "next";
import { business } from "@/config/business";
import ComingSoonGrid from "@/components/ComingSoonGrid";

export const metadata: Metadata = {
  title: "Coming Soon",
  description:
    "Upcoming releases at Road House Cinema. Book your seats early.",
};

export default function ComingSoonPage() {
  const cinema = business as any;
  const { comingSoon } = cinema;

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
      <header className="mb-10">
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-text tracking-tight">
          {comingSoon.title}
        </h1>
        {comingSoon.subtitle && (
          <p className="mt-4 text-lg text-text-muted max-w-2xl leading-relaxed">
            {comingSoon.subtitle}
          </p>
        )}
      </header>

      <ComingSoonGrid movies={comingSoon.movies} />
    </main>
  );
}