import { create } from 'zustand';
import type { Category, Product } from './workspace-data';
import { products } from './workspace-data';
import { getGridCapacity, isUnlimited } from './workspace-layout';

/** Default nomad preset applied on first load (Deep Work). */
export const DEFAULT_PRESET_ID = 'deep-work';
const DEFAULT_PRESET_PRODUCT_IDS = [
  'desk-modern',
  'chair-ergonomic',
  'monitor-27',
  'headphones',
  'lamp',
] as const;

function buildPresetState(productIds: readonly string[]) {
  let selectedDesk: Product | null = null;
  let selectedChair: Product | null = null;
  const placedItems: PlacedItem[] = [];

  for (const productId of productIds) {
    const product = products.find((p) => p.id === productId);
    if (!product) continue;

    if (product.category === 'desk') {
      selectedDesk = product;
    } else if (product.category === 'chair') {
      selectedChair = product;
    } else {
      placedItems.push({
        id: `${product.id}-preset-${placedItems.length}`,
        product,
      });
    }
  }

  return { selectedDesk, selectedChair, placedItems };
}

export interface PlacedItem {
  /** Unique placement id (one per occurrence in the scene). */
  id: string;
  product: Product;
}

interface WorkspaceState {
  placedItems: PlacedItem[];
  selectedDesk: Product | null;
  selectedChair: Product | null;

  addItem: (product: Product) => void;
  removeItem: (placementId: string) => void;
  removeMostRecentByProduct: (productId: string) => void;
  clearAll: () => void;

  /** Insertion-order list of placements within a category (excludes desk/chair). */
  getCategoryItems: (category: Category) => PlacedItem[];
  /** All visible placements including the synthetic desk/chair entries. */
  getAllItems: () => PlacedItem[];
  getTotalWeeklyPrice: () => number;
  getItemCount: () => number;
}

function deskPlacement(product: Product): PlacedItem {
  return { id: `desk-${product.id}`, product };
}

function chairPlacement(product: Product): PlacedItem {
  return { id: `chair-${product.id}`, product };
}

const initialPresetState = buildPresetState(DEFAULT_PRESET_PRODUCT_IDS);

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  ...initialPresetState,

  addItem: (product) => {
    if (product.category === 'desk') {
      set({ selectedDesk: product });
      return;
    }
    if (product.category === 'chair') {
      set({ selectedChair: product });
      return;
    }

    if (!isUnlimited(product.category)) return;

    const state = get();
    const current = state.placedItems.filter(
      (i) => i.product.category === product.category
    );
    if (current.length >= getGridCapacity(product.category)) return;

    const newItem: PlacedItem = {
      id: `${product.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      product,
    };
    set({ placedItems: [...state.placedItems, newItem] });
  },

  removeItem: (placementId) => {
    const state = get();
    if (placementId === `desk-${state.selectedDesk?.id ?? ''}`) {
      set({ selectedDesk: null });
      return;
    }
    if (placementId === `chair-${state.selectedChair?.id ?? ''}`) {
      set({ selectedChair: null });
      return;
    }
    set({
      placedItems: state.placedItems.filter((i) => i.id !== placementId),
    });
  },

  removeMostRecentByProduct: (productId) => {
    const state = get();
    if (state.selectedDesk?.id === productId) {
      set({ selectedDesk: null });
      return;
    }
    if (state.selectedChair?.id === productId) {
      set({ selectedChair: null });
      return;
    }
    const matches = state.placedItems
      .map((item, idx) => ({ item, idx }))
      .filter(({ item }) => item.product.id === productId);
    if (matches.length === 0) return;
    const lastIdx = matches[matches.length - 1].idx;
    set({
      placedItems: state.placedItems.filter((_, i) => i !== lastIdx),
    });
  },

  clearAll: () =>
    set({
      placedItems: [],
      selectedDesk: null,
      selectedChair: null,
    }),

  getCategoryItems: (category) => {
    return get().placedItems.filter((i) => i.product.category === category);
  },

  getAllItems: () => {
    const state = get();
    const items: PlacedItem[] = [];
    if (state.selectedDesk) items.push(deskPlacement(state.selectedDesk));
    items.push(...state.placedItems);
    if (state.selectedChair) items.push(chairPlacement(state.selectedChair));
    return items;
  },

  getTotalWeeklyPrice: () => {
    const state = get();
    let total = 0;
    if (state.selectedDesk) total += state.selectedDesk.pricePerWeek;
    if (state.selectedChair) total += state.selectedChair.pricePerWeek;
    state.placedItems.forEach((item) => {
      total += item.product.pricePerWeek;
    });
    return total;
  },

  getItemCount: () => get().getAllItems().length,
}));
