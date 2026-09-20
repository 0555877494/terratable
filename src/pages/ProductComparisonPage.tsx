import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, Star, ShoppingBag, X, Check } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import { Product } from '../types';

export default function ProductComparisonPage() {
  const { products, addToCart } = useStore();
  const { showToast } = useToast();
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('terra_compare_products');
    if (saved) {
      const ids = JSON.parse(saved);
      const loaded = products.filter(p => ids.includes(p.id));
      setCompareProducts(loaded);
    }
  }, [products]);

  const handleAddToCompare = (product: Product) => {
    if (compareProducts.length >= 4) {
      showToast('error', 'You can only compare up to 4 products');
      return;
    }
    if (compareProducts.find(p => p.id === product.id)) {
      showToast('info', 'Product already in comparison');
      return;
    }
    
    const updated = [...compareProducts, product];
    setCompareProducts(updated);
    localStorage.setItem('terra_compare_products', JSON.stringify(updated.map(p => p.id)));
    showToast('success', `${product.name} added to comparison`);
  };

  const handleRemoveFromCompare = (productId: string) => {
    const updated = compareProducts.filter(p => p.id !== productId);
    setCompareProducts(updated);
    localStorage.setItem('terra_compare_products', JSON.stringify(updated.map(p => p.id)));
    showToast('success', 'Product removed from comparison');
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast('success', `${product.name} added to cart`);
  };

  const clearComparison = () => {
    setCompareProducts([]);
    localStorage.removeItem('terra_compare_products');
    showToast('info', 'Comparison cleared');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              Product Comparison
            </h1>
            <p className="text-stone-600 dark:text-stone-400">
              Compare up to 4 products side by side
            </p>
          </div>
          {compareProducts.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearComparison}
              className="px-6 py-3 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              Clear All
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Comparison Table */}
      {compareProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 overflow-hidden shadow-xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-stone-200 dark:border-stone-700">
                  <th className="text-left p-6 text-sm font-semibold text-stone-600 dark:text-stone-400 w-48">
                    Feature
                  </th>
                  {compareProducts.map(product => (
                    <th key={product.id} className="p-6 text-center min-w-[250px]">
                      <div className="relative">
                        <button
                          onClick={() => handleRemoveFromCompare(product.id)}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10 shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-32 h-32 rounded-xl object-cover mx-auto mb-3 shadow-lg"
                        />
                        <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-stone-500 dark:text-stone-400">
                          {product.origin}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price */}
                <tr className="border-b border-stone-100 dark:border-stone-700">
                  <td className="p-6 font-semibold text-stone-700 dark:text-stone-300">Price</td>
                  {compareProducts.map(product => (
                    <td key={product.id} className="p-6 text-center">
                      <div>
                        <span className="text-2xl font-bold gradient-text">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <div className="text-sm text-stone-400 line-through mt-1">
                            ${product.originalPrice.toFixed(2)}
                          </div>
                        )}
                        {product.discount && (
                          <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                            Save {product.discount}%
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr className="border-b border-stone-100 dark:border-stone-700 bg-stone-50 dark:bg-stone-700/30">
                  <td className="p-6 font-semibold text-stone-700 dark:text-stone-300">Rating</td>
                  {compareProducts.map(product => (
                    <td key={product.id} className="p-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'fill-stone-200 text-stone-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-stone-900 dark:text-stone-100">
                          {product.rating}
                        </span>
                        <span className="text-sm text-stone-500 dark:text-stone-400">
                          ({product.reviews})
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Category */}
                <tr className="border-b border-stone-100 dark:border-stone-700">
                  <td className="p-6 font-semibold text-stone-700 dark:text-stone-300">Category</td>
                  {compareProducts.map(product => (
                    <td key={product.id} className="p-6 text-center text-stone-700 dark:text-stone-300">
                      {product.category}
                    </td>
                  ))}
                </tr>

                {/* Weight */}
                <tr className="border-b border-stone-100 dark:border-stone-700 bg-stone-50 dark:bg-stone-700/30">
                  <td className="p-6 font-semibold text-stone-700 dark:text-stone-300">Weight/Size</td>
                  {compareProducts.map(product => (
                    <td key={product.id} className="p-6 text-center text-stone-700 dark:text-stone-300">
                      {product.weight}
                    </td>
                  ))}
                </tr>

                {/* Stock */}
                <tr className="border-b border-stone-100 dark:border-stone-700">
                  <td className="p-6 font-semibold text-stone-700 dark:text-stone-300">Availability</td>
                  {compareProducts.map(product => (
                    <td key={product.id} className="p-6 text-center">
                      {product.inStock ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold">
                          <Check className="w-4 h-4" />
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-semibold">
                          <X className="w-4 h-4" />
                          Out of Stock
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Badge */}
                <tr className="border-b border-stone-100 dark:border-stone-700 bg-stone-50 dark:bg-stone-700/30">
                  <td className="p-6 font-semibold text-stone-700 dark:text-stone-300">Special</td>
                  {compareProducts.map(product => (
                    <td key={product.id} className="p-6 text-center">
                      {product.badge ? (
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          product.badge === 'new' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                          product.badge === 'sale' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' :
                          product.badge === 'bestseller' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                          'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                        }`}>
                          {product.badge === 'new' && '✨ New'}
                          {product.badge === 'sale' && '🔥 Sale'}
                          {product.badge === 'bestseller' && '⭐ Bestseller'}
                          {product.badge === 'limited' && '💎 Limited'}
                        </span>
                      ) : (
                        <span className="text-stone-400 dark:text-stone-500">-</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Action */}
                <tr>
                  <td className="p-6 font-semibold text-stone-700 dark:text-stone-300">Action</td>
                  {compareProducts.map(product => (
                    <td key={product.id} className="p-6 text-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        Add to Cart
                      </motion.button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700"
        >
          <GitCompare className="w-20 h-20 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <h3 className="font-serif text-2xl font-bold text-stone-700 dark:text-stone-300 mb-2">
            No products to compare
          </h3>
          <p className="text-stone-500 dark:text-stone-400 mb-6">
            Add products to start comparing them side by side
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSelector(true)}
            className="px-8 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg"
          >
            Select Products to Compare
          </motion.button>
        </motion.div>
      )}

      {/* Product Selector Modal */}
      {showSelector && (
        <ProductSelectorModal
          products={products.filter(p => !compareProducts.find(cp => cp.id === p.id))}
          onSelect={handleAddToCompare}
          onClose={() => setShowSelector(false)}
          maxSelections={4 - compareProducts.length}
        />
      )}
    </div>
  );
}

interface ProductSelectorModalProps {
  products: Product[];
  onSelect: (product: Product) => void;
  onClose: () => void;
  maxSelections: number;
}

function ProductSelectorModal({ products, onSelect, onClose, maxSelections }: ProductSelectorModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={onClose}
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
            Select Products to Compare ({maxSelections} remaining)
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-stone-600 dark:text-stone-400" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <motion.button
              key={product.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onSelect(product);
                if (maxSelections <= 1) onClose();
              }}
              className="p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl border-2 border-stone-200 dark:border-stone-600 hover:border-amber-400 transition-all text-left"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm mb-1 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-lg font-bold gradient-text">
                ${product.price.toFixed(2)}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
