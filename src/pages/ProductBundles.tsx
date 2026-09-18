import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Minus, ShoppingCart, Star, Tag } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

export default function ProductBundles() {
  const { products, addToCart } = useStore();
  const { showToast } = useToast();
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);

  // Define product bundles
  const bundles = [
    {
      id: 'breakfast-essentials',
      name: 'Breakfast Essentials',
      description: 'Start your morning right with our curated breakfast collection',
      products: ['p1', 'p2', 'p5'], // Honey, Matcha, Chocolate
      discount: 15,
      image: 'https://images.unsplash.com/photo-1533920379810-6bed6eee8cfc?w=400&h=300&fit=crop'
    },
    {
      id: 'mediterranean-dream',
      name: 'Mediterranean Dream',
      description: 'Authentic Mediterranean flavors for your kitchen',
      products: ['p1', 'p3', 'p6'], // Honey, Balsamic, Truffle Oil
      discount: 20,
      image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=400&h=300&fit=crop'
    },
    {
      id: 'spice-collection',
      name: 'Spice Collection',
      description: 'Premium spices from around the world',
      products: ['p4', 'p6'], // Saffron, Truffle Oil
      discount: 10,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop'
    },
    {
      id: 'luxury-gift',
      name: 'Luxury Gift Set',
      description: 'The perfect gift for food lovers',
      products: ['p1', 'p3', 'p4', 'p6'], // Honey, Balsamic, Saffron, Truffle Oil
      discount: 25,
      image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop'
    }
  ];

  const calculateBundlePrice = (bundle: typeof bundles[0]) => {
    const bundleProducts = bundle.products.map(id => products.find(p => p.id === id)).filter(Boolean);
    const originalPrice = bundleProducts.reduce((sum, p) => sum + (p?.price || 0), 0);
    const discountedPrice = originalPrice * (1 - bundle.discount / 100);
    return { originalPrice, discountedPrice, savings: originalPrice - discountedPrice };
  };

  const handleAddBundleToCart = (bundle: typeof bundles[0]) => {
    bundle.products.forEach(productId => {
      const product = products.find(p => p.id === productId);
      if (product) {
        addToCart(product);
      }
    });
    showToast('success', `${bundle.name} added to cart! You saved $${calculateBundlePrice(bundle).savings.toFixed(2)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-semibold mb-4">
          <Package className="w-4 h-4" /> Product Bundles
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Save More with <span className="gradient-text">Bundles</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
          Curated collections of our finest products at special bundle prices
        </p>
      </motion.div>

      {/* Bundles Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {bundles.map((bundle, index) => {
          const { originalPrice, discountedPrice, savings } = calculateBundlePrice(bundle);
          const bundleProducts = bundle.products.map(id => products.find(p => p.id === id)).filter(Boolean);

          return (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-stone-800 rounded-3xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300"
            >
              {/* Bundle Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-bold shadow-lg">
                  {bundle.discount}% OFF
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-serif text-2xl font-bold text-white mb-1">{bundle.name}</h3>
                  <p className="text-white/90 text-sm">{bundle.description}</p>
                </div>
              </div>

              {/* Bundle Contents */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">
                    What's Included:
                  </p>
                  <div className="space-y-2">
                    {bundleProducts.map(product => (
                      <div key={product!.id} className="flex items-center gap-3 p-2 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
                        <img
                          src={product!.image}
                          alt={product!.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-stone-800 dark:text-stone-200 text-sm">
                            {product!.name}
                          </p>
                          <p className="text-xs text-stone-500 dark:text-stone-400">
                            {product!.origin} • {product!.weight}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-stone-600 dark:text-stone-400">
                          ${product!.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t border-stone-200 dark:border-stone-700 pt-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-stone-600 dark:text-stone-400">Original Price:</span>
                    <span className="text-sm line-through text-stone-500">${originalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-stone-600 dark:text-stone-400">Bundle Discount:</span>
                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      -${savings.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-700">
                    <span className="text-lg font-bold text-stone-900 dark:text-stone-100">Bundle Price:</span>
                    <span className="text-2xl font-bold gradient-text">${discountedPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddBundleToCart(bundle)}
                  className="w-full py-4 gradient-bg text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add Bundle to Cart
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-8"
      >
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 text-center">
          Why Choose Bundles?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Tag className="w-8 h-8" />,
              title: 'Save Money',
              description: 'Get up to 25% off when you buy products together'
            },
            {
              icon: <Package className="w-8 h-8" />,
              title: 'Curated Collections',
              description: 'Expert-selected products that complement each other perfectly'
            },
            {
              icon: <Star className="w-8 h-8" />,
              title: 'Premium Quality',
              description: 'All bundle products meet our highest quality standards'
            }
          ].map((benefit, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-2">{benefit.title}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
