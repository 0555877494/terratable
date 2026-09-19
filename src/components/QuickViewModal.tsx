import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Share2, ShoppingBag, Star, Minus, Plus } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import ImageZoom from './ImageZoom';
import SustainabilityBadges from './SustainabilityBadges';
import StockCountdown from './StockCountdown';
import SocialProof from './SocialProof';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
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
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={e => e.stopPropagation()}
          className="bg-white dark:bg-stone-800 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-stone-700 transition-colors shadow-lg"
          >
            <X className="w-5 h-5 text-stone-700 dark:text-stone-300" />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative">
              <ImageZoom
                src={product.image}
                alt={product.name}
                className="w-full h-96 md:h-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                      product.badge === 'new' ? 'bg-emerald-500 text-white' :
                      product.badge === 'sale' ? 'bg-rose-500 text-white' :
                      product.badge === 'bestseller' ? 'bg-amber-500 text-white' :
                      'bg-purple-500 text-white'
                    }`}
                  >
                    {product.badge === 'new' && '✨ New'}
                    {product.badge === 'sale' && `🔥 ${product.discount}% OFF`}
                    {product.badge === 'bestseller' && '⭐ Bestseller'}
                    {product.badge === 'limited' && '💎 Limited'}
                  </motion.span>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col">
              {/* Origin */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  {product.origin}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3 leading-tight">
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

              {/* Sustainability Badges */}
              {product.badge && (
                <div className="mb-6">
                  <SustainabilityBadges
                    badges={['organic', 'fair-trade', 'eco-friendly']}
                    size="sm"
                  />
                </div>
              )}

              {/* Social Proof */}
              <div className="mb-6">
                <SocialProof productId={product.id} />
              </div>

              {/* Stock Countdown */}
              {product.stock && product.stock <= 10 && (
                <div className="mb-6">
                  <StockCountdown
                    initialStock={product.stock}
                    productName={product.name}
                  />
                </div>
              )}

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
                  className="p-4 border-2 border-stone-200 dark:border-stone-700 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
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

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-stone-200 dark:border-stone-700">
                <div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 uppercase font-semibold mb-1">
                    Category
                  </p>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">
                    {product.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 uppercase font-semibold mb-1">
                    Weight
                  </p>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">
                    {product.weight}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
