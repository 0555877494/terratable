import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Heart, Share2, Minus, Plus, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import SocialShare from './SocialShare';

interface MobileProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export default function MobileProductQuickView({ product, onClose }: MobileProductQuickViewProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showShare, setShowShare] = useState(false);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  
  // Mock multiple images for demo
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md md:hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={e => e.stopPropagation()}
          className="absolute bottom-0 left-0 right-0 bg-white dark:bg-stone-800 rounded-t-3xl max-h-[90vh] overflow-y-auto"
        >
          {/* Drag Handle */}
          <div className="sticky top-0 bg-white dark:bg-stone-800 pt-4 pb-2 px-4 border-b border-stone-200 dark:border-stone-700 z-10">
            <div className="w-12 h-1.5 bg-stone-300 dark:bg-stone-600 rounded-full mx-auto mb-3" />
            <div className="flex items-center justify-between">
              <button
                onClick={onClose}
                className="p-2 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-stone-700 dark:text-stone-300" />
              </button>
              <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Quick View
              </h2>
              <div className="w-10" /> {/* Spacer for centering */}
            </div>
          </div>

          {/* Image Carousel */}
          <div className="relative aspect-square bg-stone-100 dark:bg-stone-700">
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={productImages[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-stone-800/90 rounded-full flex items-center justify-center shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6 text-stone-700 dark:text-stone-300" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-stone-800/90 rounded-full flex items-center justify-center shadow-lg"
                >
                  <ChevronRight className="w-6 h-6 text-stone-700 dark:text-stone-300" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 text-white rounded-full text-sm font-semibold">
              {currentImageIndex + 1} / {productImages.length}
            </div>

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4">
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
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Origin */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                {product.origin}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
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
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold gradient-text">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-stone-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  You save ${(product.originalPrice - product.price).toFixed(2)} ({product.discount}% off)
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            <div>
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
                <span className="text-sm text-stone-500 dark:text-stone-400">
                  Total: <span className="font-bold text-stone-900 dark:text-stone-100">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 py-4 gradient-bg text-white rounded-xl font-bold text-lg shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlist}
                className={`p-4 border-2 rounded-xl ${
                  inWishlist
                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                    : 'border-stone-200 dark:border-stone-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500 text-rose-500' : 'text-stone-500'}`} />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowShare(!showShare)}
                className="p-4 border-2 border-stone-200 dark:border-stone-700 rounded-xl"
              >
                <Share2 className="w-5 h-5 text-stone-500" />
              </motion.button>
            </div>

            {/* Social Share */}
            {showShare && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <SocialShare
                  productName={product.name}
                  productImage={product.image}
                />
              </motion.div>
            )}

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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
