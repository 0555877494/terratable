import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Filter, X } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import ProductCardEnhanced from '../components/ProductCardEnhanced';
import ProductModal from '../components/ProductModal';
import Breadcrumbs from '../components/Breadcrumbs';
import { Product } from '../types';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All',
    minPrice: 0,
    maxPrice: 100,
    minRating: 0,
    inStockOnly: false
  });

  const categories = ['All', 'Pantry', 'Beverages', 'Spices', 'Confections', 'Oils'];

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesSearch = !query || 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.origin.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = filters.category === 'All' || p.category === filters.category;
      const matchesPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      const matchesRating = p.rating >= filters.minRating;
      const matchesStock = !filters.inStockOnly || p.inStock;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // relevance
        if (query) {
          result = [...result].sort((a, b) => {
            const aName = a.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
            const bName = b.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
            return bName - aName;
          });
        }
    }

    return result;
  }, [products, query, filters, sortBy]);

  const clearFilters = () => {
    setFilters({
      category: 'All',
      minPrice: 0,
      maxPrice: 100,
      minRating: 0,
      inStockOnly: false
    });
  };

  const hasActiveFilters = filters.category !== 'All' || 
                           filters.minPrice > 0 || 
                           filters.maxPrice < 100 || 
                           filters.minRating > 0 || 
                           filters.inStockOnly;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            {query ? `Search Results for "${query}"` : 'All Products'}
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </motion.div>

        {/* Search & Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={query}
                onChange={e => setSearchParams({ q: e.target.value })}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none transition-all"
              />
              {query && (
                <button
                  onClick={() => setSearchParams({})}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full"
                >
                  <X className="w-4 h-4 text-stone-500" />
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none cursor-pointer"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A-Z</option>
            </select>

            {/* Filter Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                showFilters || hasActiveFilters
                  ? 'gradient-bg text-white shadow-lg'
                  : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-white text-amber-600 rounded-full text-xs font-bold flex items-center justify-center">
                  ✓
                </span>
              )}
            </motion.button>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-6 border-t border-stone-200 dark:border-stone-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
                        Category
                      </label>
                      <select
                        value={filters.category}
                        onChange={e => setFilters({ ...filters, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
                        Price Range
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={filters.minPrice}
                          onChange={e => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                          placeholder="Min"
                          className="w-full px-3 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                        />
                        <input
                          type="number"
                          value={filters.maxPrice}
                          onChange={e => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                          placeholder="Max"
                          className="w-full px-3 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                        />
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
                        Minimum Rating
                      </label>
                      <select
                        value={filters.minRating}
                        onChange={e => setFilters({ ...filters, minRating: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                      >
                        <option value={0}>Any Rating</option>
                        <option value={4}>4+ Stars</option>
                        <option value={3}>3+ Stars</option>
                        <option value={2}>2+ Stars</option>
                        <option value={1}>1+ Stars</option>
                      </select>
                    </div>

                    {/* In Stock Only */}
                    <div>
                      <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
                        Availability
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.inStockOnly}
                          onChange={e => setFilters({ ...filters, inStockOnly: e.target.checked })}
                          className="w-5 h-5 accent-amber-500"
                        />
                        <span className="text-stone-700 dark:text-stone-300">In Stock Only</span>
                      </label>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <div className="mt-6 flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearFilters}
                        className="px-6 py-2.5 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-semibold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                      >
                        Clear All Filters
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product, index) => (
                <ProductCardEnhanced
                  key={product.id}
                  product={product}
                  onViewDetails={setSelectedProduct}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24"
            >
              <div className="text-7xl mb-6">🔍</div>
              <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3">
                No products found
              </h2>
              <p className="text-stone-600 dark:text-stone-400 mb-6">
                Try adjusting your search or filters
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchParams({});
                  clearFilters();
                }}
                className="px-8 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg"
              >
                Clear Search & Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
