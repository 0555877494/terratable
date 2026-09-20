import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

export default function CouponInput() {
  const [code, setCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { applyCoupon, removeCoupon, appliedCoupon } = useStore();
  const { showToast } = useToast();

  const handleApply = () => {
    if (!code.trim()) {
      showToast('warning', 'Please enter a coupon code');
      return;
    }
    const result = applyCoupon(code);
    if (result.success) {
      showToast('success', result.message);
      setCode('');
    } else {
      showToast('error', result.message);
    }
  };

  const handleRemove = () => {
    removeCoupon();
    showToast('info', 'Coupon removed');
  };

  return (
    <div className="bg-stone-50 rounded-2xl p-5 border-2 border-stone-200">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-5 h-5 text-amber-600" />
        <span className="font-bold text-stone-800">Have a coupon?</span>
      </div>

      {appliedCoupon ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-between p-3 bg-emerald-50 border-2 border-emerald-200 rounded-xl"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="font-bold text-emerald-800">{appliedCoupon.code}</p>
              <p className="text-xs text-emerald-600">
                {appliedCoupon.type === 'percentage' ? `${appliedCoupon.discount}% off` : `$${appliedCoupon.discount} off`}
              </p>
            </div>
          </div>
          <button onClick={handleRemove} className="p-1 hover:bg-emerald-100 rounded-full transition-colors">
            <X className="w-4 h-4 text-emerald-600" />
          </button>
        </motion.div>
      ) : (
        <>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none text-sm font-semibold"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleApply}
                  className="px-5 py-2.5 gradient-bg text-white rounded-xl text-sm font-bold shadow-lg shadow-amber-500/30"
                >
                  Apply
                </motion.button>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-xs text-stone-500 hover:text-stone-700">
                Cancel
              </button>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsOpen(true)}
              className="w-full py-2.5 border-2 border-amber-300 text-amber-700 rounded-xl text-sm font-bold hover:bg-amber-50 transition-colors"
            >
              Enter coupon code
            </motion.button>
          )}
          <div className="mt-3 text-xs text-stone-500">
            <p className="font-semibold mb-1">Try these codes:</p>
            <p>• WELCOME10 - 10% off for new customers</p>
            <p>• GOLD20 - 20% off orders over $100</p>
          </div>
        </>
      )}
    </div>
  );
}
