import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const stepBadgeClassName =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary shadow-sm";

type BuilderStepHeaderProps = {
  step: number;
  title: string;
  subtitle: string;
  className?: string;
  action?: ReactNode;
};

export function BuilderStepHeader({
  step,
  title,
  subtitle,
  className,
  action,
}: BuilderStepHeaderProps) {
  return (
    <h3
      className={cn(
        "mb-4 flex items-center gap-3 text-lg font-semibold text-foreground",
        className,
      )}
    >
      <span className={stepBadgeClassName}>{step}</span>
      <span className="min-w-0 flex-1">
        {title}
        <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
          {subtitle}
        </span>
      </span>
      {action}
    </h3>
  );
}
