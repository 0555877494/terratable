import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Snowflake, Sun, Heart, ArrowRight } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import ProductCard from './ProductCard';

export default function SeasonalCollections() {
  const { products } = useStore();

  const collections = [
    {
      id: 'spring',
      name: 'Spring Awakening',
      description: 'Fresh flavors to celebrate the season of renewal',
      icon: <Leaf className="w-8 h-8" />,
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      products: products.slice(0, 3)
    },
    {
      id: 'summer',
      name: 'Summer Vibes',
      description: 'Light, refreshing treats for sunny days',
      icon: <Sun className="w-8 h-8" />,
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      textColor: 'text-amber-700 dark:text-amber-300',
      products: products.slice(1, 4)
    },
    {
      id: 'autumn',
      name: 'Autumn Harvest',
      description: 'Warm, comforting flavors of the harvest season',
      icon: <Leaf className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-700 dark:text-orange-300',
      products: products.slice(2, 5)
    },
    {
      id: 'winter',
      name: 'Winter Warmth',
      description: 'Cozy indulgences for the cold months',
      icon: <Snowflake className="w-8 h-8" />,
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-700 dark:text-blue-300',
      products: products.slice(3, 6)
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-semibold mb-4">
          <Heart className="w-4 h-4" />
          Seasonal Collections
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Curated for <span className="gradient-text">Every Season</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
          Discover hand-picked selections that capture the essence of each season
        </p>
      </motion.div>

      {/* Collections */}
      <div className="space-y-16">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Collection Header */}
            <div className={`${collection.bgColor} rounded-3xl p-8 mb-8 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10 flex items-center gap-6">
                <div className={`w-20 h-20 bg-gradient-to-br ${collection.color} rounded-2xl flex items-center justify-center text-white shadow-xl`}>
                  {collection.icon}
                </div>
                <div>
                  <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                    {collection.name}
                  </h2>
                  <p className="text-stone-600 dark:text-stone-400">
                    {collection.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {collection.products.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={() => {}}
                  index={idx}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 border-2 ${collection.textColor} border-current rounded-full font-bold hover:bg-white/50 dark:hover:bg-stone-800/50 transition-colors inline-flex items-center gap-2`}
              >
                View All {collection.name} Products
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Season */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl p-10 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-4xl font-bold mb-4">
            This Season's Spotlight
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Discover our hand-picked selection of the finest artisan foods, curated specifically for the current season. Each item tells a story of tradition, quality, and passion.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-amber-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2"
          >
            Explore Collection
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
