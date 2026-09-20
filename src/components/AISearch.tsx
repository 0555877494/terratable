import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, TrendingUp, Clock, Package, Star, ShoppingCart } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { Product } from '../types';

interface AISearchProps {
  onProductSelect: (product: Product) => void;
}

export default function AISearch({ onProductSelect }: AISearchProps) {
  const { products } = useStore();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches] = useState([
    'Organic Honey',
    'Japanese Matcha',
    'Italian Olive Oil',
    'Artisan Chocolate',
    'Premium Saffron'
  ]);

  useEffect(() => {
    // Load recent searches from localStorage
    const stored = localStorage.getItem('terra_recent_searches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      // AI-powered search with semantic matching
      const results = products.filter(product => {
        const searchText = `${product.name} ${product.description} ${product.category} ${product.origin}`.toLowerCase();
        const queryWords = query.toLowerCase().split(' ');
        
        // Semantic matching - check if all query words are found
        const matchScore = queryWords.reduce((score, word) => {
          if (searchText.includes(word)) return score + 1;
          // Check for synonyms
          const synonyms: Record<string, string[]> = {
            'sweet': ['honey', 'chocolate', 'sugar'],
            'spicy': ['pepper', 'spice', 'hot'],
            'healthy': ['organic', 'natural', 'fresh'],
            'premium': ['luxury', 'artisan', 'craft'],
            'italian': ['italy', 'tuscany', 'modena'],
            'japanese': ['japan', 'matcha', 'green tea']
          };
          
          for (const [key, values] of Object.entries(synonyms)) {
            if (word === key && values.some(v => searchText.includes(v))) {
              return score + 0.8;
            }
          }
          
          return score;
        }, 0);

        return matchScore >= queryWords.length * 0.7;
      }).slice(0, 8);

      setSuggestions(results);

      // Generate AI suggestions
      const aiSugg = generateAISuggestions(query, products);
      setAiSuggestions(aiSugg);
    } else {
      setSuggestions([]);
      setAiSuggestions([]);
    }
  }, [query, products]);

  const generateAISuggestions = (query: string, products: Product[]): string[] => {
    const suggestions: string[] = [];
    const queryLower = query.toLowerCase();

    // Category-based suggestions
    if (queryLower.includes('sweet') || queryLower.includes('dessert')) {
      suggestions.push('Try our Artisan Dark Chocolate');
      suggestions.push('Check out Tuscan Wildflower Honey');
    }

    // Origin-based suggestions
    if (queryLower.includes('italian') || queryLower.includes('italy')) {
      suggestions.push('Explore our Italian collection');
      suggestions.push('Try Aged Balsamic Vinegar');
    }

    if (queryLower.includes('japanese') || queryLower.includes('japan')) {
      suggestions.push('Discover Japanese Matcha');
      suggestions.push('Check out our Asian specialties');
    }

    // Price-based suggestions
    if (queryLower.includes('cheap') || queryLower.includes('affordable')) {
      suggestions.push('Browse our budget-friendly options');
    }

    if (queryLower.includes('premium') || queryLower.includes('luxury')) {
      suggestions.push('Explore our premium collection');
      suggestions.push('Try our limited edition items');
    }

    // Rating-based suggestions
    if (queryLower.includes('best') || queryLower.includes('top')) {
      suggestions.push('Check out our bestsellers');
      suggestions.push('See top-rated products');
    }

    return suggestions.slice(0, 3);
  };

  const handleSelect = (product: Product) => {
    // Save to recent searches
    const updated = [product.name, ...recentSearches.filter(s => s !== product.name)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('terra_recent_searches', JSON.stringify(updated));

    onProductSelect(product);
    setIsOpen(false);
    setQuery('');
  };

  const handleTrendingClick = (term: string) => {
    setQuery(term);
    // Simulate search
    const results = products.filter(p => 
      p.name.toLowerCase().includes(term.toLowerCase()) ||
      p.description.toLowerCase().includes(term.toLowerCase())
    ).slice(0, 8);
    setSuggestions(results);
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('terra_recent_searches');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
        <input
          type="text"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search with AI... (e.g., 'sweet italian dessert')"
          className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none transition-all text-lg"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSuggestions([]);
              }}
              className="p-1 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full"
            >
              <X className="w-5 h-5 text-stone-500" />
            </button>
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 shadow-2xl overflow-hidden z-50 max-h-[80vh] overflow-y-auto"
          >
            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && (
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-b border-stone-200 dark:border-stone-700">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-bold text-amber-800 dark:text-amber-200">
                    AI Suggestions
                  </span>
                </div>
                <div className="space-y-2">
                  {aiSuggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 p-2 bg-white dark:bg-stone-700 rounded-lg text-sm text-stone-700 dark:text-stone-300"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {suggestion}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && !query && (
              <div className="p-4 border-b border-stone-200 dark:border-stone-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300">
                    <Clock className="w-4 h-4" />
                    Recent Searches
                  </div>
                  <button
                    onClick={handleClearRecent}
                    className="text-xs text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleTrendingClick(search)}
                      className="px-3 py-1.5 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-sm font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                    >
                      {search}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            {!query && (
              <div className="p-4 border-b border-stone-200 dark:border-stone-700">
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
                  <TrendingUp className="w-4 h-4" />
                  Trending Now
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term, index) => (
                    <motion.button
                      key={term}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleTrendingClick(term)}
                      className="px-3 py-1.5 gradient-bg text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Sparkles className="w-3 h-3 inline mr-1" />
                      {term}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {suggestions.length > 0 && (
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
                  <Package className="w-4 h-4" />
                  Products ({suggestions.length})
                </div>
                <div className="space-y-2">
                  {suggestions.map((product, index) => (
                    <motion.button
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSelect(product)}
                      className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors text-left"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                          {product.origin} • {product.category}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-bold gradient-text">
                            ${product.price.toFixed(2)}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs text-stone-600 dark:text-stone-400">
                              {product.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ShoppingCart className="w-5 h-5 text-stone-400" />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {query && suggestions.length === 0 && (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-600 mb-3" />
                <p className="text-stone-600 dark:text-stone-400 font-semibold">
                  No products found for "{query}"
                </p>
                <p className="text-sm text-stone-500 dark:text-stone-500 mt-1">
                  Try a different search term or use AI suggestions
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
