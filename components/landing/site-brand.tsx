"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Palette } from "lucide-react";
import { motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SiteBrandProps = {
  /** Show “Bali workspace rentals” under the wordmark */
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
};

export function SiteBrand({
  showTagline = false,
  className,
  onClick,
}: SiteBrandProps) {
  const reduceMotion = useReducedMotion();

  const logoMark = (
    <motion.div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/85 shadow-md shadow-primary/20 ring-2 ring-primary/15 sm:h-9 sm:w-9"
      whileHover={onClick && !reduceMotion ? { scale: 1.06 } : undefined}
      transition={{ duration: 0.2, ease: motionEase }}
    >
      <Palette className="h-4 w-4 text-primary-foreground" />
    </motion.div>
  );

  const wordmark = (
    <div className="min-w-0 leading-tight">
      <span
        className={cn(
          "block truncate font-serif text-base font-bold tracking-tight text-foreground sm:text-[1.125rem]",
          onClick && "transition-colors group-hover:text-primary",
        )}
      >
        monis.rent
      </span>
      {showTagline && (
        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/75 sm:block">
          Bali workspace rentals
        </span>
      )}
    </div>
  );

  const inner = (
    <>
      {logoMark}
      {wordmark}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "group flex min-w-0 items-center gap-2.5 text-left",
          className,
        )}
      >
        {inner}
      </button>
    );
  }

  return (
    <div className={cn("flex min-w-0 items-center gap-2.5", className)}>
      {inner}
    </div>
  );
}
