import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import { Product } from '../types';

export default function CustomBundleBuilder() {
  const { products, addToCart } = useStore();
  const { showToast } = useToast();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [bundleName, setBundleName] = useState('');
  const [showBuilder, setShowBuilder] = useState(false);

  const bundleDiscount = selectedProducts.length >= 5 ? 25 : selectedProducts.length >= 3 ? 20 : selectedProducts.length >= 2 ? 15 : 0;
  const subtotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const discount = subtotal * (bundleDiscount / 100);
  const total = subtotal - discount;

  const handleAddProduct = (product: Product) => {
    if (selectedProducts.find(p => p.id === product.id)) {
      showToast('info', 'Product already in bundle');
      return;
    }
    setSelectedProducts([...selectedProducts, product]);
    showToast('success', `${product.name} added to bundle`);
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const handleCreateBundle = () => {
    if (selectedProducts.length < 2) {
      showToast('error', 'Please add at least 2 products to create a bundle');
      return;
    }

    selectedProducts.forEach(product => {
      addToCart(product);
    });

    showToast('success', `Bundle "${bundleName || 'Custom Bundle'}" added to cart with ${bundleDiscount}% discount!`);
    setSelectedProducts([]);
    setBundleName('');
    setShowBuilder(false);
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
              Build Your Own Bundle
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Create custom bundles and save up to 25%
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowBuilder(!showBuilder)}
          className="px-4 py-2 gradient-bg text-white rounded-lg font-semibold text-sm shadow-lg flex items-center gap-2"
        >
          {showBuilder ? 'Close' : 'Start Building'}
        </motion.button>
      </div>

      {/* Discount Tiers */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { count: 2, discount: 15, color: 'from-blue-400 to-blue-500' },
          { count: 3, discount: 20, color: 'from-purple-400 to-purple-500' },
          { count: 5, discount: 25, color: 'from-pink-400 to-pink-500' }
        ].map((tier, index) => (
          <motion.div
            key={tier.count}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl bg-gradient-to-br ${tier.color} text-white text-center ${
              selectedProducts.length >= tier.count ? 'ring-4 ring-white shadow-xl' : ''
            }`}
          >
            <p className="text-2xl font-bold">{tier.discount}%</p>
            <p className="text-xs">off {tier.count}+ items</p>
          </motion.div>
        ))}
      </div>

      {/* Builder Interface */}
      <AnimatePresence>
        {showBuilder && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            {/* Bundle Name */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Bundle Name (Optional)
              </label>
              <input
                type="text"
                value={bundleName}
                onChange={e => setBundleName(e.target.value)}
                placeholder="e.g., My Favorite Spices, Tea Time Collection"
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
              />
            </div>

            {/* Selected Products */}
            {selectedProducts.length > 0 && (
              <div>
                <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">
                  Your Bundle ({selectedProducts.length} items)
                </h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {selectedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-stone-500 dark:text-stone-400">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveProduct(product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Selection */}
            <div>
              <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">
                Add Products to Bundle
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                {products
                  .filter(p => !selectedProducts.find(sp => sp.id === p.id))
                  .slice(0, 12)
                  .map(product => (
                    <motion.button
                      key={product.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddProduct(product)}
                      className="p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl border-2 border-stone-200 dark:border-stone-600 hover:border-amber-400 transition-all text-left"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-20 object-cover rounded-lg mb-2"
                      />
                      <p className="font-semibold text-stone-900 dark:text-stone-100 text-xs truncate mb-1">
                        {product.name}
                      </p>
                      <p className="text-sm font-bold text-amber-600 dark:text-amber-400">
                        ${product.price.toFixed(2)}
                      </p>
                    </motion.button>
                  ))}
              </div>
            </div>

            {/* Summary & Create Button */}
            {selectedProducts.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-stone-600 dark:text-stone-400">Subtotal:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-stone-600 dark:text-stone-400 flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Bundle Discount ({bundleDiscount}%):
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    -${discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-amber-200 dark:border-amber-800">
                  <span className="font-bold text-stone-900 dark:text-stone-100">Total:</span>
                  <span className="text-2xl font-bold gradient-text">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateBundle}
                  className="w-full mt-4 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add Bundle to Cart
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
