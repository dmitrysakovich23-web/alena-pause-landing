import Link from "next/link";

type CTAProps = {
  button: string;
  href?: string;
  compact?: boolean;
};

export function CTA({ button, href = "/success", compact = false }: CTAProps) {
  return (
    <section className={compact ? "px-5 py-14" : "px-5 py-20 sm:py-24"}>
      <div className="mx-auto max-w-5xl border-y border-burgundy/25 py-12 text-center sm:py-16">
        <Link
          href={href}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-burgundy px-7 text-sm font-semibold uppercase tracking-[0.18em] text-paper transition-none hover:bg-burgundy hover:text-paper active:bg-burgundy focus:bg-burgundy focus:text-paper focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-4 focus:ring-offset-milk"
        >
          {button}
        </Link>
      </div>
    </section>
  );
}
