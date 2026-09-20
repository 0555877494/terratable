import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Star, ShoppingCart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

interface FullTextSearchProps {
  onClose: () => void;
}

export default function FullTextSearch({ onClose }: FullTextSearchProps) {
  const { addToCart } = useStore();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = ['all', 'Pantry', 'Beverages', 'Spices', 'Confections', 'Oils'];

  useEffect(() => {
    performSearch();
  }, [searchQuery, category, priceRange, minRating, inStockOnly, sortBy]);

  const performSearch = async () => {
    setLoading(true);
    
    try {
      let query = supabase
        .from('products')
        .select('*');

      // Text search
      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,origin.ilike.%${searchQuery}%`);
      }

      // Category filter
      if (category !== 'all') {
        query = query.eq('category', category);
      }

      // Price range filter
      query = query.gte('price', priceRange[0]).lte('price', priceRange[1]);

      // Rating filter
      if (minRating > 0) {
        query = query.gte('rating', minRating);
      }

      // Stock filter
      if (inStockOnly) {
        query = query.eq('in_stock', true).gt('stock_count', 0);
      }

      // Sort
      switch (sortBy) {
        case 'price_low':
          query = query.order('price', { ascending: true });
          break;
        case 'price_high':
          query = query.order('price', { ascending: false });
          break;
        case 'rating':
          query = query.order('rating', { ascending: false });
          break;
        case 'name':
          query = query.order('name', { ascending: true });
          break;
        default:
          // Relevance - prioritize matches in name
          if (searchQuery) {
            query = query.order('name', { ascending: true });
          }
      }

      const { data, error } = await query;

      if (error) {
        console.error('Search error:', error);
        showToast('error', 'Search failed. Please try again.');
      } else {
        // Map database fields to Product type
        const mappedProducts: Product[] = (data || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description || '',
          price: p.price,
          originalPrice: p.original_price,
          category: p.category,
          image: p.image,
          rating: p.rating,
          reviews: p.reviews_count,
          origin: p.origin || '',
          weight: p.weight || '',
          inStock: p.in_stock,
          badge: p.badge,
          discount: p.discount,
          stock: p.stock_count
        }));
        setResults(mappedProducts);
      }
    } catch (error) {
      console.error('Search error:', error);
      showToast('error', 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast('success', `${product.name} added to cart!`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setCategory('all');
    setPriceRange([0, 100]);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('relevance');
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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-stone-800 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                Advanced Search
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                {results.length} results found
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

        <div className="p-6">
          {/* Search Input */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, descriptions, origins..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none transition-all text-lg"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  placeholder="Min"
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                />
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  placeholder="Max"
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Minimum Rating
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
              >
                <option value={0}>Any Rating</option>
                <option value={4}>4+ Stars</option>
                <option value={3}>3+ Stars</option>
                <option value={2}>2+ Stars</option>
                <option value={1}>1+ Stars</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
              >
                <option value="relevance">Relevance</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-5 h-5 accent-amber-500"
              />
              <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                In Stock Only
              </span>
            </label>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Clear All Filters
            </button>
          </div>

          {/* Results */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 gradient-bg"></div>
              <p className="mt-4 text-stone-600 dark:text-stone-400">Searching...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
              <p className="text-stone-600 dark:text-stone-400">No products found</p>
              <p className="text-sm text-stone-500 dark:text-stone-500 mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-lg mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mb-3 line-clamp-2">
                      {product.description}
                    </p>
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
                      <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                        {product.rating}
                      </span>
                      <span className="text-sm text-stone-400">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold gradient-text">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.originalPrice && (
                          <p className="text-sm text-stone-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(product)}
                        className="p-3 gradient-bg text-white rounded-xl shadow-lg"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
