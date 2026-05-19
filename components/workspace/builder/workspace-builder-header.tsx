"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Palette, ShoppingCart } from "lucide-react";
import { motionEase } from "@/lib/motion";

type WorkspaceBuilderHeaderProps = {
  itemCount: number;
  onOpenMobileCart: () => void;
};

export function WorkspaceBuilderHeader({
  itemCount,
  onOpenMobileCart,
}: WorkspaceBuilderHeaderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: motionEase }}
      className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary"
              whileHover={reduceMotion ? undefined : { scale: 1.05 }}
              transition={{ duration: 0.2, ease: motionEase }}
            >
              <Palette className="h-5 w-5 text-primary-foreground" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-foreground">monis.rent</h1>
              <p className="hidden text-xs text-muted-foreground sm:block">
                Workspace Builder
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenMobileCart}
            className="relative rounded-full bg-secondary p-2 transition-colors hover:bg-secondary/80 lg:hidden"
          >
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
