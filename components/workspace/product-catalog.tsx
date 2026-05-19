'use client';

import { WorkspaceItem, categories, Category } from '@/lib/workspace-data';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Plus, Check, Minus } from 'lucide-react';

interface ProductCatalogProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  getItemsByCategory: (category: WorkspaceItem['category']) => WorkspaceItem[];
  onAddItem: (item: WorkspaceItem) => void;
  onRemoveItem: (itemId: string) => void;
  getItemQuantity: (itemId: string) => number;
}

export function ProductCatalog({
  activeCategory,
  onCategoryChange,
  getItemsByCategory,
  onAddItem,
  onRemoveItem,
  getItemQuantity,
}: ProductCatalogProps) {
  const items = getItemsByCategory(activeCategory);

  return (
    <div className="flex flex-col">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-border">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              activeCategory === cat.id
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'bg-card hover:bg-secondary text-foreground'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        {items.map((item) => {
          const quantity = getItemQuantity(item.id);
          const isSelected = quantity > 0;

          return (
            <div
              key={item.id}
              className={cn(
                'group relative bg-card rounded-2xl overflow-hidden border-2 transition-all duration-300',
                isSelected
                  ? 'border-primary shadow-lg shadow-primary/10'
                  : 'border-transparent hover:border-border hover:shadow-md'
              )}
            >
              {item.popular && (
                <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                  Popular
                </div>
              )}

              {/* Image */}
              <div className="relative h-40 bg-secondary/50 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-lg mb-1">{item.name}</h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-primary">${item.pricePerWeek}</span>
                    <span className="text-xs text-muted-foreground">per week</span>
                  </div>

                  {isSelected ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-semibold">{quantity}</span>
                      <button
                        onClick={() => onAddItem(item)}
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                          item.category === 'desk' || item.category === 'chair'
                            ? 'bg-primary/20 text-primary cursor-not-allowed'
                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        )}
                        disabled={item.category === 'desk' || item.category === 'chair'}
                        aria-label="Increase quantity"
                      >
                        {item.category === 'desk' || item.category === 'chair' ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onAddItem(item)}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
