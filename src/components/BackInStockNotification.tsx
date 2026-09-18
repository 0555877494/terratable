import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Mail, CheckCircle } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

interface BackInStockNotificationProps {
  productName: string;
}

export default function BackInStockNotification({ productName }: BackInStockNotificationProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('error', 'Please enter your email address');
      return;
    }
    setIsSubscribed(true);
    showToast('success', `You'll be notified when ${productName} is back in stock!`);
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl"
      >
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">
              You're on the list!
            </p>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              We'll email you when this item is back in stock
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl"
    >
      <div className="flex items-center gap-2 mb-3">
        <Bell className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        <h4 className="font-bold text-amber-800 dark:text-amber-200">
          Notify me when available
        </h4>
      </div>
      <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
        Get an email when <strong>{productName}</strong> is back in stock
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-amber-200 dark:border-amber-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none text-sm"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2.5 gradient-bg text-white rounded-lg font-semibold text-sm shadow-lg"
        >
          Notify Me
        </motion.button>
      </form>
    </motion.div>
  );
}
