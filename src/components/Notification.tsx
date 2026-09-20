import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

interface NotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
  onClose?: () => void;
}

export default function Notification({ 
  type = 'info', 
  message, 
  duration = 5000,
  onClose 
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-emerald-500" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-amber-500" />;
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className={`fixed top-24 left-1/2 z-50 max-w-md w-full mx-4 p-4 rounded-xl border-2 shadow-xl ${getColor()}`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {getIcon()}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {message}
              </p>
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
                onClose?.();
              }}
              className="flex-shrink-0 p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-stone-500" />
            </button>
          </div>
          
          {/* Progress bar */}
          {duration > 0 && (
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-b-xl"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
