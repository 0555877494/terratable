import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, PartyPopper } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderConfirmationAnimationProps {
  orderId: string;
  orderTotal: number;
  itemCount: number;
}

export default function OrderConfirmationAnimation({ 
  orderId, 
  orderTotal, 
  itemCount 
}: OrderConfirmationAnimationProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const confettiColors = ['#f59e0b', '#d97706', '#10b981', '#f43f5e', '#8b5cf6', '#3b82f6'];

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                y: -100, 
                x: Math.random() * window.innerWidth,
                rotate: 0,
                opacity: 1
              }}
              animate={{ 
                y: window.innerHeight + 100,
                rotate: Math.random() * 720,
                opacity: 0
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'easeIn'
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{ 
                backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)]
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="text-center max-w-2xl relative z-10"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.3 }}
          className="relative w-32 h-32 mx-auto mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/30 rounded-full"
          />
          <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/30">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, type: 'spring' }}
            className="absolute -top-2 -right-2"
          >
            <PartyPopper className="w-12 h-12 text-amber-500" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4"
        >
          Order Confirmed! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl text-stone-600 dark:text-stone-400 mb-8"
        >
          Thank you for your purchase! Your artisan foods are being prepared with care.
        </motion.p>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6 mb-8"
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Order Number</p>
              <p className="font-bold text-stone-900 dark:text-stone-100">#{orderId}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Total</p>
              <p className="font-bold text-2xl gradient-text">${orderTotal.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Items</p>
              <p className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                <Package className="w-4 h-4" />
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Delivery</p>
              <p className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                <Truck className="w-4 h-4" />
                2-3 days
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-stone-100 dark:bg-stone-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '20%' }}
                transition={{ duration: 1, delay: 1 }}
                className="h-full gradient-bg rounded-full"
              />
            </div>
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
              Processing
            </span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 gradient-bg text-white rounded-full font-bold text-lg shadow-xl shadow-amber-500/30 hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <Package className="w-5 h-5" />
            Continue Shopping
          </Link>
          <Link
            to="/order-tracking"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-full font-bold text-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-all"
          >
            Track Order
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
