import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Heart, Share2, Minus, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import ProductImageGallery from './ProductImageGallery';
import ProductQuickStats from './ProductQuickStats';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductQuickViewModal({ product, onClose }: ProductQuickViewModalProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showToast('success', `Added ${quantity} × ${product.name} to cart!`);
    onClose();
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      showToast('info', 'Removed from wishlist');
    } else {
      addToWishlist(product.id);
      showToast('success', 'Added to wishlist!');
    }
  };

  // Mock additional images
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  return (
    <AnimatePresence>
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
          className="bg-white dark:bg-stone-800 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-stone-800 rounded-full shadow-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
          >
            <X className="w-6 h-6 text-stone-700 dark:text-stone-300" />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="p-6">
              <ProductImageGallery 
                images={productImages} 
                productName={product.name} 
              />
            </div>

            {/* Product Details */}
            <div className="p-6 flex flex-col">
              {/* Origin */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  {product.origin}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-stone-200 text-stone-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-stone-800 dark:text-stone-200">
                  {product.rating}
                </span>
                <span className="text-sm text-stone-400">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Description */}
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Quick Stats */}
              <div className="mb-6">
                <ProductQuickStats product={product} />
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold gradient-text">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-stone-400 line-through">
                      ${(product.originalPrice * quantity).toFixed(2)}
                    </span>
                  )}
                </div>
                {quantity > 1 && (
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                    ${product.price.toFixed(2)} each
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-700 rounded-full px-3 py-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                    </button>
                    <span className="w-10 text-center font-bold text-stone-900 dark:text-stone-100 text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 py-4 gradient-bg text-white rounded-xl font-bold text-lg shadow-xl shadow-amber-500/30 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleWishlist}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    inWishlist
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                      : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500 text-rose-500' : 'text-stone-500'}`} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 border-2 border-stone-200 dark:border-stone-700 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
                >
                  <Share2 className="w-5 h-5 text-stone-500" />
                </motion.button>
              </div>

              {/* Features */}
              <div className="pt-6 border-t border-stone-200 dark:border-stone-700">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">
                  Features
                </h4>
                <div className="space-y-2">
                  {[
                    'Free shipping on orders over $50',
                    '30-day return policy',
                    'Secure checkout',
                    'Gift wrapping available'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
