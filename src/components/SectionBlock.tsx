import Image from "next/image";
import type { Section } from "@/data/content";

type SectionBlockProps = {
  section: Section;
};

export function SectionBlock({ section }: SectionBlockProps) {
  return (
    <section>
      <div
        className={[
          "grid grid-cols-1 gap-4 border-t border-burgundy/20 py-5 sm:gap-6 sm:py-7 xl:grid-cols-[0.9fr_1.1fr] xl:items-center xl:gap-9",
          section.reverse ? "xl:grid-cols-[1.1fr_0.9fr]" : "",
        ].join(" ")}
      >
        <div
          className={[
            "grain relative aspect-[4/3] overflow-hidden bg-ink/10 shadow-soft md:aspect-[16/9] xl:aspect-[4/5]",
            section.reverse ? "xl:order-2" : "",
          ].join(" ")}
        >
          <Image
            src={section.image}
            alt={section.imageAlt}
            fill
            sizes="(min-width: 1280px) 42vw, 100vw"
            className="photo-treatment object-cover"
            style={{ objectPosition: section.objectPosition ?? "50% 35%" }}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/45 to-transparent" />
        </div>
        <div
          className={[
            "min-w-0 self-center",
            section.reverse ? "xl:order-1" : "",
          ].join(" ")}
        >
          <p className="mb-3 text-[0.7rem] uppercase tracking-[0.2em] text-burgundy sm:mb-4 sm:text-xs sm:tracking-[0.28em]">
            {section.kicker}
          </p>
          {section.title ? (
            <h2 className="font-serif text-2xl font-medium leading-[1.05] text-balance [font-variant-numeric:lining-nums] sm:text-3xl md:text-4xl lg:text-5xl">
              {section.title}
            </h2>
          ) : null}
          {section.body.length > 0 && section.bodyLayout === "paragraphs" ? (
            <div className={section.title ? "mt-4 space-y-4 text-sm leading-6 text-muted sm:mt-6 sm:text-base sm:leading-8 md:text-lg md:leading-9" : "space-y-4 text-sm leading-6 text-muted sm:text-base sm:leading-8 md:text-lg md:leading-9"}>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          {section.body.length > 0 && section.bodyLayout === "lines" ? (
            <div className={section.title ? "mt-4 text-sm leading-6 text-muted sm:mt-6 sm:text-base sm:leading-8 md:text-lg md:leading-9" : "text-sm leading-6 text-muted sm:text-base sm:leading-8 md:text-lg md:leading-9"}>
              {section.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ) : null}
          {section.body.length > 0 && !section.bodyLayout ? (
            <p className={section.title ? "mt-4 text-sm leading-6 text-muted sm:mt-6 sm:text-base sm:leading-8 md:text-lg md:leading-9" : "text-sm leading-6 text-muted sm:text-base sm:leading-8 md:text-lg md:leading-9"}>
              {section.body.join(" ")}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
