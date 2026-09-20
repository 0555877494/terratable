import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, CreditCard, Mail, CheckCircle, Sparkles } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

export default function GiftCards() {
  const { showToast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [purchased, setPurchased] = useState(false);

  const amounts = [25, 50, 75, 100, 150, 200];

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail || !recipientName || !senderName) {
      showToast('error', 'Please fill in all required fields');
      return;
    }
    setPurchased(true);
    showToast('success', `Gift card sent to ${recipientEmail}!`);
  };

  if (purchased) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">Gift Card Sent!</h2>
          <p className="text-stone-600 dark:text-stone-400 mb-2">
            Your ${selectedAmount} gift card has been sent to
          </p>
          <p className="font-semibold text-stone-800 dark:text-stone-200 mb-6">{recipientEmail}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setPurchased(false);
              setRecipientEmail('');
              setRecipientName('');
              setSenderName('');
              setMessage('');
            }}
            className="px-8 py-3 gradient-bg text-white rounded-full font-bold shadow-lg"
          >
            Send Another Gift
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-semibold mb-4">
          <Gift className="w-4 h-4" /> Gift Cards
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Give the Gift of <span className="gradient-text">Flavor</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
          Share the joy of artisan foods with someone special. Our gift cards are delivered instantly via email.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Gift Card Preview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="sticky top-24">
            <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-6 h-6" />
                  <span className="font-serif text-xl font-bold">Terra & Table</span>
                </div>
                
                <div className="mb-8">
                  <p className="text-sm text-white/80 mb-1">Gift Card</p>
                  <p className="text-5xl font-bold">${selectedAmount}</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-white/60 text-xs">To</p>
                    <p className="font-semibold">{recipientName || 'Recipient Name'}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">From</p>
                    <p className="font-semibold">{senderName || 'Your Name'}</p>
                  </div>
                  {message && (
                    <div className="pt-3 border-t border-white/20">
                      <p className="text-white/60 text-xs mb-1">Message</p>
                      <p className="italic text-sm">"{message}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Purchase Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <form onSubmit={handlePurchase} className="space-y-6">
            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
                Select Amount
              </label>
              <div className="grid grid-cols-3 gap-3">
                {amounts.map(amount => (
                  <motion.button
                    key={amount}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAmount(amount)}
                    className={`py-4 rounded-xl font-bold text-lg transition-all ${
                      selectedAmount === amount
                        ? 'gradient-bg text-white shadow-lg shadow-amber-500/30'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    ${amount}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recipient Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={e => setRecipientName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-900/30 outline-none transition-all"
                  placeholder="Who's receiving this gift?"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2">
                  Recipient Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={e => setRecipientEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-900/30 outline-none transition-all"
                    placeholder="recipient@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={e => setSenderName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-900/30 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2">
                  Personal Message (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-900/30 outline-none transition-all resize-none"
                  placeholder="Add a personal touch..."
                />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-5 border-2 border-amber-200 dark:border-amber-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-stone-600 dark:text-stone-400">Gift Card Amount</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">${selectedAmount}.00</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-stone-600 dark:text-stone-400">Delivery</span>
                <span className="font-bold text-emerald-600">Free</span>
              </div>
              <div className="border-t-2 border-amber-200 dark:border-amber-800 pt-3 flex items-center justify-between">
                <span className="font-bold text-stone-800 dark:text-stone-200 text-lg">Total</span>
                <span className="font-bold text-2xl gradient-text">${selectedAmount}.00</span>
              </div>
            </div>

            {/* Purchase Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 gradient-bg text-white rounded-xl font-bold text-lg shadow-xl shadow-amber-500/30 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Purchase Gift Card
            </motion.button>

            <p className="text-xs text-stone-500 dark:text-stone-400 text-center">
              Gift cards are delivered via email within minutes. No expiration date.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
