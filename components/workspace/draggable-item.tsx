'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import type { Product } from '@/lib/workspace-data';
import { cn } from '@/lib/utils';

interface DraggableItemProps {
  product: Product;
  isSelected?: boolean;
  onQuickAdd?: () => void;
}

export function DraggableItem({ product, isSelected, onQuickAdd }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: product.id,
    data: { product },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        'group relative bg-card border-2 rounded-xl p-3 cursor-grab active:cursor-grabbing transition-all duration-200',
        isSelected
          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
          : 'border-dashed border-border hover:border-primary/50 hover:bg-secondary/50',
        isDragging && 'shadow-2xl scale-105 z-50'
      )}
    >
      {/* Popular badge */}
      {product.popular && (
        <span className="absolute top-1.5 right-1.5 z-10 rounded-full bg-accent px-2 py-1 text-[10px] font-semibold leading-none text-accent-foreground shadow-sm">
          Popular
        </span>
      )}

      {/* Product Image */}
      <div className="relative aspect-square w-full mb-2 rounded-lg overflow-hidden bg-secondary/30">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2"
          draggable={false}
        />
        
        {/* Drag hint overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-primary bg-background/90 px-2 py-1 rounded-full">
            Drag to add
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <h4 className="font-semibold text-sm text-foreground truncate">{product.name}</h4>
        <p className="text-primary font-bold text-sm">${product.pricePerWeek}/wk</p>
      </div>

      {/* Quick add button */}
      {onQuickAdd && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onQuickAdd();
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          className={cn(
            'absolute bottom-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all z-10 shadow-md',
            isSelected
              ? 'bg-primary/20 text-primary'
              : 'bg-primary text-primary-foreground hover:scale-110'
          )}
        >
          {isSelected ? '✓' : '+'}
        </button>
      )}
    </div>
  );
}
