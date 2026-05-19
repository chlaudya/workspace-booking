"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Code2, Rocket } from "lucide-react";
import {
  AnimatedSection,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/animated-section";
import { motionEase } from "@/lib/motion";

const personas = [
  {
    title: "Remote Engineer",
    detail: "Dual-screen focus with ergonomic support",
    icon: Code2,
  },
  {
    title: "Product Consultant",
    detail: "Client-call ready with premium camera and audio",
    icon: Briefcase,
  },
  {
    title: "Indie Founder",
    detail: "Lean setup that scales week by week",
    icon: Rocket,
  },
];

export function LandingPersonas() {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatedSection>
      <section className="overflow-x-clip border-b border-primary/10 bg-primary/[0.06] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold tracking-[0.22em] text-primary sm:text-base">
            WHO IT&apos;S FOR
          </p>
          <StaggerGroup className="mt-10 flex flex-col gap-6 sm:mt-12 sm:flex-row sm:justify-center sm:gap-8 lg:gap-10">
            {personas.map((profile) => (
              <StaggerItem
                key={profile.title}
                className="sm:flex-1 sm:max-w-md"
              >
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  transition={{ duration: 0.25, ease: motionEase }}
                  className="flex items-start gap-6 rounded-3xl border border-primary/15 bg-background/70 px-8 py-7 shadow-sm backdrop-blur-sm sm:px-9 sm:py-8"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground sm:h-16 sm:w-16">
                    <profile.icon className="h-7 w-7 sm:h-8 sm:w-8" />
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-lg font-semibold text-foreground sm:text-xl">
                      {profile.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {profile.detail}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </AnimatedSection>
  );
}
