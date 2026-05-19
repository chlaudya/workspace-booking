import { cn } from "@/lib/utils";
import { trustTimeline } from "./constants";
import type { BookingPhase } from "./types";

type TrustTimelineProps = {
  bookingPhase: BookingPhase;
  compact?: boolean;
};

export function TrustTimeline({
  bookingPhase,
  compact = false,
}: TrustTimelineProps) {
  const bookingPhaseIndex = trustTimeline.findIndex(
    (step) => step.key === bookingPhase,
  );

  return (
    <div className="space-y-2">
      {trustTimeline.map((step, index) => {
        const isReached = bookingPhaseIndex >= 0 && bookingPhaseIndex >= index;
        const isCurrent = step.key === bookingPhase;
        return (
          <div key={step.key} className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-full",
                compact ? "h-2 w-2" : "h-2.5 w-2.5",
                isCurrent
                  ? "bg-primary ring-2 ring-primary/30"
                  : isReached
                    ? "bg-primary"
                    : "bg-border",
              )}
            />
            <span
              className={cn(
                "text-xs",
                isCurrent || isReached
                  ? "font-medium text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
