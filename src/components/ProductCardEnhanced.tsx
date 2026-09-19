import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Eye, ArrowRight } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import { Product } from '../types';
import ProductQuickActions from './ProductQuickActions';
import StockCountdown from './StockCountdown';
import SustainabilityBadges from './SustainabilityBadges';

interface ProductCardEnhancedProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  index: number;
}

export default function ProductCardEnhanced({ product, onViewDetails, index }: ProductCardEnhancedProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const { showToast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    showToast('success', `${product.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      showToast('info', 'Removed from wishlist');
    } else {
      addToWishlist(product.id);
      showToast('success', 'Added to wishlist!');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-stone-800 rounded-3xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-3 py-1.5 glass rounded-full text-xs font-bold text-stone-800 shadow-lg">
            {product.category}
          </span>
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

        {/* Quick Actions - Show on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <ProductQuickActions product={product} onQuickView={() => onViewDetails(product)} />
        </motion.div>

        {/* Wishlist Button - Always visible if in wishlist */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlist}
          className={`absolute top-4 right-4 w-11 h-11 glass rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all ${
            inWishlist ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500 text-rose-500' : 'text-stone-700'}`} />
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
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-lg leading-snug mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Sustainability Badges */}
        {product.badge && (
          <div className="mb-4">
            <SustainabilityBadges badges={['organic', 'eco-friendly']} size="sm" />
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-stone-200 dark:fill-stone-700 text-stone-200 dark:text-stone-700'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-stone-800 dark:text-stone-200">{product.rating}</span>
          <span className="text-sm text-stone-400">({product.reviews})</span>
        </div>

        {/* Stock Countdown */}
        {product.stock && product.stock <= 10 && (
          <div className="mb-4">
            <StockCountdown initialStock={product.stock} productName={product.name} />
          </div>
        )}

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-700">
          <div>
            <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Price</span>
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
            {product.stock && product.stock < 10 && (
              <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-1">
                Only {product.stock} left!
              </p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-5 py-3 gradient-bg text-white rounded-full text-sm font-bold shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add</span>
          </motion.button>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100/50 dark:from-amber-900/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
