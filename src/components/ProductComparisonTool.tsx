import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCompare, X, Plus, Star, ShoppingBag } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import { Product } from '../types';

export default function ProductComparisonTool() {
  const { products, addToCart } = useStore();
  const { showToast } = useToast();
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  const handleAddToCompare = (product: Product) => {
    if (compareProducts.length >= 4) {
      showToast('error', 'You can only compare up to 4 products');
      return;
    }
    if (compareProducts.find(p => p.id === product.id)) {
      showToast('info', 'Product already in comparison');
      return;
    }
    setCompareProducts([...compareProducts, product]);
    showToast('success', `${product.name} added to comparison`);
  };

  const handleRemoveFromCompare = (productId: string) => {
    setCompareProducts(compareProducts.filter(p => p.id !== productId));
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast('success', `${product.name} added to cart`);
  };

  const clearComparison = () => {
    setCompareProducts([]);
    showToast('info', 'Comparison cleared');
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
            <GitCompare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
              Compare Products
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {compareProducts.length}/4 products selected
            </p>
          </div>
        </div>
        {compareProducts.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearComparison}
            className="px-4 py-2 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg font-semibold text-sm hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
          >
            Clear All
          </motion.button>
        )}
      </div>

      {/* Comparison Table */}
      {compareProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-stone-200 dark:border-stone-700">
                <th className="text-left p-4 text-sm font-semibold text-stone-600 dark:text-stone-400">
                  Feature
                </th>
                {compareProducts.map(product => (
                  <th key={product.id} className="p-4 text-center min-w-[200px]">
                    <div className="relative">
                      <button
                        onClick={() => handleRemoveFromCompare(product.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 rounded-xl object-cover mx-auto mb-2"
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
              <tr className="border-b border-stone-100 dark:border-stone-700">
                <td className="p-4 font-semibold text-stone-700 dark:text-stone-300">Price</td>
                {compareProducts.map(product => (
                  <td key={product.id} className="p-4 text-center">
                    <span className="text-xl font-bold gradient-text">
                      ${product.price.toFixed(2)}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-stone-100 dark:border-stone-700">
                <td className="p-4 font-semibold text-stone-700 dark:text-stone-300">Rating</td>
                {compareProducts.map(product => (
                  <td key={product.id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-stone-900 dark:text-stone-100">
                        {product.rating}
                      </span>
                      <span className="text-sm text-stone-500 dark:text-stone-400">
                        ({product.reviews})
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-stone-100 dark:border-stone-700">
                <td className="p-4 font-semibold text-stone-700 dark:text-stone-300">Origin</td>
                {compareProducts.map(product => (
                  <td key={product.id} className="p-4 text-center text-stone-700 dark:text-stone-300">
                    {product.origin}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-stone-100 dark:border-stone-700">
                <td className="p-4 font-semibold text-stone-700 dark:text-stone-300">Weight</td>
                {compareProducts.map(product => (
                  <td key={product.id} className="p-4 text-center text-stone-700 dark:text-stone-300">
                    {product.weight}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-stone-100 dark:border-stone-700">
                <td className="p-4 font-semibold text-stone-700 dark:text-stone-300">Category</td>
                {compareProducts.map(product => (
                  <td key={product.id} className="p-4 text-center text-stone-700 dark:text-stone-300">
                    {product.category}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-stone-700 dark:text-stone-300">Action</td>
                {compareProducts.map(product => (
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
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <GitCompare className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <p className="text-stone-500 dark:text-stone-400 mb-4">
            No products selected for comparison
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSelector(true)}
            className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Select Products to Compare
          </motion.button>
        </div>
      )}

      {/* Product Selector Modal */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setShowSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-stone-800 rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 p-6 flex items-center justify-between z-10">
                <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Select Products to Compare
                </h2>
                <button
                  onClick={() => setShowSelector(false)}
                  className="p-2 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-stone-600 dark:text-stone-400" />
                </button>
              </div>

              <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products
                  .filter(p => !compareProducts.find(cp => cp.id === p.id))
                  .map(product => (
                    <motion.button
                      key={product.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleAddToCompare(product);
                        if (compareProducts.length >= 3) {
                          setShowSelector(false);
                        }
                      }}
                      className="p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl border-2 border-stone-200 dark:border-stone-600 hover:border-amber-400 transition-all text-left"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm mb-1 line-clamp-2">
                        {product.name}
                      </p>
                      <p className="text-lg font-bold gradient-text">
                        ${product.price.toFixed(2)}
                      </p>
                    </motion.button>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
