// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-xl mx-auto text-center">
        {/* Big number */}
        <p
          aria-hidden="true"
          className="text-[120px] md:text-[160px] font-heading font-bold leading-none text-primary/20 select-none"
        >
          404
        </p>

        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-accent mt-2">
          Page not found
        </p>

        {/* Headline */}
        <h1 className="mt-4 text-3xl md:text-4xl font-heading font-bold text-text">
          This scene doesn't exist
        </h1>

        {/* Subline */}
        <p className="mt-4 text-text-muted leading-relaxed">
          The page you're looking for may have moved, finished its run, or
          never existed in the first place.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-primary text-primary-fg hover:bg-primary-hover transition font-semibold text-sm uppercase tracking-widest"
          >
            Back to Now Showing
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-border text-text hover:bg-surface transition font-semibold text-sm uppercase tracking-widest"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}