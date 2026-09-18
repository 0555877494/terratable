import React from 'react';
import { motion } from 'framer-motion';
import { Package, Star, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

export default function ProductBundles() {
  const { addToCart } = useStore();
  const { showToast } = useToast();

  const bundles = [
    {
      id: 'bundle-1',
      name: 'Mediterranean Essentials',
      description: 'Everything you need for authentic Mediterranean cooking',
      discount: 20,
      originalPrice: 115.98,
      bundlePrice: 92.78,
      products: [
        { id: 'p3', name: 'Aged Balsamic Vinegar', price: 42.00, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82571?w=200&h=200&fit=crop' },
        { id: 'p6', name: 'Truffle Infused Olive Oil', price: 48.00, image: 'https://images.unsplash.com/photo-1474979266404-7f28a9b0cfdc?w=200&h=200&fit=crop' },
        { id: 'p4', name: 'Saffron Threads', price: 25.98, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop' }
      ],
      image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=600&h=400&fit=crop',
      badge: 'Best Value'
    },
    {
      id: 'bundle-2',
      name: 'Tea Time Collection',
      description: 'Premium teas and treats for the perfect afternoon',
      discount: 15,
      originalPrice: 67.24,
      bundlePrice: 57.15,
      products: [
        { id: 'p2', name: 'Japanese Matcha Powder', price: 38.50, image: 'https://images.unsplash.com/photo-1515823064-d6e0c0461669?w=200&h=200&fit=crop' },
        { id: 'p5', name: 'Artisan Dark Chocolate', price: 18.75, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200&h=200&fit=crop' },
        { id: 'p1', name: 'Wildflower Honey', price: 9.99, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=200&fit=crop' }
      ],
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop',
      badge: 'Popular'
    },
    {
      id: 'bundle-3',
      name: 'Spice Explorer Kit',
      description: 'Journey through global flavors with our curated spices',
      discount: 25,
      originalPrice: 89.97,
      bundlePrice: 67.48,
      products: [
        { id: 'p4', name: 'Saffron Threads', price: 56.00, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop' },
        { id: 'p1', name: 'Wildflower Honey', price: 24.99, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=200&fit=crop' },
        { id: 'p5', name: 'Dark Chocolate', price: 8.98, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200&h=200&fit=crop' }
      ],
      image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&h=400&fit=crop',
      badge: 'Limited Edition'
    }
  ];

  const handleAddBundle = (bundle: any) => {
    bundle.products.forEach((product: any) => {
      addToCart({ ...product, inStock: true });
    });
    showToast('success', `${bundle.name} added to cart! You saved $${(bundle.originalPrice - bundle.bundlePrice).toFixed(2)}`);
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
          <Package className="w-4 h-4" />
          Curated Bundles
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Save More with <span className="gradient-text">Bundles</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
          Expertly curated combinations at special prices. Perfect for gifting or stocking your pantry.
        </p>
      </motion.div>

      {/* Bundles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bundles.map((bundle, index) => (
          <motion.div
            key={bundle.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-stone-800 rounded-3xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={bundle.image}
                alt={bundle.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {bundle.badge}
              </div>

              {/* Discount Badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-full shadow-lg">
                -{bundle.discount}%
              </div>

              {/* Bundle Name */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-2xl font-bold text-white mb-1">
                  {bundle.name}
                </h3>
                <p className="text-white/90 text-sm">
                  {bundle.description}
                </p>
              </div>
            </div>

            {/* Products Preview */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Includes:
                </span>
              </div>
              
              <div className="space-y-2 mb-5">
                {bundle.products.map((product, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                        {product.name}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold gradient-text">
                  ${bundle.bundlePrice.toFixed(2)}
                </span>
                <span className="text-lg text-stone-400 line-through">
                  ${bundle.originalPrice.toFixed(2)}
                </span>
                <span className="text-sm font-semibold text-emerald-600">
                  Save ${(bundle.originalPrice - bundle.bundlePrice).toFixed(2)}
                </span>
              </div>

              {/* Add Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAddBundle(bundle)}
                className="w-full py-3.5 gradient-bg text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Package className="w-5 h-5" />
                Add Bundle to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <p className="text-stone-600 dark:text-stone-400 mb-4">
          Want a custom bundle? Contact us for personalized recommendations!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 border-2 border-amber-400 text-amber-700 dark:text-amber-400 rounded-full font-bold hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors inline-flex items-center gap-2"
        >
          Contact Us <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </div>
  );
}
