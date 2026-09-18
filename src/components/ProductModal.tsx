import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MapPin, Package, ShoppingBag, Heart, Share2 } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../contexts/StoreContext';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  const { addToCart } = useStore();

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="relative">
              <img src={product.image} alt={product.name} className="w-full h-64 md:h-full object-cover md:rounded-l-3xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2.5 glass rounded-full hover:bg-white transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-terra-800" />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-3 py-1.5 glass rounded-full text-xs font-semibold text-terra-800 shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex flex-col">
              {/* Origin badge */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-sage-400" />
                <span className="text-xs font-semibold text-terra-500 uppercase tracking-wider">{product.origin}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-terra-900 mb-3 leading-tight">{product.name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-gold-400 text-gold-400' : 'fill-terra-100 text-terra-100'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-terra-700">{product.rating}</span>
                <span className="text-sm text-terra-400">({product.reviews} reviews)</span>
              </div>

              <p className="text-terra-600 leading-relaxed mb-6 flex-1">{product.description}</p>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 p-3 bg-cream-50 rounded-xl">
                  <MapPin className="w-4 h-4 text-terra-500" />
                  <div>
                    <p className="text-[10px] text-terra-400 uppercase">Origin</p>
                    <p className="text-sm font-medium text-terra-800">{product.origin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-cream-50 rounded-xl">
                  <Package className="w-4 h-4 text-terra-500" />
                  <div>
                    <p className="text-[10px] text-terra-400 uppercase">Size</p>
                    <p className="text-sm font-medium text-terra-800">{product.weight}</p>
                  </div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="pt-4 border-t border-terra-100">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <span className="text-xs text-terra-400 uppercase tracking-wider">Price</span>
                    <p className="text-3xl font-bold bg-gradient-to-r from-terra-700 to-wine-700 bg-clip-text text-transparent">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2.5 border border-terra-200 rounded-full hover:bg-terra-50 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-terra-500" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2.5 border border-terra-200 rounded-full hover:bg-terra-50 transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-terra-500" />
                    </motion.button>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { addToCart(product); onClose(); }}
                  className="w-full py-4 bg-gradient-to-r from-terra-600 via-terra-700 to-wine-700 text-white rounded-2xl font-semibold text-lg shadow-xl shadow-terra-500/20 hover:shadow-2xl hover:shadow-terra-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
