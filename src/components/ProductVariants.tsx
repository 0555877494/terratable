import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Variant {
  id: string;
  name: string;
  price: number;
  stock: number;
  image?: string;
}

interface ProductVariantsProps {
  variants: Variant[];
  selectedVariant: string;
  onSelectVariant: (variantId: string) => void;
  variantType?: 'size' | 'color' | 'package';
}

export default function ProductVariants({ 
  variants, 
  selectedVariant, 
  onSelectVariant,
  variantType = 'size'
}: ProductVariantsProps) {
  const getLabel = () => {
    switch (variantType) {
      case 'size': return 'Select Size';
      case 'color': return 'Select Color';
      case 'package': return 'Select Package';
      default: return 'Select Option';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-stone-700 dark:text-stone-300">
        {getLabel()}
      </label>
      <div className="grid grid-cols-3 gap-3">
        {variants.map((variant) => {
          const isSelected = selectedVariant === variant.id;
          const isOutOfStock = variant.stock === 0;

          return (
            <motion.button
              key={variant.id}
              whileHover={!isOutOfStock ? { scale: 1.05 } : {}}
              whileTap={!isOutOfStock ? { scale: 0.95 } : {}}
              onClick={() => !isOutOfStock && onSelectVariant(variant.id)}
              disabled={isOutOfStock}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                isOutOfStock
                  ? 'border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 opacity-50 cursor-not-allowed'
                  : isSelected
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 shadow-lg'
                  : 'border-stone-200 dark:border-stone-700 hover:border-amber-300 bg-white dark:bg-stone-800'
              }`}
            >
              {/* Selected Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 gradient-bg rounded-full flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}

              {/* Variant Image (if available) */}
              {variant.image && (
                <img
                  src={variant.image}
                  alt={variant.name}
                  className="w-full h-20 object-cover rounded-lg mb-2"
                />
              )}

              {/* Variant Name */}
              <p className={`font-bold text-center mb-1 ${
                isOutOfStock
                  ? 'text-stone-400 dark:text-stone-500'
                  : 'text-stone-900 dark:text-stone-100'
              }`}>
                {variant.name}
              </p>

              {/* Price */}
              <p className={`text-center text-sm ${
                isOutOfStock
                  ? 'text-stone-400 dark:text-stone-500'
                  : 'text-amber-600 dark:text-amber-400 font-semibold'
              }`}>
                ${variant.price.toFixed(2)}
              </p>

              {/* Stock Status */}
              {isOutOfStock && (
                <p className="text-xs text-center text-red-500 dark:text-red-400 mt-1 font-semibold">
                  Out of Stock
                </p>
              )}

              {/* Low Stock Warning */}
              {!isOutOfStock && variant.stock <= 5 && (
                <p className="text-xs text-center text-amber-600 dark:text-amber-400 mt-1">
                  Only {variant.stock} left
                </p>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
