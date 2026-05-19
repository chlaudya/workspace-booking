'use client';

import dynamic from 'next/dynamic';
import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { Move } from 'lucide-react';
import { useWorkspaceStore } from '@/lib/workspace-store';
import type { Category } from '@/lib/workspace-data';
import { CATEGORY_GRIDS } from '@/lib/workspace-layout';
import { cn } from '@/lib/utils';
import { WorkspaceSlotOverlay } from './workspace-slot-overlay';

const WorkspaceCanvas3D = dynamic(
  () => import('./workspace-canvas-3d').then((m) => m.WorkspaceCanvas3D),
  {
    ssr: false,
    loading: () => (
      <motion.div className="absolute inset-0 z-0 flex items-center justify-center bg-[#ebe6dc]">
        <motion.div className="h-10 w-10 rounded-full border-2 border-stone-300 border-t-primary animate-spin" />
      </motion.div>
    ),
  }
);

interface DroppableCanvasProps {
  onSlotClick: (category: Category) => void;
}

export function DroppableCanvas({ onSlotClick }: DroppableCanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'workspace-canvas',
  });

  const { getAllItems, selectedDesk, selectedChair, placedItems } =
    useWorkspaceStore();

  const items = getAllItems();
  const hasItems = items.length > 0;

  const counts = (Object.keys(CATEGORY_GRIDS) as Category[]).reduce(
    (acc, c) => {
      acc[c] = placedItems.filter((i) => i.product.category === c).length;
      return acc;
    },
    {} as Record<Category, number>
  );

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'relative w-full h-[420px] lg:h-[480px] rounded-2xl overflow-hidden transition-all duration-300',
        'bg-[#f0ede6]',
        isOver && 'ring-4 ring-primary/40 ring-inset'
      )}
    >
      <WorkspaceCanvas3D items={items} />

      <WorkspaceSlotOverlay
        occupancy={{
          counts,
          hasDesk: !!selectedDesk,
          hasChair: !!selectedChair,
        }}
        onSlotClick={onSlotClick}
      />

      <AnimatePresence>
        {isOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-4 border-2 border-dashed border-primary rounded-xl flex items-center justify-center z-40 bg-primary/5 pointer-events-none"
          >
            <span className="text-primary font-medium bg-white/95 px-4 py-2 rounded-full shadow-lg text-sm">
              Drop to place on workspace
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {!hasItems && !isOver && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <p className="text-sm font-semibold text-stone-700 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm border border-stone-200">
            Design Your Workspace!
          </p>
        </div>
      )}

      {!hasItems && !isOver && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        >
          <p className="text-xs text-stone-500 bg-white/85 px-3 py-1 rounded-full shadow-sm">
            <Move className="w-3 h-3 inline mr-1 -mt-0.5" />
            Click a + slot or drag items from the catalog
          </p>
        </motion.div>
      )}
    </div>
  );
}
