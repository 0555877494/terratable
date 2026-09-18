import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Package, CheckCircle, Truck, Calendar } from 'lucide-react';

interface OrderConfirmationEmailProps {
  orderId: string;
  customerName: string;
  customerEmail: string;
  total: number;
  itemCount: number;
  estimatedDelivery: string;
}

export default function OrderConfirmationEmail({
  orderId,
  customerName,
  customerEmail,
  total,
  itemCount,
  estimatedDelivery
}: OrderConfirmationEmailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 overflow-hidden shadow-xl"
    >
      {/* Email Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-8 h-8" />
          <div>
            <h2 className="font-serif text-2xl font-bold">Order Confirmation</h2>
            <p className="text-sm text-white/80">From: hello@terraandtable.com</p>
          </div>
        </div>
        <p className="text-white/90">To: {customerEmail}</p>
      </div>

      {/* Email Body */}
      <div className="p-8">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </motion.div>
          <h3 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Thank you, {customerName}!
          </h3>
          <p className="text-stone-600 dark:text-stone-400">
            Your order has been confirmed and is being processed
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-stone-50 dark:bg-stone-700/50 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Order Number</p>
              <p className="font-bold text-stone-900 dark:text-stone-100">#{orderId}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Order Date</p>
              <p className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Items</p>
              <p className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                <Package className="w-4 h-4" />
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Total</p>
              <p className="font-bold text-2xl gradient-text">${total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="font-bold text-emerald-800 dark:text-emerald-200">Estimated Delivery</p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">{estimatedDelivery}</p>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="mb-6">
          <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-3">What's Next?</h4>
          <div className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
            <p>✓ You'll receive a shipping confirmation email with tracking information</p>
            <p>✓ You can track your order status in your account dashboard</p>
            <p>✓ Our support team is available if you have any questions</p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t-2 border-stone-200 dark:border-stone-700 text-center">
          <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
            Thank you for shopping with Terra & Table!
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-500">
            Questions? Contact us at hello@terraandtable.com
          </p>
        </div>
      </div>
    </motion.div>
  );
}
