import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Clock, Mail, X, Sparkles } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useAuth } from '../contexts/AuthContext';

export default function AbandonedCartRecovery() {
  const { cart, cartTotal } = useStore();
  const { user } = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // Check if user has items in cart and has been inactive
    if (cart.length > 0 && user && !emailSent) {
      const lastActivity = localStorage.getItem('terra_last_activity');
      const now = Date.now();
      
      if (lastActivity) {
        const timeSinceLastActivity = now - parseInt(lastActivity);
        // Show prompt after 5 minutes of inactivity
        if (timeSinceLastActivity > 5 * 60 * 1000) {
          setShowPrompt(true);
        }
      }
      
      localStorage.setItem('terra_last_activity', now.toString());
    }
  }, [cart, user, emailSent]);

  const handleSendReminder = () => {
    // In production, this would send an email via backend
    console.log('Sending cart reminder email to:', user?.email);
    setEmailSent(true);
    setShowPrompt(false);
    
    // Show success message
    setTimeout(() => {
      alert('Cart reminder sent to your email!');
    }, 500);
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  if (!showPrompt || cart.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-24 right-6 z-50 max-w-sm"
      >
        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-2xl border-2 border-amber-200 dark:border-amber-800 overflow-hidden">
          {/* Header */}
          <div className="gradient-bg p-4 text-white relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Don't forget your cart!</h3>
                <p className="text-sm text-white/90">
                  {cart.length} item{cart.length > 1 ? 's' : ''} waiting for you
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Cart Preview */}
            <div className="mb-4 p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                  Cart Total:
                </span>
                <span className="text-lg font-bold gradient-text">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {cart.slice(0, 3).map((item, index) => (
                  <img
                    key={index}
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                ))}
                {cart.length > 3 && (
                  <div className="w-12 h-12 rounded-lg bg-stone-200 dark:bg-stone-600 flex items-center justify-center text-xs font-semibold text-stone-600 dark:text-stone-300 flex-shrink-0">
                    +{cart.length - 3}
                  </div>
                )}
              </div>
            </div>

            {/* Urgency Message */}
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-1">
                    Items selling fast!
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    Complete your purchase before items sell out
                  </p>
                </div>
              </div>
            </div>

            {/* Special Offer */}
            <div className="mb-4 p-3 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border border-rose-200 dark:border-rose-800 rounded-xl">
              <div className="flex items-start gap-2">
                <Sparkles className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-rose-800 dark:text-rose-200 mb-1">
                    Special Offer!
                  </p>
                  <p className="text-xs text-rose-700 dark:text-rose-300">
                    Get 10% off with code <span className="font-bold">CART10</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/cart'}
                className="w-full py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Complete Purchase
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSendReminder}
                className="w-full py-3 border-2 border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-400 rounded-xl font-bold hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email Reminder
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
