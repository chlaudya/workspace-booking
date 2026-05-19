'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { forwardRef } from 'react';
import {
  ArrowRight,
  Box,
  BadgeCheck,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import {
  AnimatedSection,
  StaggerGroup,
  StaggerItem,
} from '@/components/motion/animated-section';
import { motionEase } from '@/lib/motion';

type Step = {
  number: string;
  title: string;
  description: string;
  outcome: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    number: '01',
    title: 'Pick Your Setup',
    description:
      'Drag desk, chair, monitor, and accessories into the 3D canvas. See your space come together in real time.',
    outcome: 'Live 3D preview',
    icon: Box,
  },
  {
    number: '02',
    title: 'Confirm Rental',
    description:
      'Weekly pricing updates as you build. Drop your pin, pick a slot, and checkout — no hidden fees.',
    outcome: 'Transparent total',
    icon: BadgeCheck,
  },
  {
    number: '03',
    title: 'Start Working',
    description:
      'We deliver, install, and hand off a ready-to-use workstation. Productive the same day.',
    outcome: 'Same-day delivery',
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
        <div
          ref={ref}
          className="relative mt-12 scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-card/70 p-6 lg:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                'radial-gradient(circle at center, var(--border) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/8 blur-3xl"
          />

          <div className="relative">
            <p className="text-center text-xs font-semibold tracking-[0.22em] text-primary">
              HOW IT WORKS
            </p>
            <h2 className="mt-2 text-center font-serif text-2xl font-bold text-foreground lg:text-3xl">
              Go from idea to setup in 3 steps
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted-foreground">
              Under 2 minutes from builder to confirmed booking — with trust
              signals at every step.
            </p>

            <StaggerGroup className="relative mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
              <div
                aria-hidden
                className="absolute left-[16.67%] right-[16.67%] top-8 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block"
              />

              {steps.map((step, index) => (
                <StaggerItem key={step.number}>
                  <motion.div
                    whileHover={reduceMotion ? undefined : { y: -3 }}
                    transition={{ duration: 0.25, ease: motionEase }}
                    className="group relative flex h-full flex-col"
                  >
                    <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center">
                      <div className="absolute inset-0 rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15" />
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-background shadow-sm">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
                        {index + 1}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col rounded-xl border border-border/80 bg-background/90 p-5 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-xs font-semibold tracking-wider text-primary/80">
                          {step.number}
                        </p>
                        <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                          {step.outcome}
                        </span>
                      </div>
                      <h3 className="mt-2 text-base font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>

                    {index < steps.length - 1 && (
                      <div
                        aria-hidden
                        className="absolute -bottom-4 left-1/2 hidden h-8 w-px -translate-x-1/2 bg-gradient-to-b from-primary/30 to-transparent md:hidden"
                      />
                    )}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.2, ease: motionEase }}
              className="relative mt-10 flex flex-col items-center gap-3 border-t border-border/60 pt-8 sm:flex-row sm:justify-center"
            >
              <button
                onClick={onGetStarted}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
              >
                Start Building
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-xs text-muted-foreground">
                No payment captured until host confirms
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    );
  },
);
