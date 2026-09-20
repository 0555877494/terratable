import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Clock } from 'lucide-react';

interface StockCountdownProps {
  initialStock: number;
  productName: string;
}

export default function StockCountdown({ initialStock, productName }: StockCountdownProps) {
  const [stock, setStock] = useState(initialStock);

  useEffect(() => {
    // Simulate stock decreasing over time
    const interval = setInterval(() => {
      setStock(prev => {
        if (prev <= 1) return prev;
        // Random chance to decrease
        return Math.random() > 0.7 ? prev - 1 : prev;
      });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (stock > 10) return null;

  const getUrgencyColor = () => {
    if (stock <= 3) return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
    if (stock <= 5) return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
    return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
  };

  const getIconColor = () => {
    if (stock <= 3) return 'text-red-600 dark:text-red-400';
    if (stock <= 5) return 'text-orange-600 dark:text-orange-400';
    return 'text-amber-600 dark:text-amber-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border-2 ${getUrgencyColor()}`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${getIconColor()}`} />
        <div className="flex-1">
          <p className="font-bold text-sm mb-1">
            {stock <= 3 ? 'Almost Gone!' : 'Limited Stock!'}
          </p>
          <p className="text-sm">
            Only <span className="font-bold">{stock}</span> {stock === 1 ? 'item' : 'items'} left in stock
          </p>
          {stock <= 5 && (
            <div className="flex items-center gap-1 mt-2 text-xs">
              <Clock className="w-3 h-3" />
              <span>Selling fast - order soon!</span>
            </div>
          )}
        </div>
      </div>

      {/* Stock Bar */}
      <div className="mt-3 h-2 bg-white/50 dark:bg-black/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(stock / initialStock) * 100}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            stock <= 3 ? 'bg-red-500' : stock <= 5 ? 'bg-orange-500' : 'bg-amber-500'
          }`}
        />
      </div>
    </motion.div>
  );
}
