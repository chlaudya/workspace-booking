"use client";

import { DragOverlay } from "@dnd-kit/core";
import Image from "next/image";
import type { Product } from "@/lib/workspace-data";

type DragOverlayPreviewProps = {
  activeProduct: Product | null;
};

export function DragOverlayPreview({ activeProduct }: DragOverlayPreviewProps) {
  return (
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
  );
}
