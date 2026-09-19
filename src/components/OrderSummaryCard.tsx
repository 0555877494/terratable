import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, CreditCard, Truck, Gift, CheckCircle } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

export default function OrderSummaryCard() {
  const { cart, cartTotal, appliedCoupon, discountedTotal } = useStore();

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartTotal;
  const shipping = subtotal >= 50 ? 0 : 7.99;
  const tax = discountedTotal * 0.08;
  const total = discountedTotal + shipping + tax;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6 sticky top-24"
    >
      <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
        <ShoppingBag className="w-6 h-6 text-amber-600" />
        Order Summary
      </h3>

      {/* Items Count */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-stone-200 dark:border-stone-700">
        <span className="text-stone-600 dark:text-stone-400">
          Items ({itemCount})
        </span>
        <span className="font-semibold text-stone-900 dark:text-stone-100">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* Coupon Applied */}
      {appliedCoupon && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 pb-4 border-b border-stone-200 dark:border-stone-700"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="font-semibold text-emerald-700 dark:text-emerald-300 text-sm">
                  {appliedCoupon.code}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {appliedCoupon.type === 'percentage' 
                    ? `${appliedCoupon.discount}% off` 
                    : `$${appliedCoupon.discount} off`}
                </p>
              </div>
            </div>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              -${(subtotal - discountedTotal).toFixed(2)}
            </span>
          </div>
        </motion.div>
      )}

      {/* Shipping */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-stone-200 dark:border-stone-700">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-stone-500" />
          <span className="text-stone-600 dark:text-stone-400">Shipping</span>
        </div>
        {shipping === 0 ? (
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            FREE
          </span>
        ) : (
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            ${shipping.toFixed(2)}
          </span>
        )}
      </div>

      {/* Tax */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-stone-200 dark:border-stone-700">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-stone-500" />
          <span className="text-stone-600 dark:text-stone-400">Tax (8%)</span>
        </div>
        <span className="font-semibold text-stone-900 dark:text-stone-100">
          ${tax.toFixed(2)}
        </span>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-bold text-xl text-stone-900 dark:text-stone-100">
          Total
        </span>
        <span className="text-3xl font-bold gradient-text">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Free Shipping Message */}
      {subtotal < 50 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl mb-4"
        >
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Add <span className="font-bold">${(50 - subtotal).toFixed(2)}</span> more for FREE shipping!
            </p>
          </div>
        </motion.div>
      )}

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          Secure Checkout
        </p>
      </div>
    </motion.div>
  );
}
