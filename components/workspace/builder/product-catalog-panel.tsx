"use client";

import { Sparkles } from "lucide-react";
import { StaggerItem } from "@/components/motion/animated-section";
import { categories, type Category, type Product } from "@/lib/workspace-data";
import { cn } from "@/lib/utils";
import { DraggableItem } from "../draggable-item";
import { BuilderStepHeader } from "./builder-step-header";

type ProductCatalogPanelProps = {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  filteredProducts: Product[];
  isItemSelected: (productId: string) => boolean;
  onQuickAdd: (product: Product) => void;
};

export function ProductCatalogPanel({
  activeCategory,
  onCategoryChange,
  filteredProducts,
  isItemSelected,
  onQuickAdd,
}: ProductCatalogPanelProps) {
  return (
    <StaggerItem className="order-2 min-w-0 self-start lg:order-1 lg:col-span-3">
      <div className="sticky top-24">
        <BuilderStepHeader
          step={1}
          title="Choose Items"
          subtitle="Catalog & filters"
        />
        <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-background shadow-inner shadow-black/[0.03] ring-1 ring-border/50">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative border-l-4 border-primary/60 p-4">
            <div className="mb-4 flex flex-wrap gap-2 border-b border-border pb-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onCategoryChange(cat.id)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80",
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid max-h-[50vh] grid-cols-2 gap-3 overflow-y-auto pr-1">
              {filteredProducts.map((product) => (
                <DraggableItem
                  key={product.id}
                  product={product}
                  isSelected={isItemSelected(product.id)}
                  onQuickAdd={() => onQuickAdd(product)}
                />
              ))}
            </div>

            <div className="mt-4 border-t border-border pt-4">
              <p className="text-center text-xs text-muted-foreground">
                <Sparkles className="mr-1 inline h-3 w-3" />
                Drag to canvas or click + to add
              </p>
            </div>
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}
