import Image from "next/image";
import type { Section } from "@/data/content";

type SectionBlockProps = {
  section: Section;
};

export function SectionBlock({ section }: SectionBlockProps) {
  return (
    <section className="px-5 py-14 sm:py-20">
      <div
        className={[
          "mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-12",
          section.reverse ? "md:grid-cols-[1.05fr_0.95fr]" : "",
        ].join(" ")}
      >
        <div
          className={[
            "grain relative aspect-[4/5] overflow-hidden bg-ink/10 shadow-soft",
            section.reverse ? "md:order-2" : "",
          ].join(" ")}
        >
          <Image
            src={section.image}
            alt={section.imageAlt}
            fill
            sizes="(min-width: 768px) 46vw, 100vw"
            className="photo-treatment object-cover"
            style={{ objectPosition: section.objectPosition ?? "50% 35%" }}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/45 to-transparent" />
        </div>
        <div
          className={[
            "border-t border-burgundy/20 pt-7 md:border-t-0 md:pt-0",
            section.reverse ? "md:order-1" : "",
          ].join(" ")}
        >
          <p className="mb-5 text-xs uppercase tracking-[0.28em] text-burgundy">
            {section.kicker}
          </p>
          <h2 className="font-serif text-4xl font-medium leading-[1.02] text-balance sm:text-6xl">
            {section.title}
          </h2>
          <div className="mt-7 space-y-5 text-base leading-8 text-muted sm:text-lg sm:leading-9">
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
