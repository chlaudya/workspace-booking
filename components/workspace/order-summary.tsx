'use client';

import { SelectedItem } from '@/lib/workspace-data';
import Image from 'next/image';
import { X, ShoppingCart, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderSummaryProps {
  selectedItems: SelectedItem[];
  totalWeekly: number;
  totalMonthly: number;
  itemCount: number;
  onClearItem: (itemId: string) => void;
  onClearAll: () => void;
}

export function OrderSummary({
  selectedItems,
  totalWeekly,
  totalMonthly,
  itemCount,
  onClearItem,
  onClearAll,
}: OrderSummaryProps) {
  const handleRent = () => {
    // In a real app, this would open a checkout flow
    alert(`Ready to rent ${itemCount} items for $${totalWeekly}/week! 🎉\n\nIn production, this would connect to monis.rent checkout.`);
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Your Setup</h3>
            {itemCount > 0 && (
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          {selectedItems.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="popLayout">
          {selectedItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-8"
            >
              <div className="w-16 h-16 mb-4 rounded-full bg-secondary flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                Add items to build your perfect workspace
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {selectedItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="flex items-center gap-3 p-2 rounded-xl bg-secondary/50 group"
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-background shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      ${item.pricePerWeek}/wk {item.quantity > 1 && `× ${item.quantity}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">
                      ${item.pricePerWeek * item.quantity}
                    </span>
                    <button
                      onClick={() => onClearItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                      aria-label="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Pricing Summary */}
      <div className="p-4 border-t border-border bg-secondary/30">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Weekly</span>
            <span className="font-semibold text-foreground">${totalWeekly}/week</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Monthly estimate</span>
            <span className="font-medium text-foreground">${totalMonthly}/month</span>
          </div>
        </div>

        <button
          onClick={handleRent}
          disabled={selectedItems.length === 0}
          className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2 group"
        >
          Rent This Setup
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="text-xs text-center text-muted-foreground mt-3">
          Free delivery in Bali · Cancel anytime
        </p>
      </div>
    </div>
  );
}
