"use client";

import type { RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, X, FileCheck2 } from "lucide-react";
import { StaggerItem } from "@/components/motion/animated-section";
import { cn } from "@/lib/utils";
import { hostReliability } from "./constants";
import { BuilderStepHeader } from "./builder-step-header";
import { TrustTimeline } from "./trust-timeline";
import type { BookingPhase, PricingSummary, PlacedWorkspaceItem } from "./types";

type OrderSummaryPanelProps = PricingSummary & {
  orderSummaryRef: RefObject<HTMLDivElement | null>;
  allItems: PlacedWorkspaceItem[];
  bookingPhase: BookingPhase;
  requiresAvailabilityConfirmation: boolean;
  onRemoveItem: (id: string) => void;
  onStartCheckout: () => void;
};

export function OrderSummaryPanel({
  orderSummaryRef,
  allItems,
  itemCount,
  baseWeeklyPrice,
  serviceFee,
  refundableDeposit,
  weeklyTotal,
  bookingPhase,
  requiresAvailabilityConfirmation,
  onRemoveItem,
  onStartCheckout,
}: OrderSummaryPanelProps) {
  return (
    <StaggerItem className="order-3 hidden min-w-0 self-start lg:col-span-3 lg:block">
      <div ref={orderSummaryRef} className="sticky top-24 min-w-0 scroll-mt-24">
        <BuilderStepHeader step={3} title="Your Order" subtitle="Receipt & checkout" />
        <div className="max-h-[calc(100vh-11rem)] overflow-hidden overflow-x-clip rounded-2xl border-2 border-dashed border-primary/30 bg-card shadow-lg">
                    <div className="border-b border-dashed border-border bg-primary/[0.06] px-4 py-3 text-center">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        monis.rent
                      </p>
                      <p className="text-xs font-semibold text-foreground">
                        Rental estimate
                      </p>
                    </div>
                  <div className="max-h-[calc(100vh-14rem)] overflow-x-clip overflow-y-auto p-4">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      <span className="font-medium text-foreground">
                        Setup Summary
                      </span>
                      <span className="ml-auto bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                        {itemCount} items
                      </span>
                    </div>

                    {/* Items list */}
                    <div className="mb-4 space-y-3">
                      <AnimatePresence mode="popLayout">
                        {allItems.length === 0 ? (
                          <p className="text-sm text-muted-foreground text-center py-8">
                            Your workspace is empty.
                            <br />
                            Start by adding a desk!
                          </p>
                        ) : (
                          allItems.map((item) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50 group"
                            >
                              <div className="w-10 h-10 rounded-lg bg-background overflow-hidden flex-shrink-0">
                                <Image
                                  src={item.product.image}
                                  alt={item.product.name}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {item.product.name}
                                </p>
                                <p className="text-xs text-primary font-semibold">
                                  ${item.product.pricePerWeek}/wk
                                </p>
                              </div>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-2 py-4 border-t border-border">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Base rent</span>
                        <span className="font-semibold text-foreground">
                          ${baseWeeklyPrice}/wk
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Service fee
                        </span>
                        <span className="font-semibold text-foreground">
                          ${serviceFee}/wk
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Refundable deposit hold
                        </span>
                        <span className="font-semibold text-foreground">
                          ${refundableDeposit}/wk
                        </span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t border-border">
                        <span className="text-foreground font-semibold">
                          Total
                        </span>
                        <span className="font-bold text-primary">
                          ${weeklyTotal}/wk
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        No hidden fees. Full breakdown shown before checkout.
                      </p>
                    </div>

                    {/* Rent CTA */}
                    <button
                      type="button"
                      onClick={onStartCheckout}
                      disabled={itemCount === 0}
                      className={cn(
                        "w-full py-3 rounded-xl font-semibold transition-all duration-200",
                        itemCount > 0
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
                          : "bg-secondary text-muted-foreground cursor-not-allowed",
                      )}
                    >
                      {itemCount > 0
                        ? requiresAvailabilityConfirmation
                          ? "Request Availability Confirmation"
                          : "Request to Book (No charge yet)"
                        : "Add items to rent"}
                    </button>

                    {itemCount > 0 && (
                      <div className="text-xs text-center text-muted-foreground mt-3 space-y-1">
                        <p>Free cancellation until host confirms.</p>
                        <p>
                          You&apos;re protected by verified identity and signed
                          rental terms.
                        </p>
                      </div>
                    )}

                    <div className="mt-4 border-t border-border pt-4 space-y-3">
                      <p className="text-xs font-semibold tracking-[0.18em] text-primary">
                        HOST RELIABILITY
                      </p>
                      <div className="space-y-2">
                        {hostReliability.map((metric) => (
                          <div
                            key={metric.label}
                            className="flex items-center justify-between text-xs"
                          >
                            <span className="inline-flex items-center gap-2 text-muted-foreground">
                              <metric.icon className="w-3.5 h-3.5 text-primary" />
                              {metric.label}
                            </span>
                            <span className="font-semibold text-foreground">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {bookingPhase === "contract-signed" && (
                      <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-700">
                        Contract signed and archived in Proof Center. Awaiting
                        key handoff from host.
                      </div>
                    )}

                    <div className="mt-4 border-t border-border pt-4">
                      <p className="text-xs font-semibold tracking-[0.18em] text-primary mb-3">
                        TRUST TIMELINE
                      </p>
                      <div className="space-y-2"><TrustTimeline bookingPhase={bookingPhase} /></div>
                    </div>

                    <div className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground space-y-1">
                      <p className="font-semibold text-foreground inline-flex items-center gap-2">
                        <FileCheck2 className="w-3.5 h-3.5 text-primary" />
                        Proof Center
                      </p>
                      <p>
                        Chat log, receipts, contract history, and inspection
                        photos are saved with timestamps.
                      </p>
                      <p>Dispute response SLA: within 24 hours.</p>
                    </div>
                  </div>
        </div>
      </div>
    </StaggerItem>
  );
}
