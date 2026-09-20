import React from 'react';
import { motion } from 'framer-motion';
import { GitCompare, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

interface ProductComparisonTableProps {
  products: Product[];
}

export default function ProductComparisonTable({ products }: ProductComparisonTableProps) {
  const { addToCart } = useStore();
  const { showToast } = useToast();

  if (products.length === 0) return null;

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast('success', `${product.name} added to cart!`);
  };

  const features = [
    { label: 'Price', getValue: (p: Product) => `$${p.price.toFixed(2)}` },
    { label: 'Rating', getValue: (p: Product) => `⭐ ${p.rating} (${p.reviews})` },
    { label: 'Origin', getValue: (p: Product) => p.origin },
    { label: 'Weight', getValue: (p: Product) => p.weight },
    { label: 'Category', getValue: (p: Product) => p.category },
    { label: 'In Stock', getValue: (p: Product) => p.inStock ? '✓ Yes' : '✗ No' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="flex items-center gap-3">
          <GitCompare className="w-8 h-8" />
          <div>
            <h3 className="font-serif text-2xl font-bold">Product Comparison</h3>
            <p className="text-sm text-white/80">Compare {products.length} products side by side</p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-stone-200 dark:border-stone-700">
              <th className="p-4 text-left text-sm font-semibold text-stone-600 dark:text-stone-400">
                Feature
              </th>
              {products.map(product => (
                <th key={product.id} className="p-4 text-center min-w-[200px]">
                  <div className="flex flex-col items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 rounded-xl object-cover mb-2"
                    />
                    <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                      {product.name}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr
                key={feature.label}
                className={`border-b border-stone-100 dark:border-stone-700 ${
                  index % 2 === 0 ? 'bg-stone-50 dark:bg-stone-700/30' : ''
                }`}
              >
                <td className="p-4 font-semibold text-stone-700 dark:text-stone-300">
                  {feature.label}
                </td>
                {products.map(product => (
                  <td key={product.id} className="p-4 text-center text-stone-900 dark:text-stone-100">
                    {feature.getValue(product)}
                  </td>
                ))}
              </tr>
            ))}
            {/* Add to Cart Row */}
            <tr className="bg-amber-50 dark:bg-amber-900/20">
              <td className="p-4 font-semibold text-stone-700 dark:text-stone-300">
                Action
              </td>
              {products.map(product => (
                <td key={product.id} className="p-4 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 gradient-bg text-white rounded-lg font-semibold text-sm shadow-lg flex items-center gap-2 mx-auto"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </motion.button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
