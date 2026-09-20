import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';

interface ShippingInsuranceProps {
  orderTotal: number;
}

export default function ShippingInsurance({ orderTotal }: ShippingInsuranceProps) {
  const [isInsured, setIsInsured] = useState(false);

  // Calculate insurance cost (2% of order total, minimum $2.99)
  const insuranceCost = Math.max(2.99, orderTotal * 0.02);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
    >
      <label className="flex items-start gap-4 cursor-pointer">
        <input
          type="checkbox"
          checked={isInsured}
          onChange={e => setIsInsured(e.target.checked)}
          className="mt-1 w-5 h-5 accent-amber-500"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h4 className="font-bold text-stone-900 dark:text-stone-100">
              Add Shipping Insurance
            </h4>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
            Protect your order against loss, damage, or theft during transit
          </p>
          
          {isInsured && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                <CheckCircle className="w-4 h-4" />
                <span>Full refund if package is lost</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                <CheckCircle className="w-4 h-4" />
                <span>Replacement for damaged items</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                <CheckCircle className="w-4 h-4" />
                <span>Coverage for theft after delivery</span>
              </div>
              <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                    Insurance Cost:
                  </span>
                  <span className="text-lg font-bold text-amber-800 dark:text-amber-200">
                    +${insuranceCost.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {!isInsured && (
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <AlertCircle className="w-3 h-3" />
              <span>Recommended for orders over $100</span>
            </div>
          )}
        </div>
      </label>
    </motion.div>
  );
}
