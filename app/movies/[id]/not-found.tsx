// app/movies/[id]/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="text-6xl mb-6" aria-hidden="true">🎬</p>
      <h1 className="text-3xl font-heading font-bold text-text">
        Movie not found
      </h1>
      <p className="mt-3 text-text-muted">
        We couldn't find that film. It may have finished its run.
      </p>
      <Link
        href="/"
        className="inline-block mt-8 px-6 py-3 rounded-lg bg-primary text-primary-fg hover:bg-primary-hover transition font-semibold"
      >
        Back to Now Showing
      </Link>
    </div>
  );
}