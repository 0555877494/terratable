import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../contexts/StoreContext';

interface Props {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: Props) {
  const { addToCart } = useStore();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-sm border border-terra-100 overflow-hidden group hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <button
          onClick={() => onViewDetails(product)}
          className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-terra-800 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        >
          Quick View
        </button>
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-medium text-terra-700">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif font-semibold text-terra-900 text-lg leading-tight mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-terra-500 mb-2">{product.origin} • {product.weight}</p>
        <p className="text-sm text-terra-600 line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium text-terra-800">{product.rating}</span>
          <span className="text-xs text-terra-400">({product.reviews})</span>
        </div>

        {/* Price & Add */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-terra-800">${product.price.toFixed(2)}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(product)}
            className="flex items-center gap-1 px-3 py-2 bg-terra-600 text-white rounded-full text-sm font-medium hover:bg-terra-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
