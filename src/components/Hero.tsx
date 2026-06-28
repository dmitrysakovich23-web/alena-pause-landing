import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  brand: string;
  headerLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  button: string;
  image: string;
};

export function Hero({ brand, headerLabel, eyebrow, title, description, button, image }: HeroProps) {
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
          <span>{headerLabel}</span>
        </header>

        <div className="pb-5">
          <p className="mb-5 max-w-[17rem] text-xs uppercase tracking-[0.28em] text-paper/80">
            {eyebrow}
          </p>
          <h1 className="font-serif text-[5.4rem] font-medium leading-[0.78] tracking-normal sm:text-[9rem] md:text-[12rem]">
            {title}
          </h1>
          <div className="mt-7 max-w-xl border-l border-paper/45 pl-5">
            <p className="text-lg leading-7 text-paper/90 sm:text-2xl sm:leading-9">
              {description}
            </p>
            <Link
              href="/success"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-paper px-6 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-burgundy hover:text-paper focus:outline-none focus:ring-2 focus:ring-paper focus:ring-offset-4 focus:ring-offset-ink"
            >
              {button}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
