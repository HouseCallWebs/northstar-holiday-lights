"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-28 bg-ink py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />

        <div className="mt-12 divide-y divide-white/10 rounded-2xl border border-white/10 bg-evergreen-900/40">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium text-cream">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-gold-400 transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                {isOpen ? (
                  <div className="px-6 pb-5 text-sm leading-relaxed text-cream-dim/75">
                    {faq.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
