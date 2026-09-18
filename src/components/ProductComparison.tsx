import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

interface Props {
  products: Product[];
  onClose: () => void;
}

export default function ProductComparison({ products, onClose }: Props) {
  const { addToCart } = useStore();
  const { showToast } = useToast();

  if (products.length === 0) return null;

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast('success', `${product.name} added to cart!`);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="bg-white dark:bg-stone-900 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-stone-900 border-b-2 border-stone-200 dark:border-stone-700 p-6 flex items-center justify-between z-10">
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
              Compare Products ({products.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-stone-600 dark:text-stone-400" />
            </button>
          </div>

          {/* Comparison Table */}
          <div className="p-6 overflow-x-auto">
            <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${products.length}, minmax(250px, 1fr))` }}>
              {products.map(product => (
                <div key={product.id} className="space-y-4">
                  {/* Product Image */}
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-stone-200 text-stone-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                        {product.rating}
                      </span>
                      <span className="text-sm text-stone-500">({product.reviews})</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-stone-200 dark:border-stone-700">
                      <span className="text-stone-600 dark:text-stone-400">Price</span>
                      <span className="font-bold text-stone-900 dark:text-stone-100">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-stone-200 dark:border-stone-700">
                      <span className="text-stone-600 dark:text-stone-400">Origin</span>
                      <span className="font-semibold text-stone-900 dark:text-stone-100">{product.origin}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-stone-200 dark:border-stone-700">
                      <span className="text-stone-600 dark:text-stone-400">Weight</span>
                      <span className="font-semibold text-stone-900 dark:text-stone-100">{product.weight}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-stone-200 dark:border-stone-700">
                      <span className="text-stone-600 dark:text-stone-400">Category</span>
                      <span className="font-semibold text-stone-900 dark:text-stone-100">{product.category}</span>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </motion.button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
