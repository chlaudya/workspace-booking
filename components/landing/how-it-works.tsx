"use client";

import { motion, useReducedMotion } from "framer-motion";
import { forwardRef } from "react";
import {
  ArrowRight,
  Box,
  BadgeCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatedSection,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/animated-section";
import { motionEase } from "@/lib/motion";

type Step = {
  number: string;
  title: string;
  description: string;
  outcome: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Pick Your Setup",
    description:
      "Drag desk, chair, monitor, and accessories into the 3D canvas. See your space come together in real time.",
    outcome: "Live 3D preview",
    icon: Box,
  },
  {
    number: "02",
    title: "Confirm Rental",
    description:
      "Weekly pricing updates as you build. Drop your pin, pick a slot, and checkout — no hidden fees.",
    outcome: "Transparent total",
    icon: BadgeCheck,
  },
  {
    number: "03",
    title: "Start Working",
    description:
      "We deliver, install, and hand off a ready-to-use workstation. Productive the same day.",
    outcome: "Same-day delivery",
    icon: Truck,
  },
];

type HowItWorksProps = {
  onGetStarted: () => void;
};

export const HowItWorks = forwardRef<HTMLDivElement, HowItWorksProps>(
  function HowItWorks({ onGetStarted }, ref) {
    const reduceMotion = useReducedMotion();

    return (
      <AnimatedSection>
        <section
          id="how-it-works"
          ref={ref}
          className="relative scroll-mt-24 overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-b from-primary/[0.07] via-card to-secondary/40 py-10 sm:py-12"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-accent/10 blur-2xl"
          />

          <motion.div className="relative mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-center text-xs font-semibold tracking-[0.22em] text-primary">
              HOW IT WORKS
            </p>
            <h2 className="mt-1.5 text-center font-serif text-xl font-bold text-foreground sm:text-2xl">
              Go from idea to setup in 3 steps
            </h2>
            <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
              Under 2 minutes from builder to confirmed booking.
            </p>

            <StaggerGroup className="relative mt-7 grid grid-cols-1 gap-5 md:grid-cols-[2.75rem_1fr] md:gap-x-5 md:gap-y-4">
              <motion.div
                aria-hidden
                className="pointer-events-none absolute left-[1.375rem] top-4 bottom-4 hidden w-px -translate-x-1/2 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent md:block"
              />

              {steps.map((step, index) => (
                <StaggerItem key={step.number} className="contents">
                  <motion.div
                    whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                    transition={{ duration: 0.25, ease: motionEase }}
                    className="relative z-10 flex items-center gap-3 md:flex-col md:justify-center md:gap-1 md:self-center"
                  >
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
                      <step.icon className="h-5 w-5 text-primary" />
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-muted-foreground/50 md:hidden">
                      {step.number}
                    </span>
                  </motion.div>

                  <motion.div
                    whileHover={reduceMotion ? undefined : { x: 2 }}
                    transition={{ duration: 0.25, ease: motionEase }}
                    className="rounded-xl border border-border/80 bg-card/90 p-4 shadow-sm transition-shadow duration-300 hover:border-primary/25 hover:shadow-md"
                  >
                    <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {step.outcome}
                    </span>
                    <h3 className="mt-2 text-base font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">
                      {step.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.15, ease: motionEase }}
              className="mt-7 flex flex-col items-center gap-3 border-t border-border/60 pt-6 sm:flex-row sm:justify-center sm:gap-4"
            >
              <button
                type="button"
                onClick={onGetStarted}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
              >
                Start Building
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-xs text-muted-foreground">
                No payment captured until host confirms
              </p>
            </motion.div>
          </motion.div>
        </section>
      </AnimatedSection>
    );
  },
);
