import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, DollarSign, Star, MapPin, Leaf } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface Props {
  onClose: () => void;
  onViewDetails: (product: Product) => void;
}

export default function AdvancedSearch({ onClose, onViewDetails }: Props) {
  const { products } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Pantry', 'Beverages', 'Spices', 'Confections', 'Oils'];
  const origins = Array.from(new Set(products.map(p => p.origin)));

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesRating = p.rating >= minRating;
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(p.category);
      const matchesOrigin = selectedOrigins.length === 0 || 
        selectedOrigins.some(origin => p.origin.includes(origin));

      return matchesSearch && matchesPrice && matchesRating && matchesCategory && matchesOrigin;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [products, searchQuery, priceRange, minRating, selectedCategories, selectedOrigins, sortBy]);

  const toggleCategory = (category: string) => {
    if (category === 'All') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev => 
        prev.includes(category) 
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    }
  };

  const toggleOrigin = (origin: string) => {
    setSelectedOrigins(prev => 
      prev.includes(origin) 
        ? prev.filter(o => o !== origin)
        : [...prev, origin]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 100]);
    setMinRating(0);
    setSelectedCategories([]);
    setSelectedOrigins([]);
    setSortBy('featured');
  };

  return (
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
        className="bg-white dark:bg-stone-900 rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-stone-900 border-b-2 border-stone-200 dark:border-stone-700 p-6 flex items-center justify-between z-10">
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
            Advanced Search & Filters
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-stone-600 dark:text-stone-400" />
          </button>
        </div>

        <div className="p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-900/30 outline-none transition-all text-lg"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Price Range */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
                  <DollarSign className="w-4 h-4" />
                  Price Range
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-amber-500"
                  />
                  <div className="flex items-center justify-between text-sm text-stone-600 dark:text-stone-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
                  <Star className="w-4 h-4" />
                  Minimum Rating
                </label>
                <div className="space-y-2">
                  {[4, 3, 2, 1, 0].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                        minRating === rating
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-semibold'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span>& Up</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
                  <SlidersHorizontal className="w-4 h-4" />
                  Categories
                </label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        (category === 'All' && selectedCategories.length === 0) || selectedCategories.includes(category)
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-semibold'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Origins */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
                  <MapPin className="w-4 h-4" />
                  Origin
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {origins.slice(0, 10).map(origin => (
                    <button
                      key={origin}
                      onClick={() => toggleOrigin(origin)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedOrigins.includes(origin)
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-semibold'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      {origin}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full py-3 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-semibold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {/* Sort & Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-stone-600 dark:text-stone-400">
                  <span className="font-bold text-stone-900 dark:text-stone-100">{filteredProducts.length}</span> products found
                </p>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold focus:border-amber-400 outline-none"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A-Z</option>
                </select>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={onViewDetails}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Search className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
                  <h3 className="font-serif text-xl font-bold text-stone-700 dark:text-stone-300 mb-2">
                    No products found
                  </h3>
                  <p className="text-stone-500 dark:text-stone-400 mb-6">
                    Try adjusting your filters
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
