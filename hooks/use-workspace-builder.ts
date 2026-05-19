'use client';

import { useState, useCallback, useMemo } from 'react';
import { WorkspaceItem, SelectedItem, workspaceItems } from '@/lib/workspace-data';

export function useWorkspaceBuilder() {
  const [selectedItems, setSelectedItems] = useState<Map<string, SelectedItem>>(new Map());

  const addItem = useCallback((item: WorkspaceItem) => {
    setSelectedItems((prev) => {
      const newMap = new Map(prev);
      const existing = newMap.get(item.id);
      
      if (existing) {
        // For desk and chair, only allow one
        if (item.category === 'desk' || item.category === 'chair') {
          return prev;
        }
        newMap.set(item.id, { ...existing, quantity: existing.quantity + 1 });
      } else {
        // If adding a new desk or chair, remove existing ones of same category
        if (item.category === 'desk' || item.category === 'chair') {
          for (const [key, value] of newMap) {
            if (value.category === item.category) {
              newMap.delete(key);
            }
          }
        }
        newMap.set(item.id, { ...item, quantity: 1 });
      }
      return newMap;
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setSelectedItems((prev) => {
      const newMap = new Map(prev);
      const existing = newMap.get(itemId);
      
      if (existing && existing.quantity > 1) {
        newMap.set(itemId, { ...existing, quantity: existing.quantity - 1 });
      } else {
        newMap.delete(itemId);
      }
      return newMap;
    });
  }, []);

  const clearItem = useCallback((itemId: string) => {
    setSelectedItems((prev) => {
      const newMap = new Map(prev);
      newMap.delete(itemId);
      return newMap;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedItems(new Map());
  }, []);

  const totalWeekly = useMemo(() => {
    let total = 0;
    for (const item of selectedItems.values()) {
      total += item.pricePerWeek * item.quantity;
    }
    return total;
  }, [selectedItems]);

  const totalMonthly = useMemo(() => {
    return totalWeekly * 4;
  }, [totalWeekly]);

  const itemCount = useMemo(() => {
    let count = 0;
    for (const item of selectedItems.values()) {
      count += item.quantity;
    }
    return count;
  }, [selectedItems]);

  const getItemQuantity = useCallback((itemId: string) => {
    return selectedItems.get(itemId)?.quantity || 0;
  }, [selectedItems]);

  const hasItem = useCallback((itemId: string) => {
    return selectedItems.has(itemId);
  }, [selectedItems]);

  const getItemsByCategory = useCallback((category: WorkspaceItem['category']) => {
    return workspaceItems.filter((item) => item.category === category);
  }, []);

  const selectedItemsList = useMemo(() => {
    return Array.from(selectedItems.values());
  }, [selectedItems]);

  return {
    selectedItems: selectedItemsList,
    addItem,
    removeItem,
    clearItem,
    clearAll,
    totalWeekly,
    totalMonthly,
    itemCount,
    getItemQuantity,
    hasItem,
    getItemsByCategory,
  };
}
