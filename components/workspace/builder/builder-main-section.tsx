"use client";

import type { RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Category, Product } from "@/lib/workspace-data";
import { motionEase } from "@/lib/motion";
import type { BookingPhase, PlacedWorkspaceItem, PricingSummary } from "./types";
import { NomadPresetsSection } from "./nomad-presets-section";
import { BuilderGrid } from "./builder-grid";

type BuilderMainSectionProps = PricingSummary & {
  presetsRef: RefObject<HTMLDivElement | null>;
  selectedPreset: string;
  activeCategory: Category;
  filteredProducts: Product[];
  calendarFreshnessHours: number;
  bookingPhase: BookingPhase;
  requiresAvailabilityConfirmation: boolean;
  allItems: PlacedWorkspaceItem[];
  orderSummaryRef: RefObject<HTMLDivElement | null>;
  isItemSelected: (productId: string) => boolean;
  onApplyPreset: (presetId: string, productIds: string[]) => void;
  onCategoryChange: (category: Category) => void;
  onQuickAdd: (product: Product) => void;
  onClearAll: () => void;
  onSlotClick: (category: Category) => void;
  onRemoveItem: (id: string) => void;
  onStartCheckout: () => void;
};

export function BuilderMainSection(props: BuilderMainSectionProps) {
  const reduceMotion = useReducedMotion();
  const { presetsRef, selectedPreset, onApplyPreset, ...gridProps } = props;

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={reduceMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: motionEase }}
      className="scroll-mt-20 overflow-x-clip border-t border-border/60 bg-gradient-to-b from-secondary/30 to-background py-10 lg:py-14"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        <NomadPresetsSection
          presetsRef={presetsRef}
          selectedPreset={selectedPreset}
          onApplyPreset={onApplyPreset}
        />
        <BuilderGrid {...gridProps} />
      </div>
    </motion.section>
  );
}
