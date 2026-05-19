"use client";

import { useRef, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  pointerWithin,
} from "@dnd-kit/core";
import { products, type Category, type Product } from "@/lib/workspace-data";
import { DEFAULT_PRESET_ID, useWorkspaceStore } from "@/lib/workspace-store";
import { LandingHero } from "../landing/landing-hero";
import { smoothScrollTo } from "@/lib/scroll";
import { BuilderMainSection } from "./builder/builder-main-section";
import { WorkspaceBuilderHeader } from "./builder/workspace-builder-header";
import { MobileCartBar } from "./builder/mobile-cart-bar";
import { MobileCartDrawer } from "./builder/mobile-cart-drawer";
import { BuilderFooter } from "./builder/builder-footer";
import { DragOverlayPreview } from "./builder/drag-overlay-preview";
import { CheckoutModal } from "./builder/checkout-modal";
import { useCheckoutFlow } from "./builder/use-checkout-flow";

export function WorkspaceBuilder() {
  const [activeCategory, setActiveCategory] = useState<Category>("desk");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [selectedPreset, setSelectedPreset] =
    useState<string>(DEFAULT_PRESET_ID);

  const orderSummaryRef = useRef<HTMLDivElement>(null);
  const presetsRef = useRef<HTMLDivElement>(null);

  const checkout = useCheckoutFlow();

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
    (product) => product.category === activeCategory,
  );
  const allItems = getAllItems();
  const baseWeeklyPrice = getTotalWeeklyPrice();
  const serviceFee = Math.round(baseWeeklyPrice * 0.08);
  const refundableDeposit = Math.max(40, Math.round(baseWeeklyPrice * 0.5));
  const weeklyTotal = baseWeeklyPrice + serviceFee + refundableDeposit;
  const itemCount = getItemCount();
  const calendarFreshnessHours = 6;
  const requiresAvailabilityConfirmation = calendarFreshnessHours > 24;

  const pricing = {
    baseWeeklyPrice,
    serviceFee,
    refundableDeposit,
    weeklyTotal,
    itemCount,
  };

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

  const handleQuickAdd = (product: Product) => {
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

  const scrollToOrderSummary = () => {
    orderSummaryRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const handleStartCheckout = () => {
    setShowMobileCart(false);
    checkout.startCheckout();
  };

  return (
    <DndContext
      id="workspace-builder-dnd"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
    >
      <div className="min-h-screen overflow-x-clip bg-background">
        <WorkspaceBuilderHeader
          itemCount={itemCount}
          onOpenMobileCart={() => setShowMobileCart(true)}
        />

        <LandingHero onGetStarted={() => smoothScrollTo(presetsRef.current)} />

        <BuilderMainSection
          presetsRef={presetsRef}
          selectedPreset={selectedPreset}
          activeCategory={activeCategory}
          filteredProducts={filteredProducts}
          calendarFreshnessHours={calendarFreshnessHours}
          bookingPhase={checkout.bookingPhase}
          requiresAvailabilityConfirmation={requiresAvailabilityConfirmation}
          allItems={allItems}
          orderSummaryRef={orderSummaryRef}
          isItemSelected={isItemSelected}
          onApplyPreset={applyPreset}
          onCategoryChange={setActiveCategory}
          onQuickAdd={handleQuickAdd}
          onClearAll={clearAll}
          onSlotClick={setActiveCategory}
          onRemoveItem={removeItem}
          onStartCheckout={handleStartCheckout}
          {...pricing}
        />

        <MobileCartBar
          itemCount={itemCount}
          weeklyTotal={weeklyTotal}
          onOpen={() => setShowMobileCart(true)}
        />

        <MobileCartDrawer
          isOpen={showMobileCart}
          allItems={allItems}
          bookingPhase={checkout.bookingPhase}
          onClose={() => setShowMobileCart(false)}
          onRemoveItem={removeItem}
          onRequestBook={handleStartCheckout}
          {...pricing}
        />

        <BuilderFooter />
      </div>

      <DragOverlayPreview activeProduct={activeProduct} />

      <CheckoutModal
        open={checkout.showCheckout}
        checkoutFlow={checkout.checkoutFlow}
        bookingPhase={checkout.bookingPhase}
        allItems={allItems}
        termsAccepted={checkout.termsAccepted}
        contractAccepted={checkout.contractAccepted}
        isCheckoutLoading={checkout.isCheckoutLoading}
        primaryButtonDisabled={checkout.primaryButtonDisabled}
        primaryButtonLabel={checkout.primaryButtonLabel}
        onClose={checkout.resetCheckoutModal}
        onPrimaryAction={() =>
          checkout.handleCheckoutPrimaryAction(scrollToOrderSummary)
        }
        onTermsChange={checkout.setTermsAccepted}
        onContractChange={checkout.setContractAccepted}
        onBackFromContract={() => {
          checkout.setCheckoutFlow("confirmed");
          checkout.setContractAccepted(false);
        }}
        {...pricing}
      />
    </DndContext>
  );
}
