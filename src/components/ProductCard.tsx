import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../contexts/StoreContext';

interface Props {
  product: Product;
  onViewDetails: (product: Product) => void;
  index: number;
}

export default function ProductCard({ product, onViewDetails, index }: Props) {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-3xl shadow-sm border border-terra-100/50 overflow-hidden hover:shadow-2xl hover:shadow-terra-200/40 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 glass rounded-full text-[11px] font-semibold text-terra-800 shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Quick actions on hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 glass rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            <Heart className="w-4 h-4 text-wine-600" />
          </motion.button>
        </div>

        {/* Bottom overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewDetails(product)}
            className="w-full py-2.5 glass rounded-xl text-sm font-semibold text-terra-900 hover:bg-white/90 transition-colors shadow-lg"
          >
            Quick View
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Origin tag */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />
          <span className="text-[11px] font-medium text-terra-500 uppercase tracking-wider">{product.origin}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-terra-900 text-lg leading-snug mb-1.5 group-hover:text-terra-700 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-terra-500 line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-gold-400 text-gold-400'
                    : 'fill-terra-100 text-terra-100'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-terra-700">{product.rating}</span>
          <span className="text-xs text-terra-400">({product.reviews})</span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t border-terra-50">
          <div>
            <span className="text-[11px] text-terra-400 uppercase tracking-wider">Price</span>
            <p className="text-xl font-bold bg-gradient-to-r from-terra-700 to-wine-700 bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-terra-600 to-terra-700 text-white rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-terra-500/30 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add</span>
          </motion.button>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-terra-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
