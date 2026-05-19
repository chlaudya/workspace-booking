"use client";

import { AnimatedSection } from "@/components/motion/animated-section";

export function BuilderFooter() {
  return (
    <AnimatedSection className="mb-20 mt-12 border-t border-border py-8 lg:mb-0">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          Made for digital nomads in Bali ·{" "}
          <a
            href="https://monis.rent"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            monis.rent
          </a>
        </p>
      </div>
    </AnimatedSection>
  );
}
