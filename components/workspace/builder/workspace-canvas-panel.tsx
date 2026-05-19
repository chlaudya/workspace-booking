"use client";

import { StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import type { Category } from "@/lib/workspace-data";
import { DroppableCanvas } from "../droppable-canvas";
import { BuilderStepHeader } from "./builder-step-header";

type WorkspaceCanvasPanelProps = {
  itemCount: number;
  baseWeeklyPrice: number;
  calendarFreshnessHours: number;
  onClearAll: () => void;
  onSlotClick: (category: Category) => void;
};

export function WorkspaceCanvasPanel({
  itemCount,
  baseWeeklyPrice,
  calendarFreshnessHours,
  onClearAll,
  onSlotClick,
}: WorkspaceCanvasPanelProps) {
  return (
    <StaggerItem className="order-1 min-w-0 self-start lg:order-2 lg:col-span-6">
      <div className="sticky top-24">
        <BuilderStepHeader
          step={2}
          title="Your Workspace"
          subtitle="3D stage — drag & drop"
          className="scroll-mt-24"
          action={
            itemCount > 0 ? (
              <button
                type="button"
                onClick={onClearAll}
                className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
              >
                Clear all
              </button>
            ) : undefined
          }
        />
        <div className="overflow-hidden rounded-3xl bg-gradient-to-b from-foreground/[0.04] to-foreground/[0.08] p-1 shadow-xl ring-1 ring-foreground/10">
          <div className="rounded-[1.35rem] bg-card/95 p-4 backdrop-blur-sm">
            <DroppableCanvas onSlotClick={onSlotClick} />
          </div>
        </div>

        <StaggerGroup className="mt-4 grid grid-cols-3 gap-3">
          <StaggerItem className="rounded-2xl border border-primary/20 bg-primary/10 p-3 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-primary">{itemCount}</div>
            <div className="text-xs font-medium text-primary/80">Items</div>
          </StaggerItem>
          <StaggerItem className="rounded-2xl border border-border/80 bg-background/80 p-3 text-center shadow-sm backdrop-blur-sm">
            <div className="text-2xl font-bold text-foreground">
              ${baseWeeklyPrice}
            </div>
            <div className="text-xs text-muted-foreground">Per Week</div>
          </StaggerItem>
          <StaggerItem className="rounded-2xl border border-border/80 bg-background/80 p-3 text-center shadow-sm backdrop-blur-sm">
            <div className="text-2xl font-bold text-foreground">
              ${baseWeeklyPrice * 4}
            </div>
            <div className="text-xs text-muted-foreground">Per Month</div>
          </StaggerItem>
        </StaggerGroup>

        <div className="mt-4 rounded-2xl border border-dashed border-primary/25 bg-primary/[0.04] p-4">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary">
            AVAILABILITY CONFIDENCE
          </p>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Calendar freshness</span>
            <span className="font-semibold text-foreground">
              Updated {calendarFreshnessHours}h ago
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            No payment collected until host confirms. Every step is time-stamped
            in your Proof Center.
          </p>
        </div>
      </div>
    </StaggerItem>
  );
}
