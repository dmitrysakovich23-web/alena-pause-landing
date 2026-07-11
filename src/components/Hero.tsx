import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  brand: string;
  headerLabel: string;
  headerHref: string;
  title: string;
  description: string;
  formula: string;
  button: string;
  image: string;
};

export function Hero({
  brand,
  headerLabel,
  headerHref,
  title,
  description,
  formula,
  button,
  image,
}: HeroProps) {
  return (
    <section className="relative min-h-[92svh] overflow-hidden px-5 pb-8 pt-5 text-paper sm:min-h-[88vh] sm:px-8">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="photo-treatment object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/75" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/40 to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[calc(92svh-3.25rem)] max-w-6xl flex-col justify-between sm:min-h-[calc(88vh-3.25rem)]">
        <header className="flex items-center justify-between text-xs uppercase tracking-[0.22em]">
          <span>{brand}</span>
          <Link href={headerHref} className="normal-case tracking-[0.12em]">
            {headerLabel}
          </Link>
        </header>

        <div className="max-w-4xl pb-5">
          <h1 className="font-serif text-5xl font-medium leading-[0.92] tracking-normal text-balance sm:text-7xl md:text-8xl">
            {title}
          </h1>
          <div className="mt-7 max-w-2xl border-l border-paper/45 pl-5">
            <p className="text-lg leading-7 text-paper/90 sm:text-2xl sm:leading-9">
              {description}
            </p>
            <p className="mt-4 inline-block whitespace-nowrap border-y border-paper/45 py-2 text-base font-semibold text-paper sm:text-xl">
              {formula}
            </p>
            <Link
              href="/success"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-burgundy px-6 text-sm font-semibold uppercase tracking-[0.18em] text-paper transition-none hover:bg-burgundy hover:text-paper active:bg-burgundy focus:bg-burgundy focus:text-paper focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-4 focus:ring-offset-ink"
            >
              {button}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
