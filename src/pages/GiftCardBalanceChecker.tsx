import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Search, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useToast } from '../contexts/ToastContext';

export default function GiftCardBalanceChecker() {
  const { showToast } = useToast();
  const [cardNumber, setCardNumber] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<{
    balance: number;
    originalAmount: number;
    expiresAt: string;
    status: string;
  } | null>(null);
  const [error, setError] = useState('');

  const handleCheckBalance = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !pin) {
      showToast('error', 'Please enter card number and PIN');
      return;
    }

    setLoading(true);
    setError('');
    setBalance(null);

    try {
      // In production, this would call a real API
      // For now, we'll simulate the response
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate checking gift card balance
      // In real app, this would query a gift_cards table
      const mockBalance = {
        balance: 75.50,
        originalAmount: 100.00,
        expiresAt: '2025-12-31',
        status: 'active'
      };

      setBalance(mockBalance);
      showToast('success', 'Balance retrieved successfully!');
    } catch (error) {
      console.error('Error checking balance:', error);
      setError('Failed to check balance. Please try again.');
      showToast('error', 'Failed to check balance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-semibold mb-4">
          <Gift className="w-4 h-4" />
          Gift Card Balance
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Check Your <span className="gradient-text">Gift Card</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg">
          Enter your gift card details to check your remaining balance
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-stone-800 rounded-3xl border-2 border-stone-200 dark:border-stone-700 p-8 shadow-xl"
      >
        <form onSubmit={handleCheckBalance} className="space-y-6">
          {/* Card Number */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Gift Card Number
            </label>
            <div className="relative">
              <Gift className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                placeholder="Enter 16-digit card number"
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none transition-all font-mono text-lg tracking-wider"
              />
            </div>
          </div>

          {/* PIN */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
              PIN Code
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="password"
                value={pin}
                onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="Enter 4-digit PIN"
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none transition-all font-mono text-lg tracking-wider"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3"
            >
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading || !cardNumber || !pin}
            className="w-full py-4 gradient-bg text-white rounded-xl font-bold text-lg shadow-xl shadow-amber-500/30 hover:shadow-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Check Balance
              </>
            )}
          </motion.button>
        </form>

        {/* Balance Result */}
        {balance && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-800 dark:text-emerald-200 text-lg">
                  Card Balance
                </h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Status: {balance.status}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-white dark:bg-stone-800 rounded-xl">
                <span className="text-stone-600 dark:text-stone-400">Current Balance</span>
                <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  ${balance.balance.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-white dark:bg-stone-800 rounded-xl">
                <span className="text-stone-600 dark:text-stone-400">Original Amount</span>
                <span className="text-xl font-semibold text-stone-900 dark:text-stone-100">
                  ${balance.originalAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-white dark:bg-stone-800 rounded-xl">
                <span className="text-stone-600 dark:text-stone-400">Expires</span>
                <span className="text-xl font-semibold text-stone-900 dark:text-stone-100">
                  {new Date(balance.expiresAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              {/* Usage Progress */}
              <div className="p-4 bg-white dark:bg-stone-800 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-stone-600 dark:text-stone-400">Amount Used</span>
                  <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    ${((balance.originalAmount - balance.balance)).toFixed(2)} / ${balance.originalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="h-3 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((balance.originalAmount - balance.balance) / balance.originalAmount) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full gradient-bg rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/gift-cards'}
                className="flex-1 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg"
              >
                Buy Gift Card
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setBalance(null);
                  setCardNumber('');
                  setPin('');
                }}
                className="flex-1 py-3 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Check Another
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Help Text */}
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            💡 <strong>Need help?</strong> Gift card numbers are 16 digits long and can be found on the back of your card. The PIN is a 4-digit code also located on the back.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
