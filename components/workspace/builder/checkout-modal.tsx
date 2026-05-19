"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";
import { FileCheck2 } from "lucide-react";
import { springTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { TrustTimeline } from "./trust-timeline";
import type { BookingPhase, CheckoutFlow, PlacedWorkspaceItem, PricingSummary } from "./types";

type CheckoutModalProps = PricingSummary & {
  open: boolean;
  checkoutFlow: CheckoutFlow;
  bookingPhase: BookingPhase;
  allItems: PlacedWorkspaceItem[];
  termsAccepted: boolean;
  contractAccepted: boolean;
  isCheckoutLoading: boolean;
  primaryButtonDisabled: boolean;
  primaryButtonLabel: string;
  onClose: () => void;
  onPrimaryAction: () => void;
  onTermsChange: (accepted: boolean) => void;
  onContractChange: (accepted: boolean) => void;
  onBackFromContract: () => void;
};

export function CheckoutModal({
  open,
  checkoutFlow,
  bookingPhase,
  allItems,
  itemCount,
  baseWeeklyPrice,
  serviceFee,
  refundableDeposit,
  weeklyTotal,
  termsAccepted,
  contractAccepted,
  isCheckoutLoading,
  primaryButtonDisabled,
  primaryButtonLabel,
  onClose,
  onPrimaryAction,
  onTermsChange,
  onContractChange,
  onBackFromContract,
}: CheckoutModalProps) {
  return (
    <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              if (isCheckoutLoading) return;
              onClose();
            }}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={springTransition}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <h3 className="font-serif text-2xl text-foreground mb-2">
                {checkoutFlow === "signed"
                  ? "Contract Signed"
                  : checkoutFlow === "contract"
                    ? "Contract Summary"
                    : "Request to Book"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {checkoutFlow === "signed"
                  ? "Your rental agreement is archived in Proof Center with a timestamp."
                  : checkoutFlow === "contract"
                    ? "Review the rental terms below. Your signature is recorded in Proof Center with a timestamp."
                    : `Your workspace includes ${itemCount} items. No charge is captured until the host confirms.`}
              </p>

              {checkoutFlow === "signed" ? (
                <div className="mb-6 space-y-4">
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
                      <FileCheck2 className="h-7 w-7 text-emerald-600" />
                    </div>
                    <p className="font-semibold text-emerald-800">
                      Contract signed successfully
                    </p>
                    <p className="mt-2 text-sm text-emerald-700">
                      {itemCount} items · ${weeklyTotal}/week · archived in
                      Proof Center
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-background/70 p-4">
                    <p className="text-xs font-semibold tracking-[0.18em] text-primary mb-3">
                      TRUST TIMELINE
                    </p>
                    <TrustTimeline bookingPhase={bookingPhase} compact />
                    <p className="mt-3 text-xs text-muted-foreground">
                      Next step: key handoff from host.
                    </p>
                  </div>
                </div>
              ) : checkoutFlow === "signing" ? (
                <div className="mb-6 flex flex-col items-center justify-center rounded-xl border border-border bg-background/70 px-6 py-10 text-center">
                  <Spinner className="size-8 text-primary" />
                  <p className="mt-4 font-semibold text-foreground">
                    Signing contract
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Recording your e-signature in Proof Center...
                  </p>
                </div>
              ) : checkoutFlow === "contract" ? (
                <>
                  <div className="mb-4 rounded-xl border border-border bg-background/70 p-4 text-sm space-y-3">
                    <p className="font-semibold text-foreground">
                      Weekly rental agreement
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1.5 text-xs">
                      <li>
                        {itemCount} workspace items at ${weeklyTotal}/week
                        (rent, service fee, and deposit hold).
                      </li>
                      <li>
                        Deposit hold is released after inspection at end of
                        term, minus documented damage.
                      </li>
                      <li>
                        Free cancellation until host confirmation; afterward,
                        terms in the cancellation policy apply.
                      </li>
                    </ul>
                    <div className="border-t border-border pt-3 space-y-1 text-xs">
                      {allItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-muted-foreground"
                        >
                          <span>{item.product.name}</span>
                          <span>${item.product.pricePerWeek}/wk</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-semibold text-foreground pt-1">
                        <span>Total</span>
                        <span className="text-primary">
                          ${weeklyTotal}/week
                        </span>
                      </div>
                    </div>
                  </div>

                  <label className="mb-5 flex items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={contractAccepted}
                      onChange={(event) => onContractChange(event.target.checked)
                      }
                      className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-muted-foreground">
                      I agree to sign this contract electronically and
                      understand it is binding once submitted.
                    </span>
                  </label>
                </>
              ) : (
                <>
                  <div className="mb-4 rounded-xl border border-border bg-background/70 p-3 text-xs text-muted-foreground space-y-1">
                    <p className="font-semibold text-foreground">
                      What happens next
                    </p>
                    <p>1. Request sent to host</p>
                    <p>2. Hold authorization (ETA ~20s after confirmation)</p>
                    <p>3. Contract summary review and e-sign</p>
                  </div>

                  <div className="space-y-2 mb-6 max-h-48 overflow-y-auto">
                    {allItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span>{item.product.name}</span>
                        <span className="font-medium">
                          ${item.product.pricePerWeek}/wk
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-border pt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base rent</span>
                        <span className="font-medium">
                          ${baseWeeklyPrice}/wk
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Service fee
                        </span>
                        <span className="font-medium">${serviceFee}/wk</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Deposit hold
                        </span>
                        <span className="font-medium">
                          ${refundableDeposit}/wk
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-primary">${weeklyTotal}/week</span>
                    </div>
                  </div>

                  <details className="mb-4 rounded-xl border border-border p-3 text-sm">
                    <summary className="cursor-pointer font-medium text-foreground">
                      Cancellation and protection policy
                    </summary>
                    <p className="mt-2 text-muted-foreground">
                      Free cancellation until host confirmation. After
                      confirmation, cancellation follows the signed terms. Every
                      update is logged in your Proof Center for dispute support.
                    </p>
                  </details>

                  <label className="mb-5 flex items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(event) => onTermsChange(event.target.checked)
                      }
                      className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-muted-foreground">
                      I reviewed the fee breakdown, cancellation policy, and
                      rental terms acknowledgment.
                    </span>
                  </label>

                  {checkoutFlow === "authorizing" && (
                    <div className="mb-4 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-primary">
                      <div className="flex items-center gap-2">
                        <Spinner className="size-3.5 shrink-0" />
                        <span>
                          Authorizing payment hold. Expected completion: ~20
                          seconds.
                        </span>
                      </div>
                    </div>
                  )}

                  {checkoutFlow === "confirmed" && (
                    <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-700">
                      Host confirmed and payment hold authorized. Contract
                      summary is ready for e-sign.
                    </div>
                  )}
                </>
              )}

              {checkoutFlow !== "signing" && (
                <div className="flex gap-3">
                  {checkoutFlow !== "signed" && (
                    <button
                      disabled={isCheckoutLoading}
                      onClick={() => {
                        if (checkoutFlow === "contract") {
                          onBackFromContract();
                          return;
                        }
                        onClose();
                      }}
                      className={cn(
                        "flex-1 py-3 rounded-xl border border-border text-foreground font-medium transition-colors",
                        isCheckoutLoading
                          ? "cursor-not-allowed opacity-50"
                          : "hover:bg-secondary",
                      )}
                    >
                      {checkoutFlow === "contract" ? "Back" : "Keep Editing"}
                    </button>
                  )}
                  <button
                    disabled={primaryButtonDisabled}
                    onClick={onPrimaryAction}
                    className={cn(
                      checkoutFlow === "signed" ? "w-full" : "flex-1",
                      "py-3 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2",
                      primaryButtonDisabled && !isCheckoutLoading
                        ? "bg-secondary text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90",
                      isCheckoutLoading && "opacity-90 cursor-wait",
                    )}
                  >
                    {isCheckoutLoading && (
                      <Spinner className="size-4 text-primary-foreground" />
                    )}
                    {primaryButtonLabel}
                  </button>
                </div>
              )}

              <button
                onClick={() =>
                  alert("Issue report started. Support SLA is 24h. (Demo)")
                }
                className="mt-3 w-full py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Report an issue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  );
}
