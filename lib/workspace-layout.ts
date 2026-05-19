import type { Category } from './workspace-data';

/** Top of desk surface in world space (matches Furniture3D Desk component). */
const DESK_Y = 0.72;

/**
 * Pre-authored placement positions per category, sorted by insertion preference.
 * Each new item of a category goes to the next free index in this array.
 * Arrays are hard-capped: when full, the "+ Add" affordance hides.
 */
export const CATEGORY_GRIDS: Record<Category, [number, number, number][]> = {
  desk: [[0, 0, 0]],
  chair: [[0, 0, 1.4]],
  monitor: [
    [0, DESK_Y, -0.4],
    [-0.8, DESK_Y, -0.4],
    [0.8, DESK_Y, -0.4],
  ],
  accessory: [
    [0, DESK_Y, 0.2],
    [0.6, DESK_Y, 0.25],
    [-0.9, DESK_Y, 0.15],
    [-0.4, DESK_Y, 0.4],
    [0.4, DESK_Y, 0.4],
  ],
  lighting: [
    [1.15, DESK_Y, -0.3],
    [-1.15, DESK_Y, -0.3],
    [1.5, 0, -1.4],
  ],
  plant: [
    [-2.2, 0, 0.4],
    [2.2, 0, -0.4],
    [-2.5, 0, -0.8],
    [2.5, 0, 0.6],
  ],
  coffee: [
    [2.2, 0, 0.4],
    [-2.4, 0, 0.7],
  ],
};

const SINGLE_INSTANCE: Category[] = ['desk', 'chair'];

export function isUnlimited(category: Category): boolean {
  return !SINGLE_INSTANCE.includes(category);
}

export function getGridCapacity(category: Category): number {
  return CATEGORY_GRIDS[category].length;
}

export function getPositionFor(
  category: Category,
  index: number
): [number, number, number] {
  const grid = CATEGORY_GRIDS[category];
  const clamped = Math.max(0, Math.min(index, grid.length - 1));
  return grid[clamped];
}
