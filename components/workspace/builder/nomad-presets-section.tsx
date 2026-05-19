"use client";

import type { RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AnimatedSection,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/animated-section";
import { motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { nomadPresets } from "./constants";

type NomadPresetsSectionProps = {
  presetsRef: RefObject<HTMLDivElement | null>;
  selectedPreset: string;
  onApplyPreset: (presetId: string, productIds: string[]) => void;
};

export function NomadPresetsSection({
  presetsRef,
  selectedPreset,
  onApplyPreset,
}: NomadPresetsSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div ref={presetsRef} id="nomad-presets" className="scroll-mt-24">
      <AnimatedSection className="relative mb-8 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-card p-1 shadow-lg shadow-primary/5">
        <div className="rounded-[1.35rem] bg-card/95 p-4 backdrop-blur-sm lg:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-primary">
                NOMAD PRESETS
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Start with a proven setup, then customize.
              </p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              500+ active rentals this month
            </span>
          </div>
          <StaggerGroup className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-3">
            {nomadPresets.map((preset) => (
              <StaggerItem key={preset.id} className="flex-1">
                <motion.button
                  type="button"
                  onClick={() => onApplyPreset(preset.id, [...preset.productIds])}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.25, ease: motionEase }}
                  className={cn(
                    "w-full rounded-2xl px-4 py-3.5 text-left transition-all duration-300",
                    selectedPreset === preset.id
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "bg-secondary/80 text-foreground hover:bg-secondary",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-lg p-1.5",
                        selectedPreset === preset.id
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-primary/10 text-primary",
                      )}
                    >
                      <preset.icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold">{preset.title}</span>
                  </div>
                  <p
                    className={cn(
                      "mt-1 text-xs",
                      selectedPreset === preset.id
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground",
                    )}
                  >
                    {preset.subtitle}
                  </p>
                </motion.button>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </AnimatedSection>
    </div>
  );
}
