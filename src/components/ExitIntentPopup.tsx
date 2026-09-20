import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Clock, Percent } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    // Check if already shown
    const shown = localStorage.getItem('terra_exit_popup_shown');
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        localStorage.setItem('terra_exit_popup_shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleClaim = () => {
    showToast('success', 'Discount code WELCOME15 copied to clipboard!');
    navigator.clipboard.writeText('WELCOME15');
    setIsVisible(false);
  };

  if (hasShown && !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsVisible(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={e => e.stopPropagation()}
            className="bg-white dark:bg-stone-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 p-2 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5 text-stone-600 dark:text-stone-400" />
            </button>

            {/* Header */}
            <div className="gradient-bg p-8 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="relative z-10"
              >
                <Gift className="w-16 h-16 mx-auto mb-4" />
                <h2 className="font-serif text-3xl font-bold mb-2">
                  Wait! Don't Leave Yet!
                </h2>
                <p className="text-white/90">
                  We have a special gift for you
                </p>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4"
                >
                  <Percent className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  <span className="text-3xl font-bold gradient-text">15% OFF</span>
                </motion.div>
                
                <p className="text-stone-600 dark:text-stone-400 mb-4">
                  Use code <span className="font-bold text-amber-600 dark:text-amber-400">WELCOME15</span> at checkout
                </p>

                <div className="flex items-center justify-center gap-2 text-sm text-stone-500 dark:text-stone-400">
                  <Clock className="w-4 h-4" />
                  <span>Valid for 24 hours only</span>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClaim}
                className="w-full py-4 gradient-bg text-white rounded-xl font-bold text-lg shadow-xl shadow-amber-500/30 hover:shadow-2xl transition-all"
              >
                Claim My Discount
              </motion.button>

              <button
                onClick={() => setIsVisible(false)}
                className="w-full mt-3 py-2 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
              >
                No thanks, I'll pay full price
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
