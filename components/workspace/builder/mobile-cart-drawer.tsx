"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { springTransition } from "@/lib/motion";
import { TrustTimeline } from "./trust-timeline";
import type { BookingPhase, PlacedWorkspaceItem, PricingSummary } from "./types";

type MobileCartDrawerProps = PricingSummary & {
  isOpen: boolean;
  allItems: PlacedWorkspaceItem[];
  bookingPhase: BookingPhase;
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onRequestBook: () => void;
};

export function MobileCartDrawer({
  isOpen,
  allItems,
  itemCount,
  baseWeeklyPrice,
  serviceFee,
  refundableDeposit,
  weeklyTotal,
  bookingPhase,
  onClose,
  onRemoveItem,
  onRequestBook,
}: MobileCartDrawerProps) {
  return (
    <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 lg:hidden"
                onClick={() => onClose()}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={springTransition}
                className="fixed bottom-0 left-0 right-0 z-50 lg:hidden max-h-[80vh] bg-background rounded-t-3xl shadow-2xl"
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">
                    Your Setup ({itemCount} items)
                  </h3>
                  <button
                    onClick={() => onClose()}
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 max-h-[50vh] overflow-y-auto">
                  {allItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2 mb-2 rounded-lg bg-secondary/50"
                    >
                      <div className="w-12 h-12 rounded-lg bg-background overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-primary">
                          ${item.product.pricePerWeek}/wk
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  {bookingPhase !== "idle" && (
                    <div className="mb-4 rounded-xl border border-border bg-secondary/30 p-3">
                      <p className="text-xs font-semibold tracking-[0.18em] text-primary mb-2">
                        BOOKING STATUS
                      </p>
                      {bookingPhase === "contract-signed" && (
                        <p className="mb-2 text-xs text-emerald-700">
                          Contract signed. Awaiting key handoff.
                        </p>
                      )}
                      <TrustTimeline bookingPhase={bookingPhase} compact />
                    </div>
                  )}
                  <div className="space-y-1 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base rent</span>
                      <span className="font-medium">
                        ${baseWeeklyPrice}/week
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Fees + deposit hold
                      </span>
                      <span className="font-medium">
                        ${serviceFee + refundableDeposit}/week
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-border">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-lg">
                        ${weeklyTotal}/week
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onRequestBook}
                    className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground"
                  >
                    Request to Book (No charge yet)
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
  );
}
