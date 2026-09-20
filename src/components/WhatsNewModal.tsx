import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Gift, Zap, Heart, ArrowRight } from 'lucide-react';

interface WhatsNewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsNewModal({ isOpen, onClose }: WhatsNewModalProps) {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Enhanced Product Pages',
      description: 'New image galleries, price history charts, and detailed product information',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: 'Gift Finder Quiz',
      description: 'Find the perfect gift with our interactive 5-step quiz',
      color: 'from-rose-500 to-pink-500'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Flash Deals',
      description: 'Limited-time offers with countdown timers and stock alerts',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Smart Wishlist',
      description: 'Price drop alerts, social sharing, and product comparison',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={e => e.stopPropagation()}
            className="bg-white dark:bg-stone-800 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold">What's New</h2>
                    <p className="text-sm text-white/90">Latest features & improvements</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white flex-shrink-0`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/50 rounded-b-3xl">
              <div className="text-center">
                <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
                  We're constantly improving your shopping experience!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-8 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
                >
                  Got it!
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
