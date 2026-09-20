import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag, Star } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import { Product } from '../types';

interface ProductRecommendationsProps {
  currentProductId?: string;
  category?: string;
  limit?: number;
}

export default function ProductRecommendations({ 
  currentProductId, 
  category,
  limit = 4 
}: ProductRecommendationsProps) {
  const { products, addToCart } = useStore();
  const { showToast } = useToast();
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    generateRecommendations();
  }, [currentProductId, category, products]);

  const generateRecommendations = () => {
    let recommended: Product[] = [];

    // Strategy 1: Same category
    if (category) {
      recommended = products.filter(p => 
        p.category === category && 
        p.id !== currentProductId
      );
    }

    // Strategy 2: Based on recently viewed (if available)
    const recentlyViewed = JSON.parse(localStorage.getItem('terra_recently_viewed') || '[]');
    if (recentlyViewed.length > 0 && recommended.length < limit) {
      const viewedCategories = recentlyViewed
        .map((id: string) => products.find(p => p.id === id)?.category)
        .filter(Boolean) as string[];
      
      const categoryCounts = viewedCategories.reduce((acc: Record<string, number>, cat: string) => {
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
      
      if (topCategory) {
        const categoryProducts = products.filter(p => 
          p.category === topCategory && 
          p.id !== currentProductId &&
          !recommended.find(r => r.id === p.id)
        );
        recommended = [...recommended, ...categoryProducts];
      }
    }

    // Strategy 3: Top rated products
    if (recommended.length < limit) {
      const topRated = products
        .filter(p => p.id !== currentProductId && !recommended.find(r => r.id === p.id))
        .sort((a, b) => b.rating - a.rating);
      recommended = [...recommended, ...topRated];
    }

    // Remove duplicates and limit
    const unique = recommended.filter((p, index, self) => 
      index === self.findIndex(t => t.id === p.id)
    );

    setRecommendations(unique.slice(0, limit));
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast('success', `${product.name} added to cart!`);
  };

  if (recommendations.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-amber-200 dark:border-amber-800 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
            Recommended For You
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Based on your preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-stone-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm mb-1 line-clamp-2">
                {product.name}
              </h4>
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-xs text-stone-600 dark:text-stone-400">
                  {product.rating} ({product.reviews})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold gradient-text">
                  ${product.price.toFixed(2)}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAddToCart(product)}
                  className="p-2 gradient-bg text-white rounded-lg shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
