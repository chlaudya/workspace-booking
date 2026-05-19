"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { motionEase } from "@/lib/motion";

type MobileCartBarProps = {
  itemCount: number;
  weeklyTotal: number;
  onOpen: () => void;
};

export function MobileCartBar({ itemCount, weeklyTotal, onOpen }: MobileCartBarProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: motionEase }}
          className="fixed bottom-4 left-4 right-4 z-40 lg:hidden"
        >
          <motion.button
            type="button"
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            onClick={onOpen}
            className="flex w-full items-center justify-between rounded-2xl bg-primary px-6 py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/30"
          >
            <span>View Cart ({itemCount} items)</span>
            <span>${weeklyTotal}/week</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
