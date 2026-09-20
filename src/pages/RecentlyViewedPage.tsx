import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Eye, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import { Product } from '../types';

export default function RecentlyViewedPage() {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const { showToast } = useToast();
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('terra_recently_viewed');
    if (stored) {
      const ids = JSON.parse(stored);
      // In production, this would fetch from database
      // For now, we'll use mock data
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Tuscan Wildflower Honey',
          description: 'Raw, unfiltered honey from Tuscany',
          price: 24.99,
          category: 'Pantry',
          image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop',
          rating: 4.8,
          reviews: 142,
          origin: 'Tuscany, Italy',
          weight: '350g',
          inStock: true,
          badge: 'bestseller'
        },
        {
          id: '2',
          name: 'Japanese Matcha Powder',
          description: 'Ceremonial-grade matcha from Uji, Kyoto',
          price: 38.50,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1515823064-d6e0c0461669?w=400&h=300&fit=crop',
          rating: 4.9,
          reviews: 238,
          origin: 'Uji, Kyoto, Japan',
          weight: '100g',
          inStock: true,
          badge: 'new'
        },
        {
          id: '3',
          name: 'Aged Balsamic Vinegar',
          description: '12-year aged balsamic vinegar from Modena',
          price: 42.00,
          originalPrice: 52.00,
          category: 'Pantry',
          image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82571?w=400&h=300&fit=crop',
          rating: 4.7,
          reviews: 96,
          origin: 'Modena, Italy',
          weight: '250ml',
          inStock: true,
          badge: 'sale',
          discount: 19
        }
      ];
      
      setRecentlyViewed(mockProducts);
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast('success', `${product.name} added to cart!`);
  };

  const handleToggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast('info', 'Removed from wishlist');
    } else {
      addToWishlist(product.id);
      showToast('success', 'Added to wishlist!');
    }
  };

  const handleRemove = (productId: string) => {
    const updated = recentlyViewed.filter(p => p.id !== productId);
    setRecentlyViewed(updated);
    localStorage.setItem('terra_recently_viewed', JSON.stringify(updated.map(p => p.id)));
    showToast('success', 'Removed from recently viewed');
  };

  const handleClearAll = () => {
    setRecentlyViewed([]);
    localStorage.removeItem('terra_recently_viewed');
    showToast('success', 'Recently viewed cleared');
  };

  if (recentlyViewed.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Eye className="w-20 h-20 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <h2 className="font-serif text-2xl font-bold text-stone-700 dark:text-stone-300 mb-2">
            No Recently Viewed Products
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mb-6">
            Start browsing to see your recently viewed products here
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg"
          >
            Browse Products
          </motion.button>
        </motion.div>
      </div>
    );
  }

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
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100">
                Recently Viewed
              </h1>
            </div>
            <p className="text-stone-600 dark:text-stone-400">
              {recentlyViewed.length} product{recentlyViewed.length !== 1 ? 's' : ''} in your history
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearAll}
            className="px-6 py-3 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Clear All
          </motion.button>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recentlyViewed.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                    product.badge === 'new' ? 'bg-emerald-500 text-white' :
                    product.badge === 'sale' ? 'bg-rose-500 text-white' :
                    product.badge === 'bestseller' ? 'bg-amber-500 text-white' :
                    'bg-purple-500 text-white'
                  }`}>
                    {product.badge === 'new' && '✨ New'}
                    {product.badge === 'sale' && `🔥 ${product.discount}% OFF`}
                    {product.badge === 'bestseller' && '⭐ Bestseller'}
                    {product.badge === 'limited' && '💎 Limited'}
                  </span>
                </div>
              )}

              {/* Remove Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRemove(product.id)}
                className="absolute top-3 right-3 w-10 h-10 bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-5 h-5 text-stone-700 dark:text-stone-300" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Origin */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  {product.origin}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-lg leading-snug mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mb-4">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-amber-400'
                          : 'text-stone-200 dark:text-stone-700'
                      }`}
                    >
                      ★
                    </div>
                  ))}
                </div>
                <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                  {product.rating}
                </span>
                <span className="text-sm text-stone-400">
                  ({product.reviews})
                </span>
              </div>

              {/* Price & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-700">
                <div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold gradient-text">
                      ${product.price.toFixed(2)}
                    </p>
                    {product.originalPrice && (
                      <p className="text-sm text-stone-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleToggleWishlist(product)}
                    className={`p-2 rounded-full transition-colors ${
                      isInWishlist(product.id)
                        ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600'
                        : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-600'
                    }`}
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 gradient-bg text-white rounded-full text-sm font-bold shadow-lg"
                  >
                    Add
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
