import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Copy, Check, Clock, ShoppingBag, Percent, Gift } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import { Link } from 'react-router-dom';

export default function PromoCodes() {
  const { coupons, cartTotal } = useStore();
  const { showToast } = useToast();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast('success', `Code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const isEligible = (coupon: any) => {
    if (!coupon.minOrder) return true;
    return cartTotal >= coupon.minOrder;
  };

  const getDiscountAmount = (coupon: any) => {
    if (coupon.type === 'percentage') {
      return `${coupon.discount}% OFF`;
    }
    return `$${coupon.discount} OFF`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-semibold mb-4">
          <Tag className="w-4 h-4" />
          Active Promotions
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Save More with <span className="gradient-text">Promo Codes</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
          Use these codes at checkout to save on your favorite artisan foods
        </p>
      </motion.div>

      {/* Current Cart Info */}
      {cartTotal > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-amber-200 dark:border-amber-800"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-amber-600" />
              <div>
                <p className="font-bold text-stone-900 dark:text-stone-100">
                  Your cart total: <span className="gradient-text">${cartTotal.toFixed(2)}</span>
                </p>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Codes marked with ✓ are eligible for your current cart
                </p>
              </div>
            </div>
            <Link
              to="/cart"
              className="px-6 py-2.5 gradient-bg text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Go to Checkout
            </Link>
          </div>
        </motion.div>
      )}

      {/* Promo Codes Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {coupons.map((coupon, index) => {
          const eligible = isEligible(coupon);
          return (
            <motion.div
              key={coupon.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`relative bg-white dark:bg-stone-800 rounded-2xl border-2 overflow-hidden shadow-sm hover:shadow-xl transition-all ${
                eligible
                  ? 'border-amber-300 dark:border-amber-600'
                  : 'border-stone-200 dark:border-stone-700 opacity-75'
              }`}
            >
              {/* Decorative Dashed Line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-orange-500 to-red-500" />
              
              {/* Ticket Notches */}
              <div className="absolute -left-3 top-1/2 w-6 h-6 bg-cream-50 dark:bg-stone-900 rounded-full" />

              <div className="p-6 pl-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {coupon.type === 'percentage' ? (
                        <Percent className="w-5 h-5 text-amber-600" />
                      ) : (
                        <Gift className="w-5 h-5 text-amber-600" />
                      )}
                      <span className="text-3xl font-bold gradient-text">
                        {getDiscountAmount(coupon)}
                      </span>
                    </div>
                    {coupon.minOrder && (
                      <p className="text-sm text-stone-600 dark:text-stone-400">
                        Minimum order: <span className="font-semibold">${coupon.minOrder}</span>
                      </p>
                    )}
                  </div>
                  {eligible && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Code Display */}
                <div className="flex items-center gap-3 p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl mb-3">
                  <code className="flex-1 font-mono font-bold text-lg text-stone-900 dark:text-stone-100 tracking-wider">
                    {coupon.code}
                  </code>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleCopy(coupon.code)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      copiedCode === coupon.code
                        ? 'bg-emerald-500 text-white'
                        : 'gradient-bg text-white'
                    }`}
                  >
                    {copiedCode === coupon.code ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4" /> Copied!
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy className="w-4 h-4" /> Copy
                      </span>
                    )}
                  </motion.button>
                </div>

                {/* Expiry */}
                {coupon.expiresAt && (
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                    <Clock className="w-3 h-3" />
                    <span>Expires: {new Date(coupon.expiresAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* How to Use */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-8 text-white"
      >
        <h2 className="font-serif text-2xl font-bold mb-6 text-center">
          How to Use Promo Codes
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: '1', title: 'Copy the Code', desc: 'Click the copy button next to any promo code', icon: <Copy className="w-6 h-6" /> },
            { step: '2', title: 'Go to Checkout', desc: 'Add items to your cart and proceed to checkout', icon: <ShoppingBag className="w-6 h-6" /> },
            { step: '3', title: 'Apply the Code', desc: 'Paste the code in the coupon field and click apply', icon: <Tag className="w-6 h-6" /> },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 gradient-bg rounded-full flex items-center justify-center shadow-lg">
                {item.icon}
              </div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-stone-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Terms */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 p-6 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700"
      >
        <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-3">Terms & Conditions</h3>
        <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
          <li>• Promo codes cannot be combined with other offers</li>
          <li>• Codes are valid while supplies last</li>
          <li>• Some products may be excluded from promotions</li>
          <li>• Terra & Table reserves the right to modify or cancel promotions</li>
          <li>• Minimum order amounts must be met before tax and shipping</li>
        </ul>
      </motion.div>
    </div>
  );
}
