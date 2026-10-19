// app/page.tsx
import { business } from "@/config/business";
import CinemaHero from "@/components/CinemaHero";
import ShowtimeList from "@/components/ShowtimeList";
import FeatureGrid from "@/components/FeatureGrid";

export default function HomePage() {
  const cinema = business as any;
  const { nowShowing, hero, promotions } = cinema;

  const featuredMovie = nowShowing.movies.find(
    (m: any) => m.id === hero.featuredMovieId
  );

  return (
    <>
      {featuredMovie && (
        <CinemaHero
          movie={featuredMovie}
          badge={hero.badge}
          ctaLabel={hero.ctaLabel}
        />
      )}

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <ShowtimeList
          title={nowShowing.title}
          dates={nowShowing.dates}
          movies={nowShowing.movies}
        />
      </main>

      <FeatureGrid
        eyebrow={promotions.title}
        title=""
        items={promotions.cards.map((card: any) => ({
          id: card.href,
          title: card.title,
          description: card.subtitle,
          image: card.image,
          href: card.href,
          badge: card.badge,
        }))}
        variant="cards"
        columns={3}
        background="gray"
      />
    </>
  );
}