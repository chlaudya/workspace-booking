"use client";

import { useEffect, useRef, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  pointerWithin,
} from "@dnd-kit/core";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  AnimatedSection,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/animated-section";
import { motionEase, springTransition } from "@/lib/motion";
import Image from "next/image";
import {
  ShoppingCart,
  X,
  Palette,
  Sparkles,
  BadgeCheck,
  Shield,
  Clock3,
  FileCheck2,
  AlertTriangle,
  CalendarCheck2,
  Wifi,
  Code2,
  Video,
} from "lucide-react";
import {
  products,
  categories,
  type Product,
  type Category,
} from "@/lib/workspace-data";
import { useWorkspaceStore } from "@/lib/workspace-store";
import { DraggableItem } from "./draggable-item";
import { DroppableCanvas } from "./droppable-canvas";
import { LandingHero } from "../landing/landing-hero";
import { cn } from "@/lib/utils";

type BookingPhase =
  | "idle"
  | "request-sent"
  | "host-confirmed"
  | "hold-authorized"
  | "contract-signed"
  | "key-handoff";
type CheckoutFlow = "review" | "authorizing" | "confirmed" | "contract" | "signed";

const hostReliability = [
  { label: "Identity", value: "Verified", icon: BadgeCheck },
  { label: "Payment", value: "Verified", icon: Shield },
  { label: "Avg response", value: "< 12 min", icon: Clock3 },
  { label: "Completion rate", value: "98.6%", icon: CalendarCheck2 },
  { label: "Dispute rate", value: "0.7%", icon: AlertTriangle },
];

const trustTimeline = [
  { key: "request-sent" as BookingPhase, label: "Request sent" },
  { key: "host-confirmed" as BookingPhase, label: "Host confirmed" },
  { key: "hold-authorized" as BookingPhase, label: "Payment hold authorized" },
  { key: "contract-signed" as BookingPhase, label: "Contract signed" },
  { key: "key-handoff" as BookingPhase, label: "Key handoff" },
];

const nomadPresets = [
  {
    id: "deep-work",
    title: "Deep Work",
    subtitle: "Focus-heavy coding days",
    icon: Code2,
    productIds: [
      "desk-modern",
      "chair-ergonomic",
      "monitor-27",
      "headphones",
      "lamp",
    ],
  },
  {
    id: "creator",
    title: "Creator Studio",
    subtitle: "Calls, streams, content",
    icon: Video,
    productIds: [
      "desk-modern",
      "chair-ergonomic",
      "monitor-ultrawide",
      "webcam",
      "headphones",
    ],
  },
  {
    id: "minimal-travel",
    title: "Minimal Travel",
    subtitle: "Lean setup, easy move",
    icon: Wifi,
    productIds: [
      "desk-compact",
      "chair-minimal",
      "monitor-27",
      "keyboard",
      "mouse",
    ],
  },
];

export function WorkspaceBuilder() {
  const [activeCategory, setActiveCategory] = useState<Category>("desk");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [checkoutFlow, setCheckoutFlow] = useState<CheckoutFlow>("review");
  const [bookingPhase, setBookingPhase] = useState<BookingPhase>("idle");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [contractAccepted, setContractAccepted] = useState(false);
  const orderSummaryRef = useRef<HTMLDivElement>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>("deep-work");
  const builderRef = useRef<HTMLElement>(null);
  const bookingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  const {
    addItem,
    removeItem,
    removeMostRecentByProduct,
    clearAll,
    getAllItems,
    getTotalWeeklyPrice,
    getItemCount,
    selectedDesk,
    selectedChair,
    placedItems,
  } = useWorkspaceStore();

  const filteredProducts = products.filter(
    (p) => p.category === activeCategory,
  );
  const allItems = getAllItems();
  const baseWeeklyPrice = getTotalWeeklyPrice();
  const serviceFee = Math.round(baseWeeklyPrice * 0.08);
  const refundableDeposit = Math.max(40, Math.round(baseWeeklyPrice * 0.5));
  const weeklyTotal = baseWeeklyPrice + serviceFee + refundableDeposit;
  const itemCount = getItemCount();
  const calendarFreshnessHours = 6;
  const requiresAvailabilityConfirmation = calendarFreshnessHours > 24;

  useEffect(() => {
    return () => {
      if (bookingTimeoutRef.current) {
        clearTimeout(bookingTimeoutRef.current);
      }
    };
  }, []);

  const isItemSelected = (productId: string) => {
    if (selectedDesk?.id === productId) return true;
    if (selectedChair?.id === productId) return true;
    return placedItems.some((item) => item.product.id === productId);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const product = event.active.data.current?.product as Product;
    setActiveProduct(product);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveProduct(null);

    if (event.over?.id === "workspace-canvas") {
      const product = event.active.data.current?.product as Product;
      if (product) addItem(product);
    }
  };

  const handleSlotClick = (category: Category) => {
    setActiveCategory(category);
  };

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

  const handleCheckoutPrimaryAction = () => {
    if (checkoutFlow === "contract") {
      if (!contractAccepted) return;
      setBookingPhase("contract-signed");
      setCheckoutFlow("signed");
      return;
    }
    if (checkoutFlow === "signed") {
      resetCheckoutModal();
      orderSummaryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      return;
    }
    if (checkoutFlow === "confirmed") {
      setCheckoutFlow("contract");
      return;
    }
    handleAuthorizeHold();
  };

  const renderTrustTimeline = (compact = false) => (
    <div className={compact ? "space-y-2" : "space-y-2"}>
      {trustTimeline.map((step, index) => {
        const isReached =
          bookingPhaseIndex >= 0 && bookingPhaseIndex >= index;
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
                  ? "text-foreground font-medium"
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

  const bookingPhaseIndex = trustTimeline.findIndex(
    (step) => step.key === bookingPhase,
  );

  const handleQuickAdd = (product: Product) => {
    // Single-instance (desk/chair): clicking a selected product removes it;
    // clicking a different one in the same category replaces (handled by addItem).
    // Multi-instance: clicking ✓ removes the most-recent placement of THIS product;
    // clicking + adds another (no-op if the category grid is full).
    if (isItemSelected(product.id)) {
      removeMostRecentByProduct(product.id);
      return;
    }
    addItem(product);
  };

  const applyPreset = (presetId: string, productIds: string[]) => {
    setSelectedPreset(presetId);
    clearAll();
    const presetProducts = productIds
      .map((productId) => products.find((product) => product.id === productId))
      .filter((product): product is Product => Boolean(product));

    presetProducts.forEach((product) => addItem(product));
  };

  return (
    <DndContext
      id="workspace-builder-dnd"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
    >
      <div className="min-h-screen bg-background">
        {/* Header */}
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: motionEase }}
          className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
                  whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                  transition={{ duration: 0.2, ease: motionEase }}
                >
                  <Palette className="w-5 h-5 text-primary-foreground" />
                </motion.div>
                <div>
                  <h1 className="font-bold text-xl text-foreground">
                    monis.rent
                  </h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    Workspace Builder
                  </p>
                </div>
              </div>

              {/* Mobile Cart Button */}
              <button
                onClick={() => setShowMobileCart(true)}
                className="lg:hidden relative p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-foreground" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </motion.header>

        {/* Landing Hero */}
        <LandingHero
          onGetStarted={() => {
            builderRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* Main Builder Section */}
        <motion.section
          ref={builderRef}
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: motionEase }}
          className="py-8 lg:py-12 scroll-mt-20"
        >
          <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-6 rounded-2xl border border-border bg-card/80 p-4 lg:p-5">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-primary">
                    NOMAD PRESETS
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start with a proven setup, then customize. Built for remote
                    professionals.
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  500+ active rentals this month
                </span>
              </div>
              <StaggerGroup className="mt-4 grid gap-3 md:grid-cols-3">
                {nomadPresets.map((preset) => (
                  <StaggerItem key={preset.id}>
                    <motion.button
                      onClick={() => applyPreset(preset.id, preset.productIds)}
                      whileHover={reduceMotion ? undefined : { y: -2 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      transition={{ duration: 0.25, ease: motionEase }}
                      className={cn(
                        "w-full rounded-xl border p-3 text-left transition-all duration-300",
                        selectedPreset === preset.id
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background hover:border-primary/30 hover:bg-primary/5",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="rounded-lg bg-primary/10 p-1.5 text-primary">
                          <preset.icon className="w-4 h-4" />
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {preset.title}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {preset.subtitle}
                      </p>
                    </motion.button>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </AnimatedSection>
            <StaggerGroup className="grid lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Product Catalog - Left Sidebar */}
              <StaggerItem className="lg:col-span-3 order-2 lg:order-1">
                <div className="sticky top-24">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm">
                      1
                    </span>
                    Choose Items
                  </h3>
                  <div className="bg-card rounded-2xl border border-border p-4">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 pb-4 border-b border-border mb-4">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                            activeCategory === cat.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary hover:bg-secondary/80 text-foreground",
                          )}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Draggable Products Grid */}
                    <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                      {filteredProducts.map((product) => (
                        <DraggableItem
                          key={product.id}
                          product={product}
                          isSelected={isItemSelected(product.id)}
                          onQuickAdd={() => handleQuickAdd(product)}
                        />
                      ))}
                    </div>

                    {/* Tip */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground text-center">
                        <Sparkles className="w-3 h-3 inline mr-1" />
                        Drag to canvas or click + to add
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Workspace Canvas - Center */}
              <StaggerItem className="lg:col-span-6 order-1 lg:order-2">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm">
                    2
                  </span>
                  Your Workspace
                  {itemCount > 0 && (
                    <button
                      onClick={clearAll}
                      className="ml-auto text-xs text-muted-foreground hover:text-destructive transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </h3>
                <div className="bg-card rounded-2xl border border-border p-4">
                  <DroppableCanvas onSlotClick={handleSlotClick} />
                </div>

                {/* Quick Stats */}
                <StaggerGroup className="mt-4 grid grid-cols-3 gap-4">
                  <StaggerItem className="text-center p-3 rounded-xl bg-card border border-border">
                    <div className="text-2xl font-bold text-primary">
                      {itemCount}
                    </div>
                    <motion.div className="text-xs text-muted-foreground">
                      Items
                    </motion.div>
                  </StaggerItem>
                  <StaggerItem className="text-center p-3 rounded-xl bg-card border border-border">
                    <div className="text-2xl font-bold text-foreground">
                      ${baseWeeklyPrice}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Per Week
                    </div>
                  </StaggerItem>
                  <StaggerItem className="text-center p-3 rounded-xl bg-card border border-border">
                    <div className="text-2xl font-bold text-foreground">
                      ${baseWeeklyPrice * 4}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Per Month
                    </div>
                  </StaggerItem>
                </StaggerGroup>
                <div className="mt-4 rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-semibold tracking-[0.18em] text-primary">
                    AVAILABILITY CONFIDENCE
                  </p>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Calendar freshness
                    </span>
                    <span className="font-semibold text-foreground">
                      Updated {calendarFreshnessHours}h ago
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    No payment collected until host confirms. Every step is
                    time-stamped in your Proof Center.
                  </p>
                </div>
              </StaggerItem>

              {/* Order Summary - Right Sidebar */}
              <StaggerItem className="lg:col-span-3 order-3 hidden lg:block">
                <div ref={orderSummaryRef} className="scroll-mt-24">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm">
                    3
                  </span>
                  Your Order
                </h3>
                <div className="sticky top-24 bg-card rounded-2xl border border-border p-4">
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
                  <div className="space-y-3 max-h-[35vh] overflow-y-auto mb-4">
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
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
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
                              onClick={() => removeItem(item.id)}
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
                      <span className="text-muted-foreground">Service fee</span>
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
                    onClick={() => {
                      setCheckoutFlow("review");
                      setShowCheckout(true);
                      setBookingPhase("request-sent");
                    }}
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
                    <div className="space-y-2">
                      {renderTrustTimeline()}
                    </div>
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
              </StaggerItem>
            </StaggerGroup>
          </motion.div>
        </motion.section>

        {/* Mobile Cart Floating Button */}
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: motionEase }}
              className="lg:hidden fixed bottom-4 left-4 right-4 z-40"
            >
              <motion.button
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                onClick={() => setShowMobileCart(true)}
                className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-lg shadow-primary/30 flex items-center justify-between"
              >
                <span>View Cart ({itemCount} items)</span>
                <span>${weeklyTotal}/week</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Cart Drawer */}
        <AnimatePresence>
          {showMobileCart && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 lg:hidden"
                onClick={() => setShowMobileCart(false)}
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
                    onClick={() => setShowMobileCart(false)}
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
                      {renderTrustTimeline(true)}
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
                    onClick={() => {
                      setCheckoutFlow("review");
                      setBookingPhase("request-sent");
                      setShowMobileCart(false);
                      setShowCheckout(true);
                    }}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold"
                  >
                    Request to Book (No charge yet)
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Footer */}
        <AnimatedSection className="py-8 border-t border-border mt-12 mb-20 lg:mb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-muted-foreground">
              Made for digital nomads in Bali ·{" "}
              <a
                href="https://monis.rent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                monis.rent
              </a>
            </p>
          </div>
        </AnimatedSection>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeProduct && (
          <div className="bg-card border-2 border-primary rounded-xl p-3 shadow-2xl opacity-90 w-28 pointer-events-none">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-secondary/30 mb-2">
              <Image
                src={activeProduct.image}
                alt={activeProduct.name}
                fill
                className="object-contain p-2"
              />
            </div>
            <p className="text-xs font-medium text-foreground truncate">
              {activeProduct.name}
            </p>
          </div>
        )}
      </DragOverlay>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={resetCheckoutModal}
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
                    {renderTrustTimeline(true)}
                    <p className="mt-3 text-xs text-muted-foreground">
                      Next step: key handoff from host.
                    </p>
                  </div>
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
                      onChange={(event) =>
                        setContractAccepted(event.target.checked)
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
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.product.name}</span>
                    <span className="font-medium">
                      ${item.product.pricePerWeek}/wk
                    </span>
                  </div>
                ))}
                <div className="border-t border-border pt-2 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base rent</span>
                    <span className="font-medium">${baseWeeklyPrice}/wk</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service fee</span>
                    <span className="font-medium">${serviceFee}/wk</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deposit hold</span>
                    <span className="font-medium">${refundableDeposit}/wk</span>
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
                  Free cancellation until host confirmation. After confirmation,
                  cancellation follows the signed terms. Every update is logged
                  in your Proof Center for dispute support.
                </p>
              </details>

              <label className="mb-5 flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(event) => setTermsAccepted(event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-muted-foreground">
                  I reviewed the fee breakdown, cancellation policy, and rental
                  terms acknowledgment.
                </span>
              </label>

              {checkoutFlow === "authorizing" && (
                <div className="mb-4 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-primary">
                  Authorizing payment hold now. Deterministic status:{" "}
                  <strong>in-progress</strong>. Expected completion: ~20
                  seconds.
                </div>
              )}

              {checkoutFlow === "confirmed" && (
                <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-700">
                  Host confirmed and payment hold authorized. Contract summary
                  is ready for e-sign.
                </div>
              )}
                </>
              )}

              <div className="flex gap-3">
                {checkoutFlow !== "signed" && (
                  <button
                    onClick={() => {
                      if (checkoutFlow === "contract") {
                        setCheckoutFlow("confirmed");
                        setContractAccepted(false);
                        return;
                      }
                      resetCheckoutModal();
                    }}
                    className="flex-1 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors"
                  >
                    {checkoutFlow === "contract" ? "Back" : "Keep Editing"}
                  </button>
                )}
                <button
                  disabled={
                    checkoutFlow === "signed"
                      ? false
                      : checkoutFlow === "contract"
                        ? !contractAccepted
                        : !termsAccepted || checkoutFlow === "authorizing"
                  }
                  onClick={handleCheckoutPrimaryAction}
                  className={cn(
                    checkoutFlow === "signed" ? "w-full" : "flex-1",
                    "py-3 rounded-xl font-semibold transition-colors",
                    checkoutFlow !== "signed" &&
                      (checkoutFlow === "contract"
                        ? !contractAccepted
                        : !termsAccepted || checkoutFlow === "authorizing")
                      ? "bg-secondary text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:bg-primary/90",
                  )}
                >
                  {checkoutFlow === "signed"
                    ? "Done"
                    : checkoutFlow === "contract"
                      ? "Sign Contract"
                      : checkoutFlow === "confirmed"
                        ? "Continue to Contract"
                        : "Authorize Hold"}
                </button>
              </div>

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
    </DndContext>
  );
}
