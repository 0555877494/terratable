import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MapPin, Package, ShoppingBag, Heart, Share2, Minus, Plus } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showToast('success', `${quantity} × ${product.name} added to cart!`);
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
          className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="relative">
              <img src={product.image} alt={product.name} className="w-full h-72 md:h-full object-cover md:rounded-l-3xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-3 glass rounded-full hover:bg-white transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-stone-800" />
              </button>
              <div className="absolute bottom-5 left-5 flex gap-2">
                <span className="px-4 py-2 glass rounded-full text-xs font-bold text-stone-800 shadow-lg">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-7 sm:p-9 flex flex-col">
              {/* Origin badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{product.origin}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-4 leading-tight">{product.name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-base font-bold text-stone-800">{product.rating}</span>
                <span className="text-base text-stone-400">({product.reviews} reviews)</span>
              </div>

              <p className="text-stone-600 leading-relaxed mb-7 flex-1 text-base">{product.description}</p>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 mb-7">
                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-[10px] text-stone-500 uppercase font-bold">Origin</p>
                    <p className="text-sm font-bold text-stone-800">{product.origin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                  <Package className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-[10px] text-stone-500 uppercase font-bold">Size</p>
                    <p className="text-sm font-bold text-stone-800">{product.weight}</p>
                  </div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="pt-5 border-t border-stone-100">
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <span className="text-xs text-stone-400 uppercase tracking-wider font-bold">Price</span>
                    <p className="text-4xl font-bold gradient-text">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                    {quantity > 1 && <p className="text-sm text-stone-400">${product.price.toFixed(2)} each</p>}
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleWishlist}
                      className="p-3 border-2 border-stone-200 rounded-full hover:bg-stone-50 transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500 text-rose-500' : 'text-stone-500'}`} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 border-2 border-stone-200 rounded-full hover:bg-stone-50 transition-colors"
                    >
                      <Share2 className="w-5 h-5 text-stone-500" />
                    </motion.button>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-base font-bold text-stone-700">Quantity:</span>
                  <div className="flex items-center gap-2 bg-stone-100 rounded-full px-3 py-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-stone-700" />
                    </button>
                    <span className="w-10 text-center font-bold text-stone-900 text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-stone-700" />
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full py-5 gradient-bg text-white rounded-2xl font-bold text-lg shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingBag className="w-6 h-6" />
                  Add to Cart — ${(product.price * quantity).toFixed(2)}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
