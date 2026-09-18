import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

interface Props {
  product: Product;
  onViewDetails: (product: Product) => void;
  index: number;
}

export default function ProductCard({ product, onViewDetails, index }: Props) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const { showToast } = useToast();

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
      showToast('info', `Removed from wishlist`);
    } else {
      addToWishlist(product.id);
      showToast('success', `Added to wishlist!`);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -12 }}
      className="group relative bg-white rounded-3xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-500"
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
        
        {/* Top badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-4 py-2 glass rounded-full text-xs font-bold text-stone-800 shadow-lg">
            {product.category}
          </span>
        </div>

        {/* Wishlist button */}
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

        {/* Bottom overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewDetails(product)}
            className="w-full py-3 glass rounded-xl text-sm font-bold text-stone-900 hover:bg-white/90 transition-colors shadow-lg"
          >
            Quick View
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Origin tag */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{product.origin}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-stone-900 text-xl leading-tight mb-2 group-hover:text-amber-700 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-stone-600 line-clamp-2 mb-5 leading-relaxed">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-stone-200 text-stone-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-stone-800">{product.rating}</span>
          <span className="text-sm text-stone-400">({product.reviews})</span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-5 border-t border-stone-100">
          <div>
            <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Price</span>
            <p className="text-2xl font-bold gradient-text">
              ${product.price.toFixed(2)}
            </p>
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
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
