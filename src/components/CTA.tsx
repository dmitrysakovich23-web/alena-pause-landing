import Link from "next/link";

type CTAProps = {
  eyebrow: string;
  title: string;
  description: string;
  button: string;
  href?: string;
  compact?: boolean;
};

export function CTA({ eyebrow, title, description, button, href = "/success", compact = false }: CTAProps) {
  return (
    <section className={compact ? "px-5 py-14" : "px-5 py-20 sm:py-24"}>
      <div className="mx-auto max-w-5xl border-y border-burgundy/25 py-12 text-center sm:py-16">
        <p className="mb-4 text-xs uppercase tracking-[0.28em] text-burgundy">{eyebrow}</p>
        <h2 className="mx-auto max-w-3xl font-serif text-5xl font-medium leading-[0.95] text-balance sm:text-7xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
          {description}
        </p>
        <Link
          href={href}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-burgundy px-7 text-sm font-semibold uppercase tracking-[0.18em] text-paper transition hover:bg-ink focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-4 focus:ring-offset-milk"
        >
          {button}
        </Link>
      </div>
    </section>
  );
}
