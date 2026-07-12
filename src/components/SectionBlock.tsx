import Image from "next/image";
import type { Section } from "@/data/content";

type SectionBlockProps = {
  section: Section;
};

export function SectionBlock({ section }: SectionBlockProps) {
  const isNumberKicker = /^\d+\.$/.test(section.kicker);
  const headingClassName = section.title
    ? "font-serif text-2xl font-medium leading-[1.05] whitespace-pre-line text-balance [font-variant-numeric:lining-nums] sm:text-3xl md:text-4xl lg:text-5xl"
    : "";
  const subheadingClassName =
    "mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-burgundy sm:text-base sm:tracking-[0.22em]";
  const bodyBaseClassName =
    "text-base leading-7 text-muted sm:text-base sm:leading-8 md:text-lg md:leading-9";

  const renderBody = () => {
    if (section.body.length === 0) return null;

    if (section.presentation === "goal") {
      const [goal, ...paragraphs] = section.body;

      return (
        <div className="space-y-4 text-base leading-7 text-muted sm:text-base sm:leading-8 md:text-lg md:leading-9">
          <p className="font-semibold text-ink">{goal}</p>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      );
    }

    if (section.presentation === "result") {
      const [intro, ...items] = section.body;

      return (
        <div className={bodyBaseClassName}>
          <p>{intro}</p>
          <div className="mt-5 space-y-2 border border-burgundy/60 p-4 text-ink">
            {items.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      );
    }

    if (section.presentation === "closing") {
      const [lead, ...rest] = section.body;
      const framed = rest.slice(0, 3);
      const remaining = rest.slice(3);

      return (
        <div className={bodyBaseClassName}>
          <p className="font-semibold text-ink">{lead}</p>
          <div className="mt-5 space-y-2 border border-burgundy/60 p-4 text-ink">
            {framed.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {remaining.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      );
    }

    if (section.kicker === "Возвращаем свое внимание себе") {
      const [intro, task, ...items] = section.body;

      return (
        <div className={bodyBaseClassName}>
          <p>{intro}</p>
          <p className="mt-4">{task}</p>
          <div className="mt-3">
            {items.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      );
    }

    if (section.bodyLayout === "paragraphs") {
      return (
        <div className={`space-y-4 ${bodyBaseClassName}`}>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      );
    }

    if (section.bodyLayout === "lines") {
      return (
        <div className={bodyBaseClassName}>
          {section.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      );
    }

    return <p className={bodyBaseClassName}>{section.body.join(" ")}</p>;
  };

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
            className="photo-treatment object-contain xl:object-cover"
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
          {!isNumberKicker ? <p className={subheadingClassName}>{section.kicker}</p> : null}
          {section.title ? (
            <h2 className={headingClassName}>
              {section.title}
            </h2>
          ) : null}
          <div className={section.title ? "mt-4 sm:mt-6" : ""}>{renderBody()}</div>
        </div>
      </div>
    </section>
  );
}
