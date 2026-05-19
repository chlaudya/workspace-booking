'use client';

import type { Category } from '@/lib/workspace-data';
import { CATEGORY_GRIDS } from '@/lib/workspace-layout';
import { cn } from '@/lib/utils';

/**
 * 2D screen positions (% of canvas) per category, sorted by grid index.
 * Index 0 mirrors the previous single-slot position; higher indices are
 * placed visually adjacent along the same arc/lane as the 3D grid.
 */
const CATEGORY_UI_POSITIONS: Record<Category, { left: string; top: string }[]> = {
  desk: [{ left: '50%', top: '54%' }],
  chair: [{ left: '50%', top: '82%' }],
  monitor: [
    { left: '50%', top: '30%' },
    { left: '38%', top: '32%' },
    { left: '62%', top: '32%' },
  ],
  accessory: [
    { left: '50%', top: '64%' },
    { left: '66%', top: '58%' },
    { left: '34%', top: '52%' },
    { left: '42%', top: '68%' },
    { left: '58%', top: '68%' },
  ],
  lighting: [
    { left: '68%', top: '38%' },
    { left: '32%', top: '38%' },
    { left: '72%', top: '22%' },
  ],
  plant: [
    { left: '16%', top: '58%' },
    { left: '84%', top: '42%' },
    { left: '12%', top: '38%' },
    { left: '88%', top: '60%' },
  ],
  coffee: [
    { left: '84%', top: '60%' },
    { left: '16%', top: '40%' },
  ],
};

const CATEGORY_LABELS: Record<Category, string> = {
  desk: '+ Add Desk',
  chair: '+ Add Chair',
  monitor: '+ Add Monitor',
  accessory: '+ Add Gear',
  lighting: '+ Add Lamp',
  plant: '+ Place a Plant',
  coffee: '+ Add Coffee',
};

interface OccupancyMap {
  /** How many placements exist for each category right now. */
  counts: Record<Category, number>;
  /** Whether desk/chair are filled. */
  hasDesk: boolean;
  hasChair: boolean;
}

export function WorkspaceSlotOverlay({
  occupancy,
  onSlotClick,
}: {
  occupancy: OccupancyMap;
  onSlotClick: (category: Category) => void;
}) {
  const buttons: { category: Category; pos: { left: string; top: string } }[] = [];

  (Object.keys(CATEGORY_GRIDS) as Category[]).forEach((category) => {
    if (category === 'desk') {
      if (!occupancy.hasDesk) {
        buttons.push({ category, pos: CATEGORY_UI_POSITIONS[category][0] });
      }
      return;
    }
    if (category === 'chair') {
      if (!occupancy.hasChair) {
        buttons.push({ category, pos: CATEGORY_UI_POSITIONS[category][0] });
      }
      return;
    }
    // Hide hotspot once any item is placed in this category
    const count = occupancy.counts[category] ?? 0;
    if (count > 0) return;
    const pos = CATEGORY_UI_POSITIONS[category][0];
    if (pos) buttons.push({ category, pos });
  });

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {buttons.map(({ category, pos }) => (
        <button
          key={category}
          type="button"
          onClick={() => onSlotClick(category)}
          style={{
            left: pos.left,
            top: pos.top,
            transform: 'translate(-50%, -50%)',
          }}
          className={cn(
            'absolute pointer-events-auto whitespace-nowrap rounded-full border-2 border-dashed px-3 py-1.5',
            'text-xs font-semibold shadow-sm transition-all backdrop-blur-sm',
            'border-stone-400 bg-white/90 text-stone-600',
            'hover:border-primary hover:text-primary hover:bg-primary/5'
          )}
        >
          {CATEGORY_LABELS[category]}
        </button>
      ))}
    </div>
  );
}
