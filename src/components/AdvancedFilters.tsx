import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, X, Star, DollarSign, MapPin, Package } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

interface AdvancedFiltersProps {
  onApply: (filters: FilterState) => void;
  onClose: () => void;
}

export interface FilterState {
  priceRange: [number, number];
  rating: number;
  category: string;
  origin: string;
  inStockOnly: boolean;
  sortBy: string;
}

export default function AdvancedFilters({ onApply, onClose }: AdvancedFiltersProps) {
  const { products } = useStore();
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100],
    rating: 0,
    category: 'all',
    origin: 'all',
    inStockOnly: false,
    sortBy: 'featured'
  });

  // Get unique categories and origins
  const categories = ['all', ...new Set(products.map(p => p.category))];
  const origins = ['all', ...new Set(products.map(p => p.origin))];

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      priceRange: [0, 100],
      rating: 0,
      category: 'all',
      origin: 'all',
      inStockOnly: false,
      sortBy: 'featured'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-stone-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                Advanced Filters
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Refine your search
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-stone-600 dark:text-stone-400" />
          </button>
        </div>

        {/* Filters Content */}
        <div className="p-6 space-y-6">
          {/* Price Range */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
              <DollarSign className="w-4 h-4" />
              Price Range
            </label>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={e => setFilters({ ...filters, priceRange: [Number(e.target.value), filters.priceRange[1]] })}
                  placeholder="Min"
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                />
                <span className="text-stone-500">to</span>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={e => setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
                  placeholder="Max"
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.priceRange[1]}
                onChange={e => setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
              <Star className="w-4 h-4" />
              Minimum Rating
            </label>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5].map(rating => (
                <motion.button
                  key={rating}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilters({ ...filters, rating })}
                  className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                    filters.rating === rating
                      ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
                      : 'border-stone-200 dark:border-stone-700 hover:border-amber-300'
                  }`}
                >
                  {rating === 0 ? (
                    <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">Any</span>
                  ) : (
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">+</span>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
              <Package className="w-4 h-4" />
              Category
            </label>
            <select
              value={filters.category}
              onChange={e => setFilters({ ...filters, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Origin Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
              <MapPin className="w-4 h-4" />
              Origin
            </label>
            <select
              value={filters.origin}
              onChange={e => setFilters({ ...filters, origin: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
            >
              {origins.map(origin => (
                <option key={origin} value={origin}>
                  {origin === 'all' ? 'All Origins' : origin}
                </option>
              ))}
            </select>
          </div>

          {/* In Stock Only */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={e => setFilters({ ...filters, inStockOnly: e.target.checked })}
                className="w-5 h-5 accent-amber-500"
              />
              <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                Show only in-stock items
              </span>
            </label>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={e => setFilters({ ...filters, sortBy: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-stone-800 border-t-2 border-stone-200 dark:border-stone-700 p-6 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
            className="flex-1 py-3 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-bold hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
          >
            Reset Filters
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleApply}
            className="flex-1 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg"
          >
            Apply Filters
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
