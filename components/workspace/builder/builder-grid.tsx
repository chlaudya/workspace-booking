"use client";

import { StaggerGroup } from "@/components/motion/animated-section";
import type { Category, Product } from "@/lib/workspace-data";
import type { RefObject } from "react";
import type {
  BookingPhase,
  PlacedWorkspaceItem,
  PricingSummary,
} from "./types";
import { ProductCatalogPanel } from "./product-catalog-panel";
import { WorkspaceCanvasPanel } from "./workspace-canvas-panel";
import { OrderSummaryPanel } from "./order-summary-panel";

type BuilderGridProps = PricingSummary & {
  activeCategory: Category;
  filteredProducts: Product[];
  calendarFreshnessHours: number;
  bookingPhase: BookingPhase;
  requiresAvailabilityConfirmation: boolean;
  allItems: PlacedWorkspaceItem[];
  orderSummaryRef: RefObject<HTMLDivElement | null>;
  isItemSelected: (productId: string) => boolean;
  onCategoryChange: (category: Category) => void;
  onQuickAdd: (product: Product) => void;
  onClearAll: () => void;
  onSlotClick: (category: Category) => void;
  onRemoveItem: (id: string) => void;
  onStartCheckout: () => void;
};

export function BuilderGrid(props: BuilderGridProps) {
  const {
    activeCategory,
    filteredProducts,
    calendarFreshnessHours,
    isItemSelected,
    onCategoryChange,
    onQuickAdd,
    onClearAll,
    onSlotClick,
    orderSummaryRef,
    allItems,
    bookingPhase,
    requiresAvailabilityConfirmation,
    onRemoveItem,
    onStartCheckout,
    itemCount,
    baseWeeklyPrice,
    serviceFee,
    refundableDeposit,
    weeklyTotal,
  } = props;

  return (
    <StaggerGroup className="grid w-full min-w-0 items-start gap-6 lg:grid-cols-12 lg:gap-8">
      <ProductCatalogPanel
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
        filteredProducts={filteredProducts}
        isItemSelected={isItemSelected}
        onQuickAdd={onQuickAdd}
      />
      <WorkspaceCanvasPanel
        itemCount={itemCount}
        baseWeeklyPrice={baseWeeklyPrice}
        calendarFreshnessHours={calendarFreshnessHours}
        onClearAll={onClearAll}
        onSlotClick={onSlotClick}
      />
      <OrderSummaryPanel
        orderSummaryRef={orderSummaryRef}
        allItems={allItems}
        itemCount={itemCount}
        baseWeeklyPrice={baseWeeklyPrice}
        serviceFee={serviceFee}
        refundableDeposit={refundableDeposit}
        weeklyTotal={weeklyTotal}
        bookingPhase={bookingPhase}
        requiresAvailabilityConfirmation={requiresAvailabilityConfirmation}
        onRemoveItem={onRemoveItem}
        onStartCheckout={onStartCheckout}
      />
    </StaggerGroup>
  );
}
