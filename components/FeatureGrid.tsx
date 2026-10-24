// components/FeatureGrid.tsx
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export type FeatureItem = {
  id: string;
  title: string;
  description: string;
  /** Short label or emoji — legacy, still works */
  icon?: string;
  /** Full-bleed image for the card top — new */
  image?: string;
  /** If set, the whole card becomes a link — new */
  href?: string;
  /** Small chip in the corner, e.g. "Coming Soon" — new */
  badge?: string;
};

type FeatureGridProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: FeatureItem[];
  variant?: "cards" | "list" | "reasons";
  columns?: 2 | 3 | 4;
  cta?: { text: string; href: string };
  background?: "white" | "gray" | "dark";
};

export default function FeatureGrid({
  eyebrow,
  title,
  subtitle,
  items,
  variant = "cards",
  columns,
  cta,
  background = "white",
}: FeatureGridProps) {
  const cols =
    columns ??
    (variant === "list" ? 2 : items.length >= 4 ? 4 : 3);

  const gridCols =
    cols === 2
      ? "grid-cols-2"
      : cols === 4
      ? "grid-cols-2 lg:grid-cols-4"
      : "grid-cols-2 lg:grid-cols-3";

  const bgClass =
    background === "gray"
      ? "bg-surface"
      : background === "dark"
      ? "bg-hero-bg text-hero-text"
      : "bg-background";

  const headingClass =
    background === "dark" ? "text-hero-text" : "text-text";
  const mutedClass =
    background === "dark" ? "text-hero-text/70" : "text-text-muted";

  return (
    <section className={`py-20 px-6 ${bgClass}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          {eyebrow && (
            <p className="text-sm font-medium text-accent uppercase tracking-wider">
              {eyebrow}
            </p>
          )}
          <h2
            className={`mt-3 text-3xl md:text-4xl font-heading font-bold uppercase ${headingClass}`}
          >
            {title}
          </h2>
          {subtitle && (
            <p className={`mt-4 text-lg leading-relaxed ${mutedClass}`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className={`mt-14 grid gap-6 ${gridCols}`}>
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 80}>
              {variant === "cards" && <CardItem item={item} />}
              {variant === "list" && <ListItem item={item} />}
              {variant === "reasons" && (
                <ReasonItem item={item} index={index} />
              )}
            </Reveal>
          ))}
        </div>

        {/* Optional CTA */}
        {cta && (
          <div className="mt-12 text-center">
            <Link
              href={cta.href}
              className="inline-block px-6 py-3 bg-primary text-text-inverse rounded-lg hover:bg-primary-hover transition font-medium"
            >
              {cta.text}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Variant renderers ---------- */

function CardItem({ item }: { item: FeatureItem }) {
  const inner = (
    <div
      className={`
        group h-full flex flex-col
        rounded-xl border border-border bg-background overflow-hidden
        shadow-sm transition
        ${item.href ? "hover:border-primary/40 hover:shadow-md" : ""}
      `}
    >
      {/* Optional image */}
      {item.image && (
        <div className="relative aspect-[4/3] bg-surface overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {item.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-badge text-badge-fg text-[10px] font-semibold uppercase tracking-wider">
              {item.badge}
            </span>
          )}
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        {item.icon && !item.image && (
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold mb-4">
            {item.icon}
          </div>
        )}
        <h3
          className={`text-lg font-heading font-semibold text-text ${
            item.href ? "group-hover:text-primary transition-colors" : ""
          }`}
        >
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-text-muted leading-relaxed">
          {item.description}
        </p>

        {item.href && (
          <span
            aria-hidden="true"
            className="mt-4 inline-flex items-center text-sm font-medium text-primary gap-1 group-hover:gap-2 transition-all"
          >
            Explore <span>→</span>
          </span>
        )}
      </div>
    </div>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="block h-full">
        {inner}
      </Link>
    );
  }
  return inner;
}

function ListItem({ item }: { item: FeatureItem }) {
  return (
    <div className="flex gap-4 p-5 rounded-xl border border-border bg-background">
      <div className="shrink-0 w-8 h-8 rounded-full bg-red-300 text-text-muted flex items-center justify-center font-bold">
        ✕
      </div>
      <div>
        <h3 className="font-heading font-semibold text-text">
          {item.title}
        </h3>
        <p className="mt-1 text-sm text-text-muted leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

function ReasonItem({ item, index }: { item: FeatureItem; index: number }) {
  return (
    <div className="flex gap-4 p-5 rounded-xl bg-background border border-border">
      <div className="shrink-0 w-10 h-10 rounded-full bg-accent text-text-inverse flex items-center justify-center font-bold">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div>
        <h3 className="font-heading font-semibold text-text">
          {item.title}
        </h3>
        <p className="mt-1 text-sm text-text-muted leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}