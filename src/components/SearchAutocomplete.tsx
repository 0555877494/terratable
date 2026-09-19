import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { Product } from '../types';
import { Link } from 'react-router-dom';

export default function SearchAutocomplete() {
  const { products } = useStore();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const suggestions = query.length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.origin.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  const trendingSearches = ['Matcha', 'Saffron', 'Truffle Oil', 'Dark Chocolate', 'Honey'];
  const recentSearches = JSON.parse(localStorage.getItem('terra_recent_searches') || '[]');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (product: Product) => {
    // Save to recent searches
    const recent = [product.name, ...recentSearches.filter((s: string) => s !== product.name)].slice(0, 5);
    localStorage.setItem('terra_recent_searches', JSON.stringify(recent));
    
    setQuery(product.name);
    setIsOpen(false);
    // In a real app, this would navigate to product page
  };

  const handleTrendingClick = (term: string) => {
    setQuery(term);
    setIsOpen(true);
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search artisan foods, origins, categories..."
          className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-900/30 outline-none transition-all text-base"
        />
        {query && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full"
          >
            <X className="w-4 h-4 text-stone-500" />
          </motion.button>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 shadow-2xl overflow-hidden z-50"
          >
            {/* Search Results */}
            {suggestions.length > 0 && (
              <div className="p-3">
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-3 mb-2">
                  Products
                </p>
                {suggestions.map((product, index) => (
                  <motion.button
                    key={product.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelect(product)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                      selectedIndex === index
                        ? 'bg-amber-50 dark:bg-amber-900/20'
                        : 'hover:bg-stone-50 dark:hover:bg-stone-700/50'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {product.origin} • {product.category}
                      </p>
                    </div>
                    <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">
                      ${product.price.toFixed(2)}
                    </span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Trending Searches */}
            {query.length <= 1 && (
              <div className="p-3 border-t border-stone-100 dark:border-stone-700">
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-3 mb-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </p>
                <div className="flex flex-wrap gap-2 px-3">
                  {trendingSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => handleTrendingClick(term)}
                      className="px-3 py-1.5 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && query.length <= 1 && (
              <div className="p-3 border-t border-stone-100 dark:border-stone-700">
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-3 mb-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Recent
                </p>
                <div className="flex flex-wrap gap-2 px-3">
                  {recentSearches.map((term: string) => (
                    <button
                      key={term}
                      onClick={() => handleTrendingClick(term)}
                      className="px-3 py-1.5 bg-stone-50 dark:bg-stone-700/50 text-stone-600 dark:text-stone-400 rounded-full text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {query.length > 1 && suggestions.length === 0 && (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-600 mb-3" />
                <p className="text-stone-600 dark:text-stone-400 font-semibold">
                  No products found for "{query}"
                </p>
                <p className="text-sm text-stone-500 dark:text-stone-500 mt-1">
                  Try a different search term
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
