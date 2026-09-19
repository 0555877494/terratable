import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, ShoppingBag } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import CountdownTimer from './CountdownTimer';

interface FlashDeal {
  id: string;
  productId: string;
  discount: number;
  endTime: Date;
  stock: number;
  originalPrice: number;
}

export default function FlashDeals() {
  const { products, addToCart } = useStore();
  const { showToast } = useToast();
  const [deals, setDeals] = useState<FlashDeal[]>([]);

  useEffect(() => {
    // Generate mock flash deals
    const mockDeals: FlashDeal[] = products.slice(0, 3).map((product, index) => ({
      id: `deal-${index}`,
      productId: product.id,
      discount: 20 + (index * 10), // 20%, 30%, 40%
      endTime: new Date(Date.now() + (6 - index) * 60 * 60 * 1000), // 6, 5, 4 hours from now
      stock: Math.floor(Math.random() * 10) + 5, // 5-15 items
      originalPrice: product.price
    }));

    setDeals(mockDeals);
  }, [products]);

  const handleAddToCart = (deal: FlashDeal) => {
    const product = products.find(p => p.id === deal.productId);
    if (product) {
      addToCart(product);
      showToast('success', `${product.name} added to cart at ${deal.discount}% off!`);
    }
  };

  if (deals.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-red-500 via-orange-500 to-amber-500 rounded-3xl p-8 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Zap className="w-10 h-10 fill-yellow-300 text-yellow-300" />
            </motion.div>
            <div>
              <h2 className="font-serif text-3xl font-bold">Flash Deals</h2>
              <p className="text-white/90 text-sm">Limited time offers - Act fast!</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <CountdownTimer
              targetDate={deals[0]?.endTime || new Date()}
              size="sm"
              showLabels={false}
            />
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal, index) => {
            const product = products.find(p => p.id === deal.productId);
            if (!product) return null;

            const discountedPrice = deal.originalPrice * (1 - deal.discount / 100);
            const stockPercentage = (deal.stock / 20) * 100; // Assume max 20 items

            return (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20"
              >
                {/* Product Image */}
                <div className="relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-xl"
                  />
                  <div className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
                    -{deal.discount}%
                  </div>
                </div>

                {/* Product Info */}
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                
                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
                  <span className="text-lg text-white/60 line-through">
                    ${deal.originalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Stock Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {deal.stock} left
                    </span>
                    <span>Hurry!</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stockPercentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-yellow-300 rounded-full"
                    />
                  </div>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToCart(deal)}
                  className="w-full py-3 bg-white text-red-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Grab Deal
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Timer */}
        <div className="sm:hidden mt-6">
          <CountdownTimer
            targetDate={deals[0]?.endTime || new Date()}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
