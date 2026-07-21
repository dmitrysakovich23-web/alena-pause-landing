import { CTA } from "@/components/CTA";
import { CheckoutProvider } from "@/components/Checkout";
import { Hero } from "@/components/Hero";
import { SectionBlock } from "@/components/SectionBlock";
import { landingContent } from "@/data/content";

export default function Home() {
  const { hero, sections, cta } = landingContent;

  return (
    <CheckoutProvider button={cta.button}>
      <main>
        <Hero {...hero} />

        <div className="px-4 pb-4 pt-8 sm:px-5 sm:pb-5 sm:pt-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:gap-7">
            {sections.map((section, index) => (
              <SectionBlock key={`${section.kicker}-${index}`} section={section} />
            ))}
          </div>
        </div>

        <CTA {...cta} />
      </main>
    </CheckoutProvider>
  );
}
