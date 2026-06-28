"use client";

import { useState } from "react";
import type { AccordionItem } from "@/data/content";

type TextAccordionProps = {
  kicker: string;
  title: string;
  items: AccordionItem[];
};

export function TextAccordion({ kicker, title, items }: TextAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 text-xs uppercase tracking-[0.28em] text-burgundy">{kicker}</p>
        <h2 className="font-serif text-4xl font-medium leading-[1.02] text-balance sm:text-6xl">
          {title}
        </h2>
        <div className="mt-9 divide-y divide-ink/15 border-y border-ink/15">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.title}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="font-serif text-2xl leading-tight sm:text-3xl">
                    {item.title}
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/20 text-xl text-burgundy">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen ? (
                  <p className="pb-6 text-base leading-8 text-muted sm:text-lg sm:leading-9">
                    {item.body}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
