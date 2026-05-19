"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Truck, Calendar, Shield, ArrowUpRight } from "lucide-react";
import {
  AnimatedSection,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/animated-section";
import { motionEase } from "@/lib/motion";

const benefits = [
  {
    icon: Truck,
    title: "Same-Day Delivery",
    description: "We deliver and set up your workstation anywhere in Bali.",
    chip: "Free delivery",
    featured: true,
    accent: "from-primary/20 via-primary/5 to-transparent",
  },
  {
    icon: Calendar,
    title: "Flexible Rentals",
    description: "Rent weekly or monthly with no lock-in contracts.",
    chip: "No minimum",
    featured: false,
    accent: "from-accent/25 via-accent/5 to-transparent",
  },
  {
    icon: Shield,
    title: "Verified Rental Protection",
    description:
      "Identity checks, signed terms, and timestamped proof on every booking.",
    chip: "Trust-first",
    featured: false,
    accent: "from-emerald-500/15 via-transparent to-transparent",
  },
];

export function LandingBenefits() {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatedSection>
      <section className="relative overflow-x-clip border-b border-border/60 bg-secondary/40 py-16 sm:py-20">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, oklch(0.55 0.15 145 / 0.04) 0%, transparent 50%)",
          }}
        />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
        />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-accent/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.22em] text-primary">
              WHY MONIS
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Built for nomads who move fast
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three promises that show up in every booking — not buried in fine
              print.
            </p>
          </div>

          <StaggerGroup className="grid gap-4 md:grid-cols-2 md:grid-rows-2 lg:gap-5">
            {benefits.map((benefit, index) => {
              const isFeatured = benefit.featured;
              return (
                <StaggerItem
                  key={benefit.title}
                  className={isFeatured ? "md:row-span-2" : undefined}
                >
                  <motion.article
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    transition={{ duration: 0.3, ease: motionEase }}
                    className={`group relative h-full overflow-hidden rounded-3xl border border-border/80 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg ${
                      isFeatured ? "min-h-[280px] md:min-h-0" : ""
                    }`}
                  >
                    <div
                      aria-hidden
                      className={`absolute inset-0 bg-gradient-to-br ${benefit.accent} opacity-80`}
                    />
                    <motion.div
                      aria-hidden
                      className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-110"
                    />

                    <motion.div
                      className="relative flex h-full flex-col"
                      initial={false}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/90 shadow-sm ring-1 ring-border/60">
                          <benefit.icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                          {benefit.chip}
                        </span>
                      </div>

                      <h3
                        className={`mt-6 font-semibold text-foreground ${
                          isFeatured ? "text-2xl" : "text-lg"
                        }`}
                      >
                        {benefit.title}
                      </h3>
                      <p
                        className={`mt-2 flex-1 leading-relaxed text-muted-foreground ${
                          isFeatured ? "text-base" : "text-sm"
                        }`}
                      >
                        {benefit.description}
                      </p>

                      {isFeatured && (
                        <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                          Bali-wide coverage
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </p>
                      )}

                      {!isFeatured && index === 2 && (
                        <div className="mt-4 flex gap-1">
                          {[1, 2, 3].map((dot) => (
                            <span
                              key={dot}
                              className="h-1 flex-1 rounded-full bg-primary/20"
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </motion.article>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>
    </AnimatedSection>
  );
}
