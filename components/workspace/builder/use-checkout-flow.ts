"use client";

import { useEffect, useRef, useState } from "react";
import type { BookingPhase, CheckoutFlow } from "./types";

export function useCheckoutFlow() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutFlow, setCheckoutFlow] = useState<CheckoutFlow>("review");
  const [bookingPhase, setBookingPhase] = useState<BookingPhase>("idle");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [contractAccepted, setContractAccepted] = useState(false);
  const bookingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (bookingTimeoutRef.current) {
        clearTimeout(bookingTimeoutRef.current);
      }
    };
  }, []);

  const resetCheckoutModal = () => {
    setShowCheckout(false);
    setCheckoutFlow("review");
    setTermsAccepted(false);
    setContractAccepted(false);
    if (bookingTimeoutRef.current) {
      clearTimeout(bookingTimeoutRef.current);
      bookingTimeoutRef.current = null;
    }
  };

  const handleAuthorizeHold = () => {
    if (!termsAccepted) return;
    setCheckoutFlow("authorizing");
    setBookingPhase("host-confirmed");
    if (bookingTimeoutRef.current) {
      clearTimeout(bookingTimeoutRef.current);
    }
    bookingTimeoutRef.current = setTimeout(() => {
      setBookingPhase("hold-authorized");
      setCheckoutFlow("confirmed");
    }, 1200);
  };

  const startCheckout = () => {
    setCheckoutFlow("review");
    setShowCheckout(true);
    setBookingPhase("request-sent");
  };

  const handleCheckoutPrimaryAction = (
    scrollToOrderSummary?: () => void,
  ) => {
    if (checkoutFlow === "contract") {
      if (!contractAccepted) return;
      setCheckoutFlow("signing");
      if (bookingTimeoutRef.current) {
        clearTimeout(bookingTimeoutRef.current);
      }
      bookingTimeoutRef.current = setTimeout(() => {
        setBookingPhase("contract-signed");
        setCheckoutFlow("signed");
      }, 900);
      return;
    }
    if (checkoutFlow === "signed") {
      resetCheckoutModal();
      scrollToOrderSummary?.();
      return;
    }
    if (checkoutFlow === "confirmed") {
      setCheckoutFlow("contract");
      return;
    }
    handleAuthorizeHold();
  };

  const isCheckoutLoading =
    checkoutFlow === "authorizing" || checkoutFlow === "signing";

  const primaryButtonDisabled =
    checkoutFlow === "signed"
      ? false
      : isCheckoutLoading
        ? true
        : checkoutFlow === "contract"
          ? !contractAccepted
          : !termsAccepted;

  const primaryButtonLabel =
    checkoutFlow === "signed"
      ? "Done"
      : checkoutFlow === "signing"
        ? "Signing contract..."
        : checkoutFlow === "contract"
          ? "Sign Contract"
          : checkoutFlow === "confirmed"
            ? "Continue to Contract"
            : checkoutFlow === "authorizing"
              ? "Authorizing hold..."
              : "Authorize Hold";

  return {
    showCheckout,
    setShowCheckout,
    checkoutFlow,
    setCheckoutFlow,
    bookingPhase,
    setBookingPhase,
    termsAccepted,
    setTermsAccepted,
    contractAccepted,
    setContractAccepted,
    resetCheckoutModal,
    startCheckout,
    handleCheckoutPrimaryAction,
    isCheckoutLoading,
    primaryButtonDisabled,
    primaryButtonLabel,
  };
}
