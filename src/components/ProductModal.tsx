import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MapPin, Package, Plus } from 'lucide-react';
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Image */}
          <div className="relative">
            <img src={product.image} alt={product.name} className="w-full h-64 sm:h-80 object-cover rounded-t-3xl" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-terra-700" />
            </button>
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-terra-700">
                {product.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-terra-900 mb-2">{product.name}</h2>
            
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-medium text-terra-800">{product.rating}</span>
                <span className="text-sm text-terra-400">({product.reviews} reviews)</span>
              </div>
              <span className="text-terra-200">•</span>
              <div className="flex items-center gap-1 text-sm text-terra-600">
                <MapPin className="w-3.5 h-3.5" /> {product.origin}
              </div>
              <span className="text-terra-200">•</span>
              <div className="flex items-center gap-1 text-sm text-terra-600">
                <Package className="w-3.5 h-3.5" /> {product.weight}
              </div>
            </div>

            <p className="text-terra-600 leading-relaxed mb-6">{product.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-terra-100">
              <div>
                <span className="text-sm text-terra-500">Price</span>
                <p className="text-3xl font-bold text-terra-800">${product.price.toFixed(2)}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { addToCart(product); onClose(); }}
                className="flex items-center gap-2 px-6 py-3 bg-terra-600 text-white rounded-full font-medium hover:bg-terra-700 transition-colors shadow-lg shadow-terra-200"
              >
                <Plus className="w-5 h-5" /> Add to Cart
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
