import Image from "next/image";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ImageGrid } from "@/components/ImageGrid";
import { SectionBlock } from "@/components/SectionBlock";
import { TextAccordion } from "@/components/TextAccordion";
import { landingContent } from "@/data/content";

export default function Home() {
  const { hero, intro, sections, accordion, inside, audience, gallery, cta, footer } =
    landingContent;

  return (
    <main>
      <Hero {...hero} />

      <section className="px-5 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 border-b border-burgundy/25 pb-14 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
          <p className="text-xs uppercase tracking-[0.28em] text-burgundy">{intro.kicker}</p>
          <div>
            <h2 className="font-serif text-4xl font-medium leading-[1.02] text-balance sm:text-6xl">
              {intro.title}
            </h2>
            <div className="mt-7 space-y-5 text-base leading-8 text-muted sm:text-lg sm:leading-9">
              {intro.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <SectionBlock key={section.kicker} section={section} />
      ))}

      <TextAccordion {...accordion} />

      <section className="px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-xs uppercase tracking-[0.28em] text-burgundy">
            {inside.kicker}
          </p>
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
            <h2 className="font-serif text-4xl font-medium leading-[1.02] sm:text-6xl">
              {inside.title}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {inside.items.map((item, index) => (
                <div
                  key={item}
                  className="border-t border-burgundy/20 py-5 text-base leading-7 text-ink"
                >
                  <span className="mb-4 block text-xs uppercase tracking-[0.22em] text-burgundy">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:py-20">
        <div
          className="mx-auto grid max-w-6xl overflow-hidden text-paper md:grid-cols-2"
          style={{ backgroundColor: "var(--color-wine-black)" }}
        >
          <div className="relative min-h-[28rem]">
            <Image
              src={audience.image}
              alt="Портрет автора"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="photo-treatment object-cover"
              style={{ objectPosition: "50% 18%" }}
            />
            <div className="absolute inset-0 bg-ink/20" />
          </div>
          <div
            className="px-6 py-10 sm:p-12"
            style={{ backgroundColor: "var(--color-wine-panel)" }}
          >
            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-paper/60">
              {audience.kicker}
            </p>
            <h2 className="font-serif text-4xl font-medium leading-[1.02] text-balance sm:text-6xl">
              {audience.title}
            </h2>
            <div className="mt-8 space-y-4">
              {audience.items.map((item) => (
                <p key={item} className="border-t border-paper/20 pt-4 text-base leading-7">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ImageGrid {...gallery} />
      <CTA {...cta} />
      <Footer {...footer} />
    </main>
  );
}
